# Military Retirement Advisor — CLAUDE.md

## Project Vision

This is the **ultimate hub for service members and their families** planning military retirement and transition. The goal is to go beyond a simple state-comparison tool and become the single trusted resource covering every dimension of military retirement: financial planning, benefits navigation, career transition, relocation decisions, and timeline management.

Target users:
- Active duty members 12–36 months from retirement (E-6 through O-6 range)
- Recently retired service members and their spouses
- Military families evaluating relocation options

The tone is **trustworthy, practical, and direct** — this audience has zero patience for fluff. Every feature should answer a real question or solve a real problem they face during transition.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 (via `peerDependencies`) |
| Build | Vite 6 + `@vitejs/plugin-react` |
| Language | TypeScript |
| Routing | React Router 7 (`createBrowserRouter`) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite` plugin) |
| Components | shadcn/ui (Radix UI primitives) + Material UI 7 |
| Icons | Lucide React + MUI Icons |
| Charts | Recharts 2 |
| Animation | Motion (Framer Motion v12) |
| Forms | React Hook Form 7 |
| Notifications | Sonner |
| Drag & Drop | React DnD 16 |
| Date Utilities | date-fns 3 |

**Key import alias:** `@` maps to `./src`

---

## Directory Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/              # shadcn/ui primitives — do not modify directly
│   │   ├── figma/           # Figma-exported components — treat as reference only
│   │   ├── BudgetCustomizerPanel.tsx
│   │   ├── ComparisonDrawer.tsx
│   │   ├── ComparisonMap.tsx
│   │   ├── FinancialRealityBanner.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── MapView.tsx
│   │   ├── StateCard.tsx
│   │   └── StateTable.tsx
│   ├── pages/
│   │   ├── Landing.tsx        # Route: /
│   │   ├── Dashboard.tsx      # Route: /dashboard
│   │   ├── StateDetail.tsx    # Route: /state/:stateId
│   │   ├── ComparisonPage.tsx # Route: /compare
│   │   └── Sources.tsx        # Route: /sources
│   ├── data/
│   │   ├── stateData.ts       # All 50 states — StateData interface + statesData array
│   │   ├── financialReality.ts # Financial calculation engine — calculateFinancialReality()
│   │   ├── vaRates.ts         # VA disability rate tables + getVAMonthlyPay() + combineRatings()
│   │   ├── financialData.ts   # Per-state financial data (property tax, insurance, utilities)
│   │   ├── housingData.ts     # Per-state housing data (rent, home price trends)
│   │   ├── climateData.ts     # Per-state climate data (temps, rainfall, disaster risks)
│   │   ├── employmentData.ts  # Per-state employment data (unemployment, job growth, industries)
│   │   └── vaFacilityLocations.ts # VA facility coordinates for map
│   ├── routes.tsx             # createBrowserRouter config
│   └── App.tsx                # RouterProvider root
├── imports/
│   └── pasted_text/           # Raw reference material (markdown, notes)
├── styles/
│   ├── index.css
│   ├── fonts.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx
```

**New pages** go in `src/app/pages/`. **New reusable components** go in `src/app/components/`. **New data files** go in `src/app/data/`.

---

## Routing

Routes are defined in `src/app/routes.tsx` using `createBrowserRouter`. Add new top-level routes there.

Current routes:
```
/                    → Landing.tsx
/dashboard           → Dashboard.tsx
/state/:stateId      → StateDetail.tsx
/compare             → ComparisonPage.tsx
/sources             → Sources.tsx
```

Planned routes to add as features are built:
```
/calculator          → Retirement pay calculator (High-3 vs BRS)
/checklist           → Transition timeline & checklist
/benefits            → Benefits hub (TRICARE, VA healthcare, education, home loan)
/careers             → Career transition resources
/resources           → Curated resource directory
/tools               → Financial tools (TSP planner, VA disability estimator)
```

---

## Data Model

### StateData (`src/app/data/stateData.ts`)

```typescript
interface StateData {
  id: string;                              // lowercase hyphenated, e.g. 'new-york'
  name: string;                            // Full state name
  abbreviation: string;                    // 2-letter, e.g. 'NY'
  militaryPensionTax: 'Yes' | 'No' | 'Partial';
  stateIncomeTax: number;                  // Percentage, e.g. 5.75
  propertyTaxLevel: 'Low' | 'Medium' | 'High';
  costOfLivingIndex: number;               // ~85–125, national avg = 100
  veteranBenefitsScore: number;            // 0–100
  retirementScore: number;                 // Base score 0–100
  salesTax: number;                        // Percentage
  militaryBenefits: string[];              // Bulleted benefit descriptions
  vaFacilities: number;                    // Count of VA medical facilities
  veteranPopulation: number;               // Total veteran count in state
  pros: string[];
  cons: string[];
  avgHomeCost: number;                     // Median home price in dollars
  coordinates: { x: number; y: number };   // Grid map position (0–100 scale)
}
```

When adding new data fields to `StateData`, update the interface first, then populate all 50 states. Never leave a required field undefined on any state entry.

