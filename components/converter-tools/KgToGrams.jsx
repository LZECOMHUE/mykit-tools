"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KgToGrams() {
  return (
    <ConverterTemplate
      slug="kg-to-grams"
      inputUnit="kg"
      inputLabel="Kilograms"
      outputUnit="g"
      outputLabel="Grams"
      convert={(v) => v * 1000}
      reverseConvert={(v) => v / 1000}
      reverseSlug="grams-to-kg"
      precision={0}
      commonValues={[0.1, 0.25, 0.5, 1, 2, 5, 10]}
      formula="grams = kg × 1000"
      inputPlaceholder="Enter weight in kg"
    />
  );
}
