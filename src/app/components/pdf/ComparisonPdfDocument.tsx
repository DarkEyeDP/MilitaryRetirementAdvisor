/**
 * ComparisonPdfDocument — 2-page side-by-side state comparison report
 *
 * Page 1: State overview cards, full financial reality table, scores & taxes
 * Page 2: Housing, VA facilities, employment, climate & disaster risk
 */

import { Document, Page, View, Text, Image, Link } from '@react-pdf/renderer';
import { S, C } from './pdfStyles';
import { GaugeSvg } from './GaugeSvg';
import type { StateData } from '../../data/stateData';
import { calculateCustomScore, DEFAULT_SCORE_WEIGHTS, scoreTier } from '../../data/stateData';
import { calculateFinancialReality, type FinancialInputs, type UserCostProfile } from '../../data/financialReality';
import { getVAMonthlyPay } from '../../data/vaRates';
import { vaFacilityLocations } from '../../data/vaFacilityLocations';
import { stateHousingData } from '../../data/housingData';
import { stateClimateData, type RiskLevel } from '../../data/climateData';
import { stateEmploymentData } from '../../data/employmentData';
import { DATA_YEAR } from '../../data/siteConfig';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt$(n: number): string {
  return '$' + Math.round(n).toLocaleString();
}

function fmtVetPop(n: number): string {
  return n >= 1_000_000 ? (n / 1_000_000).toFixed(1) + 'M' : (n / 1000).toFixed(0) + 'k';
}

function pensionBadge(tax: StateData['militaryPensionTax']): { bg: string; text: string; label: string } {
  if (tax === 'No')      return { bg: C.greenLight, text: C.green, label: 'Tax-Free' };
  if (tax === 'Partial') return { bg: C.amberLight, text: C.amber, label: 'Partial' };
  return                        { bg: C.redLight,   text: C.red,   label: 'Taxed' };
}

function riskColor(level: RiskLevel): string {
  if (level === 'None' || level === 'Low') return C.green;
  if (level === 'Moderate') return C.amber;
  return C.red;
}

function tierColor(score: number): string {
  if (score >= 95) return C.green;
  if (score >= 85) return C.blue;
  if (score >= 70) return C.amber;
  return C.slate400;
}

