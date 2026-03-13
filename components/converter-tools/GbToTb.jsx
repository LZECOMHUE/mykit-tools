"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GbToTb() {
  return (
    <ConverterTemplate
      slug="gb-to-tb"
      inputUnit="GB"
      inputLabel="Gigabytes"
      outputUnit="TB"
      outputLabel="Terabytes"
      convert={(v) => v / 1024}
      reverseConvert={(v) => v * 1024}
      reverseSlug="tb-to-gb"
      precision={4}
      commonValues={[100, 256, 512, 1024, 2048, 4096]}
      formula="TB = GB / 1024"
      inputPlaceholder="Enter size in gigabytes"
    />
  );
}
