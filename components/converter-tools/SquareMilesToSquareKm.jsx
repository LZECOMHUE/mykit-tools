"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function SquareMilesToSquareKm() {
  return (
    <ConverterTemplate
      slug="square-miles-to-square-km"
      inputUnit="sq mi"
      inputLabel="Square Miles"
      outputUnit="sq km"
      outputLabel="Square Kilometres"
      convert={(v) => v * 2.58999}
      reverseConvert={(v) => v / 2.58999}
      reverseSlug="square-km-to-square-miles"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 500]}
      formula="sq km = sq mi × 2.58999"
      inputPlaceholder="Enter area in square miles"
    />
  );
}
