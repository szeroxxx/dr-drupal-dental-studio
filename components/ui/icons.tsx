import type { SVGProps } from "react";
import type { TreatmentIconName } from "@/lib/treatments";

type IconProps = SVGProps<SVGSVGElement>;

/** Molar outline on a 24px grid, drawn to sit with Lucide's 1.6px line icons. */
const TOOTH_PATH =
  "M7.6 3.5C5.3 3.5 3.6 5.3 3.6 7.9c0 2.1.7 3.6 1.3 5.4.5 1.6.7 3.3 1.1 5 .3 1.3.9 2.2 1.8 2.2 1.1 0 1.4-1.3 1.7-2.7.3-1.4.6-3 2.5-3s2.2 1.6 2.5 3c.3 1.4.6 2.7 1.7 2.7.9 0 1.5-.9 1.8-2.2.4-1.7.6-3.4 1.1-5 .6-1.8 1.3-3.3 1.3-5.4 0-2.6-1.7-4.4-4-4.4-1.8 0-2.8 1-4.4 1s-2.6-1-4.4-1Z";

function Svg({ children, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Scaled-down tooth that leaves room for an accent mark. */
function SmallTooth({ x = 2.4, y = 3.2 }: { x?: number; y?: number }) {
  return <path d={TOOTH_PATH} transform={`translate(${x} ${y}) scale(0.8)`} vectorEffect="non-scaling-stroke" />;
}

export function ToothIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d={TOOTH_PATH} />
    </Svg>
  );
}

export function TreatmentIcon({ name, ...props }: IconProps & { name: TreatmentIconName }) {
  switch (name) {
    case "implant":
      return (
        <Svg {...props}>
          <path d="M6.8 3.5c-1.8 0-3 1.3-3 3.1 0 1.4.5 2.6 1.1 3.6h14.2c.6-1 1.1-2.2 1.1-3.6 0-1.8-1.2-3.1-3-3.1-1.6 0-2.6.8-5.2.8s-3.6-.8-5.2-.8Z" />
          <path d="M8.6 13h6.8M9.1 15.5h5.8M9.7 18h4.6M10.5 20.5h3" />
        </Svg>
      );
    case "rootCanal":
      return (
        <Svg {...props}>
          <path d={TOOTH_PATH} />
          <path d="M9.9 8.6 9.2 15.8M14.1 8.6l.7 7.2" />
        </Svg>
      );
    case "cleaning":
      return (
        <Svg {...props}>
          <SmallTooth />
          <circle cx="19.6" cy="4.2" r="1.7" />
          <circle cx="21.2" cy="8.4" r="0.9" />
        </Svg>
      );
    case "whitening":
      return (
        <Svg {...props}>
          <SmallTooth />
          <path d="M19.8 1.8v4.2M17.7 3.9h4.2M4 1.9v2.4M2.8 3.1h2.4" />
        </Svg>
      );
    case "braces":
      return (
        <Svg {...props}>
          <rect x="3.5" y="5.5" width="5" height="8" rx="1.8" />
          <rect x="9.5" y="5.5" width="5" height="8" rx="1.8" />
          <rect x="15.5" y="5.5" width="5" height="8" rx="1.8" />
          <path d="M2 9.5h20" />
          <path d="M5 8.5h2v2H5zM11 8.5h2v2h-2zM17 8.5h2v2h-2z" fill="currentColor" stroke="none" />
          <path d="M4.5 17.5c3 2.4 12 2.4 15 0" />
        </Svg>
      );
    case "extraction":
      return (
        <Svg {...props}>
          <SmallTooth x={0.4} y={4.2} />
          <path d="M19.5 12V3.5M16.8 6.2l2.7-2.7 2.7 2.7" />
        </Svg>
      );
    case "kids":
      return (
        <Svg {...props}>
          <path d={TOOTH_PATH} />
          <path d="M9.6 10.4c1.3 1.2 3.5 1.2 4.8 0" />
          <circle cx="9.4" cy="7.9" r="0.55" fill="currentColor" stroke="none" />
          <circle cx="14.6" cy="7.9" r="0.55" fill="currentColor" stroke="none" />
        </Svg>
      );
    case "crown":
      return (
        <Svg {...props}>
          <path d="m3.5 8.5 3.8 3.4L12 5.5l4.7 6.4 3.8-3.4-1.9 8.9H5.4Z" />
          <path d="M5.6 20.5h12.8" />
        </Svg>
      );
  }
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.5 11.9a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.3-4.4a8.4 8.4 0 1 1 15.7-4.2Z" />
      <path
        d="M9.1 7.9c-.3 0-.7.1-1 .5-.3.4-.9 1-.9 2.3 0 1.3 1 2.6 1.1 2.8.1.2 1.9 3 4.7 4.1 2.3.9 2.8.7 3.3.7.5 0 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.4l-1.9-.9c-.3-.1-.5-.2-.7.1l-.9 1.1c-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.8-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.5l-.9-2.1c-.2-.5-.4-.5-.6-.5h-.5Z"
        fill="currentColor"
        stroke="none"
      />
    </Svg>
  );
}

export function GoogleIcon(props: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false" {...props}>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.49 12c0-.73.13-1.43.35-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}
