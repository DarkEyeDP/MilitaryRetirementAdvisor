import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { GaugeDotSlider } from '../components/GaugeDotSlider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Plus, X, Briefcase } from 'lucide-react';
import { SiteLogo } from '../components/ui/SiteLogo';
import { WhatsNewModal } from '../components/WhatsNewModal';
import { statesData } from '../data/stateData';
import { DATA_YEAR } from '../data/siteConfig';
import type { AgeGroup, SecondaryIncomeSource } from '../data/financialReality';
import { AGE_GROUP_LABELS } from '../data/financialReality';

const LS_KEY = 'landing-preferences';

function loadPrefs() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePrefs(patch: Record<string, unknown>) {
  try {
    const current = loadPrefs();
    localStorage.setItem(LS_KEY, JSON.stringify({ ...current, ...patch }));
  } catch { /* storage unavailable */ }
}

export type MemberRole = 'spouse' | 'child' | 'parent';

export interface LandingMember {
  id: string;
  role: MemberRole;
  ageGroup: AgeGroup;
}

const ROLE_LABELS: Record<MemberRole, string> = {
  spouse: 'Spouse',
  child: 'Child',
  parent: 'Dependent Parent',
};

const ROLE_AGE_OPTIONS: Record<MemberRole, AgeGroup[]> = {
  spouse: ['adult', 'senior'],
  child: ['under6', '6to12', '13to18', 'adult'],
  parent: ['adult', 'senior'],
};

const ROLE_DEFAULT_AGE: Record<MemberRole, AgeGroup> = {
  spouse: 'adult',
  child: '6to12',
  parent: 'senior',
};

const ROLE_COLORS: Record<MemberRole, string> = {
  spouse: 'bg-blue-100 text-blue-700',
  child: 'bg-green-100 text-green-700',
  parent: 'bg-purple-100 text-purple-700',
};

const statesSorted = [...statesData].sort((a, b) => a.name.localeCompare(b.name));

let _idCounter = 0;
const nextId = () => `m_${++_idCounter}_${Date.now()}`;

