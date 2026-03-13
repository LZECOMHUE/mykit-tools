"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KnotsToKph() {
  return (
    <ConverterTemplate
      slug="knots-to-kph"
      inputUnit="knots"
      inputLabel="Knots"
      outputUnit="km/h"
      outputLabel="Kilometres Per Hour"
      convert={(v) => v * 1.852}
      reverseConvert={(v) => v / 1.852}
      reverseSlug="kph-to-knots"
      precision={2}
      commonValues={[1, 5, 10, 15, 20, 30, 50]}
      formula="km/h = knots x 1.852"
      inputPlaceholder="Enter speed in knots"
    />
  );
}
