"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MinutesToHours() {
  return (
    <ConverterTemplate
      slug="minutes-to-hours"
      inputUnit="minutes"
      inputLabel="Minutes"
      outputUnit="hours"
      outputLabel="Hours"
      convert={(v) => v / 60}
      reverseConvert={(v) => v * 60}
      reverseSlug="hours-to-minutes"
      precision={4}
      commonValues={[15, 30, 45, 60, 90, 120, 180, 480]}
      formula="hours = minutes / 60"
      inputPlaceholder="Enter time in minutes"
    />
  );
}
