import { clinic } from "./clinic-data";

/**
 * Blog content lives here until a CMS or MDX pipeline is connected.
 * Swap `getPosts` / `getPost` for CMS fetches and no component needs to change.
 * VERIFY — have Dr. Dhrupal review clinical content before publishing.
 */

export const blogCategories = [
  "Dental Care",
  "Oral Health",
  "Treatments",
  "Preventive Dentistry",
  "Kids Dentistry",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  publishedAt: string;
  readingMinutes: number;
  body: BlogBlock[];
};

const posts: BlogPost[] = [
  {
    slug: "your-first-visit",
    title: "Your first visit: what to expect at the studio",
    excerpt:
      "From the first conversation to your follow-up, here's how an appointment at the studio usually unfolds — and what to bring along.",
    category: "Dental Care",
    publishedAt: "2026-09-10",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "If it's been a while since you last saw a dentist, or you're simply new to the studio, it helps to know what happens when you arrive. Here is how a first appointment usually unfolds.",
      },
      { type: "h2", text: "A conversation first" },
      {
        type: "p",
        text: "We start by listening. Tell us what's bothering you, or what you'd like to change about your smile, along with any medical history and medicines you take.",
      },
      { type: "h2", text: "A careful examination" },
      {
        type: "p",
        text: "Your teeth, gums and bite are checked, and X-rays are taken only where they're needed to see what can't be seen by eye.",
      },
      { type: "h2", text: "Your options, explained" },
      {
        type: "p",
        text: "If treatment is needed, you'll hear the options in plain language — including timelines and costs — before anything begins. You're welcome to take time to decide.",
      },
      { type: "h2", text: "What to bring" },
      {
        type: "ul",
        items: [
          "A list of any medicines you take",
          "Previous dental X-rays or reports, if you have them",
          "Any questions you'd like to ask — it helps to note them down",
        ],
      },
      {
        type: "p",
        text: `To book, call ${clinic.phone.display}, send a message on WhatsApp, or use the appointment form on this website.`,
      },
    ],
  },
  {
    slug: "daily-oral-care-routine",
    title: "A simple daily routine for healthier teeth and gums",
    excerpt:
      "Good oral health is mostly built at home. These everyday habits make the biggest difference between visits.",
    category: "Preventive Dentistry",
    publishedAt: "2026-09-10",
    readingMinutes: 3,
    body: [
      {
        type: "p",
        text: "Most of what keeps teeth and gums healthy happens at home, a couple of minutes at a time. None of it is complicated — consistency matters more than any special product.",
      },
      { type: "h2", text: "Brush twice a day, for two minutes" },
      {
        type: "p",
        text: "Use a soft-bristled brush and a fluoride toothpaste, morning and night. Angle the bristles towards the gumline and use small, gentle movements rather than hard scrubbing.",
      },
      { type: "h2", text: "Clean between your teeth daily" },
      {
        type: "p",
        text: "A toothbrush can't reach the tight spaces between teeth. Floss or interdental brushes remove plaque from those areas — ask us which type or size suits your teeth.",
      },
      { type: "h2", text: "Watch how often you have sugar" },
      {
        type: "p",
        text: "It's how often you have sugary food and drinks, not just how much, that gives decay a chance to start. Keeping sweets to mealtimes and drinking water between meals helps.",
      },
      { type: "h2", text: "Keep up regular check-ups" },
      {
        type: "p",
        text: "Routine visits mean small problems can be treated while they're still small. Your dentist will suggest how often to come in, based on your own teeth and gums.",
      },
      {
        type: "p",
        text: "This article is general information and isn't a substitute for advice about your own teeth. If something hurts or doesn't look right, book a check-up.",
      },
    ],
  },
];

export function getPosts() {
  return [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${iso}T00:00:00+05:30`));
}
