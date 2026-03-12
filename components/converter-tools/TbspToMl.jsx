"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function TbspToMl() {
  return (
    <ConverterTemplate
      slug="tbsp-to-ml"
      inputUnit="tbsp"
      inputLabel="Tablespoons"
      outputUnit="ml"
      outputLabel="Millilitres"
      convert={(v) => v * 14.787}
      reverseConvert={(v) => v / 14.787}
      reverseSlug="ml-to-tbsp"
      precision={1}
      commonValues={[0.5, 1, 1.5, 2, 3, 4, 5, 6]}
      formula="ml = tbsp × 14.787"
      inputPlaceholder="Enter amount in tablespoons"
    />
  );
}
