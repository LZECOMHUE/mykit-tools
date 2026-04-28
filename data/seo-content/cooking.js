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
  },

  "cake-pricing-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Price a Custom Cake Without Underselling",
        "A typical 8-inch round celebration cake from a UK home baker sells for £40 to £90 depending on complexity, and that price has to cover ingredients, time, overheads, equipment depreciation and a sensible markup. Most home bakers underprice by around 50% because they only count the flour and sugar, then forget the four hours they spent piping buttercream. The calculator handles all of that for you, building the price up from real cost components rather than guessing.",
        "The default decorating rate is £25 per hour, which sits in the middle of the UK range (skilled hobbyists charge £15 to £20, established professionals £30 to £40). Mileage runs at £0.45 per mile, the HMRC standard rate that you can claim back as a self-employed expense. Overheads add a flat 10% on top to cover utilities, insurance, packaging and the inevitable bag of cornflour you forgot you needed, then markup of 50% gets added at the end so the cake actually pays you for being in business."
      ),
      createAnswerFirstSection(
        "What Each Complexity Tier Actually Means",
        "Simple is a single-tier cake with smooth buttercream or fondant, maybe a sprinkle of edible glitter, no figures, no painted detail. A simple 8-inch buttercream sponge takes a competent baker around 3 hours start to finish and prices out in the £40 to £55 range. Moderate adds piped detail, drip effects, fresh flowers or basic fondant decorations: count on 5 to 6 hours, £60 to £80 for an 8-inch.",
        "Elaborate covers themed cakes with multiple decorations, isomalt work, hand-painted detail or a single sculpted element. Most weddings and milestone birthdays land here. Realistic time is 8 to 12 hours and prices typically run £90 to £150 for an 8-inch single tier. Sculpted is the top end: novelty 3D shapes, gravity-defying designs, fully fondant-modelled figures. These take 15 to 30 hours and start at £150 even for a small cake. Be honest about which tier the customer is asking for, because customers consistently describe their Pinterest screenshots as 'just simple' when they are actually elaborate."
      ),
      {
        heading: "Typical UK Market Rates by Size and Complexity",
        table: {
          headers: ["Size", "Simple", "Moderate", "Elaborate", "Sculpted"],
          rows: [
            ["6\" round", "£30 - £40", "£45 - £60", "£65 - £90", "£100+"],
            ["8\" round", "£40 - £55", "£60 - £80", "£90 - £150", "£150+"],
            ["10\" round", "£60 - £80", "£85 - £120", "£130 - £200", "£200+"],
            ["12\" round", "£85 - £120", "£125 - £180", "£190 - £280", "£280+"],
            ["2-tier (6\"+8\")", "£90 - £130", "£140 - £200", "£220 - £350", "£350+"],
          ],
        },
      },
      createAnswerFirstSection(
        "Delivery, Setup and the Awkward Conversation About Mileage",
        "Wedding cakes almost always need delivery and setup; a tiered cake transported in the back of a customer's car is a stress story waiting to happen. The calculator works out delivery cost using the HMRC mileage rate of £0.45 per mile, which covers fuel, wear and a fair share of insurance. A 30-mile round trip is £13.50, which most customers will pay without a flinch if you build it into the quote upfront rather than springing it at the end.",
        "Setup at the venue (stacking tiers, adding flowers, positioning on the table) typically adds 30 to 60 minutes plus driving time. Charge for it. If a venue is more than an hour away from you, factor in two hours at the decorating rate just for the round trip. For more on costing your time properly, the [recipe cost calculator](/recipe-cost-calculator) handles the ingredient side of any bake, and the [candle cost calculator](/candle-cost-calculator) uses the same hourly-rate-plus-markup logic for craft pricing if you sell at fairs."
      ),
      createAnswerFirstSection(
        "When the Calculator Says £80 But the Customer Saw £40 on Facebook",
        "Hobby bakers selling on Facebook regularly underprice at £30 to £40 for an 8-inch decorated sponge, which is below their actual cost once you account for time. They do this because they are not running it as a business and they are pricing for materials only. If a customer compares your quote to one of those, the honest answer is that the £40 cake is being subsidised by someone's spare time, and that baker will eventually either raise prices or burn out.",
        "The calculator's market range column shows where established cake makers in the UK actually price. If your number is sitting near the top of the range, your complexity multiplier might be set higher than the design actually needs. If it is below the range, you are leaving money on the table. The [baking substitution finder](/baking-substitution-finder) is a separate tool but useful when costing out unusual flavour requests where ingredient substitutions can shift your raw material spend significantly."
      ),
    ],
    faqs: [
      createFAQ(
        "How much should I charge for a 6-inch cake?",
        "A 6-inch round serves around 8 to 10 people as celebration portions, or 6 generous slices. Simple buttercream designs sell for £30 to £40, moderate detail £45 to £60, elaborate £65 to £90. The 6-inch size is increasingly popular for small birthday cakes and 'cutting cakes' at weddings (where the main display is fake and a hidden 6-inch is what actually gets cut and served), so demand is solid even though the cake itself is small."
      ),
      createFAQ(
        "Do I need to register as a food business?",
        "If you sell cakes for money, even occasionally and even from your home kitchen, you must register as a food business with your local council in the UK. Registration is free, takes 10 to 15 minutes online and must be done at least 28 days before you start trading. You will also need a basic Level 2 Food Hygiene certificate (around £15 to £25 online) and an Environmental Health Officer may visit your kitchen, though many never do for small home bakeries."
      ),
      createFAQ(
        "What about ingredients I already have in the cupboard?",
        "Cost them in anyway. The flour, sugar and butter you used today have to be replaced for the next cake, and those replacement costs are real. The exception is one-off equipment purchases like specialist cake tins or a new piping nozzle, which you should amortise across multiple cakes rather than loading entirely onto the first customer. The 10% overheads line in the calculator covers small kitchen consumables, so you do not need to itemise every greaseproof sheet."
      ),
      createFAQ(
        "Should I charge VAT on cake sales?",
        "Most home bakers do not need to register for VAT because turnover is below the £90,000 annual threshold. If you do cross that threshold, cakes for human consumption are zero-rated for VAT (one of the surviving zero-rate categories in UK tax), so even after registration you would not add VAT to the cake price itself. You would, however, charge VAT on delivery if you choose to break it out separately on the invoice."
      ),
      createFAQ(
        "How do I price tiered wedding cakes?",
        "Tiered cakes are not just two cakes added together; the structural work, dowelling, fondant covering for stacked tiers, transport and setup all add complexity. As a rough guide, a 2-tier (6-inch on top of 8-inch) elaborate wedding cake in the UK ranges from £220 to £350, a 3-tier from £400 to £700, and bespoke designer wedding cakes from £700 upwards. Always include a setup fee of £30 to £60 separate from the cake price for any tiered wedding delivery."
      ),
    ],
    relatedTools: [
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
      { slug: "candle-cost-calculator", label: "Candle Cost Calculator" },
      { slug: "baking-substitution-finder", label: "Baking Substitution Finder" },
    ],
  },
};
