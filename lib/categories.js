export const categories = [
  { slug: "finance", name: "Finance", icon: "\u{1F4B0}", color: "cat-finance", description: "Tax calculators, mortgage tools, pension planners, savings trackers" },
  { slug: "cooking", name: "Cooking & Kitchen", icon: "\u{1F373}", color: "cat-cooking", description: "Recipe converters, measurement tools, cooking timers, meal planners" },
  { slug: "games", name: "Games & Generators", icon: "\u{1F3B2}", color: "cat-games", description: "Bingo cards, quiz generators, word searches, party game tools" },
  { slug: "developer", name: "Developer Tools", icon: "\u{1F4BB}", color: "cat-developer", description: "JSON formatters, encoders, regex testers, code minifiers" },
  { slug: "text", name: "Text Tools", icon: "\u{1F4DD}", color: "cat-text", description: "Word counters, case converters, text formatters, diff tools" },
  { slug: "converters", name: "Unit Converters", icon: "\u{1F504}", color: "cat-converters", description: "Weight, length, volume, temperature, speed, area conversions" },
  { slug: "health", name: "Health & Fitness", icon: "\u{1F4AA}", color: "cat-health", description: "BMI, TDEE, macro calculators, workout generators, meal plans" },
  { slug: "wedding", name: "Wedding & Events", icon: "\u{1F492}", color: "cat-wedding", description: "Seating planners, budget trackers, guest lists, party tools" },
  { slug: "education", name: "Education", icon: "\u{1F4DA}", color: "cat-education", description: "Classroom tools, worksheet generators, grade calculators" },
  { slug: "home", name: "Home & Property", icon: "\u{1F3E0}", color: "cat-home", description: "Mortgage, renovation, paint, energy, moving calculators" },
  { slug: "business", name: "Business", icon: "\u{1F4BC}", color: "cat-business", description: "Invoice generators, pricing tools, social media planners" },
  { slug: "travel", name: "Travel", icon: "\u{2708}\u{FE0F}", color: "cat-travel", description: "Itinerary builders, packing lists, currency converters, budgets" },
  { slug: "datetime", name: "Date & Time", icon: "\u{1F4C5}", color: "cat-datetime", description: "Countdowns, age calculators, timezone converters, date maths" },
  { slug: "maths", name: "Maths & Science", icon: "\u{1F52C}", color: "cat-maths", description: "Geometry, algebra, physics, chemistry, statistics calculators" },
  { slug: "creative", name: "Creative & Design", icon: "\u{1F3A8}", color: "cat-creative", description: "Colour tools, font pairers, gradient generators, layout helpers" },
  { slug: "parenting", name: "Parenting & Kids", icon: "\u{1F476}", color: "cat-parenting", description: "Activity generators, milestone trackers, routine charts, party planners" },
  { slug: "automotive", name: "Automotive", icon: "\u{1F697}", color: "cat-automotive", description: "Fuel economy, tyre calculators, road trip planners" },
  { slug: "seasonal", name: "Seasonal", icon: "\u{1F384}", color: "cat-seasonal", description: "Christmas, Halloween, New Year, back-to-school tools" },
  { slug: "fun", name: "Fun & Viral", icon: "\u{1F525}", color: "cat-fun", description: "Name generators, personality quizzes, shareable results — made to screenshot and share" },
  { slug: "quiz", name: "Quizzes & Self-Discovery", icon: "\u{1F9E0}", color: "cat-quiz", description: "Personality tests, attachment styles, mental health screens, love languages, relationship quizzes" },
  { slug: "sports", name: "Sports & Fitness", icon: "\u{26BD}", color: "cat-sports", description: "Score trackers, training plans, brackets, handicap calculators, betting odds" },
];

export function getCategoryBySlug(slug) {
  return categories.find((c) => c.slug === slug) || null;
}
