"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KphToMph() {
  return (
    <ConverterTemplate
      slug="kph-to-mph"
      inputUnit="kph"
      inputLabel="Kilometres per Hour"
      outputUnit="mph"
      outputLabel="Miles per Hour"
      convert={(v) => v / 1.60934}
      reverseConvert={(v) => v * 1.60934}
      reverseSlug="mph-to-kph"
      precision={2}
      commonValues={[10, 20, 30, 50, 60, 80, 100, 110, 120, 130]}
      formula="mph = kph ÷ 1.60934"
      inputPlaceholder="Enter speed in kph"
    />
  );
}
