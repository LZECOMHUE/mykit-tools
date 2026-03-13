"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GhzToMhz() {
  return (
    <ConverterTemplate
      slug="ghz-to-mhz"
      inputUnit="GHz"
      inputLabel="Gigahertz"
      outputUnit="MHz"
      outputLabel="Megahertz"
      convert={(value) => value * 1000}
      reverseConvert={(value) => value * 0.001}
      reverseSlug="mhz-to-ghz"
      precision={2}
      commonValues={[1, 2, 2.4, 3.5, 5, 10]}
      formula="MHz = GHz × 1000"
      inputPlaceholder="Enter frequency in GHz"
    />
  );
}
