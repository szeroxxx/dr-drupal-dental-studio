"use client";

import Link from "next/link";
import { CalendarCheck, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { defaultWhatsAppMessage, telHref, whatsappHref } from "@/lib/clinic-data";
import { useBookHref } from "@/lib/use-book-href";
import { cn } from "@/lib/utils";

const item =
  "flex h-12 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-colors [&_svg]:size-[1.15em]";

/** Persistent Call / WhatsApp / Book shortcuts on phones — the actions patients reach for most. */
export function MobileActionBar() {
  const bookHref = useBookHref();
  const wa = whatsappHref(defaultWhatsAppMessage);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg md:hidden">
      <div className={cn("grid gap-2 px-3 py-2.5", wa ? "grid-cols-3" : "grid-cols-2")}>
        <a href={telHref} className={cn(item, "border border-line text-ink active:bg-canvas")}>
          <Phone aria-hidden className="text-brand-700" />
          Call
        </a>
        {wa && (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(item, "border border-line text-ink active:bg-canvas")}
          >
            <WhatsAppIcon className="text-[#1a9e55]" />
            WhatsApp
          </a>
        )}
        <Link href={bookHref} className={cn(item, "bg-brand-700 text-white active:bg-brand-800")}>
          <CalendarCheck aria-hidden />
          Book
        </Link>
      </div>
    </div>
  );
}
