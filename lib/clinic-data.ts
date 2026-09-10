/**
 * Clinic facts — the single source of truth for copy, contact actions and structured data.
 *
 * Sources checked on 10 Sep 2026:
 *  - Google Business Profile: https://maps.app.goo.gl/CC4Pk9dPbSt7QDWv7
 *    (name, 5.0 rating, address, phone, plus code, coordinates, session times)
 *  - Justdial listing (4.9 rating from 50 ratings, WhatsApp contact, dentist's qualification)
 *
 * Anything marked VERIFY could not be fully confirmed from a public source — confirm it with
 * the clinic before launch. Anything set to `null` is intentionally left blank rather than
 * invented; components hide empty fields automatically.
 */

export type Session = { label: string; opens: string; closes: string };

export const clinic = {
  name: "Dr. Dhrupal's Dental Studio",
  brandName: "Smiles by Dr. Dhrupal's Dental Studio",
  category: "Dental clinic",

  dentist: {
    name: "Dr. Dhrupal Modi",
    shortName: "Dr. Dhrupal",
    title: "Dentist",
    // VERIFY — qualification taken from a public directory listing.
    qualifications: ["BDS"],
    credentials: ["Bachelor of Dental Surgery (BDS)"],
    registrationNumber: null as string | null,
    yearsOfExperience: null as number | null,
  },

  phone: {
    display: "099136 19569",
    international: "+91 99136 19569",
    e164: "+919913619569",
  },
  // VERIFY — Justdial lists a WhatsApp contact for this number.
  whatsapp: "919913619569" as string | null,
  email: null as string | null,

  address: {
    street: "GF-16, Ratnamani Complex, Near Gulab Tower Road",
    locality: "Thaltej",
    city: "Ahmedabad",
    region: "Gujarat",
    postalCode: "380054",
    country: "IN",
    plusCode: "3G7G+54 Ahmedabad, Gujarat",
  },
  geo: { latitude: 23.0629499, longitude: 72.5252995 },

  hours: {
    // Session times as shown on the Google Business Profile.
    // VERIFY — working days, and any Sunday / public-holiday timings.
    sessions: [
      { label: "Morning", opens: "10:00", closes: "13:30" },
      { label: "Evening", opens: "16:30", closes: "20:30" },
    ] as Session[],
    note: "Please call ahead on Sundays and public holidays.",
  },

  ratings: {
    // As shown on the Google Maps listing card, 10 Sep 2026. Update periodically.
    google: { value: 5.0, count: 55 as number | null },
    justdial: { value: 4.9, count: 50 },
  },

  links: {
    googleProfile: "https://maps.app.goo.gl/CC4Pk9dPbSt7QDWv7",
    justdial:
      "https://www.justdial.com/Ahmedabad/Smiles-By-Dr-Dhrupals-Dental-Studio-Near-Gulab-Tower-Road-Thaltej/079PXX79-XX79-251018003937-M7I5_BZDET",
  },

  // Add Instagram / Facebook etc. here once confirmed — the footer renders whatever is listed.
  social: [] as { label: string; href: string }[],
};

/**
 * Photography slots. Put real clinic photos in /public/images and set the paths here.
 * `null` renders a clearly labelled placeholder instead of stock photography.
 */
export const media = {
  hero: null as string | null,
  dentist: null as string | null,
  process: null as string | null,
  gallery: [
    { label: "Reception", src: null },
    { label: "Treatment room", src: null },
    { label: "Consultation area", src: null },
    { label: "Studio entrance, Ratnamani Complex", src: null },
  ] as { label: string; src: string | null }[],
  transformations: [
    { label: "Smile transformation 01", before: null, after: null },
    { label: "Smile transformation 02", before: null, after: null },
    { label: "Smile transformation 03", before: null, after: null },
  ] as { label: string; before: string | null; after: string | null }[],
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  date?: string;
  source: "Google" | "Justdial";
};

/**
 * Patient reviews, copied verbatim with the reviewer's public display name.
 * Never paraphrase or invent. While empty, the site links to the Google profile instead.
 */
export const reviews: Review[] = [];

/* ── Derived helpers ───────────────────────────────────────── */

export const fullAddress = `${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.city}, ${clinic.address.region} ${clinic.address.postalCode}`;

export const telHref = `tel:${clinic.phone.e164}`;

export const defaultWhatsAppMessage = `Hello ${clinic.name}, I'd like to book an appointment.`;

export function whatsappHref(message?: string) {
  if (!clinic.whatsapp) return null;
  const base = `https://wa.me/${clinic.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${clinic.name}, ${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.city}`,
)}`;

// Searching by name resolves to the Business Profile listing (name, rating, directions) inside the map.
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  `${clinic.name}, ${clinic.address.street}, ${clinic.address.locality}, ${clinic.address.city}`,
)}&ll=${clinic.geo.latitude},${clinic.geo.longitude}&z=16&output=embed`;

/** "13:30" → "1:30 PM" */
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${period}`;
}

export function sessionText(session: Session) {
  return `${formatTime(session.opens)} – ${formatTime(session.closes)}`;
}
