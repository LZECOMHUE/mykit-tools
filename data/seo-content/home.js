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
};
