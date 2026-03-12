"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function FahrenheitToCelsius() {
  return (
    <ConverterTemplate
      slug="fahrenheit-to-celsius"
      inputUnit="°F"
      inputLabel="Fahrenheit"
      outputUnit="°C"
      outputLabel="Celsius"
      convert={(v) => (v - 32) * 5 / 9}
      reverseConvert={(v) => (v * 9 / 5) + 32}
      reverseSlug="celsius-to-fahrenheit"
      precision={1}
      commonValues={[32, 50, 68, 77, 86, 98.6, 212]}
      formula="°C = (°F - 32) × 5/9"
      inputPlaceholder="Enter temperature in °F"
    />
  );
}
