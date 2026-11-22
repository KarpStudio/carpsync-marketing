import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Section } from "@/components/site/section";

export function SwitchingSection() {
  return (
    <Section className="border-y border-border bg-[var(--brand-charcoal)] text-white">
      <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--brand-lime)]">
            Already using another booking system?
          </p>
          <h2 className="mt-4 text-balance font-heading text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Keep your lake. Keep your brand. Rethink the bookings.
          </h2>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
            CarpSync is built around real fishery booking routines, not a generic appointment calendar.
            We can review your current website, payments and existing reservations and help plan a more joined-up way forward.
          </p>
          <Link
            href="/switch-fishery-booking"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--brand-lime)] px-5 py-3 text-sm font-bold text-[var(--brand-charcoal)] transition-opacity hover:opacity-90"
          >
            See how switching works <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
          <p className="text-lg font-bold text-white">A more practical setup for fishery owners</p>
          <ul className="mt-6 flex flex-col gap-5">
            {[
              "Use CarpSync with your existing website",
              "Manage swims, exclusive hire and weekly holidays",
              "Keep deposits, balances and extras together",
              "Agree costs and a changeover plan before committing",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3 text-sm leading-relaxed text-white/85">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--brand-lime)]" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-7 border-t border-white/15 pt-5 text-xs leading-relaxed text-white/60">
            No CarpSync commission on direct bookings. Agreed subscriptions, setup charges and payment processing fees are separate.
          </p>
        </div>
      </div>
    </Section>
  );
}
