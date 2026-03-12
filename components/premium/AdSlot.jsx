// Mediavine-ready placeholder ad slot.
// Empty until Mediavine is approved (50k sessions/month).
// Their script will auto-populate these divs based on data attributes.

export default function AdSlot({ position = "above-tool" }) {
  return (
    <div
      data-ad-slot={position}
      data-mediavine-ready="true"
      className="w-full"
      aria-hidden="true"
    />
  );
}
