"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CaloriesToJoules() {
  return (
    <ConverterTemplate
      slug="calories-to-joules"
      inputUnit="cal"
      inputLabel="Calories"
      outputUnit="J"
      outputLabel="Joules"
      convert={(v) => v * 4.184}
      reverseConvert={(v) => v / 4.184}
      reverseSlug="joules-to-calories"
      precision={2}
      commonValues={[1, 10, 50, 100, 500, 1000, 2000]}
      formula="J = cal × 4.184"
      inputPlaceholder="Enter energy in calories"
    />
  );
}
