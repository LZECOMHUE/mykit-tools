"use client";
import ConverterTemplate from "@/components/templates/ConverterTemplate";

export default function GallonsToLitres() {
  return (
    <ConverterTemplate
      slug="gallons-to-litres"
      inputUnit="gal"
      inputLabel="UK Gallons"
      outputUnit="l"
      outputLabel="Litres"
      convert={(v) => v * 4.54609}
      reverseConvert={(v) => v / 4.54609}
      reverseSlug="litres-to-gallons"
      precision={2}
      commonValues={[1, 2, 3, 4, 5, 10, 15, 20]}
      formula="litres = gallons × 4.54609"
      inputPlaceholder="Enter volume in UK gallons"
    />
  );
}
