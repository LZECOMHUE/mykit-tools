// SEO content for travel tools
// Rule: no em dashes. Use " - " instead.
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const travelSEO = {
  "drive-vs-train-cost": {
    sections: [
      createAnswerFirstSection(
        "Is It Cheaper to Drive or Take the Train in the UK?",
        "It depends on the journey length, how many people are travelling, and whether you book train tickets in advance. For short trips under 100 miles with one person, the train is often cheaper once you factor in fuel, parking and wear. For longer journeys with multiple passengers splitting fuel costs, driving can win by a significant margin.",
        "Use this calculator to enter the real numbers for your trip. The driving side covers fuel (calculated from your car's MPG and the current fuel price per litre), plus any parking costs, split across everyone in the car. The train side covers ticket price per person, number of tickets, and transfer costs - taxis or buses to and from each station."
      ),
      {
        heading: "Typical UK Fuel and Train Cost Comparisons",
        table: {
          headers: ["Journey (one way)", "Drive cost (1 person)", "Drive cost (4 people)", "Train (advance)"],
          rows: [
            ["London to Birmingham (120 mi)", "~£17", "~£4 per person", "~£15-35"],
            ["London to Manchester (200 mi)", "~£28", "~£7 per person", "~£25-70"],
            ["London to Edinburgh (400 mi)", "~£56", "~£14 per person", "~£40-120"],
            ["Bristol to Cardiff (45 mi)", "~£7", "~£2 per person", "~£10-20"],
          ],
        },
      },
      createAnswerFirstSection(
        "What the Calculator Does Not Include",
        "For a truly fair comparison, you should also consider car depreciation (roughly 10-15p per mile for an average car), insurance, and servicing costs. These are real costs of car ownership that fuel alone does not capture.",
        "On the train side, the headline ticket price rarely tells the whole story - consider luggage fees on some operators, on-board food and drink, and the taxi or bus transfer at both ends. The calculator has a dedicated transfer costs field so you can add those in."
      ),
    ],
    faqs: [
      createFAQ(
        "How does the calculator work out fuel cost?",
        "It converts your car's MPG (miles per gallon, UK imperial) into litres per 100km using the formula 282.5 / MPG. It then calculates litres used for the round trip distance and multiplies by your fuel price per litre. The result is split by the number of passengers in the car."
      ),
      createFAQ(
        "Why does my MPG default to 45?",
        "45 MPG is roughly the UK average for a modern petrol family car. If you drive a diesel, SUV, or older vehicle your figure will differ - check your car's real-world MPG on sites like Fuelly or your manufacturer's spec sheet for an accurate result."
      ),
      createFAQ(
        "Is driving or the train better for the environment?",
        "For a solo driver, the train almost always produces fewer CO2 emissions per passenger. A typical UK car emits around 171g of CO2 per km, while rail averages around 41g per passenger km. With 4 people in the car the maths shifts closer to parity, though the train is still typically greener."
      ),
      createFAQ(
        "When is driving clearly cheaper than the train?",
        "Driving tends to win clearly when: you have 3 or more people splitting costs, you book last minute (train walk-up fares are expensive), you need to carry large amounts of luggage, or the destination has free parking. It also wins for door-to-door rural journeys where train transfers add both cost and time."
      ),
      createFAQ(
        "What fuel price should I use?",
        "The default is £1.42 per litre, which reflects UK average unleaded petrol prices in early 2026. Check the latest price at your local station - prices vary by 10-15p/litre across the UK and fluctuate week to week. Diesel is typically 5-10p higher per litre than petrol."
      ),
    ],
    relatedTools: [
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
      { slug: "distance-calculator", label: "Distance Calculator" },
    ],
  },

  "currency-converter": {
    sections: [
      createAnswerFirstSection(
        "How the Currency Converter Works",
        "Pick the amount, the currency you have, and the currency you want. The tool pulls the latest mid-market exchange rate from the Frankfurter API (which sources daily reference rates published by the European Central Bank) and shows the converted figure plus the rate per unit.",
        "These are reference rates, not the rate you will actually receive at a bank counter, ATM, or bureau de change. Real-world transactions add a margin on top, typically 1-3% at a high street bank, 3-6% at an airport bureau, and 5-10% if you change physical cash at the destination. Use this as a planning figure, not a guarantee."
      ),
      {
        heading: "What Different Methods Actually Cost a UK Traveller Spending £500 in USD",
        table: {
          headers: ["Method", "Typical margin", "Approximate USD received"],
          rows: [
            ["Mid-market rate (this tool)", "0%", "~$640"],
            ["High street bank", "1-3%", "~$622-635"],
            ["Travel debit card (Chase, Starling)", "0-0.5%", "~$636-640"],
            ["Credit card abroad", "0-3% + £2-3 fee", "~$615-635"],
            ["Airport bureau de change", "5-8%", "~$590-610"],
            ["ATM withdrawal abroad", "1-3% + £2-5 fee", "~$615-630"],
          ],
        },
      },
      createAnswerFirstSection(
        "Card vs Cash When You Land",
        "For a long weekend in New York, paying by card on a fee-free travel account (Starling, Chase UK, Monzo, Wise) usually beats cash by some distance. You get close to the mid-market rate and you do not have to estimate how much physical currency to carry.",
        "Carry a small amount of cash for tipping, taxis from older cab firms, and small market vendors. £50-100 worth of local currency is plenty for a typical week. Use the [Tip Calculator](/tip-calculator) once you arrive so you do not over or under tip on top of an already-converted bill."
      ),
    ],
    faqs: [
      createFAQ(
        "How fresh are the exchange rates?",
        "Rates update once per working day. The Frankfurter API publishes the European Central Bank's daily reference rates, set around 16:00 CET on weekdays. Weekend conversions show Friday's closing rate. For high-value transfers (above £5,000) check a live forex platform instead."
      ),
      createFAQ(
        "Is this the rate I will get at the bank?",
        "No. The rate shown is the mid-market or interbank rate, the midpoint between buy and sell prices. Banks, bureaux, and card providers add a margin. A 'no fee' bureau is rarely free; the margin is hidden in a worse exchange rate. Compare the rate offered against the figure here to see the real cost."
      ),
      createFAQ(
        "Why does the rate I see in Google differ slightly?",
        "Different providers source rates at different moments and from different feeds. Google often shows a near-real-time rate from XE or Morningstar, this tool shows the ECB's once-daily reference rate. Differences of 0.1-0.5% are normal and not an error."
      ),
      createFAQ(
        "Should I exchange money before I travel?",
        "Usually no. UK high street banks and Post Office bureaux generally offer worse rates than withdrawing local currency from an ATM at the destination using a fee-free travel card. The exception is travel to countries with capital controls or limited ATM networks (Cuba, parts of rural Africa) where pre-purchasing is safer."
      ),
    ],
    relatedTools: [
      { slug: "tipping-guide-abroad", label: "Tipping Guide Abroad" },
      { slug: "tip-calculator", label: "Tip Calculator" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
    ],
  },

  "holiday-countdown-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Countdown Works",
        "Type in the name of your trip and pick a date. The page ticks down in real time, showing days, hours, minutes, and seconds together with milestone messages like 'only 2 weeks!' as the date approaches.",
        "It runs entirely in your browser, so the countdown carries on while the tab is open and resyncs each time you reload. There is no need to sign in or save anything. Bookmark the page after you set your date and it will reload to the same countdown."
      ),
      {
        heading: "When to Start the Pre-Trip Tasks",
        table: {
          headers: ["Time before trip", "Task"],
          rows: [
            ["8-12 weeks", "Check passport expiry (needs 6 months validity for many destinations), book travel insurance"],
            ["6-8 weeks", "Apply for visa if needed, book airport parking or transfer"],
            ["4 weeks", "Book any restaurants or activities that need reservations"],
            ["2 weeks", "Order foreign currency, confirm card abroad will work, set out-of-office"],
            ["1 week", "Start the [Packing List Generator](/packing-list-generator), check weather forecast"],
            ["3 days", "Check in online when window opens, charge devices, freeze fresh food"],
            ["Day before", "Print boarding passes as backup, water plants, set lights on a timer"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why a Visible Countdown Helps",
        "There is psychological research showing anticipation is one of the most enjoyable parts of a holiday, sometimes more enjoyable than the trip itself. A visible countdown stretches that anticipation across weeks rather than letting it bunch up in the last few days.",
        "It is also a useful planning anchor for families. If a child knows there are 23 sleeps until Disneyland, they can tick days off a calendar at the same time. Pair it with a [Packing List Generator](/packing-list-generator) to turn the countdown into a checklist as the date gets closer."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the countdown keep running if I close the tab?",
        "It is a live timer, so it stops when the tab closes. When you reopen the bookmarked page, it recalculates from the current moment and the saved target date, so the count is always accurate. Nothing is stored on a server."
      ),
      createFAQ(
        "Can I count down to anything, not just a holiday?",
        "Yes. The label is editable, so you can use it for a wedding, exam, retirement date, baby due date, or anniversary. Anything with a fixed future date works."
      ),
      createFAQ(
        "What time zone does the countdown use?",
        "Your device's local time. If your trip is to a different time zone, set the date to whichever local midnight you want to count to. For a 3am UK departure, set the date to that day so the count hits zero on departure morning."
      ),
      createFAQ(
        "Why do I get extra messages like 'just 2 weeks away'?",
        "These are milestone prompts to keep the countdown feeling alive across long timeframes. They appear automatically based on how many days remain, no setup needed."
      ),
    ],
    relatedTools: [
      { slug: "packing-list-generator", label: "Packing List Generator" },
      { slug: "holiday-countdown", label: "Holiday Countdown" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
    ],
  },

  "jet-lag-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Jet Lag Severity Is Calculated",
        "The basic rule of thumb is one day of recovery per time zone crossed. A flight from London to New York (5 hours behind) typically takes 3-5 days to fully shake off, while London to Tokyo (9 hours ahead) can take a week or more. The tool flags trips of 4 hours or less as mild, 5-8 hours as moderate, and 9+ hours as severe.",
        "Direction matters more than most travellers realise. Eastbound travel (London to Tokyo, Sydney to LA) is harder because you are asking your body to fall asleep earlier than its internal clock thinks it should. Westbound (London to New York, Tokyo to London) is easier because staying up later feels more natural."
      ),
      {
        heading: "Common UK Routes and Likely Recovery",
        table: {
          headers: ["Route", "Time difference", "Direction", "Typical recovery"],
          rows: [
            ["London - New York", "5 hours", "Westbound", "2-3 days"],
            ["London - Dubai", "4 hours", "Eastbound", "1-2 days"],
            ["London - Bangkok", "7 hours", "Eastbound", "4-5 days"],
            ["London - Tokyo", "9 hours", "Eastbound", "5-7 days"],
            ["London - Sydney", "10-11 hours", "Eastbound", "6-8 days"],
            ["London - Los Angeles", "8 hours", "Westbound", "3-4 days"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Actually Helps",
        "Light exposure is the single biggest lever. After landing, get outside in natural daylight at the right time for the local clock; this resets your circadian rhythm faster than any supplement. Eastbound travellers want morning light, westbound travellers want afternoon and evening light.",
        "Caffeine and naps both work but timing matters. A 20-minute nap on arrival day is fine, anything over an hour wrecks the next night's sleep. Caffeine has a 5-6 hour half-life, so a 3pm coffee is still partly active at 9pm. Save your last coffee for around lunch on adjustment days."
      ),
    ],
    faqs: [
      createFAQ(
        "Does melatonin actually help?",
        "Modest evidence says yes for eastbound trips of 5+ time zones. A 0.5-3mg dose taken 30 minutes before your target local bedtime for the first few nights can shift your sleep cycle. Larger doses are not more effective and often cause grogginess. Melatonin requires a prescription in the UK."
      ),
      createFAQ(
        "Why does east feel worse than west?",
        "Your body's natural clock runs slightly longer than 24 hours, so it adapts more easily to a longer day (westbound) than a shorter one (eastbound). Pilots and frequent flyers consistently report eastbound legs as the harder direction even on identical time zone gaps."
      ),
      createFAQ(
        "Can I avoid jet lag entirely?",
        "Not really, but you can reduce it. Shift your sleep schedule by an hour per day in the 3 days before departure, sleep on the plane on overnight eastbound flights, hydrate, avoid alcohol on the plane (it disrupts sleep architecture), and get sunlight as soon as you land."
      ),
      createFAQ(
        "How is the recovery estimate worked out?",
        "Up to 4 hours of difference: 1 day. 5-8 hours: roughly 3 days. 9+ hours: half the time zone gap rounded up. These are averages, individuals vary. Older travellers, poor sleepers, and people who already run on a sleep deficit tend to take longer."
      ),
    ],
    relatedTools: [
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "timezone-meeting-planner", label: "Timezone Meeting Planner" },
      { slug: "currency-converter", label: "Currency Converter" },
    ],
  },

  "luggage-weight-checker": {
    sections: [
      createAnswerFirstSection(
        "Why Bag Weight Limits Catch People Out",
        "A typical UK long-haul economy checked allowance is 23kg, hand luggage 7-10kg, but the limit varies enormously by airline and fare class. Ryanair and Wizz are the strictest in Europe, allowing only a small under-seat bag for free and charging £25-60 at the gate for anything bigger. British Airways short-haul economy includes one cabin bag (up to 23kg) plus a personal item; long-haul adds a 23kg checked bag.",
        "This tool lets you pick your airline and class, then add items from a pre-built weight list (laptop ~2kg, jeans ~600g, jacket ~800g, hairdryer ~600g, toiletries kit ~500g) so you can pack against the real limit before you reach the airport."
      ),
      {
        heading: "Allowances by Common Airline (Economy)",
        table: {
          headers: ["Airline", "Hand luggage", "Checked"],
          rows: [
            ["British Airways (long-haul)", "7kg + personal item", "23kg included"],
            ["Ryanair", "Small bag under seat, 10kg cabin extra fee", "20kg fee"],
            ["EasyJet (basic)", "7kg under-seat", "15kg fee"],
            ["Lufthansa (Economy Light)", "8kg", "23kg fee or included by fare"],
            ["Emirates (Special)", "7kg", "30kg included"],
            ["United (Basic Economy US-EU)", "Personal item only", "23kg, fee may apply"],
          ],
        },
      },
      createAnswerFirstSection(
        "Practical Weight-Saving Tactics",
        "Wear your heaviest items on the plane. Boots and a winter coat together can save 1.5-2kg from the case. Decant toiletries into 100ml bottles for cabin bags rather than packing full-size; you can buy more on arrival. Hairdryers and straighteners are usually provided in hotels above 3-star, leaving them at home saves 600-800g.",
        "If you are over the limit at home, redistribute rather than reduce. Move a heavy book or pair of shoes from the checked bag to your hand luggage if there is room within the cabin allowance. If you are still over after that, gate fees are 5-10x the cost of paying for extra weight in advance, so add an upgrade online before leaving."
      ),
    ],
    faqs: [
      createFAQ(
        "Why do Ryanair and EasyJet charge so much more?",
        "Their core fares are unbundled, meaning everything beyond a small under-seat bag is an optional extra. This keeps the headline price low but means baggage fees can easily double the cost of a £30 flight. Always price the bag with the ticket when comparing, not afterwards."
      ),
      createFAQ(
        "What happens if my bag is overweight at the airport?",
        "You will be asked to either remove items at the desk (often into hand luggage if there is space) or pay an excess baggage fee, typically £10-15 per kilo over. This is non-negotiable on most low-cost airlines and routinely exceeds £100 for a few extra kilos."
      ),
      createFAQ(
        "Are weight limits ever per bag or per passenger?",
        "Both, depending on the airline. Most European carriers use per-bag limits (no single bag over 23kg). North American carriers and many long-haul airlines use a piece concept (one or two pieces, each within a set weight). Always check your specific ticket, not the airline's general policy."
      ),
      createFAQ(
        "How accurate is the item weight database?",
        "Average values for typical items, accurate to within ~30%. A pair of jeans varies from 400g (skinny denim) to 800g (raw denim). For accuracy, weigh your actual packed bag with bathroom scales by weighing yourself, then weighing yourself holding the bag."
      ),
    ],
    relatedTools: [
      { slug: "packing-list-generator", label: "Packing List Generator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
    ],
  },

  "packing-list-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Packing List Builds Itself",
        "Pick the trip type (beach, city, mountains, cold), the duration (weekend through to a month), and any specific activities you have planned (hiking, dining out, photography, business meetings). The tool merges a base list for the destination with extras for each activity, deduplicates, and groups everything by category.",
        "A typical adult beach trip generates around 30 items, a family of 4 can easily hit 50+ once you add toys, snacks, and spare changes. Tick items off as you pack to track progress. The whole thing exports as a JPG you can save to your phone or print as a single A4 page."
      ),
      {
        heading: "Typical Item Counts by Trip Type",
        table: {
          headers: ["Trip type", "Base items", "With 2 activities", "Suitcase guide (1 person, 1 week)"],
          rows: [
            ["Beach holiday", "~30", "~38", "Fits a 55L cabin or small checked bag"],
            ["City break", "~28", "~36", "Cabin only is realistic for 3-4 days"],
            ["Mountains / outdoors", "~35", "~45", "Hiking-specific kit pushes to checked"],
            ["Cold climate", "~40", "~48", "Bulky layers usually require checked"],
          ],
        },
      },
      createAnswerFirstSection(
        "What People Forget Most Often",
        "Chargers and adapters top the list, especially for trips outside the EU/UK. A US plug looks like a UK USB charger should fit until you arrive at JFK. Other chronic offenders: prescription medication (always in hand luggage), reading glasses, swimsuit (for unexpected hotel pool moments), and a reusable water bottle for the airport.",
        "If you are flying with kids, pack a change of clothes for each child in your carry-on regardless of trip length. Cabin luggage delays and spills happen, and a clean t-shirt costs nothing in luggage weight. Once your list is built, run it through the [Luggage Weight Checker](/luggage-weight-checker) to make sure it fits your airline's allowance."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I really pack 50% less?",
        "For most trips, yes. Travellers consistently overpack, especially on trip 1 of any holiday style. You can buy toiletries, basic clothes, and most necessities at the destination if needed. The exceptions: prescription medication, specific shoes you have broken in, and items you will struggle to find abroad."
      ),
      createFAQ(
        "Does the list account for my destination's weather?",
        "It uses the trip type as a proxy. A 'cold climate' list assumes layers and waterproofs, 'beach' assumes warm and sunny. For shoulder-season trips where weather is unpredictable, choose the colder option and add a single layer; you can always wear less, you cannot wear more."
      ),
      createFAQ(
        "Can I add items the tool does not include?",
        "The list is a starting point, not a maximum. Once you have it on screen or printed, scribble on extras you know you need, like sketchbooks, sleep aids, or specific contact lens solution. The export is a JPG specifically so you can annotate it."
      ),
      createFAQ(
        "What about hand luggage versus checked bag?",
        "The list does not split items by bag because that depends heavily on your airline. Once you have the full list, decide which essentials must travel with you (medication, documents, electronics, one outfit) and put everything else in checked. The [Luggage Weight Checker](/luggage-weight-checker) can split by bag type."
      ),
    ],
    relatedTools: [
      { slug: "luggage-weight-checker", label: "Luggage Weight Checker" },
      { slug: "holiday-countdown-generator", label: "Holiday Countdown Generator" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
    ],
  },

  "sunrise-sunset-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why You Need Latitude and Month, Not Just a City",
        "Sunrise and sunset times depend on three things: latitude (how far north or south you are), date (where Earth is in its orbit), and time zone. A summer day in Reykjavik (~64°N) has 21+ hours of daylight; a winter day at the same spot has under 5. Equator cities barely vary across the year, sitting around 06:15-18:25 every month.",
        "This tool uses pre-calculated reference data for 13 latitude bands from 60°N to 60°S, accurate to within a few minutes for the middle of each month. For exact times at your specific location, official sources (the National Maritime Museum's site, timeanddate.com, or a sun-tracking app) compute to the nearest minute."
      ),
      {
        heading: "How Day Length Varies by Season",
        table: {
          headers: ["Latitude", "Example", "21 June", "21 December"],
          rows: [
            ["60°N", "Iceland, Bergen", "~24 hours", "~5 hours"],
            ["50°N", "London, Vancouver", "~17 hours", "~8 hours"],
            ["40°N", "New York, Madrid", "~15 hours", "~9 hours"],
            ["30°N", "Cairo, Houston", "~14 hours", "~10 hours"],
            ["Equator", "Quito, Singapore", "~12 hours", "~12 hours"],
            ["30°S", "Sydney, Cape Town", "~10 hours", "~14 hours"],
            ["50°S", "Falkland Islands", "~8 hours", "~17 hours"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Photographers and Travellers Actually Use This For",
        "Golden hour, the period roughly 30-60 minutes after sunrise and before sunset, is when light is warmest and shadows are softest. It is when most travel and landscape photography looks its best. The tool flags approximate windows for each latitude and month so you can plan a 6am hike up Pulpit Rock to catch sunrise over the fjord, or schedule dinner on a Greek balcony to coincide with the colour.",
        "Travellers also use it to plan around darkness: when does it get dark in Reykjavik in October (around 17:00), or how late will it stay light for a 9pm walk in Copenhagen in June (broad daylight). For trips above the Arctic Circle in summer or winter, the 'midnight sun' or 'polar night' tags warn you that the sun will not set or rise for the period."
      ),
    ],
    faqs: [
      createFAQ(
        "What about the midnight sun and polar night?",
        "Above roughly 66.5°N or below 66.5°S, the sun does not set for part of the summer and does not rise for part of the winter. The N60° band in this tool flags midnight sun for June and July as an approximation; for exact start and end dates at your specific latitude, a tool like timeanddate.com will be more precise."
      ),
      createFAQ(
        "Are these times in local time or UTC?",
        "Local time at the latitude shown, assuming the standard time zone for that region. If your specific destination is on the eastern or western edge of its time zone, actual times can be 30-60 minutes different. Daylight saving shifts add another hour during summer in most temperate countries."
      ),
      createFAQ(
        "How accurate are these compared to a real almanac?",
        "Within ~10-15 minutes at the middle of any month, less accurate near the start and end. The tool is built for trip planning, not navigation or astronomy. For tide times, eclipses, or anything safety-critical at sea, use the Royal Observatory's HM Nautical Almanac Office data instead."
      ),
      createFAQ(
        "What is the difference between civil twilight and sunset?",
        "Sunset is the moment the sun's upper edge drops below the horizon. Civil twilight continues for around 30 minutes after, when there is enough natural light to see without artificial illumination. Photographers' 'blue hour' falls in the second half of civil twilight."
      ),
    ],
    relatedTools: [
      { slug: "time-zone-converter", label: "Time Zone Converter" },
      { slug: "holiday-countdown-generator", label: "Holiday Countdown Generator" },
      { slug: "distance-calculator", label: "Distance Calculator" },
    ],
  },

  "timezone-meeting-planner": {
    sections: [
      createAnswerFirstSection(
        "How the Overlap Calculation Works",
        "Pick your participants' time zones. The tool finds every 30-minute window where every selected zone is between 9am and 5pm local. A freelancer in London (GMT) trying to schedule a Zoom with a client in Mumbai (IST, +5:30) and a partner in Los Angeles (PST, -8) will find that there is no time of day where all three are in standard work hours; one party always has to flex.",
        "The visual timeline shows you the next-best windows. London-Mumbai overlaps from about 09:30-12:30 GMT (15:00-18:00 IST). London-LA overlaps 17:00-18:00 GMT (09:00-10:00 PST). For all three together, you have to pick whether London takes a late call, LA takes an early call, or India takes an evening call."
      ),
      {
        heading: "Common Multi-Zone Patterns",
        table: {
          headers: ["Zones involved", "Realistic overlap (work hours)", "Compromise needed?"],
          rows: [
            ["London + Paris", "08:00-16:00 GMT (full)", "None"],
            ["London + New York", "13:00-17:00 GMT", "None within 9-5 each side"],
            ["London + Mumbai", "09:30-12:30 GMT", "Mumbai works late afternoon"],
            ["London + Tokyo", "00:00-08:00 GMT", "One side outside work hours"],
            ["London + Sydney", "22:00-07:00 GMT", "One side outside work hours"],
            ["UK + India + US East", "13:00-13:30 GMT only", "India works late, US works early"],
            ["UK + India + US West", "No overlap in 9-5", "One zone always flexes"],
          ],
        },
      },
      createAnswerFirstSection(
        "Practical Tips for Distributed Teams",
        "Rotate the unsociable hour. If one zone always takes the 6am or 9pm call, resentment builds. A simple rule like 'this month India takes the early slot, next month US west does' spreads the burden. For three-zone calls, a 30-minute meeting at 14:00 UK is reachable by Mumbai (19:30) and US East (09:00) but tight for everyone.",
        "Daylight saving is the silent killer. The UK, EU, and US all switch on different weekends, meaning recurring meetings drift by an hour 4 times per year. Always confirm the actual local time on the meeting invite in the week after a clock change. Use the [Time Zone Converter](/time-zone-converter) to sanity-check before sending."
      ),
    ],
    faqs: [
      createFAQ(
        "Does this account for daylight saving time?",
        "The tool uses static UTC offsets (e.g. New York is UTC-5, London is UTC+0). During British Summer Time (late March to late October) London is actually UTC+1, and Eastern Daylight Time shifts New York to UTC-4. For meetings in the next few weeks, double-check using your operating system's time zone settings; for a date 3 months out, the tool's standard offsets are usually right."
      ),
      createFAQ(
        "What if there is genuinely no overlap?",
        "For UK + Sydney + LA, there is no time when all three are in 9-5. Solutions: split into two calls, use asynchronous tools like Loom or a shared doc instead of a meeting, or accept that one zone will always be on a flexed schedule. The tool flags this with an amber warning when it happens."
      ),
      createFAQ(
        "Can I save the result?",
        "Not directly. Bookmark the URL with your selected zones (the state is held in the browser, not a database). For recurring meetings, screenshot the timeline view as a reference for your team."
      ),
      createFAQ(
        "Why does the tool show working hours as 9-5?",
        "It is a starting assumption. For teams with different conventions (4-day weeks, 8-4 schedules, evening shifts), use the visual timeline to find your actual overlap rather than relying on the green 'working hours' band. The hour cells are clickable so you can pick any time."
      ),
    ],
    relatedTools: [
      { slug: "time-zone-converter", label: "Time Zone Converter" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
    ],
  },

  "tip-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Tipping Varies by Country",
        "There is no single 'correct' tip rate. In the US, 18-20% on the pre-tax bill is now standard at sit-down restaurants, with 15% at the very low end. In the UK, 10-12.5% is normal, often already added as a service charge. In Japan, tipping is not expected and can come across as rude or confusing.",
        "Pick your country in the tool, type the bill, and it suggests a typical rate plus the local low and high range. Split the total across however many people are at the table, and you get a tip amount, total bill, and per-person figure ready to read off your phone at the table."
      ),
      {
        heading: "Tipping Norms by Common Travel Destination",
        table: {
          headers: ["Country", "Restaurant tip", "Already added?", "Cab tip"],
          rows: [
            ["United States", "18-20% (15% low end)", "Rarely; sometimes for groups 6+", "10-15%"],
            ["United Kingdom", "10-12.5%", "Often as 'optional' service charge", "Round up or 10%"],
            ["France", "Service compris (built in)", "Yes, by law", "Round up"],
            ["Italy / Spain / Germany", "5-10% if happy", "'Coperto' cover charge, not a tip", "Round up"],
            ["Japan", "0%, not expected", "No", "0%"],
            ["Singapore / Hong Kong", "Service charge (~10%) added", "Yes", "Round up"],
            ["Mexico / Brazil", "10-15%", "Sometimes (10% in Brazil)", "10%"],
            ["Australia / New Zealand", "10% if great service", "No", "Round up"],
          ],
        },
      },
      createAnswerFirstSection(
        "Watch for Service Already Added",
        "In the UK, many restaurants add a 'discretionary service charge' of 10-12.5% to bills, especially for groups. It is genuinely optional, you can ask for it removed if service was poor, but the calculator does not know it is there. Check the bill, and only tip on top if service was exceptional or the charge is removed.",
        "In the US, parties of 6 or more often have an 'auto-grat' of 18% added. In France, 'service compris' has been the law since 1987, so any tip is genuinely a small extra for great service rather than a top-up. Use this tool as a starting point, then sense-check against the bill before paying. For currency conversion at the same time, see the [Currency Converter](/currency-converter)."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I tip on the pre-tax or post-tax total?",
        "In the US, tradition is pre-tax, but most modern card terminals calculate the suggested tip on the post-tax total. Either is socially acceptable. Tipping on the pre-tax total (which is what this calculator does by default if you enter that figure) is closer to the historic norm."
      ),
      createFAQ(
        "Do I tip when I order at the counter?",
        "In the US, yes, increasingly so; tablet payment screens prompt for 15-25% even for a takeaway coffee. £1-2 or rounding up is fine. In Europe and Asia, no, this is not expected for counter service."
      ),
      createFAQ(
        "What about hotel staff and tour guides?",
        "Hotel housekeeping in the US: $2-5 per night, left on the pillow. Concierge: $5-20 for substantial help. Tour guides on day trips: $5-10 per person for a half day, $10-20 for a full day. Many countries outside North America have no expectation of tipping these roles."
      ),
      createFAQ(
        "Why is Japan listed as 0%?",
        "Tipping is not part of Japanese restaurant culture. Service is included in the price, and good service is considered a baseline expectation, not something to incentivise. Leaving extra cash on the table can cause genuine confusion; staff sometimes chase tourists to return money they think was forgotten."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "tipping-guide-abroad", label: "Tipping Guide Abroad" },
      { slug: "us-tip-calculator", label: "US Tip Calculator" },
    ],
  },

  "currency-converter": {
    sections: [
      createAnswerFirstSection(
        "Where the Exchange Rate Actually Comes From",
        "This converter pulls live rates from the Frankfurter API, which republishes the European Central Bank's daily reference rates. The ECB sets these at around 16:00 CET on each working day, so over a weekend you are looking at Friday's closing figure. For a Brit pricing up a 5-day trip to New York, that level of precision is fine - the rate you see will be within a fraction of a percent of what your travel debit card actually charges on the day.",
        "What you will not see at the till is the mid-market rate. Banks, bureaux de change and most credit cards layer a margin on top, typically 1-3% at a high street bank, 3-6% at an airport bureau, and 5-10% on physical cash. Treat the figure here as a planning anchor, then knock 1-3% off if you want a realistic worst-case for budgeting purposes."
      ),
      {
        heading: "What a UK Traveller Spending £500 Actually Receives in USD",
        table: {
          headers: ["Method", "Typical margin", "Approximate USD received"],
          rows: [
            ["Mid-market rate (this tool)", "0%", "~$640"],
            ["Travel debit card (Chase, Starling, Monzo)", "0-0.5%", "~$636-640"],
            ["UK high street bank", "1-3%", "~$622-635"],
            ["Credit card abroad", "0-3% plus £2-3 fee", "~$615-635"],
            ["ATM withdrawal at destination", "1-3% plus £2-5 fee", "~$615-630"],
            ["Airport bureau de change", "5-8%", "~$590-610"],
          ],
        },
      },
      createAnswerFirstSection(
        "Card vs Cash for Most Modern Trips",
        "For a long weekend in Manhattan, a fee-free travel account (Starling, Chase UK, Monzo or Wise) usually beats every cash option. You get something within 0.5% of the rate you see here, no airport queue, no rough estimate of how much you should change. Carry £50-100 worth of local currency for tipping, taxis from older cab firms and small market vendors. Once your bill arrives, use the [Tip Calculator](/tip-calculator) so you do not over or under tip on top of an already-converted bill.",
        "Two exceptions are worth flagging. First, countries with capital controls or thin ATM networks (Cuba, parts of rural Africa) where pre-purchasing cash is genuinely safer. Second, large transfers above £5,000 where you should compare a dedicated forex platform like Wise or Revolut Business against a live trader feed rather than relying on a once-daily reference rate."
      ),
    ],
    faqs: [
      createFAQ(
        "How fresh are the exchange rates?",
        "Rates update once per working day. The ECB publishes its reference rate around 16:00 CET on weekdays only. Weekend lookups show Friday's closing figure, which is fine for planning but not for trading decisions."
      ),
      createFAQ(
        "Is this the rate I will get at the bank counter?",
        "No. The figure shown is the mid-market or interbank rate, the midpoint between buy and sell. Banks, bureaux and card providers all add a margin. A 'no fee' bureau is rarely free; the margin is hidden in the rate itself. Compare any quote against the figure here to see the real cost."
      ),
      createFAQ(
        "Why does Google show a slightly different rate?",
        "Different providers source rates at different moments and from different feeds. Google often shows a near-real-time rate from XE or Morningstar. This tool shows the ECB's once-daily reference. Differences of 0.1-0.5% are normal and not an error."
      ),
      createFAQ(
        "Should I exchange money before I travel?",
        "Usually not. UK Post Office and high street rates are typically worse than withdrawing local currency from an airport ATM with a fee-free travel card. The exception is destinations with weak ATM coverage or active capital controls."
      ),
    ],
    relatedTools: [
      { slug: "tipping-guide-abroad", label: "Tipping Guide Abroad" },
      { slug: "tip-calculator", label: "Tip Calculator" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
    ],
  },

  "holiday-countdown-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Countdown Runs",
        "Type the trip name and pick the date. The page ticks down in real time, second by second, with milestone messages like 'just 2 weeks away!' as the date approaches. Everything happens in your browser, no sign-in or saving needed. Bookmark the URL with the date selected and the count picks up exactly where it left off when you return.",
        "It is built around the natural shape of holiday anticipation: a gradual build through 8-12 weeks of admin, a sharper escalation in the final fortnight as the actual trip details land, and a near-daily check-in for the last week. The seconds counter is mostly for fun; the days figure is what people actually keep coming back to look at."
      ),
      {
        heading: "When to Tick Off Each Pre-Trip Job",
        table: {
          headers: ["Time before trip", "Job"],
          rows: [
            ["8-12 weeks", "Check passport expiry (6 months validity needed for many destinations), book travel insurance"],
            ["6-8 weeks", "Apply for any visa, book airport parking or transfer"],
            ["4 weeks", "Reserve restaurants and headline activities"],
            ["2 weeks", "Order foreign currency, confirm card abroad will work, set out-of-office"],
            ["1 week", "Run the [Packing List Generator](/packing-list-generator), check weather"],
            ["3 days", "Online check-in, charge devices, freeze fresh food"],
            ["Day before", "Print boarding passes as backup, water plants, set lights on a timer"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why a Visible Counter Helps",
        "Holiday research consistently finds that anticipation is one of the most enjoyable parts of a trip - sometimes rated higher than the trip itself. A visible counter stretches that anticipation across weeks rather than letting it bunch into the last few days. For a family of 4 packing for a Greek beach holiday, a child knowing there are 23 sleeps until departure beats a vague 'soon'.",
        "It also doubles as a planning anchor. Pair it with a [Packing List Generator](/packing-list-generator) so the countdown decreasing visually is matched by checklist items being ticked off. As the days drop below 14, the milestones shift from generic ('only 2 weeks!') to action-prompts ('time to pack'), which keeps the page useful all the way to departure morning."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the countdown carry on if I close the tab?",
        "It is a live timer running in your browser, so it stops when the tab closes. Reopening the bookmarked page recalculates from the current moment against the saved target date, so the count is always accurate when you reload. Nothing is stored on a server."
      ),
      createFAQ(
        "Can I count down to events that are not holidays?",
        "Yes. The label is editable, so it works just as well for a wedding, exam, retirement date or baby due date. Anything with a fixed future date works."
      ),
      createFAQ(
        "What time zone does the countdown use?",
        "Your device's local time. If your trip is to a different time zone, set the date to whichever local midnight you want to count to. For a 03:00 UK departure, set the date to that morning so the count hits zero on departure day."
      ),
      createFAQ(
        "What are the milestone messages?",
        "Automatic prompts that appear based on remaining days, designed to keep the countdown feeling alive across long timeframes. They range from 'over 1000 days!' down to 'it's almost here!' as the date approaches. No setup needed."
      ),
    ],
    relatedTools: [
      { slug: "packing-list-generator", label: "Packing List Generator" },
      { slug: "holiday-countdown", label: "Holiday Countdown" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
    ],
  },

  "jet-lag-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Severity and Recovery Are Worked Out",
        "The rule of thumb most sleep researchers cite is one day of recovery per time zone crossed. The tool flags a trip of 4 hours difference or less as mild, 5-8 hours as moderate, and 9+ hours as severe. A flight from London to New York (5 hours behind) typically takes 3 days to fully shake off, while London to Tokyo (9 hours ahead) can take 5-7 days. London to Sydney is the worst-case for UK travellers, regularly taking a full week to settle.",
        "Direction matters more than most people realise. Eastbound travel is harder because you are asking your body to fall asleep earlier than its internal clock thinks it should. Westbound is gentler because staying up later feels more natural; the human circadian clock runs slightly longer than 24 hours, so it adapts more easily to a longer day than a shorter one."
      ),
      {
        heading: "Common UK Routes and Likely Recovery",
        table: {
          headers: ["Route", "Difference", "Direction", "Typical recovery"],
          rows: [
            ["London - New York", "5 hours", "Westbound", "2-3 days"],
            ["London - Dubai", "4 hours", "Eastbound", "1-2 days"],
            ["London - Bangkok", "7 hours", "Eastbound", "4-5 days"],
            ["London - Tokyo", "9 hours", "Eastbound", "5-7 days"],
            ["London - Sydney", "10-11 hours", "Eastbound", "6-8 days"],
            ["London - Los Angeles", "8 hours", "Westbound", "3-4 days"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Actually Helps on Arrival",
        "Light exposure is by far the biggest lever. Get outside in natural daylight at the right time for the local clock and your circadian rhythm resets faster than any supplement will achieve. Eastbound travellers want morning light on arrival day; westbound travellers want afternoon and evening light. Skipping this and going straight to a hotel room with the curtains drawn is the single most common reason jet lag drags on for an extra few days.",
        "Caffeine and naps both work but timing matters. A 20-minute nap on arrival day is fine; anything over an hour wrecks the next night's sleep. Caffeine has a 5-6 hour half-life, so a 15:00 coffee is still partly active at 21:00. Save your last coffee for around lunch on adjustment days. For longer routes, plan around the [Timezone Meeting Planner](/timezone-meeting-planner) before scheduling any work commitments."
      ),
    ],
    faqs: [
      createFAQ(
        "Does melatonin actually help?",
        "Modest evidence says yes for eastbound trips of 5+ time zones. A 0.5-3mg dose taken 30 minutes before your target local bedtime for the first few nights can help shift your sleep cycle. Larger doses are not more effective and often cause grogginess. Melatonin requires a prescription in the UK."
      ),
      createFAQ(
        "Why is east genuinely worse than west?",
        "Your internal clock runs slightly longer than 24 hours, so it adapts more easily to a longer day (westbound) than a shorter one (eastbound). Pilots and frequent flyers consistently report eastbound legs as harder even on identical time zone gaps."
      ),
      createFAQ(
        "Can I avoid jet lag entirely?",
        "Not really, but you can reduce it. Shift your sleep schedule by an hour per day in the 3 days before departure, sleep on an overnight eastbound flight, hydrate, avoid alcohol on the plane (it disrupts sleep architecture), and get sunlight as soon as you land."
      ),
      createFAQ(
        "How accurate is the recovery estimate?",
        "Up to 4 hours of difference: 1 day. 5-8 hours: roughly 3 days. 9+ hours: half the time zone gap rounded up. These are population averages. Older travellers, poor sleepers and people who already run on a sleep deficit tend to take longer than the figure suggests."
      ),
    ],
    relatedTools: [
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "timezone-meeting-planner", label: "Timezone Meeting Planner" },
      { slug: "currency-converter", label: "Currency Converter" },
    ],
  },

  "luggage-weight-checker": {
    sections: [
      createAnswerFirstSection(
        "Why Bag Limits Catch People Out at the Gate",
        "A typical UK long-haul economy checked allowance is 23kg, with 7-10kg for hand luggage, but the limit varies enormously by airline and fare class. Ryanair and Wizz are the strictest in Europe, allowing only a small under-seat bag for free and charging £25-60 at the gate for anything bigger. British Airways short-haul economy includes one cabin bag plus a personal item; long-haul adds a 23kg checked bag. Emirates is generous in economy at 30kg checked. The difference between best and worst on the same European route can be 25kg of free allowance.",
        "Pick your airline and class and the tool tells you the carry-on and checked allowance, then adds items from a pre-built weight database (laptop ~2kg, jeans ~600g, jacket ~800g, hairdryer ~600g, toiletries kit ~500g) so you can pack against the real limit before you reach the airport. Tracking carry-on and checked totals separately stops the classic mistake of being under on overall weight but over on cabin bag."
      ),
      {
        heading: "Allowances by Common Airline (Economy)",
        table: {
          headers: ["Airline", "Hand luggage", "Checked"],
          rows: [
            ["British Airways (long-haul)", "7kg plus personal item", "23kg included"],
            ["Ryanair", "Small under-seat bag, 10kg cabin extra fee", "20kg fee"],
            ["EasyJet (basic)", "7kg under-seat", "15kg fee"],
            ["Lufthansa", "8kg", "23kg fee or included by fare"],
            ["Emirates", "7kg", "30kg included"],
            ["United (Basic Economy US-EU)", "Personal item only", "23kg, fee may apply"],
          ],
        },
      },
      createAnswerFirstSection(
        "Practical Weight-Saving Tactics",
        "Wear your heaviest items on the plane. Boots and a winter coat together save 1.5-2kg from the case. Decant toiletries into 100ml bottles for cabin bags rather than packing full-size; you can buy more on arrival. Hairdryers and straighteners are usually provided in hotels above 3-star, so leaving them at home saves 600-800g. Once your list is built, compare it against the weights here and the [Packing List Generator](/packing-list-generator) to find easy wins.",
        "If you are over the limit at home, redistribute rather than reduce. Move a heavy book or pair of shoes from the checked bag into your hand luggage if there is room within the cabin allowance. If you are still over, gate fees are 5-10x the cost of paying for extra weight in advance, so add an upgrade online before leaving for the airport."
      ),
    ],
    faqs: [
      createFAQ(
        "Why are Ryanair and EasyJet fees so much higher?",
        "Their core fares are unbundled, so anything beyond a small under-seat bag is an optional extra. This keeps the headline ticket price low but means baggage fees can easily double the cost of a £30 flight. Always price the bag with the ticket when comparing, not afterwards."
      ),
      createFAQ(
        "What happens if my bag is overweight at the desk?",
        "You will be asked either to remove items at the counter (often into hand luggage if there is space) or pay an excess baggage fee, typically £10-15 per kilo over. This is non-negotiable on most low-cost airlines and routinely exceeds £100 for a few extra kilos."
      ),
      createFAQ(
        "Are limits per bag or per passenger?",
        "Both, depending on the airline. Most European carriers use per-bag limits (no single bag over 23kg). North American carriers and many long-haul airlines use a piece concept (one or two pieces, each within a set weight). Check your specific ticket, not the airline's general policy page."
      ),
      createFAQ(
        "How accurate are the database item weights?",
        "Average values for typical items, accurate to within ~30%. A pair of jeans varies from 400g (skinny denim) to 800g (raw denim). For real accuracy, weigh your packed bag using bathroom scales by weighing yourself first, then weighing yourself holding the bag."
      ),
    ],
    relatedTools: [
      { slug: "packing-list-generator", label: "Packing List Generator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
    ],
  },

  "packing-list-generator": {
    sections: [
      createAnswerFirstSection(
        "How the List Builds Itself",
        "Pick the trip type (beach, city, mountains, cold), the duration (weekend through to a month), and tick any activities you have planned (hiking, dining out, photography, business meetings, swimming, skiing, camping, gym). The tool merges a base list for the destination with extras for each activity, deduplicates, and groups everything by category. A typical adult beach trip generates around 30 items; a family of 4 can easily reach 50+ once you add toys, snacks and spare changes.",
        "Tick items off as you pack to track progress. The whole list exports as a JPG you can save to your phone or print as a single A4 page. Categories are passport-style essentials first, then clothes, activity-specific kit, toiletries and electronics, so the order roughly matches how most people actually pack a case."
      ),
      {
        heading: "Typical Item Counts by Trip Type",
        table: {
          headers: ["Trip type", "Base items", "With 2 activities", "Suitcase guide (1 person, 1 week)"],
          rows: [
            ["Beach holiday", "~30", "~38", "Fits a 55L cabin or small checked bag"],
            ["City break", "~28", "~36", "Cabin only is realistic for 3-4 days"],
            ["Mountains / outdoors", "~35", "~45", "Hiking-specific kit pushes to checked"],
            ["Cold climate", "~40", "~48", "Bulky layers usually require checked"],
          ],
        },
      },
      createAnswerFirstSection(
        "What People Actually Forget",
        "Chargers and adapters top the list, especially for trips outside the EU and UK. A US plug looks like a UK USB charger should fit until you arrive at JFK and it absolutely does not. Other chronic offenders: prescription medication (always in hand luggage, never the hold), reading glasses, a swimsuit (for unexpected hotel pool moments), and a reusable water bottle for the airport. Ryanair and EasyJet do not provide free water on board.",
        "If you are flying with kids, pack a change of clothes for each child in the carry-on regardless of trip length. Cabin luggage delays and spills happen, and a clean t-shirt costs nothing in luggage weight. Once your list is built, run it through the [Luggage Weight Checker](/luggage-weight-checker) to make sure it actually fits your airline's allowance."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I really pack 50% less than I think?",
        "For most trips, yes. Travellers consistently overpack, especially on the first trip of any new holiday style. You can buy toiletries, basic clothes and most necessities at the destination if needed. The exceptions: prescription medication, specific shoes you have broken in, and items you will struggle to find abroad."
      ),
      createFAQ(
        "Does the list account for destination weather?",
        "It uses the trip type as a proxy. A 'cold climate' list assumes layers and waterproofs; 'beach' assumes warm and sunny. For shoulder-season trips where weather is unpredictable, pick the colder option and add a single layer. You can always wear less, you cannot wear more."
      ),
      createFAQ(
        "Can I add items the tool does not include?",
        "The list is a starting point, not a maximum. Once you have it on screen or printed, scribble on extras you know you need - sketchbooks, sleep aids, specific contact lens solution. The export is a JPG specifically so you can annotate it with a phone."
      ),
      createFAQ(
        "How should I split between hand luggage and checked?",
        "The list does not split by bag because that depends heavily on your airline. Once you have the full list, decide which essentials must travel with you (medication, documents, electronics, one outfit) and put everything else in checked. The Luggage Weight Checker can split the totals by bag type."
      ),
    ],
    relatedTools: [
      { slug: "luggage-weight-checker", label: "Luggage Weight Checker" },
      { slug: "holiday-countdown-generator", label: "Holiday Countdown Generator" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
    ],
  },

  "sunrise-sunset-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why Latitude, Date and Time Zone All Matter",
        "Sunrise and sunset times depend on three things at once: latitude (how far north or south you are), the date (where Earth sits in its orbit), and the local time zone. A summer day in Reykjavik (~64°N) has 21+ hours of daylight; the same spot in mid-December has under 5. Equator cities like Quito or Singapore barely vary across the year, sitting around 06:15-18:25 every month. A photographer planning a sunrise hike up Pulpit Rock in May needs all three numbers, not just a city name.",
        "This tool uses pre-calculated reference data for 13 latitude bands from 60°N to 60°S, accurate to within roughly 10-15 minutes for the middle of each month. For exact times at a specific location, official sources like timeanddate.com or HM Nautical Almanac Office data compute to the nearest minute."
      ),
      {
        heading: "How Day Length Varies by Season",
        table: {
          headers: ["Latitude", "Example", "21 June", "21 December"],
          rows: [
            ["60°N", "Iceland, Bergen", "~24 hours", "~5 hours"],
            ["50°N", "London, Vancouver", "~17 hours", "~8 hours"],
            ["40°N", "New York, Madrid", "~15 hours", "~9 hours"],
            ["30°N", "Cairo, Houston", "~14 hours", "~10 hours"],
            ["Equator", "Quito, Singapore", "~12 hours", "~12 hours"],
            ["30°S", "Sydney, Cape Town", "~10 hours", "~14 hours"],
            ["50°S", "Falkland Islands", "~8 hours", "~17 hours"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Travellers and Photographers Use This For",
        "Golden hour (roughly 30-60 minutes after sunrise and before sunset) is when light is warmest and shadows are softest, and is when most travel and landscape photography looks its best. The tool flags approximate windows for each latitude and month so you can plan a 06:00 hike up Pulpit Rock in Norway to catch sunrise over the fjord, or schedule dinner on a Greek balcony to coincide with the colour. The [Timezone Meeting Planner](/timezone-meeting-planner) is useful alongside if you are coordinating any of this with people back home.",
        "It is also handy for the basics: when does it get dark in Reykjavik in October (around 17:00), how late will it stay light for a 21:00 walk in Copenhagen in June (broad daylight), what time do you need to be up to catch sunrise from the Arctic Circle in winter (you do not - polar night means the sun does not rise at all). The tool flags 'midnight sun' or 'polar night' for those latitudes when relevant."
      ),
    ],
    faqs: [
      createFAQ(
        "What about midnight sun and polar night?",
        "Above roughly 66.5°N or below 66.5°S, the sun does not set for part of the summer and does not rise for part of the winter. The N60° band in this tool flags midnight sun for June and July as an approximation. For exact start and end dates at your specific latitude, timeanddate.com is more precise."
      ),
      createFAQ(
        "Are the times in local time or UTC?",
        "Local time at the latitude shown, assuming the standard time zone for that region. If your destination sits on the eastern or western edge of its time zone, actual times can differ by 30-60 minutes. Daylight saving shifts add another hour during summer in most temperate countries."
      ),
      createFAQ(
        "How accurate is this compared to a real almanac?",
        "Within 10-15 minutes at the middle of any month, less accurate near the start and end. Built for trip planning, not navigation or astronomy. For tide times, eclipses or anything safety-critical at sea, use the Royal Observatory's HM Nautical Almanac Office data instead."
      ),
      createFAQ(
        "What is the difference between civil twilight and sunset?",
        "Sunset is the moment the sun's upper edge drops below the horizon. Civil twilight continues for around 30 minutes after, when there is enough natural light to see without artificial illumination. Photographers' 'blue hour' falls in the second half of civil twilight."
      ),
    ],
    relatedTools: [
      { slug: "time-zone-converter", label: "Time Zone Converter" },
      { slug: "holiday-countdown-generator", label: "Holiday Countdown Generator" },
      { slug: "distance-calculator", label: "Distance Calculator" },
    ],
  },

  "timezone-meeting-planner": {
    sections: [
      createAnswerFirstSection(
        "How the Overlap Calculation Works",
        "Pick the time zones for everyone joining. The tool finds every 30-minute window where every selected zone is between 09:00 and 17:00 local. A freelancer in London (GMT) trying to schedule a Zoom with a client in Mumbai (IST, +5:30) and a partner in Los Angeles (PST, -8) will find that there is no time of day where all three are in standard work hours - one party always has to flex. The visual timeline highlights this with green cells for working hours, amber for early-morning or evening edges, and grey for night.",
        "The next-best windows show themselves quickly once you see the timeline. London-Mumbai overlaps from about 09:30-12:30 GMT (15:00-18:00 IST). London-LA overlaps 17:00-18:00 GMT (09:00-10:00 PST). For all three together, you have to pick whether London takes a late call, LA takes an early call, or India takes an evening call. Rotating which zone takes the unsociable slot is the simplest way to keep distributed teams sane."
      ),
      {
        heading: "Common Multi-Zone Patterns",
        table: {
          headers: ["Zones involved", "Realistic overlap (work hours)", "Compromise needed?"],
          rows: [
            ["London + Paris", "08:00-16:00 GMT (full)", "None"],
            ["London + New York", "13:00-17:00 GMT", "None within 9-5 each side"],
            ["London + Mumbai", "09:30-12:30 GMT", "Mumbai works late afternoon"],
            ["London + Tokyo", "00:00-08:00 GMT", "One side outside work hours"],
            ["London + Sydney", "22:00-07:00 GMT", "One side outside work hours"],
            ["UK + India + US East", "13:00-13:30 GMT only", "India works late, US works early"],
            ["UK + India + US West", "No overlap in 9-5", "One zone always flexes"],
          ],
        },
      },
      createAnswerFirstSection(
        "Practical Tips for Distributed Teams",
        "Daylight saving is the silent killer. The UK, EU and US all switch on different weekends, meaning recurring meetings drift by an hour 4 times a year. Always confirm the actual local time on the meeting invite in the week after a clock change. Also worth knowing: India, Japan and most of Australia do not observe daylight saving at all, so a recurring call with Mumbai shifts forward an hour every March from a UK perspective and back again in October.",
        "If you are flying internationally for a meeting rather than dialling in, run the [Jet Lag Calculator](/jet-lag-calculator) first - scheduling a 09:00 client meeting on the morning after a London-Tokyo flight is rarely productive for either side. For three-zone calls, a 30-minute slot at 14:00 UK is reachable by Mumbai (19:30) and US East (09:00) but tight for everyone."
      ),
    ],
    faqs: [
      createFAQ(
        "Does this account for daylight saving time?",
        "The tool uses static UTC offsets (e.g. New York is UTC-5, London is UTC+0). During British Summer Time (late March to late October) London is actually UTC+1, and Eastern Daylight Time shifts New York to UTC-4. For meetings in the next few weeks, double-check using your operating system's time zone settings; for a date 3 months out, the standard offsets are usually right."
      ),
      createFAQ(
        "What if there is genuinely no overlap?",
        "For UK + Sydney + LA, there is no time when all three are in 9-5. Solutions: split into two calls, switch to asynchronous tools like Loom or a shared doc instead of a meeting, or accept that one zone will always be on a flexed schedule. The timeline flags this when it happens."
      ),
      createFAQ(
        "Can I save the result?",
        "Not directly. Bookmark the URL with your selected zones (the state is held in the browser, not a database). For recurring meetings, screenshot the timeline as a reference for your team."
      ),
      createFAQ(
        "Why is the working day set to 9-5?",
        "It is a starting assumption. For teams with different conventions (4-day weeks, 8-4 schedules, evening shifts), use the visual timeline to find your actual overlap rather than relying on the green band. The hour cells are clickable so you can pick any time."
      ),
    ],
    relatedTools: [
      { slug: "time-zone-converter", label: "Time Zone Converter" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
    ],
  },

  "tip-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Tipping Varies by Country",
        "There is no single 'correct' tip rate, which is why this tool asks for the country first. In the United States, 18-20% on the pre-tax bill is now standard at sit-down restaurants, with 15% at the very low end. In the United Kingdom, 10-12.5% is normal and is often already added as a discretionary service charge. In Japan, tipping is not expected and can come across as rude or confusing - servers have been known to chase tourists out of the restaurant to return what they assumed was forgotten cash.",
        "Pick a country, type the bill, choose how many of you are splitting it, and the tool returns the tip amount, total bill and per-person figure. The quick-select buttons cover the typical low and high range for that country, so a Brit eating in Lisbon sees 5%, 10% and the typical 5% rather than a US-default 20% they would feel obliged to leave."
      ),
      {
        heading: "Tipping Norms by Common Travel Destination",
        table: {
          headers: ["Country", "Restaurant tip", "Already added?", "Cab tip"],
          rows: [
            ["United States", "18-20% (15% low end)", "Rarely; sometimes for groups 6+", "10-15%"],
            ["United Kingdom", "10-12.5%", "Often as 'optional' service charge", "Round up or 10%"],
            ["France", "Service compris (built in)", "Yes, by law since 1987", "Round up"],
            ["Italy / Spain / Germany", "5-10% if happy", "'Coperto' cover charge, not a tip", "Round up"],
            ["Japan", "0%, not expected", "No", "0%"],
            ["Singapore / Hong Kong", "Service charge (~10%) added", "Yes", "Round up"],
            ["Mexico / Brazil", "10-15%", "Sometimes (10% in Brazil)", "10%"],
            ["Australia / New Zealand", "10% if great service", "No", "Round up"],
          ],
        },
      },
      createAnswerFirstSection(
        "Watch for Service Already Added",
        "In the UK, many restaurants add a 'discretionary service charge' of 10-12.5% to bills, especially for groups. It is genuinely optional - you can ask for it removed if service was poor - but the calculator does not know it is there. Check the bottom of the bill before adding anything on top. In the US, parties of 6 or more often have an 'auto-grat' of 18% pre-applied. In France, 'service compris' has been the law since 1987, so any tip is genuinely a small extra rather than a top-up.",
        "Use the result here as a starting point, then sense-check against the bill before paying. If you are converting from a foreign currency to budget mentally in pounds, the [Currency Converter](/currency-converter) gives a quick approximation against the same mid-market reference rates banks use."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I tip on the pre-tax or post-tax total?",
        "In the US, tradition is pre-tax, but most modern card terminals calculate the suggested tip on the post-tax total. Either is socially acceptable. Tipping on the pre-tax total (which this calculator does if you enter that figure) is closer to the historic norm."
      ),
      createFAQ(
        "Do I tip when I order at the counter?",
        "In the US, yes, increasingly so; tablet payment screens prompt for 15-25% even for a takeaway coffee. £1-2 or rounding up is fine. In Europe and Asia, no, this is not expected for counter service."
      ),
      createFAQ(
        "What about hotel staff and tour guides?",
        "Hotel housekeeping in the US: $2-5 per night, left on the pillow. Concierge: $5-20 for substantial help. Tour guides on day trips: $5-10 per person for a half day, $10-20 for a full day. Many countries outside North America have no expectation of tipping these roles."
      ),
      createFAQ(
        "Why is Japan listed as 0%?",
        "Tipping is not part of Japanese restaurant culture. Service is included in the price, and good service is considered a baseline expectation, not something to incentivise. Leaving extra cash on the table can cause genuine confusion; staff sometimes chase tourists to return money they think was forgotten."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "tipping-guide-abroad", label: "Tipping Guide Abroad" },
      { slug: "us-tip-calculator", label: "US Tip Calculator" },
    ],
  },
};
