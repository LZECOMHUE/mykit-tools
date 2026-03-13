"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function WeeksToDays() {
  return (
    <ConverterTemplate
      slug="weeks-to-days"
      inputUnit="weeks"
      inputLabel="Weeks"
      outputUnit="days"
      outputLabel="Days"
      convert={(v) => v * 7}
      reverseConvert={(v) => v / 7}
      reverseSlug="days-to-weeks"
      precision={2}
      commonValues={[1, 2, 4, 6, 8, 12, 26, 52]}
      formula="days = weeks × 7"
      inputPlaceholder="Enter time in weeks"
    />
  );
}
