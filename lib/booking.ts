// zod/mini: same validation as classic zod, but tree-shakable — keeps the client bundle small.
import * as z from "zod/mini";
import { clinic, formatTime, sessionText, type Session } from "./clinic-data";
import { treatmentLabel } from "./treatments";

/** ISO date (YYYY-MM-DD) offset from today, in UTC — used as a lenient server-side floor. */
function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/** Today's date in the visitor's own timezone, for the date input's `min`. */
export function localToday() {
  const d = new Date();
  return new Date(d.getTime() - d.getTimezoneOffset() * 60_000).toISOString().slice(0, 10);
}

/** Shared by the form (client) and /api/appointments (server). */
export const appointmentSchema = z.object({
  name: z
    .string()
    .check(
      z.trim(),
      z.minLength(2, "Please enter your full name."),
      z.maxLength(80, "Please keep your name under 80 characters."),
    ),
  phone: z
    .string()
    .check(
      z.trim(),
      z.refine((v) => /^(?:91|0)?[6-9]\d{9}$/.test(v.replace(/\D/g, "")), "Enter a valid 10-digit mobile number."),
    ),
  treatment: z.string().check(z.minLength(1, "Please choose a treatment.")),
  date: z
    .string()
    .check(
      z.minLength(1, "Choose a preferred date."),
      z.refine((v) => /^\d{4}-\d{2}-\d{2}$/.test(v) && v >= isoDate(-1), "Choose today or a later date."),
    ),
  time: z.string().check(z.minLength(1, "Choose a preferred time.")),
  message: z.optional(z.string().check(z.trim(), z.maxLength(600, "Please keep this under 600 characters."))),
  // Honeypot — hidden from people, often filled in by bots.
  website: z.optional(z.string()),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function fromMinutes(total: number) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

/** 30-minute appointment slots for each clinic session. */
export function timeSlotGroups(sessions: Session[] = clinic.hours.sessions) {
  return sessions.map((session) => {
    const slots: { value: string; label: string }[] = [];
    for (let t = toMinutes(session.opens); t <= toMinutes(session.closes) - 30; t += 30) {
      const value = fromMinutes(t);
      slots.push({ value, label: formatTime(value) });
    }
    return { label: `${session.label} · ${sessionText(session)}`, slots };
  });
}

export function formatBookingDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "long" }).format(date);
}

/** Plain-text summary used for the WhatsApp hand-off. */
export function appointmentMessage(data: AppointmentInput) {
  const lines = [
    `Hello ${clinic.name}, I'd like to book an appointment.`,
    "",
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
    `Treatment: ${treatmentLabel(data.treatment)}`,
    `Preferred date: ${formatBookingDate(data.date)}`,
    `Preferred time: ${formatTime(data.time)}`,
  ];
  if (data.message) lines.push(`Concern: ${data.message}`);
  return lines.join("\n");
}
