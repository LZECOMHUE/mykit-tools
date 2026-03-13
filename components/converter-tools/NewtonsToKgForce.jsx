"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function NewtonsToKgForce() {
  return (
    <ConverterTemplate
      slug="newtons-to-kg-force"
      inputUnit="N"
      inputLabel="Newtons"
      outputUnit="kgf"
      outputLabel="Kilogram Force"
      convert={(value) => value * 0.101972}
      reverseConvert={(value) => value / 0.101972}
      reverseSlug="kg-force-to-newtons"
      precision={4}
      commonValues={[1, 5, 10, 25, 50, 100]}
      formula="kgf = N × 0.101972"
      inputPlaceholder="Enter force in Newtons"
    />
  );
}
