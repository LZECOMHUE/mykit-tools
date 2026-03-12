"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function TbspToTsp() {
  return (
    <ConverterTemplate
      slug="tbsp-to-tsp"
      inputUnit="tbsp"
      inputLabel="Tablespoons"
      outputUnit="tsp"
      outputLabel="Teaspoons"
      convert={(v) => v * 3}
      reverseConvert={(v) => v / 3}
      reverseSlug="tsp-to-tbsp"
      precision={1}
      commonValues={[0.5, 1, 2, 3, 4, 5, 6]}
      formula="tsp = tbsp × 3"
      inputPlaceholder="Enter volume in tablespoons"
    />
  );
}
