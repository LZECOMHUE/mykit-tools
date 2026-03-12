"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function TspToTbsp() {
  return (
    <ConverterTemplate
      slug="tsp-to-tbsp"
      inputUnit="tsp"
      inputLabel="Teaspoons"
      outputUnit="tbsp"
      outputLabel="Tablespoons"
      convert={(v) => v / 3}
      reverseConvert={(v) => v * 3}
      reverseSlug="tbsp-to-tsp"
      precision={2}
      commonValues={[1, 2, 3, 6, 9, 12, 15]}
      formula="tbsp = tsp ÷ 3"
      inputPlaceholder="Enter volume in teaspoons"
    />
  );
}