### Scoring Algorithm

```typescript
// Dynamic score based on user-weighted priorities
calculateCustomScore(state, weights) {
  taxScore    = pension === 'No' ? 100 : pension === 'Partial' ? 60 : 20
  costScore   = Math.max(0, 200 - costOfLivingIndex)  // ~75–115 range
  benefitsScore = veteranBenefitsScore

  weighted = (taxScore * weights.taxes + costScore * weights.cost + benefitsScore * weights.benefits)
           / (weights.taxes + weights.cost + weights.benefits)

  return Math.round(weighted)
}
```

Default weights: taxes 40%, cost 30%, benefits 30%.

---

## Financial Calculation Engine (`src/app/data/financialReality.ts`)

`calculateFinancialReality(state, inputs, profile)` is the core function used on every page that shows financial breakdowns. It returns a `FinancialBreakdown` with full monthly income/expense itemization.

```typescript
interface FinancialInputs {
  retirementIncome: number;        // Annual military pension ($)
  disabilityRating: string;        // '10'–'100', 'none', or ''
  secondaryIncome?: SecondaryIncomeSource[];
  hasSpouse?: boolean;             // Affects VA disability pay at 30%+
  dependentChildren?: number;      // Count of children under 18
}
```

Key rules:
- VA disability pay is **always federally tax-exempt** — never apply state tax to it
- Military pension tax varies by state (`militaryPensionTax`: No / Partial / Yes)
- Secondary income is taxed at the full state income tax rate
- `hasSpouse` and `dependentChildren` are synced from Budget Customizer household members (adult/senior → spouse, under-18 age groups → child)

---

## VA Disability Rates (`src/app/data/vaRates.ts`)

Single source of truth for all VA disability compensation. **Update this file each year when the VA publishes new COLA rates.**

```typescript
getVAMonthlyPay(rating, hasSpouse, dependentChildren) → number
combineRatings(ratings[]) → number   // 38 CFR §4.25 whole-person formula
```

Rate tables exported: `VA_RATE_ALONE`, `VA_RATE_WITH_SPOUSE`, `VA_RATE_WITH_SPOUSE_ONE_CHILD`, `VA_RATE_ADDITIONAL_CHILD`, `VA_RATE_CHILD_NO_SPOUSE`.

**Policy:** Dependent supplements only apply at 30%+. 10% and 20% ratings pay the same regardless of family size.

Source: VA.gov official published rates, effective December 1, 2025 (2.8% COLA). URL: va.gov/disability/compensation-rates/veteran-rates/. Reference: 38 CFR Part 3 (compensation amounts), 38 CFR §4.25 (combined ratings formula).

---

## localStorage Keys

User data persists across navigation via these keys:

| Key | Value | Set by |
|---|---|---|
| `origin-state-id` | Current state abbreviation | Landing |
| `origin-retirement-income` | Annual pension $ | Landing / Dashboard header |
| `origin-disability-rating` | `'10'`–`'100'` or `'none'` | Landing / Dashboard header |
| `origin-family-members` | JSON array of `LandingMember[]` | Landing |
| `origin-secondary-income` | JSON array of `SecondaryIncomeSource[]` | Landing |
| `origin-has-spouse` | `'true'` / `'false'` | Landing, Budget Customizer |
| `origin-dependent-children` | Number string | Landing, Budget Customizer |
| `budget-profile` | JSON `UserCostProfile` | Budget Customizer |
| `comparison-favorites` | JSON string[] of state IDs | Dashboard |
| `excluded-states` | JSON string[] of state IDs | Dashboard filters |
| `landing-preferences` | JSON blob of Landing form state | Landing |

---

## Component Conventions

- **shadcn/ui components** live in `src/app/components/ui/`. Import them from `@/app/components/ui/<name>`. Do not rewrite these — they are managed primitives.
- **Feature components** are colocated in `src/app/components/` until they grow complex enough to warrant a subfolder.
- **Page components** handle routing, layout, and data orchestration only — keep business logic and UI out of pages when possible.
- Prefer **composition over abstraction** — three similar JSX blocks beats a premature wrapper component.
- Use **Lucide React** for icons by default. Fall back to MUI Icons only if the icon doesn't exist in Lucide.

### Animation Pattern

Use `motion/react` (Framer Motion v12). For animating table rows, use `motion.tr` directly — **do not** use `motion(TableRow)` because `TableRow` doesn't forward refs and the animation will get stuck at `opacity: 0`.

```tsx
const MotionTr = motion.tr;
// ...
<MotionTr
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
  className="border-b hover:bg-slate-50 transition-colors"
>
```

Tab content transitions use `motion.div` with `initial={{ opacity: 0, y: 8 }}`.

---

## Styling Conventions

