"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LbsToOz() {
  return (
    <ConverterTemplate
      slug="lbs-to-oz"
      inputUnit="lbs"
      inputLabel="Pounds"
      outputUnit="oz"
      outputLabel="Ounces (weight)"
      convert={(v) => v * 16}
      reverseConvert={(v) => v / 16}
      reverseSlug="oz-to-lbs"
      precision={1}
      commonValues={[0.25, 0.5, 1, 2, 5, 10, 20]}
      formula="oz = lbs × 16"
      inputPlaceholder="Enter weight in lbs"
    />
  );
}
