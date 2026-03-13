"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KbToMb() {
  return (
    <ConverterTemplate
      slug="kb-to-mb"
      inputUnit="KB"
      inputLabel="Kilobytes"
      outputUnit="MB"
      outputLabel="Megabytes"
      convert={(v) => v / 1024}
      reverseConvert={(v) => v * 1024}
      reverseSlug="mb-to-kb"
      precision={4}
      commonValues={[100, 256, 512, 1024, 2048, 4096, 8192]}
      formula="MB = KB / 1024"
      inputPlaceholder="Enter size in kilobytes"
    />
  );
}
