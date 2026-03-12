"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MilesToKm() {
  return (
    <ConverterTemplate
      slug="miles-to-km"
      inputUnit="mi"
      inputLabel="Miles"
      outputUnit="km"
      outputLabel="Kilometres"
      convert={(v) => v * 1.60934}
      reverseConvert={(v) => v / 1.60934}
      reverseSlug="km-to-miles"
      precision={2}
      commonValues={[1, 5, 10, 13.1, 26.2, 50, 100]}
      formula="km = miles × 1.60934"
      inputPlaceholder="Enter distance in miles"
    />
  );
}
