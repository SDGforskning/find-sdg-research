"use client";

import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";
import { getLocaleFromPathname } from "@/lib/locale";

export function HomeContainer({
  children,
  className,
  ...props
}: ComponentProps<"main">) {
  const locale = getLocaleFromPathname(usePathname());
  const label = locale === "en" ? "Skip to Content" : "Hopp til innhold";

  return (
    <main
      id="nd-home-layout"
      {...props}
      className={["flex flex-1 flex-col [--fd-layout-width:1400px]", className]
        .filter(Boolean)
        .join(" ")}
    >
      <a
        href="#innhold"
        className="fixed top-2 left-2 z-50 rounded-lg bg-white px-3 py-2 text-sm font-medium text-black shadow-lg outline-2 outline-green-700 not-focus-visible:sr-only dark:bg-neutral-900 dark:text-white"
      >
        {label}
      </a>
      {children}
    </main>
  );
}
