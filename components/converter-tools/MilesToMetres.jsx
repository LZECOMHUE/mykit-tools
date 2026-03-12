"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MilesToMetres() {
  return (
    <ConverterTemplate
      slug="miles-to-metres"
      inputUnit="mi"
      inputLabel="Miles"
      outputUnit="m"
      outputLabel="Metres"
      convert={(v) => v * 1609.344}
      reverseConvert={(v) => v / 1609.344}
      reverseSlug="metres-to-miles"
      precision={0}
      commonValues={[0.1, 0.25, 0.5, 1, 2, 5, 10]}
      formula="metres = miles × 1609.344"
      inputPlaceholder="Enter distance in miles"
    />
  );
}
