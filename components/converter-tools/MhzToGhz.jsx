"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MhzToGhz() {
  return (
    <ConverterTemplate
      slug="mhz-to-ghz"
      inputUnit="MHz"
      inputLabel="Megahertz"
      outputUnit="GHz"
      outputLabel="Gigahertz"
      convert={(value) => value * 0.001}
      reverseConvert={(value) => value * 1000}
      reverseSlug="ghz-to-mhz"
      precision={4}
      commonValues={[100, 500, 1000, 2400, 3500, 5000]}
      formula="GHz = MHz / 1000"
      inputPlaceholder="Enter frequency in MHz"
    />
  );
}
