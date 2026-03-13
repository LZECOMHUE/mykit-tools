"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function NauticalMilesToKm() {
  return (
    <ConverterTemplate
      slug="nautical-miles-to-km"
      inputUnit="nm"
      inputLabel="Nautical Miles"
      outputUnit="km"
      outputLabel="Kilometres"
      convert={(v) => v * 1.852}
      reverseConvert={(v) => v / 1.852}
      reverseSlug="km-to-nautical-miles"
      precision={2}
      commonValues={[1, 5, 10, 25, 50, 100, 500]}
      formula="km = nm x 1.852"
      inputPlaceholder="Enter distance in nautical miles"
    />
  );
}
