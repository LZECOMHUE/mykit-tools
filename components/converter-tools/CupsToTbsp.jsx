"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CupsToTbsp() {
  return (
    <ConverterTemplate
      slug="cups-to-tbsp"
      inputUnit="cup"
      inputLabel="Cups"
      outputUnit="tbsp"
      outputLabel="Tablespoons"
      convert={(v) => v * 16}
      reverseConvert={(v) => v / 16}
      reverseSlug="tbsp-to-cups"
      precision={1}
      commonValues={[0.25, 0.33, 0.5, 0.75, 1, 1.5, 2]}
      formula="tbsp = cups × 16"
      inputPlaceholder="Enter volume in cups"
    />
  );
}
