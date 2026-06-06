# Company Profile Page — Design Document

## Goal
Replace the `/rentals` page with a dedicated Company Profile page at `/company` that showcases Applied Engineering & Service with an overview, key stats, and product categories.

## Route & Navigation Changes

| Item | Old | New |
|------|-----|-----|
| Route | `/rentals` | `/company` |
| Nav label | "Hydraulic Rentals" | "Company Profile" |
| Footer links | `/rentals` | `/company` |

## Page Structure

### 1. Page Header (Overview)
- **SectionLabel**: "COMPANY PROFILE"
- **Title**: "Applied Engineering & Service"
- **Subtitle**: Company tagline / brief positioning statement
- **Intro section**: 2-3 paragraphs describing the company (dummy data)
- **Styling**: Reuses `Pages.module.css` `.pageHeader` and `.introSection` patterns

### 2. Stats Strip
- 4 stat cards in a responsive row/grid
- Example stats (dummy data):
  - "15+" Years of Excellence
  - "500+" Products & Solutions
  - "50+" Industry Partners
  - "24/7" Support Available
- **Component**: Reuses existing `StatCard` with `useScrollAnimation` fade-in

### 3. Product Categories
- **SectionLabel**: "PRODUCT CATEGORIES"
- **Title**: "Our Solutions"
- **Subtitle**: Brief description of product offerings
- **Grid**: 4-6 `ProductCard` components showing categories with icons and item lists
- Example categories (dummy data):
  - Hydraulic Equipment (Pumps, Cylinders, Valves)
  - Cleaning Systems (High Pressure, Vacuum, Steam)
  - Maintenance Tools (Diagnostic, Calibration, Repair)
  - Safety Gear (PPE, Fall Protection, Signage)
- **Component**: Reuses existing `ProductCard` with scroll animation delays

### 4. Footer
- No changes to the footer component itself
- Footer column links referencing `/rentals` must be updated to `/company`

## Data Architecture

### New Content File
`src/content/pages/company.json` — contains all page copy and dummy data for:
- `meta`: page title and description
- `header`: sectionLabel, title, subtitle
- `overview`: heading, paragraphs
- `stats`: array of `{ value, label }`
- `categories`: array of `{ id, icon, title, items[] }`

### New Type Definition
Add `CompanyProfileContent` interface to `src/types/content.ts` mirroring the JSON structure above.

## Component Plan

| Component | Source | Reuse / New |
|-----------|--------|-------------|
| `CompanyProfilePage` | `src/pages/CompanyProfilePage.tsx` | New — thin composition |
| `SectionLabel` | `src/components/ui/SectionLabel.tsx` | Reuse |
| `StatCard` | `src/components/ui/StatCard.tsx` | Reuse |
| `ProductCard` | `src/components/ui/ProductCard.tsx` | Reuse |
| `Pages.module.css` | `src/pages/Pages.module.css` | Reuse |

## Asset Changes

| File | Change |
|------|--------|
| `src/App.tsx` | Replace `RentalsPage` import/route with `CompanyProfilePage`; path `/rentals` → `/company` |
| `src/content/site.json` | Update nav link: label → "Company Profile", path → `/company` |
| `src/content/site.json` | Update footer column links: `/rentals` → `/company` |
| `src/types/content.ts` | Add `CompanyProfileContent` interface |
| `src/content/pages/company.json` | New — page content |
| `src/pages/RentalsPage.tsx` | Delete |
| `src/content/pages/rentals.json` | Delete |
| `src/pages/CompanyProfilePage.tsx` | New — page component |

## Styling Notes
- Use existing dark theme tokens (`--bg-primary`, `--bg-secondary`, `--text-primary`, etc.)
- Maintain consistent section padding via `var(--section-padding)`
- Scroll animations handled by existing `useScrollAnimation` hook

## Out of Scope
- No new UI components (cards, labels, buttons)
- No animation changes beyond existing scroll fades
- No backend/API integration (static dummy data only)
- No contact form or interactive elements on this page
