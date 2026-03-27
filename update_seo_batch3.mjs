import fs from 'fs';

// 1. Create cooking.js
const newCooking = `// SEO content for cooking and food tools
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
`;
fs.writeFileSync('data/seo-content/cooking.js', newCooking, 'utf8');

// 2. Create home.js
const newHome = `// SEO content for home and property tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const homeSEO = {
  "double-glazing-payback-calculator": {
    sections: [
      createAnswerFirstSection(
        "Calculating the Payback on New Windows",
        "Upgrading to double glazed windows is a significant investment. However, replacing old, draughty single-pane windows can slash your annual heating bills. The 'payback period' is the number of years it takes for your cumulative energy savings to equal the initial cost of installation.",
        "A double glazing cost calculator helps you visualize these long-term savings. While secondary glazing has a lower upfront cost, full double glazing provides better thermal efficiency, soundproofing, and increases the resale value of your property."
      )
    ],
    faqs: [
      createFAQ(
        "Is secondary glazing cost-effective?",
        "Secondary glazing involves adding a slim second window on the room-side of your existing single-glazed window. It is significantly cheaper than full double glazing and often doesn't require planning permission (crucial for listed buildings). The payback period is usually much shorter."
      ),
      createFAQ(
        "How long does it take for double glazed windows to pay for themselves?",
        "Depending on local energy prices, the size of your home, and the thermal rating of your new windows (A++ vs C-rated), the payback period typically ranges from 15 to 25 years strictly in energy savings. However, this calculation usually ignores the immediate boost to your property's overall market value."
      )
    ]
  }
};
`;
fs.writeFileSync('data/seo-content/home.js', newHome, 'utf8');

// 3. Update index.js
let indexContent = fs.readFileSync('data/seo-content/index.js', 'utf8');
indexContent = indexContent.replace(
  'import { mapsSEO } from "./maps.js";',
  'import { mapsSEO } from "./maps.js";\nimport { cookingSEO } from "./cooking.js";\nimport { homeSEO } from "./home.js";'
);
indexContent = indexContent.replace(
  '...mapsSEO,',
  '...mapsSEO,\n  ...cookingSEO,\n  ...homeSEO,'
);
fs.writeFileSync('data/seo-content/index.js', indexContent, 'utf8');

// 4. Update seasonal.js
let seasonalContent = fs.readFileSync('data/seo-content/seasonal.js', 'utf8');
const newSeasonal = `
  "when-is-remembrance-day": {
    sections: [
      createAnswerFirstSection(
        "Remembrance Day vs Remembrance Sunday",
        "Remembrance Day in the UK specifically falls on the 11th of November every year, marking the exact day in 1918 when the Armistice was signed to end World War I at the eleventh hour. On this day, a two-minute silence is observed at 11am.",
        "Remembrance Sunday, however, is the second Sunday in November. This is when the main national commemorations take place, including the National Service of Remembrance at the Cenotaph in London, attended by the Royal Family and political leaders."
      )
    ],
    faqs: [
      createFAQ(
        "When is Remembrance Sunday this year?",
        "Because it always falls on the second Sunday of November, the date changes every year. Our tool calculates the exact date and provides a live countdown. It usually falls between the 8th and 14th of November."
      ),
      createFAQ(
        "Why do we wear poppies?",
        "The red poppy became a symbol of remembrance following the famous poem 'In Flanders Fields', written by Canadian physician Lieutenant-Colonel John McCrae. Poppies were among the first plants to grow in the churned-up earth of soldiers' graves in Belgium and France."
      )
    ]
  }
};`;
seasonalContent = seasonalContent.replace('};', newSeasonal);
fs.writeFileSync('data/seo-content/seasonal.js', seasonalContent, 'utf8');

// 5. Update finance.js
let financeContent = fs.readFileSync('data/seo-content/finance.js', 'utf8');
const newFinanceBatch3 = `
  "australia-long-service-leave-calculator": {
    sections: [
      createAnswerFirstSection(
        "Understanding Long Service Leave (LSL) Accrual",
        "Long Service Leave (LSL) is a paid leave entitlement for Australian employees who have worked for the same employer for a continuous, extended period. The core principle is consistent, but the exact accrual rates, eligibility thresholds, and payout rules vary significantly between states (e.g. QLD vs WA vs VIC).",
        "Typically, employees are entitled to 2 months (8.6667 weeks) of paid leave after 10 years of continuous service. Use calculating tools to track your exact accrual and pro rata entitlements."
      )
    ],
    faqs: [
      createFAQ(
        "How does a pro rata long service leave calculator work?",
        "If you leave your employer after a certain number of years (usually 7 years, but this depends on your state), but before the full 10-year mark, you may be entitled to a pro rata (proportional) payout of your accrued leave. The calculator factors in your specific state legislation to determine if you meet this threshold."
      ),
      createFAQ(
        "Does LSL apply to casual and part-time workers?",
        "Yes, in most Australian states and territories, casual and permanent part-time employees are eligible for Long Service Leave. The accrual is calculated proportionally based on the total hours worked over their continuous employment."
      )
    ]
  },

  "us-medical-bill-estimator": {
    sections: [
      createAnswerFirstSection(
        "Navigating US Healthcare Costs",
        "The US healthcare system is notoriously complex due to the interplay of deductibles, copays, coinsurance, and out-of-pocket maximums. A patient cost estimator tool helps you forecast exactly what a procedure or treatment will cost you personally, rather than relying on abstract hospital chargemaster rates.",
        "Always remember: the 'billed amount' is rarely what you actually pay. Your insurance company negotiates a much lower 'allowed amount', and your out-of-pocket obligation is based strictly on that lower negotiated rate."
      )
    ],
    faqs: [
      createFAQ(
        "How is patient responsibility calculated on a medical bill?",
        "First, you must pay 100% of the negotiated rate until your annual deductible is met. Afterward, you enter the coinsurance phase (e.g. your insurance pays 80%, you pay 20%). Once your total payments hit the out-of-pocket maximum, the insurance covers 100% of allowed charges for the rest of the year."
      ),
      createFAQ(
        "Can a billing estimate tool guarantee the final cost?",
        "No. An estimator provides a highly accurate forecast based on your insurance plan's summary of benefits. However, if complications arise during a procedure requiring additional doctors, imaging, or longer hospital stays, the final billed amount will increase."
      )
    ]
  }
};`;
financeContent = financeContent.replace('};', newFinanceBatch3);
fs.writeFileSync('data/seo-content/finance.js', financeContent, 'utf8');

console.log('Batch 3 Content Injected!');
