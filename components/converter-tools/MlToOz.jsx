"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MlToOz() {
  return (
    <ConverterTemplate
      slug="ml-to-oz"
      inputUnit="ml"
      inputLabel="Millilitres"
      outputUnit="fl oz"
      outputLabel="Fluid Ounces"
      convert={(v) => v / 29.5735}
      reverseConvert={(v) => v * 29.5735}
      reverseSlug="oz-to-ml"
      precision={2}
      commonValues={[50, 100, 200, 250, 330, 500, 750]}
      formula="fl oz = ml ÷ 29.5735"
      inputPlaceholder="Enter volume in ml"
    />
  );
}
