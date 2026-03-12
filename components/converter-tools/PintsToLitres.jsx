"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function PintsToLitres() {
  return (
    <ConverterTemplate
      slug="pints-to-litres"
      inputUnit="pt"
      inputLabel="Pints (UK)"
      outputUnit="L"
      outputLabel="Litres"
      convert={(v) => v * 0.568261}
      reverseConvert={(v) => v / 0.568261}
      reverseSlug="litres-to-pints"
      precision={2}
      commonValues={[0.5, 1, 2, 3, 4, 5, 6, 8]}
      formula="litres = UK pints × 0.568261"
      inputPlaceholder="Enter amount in UK pints"
    />
  );
}
