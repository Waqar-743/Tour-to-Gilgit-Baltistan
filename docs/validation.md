# Validation notes

Rebuild reviewed 25 October 2026.

## Completed checks

- `npm ci`: successful.
- `npm run lint`: successful (the dependency baseline-age advisory is informational).
- `npm run build`: successful production bundle.
- Backend changed-file syntax and targeted lint: successful.
- Browser layout checks at 320, 390, 768, 1024 and 1440 CSS pixels: no horizontal document overflow.
- Desktop layout and mobile single-column cards visually reviewed.
- Heritage filter returns 3 places; highland trails returns 2.
- Save a place, refresh, and verify it remains saved.
- Regional search for Ghanche returns Khaplu; unmatched search shows an empty state.
- Planner creates a 3-day Baltistan culture draft with 3 itinerary entries.
- Downloaded text includes the selected travel-style guidance.
- Creating a plan focuses its summary; adjusting focuses the first select.
- Mobile menu opens planner and restores focus to the menu toggle on close.
- Photo credits render author/source/license details.
- All 11 photography files have verified Commons licenses and attribution.
- Culture detail, seasonal switching and all seven destination profiles checked in the browser.
- Browser console showed no warnings or errors during these flows.

## Scope

The journal and planner work without a server account or backend. Live authentication, email, booking, payment, and MongoDB were not integration-tested. Content has linked primary sources; route access, opening hours, prices and availability require current local confirmation.
