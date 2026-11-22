import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CalendarDays,
  CreditCard,
  Globe2,
  LifeBuoy,
  ListChecks,
  MessagesSquare,
  ShieldCheck,
  Waves,
} from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeader } from "@/components/site/section";
import { CtaSection } from "@/components/site/cta-section";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Switch Your Fishery Booking System",
  description:
    "Considering a new fishery website or booking platform? See how CarpSync helps UK fisheries and French carp lakes move from spreadsheets, enquiries and existing booking tools to clearer online bookings.",
  path: "/switch-fishery-booking",
});

const benefits = [
  {
    icon: Globe2,
    title: "Keep the website you already have",
    description:
      "CarpSync can sit alongside an existing fishery website. If your site needs a redesign, Karp Studio can quote for that separately.",
  },
  {
    icon: CalendarDays,
    title: "Booking rules built around your lakes",
    description:
      "Individual swims, day tickets, exclusive lake hire and French weekly stays can each follow the way your venue operates.",
  },
  {
    icon: CreditCard,
    title: "Payments stay linked to the booking",
    description:
      "Make deposits, balances, extras and outstanding amounts easier to track in one owner workspace.",
  },
  {
    icon: MessagesSquare,
    title: "Less chasing and fewer repeated messages",
    description:
      "Booking confirmations and payment reminders help anglers get the information they need without constant manual admin.",
  },
  {
    icon: ShieldCheck,
    title: "Understand the costs before you commit",
    description:
      "We explain the agreed CarpSync subscription and setup costs, plus any payment processing fees. Direct CarpSync bookings have no CarpSync booking commission.",
  },
  {
    icon: LifeBuoy,
    title: "Work directly with the people building it",
    description:
      "Speak to Karp Studio about the website, booking journey and the practical steps needed to introduce your new system.",
  },
];

const stages = [
  {
    number: "01",
    title: "Review what you have",
    description:
      "Tell us about your current website, booking provider, booking rules, deposits and upcoming reservations.",
  },
  {
    number: "02",
    title: "Map the move",
    description:
      "Agree what needs recreating, which existing bookings need checking, whether the website stays, and the proposed costs.",
  },
  {
    number: "03",
    title: "Check the new journey",
    description:
      "Walk through availability, checkout, emails and owner tools before directing customers to the new booking flow.",
  },
  {
    number: "04",
    title: "Change over carefully",
    description:
      "Confirm a changeover plan that respects existing reservations and avoids running competing live calendars without reconciliation.",
  },
];

const options = [
  {
    label: "I like my current website",
    title: "Improve the bookings, not the entire site",
    description: "Keep your venue's public website and discuss connecting it to CarpSync.",
    href: "/demo",
    cta: "Discuss booking integration",
  },
  {
    label: "My current website needs work",
    title: "A better fishery website and bookings together",
    description:
      "Karp Studio can scope a new site for the lakes, facilities and visitor journey, with CarpSync as the booking platform.",
    href: "https://karpstudio.co.uk/",
    cta: "Explore Karp Studio",
  },
  {
    label: "I'm opening a new venue",
    title: "Start with a plan that can grow",
    description:
      "Set up your booking routine, customer information and payment process around your actual launch requirements.",
    href: "/demo",
    cta: "Plan my setup",
  },
];

export default function SwitchFisheryBookingPage() {
  return (
    <>
      <PageHero
        eyebrow="Switch to CarpSync"
        title={<>Your fishery deserves a better way to take bookings.</>}
        description="Already using another provider, a spreadsheet, a contact form or a mixture of everything? We can help you assess a clearer booking process without forcing you to replace a website that already works."
        primaryLabel="Discuss a switch"
        primaryHref="/demo"
        secondaryLabel="Explore the features"
        secondaryHref="/features"
      />

      <Section size="compact" className="border-b border-border">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            "UK fisheries and French carp holiday venues",
            "Swim bookings, exclusive hire and weekly stays",
            "Keep your website or ask us to build a new one",
          ].map((point) => (
            <div key={point} className="flex items-start gap-3 text-sm font-semibold text-foreground">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--brand-green)]" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Why change?"
          title="More than a booking widget on a website."
          description="A fishery needs more than a good-looking booking button. CarpSync focuses on what happens after someone chooses a date, from taking payment to managing the day-to-day calendar."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-5 flex size-11 items-center justify-center rounded-xl bg-secondary text-[var(--brand-green-dark)]">
                <Icon className="size-5" />
              </div>
              <h2 className="font-heading text-xl font-bold text-foreground">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="pale">
        <SectionHeader
          eyebrow="Choose your route"
          title="You do not have to rebuild everything."
          description="Choose the right starting point for your venue. The website and the booking platform are separate decisions."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {options.map((option) => (
            <article key={option.label} className="flex flex-col rounded-2xl border border-border bg-background p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-[var(--brand-green-dark)]">{option.label}</p>
              <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">{option.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{option.description}</p>
              <Link href={option.href} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[var(--brand-green-dark)] hover:underline">
                {option.cta}<ArrowRight className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="A considered changeover"
          title="Move your booking process without rushing the important details."
          description="We will review your current setup with you before suggesting a change. Existing bookings, payment records and season dates need a clear plan rather than assumptions."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2">
          {stages.map((stage) => (
            <li key={stage.number} className="flex gap-5 rounded-2xl border border-border p-6">
              <span className="font-heading text-3xl font-bold text-[var(--brand-green)]">{stage.number}</span>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{stage.description}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/for-fisheries" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-semibold text-foreground hover:bg-secondary">
            <Waves className="size-4" /> Explore venue types
          </Link>
          <Link href="/features" className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-semibold text-foreground hover:bg-secondary">
            <ListChecks className="size-4" /> See the features
          </Link>
        </div>
      </Section>

      <Section tone="pale">
        <SectionHeader eyebrow="Straight answers" title="Questions before you switch" />
        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {[
            ["Can I keep my current fishery website?", "Yes, in many cases. We'll review how best to connect a CarpSync booking journey to your existing website."],
            ["Will my existing reservations be transferred?", "We will review the booking records and your current provider before agreeing what can be transferred or reconciled. We will not promise an automatic import without checking."],
            ["Do you charge commission on bookings?", "CarpSync does not charge a commission on direct bookings through its platform. Your agreed subscription, setup and third-party payment-processing fees are separate. Other services such as a marketplace may have different commercial terms."],
            ["Do I need to sign up before speaking to you?", "No. Tell us what you currently use and what you want to improve. We'll discuss a suitable setup and costs first."],
          ].map(([question, answer]) => (
            <div key={question} className="rounded-2xl border border-border bg-background p-6">
              <h3 className="font-heading text-lg font-bold text-foreground">{question}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection
        title="Thinking of changing your booking system?"
        description="Tell us what your fishery uses today. We'll talk through the right next step, what a changeover involves and what it would cost."
        primaryLabel="Talk about switching"
        primaryHref="/demo"
        secondaryLabel="See fishery website services"
        secondaryHref="https://karpstudio.co.uk/services/fishery-website-design"
      />
    </>
  );
}
