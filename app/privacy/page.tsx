import { LegalPage } from "@/components/site/legal-page";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How CarpSync collects, uses and stores personal information submitted through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="15 November 2026"
      sections={[
        {
          heading: "Who we are",
          body: [
            "This website is operated by Karp Studio for CarpSync, online booking software for fisheries, carp lakes and angling venues. For privacy questions, contact reece@karpstudio.co.uk.",
            "This policy describes how we handle personal information collected through carpsync.com. It does not cover how fishery customers process angler data inside the CarpSync product.",
          ],
        },
        {
          heading: "Information we collect",
          body: [
            "If you send an enquiry by email, we receive the details you include. The enquiry form prepares a message in your own email application and does not send it automatically. The separate CarpSync application form sends the fishery name, owner name and email, website (if given), country, lake count, booking type, chosen billing interval, LakeBooker interest and notes to our application system for review.",
            "The setup finder uses your booking, website and payment preferences in your browser to display an outline. Those choices are only included in an enquiry when you choose to add them; the setup finder does not save them to a server.",
            "We also receive technical information that is created automatically when you visit the site, such as IP address, browser type and pages requested, as part of hosting and security logs.",
          ],
        },
        {
          heading: "How we use information",
          body: [
            "Demo requests are used to respond to your enquiry. Fishery applications are stored so the CarpSync operator can review, approve, decline and manage onboarding. After approval, Stripe processes subscription checkout and recurring billing; this website does not collect or store payment-card details. We do not sell your information.",
            "Hosting and security logs are used to operate, protect and improve the website.",
          ],
        },
        {
          heading: "Sharing",
          body: [
            "Our hosting and backend providers process technical and application data. Email providers deliver application status and onboarding messages. If an application is approved and you choose to subscribe, Stripe processes subscription and payment details. Your email application handles messages you choose to send through the separate enquiry form.",
            "We may disclose information if required by law.",
          ],
        },
        {
          heading: "Retention",
          body: [
            "Applications and relevant payment and account records are kept only as long as reasonably needed for onboarding, operating the service, handling follow-up, and meeting accounting or legal obligations. Unsuccessful applications are periodically reviewed for deletion.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "Depending on where you live, you may have rights to access, correct, delete or restrict the use of your personal information, and to object to certain processing. To exercise these rights, email reece@karpstudio.co.uk.",
          ],
        },
        {
          heading: "Contact",
          body: [
            "Email reece@karpstudio.co.uk with any privacy questions about this marketing website.",
          ],
        },
      ]}
    />
  );
}
