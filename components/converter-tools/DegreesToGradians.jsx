"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function DegreesToGradians() {
  return (
    <ConverterTemplate
      slug="degrees-to-gradians"
      inputUnit="degrees"
      inputLabel="Degrees"
      outputUnit="gradians"
      outputLabel="Gradians"
      convert={(v) => v * 1.11111}
      reverseConvert={(v) => v / 1.11111}
      reverseSlug="gradians-to-degrees"
      precision={4}
      commonValues={[30, 45, 60, 90, 180, 270, 360]}
      formula="gradians = degrees × 10 / 9"
      inputPlaceholder="Enter angle in degrees"
    />
  );
}
