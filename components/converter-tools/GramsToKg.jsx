"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GramsToKg() {
  return (
    <ConverterTemplate
      slug="grams-to-kg"
      inputUnit="g"
      inputLabel="Grams"
      outputUnit="kg"
      outputLabel="Kilograms"
      convert={(v) => v / 1000}
      reverseConvert={(v) => v * 1000}
      reverseSlug="kg-to-grams"
      precision={3}
      commonValues={[100, 250, 500, 750, 1000, 2000, 5000]}
      formula="kg = grams ÷ 1000"
      inputPlaceholder="Enter weight in grams"
    />
  );
}
