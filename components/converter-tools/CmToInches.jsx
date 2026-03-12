"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CmToInches() {
  return (
    <ConverterTemplate
      slug="cm-to-inches"
      inputUnit="cm"
      inputLabel="Centimetres"
      outputUnit="in"
      outputLabel="Inches"
      convert={(v) => v / 2.54}
      reverseConvert={(v) => v * 2.54}
      reverseSlug="inches-to-cm"
      precision={2}
      commonValues={[1, 5, 10, 15, 20, 30, 50, 100]}
      formula="inches = cm ÷ 2.54"
      inputPlaceholder="Enter length in cm"
      displayFormats={["decimal", "fraction"]}
      defaultFormat="decimal"
    />
  );
}
