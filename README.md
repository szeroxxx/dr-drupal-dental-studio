# Smiles by Dr. Dhrupal's Dental Studio — website

Marketing and booking website for **Dr. Dhrupal's Dental Studio**, GF-16 Ratnamani Complex, near Gulab Tower Road, Thaltej, Ahmedabad.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Motion, Lenis, React Hook Form and Zod.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the production domain before deploying — canonical URLs, the sitemap, Open Graph and structured data all use it.

## Where things live

| Path | What |
| --- | --- |
| `lib/clinic-data.ts` | **All clinic facts**: name, dentist, phone, WhatsApp, address, geo, hours, ratings, links, photo slots, reviews |
| `lib/treatments.ts` | Treatment list and descriptions (drives cards, the treatments page, the footer and the booking form) |
| `lib/blog.ts` | Blog posts and categories — replace `getPosts` / `getPost` with CMS or MDX calls later |
| `lib/booking.ts` | Booking schema (shared by client and API), time slots, WhatsApp message |
| `lib/structured-data.ts` | JSON-LD: Dentist, WebSite, BreadcrumbList, FAQPage, BlogPosting |
| `app/globals.css` | Design tokens (colour, radius, shadow, easing) and the type scale |
| `components/ui/*` | Primitives: Button, Container, SectionHeader/Eyebrow/Script, Card/IconChip, Field/Input/Select/Textarea, ClinicImage, icons, Stars |
| `components/*` | Page sections (hero, treatments, dentist, trust, gallery, testimonials, why-us, process, appointment, contact, blog, layout) |
| `app/api/appointments/route.ts` | Booking endpoint |

## Photos

No clinic photography was supplied, so every image slot renders a clearly labelled **"Photo placeholder"** rather than stock imagery. To add real photos:

1. Put the files in `public/images/` (JPG/WebP, at least 1600px on the long edge for the hero).
2. Set the paths in `media` inside `lib/clinic-data.ts` (for example `hero: "/images/hero.jpg"`).

`next/image` handles sizing, AVIF/WebP and lazy loading.

## Reviews

`reviews` in `lib/clinic-data.ts` is intentionally empty. Paste Google reviews **verbatim** with the reviewer's public name, and the testimonials section switches to a carousel automatically. Until then it links to the Google Business Profile.

## Appointment requests

The form validates on the client and again on the server (`/api/appointments`).

- **`APPOINTMENT_WEBHOOK_URL` set** — the request is POSTed as JSON to that URL (CRM, Zapier / Make / n8n, email service, practice-management system). An optional `APPOINTMENT_WEBHOOK_SECRET` is sent as a bearer token. The patient sees "Thank you — we'll contact you to confirm".
- **Not set, or the webhook fails** — the patient is shown their summary and a **Send on WhatsApp** button with the request pre-filled. Nothing claims the booking is confirmed until the studio replies.

A honeypot field filters basic bots.

## Facts to confirm before launch

Everything below is marked `VERIFY` in the code.

- Dentist's qualification (**BDS** — from a public directory listing), registration number, years of experience
- Working days and any Sunday / public-holiday timings (Google shows **10:00 AM – 1:30 PM and 4:30 PM – 8:30 PM**)
- That **099136 19569** is on WhatsApp
- The treatment list in `lib/treatments.ts`
- The "Why choose us" points in `components/why-us/why-choose.tsx`
- Email address and social profiles (none found publicly; the site hides them while empty)
- Privacy policy wording
- Blog articles, reviewed by the dentist

Once the working days are confirmed, add `openingHoursSpecification` to the Dentist schema in `lib/structured-data.ts`.
