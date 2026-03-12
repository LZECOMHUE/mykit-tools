"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LbsToStone() {
  return (
    <ConverterTemplate
      slug="lbs-to-stone"
      inputUnit="lbs"
      inputLabel="Pounds"
      outputUnit="st"
      outputLabel="Stone"
      convert={(v) => v / 14}
      reverseConvert={(v) => v * 14}
      reverseSlug="stone-to-lbs"
      precision={2}
      commonValues={[100, 110, 120, 130, 140, 150, 160, 170, 180, 200, 220, 250]}
      formula="stone = lbs ÷ 14"
      inputPlaceholder="Enter weight in pounds"
      displayFormats={["stoneLbs", "decimal"]}
      defaultFormat="stoneLbs"
    />
  );
}
