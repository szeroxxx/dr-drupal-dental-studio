"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarCheck, ChevronLeft, CircleCheck, LoaderCircle, Phone } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { WhatsAppIcon } from "@/components/ui/icons";
import {
  appointmentMessage,
  appointmentSchema,
  formatBookingDate,
  localToday,
  timeSlotGroups,
  type AppointmentInput,
} from "@/lib/booking";
import { clinic, formatTime, telHref, whatsappHref } from "@/lib/clinic-data";
import { treatmentLabel, treatmentOptions } from "@/lib/treatments";
import { cn } from "@/lib/utils";

type Status =
  | { state: "idle" }
  | { state: "error"; message: string }
  | { state: "sent"; mode: "webhook" | "whatsapp"; data: AppointmentInput };

const slotGroups = timeSlotGroups();

/**
 * Posts to /api/appointments. With APPOINTMENT_WEBHOOK_URL configured the request is delivered
 * to your CRM / automation; otherwise the visitor is handed to WhatsApp with their details filled in.
 * Either way, nothing claims a booking is confirmed until the studio replies.
 */
export function AppointmentForm({ className }: { className?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentInput>({
    resolver: zodResolver(appointmentSchema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", treatment: "", date: "", time: "", message: "", website: "" },
  });

  // Treatment pages link here with ?treatment=<slug> to preselect it.
  useEffect(() => {
    const preset = new URLSearchParams(window.location.search).get("treatment");
    if (preset && treatmentOptions.some((o) => o.value === preset)) setValue("treatment", preset);
  }, [setValue]);

  const onSubmit = handleSubmit(async (values) => {
    setStatus({ state: "idle" });
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; mode?: string; error?: string } | null;
      if (!response.ok || !result?.ok) throw new Error(result?.error ?? "");
      setStatus({ state: "sent", mode: result.mode === "webhook" ? "webhook" : "whatsapp", data: values });
    } catch (error) {
      const message = error instanceof Error && error.message ? error.message : "We couldn't send your request just now.";
      setStatus({ state: "error", message });
    }
  });

  if (status.state === "sent") {
    return (
      <BookingConfirmation
        mode={status.mode}
        data={status.data}
        className={className}
        onEdit={() => setStatus({ state: "idle" })}
      />
    );
  }

  const describedBy = (name: keyof AppointmentInput) => (errors[name] ? `${name}-error` : undefined);

  return (
    <form onSubmit={onSubmit} noValidate className={cn("relative grid gap-5 sm:grid-cols-2", className)}>
      <Field label="Full name" htmlFor="name" error={errors.name?.message} className="sm:col-span-2">
        <Input
          id="name"
          autoComplete="name"
          placeholder="Your full name"
          aria-invalid={!!errors.name}
          aria-describedby={describedBy("name")}
          {...register("name")}
        />
      </Field>

      <Field label="Mobile number" htmlFor="phone" error={errors.phone?.message}>
        <Input
          id="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          aria-invalid={!!errors.phone}
          aria-describedby={describedBy("phone")}
          {...register("phone")}
        />
      </Field>

      <Field label="Treatment" htmlFor="treatment" error={errors.treatment?.message}>
        <Select
          id="treatment"
          required
          aria-invalid={!!errors.treatment}
          aria-describedby={describedBy("treatment")}
          {...register("treatment")}
        >
          <option value="" disabled>
            Select a treatment
          </option>
          {treatmentOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Preferred date" htmlFor="date" error={errors.date?.message}>
        <Input
          id="date"
          type="date"
          min={localToday()}
          suppressHydrationWarning
          aria-invalid={!!errors.date}
          aria-describedby={describedBy("date")}
          {...register("date")}
        />
      </Field>

      <Field label="Preferred time" htmlFor="time" error={errors.time?.message}>
        <Select id="time" required aria-invalid={!!errors.time} aria-describedby={describedBy("time")} {...register("time")}>
          <option value="" disabled>
            Select a time
          </option>
          {slotGroups.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.slots.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {slot.label}
                </option>
              ))}
            </optgroup>
          ))}
        </Select>
      </Field>

      <Field
        label="Tell us about your concern"
        htmlFor="message"
        optional
        error={errors.message?.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="message"
          rows={3}
          placeholder="E.g. sensitivity on the lower left side, or a check-up after a long gap"
          aria-invalid={!!errors.message}
          aria-describedby={describedBy("message")}
          {...register("message")}
        />
      </Field>

      {/* Honeypot: invisible to people and assistive tech, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      {status.state === "error" && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 sm:col-span-2">
          {status.message} Please call{" "}
          <a href={telHref} className="font-semibold underline underline-offset-2">
            {clinic.phone.display}
          </a>{" "}
          instead.
        </p>
      )}

      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle aria-hidden className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <CalendarCheck aria-hidden />
              Book Appointment
            </>
          )}
        </Button>
        <p className="mt-3 text-center text-xs leading-relaxed text-muted">
          Your details are used only to arrange your appointment.{" "}
          <Link href="/privacy" className="underline underline-offset-2 transition-colors hover:text-brand-800">
            Privacy policy
          </Link>
        </p>
      </div>
    </form>
  );
}

function BookingConfirmation({
  mode,
  data,
  onEdit,
  className,
}: {
  mode: "webhook" | "whatsapp";
  data: AppointmentInput;
  onEdit: () => void;
  className?: string;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wa = whatsappHref(appointmentMessage(data));
  const firstName = data.name.trim().split(/\s+/)[0];

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  const summary = [
    { label: "Treatment", value: treatmentLabel(data.treatment) },
    { label: "Date", value: formatBookingDate(data.date) },
    { label: "Time", value: formatTime(data.time) },
  ];

  return (
    <div role="status" className={cn("flex flex-col items-start", className)}>
      <span className="grid size-12 place-items-center rounded-full bg-brand-100 text-brand-700">
        <CircleCheck aria-hidden className="size-6" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-5 font-serif text-3xl font-medium text-ink outline-none">
        {mode === "webhook" ? `Thank you, ${firstName}` : "One last step"}
      </h3>
      <p className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">
        {mode === "webhook"
          ? `Your request has reached the studio. We'll contact you on ${data.phone} to confirm your appointment.`
          : wa
            ? "Your request is ready to send. Open WhatsApp to send it — your appointment is confirmed once the studio replies."
            : `Please call the studio on ${clinic.phone.display} to confirm your appointment.`}
      </p>

      <dl className="mt-6 grid w-full gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
        {summary.map((item) => (
          <div key={item.label} className="bg-white px-4 py-3">
            <dt className="text-xs text-muted">{item.label}</dt>
            <dd className="mt-0.5 text-sm font-semibold text-ink">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 flex w-full flex-wrap gap-2.5">
        {mode === "whatsapp" && wa && (
          <ButtonLink href={wa} size="lg" className="grow sm:grow-0">
            <WhatsAppIcon />
            Send on WhatsApp
          </ButtonLink>
        )}
        <ButtonLink href={telHref} variant="secondary" size="lg" className="grow sm:grow-0">
          <Phone aria-hidden className="text-brand-700" />
          Call the studio
        </ButtonLink>
        <Button variant="ghost" size="lg" onClick={onEdit}>
          <ChevronLeft aria-hidden />
          Edit details
        </Button>
      </div>
    </div>
  );
}
