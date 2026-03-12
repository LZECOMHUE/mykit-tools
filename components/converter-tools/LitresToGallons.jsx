"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function LitresToGallons() {
  return (
    <ConverterTemplate
      slug="litres-to-gallons"
      inputUnit="l"
      inputLabel="Litres"
      outputUnit="gal"
      outputLabel="UK Gallons"
      convert={(v) => v / 4.54609}
      reverseConvert={(v) => v * 4.54609}
      reverseSlug="gallons-to-litres"
      precision={2}
      commonValues={[1, 5, 10, 20, 30, 40, 50, 100]}
      formula="gallons = litres ÷ 4.54609"
      inputPlaceholder="Enter volume in litres"
    />
  );
}
