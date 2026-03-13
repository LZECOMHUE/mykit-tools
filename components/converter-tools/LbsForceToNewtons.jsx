"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LbsForceToNewtons() {
  return (
    <ConverterTemplate
      slug="lbs-force-to-newtons"
      inputUnit="lbf"
      inputLabel="Pounds Force"
      outputUnit="N"
      outputLabel="Newtons"
      convert={(value) => value * 4.44822}
      reverseConvert={(value) => value / 4.44822}
      reverseSlug="newtons-to-lbs-force"
      precision={4}
      commonValues={[1, 5, 10, 25, 50, 100, 500]}
      formula="N = lbf × 4.44822"
      inputPlaceholder="Enter force in pounds force"
    />
  );
}
