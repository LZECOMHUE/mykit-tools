// Direction B logo — 34×34 accent-filled tile, counter-rotated, "m" in white 800.

export default function LogoChip({ size = 34 }) {
  return (
    <div
      className="grid place-items-center font-[800] text-white"
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: "var(--color-accent)",
        fontSize: Math.round(size * 0.47),
        transform: "rotate(-6deg)",
      }}
      aria-hidden
    >
      m
    </div>
  );
}
