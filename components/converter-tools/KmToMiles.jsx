"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KmToMiles() {
  return (
    <ConverterTemplate
      slug="km-to-miles"
      inputUnit="km"
      inputLabel="Kilometres"
      outputUnit="mi"
      outputLabel="Miles"
      convert={(v) => v / 1.60934}
      reverseConvert={(v) => v * 1.60934}
      reverseSlug="miles-to-km"
      precision={2}
      commonValues={[1, 5, 10, 21, 42.2, 50, 100]}
      formula="miles = km ÷ 1.60934"
      inputPlaceholder="Enter distance in kilometres"
    />
  );
}
