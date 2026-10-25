# Gilgit-Baltistan — a little closer to life

A responsive, culture-led travel journal rebuilt with React 19, React Router and Vite. It introduces the places of Gilgit-Baltistan through living heritage, food, craft, music and everyday life.

## Run locally

Requires Node.js 22.12+ or a current Node 24 release.

```sh
npm ci
npm run dev
```

Open the Local URL printed by Vite. The default path is `/Tour-to-Gilgit-Baltistan/`, matching this repository's GitHub Pages name.

```sh
npm run lint
npm run build
npm run preview
```

For a deployment at a different path, set `VITE_BASE_PATH` before starting or building. Set it to `/` for a custom-domain root. The router and image paths use Vite's base automatically.

## What works

- Seven researched place profiles: Hunza, Skardu, Shigar, Khaplu, Fairy Meadows/Joot, Phander and Deosai.
- Destination category filters, name/interest/region search and useful empty states.
- Place detail dialogs with seasonal context and primary-source links.
- Saved places in browser storage, with a session-only fallback if storage is unavailable.
- Four culture stories and an interactive seasonal guide.
- Local trip drafts for Hunza, Baltistan and Ghizer, with 3/5/7-day choices, travel styles and a downloadable text itinerary.
- Original SVG icons, mountain branding and favicon.
- Responsive navigation, native dialog focus trapping, Escape dismissal, focus restoration, reduced-motion support and image fallbacks.
- Source notes, photography attribution and privacy information available from the footer.

The planner is a transparent local tool, not an AI service, booking or access guarantee. There are no invented customer reviews, tour counts, prices or live road-status claims.

## Source structure

- `src/components/Travel/`: the new experience, icons, dialogs and planner.
- `src/data/journal.js`: original copy, source links, seasonal notes and journey drafts.
- `public/images/`: optimized local WebP photography with `credits.json`.
- `docs/research.md`: primary-source research and editorial cautions.
- `docs/icons.md`: custom icon design and reuse notes.

The former homepage, sample marketing data, simulated chat and package widgets have been retired. Original source photographs remain in `src/assets/` for the repository owner; the new page serves its curated images from `public/images/`.

## Optional backend

The existing Express/MongoDB backend and email verification/password recovery routes are retained. The redesigned journal and local planner do not require the backend. Backend credentials, email delivery, payment providers and live API flows need their own configured environment and were not integration-tested as part of this frontend rebuild.

The existing CI workflow runs frontend lint/build and backend syntax checks. A missing verification-email import and old frontend deployment URLs were corrected.

## Content and image licensing

Website copy is original editorial writing grounded in linked primary sources, reviewed on 25 October 2026. Deosai is on UNESCO's Tentative List, not the World Heritage List. Seasonal patterns are broad planning guidance, not promises of route access.

Photographs have individual attribution and licensing terms in `public/images/credits.json`. Preserve those credits when reusing the images. SVG landmarks are illustrative, not architectural surveys.
