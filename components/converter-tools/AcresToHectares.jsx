"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function AcresToHectares() {
  return (
    <ConverterTemplate
      slug="acres-to-hectares"
      inputUnit="acres"
      inputLabel="Acres"
      outputUnit="hectares"
      outputLabel="Hectares"
      convert={(v) => v * 0.404686}
      reverseConvert={(v) => v / 0.404686}
      reverseSlug="hectares-to-acres"
      precision={2}
      commonValues={[0.25, 0.5, 1, 2, 5, 10, 50, 100]}
      formula="hectares = acres × 0.404686"
      inputPlaceholder="Enter area in acres"
    />
  );
}
