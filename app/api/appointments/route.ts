import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/booking";
import { treatmentLabel } from "@/lib/treatments";

/**
 * Appointment requests.
 *  - APPOINTMENT_WEBHOOK_URL set → the validated request is forwarded (CRM, Zapier/Make/n8n, email
 *    service, practice-management system) and the visitor sees a "request received" confirmation.
 *  - Not set, or the webhook fails → responds with mode "whatsapp" and the visitor sends the
 *    prefilled request on WhatsApp themselves. Nothing is silently dropped.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields." }, { status: 422 });
  }

  const { website, ...appointment } = parsed.data;
  // Honeypot filled in: pretend success so bots learn nothing.
  if (website) return NextResponse.json({ ok: true, mode: "whatsapp" });

  const webhookUrl = process.env.APPOINTMENT_WEBHOOK_URL;
  if (!webhookUrl) return NextResponse.json({ ok: true, mode: "whatsapp" });

  try {
    const secret = process.env.APPOINTMENT_WEBHOOK_SECRET;
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
      },
      body: JSON.stringify({
        ...appointment,
        treatmentLabel: treatmentLabel(appointment.treatment),
        source: "website",
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook responded with ${response.status}`);
    return NextResponse.json({ ok: true, mode: "webhook" });
  } catch (error) {
    console.error("[appointments] webhook delivery failed", error);
    return NextResponse.json({ ok: true, mode: "whatsapp" });
  }
}
