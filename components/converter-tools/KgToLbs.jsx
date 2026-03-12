"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KgToLbs() {
  return (
    <ConverterTemplate
      slug="kg-to-lbs"
      inputUnit="kg"
      inputLabel="Kilograms"
      outputUnit="lbs"
      outputLabel="Pounds"
      convert={(v) => v * 2.20462}
      reverseConvert={(v) => v / 2.20462}
      reverseSlug="lbs-to-kg"
      precision={2}
      commonValues={[1, 5, 10, 25, 50, 100]}
      formula="lbs = kg × 2.20462"
      inputPlaceholder="Enter weight in kg"
      displayFormats={["decimal", "lbsOz"]}
      defaultFormat="decimal"
    />
  );
}
