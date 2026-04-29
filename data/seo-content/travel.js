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

  "travel-budget-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Money Do You Actually Need For a Trip?",
        "The Travel Budget Calculator splits your spending into the four buckets that actually matter: accommodation (40% of daily costs), food (35%), activities (15%) and other (10%), with flights and inter-city transport added on top as a one-off. For a 7-day mid-range trip to Portugal at £75 a day, that comes out to £210 for hotels, £184 for food, £79 for activities, £52 for incidentals and £525 daily across the week, plus whatever you paid for the flight.",
        "These daily figures are calibrated against 2025-2026 published averages from Numbeo, Lonely Planet's Thrifty/Mid-range/Comfort tiers, and Reddit's r/travel cost reports. Mid-range Lisbon really is around £75 a day in 2026 if you stay in a 3-star hotel in Alfama, eat at neighbourhood tascas, and visit two or three paid attractions. Budget Bangkok still sits near £30 a day, mid-range Tokyo around £100, and luxury Italy can blow past £220 once you add a wine region detour. The percentages stay constant across destinations because that is roughly how spending splits regardless of country."
      ),
      createAnswerFirstSection(
        "Why the 40/35/15/10 Split Is the Right Frame",
        "The biggest budgeting mistake is lumping everything into a single \"daily spend\" figure and then panicking when one category overruns. Splitting it shows where you have flexibility: you cannot easily change your accommodation choice mid-trip, but you absolutely can downgrade three sit-down dinners to street food and protect the activities budget. A solo traveller in Hanoi might spend 25% on accommodation and 50% on food because hostels are cheap and pho is everywhere; a couple in Tuscany inverts that ratio.",
        "Treat the transport-on-top number seriously. Long-haul flights from London to Tokyo in shoulder season run £700-£900 economy in 2026; flights to Lisbon are £80-£150; an internal Tokyo-Kyoto Shinkansen is around £100 single. Add airport transfers (£40 each way to most European capitals from a budget airport, more in the US where you also tip the driver). For multi-city trips use the [Flight Time Calculator](/flight-time-calculator) to sense-check leg distances before pricing inter-city flights."
      ),
      createAnswerFirstSection(
        "Worked Example: 10 Days in Japan, Mid-Range",
        "Pick Japan, mid-range style at £100 a day, 10 days, with a £750 return flight added: accommodation £400, food £350, activities £150, other £100, plus £750 transport. Total: £1,750 in-country plus £750 to fly, so £2,500 all in. That maps to a 3-star business hotel like Hotel MyStays at £80-£100 a night, two ¥1,500 ramen meals and one ¥3,000-¥4,000 izakaya dinner most days, two paid attractions every couple of days (Shinjuku Gyoen ¥500, teamLab Borderless ¥3,800), plus a 7-day JR Pass at around £230 of the ¥150 daily activity allowance.",
        "If you are stretching: cut food to £25 a day with convenience store breakfasts (¥500), lunch sets (¥800-¥1,200) and one bigger dinner. If you are upgrading: move to luxury at £250 a day for ryokans with kaiseki dinners and that £1,750 becomes £3,250 on its own. Save the budget result and pair it with the [Travel Money Calculator](/travel-money-calculator) to see what those daily figures look like in yen at today's rate, and the [Packing List Generator](/packing-list-generator) so you do not blow £80 on Tokyo airport socks because you forgot a pair."
      ),
      createAnswerFirstSection(
        "Common Hidden Costs That Wreck Travel Budgets",
        "Tourist taxes have crept up since 2024 and almost nobody factors them in. Lisbon now charges €4 per person per night, Barcelona €4 plus city surcharge, Venice €5-€10 day-tripper fee on peak dates, Tokyo a flat ¥1,000 (about £5) departure tax. Across a 7-day European trip for two that is comfortably £100 most people forget. Travel insurance is another £25-£50 for a fortnight, ESIM data plans £10-£20 for a region, and visa or ETA fees range from £6 (UK ETA from 2026) to £147 (US ESTA + biometrics for some nationalities).",
        "Currency conversion fees can quietly cost 3-5% if you use a high-street debit card abroad. A Revolut, Wise or Chase travel card removes nearly all of that, which on a £2,000 trip saves £60-£100 outright. Always say no when the card terminal asks if you want to be charged in pounds rather than the local currency: that is dynamic currency conversion and it adds 4-7% to every transaction. Check your destination's [tipping norms](/tipping-guide-by-country) before you go because in the US 18-20% on every restaurant bill across a week can add £100+ that the daily food figure does not include."
      ),
    ],
    faqs: [
      createFAQ(
        "How much should I budget per day for Europe?",
        "Western Europe in 2026: budget travel £40-£50 a day in Portugal or Greece, £50-£60 in Spain, £60-£75 in France or Italy, £80-£100 in Switzerland or Iceland. Mid-range adds 50-80% to those figures. Eastern Europe (Czechia, Poland, Hungary) is £30-£45 a day budget, £55-£75 mid-range. These exclude flights and exclude the £30-£50 a day many people end up adding for inter-city trains."
      ),
      createFAQ(
        "Is £1,000 enough for a week in Thailand?",
        "Easily, even at mid-range. £1,000 covers £700 in-country (£60 a day for 7 days for accommodation, food, activities, transfers) plus £300 toward your flight, though London to Bangkok return is closer to £550-£700 in shoulder season. Realistically budget £1,300-£1,500 for a comfortable week including flights. Backpacker style with hostels and street food works on £400-£500 in-country, and four-star Phuket beach resorts push it past £1,500 fast."
      ),
      createFAQ(
        "Should I include a contingency in my travel budget?",
        "Yes, add 15% on top of the calculated total. Flight delays, an unplanned taxi when the train strikes, an emergency dental visit, a sudden weather pivot to indoor museums, a missed connection that needs a hotel: something always happens. On a £2,000 trip that is £300 set aside, often unspent, occasionally a lifesaver. Keep it on a separate card or as a backup balance you do not touch unless something breaks."
      ),
      createFAQ(
        "How do flight prices compare across seasons?",
        "European short-haul: peak season (mid-June to August, Christmas week) costs 60-100% more than shoulder season (April-May, September-October). Long-haul Asia and the US: peak adds 40-70%. Cheapest months for most destinations are January, February and early November. Booking 2-4 months ahead for shoulder, 4-6 months ahead for peak, gives the best price; last-minute deals are mostly a myth in 2026 because airlines have got good at yield management."
      ),
      createFAQ(
        "Is travel insurance worth it for a short European break?",
        "Yes, even for a long weekend. Annual multi-trip cover is £25-£60 and pays out for cancellations, lost bags and medical care. The free EU GHIC card from gov.uk covers state-provided emergency healthcare in EU countries but does not cover repatriation, private hospitals, lost baggage or trip cancellation. One bad ankle break in a Greek private clinic can run £4,000+ before insurance, so the £15 single-trip premium is the easiest budget line to justify."
      ),
    ],
    relatedTools: [
      { slug: "travel-money-calculator", label: "Travel Money Calculator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "packing-list-generator", label: "Packing List Generator" },
      { slug: "tipping-guide-by-country", label: "Tipping Guide By Country" },
    ],
  },

  "flight-time-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Flight Time Calculator Works",
        "Pick a city pair (or enter a custom distance in km or miles) and the calculator divides distance by an average cruise speed of 850 km/h, then adds 30 minutes of overhead for taxi, take-off, climb, descent and landing. London to New York at 5,570 km comes out at roughly 6 hours 56 minutes block time. London to Tokyo at 9,570 km lands near 11 hours 45 minutes. Sydney from Heathrow at 17,000 km is around 20 hours 30 minutes total flight time, which is why it is almost always flown as two legs.",
        "These are great-circle distances, the shortest path over a sphere, which is what airlines actually fly when winds and airspace permit. Real-world block times are usually 10-30 minutes longer eastbound (against the jet stream) and 10-30 minutes shorter westbound (with it). London to New York eastbound averages 7h 30m on schedule, westbound 6h 30m, so split the difference and the calculator's 6h 56m is a fair midpoint estimate. Use the [Time Zone Converter](/time-zone-converter) to figure out what time you actually land at the destination."
      ),
      createAnswerFirstSection(
        "Why Real Flight Times Differ From the Estimate",
        "Three things move the number around: jet stream tailwinds and headwinds (up to 200 km/h difference at cruise altitude), routing detours around restricted airspace (Russia closed to most Western carriers since 2022 added 1-3 hours to many Asia routes), and ground hold for traffic congestion at hubs like Heathrow, JFK and Singapore. London to Singapore on the old polar route was 13h 20m; via the southern route over Turkey and India it is 13h 50m to 14h 30m on most carriers in 2026.",
        "The estimate also does not include connection time, immigration queues, baggage claim or transfer to your final accommodation. Add 1-2 hours for short-haul connections, 2-3 hours for long-haul transfers (Dubai is fast, LAX immigration on a non-US passport can chew through 90 minutes alone), and 30-90 minutes for arrival processing. Door-to-door London to Sydney via Singapore typically runs 26-28 hours including layovers. If you are doing it for the first time, the [Jet Lag Calculator](/jet-lag-calculator) plans your light exposure and meal timing so the second day does not flatten you."
      ),
      createAnswerFirstSection(
        "Common Routes and What to Expect",
        "Short-haul European: London to Paris 1h 30m, London to Amsterdam 1h 25m, London to Rome 2h 50m, London to Madrid 2h 30m. Mid-haul: London to Dubai 7h, London to New York 7h-8h, New York to Los Angeles 6h 15m. Long-haul: London to Tokyo 11h 45m, Los Angeles to Tokyo 11h 30m, London to Bangkok 11h 40m. Ultra long-haul: London to Sydney 21h+ (always with a stop), Singapore to Newark 18h 45m (Singapore Airlines, the longest scheduled flight in the world).",
        "Domestic distances surprise people. Toronto to Vancouver is 3,360 km - longer than London to Cairo. Sydney to Perth is 3,300 km, a 5-hour flight in a country most foreigners assume is small enough to drive across in a weekend. Honolulu from Los Angeles is 3,840 km and 5h 45m, why Hawaii feels much further than it looks on most maps. The calculator covers 30 named routes plus a custom distance field for anything else."
      ),
      createAnswerFirstSection(
        "Using Flight Time For Practical Trip Planning",
        "Two scenarios where this matters. First: scheduling onward connections. If you land at JFK at 6pm local from London (11pm UK time) and need to fly internal to Miami, build in at least 3 hours for immigration, baggage and the inter-terminal walk; book your Miami flight no earlier than 9pm local. Second: stopover decisions. London to Bangkok direct is 11h 40m on Thai or BA; via Doha or Dubai is 14-16h with a 90-minute layover, but typically £100-£300 cheaper. Worth it if you can sleep on a plane, painful if you cannot.",
        "For families with small children, anything over 6 hours benefits from a stopover. Tokyo direct from Heathrow with a 2-year-old is rough; breaking it in Doha for a hotel night turns 11h 45m of pain into two manageable 6-hour legs. Pair the result with the [Travel Budget Calculator](/travel-budget-calculator) to factor stopover hotel costs into the total. Long-haul economy seats are 31-32 inches of pitch on most airlines now in 2026, down from 34 a decade ago, so anything past 8 hours starts feeling cramped if you are over six foot."
      ),
    ],
    faqs: [
      createFAQ(
        "How accurate is the 850 km/h average?",
        "It is a fair average across the Boeing 777, 787, 737 and Airbus A320, A350, A380 fleet. Cruise speed for those aircraft ranges from Mach 0.78 to Mach 0.86 (about 830-920 km/h true airspeed at altitude). 850 km/h matches typical block-time scheduling. Slower turboprops on regional routes (ATR-72, Dash-8) cruise at 500-560 km/h, so for those add 50-60% to the estimate."
      ),
      createFAQ(
        "Why does the estimate not match Google's flight time?",
        "Google Flights pulls actual scheduled times from airline data, which include taxi-out, taxi-in, route extensions and seasonal jet stream effects. The calculator gives you a clean great-circle estimate. For ballpark planning the two will be within 30-45 minutes; for booking, always trust the airline's published schedule."
      ),
      createFAQ(
        "What is the longest non-stop commercial flight?",
        "As of 2026: Singapore Airlines SQ23/SQ24 between Singapore and Newark, around 18h 45m and 15,300 km, on the Airbus A350-900ULR. Qantas's Project Sunrise (London to Sydney non-stop, around 22 hours) is scheduled to launch in 2027 on the A350-1000ULR with extended fuel tanks. Ultra long-haul flights are typically 5-10% slower than shorter routes because they cruise more efficiently to conserve fuel."
      ),
      createFAQ(
        "How much earlier than scheduled departure should I arrive?",
        "Domestic short-haul Europe: 90 minutes before departure with hand luggage only, 2 hours with hold bags. International long-haul: 3 hours, particularly at Heathrow, JFK and CDG where security and immigration queues spike unpredictably. US domestic on a busy day: 2 hours. Add 30 minutes for any flight from a regional airport you do not know."
      ),
      createFAQ(
        "Can the calculator handle flights with a stopover?",
        "Calculate each leg separately, then add the layover time. London to Tokyo via Doha: London-Doha 6h 45m + 1h 30m layover + Doha-Tokyo 9h 15m = 17h 30m total. Doha-Dubai stopovers are often 90 minutes; Singapore stopovers can be 3-4 hours; airlines deliberately build in slack at hubs to handle delays without missing connections."
      ),
    ],
    relatedTools: [
      { slug: "time-zone-converter", label: "Time Zone Converter" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
      { slug: "world-clock", label: "World Clock" },
    ],
  },

  "travel-visa-checker": {
    sections: [
      createAnswerFirstSection(
        "Do I Need a Visa? The Quick Answer",
        "Pick your nationality and your destination and the checker returns one of five outcomes: visa-free, visa-on-arrival, e-visa, ETA / ESTA / similar electronic authorisation, or full embassy visa required. UK passport holders are visa-free in 188 countries in 2026, including all of Schengen (90 days in any 180), the US (90 days under the Visa Waiver Programme but ESTA required), Japan (90), Thailand (60 from July 2024), and Australia (eVisitor, free, online).",
        "The checker covers 30+ destination-nationality pairs with the standard short-stay tourist rules. It does not cover business, student, work or transit categories - those have separate visa classes everywhere. Stay durations shown (90 days, 180 days, etc.) are the maximum length of a single visit, not an annual cap. In Schengen the rule is 90 days in any rolling 180-day period across the whole zone, not 90 per country. Overstay even by one day and the next entry can be refused."
      ),
      createAnswerFirstSection(
        "ETAs, ESTAs and the New Wave of Pre-Travel Authorisations",
        "Three big changes since 2024: ETIAS (the EU's pre-travel authorisation, €7, valid 3 years, applies to UK and other visa-exempt nationals when it launches in late 2026), the UK ETA (£10 from January 2025, applies to most non-British and non-Irish visitors), and the US ESTA (still $21 for VWP nationals, valid 2 years). These are not visas; they are pre-screening that lets the airline confirm you can board. Apply at least 72 hours before travel; airlines will not let you board without one if your nationality requires it.",
        "Common gotcha: dual nationals. If you hold both an Irish and British passport, travel on Irish to enter the EU and skip ETIAS entirely. If you hold both US and Canadian, travel on Canadian to skip ESTA. The destination's rules apply to the passport you actually present at check-in and immigration. Always carry the passport you applied for the ETA / visa with - immigration will refuse entry if your name on the e-visa does not match exactly."
      ),
      createAnswerFirstSection(
        "Visa-on-Arrival vs E-Visa: The Practical Difference",
        "Visa-on-arrival means you queue at immigration on landing, fill in a form, pay (Thailand THB 2,000 cash, Egypt $25, Indonesia IDR 500,000) and get a stamp. Lines can take 30-90 minutes at busy airports. E-visa means you apply online days or weeks ahead, pay by card, get a PDF emailed back, and skip the queue (or use the e-visa fast-track lane). Vietnam, Turkey, India and Egypt all offer e-visas now in 2026; Thailand still uses visa-on-arrival for short stays from countries that do not have the bilateral 60-day visa exemption.",
        "If a country offers both an e-visa and visa-on-arrival for your nationality, always choose the e-visa unless you are arriving by land border where it may not be accepted. India's e-visa is the most paperwork-heavy: passport scan, photo, employment details, addresses for the past two years, and £24-£60 depending on duration. Turkey's is fastest: 5 minutes online, $20-$50 by nationality. Pair this with the [Travel Budget Calculator](/travel-budget-calculator) so the visa fee is in your trip total, not a surprise at the airport."
      ),
      createAnswerFirstSection(
        "Passport Validity, Blank Pages and the Six-Month Rule",
        "Most countries require 6 months of validity beyond your intended date of departure. The Schengen area officially says 3 months, but airlines often refuse to board you with under 6 months as a safety margin. The US, China, Indonesia, Singapore, Thailand and most of South-East Asia enforce 6 months strictly. Renew your passport if it expires inside 9 months from any planned trip; the UK fast-track 1-week service costs £142 in 2026, the standard 3-week costs £88.50.",
        "Blank pages: the US needs at least one, China two, India two, Egypt one. If your passport is filling up (visas, stamps, residence permits) check before booking long trips - immigration can refuse entry on insufficient blank pages even with valid visas. Some countries allow ESTA / ETA in lieu of a visa stamp and so use less paper. The first thing to do at home before any international trip is check your passport's expiry, blank pages and any stamps or residence stickers from previous travel that may complicate entry."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between Schengen and the EU?",
        "The Schengen Area is the borderless zone covering 29 countries: most EU members plus Norway, Iceland, Switzerland and Liechtenstein. Cyprus and Ireland are EU but not Schengen; Switzerland and Norway are Schengen but not EU. A Schengen visa lets you travel freely across all 29; an Irish or Cyprus visa is separate. The 90-in-180 day rule applies across the whole Schengen zone as a single block."
      ),
      createFAQ(
        "Can I work on a tourist visa?",
        "No, anywhere. Tourist visas explicitly prohibit paid work, including remote work for a foreign employer in some interpretations. Digital nomads in 2026 should look at dedicated digital nomad visas: Portugal D7 / D8, Spain digital nomad visa, Croatia digital nomad permit, Estonia e-residency. Working on a tourist stamp risks deportation, fines and entry bans of 5-10 years. The risk varies by country and how you draw attention to yourself, but the rules are clear."
      ),
      createFAQ(
        "What if I overstay my visa accidentally?",
        "Penalties scale with the country. Schengen overstay can result in entry bans of 1-5 years and fines of €500-€1,000. Thailand charges THB 500 per day overstay up to a maximum of THB 20,000, then arrest and deportation. The US considers any overstay grounds to invalidate your VWP for life - you would need a B1/B2 visa for future trips. Always count days carefully, especially with split Schengen trips, and the UK ETA / EU ETIAS will eventually make tracking automatic."
      ),
      createFAQ(
        "Do children need their own visa or ETA?",
        "Yes. Every traveller, including infants, needs their own passport and (where applicable) their own visa, ETA, ESTA or ETIAS. Family applications can sometimes be filed together but each person gets their own authorisation tied to their own passport. The fee applies per person: a UK family of four travelling to the US will pay 4 x $21 ESTA, total $84."
      ),
      createFAQ(
        "Can I rely on this checker for booking flights?",
        "Use it as a first sanity check, not a final answer. Always verify with the destination country's official immigration website (gov.uk/foreign-travel-advice for UK travellers, travel.state.gov for US, IATA Travel Centre for cross-checks) within 14 days of your trip. Visa rules change with politics: Russia tightened in 2023, Thailand loosened in 2024, China resumed visa-free for several nationalities in late 2024. The checker reflects rules as of early 2026 but always reconfirm closer to departure."
      ),
    ],
    relatedTools: [
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "time-zone-converter", label: "Time Zone Converter" },
      { slug: "currency-converter", label: "Currency Converter" },
    ],
  },

  "time-zone-converter": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Time Zone Converter",
        "Pick a source time zone (UTC-12 to UTC+14, with the half-hour zone for India at UTC+5:30 included), set the time you want to convert, then pick the destination zone. The converter handles the wraparound across the date line: if it is 9pm Tuesday in London (UTC+0) and you convert to Sydney (UTC+10), it shows 7am Wednesday. UTC-5 (New York) when it is 6pm London is 1pm; UTC-8 (Los Angeles) is 10am the same day. UTC+9 Tokyo when it is 6pm London is 3am the next morning.",
        "Note that this is UTC offsets, not country names. Most countries that use Daylight Saving Time shift their offset by one hour twice a year - London moves between UTC+0 (winter) and UTC+1 (summer, BST), New York between UTC-5 (EST) and UTC-4 (EDT), Sydney between UTC+10 and UTC+11. If you are scheduling a meeting across DST boundaries, check both ends a week before the call - DST start dates differ between Europe (last Sunday of March) and the US (second Sunday of March), so for two weeks in March there is an extra hour gap that catches everyone out."
      ),
      createAnswerFirstSection(
        "When You Actually Need a Time Zone Converter",
        "Three real-world cases where the maths bites. First: scheduling a Zoom call. London 4pm with a New York colleague is 11am their time - manageable. London 4pm with a Singapore colleague is 11pm their time - they should not be expected to take it. London 4pm with Sydney is 3am the next morning - genuinely cruel without a strong reason. The 8am-7pm civilised window in Singapore is midnight to 11am in London; for Sydney it is 9pm previous evening to 8am London time.",
        "Second: catching live sport or live TV. The 2026 World Cup final in Mexico City kicks off in local UTC-6, so for UK viewers (UTC+0 in November) that is 6 hours ahead. Third: scheduling a flight arrival or pickup. Tokyo lands at 3pm local; if you booked a hotel airport transfer, confirm the local time, not your home time, or you will sit at Narita for 9 hours. The [World Clock](/world-clock) lets you watch multiple zones live; this converter is for one-off calculations."
      ),
      createAnswerFirstSection(
        "Daylight Saving Time and Why It Breaks Plans",
        "About 70 countries use DST, but the dates differ. EU: last Sunday of March (clocks forward) and last Sunday of October (back). US and Canada: second Sunday of March and first Sunday of November. Australia: first Sunday of October (forward, in southern states only) and first Sunday of April (back). Most of Africa, Asia and South America do not use DST at all. For two weeks in March every year, the US is on Daylight Time but Europe is not, so the London-New York gap drops from 5 hours to 4. Then Europe catches up in late March and the gap goes back to 5.",
        "Iceland, Russia, Argentina, India, China, Japan, South Korea and most of the Middle East do not observe DST. The EU has voted twice to abolish DST and twice failed to implement it; as of 2026 no abolition is scheduled. If you are setting recurring meetings across multiple zones, set them in UTC and let each participant interpret locally - that avoids the twice-yearly drift entirely."
      ),
      createAnswerFirstSection(
        "Common Time Zone Pairs and Standard Differences",
        "London to New York: -5 hours winter, -4 hours summer (EST/EDT). London to Los Angeles: -8/-7. London to Tokyo: +9 always. London to Sydney: +10 winter for both, +11 in UK winter / Australian summer (Oct-March), back to +10 in March-October when Australia drops back. London to Mumbai: +5:30 always. London to Singapore: +8 always. London to Dubai: +4 always. New York to Los Angeles: -3 hours always (both observe DST in sync).",
        "The half-hour zones catch people out: India UTC+5:30, Iran UTC+3:30, Afghanistan UTC+4:30, Newfoundland UTC-3:30 (and shifts to -2:30 in summer). Nepal is UTC+5:45, the only quarter-hour zone. Chatham Islands in New Zealand are UTC+12:45. These are not numerical errors; they reflect historic civil time decisions tied to local solar noon. The converter handles all 39 zones currently in use."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between UTC and GMT?",
        "Practically none for most uses. GMT is a time zone (UTC+0); UTC is a time standard. London is on GMT in winter, BST (UTC+1) in summer. UTC does not change with DST. If you see 12:00 GMT in October, that is 13:00 BST. Aviation, science and computing standardise on UTC because it never shifts. For everyday scheduling, GMT and UTC are interchangeable when London is not on summer time."
      ),
      createFAQ(
        "Which countries are on the same time as the UK?",
        "Iceland, Portugal, Ireland (with the same DST schedule), Morocco (does not observe DST so it varies), and most of West Africa (Senegal, Ghana, Mali). The UK shifts to UTC+1 (BST) from late March to late October, so during summer it is one hour ahead of countries that stay on UTC year-round."
      ),
      createFAQ(
        "How do I schedule a meeting across 4 time zones?",
        "Find the overlap of working hours (9am-6pm local). Across London, New York, Singapore and Sydney, the overlap is essentially zero - one of them will always be outside business hours. The least painful: 9am London = 4am New York (no), 5pm Singapore (yes), 8pm Sydney (late but workable). Or 8am New York = 1pm London = 9pm Singapore = midnight Sydney. Realistically, recurring 4-zone meetings rotate the inconvenience across participants."
      ),
      createFAQ(
        "Why is China only one time zone?",
        "China spans 5 geographical time zones but uses a single official time, UTC+8 (Beijing Time), set in 1949 for political unity. Western Xinjiang's solar noon is around 3pm Beijing Time, so daily life there shifts later (lunch at 2pm, dinner at 9pm). Some unofficial use of \"Xinjiang Time\" (UTC+6) persists but it is not used in transport, broadcasting or business."
      ),
      createFAQ(
        "Do I adjust for DST when booking a flight?",
        "Airlines publish departure and arrival in local times, which already account for DST at the time of the flight. If you book in winter for a summer trip, the schedule already reflects the destination's summer time. The trap is calculating connection time across a DST border date - flying out of London on the day of DST change, scheduled flights handle this automatically but train and ferry timetables sometimes do not, especially in Eastern Europe."
      ),
    ],
    relatedTools: [
      { slug: "world-clock", label: "World Clock" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
      { slug: "travel-visa-checker", label: "Travel Visa Checker" },
    ],
  },

  "historical-exchange-rate-checker": {
    sections: [
      createAnswerFirstSection(
        "Looking Up Past Exchange Rates - When and Why",
        "Pick a base and target currency, enter a date (any date back to 1999 for euro pairs, back to the early 1990s for most major currencies), and the tool returns the closing rate from the European Central Bank's reference series via Frankfurter, plus today's rate for comparison. GBP/USD on 14 June 2016 was 1.4150; today it might be 1.2480 - useful if you are filling in a 2016 expense report or working out CGT on a foreign asset bought 8 years ago.",
        "The data source is the ECB's daily reference rate, published each working day at 16:00 CET. It is the same rate HMRC accepts for self-assessment, the rate financial institutions use for accounts in foreign currency, and the rate court-appointed valuers use for disputes. It is not a market-execution rate (the rate you would actually transact at, which includes a spread of 0.5-2%) but it is the canonical reference for tax, accounting and reporting purposes."
      ),
      createAnswerFirstSection(
        "Tax Returns and Foreign Income",
        "HMRC requires foreign income to be reported in pounds at the exchange rate \"on the date the income arose\". For employment income this is normally the date of receipt; for capital gains it is the disposal date; for dividends it is the ex-dividend date. If you sold a US property on 18 March 2024, you need GBP/USD on 18 March 2024, not today's rate, and not the average for the year. HMRC publishes monthly average and yearly average rates as a permitted alternative for some income types, but for one-off transactions the spot rate on the day is the rule.",
        "Use this checker to find that exact rate, then apply it to your reported income. Example: $50,000 sale proceeds on 18 March 2024 at GBP/USD 1.2740 = £39,246.47. If you used today's rate at GBP/USD 1.2480 by mistake you would report £40,064.10, overstating proceeds by £818 and the eventual gain by the same amount. For multi-currency tax work pair this with the [VAT Calculator](/vat-calculator) or [UK Tax Calculator](/uk-tax-calculator) once you have the GBP figures."
      ),
      createAnswerFirstSection(
        "Expense Reports for Trips Already Taken",
        "When your company reimburses business travel, finance teams typically use the rate on the day each transaction occurred, not the date you submit the claim. If you travelled to Tokyo for three weeks in October 2025 and submit the report in March 2026, every yen receipt needs the GBP/JPY rate from its specific transaction date. A ¥4,200 dinner on 14 October 2025 at GBP/JPY 187.4 = £22.41; the same receipt at March 2026's rate of 196.8 would only return £21.34, so getting the rate right protects 50p-£1.50 per receipt across a long trip.",
        "Some companies use a flat monthly rate for simplicity, others use the rate on the corporate card statement date, others reimburse exactly what your bank charged you. Read your expense policy. For freelancers raising invoices in foreign currencies, the standard is the spot rate on the invoice date or on the payment date - either is defensible, but pick one and apply consistently across the tax year."
      ),
      createAnswerFirstSection(
        "Comparing Past and Present Rates - Reading the Numbers",
        "The tool shows past rate, today's rate, and the percentage change. GBP/USD 1.4150 (June 2016, pre-Brexit referendum) vs 1.2480 today is an 11.8% weakening of sterling against the dollar. EUR/GBP 0.7180 in early 2008 vs 0.8540 today is a 19% strengthening of the euro. These long-run shifts compound: a £100,000 US property bought in 2016 at 1.4150 cost the equivalent of $141,500; selling for $141,500 today would return only £113,381 even before any actual price change, just from FX movement.",
        "The Frankfurter API covers 30+ currencies including GBP, USD, EUR, JPY, AUD, CAD, CHF, CNY, INR, BRL, ZAR, SGD and the Nordic kroner. It does not cover obscure or pegged currencies (Cuban peso, Saudi riyal pegged to USD, etc.). For exotic pairs, look up the third-currency cross-rate (e.g. SAR/GBP via SAR/USD then USD/GBP). Rates are weekday only - dates falling on weekends or holidays return the previous working day's rate, which is also the convention HMRC uses."
      ),
    ],
    faqs: [
      createFAQ(
        "How far back does the rate data go?",
        "ECB daily reference rates start in January 1999 for the euro and most euro pairs. GBP/USD historical data via Frankfurter goes back to 1990. For older rates (1970s-1980s), you need archived Bank of England data or commercial providers like FRED, Eikon or Bloomberg. The current tool covers 1999 onwards reliably; older queries may return null for the historical rate."
      ),
      createFAQ(
        "Is the ECB reference rate accepted by HMRC?",
        "Yes. HMRC's published monthly and yearly exchange rates are based on Bank of England data, which closely tracks ECB rates, and HMRC explicitly accepts \"the spot rate on the day\" from any reputable source. ECB / Frankfurter is widely accepted in audits. For larger transactions some accountants prefer the actual rate at which the conversion took place (your bank's rate) - that is also acceptable if you can document it."
      ),
      createFAQ(
        "Why is the historical rate different from what my bank charged me?",
        "Your bank charges a spread on top of the mid-market rate, typically 0.5-3% for retail customers. The ECB rate is the mid-market reference; the rate you actually got was that minus 1-3% for a debit card transaction abroad, or minus 4-7% if dynamic currency conversion was applied at the till. For tax purposes you can use either the reference rate or the actual rate you paid - the latter is sometimes more favourable if sterling has weakened since."
      ),
      createFAQ(
        "Do I need historical rates for cryptocurrency?",
        "Yes, if you are reporting CGT on crypto disposals. Each disposal needs a GBP value at the time of the sale or trade, calculated via crypto-to-fiat at that moment. The ECB rate does not cover crypto, so use a major exchange's spot rate or services like CoinMarketCap historical for that. The same principle applies: rate on the disposal date, not today's rate, applied to gains and losses."
      ),
      createFAQ(
        "Can I use yearly average rates instead?",
        "For some income types yes. HMRC publishes yearly average rates each January for the previous tax year and accepts them for foreign employment income, foreign rental income from a single property held throughout the year, and similar consistent income. For one-off transactions (asset sales, large dividends, capital flows), the spot rate on the day is the safer choice, particularly if challenged in audit."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "travel-money-calculator", label: "Travel Money Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "vat-calculator", label: "VAT Calculator" },
    ],
  },

  "travel-money-calculator": {
    sections: [
      createAnswerFirstSection(
        "Converting Your Holiday Spend to Local Currency",
        "Type in your total trip budget in pounds, pick a destination country, set the trip length in days, and the calculator pulls the live mid-market rate from Frankfurter and splits the converted total across accommodation (40%), food (25%), activities (20%) and transport (15%). £1,500 for a week in the US at GBP/USD 1.25 returns $1,875 total: $750 accommodation, $469 food, $375 activities, $281 transport, working out to about $267 daily.",
        "The 40/25/20/15 split is calibrated for self-funded leisure travel where flights are already paid; if your accommodation is included (work trip, friend's spare room, cruise) ignore that bucket and redistribute. The live rate updates every weekday at 16:00 CET via the European Central Bank, so the figure you see is the same rate banks reference for their commercial pricing. The rate you actually transact at on holiday will be 0.5-3% worse than this, depending on your card and method - more on that below."
      ),
      createAnswerFirstSection(
        "Why a Live FX Rate Matters For Trip Planning",
        "Sterling moves 1-3% in a typical month and 5-15% across a year. £1,500 to Tokyo at GBP/JPY 187 is ¥280,500; the same £1,500 at 175 (recent yen strength) is only ¥262,500 - an £18,000-£18,000 yen difference is enough to lose two restaurant dinners and a museum day. Booking flights and accommodation 4 months out and then watching the rate drift before you spend cash on the ground is the difference between mid-range and budget travel for the same nominal pounds.",
        "Practical tactic: lock part of your budget in advance. If GBP/EUR is at 1.18 and historically it sits 1.10-1.20, change £500-£800 to euros now via a multi-currency card (Wise, Revolut, Chase) and let it sit. The rest you spend on card at the live rate during the trip. If sterling weakens between now and then, the locked portion was the smart move; if it strengthens, you lose 1-2% on the locked portion - still a sensible insurance policy. For longer-horizon planning use the [Historical Exchange Rate Checker](/historical-exchange-rate-checker) to see how the pair has moved over the past 12-24 months."
      ),
      createAnswerFirstSection(
        "Cards, Cash and the True Cost of FX",
        "The cheapest way to spend abroad in 2026 is a fee-free travel card (Revolut Standard, Wise debit, Chase UK debit, First Direct debit) which gives you the live mid-market rate on weekdays and a small markup at weekends (usually 0.5-1%). High-street debit cards add 2.75-3% non-sterling fee plus a £1.50-£2 ATM fee per withdrawal. Credit cards are worst: 3% fee, sometimes 3% cash advance interest from day one if you withdraw cash. Always say \"no\" to dynamic currency conversion at the till - it adds 4-7% on top.",
        "Cash is still useful for tipping, taxis, markets and small vendors, especially in countries where card acceptance is patchy (parts of Italy, Spain, Greece, all of Japan outside major cities, much of South-East Asia). Withdraw a small float on arrival from an airport ATM, then top up at city ATMs which often have lower fees. Avoid airport bureaux de change - their rates are usually 5-10% worse than ATM withdrawals. For a 7-day trip to most countries, £200-£300 in local cash is plenty; for cash-heavy economies (Japan, India, Vietnam) take 50-70% of your daily budget in cash."
      ),
      createAnswerFirstSection(
        "Country Examples With Today's Rates",
        "France, £1,500 for 5 days at recent GBP/EUR ~1.17: €1,755 total, €351 daily. That is €140 accommodation (3-star Paris), €88 food (one nice dinner, two casual), €70 activities (one museum, one concert), €53 transport (metro, occasional taxi). Comfortable mid-range. Japan, £1,500 for 7 days at GBP/JPY ~190: ¥285,000 total, ¥40,700 daily. ¥16,300 accommodation (business hotel), ¥10,200 food (combini breakfast, lunch set, izakaya dinner), ¥8,140 activities (two paid attractions), ¥6,100 transport (subway plus one Shinkansen leg).",
        "US, £1,500 for 4 days at GBP/USD ~1.25: $1,875 total, $469 daily. $188 accommodation (budget Manhattan or mid-range Brooklyn), $117 food, $94 activities, $70 transport. Tight in NYC, comfortable in Miami or smaller cities. India, £1,500 for 14 days at GBP/INR ~108: ₹162,000 total, ₹11,571 daily. That is ₹4,628 hotel (mid-range in Mumbai), ₹2,893 food, ₹2,314 activities, ₹1,736 transport. Genuinely luxury territory in India for this budget. The [Tipping Guide By Country](/tipping-guide-by-country) is essential context for the food line - US tipping at 18-20% is already eating most of the food budget."
      ),
    ],
    faqs: [
      createFAQ(
        "How accurate is the live rate?",
        "It is the European Central Bank reference rate, updated each weekday at 16:00 CET. Mid-market rates do not include any spread, so this is the cleanest possible figure. Your actual transaction rate will be 0.5-3% worse depending on card type and country. Weekends and bank holidays use the most recent weekday close, which is fine for budgeting but can lag the actual market by 1-2% during volatile periods."
      ),
      createFAQ(
        "Should I exchange cash before I leave?",
        "Usually no. Bureaux de change at airports and high streets typically give 3-7% worse rates than ATM withdrawals on a fee-free travel card. Exception: very small amounts (£50-£100) for arrival expenses if you are landing late and might struggle to find an ATM. For larger sums, just use your card. Order online from Tesco, Sainsbury's or Asda for slightly better rates than walk-in if you must take cash, and order at least 5 days ahead for stocked-rare currencies (Indonesian rupiah, Vietnamese dong)."
      ),
      createFAQ(
        "Are travel cards safe?",
        "Yes, broadly. Revolut, Wise and Chase are all regulated and FCA-supervised. Cash on a travel card is held in segregated client accounts (Wise) or via a regulated bank (Chase). The main risks are fraud, account freezes (Revolut occasionally freezes accounts for AML reasons - take a backup card), and being abroad with a single card. Always travel with two cards from different providers and carry enough cash to last a couple of days if both fail."
      ),
      createFAQ(
        "What's the best card for travel in 2026?",
        "For the UK: Chase Sapphire (cashback plus fee-free FX), Revolut Standard or Plus, Wise debit, Halifax Clarity credit, First Direct debit. Each has trade-offs: Chase gives 1% cashback but the FX rate is slightly less generous than Wise; Revolut is fast but freezes accounts more than others; Wise has the best rate but requires a balance top-up. The Halifax Clarity credit card is the only fee-free credit option from a major UK bank as of 2026."
      ),
      createFAQ(
        "Why does the budget split add up to 100% with no contingency?",
        "The 40/25/20/15 split is structural budgeting, not actual spending. Add 10-15% on top as a contingency before you put the figure into this calculator. £1,500 planned spend should come from a £1,650-£1,725 actual budget held back. The calculator does the conversion and category split; the contingency lives outside that as a buffer for delays, illness, surprise costs and the inevitable upgrade decisions that cost more than planned."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
      { slug: "historical-exchange-rate-checker", label: "Historical Exchange Rate Checker" },
      { slug: "tipping-guide-by-country", label: "Tipping Guide By Country" },
    ],
  },

  "tipping-guide-by-country": {
    sections: [
      createAnswerFirstSection(
        "How Much Should I Tip - The Quick Country Lookup",
        "Pick a country and the calculator returns the standard tip percentage for restaurants, plus the suggested range, and a note on whether service charges are usually already added. United States: 18% standard, 15-20% range, 25%+ for excellent service - tipping is core to wages and not tipping reads as deliberate offence. Japan: 0%, never tip - it is genuinely insulting. UK: 10-12.5%, often added automatically as service charge. France: included by law, round up only. Australia: 0-10%, optional and rare.",
        "The tool covers 16 countries including the US, Canada, UK, France, Italy, Spain, Germany, Australia, Japan, China, South Korea, Singapore, India, UAE, Brazil and Mexico. Each entry includes the percentage, the cultural context, the venues where tipping applies, and a warning where the rules trip up tourists. Enter your bill amount and the calculator returns the average / good / excellent tip in the local currency symbol where relevant ($, £, €, ¥)."
      ),
      createAnswerFirstSection(
        "The Three Tipping Cultures",
        "First: high-tipping countries where wages assume tips. The US tops this - federal tipped wage is $2.13/hour, so a server's actual income is mostly from tips. Tipping under 15% is read as punishment for bad service; under 10% is read as you are a deliberate jerk. Canada is similar (15-20%). Mexico mid-range (10-15%). Brazil 10% (often added as gorjeta automatically).",
        "Second: optional / round-up countries. UK 10-12.5% (frequently auto-added), Germany 5-10% (you state the total including tip when paying), Spain and Italy small change or rounding up, France service compris already included. Most of Western Europe falls here. Third: do-not-tip countries. Japan, South Korea, China are explicit zero - tipping is rude or refused. Australia, Singapore, parts of Scandinavia: not expected, you will not offend by skipping it. Pair this lookup with the [Travel Money Calculator](/travel-money-calculator) so you know what 18% of a $80 dinner actually costs in pounds before you walk in."
      ),
      createAnswerFirstSection(
        "Beyond Restaurants - Hotels, Taxis, Tour Guides",
        "Restaurants get 90% of tipping discussion but the real awkwardness is everywhere else. US hotel housekeeping: $2-5 per night, left on the pillow daily (not at the end - housekeepers rotate). Bellhop: $1-2 per bag. Concierge: $5-20 for substantial help (theatre tickets, dinner reservations). Taxi: 15-20%. Tour guides: $5-10 per person for half-day, $10-20 for full-day group tours, $20-50 for private guides.",
        "In tip-optional Europe: hotel bellhop €1-2 per bag, housekeeping nothing or €1-2 if exceptional, taxi round up, tour guide €5-10 per person at end of tour. Japan: zero anywhere. The exception in Japan is ryokan (traditional inn) attendants where a small amount in a sealed envelope (¥1,000-¥3,000) is acceptable as a formal omotenashi gesture, but never loose cash. India: 50-100 rupees per bag for porters, 10% restaurant if no service charge, 100-300 rupees per day for guides."
      ),
      createAnswerFirstSection(
        "Common Tipping Mistakes Brits Make Abroad",
        "First: assuming UK service charge norms apply everywhere. They do not. A 12.5% \"gratuity already added\" UK reflex in the US leaves your server with a tip of zero when service charge was not actually included. Always read the bill in the US: if there is no \"gratuity included\" line at the bottom, you are tipping on top of the subtotal, not the post-tax total. Second: tipping in Japan, China or South Korea. Best case the server politely declines; worst case they chase you to return the cash, embarrassed for both of you.",
        "Third: under-tipping in the US because £100 spending in pounds becomes £120-£130 when you convert and add 20% to every bill. A 7-day US trip with three meals out and 5 taxi rides daily can add £150-£250 of tips that British travellers do not budget for. Fourth: paying tips on credit card in countries where servers may not see card tips (some restaurants pool, some keep, regulations vary). When in doubt, tip in cash, in the local currency, handed directly. The [Tipping Guide Abroad](/tipping-guide-abroad) covers tipping etiquette across more service types and includes the UK Tipping Act 2024 changes."
      ),
    ],
    faqs: [
      createFAQ(
        "Why is tipping in Japan considered rude?",
        "Japanese service culture treats good service as the baseline that any worker should provide, not an extra to be incentivised. Offering money implies that without it the staff might have done less - a slight on their professionalism. The exceptions are ryokan attendants where a sealed envelope is etiquette, and tour guides for foreigners where modern norms have started to accommodate Western expectations. In a normal Tokyo restaurant, leaving cash on the table will result in a server chasing you to return it."
      ),
      createFAQ(
        "What's a service charge versus a tip?",
        "Service charge is added by the restaurant, often 10-15%, and goes to the business (which then distributes to staff under various arrangements). Tip is voluntary and goes directly to the server. In the UK, the Tipping Act 2024 requires 100% of service charges and tips to reach staff. In the US, service charge is rare except in groups of 6+ where 18-20% \"gratuity\" is added automatically. In France, service charge is built into menu prices by law. Always check the bill before adding more."
      ),
      createFAQ(
        "Is 15% still acceptable in the US in 2026?",
        "It used to be the standard but has shifted. 18% is now the new minimum-acceptable for adequate service in major US cities, 20% for good service, 22-25% for excellent. 15% reads as a deliberate downgrade. Card readers commonly suggest 18%, 20%, 22%, 25% as the default options now, having moved up from 15%, 18%, 20% pre-pandemic. \"Tipflation\" is genuine and contested but resisting it as a tourist marks you out."
      ),
      createFAQ(
        "Should I tip on the pre-tax or post-tax total?",
        "Traditionally pre-tax in the US (because tax is not service). In practice most modern card readers suggest tip on the post-tax total because the maths is faster, and the difference is usually less than $2-$3 per bill. Either is socially acceptable. Pre-tax is technically the historic norm and slightly more generous to your wallet; post-tax is what most people actually do. In Europe and Asia, taxes are baked into menu prices, so the question does not arise."
      ),
      createFAQ(
        "Do I need to tip if there's already a service charge?",
        "No, in most cases that covers it. UK: a 12.5% service charge already applied means no further tip needed (and you can ask to remove the charge if service was poor). US: service charges of 18-20% on groups of 6+ are mandatory and you do not tip on top, though some travellers add 2-3% extra for exceptional service. Brazil: gorjeta of 10% on the bill means no further tip required. Always check before assuming - some US restaurants list \"gratuity\" but treat it as a guideline rather than a mandatory charge."
      ),
    ],
    relatedTools: [
      { slug: "tipping-guide-abroad", label: "Tipping Guide Abroad" },
      { slug: "us-tip-calculator", label: "US Tip Calculator" },
      { slug: "travel-money-calculator", label: "Travel Money Calculator" },
      { slug: "currency-converter", label: "Currency Converter" },
    ],
  },
};
