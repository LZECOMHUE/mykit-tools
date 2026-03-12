"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CupsToGrams() {
  return (
    <ConverterTemplate
      slug="cups-to-grams"
      inputUnit="cups"
      inputLabel="Cups"
      outputUnit="g"
      outputLabel="Grams"
      convert={(v) => v * 236.588}
      reverseConvert={(v) => v / 236.588}
      reverseSlug="grams-to-cups"
      precision={0}
      commonValues={[0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4]}
      formula="grams ≈ cups × 236.588 (water/liquid)"
      inputPlaceholder="Enter amount in cups"
    />
  );
}
