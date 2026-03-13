"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function DegreesToRadians() {
  return (
    <ConverterTemplate
      slug="degrees-to-radians"
      inputUnit="degrees"
      inputLabel="Degrees"
      outputUnit="radians"
      outputLabel="Radians"
      convert={(v) => v * 0.0174533}
      reverseConvert={(v) => v / 0.0174533}
      reverseSlug="radians-to-degrees"
      precision={6}
      commonValues={[30, 45, 60, 90, 120, 180, 270, 360]}
      formula="radians = degrees × PI / 180"
      inputPlaceholder="Enter angle in degrees"
    />
  );
}
