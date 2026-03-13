"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function BtuToKwh() {
  return (
    <ConverterTemplate
      slug="btu-to-kwh"
      inputUnit="BTU"
      inputLabel="British Thermal Units"
      outputUnit="kWh"
      outputLabel="Kilowatt Hours"
      convert={(v) => v * 0.000293071}
      reverseConvert={(v) => v / 0.000293071}
      reverseSlug="kwh-to-btu"
      precision={2}
      commonValues={[1000, 5000, 10000, 50000, 100000, 500000]}
      formula="kWh = BTU × 0.000293071"
      inputPlaceholder="Enter energy in BTU"
    />
  );
}
