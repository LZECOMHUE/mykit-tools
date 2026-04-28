// SEO content for wedding tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const weddingSEO = {
  "hen-do-planner": {
    sections: [
      createAnswerFirstSection(
        "Plan a Hen Do Without the Group Chat Chaos",
        "Most hen dos cost £150 to £300 per person according to Hitched, and getting eight friends to agree on activities, accommodation, and a budget can take weeks. The Hen Do Planner gives you a full itinerary, a per-head cost split, and a packing list in seconds, so you can send one tidy plan to the group chat instead of fielding fifty messages about brunch.",
        "Pick the budget tier (budget-friendly, mid-range, or luxury), the location type (city break, countryside, beach, or at-home), the duration, and the number of attendees. The planner pulls activities that fit, splits the maid-of-honour-style organiser tasks into a checklist, and suggests what each guest should pack so nobody turns up to a spa weekend in trainers."
      ),
      {
        heading: "Typical Hen Do Costs by Tier",
        table: {
          headers: ["Tier", "Per Head", "Style", "Best For"],
          rows: [
            ["Budget", "£50 - £100", "House party, garden games, cocktail night", "Smaller groups, mixed budgets"],
            ["Mid-range", "£150 - £200", "City break, restaurant, one big activity", "Most UK hen dos"],
            ["Luxury", "£300+", "Spa, weekend away, private chef", "Close-knit group with budget"],
          ],
        },
      },
      createAnswerFirstSection(
        "Setting a Budget Everyone Can Live With",
        "Always check the budget with attendees before booking anything. The bride's closest friends often want to splurge while distant cousins or work colleagues might not be able to stretch beyond £100. A common compromise is splitting the weekend into a 'core' day everyone joins (afternoon tea, a meal) and an optional add-on (overnight stay, second activity) for those who can.",
        "If you're organising and want to lock in a fair split, pair this with the [Wedding Budget Calculator](/wedding-budget-calculator) to track all of the bride's pre-wedding spending in one place. The hen do is usually the second-biggest pre-wedding cost after the dress."
      ),
    ],
    faqs: [
      createFAQ(
        "How far in advance should I plan a hen do?",
        "Three to four months out is the sweet spot. Earlier than that and people forget; closer than that and flights, restaurants, and Airbnbs are picked over. Send a save-the-date as soon as you've agreed a weekend, even if the activities aren't locked in yet."
      ),
      createFAQ(
        "Who pays for the bride on a hen do?",
        "Tradition in the UK is that the hens cover the bride's costs and split it between themselves. The maid of honour usually collects the money upfront so the bride never sees a bill. Some groups exclude flights or accommodation from this if the totals get unmanageable."
      ),
      createFAQ(
        "What if some guests can't afford the full weekend?",
        "Build in opt-outs. Saturday day plus dinner is the 'core' that everyone joins, and the spa, overnight stay, or Sunday brunch are optional add-ons with separate pricing. This is fairer than asking people to drop out entirely or quietly subsidise others."
      ),
      createFAQ(
        "Is a hen do tax-deductible if it's for a colleague?",
        "No. Hen dos are personal events even if you only know the bride through work, so they're never an allowable expense. Companies sometimes contribute towards leaving gifts, but the celebration itself is personal spending."
      ),
    ],
    relatedTools: [
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
      { slug: "wedding-timeline-builder", label: "Wedding Timeline Builder" },
      { slug: "couples-quiz-generator", label: "Couples Quiz Generator" },
    ],
  },

  "wedding-budget-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Allocate a Wedding Budget That Actually Holds",
        "The average UK wedding cost £20,700 in 2024 according to Hitched's national survey, and the single biggest reason couples blow that figure is failing to allocate the budget upfront. The Wedding Budget Calculator splits your total across the eight standard categories using industry percentages, then lets you slide each one to match what matters to you. Photography fanatics push that slider up; couples having a small ceremony pull venue down.",
        "The default split is venue 40%, catering 25%, photography 10%, flowers 5%, music 5%, attire 3%, stationery 2%, and 10% for the inevitable 'other'. Those percentages come from years of UK wedding industry data and are a sensible starting point. The total percent indicator at the bottom warns you when sliders push past 100% so the maths never gets away from you."
      ),
      {
        heading: "Default Allocation Examples",
        table: {
          headers: ["Total Budget", "Venue (40%)", "Catering (25%)", "Photo (10%)", "Other (10%)"],
          rows: [
            ["£10,000", "£4,000", "£2,500", "£1,000", "£1,000"],
            ["£20,000", "£8,000", "£5,000", "£2,000", "£2,000"],
            ["£30,000", "£12,000", "£7,500", "£3,000", "£3,000"],
            ["£50,000", "£20,000", "£12,500", "£5,000", "£5,000"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why the 'Other' 10% Matters",
        "First-time wedding planners almost always underestimate the small line items. Marriage licence (£46 in England), favours (£2 to £5 per guest), wedding insurance (£100 to £200), tips for vendors, hair trials, an emergency kit, and the 'we forgot we needed' run to the corner shop the morning of. Set aside the full 10% even if your itemised plan looks like it can absorb it; you'll thank yourself in the final fortnight.",
        "Combine this with the [Wedding Cost Per Head Calculator](/wedding-cost-per-head-calculator) to see what your guest list is genuinely costing you. Cutting the list by ten people saves around £700 to £1,000 at the average UK price-point, which is often a kinder lever than cutting categories."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the average UK wedding cost in 2026?",
        "Hitched's 2024 National Wedding Survey put the average UK wedding at £20,700, up from around £18,400 in 2022. Costs vary hugely by region: London and the South East routinely run at £25,000 to £35,000 while rural Wales and parts of Scotland sit closer to £14,000 to £16,000."
      ),
      createFAQ(
        "Should the venue really take 40% of the budget?",
        "Yes for most couples. The venue line includes hire fee, ceremony room, and often the dance floor or marquee. If you're using a free venue (a family garden, a registry office, a parents' home) you can drop venue to 10% and shift the saved budget into catering or photography."
      ),
      createFAQ(
        "Do I need a separate budget line for tips?",
        "Tipping isn't expected in the UK the way it is in the US, but most couples tip the photographer, DJ, and any service staff who go above and beyond. Budget around 5% to 10% of the relevant vendor's fee, drawn from your 'other' allocation."
      ),
      createFAQ(
        "How much contingency should I leave for last-minute costs?",
        "Aim for 10% of total budget held in reserve. Standard last-minute spend includes alterations after the final dress fitting, vendor overtime if the day overruns, weather contingencies (umbrellas, marquee sides), and the always-a-bit-more-than-quoted bar tab."
      ),
    ],
    relatedTools: [
      { slug: "wedding-cost-per-head-calculator", label: "Wedding Cost Per Head Calculator" },
      { slug: "wedding-catering-calculator", label: "Wedding Catering Calculator" },
      { slug: "wedding-drink-calculator", label: "Wedding Drink Calculator" },
    ],
  },

  "wedding-countdown": {
    sections: [
      createAnswerFirstSection(
        "Why a Live Wedding Countdown Is More Than a Novelty",
        "A countdown ticking down by the second sounds like a gimmick, but couples who use one consistently report fewer last-minute surprises. The reason is that the countdown isn't just a clock; it's anchored to milestone tasks at 12 months, 6 months, 3 months, 1 month, and 1 week out. When the days roll past one of those markers, the planner surfaces the next checklist so you're never blindsided by 'we should have booked the photographer by now'.",
        "Enter your wedding date and (optionally) your names, and the countdown updates every second. The view above the timeline shows what stage of planning you're in based on how far out you are, and the milestones list flags both completed phases (so you can pat yourself on the back) and the next round of tasks."
      ),
      createAnswerFirstSection(
        "What Each Milestone Should Cover",
        "Standard UK wedding planning runs across roughly 12 months. Twelve months out: budget, guest list, venue, photographer. Six months out: save-the-dates, menu, catering, invitations. Three months: formal invitations, ceremony plan, florist, music. One month: final headcount, seating, vendor confirmations, rehearsal. One week: final confirmations, timeline, transport, emergency kit. The countdown matches against your wedding date to show which of these are due now and which are coming next.",
        "Pair the countdown with the [Wedding Timeline Builder](/wedding-timeline-builder) for the day-of schedule and the [Wedding Budget Calculator](/wedding-budget-calculator) to keep the financial side ticking too. Couples who use all three tend to walk into the final fortnight feeling far less frantic."
      ),
    ],
    faqs: [
      createFAQ(
        "How soon should I start planning before the wedding date?",
        "Twelve months is the average UK lead-in, though shorter engagements work fine if you're flexible on venue and date. The biggest constraint is venue availability: popular venues book 12 to 18 months ahead for Saturdays in May to September, but mid-week or off-season dates often have availability inside three to four months."
      ),
      createFAQ(
        "Does the countdown work in any time zone?",
        "Yes. The timer reads your browser's local time so the countdown is accurate wherever you are. If you're planning a destination wedding, set the date as it will be in the destination time zone for the most useful tasks ordering."
      ),
      createFAQ(
        "What happens after the wedding date passes?",
        "The countdown switches to a celebration view. You can leave the date in to revisit anniversaries, or replace it with the next milestone (your first anniversary, an overseas reception). The page is just a date input, so it's reusable for any future big day."
      ),
      createFAQ(
        "Can I share the countdown with guests?",
        "The link itself doesn't carry your wedding date in the URL, so guests would need to enter the date themselves. For a sharable countdown, send guests a screenshot or use a save-the-date with the date and a 'days to go' graphic."
      ),
    ],
    relatedTools: [
      { slug: "wedding-timeline-builder", label: "Wedding Timeline Builder" },
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
      { slug: "wedding-guest-list-manager", label: "Wedding Guest List Manager" },
    ],
  },

  "wedding-hashtag-generator": {
    sections: [
      createAnswerFirstSection(
        "Generate a Wedding Hashtag Your Guests Will Actually Use",
        "Couples who pick a hashtag the morning of the wedding end up with three different ones in circulation and half the photos lost in a sea of #JustMarried posts. The Wedding Hashtag Generator takes both first names and both surnames and produces ten options across four styles (classic, punny, romantic, modern), each annotated with the character count and an Instagram-friendly indicator.",
        "The most-used hashtags share three traits: under 25 characters, easy to spell from spoken word (you'll be saying it on the day), and unique enough that guests aren't drowning in other couples' photos. Generate, scan the suggestions, and lock in the favourite at least four to six weeks out so the bridal party can drop it into save-the-dates and order-of-service cards."
      ),
      createAnswerFirstSection(
        "Test the Hashtag Before Committing",
        "Search Instagram and TikTok for any hashtag you're considering. If recent posts already exist under that exact tag, your wedding photos will be mixed in with strangers' posts forever. Particularly common surnames (Smith, Jones, Brown) often have hundreds of existing wedding posts, so you may need to add the year or location to make yours unique.",
        "Once you've picked one, print it on the menu cards, the photo booth backdrop, and (best of all) on bottle openers or coasters as favours. Combine with the [Wedding Invitation Wording Generator](/wedding-invitation-wording-generator) to drop the hashtag into the invitation copy itself."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should a wedding hashtag be?",
        "Under 25 characters is the sweet spot. Anything longer is hard to type on a phone, easy to misspell, and gets cut off in some app interfaces. Two-word combinations of names plus a year (#SmithWedding2026) usually land in the 15 to 22 character range."
      ),
      createFAQ(
        "Can two weddings have the same hashtag?",
        "Yes, and that's exactly the problem. There's no booking system; whoever uses it first doesn't own it. Always search the tag on Instagram and TikTok before printing it on anything; if you see other recent posts, add a year, location, or wordplay element to differentiate."
      ),
      createFAQ(
        "Do I need a hashtag if guests use private albums?",
        "Not strictly. Many couples now use shared photo apps (WedShoots, Joy, the wedding-friendly album tools in Google Photos and iCloud) which avoid the public-Instagram problem entirely. The hashtag is mainly useful if you want to surface guest photos publicly or to friends who weren't invited."
      ),
      createFAQ(
        "Should both surnames be in the hashtag?",
        "Only if they're short. Long double-barrelled hashtags like #BlackwellPattersonWedding are tough to remember. If both surnames are over six letters, use one surname plus the year, or a punny combination of first names instead."
      ),
    ],
    relatedTools: [
      { slug: "wedding-invitation-wording-generator", label: "Wedding Invitation Wording Generator" },
      { slug: "wedding-vow-generator", label: "Wedding Vow Generator" },
      { slug: "business-name-generator", label: "Business Name Generator" },
    ],
  },

  "wedding-speech-outline-generator": {
    sections: [
      createAnswerFirstSection(
        "Build a Wedding Speech Outline in Five Minutes",
        "A best man, father of the bride, or maid of honour speech should run roughly five minutes (around 600 to 800 spoken words). The Wedding Speech Outline Generator gives you the structural skeleton: opening line, introduction, three story slots, tribute, and toast. You drop in three personal stories, the generator weaves them through a tested speech arc, and you walk away with something to rehearse instead of a blank page at 11pm three nights before the wedding.",
        "Choose your role (best man, maid of honour, father or mother of the bride, or one of the couple), pick a tone (heartfelt, funny, or a mix), and add at least one strong story. Funny stories work best when they're specific and self-contained; tribute moments work best when they're brief and earned by what came before."
      ),
      createAnswerFirstSection(
        "What Makes a Wedding Speech Land",
        "The speeches that get talked about for years follow a simple rule: 80% about the couple, 20% about you. Open with a hook (a single line that gets a laugh or a knowing nod), introduce yourself in one sentence, tell two or three short stories that illustrate something true about the couple, then pivot to a sincere tribute and the toast. Avoid in-jokes the wider room won't get, avoid anything that would embarrass the bride or groom, and rehearse out loud at least three times.",
        "If you're stuck for stories, check the [Couples Quiz Generator](/couples-quiz-generator) prompts; they often jog memories you'd forgotten. Once your speech is drafted, run a timed rehearsal: most speakers go 20% slower on the day, so a 4-minute rehearsal lands as a 5-minute speech."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should a best man speech be?",
        "Five minutes is the standard, with seven minutes the absolute maximum. After seven minutes, even the funniest speech starts to lose the room, and the catering team behind the scenes is desperate for the speeches to finish so they can serve dessert. Five minutes works out to roughly 600 to 750 spoken words."
      ),
      createFAQ(
        "What's the order of speeches at a UK wedding?",
        "Traditionally: father of the bride, then groom, then best man. Modern weddings often add the bride and the maid of honour, slotted in before or after the best man depending on the couple's preference. Speeches usually happen between the main course and dessert, or just after the meal ends."
      ),
      createFAQ(
        "Can I read my speech from my phone?",
        "You can, but cards or a printed sheet read better. A phone in your hand looks like you're checking notifications, and the screen dims at the worst moment. If you must use a phone, set it to never auto-lock and print a backup card just in case."
      ),
      createFAQ(
        "What topics should never be in a wedding speech?",
        "Three rules: nothing about ex-partners, nothing about the wedding night, nothing the bride or groom hasn't pre-approved. Anything funny but mildly cringe should be cleared with the relevant person before the day. If you're unsure whether a story is okay, it isn't."
      ),
    ],
    relatedTools: [
      { slug: "wedding-vow-generator", label: "Wedding Vow Generator" },
      { slug: "wedding-timeline-builder", label: "Wedding Timeline Builder" },
      { slug: "couples-quiz-generator", label: "Couples Quiz Generator" },
    ],
  },

  "wedding-table-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Skip the Numbered Tables, Pick a Theme That Tells a Story",
        "Numbered tables work, but themed table names spark conversation. Guests at the 'Notting Hill' table know they're in for a romantic-comedy themed night; guests at the 'Bordeaux' table get a wine-region pun. The Wedding Table Name Generator pulls from themed sets (flowers, cities, films, books, wines, songs, and more), assigns a name to each table, and includes a one-line description so guests immediately get the reference.",
        "Pick the theme, set the number of tables (5 to 20), and the generator picks the cleanest combination from the database. Most UK receptions have 8 to 12 tables of 8 to 10 guests, so an 8-cover wedding for 80 guests usually works out to 10 tables. The generator keeps a balanced spread across the theme so you don't end up with three rose-themed names and one outlier."
      ),
      createAnswerFirstSection(
        "Pairing the Theme to the Wedding",
        "Match the theme to a story the couple wants to tell. Met at university? Books from your course reading list. Met travelling? Cities or countries. Big film nerds? Romantic films, which doubles as the conversation starter at each table ('which film are you on?'). Foodies often pick wines, cheeses, or restaurants; nature-lovers pick flowers, trees, or birds.",
        "Once you've generated the names, the next step is the seating chart itself. The [Wedding Seating Planner](/wedding-seating-planner) takes the table names you've chosen and lets you drag-and-drop guests onto each one. Print the table names on small cards or a master chart at the entrance so guests can find their table without asking."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I number tables or use names?",
        "Names if you have time to make table cards, numbers if you don't. Numbers are slightly easier for guests to find, but they're forgettable. Themed names give guests something to talk about during the inevitable awkward 'we don't know each other' moment at the start of dinner."
      ),
      createFAQ(
        "How many tables do I need for 100 guests?",
        "Most UK reception tables seat 8 or 10. For 100 guests at tables of 10, you need 10 tables. At tables of 8, you'll need 13 tables. Confirm the venue's table sizes before you finalise; some venues only offer one option, which fixes the count for you."
      ),
      createFAQ(
        "Should the top table have a special name?",
        "Yes. Most couples either name the top table 'Mr & Mrs [Surname]', use a phrase that means something to them ('The Beginning', 'Forever'), or use a special location ('The Lighthouse'). It stands out from the themed tables and signals where the couple is sitting."
      ),
      createFAQ(
        "How do I make sure guests can find their table?",
        "Use a single master seating chart at the venue entrance plus small printed cards on each table itself. The card on the table needs to be readable from across the room, so a calligraphy or print font in 36pt or larger usually works. Match the font and style to the rest of your stationery for visual consistency."
      ),
    ],
    relatedTools: [
      { slug: "wedding-seating-planner", label: "Wedding Seating Planner" },
      { slug: "wedding-guest-list-manager", label: "Wedding Guest List Manager" },
      { slug: "wedding-invitation-wording-generator", label: "Wedding Invitation Wording Generator" },
    ],
  },

  "wedding-vow-generator": {
    sections: [
      createAnswerFirstSection(
        "Write Vows That Sound Like You, Not a Greetings Card",
        "Personal vows usually run 1 to 2 minutes (roughly 150 to 300 words). The Wedding Vow Generator produces fill-in-the-blank starters across five tones (traditional, modern, humorous, poetic, and religious) with the partner's name and pronouns slotted in. Pick the tone, and the generator gives you several full vow templates plus prompts to customise the sections that should feel uniquely yours.",
        "The structure that works best is: open with a single line about the moment you knew, follow with two specific promises (concrete things you'll actually do, not abstractions), close with a forever-line that doubles as the kiss cue for the celebrant. Keep the entire thing inside two minutes so you can deliver it without losing your voice halfway through."
      ),
      createAnswerFirstSection(
        "Specific Beats Generic Every Time",
        "The vows guests remember are the ones that name something only the couple's partner would recognise. 'I promise to love you' is forgettable; 'I promise to keep buying you fresh flowers every Friday because you said it makes the kitchen feel like home' is memorable. The generator's templates leave space for these specifics; fill in at least two before you finalise.",
        "Once you've drafted the vows, time yourself reading them aloud. If you're over two minutes, cut the abstractions and keep the specifics. Rehearse with the [Wedding Speech Outline Generator](/wedding-speech-outline-generator) too if you're also delivering a speech later in the day."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should wedding vows be?",
        "Personal vows usually run 1 to 2 minutes spoken, which is around 150 to 300 words. Anything longer than two minutes and the ceremony starts to drag; anything under 90 seconds and it feels rushed. Both partners should aim for roughly the same length so it feels balanced."
      ),
      createFAQ(
        "Can we write our own vows in a UK civil ceremony?",
        "Yes, but the legal element of the ceremony has set wording you can't change (the contracting words). Personal vows are added before or after the legal section. Check with your registrar; most are happy as long as the personal vows are non-religious and don't include song lyrics or readings outside the approved list."
      ),
      createFAQ(
        "Should we share our vows with each other before the wedding?",
        "Up to you. Sharing them avoids unintended length mismatches and lets you make sure neither of you accidentally writes something that conflicts with the other. Keeping them secret adds an emotional surprise but risks one of you being significantly longer than the other. Some couples share with a trusted third party (officiant or maid of honour) to check for length and tone but not each other."
      ),
      createFAQ(
        "What if I cry too much to read my vows?",
        "Have a backup. Either give a printed copy to the officiant in case you can't read your own, or pre-record an audio version and play it. Most celebrants are very experienced with emotional vow reading and will pause, hand you tissues, and let you take your time. Tears don't ruin vows; rushing through them does."
      ),
    ],
    relatedTools: [
      { slug: "wedding-speech-outline-generator", label: "Wedding Speech Outline Generator" },
      { slug: "wedding-hashtag-generator", label: "Wedding Hashtag Generator" },
      { slug: "wedding-invitation-wording-generator", label: "Wedding Invitation Wording Generator" },
    ],
  },
};
