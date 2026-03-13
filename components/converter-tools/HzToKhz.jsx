"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function HzToKhz() {
  return (
    <ConverterTemplate
      slug="hz-to-khz"
      inputUnit="Hz"
      inputLabel="Hertz"
      outputUnit="kHz"
      outputLabel="Kilohertz"
      convert={(v) => v * 0.001}
      reverseConvert={(v) => v / 0.001}
      reverseSlug="khz-to-hz"
      precision={6}
      commonValues={[100, 440, 1000, 5000, 10000, 20000, 44100]}
      formula="kHz = Hz / 1000"
      inputPlaceholder="Enter frequency in Hz"
    />
  );
}
