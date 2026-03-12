"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function TbspToCups() {
  return (
    <ConverterTemplate
      slug="tbsp-to-cups"
      inputUnit="tbsp"
      inputLabel="Tablespoons"
      outputUnit="cup"
      outputLabel="Cups"
      convert={(v) => v / 16}
      reverseConvert={(v) => v * 16}
      reverseSlug="cups-to-tbsp"
      precision={2}
      commonValues={[1, 2, 3, 4, 6, 8, 16]}
      formula="cups = tbsp ÷ 16"
      inputPlaceholder="Enter volume in tablespoons"
    />
  );
}
