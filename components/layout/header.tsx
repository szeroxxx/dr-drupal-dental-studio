"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "motion/react";
import { CalendarCheck, Clock, MapPin, Menu, Phone, X } from "lucide-react";
import { getLenis } from "@/components/motion/smooth-scroll";
import { easeSoft } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WhatsAppIcon } from "@/components/ui/icons";
import { clinic, defaultWhatsAppMessage, sessionText, telHref, whatsappHref } from "@/lib/clinic-data";
import { mainNav } from "@/lib/site";
import { useBookHref } from "@/lib/use-book-href";
import { cn } from "@/lib/utils";

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function Header() {
  const pathname = usePathname();
  const bookHref = useBookHref();
  const scrolled = useSyncExternalStore(subscribeToScroll, () => window.scrollY > 12, () => false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wa = whatsappHref(defaultWhatsAppMessage);

  // While the drawer is open: lock scroll, trap focus, close on Escape, restore focus afterwards.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    const button = menuButtonRef.current;
    const focusables = () => [
      ...(button ? [button] : []),
      ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []),
    ];
    panelRef.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousOverflow;
      lenis?.start();
      button?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-500 ease-soft",
          solid
            ? "border-line/80 bg-white/85 shadow-[0_10px_30px_-24px_rgb(23_36_46/0.35)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-[76px] items-center justify-between gap-6">
          <Link href="/" aria-label={`${clinic.name} — home`} className="shrink-0 rounded-md">
            <Image
              src="/brand/logo.png"
              alt={clinic.brandName}
              width={1200}
              height={379}
              preload
              sizes="170px"
              className="h-11 w-auto sm:h-[3.1rem]"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative rounded-md px-3.5 py-2 text-[0.9375rem] font-medium transition-colors duration-300",
                        "after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-px after:origin-left after:bg-brand-600 after:transition-transform after:duration-500 after:ease-soft",
                        active
                          ? "text-brand-800 after:scale-x-100"
                          : "text-ink-soft after:scale-x-0 hover:text-brand-800 hover:after:scale-x-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telHref}
              className="hidden items-center gap-2 rounded-md px-3 text-sm font-semibold text-ink transition-colors hover:text-brand-800 xl:inline-flex"
            >
              <Phone aria-hidden className="size-4 text-brand-700" />
              {clinic.phone.display}
            </a>
            <ButtonLink href={bookHref} size="sm" className="hidden h-11 px-5 sm:inline-flex">
              <CalendarCheck aria-hidden />
              Book an Appointment
            </ButtonLink>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-11 place-items-center rounded-full border border-line-strong bg-white/80 text-ink transition-colors hover:border-brand-600 lg:hidden"
            >
              {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="overlay"
              aria-hidden
              onClick={() => setOpen(false)}
              className="fixed inset-x-0 bottom-0 top-[76px] z-40 bg-ink/25 backdrop-blur-[2px] lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <m.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="fixed bottom-0 right-0 top-[76px] z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-line bg-white px-6 pb-8 pt-4 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: easeSoft }}
            >
              <nav aria-label="Mobile">
                <ul className="divide-y divide-line">
                  {mainNav.map((item, i) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <m.li
                        key={item.href}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + i * 0.04, duration: 0.45, ease: easeSoft }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-baseline justify-between py-4 font-serif text-[1.75rem] leading-none transition-colors",
                            active ? "text-brand-700" : "text-ink hover:text-brand-700",
                          )}
                        >
                          {item.label}
                          <span className="font-sans text-xs tabular-nums text-muted">0{i + 1}</span>
                        </Link>
                      </m.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mt-8 grid gap-2.5">
                <ButtonLink href={bookHref} size="lg" onClick={() => setOpen(false)} withArrow>
                  <CalendarCheck aria-hidden />
                  Book an Appointment
                </ButtonLink>
                <div className="grid grid-cols-2 gap-2.5">
                  <ButtonLink href={telHref} variant="secondary">
                    <Phone aria-hidden className="text-brand-700" />
                    Call
                  </ButtonLink>
                  {wa && (
                    <ButtonLink href={wa} variant="secondary">
                      <WhatsAppIcon className="text-[#1a9e55]" />
                      WhatsApp
                    </ButtonLink>
                  )}
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-10 text-sm text-muted">
                <p className="flex gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
                  <span>
                    {clinic.address.street}, {clinic.address.locality}, {clinic.address.city}
                  </span>
                </p>
                <p className="flex gap-3">
                  <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-700" />
                  <span>{clinic.hours.sessions.map(sessionText).join(" · ")}</span>
                </p>
              </div>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
