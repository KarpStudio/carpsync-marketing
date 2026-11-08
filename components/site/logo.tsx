import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "light",
  className,
  href = "/",
}: {
  variant?: "light" | "dark";
  className?: string;
  href?: string | null;
}) {
  const src =
    variant === "dark"
      ? "/brand/carpsync-logo-lockup.png"
      : "/brand/carpsync-logo-lockup-light.png";

  const image = (
    <Image
      src={src}
      alt="CarpSync"
      width={972}
      height={224}
      priority
      className={cn("h-11 w-auto max-w-[70vw]", className)}
    />
  );

  if (!href) return image;

  return (
    <Link href={href} aria-label="CarpSync home" className="inline-flex shrink-0">
      {image}
    </Link>
  );
}
