"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function HectaresToAcres() {
  return (
    <ConverterTemplate
      slug="hectares-to-acres"
      inputUnit="hectares"
      inputLabel="Hectares"
      outputUnit="acres"
      outputLabel="Acres"
      convert={(v) => v * 2.47105}
      reverseConvert={(v) => v / 2.47105}
      reverseSlug="acres-to-hectares"
      precision={2}
      commonValues={[0.25, 0.5, 1, 2, 5, 10, 50, 100]}
      formula="acres = hectares × 2.47105"
      inputPlaceholder="Enter area in hectares"
    />
  );
}
