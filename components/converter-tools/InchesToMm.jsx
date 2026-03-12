"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function InchesToMm() {
  return (
    <ConverterTemplate
      slug="inches-to-mm"
      inputUnit="in"
      inputLabel="Inches"
      outputUnit="mm"
      outputLabel="Millimetres"
      convert={(v) => v * 25.4}
      reverseConvert={(v) => v / 25.4}
      reverseSlug="mm-to-inches"
      precision={1}
      commonValues={[0.5, 1, 2, 5, 10, 12, 24]}
      formula="mm = inches × 25.4"
      inputPlaceholder="Enter length in inches"
    />
  );
}
