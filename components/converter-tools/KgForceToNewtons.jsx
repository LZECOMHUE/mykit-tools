"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function KgForceToNewtons() {
  return (
    <ConverterTemplate
      slug="kg-force-to-newtons"
      inputUnit="kgf"
      inputLabel="Kilogram Force"
      outputUnit="N"
      outputLabel="Newtons"
      convert={(value) => value * 9.80665}
      reverseConvert={(value) => value / 9.80665}
      reverseSlug="newtons-to-kg-force"
      precision={4}
      commonValues={[1, 5, 10, 25, 50, 100]}
      formula="N = kgf × 9.80665"
      inputPlaceholder="Enter force in kilogram force"
    />
  );
}
