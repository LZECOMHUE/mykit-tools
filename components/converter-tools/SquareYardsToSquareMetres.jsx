"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SquareYardsToSquareMetres() {
  return (
    <ConverterTemplate
      slug="square-yards-to-square-metres"
      inputUnit="sq yd"
      inputLabel="Square Yards"
      outputUnit="sq m"
      outputLabel="Square Metres"
      convert={(v) => v * 0.836127}
      reverseConvert={(v) => v / 0.836127}
      reverseSlug="square-metres-to-square-yards"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 500, 1000]}
      formula="sq m = sq yd × 0.836127"
      inputPlaceholder="Enter area in square yards"
    />
  );
}
