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
      ? "/brand/svg/carpsync-dark-flat.svg"
      : "/brand/svg/carpsync-light.svg";

  const image = (
    <Image
      src={src}
      alt="CarpSync"
      width={1200}
      height={285}
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
