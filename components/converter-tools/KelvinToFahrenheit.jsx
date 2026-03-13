"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KelvinToFahrenheit() {
  return (
    <ConverterTemplate
      slug="kelvin-to-fahrenheit"
      inputUnit="K"
      inputLabel="Kelvin"
      outputUnit="°F"
      outputLabel="Fahrenheit"
      convert={(v) => ((v - 273.15) * 9) / 5 + 32}
      reverseConvert={(v) => ((v - 32) * 5) / 9 + 273.15}
      reverseSlug="fahrenheit-to-kelvin"
      precision={2}
      commonValues={[273.15, 293.15, 298.15, 310.15, 373.15]}
      formula="F = ((K - 273.15) x 9/5) + 32"
      inputPlaceholder="Enter temperature in Kelvin"
    />
  );
}
