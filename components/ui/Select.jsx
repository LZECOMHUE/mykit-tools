"use client";

export default function Select({
  label,
  options = [],
  helper,
  error,
  id,
  className = "",
  ...props
}) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-text-primary"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={`w-full px-3 py-2 rounded-[var(--radius-input)] border bg-white text-sm text-text-primary transition-colors duration-150 min-h-[38px] outline-none appearance-none cursor-pointer ${
          error
            ? "border-error focus:ring-2 focus:ring-error/20"
            : "border-border focus:border-accent focus:ring-2 focus:ring-accent/10"
        }`}
        {...props}
      >
        {options.map((opt) => {
          const value = typeof opt === "string" ? opt : opt.value;
          const label = typeof opt === "string" ? opt : opt.label;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {error && <p className="text-xs text-error">{error}</p>}
      {helper && !error && (
        <p className="text-xs text-text-muted">{helper}</p>
      )}
    </div>
  );
}
