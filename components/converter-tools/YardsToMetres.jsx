"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function YardsToMetres() {
  return (
    <ConverterTemplate
      slug="yards-to-metres"
      inputUnit="yd"
      inputLabel="Yards"
      outputUnit="m"
      outputLabel="Metres"
      convert={(v) => v / 1.09361}
      reverseConvert={(v) => v * 1.09361}
      reverseSlug="metres-to-yards"
      precision={2}
      commonValues={[1, 5, 10, 25, 50, 100]}
      formula="metres = yards ÷ 1.09361"
      inputPlaceholder="Enter length in yards"
    />
  );
}
