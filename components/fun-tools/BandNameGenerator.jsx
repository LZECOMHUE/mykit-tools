"use client";

import NameGeneratorTemplate from "@/components/templates/NameGeneratorTemplate";
import { bandAdjectives, bandNouns, pickFromInput } from "@/data/fun-names";

const GENRES = [
  "Rock", "Pop", "Indie", "Metal", "Punk", "Electronic", "Hip Hop",
  "Jazz", "Folk", "Blues", "R&B", "Country", "Alternative", "Ska",
];

export default function BandNameGenerator() {
  return (
    <NameGeneratorTemplate
      slug="band-name-generator"
      headline="Your Band Name Is..."
      subheadline="Every legendary band started with a name. Here's yours."
      bgGradient="from-rose-500 to-orange-500"
      icon="🎸"
      type="Band"
      gradientColors={["#f43f5e", "#f97316"]}
      inputs={[
        { id: "genre", label: "Pick a genre", options: GENRES },
        { id: "mood", label: "Describe your vibe in one word", placeholder: "e.g. Chaotic" },
        { id: "place", label: "A place that means something to you", placeholder: "e.g. Brighton" },
      ]}
      generate={(vals) => {
        const adj = pickFromInput(vals.mood + vals.genre, bandAdjectives);
        const noun = pickFromInput(vals.place + vals.mood, bandNouns);
        return `The ${adj} ${noun}`;
      }}
    />
  );
}
