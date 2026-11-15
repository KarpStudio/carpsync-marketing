# CarpSync marketing website — 15 November 2026

The current marketing experience is served from `public/marketing/` using the `beforeFiles` rewrites in `next.config.ts`. The homepage and thirteen supporting pages share the same assets, navigation, typography and footer.

## Editing

- Homepage: `public/marketing/index.html`.
- Shared appearance: `style.css` plus the readable `refinement.css` overrides.
- Browser interactions: `app.js`.
- Supporting page content and shared layouts: `scripts/build-marketing-pages.mjs`.
- Regenerate supporting pages with `node scripts/build-marketing-pages.mjs` after changing content or shared homepage navigation/footer.
- Legal pages are generated from the existing `app/privacy`, `app/terms` and `app/cookies` source paragraphs. The privacy processing description reflects the browser-based setup finder and the email-app enquiry flow.

## Enquiries

The form opens the visitor's email application with an enquiry to `reece@karpstudio.co.uk`. A visible draft and copy fallback remain available. The webpage does not send email automatically or imply that preparing a draft has delivered it. The previous demo page required an email service that is not configured for this Vercel project; `/demo` now uses the same explicit email-app flow as the homepage.

## Product examples

Interfaces, customers and booking figures are clearly labelled illustrations. The interactive extras demonstration uses a 30% example deposit, calculated in integer pence. It does not create bookings or take payment. Pricing is individually quoted; no unconfirmed rates or testimonials are published.

## Release checks

- Desktop, 320/390px phone layouts and 768/1024px tablet layout checks.
- Product and venue tabs, selected owner navigation, extras totals and example confirmation.
- Valid headings, unique IDs, local assets and section links across fourteen pages.
- Policy structure retained; privacy processing descriptions match the enquiry and setup flow.
- Enquiry draft construction and fallback reviewed. Automated cloud-browser policy does not permit launching an external mail application; no live email is sent by verification.
- Vercel preview build and route checks before advancing the production branch.

The marketing project is separate from `app.carpsync.com`. Legacy `/next` owner links redirect to the existing app.

## Interactive marketing additions

- The three-step setup finder uses venue, website and payment preferences to produce a starting outline. It does not quote a price, create an account or persist choices to a server.
- Choosing to discuss the outline adds a visible, removable setup summary to the email enquiry. Existing typed requirements remain unchanged.
- Sample booking calendar buttons open labelled details for full payments, partial payments and provisional holds. Their expanded state and close behaviour support keyboard navigation.
- Mobile result layouts hide repeated introductory text and use the existing fixed-header offset when scrolling between questions and results.

Verified: disabled progression without an answer, multiple setup paths, visible enquiry context, preservation of typed requirements, removal of setup context, booking balances and hold states, and 320/390px layout widths.

The privacy processing description was updated to explain local setup choices and messages sent through the visitor’s own email application. No new automatic message delivery or server storage is implied.
