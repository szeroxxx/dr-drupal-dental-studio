import type { MetadataRoute } from "next";
import { clinic } from "@/lib/clinic-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: "Dr. Dhrupal's",
    description: "Doctor-led dental care in Thaltej, Ahmedabad",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#f3f7f9",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
