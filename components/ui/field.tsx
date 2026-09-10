import type { ComponentProps, ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const control = cn(
  "w-full rounded-[0.7rem] border border-line-strong bg-white px-4 text-[0.9375rem] text-ink outline-none",
  "transition-[border-color,box-shadow] duration-200 placeholder:text-muted/70",
  "hover:border-brand-300 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/15",
  "aria-[invalid=true]:border-red-600 aria-[invalid=true]:focus:ring-red-600/15",
);

type FieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
};

/** Label + control + message. Error ids follow `${htmlFor}-error` for aria-describedby. */
export function Field({ label, htmlFor, error, hint, optional, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label}
        {optional && <span className="ml-1 font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-[0.8125rem] font-medium text-red-700">
          {error}
        </p>
      ) : hint ? (
        <p id={`${htmlFor}-hint`} className="text-[0.8125rem] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, "min-h-28 resize-y py-3 leading-relaxed", className)} {...props} />;
}

/** Native select for the best mobile pickers; `required` lets the empty prompt render muted via :invalid. */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select className={cn(control, "h-12 cursor-pointer appearance-none pr-11 invalid:text-muted", className)} {...props}>
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted"
      />
    </div>
  );
}
