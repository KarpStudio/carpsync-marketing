# Managed CarpSync sign-up / pricing change

This feature branch proposes public pricing and a direct application form for the existing marketing project.

## Prices
CarpSync Booking: £39/month first lake, £15/month per additional lake; annual £390 first lake + £150 per additional lake. 0% CarpSync commission on bookings from a fishery's own website. Payment-processing fees remain separate. Optional LakeBooker: free listing, 7.5% commission only on confirmed deposit-paid LakeBooker-originated French week+ fishing holidays. Standard Karp Studio booking integration from £249 and starter fishery websites from £995; hosting/maintenance are separate.

## Managed journey
- Public /apply form submits via same-origin POST /api/apply, forwarded to configured CARPSYNC_APPLICATION_API_URL.
- API stores application to /super-admin/applications without creating tenant or sending invitation.
- Operator approves in Super Admin. Approved fishery receives Stripe recurring subscription Checkout.
- Owner invite is sent only after first Stripe subscription payment verified in webhook.
- Owner configures the fishery in CarpSync; public go-live is held until onboarding checks pass.

## Launch prerequisites
1. Merge/deploy backend PR #48, apply Prisma migration, verify test payment and webhook processing.
2. Set CARPSYNC_APPLICATION_API_URL in **Vercel marketing production and preview** to the correct verified HTTPS /v1/public/signup/fishery endpoint. Do not point production at staging.
3. Smoke test new application, rejection, approval, payment, cancellation, webhooks, invitation email and site /apply, /pricing routes.
4. Merge this branch only after backend is ready to receive applications; confirm live status.

Never promise an application was accepted if the API returned an error. Do not collect card details on marketing site.
