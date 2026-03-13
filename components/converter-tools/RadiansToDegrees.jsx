"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function RadiansToDegrees() {
  return (
    <ConverterTemplate
      slug="radians-to-degrees"
      inputUnit="radians"
      inputLabel="Radians"
      outputUnit="degrees"
      outputLabel="Degrees"
      convert={(v) => v * 57.2958}
      reverseConvert={(v) => v / 57.2958}
      reverseSlug="degrees-to-radians"
      precision={2}
      commonValues={[0.5, 1, 1.57, 3.14, 4.71, 6.28]}
      formula="degrees = radians × 180 / PI"
      inputPlaceholder="Enter angle in radians"
    />
  );
}
