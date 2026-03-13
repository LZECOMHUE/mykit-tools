"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CaloriesToKcal() {
  return (
    <ConverterTemplate
      slug="calories-to-kcal"
      inputUnit="cal"
      inputLabel="Calories"
      outputUnit="kcal"
      outputLabel="Kilocalories"
      convert={(v) => v * 0.001}
      reverseConvert={(v) => v / 0.001}
      reverseSlug="kcal-to-calories"
      precision={2}
      commonValues={[100, 250, 500, 1000, 2000, 5000, 10000]}
      formula="kcal = cal × 0.001"
      inputPlaceholder="Enter energy in calories"
    />
  );
}
