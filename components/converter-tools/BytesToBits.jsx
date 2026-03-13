"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function BytesToBits() {
  return (
    <ConverterTemplate
      slug="bytes-to-bits"
      inputUnit="bytes"
      inputLabel="Bytes"
      outputUnit="bits"
      outputLabel="Bits"
      convert={(v) => v * 8}
      reverseConvert={(v) => v / 8}
      reverseSlug="bits-to-bytes"
      precision={4}
      commonValues={[1, 2, 4, 8, 16, 32, 64, 128]}
      formula="bits = bytes × 8"
      inputPlaceholder="Enter size in bytes"
    />
  );
}
