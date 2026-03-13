"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function NewtonsToLbsForce() {
  return (
    <ConverterTemplate
      slug="newtons-to-lbs-force"
      inputUnit="N"
      inputLabel="Newtons"
      outputUnit="lbf"
      outputLabel="Pounds Force"
      convert={(value) => value * 0.224809}
      reverseConvert={(value) => value / 0.224809}
      reverseSlug="lbs-force-to-newtons"
      precision={4}
      commonValues={[1, 5, 10, 50, 100, 500, 1000]}
      formula="lbf = N × 0.224809"
      inputPlaceholder="Enter force in Newtons"
    />
  );
}
