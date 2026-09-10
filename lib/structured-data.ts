import type { BlogPost } from "./blog";
import { clinic } from "./clinic-data";
import { absoluteUrl, siteUrl } from "./site";

const dentistId = `${siteUrl}/#dentist`;

/**
 * Dentist (a schema.org LocalBusiness + MedicalBusiness subtype) and WebSite.
 * Opening hours and aggregate ratings are intentionally omitted until the working days are
 * confirmed; Google reads live hours and ratings from the Business Profile anyway.
 */
export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": dentistId,
        name: clinic.name,
        alternateName: clinic.brandName,
        url: `${siteUrl}/`,
        logo: absoluteUrl("/brand/logo.png"),
        image: absoluteUrl("/brand/logo.png"),
        telephone: clinic.phone.e164,
        ...(clinic.email ? { email: clinic.email } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address.street,
          addressLocality: `${clinic.address.locality}, ${clinic.address.city}`,
          addressRegion: clinic.address.region,
          postalCode: clinic.address.postalCode,
          addressCountry: clinic.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: clinic.geo.latitude,
          longitude: clinic.geo.longitude,
        },
        hasMap: clinic.links.googleProfile,
        sameAs: [clinic.links.googleProfile, clinic.links.justdial, ...clinic.social.map((s) => s.href)],
        medicalSpecialty: "Dentistry",
        areaServed: { "@type": "City", name: clinic.address.city },
        employee: {
          "@type": "Person",
          name: clinic.dentist.name,
          jobTitle: clinic.dentist.title,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: clinic.name,
        inLanguage: "en-IN",
        publisher: { "@id": dentistId },
      },
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": dentistId, "@type": "Dentist", name: clinic.name },
    publisher: { "@id": dentistId },
    inLanguage: "en-IN",
  };
}
