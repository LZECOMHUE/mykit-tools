"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function OzToGrams() {
  return (
    <ConverterTemplate
      slug="oz-to-grams"
      inputUnit="oz"
      inputLabel="Ounces"
      outputUnit="g"
      outputLabel="Grams"
      convert={(v) => v * 28.3495}
      reverseConvert={(v) => v / 28.3495}
      reverseSlug="grams-to-oz"
      precision={2}
      commonValues={[1, 2, 4, 6, 8, 12, 16]}
      formula="g = oz × 28.3495"
      inputPlaceholder="Enter weight in oz"
    />
  );
}
