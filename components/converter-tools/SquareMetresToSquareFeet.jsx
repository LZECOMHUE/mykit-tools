"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SquareMetresToSquareFeet() {
  return (
    <ConverterTemplate
      slug="square-metres-to-square-feet"
      inputUnit="sq m"
      inputLabel="Square Metres"
      outputUnit="sq ft"
      outputLabel="Square Feet"
      convert={(v) => v * 10.7639}
      reverseConvert={(v) => v / 10.7639}
      reverseSlug="square-feet-to-square-metres"
      precision={2}
      commonValues={[10, 50, 100, 500, 1000, 2000, 5000]}
      formula="sq ft = sq m × 10.7639"
      inputPlaceholder="Enter area in square metres"
    />
  );
}
