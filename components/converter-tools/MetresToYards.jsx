"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MetresToYards() {
  return (
    <ConverterTemplate
      slug="metres-to-yards"
      inputUnit="m"
      inputLabel="Metres"
      outputUnit="yd"
      outputLabel="Yards"
      convert={(v) => v * 1.09361}
      reverseConvert={(v) => v / 1.09361}
      reverseSlug="yards-to-metres"
      precision={2}
      commonValues={[1, 5, 10, 25, 50, 100]}
      formula="yards = metres × 1.09361"
      inputPlaceholder="Enter length in metres"
    />
  );
}
