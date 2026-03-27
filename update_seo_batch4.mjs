import fs from 'fs';

// --- 1. UPDATE REGISTRY METADATA ---
let registry = fs.readFileSync('lib/tool-registry.js', 'utf8');
const updates = [
  {
    slug: 'ukulele-tuner',
    title: '"Online Ukulele Tuner (Standard & Soprano Tuning)"',
    extraKeywords: ', ukulele tune online, tuning your ukulele online, online ukulele tuner, stroik do ukulele online, uku tuner'
  },
  {
    slug: 'mtg-deck-cost',
    title: '"MTG Deck Cost & Value Builder Calculator"',
    extraKeywords: ', deck maker mtg cost, mtg deck builder cost, magic deck cost, deck value, deckbuilder cost'
  },
  {
    slug: 'ebay-fee-calculator',
    title: '"eBay Fee Calculator (Private & Business Sellers)"',
    extraKeywords: ', ebay selling fees, ebay selling fee, ebay fees for business sellers, ebay business seller fees uk'
  },
  {
    slug: 'tax-year-calendar',
    title: '"UK Tax Year Dates & Calendar (When does it run?)"',
    extraKeywords: ', english tax year dates, uk tax year date, what is the next tax year, when does the tax year run uk, tax year 24 25 dates'
  },
  {
    slug: 'australia-rego-cost-calculator',
    title: '"Australia Car Rego Cost Calculator & Estimate"',
    extraKeywords: ', rego price check nsw, car registration estimate, calculate registration fees, car registration calculator, australia car registration cost'
  }
];

updates.forEach(up => {
  const regex = new RegExp(`(slug: "${up.slug}",[\\s\\S]*?keywords: ")([^"]+)("[\\s\\S]*?seoTitle: )null`);
  registry = registry.replace(regex, (match, p1, p2, p3) => {
    return p1 + p2 + up.extraKeywords + p3 + up.title;
  });
});
fs.writeFileSync('lib/tool-registry.js', registry, 'utf8');

// --- 2. CREATE music.js ---
const newMusic = `// SEO content for music and audio tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const musicSEO = {
  "ukulele-tuner": {
    sections: [
      createAnswerFirstSection(
        "Standard Tuning for Ukulele (G-C-E-A)",
        "The standard tuning for a soprano, concert, and tenor ukulele is G-C-E-A (from the top string closest to your face, down to the floor). Often remembered with the acronym 'Good Cows Eat Apples'.",
        "Unlike guitars, standard ukulele tuning is 're-entrant', which means the strings do not go strictly from low to high pitch. The top G string is actually tuned higher than the C string right below it, giving the ukulele its signature bright, island sound."
      )
    ],
    faqs: [
      createFAQ(
        "Does the online ukulele tuner use my microphone?",
        "Yes, if you select the microphone tuner option, it listens to the pitch of your string in real-time and provides visual feedback to tell you if the string is flat (too low) or sharp (too high)."
      ),
      createFAQ(
        "Should my soprano ukulele be tuned differently than a tenor?",
        "No. Soprano, concert, and tenor ukuleles are all typically strung and tuned to standard G-C-E-A tuning. The only exception is the Baritone ukulele, which is larger and naturally tuned to D-G-B-E (like the top four strings of a guitar)."
      )
    ]
  }
};
`;
fs.writeFileSync('data/seo-content/music.js', newMusic, 'utf8');

// --- 3. CREATE automotive.js ---
const newAuto = `// SEO content for vehicle and transport tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const automotiveSEO = {
  "australia-rego-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Car Registration Fees Are Calculated in Australia",
        "Your vehicle registration (rego) fee is not a flat rate. It is a combination of administrative state fees, motor vehicle tax (which scales differently depending on the state), and mandatory Compulsory Third Party (CTP) insurance (Green Slip in NSW).",
        "For example, in New South Wales and Victoria, the weight of the vehicle and its engine size heavily influence the tax portion. Heavier vehicles like SUVs and utes typically cost more to register than light hatchbacks."
      )
    ],
    faqs: [
      createFAQ(
        "How do I get a car registration estimate for NSW?",
        "In NSW, your total rego cost involves fixing your CTP Green Slip first (prices vary by insurer) plus the RMS registration fee and vehicle tax. Our rego price checker provides a solid estimate based on passenger vehicle averages in your state."
      ),
      createFAQ(
        "Can I pay my car registration for 3 or 6 months?",
        "Most states, including Queensland, Victoria, and WA, allow 3-month or 6-month rego renewals. However, renewing for shorter periods usually incurs a higher surcharge compared to paying for a full 12 months upfront."
      )
    ]
  }
};
`;
fs.writeFileSync('data/seo-content/automotive.js', newAuto, 'utf8');

