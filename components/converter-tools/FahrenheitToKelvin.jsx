"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function FahrenheitToKelvin() {
  return (
    <ConverterTemplate
      slug="fahrenheit-to-kelvin"
      inputUnit="°F"
      inputLabel="Fahrenheit"
      outputUnit="K"
      outputLabel="Kelvin"
      convert={(v) => ((v - 32) * 5) / 9 + 273.15}
      reverseConvert={(v) => ((v - 273.15) * 9) / 5 + 32}
      reverseSlug="kelvin-to-fahrenheit"
      precision={2}
      commonValues={[32, 68, 86, 104, 212, 451]}
      formula="K = ((F - 32) x 5/9) + 273.15"
      inputPlaceholder="Enter temperature in Fahrenheit"
    />
  );
}
