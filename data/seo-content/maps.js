// SEO content for maps and location tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const mapsSEO = {
  "nearest-defibrillator-finder": {
    sections: [
      createAnswerFirstSection(
        "How to Find an AED When Every Second Counts",
        "In a sudden cardiac arrest emergency, using an Automated External Defibrillator (AED) within the first 3 to 5 minutes can dramatically increase the survival rate. Defibrillators are public access life-saving devices that any bystander can use.",
        "Our finder uses your live GPS location to scan the UK's National Defibrillator Network (The Circuit) and instantly map the closest public access AEDs within walking distance. Always call 999 immediately - the operator can also give you the access code if the cabinet is locked."
      )
    ],
    faqs: [
      createFAQ(
        "What is an AED location map?",
        "An AED locations map shows the exact physical locations of all registered public access defibrillators in your community. These are often mounted on the outside walls of schools, sports clubs, pubs, disused phone boxes, and supermarkets."
      ),
      createFAQ(
        "Do I need training to use a defib finder and an AED?",
        "No training is required. Once you locate the closest AED using our defib finder, you simply turn the machine on. The defibrillator will give you clear, step-by-step voice instructions, and it will only administer a shock if it detects that the patient's heart rhythm requires one. You cannot accidentally shock someone who does not need it."
      ),
      createFAQ(
        "Why is the defibrillator cabinet locked?",
        "Some public access defibrillators are kept in locked cabinets to prevent theft or vandalism. If you find a locked cabinet during an emergency, dial 999. The ambulance dispatcher will give you the keypad code to open the box immediately."
      )
    ]
  },

  "nearest-public-toilet-finder": {
    sections: [
      createAnswerFirstSection(
        "Find the Closest Public Restroom Instantly",
        "When you need to go, you need to go. Our interactive map uses your live GPS location to pinpoint the nearest public toilets, open bathrooms in shopping centres, and accessible restrooms.",
        "Whether you are travelling in an unfamiliar city, driving cross-country, or dealing with a medical condition, having a reliable toilet locator can bring immense peace of mind."
      )
    ],
    faqs: [
      createFAQ(
        "Does the map show accessible or disabled toilets?",
        "Yes, our map includes filters for accessible restrooms (including those requiring a Radar key in the UK) and baby changing facilities. This makes it easier for parents and individuals with disabilities to find suitable facilities nearby."
      ),
      createFAQ(
        "Are the listed public bathrooms free to use?",
        "Most public toilets displayed on the map are free, but some in major train stations or tourist areas may require a small fee. We aim to highlight whether a facility is paid or free whenever that data is available."
      )
    ]
  },

  "how-far-from-the-sea": {
    sections: [
      createAnswerFirstSection(
        "Find Out How Close You Really Are to the UK Coast",
        "If you're staying at an Airbnb in Worcester or thinking about a house in the Cotswolds, the question 'how far is the sea?' is surprisingly hard to answer. Google Maps gives you the distance to a single search result, not the nearest point of coastline. The How Far From the Sea Calculator measures the straight-line distance from any UK postcode to the closest of 40+ coastal points, covering the full mainland coastline plus the Isle of Wight, returning the answer in miles and kilometres in a couple of seconds.",
        "Enter a postcode (or any UK address) and the tool geocodes it via OpenStreetMap, then runs a haversine distance calculation against every coastal reference point and returns the nearest. You'll see the closest seaside town, the as-the-crow-flies distance, and a map pin on both your location and the coast so you can eyeball the route."
      ),
      createAnswerFirstSection(
        "What 'Distance to the Sea' Actually Means",
        "Birmingham is officially the furthest city from the sea in the UK, sitting roughly 67 miles (108 km) from the nearest coast at Aberystwyth or the Severn Estuary depending on direction. Most of the population, though, lives within an hour's drive: 80% of UK residents are within 70 miles of the coast. The straight-line distance won't match your driving time (Devon's twisting lanes can double it) but it's a fair proxy for 'is this a coastal area?'.",
        "If you're using this for travel planning rather than property research, follow up with the [Walking Route Calculator](/walking-route-calculator) to see how long the actual route takes on foot, or browse the [Nearest Park Finder](/nearest-park-finder) to find green spaces if a coastal trip is too far for the day."
      ),
      {
        heading: "Distance From Inland UK Cities to the Nearest Coast",
        table: {
          headers: ["City", "Nearest Coast Point", "Approx. Distance"],
          rows: [
            ["Birmingham", "Aberystwyth (W) / Severn Estuary (S)", "67 miles / 108 km"],
            ["Coventry", "The Wash / North Wales", "65 miles / 105 km"],
            ["Leicester", "The Wash", "55 miles / 89 km"],
            ["Sheffield", "Cleethorpes / Skegness", "55 miles / 89 km"],
            ["Manchester", "Liverpool / Blackpool", "30 miles / 48 km"],
            ["Oxford", "Bournemouth", "65 miles / 105 km"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is the distance straight-line or driving distance?",
        "Straight-line (also called 'as the crow flies'). For a true driving distance, expect roughly 1.3 to 1.6 times the straight-line value depending on the road network. The distance returned is the same one used in property listings that quote 'X miles to the coast'."
      ),
      createFAQ(
        "What's the furthest place in the UK from the sea?",
        "The village of Coton in the Elms in Derbyshire holds the record at around 70 miles (113 km) from the nearest coastline. Major cities don't quite reach that figure; Birmingham is the furthest large city at around 67 miles."
      ),
      createFAQ(
        "Does this include Northern Ireland?",
        "The reference points cover the full mainland UK coastline plus the Isle of Wight. Northern Ireland and the Scottish islands aren't currently included, so postcodes in those regions will return their distance to the nearest mainland point, which may not be useful."
      ),
      createFAQ(
        "Why does the result differ from my satnav?",
        "Your satnav routes you along roads, including detours, motorway junctions, and one-way systems. This tool measures the direct line between two map points. For a city in the middle of the country, the gap between the two figures can easily be 20 to 30 miles."
      ),
    ],
    relatedTools: [
      { slug: "walking-route-calculator", label: "Walking Route Calculator" },
      { slug: "nearest-park-finder", label: "Nearest Park Finder" },
      { slug: "pub-density-map", label: "Pub Density Map" },
    ],
  },

  "nearest-cash-machine-finder": {
    sections: [
      createAnswerFirstSection(
        "Find a Cash Machine When the Card Reader Says 'No'",
        "Cash use in the UK has dropped to around 12% of payments in 2024, but there are still moments where only notes will do: the village fete, a market stall, a tip for the taxi driver, the pub that surprisingly still doesn't take cards. The Nearest Cash Machine Finder uses your live GPS location and OpenStreetMap data to map the closest ATMs within walking distance, showing operator (LINK, Cardtronics, banks), fees, opening hours, and whether the machine is indoor or outdoor.",
        "By default the tool searches a 1 km radius (extendable to 3 km), which catches the typical urban density of cash machines. In rural areas you may need to extend further. The fee status flag is particularly useful: free-to-use ATMs are still the majority in the UK but the share has fallen, with around 15,000 of the 50,000 free machines lost since 2018 according to LINK's data."
      ),
      createAnswerFirstSection(
        "Free vs Paid ATMs and Why It Matters",
        "UK cash machines are split between free-to-use (no fee for any UK debit card) and pay-to-use (a fee of £1.50 to £2.50 per withdrawal, displayed on screen before you confirm). Free machines are most often at supermarkets, banks, and post offices. Pay machines are more common in pubs, convenience stores, and motorway service stations.",
        "If you're abroad and looking for a cash machine your UK card will accept, this tool covers UK locations only. For trips abroad, use the [Currency Converter](/currency-converter) to plan how much local cash you'll need before you go. For mid-shop budget-checking once you arrive, see the [Budget Calculator](/budget-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "How accurate is the cash machine data?",
        "The data is sourced from OpenStreetMap, which is community-maintained. Around 95% of UK ATMs are mapped, with the largest gaps in newer or temporarily-installed machines. Operator and fee details are particularly well-maintained for the major networks (LINK, Tesco, Barclays, Sainsbury's)."
      ),
      createFAQ(
        "Will the tool show ATMs inside shops?",
        "Yes. Indoor cash machines (typically inside supermarkets, pharmacies, post offices, and some pubs) are flagged with an 'indoor' field. The tool defaults to showing both indoor and outdoor; outdoor-only filtering is on the radius slider."
      ),
      createFAQ(
        "Why does the nearest cash machine seem further away than I expected?",
        "Possibilities: it's a Sunday and the bank-branch ATMs are inside locked doors, your local convenience store removed its machine (the UK lost around 13,000 ATMs between 2018 and 2024), or the OpenStreetMap data hasn't caught up with a recent installation. Always extend the search radius if the closest result feels off."
      ),
      createFAQ(
        "Is there a fee for using ATMs in the UK?",
        "Most are still free, but the share of pay-to-use ATMs has grown to around 25% of the total. The screen always tells you the fee before you confirm the withdrawal, so you can cancel without charge. Always check the fee on independent ATMs (those not tied to a bank brand) as they're more likely to charge."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "budget-calculator", label: "Budget Calculator" },
      { slug: "nearest-defibrillator-finder", label: "Nearest Defibrillator Finder" },
    ],
  },

  "nearest-ev-charger-finder": {
    sections: [
      createAnswerFirstSection(
        "Locate the Nearest EV Charging Point in Real Time",
        "The UK had around 75,000 public EV charge points by April 2026 according to ZapMap, with over 8,500 of those rated as rapid (50 kW or above). The Nearest EV Charger Finder pulls live OpenStreetMap data, defaults to a 3 km radius (extendable to 10 km), and surfaces the closest options with the operator (BP Pulse, Pod Point, Shell Recharge, Tesla, etc.), connector types (Type 2, CCS, CHAdeMO), bay count, and charging speed.",
        "The interactive map shows each location with a pin you can click for details. Use it to plan a charge stop on a road trip, find a top-up spot near a meeting, or scope out chargers near a hotel before you book. For Type 2 (slower AC) plug a couple of hours; for rapid CCS, you're typically 30 to 45 minutes for an 80% charge on most modern EVs."
      ),
      createAnswerFirstSection(
        "Connector Types You'll Actually Encounter",
        "Type 2 is the universal AC standard for slower public charging (3 kW to 22 kW). CCS is the rapid DC standard fitted to most modern European EVs (50 kW to 350 kW). CHAdeMO is the older Japanese rapid standard, fitted to older Nissan Leaf and Mitsubishi models, but disappearing fast. Tesla Superchargers are progressively opening to other brands across the UK; check the operator field for 'open to all' status.",
        "Combine this with the [Fuel Consumption Calculator](/fuel-consumption-calculator) if you're modelling switching costs from petrol or diesel, or with the [Driving Cost Calculator](/driving-cost-calculator) for a full-trip cost comparison including charging."
      ),
      {
        heading: "Typical UK Public Charging Costs (April 2026)",
        table: {
          headers: ["Speed", "Power", "Cost per kWh", "Time for 80% charge"],
          rows: [
            ["Slow (AC)", "3 - 7 kW", "30 - 45p", "6 - 10 hours"],
            ["Fast (AC)", "7 - 22 kW", "35 - 55p", "2 - 4 hours"],
            ["Rapid (DC)", "50 kW", "65 - 80p", "45 - 60 minutes"],
            ["Ultra-rapid (DC)", "100 - 350 kW", "75 - 90p", "20 - 35 minutes"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are all public chargers shown on the map?",
        "The map covers around 90% of registered UK public chargers via OpenStreetMap. New installations sometimes take a few weeks to appear. For real-time live availability (whether a specific bay is free right now), use the operator's own app, as that data isn't in OSM."
      ),
      createFAQ(
        "Can I use any charger with my EV?",
        "Most modern EVs use Type 2 for AC and CCS for DC rapid charging, both of which are standard across the UK network. Older Nissan Leaf and a few imported models still use CHAdeMO. Tesla cars can charge anywhere; non-Teslas can use most Tesla Superchargers from 2024 onwards."
      ),
      createFAQ(
        "How much does it cost to charge at a public charger?",
        "Public charging in April 2026 typically costs 30p to 90p per kWh depending on speed. A 60 kWh battery charged from 20% to 80% (a 36 kWh top-up) costs roughly £11 at 30p/kWh slow chargers or £29 at 80p/kWh ultra-rapid. Home charging is significantly cheaper at around 7p to 28p per kWh."
      ),
      createFAQ(
        "Why isn't the nearest charger working?",
        "Public chargers have around 92% reliability across the major networks, so 8% of any given attempt may fail (faulty unit, payment issue, occupied bay). Always have a backup location in mind on long trips. The operator's app usually shows live status if you want to verify before driving."
      ),
    ],
    relatedTools: [
      { slug: "fuel-consumption-calculator", label: "Fuel Consumption Calculator" },
      { slug: "driving-cost-calculator", label: "Driving Cost Calculator" },
      { slug: "walking-route-calculator", label: "Walking Route Calculator" },
    ],
  },

  "nearest-park-finder": {
    sections: [
      createAnswerFirstSection(
        "Find a Park Near You for a Saturday Reset",
        "On any given Saturday in the UK, around 9 million people visit a public park, according to Fields in Trust. The Nearest Park Finder uses your live GPS location and OpenStreetMap data to map every park, recreation ground, and green space within a 2 km radius (extendable to 5 km), with details on size, wheelchair accessibility, and dog policies pulled from the OSM database.",
        "Click the map markers for details on each park: size in hectares (helpful for picking a 'big enough for the kids to run' versus a 'quiet bench and a coffee' park), accessibility features (paths, ramps, accessible toilets), and dog rules (off-lead, on-lead, prohibited). Most UK parks allow dogs on leads, but city-centre and formal gardens often have stricter rules."
      ),
      createAnswerFirstSection(
        "Park, Common, or Recreation Ground?",
        "OSM tags 'park' for landscaped public green spaces, 'common' for unenclosed traditional commons (Wimbledon, Clapham, Hampstead Heath), and 'recreation ground' for sports-focused green spaces with pitches and play areas. All three appear in the results because all three are useful for the same Saturday-afternoon question.",
        "Visiting with kids? The [Nearest Playground Finder](/nearest-playground-finder) zeroes in on play equipment specifically; the park finder gives you the broader green-space picture. For a longer outing, follow up with the [Walking Route Calculator](/walking-route-calculator) to plot a circular walk around the park boundary."
      ),
    ],
    faqs: [
      createFAQ(
        "Are all UK parks shown on the map?",
        "OpenStreetMap data covers around 95% of public parks in the UK, with extensive contributor tagging in major cities. Smaller pocket parks and very newly-opened spaces may be missing. Local authority parks lists are sometimes more complete; check the relevant council site if a local park you know is missing."
      ),
      createFAQ(
        "Can I take dogs to all the parks listed?",
        "Most parks allow dogs on leads, but rules vary. The 'dog' field in each result shows what OSM contributors have tagged: 'yes' (allowed), 'leashed' (leads only), 'no' (prohibited), or blank (rules unknown, check signs). Royal Parks in London and ornamental gardens often have stricter rules than ordinary borough parks."
      ),
      createFAQ(
        "Are park toilets and cafes shown?",
        "The basic finder doesn't break out individual amenities within each park. For toilets specifically, the [Nearest Public Toilet Finder](/nearest-public-toilet-finder) covers facilities both inside parks and on the street network. Cafes, kiosks, and similar amenities aren't currently filterable but are visible if you click into the OSM page for the park."
      ),
      createFAQ(
        "What's the largest park in the UK?",
        "The Cairngorms National Park at 4,528 km² is the largest, but for everyday park use the largest urban park is Bushy Park (450 hectares) followed by Richmond Park (955 hectares, technically larger but more rural in feel). The map shows hectares so you can pick parks at the scale you want."
      ),
    ],
    relatedTools: [
      { slug: "nearest-playground-finder", label: "Nearest Playground Finder" },
      { slug: "walking-route-calculator", label: "Walking Route Calculator" },
      { slug: "pub-density-map", label: "Pub Density Map" },
    ],
  },

  "nearest-playground-finder": {
    sections: [
      createAnswerFirstSection(
        "Find a Playground Near You in Under 30 Seconds",
        "It's Saturday morning, the kids are bouncing off the walls, and you don't know the area. The Nearest Playground Finder uses your live GPS location plus OpenStreetMap data to map every playground within 2 km (extendable to 5 km), with details on surface type (grass, rubber, sand, bark), access (free, gated, fee), and wheelchair accessibility. Most UK boroughs maintain at least one playground per square kilometre in residential areas, so the typical urban search returns 8 to 15 options.",
        "Each result includes a map pin and a one-glance summary of the basics. Surface type matters more than parents realise: rubber surfaces are the gold standard for falls, bark and sand cushion well but get sticky in wet weather, grass tends to mean older equipment. Access marked 'fee' is rare in the UK (mostly farm-park style attractions); standard council playgrounds are always free."
      ),
      createAnswerFirstSection(
        "Choosing the Right Playground for the Right Age",
        "Toddler playgrounds (under 5s) typically have low platforms, springers, sand pits, and gentle slides. School-age (5 to 11) often combines a separate toddler section with bigger climbing frames, swings, and roundabouts. Teens get skate parks, basketball half-courts, and sometimes dedicated 'BMX' tracks, often listed under 'leisure=pitch' rather than 'leisure=playground' in OSM. The finder includes both for the broadest results.",
        "Once you've found a playground, the [Nearest Park Finder](/nearest-park-finder) shows the surrounding green space if you want a longer outing, and the [Walking Route Calculator](/walking-route-calculator) plots the walking time to get there. For older kids who need a different kind of run-around, the [School Run Calculator](/school-run-calculator) covers the pre- and post-school commute."
      ),
    ],
    faqs: [
      createFAQ(
        "Are playgrounds in the UK free to use?",
        "Yes, almost all council-run playgrounds in the UK are free with no booking required. Privately-run play centres (soft play, indoor activity centres) charge per session and are listed under different OSM tags. The finder defaults to public outdoor playgrounds."
      ),
      createFAQ(
        "What does 'access: gated' mean?",
        "Some playgrounds are inside fenced compounds with gates that close at dusk or are locked overnight. The 'access' field flags this where contributors have noted it. In practice, most gated playgrounds are still open during daylight hours; only a few in city-centre locations close earlier."
      ),
      createFAQ(
        "Can I take dogs to a playground?",
        "No, almost all UK playgrounds prohibit dogs (signs are common at the gates) and most council parks fence the playground off from the wider green space for this reason. If you have a dog with you, leave them at the park boundary or use the broader [Nearest Park Finder](/nearest-park-finder) for a dog-friendly green space instead."
      ),
      createFAQ(
        "Why are some playgrounds tagged but not visible on the map?",
        "OpenStreetMap data updates regularly but tag completeness varies; some playgrounds have just a name with no surface or access info, others have full details. The finder shows all playgrounds within range; the detail-level fields populate from whatever OSM contributors have added."
      ),
    ],
    relatedTools: [
      { slug: "nearest-park-finder", label: "Nearest Park Finder" },
      { slug: "walking-route-calculator", label: "Walking Route Calculator" },
      { slug: "school-run-calculator", label: "School Run Calculator" },
    ],
  },

  "school-run-calculator": {
    sections: [
      createAnswerFirstSection(
        "Cost the School Run Three Ways: Driving, Walking, Cycling",
        "The average UK primary school run is 5 to 7 miles round-trip per day; secondary school adds another mile or two on top. The School Run Calculator routes between your home and school addresses using OpenStreetMap, then runs the trip three ways (driving, walking, cycling), showing distance, time per leg, and the annual cost based on a configurable cost-per-mile (default 45p, the HMRC business mileage rate).",
        "At 6 miles per day, 190 school days a year, and 45p per mile, the typical UK primary school run costs roughly £513 a year just in fuel and wear. Cycling drops that to near-zero (a few pounds in chain wear and the occasional puncture) and walking eliminates it entirely while adding the recommended 30 minutes of daily exercise that fewer than 30% of UK kids currently get."
      ),
      createAnswerFirstSection(
        "Why Walking the School Run Saves More Than Money",
        "Roughly half of UK primary children are driven to school despite living within easy walking distance (under a mile). The reasons are usually time pressure or weather, but the 'driving is faster' assumption often doesn't hold up: traffic outside schools at drop-off and pick-up is famously bad, and parking is tighter still. The calculator gives you the real comparison; in many cases driving saves only a few minutes versus walking, and cycling beats driving outright in heavy traffic.",
        "If you're considering moving closer to a school (or further from a busy commute), pair this with the [Walking Route Calculator](/walking-route-calculator) to plan alternative routes, and the [Fuel Consumption Calculator](/fuel-consumption-calculator) to refine the cost-per-mile for your specific car."
      ),
      {
        heading: "Annual Cost of the School Run by Distance and Mode",
        table: {
          headers: ["Round-trip Distance", "Driving (45p/mile)", "Cycling", "Walking"],
          rows: [
            ["2 miles", "£171/year", "£0 - £10/year", "Free + 30 min exercise"],
            ["5 miles", "£428/year", "£0 - £20/year", "Free + 75 min exercise"],
            ["8 miles", "£684/year", "£0 - £30/year", "1.5 - 2 hours/day walking"],
            ["12 miles", "£1,026/year", "£0 - £50/year", "Driving usually only practical option"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the average UK school run distance?",
        "Around 5 to 7 miles per day for primary schools (including the return trip), and 7 to 10 miles for secondary schools. About 24% of UK morning rush-hour traffic is school-related according to government surveys, which is why traffic outside schools is so consistently heavy."
      ),
      createFAQ(
        "What cost-per-mile should I use for my car?",
        "HMRC's business mileage rate is 45p per mile for the first 10,000 miles, falling to 25p above that. This figure includes fuel, depreciation, insurance, MOT, and tyres. For pure fuel cost, use roughly 15p to 20p per mile for a petrol car, or 12p to 15p for a diesel."
      ),
      createFAQ(
        "Is the routing accurate for school traffic?",
        "The routing uses OpenStreetMap free-flow data, so it does not factor in school-time traffic. Real journey times during the morning peak (8:15 to 8:55) and afternoon peak (3:00 to 3:30) can be 50% to 100% longer than the figure shown. Adjust your planning accordingly."
      ),
      createFAQ(
        "Can I claim school-run mileage on my tax return?",
        "No. School runs are personal, even if you stop at the office afterwards. HMRC's mileage rules treat school drop-off as 'personal travel' and the journey only becomes business once you leave the school heading to a work destination, with mileage measured from there onwards."
      ),
    ],
    relatedTools: [
      { slug: "walking-route-calculator", label: "Walking Route Calculator" },
      { slug: "fuel-consumption-calculator", label: "Fuel Consumption Calculator" },
      { slug: "nearest-playground-finder", label: "Nearest Playground Finder" },
    ],
  },

  "walking-route-calculator": {
    sections: [
      createAnswerFirstSection(
        "Calculate How Long It Takes to Walk Between Two UK Addresses",
        "Ordnance Survey's standard walking pace is 5 km/h (about 3.1 mph) for an adult on level pavement. The Walking Route Calculator routes between two UK addresses using OpenStreetMap pedestrian data, then returns the distance and walking time at four paces: slow (3 mph), normal (3.5 mph), brisk (4 mph), and fast (4.5 mph). Use it to plan a daily commute, work out whether to walk to the station or grab a bus, or scope a new neighbourhood before moving.",
        "The route follows actual pavements, footpaths, and pedestrian-friendly streets where possible, so the result reflects how long a person on foot will really need rather than the as-the-crow-flies distance. Hilly routes will run slower than the calculator estimates because the standard paces assume level ground."
      ),
      createAnswerFirstSection(
        "What Walking Pace to Use",
        "Choose the pace that matches your walking style. Most people walking purposefully (commuting, running errands) cluster around 3 to 3.5 mph. Brisk walking, defined by NHS guidelines as the pace at which you can talk but not sing, is around 4 mph. Slow pace covers groups, kids, and older walkers; fast covers race-walkers and very fit pedestrians. Naismith's Rule, used by hill walkers, adds an extra minute for every 10 metres of ascent.",
        "If you're using this for a school run specifically, the [School Run Calculator](/school-run-calculator) compares walking against driving and cycling for the same route. For a longer day out, the [Nearest Park Finder](/nearest-park-finder) can identify green-space starting points along your walking route."
      ),
      {
        heading: "Walking Time Estimates by Distance",
        table: {
          headers: ["Distance", "Slow (3 mph)", "Normal (3.5 mph)", "Brisk (4 mph)", "Fast (4.5 mph)"],
          rows: [
            ["0.5 miles", "10 min", "9 min", "8 min", "7 min"],
            ["1 mile", "20 min", "17 min", "15 min", "13 min"],
            ["2 miles", "40 min", "34 min", "30 min", "27 min"],
            ["5 miles", "1h 40m", "1h 26m", "1h 15m", "1h 7m"],
            ["10 miles", "3h 20m", "2h 51m", "2h 30m", "2h 13m"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How accurate is the walking time estimate?",
        "The route follows real pedestrian paths from OpenStreetMap, so the distance is accurate within around 5%. The time depends on your pace; expect to add 10% to 20% for hilly routes, congested city centres, or routes that cross several busy roads with traffic light waits."
      ),
      createFAQ(
        "Why is the walking route different from the driving route?",
        "Walking routes use footpaths, alleys, parks, and pedestrian crossings that cars can't (or shouldn't) use, so they're often shorter than the equivalent driving route. They also avoid motorways and A-roads where pedestrian access is restricted."
      ),
      createFAQ(
        "Does the calculator account for hills?",
        "No. The OSM router calculates flat distance and applies a level-ground pace. For hilly routes, add roughly 1 minute per 10 metres of ascent (Naismith's Rule). Most urban routes are flat enough that this isn't significant; rural and coastal routes can vary considerably."
      ),
      createFAQ(
        "Can I use the calculator for routes outside the UK?",
        "Geocoding is biased to UK addresses (the search adds 'UK' to the query). For non-UK routes, the routing engine still works but address matches may go to the wrong country. Use full city, country names for non-UK searches if you do try."
      ),
    ],
    relatedTools: [
      { slug: "school-run-calculator", label: "School Run Calculator" },
      { slug: "nearest-park-finder", label: "Nearest Park Finder" },
      { slug: "pub-density-map", label: "Pub Density Map" },
    ],
  },
};

