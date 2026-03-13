"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function HoursToDays() {
  return (
    <ConverterTemplate
      slug="hours-to-days"
      inputUnit="hours"
      inputLabel="Hours"
      outputUnit="days"
      outputLabel="Days"
      convert={(v) => v / 24}
      reverseConvert={(v) => v * 24}
      reverseSlug="days-to-hours"
      precision={4}
      commonValues={[8, 12, 24, 48, 72, 168, 720]}
      formula="days = hours / 24"
      inputPlaceholder="Enter time in hours"
    />
  );
}
