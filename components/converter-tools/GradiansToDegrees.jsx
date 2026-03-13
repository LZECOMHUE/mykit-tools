"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GradiansToDegrees() {
  return (
    <ConverterTemplate
      slug="gradians-to-degrees"
      inputUnit="gradians"
      inputLabel="Gradians"
      outputUnit="degrees"
      outputLabel="Degrees"
      convert={(v) => v * 0.9}
      reverseConvert={(v) => v / 0.9}
      reverseSlug="degrees-to-gradians"
      precision={4}
      commonValues={[50, 100, 150, 200, 300, 400]}
      formula="degrees = gradians × 9 / 10"
      inputPlaceholder="Enter angle in gradians"
    />
  );
}
