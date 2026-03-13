"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SticksButterToGrams() {
  return (
    <ConverterTemplate
      slug="sticks-butter-to-grams"
      inputUnit="sticks"
      inputLabel="Butter Sticks"
      outputUnit="g"
      outputLabel="Grams"
      convert={(v) => v * 113.4}
      reverseConvert={(v) => v / 113.4}
      reverseSlug="grams-to-sticks-butter"
      precision={1}
      commonValues={[0.5, 1, 1.5, 2, 3, 4]}
      formula="g = sticks x 113.4"
      inputPlaceholder="Enter number of butter sticks"
    />
  );
}
