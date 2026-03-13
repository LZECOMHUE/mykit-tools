"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MphToKnots() {
  return (
    <ConverterTemplate
      slug="mph-to-knots"
      inputUnit="mph"
      inputLabel="Miles Per Hour"
      outputUnit="knots"
      outputLabel="Knots"
      convert={(v) => v * 0.868976}
      reverseConvert={(v) => v / 0.868976}
      reverseSlug="knots-to-mph"
      precision={2}
      commonValues={[5, 10, 15, 20, 30, 50, 100]}
      formula="knots = mph x 0.868976"
      inputPlaceholder="Enter speed in mph"
    />
  );
}
