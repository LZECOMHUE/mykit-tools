"use client";

import NameGeneratorTemplate from "@/components/templates/NameGeneratorTemplate";
import { piratePrefixes, pirateSuffixes, pickFromInput } from "@/data/fun-names";

export default function PirateNameGenerator() {
  return (
    <NameGeneratorTemplate
      slug="pirate-name-generator"
      headline="Your Pirate Name Is..."
      subheadline="Arrr! Tell us about yourself, landlubber"
      bgGradient="from-amber-600 to-stone-800"
      icon="🏴‍☠️"
      type="Pirate"
      gradientColors={["#d97706", "#78716c"]}
      inputs={[
        { id: "firstName", label: "Your first name", placeholder: "e.g. Laura" },
        { id: "pet", label: "Your favourite animal", placeholder: "e.g. Parrot" },
        { id: "fear", label: "Your biggest fear", placeholder: "e.g. Spiders" },
      ]}
      generate={(vals) => {
        const prefix = pickFromInput(vals.pet + vals.firstName, piratePrefixes);
        const suffix = pickFromInput(vals.fear + vals.firstName, pirateSuffixes);
        return `${prefix} ${suffix}`;
      }}
    />
  );
}
