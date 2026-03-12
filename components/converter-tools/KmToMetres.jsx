"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KmToMetres() {
  return (
    <ConverterTemplate
      slug="km-to-metres"
      inputUnit="km"
      inputLabel="Kilometres"
      outputUnit="m"
      outputLabel="Metres"
      convert={(v) => v * 1000}
      reverseConvert={(v) => v / 1000}
      reverseSlug="metres-to-km"
      precision={0}
      commonValues={[0.5, 1, 2, 5, 10, 20, 50]}
      formula="metres = km × 1000"
      inputPlaceholder="Enter distance in km"
    />
  );
}
