"use client";

const variants = {
  primary:
    "bg-accent text-white hover:bg-accent-hover shadow-sm",
  secondary:
    "bg-white text-text-primary border border-border hover:bg-surface-hover hover:border-border-hover",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-surface-hover",
  premium:
    "bg-accent-warm text-white hover:brightness-110 shadow-sm",
};

const sizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium rounded-[var(--radius-input)] min-h-[38px] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
