"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CelsiusToKelvin() {
  return (
    <ConverterTemplate
      slug="celsius-to-kelvin"
      inputUnit="°C"
      inputLabel="Celsius"
      outputUnit="K"
      outputLabel="Kelvin"
      convert={(v) => v + 273.15}
      reverseConvert={(v) => v - 273.15}
      reverseSlug="kelvin-to-celsius"
      precision={2}
      commonValues={[0, 20, 25, 37, 100, 200, 500]}
      formula="K = °C + 273.15"
      inputPlaceholder="Enter temperature in °C"
    />
  );
}
