"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function OuncesToKg() {
  return (
    <ConverterTemplate
      slug="ounces-to-kg"
      inputUnit="oz"
      inputLabel="Ounces"
      outputUnit="kg"
      outputLabel="Kilograms"
      convert={(v) => v * 0.0283495}
      reverseConvert={(v) => v / 0.0283495}
      reverseSlug="kg-to-ounces"
      precision={4}
      commonValues={[1, 5, 10, 16, 25, 50, 100]}
      formula="kg = oz x 0.0283495"
      inputPlaceholder="Enter weight in ounces"
    />
  );
}
