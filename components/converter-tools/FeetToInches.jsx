"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function FeetToInches() {
  return (
    <ConverterTemplate
      slug="feet-to-inches"
      inputUnit="ft"
      inputLabel="Feet"
      outputUnit="in"
      outputLabel="Inches"
      convert={(v) => v * 12}
      reverseConvert={(v) => v / 12}
      reverseSlug="inches-to-feet"
      precision={1}
      commonValues={[1, 2, 3, 4, 5, 6, 10]}
      formula="inches = feet × 12"
      inputPlaceholder="Enter length in feet"
    />
  );
}
