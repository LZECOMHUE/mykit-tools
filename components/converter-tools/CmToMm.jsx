"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CmToMm() {
  return (
    <ConverterTemplate
      slug="cm-to-mm"
      inputUnit="cm"
      inputLabel="Centimetres"
      outputUnit="mm"
      outputLabel="Millimetres"
      convert={(v) => v * 10}
      reverseConvert={(v) => v / 10}
      reverseSlug="mm-to-cm"
      precision={0}
      commonValues={[0.5, 1, 2.5, 5, 10, 25, 50]}
      formula="mm = cm × 10"
      inputPlaceholder="Enter length in cm"
    />
  );
}