export default function Landing() {
  const navigate = useNavigate();
  const prefs = loadPrefs();

  const [userType, setUserType] = useState<'retiree' | 'separating'>(prefs.userType ?? 'retiree');
  const [retirementIncome, setRetirementIncome] = useState<number>(prefs.retirementIncome ?? 60000);
  const [disabilityRating, setDisabilityRating] = useState<string>(prefs.disabilityRating ?? '');
  const [currentStateId, setCurrentStateId] = useState<string>(prefs.currentStateId ?? '');
  const [familyMembers, setFamilyMembers] = useState<LandingMember[]>(prefs.familyMembers ?? []);
  const [secondaryIncome, setSecondaryIncome] = useState<SecondaryIncomeSource[]>(prefs.secondaryIncome ?? []);

  const addSecondarySource = (label: string) => {
    const next = [...secondaryIncome, { id: nextId(), label, annualAmount: 30000 }];
    setSecondaryIncome(next);
    savePrefs({ secondaryIncome: next });
  };
  const updateSecondaryAmount = (id: string, annualAmount: number) => {
    const next = secondaryIncome.map((s) => s.id === id ? { ...s, annualAmount } : s);
    setSecondaryIncome(next);
    savePrefs({ secondaryIncome: next });
  };
  const removeSecondarySource = (id: string) => {
    const next = secondaryIncome.filter((s) => s.id !== id);
    setSecondaryIncome(next);
    savePrefs({ secondaryIncome: next });
  };
  const hasSpouseIncome = secondaryIncome.some((s) => s.label === 'Spouse income');

  const [isLoading, setIsLoading] = useState(false);
  const loadingMessages = ['Analyzing your profile…', 'Crunching 50 states, DC & territories…', 'Ranking your results…'];
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);
  const msgIndex = useRef(0);

  const hasSpouse = familyMembers.some((m) => m.role === 'spouse');
  const currentStateName = statesData.find((s) => s.id === currentStateId)?.name;
  const hasSchoolKids = familyMembers.some((m) => ['6to12', '13to18'].includes(m.ageGroup));

  const addMember = (role: MemberRole) => {
    const member: LandingMember = { id: nextId(), role, ageGroup: ROLE_DEFAULT_AGE[role] };
    setFamilyMembers((prev) => {
      const next = [...prev, member];
      savePrefs({ familyMembers: next });
      return next;
    });
  };

  const removeMember = (id: string) => {
    setFamilyMembers((prev) => {
      const next = prev.filter((m) => m.id !== id);
      savePrefs({ familyMembers: next });
      return next;
    });
  };

  const updateMemberAge = (id: string, ageGroup: AgeGroup) => {
    setFamilyMembers((prev) => {
      const next = prev.map((m) => (m.id === id ? { ...m, ageGroup } : m));
      savePrefs({ familyMembers: next });
      return next;
    });
  };

  const handleCompare = () => {
    setIsLoading(true);
    setLoadingMsg(loadingMessages[0]);
    msgIndex.current = 0;

    const interval = setInterval(() => {
      msgIndex.current += 1;
      if (msgIndex.current < loadingMessages.length) {
        setLoadingMsg(loadingMessages[msgIndex.current]);
      }
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      localStorage.setItem('origin-user-type', userType);
      if (currentStateId) {
        localStorage.setItem('origin-state-id', currentStateId);
        localStorage.setItem('origin-retirement-income', String(retirementIncome));
      } else {
        localStorage.removeItem('origin-state-id');
        localStorage.removeItem('origin-retirement-income');
      }
      const hasSpouse = familyMembers.some(m => m.role === 'spouse');
      const dependentChildren = familyMembers.filter(m => m.role === 'child').length;
      localStorage.setItem('origin-disability-rating', disabilityRating || 'none');
      localStorage.setItem('origin-family-members', JSON.stringify(familyMembers));
      localStorage.setItem('origin-secondary-income', JSON.stringify(secondaryIncome));
      localStorage.setItem('origin-has-spouse', String(hasSpouse));
      localStorage.setItem('origin-dependent-children', String(dependentChildren));
      navigate('/dashboard', {
        state: { userType, retirementIncome, disabilityRating, currentStateId, familyMembers, secondaryIncome, hasSpouse, dependentChildren },
      });
    }, 1200);
  };

  const form = (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6">
      <h3 className="text-xl font-semibold mb-5">Get Your Personalized Comparison</h3>

      <div className="space-y-4">

        {/* Income */}
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Your Finances</p>

          {/* User type toggle */}
          <div className="flex gap-2 mb-4">
            {(['retiree', 'separating'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => { setUserType(type); savePrefs({ userType: type }); }}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${
                  userType === type
                    ? 'bg-blue-700 text-white border-blue-700'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {type === 'retiree' ? 'Retiring (Pension)' : 'Separating (EAS/ETS)'}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="income" className="text-sm">
                {userType === 'retiree' ? 'Annual Retirement Income' : 'Expected Annual Income'}
              </Label>
              <div className="text-right">
                <span className="font-semibold text-blue-600 text-sm">${retirementIncome.toLocaleString()}</span>
                <span className="text-xs text-slate-400 ml-1.5">${Math.round(retirementIncome / 12).toLocaleString()}/mo</span>
              </div>
            </div>
            <GaugeDotSlider
              id="income"
              min={0}
              max={250000}
              step={1000}
              value={[retirementIncome]}
              onValueChange={(value: number[]) => { setRetirementIncome(value[0]); savePrefs({ retirementIncome: value[0] }); }}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>$0</span>
              <span>$250,000</span>
            </div>
          </div>
        </div>

        {/* Disability + Current State — side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="disability" className="text-xs">
              VA Disability <span className="text-slate-400 text-xs font-normal normal-case tracking-normal">(Optional)</span>
            </Label>
            <Select value={disabilityRating} onValueChange={(v) => { setDisabilityRating(v); savePrefs({ disabilityRating: v }); }}>
              <SelectTrigger id="disability" className="h-9 text-base md:text-sm"><SelectValue placeholder="Select rating" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                {['10','20','30','40','50','60','70','80','90','100'].map((r) => (
                  <SelectItem key={r} value={r}>{r}%</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="currentState" className="text-xs">
              Current State <span className="text-slate-400 text-xs font-normal normal-case tracking-normal">(Optional)</span>
            </Label>
            <Select
              value={currentStateId}
              onValueChange={(v) => { setCurrentStateId(v === 'none' ? '' : v); savePrefs({ currentStateId: v === 'none' ? '' : v }); }}
            >
              <SelectTrigger id="currentState" className="h-9 text-base md:text-sm"><SelectValue placeholder="Where you live" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Not specified</SelectItem>
                {statesSorted.map((s) => (
                  <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {currentStateName && (
          <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
            We&apos;ll show your estimated annual tax savings for each state vs. staying in {currentStateName}.
          </p>
        )}

        <div className="border-t border-slate-100" />

        {/* Family */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Your Family <span className="text-slate-400 text-xs font-normal normal-case tracking-normal">(Optional)</span></p>
            {familyMembers.length > 0 && (
              <span className="text-xs text-slate-400">{familyMembers.length} member{familyMembers.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {familyMembers.length > 0 && (
            <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">
              {familyMembers.map((member) => (
                <div key={member.id} className="flex items-center gap-1.5 p-1.5 bg-slate-50 rounded-lg border border-slate-100 min-w-0">
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded shrink-0 ${ROLE_COLORS[member.role]}`}>
                    {ROLE_LABELS[member.role]}
                  </span>
                  <Select
                    value={member.ageGroup}
                    onValueChange={(v) => updateMemberAge(member.id, v as AgeGroup)}
                  >
                    <SelectTrigger className="h-6 flex-1 text-base md:text-xs border-0 bg-transparent p-0 min-w-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLE_AGE_OPTIONS[member.role].map((ag) => (
                        <SelectItem key={ag} value={ag}>{AGE_GROUP_LABELS[ag]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeMember(member.id)}
                    className="h-6 w-6 p-0 text-slate-300 hover:text-red-500 shrink-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => addMember('spouse')} disabled={hasSpouse} className="gap-1 text-xs h-7">
              <Plus className="w-3 h-3" />Spouse
            </Button>
            <Button variant="outline" size="sm" onClick={() => addMember('child')} className="gap-1 text-xs h-7">
              <Plus className="w-3 h-3" />Child
            </Button>
            <Button variant="outline" size="sm" onClick={() => addMember('parent')} className="gap-1 text-xs h-7">
              <Plus className="w-3 h-3" />Dependent Parent
            </Button>
          </div>

          {hasSchoolKids && (
            <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
              School-age children detected — education benefits will be weighted higher in your rankings.
            </p>
          )}
        </div>

        <div className="border-t border-slate-100" />

        {/* Secondary Income */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium">Additional Income <span className="text-slate-400 text-xs font-normal normal-case tracking-normal">(Optional)</span></p>
            {secondaryIncome.length > 0 && (
              <span className="text-xs text-slate-400">{secondaryIncome.length} source{secondaryIncome.length !== 1 ? 's' : ''}</span>
            )}
          </div>

          {secondaryIncome.length > 0 && (
            <div className="space-y-1.5">
              {secondaryIncome.map((src) => (
                <div key={src.id} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-xs font-medium text-slate-600 shrink-0 w-24 truncate">{src.label}</span>
                  <div className="flex items-center gap-1 flex-1 min-w-0">
                    <span className="text-xs text-slate-400">$</span>
                    <input
                      type="number"
                      min={0}
                      max={50000}
                      step={100}
                      defaultValue={Math.round(src.annualAmount / 12)}
                      key={src.id}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '' || val === '-') return;
                        const n = parseFloat(val);
                        if (!isNaN(n)) updateSecondaryAmount(src.id, n * 12);
                      }}
                      className="w-full text-base md:text-xs font-semibold text-slate-800 bg-transparent border-b border-slate-200 focus:border-blue-400 focus:outline-none"
                    />
                    <span className="text-xs text-slate-400 shrink-0">/mo</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => removeSecondarySource(src.id)} className="h-5 w-5 p-0 text-slate-300 hover:text-red-500 shrink-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={() => addSecondarySource('Income')} className="gap-1 text-xs h-7">
              <Plus className="w-3 h-3" />Income
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSecondarySource('Spouse income')} disabled={hasSpouseIncome} className="gap-1 text-xs h-7">
              <Plus className="w-3 h-3" />Spouse income
            </Button>
            <Button variant="outline" size="sm" onClick={() => addSecondarySource('Rental income')} className="gap-1 text-xs h-7">
              <Plus className="w-3 h-3" />Rental income
            </Button>
          </div>

          {secondaryIncome.length > 0 && (
            <p className="text-xs text-slate-400 bg-slate-50 rounded-lg px-3 py-2">
              Additional income is taxed at the full state income tax rate — no military exemptions apply.
            </p>
          )}
        </div>

        <div className="border-t border-slate-100" />

        {/* Submit */}
        <div>
          <Button onClick={handleCompare} disabled={isLoading} className="h-9 px-6 w-full">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                {loadingMsg}
              </span>
            ) : (
              'Compare States'
            )}
          </Button>
        </div>

      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <WhatsNewModal />
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center">
          <div className="flex items-center gap-2">
            <SiteLogo className="w-8 h-8" />
            <h1 className="font-semibold text-xl">Military Retirement Advisor</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Desktop: two-column layout, vertically centered in remaining viewport */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_480px] lg:gap-14 lg:items-start lg:pt-16 lg:pb-12">

          {/* Left: hero + features + stats */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl xl:text-5xl font-bold text-slate-900 leading-tight mb-4">
                Choose Where Your<br />Retirement Works for You
              </h2>
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed">
                Whether you&apos;re retiring or separating, compare all 50 states, DC & territories on taxes, benefits, and quality of life to make an informed decision about where to live after service.
              </p>
            </div>

            <div>
              <div className="py-5 border-t border-slate-200/80">
                <h3 className="font-semibold text-slate-900 mb-1">Tax Analysis</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Compare military pension exemptions, income tax rates, property tax levels, and sales tax across all 50 states, DC & territories.</p>
              </div>
              <div className="py-5 border-t border-slate-200/80">
                <h3 className="font-semibold text-slate-900 mb-1">Veteran Benefits</h3>
                <p className="text-sm text-slate-500 leading-relaxed">See VA medical centers, veteran populations, education programs, and state-specific perks ranked for your profile.</p>
              </div>
              <div className="py-5 border-t border-b border-slate-200/80">
                <h3 className="font-semibold text-slate-900 mb-1">Cost of Living</h3>
                <p className="text-sm text-slate-500 leading-relaxed">Understand how far your retirement income goes with COL index, median rent, home prices, and savings vs. your current state.</p>
              </div>
            </div>

            <div className="flex gap-10 text-sm">
              <div>
                <div className="font-bold text-3xl text-blue-600 leading-none mb-1">500+</div>
                <div className="text-slate-500">Data Points</div>
              </div>
              <div>
                <div className="font-bold text-3xl text-blue-600 leading-none mb-1">{DATA_YEAR}</div>
                <div className="text-slate-500">Updated Data</div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          {form}
        </div>

        {/* Mobile: stacked layout */}
        <div className="lg:hidden py-10 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-3">
              Choose Where Your<br />Retirement Works for You
            </h2>
            <p className="text-slate-600 max-w-lg mx-auto">
              Compare all 50 states, DC & territories based on taxes, benefits, and quality of life.
            </p>
          </div>

          {form}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="font-semibold mb-1">Tax Analysis</h3>
              <p className="text-sm text-slate-500">Income, property, and pension exemptions across all 50 states, DC & territories.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="font-semibold mb-1">Veteran Benefits</h3>
              <p className="text-sm text-slate-500">VA facilities, populations, and state-specific benefits.</p>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
              <h3 className="font-semibold mb-1">Cost of Living</h3>
              <p className="text-sm text-slate-500">See how far your retirement income goes in each state.</p>
            </div>
          </div>

          <div className="text-center pb-4">
            <p className="text-slate-500 text-sm mb-3">Trusted by thousands of transitioning service members</p>
            <div className="flex justify-center gap-8 text-sm">
              <div><div className="font-bold text-2xl text-blue-600">500+</div><div className="text-slate-500">Data Points</div></div>
              <div><div className="font-bold text-2xl text-blue-600">{DATA_YEAR}</div><div className="text-slate-500">Updated Data</div></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
