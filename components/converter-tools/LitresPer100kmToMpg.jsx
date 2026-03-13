"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LitresPer100kmToMpg() {
  return (
    <ConverterTemplate
      slug="litres-per-100km-to-mpg"
      inputUnit="L/100km"
      inputLabel="Litres per 100 km"
      outputUnit="mpg (UK)"
      outputLabel="Miles per Gallon (UK)"
      convert={(v) => 282.481 / v}
      reverseConvert={(v) => 282.481 / v}
      reverseSlug="mpg-to-litres-per-100km"
      precision={2}
      commonValues={[3, 4, 5, 6, 7, 8, 10, 12]}
      formula="mpg = 282.481 / L/100km"
      inputPlaceholder="Enter fuel consumption in L/100km"
    />
  );
}