- **Tailwind CSS 4** is the primary styling method. Use utility classes directly in JSX.
- Use `cn()` (from `@/lib/utils` via `clsx` + `tailwind-merge`) when composing conditional class strings.
- Avoid inline `style={{}}` except for computed values that can't be expressed in Tailwind (e.g., dynamic widths from a slider value).
- Color semantics used in the existing UI:
  - Score ≥ 90: green (`text-green-600`, `bg-green-100`)
  - Score 80–89: blue (`text-blue-600`, `bg-blue-100`)
  - Score 70–79: yellow (`text-yellow-600`, `bg-yellow-100`)
  - Score < 70: gray (`text-gray-500`, `bg-gray-100`)
  - Tax-Free pension: green badge
  - Partial pension: yellow badge
  - Taxed pension: red badge
- Dark mode is supported via `next-themes`. Use `dark:` variants in Tailwind classes.
- Sortable data tables: do **not** use `table-fixed` or `<colgroup>` — let the browser size columns naturally. Use `whitespace-nowrap` on headers and rely on the container's `overflow-x-auto` for any overflow.

---

## Planned Features Roadmap

The phases below represent a suggested build order, not a strict sequence. Jump to any feature at any time — phases are for reference and tracking, not enforcement. Each section will be fleshed out as we build.

### Phase 1 — Core Financial Tools
- [ ] **Retirement Pay Calculator** — High-3 vs BRS comparison, years of service slider, rank selector, monthly/annual output. Include SBP cost toggle.
- [x] **VA Disability Estimator** — `getVAMonthlyPay()` + `combineRatings()` are built in `vaRates.ts`. Dependent-aware rates (spouse, children) are wired throughout the app. A dedicated calculator UI page is still to be built.
- [ ] **TSP Withdrawal Planner** — Balance input, withdrawal strategy options (RMD, fixed %, fixed $), projected timeline.

### Phase 2 — Transition Planning
- [ ] **Transition Checklist** — Timeline organized by months before retirement: 24mo, 18mo, 12mo, 6mo, 3mo, 1mo, day-of, post-retirement. Checkbox state persisted in localStorage.
- [ ] **Benefits Hub** — TRICARE plan comparison (Prime vs Select vs For Life), VA healthcare enrollment, GI Bill/education benefits overview, VA Home Loan guide.

### Phase 3 — Career & Community
- [ ] **Career Transition** — SkillBridge program overview and search, federal hiring preference (5/10 point), veteran-friendly employer highlights, civilian resume tips.
- [ ] **Resource Directory** — Curated links to VA.gov, milConnect, MyArmyBenefits, TSP.gov, MilTax, VSO finder, base legal assistance.

### Phase 4 — Enhanced State Data
- [x] Add nearby military installations per state
- [ ] Add school district quality data
- [ ] Add healthcare system ratings per state
- [x] Improve map to use actual SVG US map instead of grid

### Phase 5 — Personalization
- [ ] User profile: rank, years of service, branch, retirement date, disability rating
- [ ] Saved state favorites persisted across sessions (localStorage)
- [ ] Personalized score adjustments based on profile inputs

---

## Data Accuracy & Sourcing

This site is used by real people making major financial and life decisions. Data accuracy is critical.

- State tax data should reflect the current tax year (2026). Cite the source in a comment when adding or updating a state's data.
- VA disability compensation rates come from the VA's annual COLA adjustments. All dollar values live in `src/app/data/vaRates.ts` — update that file each year.
- Military retirement pay formulas come from DoD Financial Management Regulation (FMR).
- When in doubt, link to the official government source rather than presenting uncertain data as fact.
- Always note the data year prominently in the UI (currently shown as "2026 Updated Data" on landing page — keep this current).

---

## Development Workflow

```bash
npm i           # Install dependencies
npm run dev     # Start Vite dev server (localhost:5173)
npm run build   # Production build
npx ai-codex    # Regenerate .ai-codex/ codebase index (run after significant changes)
```

**No test framework is configured yet.** When adding one, prefer Vitest (already implied by Vite stack) + React Testing Library.

**No linter/formatter is configured yet.** When adding, use ESLint + Prettier with the standard React/TypeScript config.

---

## Things to Avoid

- Do not add backend infrastructure or database dependencies — this is a static/client-only site. State should live in React state, URL params, or localStorage.
- Do not modify files in `src/app/components/ui/` directly — these are shadcn/ui managed components. Extend them via wrapper components if needed.
- Do not use `src/app/components/figma/` as a model for new components — these are Figma exports and may not follow the project's conventions.
- Do not use MUI for new layout or page-level components — prefer Tailwind + shadcn/ui. MUI should remain confined to existing usages.
- Do not hardcode dollar amounts or tax rates in component JSX — they belong in `src/app/data/`. VA disability dollar values specifically belong in `src/app/data/vaRates.ts`.
- Do not add npm packages without checking if an existing dependency already covers the need. The project is already well-stocked with UI utilities.
- Do not store sensitive user information (SSN, DOD ID, etc.) — this is a public advisory tool, not an authenticated service.
- Do not use `motion(TableRow)` for animated table rows — use `motion.tr` directly (see Animation Pattern above).

---

## Codebase Index

Pre-built index files are in `.ai-codex/`. Read these FIRST before exploring the codebase:
- `.ai-codex/lib.md` — library exports (data utilities, helper functions)
