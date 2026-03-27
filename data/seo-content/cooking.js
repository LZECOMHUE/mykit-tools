// SEO content for cooking and food tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const cookingSEO = {
  "cocktail-recipe-generator": {
    sections: [
      createAnswerFirstSection(
        "Make Cocktails With What You Have",
        "Ever stared at a half-empty bottle of vodka, some old limes, and tonic water, wondering if you can make a decent drink? A cocktail builder or ingredient generator solves this exact problem by reverse-engineering recipes based on your actual pantry.",
        "Instead of going to the store for a single obscure liqueur, you simply input the spirits and mixers you already have. The generator then scours thousands of classic and modern recipes to find exact matches or very close substitutions."
      )
    ],
    faqs: [
      createFAQ(
        "How do you use the online cocktail maker?",
        "Simply check the boxes for the ingredients you currently have at home - including base spirits, liqueurs, juices, and garnishes. The cocktail recipe maker will instantly filter our database to show you every drink you can make right now without leaving the house."
      ),
      createFAQ(
        "Can the cocktail builder suggest ingredient substitutions?",
        "Yes! If you are missing one minor ingredient (like substituting lemon juice for lime, or simple syrup for agave), the generator will often suggest recipes where these swaps are standard practice in the bartending community."
      )
    ]
  }
};
