# Military Retirement Advisor

The ultimate hub for service members and their families planning military retirement and transition. Compare all 50 states on taxes, cost of living, VA benefits, and quality of life — and get a personalized financial picture based on your actual pension, VA disability rating, and family situation.

**Target audience:** Active duty members 12–36 months from retirement (E-6 through O-6 range), recently retired service members, and military families evaluating relocation options.

---

## Features

- **State comparison** — Score all 50 states across tax friendliness, cost of living, and VA benefits with user-adjustable priority weights
- **Financial Reality** — Personalized monthly income/expense breakdown using actual pension + VA disability rates (dependent-aware per 38 CFR)
- **VA Disability** — Official 2026 VA rates (2.8% COLA), spouse/dependent adjustments at 30%+, combined ratings formula (38 CFR §4.25)
- **Interactive Maps** — Choropleth retirement score map with toggleable VA facilities, military installations, and Space-A terminals
- **State Detail Pages** — Taxes, housing, employment, climate, VA facilities, veteran perks, and official state veteran services link
- **Side-by-side Comparison** — Compare up to 3 states with financial breakdowns and map
- **Budget Customizer** — Override property tax, insurance, utilities, and add custom expenses
- **Veteran Perks** — License/registration benefits, education benefits, and medal/honor benefits per state

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 |
| Build | Vite 6 + `@vitejs/plugin-react` |
| Language | TypeScript |
| Routing | React Router 7 (`createBrowserRouter`) |
| Styling | Tailwind CSS 4 (via `@tailwindcss/vite`) |
| Components | shadcn/ui (Radix UI primitives) + Material UI 7 |
| Icons | Lucide React + MUI Icons |
| Charts | Recharts 2 |
| Animation | Motion (Framer Motion v12) |
| Maps | React-Leaflet + OpenStreetMap + TopoJSON |
| Forms | React Hook Form 7 |
| Notifications | Sonner |
| Drag & Drop | React DnD 16 |
| Date Utilities | date-fns 3 |

> Static/client-only — no backend, no database. All state lives in React state, URL params, or `localStorage`.

---

## Getting Started

```bash
npm install --legacy-peer-deps   # Install dependencies
npm run dev                      # Start dev server → http://localhost:5173
npm run build                    # Production build → dist/
npx ai-codex                     # Regenerate .ai-codex/lib.md codebase index
```

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── ui/                        # shadcn/ui primitives (do not modify directly)
│   │   │   └── SiteLogo.tsx           # Brand shield+star SVG logo
│   │   ├── pdf/                       # PDF export components (@react-pdf/renderer)
│   │   │   ├── StatePdfDocument.tsx   # State detail report
│   │   │   ├── ComparisonPdfDocument.tsx
│   │   │   ├── GaugeSvg.tsx
│   │   │   └── pdfStyles.ts
│   │   ├── FinancialRealityBanner.tsx
│   │   ├── FilterPanel.tsx
│   │   ├── MapView.tsx
│   │   ├── ComparisonMap.tsx
│   │   ├── StateCard.tsx
│   │   ├── StateTable.tsx
│   │   ├── BudgetCustomizerPanel.tsx
│   │   └── ComparisonDrawer.tsx
│   ├── pages/
│   │   ├── Landing.tsx                # /
│   │   ├── Dashboard.tsx              # /dashboard
│   │   ├── StateDetail.tsx            # /state/:stateId
│   │   ├── ComparisonPage.tsx         # /compare
│   │   ├── Sources.tsx                # /sources (shell — imports from sources/)
│   │   └── sources/                   # Sources page tab modules
│   │       ├── shared.tsx             # Shared helpers, badges, sort utilities
│   │       ├── ScoringTab.tsx
│   │       ├── TaxesTab.tsx
│   │       ├── CostOfLivingTab.tsx
│   │       ├── HousingTab.tsx
│   │       ├── FinancialTab.tsx
│   │       ├── ClimateTab.tsx
│   │       ├── EmploymentTab.tsx
│   │       ├── VeteransTab.tsx
│   │       └── VADisabilityTab.tsx
│   ├── data/
│   │   ├── siteConfig.ts              # DATA_YEAR, LAST_UPDATED, DATA_VINTAGES
│   │   ├── stateData.ts               # 50-state dataset + scoring algorithm
│   │   ├── financialReality.ts        # Core financial calculation engine
│   │   ├── vaRates.ts                 # VA disability rate tables (update annually)
│   │   ├── financialData.ts           # Per-state financial data
│   │   ├── housingData.ts             # Per-state housing data
│   │   ├── climateData.ts             # Per-state climate data
│   │   ├── employmentData.ts          # Per-state employment data
│   │   ├── vaFacilityLocations.ts     # VA facility coordinates
│   │   ├── militaryInstallations.ts
│   │   ├── spaceATerminals.ts
│   │   ├── veteranPerksData.ts        # License, medal, education, property tax perks
│   │   └── stateVeteranUrls.ts        # Official state veteran services URLs
│   ├── routes.tsx
│   └── App.tsx
├── styles/
└── main.tsx
```

---

## Data & Accuracy

Data accuracy is critical — this tool is used by real people making major financial and life decisions.

- State tax data reflects tax year **2026**
- VA disability rates are official VA.gov **2026 rates**, effective December 1, 2025 (2.8% COLA)
- VA disability is always federally tax-exempt per **38 U.S.C. § 5301**
- Military retirement pay formulas per **DoD Financial Management Regulation (FMR)**
- `src/app/data/vaRates.ts` is the single source of truth for all VA dollar amounts — update each December when VA publishes new COLA rates

---

## Deployment

Pushes to `main` automatically deploy to GitHub Pages via the Actions workflow in `.github/workflows/deploy.yml`.
