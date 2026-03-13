"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MpgUkToMpgUs() {
  return (
    <ConverterTemplate
      slug="mpg-uk-to-mpg-us"
      inputUnit="mpg (UK)"
      inputLabel="Miles per Gallon (UK)"
      outputUnit="mpg (US)"
      outputLabel="Miles per Gallon (US)"
      convert={(v) => v * 0.832674}
      reverseConvert={(v) => v / 0.832674}
      reverseSlug="mpg-us-to-mpg-uk"
      precision={2}
      commonValues={[20, 30, 40, 50, 60, 70, 80]}
      formula="mpg (US) = mpg (UK) × 0.832674"
      inputPlaceholder="Enter fuel economy in mpg (UK)"
    />
  );
}
