"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function OzToMl() {
  return (
    <ConverterTemplate
      slug="oz-to-ml"
      inputUnit="fl oz"
      inputLabel="Fluid Ounces"
      outputUnit="ml"
      outputLabel="Millilitres"
      convert={(v) => v * 29.5735}
      reverseConvert={(v) => v / 29.5735}
      reverseSlug="ml-to-oz"
      precision={1}
      commonValues={[1, 2, 4, 8, 12, 16, 32]}
      formula="ml = fl oz × 29.5735"
      inputPlaceholder="Enter volume in fl oz"
    />
  );
}
