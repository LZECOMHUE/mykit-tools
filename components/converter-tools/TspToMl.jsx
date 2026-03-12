"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function TspToMl() {
  return (
    <ConverterTemplate
      slug="tsp-to-ml"
      inputUnit="tsp"
      inputLabel="Teaspoons"
      outputUnit="ml"
      outputLabel="Millilitres"
      convert={(v) => v * 4.929}
      reverseConvert={(v) => v / 4.929}
      reverseSlug="ml-to-tsp"
      precision={1}
      commonValues={[0.25, 0.5, 1, 1.5, 2, 3, 4, 5]}
      formula="ml = teaspoons × 4.929"
      inputPlaceholder="Enter volume in teaspoons"
    />
  );
}
