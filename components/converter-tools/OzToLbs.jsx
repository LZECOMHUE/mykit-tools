"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function OzToLbs() {
  return (
    <ConverterTemplate
      slug="oz-to-lbs"
      inputUnit="oz"
      inputLabel="Ounces (weight)"
      outputUnit="lbs"
      outputLabel="Pounds"
      convert={(v) => v / 16}
      reverseConvert={(v) => v * 16}
      reverseSlug="lbs-to-oz"
      precision={2}
      commonValues={[1, 4, 8, 12, 16, 24, 32]}
      formula="lbs = oz ÷ 16"
      inputPlaceholder="Enter weight in ounces"
    />
  );
}
