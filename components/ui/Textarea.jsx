"use client";

export default function Textarea({
  label,
  helper,
  error,
  id,
  className = "",
  rows = 5,
  ...props
}) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        className={`w-full px-3 py-2 rounded-[var(--radius-input)] border bg-white text-sm text-text-primary placeholder:text-text-muted transition-colors duration-150 outline-none resize-y ${
          error
            ? "border-error focus:ring-2 focus:ring-error/20"
            : "border-border focus:border-accent focus:ring-2 focus:ring-accent/10"
        }`}
        {...props}
      />
      {error && <p className="text-xs text-error">{error}</p>}
      {helper && !error && (
        <p className="text-xs text-text-muted">{helper}</p>
      )}
    </div>
  );
}
