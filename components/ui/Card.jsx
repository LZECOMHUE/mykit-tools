export default function Card({
  children,
  className = "",
  hover = false,
  padding = true,
  ...props
}) {
  return (
    <div
      className={`bg-white border border-border rounded-[var(--radius-card)] ${
        padding ? "p-4 sm:p-5" : ""
      } ${
        hover
          ? "transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-hover cursor-pointer"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
