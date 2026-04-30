// SEO content for home and property tools
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
  },

  "broadband-speed-converter": {
    sections: [
      createAnswerFirstSection(
        "Mbps, MB/s and Gbps Without the Headache",
        "ISPs sell speed in megabits per second (Mbps). Your laptop reports downloads in megabytes per second (MB/s). Eight bits in a byte, so a 100 Mbps connection delivers about 12.5 MB/s on a clean line. That single conversion is where most people get tripped up when they look at a download bar moving slower than the package they paid for.",
        "Renters comparing two contracts before signing can paste each headline figure into the converter and see the same speed expressed three ways. A 30 Mbps line (the default here) translates to 3.75 MB/s and 0.030 Gbps. Real throughput is usually 80 to 90 percent of advertised speed, so factor in router contention, ageing copper lines and the time of evening Wi-Fi gets busy."
      ),
      createAnswerFirstSection(
        "How Long a Download Actually Takes",
        "On 30 Mbps, a 5 MB photo lands in about a second. A 4 GB HD film takes roughly 18 minutes; a 50 GB game closer to four hours. Bump the line to 100 Mbps and that game drops to about 70 minutes. Gigabit fibre at 1,000 Mbps clears it in under seven.",
        "These numbers assume the file server can keep up, which it often cannot. Steam, PlayStation Network and large patch downloads sometimes throttle, and 5 GHz Wi-Fi loses about half its speed two walls away from the router. If the converter says 18 minutes and your film is taking an hour, the bottleneck is rarely your contracted speed; it is everything between the router and the device."
      )
    ],
    faqs: [
      createFAQ(
        "What is the difference between Mbps and MB/s?",
        "Mbps is megabits per second, the unit ISPs advertise. MB/s is megabytes per second, the unit your operating system shows when copying or downloading. There are 8 bits in a byte, so divide Mbps by 8 to get MB/s. A 100 Mbps connection downloads at roughly 12.5 MB/s in perfect conditions."
      ),
      createFAQ(
        "Is 30 Mbps fast enough for a household?",
        "30 Mbps comfortably handles 4K Netflix on one TV, video calls on a laptop and a phone scrolling social media at the same time. Two simultaneous 4K streams will start to push it. Households with three or four heavy users, big game downloads or smart home devices usually want 100 Mbps or more."
      ),
      createFAQ(
        "Why is my actual speed lower than advertised?",
        "ISPs quote the maximum line speed under ideal conditions. Real throughput drops because of router quality, Wi-Fi signal loss through walls, the number of devices sharing the line, server limits at the other end, and copper-to-fibre distance. A wired Ethernet test from a laptop sat next to the router gives the most honest reading."
      ),
      createFAQ(
        "How does this differ from a gigabit fibre connection?",
        "Gigabit, written 1 Gbps or 1,000 Mbps, is roughly 33 times faster than a 30 Mbps line. A 50 GB game that takes about four hours on 30 Mbps finishes in about seven minutes on gigabit. The catch is that most home Wi-Fi cannot deliver gigabit speeds wirelessly; you need a wired connection or a Wi-Fi 6E router very close by."
      )
    ],
    relatedTools: [
      { slug: "tv-size-calculator", label: "TV Size Calculator" },
      { slug: "ev-charging-time-calculator", label: "EV Charging Time Calculator" },
      { slug: "wifi-qr-generator", label: "Wi-Fi QR Code Generator" },
    ],
  },

  "dog-walking-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "What You Should Expect to Pay",
        "Solo professional walks in London and the South East run around £15 for half an hour. Manchester and the wider North sit closer to £12. Group walks are roughly half that, since the walker takes three or four dogs at once. Rural walkers undercut everyone, often £8 a walk, because their overheads and competition are both lower.",
        "The default here, five 30-minute solo walks a week in London, comes out to £75 weekly, around £323 a month and just over £3,900 a year. That is a serious household line item and the biggest reason owners with hybrid working patterns end up cutting back to two or three professional walks and covering the rest themselves."
      ),
      createAnswerFirstSection(
        "Solo, Group or Sitter",
        "Solo walks suit anxious dogs, reactive dogs, and puppies still learning recall. The walker can give full attention and adjust the route. Group walks suit confident, social dogs that benefit from canine company; the price drop is real but you trade off control. Dog sitters who walk in your home (the third option in the calculator) cost more per hour but cover toilet trips, feeding and company across a longer block.",
        "If you switch from solo to group walks, the calculator estimates roughly 60 percent off your annual bill. That figure is genuine, but only if the dog actually copes with a pack. A trial week with the same walker, same group, before committing is worth far more than the saving."
      )
    ],
    faqs: [
      createFAQ(
        "How much does a dog walker cost in the UK?",
        "Solo 30-minute walks range from about £8 in rural areas to £15 in London and the South East. Group walks are roughly £4 to £8. In-home dog sitting works out at £10 to £18 per hour. Pricing reflects local competition, walker insurance and the time of day, with after-school slots commanding a premium."
      ),
      createFAQ(
        "Should I tip my dog walker?",
        "Tipping is not expected in the UK the way it is in the US, but a Christmas gift or end-of-year tip equal to one walk is common with regular walkers you have used for a year or more. A short handwritten thank you when they cover holidays is genuinely appreciated."
      ),
      createFAQ(
        "Are dog walkers required to be insured?",
        "There is no legal requirement, but reputable walkers carry public liability insurance covering injuries to your dog, other dogs, people or property. Pet first aid certification is also common. Always ask to see proof before booking, especially if the walker is taking your house key."
      ),
      createFAQ(
        "What is the cheapest way to cover dog walking?",
        "Group walks cut the headline cost almost in half. Beyond that, sharing walks with a neighbour on a swap basis, hiring a trusted local teenager for after-school walks, or using apps like BorrowMyDoggy to match with people who want to walk your dog for free are all sensible options for active, friendly dogs."
      )
    ],
    relatedTools: [
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "moving-house-checklist", label: "Moving House Checklist" },
    ],
  },

  "electricity-bill-estimator": {
    sections: [
      createAnswerFirstSection(
        "Working Out Your Bill From the Meter",
        "An electricity bill has three moving parts: kWh used, the unit rate per kWh and a daily standing charge. The default here, 125 kWh over a 91-day quarter on a standard variable tariff at 24.5p per kWh with a 61.6p daily standing charge, comes out to about £91.25 before VAT, then £95.81 after the 5 percent VAT applied to domestic electricity. That sits below the typical UK quarterly bill because most homes use considerably more than 125 kWh in three months.",
        "The estimator accepts either a pair of meter readings (subtracting the previous from the current) or a total kWh figure if you already know it. Reading your own meter and entering both numbers gives the most honest result and protects against estimated bills that creep ahead of actual usage. A typical three-bedroom UK home uses roughly 2,700 kWh a year, or about 675 kWh per quarter."
      ),
      createAnswerFirstSection(
        "Standard, Fixed and Economy 7",
        "On a standard variable tariff, the rate moves with the Ofgem price cap, currently sitting around 24.5p per kWh in 2026. Fixed tariffs lock the rate for 12 to 24 months; useful when you expect prices to rise, painful when they fall. Economy 7 splits the day into a cheap night rate (often around 15p per kWh) and a more expensive day rate (around 28p), which only saves money if you genuinely shift more than 30 to 40 percent of usage to the small-hours window.",
        "Heat pump owners and EV drivers with off-peak charging are the obvious Economy 7 winners. For a household that mostly uses electricity from 6pm to 10pm, the night rate barely gets a look in and the higher day rate makes the bill worse, not better. The comparison panel in this tool lets you sense-check that before committing to a switch."
      )
    ],
    faqs: [
      createFAQ(
        "What is the average UK electricity bill in 2026?",
        "A typical household using around 2,700 kWh a year pays roughly £900 to £1,000 annually for electricity under the current price cap, including standing charges and VAT. A medium-use household with electric heating or an EV easily pushes past £1,500. Bills vary by region; Northern England and Scotland tend to come in slightly cheaper than London."
      ),
      createFAQ(
        "Why is VAT only 5 percent on electricity?",
        "Domestic energy in the UK has a reduced VAT rate of 5 percent rather than the standard 20 percent. Business electricity is charged at 20 percent. This is a long-standing concession to keep domestic heating costs down."
      ),
      createFAQ(
        "What is the standing charge?",
        "The standing charge is a fixed daily fee covering grid maintenance, meter reading and policy costs. It applies even if you use no electricity. The 2026 UK average is around 61.6p per day, adding roughly £225 a year to your bill before any actual usage. It varies by region and supplier."
      ),
      createFAQ(
        "Should I send meter readings every month?",
        "Monthly readings are worth the two minutes they take. Estimated bills based on industry averages either build credit you cannot easily reclaim or leave you owing a lump sum at year-end. Smart meters report automatically; older meters need a manual photo and an entry in your supplier's app."
      )
    ],
    relatedTools: [
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "electricity-cost-calculator", label: "Electricity Cost Calculator" },
      { slug: "heat-pump-savings-calculator", label: "Heat Pump Savings Calculator" },
    ],
  },

  "electricity-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much an Appliance Costs to Run",
        "The maths is simple once you have the wattage and the unit rate. A 3,000W kettle boiled for five minutes uses 0.25 kWh. At 24.5p per kWh that is just over 6p per boil. Add it up: ten boils a day across a year is 912 kWh, around £223 just for the kettle. Most people are surprised by the kettle and the tumble dryer; both pull serious wattage even though they only run for short bursts.",
        "The default in the tool, a 2,000W appliance running for two hours a day at 24.5p per kWh, works out to 4 kWh daily, or 98p a day, £6.86 a week, £29.40 a month and £357.70 a year. That figure is roughly what an electric heater costs to run all winter, or what a tumble dryer adds across a wet British year. Numbers like these tend to change behaviour faster than any green nudge ever has."
      ),
      createAnswerFirstSection(
        "The Appliances Worth Worrying About",
        "Standby loads matter less than people fear. A modern television in standby pulls under 1W. The real money goes on heat. Anything that converts electricity to heat (kettles, ovens, toasters, electric heaters, tumble dryers, hair dryers, immersion heaters) lands in the 1,500 to 3,000W range. The fridge runs at maybe 150W but cycles on and off all day, so its annual cost still creeps up to £80 or so.",
        "Add multiple appliances in the calculator and the total household running cost emerges. A common pattern: gaming PC running four hours an evening (£179 a year), a tumble dryer used three times a week (£140 a year), and an electric shower used daily (£200 to £300 a year). Spotting these is the first step. The next is deciding which ones you genuinely cannot do without."
      )
    ],
    faqs: [
      createFAQ(
        "How do I work out the cost of running an appliance?",
        "Multiply the wattage by hours used per day and divide by 1,000 to get kWh per day. Multiply that by your unit rate (around 24.5p per kWh in 2026) to get pence per day. A 100W TV used four hours daily is 0.4 kWh, or about 9.8p a day, £35.77 a year."
      ),
      createFAQ(
        "What uses the most electricity in a UK home?",
        "After heating and hot water, the biggest residential loads are tumble dryers, electric showers, ovens, kettles, dishwashers and tumble dryers again. A tumble dryer used four times a week typically costs £180 to £250 a year. Electric showers used by a family of four can clear £400 a year on their own."
      ),
      createFAQ(
        "Does leaving things on standby cost a lot?",
        "Modern appliances on standby use very little, typically under 1W per device, which works out to around £2 a year each. The exception is older AV equipment, set-top boxes and games consoles in 'instant on' mode, which can pull 10 to 20W and add £20 to £50 a year. Hard-switching the worst offenders at the wall is still worth it."
      ),
      createFAQ(
        "What is a kWh in plain English?",
        "A kilowatt-hour is the energy used by a 1,000W appliance running for one hour. A 2,000W heater runs for half an hour and uses one kWh. A 100W TV runs for 10 hours and uses one kWh. Your bill shows kWh used multiplied by the unit rate, plus a daily standing charge."
      )
    ],
    relatedTools: [
      { slug: "electricity-bill-estimator", label: "Electricity Bill Estimator" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "heat-pump-savings-calculator", label: "Heat Pump Savings Calculator" },
    ],
  },

  "flooring-calculator": {
    sections: [
      createAnswerFirstSection(
        "Square Metres, Wastage and Whole Packs",
        "A 5m by 4m room is 20 m². Add the standard 10 percent wastage allowance for straight-laid laminate or LVT and you need 22 m² of material. If your chosen pack covers 2.2 m², that is exactly 10 packs. Always round up; coming back to the merchant a week later for one extra plank usually means a different dye lot and a noticeable colour band running through the floor.",
        "Wastage is not optional padding, it is the unavoidable cost of cutting around door frames, alcoves and pipework. Diagonal layouts push wastage to 15 percent because every cut leaves a triangular offcut too small to use. Herringbone and chevron patterns climb to 20 percent. Tilers planning a busy mosaic floor often allocate 25 percent and treat the leftovers as future repair stock."
      ),
      createAnswerFirstSection(
        "Real Costs Beyond the Headline Price",
        "Pack price is only one line of the bill. Underlay for laminate runs around £4 to £8 per m². Beading and threshold strips add £20 to £60 per room. Adhesive for engineered wood is £30 to £50 per 5kg tub. Tile spacers, grout and SBR primer push tile installations up by another £50 to £100. A £35 pack covering 2.2 m² works out at £15.91 per m² in materials alone, then realistically £25 to £35 per m² fitted by a tradesperson.",
        "The calculator shows packs needed and total cost based on the rounded-up figure, so the result already reflects what you will actually carry out of the shop. Save the offcuts in the loft. Floors get scratched, water gets spilt, and the £30 stash of spare planks you tucked away in 2026 is the difference between a quick swap and replacing the whole room in 2031."
      )
    ],
    faqs: [
      createFAQ(
        "How much wastage should I add for flooring?",
        "Add 10 percent for standard straight-laid laminate, vinyl or LVT. Add 15 percent for diagonal layouts. Herringbone, chevron and complex tile patterns need 20 to 25 percent. Rooms with multiple alcoves or unusual shapes also benefit from the higher allowance."
      ),
      createFAQ(
        "How do I measure an L-shaped or irregular room?",
        "Split the room into rectangles, calculate each separately, then add the totals. For curves or angled walls, draw the shape on paper, divide it into right-angled triangles and rectangles, and use the area of each. Always measure twice and add 10 percent wastage to the combined total."
      ),
      createFAQ(
        "Should I include the floor under the kitchen units?",
        "If you are replacing the units at the same time, yes - tile or laminate the full floor. If the kitchen units are staying, you only need to floor the visible area but allow an extra 30cm tucked under the kickboard so future repairs do not show a different shade where the kickboard has been moved."
      ),
      createFAQ(
        "How accurate is this flooring calculator?",
        "The result reflects a clean rectangular room with the wastage you select. For complex layouts, awkward thresholds, or rooms with lots of alcoves, treat the figure as a starting point and ask the merchant to double-check before you order."
      )
    ],
    relatedTools: [
      { slug: "tile-calculator", label: "Tile Calculator" },
      { slug: "wallpaper-calculator", label: "Wallpaper Calculator" },
      { slug: "paint-calculator", label: "Paint Calculator" },
    ],
  },

  "heat-pump-savings-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why Insulation Matters More Than Anything",
        "A heat pump's headline efficiency is its COP, the coefficient of performance. A COP of 3 means three units of heat for every one unit of electricity. Modern air source units in well-insulated UK homes hit a COP of 3.5 over a full heating season. In a draughty Victorian terrace with single glazing, the same kit struggles to manage 2.8 because the radiators have to run hotter to fight the heat loss.",
        "The calculator builds this in directly: a 'good' insulation rating uses a COP of 3.5, 'average' uses 3.2 and 'poor' uses 2.8. That gap is roughly £200 to £400 a year in running cost on a £1,500 baseline heating bill. Spending £2,000 on loft and cavity wall insulation before fitting a heat pump usually pays back faster than the heat pump itself."
      ),
      createAnswerFirstSection(
        "Installation, the BUS Grant and Real Payback",
        "An air source heat pump installed in a semi-detached UK house typically costs around £10,000 fitted. The Boiler Upgrade Scheme grant of £7,500 (current 2026/27 figure) drops the net cost to £2,500. Against a £1,500 gas bill, the annual saving comes out to roughly £580 once you account for the COP, giving a payback of about 4.3 years on the net cost. Without the grant, that stretches to closer to 17 years.",
        "Two caveats. First, the BUS grant is funded yearly and demand has occasionally exceeded supply; the calculator assumes you secure it. Second, electricity prices and gas prices move independently. If gas drops 30 percent or electricity climbs 30 percent, the saving narrows. Pair a heat pump with solar PV and a time-of-use tariff and the running cost drops sharply because the heat pump leans on cheap (or free) electricity."
      )
    ],
    faqs: [
      createFAQ(
        "How much does a heat pump cost to install in the UK?",
        "Air source heat pumps typically run £8,000 for a flat or small terrace and £12,000 for a detached house, before grants. Ground source systems start around £20,000 because of the borehole or trench groundwork. The £7,500 Boiler Upgrade Scheme grant cuts the net cost significantly and is paid via your installer."
      ),
      createFAQ(
        "Will my radiators need replacing?",
        "Sometimes. Heat pumps run cooler than gas boilers, typically 45 to 55°C versus 70°C, so radiators need to be larger to deliver the same heat output. Around half of UK homes need at least one or two radiators upsized. A reputable installer carries out a heat loss survey first and includes any radiator changes in the quote."
      ),
      createFAQ(
        "Is a heat pump cheaper to run than a gas boiler?",
        "Not always at current prices. Gas is cheaper per kWh than electricity, but a heat pump delivers three to four units of heat per unit of electricity, so it works out cheaper in well-insulated homes. In poorly insulated homes with hot radiator setups, running costs can match or exceed gas. Insulation is the biggest single lever."
      ),
      createFAQ(
        "How long do heat pumps last?",
        "Air source heat pumps typically last 15 to 20 years, similar to a gas boiler. Ground source systems often run 20 to 25 years for the heat pump itself, and the underground loop lasts 50 years or more. Annual servicing is recommended; replacement parts are now widely available across the UK."
      )
    ],
    relatedTools: [
      { slug: "insulation-savings-calculator", label: "Insulation Savings Calculator" },
      { slug: "solar-panel-savings-calculator", label: "Solar Panel Savings Calculator" },
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
    ],
  },

  "home-inventory-tracker": {
    sections: [
      createAnswerFirstSection(
        "Why Your Insurer Wants This",
        "Most home contents policies cap single-item claims unless you have specifically declared and valued the item. A laptop, an engagement ring, a road bike, a camera body: each can sit above the unspecified-item limit (typically £1,500). Without proof of value at the time of loss, insurers default to depreciated cash value and the cheque arrives a long way short of the replacement price.",
        "Building a room-by-room list with current values turns a stressful claim into a paperwork exercise. The tracker starts with a Living Room category by default; add a kitchen, bedrooms, garage, loft, and home office. The total value field at the top updates as you add items, so you can sense-check it against your policy's contents limit. Households often discover their actual contents value sits 30 to 50 percent above what they insured."
      ),
      createAnswerFirstSection(
        "Photos, Receipts and Cloud Storage",
        "A written list is the start; the proof is in the photos. Walk each room with your phone, open every cupboard, film every shelf in one take. Store the video and any high-value receipts in cloud storage rather than only on the phone, since burglars, fires and floods take the phone too. Update the list every January when you spot the new TV, sofa or kitchen appliance you forgot.",
        "The free JPG download from this tool gives you a printable summary that fits in a folder with policy documents. Premium-tier exports add a structured PDF you can email straight to a loss adjuster. Either way, the value of an inventory is measured the day something goes wrong, not the day it is created."
      )
    ],
    faqs: [
      createFAQ(
        "How much home contents insurance do I need?",
        "Most UK households underinsure by 30 to 50 percent. As a rough guide, multiply the number of bedrooms by £15,000 as a starting point, then walk through each room and add anything above £500 individually. A modern three-bed family home typically needs £45,000 to £75,000 of cover."
      ),
      createFAQ(
        "What counts as a high-value item for insurance?",
        "Most policies treat single items above £1,500 (sometimes £2,500) as 'specified items' that need to be listed individually. Common examples are engagement rings, road bikes, watches, camera kit, gaming consoles with full game libraries and high-end laptops. Always check your policy wording."
      ),
      createFAQ(
        "Should I keep receipts for everything?",
        "For high-value items, yes - both purchase receipts and a current photo. For lower-value items, a clear photograph of the item and any serial number is usually enough. Email receipts to yourself so they are stored in the cloud rather than the kitchen drawer."
      ),
      createFAQ(
        "How often should I update my inventory?",
        "Once a year as a habit, plus whenever you buy something significant. A 30-minute walkthrough every January catches all the Christmas presents and the gradual creep of new gear. Set a calendar reminder."
      )
    ],
    relatedTools: [
      { slug: "moving-house-checklist", label: "Moving House Checklist" },
      { slug: "cleaning-schedule-generator", label: "Cleaning Schedule Generator" },
      { slug: "christmas-gift-budget-tracker", label: "Christmas Gift Budget Tracker" },
    ],
  },

  "lawn-feed-calculator": {
    sections: [
      createAnswerFirstSection(
        "Grams Per Square Metre, Done Properly",
        "Lawn feed is sold in bold packaging that hides the only number that actually matters: the application rate in grams per square metre. Spring and autumn feeds typically apply at 35 g/m². Weed and feed sits closer to 30 g/m². Moss killer goes on lighter at 20 g/m². Go above the rate and you scorch the lawn into yellow stripes that take months to recover.",
        "The calculator's default is a 10m by 8m lawn (80 m²) treated with spring feed at 35 g/m². That works out to 2.8 kg of product. At 200 m² coverage per pack, one pack does the job, costing £12 at the default price. A typical UK back garden lawn (around 50 m²) needs about 1.75 kg of feed per application, so a single 200 m² pack covers two or three applications across the year."
      ),
      createAnswerFirstSection(
        "Timing and Application Mistakes",
        "Spring feed goes down March to April once the grass is actively growing and overnight frosts have eased. Autumn feed (lower in nitrogen, higher in potassium) goes down September to October to harden the lawn before winter. Apply on a still, dry day; rain within 48 hours either washes weed killer off the leaf or burns the lawn if a granule clumps in one spot. A drop spreader gives a far more even result than throwing handfuls.",
        "Common errors: doubling back over the same strip and applying twice the rate, not watering in granular feed within a week, and trying to feed a stressed lawn during a heatwave. If the lawn is yellow and crisp, water it back into life first; feeding adds insult to injury. For seeding or repair work after weed control, wait at least four weeks for the chemistry to clear."
      )
    ],
    faqs: [
      createFAQ(
        "How much lawn feed do I need for my lawn?",
        "Multiply your lawn area in square metres by the application rate (typically 35 g/m² for standard spring or autumn feed). A 50 m² lawn needs 1.75 kg per application. Always check the back of your specific product, since organic and slow-release feeds use different rates."
      ),
      createFAQ(
        "When is the best time to apply lawn feed?",
        "Spring feed: March to April, once grass is growing and frosts have passed. Autumn feed: September to October, before the first frosts. Avoid feeding during summer drought or in waterlogged winter conditions; both stress the grass and waste the product."
      ),
      createFAQ(
        "Can I use weed and feed and grass seed together?",
        "No. The weed killer in weed and feed prevents new seedlings from establishing. Wait at least four weeks (six is safer) after applying weed and feed before overseeding. Plain grass seed and a separate spring feed used in tandem is the cleaner way to thicken up a lawn."
      ),
      createFAQ(
        "What happens if I apply too much lawn feed?",
        "Over-application scorches the lawn within days, leaving yellow or brown stripes wherever the granules concentrated. Heavy rain after application carries excess nitrogen into drains and waterways. If you spot scorch, soak the area heavily for a week to flush the salts and let the grass recover; reseed bare patches in autumn."
      )
    ],
    relatedTools: [
      { slug: "raised-bed-calculator", label: "Raised Bed Soil Calculator" },
      { slug: "seed-spacing-calculator", label: "Seed Spacing Calculator" },
      { slug: "watering-calculator", label: "Watering Calculator" },
    ],
  },

  "paint-calculator": {
    sections: [
      createAnswerFirstSection(
        "Litres, Coats and Coverage You Can Trust",
        "Most emulsion paints cover about 12 m² per litre on a smooth, previously painted wall. Two coats is the realistic standard; one coat almost never delivers the colour shown on the tin. The default room here, 4m by 3m by 2.4m high with one door and one window, has a paintable area of around 30.2 m². At 12 m² per litre and two coats, you need 6 litres - so one 5L tin and one 2.5L tin, totalling £60 at £8 per litre.",
        "Coverage drops sharply on porous or dark surfaces. Fresh plaster soaks the first mist coat at roughly 6 to 8 m² per litre. Going from a deep teal to brilliant white might genuinely need three coats. Textured walls eat 20 percent more paint than the tin promises. The calculator lets you adjust coverage downward when reality bites; do not trust the default of 12 m² per litre on a chalky old wall that has not seen paint in fifteen years."
      ),
      createAnswerFirstSection(
        "Tin Sizes and What to Buy",
        "Trade tins come in 2.5L and 5L mostly; specialist or designer brands sometimes only offer 2.5L. Always round up to whole tins. A 6-litre requirement means buying 7.5L (one 5L plus one 2.5L), not opening two 5L tins and trying to store a half-used pot for two years. Once a paint tin is opened, it skins over within months even with a good seal, and most decorators write off any remainder beyond six months.",
        "Keep one labelled jam jar of each colour in the cupboard for touch-ups: a tablespoon decanted at the end of the job covers chips, scuffs and small marks for years. Doors typically need 0.5L for two coats. Skirting boards and architrave for a standard room run around 1L. The calculator focuses on walls, but factor those extras in when you order, especially for a full room repaint."
      )
    ],
    faqs: [
      createFAQ(
        "How many coats of paint do I need?",
        "Two coats is standard for emulsion over a previously painted wall in a similar shade. Fresh plaster needs a thinned mist coat first, then two full coats - so three coats total. Going from very dark to very light or vice versa often needs three full coats unless you use a tinted primer first."
      ),
      createFAQ(
        "How much paint do I need for one wall?",
        "Multiply the wall height by width to get area in m². Divide by 12 (typical coverage per litre) and multiply by the number of coats. A 4m x 2.4m wall is 9.6 m². Two coats at 12 m² per litre is 1.6 litres - round up to a 2.5L tin."
      ),
      createFAQ(
        "Can I store leftover paint?",
        "Sealed properly and stored above freezing, opened tins keep usable for six to twelve months. Decant a small jam jar's worth for future touch-ups; the smaller air gap dramatically extends life. Frozen paint is ruined; never store paint in an unheated garage or shed over winter."
      ),
      createFAQ(
        "What is a mist coat?",
        "A mist coat is the first layer over fresh plaster, using emulsion thinned roughly 70 percent paint to 30 percent water. Plaster is highly absorbent; the mist coat soaks in and seals the surface, so the next two full coats lay down evenly without patchiness. Skip it and the topcoat will dry inconsistently."
      )
    ],
    relatedTools: [
      { slug: "wallpaper-calculator", label: "Wallpaper Calculator" },
      { slug: "tile-calculator", label: "Tile Calculator" },
      { slug: "flooring-calculator", label: "Flooring Calculator" },
    ],
  },

  "raised-bed-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Compost a Raised Bed Actually Needs",
        "Volume in litres is the only number that matters when buying soil. The default here is a 2m by 1m bed at 30cm deep, which works out to 0.6 cubic metres or 600 litres. At 50 litres per bag, that is 12 bags. At £4 per bag, total spend is £48. People consistently underbuy because they think in bags rather than litres, then run out halfway through filling and end up driving back to the garden centre on a wet Saturday.",
        "Standard raised beds in UK gardens are typically 1.2m by 2.4m at 30cm deep, giving around 864 litres. A pair of those beds, common in starter veg gardens, eats through 35 to 40 bags of compost. Bulk bags (sometimes called 'jumbo bags') deliver around 800 litres for £80 to £120 and usually work out cheaper than 16 individual bags once you factor in delivery and the back ache of carrying them."
      ),
      createAnswerFirstSection(
        "Soil Mix Matters More Than Brand",
        "Pure compost shrinks dramatically as the organic matter breaks down, dropping the bed level by 5 to 10cm in the first year. The 60/40 mix (compost to topsoil) holds structure better and is the default the calculator uses. For drainage-sensitive crops like Mediterranean herbs, alpines and root vegetables, the 50/30/20 mix adds 20 percent perlite or horticultural grit to keep the soil airy and prevent the dense, waterlogged conditions that rot tomato roots in wet summers.",
        "Top up every spring with a 5cm layer of fresh compost; this replaces what has broken down and feeds the new season's growth without disturbing established roots. A bed that started at 30cm deep will likely settle to 25cm by the second spring; that is normal and means the soil is alive and active, not a sign you skimped on the original fill."
      )
    ],
    faqs: [
      createFAQ(
        "How deep should a raised bed be?",
        "30cm is the practical minimum for most vegetables and salads. Carrots, parsnips and other deep-rooting crops want 45cm. Strawberries, herbs and shallow-rooted brassicas thrive in 20 to 25cm. Deeper beds need more soil but require less watering in summer because the root zone stays cooler."
      ),
      createFAQ(
        "Can I fill the bottom of a raised bed with cheaper material?",
        "Yes. A hugelkultur layer of logs, branches, cardboard and grass clippings at the base saves on compost and improves long-term drainage. Top with 25 to 30cm of proper soil mix for the active root zone. The bottom layer breaks down slowly over five to ten years, releasing nutrients."
      ),
      createFAQ(
        "What's the best soil mix for a raised vegetable bed?",
        "A 60/40 split of multi-purpose compost to good quality topsoil works for most vegetables. For root crops add 20 percent horticultural grit or perlite. Avoid pure compost-only fills; they shrink fast and become hydrophobic in dry spells, so watering just runs off the surface."
      ),
      createFAQ(
        "How many bags of soil for a 4ft x 8ft raised bed?",
        "A 4ft by 8ft bed (roughly 1.2m by 2.4m) at 30cm deep needs about 864 litres. That is around 17 standard 50L bags. A single 800L bulk bag delivered usually works out cheaper than buying 16 to 17 individual bags from a garden centre."
      )
    ],
    relatedTools: [
      { slug: "lawn-feed-calculator", label: "Lawn Feed Calculator" },
      { slug: "seed-spacing-calculator", label: "Seed Spacing Calculator" },
      { slug: "watering-calculator", label: "Watering Calculator" },
    ],
  },

  "retrofit-savings-estimator": {
    sections: [
      createAnswerFirstSection(
        "How a Whole-House Retrofit Plan Stacks Up",
        "A full retrofit is rarely a single project. It is a sequence: insulation first, then heating, then renewables. The estimator runs nine measures against your property age, type, size and current EPC, then ranks them by payback. A medium semi from 1975 to 1995 with EPC E typically shows £1,800 in current annual energy spend, with the cheapest wins (loft insulation at 270mm for around £500, smart heating controls for £600) recouping themselves inside a decade.",
        "The ordering matters. Air-source heat pumps cost roughly £10,000 installed and only make financial sense once you have already insulated the walls and loft, otherwise the system is sized too large and runs inefficiently. The same goes for solar: a 5kW array around £10,000 pays back faster if you have a battery and a heat pump using the daytime generation, rather than exporting most of it back to the grid at low rates."
      ),
      createAnswerFirstSection(
        "What Grants Are Available in 2026",
        "The Boiler Upgrade Scheme (BUS) currently offers £7,500 toward an air source heat pump installation, which knocks the headline £10,000 cost down to £2,500 net. ECO4, the Energy Company Obligation, covers full or partial cost of insulation and heating measures for households on means-tested benefits or with low-income occupants in EPC D-G properties; a complete ECO4 package can be worth around £10,000 per home.",
        "Local councils run their own grant pots through the Home Upgrade Grant and the Local Authority Delivery scheme; these change yearly and have postcode eligibility. Always check what you qualify for before paying for measures privately, because retrospective claims are usually not allowed once work has started. Use the [EPC Improvement Checker](/epc-improvement-checker) to see which improvements push your specific rating fastest."
      ),
      {
        heading: "Typical Payback by Measure (medium 3-bed, current EPC E)",
        table: {
          headers: ["Measure", "Cost", "Annual Saving", "Payback"],
          rows: [
            ["Loft insulation (270mm)", "£500", "£216", "~5 yrs"],
            ["Smart heating controls", "£600", "£108", "~10 yrs"],
            ["Cavity wall insulation", "£1,200", "£270", "~8 yrs"],
            ["Condensing gas boiler", "£2,500", "£144", "~31 yrs"],
            ["Air source heat pump", "£10,000", "£720", "~25 yrs (less BUS)"],
            ["5kW solar PV", "£10,000", "£630", "~29 yrs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I get a heat pump before insulating?",
        "No. Heat pumps run at lower flow temperatures than gas boilers, around 45 to 55°C against 70°C, so they need a well-insulated envelope to keep rooms warm. Installing one in a leaky pre-1930 solid-walled house often results in a system that struggles in cold snaps and runs constantly. Get loft insulation, cavity fill where possible, and draught-proofing done first."
      ),
      createFAQ(
        "How long does a full retrofit take?",
        "A phased retrofit normally spans three to five years. Quick wins (loft, controls, draughtproofing) can be done in a single week. Cavity wall insulation is a one-day job. New boilers or heat pumps take two to five days. Solar takes a day. Solid wall insulation, if needed, is the disruptive one - allow two to four weeks. Spreading the work also spreads the cash flow."
      ),
      createFAQ(
        "Will gas boilers really be banned in 2035?",
        "The current government plan is to phase out the sale of new gas boilers in new-build properties by 2025 and end gas boiler installations in existing properties by 2035. Existing boilers are not affected. If your boiler is over 12 years old in 2026, the next replacement may be your last gas-powered one, so factor heat pump readiness (insulation, larger radiators) into any boiler decision now."
      ),
      createFAQ(
        "What EPC rating should I aim for?",
        "Band C (a score of 69 to 80) is the realistic target for most older homes and is the threshold for some future regulations on rented properties. Pre-1930 solid wall properties can be very expensive to push above D without solid wall insulation. Modern post-1995 builds often reach B with insulation, controls and a small renewables addition."
      ),
    ],
    relatedTools: [
      { slug: "solar-battery-payback-calculator", label: "Solar Battery Payback Calculator" },
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
      { slug: "should-i-fix-or-replace", label: "Should I Fix or Replace" },
    ],
  },

  "seed-spacing-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Vegetable Spacing Works",
        "Every crop has two spacings: between plants in a row, and between rows themselves. Carrots want 5cm between plants and 30cm between rows. Beans need 15cm and 45cm. Tomatoes go to 45cm and 60cm because their canopy is wider and the airflow gap matters for blight prevention. Get either dimension wrong and you either waste bed space or smother the plants.",
        "Punching the bed dimensions and crop into the tool returns the row count, plants per row, and total plants. For a 2m by 1m bed of carrots that comes out at 3 rows of 40 plants, so 120 carrots in a small raised bed. The same bed planted with courgettes (90cm spacing both ways) fits just one plant - which is plenty, because each plant produces about 4kg of fruit over a season."
      ),
      createAnswerFirstSection(
        "Why You Need More Seeds Than Plants",
        "Germination rates aren't 100%. Parsnips germinate at around 60%, onions at 70%, carrots at 75%, beans and lettuce at 85%, potatoes at 90% (these are tubers, not seeds). To get 120 carrots in the ground you actually need to sow around 160 seeds. The calculator factors this in automatically using the typical rate per crop, but you can override it if you have fresh, professionally produced seed (often higher) or older packet stock from your shed (often lower).",
        "A standard British seed packet contains roughly 50 to 200 seeds depending on the crop. The tool assumes 50 seeds per packet for the conservative estimate. Old seed loses viability fast: parsnip and leek seed is essentially dead after 12 months, while tomato and bean seed stay viable for four to five years if stored cool and dry. Always do a paper-towel germination test on packets older than two years before relying on them."
      ),
    ],
    faqs: [
      createFAQ(
        "How many tomato plants in a 1m by 2m bed?",
        "Tomatoes need 45cm between plants and 60cm between rows, so a 1m by 2m bed fits one row of four plants. That is enough for a household of four to five through summer. If you cordon-train them up canes you can drop the plant spacing to 40cm and squeeze in five, but yield per plant drops as competition increases."
      ),
      createFAQ(
        "Can I plant closer than the recommended spacing?",
        "Square Foot Gardening tightens spacings considerably (carrots at 7.5cm both ways, lettuce at 15cm) but it relies on enriched, deeply dug soil and consistent watering. Standard packet spacings are conservative and assume average soil. Closer planting works in raised beds with good compost; in heavy clay you should respect the recommendations or you will see disease and stunted growth."
      ),
      createFAQ(
        "Do I need to thin seedlings?",
        "Yes for most direct-sown crops. Carrots, beetroot and parsnips are sown thicker than needed because germination is patchy, then thinned to final spacing once the seedlings have two true leaves. Snip the unwanted seedlings at soil level rather than pulling, which can disturb the roots of those staying. Thinnings of carrots and beetroot are edible."
      ),
      createFAQ(
        "How deep should a raised bed be for these crops?",
        "Most veg are happy in 30cm of soil. Carrots, parsnips and longer beetroot want 45cm. Salads, radishes and herbs cope in 20cm. If you are planning a new bed see the [Raised Bed Calculator](/raised-bed-calculator) for soil volume and material costs."
      ),
    ],
    relatedTools: [
      { slug: "raised-bed-calculator", label: "Raised Bed Calculator" },
      { slug: "lawn-feed-calculator", label: "Lawn Feed Calculator" },
      { slug: "wallpaper-calculator", label: "Wallpaper Calculator" },
    ],
  },

  "should-i-fix-or-replace": {
    sections: [
      createAnswerFirstSection(
        "How to Compare Repair vs Replacement Honestly",
        "The right metric is cost per year of expected life, not the headline price. A £500 repair that lasts two more years costs £250 a year. A £3,000 new boiler that lasts 15 years costs £200 a year. The new one wins by £50 a year and you avoid the breakdown risk; that is the calculation most people skip when the engineer quotes a repair price.",
        "The tool does this comparison live for nine common items: boilers, cars, fridges, washing machines, dishwashers, ovens, roofs, windows and a custom option. Enter the repair quote, the replacement cost, and your honest estimate of how long the repair will hold. The default expected lifespans (boiler 15 years, fridge 12, washing machine 10) come from the typical manufacturer warranty plus realistic real-world use."
      ),
      createAnswerFirstSection(
        "When the Numbers Lie",
        "Cost per year is a strong starting point, not the whole picture. Energy efficiency can swing the answer hard: a 12-year-old combi boiler running at 80% efficiency may cost £200 a year more in gas than a modern condensing boiler at 92%, which makes replacement attractive even when the repair maths technically favours fixing. The same applies to fridges (an A-rated 2026 fridge uses about half the electricity of a 15-year-old model) and washing machines.",
        "Reliability risk is the other unmeasured cost. A washing machine on its third repair in two years is statistically likely to need a fourth, and at some point the cumulative spend exceeds replacement. The tool doesn't model that compounding; it assumes the repair holds for the years you specify. Be conservative on that input - if the engineer says \"this should last another two years\", that means it might also fail next month."
      ),
    ],
    faqs: [
      createFAQ(
        "Is it worth repairing a 12-year-old boiler?",
        "Usually no, if the repair is over £300. Boiler efficiency drops with age, parts get harder to source, and engineers often quote two to three years of remaining life on a unit that age. A typical £500 repair on a 12-year-old boiler costs £250 a year for two years, while a £2,500 condensing replacement costs around £170 a year over 15 years and saves on gas usage."
      ),
      createFAQ(
        "When should I scrap a car instead of repairing?",
        "When the repair cost exceeds 50% of the car's market value, or when the car is over 12 years old and faces a major mechanical failure (gearbox, head gasket, timing chain). The cost-per-year calculation can flip suddenly: a £1,500 repair on a £2,000 car works out badly because the car is depreciating faster than the repair is amortising."
      ),
      createFAQ(
        "Are extended warranties worth it on appliances?",
        "Generally no. Most consumer rights legislation in the UK already gives you a six-year window to challenge serious defects under the Consumer Rights Act 2015. Manufacturer warranties on washing machines and dishwashers usually cover one to two years. Paid extended cover at £40 to £80 a year often costs more over the life of the machine than the occasional out-of-warranty repair would."
      ),
      createFAQ(
        "What about environmental cost of replacing?",
        "Manufacturing a new fridge or washing machine has a significant carbon footprint, perhaps 200 to 400kg of CO2 equivalent. A repair almost always wins on environmental grounds for items under eight years old. Above that age, the energy savings from a modern efficient appliance can offset the embedded carbon of manufacturing within four to five years of use."
      ),
    ],
    relatedTools: [
      { slug: "retrofit-savings-estimator", label: "Retrofit Savings Estimator" },
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
      { slug: "home-inventory-tracker", label: "Home Inventory Tracker" },
    ],
  },

  "solar-battery-payback-calculator": {
    sections: [
      createAnswerFirstSection(
        "Whether a Solar Battery Pays Back",
        "Adding a battery to an existing solar PV system typically pays back in 8 to 12 years on average UK usage patterns, with the exact figure swinging on three things: your usage profile, your import tariff, and your export rate. A 5kWh battery on a 5kW solar system at 24.5p import and 15p export, with balanced daytime use, recovers its £5,000 cost in around 11 years - close to the warranty edge.",
        "The economics improve considerably for evening-heavy households. Without a battery, a typical solar setup self-consumes only 45% of what it generates, exporting the rest at low rates. A battery raises that to 75 to 85% by storing surplus daytime generation for evening use, which is when most families do laundry, cooking and TV. That swing from 15p export rate to 24.5p import-displaced is the entire economic case."
      ),
      createAnswerFirstSection(
        "Why Day-Heavy Users Often Skip the Battery",
        "If you work from home or run heat pumps and EV charging during the day, you are already self-consuming most of your solar generation. A battery in this scenario captures only the small evening overflow and the payback stretches well past 15 years - longer than most warranties. The calculator flags this clearly: with day-heavy usage, the additional self-consumption from a battery can drop to under 1.5 kWh per day.",
        "The maths also wobbles when export tariffs are generous. Octopus Outgoing or specific Smart Export Guarantee deals at 20p+ make exporting nearly as profitable as self-consuming. Always check your current SEG rate before adding a battery; if you are on a legacy Feed-in Tariff (closed to new entrants in 2019 but still paying out), batteries can actually reduce your guaranteed FiT generation income because they shift your meter readings."
      ),
      {
        heading: "Battery Payback by Usage Pattern (5kW solar, £5,000 battery)",
        table: {
          headers: ["Usage Pattern", "Self-Consumption", "Annual Saving", "Payback"],
          rows: [
            ["Day-heavy (home all day)", "65%", "~£280", "18+ yrs"],
            ["Balanced", "75%", "~£420", "12 yrs"],
            ["Evening-heavy", "85%", "~£560", "9 yrs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How long do solar batteries actually last?",
        "Lithium iron phosphate (LFP) batteries, the dominant chemistry in 2026 home storage, are typically warrantied for 10 to 15 years or 6,000 cycles, whichever comes first. Real-world degradation is around 0.5 to 1% capacity loss per year. A 5kWh battery should still hold roughly 4.25kWh after 15 years of daily cycling, which is enough to remain useful for many more years."
      ),
      createFAQ(
        "Do I need a battery for off-grid backup during power cuts?",
        "Only if your inverter is hybrid and explicitly supports backup mode. Standard grid-tied solar systems shut off during outages for safety reasons, and a non-hybrid battery is no use during a cut. If outage backup is the priority, specify a hybrid inverter and a battery with an EPS (Emergency Power Supply) circuit during installation."
      ),
      createFAQ(
        "Can I add a battery to an existing solar installation?",
        "Yes. AC-coupled batteries fit any existing solar system without changing the inverter, though you pay slightly more for the integrated battery inverter. DC-coupled retrofits are cheaper but only work if your existing inverter supports a battery input. Most installers can add either to a system installed in the last decade."
      ),
      createFAQ(
        "How big a battery do I need?",
        "Match it to your evening peak. A typical UK household uses 5 to 8 kWh between 5pm and 11pm. A 5 kWh battery covers most of that demand, while a 10 kWh battery handles heat pump or EV charging on top. Going bigger than your daily evening shortfall wastes money - the extra capacity sits idle. The [Retrofit Savings Estimator](/retrofit-savings-estimator) can size a whole-house plan including battery sizing."
      ),
    ],
    relatedTools: [
      { slug: "retrofit-savings-estimator", label: "Retrofit Savings Estimator" },
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
      { slug: "should-i-fix-or-replace", label: "Should I Fix or Replace" },
    ],
  },

  "tipping-guide-abroad": {
    sections: [
      createAnswerFirstSection(
        "How Tipping Norms Differ by Country",
        "Tipping is wildly inconsistent globally and getting it wrong reads either as cheap or as ignorant. The US sits at the high end: 18 to 20% in restaurants is now standard because tipped wages can be as low as $2.13 an hour federally, so servers depend on tips. In Japan, the same 18% gesture is genuinely embarrassing - tipping is not part of the culture and waiters have been known to chase you down the street to return the money.",
        "France banned the requirement to tip in 1987 with the \"service compris\" law: a 15% service charge is built into every restaurant bill. Leaving small change for excellent service is appreciated but absolutely not expected. The UK sits in the middle at 10 to 12.5%, often added automatically as an \"optional\" service charge that you can ask to remove. China and Japan are essentially zero, while Australia is genuinely optional because hospitality wages are higher."
      ),
      createAnswerFirstSection(
        "Beyond Restaurants: Bellhops, Taxis, Hairdressers",
        "Restaurant tipping gets all the attention, but the real travel awkwardness is in the gaps. In the US tip the bellhop $1 to $2 per bag, the taxi 15 to 20%, the hotel housekeeper $2 to $5 per night left on the pillow. In France give €1 to €2 per bag, round up the taxi, leave nothing for housekeeping. In Thailand tip the bellhop 20 to 50 baht, round taxi fares to the nearest baht, but tip restaurant staff 10% if no service charge is shown.",
        "When in genuine doubt, watch what locals do or check your bill carefully for an existing service charge before adding more. The tool covers ten countries with country-by-country rules per service type, plus notes on whether service is already included. Pair it with the [Currency Converter](/currency-converter) to translate the recommended cash tip into your home currency before you draw from the ATM."
      ),
    ],
    faqs: [
      createFAQ(
        "Is service charge the same as a tip in the UK?",
        "Often, but not always. The Tipping Act 2024 in the UK requires that 100% of tips and service charges go to staff, with employers no longer permitted to retain any portion. If you see \"service charge included\" on your bill it should be reaching the team. You can request its removal if service was poor. Cash tips are still common and go directly to the server."
      ),
      createFAQ(
        "Why is tipping rude in Japan?",
        "Japanese service culture treats good service as the baseline expectation, not something requiring extra reward. Offering money implies the staff would otherwise have done less - which is insulting. The few exceptions are personalised services like ryokan (traditional inn) attendants, where a small amount in an envelope is acceptable as omotenashi (hospitality) etiquette."
      ),
      createFAQ(
        "Should I tip on the pre-tax or post-tax amount?",
        "Pre-tax is the technically correct calculation in the US, where sales tax can add 8 to 10% to bills and isn't service. In practice most diners tip on the post-tax total because the maths is faster and the difference is small. In Europe, where VAT is already included in the menu price, this question doesn't arise."
      ),
      createFAQ(
        "Do I tip the bartender for every drink?",
        "In the US: yes, $1 per drink minimum, or $2 for a cocktail. In the UK: optional, not expected, but \"have one yourself\" or rounding up after a long session is appreciated. In France and Italy: no, especially at the bar where prices are lower than at a table. In Japan: never."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "jet-lag-calculator", label: "Jet Lag Calculator" },
      { slug: "flight-time-calculator", label: "Flight Time Calculator" },
    ],
  },

  "unit-price-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why Pack Size Beats Sticker Price",
        "Supermarket pricing is designed to obscure value. A 250g jar of coffee at £4.50 looks pricier than a 100g jar at £2.50, but the price per gram is 1.8p vs 2.5p - the bigger jar is 28% cheaper per cup. The Unit Price Calculator compares up to six products at once and ranks them by price per unit, factoring in unit conversions automatically (1 kg becomes 1,000g, 1 litre becomes 1,000ml).",
        "Per-unit thinking exposes the so-called \"family pack premium\" lie that has crept into UK supermarkets since 2022. Roughly one in four \"big\" packs is now actually more expensive per gram than the standard size. Ariel washing pods, Heinz beans, branded breakfast cereals: a 2025 Which? survey found over 30% of multi-buys cost more per unit than the smaller version of the same product."
      ),
      createAnswerFirstSection(
        "Where Unit Pricing Matters Most",
        "The biggest savings come on items you buy regularly: cleaning products, pasta, rice, tinned tomatoes, cooking oil, washing detergent. A household saving 15p per kilo on rice eaten weekly saves about £8 a year, which sounds trivial until you stack it across thirty staples - that is £240 over a year of grocery shopping with zero quality compromise.",
        "The tool also catches \"unit price labelling errors\". Supermarkets are legally required to display unit prices under the Price Marking Order 2004, but these tags frequently use inconsistent units (price per 100g on one product, price per kg on the neighbouring rival). Punching both into the calculator with the same unit settles it cleanly. For VAT-inclusive comparisons see the [VAT Calculator](/vat-calculator) and for percentage discount stacking try the [Discount Calculator](/discount-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the bigger pack always cheaper?",
        "No. About 30% of \"value\" or \"family\" packs in major UK supermarkets are now more expensive per gram than the standard size. Always check the unit price tag on the shelf edge. The reasons vary: brand strategy, supplier contracts, or simple price markup on the larger format because consumers assume it's better value."
      ),
      createFAQ(
        "How do I compare items sold by count vs by weight?",
        "The tool supports an \"each\" or \"pack\" unit for items priced per item rather than weight (eggs, toilet rolls, dishwasher tablets). For a true value comparison in those categories, look at the secondary unit too: price per egg, price per sheet of toilet paper, price per wash. Some supermarkets show this on the shelf tag."
      ),
      createFAQ(
        "Do supermarkets have to show unit prices?",
        "Yes. The Price Marking Order 2004 requires unit prices on most pre-packaged food, drink and household goods sold in the UK. Common units include per 100g, per kg, per 100ml and per litre. Compliance is patchy on small or own-brand items and on multi-buy promotions where the unit price often reflects the multi-buy total rather than the per-unit cost."
      ),
      createFAQ(
        "Why does the calculator show price to four decimal places?",
        "Per-unit prices on cheap items can be tiny - a kilo of rice at £1.20 works out at 0.0012p per gram. Two decimal places would round most of those values to 0.00, removing the visible difference between products. Four decimal places preserves the comparison even on items priced fractions of a penny per gram or millilitre."
      ),
    ],
    relatedTools: [
      { slug: "discount-calculator", label: "Discount Calculator" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "vat-calculator", label: "VAT Calculator" },
    ],
  },

  "wallpaper-calculator": {
    sections: [
      createAnswerFirstSection(
        "Working Out Roll Counts Without Over-Buying",
        "A standard UK wallpaper roll measures 10.05m long by 53cm wide, giving four to five drops per roll on a typical 2.4m ceiling height. The calculator takes your room perimeter, height, and the number of doors and windows, then deducts roughly 2m of full-height coverage per door and 1.5m per window. For a typical 12m perimeter room with one door and two windows at 2.4m height, that is around four rolls of plain paper.",
        "Pattern repeat dramatically changes the answer. A plain paper has zero waste between drops - you cut where you cut. A 50cm pattern repeat means each new drop has to start where the pattern aligns, wasting up to 50cm at the bottom of every drop. A 64cm repeat (the largest typical) on the same room can push roll requirements from four up to six. The calculator factors this in and shows the wastage percentage so you understand where the extra rolls go."
      ),
      createAnswerFirstSection(
        "Pattern Repeat, Trim Allowance and Why You Buy One Extra",
        "Real-world hanging wastes more material than the maths suggests because of trim cuts at top and bottom (10cm allowance is standard), pattern alignment errors during hanging, and offcuts above doors and windows that can't be reused. Always order one extra roll beyond what the calculator returns. It costs £10 to £30 extra at typical UK roll prices but saves a frantic dye-lot match if you run short halfway through.",
        "Dye lots are the other gotcha. Wallpaper printed in different production runs can vary subtly in shade, and matching mid-job is nearly impossible. Buy all your rolls together, check the batch number is identical on each, and store the spare unrolled (a partly used roll re-rolled tends to crease). For room measurement help see the [Paint Calculator](/paint-calculator), which works out paint volumes for any leftover walls or ceilings."
      ),
      {
        heading: "Rolls Required by Room Size (2.4m ceiling, plain paper)",
        table: {
          headers: ["Room Perimeter", "Doors", "Windows", "Standard Rolls"],
          rows: [
            ["8m (small bedroom)", "1", "1", "3"],
            ["12m (double bedroom)", "1", "2", "4"],
            ["16m (lounge)", "1", "2", "5"],
            ["20m (large lounge)", "2", "3", "6"],
            ["24m (open-plan)", "2", "4", "8"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many rolls do I need for a small bedroom?",
        "A typical small UK bedroom of 3m by 4m at 2.4m ceiling height has a 14m perimeter. Deducting one door and one window leaves around 11m of net coverage. With plain paper that is three rolls; with a 50cm pattern repeat, four rolls. Always add one extra for trim and a dye-lot safety margin."
      ),
      createFAQ(
        "Can I wallpaper over existing wallpaper?",
        "Generally no. The new paste reactivates the old paste and can lift both layers, leaving bubbles and seams. Strip the old paper first using a steam stripper or wallpaper remover gel. The exception is lining paper underneath, which is designed to take a new finish layer. Walls should be smooth, dry and primed before hanging anything textured."
      ),
      createFAQ(
        "What about the area above the door?",
        "The calculator deducts a full door-height of 2m from your perimeter, which slightly underestimates roll needs because the area above the door (40 to 60cm) still needs covering. In practice the offcuts from the door area can usually cover that gap, but if you want to be conservative reduce the deducted door count by half."
      ),
      createFAQ(
        "Do wide rolls (1.06m) save money?",
        "Sometimes. Wide UK rolls are 10.05m long by 1.06m wide, double the area of a standard roll, and typically cost around 80% more rather than double - so per square metre they're cheaper. The catch is fewer drops per roll mean less flexibility around tricky cuts, and pattern matching on wider strips is harder for amateurs. Beginners usually do better with standard width."
      ),
    ],
    relatedTools: [
      { slug: "paint-calculator", label: "Paint Calculator" },
      { slug: "tile-calculator", label: "Tile Calculator" },
      { slug: "fence-calculator", label: "Fence Calculator" },
    ],
  },

  "wifi-qr-generator": {
    sections: [
      createAnswerFirstSection(
        "How a WiFi QR Code Actually Works",
        "A WiFi QR code encodes your network details in a standard string format that phones recognise: \"WIFI:T:WPA;S:MyNetwork;P:password123;;\". When a guest scans it with their phone camera, the operating system reads the encoded SSID, password and security type, then pops up a join prompt. No typing, no spelling out the password, no \"is that a zero or an O\" exchange. iPhones since iOS 11 (2017) and all Android phones from version 10 onwards support this natively in the camera app.",
        "Everything happens in your browser. The tool takes your network name, password and security type (WPA/WPA2/WPA3 for almost any modern router, WEP for very old ones, or Open for guest networks), builds the encoded string locally, and renders the QR. Nothing is sent to any server, which matters because you are encoding a credential that gives full network access. Verify it works by scanning the on-screen code with a second phone before printing."
      ),
      createAnswerFirstSection(
        "Card Styles and Where to Print Them",
        "A bare QR code on a fridge magnet works, but a styled card frames it as something you actually want on display. The generator includes six card designs: Modern (dark navy gradient), Warm Home (cream and amber), Ocean, Garden, Sunset and Minimal. Each one builds an 800x1000px PNG with the QR centred, network name printed below in clear typography, and the password in a monospace font for the inevitable manual fallback if a guest's old phone doesn't auto-detect.",
        "Print at A6 (105mm x 148mm) for a coffee table card, A5 for a guest room, or A4 for a holiday let entrance hall. The generated card is high enough resolution for any of these. Common print spots: clipped onto the fridge for the family minder, framed on the dressing table in a guest bedroom, laminated on reception desks, or stuck inside the welcome book of a holiday rental. Pair it with the [QR Code Generator](/qr-code-generator) for non-WiFi codes (URLs, vCards, payment links)."
      ),
    ],
    faqs: [
      createFAQ(
        "Is it safe to put my WiFi QR code on the fridge?",
        "It is safe within your trust circle. Anyone who scans it can join your network, just as anyone you read the password to could. If you have sensitive devices on the same network (a NAS, a home camera, work files), separate them onto a different VLAN or guest network and create the QR for the guest network only. Most modern routers from BT, Sky, Virgin and TP-Link support a separate guest SSID."
      ),
      createFAQ(
        "Does the QR code work on iPhones and Androids?",
        "Yes. iOS 11 (2017) and later auto-detect WiFi QR codes in the standard camera app. Android 10 (2019) and later do the same; older Androids may need a free QR scanner app from the Play Store. The format is an industry standard, so the same code works across operating systems and on most tablets."
      ),
      createFAQ(
        "What if my password contains a special character?",
        "The tool escapes the special characters that could break the QR encoding (backslash, semicolon, comma, colon, double-quote) automatically. Passwords with these characters work fine. If you find a phone that struggles to read your QR, regenerate it after temporarily simplifying the password to confirm it's not a router-side encoding issue."
      ),
      createFAQ(
        "Should I select WPA, WPA2 or WPA3?",
        "Choose \"WPA\" in the tool for any modern router; the format is identical for WPA, WPA2 and WPA3. Only choose WEP if your router is from before 2007 (WEP is insecure and you should upgrade the router). Open networks have no password and use the \"Open\" option, which removes the password field from the encoded string."
      ),
    ],
    relatedTools: [
      { slug: "qr-code-generator", label: "QR Code Generator" },
      { slug: "password-generator", label: "Password Generator" },
      { slug: "home-inventory-tracker", label: "Home Inventory Tracker" },
    ],
  },

  "wood-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Building a Cut List That Maps to Real Timber Yards",
        "Timber yards sell pine and oak by the linear metre, plywood and MDF by the sheet. The calculator handles both: enter each piece by length, width, thickness, wood type and quantity, and it converts to the right pricing unit. Pine sits around £3 per linear metre, oak around £12, walnut around £18, an 8x4ft (1220x2440mm) plywood sheet around £15, and equivalent MDF around £8. Prices vary by yard and grade, so the defaults are starting points - update them with your local merchant's quote.",
        "A simple project like a four-legged stool with 1000mm pine legs at 50x50mm comes to roughly 4 x 1m = 4 linear metres, costing about £12 in raw timber. Add a 600mm x 300mm seat in 18mm pine at the same rate (using a separate piece entry), plus four 400mm rails, and you're at around £20 to £25 in pine before waste. The same project in oak runs to £80 to £100 - oak's cost is the single biggest decision in any furniture build."
      ),
      createAnswerFirstSection(
        "Why You Add a Waste Factor",
        "Cuts are never 100% efficient. A standard waste factor of 10 to 15% covers saw kerf (the 3mm or so the blade removes per cut), tear-out at board ends, knots that need cutting around in pine, and the inevitable mismeasure on at least one piece. Hardwoods like oak and walnut warrant 15 to 20% waste because rough-sawn boards arrive with sap-wood edges and warps that need machining off before you reach usable dimensions.",
        "Sheet goods (plywood, MDF) typically need only 5 to 10% because you can plan cuts on a single sheet to nest pieces efficiently. The tool defaults to 15%; drop to 5% for prepared S4S (surfaced four sides) timber, raise to 25% if you're working with reclaimed boards or rough-sawn green oak. For board-foot pricing of US hardwoods, see the [Board Foot Calculator](/board-foot-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I use pine or oak for my first project?",
        "Pine for almost any first project. It's cheap (about £3 per linear metre vs £12 for oak), tools easily, and any mistake is a £4 lesson rather than a £20 one. Oak is unforgiving: it tears out badly with dull tools, splits when nailed without pilot holes, and dulls blades faster. Build the same piece twice in pine before committing to oak."
      ),
      createFAQ(
        "Is plywood cheaper than MDF?",
        "Generally no. Standard 18mm hardwood-faced plywood runs around £40 to £50 per 8x4 sheet, while MDF of equivalent thickness is around £25 to £35. The defaults in this tool reflect a basic structural plywood and standard MDF; specialty plywood (birch, marine grade) costs significantly more. MDF is denser, paints well and machines cleanly but is heavier, weaker in tension, and creates fine dust requiring respiratory protection."
      ),
      createFAQ(
        "How do I price reclaimed timber?",
        "Reclaimed boards from yards typically cost 60 to 80% of new equivalent prices, but factor higher waste (25 to 35%) because of nail holes, splits, and unusable sections. The price-per-linear-metre advantage often disappears once you've discarded the unusable portions. The character can be worth it; the savings often aren't."
      ),
      createFAQ(
        "What's a sensible waste factor for kitchen carpentry?",
        "10 to 12% on prepared softwood, 5 to 8% on sheet goods, 15 to 18% on hardwoods. Built-in furniture is usually scribed to fit out-of-square walls, which adds offcuts. Always add at least one extra plank or sheet to the order; the cost of an unplanned trip back to the yard is far higher than carrying spare material."
      ),
    ],
    relatedTools: [
      { slug: "board-foot-calculator", label: "Board Foot Calculator" },
      { slug: "wood-joint-calculator", label: "Wood Joint Calculator" },
      { slug: "wood-finishing-calculator", label: "Wood Finishing Calculator" },
    ],
  },

  "construction-calculator": {
    sections: [
      createAnswerFirstSection(
        "How a Construction Calculator Handles Feet, Inches and Fractions",
        "A construction calculator works in feet-inches-sixteenths instead of decimals, which is what every tape measure on a job site reads. You can enter 10 ft 6 1/2 in, then add 4 ft 9 3/4 in, and the calculator gives you 15 ft 4 1/4 in directly. No mental conversion to decimal feet, no rounding errors, no scribbled longhand on the back of a stud.",
        "This tool follows the layout most carpenters already know from the Construction Master Pro: dedicated feet, inch, and fraction buttons, with a yard key for concrete work and a metres key when a drawing is in mixed units. Internally everything is held as decimal feet so calculations are accurate; the display rounds to the nearest 1/16 inch because that is the smallest mark on a standard measuring tape."
      ),
      createAnswerFirstSection(
        "Roof Pitch, Rise and Run in One Step",
        "Enter the pitch as a single number (8 means 8/12) plus the run, and the calculator returns the rise, the diagonal (rafter length), and the angle in degrees. A 24 ft span with a 6/12 pitch gives a rise of 6 ft 0 in, a rafter of 13 ft 5 in, and an angle of about 26.57 degrees.",
        "Roofers in the UK and Ireland often think in degrees rather than rise-over-run, so the angle output matters. A common gotcha: pitch in the US is rise-over-12-inches, while a roof drawing from a UK architect may be expressed as a percentage or in degrees. The calculator accepts pitch as a fraction of 12 by default; convert from degrees first if your plans use that. See the [Pythagorean Theorem Calculator](/pythagorean-theorem-calculator) for the underlying maths."
      ),
      {
        heading: "Common Roof Pitches and What They Look Like",
        table: {
          headers: ["Pitch", "Angle (degrees)", "Visual", "Typical Use"],
          rows: [
            ["2/12", "9.5", "Almost flat", "Low-slope sheds, garden rooms"],
            ["4/12", "18.4", "Gentle slope", "Bungalows, modern extensions"],
            ["6/12", "26.6", "Standard", "Most UK pitched roofs"],
            ["8/12", "33.7", "Steeper", "Lofts with usable headroom"],
            ["12/12", "45.0", "Very steep", "Alpine, gothic, dormer-heavy designs"],
          ],
        },
      },
      createAnswerFirstSection(
        "Stair Calculations Without the Headache",
        "Building Regs (Approved Document K) caps domestic stair risers at 220 mm and sets goings of at least 220 mm; the rule of thumb 2R + G = 600 to 620 mm gives a comfortable rhythm. Enter total rise (typically the floor-to-floor height, e.g. 8 ft 9 in) and the calculator divides it into legal risers, returns the going, the total run, and the stringer length.",
        "If you have a fixed total run, you can work the other way: pin the run, and the calculator tells you how many treads fit and what each riser height needs to be. A staircase with a 2,650 mm total rise and 14 risers gives a riser of 189 mm and a going of about 230 mm, which is a classic pattern. Mark out the stringer with the rafter square; the diagonal output is the cut length you need."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I switch between feet-inches and metric?",
        "Yes. The conversion key flips between feet, inches, yards, metres and millimetres, holding the same internal value. So 10 ft 6 1/2 in toggles to 3.213 m and back without losing precision. Architects, plumbers and tilers regularly mix units on a single project, especially when one supplier ships in metric and another in imperial."
      ),
      createFAQ(
        "Why does my fraction round to the nearest 1/16?",
        "Standard tape measures only mark to 1/16 inch, so anything finer is impossible to lay out by hand. If you need 0.412 inches, the closest tape mark is 7/16 (0.4375 in). The calculator rounds for you so the displayed answer is the one you actually transfer to the timber."
      ),
      createFAQ(
        "How do I calculate a circle for a curved wall or arch?",
        "Use the circle mode, enter the diameter, and you get the circumference (2 pi r), the area, and the radius. For an arch, you typically need the chord length and the rise of the arc; that is a job for the [Pythagorean Theorem Calculator](/pythagorean-theorem-calculator) since it reduces to a right-angle problem at the centre point."
      ),
      createFAQ(
        "Does this match the Construction Master Pro?",
        "The core feet-inches-fractions arithmetic, the area and volume modes, the pitch and rise/run buttons, and the stair calculator all behave the way the Master Pro does. A few advanced features (rebar, baluster spacing, drywall by sheet) are still on the roadmap. For sheet-goods estimation today, see the [Square Footage Calculator](/square-footage-calculator)."
      ),
      createFAQ(
        "What is the easiest way to estimate a concrete pour?",
        "Multiply length by width by depth, in feet. A 10 ft x 12 ft slab at 4 in deep is 10 x 12 x (4/12) = 40 cubic feet, or 1.48 cubic yards. Concrete is sold by the cubic yard in the US and by the cubic metre in the UK, and most ready-mix suppliers add a 5 to 10% allowance for spillage and uneven sub-grade. The volume mode handles this in one operation."
      ),
    ],
    relatedTools: [
      { slug: "square-footage-calculator", label: "Square Footage Calculator" },
      { slug: "paint-calculator", label: "Paint Calculator" },
      { slug: "pythagorean-theorem-calculator", label: "Pythagorean Theorem Calculator" },
    ],
  },

  "square-footage-calculator": {
    sections: [
      createAnswerFirstSection(
        "Working Out the Area You Actually Need to Cover",
        "Square footage is length times width. The arithmetic is school-level. The mistake people make is measuring the room edge to edge and forgetting that flooring, paint and tile all need a wastage allowance on top. A 16 ft by 13 ft living room (the preset here) is 208 sq ft on the tape; the order you place at the trade counter should be closer to 230 sq ft once cuts, broken planks and the bad-batch reserve are accounted for.",
        "The calculator splits a complex room into separate sections, so an L-shaped lounge or a kitchen-diner with an alcove gets totalled correctly. Drop in your cost per square foot or per square metre and the tool returns a project total with a 10% wastage line you can adjust upwards for diagonal laying, herringbone or tile patterns with a strong direction. Most flooring offcuts add 10 to 15%, and engineered planks at angles can push that to 20%."
      ),
      createAnswerFirstSection(
        "Common UK Room Sizes for Sanity Checks",
        "An average UK bedroom sits at about 120 sq ft, a typical living room around 200 sq ft, a single garage 128 sq ft. Knowing the rough shape of these numbers stops you placing an order for half a kitchen because the tape was being read in centimetres on one wall and feet on another. The calculator accepts metric or imperial and converts under the hood.",
        "Circles and triangles trip people up. A round patio with a 4 m diameter has an area of pi r squared, not 4 m squared; the actual figure is closer to 12.6 sq m. The triangle mode halves a base-by-height rectangle for simple wedge sections. For kerb-stones, soakaway pits or anything with a depth, [Cubic Feet Calculator](/cubic-feet-calculator) takes the area output and adds the third dimension."
      ),
    ],
    faqs: [
      createFAQ(
        "How do I calculate square footage for an irregular room?",
        "Break the room into rectangles, triangles and any half-circle bays. Measure each piece, calculate the area separately, then add them. The calculator's section mode does this automatically: add a section for each piece, set the shape, enter the dimensions and the totals roll up at the bottom."
      ),
      createFAQ(
        "How much wastage should I add for flooring?",
        "10% is the default for straight laying with a uniform plank length. Push to 15% for a diagonal pattern or for short rooms where waste off each cut is bigger relative to the run. Tile mosaics and intricate patterns can need 20%. It is always cheaper to add the extra than to come back for half a box that turns out to be a different dye lot."
      ),
      createFAQ(
        "What is the difference between square feet and square yards?",
        "1 square yard equals 9 square feet (a yard is 3 ft each side). Carpet is sometimes priced per square yard in the UK, especially for older stock. Divide your sq ft total by 9 to compare like for like, or switch the calculator to yards directly."
      ),
      createFAQ(
        "How do I convert square metres to square feet?",
        "Multiply by 10.7639. A 20 sq m kitchen is 215 sq ft. The calculator accepts both units in the same project, so you can measure a tiled wall in metric and the floor in imperial without converting by hand."
      ),
    ],
    relatedTools: [
      { slug: "tile-calculator", label: "Tile Calculator" },
      { slug: "paint-calculator", label: "Paint Calculator" },
      { slug: "cubic-feet-calculator", label: "Cubic Feet Calculator" },
    ],
  },

  "tile-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Many Tiles You Actually Need",
        "Floor area divided by tile area gives the bare minimum. The defaults here, a 4 m by 3 m kitchen with 450 mm by 450 mm tiles, work out at 12 sq m of floor and roughly 60 tiles before any wastage. Add the standard 10% allowance and the order rises to 66 tiles, which at 10 tiles per box rounds up to 7 boxes. That spare partial box is the buffer for breakages, off-cuts at the door threshold, and the inevitable chip when the diamond blade slips on the last cut.",
        "Different tile sizes change the maths in surprising ways. Going from 300 mm to 600 mm tiles cuts the count fourfold for the same area, but each cut wastes more material because the off-cuts are bigger. Mosaics on a 300 mm sheet behave more like wallpaper than tile when it comes to allowance. For walls with a feature pattern or for a herringbone lay, push the wastage to 15% before you order."
      ),
      createAnswerFirstSection(
        "Cost, Adhesive and Grout Often Get Forgotten",
        "Floor tile prices in the UK range from about £15 per square metre at the budget end (plain ceramic, glazed) up to £80 or more for porcelain large-format and natural stone. The calculator takes per-tile or per-box pricing and totals the project, but the supplier line on the receipt is rarely the full bill. A 12 sq m floor needs roughly two 20 kg bags of flexible adhesive (about £30 each) and a 5 kg bag of grout (£15). Levelling clips and spacers add a tenner.",
        "If the substrate is timber or an unstable screed, an uncoupling membrane is the difference between a floor that lasts twenty years and one that cracks in two winters. That layer adds £15 to £25 per square metre and is non-negotiable in bathrooms over joists. For paint and wall finishes near the tile line, [Paint Calculator](/paint-calculator) handles the trim coverage."
      ),
    ],
    faqs: [
      createFAQ(
        "How much wastage should I allow for tiles?",
        "10% is standard for a straight grid layout in a simple square or rectangle. For diagonal lays, herringbone or pattern repeats, allow 15%. For complex bathrooms with multiple cuts around toilets, vanities and pipes, push to 20%. Returning unopened boxes is usually possible; running out mid-job is much worse."
      ),
      createFAQ(
        "How many tiles fit in a square metre?",
        "It depends on tile size. A 300 mm tile gives 11.1 per square metre, a 450 mm tile gives 4.9, a 600 mm tile gives 2.78. Trade counters usually quote coverage per box rather than tile count; one 10-tile box of 450 mm tiles covers about 2 sq m."
      ),
      createFAQ(
        "How much adhesive and grout do I need?",
        "Standard rule of thumb is one 20 kg bag of tile adhesive per 4 to 5 sq m for floor tiles, or one bag per 6 to 8 sq m for walls. A 5 kg bag of grout covers around 8 to 10 sq m of standard 6 mm joints. Wider joints and larger tiles use more grout."
      ),
      createFAQ(
        "Should I buy tiles with the same batch number?",
        "Yes. Even within a single design, dye lots vary slightly between batches. Buying enough on day one to finish the job, including the wastage allowance, avoids the heartbreak of finishing a wall with a noticeably different shade across the grout line. Keep a spare box for future repairs."
      ),
    ],
    relatedTools: [
      { slug: "square-footage-calculator", label: "Square Footage Calculator" },
      { slug: "paint-calculator", label: "Paint Calculator" },
      { slug: "wallpaper-calculator", label: "Wallpaper Calculator" },
    ],
  },

  "fence-calculator": {
    sections: [
      createAnswerFirstSection(
        "Panels, Posts and the Bag of Concrete You Forget",
        "Standard UK lap-panel fencing is sold in 1.83 m (6 ft) wide panels at heights from 0.9 m to 1.8 m. A 20 m run of 1.8 m panels (the default here) needs 11 panels and 12 posts, because there is always one more post than panel. At roughly £25 a panel and £8 a post that is £371 in timber alone before fixings. Add a 20 kg bag of postcrete per post (£3 each) and post caps at £2 a piece, and the total drifts past £450 just for the basics.",
        "Concrete-set posts last 15 to 20 years if the timber is pressure-treated and the concrete is dome-shaped to drain water away from the post base. Metal post spikes are quicker to install (no waiting for the concrete to set) but only suit short panels in firm ground; on a windy site, anything above 1.5 m wants concrete. Swap the fixing type in the calculator and the materials list adjusts."
      ),
      createAnswerFirstSection(
        "Adding a Gate Changes the Posts",
        "A single gate is typically 0.9 m wide and a double gate around 3 m. The calculator subtracts the gate from the panel length so the run still works out, but a gate post is doing more work than a panel post and usually steps up to a heavier 100 mm by 100 mm timber or a metal gate post with concrete in. Budget around £35 for a single gate, £45 for a double, plus the heavier gate post.",
        "Gravel boards underneath the panel keep the panel itself off wet ground and add a second life to the timber. They cost around £3 each and are worth every penny on a fence that runs along a flower bed. For the patio and driveway groundwork that sometimes ties in with a new fence, [Gravel Calculator](/gravel-calculator) handles the aggregate side."
      ),
    ],
    faqs: [
      createFAQ(
        "How many fence panels do I need for 20 metres?",
        "Eleven 1.83 m panels covers 20.13 m, just over the run. You also need 12 posts (panels plus one), 12 post caps and 12 bags of postcrete if setting in concrete. Add gravel boards if you want the panels held off the ground."
      ),
      createFAQ(
        "How deep should fence posts be?",
        "For a 1.8 m fence, sink the post at least 600 mm into the ground (so use a 2.4 m post). Heavier or windier sites benefit from 750 mm. The hole should be roughly three times the post width across, filled with concrete that domes upwards above ground level to shed water."
      ),
      createFAQ(
        "Concrete or metal post spikes?",
        "Concrete is the standard for fences over 1.5 m or in soft ground; spikes shake loose under wind load on tall panels. Spikes work fine for 0.9 m garden borders or for replacing a single failed post in firm clay. Most installers use concrete by default."
      ),
      createFAQ(
        "Whose fence is it on the boundary?",
        "Check the deeds. There is no legal default in England and Wales; a T mark on the plan points to the side responsible for that boundary. If the deeds are silent, neighbours often agree informally to share the cost. Always have the conversation before driving a post in."
      ),
    ],
    relatedTools: [
      { slug: "gravel-calculator", label: "Gravel Calculator" },
      { slug: "concrete-calculator", label: "Concrete Calculator" },
      { slug: "square-footage-calculator", label: "Square Footage Calculator" },
    ],
  },

  "gravel-calculator": {
    sections: [
      createAnswerFirstSection(
        "Volume First, Then Tonnes",
        "Gravel is sold by weight, but you measure the area and depth. Multiply length by width by depth (in metres) for cubic metres, then multiply by the gravel density to get tonnes. Pea gravel runs at about 1.6 tonnes per cubic metre; MOT Type 1 sub-base is denser at 2.1. A 10 m by 5 m driveway laid 50 mm deep needs 2.5 cubic metres, which converts to roughly 4 tonnes of pea gravel before wastage.",
        "The calculator handles this in one step and adds a 10% allowance, because gravel always settles, scatters and disappears down border edges. Bulk bags hold around 850 kg each (the trade calls them tonne bags but most are slightly under). On a typical 4-tonne driveway order, expect 5 bulk bags delivered. Mini-bags at 25 kg each are useful for top-ups and hard-to-access gardens, but at roughly £4 a bag they cost three times as much per tonne as bulk delivery."
      ),
      createAnswerFirstSection(
        "Depth Is Where People Underorder",
        "A decorative top-up of 25 mm looks fine on a smart border. Anything you walk on regularly needs at least 50 mm to bed in properly without showing the membrane underneath. Driveways take a 50 mm finishing layer over a 100 to 150 mm sub-base of MOT Type 1, which is why a new driveway uses two different products and roughly four times the tonnage of a decorative scheme.",
        "On the slope of a sloping garden, gravel migrates downhill. A retaining edge (timber or steel) keeps it in place and saves a top-up every spring. For the path edging and patio kerbs that often go alongside the gravel job, [Concrete Calculator](/concrete-calculator) handles the bedding mix."
      ),
    ],
    faqs: [
      createFAQ(
        "How much gravel do I need for a driveway?",
        "For a 50 mm finishing layer, allow about 0.08 cubic metres per square metre, or roughly 130 kg per square metre of pea gravel. A 30 sq m driveway needs about 4 tonnes for the top layer alone. A new driveway also needs a 100 mm to 150 mm MOT Type 1 sub-base underneath, doubling or tripling the order."
      ),
      createFAQ(
        "How many bulk bags is a tonne of gravel?",
        "Most UK suppliers' bulk bags hold 800 to 850 kg, despite often being called 'tonne bags'. So one tonne of gravel arrives as roughly 1.2 bulk bags. A 4-tonne order is 5 bulk bags. Always confirm the actual bag weight with the supplier before ordering."
      ),
      createFAQ(
        "Should I lay weed membrane under gravel?",
        "Yes for any gravel area you do not want to weed every fortnight. Heavy-duty woven landscape membrane (the black kind, not the white fleece) costs about £1 per square metre and stops perennial weeds pushing through. Pin it down with U-pegs every metre and overlap joints by 100 mm."
      ),
      createFAQ(
        "What is the cheapest gravel for a driveway?",
        "Plain limestone or quarry-run gravel runs at about £25 to £30 per tonne delivered in bulk. Decorative slate and golden gravel are double or more. For a working driveway where the wow factor matters less than function, plain MOT Type 1 with a thin top layer of pea gravel is the most affordable durable choice."
      ),
    ],
    relatedTools: [
      { slug: "concrete-calculator", label: "Concrete Calculator" },
      { slug: "fence-calculator", label: "Fence Calculator" },
      { slug: "square-footage-calculator", label: "Square Footage Calculator" },
    ],
  },

  "concrete-calculator": {
    sections: [
      createAnswerFirstSection(
        "Volume in Cubic Metres, Then Bags",
        "Concrete works the same way as any other volume calculation: length by width by depth in metres gives cubic metres. A 3 m by 2 m slab at 100 mm deep is 0.6 cubic metres. Where it gets fiddly is the bag arithmetic. A standard 20 kg premix bag yields roughly 0.009 cubic metres of mixed concrete, so that 0.6 cubic metre slab needs 67 bags. At £3.50 a bag in 2026, that is £234 in mix alone, before delivery.",
        "Above about 0.5 cubic metres it is almost always cheaper to buy ready-mix from a local depot. They charge by the cubic metre (typically £100 to £130 in the UK), deliver in a wagon or mini-mix barrow, and the quality is more consistent than mixing 60 bags by hand in a wheelbarrow. The calculator shows both the bag total and the DIY cement-sand-gravel breakdown so you can compare."
      ),
      createAnswerFirstSection(
        "Mix Ratios for Different Jobs",
        "A 1:2:3 mix (one part cement, two sand, three aggregate) is the workhorse for slabs, paths and footings. For post holes, a 1:2:4 mix or even straight Postcrete (a fast-set blend you pour dry, then add water) is fine because the load is compressive. A bag of cement weighs 25 kg in the UK and yields roughly 0.025 cubic metres at standard ratios, so the cement count is the volume divided by 0.025 then rounded up.",
        "Always order an extra 5 to 10% on top of the calculated volume. Concrete is unforgiving: if you run short halfway through a pour you cannot really pause and order more, because the original mix sets and the new pour will not bond cleanly. For the aggregate side, [Gravel Calculator](/gravel-calculator) handles the volume to tonnes conversion."
      ),
    ],
    faqs: [
      createFAQ(
        "How many 20 kg bags of concrete do I need for 1 cubic metre?",
        "Roughly 110 bags. Each 20 kg bag yields about 0.009 cubic metres of mixed concrete. At £3.50 a bag, that is £385 in mix alone. For anything over 0.5 cubic metres, ready-mix delivery from a local depot is cheaper and more consistent."
      ),
      createFAQ(
        "What mix ratio should I use for a garden slab?",
        "1:2:3 (cement:sand:aggregate) by volume is the standard for general garden slabs. For driveways or anything taking heavier load, step up to 1:1.5:3. For post holes and fence posts, 1:2:4 or Postcrete works fine because the load is purely compressive."
      ),
      createFAQ(
        "How thick should a concrete slab be?",
        "75 mm for a garden shed base, 100 mm for a patio, 150 mm for a driveway carrying a car. Anything carrying a vehicle needs reinforcement (steel mesh or rebar) bedded mid-depth. A 100 mm slab without mesh will crack within a few seasons under repeated frost cycles."
      ),
      createFAQ(
        "How long before I can walk on concrete?",
        "Light foot traffic after 24 to 48 hours. Full cure (when concrete reaches design strength) takes 28 days, though it is usable for vehicles after 7. Cover the slab with hessian or polythene for the first few days to slow evaporation and prevent surface cracking."
      ),
    ],
    relatedTools: [
      { slug: "gravel-calculator", label: "Gravel Calculator" },
      { slug: "fence-calculator", label: "Fence Calculator" },
      { slug: "square-footage-calculator", label: "Square Footage Calculator" },
    ],
  },

  "energy-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Wattage, Hours and the Real Cost of Running an Appliance",
        "Every plug-in appliance has a wattage on the label. Divide by 1,000 to get kilowatts, multiply by hours of use, and you have the kWh consumed. Multiply by your unit rate (around 28p/kWh in the UK in 2026 for most domestic standard tariffs) and you get the running cost. A 3,000 W kettle on for 15 minutes a day uses 0.75 kWh, which is roughly 21p; over a year that adds up to £77 in tea alone.",
        "The calculator runs this maths for a list of appliances at once. The defaults (kettle, TV, washing machine) are starting points; tap an appliance from the common list to add it, or type your own with custom wattage. Typical hidden costs include the tumble dryer (3,000 W for an hour is 84p per cycle) and the electric shower (8,000 W for ten minutes is over a pound a wash for one person)."
      ),
      createAnswerFirstSection(
        "Where the Real Savings Hide",
        "Most households focus on the kettle and the lights, but the biggest savings are in heating, hot water and the appliances that run continuously. A fridge-freezer at 150 W running 24/7 is 1,314 kWh a year and roughly £370 at 28p/kWh; a 10-year-old model can run 50 percent more than a modern A-rated one. An old halogen oven or plug-in heater used for an hour a day in winter often outweighs every other plug appliance in the house combined.",
        "Standby loss adds up too. Phantom loads from set-top boxes, smart speakers and games consoles can eat £50 to £80 a year. The calculator helps you spot the worst offenders. For the whole-house breakdown rather than appliance by appliance, [Home Energy Cost Calculator](/home-energy-cost-calculator) takes a longer list of weekly hours and totals the bill."
      ),
    ],
    faqs: [
      createFAQ(
        "How much electricity does a UK home use?",
        "Ofgem's typical domestic consumption value (TDCV) sits at around 2,700 kWh per year for a low-use household, 3,800 kWh for medium and 5,500 kWh for high. At 28p/kWh that is £756, £1,064 and £1,540 respectively. A heat pump or electric heating roughly doubles those figures."
      ),
      createFAQ(
        "What appliances cost the most to run?",
        "Tumble dryers, electric showers, electric heaters and immersion heaters top the per-hour cost list. Always-on appliances (fridges, freezers, routers) top the per-year list because of sheer hours. Combined, white goods and heating typically account for 60 to 70 percent of a UK electricity bill."
      ),
      createFAQ(
        "Is it cheaper to use the oven or the air fryer?",
        "Air fryers usually win for small portions: 1,500 W for 20 minutes is 0.5 kWh, roughly 14p. A 2,000 W oven needs 10 minutes to preheat plus 30 minutes to cook, so 1.3 kWh and 36p. For a full Sunday roast feeding four, the oven is more efficient per portion. For one person reheating a piece of chicken, the air fryer is half the cost."
      ),
      createFAQ(
        "How accurate are these running cost estimates?",
        "Within about 10 percent for plug-in appliances with steady draw. Less accurate for appliances that cycle (fridges, freezers, electric heaters with thermostats), where actual consumption is roughly half the rated wattage averaged over a day. For the most precise reading, plug an energy monitor (a £15 device like a Belkin Conserve) between the appliance and the socket."
      ),
    ],
    relatedTools: [
      { slug: "home-energy-cost-calculator", label: "Home Energy Cost Calculator" },
      { slug: "electricity-cost-calculator", label: "Electricity Cost Calculator" },
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
    ],
  },

  "moving-house-checklist": {
    sections: [
      createAnswerFirstSection(
        "Eight Weeks Out, Two Weeks Out, Moving Day",
        "A move done well starts eight weeks before completion. That is when you give notice to a landlord, ring the council, contact utilities and book a removal company before the diary fills up. The checklist sequences 25 tasks across four categories - notifications, utilities, post and packing - timed in days back from your moving date. Enter the date and the dated countdown does the rest.",
        "Most stress on moving day comes from tasks left to the final week. Royal Mail redirection takes up to 10 working days to start, banks need a written notice or app update, and the council needs new-address details for council tax. The free version downloads as a watermarked JPG; the premium PDF is the one that actually goes on the fridge with magnets, with tick boxes printed large enough to fill in standing up. For the cleaning of the old place once the van leaves, [Cleaning Schedule Generator](/cleaning-schedule-generator) builds a final-walkthrough rota."
      ),
      createAnswerFirstSection(
        "The Tasks People Always Forget",
        "Three things bite people every move. First, transferring the broadband: most ISPs need 14 days notice and the new property may need a fresh installation visit, so book early. Second, updating the address on a driving licence (free at the DVLA, but the V5C log book also needs updating separately for any vehicle). Third, telling pet microchip databases (£8 fee, totally forgettable, illegal not to). The checklist flags all three.",
        "Removal companies charge by the van size and the number of movers. A typical UK three-bed move costs £600 to £1,200 within 30 miles, more if you need packing services or a long carry from the front door to the truck. Get three quotes, ideally with a home survey rather than a phone estimate; quotes via photos miss the wardrobe that does not come apart."
      ),
    ],
    faqs: [
      createFAQ(
        "When should I start packing for a house move?",
        "Eight weeks out, start sorting through belongings and decluttering. Two weeks before completion, pack non-essential items (books, art, out-of-season clothes). The final week, pack room by room except for an essentials box (kettle, mugs, phone chargers, basic tools, toilet roll) that stays out until the last morning."
      ),
      createFAQ(
        "Who do I need to inform when moving house?",
        "Council (council tax), HMRC, employer, GP and dentist, banks and credit cards, insurance providers (home, car, life), utility companies (electricity, gas, water), broadband and TV provider, DVLA (driving licence and V5C), pet microchip database, electoral roll, and any subscription services. Royal Mail redirection covers anyone you forget for £33.99 for 12 months."
      ),
      createFAQ(
        "How much does it cost to move house in the UK?",
        "The move itself (removal van) is £600 to £1,200 for a three-bed within 30 miles. On top of that, conveyancing and surveys for a purchase add £1,500 to £3,000, stamp duty depends on the price, and small extras (Royal Mail redirection, address updates, potential overlap rent) add another £200 to £500."
      ),
      createFAQ(
        "Can I save the checklist and come back to it?",
        "Yes. Tick boxes save automatically in your browser, so closing the tab and returning later resumes your progress. The premium PDF download captures the checklist with tick boxes for printed use, and is timestamped with your moving date."
      ),
    ],
    relatedTools: [
      { slug: "cleaning-schedule-generator", label: "Cleaning Schedule Generator" },
      { slug: "home-inventory-tracker", label: "Home Inventory Tracker" },
      { slug: "back-to-school-checklist", label: "Back to School Checklist" },
    ],
  },

  "cleaning-schedule-generator": {
    sections: [
      createAnswerFirstSection(
        "A Rota That Actually Splits the Work",
        "Set the number of rooms (up to 6), the people in the household, and how often you want to clean. The generator builds a rota assigning specific tasks to specific people on specific days. Two adults sharing a four-room flat with weekly cleaning gets a 14-task week, with each task tagged to a person and a day so nobody is doing the bins twice while the other one watches television.",
        "The default frequency is weekly, which works for most households who do a 30-to-45-minute blitz on Saturday mornings. Daily mode spreads 7 tasks per day for households with kids or pets where the bathroom needs daily attention. Fortnightly mode batches more tasks into longer sessions for working couples who would rather give up two Saturdays a month than every one."
      ),
      createAnswerFirstSection(
        "What Gets Cleaned, How Often",
        "The schedule pulls from a library of 40+ standard tasks split by room: kitchen (counters, hob, sink, floor, bins), bathroom (toilet, sink, mirrors, shower, tiles), bedroom (bed, vacuum, dust, mirrors), living room (sofas, surfaces, electronics), hallway and general. The randomisation means the same job rarely lands on the same person two weeks running, which kills resentment over who always gets the toilet.",
        "The free version is the on-screen schedule. The premium PDF is the printable rota - one page per week, large enough to magnet to the fridge, with tick boxes per task. Households that already track other repeating jobs sometimes pair this with [Habit Tracker](/habit-tracker) to keep daily kitchen wipe-downs visible alongside personal habits."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should a weekly clean take?",
        "For a typical 3-bed UK home, plan 60 to 90 minutes for a full weekly clean if two people split the work. Solo, allow 90 to 120 minutes. A daily 10-minute tidy plus a weekly 60-minute deep clean is more sustainable than a single Saturday morning blitz."
      ),
      createFAQ(
        "What is the best cleaning order in a room?",
        "Top to bottom, dry to wet, back to front. Dust shelves before vacuuming the floor (so dust falls onto the floor, gets vacuumed up). Wipe surfaces before mopping. Start at the back of the room and work towards the door so you do not walk back over wet floor."
      ),
      createFAQ(
        "How do I split chores fairly in a houseshare?",
        "Either split by room (one person does the kitchen all week, another does the bathroom) or by task category (one does floors and surfaces, another does bins and laundry). The generator uses a rotation, which works well when no one task is much worse than the others."
      ),
      createFAQ(
        "Can I print the schedule?",
        "Yes. The premium PDF download is a one-page-per-week printable with tick boxes, designed to fit on a fridge or notice board. Tick boxes are large enough to fill in with a pen while standing."
      ),
    ],
    relatedTools: [
      { slug: "habit-tracker", label: "Habit Tracker" },
      { slug: "moving-house-checklist", label: "Moving House Checklist" },
      { slug: "chore-chart-generator", label: "Chore Chart Generator" },
    ],
  },

  "tv-size-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Far You Sit Decides the Size",
        "There is a sweet spot for TV size based on viewing distance. For a typical living room, the recommended diagonal is roughly the viewing distance divided by 1.5 to 2.5. Sitting 2 m back in a living room (the default here) puts the recommendation at 39 to 65 inches, with the closest standard size being 55 inches. Too small and the TV looks lost in the room; too large and the eyes strain trying to track action across the screen.",
        "The optimal range varies by room type. A bedroom, where viewing is more casual and often from bed, uses a tighter ratio (1.2 to 1.5x distance) which means smaller screens. A dedicated cinema room, where the goal is full immersion, uses 2.5 to 3x distance and rewards the biggest screen the room can take. The calculator switches the ratio when you change the room type, so a cinema setup at 2 m gets a recommendation closer to 75 inches."
      ),
      createAnswerFirstSection(
        "4K Changes the Old Rules",
        "The old 'three times screen height' viewing rule was written for 1080p, where pixels become visible if you sit too close. With 4K, you can sit much closer without seeing individual pixels, which means a bigger screen at the same distance is now optimal. For an 8K screen the rule changes again; you would need to sit on the screen to see the difference.",
        "Practical limits matter too. A 75-inch TV needs about 1.7 m of clear wall width and a sturdy mount or stand rated for around 35 kg. Check the stand width if your unit is fixed; a 65-inch TV is usually 1.45 m wide which is near the limit of standard 1.5 m TV units. For internet speed sufficient to stream 4K reliably, [Broadband Speed Converter](/broadband-speed-converter) shows how Mbps translates to download speed for streaming."
      ),
    ],
    faqs: [
      createFAQ(
        "What size TV for a 3 metre viewing distance?",
        "For a 3 m living room viewing distance, the sweet spot is 60 to 90 inches diagonal. The closest standard sizes are 65 or 75 inches. For a bedroom at 3 m, drop to 50 to 65 inches. For a dedicated cinema room at 3 m, push up to 85 to 100 inches."
      ),
      createFAQ(
        "Is bigger always better with 4K?",
        "Within reason, yes. With 4K resolution, you can comfortably go bigger than the old 1080p guidelines allowed because pixel structure is invisible at normal viewing distance. The limit is more about the room and the wall: a 75-inch TV is huge in a 3 m by 3 m living room and dominates everything else."
      ),
      createFAQ(
        "How high should I mount my TV?",
        "Centre the screen at eye level when seated. For a typical sofa where eyes are 1.05 m off the floor, the centre of a 55-inch TV (which is about 0.7 m tall) should be at 1.05 m, putting the bottom at 0.7 m off the floor. Mounting too high causes neck strain after long viewing."
      ),
      createFAQ(
        "What is the difference between screen size and aspect ratio?",
        "Screen size is the diagonal measurement in inches, corner to corner. Aspect ratio is the width-to-height proportion (16:9 is standard widescreen, 21:9 is ultra-wide cinema). Two TVs with the same diagonal can have very different physical widths if they have different aspect ratios."
      ),
    ],
    relatedTools: [
      { slug: "broadband-speed-converter", label: "Broadband Speed Converter" },
      { slug: "screen-size-calculator", label: "Screen Size Calculator" },
      { slug: "electricity-bill-estimator", label: "Electricity Bill Estimator" },
    ],
  },

  "habit-tracker": {
    sections: [
      createAnswerFirstSection(
        "A Visual Grid That Survives Past Day Three",
        "Most habits fail not because the habit is hard but because there is no visible reminder of progress. A monthly habit tracker grid solves this with the simplest possible mechanism: each habit on a row, each day on a column, fill in the box when you do the thing. Add up to 10 habits, pick a month, and the tracker shows a daily grid with completion percentages calculated for each habit at the end.",
        "The defaults (morning exercise, read 30 minutes, meditate) are a starting point. Most people get the best traction from 3 to 5 habits at once; tracking 10 simultaneously usually means abandoning seven of them by week two. Start with the smallest version of the habit (two minutes of meditation, not twenty) and add intensity once the streak is 14 days long."
      ),
      createAnswerFirstSection(
        "Print It, Stick It Somewhere Visible",
        "Digital habit trackers (apps with notifications) work for some people, but a printed grid stuck on the fridge or beside the kettle has a visible weight that a phone app doesn't. The premium PDF is exactly this: a one-page printable for the chosen month, with rows for each habit and a clean grid for the days. The minimal theme prints well in black and white; the colourful theme uses pastel row colours for visual variety.",
        "Visible progress is the secret. A grid that is 80 percent ticked makes you reluctant to break the streak on day 25 in a way that a phone notification never will. For broader household routines that go alongside personal habits, [Cleaning Schedule Generator](/cleaning-schedule-generator) builds the rota for shared chores."
      ),
    ],
    faqs: [
      createFAQ(
        "How many habits should I track at once?",
        "3 to 5 is the sweet spot. Tracking more dilutes attention and increases the chance you abandon several mid-month. Once a habit is fully embedded (60 days of consistent completion), it can drop off the tracker and be replaced by a new one."
      ),
      createFAQ(
        "How long does it take to form a habit?",
        "The popular '21 days' figure is a myth from a 1960s book. Research from University College London found that simple habits average 66 days to become automatic, with a range from 18 to over 250 days depending on the habit and the person. Drinking water after waking forms faster than running every morning."
      ),
      createFAQ(
        "What should I do if I miss a day?",
        "One missed day rarely breaks a habit; missing two in a row is when the streak risk becomes real. The 'never miss twice' rule is the most useful single piece of habit advice. If yesterday was missed, do something today, even a tiny version of the habit, just to keep the chain moving."
      ),
      createFAQ(
        "Can I print the tracker?",
        "Yes. The premium PDF download is a one-page printable for your chosen month, with the grid sized for A4 paper. The minimal theme prints well in black and white if you do not want to use coloured ink."
      ),
    ],
    relatedTools: [
      { slug: "cleaning-schedule-generator", label: "Cleaning Schedule Generator" },
      { slug: "moving-house-checklist", label: "Moving House Checklist" },
      { slug: "chore-chart-generator", label: "Chore Chart Generator" },
    ],
  },

  "solar-panel-savings-calculator": {
    sections: [
      createAnswerFirstSection(
        "What a 5 kW System Actually Saves",
        "A 5 kW solar system on a south-facing 30-degree roof in the UK generates roughly 5,500 kWh a year, the calculator's default. At an electricity price of 28p/kWh and an export tariff of 15p, with around 45 percent self-consumption, that is about £1,065 of annual benefit (£693 in bill savings plus £372 in export income). The system itself runs around £10,000 installed in 2026, and there is no specific UK grant for solar in 2026, though a £5,000 placeholder is included for any local council schemes that may apply.",
        "The numbers swing significantly with orientation and angle. A north-facing roof loses about 30 to 40 percent of its potential output. A south-east or south-west facing roof at 30 degrees sits within 3 percent of optimal. East and west alone (without south) lose around 10 percent. The calculator applies the right performance factor automatically when you change the inputs."
      ),
      createAnswerFirstSection(
        "Self-Consumption Is the Variable That Pays Back Fastest",
        "The real economics of solar live in the self-consumption rate. Power used in your house is worth 28p/kWh (your bill rate); power exported to the grid is worth 15p (the Smart Export Guarantee rate from most suppliers). So a household that runs the dishwasher, washing machine and EV charger during the day captures roughly twice as much value per kWh generated as one that uses electricity mainly in the evening.",
        "A battery raises self-consumption from around 45 percent to 70 or 80 percent, but adds £4,000 to £6,000 to the install. The payback maths gets tighter as battery prices fall, and there are useful hybrid inverter options if you might add a battery later. For the battery side specifically, [Solar Battery Payback Calculator](/solar-battery-payback-calculator) walks through the storage economics in detail."
      ),
    ],
    faqs: [
      createFAQ(
        "How much does a 5 kW solar system cost in the UK?",
        "Around £8,500 to £11,000 fully installed in 2026, including panels, inverter, scaffolding, certification and labour. The default in this calculator is £10,000 (£2,000 per kW). Prices have fallen significantly since 2010 but installation labour is the slowest-falling component."
      ),
      createFAQ(
        "What is the payback period for solar in the UK?",
        "Typically 9 to 13 years on a south-facing roof in southern England, longer in Scotland or on a north-facing roof. Households that use a lot of daytime electricity (work-from-home, EV charging, daytime appliance use) hit closer to 9 years; evening-only users land nearer 13."
      ),
      createFAQ(
        "Are there any UK government grants for solar?",
        "There is no specific solar panels grant in 2026. The Boiler Upgrade Scheme (BUS) only covers heat pumps. ECO4 funding is available for low-income households for various energy measures including solar. Local councils sometimes run schemes; the £5,000 placeholder in this calculator is for those edge cases."
      ),
      createFAQ(
        "Do solar panels work on a north-facing roof?",
        "Yes, but with around 30 to 40 percent less output than south-facing. East-west splits (panels on both sides of the roof) often work better than committing everything to the worse facing direction, because production spreads across the day rather than peaking at noon when nobody is home."
      ),
    ],
    relatedTools: [
      { slug: "solar-battery-payback-calculator", label: "Solar Battery Payback Calculator" },
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
      { slug: "boiler-vs-heat-pump-calculator", label: "Boiler vs Heat Pump Calculator" },
    ],
  },

  "epc-improvement-checker": {
    sections: [
      createAnswerFirstSection(
        "What Lifts Your EPC Rating Fastest",
        "EPCs in England and Wales score from A (92+) to G (1-20), with most existing UK homes sitting at D or E. The cheapest, fastest gains come from the basic envelope: loft insulation to 270 mm depth, cavity wall insulation if uninsulated, and modern double glazing. Loft insulation alone takes a typical D-rated house up by 10 to 15 EPC points and costs around £500. Cavity walls add another 10 to 15 points for £400 to £700.",
        "The big-ticket items (heat pumps, solar, full external wall insulation) move ratings further but at much higher cost. The checker ranks improvements by cost-effectiveness, not just by absolute EPC gain, so you see what the next cheapest move is rather than the most dramatic. For most semi-detached homes built between 1975 and 1995 (the defaults here), four or five basic measures lift a low D into a high C, which is the threshold many landlord regulations target."
      ),
      createAnswerFirstSection(
        "Why C Matters for Landlords",
        "Properties rented in England and Wales must have an EPC of E or higher under MEES (Minimum Energy Efficiency Standards). Government proposals have repeatedly floated raising the bar to C for new tenancies, and although the timeline keeps slipping, the direction is clear. Landlords who plan to keep a portfolio for 5+ years are wise to lift each property to C now rather than scrambling later when installer demand spikes prices.",
        "Owner-occupiers face fewer hard rules but still benefit. Mortgage lenders increasingly offer green mortgages with discounted rates for higher-rated properties. Buyers also notice; surveys show that EPC-A and B properties sell for 2 to 5 percent more than equivalent D or E homes. For the running cost side once improvements are in, [Home Energy Cost Calculator](/home-energy-cost-calculator) shows the new monthly bill."
      ),
    ],
    faqs: [
      createFAQ(
        "How can I improve my EPC rating?",
        "In rough order of cost-effectiveness: loft insulation to 270 mm, cavity wall insulation, low-energy lighting throughout, modern thermostat or smart heating controls, double or triple glazing, modern condensing boiler or heat pump, then solar panels. The first four often cost less than £2,000 combined and lift a typical D-rated house by 15 to 25 EPC points."
      ),
      createFAQ(
        "How much does it cost to go from D to C?",
        "Typically £1,500 to £4,000 in measures, depending on the property's starting point. A pre-1975 cavity wall house with no insulation can hit C for under £1,500 with loft and cavity wall work. A 1930s solid-wall semi with single glazing might need £8,000 to £15,000 in fabric upgrades to clear C."
      ),
      createFAQ(
        "Do I need to upgrade my EPC if I am a landlord?",
        "Yes for England and Wales. The current minimum for both new and renewing tenancies is E. The Government has proposed raising this to C for new tenancies (potentially 2028 onwards) and for all tenancies later. Properties below the minimum can be let only with a registered exemption."
      ),
      createFAQ(
        "How long does a new EPC take to organise?",
        "About 2 to 5 working days from booking. The assessor visits for around 30 to 60 minutes, takes measurements and photos, then files the report on the central register within 28 days. Cost in 2026 is typically £60 to £120 plus VAT."
      ),
    ],
    relatedTools: [
      { slug: "insulation-savings-calculator", label: "Insulation Savings Calculator" },
      { slug: "home-energy-cost-calculator", label: "Home Energy Cost Calculator" },
      { slug: "double-glazing-payback-calculator", label: "Double Glazing Payback Calculator" },
    ],
  },

  "insulation-savings-calculator": {
    sections: [
      createAnswerFirstSection(
        "Where the Heat Actually Escapes",
        "In an uninsulated UK home, roughly 25 percent of heat loss is through the roof, 35 percent through the walls, 15 percent through the floor and 25 percent through draughts and windows. That order matters because it tells you what to insulate first. Loft insulation is the cheapest fix (around £5 per square metre installed) and addresses the biggest single loss path other than walls. The calculator estimates roof area at 60 percent of internal floor area, which is roughly accurate for most semis.",
        "A typical 3-bed semi (160 sq m floor area, 96 sq m roof area in the calculator) with no loft insulation saves around £240 a year by going to 270 mm. That is a payback of about 2 years on the £480 install cost. Going from 100 mm to 270 mm only saves around £100 a year, with a 6-year payback - still worthwhile, but less dramatic. The diminishing returns above 270 mm are why building regulations stop there."
      ),
      createAnswerFirstSection(
        "Walls Are the Bigger Prize and the Bigger Cost",
        "Cavity wall insulation (for houses built between 1920 and 1990 with cavity construction) costs about £400 to £700 installed and saves £200 to £350 a year. Payback is around 2 to 3 years and the rating gain is often equal to loft insulation. Solid wall insulation, for older houses, is far more expensive: external wall insulation is £8,000 to £15,000 for a semi, internal is £5,000 to £8,000, but saves £400 to £600 a year and transforms thermal comfort.",
        "The calculator ranks measures by payback so the obvious wins surface first. Insulation matters more than heat-pump efficiency in older homes; spending £8,000 on a heat pump in a draughty 1930s semi often saves less than spending £4,000 on the fabric first. For the heating system side, [Boiler vs Heat Pump Calculator](/boiler-vs-heat-pump-calculator) compares running costs once the envelope is sorted."
      ),
    ],
    faqs: [
      createFAQ(
        "How much can I save with loft insulation?",
        "A typical UK semi with no existing loft insulation saves around £250 a year by upgrading to 270 mm. The work costs about £500 and pays back in 2 years. Going from 100 mm to 270 mm saves around £100 a year for a £300 cost (3-year payback)."
      ),
      createFAQ(
        "Is cavity wall insulation worth it?",
        "Almost always. Cavity wall insulation typically costs £400 to £700 for a semi-detached house and saves £200 to £350 per year, paying back in 2 to 3 years. The exception is cavity walls already filled (check by drilling a small inspection hole) or homes in very exposed coastal locations where damp risk is higher."
      ),
      createFAQ(
        "What is the difference between internal and external solid wall insulation?",
        "Internal goes inside, reducing room size by 50 to 100 mm per wall and disrupting living for weeks. External goes outside, keeps room size, doesn't disrupt living, but requires planning permission in some areas and changes the look of the property. External costs roughly double the internal price."
      ),
      createFAQ(
        "Can I get a grant for insulation?",
        "ECO4 grants (formerly ECO Help to Heat) cover insulation for low-income households or those on certain benefits. The Great British Insulation Scheme (GBIS) covers homes in EPC bands D-G in council tax bands A-D in England and A-E in Scotland and Wales. Both are administered through energy suppliers."
      ),
    ],
    relatedTools: [
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
      { slug: "boiler-vs-heat-pump-calculator", label: "Boiler vs Heat Pump Calculator" },
      { slug: "double-glazing-payback-calculator", label: "Double Glazing Payback Calculator" },
    ],
  },

  "home-energy-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Whole-House Energy in One List",
        "This calculator runs a long appliance list at once: heating, hot water, oven, hob, white goods, electronics, lighting and EV charger. The defaults model a typical family home and produce an annual electricity figure of around £2,000 to £3,500 at 28p/kWh, depending on heating type. Each appliance has wattage and weekly hours; the maths is wattage divided by 1,000, multiplied by hours, multiplied by the unit rate.",
        "The big drivers are heating (often 30 to 50 percent of the total in homes with electric heating), hot water (10 to 20 percent), white goods that run continuously (fridge and freezer combined, around 8 percent) and the EV charger if you have one (15 to 30 percent for a typical 8,000 km/year EV). Knock the heating hours back and the total drops fast; cycle the EV charger to off-peak overnight rates and the per-kWh cost halves."
      ),
      createAnswerFirstSection(
        "Standing Charges and Tariff Caps Are Separate",
        "The calculator shows usage cost only. On top of that, every UK property pays a standing charge of around 60p per day for electricity (£220 a year) regardless of usage. So a household using 4,000 kWh of electricity at 28p (£1,120) pays £1,340 in total once the standing charge is added. The Ofgem price cap moves quarterly and varies slightly by region.",
        "Time-of-use tariffs (Octopus Agile, Economy 7) shift the maths if you can move heavy loads to off-peak. Charging an EV on Economy 7 night rate (around 10p/kWh) instead of standard (28p) saves around £400 a year on a 4,000 kWh annual EV draw. For appliance-by-appliance breakdowns rather than the whole-house view, [Energy Cost Calculator](/energy-cost-calculator) handles individual appliance running costs."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the average UK household energy bill in 2026?",
        "Around £1,800 to £2,400 a year combined gas and electricity for a typical 3-bed semi, depending on insulation, heating habits and which Ofgem cap period you are in. Electric-heated homes run higher (£2,500 to £4,000). All-gas heated homes with modern condensing boilers often come in below £1,800."
      ),
      createFAQ(
        "How can I cut my energy bill?",
        "In rough order of impact: turn the thermostat down by 1 degree (saves around 10 percent of heating cost), shorter showers (especially with electric showers), full loads in dishwasher and washing machine, unplug standby appliances, switch lights to LED if not already, and use the air fryer for small portions instead of the oven."
      ),
      createFAQ(
        "Is gas or electricity cheaper in the UK?",
        "Per kWh, gas is much cheaper (around 6p/kWh) than electricity (around 28p/kWh) in 2026. But gas boilers are around 90 percent efficient, while electric heat pumps are 280 to 400 percent efficient (each kWh of electricity moves 2.8 to 4 kWh of heat). On running cost a heat pump in a well-insulated home is competitive with gas, while resistance electric heating is roughly four times the cost of gas."
      ),
      createFAQ(
        "How accurate is this energy cost estimate?",
        "Within about 15 percent for plug-in appliances and lighting. Less accurate for thermostat-controlled heating where actual run hours depend on weather and insulation. For the most accurate read, take a baseline meter reading, run the house for a month, take a second reading, and compare with the calculator's predicted total."
      ),
    ],
    relatedTools: [
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "boiler-vs-heat-pump-calculator", label: "Boiler vs Heat Pump Calculator" },
      { slug: "insulation-savings-calculator", label: "Insulation Savings Calculator" },
    ],
  },

  "boiler-vs-heat-pump-calculator": {
    sections: [
      createAnswerFirstSection(
        "Upfront Cost vs Running Cost",
        "A new gas boiler costs around £2,500 installed, runs at roughly 90 percent efficiency, and costs the typical UK household £1,500 a year to heat a 3-bed semi (the calculator's default annual heating cost). A heat pump costs £10,000 to install plus £3,000 in extras (cylinder, radiators, pipework upgrade), so £13,000 total, less the £7,500 BUS heat-pump grant - net £5,500.",
        "Running costs flip in the opposite direction. A heat pump with a coefficient of performance (COP) of 3.2, on an electricity price of 28p/kWh, runs at roughly £1,055 a year for the same heat output (£1,500 x 0.9 / 3.2 = £422 of energy at gas-equivalent terms, scaled by the electricity-to-gas price ratio). The 10-year cost gap shrinks fast: £4,000 in extra capital up front, around £450 a year saved in running, payback in roughly 9 years on average insulation."
      ),
      createAnswerFirstSection(
        "Insulation Matters More Than COP",
        "A heat pump in a draughty 1930s semi with single glazing performs poorly because it has to work harder to maintain the flow temperature, and the COP drops. The same heat pump in a well-insulated 2010s home delivers a real-world COP of 3.5 to 4 and runs cheaper than a gas boiler. The calculator adjusts the COP based on insulation level (poor: 2.8, average: 3.2, good: 3.5).",
        "If you are within 2 to 3 years of a planned move, the maths usually points to a new boiler. If you are staying 7+ years and the home is reasonably insulated, a heat pump pays back. If insulation is poor, fix that first - spending £4,000 on the fabric usually saves more than spending £8,000 on the heat source. For the insulation prioritisation step, [Insulation Savings Calculator](/insulation-savings-calculator) ranks measures by payback."
      ),
    ],
    faqs: [
      createFAQ(
        "How much is the heat pump grant in 2026?",
        "The Boiler Upgrade Scheme (BUS) pays £7,500 for an air source heat pump and £7,500 for ground source heat pump in England and Wales. The grant is paid to the installer who reduces the customer's bill. Scotland's equivalent is the Home Energy Scotland grant and loan, which can be more generous."
      ),
      createFAQ(
        "Are heat pumps cheaper to run than gas?",
        "It depends on your tariff and your home. With a COP of 3.2 and current 2026 prices (gas 6p, electricity 28p), a heat pump runs roughly the same cost as a gas boiler. With a heat pump tariff (special heat pump electricity rates around 18p/kWh) the heat pump is 30 to 40 percent cheaper. In a poorly insulated home, a heat pump is more expensive than gas to run."
      ),
      createFAQ(
        "Will a heat pump work in my old house?",
        "Yes, but it will work better with insulation upgrades first. Older houses often need bigger radiators (or underfloor heating) to deliver the same heat output at the lower flow temperatures heat pumps prefer (45 degrees C versus 70 degrees C for boilers). Budget £500 to £2,000 for radiator upgrades on top of the heat pump install."
      ),
      createFAQ(
        "How long do heat pumps last?",
        "Air source heat pumps typically last 20 to 25 years, double the lifespan of a gas boiler (10 to 15 years). Ground source heat pumps last even longer (25 to 30 years for the heat pump unit, 50+ years for the ground loop). Lifecycle cost comparisons over 25 years usually favour the heat pump even before grants."
      ),
    ],
    relatedTools: [
      { slug: "insulation-savings-calculator", label: "Insulation Savings Calculator" },
      { slug: "epc-improvement-checker", label: "EPC Improvement Checker" },
      { slug: "home-energy-cost-calculator", label: "Home Energy Cost Calculator" },
    ],
  },

  "underfloor-heating-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Electric or Wet, and What That Means for Cost",
        "Electric underfloor heating (mat or cable) is cheaper to install (£40 to £50 per square metre) but more expensive to run. A 20 sq m kitchen with electric mat at 150 W per square metre, on for 8 hours a day at 28p/kWh, costs around £6.70 a day in winter and roughly £450 over a heating season. Wet systems with a boiler cost £80 per square metre installed plus the boiler itself, but run at roughly half the cost of electric because gas is around a quarter of the per-kWh price.",
        "The fastest payback equation favours wet systems for whole-house installs and electric for single-room retrofits like a bathroom or kitchen extension. A 6 sq m en-suite at electric mat costs around £300 to install and £80 a year to run; replacing a radiator there is overkill. A whole ground floor at 50 sq m running 8 hours a day on electric would cost £1,500 a year - territory where wet systems win clearly."
      ),
      createAnswerFirstSection(
        "Heat Pump Underfloor Is the Cheapest to Run",
        "Wet underfloor heating paired with a heat pump (COP 3.2) runs at roughly a third of the cost of electric underfloor in the same room, because each kWh of electricity moves 3.2 kWh of heat. Install cost is highest (£100 per square metre for the floor plus £8,000 for the heat pump) but running cost is the lowest of any underfloor option. Over a 25-year system life, heat pump underfloor often beats every alternative on total cost.",
        "Insulation under the screed is non-negotiable. A typical UFH install loses 30 to 40 percent of heat downwards into the floor structure if there is no insulation board (50 to 100 mm of PIR rigid foam) underneath. The £5 to £10 per square metre that adds is the single best efficiency upgrade you can specify. For the wider heat-source comparison, [Boiler vs Heat Pump Calculator](/boiler-vs-heat-pump-calculator) covers the system choice in more depth."
      ),
    ],
    faqs: [
      createFAQ(
        "How much does underfloor heating cost to install in the UK?",
        "Electric mat: £40 to £60 per square metre supply only, £80 to £120 installed. Wet system: £80 to £120 per square metre installed including manifold, plus the boiler or heat pump. A 20 sq m kitchen typically costs £800 to £1,500 for electric and £2,000 to £3,500 for wet, plus the heat source."
      ),
      createFAQ(
        "Is underfloor heating cheaper to run than radiators?",
        "Wet underfloor on the same heat source is roughly equal cost or slightly cheaper, because UFH runs at lower flow temperatures (35 to 45 degrees C versus 70 degrees for radiators) which is more efficient. Electric underfloor is significantly more expensive to run than gas radiators for the same heat output."
      ),
      createFAQ(
        "Can I retrofit underfloor heating?",
        "Yes, but it depends on floor build-up. Low-profile retrofit systems (15 to 20 mm thick) work over existing concrete or timber floors. Full screed systems (50 mm plus) require taking up the existing floor and lowering the level, or accepting a 50 mm rise that needs door modifications. Electric mats can go straight under tile, ideal for bathroom retrofits."
      ),
      createFAQ(
        "How long does underfloor heating last?",
        "Wet pipework laid in screed typically lasts 50+ years; manifolds and pumps 15 to 20 years. Electric mats and cables last 25 to 30 years. The weak link in wet systems is usually the pump or actuator, both replaceable without disturbing the floor."
      ),
    ],
    relatedTools: [
      { slug: "boiler-vs-heat-pump-calculator", label: "Boiler vs Heat Pump Calculator" },
      { slug: "insulation-savings-calculator", label: "Insulation Savings Calculator" },
      { slug: "tile-calculator", label: "Tile Calculator" },
    ],
  },

  "pet-food-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "What a Dog or Cat Actually Costs to Feed",
        "Daily food intake for a dog scales with weight: under 10 kg needs about 150 g a day, 10 to 25 kg needs 250 g, 25 to 50 kg needs 400 g, over 50 kg needs 500 g. The default here is a 20 kg medium dog on mid-range mixed feeding, costing around £3.75 a day, £26 a week, £113 a month, £1,370 a year, and roughly £16,400 over a 12-year lifespan. Cats are simpler: about 225 g a day regardless of breed, costing roughly £3.40 a day for mid-range food.",
        "The biggest swing is the quality tier. Budget kibble at £6 per kg versus premium raw at £30 per kg is a fivefold difference; that 20 kg dog on premium raw costs £6,200 a year, four and a half times the mid-range mixed bill. Few dogs need premium raw to thrive, but many do better on mid-range than budget; the cheapest kibbles often pad with grain fillers that stress digestion."
      ),
      createAnswerFirstSection(
        "Hidden Costs Around the Food Bill",
        "Food is the headline number but not the full pet bill. A typical UK dog also costs £200 to £400 a year in vet visits and vaccinations, £400 to £600 in pet insurance, and £100 to £200 in grooming. Cats are cheaper on insurance (£200 to £350) and skip the grooming bill. Across a 12-year dog life, food is roughly half the total ownership cost; insurance and vet care make up most of the rest.",
        "The lifespan multiplier in the calculator (12 years for dogs, 15 for cats) is the average, but big breeds (Great Danes, Mastiffs) often live closer to 8 to 10 years and small breeds (Chihuahuas, Yorkshire terriers) sometimes pass 16. Adjust mentally if your breed is far from the average. For walking costs which often exceed the food bill in London, [Dog Walking Cost Calculator](/dog-walking-cost-calculator) breaks down the rates."
      ),
    ],
    faqs: [
      createFAQ(
        "How much does it cost to feed a dog in the UK?",
        "On mid-range food, around £25 to £40 a week for a medium dog (10 to 25 kg), £40 to £60 a week for a large dog (over 25 kg). Annual cost is £1,300 to £3,000 depending on size and food tier. Premium raw or fresh-cooked diets push the upper end into £4,000 to £6,000."
      ),
      createFAQ(
        "Is dry food cheaper than wet food?",
        "Yes, dry kibble is typically half the cost of wet food per kg of food, and roughly a third of the cost on a calories-fed basis (because wet food is 75 percent water). A mixed diet of dry plus a topping of wet is often the best value compromise for taste and hydration."
      ),
      createFAQ(
        "Should I switch my pet to premium food?",
        "It depends on the dog. Dogs with allergies, sensitive stomachs or skin issues often improve dramatically on a premium grain-free or single-protein recipe. Healthy dogs on a quality mid-range food usually get no measurable benefit from premium upgrades; the difference is mostly in the marketing budget."
      ),
      createFAQ(
        "How does feeding cost compare to other pet costs?",
        "For a typical UK dog, food is roughly 40 to 50 percent of total annual ownership cost. The rest is vet care and insurance (30 to 40 percent), grooming (5 to 10 percent), training, beds, toys and miscellaneous (10 to 15 percent). For cats, food is a higher share of total cost (50 to 60 percent) because vet bills are typically lower."
      ),
    ],
    relatedTools: [
      { slug: "dog-walking-cost-calculator", label: "Dog Walking Cost Calculator" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "moving-house-checklist", label: "Moving House Checklist" },
    ],
  },

  "wood-joint-calculator": {
    sections: [
      createAnswerFirstSection(
        "Dovetail, Mortise, Box: the Maths Behind Each",
        "Each traditional joint has a proportional rule of thumb. Dovetails use a slope ratio of 1:6 for softwoods and 1:8 for hardwoods, where the steeper ratio resists the higher tear-out tendency of softwood. The default 150 mm board with 1:6 slope gives around 5 tails at roughly 25 mm wide each. Mortise and tenon traditionally uses a tenon thickness of one-third the board thickness; an 18 mm board (the default) gives a 6 mm tenon, with a mortise depth of two-thirds board thickness, so 12 mm.",
        "Box and finger joints are simpler: equal-width fingers across the joint, with finger width usually equal to gap width. The calculator divides the board width by 20 mm to get a rough finger count for a 150 mm board, returning around 8 fingers. Dowel joints use a dowel diameter of half the board thickness with a length of roughly board thickness plus 20 mm to give grip on both sides."
    ),
      createAnswerFirstSection(
        "Why the Numbers Are a Starting Point",
        "These ratios are rules of thumb refined over centuries, not absolute laws. A drawer pull will look better with 6 evenly spaced dovetail tails than with 5 unevenly spaced ones, even if the maths suggests 5. A small jewellery box might use 1:5 dovetails to make the slope visually obvious. The point of the calculator is to give a sensible default that fits the wood type and dimensions, then you adjust for aesthetic preference.",
        "Joint strength depends as much on glue surface area and grain orientation as on proportions. A well-cut mortise and tenon glued with PVA on long-grain to long-grain surfaces is essentially permanent. The same joint cut sloppy, with end-grain trying to take load, fails in months. For the wood pricing and project costing side, [Wood Cost Calculator](/wood-cost-calculator) handles the timber bill of materials."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the strongest wood joint?",
        "Mortise and tenon is the strongest traditional joint for frame work, especially when reinforced with a wedge or pin. Dovetails are strongest for box corners under tension (drawer fronts pulling out). Box joints have the most glue surface area and are often the most practical for cabinet construction with modern adhesives."
      ),
      createFAQ(
        "What slope angle for dovetails?",
        "1:6 for softwoods (pine, fir): around 9.5 degrees from vertical. 1:8 for hardwoods (oak, ash, walnut): around 7.1 degrees. Hardwoods need less slope because the wood resists tear-out better and the steeper slope can leave fragile short-grain at the corners."
      ),
      createFAQ(
        "How thick should a tenon be?",
        "One-third of the board thickness is the traditional rule. An 18 mm board gives a 6 mm tenon. The mortise width should match exactly. Tenon length is typically two-thirds of the joining piece's thickness, so a 6 mm thick tenon goes into a 12 mm deep mortise."
      ),
      createFAQ(
        "Can I cut these joints with hand tools?",
        "Yes. All the joints in the calculator have been cut by hand for centuries. Dovetails by tenon saw and chisel, mortise and tenon by mortise chisel and tenon saw, box joints by saw and chisel or a router with a jig. A bench plane and a sharp paring chisel handle the fitting."
      ),
    ],
    relatedTools: [
      { slug: "wood-cost-calculator", label: "Wood Cost Calculator" },
      { slug: "wood-finishing-calculator", label: "Wood Finishing Calculator" },
      { slug: "sawhorse-angle-calculator", label: "Sawhorse Angle Calculator" },
    ],
  },

  "wood-finishing-calculator": {
    sections: [
      createAnswerFirstSection(
        "Coverage by Finish Type",
        "Different wood finishes cover at very different rates per litre. Varnish covers around 12 sq m per litre per coat, oil 15 sq m, wax 20 sq m, paint 10 sq m, stain 15 sq m, lacquer 12 sq m. The default project here, a 5 sq m surface in varnish at 2 coats, needs 0.83 litres of product across both coats - so a single 1-litre tin handles it with leftover for touch-ups. At £12 per litre that is £12 in materials.",
        "Multiply by the number of coats and divide by the tin size to get the buy quantity. Varnish typically wants 3 coats for full build (the default the calculator suggests for varnish), so the same 5 sq m surface needs 1.25 litres total - still one tin in practice but with very little left. For a 20 sq m floor in varnish at 3 coats, you need 5 litres - a 5-litre tin or a 2-litre plus a 5-litre to allow generous waste."
      ),
      createAnswerFirstSection(
        "Drying Time Adds Real Hours to a Project",
        "Coverage tells you how much to buy; drying time tells you how long the project will take. Lacquer dries in 15 to 30 minutes, so a 3-coat lacquer job can finish in a single day. Varnish wants 4 to 6 hours between coats, so 3 coats spreads over 1 to 2 days. Oil takes 24 hours between coats and 2 to 7 days to fully cure - a real overnight job at minimum. The calculator estimates total project hours so you can plan when to start.",
        "Sanding between coats also adds time. Most varnishes and paints need a light scuff with 240-grit between coats for adhesion; oils and waxes do not. A 5 sq m surface with 3 coats of varnish, with sanding, is roughly 4 to 6 hours of actual hands-on work spread across 2 days. For the joinery work that often comes before finishing, [Wood Joint Calculator](/wood-joint-calculator) handles the joint dimensions."
      ),
    ],
    faqs: [
      createFAQ(
        "How much varnish do I need for a table?",
        "A typical 1.6 m by 0.8 m dining table top is about 1.3 sq m. At varnish coverage of 12 sq m per litre per coat, with 3 coats, you need around 0.32 litres total. A 500 ml tin is the smallest economic buy and leaves plenty for touch-ups."
      ),
      createFAQ(
        "How many coats of varnish do I need?",
        "For a hard-wearing surface (table, floor), 3 coats minimum. For a decorative piece (frame, shelf) 2 coats is usually enough. Each coat builds up the protective film; 3 coats is roughly 25 to 35 microns thick once cured, which resists most household wear."
      ),
      createFAQ(
        "Oil or varnish for an oak table?",
        "Oil enhances the grain and feels natural to touch but offers less spill protection. Varnish protects better but creates a plastic-feeling surface. A common compromise is hard-wax oil (Osmo Polyx is the leading brand) which combines oil's appearance with reasonable spill resistance. Most modern oak table finishes use hard-wax oil."
      ),
      createFAQ(
        "How long should I wait between coats?",
        "Varnish: 4 to 6 hours. Oil: 24 hours minimum. Wax: 1 hour, then buff. Paint: 2 to 4 hours. Stain: 2 to 8 hours depending on whether the next coat is stain (2 hours) or sealer (8 hours). Always sand lightly between coats of varnish or paint with 240-grit; oil and wax need no inter-coat sanding."
      ),
    ],
    relatedTools: [
      { slug: "wood-cost-calculator", label: "Wood Cost Calculator" },
      { slug: "wood-joint-calculator", label: "Wood Joint Calculator" },
      { slug: "paint-calculator", label: "Paint Calculator" },
    ],
  },

  "watering-calculator": {
    sections: [
      createAnswerFirstSection(
        "Plant, Season and Pot Size All Change the Answer",
        "Watering schedules depend on the plant, the time of year and the container. A monstera in spring wants 250 ml every 7 days; in summer the same plant needs 300 ml every 5 days; in winter it drops to 150 ml every 14 days. A snake plant on the next shelf goes much longer between drinks - 100 ml every 14 days in spring, easily 21 days in winter. The calculator stores per-plant data for 10 common species so the schedule is plant-specific rather than generic.",
        "Pot size matters too. A 15 cm pot drains faster and dries out quicker than a 30 cm pot of the same plant. The calculator adjusts amount and frequency for pot size. Indoor plants generally need less water than outdoor (less wind, lower light), so a tomato outdoors in a 30 cm pot in summer can need 500 ml every day, while the same plant indoors might need only 250 ml every 2 days."
      ),
      createAnswerFirstSection(
        "How to Tell When to Water (Without a Calculator)",
        "The finger test still beats any schedule. Push a finger 2 to 3 cm into the compost; if it feels dry at that depth, water; if it feels damp, wait. Heavy plants (cacti, succulents, snake plants) want to dry out completely between waterings. Thirsty plants (tomatoes, herbs, peace lilies) want consistent moisture. The calculator gives a starting frequency; the finger test fine-tunes it for your specific home, light level and pot.",
        "Symptoms cut both ways. Yellowing leaves are usually overwatering (root rot suffocates the plant). Brown crispy leaf tips and wilting are usually underwatering. The calculator lists the typical symptoms for each plant so you can debug a struggling plant. For the seed-spacing question that often comes up at planting time, [Seed Spacing Calculator](/seed-spacing-calculator) handles row and plant distances."
      ),
    ],
    faqs: [
      createFAQ(
        "How often should I water houseplants?",
        "Most popular UK houseplants want watering every 7 to 14 days in spring and summer, every 14 to 21 days in autumn and winter. Cacti and succulents stretch to 21 to 30 days. Tropicals like peace lilies and ferns may need watering every 3 to 5 days in summer. Always check the soil before watering rather than sticking rigidly to a schedule."
      ),
      createFAQ(
        "Can you overwater plants?",
        "Yes, and it is the most common way houseplants die. Overwatering drowns the roots and creates conditions for root rot fungi. Symptoms include yellowing leaves, mushy stems at soil level and a sour smell from the compost. Most plants recover from one missed watering; few survive prolonged overwatering."
      ),
      createFAQ(
        "Should I water plants in the morning or evening?",
        "Morning is best for outdoor plants in summer: water reaches the roots before the heat of the day, and leaves dry by nightfall (wet leaves overnight encourage fungal disease). Indoor plants are less sensitive but morning watering still slightly outperforms evening because the plant uses water during its active light hours."
      ),
      createFAQ(
        "How do I know if my plant needs less water in winter?",
        "Most plants slow growth in winter (lower light, cooler temperatures) and use less water. The calculator's winter setting reduces frequency by 30 to 50 percent compared to summer. If a plant is putting out new leaves and growing actively, treat it as in active season; if it has stopped producing new leaves, treat it as dormant and water less."
      ),
    ],
    relatedTools: [
      { slug: "raised-bed-calculator", label: "Raised Bed Calculator" },
      { slug: "seed-spacing-calculator", label: "Seed Spacing Calculator" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
    ],
  },

  "canada-heating-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Heats Canadian Homes",
        "About 41% of Canadian homes use natural gas as primary heat (Alberta, Ontario, BC, Quebec lower-density), 32% electric (mostly Quebec, Manitoba, Atlantic), 16% oil (mostly Atlantic Canada), the rest wood, propane, or heat pumps. Each fuel has different per-unit cost: natural gas typically cheapest at $0.30-0.50/cubic metre, electricity $0.08-0.20/kWh, oil $1.20-1.80/litre, propane $0.50-1.20/litre.",
        "Annual heating cost for a typical 2,000 sqft Canadian home: $1,500-2,500 with natural gas, $2,000-4,000 with electric baseboards, $2,500-5,000 with oil or propane. The variation depends heavily on insulation quality, age of the home, and regional climate severity. Atlantic and Prairie homes often face winter heating that doubles their summer utility bills."
      ),
      createAnswerFirstSection(
        "Comparing Fuels",
        "Natural gas is the cheapest in regions where it's available. The infrastructure is the limiting factor - rural Atlantic Canada often lacks gas service, leaving oil or propane as defaults. Heat pumps (air-source or ground-source) have become competitive even in cold climates, with modern units rated to -30°C and producing 2-4x more heat than they consume in electricity.",
        "Electric resistance heating (baseboards) is the most expensive per BTU but the simplest to install. Quebec's low electricity rates (around $0.073/kWh from Hydro-Québec) make electric baseboards reasonably economical. In other provinces with $0.12-0.20/kWh rates, electric heat is much more expensive than natural gas alternatives."
      ),
      createAnswerFirstSection(
        "Cost-Cutting Investments",
        "Insulation upgrades typically pay back in 5-10 years through heating savings. Attic insulation upgrades from R-20 to R-50: $1,500-3,000 cost, $200-500/year savings. Wall insulation: $3,000-8,000 cost, $300-700/year savings. Air sealing (caulking, weatherstripping, foam): $500-1,500 cost, $150-300/year savings - highest ROI per dollar spent.",
        "Programmable thermostats save 10-15% on heating costs through scheduled setbacks (lower temp at night, when away). Smart thermostats (Nest, Ecobee) add learning algorithms - effective for $200-300 device cost. Federal Canada Greener Homes Grant offers up to $5,000 for efficiency upgrades. Many provinces have additional rebates."
      ),
      createAnswerFirstSection(
        "Heat Pumps vs Traditional Heating",
        "Heat pumps have improved dramatically. Modern cold-climate heat pumps work efficiently to -25 or -30°C. Operating costs typically half of natural gas in regions with electric rates under $0.12/kWh. Hybrid systems (heat pump + gas backup) handle the coldest snaps efficiently while running on heat pump for most of the heating season.",
        "Capital cost is real - a full heat pump installation runs $8,000-20,000 vs $4,000-8,000 for a natural gas furnace replacement. Federal grant programs and provincial rebates often cover $5,000-10,000 of the difference. Payback periods of 5-12 years are common. Use the [Canada Income Tax Calculator](/canada-income-tax-calculator) for any tax-credit aspects."
      ),
    ],
    faqs: [
      createFAQ(
        "When is the best time to upgrade heating?",
        "Spring or summer when contractors are less busy and prices are lower. Avoid emergency winter replacements - desperate homeowners often pay 20-40% more than off-season pricing. Many manufacturers offer rebates running March-May to drive shoulder-season sales."
      ),
      createFAQ(
        "Should I switch from oil to natural gas?",
        "If natural gas is available in your area: usually yes. Oil is typically 50-100% more expensive per BTU and prone to price spikes. Conversion cost: $5,000-10,000 plus removing the oil tank. Payback is 5-8 years for most households. Some provinces offer specific oil-to-gas conversion grants."
      ),
      createFAQ(
        "What's the cheapest temperature to set?",
        "Energy Star recommends 20°C when home and awake, 18°C when sleeping or away. Each 1°C reduction saves about 2-3% on heating. Setting back 5°C overnight saves 10-15% over keeping a constant 20°C. Diminishing returns below 17°C as comfort and pipe-freezing risks rise."
      ),
      createFAQ(
        "Are wood stoves still cost-effective?",
        "If you have access to inexpensive firewood: yes, often the cheapest fuel per BTU. Without easy wood access (delivered cordwood at $400-600/cord), the math is more like natural gas. Modern EPA-certified wood stoves are 80%+ efficient vs older units at 50-60%. Particulate emissions are environmentally significant."
      ),
    ],
    relatedTools: [
      { slug: "canada-income-tax-calculator", label: "Canada Income Tax Calculator" },
      { slug: "canada-mortgage-calculator", label: "Canada Mortgage Calculator" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "canada-salary-comparison-by-province", label: "Canada Salary Comparison" },
    ],
  },

  "india-electricity-bill-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Indian Electricity Tariffs Work",
        "Indian electricity bills use slab-based tariffs that vary by state. Most states use ascending slabs: 0-100 units at low rate, 101-200 at higher, 201-300 higher still, 301-500 highest, 500+ peak rate. For example, Tamil Nadu (TANGEDCO): 0-100 free, 101-200 ₹2.25/unit, 201-500 ₹4.50, 500+ ₹6.30/unit. Maharashtra (MSEDCL) similar structure with different boundaries.",
        "Beyond energy charges, monthly bills include: fixed charges (₹50-200/month based on connection size), fuel adjustment cost (varies quarterly), electricity duty (5-15% of energy charge in most states), GST 18% on entire bill in some states. So a household at ₹2,000 of energy charges typically pays ₹2,400-2,600 final bill."
      ),
      createAnswerFirstSection(
        "Calculating Bill from Meter Reading",
        "Bill = (units consumed × applicable slab rate) + fixed charge + fuel adjustment + duties + GST. A household using 350 units in Tamil Nadu: first 100 free, next 100 at ₹2.25 = ₹225, next 150 at ₹4.50 = ₹675. Energy charge ₹900 + fixed ₹100 + duty ₹90 + GST = ₹1,200-1,300 monthly bill.",
        "Most state utilities (TANGEDCO, MSEDCL, BSES, Adani Electricity, etc.) bill bi-monthly (every 2 months) so the per-bill amounts double. Many homes use 300-600 units monthly in summer with AC; 100-200 units in winter. Annual electricity costs for a 3-BHK family in metro cities typically run ₹15,000-40,000."
      ),
      createAnswerFirstSection(
        "Reducing Your Bill",
        "5-star rated appliances use 30-50% less electricity than 1-star equivalents. AC at 24-26°C saves 20-30% vs 18-20°C. Geyser timer (1-2 hours daily instead of always on) saves significantly. LED lights use 80% less than incandescent, 50% less than CFL. Inverter ACs save 30-40% over regular ACs in cooling mode.",
        "Solar rooftop systems are increasingly affordable. 3 kW residential rooftop installation: ₹1.5-2.5 lakh after government subsidy (Rooftop Solar Programme provides 40% subsidy on first 3 kW). Generates roughly 12-15 units/day, often offsetting most household consumption. Payback period 4-7 years; warranty 25 years."
      ),
      createAnswerFirstSection(
        "Subsidies and Free Units",
        "Many states offer free or subsidised units for low-consumption households. Tamil Nadu: first 100 units free for all (above), bigger free quota (200 units) for low-income households. Delhi: 200 units free monthly to most households. Punjab: free to farmers (heavily subsidised). Andhra Pradesh, Telangana have similar programmes.",
        "These subsidies are politically sensitive and change with state government policy. Always check your latest bill and the utility's website for current schemes. Income-based subsidies typically require Aadhaar linking and annual income proof. Use the [India Income Tax Calculator](/india-income-tax-calculator) for tax-related queries."
      ),
    ],
    faqs: [
      createFAQ(
        "How is one 'unit' measured?",
        "One unit = 1 kilowatt-hour (kWh) = 1,000 watts of power consumed for 1 hour. A 100W light bulb running for 10 hours = 1 unit. A 1.5 ton AC running for 1 hour ≈ 1.5 units. Track high-power appliances to estimate consumption."
      ),
      createFAQ(
        "Why does my bill vary so much month to month?",
        "AC and water heater are the biggest variables. Summer AC use can quadruple electricity consumption vs winter. Holiday months with people home more also increase usage. Bi-monthly billing creates apparent volatility - same monthly average looks more dramatic when bunched."
      ),
      createFAQ(
        "What's the load demand?",
        "Maximum power your connection can deliver simultaneously, in kVA. Standard residential: 3-5 kVA. Larger homes with multiple ACs: 8-15 kVA. Commercial: higher. Higher load = higher fixed charges. Right-size your connection to your actual peak demand."
      ),
      createFAQ(
        "Should I install a smart meter?",
        "Many states are rolling out smart meters that show real-time consumption. They can help identify high-usage periods and appliances. Some states charge a small fee; others install free as part of grid modernisation. Smart meter data via apps helps optimise consumption."
      ),
    ],
    relatedTools: [
      { slug: "india-income-tax-calculator", label: "India Income Tax Calculator" },
      { slug: "india-home-loan-emi-calculator", label: "India Home Loan EMI Calculator" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
      { slug: "india-sip-calculator", label: "India SIP Calculator" },
    ],
  },

  "australia-water-usage-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Australian Water Bills Work",
        "Most Australian water bills include: fixed service charge ($150-400/quarter depending on locality), usage charge (per kilolitre, where 1 kL = 1,000 litres), wastewater charge (for sewage treatment), and sometimes a stormwater charge. Average Australian household uses 150-200 kL/year (410-550 litres/day for a family of 4). Annual bills range $800-1,500 for a typical household.",
        "Usage tariffs often have tiered pricing. Sydney Water (NSW): 0-200kL at $2.55/kL, above 200 at $4.81. Melbourne Water rates similar but capped at lower tiers. Brisbane (Urban Utilities): tiered with summer drought premiums. Tasmania uses flat rate. WA has different metropolitan and regional pricing."
      ),
      createAnswerFirstSection(
        "Where the Water Goes",
        "Indoor: showers (35-40% of household use), toilets (20-25%), laundry (15-20%), kitchen (8-15%), bathroom basin (5%). Outdoor: irrigation (varies hugely - 0% for apartments, 30%+ for large lawns), pool (if applicable, 20-50% of annual outdoor). Daily per-person consumption averages 200-280 litres in Australian capital cities.",
        "Showers are the easiest target for reduction. A 9-litre/minute showerhead (standard) used 8 minutes/day = 72 litres/person. A 6-litre/minute water-efficient showerhead = 48 litres/person, saving 9,000+ litres/year per person. Front-loading washing machines use 50% less water than top-loaders."
      ),
      createAnswerFirstSection(
        "Restrictions and Drought Pricing",
        "Many Australian capitals have permanent water restrictions: no daytime watering of gardens, hand-held hoses only (not sprinklers), no hosing down driveways or paths. Drought conditions trigger stricter restrictions - level 2-4 in major dry periods, prohibiting all garden watering or filling pools.",
        "Drought also pushes up tariffs. Sydney's 'level 2' restrictions in 2019-2020 came with 14% tariff increases. Dam levels under 50% typically trigger pricing changes. Long-term dry trends in southern and western Australia make water pricing structurally tighter than 20 years ago."
      ),
      createAnswerFirstSection(
        "Rebates and Efficiency Programs",
        "Most state water utilities offer rebates for: water-efficient showerheads ($30-50), dual-flush toilets ($50-200), water-efficient washing machines ($100-500), rainwater tanks ($500-1,500), greywater systems ($500-2,500). Combined rebates can reduce upgrade costs by 30-60%.",
        "Rainwater tanks: 3,000-5,000L tank typical for residential, $1,500-3,000 installed before rebates. Reduces mains water consumption by 30-60% for households using tank water for toilets, laundry, and garden. Combined with water-efficient fixtures, annual savings of $300-500. Use the [Australia Pay Calculator](/australia-pay-calculator) for household budgeting context."
      ),
    ],
    faqs: [
      createFAQ(
        "How can I reduce water usage quickly?",
        "Three highest-impact changes: 4-minute timer in shower (saves 30-40 litres per shower), front-load washer if you have a top-loader, hand-water garden in early morning instead of evening or daytime. Combined easily save 100-200 litres/day for a 4-person household."
      ),
      createFAQ(
        "Why is my water bill suddenly high?",
        "Common causes: silent toilet leak (50+ litres/day undetected), leaking irrigation system, dripping outdoor tap, recent guests, new pool, hot summer driving outdoor use. Read your meter at the start and end of a 24-hour period with no usage to detect leaks."
      ),
      createFAQ(
        "Are water tanks worth it in cities?",
        "Yes for most households with garden or laundry use. Payback 5-12 years depending on location. Newer homes in some states (NSW, Victoria) require rainwater tanks for new builds. Not worthwhile for apartment dwellers without garden access."
      ),
      createFAQ(
        "What if I have a leak?",
        "Most utilities offer leak allowance - if you can prove a hidden leak (concealed plumbing) was repaired, they may credit excess usage. Won't apply to obvious leaks (dripping taps you should have fixed). Keep repair invoices and submit promptly when bill arrives."
      ),
    ],
    relatedTools: [
      { slug: "australia-pay-calculator", label: "Australia Pay Calculator" },
      { slug: "australia-electricity-plan-comparison", label: "Australia Electricity Plan Comparison" },
      { slug: "australia-cost-of-living-by-city", label: "Australia Cost of Living" },
      { slug: "australia-mortgage-calculator", label: "Australia Mortgage Calculator" },
    ],
  },

  "australia-electricity-plan-comparison": {
    sections: [
      createAnswerFirstSection(
        "Australian Electricity Market Basics",
        "Most Australian states have deregulated electricity retail - you can choose from multiple retailers (Origin, AGL, EnergyAustralia, Red Energy, Alinta, Powershop, Lumo, etc.). WA and Tasmania are still mostly regulated. Rates vary by region within deregulated states based on network costs. Switching retailers is straightforward and free; new retailers handle the transition.",
        "Bill components: usage charge (cents/kWh), supply charge (daily fixed, $1-1.50/day), feed-in tariff if you have solar (5-15 cents/kWh credit). Average annual cost for a 4-person household using 5,500 kWh: $1,800-2,500 in Eastern states, $1,500-2,200 in WA/Tas. Rates have risen significantly since 2022 due to global energy market volatility."
      ),
      createAnswerFirstSection(
        "What Affects the Rate You See",
        "Network costs (poles, wires, transformers) make up 40-50% of the bill in most states - these are regulated and pass through to all retailers. Wholesale energy is 25-35%, regulated. Retail margin is 10-15% - this is where retailer competition happens. So switching retailers typically saves 5-15% on the bill, not 30-50%.",
        "Discounts off 'standing offer' rates were popular before 2019 when reforms moved everyone to 'reference price' benchmarking. Now compare actual rates and supply charges directly. The Australian Government's Energy Made Easy website and Victorian Energy Compare are official comparison tools that aggregate offers."
      ),
      createAnswerFirstSection(
        "Solar Feed-in Tariffs",
        "Solar feed-in tariffs (FiT) - what retailers pay you for excess solar exported to the grid - have collapsed from $0.30-0.60/kWh historical high to $0.05-0.10/kWh in 2024-25. The economics of new solar still work, but mostly through self-consumption (avoided usage cost) rather than feed-in revenue.",
        "Time-of-use tariffs increasingly common. Off-peak (overnight) rates 20-35 cents/kWh, peak (4-9pm) 40-65 cents/kWh, shoulder rates between. Solar households benefit from shifting consumption to mid-day (cheap) and avoiding peak. Battery storage is approaching financial viability for solar households who want to use stored solar during evening peak."
      ),
      createAnswerFirstSection(
        "Switching Plans",
        "Average savings from active retailer switching: $200-400/year. Bigger savings if you've been with the same retailer for 3+ years (acquisition discounts often expire). Ten minutes on Energy Made Easy plus a phone call usually completes the switch. New retailer handles all transitions; no power interruption.",
        "Contract terms: most are no-lock-in (free to switch any time). Some 'fixed price' plans lock for 12-24 months but offer rate certainty. Watch for early termination fees on locked plans. Hardship plans available if you fall behind on payments - utilities are required to offer payment plans rather than disconnect quickly."
      ),
    ],
    faqs: [
      createFAQ(
        "When should I compare plans?",
        "Annually at minimum. Each year, your retailer typically increases rates while the most competitive offers in the market may have dropped. Setting a calendar reminder for your billing anniversary is the simplest discipline."
      ),
      createFAQ(
        "Are 'green' plans more expensive?",
        "Slightly - 5-15% premium for 100% renewable plans. Some are 'GreenPower' certified (matching consumption with renewable generation), others use carbon offsets. The premium has shrunk as renewable generation has scaled up."
      ),
      createFAQ(
        "What about gas?",
        "Many homes have separate electricity and gas accounts. Dual-fuel plans (single bill from one retailer) often have small discounts. Gas market dynamics are different from electricity - mostly East Coast supply pressure, prices volatile through 2022-2024."
      ),
      createFAQ(
        "What's a controlled load?",
        "Off-peak hot water and pool pumps that the retailer can switch on only during low-demand periods (typically overnight). Significantly cheaper rate (8-15 cents/kWh) than main supply. Most homes with electric storage hot water systems have controlled load tariffs."
      ),
    ],
    relatedTools: [
      { slug: "australia-water-usage-calculator", label: "Australia Water Usage Calculator" },
      { slug: "australia-pay-calculator", label: "Australia Pay Calculator" },
      { slug: "australia-cost-of-living-by-city", label: "Australia Cost of Living" },
      { slug: "energy-cost-calculator", label: "Energy Cost Calculator" },
    ],
  },

  "australia-pet-registration-cost": {
    sections: [
      createAnswerFirstSection(
        "Pet Registration Is Council-Based",
        "In Australia, pet registration (mostly dogs and cats) is administered by local councils, not states. Annual fees vary widely: $30-100 for a desexed dog, $100-250 for an undesexed dog, $20-60 for desexed cat, $60-200 for undesexed cat. Working dogs (registered breeds for farm work) get reduced rates. Greyhound owners may have separate categorisation.",
        "Registration is mandatory in all states. Penalties for unregistered pets can be $500-1,000 per offence. Microchipping is also mandatory before registration in most states - typically $50-80 done at a vet. Combined microchip + registration ensures lost pets can be reunited with owners."
      ),
      createAnswerFirstSection(
        "What the Fee Covers",
        "Council pet fees fund: animal control services, dog parks and exercise areas, lost pet recovery, pound facilities, education programs, ranger patrols. Larger councils with more services tend to have higher fees. Rural councils sometimes offer lower fees but limited services to match.",
        "Concessions are common. Pensioner discount (50% off typical), guide dog and assistance dog (free or heavily reduced), council voucher schemes for low-income households. Multi-pet discount (slight reduction on second/third pet). Always check your specific council's website for available concessions."
      ),
      createAnswerFirstSection(
        "Desexing Reduces Fees Substantially",
        "Most councils charge undesexed pets 2-3x the desexed fee, partly as an incentive for population control, partly because undesexed animals are more likely to roam, fight, or breed unwanted litters. The cost saving over a 10-year pet lifetime is substantial: $50-150/year × 10 years = $500-1,500 in registration savings alone.",
        "Plus desexing has health benefits for the pet. RSPCA, Animal Welfare League, and council schemes offer subsidised desexing for low-income owners. Many adoption shelters desex before rehoming. Initial desexing cost: $200-500 for cats, $300-800 for dogs depending on size."
      ),
      createAnswerFirstSection(
        "When and How to Register",
        "Registration deadlines vary by council - typically annually, often April-June. New pet owners must register within 14-28 days of acquisition. Online registration via council websites is now standard. Renewals usually emailed 4-8 weeks before due date.",
        "Required documents: proof of microchip (registration certificate from chip supplier), desexing certificate if applicable, vaccination certificate (some councils), proof of address. Concession applications need pension card or relevant documentation. Use the [Australia Cost of Living by City](/australia-cost-of-living-by-city) for broader pet-ownership cost context."
      ),
    ],
    faqs: [
      createFAQ(
        "Do I need to register my cat?",
        "In most Australian states yes. NSW, Victoria, ACT, SA - all require cat registration. Queensland varies by council. WA mandatory only in some councils. Fees lower than dogs typically. Microchipping is mandatory before registration in most states."
      ),
      createFAQ(
        "What about other pets?",
        "Generally no registration needed for caged birds, fish, reptiles (with state-specific reptile licence requirements), small mammals (rabbits, guinea pigs). Dangerous breed dogs (American Pit Bull Terrier, certain others by state) face additional registration, restrictions, and insurance requirements."
      ),
      createFAQ(
        "Can I register online?",
        "Most councils offer online registration through their website. Some require initial in-person registration (verification of microchip and pet identity) with online renewals afterward. Look up 'pet registration' on your local council website."
      ),
      createFAQ(
        "What if I move to a new council area?",
        "You usually need to register with the new council within 14-30 days of moving. Refunds from your previous council vary - some allow pro-rata refunds, others don't. Update your microchip details with the chip registry to ensure lost pet recovery still works at the new address."
      ),
    ],
    relatedTools: [
      { slug: "australia-cost-of-living-by-city", label: "Australia Cost of Living" },
      { slug: "australia-pay-calculator", label: "Australia Pay Calculator" },
      { slug: "australia-mortgage-calculator", label: "Australia Mortgage Calculator" },
      { slug: "australia-stamp-duty-calculator", label: "Australia Stamp Duty Calculator" },
    ],
  },

  "board-foot-calculator": {
    sections: [
      createAnswerFirstSection(
        "What's a Board Foot?",
        "A board foot is the standard US lumber volume measurement: 144 cubic inches (1 inch thick × 12 inches wide × 12 inches long). For other dimensions, use: thickness (inches) × width (inches) × length (feet) ÷ 12. So a 2x4x8 (1.5 in × 3.5 in × 96 in) is (1.5 × 3.5 × 96) ÷ 144 = 3.5 board feet.",
        "Used in lumber pricing - dealers quote per board foot. A 2x4x8 might be £4 per board foot × 3.5 board feet = £14. Hardwoods (oak, walnut, cherry) range £6-30/bf depending on species and grade. Softwoods (pine, spruce, fir): £2-8/bf. The board foot accounts for both length and cross-section, making it the natural unit for lumber volume calculations."
      ),
      {
        heading: "Common Lumber Board Feet",
        table: {
          headers: ["Lumber size", "Length", "Board feet"],
          rows: [
            ["2x4 (1.5x3.5)", "8 ft", "3.50 bf"],
            ["2x4", "10 ft", "4.38 bf"],
            ["2x6 (1.5x5.5)", "8 ft", "5.50 bf"],
            ["2x8 (1.5x7.25)", "8 ft", "7.25 bf"],
            ["4x4 (3.5x3.5)", "8 ft", "8.17 bf"],
            ["1x6 (0.75x5.5)", "8 ft", "2.75 bf"],
            ["1x12 (0.75x11.25)", "8 ft", "5.62 bf"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is a 2x4 actually 1.5x3.5?",
        "Lumber is sold by 'nominal' size (the rough sawn dimension before planing/drying). A 2x4 is rough-sawn at 2 inches × 4 inches, then dried and planed to its final 1.5 × 3.5 inches. Nominal sizes are the standard for ordering and pricing; actual sizes matter for fitting."
      ),
      createFAQ(
        "Is board foot the same as linear foot?",
        "No. Board foot is volume; linear foot is length only. A 2x4 has 1 linear foot per foot of length, but 0.44 board feet per foot of length (since it's smaller than 1ft x 1ft x 1in cross-section). Linear feet for fence boards or trim; board feet for ordering bulk rough lumber."
      ),
    ],
    relatedTools: [
      { slug: "feet-to-metres", label: "Feet to Metres" },
      { slug: "inches-to-mm", label: "Inches to Millimetres" },
      { slug: "sawhorse-angle-calculator", label: "Sawhorse Angle Calculator" },
    ],
  },

  "sawhorse-angle-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Angle for Sawhorse Legs",
        "Standard sawhorse leg angle: 12-15 degrees from vertical. This gives stability without making the unit overly wide. Steeper angles (20+ degrees) give wider base but use more material and create awkward storage. Steel sawhorses often use 10-12 degrees; wooden DIY sawhorses commonly 12-15 degrees.",
        "For DIY construction, the angle is set by the relationship between leg height and base width. A 30-inch tall sawhorse with legs splayed at 12 degrees has a base width of 30 × tan(12°) × 2 = 12.75 inches between leg bottoms. A 15-degree splay gives 16.1 inches base width. Both stable; the wider base offers more lateral stability for heavy work."
      ),
      {
        heading: "Sawhorse Geometry",
        table: {
          headers: ["Leg angle", "Stability", "Use case"],
          rows: [
            ["8°", "Less stable", "Light work, narrow access"],
            ["10°", "Adequate", "General DIY"],
            ["12°", "Good standard", "Most home woodworking"],
            ["15°", "Very stable", "Heavy materials, professional"],
            ["18°", "Very stable, wide", "Outdoor, uneven ground"],
            ["20°+", "Maximum stability", "Industrial, heaviest loads"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the standard sawhorse height?",
        "30-32 inches typical for hand tool work; matches typical workbench height. Taller (34-36 inches) for power tool work where you need clearance under boards. Shorter (24 inches) for sawing operations where you need to bear down. Match to your typical task."
      ),
      createFAQ(
        "Should I cut the angle on the legs or use a metal bracket?",
        "Both work. Metal sawhorse brackets (HD/Lowes/B&Q) handle the angle math for you - you just fit standard 2x4 legs and crossbar. DIY angled cuts require accurate marking but produce a more refined result and use less hardware."
      ),
    ],
    relatedTools: [
      { slug: "board-foot-calculator", label: "Board Foot Calculator" },
      { slug: "degrees-to-radians", label: "Degrees to Radians" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },
};
