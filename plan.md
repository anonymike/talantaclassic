# MatchPass — Bayern vs Ajax

## Implementation

Build a responsive React/TypeScript ticket sales page in the existing web-db-user starter. Use the supplied match poster as the primary artwork at `/manus-storage/pasted_file_RBKlJ3_image_f380d243.png`. Keep the homepage as the main purchase surface with an anchored order summary and an in-page checkout dialog/section. Ticket selection is client-side for the demo, with clear seams for later Stripe Checkout, database order persistence, and transactional email delivery after webhook-confirmed payment.

The frontend owns match presentation, ticket tier cards, quantity changes, checkout validation, payment processing state, success/failure states, and confirmation messaging. The existing Express/tRPC backend remains available for future order endpoints; the initial experience should be fully usable in preview without requiring live payment credentials. Add `public/manus-routes.json` for the root and 404 routes.

## Project structure

- `client/src/pages/Home.tsx`: primary match landing page, ticket selection, checkout, confirmation state.
- `client/src/index.css`: visual system, responsive layout, background treatment, and component styling.
- `client/src/App.tsx`: route manifest for home and 404.
- `public/manus-routes.json`: declared page routes.
- `server/` and `drizzle/`: retained starter backend and database foundation for future Stripe/order/email integrations.
- `plan.md` and `TODO.md`: approved product/design decisions and deliverables.

## Design

### Style options considered
- Matchday editorial / stadium-night: 0.07
- Minimal airline-style ticketing: 0.05
- Dark luxury hospitality: 0.08

### Chosen direction: matchday editorial / stadium-night

- **Design Movement:** Contemporary sports editorial with UEFA-program energy, oversized condensed type, and dark stadium atmosphere.
- **Core Principles:** Fast scanability, premium trust, confident contrast, and a purchase flow that never loses the match context.
- **Color Philosophy:** Ink-black and deep navy create night-match focus; Bayern red acts as the emotional action color; warm cream and gold details make the ticket feel collectible rather than transactional.
- **Layout Paradigm:** A split-stage homepage: a poster-led visual rail on the left and a ticket desk on the right, collapsing into a stacked mobile flow with the order summary pinned close to the purchase action.
- **Signature Elements:** Hairline “match telemetry” dividers, oversized red quantity controls, and a floating ticket summary that resembles a printed match credential.
- **Interaction Philosophy:** Every interaction should feel like confirming a seat: immediate quantity feedback, strong active states, and no ambiguous primary actions.
- **Animation:** Subtle poster zoom on hover, quick opacity/translate transitions for checkout state changes, and a restrained shimmer on the “payment secure” status only while processing.
- **Typography System:** `Oswald`-style condensed display treatment for match headlines (via system fallback `Impact`, `Arial Narrow`, sans-serif) paired with a clean UI sans stack (`Inter`, `ui-sans-serif`, system-ui) for labels and form fields.
- **Brand Essence:** MatchPass is the confident, clear way to get inside the next big fixture; bold, credible, electric.
- **Brand Voice:** Headlines sound like match commentary, while microcopy is calm and operational. Example lines: “Your seat to the moment.” and “Pay securely. We’ll email your E-ticket the moment payment clears.”
- **Wordmark & Logo:** A compact ticket-stub mark with a diagonal tear and a red “M” monogram beside the MATCHPASS wordmark.
- **Signature Brand Color:** MatchPass Red `#E1262F`.
