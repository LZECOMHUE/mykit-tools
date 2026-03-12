"use client";

export default function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  showValue = true,
  formatValue,
  className = "",
}) {
  const display = formatValue ? formatValue(value) : value;

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="text-sm font-medium text-text-primary">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-mono-num text-text-secondary">
              {display}
            </span>
          )}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        className="w-full h-2 bg-border rounded-full appearance-none cursor-pointer accent-accent"
      />
    </div>
  );
}
