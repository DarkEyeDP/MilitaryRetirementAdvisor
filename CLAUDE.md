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
│   │   ├── ui/                    # shadcn/ui primitives — do not modify directly
│   │   ├── figma/                 # Figma-exported components — treat as reference only
│   │   ├── pdf/                   # React-PDF export components (StatePdfDocument, ComparisonPdfDocument)
│   │   ├── BudgetCustomizerPanel.tsx
│   │   ├── ComparisonDrawer.tsx
│   │   ├── ComparisonMap.tsx
│   │   ├── FinancialRealityBanner.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── Footer.tsx
│   │   ├── MapView.tsx
│   │   ├── StateCard.tsx
│   │   ├── StateTable.tsx
│   │   └── WhatsNewModal.tsx      # One-time "What's New" popup on Landing — versioned via WHATS_NEW_VERSION
│   ├── pages/
│   │   ├── Landing.tsx            # Route: /
│   │   ├── Dashboard.tsx          # Route: /dashboard
│   │   ├── StateDetail.tsx        # Route: /state/:stateId
│   │   ├── ComparisonPage.tsx     # Route: /compare
│   │   ├── Sources.tsx            # Route: /sources
│   │   └── sources/               # Modular source tab components (ScoringTab, HousingTab, etc.)
│   ├── data/
│   │   ├── stateData.ts           # Re-export barrel — imports from ./states/
│   │   ├── states/                # Modularized state data (see State Data section below)
│   │   ├── vaFacilities/          # VA facility locations by region (northeast, south, west, midwest, southwest)
│   │   ├── whatsNew.ts            # What's New modal content — edit this + bump WHATS_NEW_VERSION to push updates
│   │   ├── siteConfig.ts          # DATA_YEAR, LAST_UPDATED, WHATS_NEW_VERSION, DATA_VINTAGES
│   │   ├── financialReality.ts    # Financial calculation engine — calculateFinancialReality()
│   │   ├── vaRates.ts             # VA disability rate tables + getVAMonthlyPay() + combineRatings()
│   │   ├── financialData.ts       # Per-state financial data (property tax, insurance, utilities)
│   │   ├── housingData.ts         # Per-state housing data (rent, home price trends)
│   │   ├── climateData.ts         # Per-state climate data (temps, rainfall, disaster risks)
│   │   ├── employmentData.ts      # Per-state employment data (unemployment, job growth, industries)
│   │   ├── veteranPerksData.ts    # Per-state veteran perks (license plates, education, property tax exemptions)
│   │   ├── militaryInstallations.ts
│   │   ├── spaceATerminals.ts
│   │   └── stateVeteranUrls.ts    # Official veteran services URL per state
│   ├── routes.tsx                 # createBrowserRouter config
│   └── App.tsx                    # RouterProvider root
├── imports/
│   └── pasted_text/               # Raw reference material (markdown, notes)
├── styles/
│   ├── index.css
│   ├── fonts.css
│   ├── tailwind.css
│   └── theme.css
└── main.tsx

public/
├── sitemap.xml                    # Full sitemap — all routes + state pages
├── robots.txt                     # Points crawlers to sitemap
├── CNAME                          # milretired.com
├── favicon.svg
├── emojione-monotone--crayon.png  # Crayon icon used in "Buy Me a Crayon" button
└── flags/                         # State flag images
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
/sitemap             → Sitemap.tsx
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

## State Data (Modularized)

`src/app/data/stateData.ts` is a **re-export barrel only** — do not add data there directly.

All state data lives in `src/app/data/states/`:

| File | Contents |
|---|---|
| `types.ts` | `StateData` interface |
| `scoring.ts` | `DEFAULT_SCORE_WEIGHTS`, `TERRITORY_IDS`, `scoreTier()`, `calculateCustomScore()` |
| `south.ts` | FL TX VA TN NC GA OK AR SC AL MS LA MD WV KY |
| `west.ts` | NV WA AK WY CA AZ CO OR ID MT UT NM HI |
| `midwest.ts` | SD ND MO KS NE IA MN WI MI IL IN OH |
| `northeast.ts` | NH PA NY NJ DE ME VT MA CT RI |
| `territories.ts` | DC PR GU VI AS MP |
| `index.ts` | Assembles `statesData[]` and re-exports everything |

**To edit a state:** open its regional file directly. All existing imports of `stateData.ts` continue to work unchanged.

### StateData Interface

