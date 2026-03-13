"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SquareKmToSquareMiles() {
  return (
    <ConverterTemplate
      slug="square-km-to-square-miles"
      inputUnit="sq km"
      inputLabel="Square Kilometres"
      outputUnit="sq mi"
      outputLabel="Square Miles"
      convert={(v) => v * 0.386102}
      reverseConvert={(v) => v / 0.386102}
      reverseSlug="square-miles-to-square-km"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 500]}
      formula="sq mi = sq km × 0.386102"
      inputPlaceholder="Enter area in square kilometres"
    />
  );
}
