"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LbsToKg() {
  return (
    <ConverterTemplate
      slug="lbs-to-kg"
      inputUnit="lbs"
      inputLabel="Pounds"
      outputUnit="kg"
      outputLabel="Kilograms"
      convert={(v) => v / 2.20462}
      reverseConvert={(v) => v * 2.20462}
      reverseSlug="kg-to-lbs"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 150, 200]}
      formula="kg = lbs ÷ 2.20462"
      inputPlaceholder="Enter weight in lbs"
    />
  );
}
