"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function BarToPsi() {
  return (
    <ConverterTemplate
      slug="bar-to-psi"
      inputUnit="bar"
      inputLabel="Bar"
      outputUnit="PSI"
      outputLabel="Pounds per Square Inch"
      convert={(v) => v * 14.5038}
      reverseConvert={(v) => v / 14.5038}
      reverseSlug="psi-to-bar"
      precision={4}
      commonValues={[0.5, 1, 1.5, 2, 3, 5, 10]}
      formula="PSI = bar × 14.5038"
      inputPlaceholder="Enter pressure in bar"
    />
  );
}
