"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function MpgUsToMpgUk() {
  return (
    <ConverterTemplate
      slug="mpg-us-to-mpg-uk"
      inputUnit="mpg (US)"
      inputLabel="Miles per Gallon (US)"
      outputUnit="mpg (UK)"
      outputLabel="Miles per Gallon (UK)"
      convert={(v) => v * 1.20095}
      reverseConvert={(v) => v / 1.20095}
      reverseSlug="mpg-uk-to-mpg-us"
      precision={2}
      commonValues={[20, 30, 40, 50, 60, 70, 80]}
      formula="mpg (UK) = mpg (US) × 1.20095"
      inputPlaceholder="Enter fuel economy in mpg (US)"
    />
  );
}
