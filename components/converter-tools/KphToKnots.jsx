"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KphToKnots() {
  return (
    <ConverterTemplate
      slug="kph-to-knots"
      inputUnit="km/h"
      inputLabel="Kilometres Per Hour"
      outputUnit="knots"
      outputLabel="Knots"
      convert={(v) => v * 0.539957}
      reverseConvert={(v) => v / 0.539957}
      reverseSlug="knots-to-kph"
      precision={2}
      commonValues={[10, 20, 30, 50, 80, 100, 150]}
      formula="knots = km/h x 0.539957"
      inputPlaceholder="Enter speed in km/h"
    />
  );
}
