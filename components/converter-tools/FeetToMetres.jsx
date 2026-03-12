"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function FeetToMetres() {
  return (
    <ConverterTemplate
      slug="feet-to-metres"
      inputUnit="ft"
      inputLabel="Feet"
      outputUnit="m"
      outputLabel="Metres"
      convert={(v) => v * 0.3048}
      reverseConvert={(v) => v / 0.3048}
      reverseSlug="metres-to-feet"
      precision={2}
      commonValues={[1, 3, 5, 6, 10, 20, 50, 100]}
      formula="metres = feet × 0.3048"
      inputPlaceholder="Enter height in feet"
    />
  );
}
