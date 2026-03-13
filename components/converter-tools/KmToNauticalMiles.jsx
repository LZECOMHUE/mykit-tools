"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KmToNauticalMiles() {
  return (
    <ConverterTemplate
      slug="km-to-nautical-miles"
      inputUnit="km"
      inputLabel="Kilometres"
      outputUnit="nm"
      outputLabel="Nautical Miles"
      convert={(v) => v * 0.539957}
      reverseConvert={(v) => v / 0.539957}
      reverseSlug="nautical-miles-to-km"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 500, 1000]}
      formula="nm = km x 0.539957"
      inputPlaceholder="Enter distance in kilometres"
    />
  );
}
