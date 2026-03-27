import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { Shield, TrendingDown, Heart, MapPin } from 'lucide-react';

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

export default function Landing() {
  const navigate = useNavigate();
  const prefs = loadPrefs();
  const [retirementIncome, setRetirementIncome] = useState<number>(prefs.retirementIncome ?? 60000);
  const [disabilityRating, setDisabilityRating] = useState<string>(prefs.disabilityRating ?? '');
  const [preferredRegion, setPreferredRegion] = useState<string>(prefs.preferredRegion ?? '');

  const [isLoading, setIsLoading] = useState(false);
  const loadingMessages = ['Analyzing your profile…', 'Crunching 50 states…', 'Ranking your results…'];
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0]);
  const msgIndex = useRef(0);

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
      navigate('/dashboard', {
        state: { retirementIncome, disabilityRating, preferredRegion },
      });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-blue-600" />
            <h1 className="font-semibold text-xl">Military Retirement Advisor</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4">
            Choose Where Your
            <br />
            Retirement Works for You
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Compare all 50 states based on taxes, benefits, and quality of life. Make an informed
            decision about where to live after service.
          </p>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingDown className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Tax Analysis</h3>
            <p className="text-slate-600">
              Compare state income taxes, property taxes, and military pension exemptions across all
              50 states.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Veteran Benefits</h3>
            <p className="text-slate-600">
              See VA facilities, veteran populations, and state-specific benefits available to you.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Cost of Living</h3>
            <p className="text-slate-600">
              Understand how far your retirement income will go in each state with detailed cost
              comparisons.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-slate-200">
          <h3 className="text-2xl font-semibold mb-6">Get Your Personalized Comparison</h3>

          <div className="space-y-6">
            {/* Retirement Income */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="income">Annual Retirement Income</Label>
                <span className="font-semibold text-blue-600">
                  ${retirementIncome.toLocaleString()}
                </span>
              </div>
              <Slider
                id="income"
                min={20000}
                max={150000}
                step={5000}
                value={[retirementIncome]}
                onValueChange={(value) => { setRetirementIncome(value[0]); savePrefs({ retirementIncome: value[0] }); }}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>$20,000</span>
                <span>$150,000</span>
              </div>
            </div>

            {/* Disability Rating */}
            <div className="space-y-2">
              <Label htmlFor="disability">VA Disability Rating (Optional)</Label>
              <Select value={disabilityRating} onValueChange={(v) => { setDisabilityRating(v); savePrefs({ disabilityRating: v }); }}>
                <SelectTrigger id="disability">
                  <SelectValue placeholder="Select if applicable" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="10">10%</SelectItem>
                  <SelectItem value="20">20%</SelectItem>
                  <SelectItem value="30">30%</SelectItem>
                  <SelectItem value="40">40%</SelectItem>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="60">60%</SelectItem>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                  <SelectItem value="100">100%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Preferred Region */}
            <div className="space-y-2">
              <Label htmlFor="region">Preferred Region (Optional)</Label>
              <Select value={preferredRegion} onValueChange={(v) => { setPreferredRegion(v); savePrefs({ preferredRegion: v }); }}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Any region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any Region</SelectItem>
                  <SelectItem value="northeast">Northeast</SelectItem>
                  <SelectItem value="southeast">Southeast</SelectItem>
                  <SelectItem value="midwest">Midwest</SelectItem>
                  <SelectItem value="southwest">Southwest</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CTA Button */}
            <Button
              onClick={handleCompare}
              disabled={isLoading}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <span className="inline-block w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                  {loadingMsg}
                </span>
              ) : (
                'Compare States'
              )}
            </Button>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Trusted by thousands of retiring service members
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="font-semibold text-2xl text-blue-600">50</div>
              <div className="text-slate-600">States Covered</div>
            </div>
            <div>
              <div className="font-semibold text-2xl text-blue-600">100+</div>
              <div className="text-slate-600">Data Points</div>
            </div>
            <div>
              <div className="font-semibold text-2xl text-blue-600">2026</div>
              <div className="text-slate-600">Updated Data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
