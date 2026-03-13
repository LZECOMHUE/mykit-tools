"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function PsiToBar() {
  return (
    <ConverterTemplate
      slug="psi-to-bar"
      inputUnit="PSI"
      inputLabel="Pounds per Square Inch"
      outputUnit="bar"
      outputLabel="Bar"
      convert={(v) => v * 0.0689476}
      reverseConvert={(v) => v / 0.0689476}
      reverseSlug="bar-to-psi"
      precision={4}
      commonValues={[10, 15, 20, 30, 40, 50, 100]}
      formula="bar = PSI × 0.0689476"
      inputPlaceholder="Enter pressure in PSI"
    />
  );
}
