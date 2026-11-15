# CarpSync marketing release — 15 November 2026

The approved new homepage is served from `public/marketing/index.html` by the root before-files rewrite in `next.config.ts`. It is a standalone static page; all existing Next.js routes, policies, sitemap, robots and demo functionality remain available.

The approved homepage source is mirrored from the CarpSync marketing Site at commit `369743d70b5e50950ec3883fbe40fb40bfefb38c`. Local asset paths are prefixed with `/marketing/`, and canonical/social metadata use `https://www.carpsync.com/`.

The product interfaces and booking figures are illustrative. The enquiry form prepares an email to Reece, with a copy fallback; it does not send automatically. Existing Resend demo request functionality remains at `/demo`.

Verification before release: desktop and 320/390px mobile layouts, product and venue tabs, booking extras and confirmation, enquiry draft preparation, local asset/anchor checks, JavaScript syntax. Verify the root rewrite and existing policy routes on the Vercel deployment before assigning production domains.
