"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GramsToOz() {
  return (
    <ConverterTemplate
      slug="grams-to-oz"
      inputUnit="g"
      inputLabel="Grams"
      outputUnit="oz"
      outputLabel="Ounces"
      convert={(v) => v / 28.3495}
      reverseConvert={(v) => v * 28.3495}
      reverseSlug="oz-to-grams"
      precision={2}
      commonValues={[10, 25, 50, 100, 200, 250, 500]}
      formula="oz = g ÷ 28.3495"
      inputPlaceholder="Enter weight in grams"
      displayFormats={["decimal", "fraction"]}
      defaultFormat="decimal"
    />
  );
}
