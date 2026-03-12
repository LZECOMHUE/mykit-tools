"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function CelsiusToFahrenheit() {
  return (
    <ConverterTemplate
      slug="celsius-to-fahrenheit"
      inputUnit="°C"
      inputLabel="Celsius"
      outputUnit="°F"
      outputLabel="Fahrenheit"
      convert={(v) => (v * 9 / 5) + 32}
      reverseConvert={(v) => (v - 32) * 5 / 9}
      reverseSlug="fahrenheit-to-celsius"
      precision={1}
      commonValues={[0, 10, 20, 25, 30, 37, 100]}
      formula="°F = (°C × 9/5) + 32"
      inputPlaceholder="Enter temperature in °C"
    />
  );
}
