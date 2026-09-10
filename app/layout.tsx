import type { Metadata, Viewport } from "next";
import { Allura, Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Providers } from "@/components/providers";
import { JsonLd } from "@/components/seo/json-ld";
import { clinic } from "@/lib/clinic-data";
import { siteUrl } from "@/lib/site";
import { siteGraph } from "@/lib/structured-data";
import { cn } from "@/lib/utils";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});
const allura = Allura({ subsets: ["latin"], weight: "400", variable: "--font-allura", display: "swap" });

const title = `Dentist in Thaltej, Ahmedabad | ${clinic.name}`;
const description = `${clinic.name} is a doctor-led dental clinic in Thaltej, Ahmedabad, rated ${clinic.ratings.google.value.toFixed(
  1,
)} on Google. Book implants, root canal treatment, cleaning, whitening, braces and more. Call ${clinic.phone.display}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${clinic.name}` },
  description,
  applicationName: clinic.name,
  keywords: [
    "dentist in Thaltej",
    "dental clinic Thaltej",
    "dentist Ahmedabad",
    "dental clinic near Gulab Tower Road",
    "Dr. Dhrupal Modi",
    clinic.name,
  ],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: clinic.name, url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, address: true },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: "#f3f7f9",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={cn(jakarta.variable, cormorant.variable, allura.variable, "antialiased")}>
      <body>
        <a
          href="#main"
          className="sr-only rounded-lg bg-white px-4 py-2 font-semibold text-ink shadow-lift focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100]"
        >
          Skip to content
        </a>
        <JsonLd data={siteGraph()} />
        <Providers>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <MobileActionBar />
          <div aria-hidden className="h-[4.5rem] md:hidden" />
        </Providers>
      </body>
    </html>
  );
}
