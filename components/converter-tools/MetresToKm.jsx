"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MetresToKm() {
  return (
    <ConverterTemplate
      slug="metres-to-km"
      inputUnit="m"
      inputLabel="Metres"
      outputUnit="km"
      outputLabel="Kilometres"
      convert={(v) => v / 1000}
      reverseConvert={(v) => v * 1000}
      reverseSlug="km-to-metres"
      precision={3}
      commonValues={[100, 250, 500, 1000, 2000, 5000, 10000]}
      formula="km = metres ÷ 1000"
      inputPlaceholder="Enter distance in metres"
    />
  );
}
