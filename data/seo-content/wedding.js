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

  "wedding-guest-list-manager": {
    sections: [
      createAnswerFirstSection(
        "What This Tool Tracks",
        "Each guest entry stores eight pieces of information: name, side (bride/groom/mutual), invitation type (day or evening only), RSVP status (pending/accepted/declined), plus-one (yes/no), dietary requirement, dietary notes, and a table number. You can filter the list by RSVP status or invitation type, and sort by name, side, or RSVP. The whole list saves to your browser, so closing the tab won't lose it.",
        "The split between day and evening guests matters more than couples often realise. Most UK venues charge per head for the wedding breakfast (£60-£140 per cover for 2026 prices), so day guests are your largest cost. Evening-only guests typically only get drinks and finger food, around £15-£30 per head. Tracking who is on which list lets you see the real catering bill before the RSVPs come in."
      ),
      createAnswerFirstSection(
        "Handling RSVPs in Three Stages",
        "Send invitations 8-12 weeks before the wedding for a UK ceremony, 16 weeks for a destination wedding. Set your RSVP deadline 4-6 weeks out so you have time to chase non-responders before the venue needs final numbers (most ask for confirmed headcount 14 days before). Track everything in the Pending column until you get a definite yes or no.",
        "Roughly 10-20% of invited guests will decline. The figure climbs to 25-35% if you're inviting from across the country, have a midweek date, or it's a destination wedding. Plan a B-list of evening guests you can upgrade to day if you have catering spare after the first round. Keep this list separate; sending B-list invitations after the first wave is fine, sending them visibly less than 6 weeks out is awkward."
      ),
      {
        heading: "Catering Headcount Categories",
        table: {
          headers: ["Field", "Why It Matters", "Common Slip"],
          rows: [
            ["Day vs Evening", "Day guests cost 4-7x more per head", "Friends-of-parents added late as day guests"],
            ["Plus-One", "Each plus-one is a full per-head cost, not half", "Counting plus-ones as confirmed before they're named"],
            ["Dietary Requirement", "Venue charges may differ for special meals", "Late dietary changes after the deadline"],
            ["Table Number", "Drives seating chart and stationery print run", "Editing the chart after place cards have been printed"],
            ["RSVP Status", "Final number locks venue and caterer charges", "Marking 'probably yes' as 'accepted' too early"],
          ],
        },
      },
      createAnswerFirstSection(
        "Dietary Requirements and Allergies",
        "Standard categories are vegetarian, vegan, gluten-free, dairy-free, and nut allergy. The dietary notes field handles edge cases (\"no shellfish\", \"low FODMAP\", \"halal please\", \"two-year-old, needs simple food\"). Your venue or caterer needs the full breakdown 10-14 days before the wedding, with allergy information separated clearly so the kitchen can avoid cross-contamination.",
        "Pair this with the [Wedding Seating Planner](/wedding-seating-planner) once you have most RSVPs back; it uses the same table numbers and dietary tags. The [Wedding Budget Calculator](/wedding-budget-calculator) uses your final headcount to project remaining costs. For the running countdown, the [Wedding Countdown](/wedding-countdown) gives a single date-aware view of how many weeks remain until each milestone."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I split the list between bride's and groom's families?",
        "Yes. Each guest is tagged bride, groom, or mutual when added. You can filter the list to see just one side, which is useful when one family is paying for a portion of the day or when you're discussing cuts to make budget. The mutual tag is for friends or relatives both partners share, which prevents a tug-of-war over who claims them."
      ),
      createFAQ(
        "How do I handle a guest who hasn't RSVPed?",
        "Phone or message them once at the 2-week-before-deadline mark. If they haven't responded by the deadline itself, mark them as declined and reassign their seat. Most venues will not give you a refund for a no-show but will charge for the meal you ordered. You're better off losing a possible attendee than over-catering by 8 covers because you assumed five families would show."
      ),
      createFAQ(
        "Should children get their own invitation?",
        "If you're inviting them, yes - their names should appear on the invitation alongside their parents'. If you're not inviting them, the invitation is addressed to the parents only and you may want to mention this gently when sending. Children under 12 typically eat a children's menu at half adult cost. Children of guests who travel from far away are harder to exclude than local children."
      ),
      createFAQ(
        "What about plus-ones for single guests?",
        "Most couples extend plus-ones to single guests in serious relationships (over 6 months) or who would otherwise know nobody at the wedding. Singles attending with friends or family rarely need a plus-one. The plus-one column tracks who has been offered one and whether they've named the guest yet. Unnamed plus-ones at 4 weeks out are usually a sign nobody is coming."
      ),
      createFAQ(
        "Can I export the list to give to my venue?",
        "Yes, the Premium PDF download produces a clean catering manifest with names, dietary requirements, table assignments, and totals. Most caterers prefer this in PDF form rather than a screenshot of a spreadsheet because it formats consistently and prints cleanly. The free version downloads a JPG which is fine for personal records but less useful as a venue-handover document."
      ),
    ],
    relatedTools: [
      { slug: "wedding-seating-planner", label: "Wedding Seating Planner" },
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
      { slug: "wedding-countdown", label: "Wedding Countdown" },
    ],
  },

  "wedding-seating-planner": {
    sections: [
      createAnswerFirstSection(
        "How Many People Should Sit at Each Table?",
        "Round tables seat 8 to 10 comfortably; pushing to 12 makes it hard for guests on opposite sides to talk. Long banquet tables (6 ft trestles) seat 6 to 8 per length, plus 1 at each end if your venue allows. The planner defaults to 8 per table, so a 80-guest reception lands on 10 tables, which is the sweet spot for most UK barn and hotel venues.",
        "If you are tight on floor space, 8 round tables seating 10 is more efficient than 10 tables of 8 because each round needs roughly the same 1.8 m diameter regardless of seat count. Long tables save 20% of floor area but kill cross-table conversation, so save them for receptions where the focus is the speeches and the food rather than mingling."
      ),
      createAnswerFirstSection(
        "Grouping Guests Without Causing a Family Row",
        "The planner ships with eight pre-set groups: Bride's Family, Groom's Family, Bride's Friends, Groom's Friends, Colleagues, Plus Ones, Children, and Other. Tagging each guest is the single most useful thing you can do; it then becomes obvious that putting Aunt Margaret on the same table as her ex-husband's new partner is a mistake before you commit to printing place cards.",
        "A common pattern: top table for the immediate wedding party, family tables radiating out from it (his parents on one side, hers on the other), friend tables further out, and a children's table near the exit so parents can grab a tired toddler without disturbing the speeches. Use the [Wedding Budget Calculator](/wedding-budget-calculator) to track how table count drives catering, linen and centrepiece costs."
      ),
      {
        heading: "Quick Sizing Guide for Common Guest Counts",
        table: {
          headers: ["Guests", "Round Tables (10 each)", "Long Tables (8 each)", "Floor Space (approx)"],
          rows: [
            ["50", "5", "7", "60 sq m"],
            ["80", "8", "10", "95 sq m"],
            ["100", "10", "13", "120 sq m"],
            ["140", "14", "18", "165 sq m"],
            ["200", "20", "25", "230 sq m"],
          ],
        },
      },
      createAnswerFirstSection(
        "Tracking Dietary Requirements in One Place",
        "Eight dietary tags cover almost every UK wedding: vegetarian, vegan, gluten-free, nut allergy, dairy-free, halal, kosher, and other. Tag guests as their RSVPs come in, and the planner shows how many of each are sat at each table; your caterer needs that breakdown by table 14 days before the day, not a single grand total.",
        "For a 100-guest reception, expect 10 to 15 vegetarian, 3 to 5 vegan, 3 to 5 gluten-free, and 1 to 3 nut-allergic. These numbers vary wildly by region (a London wedding skews higher on plant-based; a Welsh farm wedding skews lower) and by friend group. The planner exports a per-table dietary list as a PDF you can email straight to the chef without retyping anything."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I drag tables around the floor plan?",
        "Yes. Tables are draggable on the canvas, so you can match the actual venue layout: dance floor in the middle, top table against the long wall, family tables nearest the action, and the children's table by the exit. The drag-and-drop view doubles as a venue diagram you can hand to the venue manager when they set up the morning of the wedding."
      ),
      createFAQ(
        "What about the top table - who sits there?",
        "The traditional UK top table seats the couple in the centre, with the bride's parents on her side and the groom's on his, then the best man and chief bridesmaid at each end. Modern variations skip the head table entirely (sweetheart table for two), or seat both sets of parents at their own family tables to give them ownership of the room. The planner supports both - tag a table as 'Top Table' in the table name field."
      ),
      createFAQ(
        "How do I handle plus-ones who haven't RSVP'd yet?",
        "Add them as named placeholders ('John Doe +1') with the Plus One tag, leave them unassigned to a table, and revisit the seating once the RSVP deadline (typically 4 to 6 weeks before the wedding) has passed. The planner saves your work in your browser, so you can come back to it as the final guest count firms up."
      ),
      createFAQ(
        "Should children sit with their parents?",
        "Under-5s yes; 5 to 12 year olds usually love a dedicated kids' table with colouring, simple food and an early service slot. Teenagers often prefer to sit with adult friends. The Children group tag makes it easy to spot at a glance how many you have and whether a separate table is worth the linen hire and high chair surcharges."
      ),
      createFAQ(
        "Can I print place cards from this?",
        "The premium PDF export gives you a per-table seating list, a master seating chart, and a name-to-table lookup that doubles as the printer-friendly source for place cards. Use a service like Printed.com or order from Etsy for the final cards in your wedding stationery style."
      ),
    ],
    relatedTools: [
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
      { slug: "wedding-speech-outline-generator", label: "Wedding Speech Outline Generator" },
      { slug: "wedding-hashtag-generator", label: "Wedding Hashtag Generator" },
    ],
  },

  "wedding-timeline-builder": {
    sections: [
      createAnswerFirstSection(
        "How to Build a Wedding Day Timeline That Doesn't Slip",
        "Most UK weddings start the ceremony around 1pm or 2pm and run on until midnight, which leaves about ten hours to fill without a single ten-minute slip cascading into a late first dance. The Wedding Timeline Builder takes your ceremony time and works out the rest, baking in the buffers professional planners use: 30 minutes before ceremony for guest seating, 30 to 45 minutes for the ceremony itself, and a one-hour drinks reception while the wedding party shoots couple photos.",
        "The biggest source of overrun is photographs. Group shots take roughly two minutes each once you account for assembling the right people, so a list of fifteen formal groupings is half an hour gone before anyone gets a glass of fizz. Trim the list ruthlessly, hand it to a designated 'shot wrangler' (usually an organised bridesmaid), and the timeline holds together."
      ),
      {
        heading: "Standard UK Wedding Day Order of Events",
        table: {
          headers: ["Time", "Event", "Duration", "Notes"],
          rows: [
            ["13:30", "Guests arrive", "30 mins", "Order of service handed out"],
            ["14:00", "Ceremony begins", "30-45 mins", "Civil typically 30, religious 45"],
            ["14:45", "Confetti and group photos", "30 mins", "Move directly outside if dry"],
            ["15:30", "Drinks reception", "1 hour", "Canapes essential if meal is later"],
            ["17:00", "Wedding breakfast", "1.5-2 hrs", "Three courses plus speeches"],
            ["19:30", "Cake cut, evening guests arrive", "30 mins", "Room turnaround if same venue"],
            ["20:00", "First dance, then party", "Until close", "Last orders 23:30 for 00:00 close"],
          ],
        },
      },
      createAnswerFirstSection(
        "Speeches: Before, During, or After the Meal?",
        "Speeches before the meal mean nervous speakers can eat properly afterwards and guests stay attentive on full bladders rather than empty stomachs. Speeches during the meal break up the courses and give the catering team breathing room between starter, main and dessert service. Speeches after dessert is the British tradition but means cold food gets even colder while guests tap forks against glasses.",
        "Whichever you pick, the rule is 25 to 30 minutes total for father-of-the-bride, groom and best man combined; 45 minutes once you add a maid of honour or extra family speaker. Anything longer and the room loses focus. Pair this with the [Wedding Speech Outline Generator](/wedding-speech-outline-generator) to pre-time each contribution and the [Wedding Catering Calculator](/wedding-catering-calculator) to coordinate course pacing with the kitchen."
      ),
    ],
    faqs: [
      createFAQ(
        "What time should we start the ceremony?",
        "1pm to 2pm is the standard UK ceremony start. Earlier than that and morning guests struggle with travel; later and you run out of daylight for outdoor photos in winter. A 2pm ceremony gives you a 3pm to 4pm photo and drinks window, a 5pm sit-down meal, and the first dance comfortably before 9pm."
      ),
      createFAQ(
        "How long should the gap between ceremony and reception be?",
        "Aim for under 90 minutes if at the same venue, no more than 2 hours if guests need to travel. Longer than that and energy dips; older guests get tired and younger guests start drinking on empty stomachs. If a longer gap is unavoidable, organise something for guests to do (a tour of the venue grounds, a yard game setup, or directing them to a nearby pub)."
      ),
      createFAQ(
        "When should we serve canapes?",
        "During the drinks reception, starting around 30 minutes after the ceremony ends. Allow three to five canapes per guest if the wedding breakfast is more than 90 minutes after the ceremony, two to three if it's sooner. Without canapes during a long reception window, guests will be properly drunk by sit-down."
      ),
      createFAQ(
        "What time does the bar usually close at a UK wedding?",
        "Most UK venues run their licence to midnight, with last orders at 11:30pm and music off by 12am. A few rural barns and hotels can extend to 1am for an extra fee. If you want to keep the party going beyond that, plan a late-night snack moment (bacon rolls, pizzas, fish and chip vans) that bridges to taxi pickups."
      ),
      createFAQ(
        "Can I download the timeline to share with vendors?",
        "Premium PDF export gives you a per-vendor schedule (one for the photographer, one for the venue, one for the band) plus a master copy you can hand to your day-of coordinator or maid of honour. Send it three weeks before the wedding so suppliers can flag any clashes while there's still time to adjust."
      ),
    ],
    relatedTools: [
      { slug: "wedding-speech-outline-generator", label: "Wedding Speech Outline Generator" },
      { slug: "wedding-catering-calculator", label: "Wedding Catering Calculator" },
      { slug: "wedding-seating-planner", label: "Wedding Seating Planner" },
    ],
  },

  "wedding-invitation-wording-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Word a Wedding Invitation Without Causing a Family Row",
        "Wedding invitation wording is one of the few places in modern life where the rules still genuinely matter, because the wording signals who is hosting (and therefore paying), how formal the day will be, and whose names get top billing. The Wedding Invitation Wording Generator gives you three options at the formality level you choose, so you can compare a 'Mr and Mrs Smith request the pleasure of your company' opener against a 'Sarah and Tom invite you to celebrate' opener side by side.",
        "Traditionally the bride's parents host and are named first; modern weddings name the couple themselves as hosts, particularly when the couple is paying or when both sets of parents contribute. The generator handles divorced or remarried parents (each parent listed on a separate line), single-parent families, and same-sex couples without forcing you into outdated phrasing."
      ),
      {
        heading: "Wording by Formality Level",
        table: {
          headers: ["Formality", "Opener", "Style", "Best For"],
          rows: [
            ["Very formal", "request the honour of your presence", "Religious ceremony, full names, year written out", "Cathedral, large family wedding"],
            ["Formal", "request the pleasure of your company", "First and last names, traditional phrasing", "Most UK weddings"],
            ["Casual", "would love you to join us", "First names, conversational tone", "Garden, barn, intimate weddings"],
            ["Modern", "are getting married and want you there", "Casual, sometimes humorous, includes hashtag", "City weddings, second marriages"],
          ],
        },
      },
      createAnswerFirstSection(
        "What to Include Beyond the Names",
        "Date, time, venue and dress code are the essentials. Spell the date out for very formal invites ('Saturday, the fifteenth of June, two thousand and twenty-six'); use numerals for everything else. Include the dress code only if it's stricter than 'wedding guest standard' (white tie, black tie, morning dress, no white). For RSVPs, give a clear deadline (six weeks before the wedding is the standard) and a reply method (return card, email, or RSVP website).",
        "Pair this with the [Wedding Hashtag Generator](/wedding-hashtag-generator) for a custom social tag, and the [Wedding Timeline Builder](/wedding-timeline-builder) to make sure the ceremony time you print on the invite still works once you've allowed for travel buffers."
      ),
    ],
    faqs: [
      createFAQ(
        "Whose names go first on the invitation?",
        "Traditionally the bride's name goes before the groom's, and the bride's parents are listed first as hosts. Modern weddings list whoever is paying or both names alphabetically. For same-sex couples, alphabetical order is the simplest convention. There's no rule that requires the bride's family to host any more, and many couples find naming themselves as hosts feels right for the way they're funding the day."
      ),
      createFAQ(
        "How do I word an invitation if my parents are divorced?",
        "Each parent gets their own line, in the order: bride's mother, bride's father, groom's mother, groom's father. If a parent has remarried and the stepparent is hosting too, include them on the same line ('Mr and Mrs Robert Smith'). If a parent has remarried but isn't hosting financially, you can still list them separately as a courtesy."
      ),
      createFAQ(
        "What's the difference between 'honour' and 'pleasure'?",
        "'Request the honour of your presence' indicates a religious ceremony in a place of worship. 'Request the pleasure of your company' indicates a civil ceremony or non-religious venue. The distinction is genuinely observed by traditional wedding stationery firms even now, so getting it right signals you've thought about the formality."
      ),
      createFAQ(
        "Should I put 'No children' on the invitation?",
        "No, it reads harshly. Address the envelope only to the parents (not 'and family'), include 'an adult-only celebration' on a separate Information card, or put 'we have reserved x seats in your honour' on the RSVP card. The message gets through without anyone feeling slighted."
      ),
      createFAQ(
        "How early should invitations go out?",
        "Save-the-dates: 6 to 9 months before. Formal invitations: 2 to 3 months before, with RSVPs requested 4 to 6 weeks before the wedding. Destination weddings: send formal invites 3 to 4 months out so guests can book travel and time off."
      ),
    ],
    relatedTools: [
      { slug: "wedding-hashtag-generator", label: "Wedding Hashtag Generator" },
      { slug: "wedding-timeline-builder", label: "Wedding Timeline Builder" },
      { slug: "wedding-table-name-generator", label: "Wedding Table Name Generator" },
    ],
  },

  "wedding-drink-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Alcohol Do You Actually Need for a Wedding?",
        "The standard rule of thumb is one drink per guest per hour, but raw guest numbers don't tell the full story. A wedding for 100 guests over five hours is 500 drinks, which sounds enormous until you realise that includes welcome fizz on arrival, toasting fizz before speeches, wine through dinner, and bar drinks during dancing. The Wedding Drink Calculator splits these out so you order the right type of bottle in the right place rather than over-buying one category and running short on another.",
        "A standard 750ml bottle of wine pours five glasses; a bottle of prosecco pours six smaller flutes. For a 100-guest wedding, you typically want around 17 bottles of prosecco for arrival (one glass each), 50 bottles of wine through dinner (split white and red), and 100 to 150 bottles of beer. Soft drinks and water for designated drivers and non-drinkers (around 20% of any UK guest list) often get under-ordered, so plan for 1.5 soft drinks per guest minimum."
      ),
      {
        heading: "Drinks Per Guest by Wedding Length",
        table: {
          headers: ["Wedding Length", "Total Drinks/Guest", "Welcome", "With Meal", "Evening"],
          rows: [
            ["4 hours", "4-5", "1 glass fizz", "2 glasses wine", "1-2 bar drinks"],
            ["6 hours (typical)", "6-7", "1 glass fizz", "3 glasses wine", "2-3 bar drinks"],
            ["8 hours", "8-9", "1-2 fizz", "3 glasses wine", "4-5 bar drinks"],
            ["Summer (hot)", "+30%", "Add Pimm's", "Lean white", "Lean lager"],
          ],
        },
      },
      createAnswerFirstSection(
        "Open Bar vs Cash Bar vs Limited Bar",
        "Open bar (host pays for everything) is generous but expensive: budget £20 to £30 per head if your venue charges retail prices. Cash bar (guests pay their own) is fine for evening guests but feels stingy if the wedding breakfast is also dry; the compromise is a wine-with-meal-then-cash-bar arrangement. Limited bar (host pays for beer, wine and one signature cocktail; guests buy spirits) is the most common UK setup, costing around £12 to £18 per head.",
        "Always ask the venue about corkage. Bringing your own wine usually costs £10 to £15 per bottle in corkage but saves £10 to £20 per bottle on retail markup, so for a 100-guest wedding with 50 bottles, you save £500 to £1,000. Pair this with the [Wedding Catering Calculator](/wedding-catering-calculator) to align food and drink quantities, and the [Wedding Cost Per Head Calculator](/wedding-cost-per-head-calculator) to see what you're really spending per guest."
      ),
    ],
    faqs: [
      createFAQ(
        "How many bottles of prosecco do I need for the toast?",
        "One bottle of prosecco pours six small flutes, so 100 guests need around 17 bottles for a single toast. If you also want welcome fizz on arrival (one glass each), double it to 34 bottles. Many venues allow you to bring your own fizz with corkage, which can save £5 to £10 per bottle compared to venue prices."
      ),
      createFAQ(
        "Do I need to budget drinks for the evening guests?",
        "Yes, but they typically arrive after the wedding breakfast so you only need to plan for evening drinks (around 2 to 3 per evening guest over four hours). A 30-strong evening guest contingent adds roughly 75 to 90 drinks, mostly beer and wine. Most couples extend the open bar through the cake cut, then switch to cash bar for the dance floor."
      ),
      createFAQ(
        "What about non-drinkers and pregnant guests?",
        "Plan for around 20% of the guest list to be non-drinkers (sober, designated drivers, pregnant, or unwell). Order at least 1.5 soft drinks per guest plus a generous water provision (still and sparkling, jugs on tables). A few bottles of zero-alcohol beer and a low-alcohol or alcohol-free fizz option are increasingly standard."
      ),
      createFAQ(
        "How much does the wedding bar typically cost?",
        "Around £20 to £30 per head for an open bar at a typical UK venue, £35 to £50 per head at premium venues with retail-marked-up drinks. Limited bar arrangements come down to £12 to £18 per head. For 100 guests, expect £1,200 to £3,000 on drinks alone, which is around 5 to 8% of the typical UK wedding budget of £20,700."
      ),
      createFAQ(
        "When should I order wedding drinks?",
        "Final numbers go in 4 to 6 weeks before the wedding, alongside catering. Most suppliers (Majestic Wine, Naked Wines, local independents) accept sale-or-return on wedding orders, so you can over-order slightly without risk. Confirm corkage, glass hire, ice, and chilling logistics with the venue before placing the order."
      ),
    ],
    relatedTools: [
      { slug: "wedding-catering-calculator", label: "Wedding Catering Calculator" },
      { slug: "wedding-cost-per-head-calculator", label: "Wedding Cost Per Head Calculator" },
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
    ],
  },

  "wedding-catering-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Calculate Wedding Catering Quantities Without Running Short",
        "Caterers work to a 1.2 to 1.5 portions-per-person buffer for a reason: people eat more at weddings than they do at home, take more than they intend, and a few guests will always want seconds. The Wedding Catering Calculator multiplies your guest count by the right ratio for each course (1.2 for plated, 1.5 for buffet, 2 to 3 canapes per person for receptions) and converts those portions into kilograms so you can hand the figures straight to your caterer.",
        "For 100 guests sitting down to a three-course meal, you typically need 25kg of meat or fish for mains (250g per portion times 100 plus buffer), 15kg of potatoes, 12kg of mixed vegetables, and around 10kg of dessert. Buffet quantities run higher because guests serve themselves and over-portion: budget 350g of main protein per person rather than 250g."
      ),
      {
        heading: "Catering Quantities by Service Style (per guest)",
        table: {
          headers: ["Course", "Plated", "Buffet", "Notes"],
          rows: [
            ["Canapes", "0", "0", "3-5 if drinks reception > 90 mins"],
            ["Starter", "150g", "200g", "Soups need 300ml per person"],
            ["Main protein", "250g", "350g", "Beef trims more than chicken"],
            ["Vegetables", "120g", "180g", "Add 50% in summer for salads"],
            ["Potato/carb", "150g", "200g", "Roast holds heat better than dauphinoise"],
            ["Dessert", "120g", "180g", "Cheeseboard add 30g per person"],
          ],
        },
      },
      createAnswerFirstSection(
        "Sit-Down vs Buffet vs BBQ vs Canapes",
        "Sit-down meals are around £60 to £100 per head at typical UK venues and feel formal. Buffets are £40 to £70 per head and let guests choose, but you need 50% more food because of self-service over-portioning. BBQs and food trucks run £25 to £45 per head and work brilliantly for relaxed summer weddings, with the caveat that you must factor in queueing time (allow 15 minutes per 30 guests at one station). Pure canape receptions can replace a meal at £35 to £55 per head if you serve substantial canapes (sliders, mini fish and chips, gnocchi), but allow 8 to 10 per guest minimum.",
        "Always ask caterers if their per-head price includes service, equipment hire (cutlery, glassware, linen), VAT, and gratuity, because these can add 25 to 30% to the headline figure. Pair this with the [Wedding Drink Calculator](/wedding-drink-calculator) to coordinate bar and food spend, and the [Wedding Cost Per Head Calculator](/wedding-cost-per-head-calculator) to see catering as a percentage of total wedding spend."
      ),
    ],
    faqs: [
      createFAQ(
        "How much food do I need for a wedding buffet?",
        "Plan for 1.5 portions per guest at a buffet because people serve themselves more than they would at a plated dinner. For 100 guests, that's around 35kg of main protein (chicken, beef or salmon), 18kg of potatoes, 15kg of vegetables and 12kg of dessert. Buffets work best when there are at least two main protein options to keep queues moving."
      ),
      createFAQ(
        "What's the catering cost per head for a UK wedding?",
        "£60 to £100 per head for a sit-down three-course meal at a typical UK venue. Buffets are £40 to £70, BBQs and food vans £25 to £45, canape receptions £35 to £55. For 100 guests, expect £4,000 to £10,000 on catering alone, which is typically the second-largest line item after the venue."
      ),
      createFAQ(
        "Should I have a vegetarian option as the default?",
        "Offer vegetarian and vegan options on the RSVP and assume around 15 to 20% of guests will pick them. Some couples make the vegan option the standard and have meat as the alternative, particularly for younger London weddings. Caterers will need final dietary numbers 2 to 3 weeks before the wedding."
      ),
      createFAQ(
        "How many canapes per person?",
        "3 to 5 per person for a 60 to 90 minute drinks reception that precedes a meal. 8 to 10 per person if canapes are replacing a main course (a 'canape reception'). Always include at least one substantial canape (sliders, mini fish and chips, arancini) per person if there's a long gap before the meal, otherwise guests will be drunk by sit-down."
      ),
      createFAQ(
        "Do I need food for evening guests too?",
        "Yes, evening guests typically arrive around 7:30 to 8pm and expect either a hot evening buffet (bacon rolls, hog roast, pizza, mac and cheese) or substantial sharing platters. Budget £15 to £30 per evening guest for evening food. A buffet or food truck for the evening doubles as a late-night sober-up before guests drive home."
      ),
    ],
    relatedTools: [
      { slug: "wedding-drink-calculator", label: "Wedding Drink Calculator" },
      { slug: "wedding-cost-per-head-calculator", label: "Wedding Cost Per Head Calculator" },
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
    ],
  },

  "wedding-cost-per-head-calculator": {
    sections: [
      createAnswerFirstSection(
        "What a Wedding Actually Costs Per Guest",
        "The average UK wedding cost £20,700 in 2024 according to Hitched's national survey, and most couples invite around 80 to 100 guests, which works out to roughly £80 to £200 per head. The Wedding Cost Per Head Calculator takes your total budget and guest count and breaks it across the eight standard categories, then shows what each guest is genuinely costing you once you factor in their share of the venue hire, photography, flowers and music as well as the obvious food and drink.",
        "Cost per head matters most when you're deciding whether to invite borderline guests. The 'extra' cost of one more guest isn't just their meal; it's their share of corkage, place setting, favour, evening food, and (often) one more bottle of wine. Most couples find the marginal cost lands at £80 to £130 per additional guest beyond the obvious catering line."
      ),
      {
        heading: "Typical Cost Per Head by Total Budget",
        table: {
          headers: ["Total Budget", "Guests", "Per Head", "Style"],
          rows: [
            ["£10,000", "60", "£167", "Pub or restaurant venue, simple meal"],
            ["£20,000", "80", "£250", "Typical UK wedding budget"],
            ["£20,700", "100", "£207", "Hitched 2024 average"],
            ["£35,000", "100", "£350", "Manor house or barn, full catering"],
            ["£50,000", "120", "£417", "London or destination, premium suppliers"],
          ],
        },
      },
      createAnswerFirstSection(
        "Cutting the Guest List vs Cutting Categories",
        "When the budget feels tight, the lever most couples reach for is cutting suppliers (cheaper photographer, smaller cake, no videographer), but cutting the guest list often does more for the bottom line. Removing 10 guests from a £20,000 wedding for 100 saves around £700 to £1,000: the catering and drinks for those guests, plus their share of place settings, favours, transport, and the marginal increase in venue capacity. Cutting the cake budget by £200 saves £200; removing 10 guests saves four times that.",
        "The hardest part is who to cut. The simplest test: 'have we seen them in the last two years?' Anyone who answers no can typically be excluded without offence. Pair this with the [Wedding Budget Calculator](/wedding-budget-calculator) to see the full category split, and the [Wedding Catering Calculator](/wedding-catering-calculator) to map exact food and drink savings as the headcount changes."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the average wedding cost per head in the UK?",
        "Around £200 per head based on the Hitched 2024 average of £20,700 for 100 guests. London weddings run higher (£300 to £450 per head); rural and weekday weddings run lower (£100 to £150 per head). The figure varies wildly by venue type: pubs are £80 to £120, manor houses £200 to £400, marquee weddings on private land can be either depending on infrastructure costs."
      ),
      createFAQ(
        "How do I work out the marginal cost of one extra guest?",
        "Add together the per-head catering cost (typically £60 to £100), per-head drinks (£20 to £30), evening food share (£15 to £25), favour and place setting (£5 to £10), and a small allocation for the increased flowers, transport, and admin. The marginal cost lands at £100 to £170 per extra guest at most UK weddings, even though the headline 'per head' average looks higher because it includes fixed costs like venue hire."
      ),
      createFAQ(
        "Should the wedding party be excluded from the per-head total?",
        "No. Bridesmaids, groomsmen and parents eat and drink the same as everyone else, and excluding them just hides the real cost. What you can do is include their costs (gifts, accommodation, suit hire contributions) as separate budget line items, which keeps the per-head figure focused on the catering side."
      ),
      createFAQ(
        "Is it cheaper to have a smaller or larger wedding?",
        "Smaller is almost always cheaper on the headline number, but cost per head is often higher because fixed costs (venue, photographer, music) get spread across fewer guests. A 30-guest intimate wedding can land at £400 to £600 per head; a 100-guest wedding at the same venue can land at £180 to £250 per head. The total budget is what matters, not the per-head figure in isolation."
      ),
      createFAQ(
        "How do I track my actual spending against this calculator?",
        "Use this tool for the planning estimate, then move to a detailed spreadsheet or the [Wedding Budget Calculator](/wedding-budget-calculator) for tracking actual deposits and final invoices as you book each supplier. The two together cover both the strategic 'is this affordable' question and the operational 'are we still on track' question."
      ),
    ],
    relatedTools: [
      { slug: "wedding-budget-calculator", label: "Wedding Budget Calculator" },
      { slug: "wedding-drink-calculator", label: "Wedding Drink Calculator" },
      { slug: "wedding-catering-calculator", label: "Wedding Catering Calculator" },
    ],
  },
};