```typescript
interface StateData {
  id: string;                              // lowercase hyphenated, e.g. 'new-york'
  name: string;
  abbreviation: string;                    // 2-letter, e.g. 'NY'
  militaryPensionTax: 'Yes' | 'No' | 'Partial';
  stateIncomeTax: number;                  // Percentage, e.g. 5.75
  propertyTaxLevel: 'Low' | 'Medium' | 'High';
  propertyTaxExemption100: 'Full' | 'Partial' | 'None'; // For 100% disabled veterans
  costOfLivingIndex: number;               // ~82–184, national avg = 100
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

When adding new fields to `StateData`, update `types.ts` first, then populate all entries. Never leave a required field undefined.

### Scoring Algorithm

Lives in `src/app/data/states/scoring.ts`. Also see `src/app/data/veteranScore.ts` for the full veteran benefits score calculation (supports per-capita VA facility mode).

```typescript
calculateCustomScore(state, weights, perCapita?) {
  // Tax Score (0–100): pension exemption + income tax rate + property tax level
  // Cost Score (0–100): COL index mapped to 0–100 (≤82 → 100, ≥160 → 0)
  // Benefits Score (0–100): veteranBenefitsScore from state data
  // weighted average of the three components
}
```

Default weights: taxes 40%, cost 30%, benefits 30%.

**VA facility scoring toggle:** Dashboard filters expose a per-capita mode. When enabled, VA facilities are scored per 100k veterans rather than raw counts. Stored in `localStorage` key `va-scoring-per-capita`.

---

## VA Facility Data

All VA facility map pins live in `src/app/data/vaFacilities/`:

| File | Region |
|---|---|
| `northeast.ts` | PA NY NJ DE MD MA CT RI VT ME NH DC |
| `south.ts` | FL VA NC GA TN SC AL MS LA AR OK KY WV MD |
| `west.ts` | CA WA AK NV AZ CO OR ID MT UT NM WY HI |
| `midwest.ts` | TX MO KS NE IA MN WI MI IL IN OH SD ND |
| `southwest.ts` | TX OK NM AZ (overlap handled) |
| `territories.ts` | PR GU VI AS MP |
| `index.ts` | Merges all into `vaFacilityLocations` keyed by state ID |

Each facility: `{ name, lat, lon, address, phone, type: 'vamc' | 'clinic' }`.

---

## What's New Modal

`src/app/components/WhatsNewModal.tsx` — shown once per visitor on the Landing page. Dismissed state stored in `localStorage` key `whats-new-seen`.

**To push an update to all users:**
1. Edit `src/app/data/whatsNew.ts` — replace `whatsNewEntries[]` and update `whatsNewReleaseLabel`
2. Bump `WHATS_NEW_VERSION` in `src/app/data/siteConfig.ts` (e.g. `'june-2026-v1'`)

Badge types in `whatsNew.ts`: `'new'` (blue) | `'data'` (emerald) | `'improvement'` (slate) | `'fix'` (red).

---

## Financial Calculation Engine (`src/app/data/financialReality.ts`)

`calculateFinancialReality(state, inputs, profile)` is the core function used on every page that shows financial breakdowns. Returns a `FinancialBreakdown` with full monthly income/expense itemization.

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
- `hasSpouse` and `dependentChildren` are synced from Budget Customizer household members

---

## VA Disability Rates (`src/app/data/vaRates.ts`)

Single source of truth for all VA disability compensation. **Update this file each year when the VA publishes new COLA rates.**

```typescript
getVAMonthlyPay(rating, hasSpouse, dependentChildren) → number
combineRatings(ratings[]) → number   // 38 CFR §4.25 whole-person formula
```

**Policy:** Dependent supplements only apply at 30%+. 10% and 20% ratings pay the same regardless of family size.

Source: VA.gov official published rates, effective December 1, 2025 (2.8% COLA). Reference: 38 CFR Part 3, 38 CFR §4.25.

---

## Site Configuration (`src/app/data/siteConfig.ts`)

| Export | Purpose |
|---|---|
| `DATA_YEAR` | Year shown on UI badges (e.g. `'2026'`) |
| `LAST_UPDATED` | Month + year shown in footers (e.g. `'April 2026'`) |
| `WHATS_NEW_VERSION` | Bump to re-show What's New modal for all users |
| `DATA_VINTAGES` | Per-source data currency, shown on Sources page |

---

## localStorage Keys

| Key | Value | Set by |
|---|---|---|
| `origin-state-id` | Current state abbreviation | Landing |
| `origin-retirement-income` | Annual pension $ | Landing / Dashboard |
| `origin-disability-rating` | `'10'`–`'100'` or `'none'` | Landing / Dashboard |
| `origin-family-members` | JSON `LandingMember[]` | Landing |
| `origin-secondary-income` | JSON `SecondaryIncomeSource[]` | Landing |
| `origin-has-spouse` | `'true'` / `'false'` | Landing, Budget Customizer |
| `origin-dependent-children` | Number string | Landing, Budget Customizer |
| `budget-profile` | JSON `UserCostProfile` | Budget Customizer |
| `comparison-favorites` | JSON string[] of state IDs | Dashboard |
| `excluded-states` | JSON string[] of state IDs | Dashboard filters |
| `landing-preferences` | JSON blob of Landing form state | Landing |
| `va-scoring-per-capita` | `'true'` / `'false'` | Dashboard filters |
| `whats-new-seen` | Last seen `WHATS_NEW_VERSION` string | WhatsNewModal |

---

## Component Conventions

- **shadcn/ui components** live in `src/app/components/ui/`. Import from `@/app/components/ui/<name>`. Do not rewrite these.
- **Feature components** are colocated in `src/app/components/` until they grow complex enough to warrant a subfolder.
- **Page components** handle routing, layout, and data orchestration only.
- Prefer **composition over abstraction** — three similar JSX blocks beats a premature wrapper component.
- Use **Lucide React** for icons by default. For icons not in Lucide, use an inline SVG component. Fall back to MUI Icons only for existing usages.

### Animation Pattern

Use `motion/react` (Framer Motion v12). For animating table rows, use `motion.tr` directly — **do not** use `motion(TableRow)` because `TableRow` doesn't forward refs.

```tsx
const MotionTr = motion.tr;
<MotionTr
  initial={{ opacity: 0, y: 6 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.2, delay: i * 0.04, ease: 'easeOut' }}
