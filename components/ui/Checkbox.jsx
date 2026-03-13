"use client";

export default function Checkbox({
  checked = false,
  onChange,
  label,
  className = "",
  ...props
}) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-border text-accent focus:ring-accent cursor-pointer"
        {...props}
      />
      {label && (
        <span className="text-sm text-text-primary">{label}</span>
      )}
    </label>
  );
}
