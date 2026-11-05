# MatchPass TODO

## Responsive match landing page
- [x] Build a responsive landing page featuring the supplied Bayern Munich vs Ajax poster, the two teams, 5 January 2027 match date, Raila Odinga International Stadium / Talanta Sports City venue, Nairobi location, and prominent ticket-purchase calls to action.

## Match information and trust content
- [x] Include event timing, stadium details, attendance guidance, ticket authenticity reassurance, secure checkout cues, delivery expectations, support contact guidance, and common questions.

## Ticket tiers and order summary
- [x] Show ticket tier cards with names, prices, benefits or seating descriptions, availability messaging, and quantity selectors.
- [x] Provide an interactive order summary that updates quantities, line items, fees if applicable, and total before checkout.

## Checkout and payment flow
- [x] Provide checkout fields for buyer name, email address, phone number, and essential attendee/billing details with validation and privacy messaging.
- [x] Provide a realistic payment step with payable total, secure-payment cues, processing state, and a demo payment option when live credentials are unavailable.
- [x] Support payment result states for success, processing, and failure with retry or next-step actions.

## E-ticket confirmation
- [x] Display an order reference, purchased ticket summary, buyer email, and a clear notice that E-tickets are sent by email after payment confirmation.
- [x] Keep the purchase flow mobile optimized with touch-friendly controls and a persistent purchase action or summary where appropriate.

## Delivery note

The preview uses a demo payment authorization because live Stripe and email credentials were not supplied. The backend/database foundation is initialized for wiring real Stripe Checkout, webhook-confirmed orders, and transactional E-ticket email delivery in a follow-up integration pass.
