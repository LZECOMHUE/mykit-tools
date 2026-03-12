"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MlToTsp() {
  return (
    <ConverterTemplate
      slug="ml-to-tsp"
      inputUnit="ml"
      inputLabel="Millilitres"
      outputUnit="tsp"
      outputLabel="Teaspoons"
      convert={(v) => v / 4.929}
      reverseConvert={(v) => v * 4.929}
      reverseSlug="tsp-to-ml"
      precision={1}
      commonValues={[1, 2.5, 5, 10, 15, 20, 25, 50]}
      formula="teaspoons = ml ÷ 4.929"
      inputPlaceholder="Enter volume in millilitres"
    />
  );
}
