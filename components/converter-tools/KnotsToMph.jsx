"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KnotsToMph() {
  return (
    <ConverterTemplate
      slug="knots-to-mph"
      inputUnit="knots"
      inputLabel="Knots"
      outputUnit="mph"
      outputLabel="Miles Per Hour"
      convert={(v) => v * 1.15078}
      reverseConvert={(v) => v / 1.15078}
      reverseSlug="mph-to-knots"
      precision={2}
      commonValues={[1, 5, 10, 15, 20, 30, 50]}
      formula="mph = knots x 1.15078"
      inputPlaceholder="Enter speed in knots"
    />
  );
}
