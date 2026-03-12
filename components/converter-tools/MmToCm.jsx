"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MmToCm() {
  return (
    <ConverterTemplate
      slug="mm-to-cm"
      inputUnit="mm"
      inputLabel="Millimetres"
      outputUnit="cm"
      outputLabel="Centimetres"
      convert={(v) => v / 10}
      reverseConvert={(v) => v * 10}
      reverseSlug="cm-to-mm"
      precision={1}
      commonValues={[1, 5, 10, 25, 50, 100, 500]}
      formula="cm = mm ÷ 10"
      inputPlaceholder="Enter length in mm"
    />
  );
}
