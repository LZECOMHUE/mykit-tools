"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GbToMb() {
  return (
    <ConverterTemplate
      slug="gb-to-mb"
      inputUnit="GB"
      inputLabel="Gigabytes"
      outputUnit="MB"
      outputLabel="Megabytes"
      convert={(v) => v * 1024}
      reverseConvert={(v) => v / 1024}
      reverseSlug="mb-to-gb"
      precision={4}
      commonValues={[1, 2, 4, 8, 16, 32, 64, 128]}
      formula="MB = GB × 1024"
      inputPlaceholder="Enter size in gigabytes"
    />
  );
}
