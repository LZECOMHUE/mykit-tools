"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function DaysToHours() {
  return (
    <ConverterTemplate
      slug="days-to-hours"
      inputUnit="days"
      inputLabel="Days"
      outputUnit="hours"
      outputLabel="Hours"
      convert={(v) => v * 24}
      reverseConvert={(v) => v / 24}
      reverseSlug="hours-to-days"
      precision={2}
      commonValues={[1, 2, 3, 5, 7, 14, 30, 365]}
      formula="hours = days × 24"
      inputPlaceholder="Enter time in days"
    />
  );
}
