"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MphToKph() {
  return (
    <ConverterTemplate
      slug="mph-to-kph"
      inputUnit="mph"
      inputLabel="Miles per Hour"
      outputUnit="kph"
      outputLabel="Kilometres per Hour"
      convert={(v) => v * 1.60934}
      reverseConvert={(v) => v / 1.60934}
      reverseSlug="kph-to-mph"
      precision={2}
      commonValues={[5, 10, 20, 30, 40, 50, 60, 70, 80, 100]}
      formula="kph = mph × 1.60934"
      inputPlaceholder="Enter speed in mph"
    />
  );
}
