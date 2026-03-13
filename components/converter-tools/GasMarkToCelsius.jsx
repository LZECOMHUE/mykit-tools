"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GasMarkToCelsius() {
  return (
    <ConverterTemplate
      slug="gas-mark-to-celsius"
      inputUnit="Gas Mark"
      inputLabel="Gas Mark"
      outputUnit="°C"
      outputLabel="Celsius"
      convert={(v) => (v * 14) + 121}
      reverseConvert={(v) => (v - 121) / 14}
      reverseSlug="celsius-to-gas-mark"
      precision={0}
      commonValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      formula="°C = (Gas Mark x 14) + 121"
      inputPlaceholder="Enter gas mark (1-9)"
    />
  );
}
