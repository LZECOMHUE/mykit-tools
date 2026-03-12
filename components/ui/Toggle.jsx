"use client";

export default function Toggle({
  label,
  checked = false,
  onChange,
  className = "",
}) {
  return (
    <label
      className={`inline-flex items-center gap-3 cursor-pointer ${className}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <div className="w-10 h-6 bg-border rounded-full peer-checked:bg-accent transition-colors duration-200" />
        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 peer-checked:translate-x-4" />
      </div>
      {label && (
        <span className="text-sm font-medium text-text-primary">{label}</span>
      )}
    </label>
  );
}
