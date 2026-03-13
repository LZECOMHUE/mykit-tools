"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KhzToHz() {
  return (
    <ConverterTemplate
      slug="khz-to-hz"
      inputUnit="kHz"
      inputLabel="Kilohertz"
      outputUnit="Hz"
      outputLabel="Hertz"
      convert={(v) => v * 1000}
      reverseConvert={(v) => v / 1000}
      reverseSlug="hz-to-khz"
      precision={2}
      commonValues={[0.1, 0.44, 1, 5, 10, 20, 44.1, 48]}
      formula="Hz = kHz × 1000"
      inputPlaceholder="Enter frequency in kHz"
    />
  );
}
