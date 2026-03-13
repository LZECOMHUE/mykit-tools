"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function BitsToBytes() {
  return (
    <ConverterTemplate
      slug="bits-to-bytes"
      inputUnit="bits"
      inputLabel="Bits"
      outputUnit="bytes"
      outputLabel="Bytes"
      convert={(v) => v / 8}
      reverseConvert={(v) => v * 8}
      reverseSlug="bytes-to-bits"
      precision={4}
      commonValues={[8, 16, 32, 64, 128, 256, 512, 1024]}
      formula="bytes = bits / 8"
      inputPlaceholder="Enter size in bits"
    />
  );
}
