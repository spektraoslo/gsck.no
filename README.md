# gsck.no

Website for **Grorud Spektra Cricket Klubb (GSCK)** — a social cricket club based
in Oslo, playing in the Norwegian Cricket Federation Super League and T20 League.

Live: [www.gsck.no](https://www.gsck.no)

## Tech stack

- **[Astro](https://astro.build)** `^5` — static-site framework (component-based, ships zero JS by default)
- **TypeScript** — strict mode
- **Vanilla CSS** — scoped `<style>` blocks per Astro component; design tokens in `src/styles/global.css`
- **GitHub Pages** — static hosting on the custom domain `www.gsck.no` (CNAME preserved in `public/`)
- **GitHub Actions** — build + deploy on every push to `main` (see `.github/workflows/deploy.yml`)

## Project layout

```
gsck.no/
├── .github/workflows/deploy.yml    ← Build Astro + deploy to Pages
├── public/                         ← Static assets served as-is (images, video, CNAME)
├── src/
│   ├── components/                 ← Header.astro, Footer.astro
│   ├── content/reports/            ← One markdown file per match report
│   ├── content.config.ts           ← Content collection schema for reports
│   ├── data/                       ← players.ts, matches.ts (typed source data)
│   ├── layouts/Layout.astro        ← Shared HTML shell (fonts, header, footer)
│   ├── pages/                      ← One .astro file per route
│   │   ├── index.astro             ← /
│   │   ├── team.astro              ← /team
│   │   ├── matches.astro           ← /matches   (Super League / T20 tabs)
│   │   ├── matches/[...slug].astro ← /matches/<slug>   (per-match report)
│   │   ├── gallery.astro           ← /gallery
│   │   ├── nets.astro              ← /nets
│   │   ├── open-day.astro          ← /open-day
│   │   └── contact.astro           ← /contact
│   └── styles/global.css           ← Design tokens (Cream Editorial theme)
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Prerequisites

- **Node.js 20.3+ or 22+** (Astro 5 requirement). Check with `node --version`.
- **npm 10+** (ships with Node).

## Run locally

```bash
# 1. Clone
git clone https://github.com/spektraoslo/gsck.no.git
cd gsck.no

# 2. Install dependencies
npm install

# 3. Start the dev server (hot reload)
npm run dev
```

Then open **http://localhost:4321** in your browser.

### Available scripts

| Command | What it does |
|---|---|
| `npm run dev` | Starts the Astro dev server on `http://localhost:4321` with hot reload |
| `npm run build` | Builds the site to the `dist/` folder (what gets deployed) |
| `npm run preview` | Serves the production build locally on `http://localhost:4321` for a final check |

## Deployment

Every push to the `main` branch triggers the GitHub Actions workflow at
`.github/workflows/deploy.yml`, which:

1. Installs dependencies (`npm ci`)
2. Runs `npm run build`
3. Uploads the `dist/` folder to GitHub Pages

The site is served at [www.gsck.no](https://www.gsck.no) via the `CNAME` file in `public/`.

## Editing content

Most changes are one-file edits:

- **Rosters** — `src/data/players.ts` (add / remove / rename players, update captain / vice-captain)
- **Match results + GSCK standing** — `src/data/matches.ts` (add a new entry to `superLeagueMatches` or `t20Matches`; update `gsckSuperLeagueStanding` / `gsckT20Standing` after each new points table)
- **Match reports** — add a new markdown file at `src/content/reports/YYYY-MM-DD-vs-<opponent-slug>.md`. Frontmatter must include `matchDate`, `league`, `opponent` (matching the entry in `matches.ts` exactly), `result`, `resultText`, and optionally `scoreSummary`, `venue`. Body is free-form markdown — see any existing report for the format. The report is auto-linked from the Matches page.
- **Nets schedule** — `src/pages/nets.astro` (`sessions` array at the top)
- **Open Day details** — `src/pages/open-day.astro` (event date, registration URL, poster, QR)
- **Home copy** — `src/pages/index.astro`

Changes made while `npm run dev` is running appear in the browser instantly.

## Contributing

Work on a feature branch, open a pull request against `main`, and let the admin
review before merging (merges auto-deploy).