/** Index of best value (max or min). Returns -1 on ties. */
function bestIdx(vals: (number | null)[], prefer: 'max' | 'min'): number {
  const nums = vals.filter((v): v is number => v !== null);
  if (nums.length === 0) return -1;
  const target = prefer === 'max' ? Math.max(...nums) : Math.min(...nums);
  const hits = vals.map((v, i) => (v === target ? i : -1)).filter((i) => i !== -1);
  return hits.length === 1 ? hits[0] : -1;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PageFooter({ generated }: { generated: string }) {
  return (
    <View style={S.footer} fixed>
      <Text style={S.footerText}>Military Retirement Advisor · State Comparison · {DATA_YEAR} Data</Text>
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

interface CTableProps {
  label: string;
  values: string[];
  bestIndex?: number;
  alt?: boolean;
}

function CRow({ label, values, bestIndex = -1, alt = false }: CTableProps) {
  return (
    <View style={[S.compTableRow, alt ? S.compTableRowAlt : {}]}>
      <Text style={S.compTableCellLeft}>{label}</Text>
      {values.map((v, i) => (
        <View key={i} style={{ flex: 1, alignItems: 'center' }}>
          {bestIndex === i ? (
            <View style={{ backgroundColor: C.greenLight, borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1 }}>
              <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.green }}>{v}</Text>
            </View>
          ) : (
            <Text style={S.compTableCell}>{v}</Text>
          )}
        </View>
      ))}
    </View>
  );
}

function SectionRow({ label }: { label: string }) {
  return (
    <View style={S.compSectionLabel}>
      <Text style={S.compSectionLabelText}>{label}</Text>
    </View>
  );
}

// ─── Main Document ────────────────────────────────────────────────────────────

interface Props {
  states: StateData[];
  inputs: FinancialInputs;
  profile: UserCostProfile;
}

export function ComparisonPdfDocument({ states, inputs, profile }: Props) {
  if (states.length === 0) return <Document><Page size="LETTER" style={S.page}><Text>No states selected.</Text></Page></Document>;

  const n = states.length;
  const scores = states.map((s) => calculateCustomScore(s, DEFAULT_SCORE_WEIGHTS));
  const breakdowns = states.map((s) => calculateFinancialReality(s, inputs, profile));
  const generated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const isSeparating = inputs.userType === 'separating';

  const hasDisability = inputs.disabilityRating && inputs.disabilityRating !== 'none' && inputs.disabilityRating !== '';
  const monthlyDisability = hasDisability
    ? getVAMonthlyPay(inputs.disabilityRating, !!inputs.hasSpouse, inputs.dependentChildren ?? 0)
    : 0;

  const stateNames = states.map((s) => s.name).join(' vs. ');
  const flagUrl = (abbr: string) => `https://cdn.jsdelivr.net/gh/hayleox/flags@master/svg/us/${abbr.toLowerCase()}.svg`;

  // State-color accents for columns: blue, green, amber
  const accentColors = [C.blue, C.green, C.amber];

  // Column widths flex per number of states
  const colFlex = n === 1 ? 2 : 1;

  return (
    <Document
      title={`State Comparison — ${stateNames}`}
      author="Military Retirement Advisor"
      subject={`${DATA_YEAR} State Comparison Report`}
    >
      {/* ═══════════════════════════════════════════════════════════════════════
          PAGE 1 — Hero cards · Financial table · Scores
      ═══════════════════════════════════════════════════════════════════════ */}
      <Page size="LETTER" style={S.page}>

        {/* ── Header ── */}
        <View style={S.headerBar}>
          <View>
            <Text style={S.headerTitle}>State Comparison Report</Text>
            <Text style={S.headerSubtitle}>
              {stateNames} · Military Retirement Advisor · {DATA_YEAR} Data
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 4 }}>
            {states.map((s) => (
              <Image key={s.id} src={flagUrl(s.abbreviation)} style={{ width: 30, height: 18, borderRadius: 2 }} />
            ))}
          </View>
        </View>

        {/* ── State hero cards ── */}
        <View style={{ flexDirection: 'row', gap: 0, marginBottom: 10, borderBottomWidth: 0.5, borderBottomColor: C.slate200 }}>
          {states.map((s, idx) => {
            const score = scores[idx];
            const tier  = scoreTier(score);
            const badge = pensionBadge(s.militaryPensionTax);
            const bd    = breakdowns[idx];
            return (
              <View key={s.id} style={{
                flex: colFlex,
                padding: 12,
                borderLeftWidth: 0.5,
                borderLeftColor: C.slate200,
                alignItems: 'center',
                borderTopWidth: 3,
                borderTopColor: accentColors[idx] ?? C.blue,
              }}>
                <Image src={flagUrl(s.abbreviation)} style={{ width: 32, height: 19, borderRadius: 2, marginBottom: 4 }} />
                <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.slate900 }}>{s.name}</Text>
                <Text style={{ fontSize: 9, color: C.slate500, marginBottom: 6 }}>{s.abbreviation}</Text>
                <GaugeSvg score={score} size={70} />
                <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: tierColor(score), marginTop: 2 }}>{tier.label}</Text>
                <View style={[S.badge, { backgroundColor: badge.bg, marginTop: 4, alignSelf: 'center' }]}>
                  <Text style={[S.badgeText, { color: badge.text }]}>{badge.label} Pension</Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 4, marginTop: 6, width: '100%' }}>
                  <View style={[S.statBox, { flex: 1, paddingHorizontal: 5, paddingVertical: 4, alignItems: 'center' }]}>
                    <Text style={[S.statLabel, { fontSize: 6 }]}>Mo. Income</Text>
                    <Text style={[S.statValue, { fontSize: 10 }]}>{fmt$(bd.totalMonthlyIncome)}</Text>
                  </View>
                  <View style={[S.statBox, { flex: 1, paddingHorizontal: 5, paddingVertical: 4, alignItems: 'center' }]}>
                    <Text style={[S.statLabel, { fontSize: 6 }]}>Mo. Left</Text>
                    <Text style={[S.statValue, { fontSize: 10, color: bd.monthlyRemaining >= 0 ? C.green : C.red }]}>
                      {fmt$(bd.monthlyRemaining)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Financial Reality Table ── */}
        <View style={[S.section, { marginBottom: 6 }]}>
          <Text style={S.sectionTitle}>Financial Reality</Text>
          <View style={[S.dataTable, { overflow: 'hidden', borderRadius: 5 }]}>

            {/* Table header */}
            <View style={[S.compTableHeader]}>
              <Text style={S.compTableHeaderCellLeft}>Category</Text>
              {states.map((s) => (
                <Text key={s.id} style={S.compTableHeaderCell}>{s.abbreviation}</Text>
              ))}
            </View>

            <SectionRow label="Income" />
            <CRow
              label={isSeparating ? 'Est. Annual Income' : 'Military Pension'}
              values={states.map(() => fmt$(inputs.retirementIncome / 12) + '/mo')}
            />
            {hasDisability && (
              <CRow
                alt
                label="VA Disability (tax-free)"
                values={states.map(() => fmt$(monthlyDisability) + '/mo')}
              />
            )}
            {(inputs.secondaryIncome ?? []).map((src) => (
              <CRow
                key={src.id}
                label={src.label}
                values={states.map(() => fmt$(src.annualAmount / 12) + '/mo')}
              />
            ))}
            <CRow
              alt
              label="Total Monthly Income"
              values={breakdowns.map((b) => fmt$(b.totalMonthlyIncome))}
              bestIndex={bestIdx(breakdowns.map((b) => b.totalMonthlyIncome), 'max')}
            />

            <SectionRow label="Taxes" />
            {!isSeparating && (
              <CRow
                label="Pension Tax"
                values={breakdowns.map((b) => b.stateTaxOnPension === 0 ? 'Exempt ✓' : '-' + fmt$(b.stateTaxOnPension))}
                bestIndex={bestIdx(breakdowns.map((b) => b.stateTaxOnPension), 'min')}
              />
            )}
            <CRow
              alt={!isSeparating}
              label="Tax on Other Income"
              values={breakdowns.map((b) => b.stateTaxOnSecondaryIncome === 0 ? 'None ✓' : '-' + fmt$(b.stateTaxOnSecondaryIncome))}
              bestIndex={bestIdx(breakdowns.map((b) => b.stateTaxOnSecondaryIncome), 'min')}
            />

            <SectionRow label="Monthly Expenses" />
            <CRow label="Property Tax" values={breakdowns.map((b) => fmt$(b.propertyTaxMonthly) + '/mo')} bestIndex={bestIdx(breakdowns.map((b) => b.propertyTaxMonthly), 'min')} />
            <CRow alt label="Sales Tax on Spending" values={breakdowns.map((b) => fmt$(b.salesTaxOnSpending) + '/mo')} bestIndex={bestIdx(breakdowns.map((b) => b.salesTaxOnSpending), 'min')} />
            <CRow label="Home Insurance" values={breakdowns.map((b) => fmt$(b.homeInsuranceMonthly) + '/mo')} bestIndex={bestIdx(breakdowns.map((b) => b.homeInsuranceMonthly), 'min')} />
            <CRow alt label="Auto Insurance" values={breakdowns.map((b) => fmt$(b.autoInsuranceMonthly) + '/mo')} bestIndex={bestIdx(breakdowns.map((b) => b.autoInsuranceMonthly), 'min')} />
            <CRow label="Utilities" values={breakdowns.map((b) => fmt$(b.utilitiesMonthly) + '/mo')} bestIndex={bestIdx(breakdowns.map((b) => b.utilitiesMonthly), 'min')} />
            <CRow alt label="Total Est. Costs" values={breakdowns.map((b) => fmt$(b.totalTrackedExpenses) + '/mo')} bestIndex={bestIdx(breakdowns.map((b) => b.totalTrackedExpenses), 'min')} />
            <CRow label="Monthly Remaining" values={breakdowns.map((b) => fmt$(b.monthlyRemaining))} bestIndex={bestIdx(breakdowns.map((b) => b.monthlyRemaining), 'max')} />
          </View>
          <Text style={{ fontSize: 7, color: C.slate400, marginTop: 4 }}>
            ✓ Green highlights indicate the best value. Costs are state averages and do not include food, healthcare, or discretionary spending unless customized.
          </Text>
        </View>

        {/* ── Scores & Taxes Table ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Scores & Tax Profile</Text>
          <View style={[S.dataTable, { overflow: 'hidden', borderRadius: 5 }]}>
            <View style={S.compTableHeader}>
              <Text style={S.compTableHeaderCellLeft}>Metric</Text>
              {states.map((s) => <Text key={s.id} style={S.compTableHeaderCell}>{s.abbreviation}</Text>)}
            </View>
            <CRow label="Overall Score" values={scores.map((sc) => String(sc) + '/100')} bestIndex={bestIdx(scores, 'max')} />
            <CRow alt label="Pension Tax" values={states.map((s) => s.militaryPensionTax === 'No' ? 'Exempt' : s.militaryPensionTax === 'Partial' ? 'Partial' : 'Taxed')} />
            <CRow label="Income Tax Rate" values={states.map((s) => s.stateIncomeTax === 0 ? 'None' : s.stateIncomeTax + '%')} bestIndex={bestIdx(states.map((s) => s.stateIncomeTax), 'min')} />
            <CRow alt label="Sales Tax" values={states.map((s) => s.salesTax === 0 ? 'None' : s.salesTax + '%')} bestIndex={bestIdx(states.map((s) => s.salesTax), 'min')} />
            <CRow label="Property Tax" values={states.map((s) => s.propertyTaxLevel)} />
            <CRow alt label="Cost of Living Index" values={states.map((s) => String(s.costOfLivingIndex))} bestIndex={bestIdx(states.map((s) => s.costOfLivingIndex), 'min')} />
            <CRow label="VA Benefits Score" values={states.map((s) => String(s.veteranBenefitsScore) + '/100')} bestIndex={bestIdx(states.map((s) => s.veteranBenefitsScore), 'max')} />
            <CRow alt label="Veteran Population" values={states.map((s) => fmtVetPop(s.veteranPopulation))} />
          </View>
        </View>

        <PageFooter generated={generated} />
      </Page>

      {/* ═══════════════════════════════════════════════════════════════════════
          PAGE 2 — Housing · VA Facilities · Employment · Climate
      ═══════════════════════════════════════════════════════════════════════ */}
      <Page size="LETTER" style={S.page}>

        <View style={[S.headerBar, { paddingVertical: 8 }]}>
          <Text style={[S.headerTitle, { fontSize: 13 }]}>State Comparison — Detailed Data</Text>
          <Text style={S.headerSubtitle}>{stateNames} · Military Retirement Advisor · {DATA_YEAR} Data</Text>
        </View>

        {/* ── Housing Table ── */}
        <View style={[S.section, { marginTop: 10 }]}>
          <Text style={S.sectionTitle}>Housing Market</Text>
          <View style={[S.dataTable, { overflow: 'hidden', borderRadius: 5 }]}>
            <View style={S.compTableHeader}>
              <Text style={S.compTableHeaderCellLeft}>Metric</Text>
              {states.map((s) => <Text key={s.id} style={S.compTableHeaderCell}>{s.abbreviation}</Text>)}
            </View>
            <CRow label="Avg Home Price" values={states.map((s) => fmt$(s.avgHomeCost))} bestIndex={bestIdx(states.map((s) => s.avgHomeCost), 'min')} />
            <CRow alt label="Median Rent/mo" values={states.map((s) => { const h = stateHousingData[s.id]; return h ? fmt$(h.medianRent) : 'N/A'; })} bestIndex={bestIdx(states.map((s) => stateHousingData[s.id]?.medianRent ?? null), 'min')} />
            <CRow label="Price Trend (YoY)" values={states.map((s) => { const h = stateHousingData[s.id]; return h ? (h.housingPriceTrend > 0 ? '+' : '') + h.housingPriceTrend.toFixed(1) + '%' : 'N/A'; })} />
          </View>
        </View>

        {/* ── VA Facilities Table ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>VA Facilities</Text>
          <View style={[S.dataTable, { overflow: 'hidden', borderRadius: 5 }]}>
            <View style={S.compTableHeader}>
              <Text style={S.compTableHeaderCellLeft}>Metric</Text>
              {states.map((s) => <Text key={s.id} style={S.compTableHeaderCell}>{s.abbreviation}</Text>)}
            </View>
            <CRow
              label="VA Medical Centers"
              values={states.map((s) => { const f = vaFacilityLocations[s.id] ?? []; return String(f.filter((x) => x.type !== 'clinic').length); })}
              bestIndex={bestIdx(states.map((s) => (vaFacilityLocations[s.id] ?? []).filter((x) => x.type !== 'clinic').length), 'max')}
            />
            <CRow
              alt
              label="VA Outpatient Clinics"
              values={states.map((s) => { const f = vaFacilityLocations[s.id] ?? []; return String(f.filter((x) => x.type === 'clinic').length); })}
              bestIndex={bestIdx(states.map((s) => (vaFacilityLocations[s.id] ?? []).filter((x) => x.type === 'clinic').length), 'max')}
            />
            <CRow
              label="Total VA Locations"
              values={states.map((s) => String((vaFacilityLocations[s.id] ?? []).length))}
              bestIndex={bestIdx(states.map((s) => (vaFacilityLocations[s.id] ?? []).length), 'max')}
            />
          </View>
        </View>

        {/* ── Employment Table ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Economy & Employment</Text>
          <View style={[S.dataTable, { overflow: 'hidden', borderRadius: 5 }]}>
            <View style={S.compTableHeader}>
              <Text style={S.compTableHeaderCellLeft}>Metric</Text>
              {states.map((s) => <Text key={s.id} style={S.compTableHeaderCell}>{s.abbreviation}</Text>)}
            </View>
            <CRow label="Unemployment Rate" values={states.map((s) => { const e = stateEmploymentData[s.id]; return e ? e.unemploymentRate.toFixed(1) + '%' : 'N/A'; })} bestIndex={bestIdx(states.map((s) => stateEmploymentData[s.id]?.unemploymentRate ?? null), 'min')} />
            <CRow alt label="Job Growth (YoY)" values={states.map((s) => { const e = stateEmploymentData[s.id]; return e ? (e.jobGrowthRate > 0 ? '+' : '') + e.jobGrowthRate.toFixed(1) + '%' : 'N/A'; })} bestIndex={bestIdx(states.map((s) => stateEmploymentData[s.id]?.jobGrowthRate ?? null), 'max')} />
            <CRow label="Median Household Income" values={states.map((s) => { const e = stateEmploymentData[s.id]; return e ? fmt$(e.medianHouseholdIncome) : 'N/A'; })} bestIndex={bestIdx(states.map((s) => stateEmploymentData[s.id]?.medianHouseholdIncome ?? null), 'max')} />
            <CRow alt label="DoD Contractor Presence" values={states.map((s) => stateEmploymentData[s.id]?.defenseContractorPresence ?? 'N/A')} />
            <CRow label="Top Industries" values={states.map((s) => stateEmploymentData[s.id]?.topIndustries.slice(0, 3).join(', ') ?? 'N/A')} />
          </View>
        </View>

        {/* ── Climate Table ── */}
        <View style={S.section}>
          <Text style={S.sectionTitle}>Climate & Natural Disaster Risk</Text>
          <View style={[S.dataTable, { overflow: 'hidden', borderRadius: 5 }]}>
            <View style={S.compTableHeader}>
              <Text style={S.compTableHeaderCellLeft}>Metric</Text>
              {states.map((s) => <Text key={s.id} style={S.compTableHeaderCell}>{s.abbreviation}</Text>)}
            </View>

            {/* Climate rows */}
            <SectionRow label="Climate" />
            <CRow label="Summer High (July avg)" values={states.map((s) => { const c = stateClimateData[s.id]; return c ? c.avgSummerHighF + '°F' : 'N/A'; })} />
            <CRow alt label="Winter Low (Jan avg)" values={states.map((s) => { const c = stateClimateData[s.id]; return c ? c.avgWinterLowF + '°F' : 'N/A'; })} />
            <CRow label="Humidity" values={states.map((s) => stateClimateData[s.id]?.humidity ?? 'N/A')} />
            <CRow alt label="Annual Rainfall" values={states.map((s) => { const c = stateClimateData[s.id]; return c ? c.annualRainfallInches + '"' : 'N/A'; })} />

            {/* Disaster risk rows */}
            <SectionRow label="Natural Disaster Risk" />
            {(['hurricane', 'wildfire', 'flood', 'tornado', 'earthquake', 'winterStorm'] as const).map((risk, i) => (
              <CRow
                key={risk}
                alt={i % 2 === 1}
                label={risk === 'winterStorm' ? 'Winter Storm' : risk.charAt(0).toUpperCase() + risk.slice(1)}
                values={states.map((s) => {
                  const c = stateClimateData[s.id];
                  return c ? c.disasterRisk[risk] : 'N/A';
                })}
              />
            ))}
          </View>
          <Text style={{ fontSize: 7, color: C.slate400, marginTop: 4 }}>
            Climate data: NOAA (1991–2020). Disaster risk: FEMA National Risk Index.
          </Text>
        </View>

        {/* ── Disclaimer ── */}
        <View style={[S.section, { backgroundColor: C.slate50, borderWidth: 0.5, borderColor: C.slate200, borderRadius: 5, padding: 10 }]} wrap={false}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={{ fontSize: 7.5, color: C.slate500, lineHeight: 1.5 }}>
              This report is for informational purposes only. Tax laws, veteran benefits, and state policies change frequently. Always verify with official sources. Costs are estimates based on state averages. Generated {generated} ·{' '}
            </Text>
            <Link src="https://milretired.com">
              <Text style={{ fontSize: 7.5, color: C.blue }}>milretired.com</Text>
            </Link>
          </View>
        </View>

        <PageFooter generated={generated} />
      </Page>
    </Document>
  );
}
