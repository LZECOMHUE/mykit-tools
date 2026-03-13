"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KcalToCalories() {
  return (
    <ConverterTemplate
      slug="kcal-to-calories"
      inputUnit="kcal"
      inputLabel="Kilocalories"
      outputUnit="cal"
      outputLabel="Calories"
      convert={(v) => v * 1000}
      reverseConvert={(v) => v / 1000}
      reverseSlug="calories-to-kcal"
      precision={2}
      commonValues={[1, 2, 5, 10, 20, 50, 100]}
      formula="cal = kcal × 1000"
      inputPlaceholder="Enter energy in kilocalories"
    />
  );
}
