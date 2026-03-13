"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SquareFeetToSquareMetres() {
  return (
    <ConverterTemplate
      slug="square-feet-to-square-metres"
      inputUnit="sq ft"
      inputLabel="Square Feet"
      outputUnit="sq m"
      outputLabel="Square Metres"
      convert={(v) => v * 0.092903}
      reverseConvert={(v) => v / 0.092903}
      reverseSlug="square-metres-to-square-feet"
      precision={2}
      commonValues={[10, 50, 100, 500, 1000, 2000, 5000]}
      formula="sq m = sq ft × 0.092903"
      inputPlaceholder="Enter area in square feet"
    />
  );
}
