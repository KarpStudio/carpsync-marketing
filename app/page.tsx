import Image from "next/image";
import { Hero } from "@/components/home/hero";
import { TrustStatement } from "@/components/home/trust-statement";
import { FeaturesOverview } from "@/components/home/features-overview";
import { BookingJourney } from "@/components/home/booking-journey";
import { AdminDashboardSection } from "@/components/home/admin-dashboard";
import { UseCases } from "@/components/home/use-cases";
import { WebsiteIntegration } from "@/components/home/website-integration";
import { PaymentsSection } from "@/components/home/payments-section";
import { ExtrasSection } from "@/components/home/extras-section";
import { AutomationSection } from "@/components/home/automation-section";
import { CaseStudy } from "@/components/home/case-study";
import { ComparisonSection } from "@/components/home/comparison-section";
import { PricingPreview } from "@/components/home/pricing-preview";
import { FaqSection } from "@/components/home/faq-section";
import { CtaSection } from "@/components/site/cta-section";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  description: DEFAULT_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <div className="bg-[#081B12] px-8 py-10 sm:py-14">
        <Image
          src="/brand/svg/carpsync-dark.svg"
          alt="CarpSync"
          width={1200}
          height={285}
          priority
          sizes="(max-width: 800px) 85vw, 740px"
          className="mx-auto h-auto w-full max-w-[740px]"
        />
      </div>
      <Hero />
      <TrustStatement />
      <FeaturesOverview />
      <BookingJourney />
      <AdminDashboardSection />
      <UseCases />
      <WebsiteIntegration />
      <PaymentsSection />
      <ExtrasSection />
      <AutomationSection />
      <CaseStudy />
      <ComparisonSection />
      <PricingPreview />
      <FaqSection />
      <CtaSection
        title="Ready to bring your fishery's bookings online?"
        description="Book a demo and see how CarpSync can fit your lakes, swims and booking process."
      />
    </>
  );
}
