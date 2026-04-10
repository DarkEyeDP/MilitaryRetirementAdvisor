/**
 * StatePdfDocument — 3-page state retirement report
 *
 * Page 1: Identity, score hero, three gauges, financial quick facts, pros/cons
 * Page 2: Military resources, housing, employment
 * Page 3: Climate & disaster risk, veteran perks, disclaimer
 */

import {
  Document,
  Page,
  View,
  Text,
  Image,
  Link,
} from '@react-pdf/renderer';
import { S, C } from './pdfStyles';
import { GaugeSvg } from './GaugeSvg';
import type { StateData } from '../../data/stateData';
import { calculateCustomScore, DEFAULT_SCORE_WEIGHTS, scoreTier } from '../../data/stateData';
import type { HousingData } from '../../data/housingData';
import { NATIONAL_HOUSING } from '../../data/housingData';
import type { StateEmploymentData } from '../../data/employmentData';
import { NATIONAL_EMPLOYMENT } from '../../data/employmentData';
import type { StateClimateData, RiskLevel } from '../../data/climateData';
import type { VeteranPerksData } from '../../data/veteranPerksData';
import type { FinancialInputs } from '../../data/financialReality';
import { getFlagUrl } from '../../lib/flagUrl';
import { vaFacilityLocations } from '../../data/vaFacilityLocations';
import { militaryInstallations } from '../../data/militaryInstallations';
import { getSpaceATerminalsByProximity } from '../../data/spaceATerminals';
import { DATA_YEAR } from '../../data/siteConfig';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt$(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

function pensionTaxDollars(state: StateData, income: number): number {
  if (state.militaryPensionTax === 'No') return 0;
  const taxable = state.militaryPensionTax === 'Partial' ? income * 0.5 : income;
  return taxable * (state.stateIncomeTax / 100);
}

function taxScoreComponents(state: StateData) {
  const pensionPts  = state.militaryPensionTax === 'No' ? 50 : state.militaryPensionTax === 'Partial' ? 28 : 0;
  const incomePts   = Math.max(0, Math.round(32 - state.stateIncomeTax * 2.4));
  const propertyPts = state.propertyTaxLevel === 'Low' ? 18 : state.propertyTaxLevel === 'Medium' ? 10 : 0;
  return { total: pensionPts + incomePts + propertyPts, pensionPts, incomePts, propertyPts };
}

function colScore(state: StateData): number {
  // Same formula as StateDetail.tsx line 237 so the PDF matches the site exactly.
  return Math.min(100, Math.max(0, Math.round((160 - state.costOfLivingIndex) / 78 * 100)));
}

function riskColor(level: RiskLevel): string {
  if (level === 'None' || level === 'Low') return C.green;
  if (level === 'Moderate') return C.amber;
  return C.red;
}

function pensionBadgeColors(tax: StateData['militaryPensionTax']): { bg: string; text: string; label: string } {
  if (tax === 'No')      return { bg: C.greenLight, text: C.green, label: 'Tax-Free Pension' };
  if (tax === 'Partial') return { bg: C.amberLight, text: C.amber, label: 'Partially Taxed' };
  return                        { bg: C.redLight,   text: C.red,   label: 'Fully Taxed' };
}

function tierColor(score: number): string {
  if (score >= 95) return C.green;
  if (score >= 85) return C.blue;
  if (score >= 70) return C.amber;
  return C.slate400;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageFooter({ stateName, generated }: { stateName: string; generated: string }) {
  return (
    <View style={S.footer} fixed>
      <Text style={S.footerText}>Military Retirement Advisor · {stateName} · {DATA_YEAR} Data</Text>
      <Link src="https://milretired.com">
        <Text style={[S.footerText, { color: C.blue }]}>milretired.com</Text>
      </Link>
      <Text
        style={S.footerText}
        render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages} · ${generated}`}
      />
    </View>
  );
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={S.sectionTitle}>{children}</Text>;
}

function DataRow({ label, value, alt }: { label: string; value: string; alt?: boolean }) {
  return (
    <View style={[S.dataTableRow, alt ? S.dataTableRowAlt : {}]}>
      <Text style={S.dataTableLabel}>{label}</Text>
      <Text style={S.dataTableValue}>{value}</Text>
    </View>
  );
}

function BulletItem({ text, color }: { text: string; color?: string }) {
  return (
    <View style={S.bulletItem}>
      <Text style={[S.bulletDot, color ? { color } : {}]}>•</Text>
      <Text style={S.bulletText}>{text}</Text>
    </View>
  );
}

function BulletLink({ text, url, color }: { text: string; url: string; color?: string }) {
  return (
    <Link src={url} style={S.bulletItem}>
      <Text style={[S.bulletDot, color ? { color } : {}]}>•</Text>
      <Text style={[S.bulletText, { color: color ?? C.blue }]}>{text}</Text>
    </Link>
  );
}

function SectionPageHeader({ title }: { title: string }) {
  return (
    <View break>
      <View style={[S.headerBar, { paddingVertical: 8 }]}>
        <Text style={[S.headerTitle, { fontSize: 13 }]}>{title}</Text>
        <Text style={S.headerSubtitle}>Military Retirement Advisor · {DATA_YEAR} Data</Text>
      </View>
      <View style={{ height: 12 }} />
    </View>
  );
}

// ─── Main Document ────────────────────────────────────────────────────────────

interface Props {
  state: StateData;
  inputs: FinancialInputs;
  housingData: HousingData | null;
  employmentData: StateEmploymentData | null;
  climateData: StateClimateData | null;
  perks: VeteranPerksData | null;
  originState: StateData | null;
}

export function StatePdfDocument({
  state,
  inputs,
  housingData,
  employmentData,
  climateData,
  perks,
  originState,
}: Props) {
  const score = calculateCustomScore(state, DEFAULT_SCORE_WEIGHTS);
  const tier  = scoreTier(score);
  const taxComps = taxScoreComponents(state);
  const costScore = colScore(state);
  const retirementIncome = inputs.retirementIncome;
  const isSeparating = inputs.userType === 'separating';

  const annualPensionTax = Math.round(pensionTaxDollars(state, retirementIncome));
  const annualIncomeTax  = Math.round(retirementIncome * state.stateIncomeTax / 100);
  const annualSavings = originState
    ? Math.round(pensionTaxDollars(originState, retirementIncome) - pensionTaxDollars(state, retirementIncome))
    : null;
  const colDiffPct = originState
    ? Math.round(((originState.costOfLivingIndex - state.costOfLivingIndex) / originState.costOfLivingIndex) * 100)
    : null;

  const facilities = vaFacilityLocations[state.id] ?? [];
  const vamcs   = facilities.filter((f) => f.type !== 'clinic');
  const clinics = facilities.filter((f) => f.type === 'clinic');
  const installations = militaryInstallations.filter((i) => i.stateId === state.id);
  const { inState: spaceAInState, bordering: spaceABordering } = getSpaceATerminalsByProximity(state.id);

  const taxBadge = pensionBadgeColors(state.militaryPensionTax);
  const generated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const flagUrl = getFlagUrl(state.abbreviation);

  // Gauge sub-items
  const taxSubItems = [
    ...(!isSeparating ? [{ label: 'Pension tax/yr', value: annualPensionTax === 0 ? '$0 — exempt' : fmt$(annualPensionTax) + '/yr' }] : []),
    { label: 'Income tax/yr', value: annualIncomeTax === 0 ? 'None' : fmt$(annualIncomeTax) + '/yr' },
    { label: 'Property tax',  value: state.propertyTaxLevel },
    { label: 'Sales tax',     value: state.salesTax === 0 ? 'None' : state.salesTax + '%' },
  ];
  const colSubItems = [
    { label: 'COL index',    value: String(state.costOfLivingIndex) + ' (avg=100)' },
    { label: 'vs. national', value: state.costOfLivingIndex < 100 ? Math.round(100 - state.costOfLivingIndex) + '% below avg' : Math.round(state.costOfLivingIndex - 100) + '% above avg' },
    { label: 'Avg home',     value: fmt$(state.avgHomeCost) },
    { label: 'Median rent',  value: housingData ? fmt$(housingData.medianRent) + '/mo' : 'N/A' },
  ];
  const benefitSubItems = [
    { label: 'VA facilities', value: `${vamcs.length} VAMC · ${clinics.length} clinic` },
    { label: 'Veterans',      value: state.veteranPopulation >= 1_000_000 ? (state.veteranPopulation / 1_000_000).toFixed(1) + 'M' : (state.veteranPopulation / 1_000).toFixed(0) + 'k' },
    { label: 'Education',     value: perks && perks.educationBenefits.retiree.length > 0 ? perks.educationBenefits.retiree.length + ' programs' : 'None listed' },
    { label: 'Reg. perks',    value: perks && perks.vehicleRegistrationBenefits.length > 0 ? perks.vehicleRegistrationBenefits.length + ' benefits' : 'None listed' },
  ];

  return (
    <Document
      title={`${state.name} Military Retirement Report`}
      author="Military Retirement Advisor"
      subject={`${DATA_YEAR} Retirement Profile — ${state.name}`}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          PAGE 1 — Identity, Gauges, Financial Summary, Pros/Cons
      ═══════════════════════════════════════════════════════════════════════ */}
      <Page size="LETTER" style={S.page}>

        {/* ── Header bar ── */}
        <View style={S.headerBar}>
          <View>
            <Text style={S.headerTitle}>{state.name}</Text>
            <Text style={S.headerSubtitle}>Military Retirement Advisor · {DATA_YEAR} Data Report</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={[S.badge, { backgroundColor: taxBadge.bg, alignSelf: 'center' }]}>
              <Text style={[S.badgeText, { color: taxBadge.text }]}>{taxBadge.label}</Text>
            </View>
            <Image src={flagUrl} style={{ width: 40, height: 24, borderRadius: 2 }} />
          </View>
        </View>

        {/* ── Score hero row ── */}
        <View style={S.scoreHeroRow}>
          {/* Large score circle */}
          <View style={S.scoreCircleWrap}>
            <GaugeSvg score={score} size={100} />
          </View>
          {/* Tier + summary stats */}
          <View style={{ flex: 1 }}>
            <Text style={[S.scoreTierLabel, { color: tierColor(score) }]}>{tier.label} Retirement Destination</Text>
            <Text style={S.scoreTierSub}>{state.abbreviation} · {isSeparating ? 'Transitioning Service Member' : 'Military Retirement'} Profile</Text>
            <View style={S.statGrid}>
              <View style={S.statBox}>
                <Text style={S.statLabel}>Income Tax</Text>
                <Text style={[S.statValue, { color: state.stateIncomeTax === 0 ? C.green : C.slate900 }]}>
                  {state.stateIncomeTax === 0 ? 'None' : state.stateIncomeTax + '%'}
                </Text>
              </View>
              <View style={S.statBox}>
                <Text style={S.statLabel}>Cost of Living</Text>
                <Text style={S.statValue}>{state.costOfLivingIndex}</Text>
                <Text style={S.statSub}>Avg = 100</Text>
              </View>
              <View style={S.statBox}>
                <Text style={S.statLabel}>Veterans</Text>
                <Text style={S.statValue}>
                  {state.veteranPopulation >= 1_000_000
                    ? (state.veteranPopulation / 1_000_000).toFixed(1) + 'M'
                    : (state.veteranPopulation / 1_000).toFixed(0) + 'k'}
                </Text>
              </View>
              <View style={S.statBox}>
                <Text style={S.statLabel}>VA Facilities</Text>
                <Text style={S.statValue}>{vamcs.length + clinics.length}</Text>
                <Text style={S.statSub}>{vamcs.length} VAMC · {clinics.length} clinic</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Three gauges ── */}
        <View style={[{ paddingHorizontal: 36, paddingTop: 8, paddingBottom: 4 }]}>
          <View style={[S.dataTable, S.gaugeRow, { borderRadius: 6 }]}>
            <View style={S.gaugeCell}>
              <GaugeSvg score={taxComps.total} size={90} />
              <Text style={S.gaugeLabel}>Tax Friendliness</Text>
              {taxSubItems.map((it) => (
                <View key={it.label} style={S.gaugeSubItem}>
                  <Text style={S.gaugeSubLabel}>{it.label}</Text>
                  <Text style={S.gaugeSubValue}>{it.value}</Text>
                </View>
              ))}
            </View>
            <View style={S.gaugeCell}>
              <GaugeSvg score={costScore} size={90} />
              <Text style={S.gaugeLabel}>Cost of Living</Text>
              {colSubItems.map((it) => (
                <View key={it.label} style={S.gaugeSubItem}>
                  <Text style={S.gaugeSubLabel}>{it.label}</Text>
                  <Text style={S.gaugeSubValue}>{it.value}</Text>
                </View>
              ))}
            </View>
            <View style={S.gaugeCellLast}>
              <GaugeSvg score={state.veteranBenefitsScore} size={90} />
              <Text style={S.gaugeLabel}>Veteran Benefits</Text>
              {benefitSubItems.map((it) => (
                <View key={it.label} style={S.gaugeSubItem}>
                  <Text style={S.gaugeSubLabel}>{it.label}</Text>
                  <Text style={S.gaugeSubValue}>{it.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ── Financial quick facts ── */}
        <View style={S.section}>
          <SectionTitle>Financial Summary</SectionTitle>
          <View style={S.row}>
            <View style={[S.col, S.dataTable]}>
              {!isSeparating && (
                <DataRow label="Pension Tax Status" value={state.militaryPensionTax === 'No' ? 'Exempt' : state.militaryPensionTax === 'Partial' ? 'Partially taxed (~50%)' : 'Fully taxed'} />
              )}
              {!isSeparating && (
                <DataRow label="Annual Pension Tax" value={annualPensionTax === 0 ? '$0 (exempt)' : fmt$(annualPensionTax) + '/yr'} alt />
              )}
              <DataRow label="State Income Tax Rate" value={state.stateIncomeTax === 0 ? 'None' : state.stateIncomeTax + '%'} alt={isSeparating} />
              <DataRow label="Annual Income Tax (est.)" value={annualIncomeTax === 0 ? '$0' : fmt$(annualIncomeTax) + '/yr'} alt={!isSeparating} />
              <DataRow label="Property Tax Level" value={state.propertyTaxLevel} />
              <DataRow label="Sales Tax" value={state.salesTax === 0 ? 'None' : state.salesTax + '%'} alt />
            </View>
            <View style={[S.col, S.dataTable]}>
              <DataRow label="Cost of Living Index" value={String(state.costOfLivingIndex) + ' (US avg = 100)'} />
              <DataRow label="Average Home Price" value={fmt$(state.avgHomeCost)} alt />
              <DataRow label="Median Monthly Rent" value={housingData ? fmt$(housingData.medianRent) + '/mo' : 'N/A'} />
              {annualSavings !== null && (
                <DataRow label={`Tax Savings vs. ${originState?.abbreviation}`} value={(annualSavings >= 0 ? '+' : '') + fmt$(annualSavings) + '/yr'} alt />
              )}
              {colDiffPct !== null && (
                <DataRow label={`COL vs. ${originState?.abbreviation}`} value={(colDiffPct >= 0 ? colDiffPct + '% cheaper' : Math.abs(colDiffPct) + '% more expensive')} />
              )}
              {isSeparating && (
                <DataRow label="Profile" value="Separating (no pension)" alt />
              )}
            </View>
          </View>
        </View>

        {/* ── Pros / Cons ── */}
        <View style={S.section} wrap={false}>
          <SectionTitle>Strengths & Considerations</SectionTitle>
          <View style={S.prosConsRow}>
            <View style={[S.prosConsCol, { borderColor: C.greenLight, borderWidth: 1 }]}>
              <Text style={[S.prosConsHeader, { color: C.green }]}>✓  Advantages</Text>
              {state.pros.map((p, i) => (
                <View key={i} style={S.prosConsItem}>
                  <Text style={[S.prosConsBullet, { color: C.green }]}>✓</Text>
                  <Text style={S.prosConsText}>{p}</Text>
                </View>
              ))}
            </View>
            <View style={[S.prosConsCol, { borderColor: C.amberLight, borderWidth: 1 }]}>
              <Text style={[S.prosConsHeader, { color: C.amber }]}>⚠  Considerations</Text>
              {state.cons.map((c, i) => (
                <View key={i} style={S.prosConsItem}>
                  <Text style={[S.prosConsBullet, { color: C.amber }]}>⚠</Text>
                  <Text style={S.prosConsText}>{c}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <SectionPageHeader title={`${state.name} — Resources & Economy`} />

        {/* ── VA Facilities ── */}
        <View style={S.section}>
          <SectionTitle>VA Medical Facilities</SectionTitle>
          <View style={S.row}>
            {/* VAMCs */}
            <View style={S.col}>
              <Text style={[S.sectionSubHeading, { color: C.blue }]}>
                VA Medical Centers ({vamcs.length})
              </Text>
              {vamcs.length > 0
                ? vamcs.map((f, i) => (
                    <BulletLink
                      key={i}
                      text={f.name + (f.address ? ' — ' + f.address : '')}
                      url={`https://www.google.com/maps?q=${f.lat},${f.lon}`}
                      color={C.blue}
                    />
                  ))
                : <Text style={{ fontSize: 8, color: C.slate400 }}>None in state</Text>
              }
            </View>
            {/* Clinics */}
            <View style={S.col}>
              <Text style={[S.sectionSubHeading, { color: C.green }]}>
                VA Outpatient Clinics ({clinics.length})
              </Text>
              {clinics.length > 0
                ? clinics.map((f, i) => (
                    <BulletLink
                      key={i}
                      text={f.name + (f.address ? ' — ' + f.address : '')}
                      url={`https://www.google.com/maps?q=${f.lat},${f.lon}`}
                      color={C.green}
                    />
                  ))
                : <Text style={{ fontSize: 8, color: C.slate400 }}>None in state</Text>
              }
            </View>
          </View>
        </View>

        {/* ── Military Installations ── */}
        {installations.length > 0 && (
          <View style={S.section}>
            <SectionTitle>Military Installations ({installations.length})</SectionTitle>
            <View style={S.row}>
              {[0, 1].map((col) => (
                <View key={col} style={S.col}>
                  {installations
                    .filter((_, i) => i % 2 === col)
                    .map((inst, i) => (
                      <BulletLink
                        key={i}
                        text={inst.name}
                        url={`https://www.google.com/maps?q=${inst.lat},${inst.lon}`}
                      />
                    ))}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* ── Space-A Terminals ── */}
        {(spaceAInState.length > 0 || spaceABordering.length > 0) && (
          <View style={S.section}>
            <SectionTitle>Space-A Terminals</SectionTitle>
            <View style={S.row}>
              {spaceAInState.length > 0 && (
                <View style={S.col}>
                  <Text style={[S.sectionSubHeading, { color: C.navy }]}>
                    In {state.abbreviation}
                  </Text>
                  {spaceAInState.map((t) => (
                    <BulletItem key={t.id} text={t.name + (t.phone ? ' · ' + t.phone : '')} />
                  ))}
                </View>
              )}
              {spaceABordering.length > 0 && (
                <View style={S.col}>
                  <Text style={[S.sectionSubHeading, { color: C.slate500 }]}>
                    Nearby (bordering states)
                  </Text>
                  {spaceABordering.map((t) => (
                    <BulletItem key={t.id} text={t.name + ' (' + t.stateAbbr + ')' + (t.phone ? ' · ' + t.phone : '')} color={C.slate400} />
                  ))}
                </View>
              )}
            </View>
            <Text style={{ fontSize: 7, color: C.slate400, marginTop: 6 }}>
              Retirees fly Space-A as Category VI (lowest priority). Valid DD Form 2765 required. OCONUS travel permitted.
            </Text>
          </View>
        )}

        {/* ── Military Benefits ── */}
        {state.militaryBenefits && state.militaryBenefits.length > 0 && (
          <View style={S.section}>
            <SectionTitle>Military-Specific Benefits</SectionTitle>
            <View style={S.row}>
              {[0, 1].map((col) => (
                <View key={col} style={S.col}>
                  {state.militaryBenefits
                    .filter((_, i) => i % 2 === col)
                    .map((b, i) => <BulletItem key={i} text={b} />)}
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={S.divider} />

        {/* ── Housing Market ── */}
        {housingData && (
          <View style={S.section} wrap={false}>
            <SectionTitle>Housing Market</SectionTitle>
            <View style={S.metricHeroRow}>
              <View style={S.metricCard}>
                <Text style={S.metricValue}>{fmt$(state.avgHomeCost)}</Text>
                <Text style={S.metricLabel}>Avg Home Price</Text>
              </View>
              <View style={S.metricCard}>
                <Text style={S.metricValue}>{fmt$(housingData.medianRent)}/mo</Text>
                <Text style={S.metricLabel}>Median Rent</Text>
              </View>
              <View style={S.metricCard}>
                <Text style={[S.metricValue, { color: housingData.housingPriceTrend > 0 ? C.green : C.red }]}>
                  {housingData.housingPriceTrend > 0 ? '+' : ''}{housingData.housingPriceTrend.toFixed(1)}% YoY
                </Text>
                <Text style={S.metricLabel}>Price Trend</Text>
              </View>
            </View>
            <View style={S.dataTable}>
              <DataRow label="vs. US Median Rent ($1,163/mo)" value={housingData.medianRent <= 1163 ? 'Below US median ✓' : `$${(housingData.medianRent - 1163).toLocaleString()} above US median`} />
              <DataRow label="vs. US Median Home ($313k)" value={state.avgHomeCost <= 313000 ? 'Below US median ✓' : `$${Math.round((state.avgHomeCost - 313000) / 1000)}k above US median`} alt />
              <DataRow label="Price Momentum" value={
                housingData.housingPriceTrend < 1 ? 'Flat / Declining'
                : housingData.housingPriceTrend < 4 ? 'Steady growth'
                : housingData.housingPriceTrend < 7 ? 'Fast rising'
                : 'Strong appreciation'
              } />
            </View>
            <Text style={{ fontSize: 7, color: C.slate400, marginTop: 4 }}>
              Source: Zillow Research & Census Bureau ACS 2023–2024
            </Text>
          </View>
        )}

        {/* ── Employment ── */}
        {employmentData && (
          <View style={S.section} wrap={false}>
            <SectionTitle>Economy & Jobs</SectionTitle>
            <View style={S.metricHeroRow}>
              <View style={S.metricCard}>
                <Text style={[S.metricValue, {
                  color: employmentData.unemploymentRate < 4 ? C.green
                    : employmentData.unemploymentRate < 6 ? C.amber : C.red
                }]}>
                  {employmentData.unemploymentRate.toFixed(1)}%
                </Text>
                <Text style={S.metricLabel}>Unemployment</Text>
              </View>
              <View style={S.metricCard}>
                <Text style={[S.metricValue, { color: employmentData.jobGrowthRate >= 0 ? C.green : C.red }]}>
                  {employmentData.jobGrowthRate > 0 ? '+' : ''}{employmentData.jobGrowthRate.toFixed(1)}% YoY
                </Text>
                <Text style={S.metricLabel}>Job Growth</Text>
              </View>
              <View style={S.metricCard}>
                <Text style={S.metricValue}>{fmt$(employmentData.medianHouseholdIncome)}</Text>
                <Text style={S.metricLabel}>Median Household Income</Text>
              </View>
            </View>
            <View style={S.dataTable}>
              <DataRow label="vs. US Unemployment (3.7%)" value={employmentData.unemploymentRate <= NATIONAL_EMPLOYMENT.unemploymentRate ? `${(NATIONAL_EMPLOYMENT.unemploymentRate - employmentData.unemploymentRate).toFixed(1)}% lower ✓` : `${(employmentData.unemploymentRate - NATIONAL_EMPLOYMENT.unemploymentRate).toFixed(1)}% higher`} />
              <DataRow label="DoD Contractor Presence" value={employmentData.defenseContractorPresence} alt />
              <DataRow label="Top Industries" value={employmentData.topIndustries.join(' · ')} />
            </View>
            <Text style={{ fontSize: 7, color: C.slate400, marginTop: 4 }}>
              Source: BLS 2024 & Census ACS 2023
            </Text>
          </View>
        )}

        <SectionPageHeader title={`${state.name} — Climate & Veteran Perks`} />

        {/* ── Climate Conditions ── */}
        {climateData && (
          <View style={S.section} wrap={false}>
            <SectionTitle>Climate Conditions</SectionTitle>
            <View style={S.climateGrid}>
              {[
                { label: 'Summer High (July avg)', value: `${climateData.avgSummerHighF}°F` },
                { label: 'Winter Low (Jan avg)',   value: `${climateData.avgWinterLowF}°F` },
                { label: 'Humidity',               value: climateData.humidity },
                { label: 'Annual Rainfall',        value: `${climateData.annualRainfallInches}"` },
                { label: 'Extreme Heat Days (>95°F/yr)', value: `${climateData.extremeHeatDays} days` },
                { label: 'Extreme Cold Days (<20°F/yr)', value: `${climateData.extremeColdDays} days` },
              ].map((item) => (
                <View key={item.label} style={S.climateCell}>
                  <Text style={S.climateCellLabel}>{item.label}</Text>
                  <Text style={S.climateCellValue}>{item.value}</Text>
                </View>
              ))}
            </View>
            <Text style={{ fontSize: 7, color: C.slate400, marginTop: 2 }}>
              Climate normals from NOAA (1991–2020).
            </Text>
          </View>
        )}

        {/* ── Disaster Risk ── */}
        {climateData && (
          <View style={S.section} wrap={false}>
            <SectionTitle>Natural Disaster Risk</SectionTitle>
            <View style={S.climateGrid}>
              {(Object.entries(climateData.disasterRisk) as [string, RiskLevel][]).map(([key, level]) => (
                <View key={key} style={[S.climateCell, { borderColor: riskColor(level), borderWidth: 1 }]}>
                  <Text style={S.climateCellLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <Text style={[S.climateCellValue, { color: riskColor(level) }]}>{level}</Text>
                </View>
              ))}
            </View>
            <Text style={{ fontSize: 7, color: C.slate400, marginTop: 2 }}>
              Disaster risk based on FEMA National Risk Index and NIFC wildfire data.
            </Text>
          </View>
        )}

        <View style={S.divider} />

        {/* ── Veteran Perks ── */}
        {perks && (
          <View style={S.section} wrap={false}>
            <SectionTitle>Veteran Perks & Benefits</SectionTitle>

            {perks.propertyTaxExemptions.length > 0 && (
              <View style={{ marginBottom: 12, padding: 8, borderRadius: 4, backgroundColor: state.propertyTaxExemption100 === 'Full' ? C.greenLight : state.propertyTaxExemption100 === 'Partial' ? C.amberLight : C.slate100 }}>
                <Text style={[S.sectionSubHeading, { color: state.propertyTaxExemption100 === 'Full' ? C.green : state.propertyTaxExemption100 === 'Partial' ? C.amber : C.slate700, marginBottom: 6 }]}>
                  Property Tax Exemption (100% VA Disability) — {state.propertyTaxExemption100 === 'Full' ? 'Full Exemption' : state.propertyTaxExemption100 === 'Partial' ? 'Partial Exemption' : 'No Exemption'}
                </Text>
                {perks.propertyTaxExemptions.map((b, i) => (
                  <BulletItem key={i} text={b} color={state.propertyTaxExemption100 === 'Full' ? C.green : state.propertyTaxExemption100 === 'Partial' ? C.amber : C.slate500} />
                ))}
              </View>
            )}

            {perks.vehicleRegistrationBenefits.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={[S.sectionSubHeading, { color: C.navy }]}>
                  Driver&apos;s License & Vehicle Registration
                </Text>
                {perks.vehicleRegistrationBenefits.map((b, i) => <BulletItem key={i} text={b} />)}
              </View>
            )}

            {perks.medalBenefits.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={[S.sectionSubHeading, { color: C.navy }]}>
                  Military Medal & Honor Benefits
                </Text>
                {perks.medalBenefits.map((b, i) => <BulletItem key={i} text={b} />)}
              </View>
            )}

            {perks.educationBenefits.retiree.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={[S.sectionSubHeading, { color: C.blue }]}>
                  Education Benefits — Retiree
                </Text>
                {perks.educationBenefits.retiree.map((b, i) => <BulletItem key={i} text={b} color={C.blue} />)}
              </View>
            )}

            {perks.educationBenefits.family.length > 0 && (
              <View style={{ marginBottom: 12 }}>
                <Text style={[S.sectionSubHeading, { color: '#7c3aed' }]}>
                  Education Benefits — Spouse & Dependents
                </Text>
                {perks.educationBenefits.family.map((b, i) => <BulletItem key={i} text={b} color="#7c3aed" />)}
              </View>
            )}

            {perks.vehicleRegistrationBenefits.length === 0 && perks.medalBenefits.length === 0 &&
              perks.educationBenefits.retiree.length === 0 && perks.educationBenefits.family.length === 0 && (
              <Text style={{ fontSize: 8, color: C.slate400 }}>No specific veteran perks data available for this state.</Text>
            )}
          </View>
        )}


        <PageFooter stateName={state.name} generated={generated} />
      </Page>
    </Document>
  );
}
