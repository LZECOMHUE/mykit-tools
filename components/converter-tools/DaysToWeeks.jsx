"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function DaysToWeeks() {
  return (
    <ConverterTemplate
      slug="days-to-weeks"
      inputUnit="days"
      inputLabel="Days"
      outputUnit="weeks"
      outputLabel="Weeks"
      convert={(v) => v / 7}
      reverseConvert={(v) => v * 7}
      reverseSlug="weeks-to-days"
      precision={4}
      commonValues={[7, 14, 21, 30, 60, 90, 180, 365]}
      formula="weeks = days / 7"
      inputPlaceholder="Enter time in days"
    />
  );
}
