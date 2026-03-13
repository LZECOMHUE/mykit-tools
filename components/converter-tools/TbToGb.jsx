"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function TbToGb() {
  return (
    <ConverterTemplate
      slug="tb-to-gb"
      inputUnit="TB"
      inputLabel="Terabytes"
      outputUnit="GB"
      outputLabel="Gigabytes"
      convert={(v) => v * 1024}
      reverseConvert={(v) => v / 1024}
      reverseSlug="gb-to-tb"
      precision={4}
      commonValues={[1, 2, 4, 8, 16, 32, 64]}
      formula="GB = TB × 1024"
      inputPlaceholder="Enter size in terabytes"
    />
  );
}