// --- 4. UPDATE index.js ---
let indexContent = fs.readFileSync('data/seo-content/index.js', 'utf8');
indexContent = indexContent.replace(
  'import { homeSEO } from "./home.js";',
  'import { homeSEO } from "./home.js";\nimport { musicSEO } from "./music.js";\nimport { automotiveSEO } from "./automotive.js";'
);
indexContent = indexContent.replace(
  '...homeSEO,',
  '...homeSEO,\n  ...musicSEO,\n  ...automotiveSEO,'
);
fs.writeFileSync('data/seo-content/index.js', indexContent, 'utf8');

// --- 5. UPDATE games.js ---
let gamesContent = fs.readFileSync('data/seo-content/games.js', 'utf8');
const newGames = `
  "mtg-deck-cost": {
    sections: [
      createAnswerFirstSection(
        "How to Price an MTG Deck",
        "Pricing a Magic: The Gathering deck involves pulling real-time aggregate market data for every individual card in the 60 or 100-card list. Because card prices fluctuate wildly based on tournament results, reprints, and ban lists, static tracking is impossible.",
        "Our MTG deck cost builder pulls daily closing prices from major marketplaces (like TCGPlayer or Cardmarket) to estimate the true cash value of your decklist for selling, trading, or budget-building."
      )
    ],
    faqs: [
      createFAQ(
        "Does the deck value calculator account for foil or full-art cards?",
        "The standard estimate pulls the lowest available print price for an English, Near Mint version of the card. Foil, alternate-art, or hyper-specific vintage printings will carry a massive premium that basic bulk estimators might not fully capture."
      ),
      createFAQ(
        "Why is my magic deck cost suddenly dropping?",
        "It happens! If a highly played card in your deck gets reprinted in a new Masters set, or if a key combo piece gets banned in Modern or Commander, the secondary market value of the entire deck strategy can plummet overnight."
      )
    ]
  }
};`;
gamesContent = gamesContent.replace('};', newGames);
fs.writeFileSync('data/seo-content/games.js', gamesContent, 'utf8');

// --- 6. UPDATE business.js ---
let businessContent = fs.readFileSync('data/seo-content/business.js', 'utf8');
const newBusinessBatch4 = `
  "ebay-fee-calculator": {
    sections: [
      createAnswerFirstSection(
        "Selling on eBay: The Final Value Fee Explained",
        "eBay does not charge you to list most items (up to your monthly limit), but they take a 'Final Value Fee' when the item sells. For private sellers in the UK, this is typically 12.8% of the total amount the buyer paid (including shipping and postage), plus a fixed fee of 30p per order.",
        "For business sellers, the fee structure is entirely different and depends heavily on the category of the item. Tech and electronics might attract a lower percentage, while fashion might be higher. Business sellers must also factor in VAT on their eBay fees."
      )
    ],
    faqs: [
      createFAQ(
        "What are the eBay fees for business sellers in the UK?",
        "Business sellers pay a category-specific final value fee (usually between 5% and 12.9%), plus a fixed charge of 30p per listing. They may also pay shop subscription fees if they run an eBay Store. Use our calculator to select your specific category for an accurate net payout estimate."
      ),
      createFAQ(
        "Does eBay charge a fee on postage?",
        "Yes. eBay's final value fee is calculated on the total transaction amount, meaning it is applied to the item price plus whatever you charged the buyer for shipping and handling. This stops sellers from listing items for 1p with £50 shipping to avoid fees."
      )
    ]
  },

  "tax-year-calendar": {
    sections: [
      createAnswerFirstSection(
        "What is the UK Tax Year?",
        "Unlike the calendar year (which runs Jan 1 - Dec 31), the UK tax year uniquely runs from the 6th of April one year to the 5th of April the next. The 2025/26 tax year dates start on April 6, 2025, and end on April 5, 2026.",
        "This odd scheduling aligns with the historic British fiscal calendar, dating back to 1752 when the country transitioned to the Gregorian calendar and moved the new year to align with the Exchequer's accounting."
      )
    ],
    faqs: [
      createFAQ(
        "When does the tax year run in the UK?",
        "It officially begins on April 6th and concludes exactly on April 5th the following year. This remains true every single year continuously."
      ),
      createFAQ(
        "When is the self-assessment deadline for the 24/25 tax year?",
        "For the tax year ending April 5th 2025, your online self-assessment tax return and any final tax balancing payment must be submitted to HMRC by midnight on January 31st, 2026."
      )
    ]
  }
};`;
businessContent = businessContent.replace('};', newBusinessBatch4);
fs.writeFileSync('data/seo-content/business.js', businessContent, 'utf8');

console.log('Batch 4 Complete!');
