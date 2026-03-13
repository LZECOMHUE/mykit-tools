"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function AtmToPsi() {
  return (
    <ConverterTemplate
      slug="atm-to-psi"
      inputUnit="atm"
      inputLabel="Atmospheres"
      outputUnit="PSI"
      outputLabel="Pounds per Square Inch"
      convert={(v) => v * 14.696}
      reverseConvert={(v) => v / 14.696}
      reverseSlug="psi-to-atm"
      precision={4}
      commonValues={[0.5, 1, 1.5, 2, 3, 5, 10]}
      formula="PSI = atm × 14.696"
      inputPlaceholder="Enter pressure in atmospheres"
    />
  );
}
