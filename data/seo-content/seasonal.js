// SEO content for seasonal and holiday tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const seasonalSEO = {
  "when-is-hanukkah": {
    sections: [
      createAnswerFirstSection(
        "How the Dates of Hanukkah Are Decided",
        "Hanukkah is an eight-day Jewish festival that begins on the 25th day of Kislev in the Hebrew calendar. Because the Hebrew calendar is lunisolar (based on both the moon and the sun) and the Gregorian calendar is solar, the exact dates of Hanukkah shift every year.",
        "Typically, Hanukkah starts sometime between late November and late December. The holiday is celebrated by lighting the menorah, eating fried foods like latkes and sufganiyot, and spinning the dreidel."
      )
    ],
    faqs: [
      createFAQ(
        "When does Hanukkah start this year?",
        "Hanukkah typically begins at sundown on the first day of the festival. You can use this calculator to find the exact start date, end date, and track a live countdown to the first night of the holiday."
      ),
      createFAQ(
        "What days are Hanukkah?",
        "Hanukkah lasts for exactly eight days and nights. Each night, an additional candle is lit on the menorah until all eight are burning brightly on the final evening."
      ),
      createFAQ(
        "How is Hanukkah celebrated?",
        "The most critical tradition is lighting the hanukkiah (a nine-branched menorah) each night. Other traditions include playing with a dreidel (a spinning top), exchanging small gifts or gelt (chocolate coins), and eating foods fried in oil to commemorate the miracle of the oil."
      )
    ]
  },

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
  },

  "world-cup-2026-wall-chart": {
    sections: [
      createAnswerFirstSection(
        "What's New About the 2026 Tournament",
        "FIFA expanded the World Cup from 32 teams to 48 for 2026, the biggest format change since 1998. The 48 teams are split into 12 groups of 4, with the top two from each group plus the eight best third-placed teams advancing into a Round of 32. That gives you 104 matches in total across 39 days, up from the 64 matches of previous editions.",
        "Hosting is split between three countries (USA, Canada, Mexico) across 16 cities including New York/New Jersey, Los Angeles, Dallas, Mexico City, Toronto and Vancouver. The opener is on 11 June 2026 in Mexico City and the final lands on 19 July 2026 at MetLife Stadium in New Jersey. The wall chart in this tool reflects the new format: 12 groups, the Round of 32 stage, and the standard knockout path from there (R16, quarter-finals, semi-finals, final)."
      ),
      createAnswerFirstSection(
        "Filling In the Group Stage",
        "Each group plays 6 matches over the first two and a half weeks of the tournament. The chart lets you log Wins, Draws and Losses per team and tracks Points automatically, with 3 points for a win and 1 for a draw. FIFA's tiebreakers go in this order: total points, then goal difference, then goals scored, then head-to-head record, then yellow/red card record, then a FIFA ranking draw. Most fans only ever need to apply the first three.",
        "The third-placed team mechanic is the trickiest part of the new format and the bit most people get wrong on their first wall chart. Eight of the twelve third-placed teams progress, ranked across all groups by the same criteria above. That means a third-placed team in a tough group can absolutely qualify ahead of a runner-up from an easy group, and the bracket pairings on the Round of 32 are not finalised until every group's last match has played out. Pencil rather than pen is the wise choice."
      ),
      createAnswerFirstSection(
        "Knockout Bracket and Match Dates",
        "The Round of 32 starts on 28 June 2026 and runs until 3 July. The Round of 16 plays from 4 to 7 July. Quarter-finals are on 9 to 11 July, semi-finals on 14 and 15 July, the third-place play-off on 18 July, and the final on 19 July. That is one extra knockout round compared to 2022, which is why the tournament is roughly a week longer overall.",
        "Each knockout match is a single elimination tie with extra time and penalties if needed. The wall chart in this tool fills the bracket automatically as you input results, so a knockout slot named 'Winner of A1 vs B/F/C 3rd' will automatically show the actual qualified team once you have logged the relevant group-stage results. Pin it on the office wall, the kitchen wall, the classroom corkboard or the pub noticeboard and update it after every match. If you also want to run a friends-and-family prediction competition, pair this with the [tournament bracket generator](/tournament-bracket-generator) for the knockout pool, and the [betting odds calculator](/betting-odds-calculator) if you want to compare your gut picks against bookmaker pricing."
      ),
      createAnswerFirstSection(
        "Printing It Out (and Why PDF Is the Premium Option)",
        "The free version exports the chart as a JPG with a small watermark, which prints fine on A4 or A3 home printers. The premium PDF download (£1.99 one-off) is print-ready at 300 DPI, formatted for A2 if you want a proper kitchen-wall poster, with cleaner typography, no watermark and a fillable layout designed for ballpoint pen rather than fine-tip marker. It is the version most parents end up buying the night before the tournament starts, when the kids want a chart on the wall before the opening match.",
        "If you are using this for a workplace sweepstake or pub competition, print one master copy for the wall and give participants their own filled-in predictions using the same format. The Round of 32 expansion makes the bracket noticeably wider than 2022 charts, so anything smaller than A3 starts to feel cramped once you are deep into the knockouts."
      ),
    ],
    faqs: [
      createFAQ(
        "When does the 2026 World Cup start and finish?",
        "The opening match is 11 June 2026 at the Estadio Azteca in Mexico City, and the final is 19 July 2026 at MetLife Stadium in East Rutherford, New Jersey. That is 39 days of football, the longest World Cup ever, with 104 matches in total. Most fans focus on the group stage (11 to 27 June) and the knockouts (28 June to 19 July)."
      ),
      createFAQ(
        "How many teams are in the 2026 World Cup?",
        "48 teams qualify, split into 12 groups of 4. The top two in each group advance directly to the Round of 32, and the eight best third-placed teams across all groups also progress. That brings 32 teams into the knockout bracket, the same as the old final stage but reached via the new expanded group format."
      ),
      createFAQ(
        "What are the host cities for the 2026 World Cup?",
        "16 cities across three countries. In the US: Atlanta, Boston, Dallas, Houston, Kansas City, Los Angeles, Miami, New York/New Jersey, Philadelphia, San Francisco Bay Area and Seattle. In Mexico: Guadalajara, Mexico City and Monterrey. In Canada: Toronto and Vancouver. The final is at MetLife Stadium in New Jersey, the semi-finals split between Dallas and Atlanta."
      ),
      createFAQ(
        "Can I print the wall chart on A4 or do I need A3?",
        "The free JPG works on A4 if you do not mind small text, especially in the knockouts. A3 is much more legible and is the size most pubs and kitchens use. The premium PDF is sized for A2 or A3, with proper margins for printing on a home printer or at a print shop. If you only have A4 to hand, print the group stage on one sheet and the knockout bracket on a second."
      ),
      createFAQ(
        "How does the third-placed team qualification actually work?",
        "After every group has played its three matches, the 12 third-placed teams are ranked by points, then goal difference, then goals scored, then disciplinary record. The top eight progress to the Round of 32. Their bracket position is determined by a fixed mapping FIFA published before the tournament, so a third-placed team from Group A might end up facing the Group B winner, the Group C winner, the Group D winner or the Group E winner depending on which third-placed teams qualify. This makes Round-of-32 fixtures genuinely hard to predict until the final group games end."
      ),
    ],
    relatedTools: [
      { slug: "tournament-bracket-generator", label: "Tournament Bracket Generator" },
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
      { slug: "matched-betting-calculator", label: "Matched Betting Calculator" },
    ],
  },

  "back-to-school-checklist": {
    sections: [
      createAnswerFirstSection(
        "What This Checklist Covers (and Why It Is Different by Year Group)",
        "The list breaks down by Reception, Primary (Years 1 to 6) and Secondary (Years 7 to 11) because the kit a 4-year-old needs to start school is genuinely different from what a Year 7 needs on their first day. Reception is light: a sweatshirt with the school badge, a couple of pairs of trousers or a skirt, plimsolls for indoors, a named water bottle and a lunchbox. Total spend usually lands somewhere between £80 and £150 if you buy everything new from a high-street uniform supplier.",
        "Primary kicks up the stationery side of things: a proper pencil case, a 30cm ruler, a compass for Year 5 and 6 maths, glue sticks (always more than you think). Secondary is the expensive year. A scientific calculator alone is £10 to £18, the blazer with a school badge is often £35 to £60, and PE trainers add another £25 to £40. The UK average back-to-school spend per child for a secondary starter sits around £337 according to retailer surveys, which surprises most parents the first time."
      ),
      createAnswerFirstSection(
        "When to Start Buying (and Where the Real Savings Hide)",
        "Most schools send the official uniform list in the last week of summer term. The single best move is to start buying in late June or early July rather than the August panic week, because branded blazers and PE tops in popular sizes routinely sell out by mid-August. Tesco's F&F, Sainsbury's Tu and Asda's George do unbranded staples (white shirts, plain trousers, plain skirts) for under £6 per item, and most schools allow these for everything except the badged jumper or blazer.",
        "The other thing worth knowing: nearly every UK secondary school runs a uniform exchange or pre-loved sale on the last week of summer term. Blazers in good condition often go for £5 to £10. PTAs run them, the Facebook group will mention them, and the saving over a £45 new blazer is real. Tick items off this list as you go so you do not double-buy. If you are also moving house this summer, the [Moving House Checklist](/moving-house-checklist) handles the bigger picture so the school kit does not get lost in the boxes."
      ),
      createAnswerFirstSection(
        "Labelling Everything (Yes, Everything)",
        "The single most-asked-about line on every back-to-school list is name labels. Iron-on labels for clothing cost about £8 for 100 and stick through 50 plus washes. Stick-on labels for water bottles, lunch boxes, pencil cases and reading folders are roughly £6 for 60. Sharpie on the inside hem works for jumpers in a pinch but fades after about ten washes, so it is worth doing properly for the items that get lost most: jumpers, cardigans, water bottles, lunch boxes and PE bags. Schools collect mountains of unnamed lost property by October half-term, and very little of it ever gets back to its owner."
      ),
    ],
    faqs: [
      createFAQ(
        "When do schools go back in September?",
        "Most state schools in England and Wales return between 1 and 6 September, with INSET days sometimes shifting the first day of teaching to a Tuesday or Wednesday. Scottish schools return earlier, usually mid to late August. Check your school's specific term dates published on the school website or local council page, as academies and grammar schools sometimes set their own calendar."
      ),
      createFAQ(
        "How much does back-to-school cost in the UK?",
        "Recent retailer surveys put the average UK spend at around £165 per primary child and £337 per secondary child, including uniform, PE kit, shoes, stationery and bag. Branded items push the cost up. Buying unbranded staples from supermarkets and only paying for the badged jumper or blazer keeps most families closer to £80 for primary and £150 for secondary."
      ),
      createFAQ(
        "Can I get help with school uniform costs?",
        "Yes. Most local councils run a school uniform grant scheme of £100 to £200 for families on low income or receiving certain benefits. The application opens around June each year through your council website. PTAs at most schools also run uniform exchanges where pre-loved blazers, jumpers and PE kit are free or nearly free."
      ),
      createFAQ(
        "Do I need to buy a scientific calculator for secondary?",
        "Yes, for Year 7 onwards. The Casio fx-83GTX or fx-85GTX (both around £12 to £18) are the models most UK secondary schools recommend, and they are required for GCSE maths exams. A standard calculator app or basic shop calculator will not be allowed in lessons or exams, so this is one item that genuinely needs to be on the list."
      ),
    ],
    relatedTools: [
      { slug: "moving-house-checklist", label: "Moving House Checklist" },
      { slug: "cleaning-schedule-generator", label: "Cleaning Schedule Generator" },
      { slug: "habit-tracker", label: "Habit Tracker" },
    ],
  },

  "bonfire-night-planner": {
    sections: [
      createAnswerFirstSection(
        "Bonfire Night, 5 November, and What This Tool Actually Does",
        "Bonfire Night, also called Guy Fawkes Night, falls on 5 November every year, marking the foiling of the 1605 Gunpowder Plot. This planner does three things. It runs through a 9-point safety checklist for fireworks, calculates food and drink quantities for any number of guests (default is set to 20, the average garden party size), and gives you a separate sparkler safety guide for kids, because sparklers cause more A&E injuries on Bonfire Night than the fireworks themselves.",
        "If you are hosting at home, the food list scales automatically: roughly 1 hot dog per adult, 0.5 toffee apples per person (kids tend to eat them, adults tend to look at them), 100g of marshmallows per head and a cup of hot chocolate each. The numbers are tuned to a typical 2 to 3 hour outdoor evening party. If you are heading to a public display instead, skip the food calculator and lean on the safety checklist for sparklers and warm-clothing prompts."
      ),
      createAnswerFirstSection(
        "Sparkler Safety: The Bit Most People Get Slightly Wrong",
        "Sparklers reach about 1,000C at the tip, hotter than a kitchen blowtorch, and stay dangerously hot for at least a minute after they go out. The single most important rule: sparklers are not legally sold to anyone under 16, and the BSI guidance is that no child under 5 should ever be given one. Children aged 5 to 12 should be supervised one-to-one, wearing gloves, holding the sparkler at arm's length away from clothing.",
        "The bucket of water at the end matters more than people realise. Spent sparkler tips in a wheelie bin or grass have caused secondary fires every year. Fill a metal bucket with cold water before lighting the first one, drop each finished sparkler in tip-down, and leave them there overnight. If a child drops a lit sparkler, do not let them pick it up, even after it stops sparkling. Foot it out, hose it down, then bin it once cool. The garden looks tidier on the 6th if you set the bucket up before the kids arrive."
      ),
      createAnswerFirstSection(
        "Hosting a Garden Party Versus Going to a Display",
        "Garden fireworks have got pricier and trickier. Selling fireworks to the public is restricted to four windows a year (15 October to 10 November is the main one), and category F2 fireworks (the home-display ones) need a 8 to 25 metre safety zone depending on the firework, which most British gardens do not have. Many councils now actively discourage home displays, and your home insurance will rarely cover fireworks-caused damage. Most families end up doing a small sparkler-and-food evening at home and walking to the local display for the actual fireworks.",
        "Whichever you choose, the food maths is the same. The shopping list this tool generates assumes a Bonfire Night sweet spot of warming, easy-to-eat food: jacket potatoes, hot dogs, beef stew, marshmallows, hot chocolate. If you also want to plan the traditional toffee apples or parkin properly, pair this with the [Recipe Scaler](/recipe-scaler) to scale a favourite recipe up to your guest count without doing the maths yourself."
      ),
    ],
    faqs: [
      createFAQ(
        "When is Bonfire Night 2026?",
        "Bonfire Night is on Thursday 5 November 2026. The date does not move, it is fixed to the anniversary of the 1605 Gunpowder Plot. Many local authority firework displays are held on the nearest Saturday, which in 2026 will be Saturday 7 November, but the actual Guy Fawkes Night itself is always 5 November."
      ),
      createFAQ(
        "Can I have fireworks in my garden?",
        "Yes, with caveats. Category F1 (indoor) and F2 (garden) fireworks can be set off on private land between 7am and 11pm, with the curfew extended to midnight on 5 November. You need at least an 8m safety zone for most F2 fireworks and 25m for some, which means small terraced or semi-detached gardens are not really suitable. Check with neighbours, warn pet owners, and keep the bucket of water and a hose close to hand."
      ),
      createFAQ(
        "What is the safest way to handle sparklers with children?",
        "Gloves on, one sparkler at a time, held at arm's length away from the body and clothing. Children under 5 should not hold sparklers at all. Light the sparkler at the very tip, never the middle, and drop it tip-down in a metal bucket of water as soon as it goes out. Most A&E sparkler burns are from kids picking up sparklers that look extinguished, so the bucket is non-negotiable."
      ),
      createFAQ(
        "How much food do I need for 20 guests at Bonfire Night?",
        "For an outdoor 2 to 3 hour evening party for 20 people, plan for roughly 20 hot dogs in 24 buns, 10 toffee apples, 20 jacket potatoes, 6 litres of soup or beef stew, 2kg of marshmallows and 20 cups of hot chocolate. People eat more in the cold than they think, and toffee apples especially get refused by adults but devoured by kids, so adjust if your guest list skews younger."
      ),
    ],
    relatedTools: [
      { slug: "halloween-scavenger-hunt", label: "Halloween Scavenger Hunt" },
      { slug: "halloween-costume-idea-generator", label: "Halloween Costume Idea Generator" },
      { slug: "christmas-dinner-planner", label: "Christmas Dinner Planner" },
    ],
  },

  "christmas-countdown": {
    sections: [
      createAnswerFirstSection(
        "How Many Sleeps Until Christmas?",
        "Christmas Day is always 25 December. The countdown ticks down in days, hours, minutes and seconds in real time, and the big number labelled 'sleeps' is the days figure (one sleep is one full night between now and Christmas morning). Once Christmas Day passes, the countdown automatically rolls forwards to the following year, so this page is genuinely evergreen and the same URL works every December.",
        "The year-progress bar underneath shows what percentage of the calendar year has gone, which is a surprisingly handy gut-check for the 'I cannot believe it is already November' feeling everyone gets. By 1 October you are 75% through the year. By Bonfire Night you are 85% through. Christmas Eve is 99.18% of the way through the year, and the final week always feels longer than it actually is."
      ),
      createAnswerFirstSection(
        "The Real Christmas Deadlines Most People Miss",
        "The countdown is the fun bit. The deadlines are what actually matter. Royal Mail's last recommended posting date for second-class UK Christmas mail is 18 December (1st class is 20 December), and for international post the cut-offs run from 4 December (Australia, New Zealand by Tracked & Signed) to 11 December (Western Europe, Standard). Online retailers like Amazon, John Lewis and Argos typically have 22 to 23 December as the last guaranteed delivery date for non-Prime customers, and same-day or next-day options surge in price from about the 18th onwards.",
        "If you are doing an advent calendar with a daily activity instead of chocolates, build the activity list in early November so you have time to actually buy any materials. The [Advent Calendar Activity Generator](/advent-calendar-activity-generator) gives you 24 age-appropriate ideas. If you are organising a Secret Santa at work or in the family, [Secret Santa Generator](/secret-santa-generator) handles the name-pulling and budget setting without anyone seeing each other's matches."
      ),
    ],
    faqs: [
      createFAQ(
        "How many days until Christmas 2026?",
        "Christmas Day 2026 falls on a Friday, 25 December 2026. The countdown on this page updates every second, so the exact figure is shown at the top of the tool. As a rough guide, Bonfire Night is about 50 days before Christmas, and the start of Advent (1 December) is exactly 24 sleeps to go."
      ),
      createFAQ(
        "What is the last day to post Christmas cards UK?",
        "Royal Mail's recommended last posting date for second-class UK Christmas mail is typically 18 December, and 20 December for first-class. Special Delivery Guaranteed runs to 22 December. International post cut-offs are earlier: 4 to 5 December for Australia and New Zealand (Tracked & Signed), 11 December for Western Europe (Standard), and 16 December for Western Europe (Tracked & Signed). Royal Mail publishes the year's exact dates each November on their website."
      ),
      createFAQ(
        "When does Advent start?",
        "Advent traditionally starts on the fourth Sunday before Christmas Day, which means Advent Sunday changes year to year (typically falls between 27 November and 3 December). For the chocolate-and-craft advent calendar that most UK families know, the first window opens on 1 December every year, regardless of which day of the week it falls on. There are 24 windows, ending on 24 December (Christmas Eve)."
      ),
      createFAQ(
        "Why do we say sleeps until Christmas?",
        "The 'sleeps' phrasing came from the way young children measure time. They cannot easily picture 'in 12 days', but they can picture going to bed twelve more times. The phrase has stuck with parents and grandparents long after the kids have grown out of it, and it is now used in every Christmas advert and supermarket window from late November onwards."
      ),
    ],
    relatedTools: [
      { slug: "advent-calendar-activity-generator", label: "Advent Calendar Activity Generator" },
      { slug: "christmas-dinner-planner", label: "Christmas Dinner Planner" },
      { slug: "secret-santa-generator", label: "Secret Santa Generator" },
    ],
  },

  "christmas-dinner-planner": {
    sections: [
      createAnswerFirstSection(
        "How Much Turkey, Potato and Sprout per Person?",
        "The shopping list this tool generates uses tested ratios for 2 to 20 guests: 400g of turkey on the bone per person (or 250g boneless), 400g of roasting potatoes per person, 200g of parsnips, 250g of Brussels sprouts (yes, even though half the table claims not to eat them), 200g of carrots, plus 50g of butter per person for everything that needs basting and roasting. For 8 people that is roughly a 3.2kg turkey, 3.2kg of potatoes and 1.6kg of carrots and parsnips combined.",
        "If you have meat-eaters, vegetarians and vegans on the same table, the tool splits the count and adds vegetarian Wellington or vegan main alternatives at the right quantity. The default vegetarian option is mushroom Wellington (one per veggie guest), and the vegan equivalent is a vegan Wellington or roasted-vegetable main. Gluten-free guests get a separate flag for GF bread for the stuffing and sauces. Build your guest list at the top, including dietary needs, and the shopping list updates automatically."
      ),
      createAnswerFirstSection(
        "Working the Cooking Timeline Backwards from Serving Time",
        "Most home cooks pick a serving time and then panic-work backwards from there about an hour too late. This tool does the working backwards properly: enter your serving time (default 1pm) and it gives you a 14-step timeline with exact clock times, starting roughly 4.5 hours before you want to eat. For a 1pm serving, that means turkey out of the freezer overnight (or ideally 2 days ahead for a thaw on a 4kg bird), oven preheated by 9.30am, turkey in by 10.30am, parboil the roasties at noon, finish gravy at 12.45pm, dinner served at 1pm.",
        "Two timing mistakes catch out most first-time hosts. First, turkey resting time. A turkey needs 20 to 30 minutes to rest after coming out of the oven, covered with foil and a tea towel. The juices redistribute, the meat carves cleanly, and the gravy you make from the resting tin juices is dramatically better. Second, the par-boiling step for roast potatoes. Skipping the 8-minute parboil before roasting is the single biggest reason home roasties end up dense rather than crispy. The timeline builds both in by default."
      ),
      createAnswerFirstSection(
        "Print It, Pin It, and Avoid the 11am Panic",
        "The free download is a JPG of the full plan (timeline plus shopping list) which most people print to A4 and pin to the inside of a kitchen cupboard door. The premium PDF (£1.99 one-off) prints at 300 DPI in a cleaner format with no watermark, sized for an A4 portrait fridge magnet or a properly-formatted shopping list to take to the supermarket. If you are doing the shop on Christmas Eve, the shopping list works as-is. Aim to do the meat shop by 22 December at the latest, the supermarket fresh-veg shop on 24 December morning, and have a final glass of something the night before to read through the timeline once.",
        "If you also need a Secret Santa for the family, [Secret Santa Generator](/secret-santa-generator) sorts the matches without spoilers. For the gift budgeting side, the [Christmas Gift Budget Tracker](/christmas-gift-budget-tracker) keeps the spend honest and warns you with traffic-light colours before you go over per-person."
      ),
    ],
    faqs: [
      createFAQ(
        "How much turkey do I need for 8 people?",
        "About 3.2kg on the bone, or 2kg boneless. The standard ratio is 400g per adult on the bone, which gives you a full plate plus enough leftovers for sandwiches the next day. If your guest list includes children under 10, allow 250g per child instead. A 3.2kg bird needs roughly 3 hours 15 minutes to roast at 180C, plus 30 minutes resting time."
      ),
      createFAQ(
        "What time should I start cooking Christmas dinner?",
        "For a 1pm serving and 8 guests, start around 8.30am with the oven preheating and vegetables getting peeled. The turkey goes in at about 9.45am to 10am, vegetables around 11.45am, gravy and sauces from 12.30pm. The exact times depend on your turkey size and serving time. The cooking timeline this tool generates works backwards from your specified serving time and adjusts automatically."
      ),
      createFAQ(
        "How do I plan Christmas dinner for vegetarians and vegans?",
        "Add a vegetarian or vegan main course count separately from your meat-eating guests. The most reliable choices are mushroom or chestnut Wellington (most supermarkets sell oven-ready ones from mid-November), a nut roast, or a stuffed butternut squash. Make sure the gravy is vegetarian or vegan (not made with turkey juices), and double-check that the stuffing, bread sauce and pigs-in-blankets are clearly separated on serving. The tool flags this in the shopping list for you."
      ),
      createFAQ(
        "Can I prep Christmas dinner the day before?",
        "Most of it, yes. Peel and parboil the potatoes the day before and store them in cold water in the fridge. Make stuffing, cranberry sauce and bread sauce on Christmas Eve. Trim sprouts and chop carrots and parsnips the night before. The turkey itself should not be cooked ahead, but you can defrost, season and stuff it the night before so it goes straight into the oven on the day. This roughly halves your Christmas morning workload."
      ),
    ],
    relatedTools: [
      { slug: "christmas-gift-budget-tracker", label: "Christmas Gift Budget Tracker" },
      { slug: "secret-santa-generator", label: "Secret Santa Generator" },
      { slug: "recipe-scaler", label: "Recipe Scaler" },
    ],
  },

  "christmas-gift-budget-tracker": {
    sections: [
      createAnswerFirstSection(
        "Per-Person Budgeting (and Why It Beats a Single Big Number)",
        "Most people start Christmas with a vague total budget in their head ('about £400 this year') and end Boxing Day £150 over without quite knowing how. This tool flips it: you set a budget per recipient, log what you actually spend, and the colour-coded bars (green under 80%, amber 80 to 100%, red over budget) tell you at a glance who is creeping over. The default starts with Mum and Dad at £30 each, which is fine for most adult-to-adult Christmas gifts in the UK; the 2025 average UK Christmas gift spend per adult was around £360 in total, spread across roughly 8 to 10 people.",
        "Budgets vary wildly by relationship. Spouses and partners typically £50 to £150, parents £30 to £80, siblings £20 to £40, in-laws £25 to £50, kids £40 to £100 each, friends £15 to £25, work Secret Santa usually £10 capped. Add a recipient with the name and budget at the top, log the spend each time you buy, and the three big totals (budget, spent, remaining) update at the top in real time. No spreadsheet required."
      ),
      createAnswerFirstSection(
        "Saving the State, Sharing the Plan, and the Honest Bit About Joint Gifts",
        "The tracker auto-saves to your browser's local storage between sessions, so closing the tab does not lose your list. If two of you are buying gifts together (you and a partner, two siblings clubbing together for a parent), open the tracker on the same shared device or screenshot it before each shopping trip. Joint gifts are where most overspend happens, because both people assume the other has 'covered the main thing' and then add an extra small gift on top that pushes past the budget.",
        "If you are doing Secret Santa within a wider family or work group, set the budget for that single person and use the [Secret Santa Generator](/secret-santa-generator) to handle the matches and the budget rule centrally. For the broader Christmas spend (food, drink, decorations, the cleaner's tip, the postman's chocolates), add line items for each as named recipients. The tool does not care whether 'recipient' is a person or a category."
      ),
    ],
    faqs: [
      createFAQ(
        "How much should I spend on Christmas gifts in the UK?",
        "The 2025 average UK adult spent around £360 on Christmas gifts in total, but the distribution is wide. Budgets per person typically run £50 to £150 for spouses and partners, £30 to £80 for parents, £20 to £40 for siblings, £40 to £100 for own children, £15 to £25 for friends and £10 capped for work Secret Santa. Set a per-person budget that fits your overall household budget, not what social media tells you you should spend."
      ),
      createFAQ(
        "When should I start Christmas shopping to spread the cost?",
        "Most financial planners recommend starting in late September or early October, putting aside roughly 20% of your total Christmas budget each month from October through December. Starting earlier than late September often means buying things people did not actually want by the time December arrives. Black Friday weekend (last weekend of November) genuinely does get the best electronics deals, but clothing and toy discounts are usually as good or better in early December."
      ),
      createFAQ(
        "Does this tracker save my list between visits?",
        "Yes. Your recipient list and amounts spent save automatically to your browser's local storage. If you clear browsing data, switch devices, or use private browsing, your list will reset. To keep it across devices, you can take a screenshot or note down the figures before clearing your browser. The tool does not store anything on a server, so the data lives only on the device you used."
      ),
      createFAQ(
        "How do I split a joint Christmas gift between two people?",
        "Add the recipient once with the full budget, then have one person log the full spend. If you want to track who paid what, add it as a note in the recipient name (e.g. 'Mum - half from Sarah'). For more involved splits, a separate shared spreadsheet works better, but for most family joint gifts, agreeing the split verbally and having one person track it in the tool is enough."
      ),
    ],
    relatedTools: [
      { slug: "secret-santa-generator", label: "Secret Santa Generator" },
      { slug: "christmas-dinner-planner", label: "Christmas Dinner Planner" },
      { slug: "advent-calendar-activity-generator", label: "Advent Calendar Activity Generator" },
    ],
  },

  "easter-activity-planner": {
    sections: [
      createAnswerFirstSection(
        "What This Schedule Actually Looks Like",
        "Pick the age group (3-5, 5-7 or 7-9), the location (garden or indoor) and whether you want a morning or afternoon plan. The tool returns three age-appropriate Easter activities scheduled in sequence, each with an instruction and a duration in minutes. A typical 5-7 garden afternoon comes back as: Easter egg hunt (75 mins), pom-pom chick crafts at the kitchen table (60 mins), Easter-themed picnic tea (60 mins). That is roughly 3 hours 15 mins of activity, which is about right for an Easter Monday afternoon before the kids' attention starts to fray.",
        "The age-banding genuinely matters. A 3-year-old will love finding hidden chocolate eggs but cannot follow a multi-stop riddle hunt. A 7-year-old will be bored by a five-minute basket craft. The activity options are filtered against the age you pick: rhyming clues for 3-5s, written clues with light riddles for 5-7s, cryptic multi-stop hunts for 7-9s. If your group spans both ends, build for the older child and let the younger one shadow them."
      ),
      createAnswerFirstSection(
        "Hosting at Home: The Bits Most Parents Forget",
        "Have everything for every activity laid out before the kids start. Cotton wool for the bunny tails, paint for the eggs, the chocolate eggs already hidden, the picnic blanket where you can grab it. Switching between activities is where most kids' parties lose momentum, and a 5-minute set-up gap with bored 6-year-olds becomes a 25-minute argument. Build in 15-minute breaks for snacks and drinks between each activity, even if the kids do not want one, because the adults always need it.",
        "On the egg hunt: count the eggs out loud before you hide them and write the total on a Post-it. Every year, parents discover melted chocolate behind the radiator the following August because nobody knew there were 32, not 30. For 5-7s and 7-9s, mix the difficulty: a few in obvious places at child eye-line, a few harder ones for the kids who finish first. If you need printable clue cards specifically for the egg hunt, [Easter Egg Hunt Clue Generator](/easter-egg-hunt-clue-generator) generates them for you with rhyming clues that match the age group."
      ),
      createAnswerFirstSection(
        "Allergies, Weather and the British Easter Reality",
        "British Easter weather is famously unreliable, and the tool's location switch (garden versus indoor) should be your honest starting point. If the forecast is borderline, plan two versions: one for dry, one for wet. Indoor egg hunts work fine if you hide eggs at child eye-level around the living room and corridors rather than in cupboards or under sofas. For dietary requirements, supermarket allergen-free chocolate eggs (Cadbury, Moo Free, Nomo) are now in every major supermarket from late February onwards. Keep a separate stash labelled with each child's name if you have multiple allergies in the group."
      ),
    ],
    faqs: [
      createFAQ(
        "What time of day works best for an Easter activity day?",
        "Late morning to early afternoon (10am to 2pm) tends to work best. Children are at their most cooperative just after breakfast, energy dips around 1pm, and most adults want the day done by mid-afternoon. The tool offers a morning or afternoon plan because most families pick one or the other rather than running activities all day. If you have older children (7-9) who can sustain a longer day, run the morning plan and add a relaxed picnic and movie in the afternoon."
      ),
      createFAQ(
        "How many Easter eggs should I hide for a hunt?",
        "Aim for 8 to 12 eggs per child for a 30 to 45-minute hunt. Mix mini eggs (count for 1) and full-sized eggs (count for 5) so the hunt feels generous without over-loading on chocolate. For very young children (3-4), keep the count to about 6 per child and place them at obvious eye-level locations to keep frustration low. Always count the eggs before you hide them and write the total down."
      ),
      createFAQ(
        "What can I do for Easter without buying loads of chocolate?",
        "Plenty. Decorate hard-boiled hens' eggs with food colouring and paint (the natural-dye option in the 5-7 schedule uses tea, beetroot juice and red cabbage). Make pom-pom chicks from yarn and a fork, or paper bunnies with cotton wool tails. Bake hot cross buns from scratch. Plant spring flowers in pots together. The traditional Polish and Eastern European tradition of decorating eggs (pisanki) is genuinely beautiful and barely costs anything."
      ),
      createFAQ(
        "Is Easter Monday a UK bank holiday in 2026?",
        "Yes. Easter Sunday in 2026 falls on 5 April, with Good Friday on 3 April and Easter Monday on 6 April both being UK bank holidays in England, Wales and Northern Ireland. Scotland has Good Friday but not Easter Monday as a statutory bank holiday, although most schools and employers still observe it. The activity planner is most often used to fill the Saturday between Good Friday and Easter Sunday, or Easter Monday itself."
      ),
    ],
    relatedTools: [
      { slug: "easter-egg-hunt-clue-generator", label: "Easter Egg Hunt Clue Generator" },
      { slug: "scavenger-hunt-generator", label: "Scavenger Hunt Generator" },
      { slug: "craft-project-generator", label: "Craft Project Generator" },
    ],
  },

  "fathers-day-gift-idea-generator": {
    sections: [
      createAnswerFirstSection(
        "What This Tool Actually Does (and What It Does Not)",
        "This tool generates Father's Day gift ideas from a curated list of about 64 categories: 8 interest types (sport, cooking and BBQ, DIY, gaming, music, outdoors, tech, cars) crossed with 4 budget tiers (under £10, £10 to £25, £25 to £50, £50 plus). Tick the interests that genuinely match your dad, pick the budget you have, and the tool returns one suggestion per interest. Click the button again to shuffle a different idea from the same category if the first one does not feel right.",
        "What this is not: a personalised shopping recommendation engine. The tool does not link to specific products, does not check stock, and does not know what your dad already owns. The point is to spark ideas you might not have thought of, especially in the panic week before Father's Day when you have stared at the same Amazon homepage for 20 minutes and bought nothing. Use the suggestions as a jumping-off point and search the actual product on John Lewis, Argos or Amazon to compare prices and reviews."
      ),
      createAnswerFirstSection(
        "Filtering Honestly Beats Picking Everything",
        "The most common mistake people make with the tool is ticking five interests and picking the highest budget, which gives you five generic ideas across categories that do not match your dad. Better: tick one or two interests that genuinely apply (the dad who loves BBQ but never touches a golf club, tick BBQ only), and the suggestion will land in the territory where he will actually use it. Generic 'tech for dad' suggestions land in the cupboard. Specific 'rangefinder for the dad who plays golf every Saturday' lands as the gift he uses every weekend.",
        "Budget honesty matters too. The £50-plus tier is genuinely £50 to £800 of range, which can feel like a stretch when most adult-to-parent gifts in the UK sit at £30 to £80. The £10 to £25 and £25 to £50 tiers are where most thoughtful Father's Day gifts actually live. If you are also tracking a wider family Father's Day spend (cards, lunch out, the gift), pair this with the [Christmas Gift Budget Tracker](/christmas-gift-budget-tracker), which works for any gift occasion and lets you log the per-person spend across the whole day."
      ),
      createAnswerFirstSection(
        "When Father's Day Falls and How Long You Have to Order",
        "Father's Day in the UK and Ireland is the third Sunday in June, which in 2026 is Sunday 21 June. Online retailers' last guaranteed standard delivery for Father's Day is typically the Tuesday or Wednesday of that week, so 16 to 17 June 2026 for a Sunday delivery. If you are personalising anything (engraving, photo print, custom keyring), order at least 7 to 10 days ahead because personalisation queues stretch the closer you get to the day. Father's Day is one of the lower-volume gift days for retailers, so stock generally is not a problem, but personalisation backlogs always are."
      ),
    ],
    faqs: [
      createFAQ(
        "When is Father's Day 2026?",
        "Father's Day in the UK and Ireland falls on Sunday 21 June 2026. It is always the third Sunday of June. Note that Father's Day in many other countries falls on different dates: Germany celebrates it on Ascension Day, Italy and Spain on 19 March, and Australia on the first Sunday of September."
      ),
      createFAQ(
        "What are the most popular Father's Day gift ideas?",
        "UK retailer surveys consistently put the same items in the top 10 every year: socks, aftershave, a watch, a bottle of his favourite spirit, BBQ accessories, a personalised photo gift, a gardening tool set, a tech gadget like wireless earbuds, a sports shirt or kit, and a day-out experience like go-karting or whisky tasting. The most-given gift is socks; the most-loved gift is usually the experience or the personalised photo item."
      ),
      createFAQ(
        "How much should I spend on a Father's Day gift?",
        "UK Father's Day spend averages around £30 to £40 per person, but it varies hugely by relationship. Adult children buying for their dad typically spend £25 to £60, partners buying for the kids' dad spend £30 to £80, and grandchildren or younger children spend much less, often £5 to £15. There is no right amount; thoughtful within budget always beats expensive but generic."
      ),
      createFAQ(
        "Are these specific product recommendations?",
        "No. The tool generates gift ideas as starting points, not specific products. Once you have an idea you like (for example 'BBQ rub set'), search the term on John Lewis, Argos, Amazon or your favourite retailer to find specific products, compare reviews and prices. The tool helps you escape the blank-slate problem of not knowing where to start; it does not replace the actual shopping decision."
      ),
    ],
    relatedTools: [
      { slug: "mothers-day-gift-idea-generator", label: "Mother's Day Gift Idea Generator" },
      { slug: "christmas-gift-budget-tracker", label: "Christmas Gift Budget Tracker" },
      { slug: "when-is-fathers-day", label: "When Is Father's Day?" },
    ],
  },

  "halloween-costume-idea-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Generator Picks Your Costume",
        "Pick an age band (toddler 2-4, child 5-10, teen 11-18 or adult), a DIY budget tier (free using what you have, low under £10, medium under £30) and how many ideas you want back (3, 5 or 10). The tool shuffles its database of about 42 age-appropriate costumes and returns the requested number, each with a difficulty rating (Easy, Medium, Hard) and a materials list. The 'free' filter only returns Easy-difficulty ideas you can almost certainly assemble from clothes already in the wardrobe.",
        "What this is not: a curated shopping list. The materials column tells you what you need (white sheet, black marker, cotton wool, witch hat) so you can assess on the spot whether you have it or need a quick supermarket run. Most of the Easy tier costumes are genuinely buildable from items already in the house plus one £2 to £5 prop from Tesco, Asda or a Pound Shop. The Medium and Hard tiers usually need 1 to 3 items from a costume shop or Amazon, ordered at least a week before Halloween."
      ),
      createAnswerFirstSection(
        "The Real Halloween Timing You Need to Know",
        "Halloween is 31 October every year. Costume shopping in the UK typically peaks in the second to third week of October, by which point most popular sized costumes (especially in childrenswear) are sold out at the cheaper end. If you are leaving it until the last week, the tool's free and low-budget filters become essential. A black hoodie, a white face paint stick from Boots and a glow-stick prop turn into a passable ghost or skeleton in 20 minutes.",
        "Schools and nurseries often run dress-up days in the week leading up to Halloween, not on Halloween itself, so check the actual date you need the costume for. If you are also planning the trick-or-treat route or a Halloween party, [Halloween Scavenger Hunt](/halloween-scavenger-hunt) generates indoor and outdoor scavenger hunt cards that pair well with a costumed kids' party. For a digital photo-booth costume preview rather than a generator, [Halloween Costume Generator](/halloween-costume-generator) is the alternative tool."
      ),
      createAnswerFirstSection(
        "Safety, Sensitivity and the Group Costume Question",
        "Halloween costumes for small children should pass the basic safety checks: no trip-hazard hems, no masks that block peripheral vision (face paint is safer if they will be near roads), reflective tape or torches if you are out trick-or-treating after sunset (which on 31 October is around 4.45pm in the UK). Avoid anything labelled 'flame-retardant' as a marketing word without an EN71 safety certification mark; the BSI standard is the one that actually matters for kids' costumes around candles and pumpkins.",
        "On group or family costumes, the tool has a 'group costume matching theme' checkbox that flags ideas that work as a family or pair (Frankenstein and his bride, vampire and bat, witch and black cat). For larger groups (4 plus), pick a single theme like 'horror movie characters' or 'Victorian gothic' and let each person pick their own variation rather than trying to coordinate identical outfits. The cohesion comes from the theme; the variation makes the photos look better."
      ),
    ],
    faqs: [
      createFAQ(
        "When is Halloween 2026?",
        "Halloween is on Saturday 31 October 2026. The date never moves, it is fixed to All Hallows' Eve, the night before the Christian feast of All Saints' Day on 1 November. Most trick-or-treating and Halloween parties take place on the evening of 31 October itself, with the heaviest doorstep traffic between 5pm and 8pm in UK residential streets."
      ),
      createFAQ(
        "What are the easiest DIY Halloween costumes?",
        "The classic Easy-tier costumes you can build from clothes already in the house: ghost (white sheet plus marker), black cat (all-black clothes plus felt ears and face-paint whiskers), pirate (striped top, eye patch, bandana), zombie (old clothes, grey face paint, fake blood). Tick the 'free' budget option in the tool for these. They take 15 to 30 minutes to put together and look surprisingly good in photos."
      ),
      createFAQ(
        "How much do Halloween costumes typically cost in the UK?",
        "A ready-made supermarket children's Halloween costume from Asda, Tesco or Sainsbury's runs £8 to £20. A specialist costume shop child's costume runs £20 to £45. Adult ready-made costumes are £20 to £60. DIY costumes from items already in the house plus one or two cheap props can come in at £0 to £8. The tool's budget filter helps you stay in your range without scrolling past unaffordable options."
      ),
      createFAQ(
        "Are these costume ideas suitable for school dress-up days?",
        "Most are, but check your school's policy. Many UK primary schools either ban or limit overtly scary or gory costumes (zombies with fake blood, anything with weapons), so the toddler and child age tiers in this tool skew toward the cuter or more imaginative options (pumpkin, ladybird, superhero, witch). Teen and adult tiers include scarier options. Filter to age-appropriate only and avoid anything with masks for under-7s if the dress-up day is in school hours."
      ),
    ],
    relatedTools: [
      { slug: "halloween-scavenger-hunt", label: "Halloween Scavenger Hunt" },
      { slug: "halloween-costume-generator", label: "Halloween Costume Generator" },
      { slug: "when-is-halloween", label: "When Is Halloween?" },
    ],
  },

  "mothers-day-gift-idea-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Suggestions Work",
        "The tool draws from a curated list of about 40 gift ideas across 5 interest categories (cooking, gardening, reading, fitness, spa and wellness) crossed with 4 budget tiers (under £10, £10 to £25, £25 to £50, £50 plus). Tick the interests that match your mum and pick the budget that fits, and the tool returns one suggestion per interest. Generate again to shuffle a different idea from the same categories.",
        "Be honest about what your mum actually likes rather than what would be a 'safe' gift. The most-given UK Mother's Day gifts are flowers, chocolates and a card, in that order, which is fine but is also why everyone's mother ends up with a vase of supermarket roses on the same Sunday in March. The tool exists to push you past the default. If she has not picked up a knitting needle in 15 years, do not tick crafts. If she would genuinely use a yoga mat carrier, do."
      ),
      createAnswerFirstSection(
        "When UK Mother's Day Falls and Why It Is Different",
        "UK Mother's Day, properly called Mothering Sunday, is the fourth Sunday of Lent, which is always 3 weeks before Easter Sunday. It moves every year. In 2026 it falls on Sunday 15 March, in 2027 on Sunday 14 March, in 2028 on Sunday 19 March. This is genuinely different from the US Mother's Day, which is always the second Sunday of May. If you are buying a card or flower delivery from a US-based site, double-check the date you are selecting at checkout. For UK details and a live countdown, see [When Is Mother's Day UK?](/when-is-mothers-day-uk).",
        "Last delivery dates for UK Mother's Day are tight. Most online flower delivery services have a midweek cut-off (usually Wednesday or Thursday for the Sunday) for guaranteed Mother's Day delivery. Personalised gifts (engraved jewellery, photo books, custom prints) need 7 to 10 days. Order by the first weekend of March to be safe. The 'last 48 hours' panic gifts from supermarkets always sell out by Saturday lunchtime."
      ),
    ],
    faqs: [
      createFAQ(
        "When is Mother's Day in the UK?",
        "UK Mother's Day, also called Mothering Sunday, falls on the fourth Sunday of Lent. The exact date moves every year because Lent is tied to Easter. In 2026 it is Sunday 15 March. In 2027 it is Sunday 14 March. This is several weeks earlier than the US Mother's Day, which is always the second Sunday of May."
      ),
      createFAQ(
        "What are the most popular Mother's Day gifts in the UK?",
        "UK retailer surveys consistently rank flowers, chocolates, a card, jewellery, a personalised photo gift, a spa or afternoon tea voucher, a candle or home fragrance, a book, and a meal out as the top 10. Average spend per person is around £30 to £40. The tool's interest filters help push you past the default flowers-and-chocolates combo if you want something more specific."
      ),
      createFAQ(
        "Are these tool suggestions actual products to buy?",
        "No. The tool generates ideas as starting points. Once you have an idea you like (for example 'spa voucher'), search for specific spa providers in your mum's area (Champneys, local hotel spas, Treatwell), or for gift cards on the major spa retailers' websites. The tool helps you escape the blank-slate problem; it does not replace the actual shopping decision or know what your mum already owns."
      ),
      createFAQ(
        "What can I make for Mother's Day instead of buying a gift?",
        "Genuinely thoughtful homemade gifts: a printed photo book of family pictures from the last year (Snapfish, Photobox), a handwritten letter listing things you appreciate about her, a hand-painted mug or plant pot, a batch of her favourite biscuits, breakfast in bed cooked from scratch. Most mothers value the time and thought far more than the price tag; the tool's gift suggestions also work as starting points for handmade versions."
      ),
    ],
    relatedTools: [
      { slug: "fathers-day-gift-idea-generator", label: "Father's Day Gift Idea Generator" },
      { slug: "when-is-mothers-day-uk", label: "When Is Mother's Day UK?" },
      { slug: "christmas-gift-budget-tracker", label: "Christmas Gift Budget Tracker" },
    ],
  },

  "new-year-countdown": {
    sections: [
      createAnswerFirstSection(
        "Counting Down to 1 January, in Real Time",
        "The countdown ticks down to midnight on 1 January in your local browser timezone, in days, hours, minutes and seconds. Once midnight passes, the page automatically rolls forwards to the next 1 January, so this URL works year-round without manual updates. The year-progress bar underneath shows how much of the current calendar year has actually elapsed: by 31 December at 11pm, the bar is at 99.97%, which is a useful gut-check for the 'where did the year go' feeling everyone gets the week between Christmas and New Year.",
        "The countdown updates every second, so if you have it on a screen at a New Year's Eve party, the final 60 seconds genuinely tick down in front of guests with the seconds counter. Most people use the tool one of two ways: either as a year-round 'how much of this year is left' check (especially in November and December when goal-tracking gets serious), or as a New Year's Eve party display in the final hours."
      ),
      createAnswerFirstSection(
        "What 'Year Progress' Actually Means and Why It Helps",
        "The progress bar uses the days-elapsed-divided-by-days-in-the-year calculation. By 30 June, the bar shows roughly 50%. By 1 October, it is at 75%. By Bonfire Night, 85%. The bar is more than a curiosity; it is one of the genuinely effective ways to motivate a goal-track refresh. Looking at '78% of this year is gone' in early October triggers more honest planning than a vague 'still loads of time' feeling.",
        "If you are setting goals or resolutions for the year ahead, the [New Year Resolution Generator](/new-year-resolution-generator) gives you ideas across health, career, finance and personal categories, and the [Habit Tracker](/habit-tracker) is the longer-term tool to actually keep them going past mid-February (when most resolutions die). The countdown itself is the moment-of-impact tool: pin it on the screen on New Year's Eve, watch the seconds drop, kiss whoever is nearest at midnight."
      ),
    ],
    faqs: [
      createFAQ(
        "When is New Year 2027?",
        "New Year's Day 2027 is Friday 1 January 2027, with New Year's Eve on Thursday 31 December 2026. UK pubs and restaurants typically run a 'New Year's Eve menu' on 31 December and a quieter 'New Year's Day lunch' on 1 January, with most central London transport running a free service from around 11pm on 31 December until 4am on 1 January."
      ),
      createFAQ(
        "How long until midnight on New Year's Eve?",
        "The countdown at the top of this page updates in real time and shows the exact figure in days, hours, minutes and seconds. It uses your local browser timezone, so if you are in the UK it counts down to midnight UK time; if you are in another country, it counts down to midnight in your zone. For a multi-timezone party display (for example tracking when New Year hits Sydney, then Tokyo, then London, then New York), use a separate timezone-aware tool."
      ),
      createFAQ(
        "Is New Year's Day a UK bank holiday?",
        "Yes. 1 January is a statutory bank holiday across England, Wales, Scotland and Northern Ireland. Scotland also has 2 January as a bank holiday (a uniquely Scottish two-day Hogmanay tradition). If 1 January falls on a weekend, the bank holiday substitute day is the following Monday everywhere except Scotland, where 1 and 2 January get separate substitute days."
      ),
      createFAQ(
        "Why does this countdown automatically reset after midnight?",
        "Once 1 January passes, the tool automatically calculates the countdown to the next 1 January (358 to 360 days away depending on the year). This means the same URL works year-round without any manual updates, and the page is genuinely evergreen. There is no separate 'next year' page to switch to; the same countdown carries you straight from the previous year's New Year right into the run-up for the following one."
      ),
    ],
    relatedTools: [
      { slug: "new-year-resolution-generator", label: "New Year Resolution Generator" },
      { slug: "habit-tracker", label: "Habit Tracker" },
      { slug: "christmas-countdown", label: "Christmas Countdown" },
    ],
  },

  "new-year-resolution-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Generator Picks Resolutions",
        "Pick one or more of five life areas (health, career, relationships, finance, hobbies) and a difficulty band (easy, medium, ambitious), then click generate. The tool pulls one resolution from each chosen category at the chosen level, so selecting all five at medium gives you a balanced set of five goals to consider. The 'easy' tier is small daily habits like drink eight glasses of water or call a friend weekly; the 'ambitious' tier covers stretch goals like running a half-marathon or becoming completely debt-free.",
        "Hit regenerate as many times as you like; the database has roughly 25 entries per category-and-difficulty bucket so a fresh combination appears each click. Tick the boxes next to the ones you actually want to commit to. The most useful workflow is to generate three or four sets, then pick two or three resolutions total - one big and one or two small. Research from psychologist Richard Wiseman's UK resolution study found people who picked one specific goal succeeded 35 percent of the time; people who picked five or more succeeded only 6 percent."
      ),
      createAnswerFirstSection(
        "Why Most Resolutions Fail by Mid-February",
        "Strava data shows roughly 80 percent of New Year resolutions are abandoned by 17 January, the day they nicknamed 'Quitter's Day'. The two big causes are vagueness (\"get fit\" with no defined behaviour) and overload (six resolutions on 1 January, none of them survive February). The fix is the SMART format: specific, measurable, achievable, relevant, time-bound. \"Walk 10,000 steps four days a week\" beats \"get fitter\". \"Save £100 a month into a savings account\" beats \"save more money\".",
        "Once you have your shortlist, pair it with a tracking habit. The [Habit Tracker](/habit-tracker) is built for daily ticks across multiple goals; the [New Year Countdown](/new-year-countdown) and the [Year Progress Tracker](/year-progress-tracker) let you see how much of the year is left when motivation flags around February. Research from University College London suggests a new behaviour takes around 66 days on average to become automatic, so the Quitter's Day cliff is exactly when willpower needs the most external scaffolding."
      ),
    ],
    faqs: [
      createFAQ(
        "When is the best time to make New Year resolutions?",
        "Late December through the first week of January is the most common window, but the science says any 'fresh start' moment works: birthdays, the Monday after a holiday, the start of a new month. Behavioural researchers call this the 'fresh start effect'. If you missed 1 January, do not wait a full year - the second-best moment is now."
      ),
      createFAQ(
        "How many resolutions should I set?",
        "One to three. Beyond three, success rates drop sharply because each goal competes for the same pool of attention and willpower. A common pattern that works well is one big stretch goal (the ambitious tier in this generator), one supportive habit (something easy that makes the big goal easier, like better sleep), and one social or relationship goal."
      ),
      createFAQ(
        "What are the most popular New Year resolutions in the UK?",
        "The Statista 2026 UK resolution survey ranks them roughly in this order: exercise more, save money, eat healthier, lose weight, learn a new skill, travel more, spend more time with family, read more, drink less alcohol, get a new job. Health and finance dominate the top half every year."
      ),
      createFAQ(
        "Why do I keep failing my resolutions?",
        "Three usual culprits: the goal is too vague (rewrite it as a specific weekly behaviour), the goal is too big (break it into a 30-day starter version), or there is no system to support it (no calendar reminder, no tracker, no accountability partner). The generator gives you the goal; the system around it is what carries it past Quitter's Day."
      ),
    ],
    relatedTools: [
      { slug: "habit-tracker", label: "Habit Tracker" },
      { slug: "new-year-countdown", label: "New Year Countdown" },
      { slug: "year-progress-tracker", label: "Year Progress Tracker" },
    ],
  },

  "super-bowl-countdown": {
    sections: [
      createAnswerFirstSection(
        "When Is the Next Super Bowl",
        "Super Bowl LXI is on Sunday 7 February 2027, with kickoff scheduled for 6:30 pm Eastern, which is 11:30 pm UK time on the Sunday night and 4:30 am UK time into the early hours of Monday morning. Super Bowl LX was already played on 1 February 2026, with the Philadelphia Eagles defeating the Kansas City Chiefs at Levi's Stadium. The countdown on this page automatically rolls forward to the next first-Sunday-of-February as soon as the current game finishes, so the URL is evergreen and you do not have to switch pages year on year.",
        "If you are watching from the UK, the practical setup is to nap on the Sunday afternoon, eat dinner at 8 or 9 pm, then settle in around 11 pm for the build-up. Kickoff is 11:30 pm UK; the game itself runs to roughly 3 am with the halftime show landing around 1 am. ITV typically broadcasts the BBC Sports / Sky Sports coverage; subscribers also get NFL Game Pass and DAZN streaming. The countdown shows local kickoff in your browser timezone, so visitors in Sydney see Monday morning kickoff, Mumbai sees Monday breakfast time, and so on."
      ),
      createAnswerFirstSection(
        "Planning a Super Bowl Party from the UK",
        "Three things separate a good UK Super Bowl party from a tired one. First, ignore the dip-and-wing American party stereotype: bring out the food at halftime, not at kickoff, because the first quarter is when commitment is tested and people who arrive late miss less. Second, accept that most of your guests will not understand the rules; a printed one-page explainer of \"first downs and four downs\" plus \"red zone scoring\" is enough to keep them engaged. Third, run a free squares pool: a 10x10 grid where each square gets randomly assigned numbers 0-9 for each team's last digit at the end of each quarter, with the four winners taking a small prize per quarter.",
        "Food: chicken wings, nachos with melted cheese, pulled-pork sliders, and pizza scale to any group size. Drinks: budget around 3 units per adult across 4 hours since the game is long. The halftime show usually delivers around 1 am UK time, which is when everyone perks up; have your snack restock ready for that moment. The [US Election Countdown](/us-election-countdown) covers the other major US event UK followers tune into; the [Christmas Countdown](/christmas-countdown) is the headline winter countdown if you are stacking party planning across the season."
      ),
    ],
    faqs: [
      createFAQ(
        "What time is Super Bowl 2027 in the UK?",
        "Super Bowl LXI on Sunday 7 February 2027 has kickoff at 6:30 pm Eastern, which is 11:30 pm UK time. The game runs around 3.5 hours including the halftime show, so expect it to finish near 3 am UK Monday morning. Set your recording device if you cannot stay up; many UK viewers watch the recording over Monday evening to avoid spoilers on social media."
      ),
      createFAQ(
        "Where can I watch the Super Bowl in the UK?",
        "ITV1 typically airs free-to-air coverage from late Sunday evening; Sky Sports holds the premium rights and runs the build-up shows. NFL Game Pass and DAZN both offer streaming, and the official NFL app provides condensed game replays. Pubs in larger UK cities (especially central London, Manchester and Edinburgh) often run dedicated late-night Super Bowl screenings."
      ),
      createFAQ(
        "Is the Super Bowl always on a Sunday?",
        "Yes. Since 1967 every Super Bowl has been on a Sunday in late January or early February. The NFL moved it to the first Sunday in February in 2004 and shifted it to a slightly later first Sunday in 2022 to extend the regular season to 17 games. The countdown automatically targets that first February Sunday; it does not need to be updated."
      ),
      createFAQ(
        "Why does the countdown reset right after kickoff?",
        "Once the current Super Bowl date passes, the tool calculates days until the following year's first-Sunday-of-February match. This is roughly 364 days at first, dropping each day. The behaviour mirrors the [New Year Countdown](/new-year-countdown) and [Christmas Countdown](/christmas-countdown): one URL, evergreen, no manual switching."
      ),
    ],
    relatedTools: [
      { slug: "when-is-super-bowl", label: "When Is the Super Bowl?" },
      { slug: "us-election-countdown", label: "US Election Countdown" },
      { slug: "christmas-countdown", label: "Christmas Countdown" },
    ],
  },

  "when-is-autumn-equinox": {
    sections: [
      createAnswerFirstSection(
        "When the Autumn Equinox Falls",
        "The autumn (autumnal) equinox in 2026 is on Tuesday 22 September. In 2027 it falls on Thursday 23 September, in 2028 again on 22 September, and the date oscillates between 22 and 23 September because the Earth's orbit is 365.25 days long while the calendar uses 365 (with a leap correction every four years). The exact astronomical moment is when the sun crosses the celestial equator heading south; from the UK that is roughly 11:23 am BST on 22 September 2026, but the calendar date is what matters for everyday use.",
        "The equinox marks the astronomical first day of autumn in the Northern Hemisphere. Day and night are not exactly equal: 'equinox' means equal night, but the actual date when day and night last 12 hours each is a few days later (called the equilux), because the sun's disc has a visible diameter and atmospheric refraction bends light around the horizon. From the equinox onwards, days shorten until the [Winter Solstice](/when-is-winter-solstice) in late December, then start lengthening again."
      ),
      createAnswerFirstSection(
        "How People Mark the Equinox",
        "The pagan festival Mabon falls on the autumn equinox and traditionally celebrates the second harvest of fruit, grain and the start of the wine pressing season. Stonehenge holds free public access for the equinox sunrise; English Heritage typically opens the inner stone circle from around 4:30 am to 7:30 am for druid and Wiccan ceremonies, with several thousand visitors most years. In Japan, the equinox is a national holiday called Shubun no Hi; families visit graves to honour ancestors. In the southern hemisphere this is the spring equinox, so the same date marks opposite seasons depending on latitude.",
        "Practical effect for UK life: the equinox is when people start commuting home in dusk, which raises road accident rates noticeably (Department for Transport data shows a 6 to 10 percent uplift in pedestrian collisions in the fortnight after the equinox). British Summer Time does not end until the last Sunday of October, so the clocks-back relief comes around five weeks after the equinox itself. If you garden, this is when to plant spring bulbs (daffodils, tulips, crocus) and lift dahlia tubers in colder regions."
      ),
    ],
    faqs: [
      createFAQ(
        "What date is the autumn equinox 2026?",
        "Tuesday 22 September 2026. In 2027 it shifts to Thursday 23 September, then back to Wednesday 22 September in 2028. The date moves between 22 and 23 September because the calendar year is 365 days while the actual orbital year is 365.25 days; leap years partially correct the drift but a small wobble remains."
      ),
      createFAQ(
        "Are day and night really equal at the equinox?",
        "Almost but not quite. 'Equinox' means equal night, and the geometric definition (sun directly above the equator) gives 12 hours of daylight in theory. In practice, atmospheric refraction lets us see the sun a few minutes before it geometrically rises and after it sets, and the sun's disc takes time to cross the horizon. The actual 12-hour day is a few days after the equinox, called the equilux."
      ),
      createFAQ(
        "Is the autumn equinox the first day of autumn?",
        "It is the astronomical first day of autumn in the Northern Hemisphere. The Met Office and most UK climatologists use a different definition: meteorological autumn runs 1 September to 30 November, simply because that gives full calendar months and easier statistics. So depending on which definition you use, autumn starts in early September or in late September."
      ),
      createFAQ(
        "When does British Summer Time end after the equinox?",
        "BST ends at 2 am on the last Sunday of October every year. In 2026 that is 25 October. In 2027 it is 31 October. The clocks go back one hour, so 2 am becomes 1 am, giving most people an extra hour of sleep that night. From the equinox to the clock change is roughly five weeks; daylight in the UK shrinks by around 4 minutes per day across that window."
      ),
    ],
    relatedTools: [
      { slug: "when-is-spring-equinox", label: "When Is the Spring Equinox?" },
      { slug: "when-is-winter-solstice", label: "When Is the Winter Solstice?" },
      { slug: "when-is-halloween", label: "When Is Halloween?" },
    ],
  },

  "when-is-chinese-new-year": {
    sections: [
      createAnswerFirstSection(
        "When Chinese New Year Falls",
        "Chinese New Year 2026 is Tuesday 17 February, which begins the Year of the Horse (Bing Wu in the sexagenary cycle). Chinese New Year 2027 is Saturday 6 March, the Year of the Sheep (or Goat - both translations are used). The date moves dramatically year to year because Chinese New Year follows the lunisolar calendar: the first day of the new lunar month closest to lichun (the start of spring), so it always falls between 21 January and 20 February. Chinese New Year 2028 returns to 26 January as a Year of the Monkey.",
        "The 12 zodiac animals cycle in a fixed order (rat, ox, tiger, rabbit, dragon, snake, horse, sheep, monkey, rooster, dog, pig). Each is paired with one of five elements (wood, fire, earth, metal, water) on a 60-year cycle, so a full Year of the Horse repeats only once every 60 years. People born in 2026 are Fire Horses, said in tradition to be passionate, energetic and slightly headstrong. The countdown on this page automatically rolls forward; once 17 February 2026 passes, it shifts to 6 March 2027 without manual updates."
      ),
      createAnswerFirstSection(
        "How Chinese New Year Is Celebrated",
        "Celebrations span 15 days, ending with the Lantern Festival. The Spring Festival itself centres on the Reunion Dinner on New Year's Eve - extended families gather, often travelling huge distances; the annual chunyun migration in mainland China is the largest annual human migration in the world, with three billion individual journeys taken in the 40-day window. Traditional dishes carry symbolic meaning: fish (yu) sounds like 'surplus' so eating it brings abundance, dumplings (jiaozi) shaped like ancient gold ingots bring wealth, niangao (sticky rice cake) means 'higher year' meaning growth.",
        "Outside mainland China, major celebrations happen in London (Trafalgar Square parade and Soho fireworks), Manchester (Chinatown lion dance), San Francisco, Sydney and Singapore. Red is everywhere - red lanterns, red couplets on doors, red envelopes (hongbao or lai see) of cash given to children and unmarried adults from married relatives. The colour is believed to scare away the mythical beast Nian, which is also where the word for new year (xinnian) comes from. The [When Is Diwali](/when-is-diwali) tool covers the other major lunar-calendar festival; the [When Is Easter](/when-is-easter) tool covers the Christian moveable feast that uses similar lunar logic."
      ),
    ],
    faqs: [
      createFAQ(
        "What date is Chinese New Year 2026?",
        "Tuesday 17 February 2026, the Year of the Horse. The 15-day celebration runs to the Lantern Festival on Tuesday 3 March 2026. UK celebrations cluster on the closest weekend, so the main London Chinatown parade typically falls on Sunday 22 February 2026."
      ),
      createFAQ(
        "What zodiac animal is 2026?",
        "2026 is the Year of the Horse, more specifically the Fire Horse year (Bing Wu in the Chinese sexagenary cycle). People born during 17 February 2026 to 5 February 2027 are Fire Horses. The previous Fire Horse year was 1966, and the next will be 2086. The full element-animal pairing repeats every 60 years."
      ),
      createFAQ(
        "Why does the Chinese New Year date change?",
        "The Chinese calendar is lunisolar, meaning months follow the moon's cycles (around 29.5 days each) but the year stays roughly aligned with the sun by adding a 13th leap month every two or three years. Chinese New Year is the first new moon between 21 January and 20 February, so the date shifts each year within that window."
      ),
      createFAQ(
        "How many people celebrate Chinese New Year?",
        "More than 1.5 billion people worldwide. Mainland China gives a 7-day public holiday; Hong Kong, Macau, Singapore, Malaysia, Indonesia, Vietnam (Tet), Philippines, Brunei, Mauritius and others all observe it as a public holiday. The UK Chinese diaspora of around 400,000 people drives major weekend celebrations in London, Manchester, Birmingham and Liverpool."
      ),
    ],
    relatedTools: [
      { slug: "when-is-diwali", label: "When Is Diwali?" },
      { slug: "when-is-new-year", label: "When Is New Year?" },
      { slug: "chinese-zodiac-calculator", label: "Chinese Zodiac Calculator" },
    ],
  },

  "when-is-christmas": {
    sections: [
      createAnswerFirstSection(
        "When Christmas Day Falls",
        "Christmas Day is always 25 December, every year, no exceptions. In 2026 it lands on Friday 25 December, which produces the long-awaited four-day weekend (Christmas Day Friday, Boxing Day Saturday, Sunday 27 December, then the Boxing Day substitute bank holiday on Monday 28 December). In 2027 Christmas Day falls on Saturday 25 December, with the substitute bank holiday rolling forward to Monday 27 December. In 2028 Christmas is on a Monday, the most disruptive day for retailers because there is no rollover holiday at all.",
        "The countdown ticks down to midnight on Christmas Day in your local browser timezone, so a UK user sees the time until midnight UK on 24 December into 25 December, while an Australian visitor sees the time until midnight Sydney on the same date (which is 11 hours ahead of UK in Australian summer). After Christmas Day passes, the countdown automatically rolls forward to the following 25 December without any manual page updates. The same evergreen logic powers the [Christmas Countdown](/christmas-countdown) tool, which is the more visual party-display version."
      ),
      createAnswerFirstSection(
        "What Day of the Week Christmas Falls On",
        "The day of the week shifts each year because 365 is not divisible by 7. Each non-leap year shifts Christmas by one day; each leap year shifts it by two. So 2025 was Thursday, 2026 is Friday, 2027 is Saturday, 2028 is Monday (skipping Sunday because 2028 is a leap year), 2029 is Tuesday. The 'Christmas-on-a-weekend' years (2027 Saturday, 2032 Saturday, 2033 Sunday) are the most disruptive for the retail and hospitality calendar because hospitality bookings collapse around weekend Christmases.",
        "There is a useful party trivia fact: Christmas Day cannot fall on a Friday more than once in a row, but it falls on a Friday three times in any 28-year cycle (the cycle of leap years repeats every 28 years before drift). 2026's Friday Christmas was the first since 2020, and the next will be 2037. If you are planning a wedding in late December and want to avoid the Christmas-week chaos, look at non-Friday years: 2028, 2029, 2030 are all weekday Christmases that absorb less hospitality."
      ),
    ],
    faqs: [
      createFAQ(
        "What day is Christmas Day 2026?",
        "Friday 25 December 2026. Boxing Day on Saturday 26 December gets a substitute bank holiday on Monday 28 December because Boxing Day fell on a Saturday. So the bank holiday weekend is Friday 25th, Monday 28th, with most workplaces closed for at least four days; many take the full week off."
      ),
      createFAQ(
        "When does the Christmas countdown reset?",
        "Immediately after midnight on 25 December passes in your local timezone, the countdown switches to the following 25 December (about 365 days). This means the URL is evergreen and you do not need to navigate to a different page each year. The same logic applies to [New Year Countdown](/new-year-countdown) and [Christmas Countdown](/christmas-countdown)."
      ),
      createFAQ(
        "Is Christmas always on 25 December?",
        "In Western Christianity (Catholic, Anglican, most Protestant), yes - 25 December every year. Eastern Orthodox churches that follow the Julian calendar celebrate Christmas on 7 January in the Gregorian calendar. Russia, Serbia, Ethiopia and most of Greece (some churches) observe 7 January as Christmas; everywhere else uses 25 December."
      ),
      createFAQ(
        "How many days until Christmas?",
        "The live counter at the top of this page shows the exact figure in days, hours, minutes and seconds. From a typical 1 January it is 358 days; from 1 October it is 85 days; from 1 December it is 24 days. The counter updates every second so during the final hour on Christmas Eve you can watch the seconds tick down."
      ),
    ],
    relatedTools: [
      { slug: "christmas-countdown", label: "Christmas Countdown" },
      { slug: "christmas-dinner-planner", label: "Christmas Dinner Planner" },
      { slug: "christmas-gift-budget-tracker", label: "Christmas Gift Budget Tracker" },
    ],
  },

  "when-is-new-year": {
    sections: [
      createAnswerFirstSection(
        "When New Year's Day Falls",
        "New Year's Day is always 1 January, every year. In the upcoming cycle: 1 January 2026 is a Thursday, 1 January 2027 is a Friday, 1 January 2028 is a Saturday (with a substitute bank holiday on Monday 3 January), 1 January 2029 is a Monday, 1 January 2030 is a Tuesday. New Year's Eve is the night before, ending at midnight when the countdown on this page hits zero and rolls forward to the next 1 January.",
        "The countdown updates every second using your local browser timezone. If you are in the UK on New Year's Eve, the counter shows midnight UK; in Sydney it shows midnight Sydney; New York gets midnight Eastern; and so on. Major broadcasters around the world pick up the BBC's London midnight (the Big Ben chimes have been broadcast on radio every New Year's Eve since 1924, with limited exceptions during the Second World War). For watching the global wave, there are dedicated multi-timezone countdown displays that show Sydney first (12 noon UK time), then Tokyo, Hong Kong, Mumbai, London, New York, Honolulu - 24 separate midnights in 24 hours."
      ),
      createAnswerFirstSection(
        "New Year Traditions Around the World",
        "Every culture has midnight rituals worth knowing if you are hosting a mixed crowd. In Spain, you eat 12 grapes - one with each chime of midnight - for luck in each month of the year. In Japan, 108 temple bells are rung to cleanse 108 worldly desires; bowls of toshikoshi soba (year-crossing noodles) are eaten just before midnight. In Scotland, Hogmanay involves first-footing: the first person to enter your home after midnight should ideally be a tall dark man bringing coal, salt, shortbread and whisky. In Denmark, people jump off chairs at midnight to 'leap into' the new year.",
        "The most-photographed midnight is New York's Times Square ball drop, which lowers a 6-tonne crystal-covered ball at 11:59 pm EST (4:59 am UK time). London's official fireworks at the South Bank, broadcast on BBC One, run roughly 11 minutes from midnight and cost the London Mayor's office around £2.5 million annually. If you have set goals for the new year, the [New Year Resolution Generator](/new-year-resolution-generator) gives you a starting set across health, career, finance and personal categories; the [Habit Tracker](/habit-tracker) keeps them alive past Quitter's Day in mid-January."
      ),
    ],
    faqs: [
      createFAQ(
        "What day is New Year's Day 2027?",
        "Friday 1 January 2027, with New Year's Eve on Thursday 31 December 2026. UK pubs and restaurants run a New Year's Eve menu on the Thursday and a quieter New Year's Day lunch on the Friday. The bank holiday is Friday 1 January, so most workplaces close from Thursday 31 December lunchtime."
      ),
      createFAQ(
        "Is New Year's Day always 1 January?",
        "In every Gregorian-calendar country, yes. Some traditions celebrate a separate cultural new year on a different date: Chinese New Year (late January or February), Persian Nowruz (around 21 March), Diwali (October or November), Rosh Hashanah (September or October). The civil calendar new year is universally 1 January for legal and administrative purposes."
      ),
      createFAQ(
        "What is Hogmanay?",
        "Hogmanay is the Scottish name for New Year's Eve and New Year's Day, marked by first-footing, fireworks, ceilidhs and the singing of Auld Lang Syne. Edinburgh's Hogmanay party draws around 75,000 people and runs for three days, with a torchlight procession on 30 December and the main street party on 31 December. Scotland uniquely has both 1 and 2 January as bank holidays."
      ),
      createFAQ(
        "Is New Year's Day a UK bank holiday?",
        "Yes. 1 January is a statutory bank holiday across England, Wales, Scotland and Northern Ireland. If 1 January falls on a Saturday or Sunday, a substitute bank holiday is given on the following Monday everywhere except Scotland, which observes both 1 and 2 January separately and gets full substitute days for each."
      ),
    ],
    relatedTools: [
      { slug: "new-year-countdown", label: "New Year Countdown" },
      { slug: "new-year-resolution-generator", label: "New Year Resolution Generator" },
      { slug: "when-is-chinese-new-year", label: "When Is Chinese New Year?" },
    ],
  },

  "when-is-spring-equinox": {
    sections: [
      createAnswerFirstSection(
        "When the Spring Equinox Falls",
        "The spring equinox (also called the vernal equinox or March equinox) in 2026 is on Friday 20 March. In 2027 it is Saturday 20 March, in 2028 again Monday 20 March. The date barely moves between 19 and 21 March because of the leap-year correction; 20 March is by far the most common date in the modern era. The exact astronomical moment of the 2026 equinox is roughly 14:46 GMT (still UTC because British Summer Time has not yet started), the instant the sun crosses the celestial equator heading north.",
        "This is the astronomical first day of spring in the Northern Hemisphere. From this date, days are longer than nights until the [Autumn Equinox](/when-is-autumn-equinox) in late September. Day length increases by roughly 4 minutes per day in the UK around the equinox, the fastest rate of any time of year. By 1 May, sunset in London is past 8:30 pm. British Summer Time begins at 1 am on the last Sunday of March (29 March 2026), nine days after the equinox; the clocks go forward, so the evening lightens immediately."
      ),
      createAnswerFirstSection(
        "Equinox Celebrations and Cultural Markers",
        "The pagan festival Ostara (the linguistic root of 'Easter') marks the spring equinox; Stonehenge opens for free public access at sunrise on 20 March each year, similar to the autumn equinox event. Persian New Year (Nowruz) is celebrated on the spring equinox by around 300 million people across Iran, Afghanistan, Tajikistan, Kazakhstan, Uzbekistan, Turkmenistan, Kyrgyzstan, Azerbaijan, Iraq, Turkey and the Iranian diaspora; it is a UNESCO-listed cultural heritage celebration. In Mexico, Chichen Itza draws over 50,000 visitors on the equinox to watch the sunlight cast a serpent shadow on the El Castillo pyramid steps.",
        "Practical effect for UK life: this is when daylight saving time arrives, gardens explode into life, and the football season enters its final two months. Allergy sufferers should note tree pollen counts begin climbing rapidly from the equinox onwards. The clocks-forward Saturday night is the worst sleep night of the year for night-shift and early-rising workers, but most people gain back the hour within a week. Easter usually falls within four weeks of the equinox; in 2026 Easter Sunday is 5 April, and you can use [When Is Easter](/when-is-easter) for the live count."
      ),
    ],
    faqs: [
      createFAQ(
        "What date is the spring equinox 2026?",
        "Friday 20 March 2026. In 2027 it is Saturday 20 March, in 2028 it is Monday 20 March. The date is remarkably stable on 20 March - only very rarely shifting to 19 or 21 March - because the Gregorian calendar's leap-year rules were specifically designed to keep the equinoxes locked to fixed dates."
      ),
      createFAQ(
        "Is the spring equinox the first day of spring?",
        "It is the astronomical first day of spring in the Northern Hemisphere. The Met Office uses the meteorological definition: spring runs 1 March to 31 May, simply because that gives full calendar months for statistics. Cultural and gardening definitions vary: most UK gardeners treat early March as spring; the agricultural calendar treats the first lambs (late February) as spring."
      ),
      createFAQ(
        "When does British Summer Time start after the spring equinox?",
        "BST starts at 1 am on the last Sunday of March every year. In 2026 that is Sunday 29 March 2026 (nine days after the equinox). In 2027 it is Sunday 28 March 2027. The clocks go forward one hour, so 1 am becomes 2 am, losing an hour of sleep. The combined effect of equinox plus clocks-forward is a sudden surge in evening daylight; UK sunset jumps from around 6:15 pm on the day before to roughly 7:35 pm the day after."
      ),
      createFAQ(
        "What is Nowruz?",
        "Nowruz (literally 'new day' in Persian) is the Iranian and Central Asian New Year, celebrated on the spring equinox by around 300 million people. It is a 13-day festival with traditions including the Haft-sin table (seven symbolic items beginning with the Persian letter sin), spring cleaning, family visits, and ending with Sizdah Bedar - a public-park picnic on the 13th day to ward off bad luck."
      ),
    ],
    relatedTools: [
      { slug: "when-is-autumn-equinox", label: "When Is the Autumn Equinox?" },
      { slug: "when-is-summer-solstice", label: "When Is the Summer Solstice?" },
      { slug: "when-is-easter", label: "When Is Easter?" },
    ],
  },

  "when-is-summer-solstice": {
    sections: [
      createAnswerFirstSection(
        "When the Summer Solstice Falls",
        "The summer solstice in 2026 is on Sunday 21 June. In 2027 it is Monday 21 June, in 2028 Tuesday 20 June (a leap-year shift), in 2029 Thursday 21 June. The date oscillates between 20 and 21 June because of the calendar drift that leap years partially correct. The exact astronomical moment for 2026 is around 9:23 am BST on 21 June, the instant the sun reaches its highest point in the sky in the Northern Hemisphere.",
        "This is the longest day of the year. London gets approximately 16 hours and 38 minutes of daylight on the solstice, with sunrise at 4:43 am BST and sunset at 9:21 pm BST. Edinburgh gets around 17 hours 35 minutes; Lerwick (Shetland) gets 18 hours 55 minutes plus civil twilight that means it never gets fully dark in Shetland in late June (the locals call this the 'simmer dim'). The solstice also marks the astronomical first day of summer in the Northern Hemisphere; from this date, days shorten until the [Winter Solstice](/when-is-winter-solstice) in late December."
      ),
      createAnswerFirstSection(
        "Stonehenge, Festivals and What People Do",
        "Around 30,000 to 40,000 people gather at Stonehenge for the summer solstice sunrise each year. English Heritage opens the inner stone circle from approximately 7 pm on 20 June through to 8 am on 21 June (the longest free-access window of any solstice or equinox event), with druid and pagan ceremonies running through the night. The crowd is mixed: pagans, hippies, families, and a large contingent of curious tourists. Glastonbury Festival weekend usually overlaps the solstice; in 2026 it runs 24 to 28 June with the solstice on the Sunday three days before.",
        "Across the world, Sweden's Midsummer is one of the country's biggest holidays - typically the third Friday of June - with maypole dancing, traditional foods (pickled herring, new potatoes, strawberries) and an extended bank holiday weekend. In the southern hemisphere this is the winter solstice, the shortest day of the year. Practical UK effect: 21 June onwards, you should notice slightly earlier sunsets each evening, although the change is imperceptible for the first fortnight. Hay fever sufferers see the highest grass pollen counts in the two weeks following the solstice."
      ),
    ],
    faqs: [
      createFAQ(
        "What date is the summer solstice 2026?",
        "Sunday 21 June 2026. In 2027 it is Monday 21 June, in 2028 it shifts to Tuesday 20 June (leap-year drift). The astronomical moment in 2026 is approximately 9:23 am BST, when the sun reaches its highest point in the Northern Hemisphere sky."
      ),
      createFAQ(
        "How long is the longest day of the year?",
        "London gets around 16 hours 38 minutes of daylight; Edinburgh 17 hours 35 minutes; Manchester roughly 17 hours; Lerwick (Shetland) 18 hours 55 minutes. Add civil twilight - the time when the sun is up to 6 degrees below the horizon and you can still read outside - and the practical 'usable light' is around 19 hours in central UK and effectively 24 hours in Shetland."
      ),
      createFAQ(
        "Can you really stay overnight at Stonehenge for the solstice?",
        "Yes. English Heritage runs free 'Managed Open Access' from approximately 7 pm on 20 June to 8 am on 21 June for the summer solstice. You can enter the inner stone circle, which is normally roped off. There are restrictions: no sleeping, no fires, no glass bottles, no amplified music. Free shuttle buses run from Salisbury and Amesbury; the closest car park sells out by mid-afternoon on 20 June."
      ),
      createFAQ(
        "Is the summer solstice the start of summer?",
        "It is the astronomical start of summer in the Northern Hemisphere. The Met Office definition uses meteorological seasons: summer runs 1 June to 31 August. So depending on definition, summer starts in early June or in late June. Cultural use varies; most British people treat 'midsummer' as the period around the solstice itself."
      ),
    ],
    relatedTools: [
      { slug: "when-is-winter-solstice", label: "When Is the Winter Solstice?" },
      { slug: "when-is-spring-equinox", label: "When Is the Spring Equinox?" },
      { slug: "when-is-autumn-equinox", label: "When Is the Autumn Equinox?" },
    ],
  },

  "when-is-thanksgiving": {
    sections: [
      createAnswerFirstSection(
        "When Thanksgiving Falls in the US and Canada",
        "US Thanksgiving 2026 is on Thursday 26 November. In 2027 it falls on Thursday 25 November, in 2028 Thursday 23 November. The rule is fixed: the fourth Thursday of November every year. Note that the 'fourth Thursday' is not always the last Thursday: if November starts on a Thursday or Friday, there are five Thursdays in the month, so the fourth Thursday lands on 22 or 23 November (Thanksgiving in 2018 was on 22 November for this reason).",
        "Canadian Thanksgiving is held on a different date - the second Monday of October. In 2026 that is Monday 12 October, in 2027 Monday 11 October. Canadian Thanksgiving is closer to the European harvest festival tradition and predates US Thanksgiving by several decades; the first proclaimed Canadian Thanksgiving was in 1879, declared as a federal holiday in 1957 fixed to the second Monday of October. The countdown on this page targets US Thanksgiving by default; for Canadian Thanksgiving, refer to a dedicated tool or use the [days until calculator](/days-until-calculator)."
      ),
      createAnswerFirstSection(
        "Thanksgiving Travel and Black Friday",
        "Thanksgiving is the busiest US travel period of the entire year, far exceeding Christmas. The TSA screened a record 4.7 million passengers on the Wednesday before Thanksgiving 2024, beating the all-time record set the same week in 2019. Most US workplaces close Thursday and Friday, so the four-day weekend (Thursday to Sunday) drives a massive holiday-travel surge. Roughly 49 million Americans travel by car for Thanksgiving each year, peaking on the Wednesday afternoon before and the Sunday returning home.",
        "Black Friday is the day after Thanksgiving (so Friday 27 November 2026), and it is now larger than Thanksgiving itself for retailer revenue. UK retailers fully adopted Black Friday around 2014; in 2024 UK Black Friday spending hit £8.7 billion across the long weekend. Cyber Monday follows the next Monday (30 November 2026). The [When Is Black Friday](/when-is-black-friday) tool tracks the date; the [Christmas Countdown](/christmas-countdown) is the natural next stop after Thanksgiving for both UK shoppers using Thanksgiving deals to bulk-buy presents and US households starting their Christmas decorating that weekend."
      ),
    ],
    faqs: [
      createFAQ(
        "What date is Thanksgiving 2026?",
        "US Thanksgiving 2026 is Thursday 26 November. Canadian Thanksgiving 2026 is Monday 12 October. The rule for US Thanksgiving is fixed at the fourth Thursday of November; the rule for Canadian Thanksgiving is the second Monday of October."
      ),
      createFAQ(
        "Is Thanksgiving celebrated in the UK?",
        "Not as a public holiday - the UK does not observe Thanksgiving. Some American expats living in the UK host Thanksgiving dinner on the Saturday after (29 November 2026) to fit the working calendar. A growing number of UK supermarkets now stock turkeys, pumpkin pie ingredients and cranberry sauce in the Thanksgiving week, mainly aimed at expats and curious first-timers."
      ),
      createFAQ(
        "Why is Black Friday the day after Thanksgiving?",
        "The name dates to 1960s Philadelphia police officers using 'Black Friday' to describe the chaotic shopping crowds and traffic the day after Thanksgiving. Retailers reframed it in the 1980s as the day stores 'go into the black' (move from loss to profit) for the year. The four-day weekend gives shoppers time to queue, and most US employees have the day off, so it became the largest single retail day of the year."
      ),
      createFAQ(
        "Why does Thanksgiving move dates each year?",
        "It is fixed to the fourth Thursday of November, so the calendar date moves between 22 and 28 November depending on what day of the week 1 November falls on. Until 1941 the date was the last Thursday of November (sometimes the fifth); President Roosevelt moved it to the fourth Thursday to lengthen the Christmas shopping season during the Great Depression."
      ),
    ],
    relatedTools: [
      { slug: "when-is-black-friday", label: "When Is Black Friday?" },
      { slug: "when-is-christmas", label: "When Is Christmas?" },
      { slug: "when-is-halloween", label: "When Is Halloween?" },
    ],
  },

  "when-is-valentines-day": {
    sections: [
      createAnswerFirstSection(
        "When Valentine's Day Falls",
        "Valentine's Day is always 14 February, every year, no exceptions. In 2026 it falls on Saturday 14 February, which is a strong date for the restaurant industry because couples can dine on the day itself without needing a babysitter for a school night. In 2027 it lands on Sunday 14 February (typically pushes booking peaks to Saturday 13 February). In 2028 it is Monday 14 February, traditionally the worst weekday for restaurant trading because most couples celebrate on the preceding Saturday 12 February. In 2029 it shifts to Wednesday.",
        "The day-of-the-week pattern matters more than people realise. Restaurant trade body UK Hospitality reports Valentine's bookings spike 240 percent on the closest weekend evening when Valentine's falls midweek, and only 180 percent when it falls on a weekend (because it is more concentrated on the actual day). Florists ship around 90 percent of their stems for direct delivery on 14 February if it falls on a weekday; weekend Valentine's see roughly half delivered on 14 February and half on the preceding Friday."
      ),
      createAnswerFirstSection(
        "Valentine's by the Numbers and Where the Date Comes From",
        "UK Valentine's Day spending in 2025 reached £2.1 billion (Statista), up from £1.9 billion in 2024. Average spend per person is around £40 to £45, roughly half on cards and flowers, the other half on gifts and dining. Roses dominate the flower trade: the UK imports 13 million stems in the week before 14 February, mostly from Kenya, Ethiopia and the Netherlands. Around 10 million Valentine's cards are sent in the UK each year (Greeting Card Association), and pet Valentine's spending - cards and treats for dogs and cats - now sits at £40 million annually.",
        "Saint Valentine's Day commemorates a 3rd-century Roman martyr; the romantic association came centuries later, popularised by Geoffrey Chaucer's 1382 poem Parlement of Foules referring to 14 February as a day birds chose mates. Mass-produced Valentine's cards arrived with the introduction of the Penny Post in 1840, which is why 14 February overtook other late-winter saints' days as the romantic anchor. If you are looking for inspiration in adjacent categories, the [Mother's Day Gift Idea Generator](/mothers-day-gift-idea-generator) covers the spring gifting cycle a few weeks later; the [Days Until Calculator](/days-until-calculator) is the simple counter for any custom anniversary or romantic date."
      ),
    ],
    faqs: [
      createFAQ(
        "What day is Valentine's Day 2026?",
        "Saturday 14 February 2026. In 2027 it is Sunday 14 February. In 2028 it is Monday 14 February. The date itself never changes - it is always 14 February - only the day of the week shifts year to year because 365 is not divisible by 7."
      ),
      createFAQ(
        "Is Valentine's Day always on 14 February?",
        "Yes, in every culture that observes it. Some Asian variations exist: South Korea celebrates 14 February (women give chocolate to men), 14 March 'White Day' (men give white chocolate or marshmallows back), and 14 April 'Black Day' (singles eat black noodles). Brazil celebrates Dia dos Namorados on 12 June instead. Globally though, 14 February is the standard."
      ),
      createFAQ(
        "Why is it called Valentine's Day?",
        "It commemorates Saint Valentine, a 3rd-century Roman Christian martyr executed on 14 February. The romantic association developed centuries later in medieval Europe, popularised by Chaucer's 1382 poem linking 14 February to bird mating season. By the 17th century, written 'Valentines' (love notes) were a recognised tradition in England; mass-produced cards arrived in the 1840s with the penny post."
      ),
      createFAQ(
        "How much do people spend on Valentine's Day in the UK?",
        "Average per-person spend is £40 to £45 (Statista 2025), with total UK Valentine's spending around £2.1 billion. Roughly 30 percent goes on cards and flowers, 25 percent on dining out, 20 percent on gifts (jewellery, perfume, lingerie), 15 percent on chocolates, and 10 percent on other categories. Pet Valentine's spending is now £40 million annually and growing each year."
      ),
    ],
    relatedTools: [
      { slug: "when-is-mothers-day-uk", label: "When Is Mother's Day UK?" },
      { slug: "when-is-christmas", label: "When Is Christmas?" },
      { slug: "when-is-easter", label: "When Is Easter?" },
    ],
  },

  "when-is-winter-solstice": {
    sections: [
      createAnswerFirstSection(
        "When the Winter Solstice Falls",
        "The winter solstice in 2026 is on Monday 21 December. In 2027 it is Tuesday 21 December, in 2028 Wednesday 20 December (a leap-year shift), in 2029 Friday 21 December. The date alternates between 20 and 21 December year to year because of the calendar drift that the four-year leap cycle partially corrects. The astronomical moment in 2026 is approximately 4:50 pm GMT on 21 December, the instant the sun reaches its lowest point in the sky in the Northern Hemisphere.",
        "This is the shortest day of the year. London gets approximately 7 hours 50 minutes of daylight on the solstice, with sunrise at 8:04 am GMT and sunset at 3:54 pm GMT. Edinburgh gets just 6 hours 58 minutes; Lerwick (Shetland) gets 5 hours 49 minutes. From the solstice onwards, days lengthen until the [Summer Solstice](/when-is-summer-solstice) in late June; this is psychologically what carries people through January, even though the change is barely perceptible for the first two weeks. The 'turning point' feeling is real - days do start getting longer immediately - but you only notice the difference around mid-January."
      ),
      createAnswerFirstSection(
        "Yule, Stonehenge and the Solstice Today",
        "Stonehenge holds free public access for the winter solstice sunrise on 21 December each year, with English Heritage typically opening the inner circle from around 7:45 am to 10 am. Crowds are smaller than the summer solstice (around 2,000 to 5,000 people, versus 30,000 in summer) because the weather is cold and the date often clashes with the run-up to Christmas. The Stonehenge alignment is actually optimised for the winter solstice sunset, not sunrise: the heel stone marks the summer solstice sunrise, but the original ceremonial axis points to the winter solstice sunset. Many archaeologists believe the monument was built primarily for winter ceremonies marking the rebirth of the sun.",
        "Yule was the pre-Christian Germanic and Norse mid-winter festival that gave Christianity many of the trappings now associated with Christmas: the Yule log, evergreen decorations, mistletoe, feasting, the goat (now Father Christmas's reindeer-pulled equivalent) and gift-giving. The Christian church adopted 25 December as Christ's birth in the 4th century partly to overlap with these existing winter rituals. The [When Is Christmas](/when-is-christmas) tool tracks the day-of-the-week patterns four days after the solstice; the days lengthen each day from the solstice onwards, and Christmas Day is the first 'noticeably longer' day for most casual observers."
      ),
    ],
    faqs: [
      createFAQ(
        "What date is the winter solstice 2026?",
        "Monday 21 December 2026. In 2027 it is Tuesday 21 December. In 2028 it shifts to Wednesday 20 December (leap-year drift). The astronomical moment in 2026 is approximately 4:50 pm GMT, when the sun reaches its lowest point above the Northern Hemisphere horizon."
      ),
      createFAQ(
        "How short is the shortest day of the year?",
        "London gets around 7 hours 50 minutes of daylight; Manchester roughly 7 hours 26 minutes; Edinburgh 6 hours 58 minutes; Inverness 6 hours 35 minutes; Lerwick (Shetland) just 5 hours 49 minutes. North of Lerwick (such as Tromso in Norway) the sun does not rise at all on the solstice; this is called polar night and lasts for several weeks above the Arctic Circle."
      ),
      createFAQ(
        "Is the winter solstice the start of winter?",
        "It is the astronomical first day of winter in the Northern Hemisphere. The Met Office uses meteorological seasons: winter runs 1 December to 28 February. So depending on definition, winter starts in early December or in late December. Coldest weather actually arrives later still - January and early February are climatologically the coldest weeks in the UK, not December."
      ),
      createFAQ(
        "Why does Stonehenge align with the winter solstice?",
        "Stonehenge's central axis is aligned to the winter solstice sunset (and the opposite summer solstice sunrise). Many archaeologists argue this means the monument was built primarily for winter ceremonies marking the sun's rebirth. The Newgrange passage tomb in Ireland, built around 3200 BC, is even more dramatically aligned: the dawn sunlight fills the inner chamber for around 17 minutes on each winter solstice morning."
      ),
    ],
    relatedTools: [
      { slug: "when-is-summer-solstice", label: "When Is the Summer Solstice?" },
      { slug: "when-is-autumn-equinox", label: "When Is the Autumn Equinox?" },
      { slug: "when-is-christmas", label: "When Is Christmas?" },
    ],
  },
};
