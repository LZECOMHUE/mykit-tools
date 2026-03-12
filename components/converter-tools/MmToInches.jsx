"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MmToInches() {
  return (
    <ConverterTemplate
      slug="mm-to-inches"
      inputUnit="mm"
      inputLabel="Millimetres"
      outputUnit="in"
      outputLabel="Inches"
      convert={(v) => v / 25.4}
      reverseConvert={(v) => v * 25.4}
      reverseSlug="inches-to-mm"
      precision={3}
      commonValues={[1, 5, 10, 25, 50, 100, 500]}
      formula="inches = mm ÷ 25.4"
      inputPlaceholder="Enter length in mm"
    />
  );
}
