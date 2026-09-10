import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { clinic } from "@/lib/clinic-data";

export const alt = `${clinic.name} — dentist in Thaltej, Ahmedabad`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px 84px",
          background: "#f3f7f9",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -170,
            top: -170,
            width: 560,
            height: 560,
            borderRadius: 9999,
            border: "2px solid rgba(0, 173, 181, 0.28)",
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
        <img src={logoSrc} width={620} height={196} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, color: "#17242e", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Dentist in Thaltej, Ahmedabad
          </div>
          <div style={{ marginTop: 22, fontSize: 30, color: "#0b6f75" }}>
            {`Rated ${clinic.ratings.google.value.toFixed(1)} on Google · ${clinic.phone.display}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
