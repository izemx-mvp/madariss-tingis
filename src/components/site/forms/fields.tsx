import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-2xl border bg-white px-4 py-3 text-base text-ink-900 shadow-sm transition-colors placeholder:text-ink-600/50 focus:border-teal-700 focus:outline-none focus-visible:outline-none focus:ring-4 focus:ring-teal-500/15";

export function Field({
  label,
  error,
  hint,
  optional,
  htmlFor,
  children,
  className,
}: {
  label: string;
  error?: string | undefined;
  hint?: string | undefined;
  optional?: boolean;
  htmlFor: string;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-bold text-ink-900">
        <span>{label}</span>
        {optional ? <span className="text-xs font-medium text-ink-600">facultatif</span> : null}
      </label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-sm font-bold text-coral-700">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-sm text-ink-600">{hint}</p>
      ) : null}
    </div>
  );
}

export const TextInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }>(
  ({ className, invalid, ...props }, ref) => (
    <input
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(control, invalid ? "border-coral-500" : "border-line", className)}
      {...props}
    />
  ),
);
TextInput.displayName = "TextInput";

export const SelectInput = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }>(
  ({ className, invalid, children, ...props }, ref) => (
    <select
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(control, "appearance-none bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10", invalid ? "border-coral-500" : "border-line", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23007F86' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  ),
);
SelectInput.displayName = "SelectInput";

export const TextArea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }>(
  ({ className, invalid, ...props }, ref) => (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(control, "min-h-32 resize-y", invalid ? "border-coral-500" : "border-line", className)}
      {...props}
    />
  ),
);
TextArea.displayName = "TextArea";

/** Validation téléphone marocain simple : 06, 07, 05… ou +212 */
export const phoneRegex = /^(?:\+212|0)[5-7](?:[\s.-]?\d){8}$/;

export const levels = [
  "Maternelle — Petite section",
  "Maternelle — Moyenne section",
  "Maternelle — Grande section",
  "Primaire — 1re année",
  "Primaire — 2e année",
  "Primaire — 3e année",
  "Primaire — 4e année",
  "Primaire — 5e année",
  "Primaire — 6e année",
  "Collège — 1re année",
  "Collège — 2e année",
  "Collège — 3e année",
  "Lycée — Tronc commun",
  "Lycée — 1re année du baccalauréat",
  "Lycée — 2e année du baccalauréat",
] as const;
