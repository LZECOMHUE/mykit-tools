"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CupsToMl() {
  return (
    <ConverterTemplate
      slug="cups-to-ml"
      inputUnit="cups"
      inputLabel="Cups"
      outputUnit="ml"
      outputLabel="Millilitres"
      convert={(v) => v * 236.588}
      reverseConvert={(v) => v / 236.588}
      reverseSlug="ml-to-cups"
      precision={0}
      commonValues={[0.25, 0.33, 0.5, 0.75, 1, 1.5, 2, 3, 4]}
      formula="ml = cups × 236.588"
      inputPlaceholder="Enter amount in cups"
    />
  );
}
