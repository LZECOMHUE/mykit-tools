"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MbToKb() {
  return (
    <ConverterTemplate
      slug="mb-to-kb"
      inputUnit="MB"
      inputLabel="Megabytes"
      outputUnit="KB"
      outputLabel="Kilobytes"
      convert={(v) => v * 1024}
      reverseConvert={(v) => v / 1024}
      reverseSlug="kb-to-mb"
      precision={4}
      commonValues={[1, 2, 4, 8, 16, 32, 64, 128]}
      formula="KB = MB × 1024"
      inputPlaceholder="Enter size in megabytes"
    />
  );
}
