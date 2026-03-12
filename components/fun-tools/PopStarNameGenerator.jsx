"use client";

import NameGeneratorTemplate from "@/components/templates/NameGeneratorTemplate";
import { popStarPrefixes, popStarSuffixes, pickFromInput } from "@/data/fun-names";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function PopStarNameGenerator() {
  return (
    <NameGeneratorTemplate
      slug="pop-star-name-generator"
      headline="Your Pop Star Name Is..."
      subheadline="Answer a few questions to discover your iconic stage name"
      bgGradient="from-fuchsia-500 to-violet-600"
      icon="🎤"
      type="Pop Star"
      gradientColors={["#d946ef", "#7c3aed"]}
      inputs={[
        { id: "firstName", label: "Your first name", placeholder: "e.g. Laura" },
        { id: "birthMonth", label: "Your birth month", options: MONTHS },
        { id: "favouriteColour", label: "Your favourite colour", placeholder: "e.g. Blue" },
      ]}
      generate={(vals) => {
        const prefix = pickFromInput(vals.birthMonth + vals.favouriteColour, popStarPrefixes);
        const suffix = pickFromInput(vals.firstName + vals.birthMonth, popStarSuffixes);
        return `${prefix} ${suffix}`;
      }}
    />
  );
}
