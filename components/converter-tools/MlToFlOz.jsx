"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MlToFlOz() {
  return (
    <ConverterTemplate
      slug="ml-to-fl-oz"
      inputUnit="ml"
      inputLabel="Millilitres"
      outputUnit="fl oz"
      outputLabel="Fluid Ounces (US)"
      convert={(v) => v * 0.033814}
      reverseConvert={(v) => v / 0.033814}
      reverseSlug="fl-oz-to-ml"
      precision={2}
      commonValues={[10, 30, 50, 100, 250, 500, 1000]}
      formula="fl oz = ml x 0.033814"
      inputPlaceholder="Enter millilitres"
    />
  );
}
