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

  "baking-conversion-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why Cup Measurements Don't Translate Cleanly",
        "It is 7pm, you have found an American chocolate chip cookie recipe online, and it asks for 2 cups of flour and 1 cup of brown sugar. Your scales are out, your measuring jug shows ml, and the back of the flour bag is in grams. The honest answer is that 1 cup of plain flour weighs 120g, 1 cup of granulated sugar weighs 200g, 1 cup of butter weighs 227g, and 1 cup of cocoa powder weighs 86g. They are not the same weight because cup is a volume measurement and these ingredients have wildly different densities.",
        "This calculator handles 9 common baking ingredients and converts between cups, tablespoons, teaspoons, ounces and grams using the actual density of each one. Pick flour and you get 120g per cup; pick honey and you get 340g per cup. Punch in the amount and unit you have, and every other unit appears underneath. No converting in your head, no scrolling forums to find out whether the recipe means UK or US tablespoons (they are different sizes; this tool uses US conventions because that is where most cup recipes come from)."
      ),
      createAnswerFirstSection(
        "Why Bakers Insist on Weighing",
        "Spoon flour into a cup loosely and it weighs around 120g. Scoop it straight from the bag with the cup pressed in and you can hit 150g, which is 25% more flour than the recipe wants. That extra flour is why so many home-baked cakes come out dry and dense. Switching to a digital scale (£10 to £15 at any supermarket) removes this entire category of problem and is the single biggest upgrade most home bakers can make.",
        "If you do not have scales handy, this tool gets you close. For everyday biscuit and brownie recipes, cup conversions work fine because the recipes are forgiving. For sourdough, macarons, choux pastry or anything where exact hydration matters, weigh it. The [grams to cups converter](/grams-to-cups) handles the reverse direction when you are working from a metric recipe and only have cup measures, which happens regularly with vintage British cookery books that switched between systems mid-decade."
      ),
    ],
    faqs: [
      createFAQ(
        "How many grams in a cup of flour?",
        "One US cup of plain flour weighs around 120g, assuming you spoon the flour gently into the cup and level it off rather than packing it down. Bread flour is slightly heavier at around 130g per cup because the protein structure makes the grain pack more densely. Cake flour is lighter at around 114g per cup. The difference matters most in recipes that depend on a specific flour-to-liquid ratio."
      ),
      createFAQ(
        "Why is 1 cup of butter 227g not 240g?",
        "Butter is denser than water (water at 1 cup is 240g) but the standard US baking measurement of 1 cup butter equals one half-pound block, which is 227g (or two sticks, 8oz). American recipes often write butter quantities in sticks for this reason. UK butter usually comes in 250g blocks, which is roughly 1 cup plus 1 tbsp."
      ),
      createFAQ(
        "Are UK and US tablespoons the same?",
        "No. A US tablespoon is 14.8ml, a UK tablespoon is 17.7ml, and an Australian tablespoon is 20ml. The teaspoon is more consistent at 5ml across all three. Most online recipes use US conventions, and this calculator uses 15ml as a working tablespoon (the international metric standard) which is close enough for most baking. For accuracy with small quantities of leavening agents, weigh in grams instead."
      ),
      createFAQ(
        "What about ingredients not in the list?",
        "For ingredients not listed (almond flour, ground oats, golden syrup, treacle), look up the density per cup and use the closest match in the dropdown as a working approximation. Almond flour is around 96g per cup so flour is reasonable. Golden syrup is around 320g per cup so honey works well. For absolute accuracy, weigh."
      ),
    ],
    relatedTools: [
      { slug: "grams-to-cups", label: "Grams to Cups Converter" },
      { slug: "cups-to-grams", label: "Cups to Grams Converter" },
      { slug: "cooking-measurement-converter", label: "Cooking Measurement Converter" },
    ],
  },

  "baking-substitution-finder": {
    sections: [
      createAnswerFirstSection(
        "How to Swap an Ingredient Without Wrecking the Bake",
        "You are halfway through a brownie recipe when you realise you have run out of eggs, or your dinner guest casually mentions she is dairy-free, or the only flour in the cupboard is the gluten-free blend you bought last January. This finder covers 17 common baking ingredients (eggs, butter, milk, sugar, flour, baking powder, cream, buttermilk, honey, vanilla, cornstarch, cream cheese, sour cream, yogurt, oil, cocoa, chocolate) and gives you the substitute, the exact ratio and the texture trade-off.",
        "Filter by vegan, dairy-free, gluten-free or lower-calorie to narrow the list to swaps that fit the diet you are baking for. Each result tells you what flavour or texture changes to expect, because no substitute is identical and the honest version of baking advice acknowledges that. Applesauce in place of butter saves fat but the cake is denser. Aquafaba in place of egg whites whips up beautifully but only in cold applications."
      ),
      createAnswerFirstSection(
        "When Substitutions Just Work and When They Don't",
        "Liquid-for-liquid swaps are the safest. Replacing dairy milk with oat milk at 1:1 in pancakes, scones and quick breads almost always works. Replacing butter with oil at the same volume works in muffins and brownies but ruins shortbread, where the texture depends on solid fat. Replacing 1 egg with 1 tablespoon of ground flax plus 3 tablespoons of water works in cookies and quick breads but not in meringues, soufflés or anything that needs eggs to provide structure or aeration.",
        "The general rule: in a recipe with multiple eggs, swap one at most and keep the others real. In a recipe that depends on creaming butter and sugar, do not substitute the butter with applesauce or oil; the structure relies on the air beaten into solid fat. For texture-sensitive bakes (sponges, choux, croissants) test substitutions in a small batch first. The [baking conversion calculator](/baking-conversion-calculator) is useful when the substitution ratios in the finder are written in cups but you are weighing in grams."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the best vegan egg substitute for baking?",
        "It depends on the bake. For brownies, banana bread and dense cakes, mashed banana or applesauce (¼ cup per egg) works well and adds moisture. For cookies, a flax or chia egg (1 tbsp ground seed plus 3 tbsp water, left to thicken for 15 minutes) gives the best texture. For meringues and macarons, aquafaba (the liquid from a tin of chickpeas, 3 tbsp per egg white) is the only substitute that whips up properly."
      ),
      createFAQ(
        "Can I use honey instead of sugar in any recipe?",
        "Mostly yes, but with adjustments. Use ¾ cup of honey for every 1 cup of sugar, reduce the other liquids in the recipe by ¼ cup, and lower the oven temperature by around 15°C because honey browns faster. Honey adds a noticeable flavour, so it works best in spiced cakes, flapjacks and quick breads rather than vanilla sponges where you want a clean taste."
      ),
      createFAQ(
        "Does almond flour swap 1:1 with plain flour?",
        "Roughly, but the bake will be denser and may not rise as well. Almond flour has no gluten so it cannot stretch and trap air the same way wheat flour can. For best results in cakes, replace only a third to a half of the wheat flour with almond and add 1 tablespoon of cornflour or arrowroot per cup to help with structure. For all-almond bakes, follow recipes specifically designed for almond flour."
      ),
      createFAQ(
        "How do I make buttermilk if I don't have any?",
        "Stir 1 tablespoon of lemon juice or white vinegar into 1 cup (240ml) of regular milk and leave it to sit for 5 minutes. The milk will curdle slightly and develop the tang and acidity that buttermilk brings to scones, soda bread and pancakes. Plant-based milks (especially soya and oat) will also curdle this way and work as a vegan buttermilk substitute."
      ),
    ],
    relatedTools: [
      { slug: "recipe-scaler", label: "Recipe Scaler" },
      { slug: "cups-to-grams-flour", label: "Cups to Grams (Flour)" },
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
    ],
  },

  "cake-tin-converter": {
    sections: [
      createAnswerFirstSection(
        "Scale a Recipe Between Tin Sizes Without Guesswork",
        "The recipe is for a 23cm (9 inch) round tin. You only have a 20cm (8 inch) round. Or the recipe is for a square brownie tin and you need to bake it round. Tin conversion is a maths problem, not a guess: calculate the surface area of each tin, divide one by the other, and that gives you the multiplier for every ingredient. A 20cm round has an area of 314 cm², a 23cm round has 415 cm², so to scale up you multiply everything by 1.32.",
        "This converter does the area maths for round, square and rectangular tins, then applies the scale factor to a standard Victoria sponge recipe (225g flour, 225g sugar, 225g butter, 4 eggs) so you can see exactly what your scaled quantities should be. Switch between metric and US cup measurements with the toggle. The visual diagram overlays your tin with the recipe tin so you can see at a glance whether you are scaling up or down, and by how much."
      ),
      createAnswerFirstSection(
        "Round to Square and the Inch Rule",
        "Common bakers' shorthand: a round tin and a square tin of the same dimension are not the same volume. An 8 inch (20cm) square tin holds 25% more batter than an 8 inch round, because the corners add area. The traditional swap is to go down one inch when moving from round to square: an 8 inch round recipe fits a 7 inch square (around 18cm), a 9 inch round fits an 8 inch square. The calculator confirms this with exact maths so you do not have to remember the rule.",
        "Baking time changes too, but less dramatically than ingredients do. A larger, shallower bake cooks faster because more surface area is exposed; a smaller, deeper one cooks slower. The tool gives you a time multiplier (typically 0.85 to 1.0 in either direction) but always check with a skewer 5 minutes before the calculated time. Oven temperatures stay the same; only the time and quantities adjust."
      ),
      {
        heading: "Common Round Cake Tin Conversions",
        table: {
          headers: ["From", "To", "Multiplier", "Notes"],
          rows: [
            ["15cm (6\")", "20cm (8\")", "1.78", "Roughly double quantities"],
            ["18cm (7\")", "20cm (8\")", "1.23", "Add 23% to ingredients"],
            ["20cm (8\")", "23cm (9\")", "1.32", "Add a third"],
            ["20cm (8\")", "25cm (10\")", "1.56", "Half again as much"],
            ["23cm (9\")", "25cm (10\")", "1.18", "Add 18%"],
            ["20cm round", "20cm square", "1.27", "Square holds more"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Egg Counts Get Awkward",
        "Multiplying flour by 1.32 is fine. Multiplying eggs by 1.32 gives you 5.28 eggs, which is a problem because eggs come whole. The calculator rounds to the nearest whole number where the decimal is below 0.25 or above 0.75 and gives a range otherwise (4 to 5 eggs at 4.5). If you are scaling up, round up; if scaling down, round down and add a splash of milk if the batter looks dry. For tiered wedding cakes where each layer is a different size, see the [recipe scaler](/recipe-scaler) which handles serving counts directly rather than tin areas."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I use a smaller tin if I reduce the recipe?",
        "Yes, this is exactly what the calculator handles. Scaling down is generally safer than scaling up because there is less risk of the batter being too deep to cook through. If your scaled-down quantities give you awkward fractions of eggs, halve the recipe and bake the leftover batter as cupcakes alongside."
      ),
      createFAQ(
        "Do I adjust oven temperature when changing tin size?",
        "No, only the cooking time and ingredient quantities change. The oven temperature stays the same because that is what determines how the cake sets and browns. The exception is very deep tins (3 inches and above), which benefit from a 10 to 15°C drop in temperature so the outside does not burn before the centre cooks through."
      ),
      createFAQ(
        "How full should I fill a cake tin?",
        "Two-thirds full is the standard target for a sponge cake. Fill it any higher and the batter spills over the sides during baking; any lower and the rise is flat and the cake looks underwhelming. The calculator's scaled quantities assume a two-thirds fill at standard 5cm (2 inch) tin depth."
      ),
      createFAQ(
        "What about loaf tins and bundt tins?",
        "Loaf tins are roughly equivalent to rectangular tins, calculate the rectangular area and use the multiplier directly. Bundt and ring tins are trickier because the central hole reduces the volume; as a rough rule, a 25cm (10 inch) bundt holds about the same batter as a 23cm (9 inch) round cake tin."
      ),
    ],
    relatedTools: [
      { slug: "recipe-scaler", label: "Recipe Scaler" },
      { slug: "baking-substitution-finder", label: "Baking Substitution Finder" },
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
    ],
  },

  "cocktail-finder": {
    sections: [
      createAnswerFirstSection(
        "Find a Drink Using What You Already Have",
        "It is Friday night, friends are coming over in an hour, and the drinks cabinet has gin, tonic, a half lemon and some triple sec from last Christmas. You do not need a 600-page bartending manual; you need a list of drinks you can actually make right now. This finder searches a database of thousands of cocktail recipes by ingredient, returns every drink that uses what you typed, and shows the full method when you tap one. Type 'gin' and you get gin and tonic, gimlet, Tom Collins, Negroni and 30+ others.",
        "The search runs against a single ingredient at a time (vodka, rum, lime juice, ginger beer) which is the most reliable way to find recipes when your kitchen is short of one or two specialist items. Once you pick a cocktail, the recipe page lists every ingredient with measurements, the right glass to use and the method written out in plain steps. No upselling, no premium gear required, no recipes that depend on three obscure liqueurs you have to order online."
      ),
      createAnswerFirstSection(
        "Substitutions That Actually Work Behind a Bar",
        "Most cocktails are more flexible than recipe purists admit. Triple sec, Cointreau and Grand Marnier are all orange-flavoured and interchange well in margaritas and Sidecars, though the higher quality ones taste smoother. Simple syrup is just sugar and water in equal weight; if you do not have any, dissolve 50g of sugar into 50ml of just-boiled water and you have made it. Lemon juice and lime juice are not perfectly interchangeable (limes are sharper, lemons are more rounded) but in a pinch most sour cocktails survive the swap.",
        "What does not swap well: real citrus juice for the bottled stuff (the bottled version is usually too sharp and oddly metallic), and gin styles in stirred cocktails. A London dry like Beefeater behaves differently in a Negroni than a softer style like Hendrick's, which has cucumber and rose notes that fight the Campari. For more on building a drink from scratch by spirit and flavour, the [cocktail recipe generator](/cocktail-recipe-generator) builds drinks from your preferences rather than searching by ingredient."
      ),
    ],
    faqs: [
      createFAQ(
        "What cocktails can I make with just gin and tonic?",
        "Beyond the obvious gin and tonic, you can make a French 75 (gin, lemon juice, sugar, top with prosecco rather than tonic), a Tom Collins (gin, lemon, sugar, soda water), or a gimlet (gin and lime cordial). If you have any bitters and a bit of sugar, an Aviation or a basic gin sour also work."
      ),
      createFAQ(
        "Do I need fancy bar equipment?",
        "Almost never for home cocktails. A jigger (or a tablespoon, since 15ml is one tablespoon), a strainer (or a fork held over the glass), and a glass to mix in cover 90% of recipes. A cocktail shaker is useful for anything containing citrus or egg white but a clean jam jar with a tight lid does the same job for emergency Friday-night drinks."
      ),
      createFAQ(
        "What is the difference between shaken and stirred?",
        "Shake any cocktail that contains juice, dairy, egg or syrup; the shaking emulsifies the ingredients and chills the drink fast. Stir cocktails that are all spirits (Negroni, Manhattan, martini) for around 30 seconds in a mixing glass with ice. Shaking spirit-only drinks makes them cloudy and over-dilutes them. Stirring juice-based drinks fails to combine the ingredients properly."
      ),
      createFAQ(
        "Can I swap white rum for dark rum?",
        "In most tropical cocktails, no. White rum is light and crisp (mojito, daiquiri); dark rum is heavier and molasses-forward (rum punch, dark and stormy). Aged or gold rum sits in the middle and works in either direction at a push. Spiced rum is a separate category; it has its own flavour profile and tastes wrong in most classic recipes."
      ),
    ],
    relatedTools: [
      { slug: "cocktail-recipe-generator", label: "Cocktail Recipe Generator" },
      { slug: "tip-calculator", label: "Tip Calculator" },
      { slug: "bbq-planner", label: "BBQ Planner" },
    ],
  },

  "coffee-ratio-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Right Coffee-to-Water Ratio for Each Method",
        "There is no single correct coffee ratio. Pour over uses 1:16 (1g coffee to 16g water). French press is closer to 1:15 (slightly stronger because of the longer steep). AeroPress sits at 1:14, drip filter at 1:16, espresso at 1:2, cold brew at 1:4 (because it is a concentrate diluted before drinking). The ratio is what most home brewers get wrong, and it is the single biggest factor in whether your coffee tastes thin and watery or rich and balanced.",
        "Pick your brewing method, choose lighter or stronger if you want to push the ratio either way (this multiplies water by 1.2 or by 0.85 respectively), then enter either coffee weight or water weight. The other value calculates instantly. Hit the switch button to flip which side you control. Default of 20g coffee gives you 320g of water for pour over, which is roughly a 12oz cup."
      ),
      createAnswerFirstSection(
        "Why Brewing by Volume Goes Wrong",
        "Scoop measurements are a problem because coffee bean volume changes with bean density and grind size. A scoop of light-roasted Ethiopian beans weighs less than a scoop of dark Italian beans because the roast has driven off water. A scoop of fine espresso grind packs heavier than the same scoop of coarse French press grind. The ratio is by weight in grams, not by volume in scoops, and a £10 kitchen scale that reads to 1g is the only equipment upgrade that consistently improves home coffee.",
        "Water temperature matters almost as much as ratio. The standard range is 90 to 96°C, which is a few degrees off boiling. Espresso uses the lower end (88-92°C). AeroPress works at 80-90°C, which is unusual but right. Boiling water (100°C) over coffee scalds the grounds and pulls bitter compounds; lukewarm water under-extracts. If you do not have a thermometer, boil the kettle and wait 30 to 45 seconds before pouring. For larger batches, the [recipe scaler](/recipe-scaler) handles ratio scaling for any liquid recipe."
      ),
      {
        heading: "Standard Ratios by Brewing Method",
        table: {
          headers: ["Method", "Ratio", "Coffee for 1 cup", "Water"],
          rows: [
            ["Pour over (V60/Chemex)", "1:16", "20g", "320ml"],
            ["French press", "1:15", "20g", "300ml"],
            ["AeroPress", "1:14", "16g", "224ml"],
            ["Drip/filter", "1:16", "20g", "320ml"],
            ["Espresso (single shot)", "1:2", "9g", "18ml"],
            ["Moka pot", "1:7", "18g", "125ml"],
            ["Cold brew (concentrate)", "1:4", "100g", "400ml"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How much coffee per cup of water?",
        "For most filter and pour over methods, 1 gram of coffee per 16 grams of water gives a balanced cup. A standard 240ml mug needs 15g of coffee. A larger 300ml mug needs around 19g. Adjust up to 1:14 if you prefer a stronger cup or down to 1:18 for a lighter brew."
      ),
      createFAQ(
        "What ratio is best for cold brew?",
        "For cold brew concentrate that you dilute before drinking, use 1:4 (100g coffee to 400g water) and steep for 12 to 24 hours in the fridge. Dilute 1:1 with water or milk to drink. For ready-to-drink cold brew, use 1:8 to 1:10 and skip the dilution step."
      ),
      createFAQ(
        "Why does my coffee taste bitter?",
        "Three usual culprits: the grind is too fine for the brewing method (fine grind in a French press over-extracts), the water is too hot (above 96°C), or the brew time is too long. Bitter coffee is over-extracted coffee. Coarsen the grind, drop the temperature 5°C, or shorten the brew by 30 seconds and try again."
      ),
      createFAQ(
        "Can I use this calculator for tea?",
        "Not really. Tea is brewed by leaf weight per cup of water but the ratios are wildly different (1g of tea to 100ml of water for most loose-leaf), and steep time and temperature matter more than precise ratios. For tea, follow the packet instructions and adjust to taste."
      ),
    ],
    relatedTools: [
      { slug: "recipe-scaler", label: "Recipe Scaler" },
      { slug: "cups-to-ml", label: "Cups to ml Converter" },
      { slug: "kitchen-unit-converter", label: "Kitchen Unit Converter" },
    ],
  },

  "cooking-time-calculator": {
    sections: [
      createAnswerFirstSection(
        "Roasting Times Built Around When You Want to Eat",
        "Working out roast timings backwards from when you want to serve dinner is the actual cook's problem. This calculator takes the meat type, weight and your target serve time, then tells you exactly when to put it in the oven, when to take it out, and how long to rest it. A 1.5kg whole chicken at 200°C needs around 70 minutes (20 minutes per kilo plus 20 minutes), then 14 minutes resting. To serve at 7pm, it goes in at 5:36pm. The maths is done; the timeline is laid out.",
        "The tool covers chicken, turkey, beef, lamb (leg and shoulder), pork (roast and belly), gammon and duck, with doneness settings (rare, medium-rare, medium, well-done) for the cuts that take it. Each meat has its own per-kilo formula, so 1kg of beef does not get the same cooking time as 1kg of lamb. Resting time defaults to 20% of the cooking time, with a 10 minute minimum, which is what professional kitchens use to let juices redistribute through the meat."
      ),
      createAnswerFirstSection(
        "Why Resting is Non-Negotiable",
        "Cut into a roast straight out of the oven and the juices spill onto the board. Wait 15 to 20 minutes covered loosely with foil and the same juices stay in the meat. The protein fibres relax, the temperature evens out from edge to centre, and the slices come out moist instead of leaking. Skipping the rest is the most common mistake home cooks make with a roast. The calculator builds it into the timeline so you do not forget.",
        "Internal temperature is the only reliable test for doneness. A meat thermometer (£8 to £15) gets pushed into the thickest part away from bone. Chicken and turkey hit 75°C minimum (food safety, non-negotiable). Beef ranges from 50°C rare to 70°C well done. Lamb sits between 55°C pink and 72°C well done. Pork roasts to 65°C, gammon to 70°C. Cooking times in this calculator are estimates; the thermometer is the truth. For the rare and medium-rare scenarios where temperature precision matters most, the [meat cooking calculator](/meat-cooking-calculator) gives a fuller breakdown with cut-by-cut detail."
      ),
    ],
    faqs: [
      createFAQ(
        "How long do I cook a 1.5kg chicken?",
        "A 1.5kg whole chicken takes around 70 minutes at 200°C (180°C fan, gas mark 6). The calculation is 20 minutes per kilo plus 20 minutes extra. Rest for 15 to 20 minutes before carving. Internal temperature in the thickest part of the thigh should read 75°C minimum."
      ),
      createFAQ(
        "What temperature should I cook a beef roast at?",
        "200°C (180°C fan, gas mark 6) is the standard for beef roasting joints. For a fan oven, drop 20°C. The cooking time depends on weight and how done you want it: 20 minutes per kilo for rare, 25 for medium, 30 for well done, plus 20 minutes total at the start. Use a meat thermometer for accuracy: 50°C rare, 60°C medium, 70°C well done."
      ),
      createFAQ(
        "Why does my oven cook differently to the recipe?",
        "Most domestic ovens are 10 to 20°C off their displayed temperature, and fan ovens are stronger than conventional. The calculator uses standard temperatures, but if you know your oven runs hot or cold, adjust by the same amount you usually do. A cheap oven thermometer (£5) will tell you for sure. Always check meat with a probe thermometer rather than trusting the timer."
      ),
      createFAQ(
        "How long should meat rest after cooking?",
        "Roughly 15 to 20 minutes for a roasting joint, 5 to 10 minutes for chops and steaks, 30 minutes for a turkey. Cover loosely with foil (tightly trapped steam softens the skin or crackling). The internal temperature continues to rise by 3 to 5°C during resting, which is why most cooks take meat out slightly before the target temperature."
      ),
    ],
    relatedTools: [
      { slug: "meat-cooking-calculator", label: "Meat Cooking Calculator" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
      { slug: "cooking-timer", label: "Cooking Timer" },
    ],
  },

  "cooking-timer": {
    sections: [
      createAnswerFirstSection(
        "Why a Kitchen Timer Beats Your Phone",
        "You are roasting potatoes, simmering peas, boiling pasta and basting a chicken; that is four parallel timers running, and your phone gives you one. This timer keeps multiple labelled countdowns going at once. Type 'pasta', set 9 minutes, hit add. Type 'broccoli', set 5 minutes, hit add. Each timer runs independently with its own start, pause and reset, and an audible alert when it hits zero. No swiping between phone screens with floury hands, no accidentally deleting the wrong timer mid-stir.",
        "Labelling matters more than people expect. A naked countdown of 6:42 means nothing once you have three of them; 'rice 6:42' is instantly readable. The label appears next to the time so a quick glance from across the kitchen confirms which thing is about to need attention. The timer page works in any browser tab and persists while open."
      ),
      createAnswerFirstSection(
        "When You Need More Than One Timer",
        "Sunday lunch is the obvious case: roast goes in first, potatoes 45 minutes later, vegetables for the last 10 minutes, gravy in the final 5. That is four overlapping timers and a real cognitive load to track in your head. A weeknight pasta with a sauce on the hob is two timers (one for the pasta water, one for the simmer). A baking session with cupcakes in the oven and icing setting on the counter is two more. Once you have got used to running parallel timers the old single-countdown approach feels claustrophobic.",
        "Keep the browser tab open while cooking; if you close it, the timers reset because nothing is saved server-side (a deliberate choice, this tool runs entirely in your browser). For longer roasts where exact timing matters, the [cooking time calculator](/cooking-time-calculator) builds a backwards-from-serve-time schedule that you can then plug into individual timers here."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I run multiple timers at the same time?",
        "Yes, that is the main reason this tool exists. Add as many as you need (pasta, rice, vegetables, oven check), each with its own label and duration. They all count down independently and beep when they finish."
      ),
      createFAQ(
        "Will the timer work if I close the page?",
        "No. The timers run in the browser tab; closing the page or putting the device into deep sleep stops them. For long unattended cooks (overnight slow cook, 4-hour braise) use a physical timer or a smart speaker alarm as backup."
      ),
      createFAQ(
        "Is there an audible alert?",
        "Yes, each timer plays a sound when it hits zero, as long as your device volume is up and the browser tab is allowed to play audio. Some browsers block sound until you have interacted with the page, so the first time you load it, hit Start on a quick test timer to enable audio."
      ),
      createFAQ(
        "What is a good default time for boiling eggs?",
        "Soft-boiled eggs from cold water: 4 to 5 minutes once boiling. Medium: 6 to 7 minutes. Hard-boiled: 9 to 10 minutes. Drop those in here as labelled timers and you will hit the same result every time. For more precise egg cooking with adjustments for size and temperature, the [egg timer](/egg-timer) handles the calculation."
      ),
    ],
    relatedTools: [
      { slug: "egg-timer", label: "Egg Timer" },
      { slug: "meat-cooking-calculator", label: "Meat Cooking Calculator" },
      { slug: "cooking-time-calculator", label: "Cooking Time Calculator" },
    ],
  },

  "grams-to-cups": {
    sections: [
      createAnswerFirstSection(
        "Convert Grams to Cups for Real Baking Ingredients",
        "British recipes give weights, American recipes give cups, and somewhere in the middle you have to convert. This converter handles 15 common baking ingredients with their actual densities: 1 cup of plain flour is 125g, 1 cup of granulated sugar is 200g, 1 cup of brown sugar packed is 220g, 1 cup of butter is 227g, 1 cup of honey is 340g. Pick the ingredient, type the grams, and get cups expressed both as a tidy fraction (¾, 1 ½) and an exact decimal.",
        "The fraction display matters for practical baking. A US cup measure is marked at quarters and thirds; reading 'three quarters of a cup' off the converter is more useful than reading '0.83 cups' and trying to eyeball it. The decimal is shown underneath for when you need precision (small quantities of cocoa, baking powder)."
      ),
      createAnswerFirstSection(
        "Why the Same 100g Gives Different Cup Counts",
        "100g of flour is 0.8 cups. 100g of sugar is 0.5 cups. 100g of honey is 0.29 cups. The reason is density: flour is light and fluffy, sugar is denser, honey is denser still. A cup is 240ml of volume, so heavier ingredients fit more grams into the same cup. This is exactly why baking by weight is more accurate than baking by cups; you remove the variable entirely.",
        "If you are converting because the recipe is American and your scales are buried, use the converter and bake without worrying. If you are converting because you genuinely prefer cup measures, fine. If you are converting because a fussy bake (macarons, choux, sourdough) requires precision, weigh it. The [cups to grams converter](/cups-to-grams) is the reverse direction for when an American recipe gives cups and you want to weigh."
      ),
      {
        heading: "Common Grams to Cups Conversions",
        table: {
          headers: ["Grams", "Plain flour", "Sugar", "Butter", "Honey"],
          rows: [
            ["50g", "⅖", "¼", "¼", "⅛"],
            ["100g", "⅘", "½", "½", "⅓"],
            ["150g", "1 ¼", "¾", "⅔", "½"],
            ["200g", "1 ⅗", "1", "⅞", "⅔"],
            ["250g", "2", "1 ¼", "1 ⅛", "¾"],
            ["500g", "4", "2 ½", "2 ¼", "1 ½"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many cups is 200g of flour?",
        "200g of plain flour is approximately 1 ⅗ cups, or 1.6 cups. Bread flour is slightly denser at around 1 ½ cups for 200g. Cake flour is lighter at around 1 ¾ cups. Always spoon flour into the cup loosely and level off; do not scoop or pack it down."
      ),
      createFAQ(
        "How many cups is 250g of butter?",
        "250g of butter is approximately 1 ⅛ cups, or 2 sticks plus 1 ½ tablespoons. The standard UK butter block is 250g, and the standard US stick is 113g (¼ pound), so a UK block is roughly 2 ¼ sticks. For recipes that call for 1 cup of butter, use 227g."
      ),
      createFAQ(
        "Are cups the same in the UK and US?",
        "No. A US cup is 240ml. A UK cup (rare in modern recipes) was 284ml. Australia and Canada use 250ml. The vast majority of online recipes that use cups are American, so this converter assumes US cup conventions. For old British cookery books that use cup measures, the values will be roughly 18% under what the recipe expects."
      ),
      createFAQ(
        "Why does the converter give fractions?",
        "Because measuring cups are marked in fractions. ¾ cup is a real measurement on a real cup; 0.75 cups is a number you have to translate. The fraction shown is the closest standard fraction (eighths, quarters, thirds, halves) to the actual decimal, which is shown underneath for reference."
      ),
    ],
    relatedTools: [
      { slug: "cups-to-grams", label: "Cups to Grams Converter" },
      { slug: "cups-to-ml", label: "Cups to ml Converter" },
      { slug: "ml-to-cups", label: "ml to Cups Converter" },
    ],
  },

  "make-or-buy-calculator": {
    sections: [
      createAnswerFirstSection(
        "Is It Actually Cheaper to Make It Yourself?",
        "A flat white from the coffee shop is £3.50. The ingredients (coffee beans and milk) cost about 50p per cup at home. That is a saving of £3.00 per drink. Make one a day, five days a week, fifty-two weeks a year, and you save £780. But you also spend 5 minutes making each one, which adds up to 21.7 hours per year, so the effective hourly rate of your DIY effort is £36 per hour. That is a worthwhile use of time. This calculator runs that maths for any item you make at home rather than buy.",
        "It is set up for coffee, lunch, bread, cakes, pasta, smoothies and granola by default, with a custom option for anything else. Punch in your homemade cost per serving, the shop price, the time it takes you to make, and how often you eat or drink it per week. Out comes annual savings, monthly savings, the effective hourly rate of your time, and a verdict on whether the maths is worth the bother."
      ),
      createAnswerFirstSection(
        "When the Calculator Says Don't Bother",
        "If your effective hourly rate from making something at home falls below £10 an hour, the tool flags it as a close call. A loaf of supermarket bread costs £1.20; making it at home costs around 80p in ingredients but takes 30 minutes of active time over 4 hours of rising. That works out at roughly 80p saved per loaf, which at one loaf a week is £41.60 a year, but the effective hourly rate is only around £1.60 per hour. You make bread because you enjoy it, not because the maths demands it.",
        "Items where the maths usually wins big: coffee (massive markup at cafes), packed lunches versus shop-bought sandwiches (£3 to £5 saved per meal), smoothies (£4 to £6 saved per drink), and pasta sauce in batch (huge markup on jarred sauce). Items where it usually loses: bread, dried pasta, cheap supermarket biscuits. The calculator does not factor in quality differences (homemade pasta is often noticeably better than shop-bought, even if the maths is even). For tracking the actual ingredient cost per serving on more complex recipes, the [recipe cost calculator](/recipe-cost-calculator) breaks it down line by line."
      ),
    ],
    faqs: [
      createFAQ(
        "How much can I save by making coffee at home?",
        "If you currently buy a £3 takeaway coffee five times a week and make it at home for around 50p, you save £650 a year. That assumes you actually swap, not 'add the homemade one in addition to the bought one', which is a different and worse trap."
      ),
      createFAQ(
        "What counts as the cost to make per serving?",
        "Just the ingredients. Cost up the flour, sugar, milk, coffee beans (whatever the recipe uses), divide by the number of servings the recipe makes, and use that figure. Do not include energy costs (negligible per serving), washing up time (it would have happened anyway) or your time (the tool calculates the value of your time separately as the hourly rate output)."
      ),
      createFAQ(
        "Should I include my time as a cost?",
        "The calculator handles this implicitly. It works out the total time you spend per year on making the thing, then divides the annual savings by those hours to give an effective hourly rate. If that rate is above £10/hr the tool says 'worth making'; below £10/hr it flags as a close call. £10/hr is a deliberately low bar (below UK minimum wage) because most homemade options have other benefits (quality, fun, control) that make the maths only part of the picture."
      ),
      createFAQ(
        "Does this work for batch cooking?",
        "Yes, but use per-serving numbers. If you make 10 portions of pasta sauce in 30 minutes, enter 3 minutes as the time per serving, divide your total ingredient cost by 10 and put that in as the homemade cost. The calculator then assumes the time scales linearly, which is conservative; in practice batch cooking is even more efficient because the prep and clean-up overhead is shared across more portions."
      ),
    ],
    relatedTools: [
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
      { slug: "cake-pricing-calculator", label: "Cake Pricing Calculator" },
      { slug: "tip-calculator", label: "Tip Calculator" },
    ],
  },

  "meat-cooking-calculator": {
    sections: [
      createAnswerFirstSection(
        "Times and Temperatures by Cut, Not Just by Meat",
        "A beef brisket and a beef steak are both beef, but they cook nothing alike. This calculator splits each meat by cut: chicken (whole, breast, thighs, drumsticks, wings), beef (rare/medium/well roast, steak, mince), pork (roast, chops, belly, tenderloin, sausages), lamb (leg in three doneness levels, shoulder, chops, rack), and turkey (small whole, large whole, breast joint, crown). Each cut has its own oven temperature, internal temperature, base time, per-kilo time and rest time, drawn from professional roasting guides rather than averaged into a single rule.",
        "A 1.5kg chicken roasts at 190°C for around 87 minutes (20 minute base plus 45 per kilo) and rests for 15. A 2kg lamb leg cooked medium goes in at 220°C for 20 minutes to sear, drops to 180°C for the remaining time, and rests 20 minutes. The tool calculates all of this from weight, then shows the oven temp in °C, °F and gas mark, the internal target temperature (the only reliable doneness check), and a quick reference table of every cut for that meat alongside."
      ),
      createAnswerFirstSection(
        "The Temperatures That Are Actually Non-Negotiable",
        "Chicken, turkey and duck must reach 75°C internal in the thickest part. Below that there is salmonella risk and the difference between 70°C and 75°C is what stops you spending the next day in the bathroom. Pork roasts to 65°C; the modern advice is no longer 'pork must be cooked grey', because the trichinella parasite that drove old guidelines is essentially eradicated in commercial UK pork. Beef and lamb are personal preference: rare 50-55°C, medium 60°C, well done 70°C+.",
        "A meat thermometer is the single most useful kitchen gadget for anyone who cooks roasts; cheap probe thermometers are £8, leave-in oven thermometers with a dial readout £15 to £20. Without one, you are guessing, and the per-kilo formulas are estimates because oven calibration, joint shape and starting temperature all affect actual cook time. Take the meat out of the fridge 30 to 60 minutes before cooking so it starts at room temperature; an ice-cold joint hitting a hot oven cooks unevenly. For a serve-time-driven schedule that builds a backwards timeline, the [cooking time calculator](/cooking-time-calculator) handles the same data with start and finish times."
      ),
      {
        heading: "Internal Temperature Guide",
        table: {
          headers: ["Meat", "Doneness", "Internal Temp", "Notes"],
          rows: [
            ["Chicken / Turkey", "Cooked through", "75°C", "Non-negotiable, food safety"],
            ["Beef", "Rare", "50-52°C", "Cool red centre"],
            ["Beef", "Medium-rare", "55°C", "Warm pink centre"],
            ["Beef", "Medium", "60°C", "Pink centre, browned edges"],
            ["Beef", "Well done", "70°C+", "No pink"],
            ["Pork (modern)", "Slightly pink", "63-65°C", "Safe and tender"],
            ["Lamb", "Pink", "55-60°C", "Most popular"],
            ["Duck breast", "Medium", "60-65°C", "Pink, render fat first"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What oven temperature for roasting beef?",
        "For a roasting joint, start at 220°C for the first 15 minutes to sear, then reduce to 170°C for the remainder. This gives a browned outside and an evenly cooked interior. Time depends on weight and target doneness: 20 minutes per kilo for rare, 25 for medium, 30 for well done, plus the 15 minute initial sear."
      ),
      createFAQ(
        "How do I cook a perfect medium-rare steak?",
        "Take it out of the fridge 30 minutes early. Season generously. Get a heavy pan (cast iron ideally) very hot, add a thin film of high-smoke-point oil, sear 2 to 3 minutes per side for a 2cm thick steak. Internal temperature should hit 55°C. Rest on a warm plate for 5 minutes; the temperature climbs to 60°C as it rests. Slice against the grain."
      ),
      createFAQ(
        "Why does my chicken always come out dry?",
        "Three usual causes: overcooked (above 80°C internal in the breast), no resting (juices spill out when you carve), or no fat covering (a dry chicken needs basting or brining). Take the bird out at 75°C, rest 15 to 20 minutes covered loosely with foil, and carve breast-side last so it does not sit exposed. Brining in salt water for an hour before roasting also helps significantly with retention."
      ),
      createFAQ(
        "Can I cook frozen meat without defrosting?",
        "Sausages and burgers, yes, with extra time. Whole joints and birds, no; the outside cooks long before the inside thaws, leaving a raw centre and dried-out edges. Always defrost roasts in the fridge overnight (24 hours per 2kg) before cooking. The cooking times in this calculator assume meat that has been brought to room temperature, not straight from the fridge or freezer."
      ),
    ],
    relatedTools: [
      { slug: "cooking-time-calculator", label: "Cooking Time Calculator" },
      { slug: "cooking-timer", label: "Cooking Timer" },
      { slug: "bbq-planner", label: "BBQ Planner" },
    ],
  },

  "pizza-dough-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Calculate Dough Per Pizza",
        "A typical 12-inch pizza needs around 280g of dough at regular thickness. Scale up or down by size and crust style: a 10-inch comes in at 200g, a 14-inch at 380g. Thin crust uses 0.8x the standard weight, thick crust uses 1.3x. The calculator runs all three sizes against your selected number of pizzas (1 to 20) and outputs a baker's-percentage ingredient list using 65% hydration - the sweet spot for home oven Neapolitan-style pizza.",
        "Hydration is the ratio of water to flour by weight, the single most important number in dough making. At 60 to 65%, dough is firm and easy to handle - ideal for beginners and home ovens that top out around 250°C. Move to 70% and the crust gets airier but the dough sticks to everything. True Neapolitan dough at 80°C wood-fired runs at 60 to 62% hydration with Tipo 00 flour because the high heat finishes the bake before moisture can drag the crust down."
      ),
      createAnswerFirstSection(
        "Yeast, Salt and Why the Quantities Look Tiny",
        "Salt at 2% of flour weight (so 8g salt per 400g flour) is the universal pizza ratio. Less and the dough tastes flat; more and it inhibits yeast activity. Instant yeast at just 0.2% is intentionally low because pizza dough benefits from a slow rise (8 to 24 hours in the fridge), which builds flavour through enzymatic action. A faster two-hour same-day rise needs more yeast - around 0.5 to 1% of flour weight - but tastes notably blander.",
        "The 5% olive oil is optional and contentious. Traditional Neapolitan pizza is olive-oil-free in the dough; New York-style dough usually contains 2 to 5% to soften the crust and slow staling. Keep oil out of the dough if you're aiming for puffy, blistered Neapolitan-style; include it if you want a chewier, more elastic crust suitable for thicker toppings. For longer ferments and sourdough pizza, see the [Sourdough Calculator](/sourdough-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should I let pizza dough rise?",
        "A bulk rise of 1 to 2 hours at room temperature, then a 24 to 48 hour cold ferment in the fridge after balling, gives the deepest flavour and best browning. Short on time? A 2-hour bulk rise plus 30 minutes after balling will produce decent pizza but lacks the developed flavour. Plan dough the day before pizza night."
      ),
      createFAQ(
        "Tipo 00 flour or strong bread flour?",
        "Tipo 00 (a fine-milled Italian flour with around 11 to 12% protein) is ideal for high-temperature pizza ovens because it browns at 400 to 500°C without burning. In a home oven topping out at 250°C, strong UK bread flour (12 to 14% protein) actually performs nearly as well and is easier to find. The calculator's quantities work with either flour type."
      ),
      createFAQ(
        "Can I freeze pizza dough?",
        "Yes. Ball the dough after the bulk rise, oil lightly, and freeze in individual portions for up to three months. Defrost in the fridge overnight, then bring to room temperature for an hour before stretching. Freezing slightly reduces oven spring but the difference is small for home use."
      ),
      createFAQ(
        "Why is my pizza base soggy in the middle?",
        "Three causes: too much sauce or wet toppings, an oven that's too cool, or a stone that wasn't preheated. Crank the oven to its maximum (usually 250°C) for at least 45 minutes with a pizza stone or steel inside. Use minimal sauce - a thin layer is enough - and pat down wet mozzarella with kitchen paper before topping."
      ),
    ],
    relatedTools: [
      { slug: "sourdough-calculator", label: "Sourdough Calculator" },
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
    ],
  },

  "random-recipe-generator": {
    sections: [
      createAnswerFirstSection(
        "Beating the Weeknight Decision Fatigue",
        "Some nights you have ingredients, time and motivation - and absolutely no idea what to cook. The Random Recipe Generator pulls a complete recipe at random (or filtered to a specific category like Vegetarian, Seafood, Pasta or Dessert) from a curated international database, returning a full ingredient list with quantities, written method, photo and a YouTube link where available. One click, one decision, dinner sorted.",
        "Filtering by category helps when you have a constraint but no specific dish in mind. Picking \"Vegan\" returns a random plant-based recipe across cuisines. \"Breakfast\" works as a brunch idea generator on weekends. \"Dessert\" handles the \"I should make pudding\" moment two hours before guests arrive. For a structured weekly plan rather than dish-by-dish randomness, the [Meal Planner](/meal-planner) builds a full seven-day grid with shopping list."
      ),
      createAnswerFirstSection(
        "What Comes With Each Recipe",
        "Recipes pulled by the tool include the dish name, country of origin (Italian, Thai, British, Mexican, etc.), the meal category, full ingredient list with measurements ready for the supermarket, a step-by-step method, a thumbnail image of the finished dish, and where available a YouTube link to a video walkthrough. Hit \"Get another recipe\" to reroll if the suggestion doesn't appeal - there is no penalty for being picky.",
        "The generator skews international because the source database is global. You'll see Thai green curry, Japanese sushi, Moroccan tagines and Italian pasta alongside British roasts and American comfort food. If you're cooking on a budget and want to know exactly what each recipe will cost before committing, copy the ingredient list into the [Recipe Cost Calculator](/recipe-cost-calculator) which returns total recipe cost and cost per serving."
      ),
    ],
    faqs: [
      createFAQ(
        "Are the recipes any good?",
        "The generator pulls from TheMealDB, an open database of community-curated recipes. Quality varies - some are excellent, some need tweaking. Treat suggestions as inspiration rather than gospel: a Thai-style curry from the database is a fine starting point, but you may want to scale up the chilli or swap fish sauce for soy depending on personal taste."
      ),
      createFAQ(
        "Can I see only vegetarian recipes?",
        "Yes. The category dropdown filters to Seafood, Vegetarian, Vegan, Breakfast, Dessert or Pasta. Pick Vegetarian or Vegan to limit the results. Within that filter, the generator still picks randomly so you get variety - one click might return a stir-fry, the next a curry, the next a pasta dish."
      ),
      createFAQ(
        "Does it consider what I have in the fridge?",
        "Not directly. This tool generates ideas without any ingredient input. If you have specific items to use up, pull a recipe and see how close it is to what you have - most recipes have flexible substitutions. The [Substitute Ingredient Finder](/substitute-ingredient-finder) helps fill the gaps when you're missing one or two items from a recipe you've found."
      ),
      createFAQ(
        "Why does the same recipe sometimes appear twice?",
        "The database has a few thousand recipes and the random pick is genuinely random, so repeats happen by chance over a long enough run. Filtering to a smaller category (e.g. Seafood) increases the repeat rate because the pool is smaller. Treat repeats as a vote in favour of trying that one."
      ),
    ],
    relatedTools: [
      { slug: "meal-planner", label: "Meal Planner" },
      { slug: "substitute-ingredient-finder", label: "Substitute Ingredient Finder" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
    ],
  },

  "recipe-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Cost a Recipe Properly",
        "Recipe costing isn't \"add up the ingredient prices\". It's working out what fraction of each pack you actually use. A 1kg bag of flour costs £1.20 at most UK supermarkets, but a recipe needing 200g uses one fifth of that, so the flour line is 24p, not £1.20. The calculator handles this for ten common units (g, kg, ml, L, tsp, tbsp, each, oz, lb, cup) by asking for the pack cost and pack size, then dividing through. Total recipe cost and cost per serving fall out automatically.",
        "Get the unit right and the maths works. Eggs are simple: 2 eggs from a £2.40 box of 6 is 80p. Butter at 100g from a £2.50 250g block is £1. Flour, sugar, oil and dairy are the big ones to get right because they appear in nearly every baked recipe. Specialty items (vanilla extract, almond essence, food colouring) often look expensive on the shelf but contribute pennies per recipe because you only use a teaspoon."
      ),
      createAnswerFirstSection(
        "Cost Per Serving and What You Do With It",
        "Cost per serving turns recipe costing into a real decision. A batch of 24 cookies that costs £2.85 to make is 12p per cookie - selling them at 50p each at a school bake sale is 38p profit each, or £9.12 across the batch. The same maths works in reverse for home cooking: a £8 pasta bake feeding 4 is £2 a serving, which is the threshold below which most homemade meals beat supermarket ready meals on price.",
        "Bakers running side businesses should always factor in time and overheads on top of ingredient cost. A rough rule: ingredient cost is typically 20 to 30% of the retail price for bakery items in the UK. So a cake with £6 of ingredients should retail at £20 to £30 to cover labour, packaging, energy and a profit margin. The [Cake Pricing Calculator](/cake-pricing-calculator) layers labour and overhead onto the ingredient base. For bake-sale fundraising see the [Bake Sale Calculator](/bake-sale-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I include the cost of olive oil for greasing the tin?",
        "For commercial use, yes - track every ingredient including the dab of oil and the pinch of salt. For home costing, no; the difference between a tracked and untracked greasing is around 1 to 2p per recipe. Round up your estimate by 5% if you want a margin of safety on the small bits."
      ),
      createFAQ(
        "How do I cost recipes when prices keep changing?",
        "Use the price you'd pay today, recalculate quarterly, and add a 10 to 15% buffer if you're setting menu prices that need to hold for months. Staple ingredients (flour, sugar, butter) have moved 20 to 40% in some 12-month windows since 2022, so pricing locked in for a year leaves no margin if costs jump."
      ),
      createFAQ(
        "What about recipes that use leftovers from another recipe?",
        "Cost the leftover-using recipe at the proportional cost of the original. If you used half the cooked chicken from a £6 roast, the chicken line in your second recipe is £3. This avoids \"free chicken\" pricing that hides true food cost from your weekly grocery total."
      ),
      createFAQ(
        "Can I save my recipes?",
        "Not in this version of the tool - the calculator is single-session. To track multiple recipes, copy the breakdown into a spreadsheet or take a screenshot. To scale a saved recipe up or down for different serving counts, the [Recipe Scaler](/recipe-scaler) handles the multiplication maths."
      ),
    ],
    relatedTools: [
      { slug: "cake-pricing-calculator", label: "Cake Pricing Calculator" },
      { slug: "bake-sale-calculator", label: "Bake Sale Calculator" },
      { slug: "recipe-scaler", label: "Recipe Scaler" },
    ],
  },

  "sourdough-calculator": {
    sections: [
      createAnswerFirstSection(
        "Sourdough by Baker's Percentage",
        "Sourdough recipes work in baker's percentages, where flour is always 100% and everything else is expressed as a percentage of the flour weight. Standard hydration runs 75 to 80% (so 750-800g water per 1kg flour), starter is typically 20% (200g starter per 1kg flour), and salt is locked at 2% (20g per 1kg flour). The calculator inverts this: tell it the target finished dough weight, and it back-calculates flour, water, starter and salt to hit that total.",
        "For a single 1kg loaf at 75% hydration with 20% starter, that means roughly 510g flour, 383g water, 102g starter and 10g salt. Increase hydration to 80% for a more open, airy crumb (the trade-off is a stickier, harder-to-shape dough). Drop to 70% for a tighter, more sandwich-bread crumb that's easier for first-time bakers to handle. The 75% default is the proven middle ground."
      ),
      createAnswerFirstSection(
        "Fermentation Time and Why Temperature Matters",
        "Bulk fermentation is where sourdough becomes sourdough - the wild yeast and bacteria in the starter ferment the flour, producing the characteristic flavour, structure and tang. Time depends almost entirely on dough temperature. The calculator estimates 18 hours at 15°C, 12 hours at 18 to 22°C, 8 hours at 22 to 25°C, and 6 hours above 25°C. These are bulk times to roughly 30 to 50% volume increase, not until \"doubled\" which is too long for most flour types.",
        "Don't trust the clock alone - read the dough. Signs of correctly bulked dough: 30 to 50% volume increase, jiggly when you shake the bowl, dome shape with visible bubbles on the surface, and a slight wine-like aroma. Under-fermented dough is dense and gummy. Over-fermented dough collapses, smells acetic (vinegar-like), and bakes flat. Day three of starter feeding produces the most active culture; for pizza dough or other lower-hydration breads see the [Pizza Dough Calculator](/pizza-dough-calculator)."
      ),
      {
        heading: "Hydration Effects on Final Loaf",
        table: {
          headers: ["Hydration", "Crumb Style", "Difficulty", "Best For"],
          rows: [
            ["65-70%", "Tight, sandwich", "Easy", "Beginners, sandwich loaves"],
            ["75% (default)", "Open, balanced", "Moderate", "Standard country loaf"],
            ["80%", "Very open", "Hard", "Boules with big holes"],
            ["85%+", "Custard-like", "Expert", "Ciabatta, focaccia"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How active does my starter need to be?",
        "Use a starter that has doubled in volume within 4 to 6 hours of feeding. The float test (drop a teaspoon in water, it should float) is a useful cross-check. A sluggish starter means a slower bulk and a flatter loaf. Feed at a 1:5:5 ratio (10g starter, 50g flour, 50g water) the night before a bake for a vigorous, gas-producing rise."
      ),
      createFAQ(
        "Why is my sourdough so dense?",
        "Almost always under-fermentation. Watch for the 30 to 50% volume increase rather than relying on the clock. Cold kitchens (under 18°C) extend bulk to 14 to 18 hours, far longer than most recipes suggest. Other causes: weak starter, salt added too early (it slows yeast), or shaping that knocked all the gas out before the final proof."
      ),
      createFAQ(
        "Can I use plain flour instead of strong bread flour?",
        "Plain flour produces a denser, less open loaf because of its lower protein (around 9 to 10%) compared to strong bread flour (12 to 14%). For sourdough, you want the higher protein for the gluten development that holds air through the long ferment. Use plain flour if it's all you have, but expect a tighter crumb."
      ),
      createFAQ(
        "How long does fresh sourdough keep?",
        "Three to four days at room temperature in a paper bag (cut-side down on a board), or freeze sliced for up to three months. Don't store in plastic - the crust softens. A stale day-three loaf revives with a 5-minute blast in a 200°C oven, restoring the crust crackle and warming the crumb."
      ),
    ],
    relatedTools: [
      { slug: "pizza-dough-calculator", label: "Pizza Dough Calculator" },
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
    ],
  },

  "substitute-ingredient-finder": {
    sections: [
      createAnswerFirstSection(
        "Why Most Substitutions Work in Specific Recipes Only",
        "Ingredient substitution isn't a free trade - every swap changes something. Replacing buttermilk with milk plus lemon juice (1 cup milk plus 1 tablespoon lemon juice, left to curdle for 5 minutes) works perfectly in pancakes and scones. The same swap in a buttermilk fried chicken brine works less well because you lose the slow tenderising effect of cultured dairy over hours. The finder lists ten common ingredients with their best substitutes plus the ratios.",
        "Baking is the unforgiving one. Cakes, biscuits and bread rely on chemistry: leavening agents, fats melting at specific temperatures, proteins setting at others. Swapping butter for olive oil at 1:1 in a Victoria sponge gives you something inedible. The correct ratio is 3/4 cup oil per 1 cup butter to compensate for the water content butter contains - and even then the texture is denser. Cooking is more forgiving because heat and seasoning cover most sins."
      ),
      createAnswerFirstSection(
        "Core Substitutions Worth Knowing",
        "A few swaps come up so often they're worth memorising. One egg becomes 1/4 cup unsweetened applesauce in baking (good for muffins and quickbreads, not custard). One tablespoon cornstarch becomes two tablespoons plain flour for thickening sauces, though the flour gives a slightly cloudier finish. Heavy cream swaps to coconut cream or evaporated milk depending on whether you want richness or a lighter result. Vanilla extract scales 1:1 with maple extract, or 1/2 teaspoon almond extract per 1 teaspoon vanilla.",
        "Test substitutions with small batches before committing to a dinner-party recipe. The finder gives you starting ratios; your specific oven, brand of flour and measuring style will tweak the final result. For unit conversions when the substitute uses different measurements (cups vs grams, teaspoons vs millilitres), use the [Baking Conversion Calculator](/baking-conversion-calculator) alongside this tool."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I always substitute butter with oil?",
        "Not 1:1. Butter contains around 80% fat and 20% water; oil is 100% fat. For baking, use 3/4 cup oil per 1 cup butter to compensate. Even then the texture changes: oil produces denser, moister cakes and crispier biscuits. For sautéing, swap freely (oil even has a higher smoke point). For pastry, butter is irreplaceable - the layered laminated structure depends on solid fat that melts at oven temperature."
      ),
      createFAQ(
        "What's the best vegan egg substitute?",
        "Depends on the role of the egg. Binding (meatballs, veggie burgers): a flax egg works well (1 tablespoon ground flax plus 3 tablespoons water, rested 5 minutes). Leavening (cakes, pancakes): commercial egg replacers like Bob's Red Mill or Crackd. Moisture (quickbreads, muffins): unsweetened applesauce at 1/4 cup per egg. None of these handle every role - meringue and custard genuinely need eggs."
      ),
      createFAQ(
        "Can I make my own self-raising flour?",
        "Yes. Add 2 teaspoons of baking powder per 150g of plain flour and sift twice to distribute evenly. Use immediately; mixed self-raising flour loses potency over months because the baking powder slowly absorbs ambient moisture. For commercial self-raising flour the ratio is similar - around 2.5g baking powder per 100g flour."
      ),
      createFAQ(
        "Does it matter which type of milk I substitute?",
        "Yes for baking, less so for cooking. Plant-based milks (almond, oat, soya) substitute milk in pancakes, sauces and most cakes at 1:1 with little detectable difference. They struggle in custards and ice creams that need dairy fat for body. Coconut milk has a stronger flavour that works in curries and tropical desserts but clashes in vanilla cakes. Match the fat content roughly: full-fat oat milk for whole milk, light almond milk for skimmed."
      ),
    ],
    relatedTools: [
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
      { slug: "freezer-storage-guide", label: "Freezer Storage Guide" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
    ],
  },

  "thanksgiving-dinner-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Big a Turkey for Your Guest Count",
        "The standard rule is 1.5 lbs of bone-in turkey per person, accounting for the bone weight and the inevitable seconds. For 8 guests that's a 12 lb bird; for 12 guests, 18 lbs; for 16 guests, 24 lbs (or two smaller turkeys, which actually cook better than one giant one). The tool runs from 4 to 30 guests and handles both stuffed and unstuffed cooking times - 15 minutes per pound at 325°F unstuffed, 20 minutes per pound stuffed.",
        "British hosts running US-style Thanksgiving for friends should size by the same logic, though UK turkeys often come slightly smaller. A typical UK supermarket turkey from Tesco or Sainsbury's covers 6 to 10 people at around 4 to 5kg (around 9 to 11 lbs); for larger parties, butcher-ordered birds or a crown plus thighs combination handles 12 plus more cleanly than a single giant bird that no oven fits."
      ),
      createAnswerFirstSection(
        "The Sides Maths Most Hosts Get Wrong",
        "Sides scale separately from the turkey. The proven per-person allocations: 0.5 lb mashed potatoes, 1/3 cup gravy, 3/4 cup stuffing, 1/4 cup cranberry sauce, two dinner rolls, one small sweet potato. Pumpkin pie comes in at one pie per eight people. For 12 guests that's 6 lbs of potatoes, 4 cups gravy, 9 cups stuffing, 3 cups cranberry sauce, 24 rolls (so 2 packages of 12), 12 sweet potatoes, and 2 pies. Doubling everything for 24 guests is the easy maths but the oven planning gets harder.",
        "Oven scheduling is the silent killer. A 16 lb turkey takes around 4 hours unstuffed, plus a 30-minute rest, blocking the main oven for the entire morning. Casseroles, sides and pies need the oven too, so plan an order: pies first thing or the night before, sweet potatoes early then held warm, stuffing in the oven once the turkey rests. Many hosts cook the turkey on a barbecue or smoker to free up oven space - especially in the UK where ovens are smaller than US ranges. Tip-calculate the night's restaurant alternative with the [US Tip Calculator](/us-tip-calculator) if cooking falls through."
      ),
      {
        heading: "Quick Reference: Turkey Sizes and Cook Times",
        table: {
          headers: ["Guests", "Turkey Size", "Unstuffed Time", "Stuffed Time"],
          rows: [
            ["4-6", "8-10 lbs", "2h 0m - 2h 30m", "2h 40m - 3h 20m"],
            ["8", "12 lbs", "3h 0m", "4h 0m"],
            ["12", "18 lbs", "4h 30m", "6h 0m"],
            ["16", "24 lbs", "6h 0m", "8h 0m"],
            ["20+", "Two birds", "Cook in tandem", "Cook in tandem"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How long does a turkey take to thaw?",
        "Allow 24 hours per 4 to 5 lbs of turkey in the fridge. A 16 lb bird needs 3 to 4 days; an 8 lb crown takes 1 to 2 days. Never thaw on the counter - bacteria multiply rapidly in the outer layers while the inside is still frozen. If you forgot to plan ahead, cold-water thawing (submerged in cold tap water, changed every 30 minutes) takes about 30 minutes per pound."
      ),
      createFAQ(
        "When is turkey actually done?",
        "Turkey is done when a thermometer in the thickest part of the thigh reads 165°F (74°C), not before. Time-based cooking is unreliable because oven temperature fluctuates and turkey weight estimates from the pop-up timer are notoriously off. A digital probe thermometer left in during cooking is the single best Thanksgiving investment, around £15 from supermarket cookware sections."
      ),
      createFAQ(
        "Should I cook the stuffing inside or outside the bird?",
        "Outside, in nearly all cases. Stuffing cooked inside the cavity has to reach 165°F to be safe, which usually means overcooking the breast. Cook the stuffing in a separate dish, basting it with a few ladles of pan juices in the last 30 minutes for the in-bird flavour without the food safety risk."
      ),
      createFAQ(
        "Can I make any sides ahead of time?",
        "Most. Cranberry sauce keeps for a week refrigerated and actually improves with time. Pies bake the day before. Stuffing prep (chopping vegetables, drying bread cubes) can be done two days ahead. Mashed potatoes are the trickiest; peel and chop them the day before, store under cold water, and boil the morning of. Avoid full pre-mashing - they go gluey when reheated."
      ),
      createFAQ(
        "Is Thanksgiving even a thing in the UK?",
        "Not officially, but it's increasingly common among British hosts wanting an excuse for an autumn feast or marking American family ties. UK supermarkets stock turkeys year-round (Tesco, Sainsbury's, Morrisons all do them), Ocado carries cranberry sauce and pumpkin puree, and most American expat staples are findable in larger Waitrose stores. Plan ahead - some specialty items run low by mid-November."
      ),
    ],
    relatedTools: [
      { slug: "us-tip-calculator", label: "US Tip Calculator" },
      { slug: "meal-planner", label: "Meal Planner" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
    ],
  },

  "meal-planner": {
    sections: [
      createAnswerFirstSection(
        "How a Weekly Meal Planner Saves Money and Time",
        "A household that meal-plans typically wastes 30% less food and spends 20 to 25% less on weekly groceries, according to WRAP's UK food-waste research. The planner gives you a 21-cell grid (7 days x 3 meals: breakfast, lunch, dinner) with a paired grocery list of 16 lines down the side. Fill in the meals you want, jot the ingredients on the right, and you have a shopping list that exactly matches the week's cooking - no impulse buys, no half-used cucumbers wilting by Friday.",
        "The grid is intentionally compact. A typical week needs about 12 to 18 grocery lines once you account for repeated ingredients (one onion can cover three dinners), so 16 default rows fit most households. Add more if you are catering for a family of five; the 'Add 5 rows' button extends the list as you go."
      ),
      createAnswerFirstSection(
        "Building a Week That Actually Works on a Tuesday Night",
        "The single biggest meal-planning failure is over-ambition. Monday is fine - you've had the weekend to prep, you still feel virtuous. By Tuesday you are tired, by Wednesday someone has a school play, and by Thursday the elaborate dinner you planned is a takeaway. Mix three categories: 1-2 'flagship' dinners (slow-cooked, mid-week-friendly), 2-3 'fast' dinners (under 30 minutes), and 1-2 'planned leftovers' nights where Tuesday's roast becomes Wednesday's wraps.",
        "The planner has a notes box at the bottom for shopping reminders ('big shop Saturday', 'fishmonger closed Mondays') and budget/spent fields so you can track whether the £80 weekly budget actually covered it. Combine this with the [Calories in Recipe](/calories-in-recipe) calculator to add a nutrition lens for anyone tracking macros, or the [BBQ Planner](/bbq-planner) for weekend cooking that doesn't fit a normal weekday slot."
      ),
      {
        heading: "Realistic Cook-Time Categories for Each Slot",
        table: {
          headers: ["Day", "Suggested Style", "Time Budget", "Examples"],
          rows: [
            ["Monday", "Make-ahead Sunday batch", "10 min reheat", "Bolognese from Sunday's batch, jacket potato"],
            ["Tuesday", "30-minute dinner", "30 min", "Pesto pasta, fish fingers + greens, stir-fry"],
            ["Wednesday", "Slow cooker / oven", "8 hr unattended", "Chilli, casserole, lasagne"],
            ["Thursday", "Quick & easy", "20 min", "Eggs & beans, omelette, simple curry"],
            ["Friday", "Fakeaway", "30 min", "Homemade pizza, fried rice, kebabs"],
            ["Saturday", "Flagship / dinner party", "1+ hr", "Roast, slow-cooked beef, pad thai"],
            ["Sunday", "Sunday roast / batch cook", "2-3 hr", "Roast chicken with leftovers planned in"],
          ],
        },
      },
      createAnswerFirstSection(
        "The Grocery List That Doesn't Forget the Onion",
        "The right way to use the grocery list is to fill it in as you fill in the meals, line by line. Plan tagliatelle bolognese for Tuesday? Add 'mince' and 'tinned tomatoes' to the grocery list immediately. Don't try to derive the list at the end of the week from your meal plan; the human brain is terrible at compiling 16 ingredients across 7 meals without skipping the staple you assumed was in the cupboard.",
        "Each grocery line has a checkbox so you can tick items off as you shop or as you add them to the trolley online. The premium PDF download is built like a fridge magnet: meal grid on the left, grocery list with checkboxes on the right, notes section at the bottom. Print it Sunday evening, stick it on the fridge, and the rest of the week runs itself. For prep-ahead recipes that turn into multiple meals, the [Recipe Cost Calculator](/recipe-cost-calculator) helps you see which ones are also the cheapest per portion."
      ),
    ],
    faqs: [
      createFAQ(
        "How many meals should I actually plan each week?",
        "Most UK households eat at home 5 nights out of 7. Plan all 7 dinners but mark 2 as 'flexible' or 'leftovers' - one of those will inevitably become a takeaway, the other an Uber Eats moment of weakness, and the rest will hold. Planning all 7 rigidly leads to wasted food when life intervenes; planning only 3 or 4 leads to mid-week scrambling around 5 pm."
      ),
      createFAQ(
        "Should I plan breakfasts and lunches too?",
        "Optional but helpful for school-age children's packed lunches and for anyone trying to control snacking. Most adults default to a small number of breakfasts (porridge, toast, eggs) on rotation, so the breakfast row repeats. Lunches get more interesting if you batch-cook a lunch-friendly soup or curry on Sunday evening to portion across the week."
      ),
      createFAQ(
        "What's the best way to handle dietary restrictions?",
        "Tag each meal with the most-restrictive eater's needs. If your household has one vegetarian and three omnivores, plan vegetarian-friendly meals for everyone twice a week (lentil curry, halloumi traybake, mushroom stroganoff) and have a side of meat available the other nights. The dietary filter at the top toggles 'all', 'vegetarian', 'vegan', 'gluten-free' to nudge meal suggestions when you're stuck for inspiration."
      ),
      createFAQ(
        "Can I save my plan and reuse it next week?",
        "Yes - the planner saves to your browser's localStorage automatically. Hit 'Clear' to start fresh on Sunday evening. The premium PDF export is the better long-term archive: download a copy each week and you build a personal recipe rotation over a couple of months. Most families have about 25 'staple' weeknight dinners they cycle through; the rest is variation."
      ),
      createFAQ(
        "How does this work alongside online food shopping?",
        "Beautifully. Tesco, Sainsbury's, Ocado and Morrisons all let you build a basket Sunday and book a Monday or Tuesday slot. Use the meal planner to draft the week, then add items from the grocery list to the basket as you go. The checkbox column ticks off items as you click 'add to basket', so by the time the basket is full, the list is fully ticked. Most weeks this takes about 25 minutes and saves £15 to £25 vs unplanned in-store shopping."
      ),
    ],
    relatedTools: [
      { slug: "calories-in-recipe", label: "Calories in Recipe" },
      { slug: "bbq-planner", label: "BBQ Planner" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
    ],
  },

  "recipe-unit-converter": {
    sections: [
      createAnswerFirstSection(
        "Why a Cup of Flour Doesn't Weigh the Same as a Cup of Sugar",
        "A US cup is 236.588ml. That volume holds 125g of all-purpose flour, 200g of granulated sugar, 220g of packed brown sugar, 227g of butter or 340g of honey. So if a recipe says \"1 cup\" the gram weight could be anywhere from 85g (cocoa powder) to 340g (honey) depending on what you're measuring. Volume conversions that ignore the ingredient are the single biggest reason home bakes go wrong.",
        "Take a basic Victoria sponge that calls for 2 cups of flour and 1 cup of sugar. Convert it as plain volume and you'd weigh out the same amount per cup. Convert it ingredient-aware and you get 250g flour and 200g sugar, the actual ratio the recipe was tested with. The ingredient-aware mode in this tool stores densities in grams per millilitre and applies them when you cross from volume to weight. For straight volume-to-volume (cups to ml) or weight-to-weight (oz to g) the ingredient doesn't matter, so the toggle stays off."
      ),
      createAnswerFirstSection(
        "Working an American Recipe in a UK Kitchen",
        "Most British kitchens have scales, jugs and tablespoons but no measuring cups. The fastest workflow: enter the cup amount, pick the ingredient, switch the output to grams. The tool returns the weight you can dial straight into your scales. For 1 cup of butter that's 227g; 1 cup of bread flour is 130g; 1 cup of cocoa is 85g. Round to the nearest 5g for everyday baking, the nearest gram for sourdough or macarons.",
        "American \"sticks\" of butter are a separate quirk. One stick is half a cup, so 113g. Most US recipes will say \"1 stick (½ cup) butter\" but cookbooks from the 1970s sometimes drop the cup figure and assume you know. If you're scaling the recipe at the same time, do the conversion first and the scaling second so you're working in clean rounded numbers. The [recipe scaler](/recipe-scaler) handles ratios once you've translated the units."
      ),
      createAnswerFirstSection(
        "When Volume Beats Weight (and Vice Versa)",
        "Weight wins for baking. Flour packs differently depending on humidity, how the bag was stored and how heavily you scoop, so two cooks can put the same \"1 cup\" of flour in a bowl and end up with 110g vs 145g - a 30% swing in a recipe where the protein-to-water ratio matters. Weighing eliminates that. For bread, sourdough, macarons, choux and laminated dough, weight is non-negotiable.",
        "Volume wins for liquids and small spice quantities. Measuring 2 tablespoons of olive oil on scales is more faff than the precision is worth, especially since liquid densities don't vary much. The professional rule of thumb: weigh anything dry, measure anything wet, and use a measuring spoon for anything under 15ml. The [grams to cups converter](/grams-to-cups) covers the reverse direction when a UK recipe lands in a US kitchen."
      ),
      createAnswerFirstSection(
        "Common American-to-Metric Conversions That Trip People Up",
        "American \"all-purpose flour\" is closest to UK plain flour, not self-raising. American \"powdered sugar\" is UK icing sugar. \"Heavy cream\" is double cream. \"Half-and-half\" is a 50/50 milk-and-cream blend that has no UK equivalent (use single cream or 50/50 milk-and-double-cream). \"Confectioners' sugar\", \"icing sugar\" and \"powdered sugar\" all convert at 120g per cup.",
        "Oven temperatures are a separate conversion: US Fahrenheit, UK Celsius, plus gas marks for older British recipes. 350°F is 180°C is gas mark 4, the workhorse temperature for most baking. The [oven temperature converter](/oven-temperature-converter) covers that crossover. For tin sizes, an American 9x13 inch baking pan is roughly a UK 23x33cm tin; the [cake tin converter](/cake-tin-converter) handles size adjustments when the pan you have isn't the pan the recipe wants."
      ),
    ],
    faqs: [
      createFAQ(
        "Is a US cup the same as a UK cup?",
        "No. A US cup is 236.588ml. The UK historically used the imperial cup (284ml) but it's almost extinct in modern recipes; if a UK recipe specifies cups it's usually borrowing the US 240ml convention. This tool defaults to the US cup. The 4ml difference rarely matters except in extreme baking, where weighing in grams is a better answer anyway."
      ),
      createFAQ(
        "Why does cup weight vary so much between flours?",
        "Different flours have different particle sizes and pack densities. All-purpose flour is 125g per cup, bread flour is 130g (denser due to higher protein), cake flour is closer to 115g (lighter and finer). Whole wheat is around 120g but varies more by brand. If a recipe doesn't specify which flour it tested with, assume all-purpose at 125g per cup."
      ),
      createFAQ(
        "How do I convert butter from cups to UK grams?",
        "1 cup of butter is 227g. Half a cup is 113g (one US stick). A quarter cup is 57g. Most UK butter blocks are 250g, so a recipe calling for 1 cup of butter is just over 90% of a standard block - either weigh out 227g or estimate \"a little under a full block\". For tablespoons: 1 tbsp butter is 14g."
      ),
      createFAQ(
        "What about ingredients not in the dropdown?",
        "Switch off ingredient-aware mode and the tool falls back to plain volume or weight conversions, which work for any liquid or any pre-weighed ingredient. For unusual dry ingredients (almond flour, coconut flour, vital wheat gluten), search the manufacturer's pack: most list the gram weight per cup or per tablespoon. Almond flour is around 100g per cup; coconut flour is around 115g."
      ),
      createFAQ(
        "Why does my brown sugar weigh more than white sugar per cup?",
        "Brown sugar gets packed when you measure it (the recipe instruction is usually \"1 cup, packed\"), so you're forcing more into the same volume. Granulated white sugar is 200g per cup loose. Brown sugar packed is 220g per cup. If a recipe says \"loosely packed\" treat it like white sugar; if it just says \"packed\" or doesn't specify, use 220g."
      ),
    ],
    relatedTools: [
      { slug: "grams-to-cups", label: "Grams to Cups" },
      { slug: "cups-to-grams", label: "Cups to Grams" },
      { slug: "recipe-scaler", label: "Recipe Scaler" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
    ],
  },

  "recipe-scaler": {
    sections: [
      createAnswerFirstSection(
        "How to Scale a Recipe Without It Going Wrong",
        "Type the recipe's original servings, type the number you actually want, and every ingredient quantity multiplies by the ratio. If a recipe serves 4 and you need 6, the scale factor is 1.5 and 200g of flour becomes 300g, 2 eggs becomes 3, 1 tsp salt becomes 1.5 tsp. The shortcuts for double (×2) and half (×0.5) cover the most common cases. The tool rounds to sensible numbers (no \"2.7 eggs\") and keeps fractions readable.",
        "The thing that breaks scaling is non-linear ingredients. Salt, leavening agents and strong spices don't scale linearly past about 1.5x. If you're tripling a cake recipe, don't triple the baking powder; use 2.25x. If you're halving a curry, halve the chilli but don't halve the spices below ¼ tsp - you lose the flavour profile entirely. Scaling works best between 0.5x and 2x; outside that range, treat it as guidance and taste as you go."
      ),
      createAnswerFirstSection(
        "Scaling Up for a Crowd",
        "Cooking for 30 from a recipe that serves 6? The scale factor is 5. Multiply each ingredient: 500g pasta becomes 2.5kg, 6 chicken breasts become 30, 200ml of stock becomes 1 litre. The tool handles the maths instantly so you can focus on whether your largest pot can hold 5x the original volume (it usually can't). Plan to cook in two or three batches once you cross 4x the original quantity.",
        "Cooking time does NOT scale linearly with quantity. A roast that serves 4 at 1 hour does not need 5 hours for a roast that serves 20. Use the [meat cooking calculator](/meat-cooking-calculator) for the actual cook time at the new weight. Likewise, a cake baked in a bigger tin needs a slightly lower oven temperature and longer time, not 5x the time at the original temperature. The [cake tin converter](/cake-tin-converter) handles tin-size adjustments."
      ),
      createAnswerFirstSection(
        "Scaling Down for a Solo Meal",
        "Cooking for 1 from a recipe that serves 4 means dividing by 4. Most home recipes scale down cleanly to a quarter for stews, traybakes and pasta sauces. Where it gets fiddly: 1 egg becomes ¼ of an egg, which isn't a thing. Either beat 1 egg, weigh it (about 50g whole, 30g white, 20g yolk) and use a quarter; freeze the rest in an ice cube tray; or accept the recipe doesn't halve below half a serving and cook the full batch.",
        "Baking is harder to scale down than cooking. A cake recipe scaled to a single ramekin won't cook the same as the full-tin version because the surface-to-volume ratio is different. For mug cakes and individual portions, search for a recipe written at that scale instead of dividing a bigger one. For savoury cooking, scaling down is forgiving: scaled-down stew, curry, soup or chilli all work fine, and leftovers freeze well for the next solo meal."
      ),
      createAnswerFirstSection(
        "What the Tool Does Not Scale",
        "Pan size, cook time, oven temperature, mixing time, kneading time, proofing time. Those are physical and biological constraints that don't move with ingredient quantity. A doubled bread recipe still proofs for the same time at the same temperature, but it'll fill a bigger tin. A halved cookie batch bakes in the same 12 minutes at 180°C, but you'll only have one tray instead of two.",
        "Salt, garlic, raw onion and chilli are also worth treating with caution. The first ¼ tsp of salt in a soup is doing most of the lifting; the next ¼ tsp is fine-tuning. If you're scaling a soup down by half, halve the salt; if you're scaling up by 4x, only triple it then taste. The [recipe unit converter](/recipe-unit-converter) handles the cross-system conversions when you're scaling an American recipe at the same time."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I scale a recipe by any factor?",
        "Mathematically yes, practically between 0.5x and 3x is the sweet spot. Below 0.5x and ingredients like ½ an egg or ¼ tsp baking powder become awkward. Above 3x and equipment becomes the constraint (no domestic mixer copes with 6kg of dough). For commercial-scale batches, professional bakers re-test recipes rather than scale them."
      ),
      createFAQ(
        "How do I scale eggs to a non-whole number?",
        "Crack the egg into a measuring cup or onto scales and use the proportion you need. A whole egg is roughly 50g (30g white + 20g yolk). For ½ an egg, beat one and use 25g; for 1.5 eggs use one whole plus 25g. Save the rest in a sealed container in the fridge for 24 hours, or freeze in an ice cube tray (one egg per cube, defrost when needed)."
      ),
      createFAQ(
        "Does this work for baking, where ratios matter?",
        "Yes for the ingredient maths, but you need to use weight (grams), not volume (cups), for any baking ratio more precise than \"a couple of biscuits\". This tool keeps the units you enter, so if you start with grams the scaled output is in grams. For ratio-driven baking like sourdough, see the [sourdough calculator](/sourdough-calculator) which works in baker's percentages instead."
      ),
      createFAQ(
        "Why does my doubled cake take longer than 2x to bake?",
        "Because heat penetrates from the outside in, and a bigger or thicker cake has more interior to heat. A doubled cake usually needs 1.3-1.5x the original time at the same temperature, sometimes with a 10°C drop to prevent the outside burning before the centre sets. The exact figure depends on tin shape and depth; check with a skewer at the original time, then every 5-10 minutes."
      ),
    ],
    relatedTools: [
      { slug: "recipe-unit-converter", label: "Recipe Unit Converter" },
      { slug: "cake-tin-converter", label: "Cake Tin Converter" },
      { slug: "meat-cooking-calculator", label: "Meat Cooking Calculator" },
    ],
  },

  "bbq-planner": {
    sections: [
      createAnswerFirstSection(
        "How Much Meat to Buy for a BBQ",
        "Standard portions per adult: 250g of burgers (one quarter-pounder), 300g of sausages (about 4 large), 300g of chicken (one breast or two thighs), 400g of ribs (a generous half-rack). Pick two protein options for any BBQ over 6 guests so vegetarians, kids and big eaters all have something. For 12 adults choosing burgers and sausages, that's 3kg of burgers and 3.6kg of sausages.",
        "Add 20% if your guests are mostly men aged 18-35, subtract 20% if there are young children or the BBQ runs only 90 minutes. Charcoal BBQs serve fewer guests per hour than gas; if the grill is small, plan a single protein and rotate it through. The two most common BBQ failures are running out of meat at the 90-minute mark and serving cold sausages because the grill couldn't keep up. Both are solved by buying more than you think and pre-cooking sausages in the oven for 15 minutes before they hit the grill."
      ),
      createAnswerFirstSection(
        "Sides, Drinks and the £4-per-head Rule",
        "Plan 150g of coleslaw and 1 corn cob per adult, plus a bowl of green salad and a bowl of potato salad to feed the full table. Bread rolls: one per burger plus one per sausage, plus 25% extra. Drinks: 2 cans of beer, 1 soft drink and 500ml of water per adult over a 3-hour BBQ. For families with kids, swap one beer for two soft drinks and add ice lollies for the school-age crowd.",
        "The default cost guide assumes UK supermarket prices for April 2026: burgers £4 per portion, sausages £3.50, chicken £5, ribs £12, corn £2 per cob, coleslaw £1.50 per portion. A 12-adult BBQ with burgers and sausages, corn and coleslaw lands around £125-£150 in food costs before drinks. Buying premium meat from a butcher roughly doubles that. The [recipe cost calculator](/recipe-cost-calculator) handles per-recipe budgeting if you're making the burgers from scratch."
      ),
      createAnswerFirstSection(
        "Cook Times and Food Safety",
        "Burgers (1.5cm thick): 4 minutes per side over direct medium heat, then check with a probe thermometer for 71°C internal. Sausages: 15-18 minutes turning every 4 minutes, internal 75°C. Chicken thighs: 25 minutes total, finishing skin-side down for crispness, internal 75°C. Ribs: pre-cook in the oven at 150°C for 90 minutes wrapped in foil with apple juice, then 10 minutes on the grill for the char.",
        "Never trust visual cues alone for chicken or pork. A digital probe thermometer costs £8 and saves you a stomach upset. Cross-contamination is the second biggest BBQ risk: keep raw meat tongs separate from cooked meat tongs, and never put cooked meat back on the plate the raw meat came off. The [meat cooking calculator](/meat-cooking-calculator) gives oven-and-grill cook times for any cut at any weight."
      ),
      createAnswerFirstSection(
        "What to Do When the Weather Turns",
        "British BBQs are weather-dependent. If you have a covered patio or gazebo, the BBQ can run in light rain (most BBQs cope; the cook just gets damp). Heavy rain or wind needs a Plan B: pre-cook everything in the oven (chicken at 200°C for 20 minutes, sausages at 200°C for 25 minutes, burgers at 200°C for 12 minutes) then finish under the grill or on a griddle pan for the char.",
        "Build the menu so it works indoors too. Coleslaw, potato salad, corn (boil instead of grill), bread rolls and burgers all work in any kitchen. Skip the ribs and the whole chicken if rain is forecast - they need real BBQ time. Have the [meal planner](/meal-planner) handy for the weekend either side; whatever's left over from a 12-person BBQ usually feeds the family for two more dinners."
      ),
    ],
    faqs: [
      createFAQ(
        "How much food per person at a BBQ?",
        "For adults, plan around 500-600g of mixed protein and sides per person if it's the main meal, or 300g if it's a snack-style afternoon BBQ. Kids under 10 eat about half an adult portion. The default in this tool errs slightly high so you have leftovers, which is what most hosts want."
      ),
      createFAQ(
        "What's the best protein mix for a mixed-age BBQ?",
        "Burgers and sausages are the workhorse pairing. Burgers please most adults and teens; sausages are kid-friendly. Add a chicken option if you have a few guests who don't eat red meat, and consider halloumi or a black bean burger for vegetarians. Skip ribs unless you've got the BBQ time and the audience for them."
      ),
      createFAQ(
        "How early should I start the BBQ?",
        "Light a charcoal BBQ 45 minutes before guests arrive. Coals need 30-40 minutes to be at proper cooking temperature (white-grey ash, no flames). Gas BBQs need 10-15 minutes preheat. Pre-cook ribs and slow-cook chicken in the oven before guests arrive so the grill is just for finishing and the quick-cook items."
      ),
      createFAQ(
        "How much beer per person at a BBQ?",
        "2-3 drinks per adult over the course of a 3-4 hour BBQ. Half should be alcoholic, half soft drinks and water. UK weather usually means 1 hot afternoon followed by a chilly evening, so include hot drinks if the BBQ runs past 7pm. Always have at least 500ml of plain water per adult; people drink less than they think on hot days."
      ),
      createFAQ(
        "What if I have a vegetarian guest?",
        "Halloumi (200g per veggie guest), portobello mushrooms (1 large each), corn cobs and a black bean or lentil burger (one each) covers most preferences. Cook them on a separate grill section that hasn't had raw meat on it, ideally with a fresh sheet of foil underneath. Kebabs (peppers, courgette, red onion, halloumi) cook in about 10 minutes and look good on the grill."
      ),
    ],
    relatedTools: [
      { slug: "meat-cooking-calculator", label: "Meat Cooking Calculator" },
      { slug: "meal-planner", label: "Meal Planner" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
      { slug: "calories-in-recipe", label: "Calories in Recipe" },
    ],
  },

  "calories-in-recipe": {
    sections: [
      createAnswerFirstSection(
        "How Many Calories a Recipe Actually Contains",
        "Add each ingredient with its weight and the tool sums total kcal then divides by the number of servings. The built-in food database covers 15 common ingredients with kcal-per-100g values: chicken breast is 165 kcal/100g, olive oil is 884, butter 717, rice 130, pasta 371, cheese 402, almonds 579. So a 4-serving recipe with 600g chicken (990 kcal), 30ml olive oil (265 kcal) and 200g rice (260 kcal) totals 1,515 kcal, or 379 kcal per serving.",
        "These numbers are estimates, accurate to within about 10% of true values. Real-world variation in cuts of meat, oil quality and how much fat trims off in cooking means a precise count to the calorie isn't possible at home. For ballpark calorie tracking - macros at the meal level, weekly intake budgeting - this is fine. For medical-grade tracking (gestational diabetes, post-bariatric surgery, competitive bodybuilding), use the USDA FoodData Central database directly with a kitchen scale."
      ),
      createAnswerFirstSection(
        "Why Per-Serving Beats Per-Recipe",
        "Knowing a lasagne contains 4,200 kcal isn't useful. Knowing each of 6 servings is 700 kcal is useful, especially next to your daily intake target (typically 1,800-2,500 for adults depending on size and activity). Always set the servings field to the realistic eating portion, not the technical division. A bolognese that \"serves 4\" usually serves 3 in a hungry household, so set it to 3.",
        "If you're meal-prepping, divide the recipe by the number of containers you actually portion it into. A pot of chilli portioned into 6 lunch boxes serves 6, even if the recipe says 4. The per-serving figure scales with the divisor, so being honest with the number gives honest calorie counts. The [meal planner](/meal-planner) handles weekly calorie totals across multiple recipes."
      ),
      createAnswerFirstSection(
        "What the Tool Captures and What It Doesn't",
        "The tool counts the calories in raw ingredients. It does not subtract calories from fat that drains off (a roast loses 5-15% of its starting fat to the pan), and it does not add calories from cooking medium that gets absorbed (chips absorb about 8% of their cook oil). For most home cooking these effects roughly cancel, but for very fatty meats or deep-fried food the actual eaten calories will be lower (drained fat) or higher (absorbed oil) than the calculation.",
        "Macro tracking (protein, carbs, fat) needs a more detailed database than this tool's 15 staples. If you're tracking macros for fitness, log into a dedicated app like MyFitnessPal or Cronometer, which has hundreds of thousands of foods with full macro splits. For everyday \"is this recipe roughly 500 or 800 kcal per serving\" questions, this tool answers in 30 seconds. Pair it with the [BBQ planner](/bbq-planner) when planning party food where total intake matters."
      ),
      createAnswerFirstSection(
        "Cutting Calories Without Ruining the Dish",
        "The fastest calorie cuts in most home recipes: replace half the oil with stock or water (saves around 80 kcal per tablespoon), use Greek yoghurt instead of cream in pasta sauces and curries (saves around 250 kcal per 100ml), swap rice for cauliflower rice in stir-fries (saves around 100 kcal per 100g cooked). None of these change the dish enough to notice if you do them quietly.",
        "The slow calorie additions worth watching: oil in salad dressings, cheese sprinkled at the table, butter on bread alongside soup. These don't show up in the recipe calorie count but easily add 200-400 kcal to a 'healthy' meal. If you're tracking, weigh and log them too. The [substitute ingredient finder](/substitute-ingredient-finder) suggests lower-calorie swaps for specific ingredients if you want to lighten a recipe without rewriting it."
      ),
    ],
    faqs: [
      createFAQ(
        "How accurate is this calorie estimate?",
        "Within about 10% for common ingredients. The tool's database uses standard kcal-per-100g values from public nutrition databases. Real variation comes from how lean the meat actually is, how much oil clings vs absorbs, and how heavily a hand of cheese is sprinkled. For day-to-day calorie awareness this is plenty; for clinical accuracy use a verified nutrition database with a 0.1g kitchen scale."
      ),
      createFAQ(
        "Should I count cooking oil that ends up in the pan?",
        "Yes, count what you put in. Most home cooking uses 1-2 tablespoons of oil (15-30ml, 130-270 kcal), and most of it stays in the food rather than draining off. The exception is searing fatty meat or deep-frying, where significant fat moves. For everyday tracking, count the oil you start with."
      ),
      createFAQ(
        "Why isn't [ingredient] in the dropdown?",
        "The built-in database covers 15 staples that hit most home recipes. For anything else, look up its kcal-per-100g on the USDA FoodData Central or the British Nutrition Foundation's database, then enter that value manually in the calories field. Common gaps: salmon (208 kcal/100g), beef mince 5% fat (137 kcal/100g), avocado (160 kcal/100g)."
      ),
      createFAQ(
        "Does cooking change the calorie count?",
        "Slightly, in either direction. Boiling pasta absorbs water (the cooked weight goes up but kcal stays the same as the dry weight), so always log dry pasta weight. Roasting meat loses water and some fat (cooked weight goes down but kcal also drops slightly). Use raw weights for everything, which is what the tool assumes."
      ),
    ],
    relatedTools: [
      { slug: "meal-planner", label: "Meal Planner" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
      { slug: "substitute-ingredient-finder", label: "Substitute Ingredient Finder" },
      { slug: "bbq-planner", label: "BBQ Planner" },
    ],
  },

  "freezer-storage-guide": {
    sections: [
      createAnswerFirstSection(
        "How Long Common Foods Last in the Freezer",
        "Beef steaks keep 12 months. Chicken breasts keep 9 months but quality is best at 3 months. Mince keeps 3 months. Fish fillets keep 3 months, fatty fish like salmon only 2 months because the fat oxidises. Cooked rice and pasta keep 4-6 months. Bread keeps 3 months sliced. Cheese keeps 4 months for hard cheeses, less for soft. Berries keep 12 months frozen open then bagged. Cooked soup and stew keep 3 months. Most leftovers keep 3 months.",
        "These figures assume a freezer running at -18°C or colder and food wrapped well. Domestic freezer drawers fluctuate between -15°C and -20°C as the door opens; chest freezers and upright freezers with separate doors hold temperature more reliably. Quality drops gradually past the recommended time, but food stays SAFE indefinitely if it's been continuously frozen below -18°C. Safety and quality are different questions, and the storage times in this guide are quality limits, not safety limits."
      ),
      createAnswerFirstSection(
        "Wrap Right or Don't Bother",
        "Freezer burn is what happens when moisture leaves the surface of food and forms ice crystals on the inside of the wrapping. The food is still safe but the texture goes papery and the flavour drops. Prevention: wrap food in cling film first, then a freezer bag, with as much air squeezed out as possible. For meat, wrap individually so you can defrost one portion without thawing the whole pack.",
        "Label every bag with the food, the freeze date and the number of portions. Sharpie on a freezer bag survives months at -18°C; biro doesn't. Use a system that matches your memory: dated drawer per category (\"meat from March\"), or labelled bags filed front-to-back. Most freezer waste comes from nobody knowing what's in there. The [meat cooking calculator](/meat-cooking-calculator) gives defrost-and-cook times for cuts you've portioned and frozen."
      ),
      createAnswerFirstSection(
        "Defrosting Without Killing Anyone",
        "Three safe defrost methods. Slowest and best: 24 hours in the fridge (a 1kg chicken breast pack thaws overnight, a whole chicken takes 24 hours per kg). Faster: cold water bath, 30 minutes per 500g, change the water every 30 minutes. Fastest: microwave defrost, then cook immediately. Never defrost meat at room temperature - the surface enters the danger zone (5-60°C) hours before the centre is thawed.",
        "Cooked food can be reheated from frozen for many recipes (stews, curries, soups). Just transfer frozen blocks to a saucepan with a splash of water and reheat gently with a lid on, stirring as it thaws. The UK Food Standards Agency rule: reheat to 75°C internal, only once. Don't refreeze food that's been thawed once unless it's been cooked between freezes (raw chicken thawed and cooked into a curry can be frozen as curry, but raw chicken thawed and refrozen raw cannot)."
      ),
      createAnswerFirstSection(
        "What Doesn't Freeze Well",
        "Avoid freezing: raw eggs in shell (they crack), whole boiled eggs (rubbery), milk-heavy sauces (they split, though cooking them again can rescue), salad leaves (turn to mush), fried food (loses crispness), boiled potatoes (go grainy), cucumber (waterlogs), creamy soups before puree (split). Most of these have a workaround: freeze egg whites and yolks separately in ice cube trays, freeze creamy soups before adding the cream, blanch and freeze potato chunks raw rather than boiled.",
        "Some foods freeze brilliantly that you might not expect: cooked rice (cool fast, freeze in portions, microwave 4 minutes from frozen), grated cheese (use straight from frozen on top of pasta), bananas (peel first, use in smoothies and banana bread), lemon juice in ice cube trays, herbs in olive oil in ice cube trays. The [substitute ingredient finder](/substitute-ingredient-finder) covers swaps when a fresh ingredient isn't available and the frozen version doesn't behave the same way."
      ),
    ],
    faqs: [
      createFAQ(
        "Can you freeze food in its original packaging?",
        "For supermarket meat and fish, the original packaging is fine for short-term freezing (1-2 months). For longer storage, double-bag or rewrap in freezer bags - supermarket trays and films are not designed for long-term freezer use and freezer burn sets in faster. Glass jars: only freeze if they're labelled freezer-safe (some Kilner jars are; most pasta sauce jars are not), and leave 2cm of headspace because liquids expand."
      ),
      createFAQ(
        "Is food still safe past the recommended freezer time?",
        "Yes. Continuously frozen food at -18°C or colder is safe indefinitely - bacteria can't grow at freezer temperatures. The recommended times are about quality (texture, flavour, colour), not safety. A chicken breast that's been frozen 18 months will be safe to eat but may have freezer burn and a flat flavour. If you find a forgotten freezer drawer item, smell and look at it after thawing; it's safe but may not be appetising."
      ),
      createFAQ(
        "How long can I freeze cooked leftovers?",
        "3 months for most cooked dishes (curry, chilli, stew, lasagne, shepherd's pie, soup). The texture starts to drop past that point, especially for vegetable-heavy dishes. Cool food to room temperature within 2 hours of cooking, then freeze in portion-sized containers - smaller portions freeze faster, which is better for both quality and safety."
      ),
      createFAQ(
        "Can I refreeze food that has thawed?",
        "Only if it's been cooked between thaws. Thawed raw chicken cooked into a curry can be frozen as curry. Thawed raw chicken cannot be refrozen raw - the freeze-thaw cycle gives bacteria more chance to grow. Fish has the strictest rule because it spoils fastest: never refreeze raw fish, and reheat any fish dish to 75°C if it's been frozen-thawed-cooked-refrozen."
      ),
      createFAQ(
        "Why does my freezer burn so much food?",
        "Three common causes. The freezer is set warmer than -18°C (check with a freezer thermometer, around £4). The door seal is loose, letting humid air in (clean the seal with warm water, check it grips a piece of paper). Or food is wrapped loosely and air is moving against the surface (rewrap with cling film direct to the food, then a freezer bag with air squeezed out). All three are fixable in under an hour."
      ),
    ],
    relatedTools: [
      { slug: "meat-cooking-calculator", label: "Meat Cooking Calculator" },
      { slug: "substitute-ingredient-finder", label: "Substitute Ingredient Finder" },
      { slug: "meal-planner", label: "Meal Planner" },
    ],
  },

  "kitchen-unit-converter": {
    sections: [
      createAnswerFirstSection(
        "Quick Conversions Between Tablespoons, Teaspoons, Cups and Millilitres",
        "The numbers worth remembering: 1 tablespoon is 3 teaspoons; 1 cup is 16 tablespoons or 48 teaspoons; 1 cup is 240ml; 1 tablespoon is 15ml; 1 teaspoon is 5ml. From those five facts you can convert almost any kitchen volume in your head. The presets in this tool cover the most-asked conversions: cup to tbsp, cup to tsp, cup to ml, tbsp to tsp, tbsp to ml. Click one and the calculation runs instantly.",
        "This is volume-only conversion. The numbers don't depend on what you're measuring - 1 tablespoon is 15ml whether it's water, oil, vanilla extract or honey. That's the difference between this tool and the [recipe unit converter](/recipe-unit-converter): the recipe converter handles ingredient density (1 cup of flour vs 1 cup of sugar weighing differently in grams), this one handles pure volume-to-volume swaps. For everyday \"how many tbsp in a cup\" questions, this is the faster tool."
      ),
      createAnswerFirstSection(
        "When You Need This Conversion",
        "You're cooking from a recipe written in cups and your kitchen has tablespoons but no measuring cups (the standard British position). Or the recipe says \"3 tbsp\" of olive oil and you only have a 5ml medicine spoon to hand - that's 9 spoonfuls. Or a baking recipe needs \"½ tsp baking powder\" and you grabbed the tablespoon, in which case ½ tsp is one-sixth of a tablespoon, or about 2.5ml.",
        "The most common confusion: tablespoons in different countries. A US tablespoon is 14.79ml (rounded to 15ml in cooking). An Australian tablespoon is 20ml. A UK tablespoon was historically 17.7ml but modern UK measuring spoons match the US 15ml standard. This tool uses the 15ml convention, which matches UK and US recipe writing in 2026. For Australian recipes, multiply tablespoon counts by 20/15 = 1.33."
      ),
      createAnswerFirstSection(
        "Volume vs Weight - Which to Use",
        "Use volume (this tool) for liquids, small spice quantities, and rough cooking. Use weight (a kitchen scale) for baking, anything precise, anything ratio-based. Volume measurement is faster and equipment-light; weight measurement is more accurate. For everyday cooking - a stew, a curry, a stir-fry - volume is fine and the small inaccuracy doesn't matter. For bread, cake, pastry and patisserie, volume measurement of dry ingredients can be 20% off and the result fails.",
        "If you're scaling a recipe at the same time as converting units, the [recipe scaler](/recipe-scaler) handles servings adjustments, then come back here for unit swaps. For temperature conversions (Fahrenheit, Celsius, gas marks), the [oven temperature converter](/oven-temperature-converter) covers those. Most full recipe conversions involve all three steps: temperature, units, sometimes scaling."
      ),
      createAnswerFirstSection(
        "Common Mistakes With Kitchen Volumes",
        "Reading \"tsp\" as \"tbsp\" or vice versa is the single biggest spoonful mix-up. The lower-case \"tsp\" is teaspoon (5ml), capital-or-lower \"tbsp\" or \"T\" is tablespoon (15ml) - 3x the size. In a recipe that says \"1 tbsp salt\" it's salting for a stew; \"1 tsp salt\" is for a small pasta dish. Triple the salt and you'll throw the pan away. When in doubt, the lowercase letter is smaller in real life too.",
        "Heaped vs level matters. \"1 tablespoon flour\" usually means level (scrape excess off with a knife edge), unless the recipe specifies \"heaped\" or \"rounded\". A heaped tablespoon of flour can be 50% more than a level one. Old British recipes sometimes assume heaped (gran's apple crumble); modern recipes assume level. If unsure, use level - you can add more, you can't take it out."
      ),
    ],
    faqs: [
      createFAQ(
        "How many tablespoons in a cup?",
        "16 tablespoons in 1 US cup. The maths: 1 cup is 240ml, 1 tbsp is 15ml, 240 / 15 = 16. So ½ cup is 8 tbsp, ¼ cup is 4 tbsp, ⅓ cup is 5⅓ tbsp (round to 5 plus 1 tsp). Most US recipe writers use these fractions interchangeably."
      ),
      createFAQ(
        "How many teaspoons in a tablespoon?",
        "3 teaspoons in 1 tablespoon. So 1 tbsp = 3 tsp = 15ml. If a recipe wants 2 tbsp and you only have a teaspoon, that's 6 tsp. If it wants ½ tsp and you only have a tablespoon, fill the tablespoon one-sixth full (or use a different spoon)."
      ),
      createFAQ(
        "How many ml in a cup?",
        "240ml in a US cup, 250ml in a metric cup, 284ml in an old UK imperial cup. Modern recipes almost universally use the US 240ml convention (this tool's default). The difference rarely matters for cooking but can throw off baking past 4 cups, where the cumulative drift becomes material."
      ),
      createFAQ(
        "What's the difference between fluid ounces and weight ounces?",
        "Fluid ounces measure volume (1 fl oz = 29.5ml in US). Weight ounces measure mass (1 oz = 28.35g). A US cup is 8 fluid ounces (volume), but a cup of flour weighs 4.4 oz (weight). The labels look similar but the numbers don't translate without knowing the ingredient. For weight conversions, use the [recipe unit converter](/recipe-unit-converter) which handles ingredient densities."
      ),
    ],
    relatedTools: [
      { slug: "recipe-unit-converter", label: "Recipe Unit Converter" },
      { slug: "cups-to-ml", label: "Cups to ml" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
      { slug: "recipe-scaler", label: "Recipe Scaler" },
    ],
  },

  "bake-sale-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Many Items to Bake for a School Bake Sale",
        "Plan 2 items per attendee as the default. For a school of 200 children with parents picking up at the gate (so roughly 350 buying decisions), that's 700 items. Spread across 3 varieties (brownies, muffins, cookies), each variety needs about 235 items. Brownies bake 24 per batch, so 10 batches; muffins 12 per batch, so 20 batches; cookies 36 per batch, so 7 batches. Total: about 37 batches across 3-4 baker volunteers.",
        "The 2-per-person figure assumes a typical PTA bake sale where parents buy a couple of things for the kids' lunchboxes plus one for themselves. For an after-school cake sale running only 30 minutes, drop to 1.5 per person. For a community fete running 4 hours, increase to 2.5. Always overcater by 10-15%; the worst outcome at a bake sale is the table looking sparse at hour 3 and shoppers walking past."
      ),
      createAnswerFirstSection(
        "Pricing for Profit",
        "The standard PTA pricing is 4x ingredient cost. If a batch of 24 brownies costs £4.50 in ingredients, that's 19p per brownie ingredient cost; sell each at 75p-80p (4x markup) and the 24 brownies generate £18 revenue from £4.50 cost, profiting £13.50. The tool runs three pricing scenarios at 3x, 4x and 5x markup so you can see the trade-off between volume and margin. Most school bake sales settle on 4x as the sweet spot.",
        "Don't price under £1 for items that look premium. Cupcakes with proper buttercream, decorated biscuits and slices of layer cake should sit at £1.50-£2.50 each even if the ingredient cost is low; the perceived value is what people pay for. Plain brownies, basic cookies and rice krispie treats sit at 50p-£1. Bundles work well for the unsold stragglers in the last 30 minutes: \"3 for £2\" clears the table and gets every penny in the float box. The [cake pricing calculator](/cake-pricing-calculator) handles bigger commission cakes if you're selling whole sponges alongside the small items."
      ),
      createAnswerFirstSection(
        "Variety, Allergens and the Practicalities",
        "Three to four varieties hits the right balance. Two looks sparse on the table; five becomes a logistics nightmare for the volunteers slicing and bagging. A solid line-up: one chocolate item (brownies), one fruity (lemon muffins or berry cupcakes), one biscuity (sugar cookies or shortbread), one safer for kids (rice krispie treats or no-bake cornflake cakes). Vary visual heights too - tall cupcakes next to flat brownies looks better than four flat trays.",
        "Label every item with its allergens (gluten, dairy, eggs, nuts) on a clear card by the tray. Schools increasingly require an allergen list signed by the baker before items go on the table. If you can offer one gluten-free or dairy-free variety, do - those parents will buy 5 of whatever's safe and tell every other parent at school. The [recipe cost calculator](/recipe-cost-calculator) handles per-recipe ingredient costing if you're scaling up old recipes for a bigger crowd."
      ),
      createAnswerFirstSection(
        "On the Day - Setup, Float and Bagging",
        "Bring £30 in change as a float: 20 x £1 coins, 10 x 50p, 20 x 20p, 20 x 10p. That covers the first 50-80 transactions. Have a phone with a payment app (SumUp, Zettle, or even just bank transfer with a printed QR) for parents who don't carry cash. Cash-only bake sales lose 30-40% of buyers in 2026; have card or bank transfer ready.",
        "Pre-bag everything that isn't a whole cake. Greaseproof paper bags from any supermarket (around 4p each) keep crumbs off the table and let buyers carry items home cleanly. Price each item with a sticker, not a chalkboard - parents buying for kids in a hurry don't read the board. Set a 30-minute clear-down: any leftover items get bundled at half price for the last bit of the sale, and any unsold items go home with the volunteer bakers (this matters because volunteers feel taken advantage of if they spend Sunday baking and then bin the leftovers)."
      ),
    ],
    faqs: [
      createFAQ(
        "How much money does a school bake sale typically raise?",
        "A primary school of 200 pupils with a 30-minute after-school sale typically raises £150-£300, depending on pricing and turnout. A bigger fete-style sale running 3-4 hours can raise £500-£1,500. Profit margin (after ingredient costs) is usually 70-75% at standard 4x markup, so £200 in sales is £140-£150 profit for the school."
      ),
      createFAQ(
        "What's the best-selling item at a bake sale?",
        "Chocolate brownies, every time. They're a known quantity, kids love them, parents love them, they bag well, they keep well at room temperature. After brownies: cupcakes with buttercream (visual pop sells), shortbread, rice krispie treats. Avoid: anything that needs refrigeration, anything that bleeds (jam-filled doughnuts), anything fragile (meringues, macarons)."
      ),
      createFAQ(
        "How do I price gluten-free or vegan items?",
        "Same markup, slightly higher absolute price. Gluten-free flour costs roughly 3x regular flour, so the ingredient cost is higher and the standard 4x markup gives a higher final price. Customers expect this; parents with restrictions are used to paying a premium. If GF brownies cost £1 to make per 24 batch (vs 19p for regular), price them at £1.50 each rather than £4."
      ),
      createFAQ(
        "Should I bake the day before or the morning of?",
        "Most things keep 24-48 hours at room temperature in airtight containers, so baking the day before is fine and reduces day-of stress. Exceptions: anything with fresh cream (bake same day), anything cut and individually wrapped (cut and bag morning of so it doesn't dry out), anything iced (ice that morning so the icing isn't smudged). Brownies, blondies, traybakes and cookies all keep beautifully overnight."
      ),
    ],
    relatedTools: [
      { slug: "cake-pricing-calculator", label: "Cake Pricing Calculator" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
      { slug: "recipe-scaler", label: "Recipe Scaler" },
    ],
  },

  "us-cooking-measurement-converter": {
    sections: [
      createAnswerFirstSection(
        "US Cups vs Other Measurements",
        "US cups are 240 ml (vs UK 250 ml, Australian 250 ml). 1 US cup = 16 US tablespoons = 48 US teaspoons. 1 US tablespoon = 14.8 ml; 1 US teaspoon = 4.93 ml. The US tablespoon is slightly smaller than UK/AU (15 ml/20 ml respectively), creating subtle issues when adapting recipes between regions. Most recipes survive the difference, but precise baking can feel off.",
        "Volume vs weight: US recipes traditionally use cups; European and Australian recipes increasingly use grams. A US cup of all-purpose flour weighs 120-128 grams (depending on whether it's sifted or scooped). A US cup of granulated sugar weighs 200 grams. The 'flour cup' problem - vague packing density - is why professional bakers prefer weight."
      ),
      createAnswerFirstSection(
        "Common Conversion Pairs",
        "1 US cup = 16 US tbsp = 8 US fl oz = 240 ml. 1 quart = 4 cups = 32 oz = 946 ml. 1 gallon = 4 quarts = 16 cups = 3.785 L. 1 pint = 2 cups = 16 fl oz = 473 ml. Note that US fluid ounces are slightly smaller than UK fluid ounces (29.57 ml vs 28.41 ml) - bizarrely the US fl oz is bigger.",
        "Stick of butter: 1 stick = 1/2 cup = 8 tbsp = 113 grams. American butter packaging shows tablespoon markings on the wrapper. UK/EU butter typically sold in 250-gram blocks without easy 'stick' equivalents - you weigh the amount you need."
      ),
      createAnswerFirstSection(
        "Adapting US to UK and Vice Versa",
        "If converting a US recipe to UK kitchen: 1 US cup ≈ 240 ml (use a 250 ml measuring jug as close approximation). 1 US tbsp ≈ 1 UK tbsp (15 ml is close enough; 14.8 vs 15 ml difference is negligible). 1 US tsp = 1 UK tsp (5 ml standard).",
        "If a US recipe says '2 cups of flour' use 240 grams (or 480 ml volume by sift-and-scoop). UK 'pints' are 568 ml; US pints are 473 ml - that's an 18% difference, big enough to ruin recipes. Always check whether 'pint' means UK or US in the original recipe. Use the [Recipe Unit Converter](/recipe-unit-converter) for ingredient-density-aware conversions."
      ),
      createAnswerFirstSection(
        "Temperature Conversions",
        "US recipes use Fahrenheit; most of the world uses Celsius. Conversion: °C = (°F - 32) × 5/9. Common cooking temps: 350°F = 175°C (most baking baseline), 375°F = 190°C, 400°F = 200°C, 450°F = 230°C. Roasting meats: 325°F = 165°C (low and slow), 425°F = 220°C (quick high heat).",
        "Gas marks (UK ovens): Gas mark 4 = 350°F = 175°C. Each gas mark up adds 25°F. Modern UK ovens usually show °C; older ovens still show gas marks. Convection (fan) ovens typically need 25°F (15°C) reduction from conventional - or 1 gas mark down."
      ),
    ],
    faqs: [
      createFAQ(
        "Do US measuring cups work in other countries?",
        "Yes, with the volume understanding noted (US cup = 240 ml). UK/AU measuring cups are 250 ml. The 4% difference rarely affects savory cooking. Baking is more sensitive, especially in chemistry-driven recipes (custards, soufflés)."
      ),
      createFAQ(
        "Is liquid vs dry measurement different?",
        "In US: dry measuring cups for dry ingredients (level off with knife edge), liquid measuring cups for liquids (spouted, marked at side). Same volume but the tools differ for accuracy. UK kitchens often use a single set of cups for both, rounded numbers don't match precisely as a result."
      ),
      createFAQ(
        "How do I convert imperial to metric in recipes?",
        "Volume: cups × 240 = ml, ounces × 30 = ml (close approximation). Weight: ounces × 28.35 = grams, pounds × 454 = grams. Temperature: °F to °C = (F-32)×5/9. For weights of common ingredients, weight measurement (kitchen scale) is more reliable than volume conversion."
      ),
      createFAQ(
        "Why don't all recipes use grams?",
        "American baking culture historically uses cups - tradition and cookbook conventions. Grams are objectively more accurate (no packing/scooping ambiguity), and professional bakers and growing home-baking culture in US is shifting toward weight measurement. Older cookbooks use cups; newer ones often provide both."
      ),
    ],
    relatedTools: [
      { slug: "recipe-unit-converter", label: "Recipe Unit Converter" },
      { slug: "kitchen-unit-converter", label: "Kitchen Unit Converter" },
      { slug: "baking-conversion-calculator", label: "Baking Conversion Calculator" },
      { slug: "recipe-scaler", label: "Recipe Scaler" },
    ],
  },

  "canada-turkey-size-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Turkey Per Person",
        "Standard guideline: 1 to 1.5 pounds (450-680 grams) of raw turkey per person for a typical Canadian Thanksgiving or Christmas dinner. The bone-in turkey weight includes about 30% bone and 10% drying loss, leaving roughly 60% edible meat. So 1 pound of turkey ≈ 0.6 pounds of meat, ≈ enough for one good adult portion plus some leftovers.",
        "Adjust upward for: heavy eaters, kids who love turkey, lots of leftovers desired (sandwiches for days). Adjust downward for: light eaters, lots of side dishes, kids who don't really like turkey. A 14-pound turkey feeds 10-12 adults adequately. A 20-pound turkey feeds 14-18 adequately or 10-12 with substantial leftovers."
      ),
      createAnswerFirstSection(
        "Choosing Turkey Size",
        "10-12 lb turkey: 8-10 people, fits standard ovens easily, cooks 3-4 hours. 14-16 lb: 12-14 people, large family dinner standard, 4-4.5 hours. 18-20 lb: 16-20 people, large gathering, 4.5-5 hours, may need extra rack or roasting setup. 22+ lb: very large gatherings or people wanting massive leftovers, 5-6 hours.",
        "Two smaller turkeys often beat one giant turkey - more breast meat per person, faster cooking, less risk of dry meat. Two 10-lb turkeys for 18 people works better than one 20-lb. Allow oven space and prep time for two birds. Brining or dry-brining works well at any size."
      ),
      createAnswerFirstSection(
        "Cooking Times",
        "Unstuffed: 13-15 minutes per pound at 325°F (165°C). Stuffed: 15-17 minutes per pound. Internal temperature: 165°F (74°C) at thigh, breast registers 160°F is acceptable. A 14-lb unstuffed turkey: about 3-3.5 hours. 18-lb stuffed: about 4.5-5 hours.",
        "Resting time after roasting: 30 minutes minimum, 45-60 minutes ideal. Tent loosely with foil. Carving immediately means juices run out and meat dries. Plan the meal so turkey finishes cooking 45-60 minutes before serving time."
      ),
      createAnswerFirstSection(
        "Beyond the Turkey",
        "Side dishes typically take 50-60% of the budget and serving capacity. Mashed potatoes (1.5-2 lb potatoes per 4 people), stuffing (1 cup per person), gravy (1/4 cup per person), cranberry sauce (1/4 cup per person), one or two vegetable sides (1/2 cup each per person).",
        "Plates ≠ portions. Some guests load up; others just want a small amount of everything. Plan for 1.25-1.5 servings per person on shared dishes to ensure no one runs out. Leftovers are typically planned for days following Thanksgiving - 'turkey sandwich season' is a Canadian tradition. Use the [Recipe Scaler](/recipe-scaler) for adjusting side dish recipes."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I get a frozen or fresh turkey?",
        "Frozen: cheaper, more readily available, requires 1-3 days thawing in fridge per 4 lbs. Fresh: more flavour for some palates, more expensive (often 50-100% more), more limited availability. Frozen is more common in Canadian households. Thawing-time planning is the only real downside."
      ),
      createFAQ(
        "How long can leftovers be kept?",
        "In refrigerator: 3-4 days for cooked turkey, gravy. In freezer: 2-3 months for best quality (can keep longer technically but quality degrades). Reheat to internal 165°F (74°C). Don't refreeze turkey that has been thawed in the refrigerator and then cooked - safety risk."
      ),
      createFAQ(
        "Can I cook a turkey day before?",
        "Yes - many cooks roast Thursday morning for Thursday evening dinner, with rest period in between. Or roast a day ahead, slice, and reheat in pan with broth on dinner day. Reheating sliced turkey is risky for dryness - serve room temperature or warmed in pan with broth."
      ),
      createFAQ(
        "What about turkey alternatives?",
        "Turkey breast (boneless, bone-in): cooks faster, no bone hassles, less meat per pound. Turkey roulade (rolled, stuffed boneless turkey): elegant presentation, easy carving. Turkey breast plus thighs: get both light and dark meat without whole bird hassle. All work for 8-10 people."
      ),
    ],
    relatedTools: [
      { slug: "recipe-scaler", label: "Recipe Scaler" },
      { slug: "recipe-cost-calculator", label: "Recipe Cost Calculator" },
      { slug: "canada-income-tax-calculator", label: "Canada Income Tax Calculator" },
      { slug: "calories-in-recipe", label: "Calories in Recipe" },
    ],
  },
};
