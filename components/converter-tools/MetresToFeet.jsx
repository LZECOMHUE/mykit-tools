"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MetresToFeet() {
  return (
    <ConverterTemplate
      slug="metres-to-feet"
      inputUnit="m"
      inputLabel="Metres"
      outputUnit="ft"
      outputLabel="Feet"
      convert={(v) => v / 0.3048}
      reverseConvert={(v) => v * 0.3048}
      reverseSlug="feet-to-metres"
      precision={2}
      commonValues={[1, 1.5, 1.6, 1.7, 1.75, 1.8, 1.85, 1.9, 2, 3, 5, 10]}
      formula="feet = metres ÷ 0.3048"
      inputPlaceholder="Enter height in metres"
      displayFormats={["feetInches", "decimal"]}
      defaultFormat="feetInches"
    />
  );
}
