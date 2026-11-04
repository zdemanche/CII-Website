# ADR-0003: Adopt layout features from the 2026 design brief (First Light Design mockup)

- Status: Accepted (2026-11-04)
- Context: Leadership supplied a home-page mockup (firstlightdesign.com/0consol/index.php) and asked for its features in the rebuild. The mockup is a jQuery/Bootstrap page with stock aircraft photos; ADR-0001 rules out frameworks, third-party requests and unconfirmed content.

## Decision
Adopt the mockup's structure and interaction patterns, re-implemented in plain CSS and small vanilla scripts, using CII's own photos and audited facts:

1. **Dropdown navigation** (`src/data/nav.ts` `children`): hover on fine pointers, chevron toggle for touch and keyboard, accordion on phones, Escape and outside-click close. Parents stay real pages (FR-001.3).
2. **Hero carousel** (`HeroCarousel.astro`): three slides, previous/next, dots, a pause/resume control (WCAG 2.2.2), keyboard arrows, swipe, pause on hover/focus, `aria-live` polite when paused. Starts paused under `prefers-reduced-motion`; shows the first slide only without JavaScript. Only the first slide carries the `h1`.
3. **Photo + overlapping slant-edged card** (`FeatureSplit.astro`) for "The Consolidated difference" and "Your trusted partner".
4. **Full-bleed call-to-action band** (`CtaBand.astro`) "Do you have a project we can help with?".
5. **Icon cards on a slanted backdrop** (`Pillars.astro`) for "Market experience".
6. **Header utility bar** with phone, email and a Google Maps link; **footer** About blurb, chevron link lists and an icon contact panel.
7. **Back-to-top** control, eyebrow labels and arrow buttons as shared styles.

## Not adopted, and why
- Poppins, Bootstrap, jQuery, Owl Carousel, icon fonts, Google Analytics: ADR-0001 (self-hosted Archivo, no third-party requests, NFR-005).
- Stock aircraft and rocket photography: licensing unknown; CII plant photos used instead (issue #13).
- Mockup copy claiming ISO 9001:2008 and AS9100 Rev C: superseded by the audited AS9100 Rev D and ISO 9001:2015 in `src/data/quality.ts`.
- "Medical" market and the "Fax" label on the second phone line: not in the audited source; omitted / kept as "Second line".
- "Developed by" agency credit in the footer.

## Consequences
- Tests cover the submenus (toggles wired to existing ids, parent links resolve) and the carousel controls; the axe gate stays at zero violations.
- Hero photos are the legacy 600–1200 px images; a new plant shoot (issue #13) would sharpen the full-bleed slides.
