"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function FlOzToMl() {
  return (
    <ConverterTemplate
      slug="fl-oz-to-ml"
      inputUnit="fl oz"
      inputLabel="Fluid Ounces (US)"
      outputUnit="ml"
      outputLabel="Millilitres"
      convert={(v) => v * 29.5735}
      reverseConvert={(v) => v / 29.5735}
      reverseSlug="ml-to-fl-oz"
      precision={1}
      commonValues={[1, 2, 4, 8, 16, 32, 64]}
      formula="ml = fl oz x 29.5735"
      inputPlaceholder="Enter fluid ounces"
    />
  );
}
