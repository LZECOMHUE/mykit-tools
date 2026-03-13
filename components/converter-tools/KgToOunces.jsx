"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KgToOunces() {
  return (
    <ConverterTemplate
      slug="kg-to-ounces"
      inputUnit="kg"
      inputLabel="Kilograms"
      outputUnit="oz"
      outputLabel="Ounces"
      convert={(v) => v * 35.274}
      reverseConvert={(v) => v / 35.274}
      reverseSlug="ounces-to-kg"
      precision={2}
      commonValues={[0.5, 1, 2, 5, 10, 25, 50]}
      formula="oz = kg x 35.274"
      inputPlaceholder="Enter weight in kg"
    />
  );
}
