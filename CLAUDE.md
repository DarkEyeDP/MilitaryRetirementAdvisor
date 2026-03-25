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
│   │   ├── ComparisonDrawer.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── MapView.tsx
│   │   ├── StateCard.tsx
│   │   └── StateTable.tsx
│   ├── pages/
│   │   ├── Landing.tsx      # Route: /
│   │   ├── Dashboard.tsx    # Route: /dashboard
│   │   └── StateDetail.tsx  # Route: /state/:stateId
│   ├── data/
│   │   └── stateData.ts     # All 50 states — StateData interface + statesData array
│   ├── routes.tsx           # createBrowserRouter config
│   └── App.tsx              # RouterProvider root
├── imports/
│   └── pasted_text/         # Raw reference material (markdown, notes)
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

## Component Conventions

- **shadcn/ui components** live in `src/app/components/ui/`. Import them from `@/app/components/ui/<name>`. Do not rewrite these — they are managed primitives.
- **Feature components** are colocated in `src/app/components/` until they grow complex enough to warrant a subfolder.
- **Page components** handle routing, layout, and data orchestration only — keep business logic and UI out of pages when possible.
- Prefer **composition over abstraction** — three similar JSX blocks beats a premature wrapper component.
- Use **Lucide React** for icons by default. Fall back to MUI Icons only if the icon doesn't exist in Lucide.

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

---

## Planned Features Roadmap

The phases below represent a suggested build order, not a strict sequence. Jump to any feature at any time — phases are for reference and tracking, not enforcement. Each section will be fleshed out as we build.

### Phase 1 — Core Financial Tools
- [ ] **Retirement Pay Calculator** — High-3 vs BRS comparison, years of service slider, rank selector, monthly/annual output. Include SBP cost toggle.
- [ ] **VA Disability Estimator** — Ratings table, combined ratings formula, monthly compensation lookup.
- [ ] **TSP Withdrawal Planner** — Balance input, withdrawal strategy options (RMD, fixed %, fixed $), projected timeline.

### Phase 2 — Transition Planning
- [ ] **Transition Checklist** — Timeline organized by months before retirement: 24mo, 18mo, 12mo, 6mo, 3mo, 1mo, day-of, post-retirement. Checkbox state persisted in localStorage.
- [ ] **Benefits Hub** — TRICARE plan comparison (Prime vs Select vs For Life), VA healthcare enrollment, GI Bill/education benefits overview, VA Home Loan guide.

### Phase 3 — Career & Community
- [ ] **Career Transition** — SkillBridge program overview and search, federal hiring preference (5/10 point), veteran-friendly employer highlights, civilian resume tips.
- [ ] **Resource Directory** — Curated links to VA.gov, milConnect, MyArmyBenefits, TSP.gov, MilTax, VSO finder, base legal assistance.

### Phase 4 — Enhanced State Data
- [ ] Add nearby military installations per state
- [ ] Add school district quality data
- [ ] Add healthcare system ratings per state
- [ ] Improve map to use actual SVG US map instead of grid

### Phase 5 — Personalization
- [ ] User profile: rank, years of service, branch, retirement date, disability rating
- [ ] Saved state favorites persisted across sessions (localStorage)
- [ ] Personalized score adjustments based on profile inputs

---

## Data Accuracy & Sourcing

This site is used by real people making major financial and life decisions. Data accuracy is critical.

- State tax data should reflect the current tax year (2026). Cite the source in a comment when adding or updating a state's data.
- VA disability compensation rates come from the VA's annual COLA adjustments.
- Military retirement pay formulas come from DoD Financial Management Regulation (FMR).
- When in doubt, link to the official government source rather than presenting uncertain data as fact.
- Always note the data year prominently in the UI (currently shown as "2026 Updated Data" on landing page — keep this current).

---

## Development Workflow

```bash
npm i           # Install dependencies
npm run dev     # Start Vite dev server (localhost:5173)
npm run build   # Production build
```

**No test framework is configured yet.** When adding one, prefer Vitest (already implied by Vite stack) + React Testing Library.

**No linter/formatter is configured yet.** When adding, use ESLint + Prettier with the standard React/TypeScript config.

---

## Things to Avoid

- Do not add backend infrastructure or database dependencies — this is a static/client-only site. State should live in React state, URL params, or localStorage.
- Do not modify files in `src/app/components/ui/` directly — these are shadcn/ui managed components. Extend them via wrapper components if needed.
- Do not use `src/app/components/figma/` as a model for new components — these are Figma exports and may not follow the project's conventions.
- Do not use MUI for new layout or page-level components — prefer Tailwind + shadcn/ui. MUI should remain confined to existing usages.
- Do not hardcode dollar amounts or tax rates in component JSX — they belong in `src/app/data/`.
- Do not add npm packages without checking if an existing dependency already covers the need. The project is already well-stocked with UI utilities.
- Do not store sensitive user information (SSN, DOD ID, etc.) — this is a public advisory tool, not an authenticated service.
