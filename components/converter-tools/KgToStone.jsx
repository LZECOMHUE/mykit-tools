"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KgToStone() {
  return (
    <ConverterTemplate
      slug="kg-to-stone"
      inputUnit="kg"
      inputLabel="Kilograms"
      outputUnit="st"
      outputLabel="Stone"
      convert={(v) => v / 6.35029}
      reverseConvert={(v) => v * 6.35029}
      reverseSlug="stone-to-kg"
      precision={2}
      commonValues={[50, 60, 70, 75, 80, 85, 90, 95, 100, 110, 120]}
      formula="st = kg ÷ 6.35029"
      inputPlaceholder="Enter weight in kg"
      displayFormats={["stoneLbs", "decimal"]}
      defaultFormat="stoneLbs"
    />
  );
}
