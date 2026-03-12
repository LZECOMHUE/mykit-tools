"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KelvinToCelsius() {
  return (
    <ConverterTemplate
      slug="kelvin-to-celsius"
      inputUnit="K"
      inputLabel="Kelvin"
      outputUnit="°C"
      outputLabel="Celsius"
      convert={(v) => v - 273.15}
      reverseConvert={(v) => v + 273.15}
      reverseSlug="celsius-to-kelvin"
      precision={2}
      commonValues={[0, 100, 273.15, 293.15, 310.15, 373.15]}
      formula="°C = K - 273.15"
      inputPlaceholder="Enter temperature in K"
    />
  );
}