>
```

Tab content transitions use `motion.div` with `initial={{ opacity: 0, y: 8 }}`.

---

## Styling Conventions

- **Tailwind CSS 4** is the primary styling method.
- Use `cn()` (from `@/lib/utils`) when composing conditional class strings.
- Avoid inline `style={{}}` except for computed values that can't be expressed in Tailwind.
- Color semantics:
  - Score ≥ 95: emerald — Elite
  - Score 85–94: blue — Strong
  - Score 70–84: yellow — Moderate
  - Score < 70: slate — Weak
  - Tax-Free pension: green badge | Partial: amber | Taxed: red
- Sortable data tables: do **not** use `table-fixed` or `<colgroup>`. Use `whitespace-nowrap` on headers and `overflow-x-auto` on the container.

---

## SEO

- Canonical URL: `https://milretired.com/` (trailing slash required — matches Google-selected canonical)
- `public/sitemap.xml` — all routes + all 56 state/territory detail pages. Update when adding new routes.
- `public/robots.txt` — points to sitemap, allows all crawlers
- After deploying changes, submit sitemap in Google Search Console and request indexing on key pages

---

## Planned Features Roadmap

### Phase 1 — Core Financial Tools
- [ ] **Retirement Pay Calculator** — High-3 vs BRS, years of service, rank selector, SBP toggle
- [x] **VA Disability Estimator** — `getVAMonthlyPay()` + `combineRatings()` built; dedicated UI page still to build
- [ ] **TSP Withdrawal Planner** — Balance, withdrawal strategy, projected timeline

### Phase 2 — Transition Planning
- [ ] **Transition Checklist** — Timeline by months-to-retirement, localStorage checkbox state
- [ ] **Benefits Hub** — TRICARE plan comparison, VA healthcare, GI Bill, VA Home Loan

### Phase 3 — Career & Community
- [ ] **Career Transition** — SkillBridge, federal hiring preference, veteran-friendly employers
- [ ] **Resource Directory** — VA.gov, milConnect, MyArmyBenefits, TSP.gov, MilTax, VSO finder

### Phase 4 — Enhanced State Data
- [x] Nearby military installations per state
- [x] Complete VA facility directory (all 50 states + territories)
- [x] 100% disabled veteran property tax exemption per state
- [ ] School district quality data
- [ ] Healthcare system ratings per state

### Phase 5 — Personalization
- [ ] User profile: rank, years of service, branch, retirement date
- [x] Saved state favorites (localStorage)
- [ ] Personalized score adjustments based on profile

---

## Data Accuracy & Sourcing

This site is used by real people making major financial and life decisions. Data accuracy is critical.

- State tax data reflects the current tax year (2026). Cite the official source in a comment when adding or updating state data.
- VA disability compensation rates come from VA's annual COLA adjustments. All dollar values live in `vaRates.ts` — update annually.
- When in doubt, link to the official government source.
- Always note the data year prominently in the UI (`DATA_YEAR` and `LAST_UPDATED` in `siteConfig.ts`).

---

## Development Workflow

```bash
npm i           # Install dependencies
npm run dev     # Start Vite dev server (localhost:5173)
npm run build   # Production build
npx eslint src --ext .ts,.tsx   # Lint check
```

ESLint is configured. Current known warnings: missing `key` props in `ComparisonPage.tsx` (pre-existing), `any` types in `HousingTab.tsx` (pre-existing).

---

## Things to Avoid

- Do not add backend infrastructure or database dependencies — static/client-only site.
- Do not modify files in `src/app/components/ui/` — shadcn/ui managed primitives.
- Do not use `src/app/components/figma/` as a model for new components.
- Do not use MUI for new layout or page-level components — prefer Tailwind + shadcn/ui.
- Do not hardcode dollar amounts or tax rates in JSX — they belong in `src/app/data/`.
- Do not add npm packages without checking existing dependencies first.
- Do not store sensitive user information (SSN, DOD ID, etc.).
- Do not use `motion(TableRow)` for animated rows — use `motion.tr` directly.
- Do not edit `src/app/data/stateData.ts` directly — it is a re-export barrel. Edit the regional file in `src/app/data/states/`.
- Do not update `sitemap.xml` manually for state pages — all state IDs are already included. Only update when adding new top-level routes.

---

## Codebase Index

Pre-built index files are in `.ai-codex/`. Read these FIRST before exploring the codebase:
- `.ai-codex/lib.md` — library exports (data utilities, helper functions)
