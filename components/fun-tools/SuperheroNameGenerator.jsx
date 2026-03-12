"use client";

import NameGeneratorTemplate from "@/components/templates/NameGeneratorTemplate";
import { superheroPrefixes, superheroSuffixes, pickFromInput } from "@/data/fun-names";

const POWERS = [
  "Super strength", "Flight", "Invisibility", "Telepathy", "Speed",
  "Time travel", "Shape-shifting", "Telekinesis", "Fire control", "Ice powers",
  "Healing", "Lightning", "Super intelligence",
];

export default function SuperheroNameGenerator() {
  return (
    <NameGeneratorTemplate
      slug="superhero-name-generator"
      headline="Your Superhero Name Is..."
      subheadline="Every hero needs an origin story. What's yours?"
      bgGradient="from-blue-600 to-indigo-700"
      icon="🦸"
      type="Superhero"
      gradientColors={["#3b82f6", "#4f46e5"]}
      inputs={[
        { id: "firstName", label: "Your first name", placeholder: "e.g. Laura" },
        { id: "power", label: "Choose your superpower", options: POWERS },
        { id: "weakness", label: "Your biggest weakness", placeholder: "e.g. Chocolate" },
      ]}
      generate={(vals) => {
        const prefix = pickFromInput(vals.power + vals.weakness, superheroPrefixes);
        const suffix = pickFromInput(vals.firstName + vals.power, superheroSuffixes);
        return `${prefix} ${suffix}`;
      }}
    />
  );
}
