// Name component databases for all fun generators.
// Tools pick from these arrays based on user input to generate names.

export const popStarPrefixes = [
  "Luna", "Blaze", "Nova", "Velvet", "Crystal", "Diva", "Elektra", "Starla",
  "Phoenix", "Reign", "Siren", "Glitter", "Luxe", "Neon", "Aura", "Prism",
  "Soleil", "Raven", "Tempest", "Harmony", "Echo", "Jewel", "Shimmer", "Bliss",
];

export const popStarSuffixes = [
  "Monroe", "Wilde", "Valentine", "Storm", "Diamond", "St. James", "Fontaine",
  "Vega", "Sinclair", "Hart", "Blaze", "Rivers", "Knight", "Sterling", "Fox",
  "Cruz", "Onyx", "Delacroix", "Frost", "Noir", "Lux", "Gold", "Rose", "Moon",
];

export const rapperPrefixes = [
  "Lil", "Big", "Young", "MC", "DJ", "King", "Chief", "Don", "OG", "Slim",
  "Heavy", "Major", "Notorious", "Grand", "Real", "True", "Raw", "Fresh",
  "Icy", "Cash", "Rich", "Boss", "Dope", "Mega",
];

export const rapperSuffixes = [
  "Flex", "Flow", "Bars", "Stacks", "Bankz", "Savage", "Blaze", "Drip",
  "Frost", "Haze", "Vibes", "Phantom", "Racks", "Smoke", "Thunder", "Volt",
  "Wave", "Grind", "Hustle", "Swag", "Gold", "Ice", "Cash", "Fire",
];

export const piratePrefixes = [
  "Captain", "Blackbeard", "One-Eyed", "Dread Pirate", "Sea Dog", "Bloody",
  "Iron", "Scarlet", "Mad", "Barnacle", "Scurvy", "Cutlass", "Peg-Leg",
  "Dead-Eye", "Cannon", "Jolly", "Salty", "Rusty", "Red", "Storm",
];

export const pirateSuffixes = [
  "McPlunder", "Bones", "the Terrible", "Saltwater", "Blacktide", "Sharkbait",
  "Doubloon", "the Merciless", "Daggermouth", "Kraken", "the Cursed",
  "Seadog", "Plankwalker", "Cannonball", "the Dread", "Stormchaser",
  "Skullcrusher", "Rum Runner", "the Feared", "Marooner",
];

export const superheroPrefixes = [
  "Captain", "The Incredible", "Ultra", "Mega", "Super", "The Mighty",
  "Doctor", "The Amazing", "Shadow", "Cosmic", "Atomic", "Thunder",
  "Lightning", "Iron", "Hyper", "Quantum", "Neo", "Turbo", "Blaze", "Storm",
];

export const superheroSuffixes = [
  "Falcon", "Phoenix", "Guardian", "Titan", "Sentinel", "Striker", "Viper",
  "Hawk", "Blaze", "Shield", "Fury", "Justice", "Tempest", "Bolt", "Fang",
  "Arrow", "Phantom", "Surge", "Nova", "Comet",
];

export const bandAdjectives = [
  "Electric", "Velvet", "Midnight", "Neon", "Cosmic", "Atomic", "Crimson",
  "Golden", "Silver", "Broken", "Wild", "Twisted", "Frozen", "Reckless",
  "Silent", "Burning", "Hollow", "Savage", "Mystic", "Wicked", "Toxic",
  "Sacred", "Royal", "Iron",
];

export const bandNouns = [
  "Wolves", "Roses", "Thunder", "Echoes", "Frequency", "Daydream", "Horizon",
  "Paradox", "Revolt", "Vortex", "Mirage", "Serenade", "Asylum", "Empire",
  "Chaos", "Disciples", "Vultures", "Serpents", "Revival", "Alliance",
  "Odyssey", "Phantom", "Syndicate", "Renegades",
];

// Utility: deterministic-ish pick based on string input
export function pickFromInput(str, arr) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return arr[Math.abs(hash) % arr.length];
}

// Utility: pick random from array
export function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
