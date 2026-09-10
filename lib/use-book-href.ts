"use client";

import { usePathname } from "next/navigation";

/** Pages with their own booking section scroll to it; everything else links to the contact page. */
export function useBookHref() {
  const pathname = usePathname();
  return pathname === "/" || pathname === "/contact" ? "#book" : "/contact#book";
}
