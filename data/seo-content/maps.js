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

  "distance-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Distance Calculator Works",
        "Pick two cities from the dropdowns. The calculator looks up each city's latitude and longitude, runs them through the Haversine formula to compute the great-circle distance (the shortest path along the surface of the Earth, which on a sphere is an arc rather than a straight line), and returns the answer in kilometres and miles. It also estimates flight time using a typical commercial cruising speed and shows the time-zone difference.",
        "The Haversine formula treats the Earth as a sphere with radius 6,371 km. Real distances are typically within 0.5% of the spherical answer for any practical city-to-city distance, so the slight oblateness of the Earth doesn't matter for trip planning. What does matter is that great-circle distance is always less than or equal to the road or rail distance, often substantially less. Driving from London to Edinburgh is about 660 km via M1 and A1, but the great-circle distance is only 530 km."
      ),
      createAnswerFirstSection(
        "Why Flight Distances Look Curved on a Map",
        "Most flight maps are drawn on a Mercator projection, which stretches high latitudes horizontally and squashes them vertically. The shortest path between two points on a sphere, when drawn on a Mercator map, looks curved (a 'great circle arc') because the underlying flat-paper geometry doesn't match the curved Earth. London to Tokyo is shorter going north over Russia and the Arctic than across India, even though the India route looks shorter on a flat map.",
        "Pilots fly great-circle routes when winds and airspace allow, because every kilometre saved is fuel saved. North Atlantic flights between Europe and North America commonly pass over Greenland or Iceland for this reason. The estimated flight time in this calculator assumes a 800 km/h average ground speed (cruise speed minus typical headwind allowance) and ignores taxi, takeoff, climb, descent and landing, so real journey times are typically 30-60 minutes longer than the calculator shows."
      ),
      {
        heading: "Distances Between Some Familiar City Pairs",
        table: {
          headers: ["From", "To", "Great-circle (km)", "Flight time approx"],
          rows: [
            ["London", "New York", "5,570", "7h 0m"],
            ["London", "Paris", "344", "0h 25m airborne"],
            ["London", "Tokyo", "9,560", "12h 0m"],
            ["London", "Sydney", "16,990", "21h 15m"],
            ["New York", "Los Angeles", "3,940", "4h 55m"],
            ["Singapore", "Sydney", "6,290", "7h 50m"],
            ["Cape Town", "Cairo", "7,260", "9h 5m"],
          ],
        },
      },
      createAnswerFirstSection(
        "What People Use the Distance Calculator For",
        "Booking flights and gauging whether a destination is realistic for the time available. Calculating air mileage for frequent-flyer programmes (most use great-circle distance as the basis). Settling pub-quiz arguments about which city is further from somewhere else. Sense-checking quoted travel times: a 4-hour flight time from London suggests roughly 3,200 km of distance, which fits Madrid or Cairo and rules out anything in Asia.",
        "If you're planning a UK route specifically and want walking time rather than flight time, the [Walking Time Calculator](/walking-time-calculator) uses real OSM road geometry rather than great-circle distances. For cross-timezone scheduling alongside the distance, the [Timezone Converter](/timezone-converter) handles the daylight-saving variations that make 'time difference' a moving target."
      ),
    ],
    faqs: [
      createFAQ(
        "Why is the distance shorter than driving distance?",
        "Great-circle distance is the shortest path along the Earth's surface, ignoring roads, mountains and political borders. Driving distance has to follow actual roads, which add detours, switchbacks for hills, and bypasses around lakes or restricted zones. For long flat routes the difference is small (London to Manchester is 263 km flat, 320 km by road). For routes around bodies of water or through mountainous terrain, the difference can be large."
      ),
      createFAQ(
        "How accurate is the flight time estimate?",
        "Within an hour for typical commercial routes, but always shorter than the published flight time. The calculator uses 800 km/h average ground speed, which accounts for cruise plus typical headwinds. Published flight times include taxi, takeoff, climb, descent, holding, and landing, plus tailwinds or headwinds specific to the route. London to New York is roughly 6h 30m airborne but published as 7h 30m to 8h."
      ),
      createFAQ(
        "What is the Haversine formula?",
        "It's a trigonometric formula for great-circle distance on a sphere. Given two latitude/longitude pairs, it computes the angular distance between them, then multiplies by the Earth's radius to get a length. It's been the standard for navigation since the 19th century and is accurate to within 0.5% for any real-world distance, which is more than good enough for flight planning at the resolution of an airport runway."
      ),
      createFAQ(
        "Why are some flights between European cities longer than the great-circle distance suggests?",
        "European airspace is heavily congested, and many flights are routed around restricted military zones or along published airways rather than direct great-circle paths. Short-haul flights (under 1,000 km) also spend a higher proportion of total time on takeoff and landing, so the airborne portion is a smaller share of the total."
      ),
      createFAQ(
        "Can I use this for non-flight distances?",
        "Yes, the great-circle distance is purely geometric. It applies to any straight-line measurement on the Earth's surface, including ship routes, missile trajectories, and 'as the crow flies' references in everyday speech. For walking or driving distances along actual roads, you'd want a routing service rather than a great-circle calculation."
      ),
    ],
    relatedTools: [
      { slug: "walking-time-calculator", label: "Walking Time Calculator" },
      { slug: "timezone-converter", label: "Timezone Converter" },
      { slug: "pub-density-map", label: "Pub Density Map" },
    ],
  },

  "pub-density-map": {
    sections: [
      createAnswerFirstSection(
        "How the Pub Density Map Works",
        "Enter a postcode or place name and the tool searches OpenStreetMap for everything tagged as a pub within a 2 km radius, plotting them as pins on a Leaflet map. It also counts pubs within 1 km, calculates the density per square kilometre, and gives you a simple verdict on whether the area is well-served, reasonably served, or thin on the ground.",
        "Pub data comes from the OSM database, which is crowd-edited but has fairly thorough UK coverage thanks to active local mapping communities. Each pub pin shows the name (pulled from the pub's 'name' tag) where the data has it, falling back to the operator or street name when the name field is empty. Newer pubs and recent renamings might not have made it into OSM yet, but the major chains and most independents are present."
      ),
      createAnswerFirstSection(
        "What 'Pub Density' Actually Means",
        "The number of pubs per square kilometre, computed from the count of pubs within 1 km of your search point divided by the area of that 1 km circle (about 3.14 km²). For context, the UK averages roughly 0.7 pubs per 1,000 residents (down from over 2 per 1,000 in the 1970s, as ONS pub-count data shows), so the density per square kilometre depends heavily on local population density. Central Manchester or Edinburgh hits 5+ pubs per square kilometre. Rural Norfolk might be 0.1.",
        "The map is most useful for areas you don't know well: a new neighbourhood you're moving to, a town you're visiting for a weekend, or a meeting point you want to be confident has somewhere to retreat to afterwards. It also shows, by absence, which areas have lost their pubs over the years. The 'pub desert' phenomenon (suburbs with no surviving pubs) is visible as expanses of map with no pins."
      ),
      {
        heading: "Pub Density Benchmarks",
        table: {
          headers: ["Area type", "Typical pubs per km²", "What it feels like"],
          rows: [
            ["City centre (Soho, Edinburgh Old Town)", "8-15", "Pub on every corner"],
            ["Inner suburb of major city", "2-4", "Three or four within 10 min walk"],
            ["Outer suburb", "0.5-1.5", "One local within walking distance"],
            ["Market town", "2-5", "Concentrated around the high street"],
            ["Village", "0.2-1", "One or two pubs total, often historic"],
            ["Rural", "Under 0.2", "Drive or walk a mile or more"],
          ],
        },
      },
      createAnswerFirstSection(
        "Caveats and Limitations",
        "The 2 km search radius and the OSM data freshness are the main limitations. Pubs that closed during the post-2008 contraction or the COVID-era casualties may still appear on the map until a local mapper deletes them. New micro-pubs and taproom openings often take months to be added. The tool also makes no distinction between a thriving wet-led pub, a gastropub, a Spoons, or a private members' club mistakenly tagged as a pub.",
        "It can't tell you whether the pubs are any good. For that, sites like CAMRA's WhatPub, Google reviews, or local CAMRA branch newsletters are better sources. This is purely a quantity-and-location tool. If you'd rather know how far you'd have to walk to reach the nearest one, the [Walking Time Calculator](/walking-time-calculator) handles point-to-point routing on real footpaths."
      ),
    ],
    faqs: [
      createFAQ(
        "Where does the pub data come from?",
        "OpenStreetMap, queried via the Overpass API. OSM is a free, crowd-edited geographic database (think Wikipedia for maps). UK pub coverage is generally strong because mapping pubs is a popular pastime among contributors. The data lags real-world changes by weeks to months for popular areas, longer for remote ones."
      ),
      createFAQ(
        "Why does my favourite pub not appear?",
        "Either it's tagged as something other than amenity=pub in OSM (perhaps as a bar, restaurant, or hotel with bar), it hasn't been added yet, or it's outside the 2 km search radius. You can check whatpub.com or open up openstreetmap.org and search for the pub by name to see how it's tagged. If it's missing entirely, anyone can add it via the OSM editor."
      ),
      createFAQ(
        "What's the best area in the UK for pubs?",
        "By raw count, central London (Soho, Covent Garden, the City). By pubs per resident, smaller market towns like Norwich, York, Edinburgh's Old Town, or stretches of the Lake District. Glasgow, Manchester and Liverpool all have high inner-city densities. The CAMRA Good Beer Guide's longest entries by city are a reasonable proxy for quality density."
      ),
      createFAQ(
        "Why is the verdict different from my own count?",
        "The verdict is based on density per square kilometre within a 1 km radius, not the absolute count. A small town with 8 pubs in a tight cluster scores higher than a sprawling suburb with 12 pubs spread across 4 square kilometres. The metric is meant to capture 'pubs you can walk to' rather than 'pubs in this town'."
      ),
      createFAQ(
        "Does the map show closed pubs?",
        "Not deliberately, but OSM doesn't always get updated when a pub closes. If you spot a pub on the map that's known to have shut, it's worth flagging on OSM directly so the next user gets accurate data. The map does not currently distinguish 'permanently closed' from 'open' venues."
      ),
    ],
    relatedTools: [
      { slug: "walking-time-calculator", label: "Walking Time Calculator" },
      { slug: "nearest-park-finder", label: "Nearest Park Finder" },
      { slug: "school-run-calculator", label: "School Run Calculator" },
    ],
  },

  "walking-time-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Walking Time Calculator Works",
        "Enter a starting address and a destination, and the calculator runs both through OpenStreetMap's geocoder (Nominatim) to find their coordinates, then asks the OSRM foot-routing engine to find the shortest walking route between them along actual paths and pavements. You get the distance in metres or kilometres, an estimated walking time, and a map showing the route in blue.",
        "Pick a walking pace before you calculate. Slow (3 mph / 4.8 km/h) is comfortable strolling. Normal (3.5 mph / 5.6 km/h) is the OS Naismith's-Rule baseline used by most fitness trackers. Brisk (4 mph / 6.4 km/h) is purposeful walking with a destination in mind. Fast (4.5 mph / 7.2 km/h) is speed walking, the upper end of what most people sustain over distance. Each step up the pace knocks 10-15% off the time."
      ),
      createAnswerFirstSection(
        "Why Walking Times Vary So Much",
        "The 'normal' 5 km/h figure is an average for a fit adult on flat, uncrowded ground with no breaks. Real walks deviate. Hills slow you down (Naismith's Rule adds about a minute per 10 m of ascent on top of the flat-ground time). Crowded city pavements break your stride. Carrying shopping, pushing a buggy, or walking with a dog all lower pace. The route engine returns the shortest path geometrically, but the time estimate assumes you walk it without stopping.",
        "For routes you do regularly (the school run, walk to the station, dog loop in the park) you'll quickly learn whether you fall above or below the calculator's prediction. Most people overestimate their walking pace by 10-20%, then under-allocate time and arrive flustered. A useful rule of thumb: if you really need to be somewhere at a specific minute, add 10% to the calculator's estimate."
      ),
      {
        heading: "Walking Times for Common Distances",
        table: {
          headers: ["Distance", "Slow (3 mph)", "Normal (3.5 mph)", "Brisk (4 mph)"],
          rows: [
            ["500 m", "6 min", "5 min", "4 min"],
            ["1 km", "12 min", "11 min", "9 min"],
            ["2 km", "25 min", "21 min", "19 min"],
            ["3 km", "37 min", "32 min", "28 min"],
            ["5 km (3.1 miles)", "62 min", "53 min", "47 min"],
            ["8 km (5 miles)", "100 min", "85 min", "75 min"],
            ["10 km (6.2 miles)", "124 min", "107 min", "93 min"],
          ],
        },
      },
      createAnswerFirstSection(
        "Useful Cases Beyond 'How Long Will It Take?'",
        "Comparing two routes when one looks shorter on the map but goes uphill or through busy areas. Working out whether walking to the next station saves enough on a fare to be worth it. Checking whether a hotel really is '5 minutes from the venue' as advertised (often it isn't). Time-boxing dog walks, school runs, or the nip-to-the-shop journey when you're trying to fit one into a tight slot.",
        "Walking distance also affects the property market: 'within 10 minutes' walk of a station is a real premium in commuter areas, with research from estate-agent indices regularly putting that at a 5-10% price uplift. For longer-form planning the [Distance Calculator](/distance-calculator) gives you straight-line distances between cities, useful when walking isn't really an option but you want to feel the scale of the journey."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the calculator account for hills?",
        "No, not directly. The OSRM foot-routing engine returns flat distance and applies a level-ground pace. If your route has serious hills, add about 1 minute per 10 metres of ascent (Naismith's Rule). For most urban walks the elevation change is small enough not to matter; rural and coastal walks can be quite different."
      ),
      createFAQ(
        "What walking pace should I assume for a child or older adult?",
        "Children under 8 typically walk at around 2-2.5 mph (3.2-4 km/h). Older adults vary widely: a healthy 70-year-old often holds 3 mph; a less mobile walker might be at 1.5-2 mph. Pick 'slow' or even slower than the slow setting and add a margin. The calculator's pace presets target adults of average fitness."
      ),
      createFAQ(
        "Why does the route follow a strange path?",
        "The OSRM foot-router follows real OpenStreetMap data on pedestrian paths and rights of way. Sometimes 'the obvious shortcut' isn't actually a public footpath and the router avoids it correctly. Sometimes a path is missing from OSM entirely and the router takes a longer detour. If the route looks wrong, check whether all the relevant footpaths are mapped."
      ),
      createFAQ(
        "Can I use this for non-UK addresses?",
        "Geocoding is biased to UK addresses (the search adds 'UK' to the query). The OSRM router itself works globally, so non-UK routes do compute, but the address lookup may match the wrong country if you enter a place name shared between the UK and elsewhere. Use full city, country names for non-UK searches."
      ),
      createFAQ(
        "How does this differ from Google Maps walking directions?",
        "The underlying maths and pace assumptions are similar (Google also uses around 5 km/h for walking), but the data sources differ. Google uses its own road and footpath data, while this tool uses OpenStreetMap. For most UK routes the answers agree to within a couple of minutes; for poorly-mapped paths or recently-built developments, one source may have data the other doesn't."
      ),
    ],
    relatedTools: [
      { slug: "school-run-calculator", label: "School Run Calculator" },
      { slug: "distance-calculator", label: "Distance Calculator" },
      { slug: "pub-density-map", label: "Pub Density Map" },
    ],
  },
};

