"use client";

import NameGeneratorTemplate from "@/components/templates/NameGeneratorTemplate";
import { rapperPrefixes, rapperSuffixes, pickFromInput } from "@/data/fun-names";

export default function RapperNameGenerator() {
  return (
    <NameGeneratorTemplate
      slug="rapper-name-generator"
      headline="Your Rapper Name Is..."
      subheadline="Drop your details and find out your MC name"
      bgGradient="from-yellow-500 to-red-600"
      icon="🎙️"
      type="Rapper"
      gradientColors={["#eab308", "#ef4444"]}
      inputs={[
        { id: "firstName", label: "Your first name", placeholder: "e.g. Greg" },
        { id: "hometown", label: "City you grew up in", placeholder: "e.g. Manchester" },
        { id: "favFood", label: "Your favourite food", placeholder: "e.g. Pizza" },
      ]}
      generate={(vals) => {
        const prefix = pickFromInput(vals.firstName + vals.favFood, rapperPrefixes);
        const suffix = pickFromInput(vals.hometown + vals.firstName, rapperSuffixes);
        return `${prefix} ${suffix}`;
      }}
    />
  );
}
