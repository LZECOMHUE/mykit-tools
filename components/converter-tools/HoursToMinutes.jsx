"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function HoursToMinutes() {
  return (
    <ConverterTemplate
      slug="hours-to-minutes"
      inputUnit="hours"
      inputLabel="Hours"
      outputUnit="minutes"
      outputLabel="Minutes"
      convert={(v) => v * 60}
      reverseConvert={(v) => v / 60}
      reverseSlug="minutes-to-hours"
      precision={2}
      commonValues={[0.25, 0.5, 1, 2, 4, 8, 12, 24]}
      formula="minutes = hours × 60"
      inputPlaceholder="Enter time in hours"
    />
  );
}
