"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function InchesToCm() {
  return (
    <ConverterTemplate
      slug="inches-to-cm"
      inputUnit="in"
      inputLabel="Inches"
      outputUnit="cm"
      outputLabel="Centimetres"
      convert={(v) => v * 2.54}
      reverseConvert={(v) => v / 2.54}
      reverseSlug="cm-to-inches"
      precision={2}
      commonValues={[1, 3, 6, 12, 24, 36, 48, 72]}
      formula="cm = inches × 2.54"
      inputPlaceholder="Enter length in inches"
    />
  );
}
