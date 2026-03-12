"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function StoneToKg() {
  return (
    <ConverterTemplate
      slug="stone-to-kg"
      inputUnit="st"
      inputLabel="Stone"
      outputUnit="kg"
      outputLabel="Kilograms"
      convert={(v) => v * 6.35029}
      reverseConvert={(v) => v / 6.35029}
      reverseSlug="kg-to-stone"
      precision={2}
      commonValues={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20]}
      formula="kg = st × 6.35029"
      inputPlaceholder="Enter weight in stone"
    />
  );
}
