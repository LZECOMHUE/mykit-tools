"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MlToCups() {
  return (
    <ConverterTemplate
      slug="ml-to-cups"
      inputUnit="ml"
      inputLabel="Millilitres"
      outputUnit="cups"
      outputLabel="Cups"
      convert={(v) => v / 236.588}
      reverseConvert={(v) => v * 236.588}
      reverseSlug="cups-to-ml"
      precision={2}
      commonValues={[50, 100, 150, 200, 250, 300, 500, 750, 1000]}
      formula="cups = ml ÷ 236.588"
      inputPlaceholder="Enter amount in millilitres"
    />
  );
}
