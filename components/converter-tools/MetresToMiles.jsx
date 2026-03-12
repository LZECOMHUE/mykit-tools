"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MetresToMiles() {
  return (
    <ConverterTemplate
      slug="metres-to-miles"
      inputUnit="m"
      inputLabel="Metres"
      outputUnit="mi"
      outputLabel="Miles"
      convert={(v) => v / 1609.344}
      reverseConvert={(v) => v * 1609.344}
      reverseSlug="miles-to-metres"
      precision={3}
      commonValues={[100, 200, 400, 500, 800, 1000, 1500]}
      formula="miles = metres ÷ 1609.344"
      inputPlaceholder="Enter distance in metres"
    />
  );
}
