"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function InchesToFeet() {
  return (
    <ConverterTemplate
      slug="inches-to-feet"
      inputUnit="in"
      inputLabel="Inches"
      outputUnit="ft"
      outputLabel="Feet"
      convert={(v) => v / 12}
      reverseConvert={(v) => v * 12}
      reverseSlug="feet-to-inches"
      precision={2}
      commonValues={[6, 12, 24, 36, 48, 60, 72]}
      formula="feet = inches ÷ 12"
      inputPlaceholder="Enter length in inches"
      displayFormats={["decimal", "feetInches"]}
    />
  );
}
