"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function StoneToLbs() {
  return (
    <ConverterTemplate
      slug="stone-to-lbs"
      inputUnit="st"
      inputLabel="Stone"
      outputUnit="lbs"
      outputLabel="Pounds"
      convert={(v) => v * 14}
      reverseConvert={(v) => v / 14}
      reverseSlug="lbs-to-stone"
      precision={2}
      commonValues={[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20]}
      formula="lbs = stone × 14"
      inputPlaceholder="Enter weight in stone"
      displayFormats={["decimal", "lbsOz"]}
      defaultFormat="decimal"
    />
  );
}
