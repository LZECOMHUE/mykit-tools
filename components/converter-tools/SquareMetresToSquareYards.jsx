"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SquareMetresToSquareYards() {
  return (
    <ConverterTemplate
      slug="square-metres-to-square-yards"
      inputUnit="sq m"
      inputLabel="Square Metres"
      outputUnit="sq yd"
      outputLabel="Square Yards"
      convert={(v) => v * 1.19599}
      reverseConvert={(v) => v / 1.19599}
      reverseSlug="square-yards-to-square-metres"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 500, 1000]}
      formula="sq yd = sq m × 1.19599"
      inputPlaceholder="Enter area in square metres"
    />
  );
}
