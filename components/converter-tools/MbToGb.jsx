"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MbToGb() {
  return (
    <ConverterTemplate
      slug="mb-to-gb"
      inputUnit="MB"
      inputLabel="Megabytes"
      outputUnit="GB"
      outputLabel="Gigabytes"
      convert={(v) => v / 1024}
      reverseConvert={(v) => v * 1024}
      reverseSlug="gb-to-mb"
      precision={4}
      commonValues={[100, 256, 512, 1024, 2048, 4096, 8192]}
      formula="GB = MB / 1024"
      inputPlaceholder="Enter size in megabytes"
    />
  );
}
