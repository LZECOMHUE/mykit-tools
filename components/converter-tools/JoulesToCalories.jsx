"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function JoulesToCalories() {
  return (
    <ConverterTemplate
      slug="joules-to-calories"
      inputUnit="J"
      inputLabel="Joules"
      outputUnit="cal"
      outputLabel="Calories"
      convert={(v) => v * 0.239006}
      reverseConvert={(v) => v / 0.239006}
      reverseSlug="calories-to-joules"
      precision={2}
      commonValues={[1, 10, 50, 100, 500, 1000, 2000]}
      formula="cal = J × 0.239006"
      inputPlaceholder="Enter energy in joules"
    />
  );
}
