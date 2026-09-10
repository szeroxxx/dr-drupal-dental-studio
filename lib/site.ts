/** Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in production. */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const vercelDeploymentUrl = process.env.VERCEL_URL?.trim();
const fallbackSiteUrl = vercelDeploymentUrl
  ? vercelDeploymentUrl.startsWith("http")
    ? vercelDeploymentUrl
    : `https://${vercelDeploymentUrl}`
  : "http://localhost:3000";
export const siteUrl = (configuredSiteUrl || fallbackSiteUrl).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Treatments", href: "/treatments" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
