"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LitresToPints() {
  return (
    <ConverterTemplate
      slug="litres-to-pints"
      inputUnit="L"
      inputLabel="Litres"
      outputUnit="pt"
      outputLabel="Pints (UK)"
      convert={(v) => v / 0.568261}
      reverseConvert={(v) => v * 0.568261}
      reverseSlug="pints-to-litres"
      precision={2}
      commonValues={[0.5, 1, 1.5, 2, 3, 4, 5, 10]}
      formula="UK pints = litres ÷ 0.568261"
      inputPlaceholder="Enter amount in litres"
    />
  );
}
