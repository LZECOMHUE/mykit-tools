"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KwhToBtu() {
  return (
    <ConverterTemplate
      slug="kwh-to-btu"
      inputUnit="kWh"
      inputLabel="Kilowatt Hours"
      outputUnit="BTU"
      outputLabel="British Thermal Units"
      convert={(v) => v * 3412.14}
      reverseConvert={(v) => v / 3412.14}
      reverseSlug="btu-to-kwh"
      precision={2}
      commonValues={[1, 5, 10, 50, 100, 500]}
      formula="BTU = kWh × 3412.14"
      inputPlaceholder="Enter energy in kilowatt hours"
    />
  );
}
