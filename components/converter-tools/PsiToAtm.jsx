"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function PsiToAtm() {
  return (
    <ConverterTemplate
      slug="psi-to-atm"
      inputUnit="PSI"
      inputLabel="Pounds per Square Inch"
      outputUnit="atm"
      outputLabel="Atmospheres"
      convert={(v) => v * 0.068046}
      reverseConvert={(v) => v / 0.068046}
      reverseSlug="atm-to-psi"
      precision={6}
      commonValues={[10, 15, 20, 30, 40, 50, 100]}
      formula="atm = PSI × 0.068046"
      inputPlaceholder="Enter pressure in PSI"
    />
  );
}
