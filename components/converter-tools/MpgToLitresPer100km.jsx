"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MpgToLitresPer100km() {
  return (
    <ConverterTemplate
      slug="mpg-to-litres-per-100km"
      inputUnit="mpg (UK)"
      inputLabel="Miles per Gallon (UK)"
      outputUnit="L/100km"
      outputLabel="Litres per 100 km"
      convert={(v) => 282.481 / v}
      reverseConvert={(v) => 282.481 / v}
      reverseSlug="litres-per-100km-to-mpg"
      precision={2}
      commonValues={[20, 30, 40, 50, 60, 70, 80]}
      formula="L/100km = 282.481 / mpg"
      inputPlaceholder="Enter fuel economy in mpg"
    />
  );
}
