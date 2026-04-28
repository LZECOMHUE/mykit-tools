// SEO content for vehicle and transport tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const automotiveSEO = {
  "australia-rego-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Car Registration Fees Are Calculated in Australia",
        "Your vehicle registration (rego) fee is not a flat rate. It is a combination of administrative state fees, motor vehicle tax (which scales differently depending on the state), and mandatory Compulsory Third Party (CTP) insurance (Green Slip in NSW).",
        "For example, in New South Wales and Victoria, the weight of the vehicle and its engine size heavily influence the tax portion. Heavier vehicles like SUVs and utes typically cost more to register than light hatchbacks."
      )
    ],
    faqs: [
      createFAQ(
        "How do I get a car registration estimate for NSW?",
        "In NSW, your total rego cost involves fixing your CTP Green Slip first (prices vary by insurer) plus the RMS registration fee and vehicle tax. Our rego price checker provides a solid estimate based on passenger vehicle averages in your state."
      ),
      createFAQ(
        "Can I pay my car registration for 3 or 6 months?",
        "Most states, including Queensland, Victoria, and WA, allow 3-month or 6-month rego renewals. However, renewing for shorter periods usually incurs a higher surcharge compared to paying for a full 12 months upfront."
      )
    ]
  },

  "ev-charging-time-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Determines EV Charging Time",
        "Charging time depends on three things: battery capacity (in kWh), how much charge you need to add, and the charger's power output (in kW). The basic equation is straightforward: kWh needed divided by charger power equals hours, with a real-world adjustment for the charging curve. A 50 kWh battery filled from 20% to 80% needs 30 kWh; on a 7 kW home charger that takes about 5 hours, on a 50 kW rapid charger about 40 minutes.",
        "The catch is that fast chargers slow down dramatically as the battery fills. Most EVs charge fastest between 10% and 60% state of charge, then taper sharply above 80%. Charging from 0 to 80% on a 150 kW ultra-rapid might take 25 minutes; the final 20% to 100% can take another 30 minutes alone. The calculator applies a sensible 80% efficiency factor to the headline charger power to reflect this real-world behaviour."
      ),
      createAnswerFirstSection(
        "Home Charger Choices: 3kW vs 7kW",
        "A standard UK three-pin socket delivers about 2.3 kW (limited by the 13A fuse), which means a 50 kWh battery from 20% to 80% takes around 13 hours. Workable for an overnight top-up but slow if you need to add more than 100 miles in a session. A dedicated 7 kW home wallbox is the standard upgrade and roughly halves the time, getting the same charge done in around 4 to 5 hours overnight.",
        "22 kW chargers are not generally usable at home in the UK because most domestic supplies are single-phase and capped at 7.4 kW. Some properties have three-phase supplies that support faster home charging, but installation costs jump significantly. The OZEV grant helps cover wallbox installation if you rent or live in a flat. For the rest, a 7 kW unit is the sweet spot of cost vs speed for daily use."
      ),
      createAnswerFirstSection(
        "Public Rapid and Ultra-Rapid Charging",
        "On a long-distance trip, public charger speed matters more than overnight time. A 50 kW rapid charger (the most common UK roadside type) gives a typical mid-size EV around 100 miles of range in 30 to 45 minutes. A 150 kW ultra-rapid (Tesla V3 Supercharger, IONITY, GRIDSERVE high-power bays) can do the same in 15 to 20 minutes, but only if your car supports that peak rate; many older EVs cap at 50 to 100 kW regardless of the charger.",
        "Cost varies widely. Home electricity at 28p/kWh is the cheap baseline. Public rapid charging routinely costs 70p to 85p/kWh during peak times, sometimes more. Charging a 60 kWh battery from 20% to 80% (36 kWh added) costs around £10 at home and £25 to £30 on a public rapid. Use the [road trip cost calculator](/road-trip-cost-calculator) to compare total trip costs against petrol and diesel."
      ),
      createAnswerFirstSection(
        "When the Math Says 'Don't Bother'",
        "Some scenarios make rapid charging genuinely uneconomical. Adding 5% to 10% on a public rapid (just to make a destination) costs disproportionately because of the per-session connection fee that some operators charge. Charging from 80% to 100% on a high-speed charger is also slow and expensive: the battery is already full enough for most journeys, so it is usually faster overall to unplug at 80% and continue.",
        "If you have a wallbox at home, the dominant pattern is overnight top-ups using off-peak tariffs. Octopus Go and similar EV-specific tariffs offer rates as low as 7.5p/kWh between midnight and 5am, which makes a 50 kWh full charge cost around £3.75. That is the figure that makes EV total ownership genuinely cheaper than petrol; without home charging access, the total cost picture changes significantly."
      ),
      {
        heading: "Common Charging Time Estimates (50 kWh battery, 20% to 80%)",
        table: {
          headers: ["Charger", "Power", "Average Output", "Time", "Cost (28p/kWh)"],
          rows: [
            ["3-pin socket", "2.3 kW", "1.8 kW", "~16h 40m", "£8.40"],
            ["3 kW home", "3 kW", "2.4 kW", "~12h 30m", "£8.40"],
            ["7 kW wallbox", "7 kW", "5.6 kW", "~5h 20m", "£8.40"],
            ["22 kW workplace", "22 kW", "17.6 kW", "~1h 42m", "£8.40"],
            ["50 kW rapid", "50 kW", "40 kW", "~45m", "£21 (75p/kWh)"],
            ["150 kW ultra-rapid", "150 kW", "120 kW", "~15m", "£24 (85p/kWh)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How long to charge a Tesla Model 3 from empty?",
        "A Long Range Model 3 has a 75 kWh battery. From 0% to 100% on a 7 kW home wallbox takes around 11 to 12 hours. On a Tesla V3 Supercharger (250 kW peak), 0 to 80% takes around 25 minutes; the final 20% to 100% adds another 30 to 40 minutes. Most owners never run a Tesla to actual zero; daily driving usually involves 20% to 80% charging cycles to preserve battery health."
      ),
      createFAQ(
        "Does fast charging damage the battery?",
        "Repeated fast charging causes slightly more battery degradation than slow charging, but modern EV battery management systems mitigate this aggressively. After 5 to 7 years of mixed home and rapid charging, expect 5 to 10% capacity loss; with rapid-only charging, that can rise to 15 to 20%. For most drivers who do mostly home charging with occasional road-trip rapids, the degradation difference is not financially meaningful over typical ownership periods."
      ),
      createFAQ(
        "Why does the calculator show 80% of charger power?",
        "Real-world charging efficiency is rarely 100%. Charging losses (heat, AC-to-DC conversion, the BMS managing cell balance) typically take 8 to 15% of the input. As the battery fills, the car deliberately slows the charge rate to protect the cells, particularly above 80% state of charge. The 80% factor is a sensible average across the full charging curve and gives more accurate real-world time estimates than treating the charger's headline kW as constant output."
      ),
      createFAQ(
        "Should I charge to 100% every night?",
        "No, not unless you genuinely need the full range that day. Most EV manufacturers recommend an 80% daily charge limit to extend battery lifespan, and modern EVs have a built-in setting for this. Charge to 100% before a long trip, then back to the 80% routine afterward. For LFP batteries (used in some Tesla Standard Range models and most BYD EVs), the recommendation flips: 100% charging is fine and is sometimes even recommended for cell balancing."
      ),
      createFAQ(
        "What is the cheapest way to charge an EV?",
        "Off-peak home charging on an EV-specific tariff. Octopus Go, Intelligent Octopus, and similar tariffs offer rates of 7p to 10p/kWh between midnight and 5am, compared to 28p+ on a standard tariff. Pair this with a smart wallbox that schedules charging automatically, and a typical 50 kWh full charge costs £4 to £5. That works out to roughly 1.5p per mile, vs 14p+ per mile for a petrol equivalent."
      ),
    ],
    relatedTools: [
      { slug: "petrol-vs-electric-total-cost", label: "Petrol vs Electric Total Cost" },
      { slug: "ev-range-calculator", label: "EV Range Calculator" },
      { slug: "road-trip-cost-calculator", label: "Road Trip Cost Calculator" },
    ],
  },

  "lease-vs-buy-car-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Real Question Is Total Cost, Not Monthly Payment",
        "The lease-vs-buy decision usually gets framed around the monthly payment, which is the wrong frame. A lease at £350/month for 36 months totals £12,600 with nothing to show at the end. Buying the same car with a £5,000 deposit and 48 months of finance at £450/month totals £26,600 in payments, but you own a car that is probably still worth £10,000. The true comparison is total cost (after subtracting any remaining vehicle value) divided by months of use, not the headline monthly figure.",
        "The calculator works this out for you. It includes finance interest, depreciation, insurance, road tax (VED) and routine maintenance for buying; lease payments and lease-side insurance for leasing. Maintenance is typically included in lease deals, which is a hidden saving worth £1,000+ over 3 years on most cars. The 'cheaper option' line at the bottom gives you the actual answer in pounds, not in monthly-payment optics."
      ),
      createAnswerFirstSection(
        "When Leasing Is Genuinely Better",
        "Leasing wins in three specific scenarios. First, if you swap cars every 2 to 3 years anyway: you are essentially paying for the depreciation either way, and a lease eliminates the risk of getting stuck with a hard-to-sell car. Second, if you can claim the lease through a business: corporation tax relief on the lease payments and recoverable VAT change the maths significantly. Third, if you genuinely want the latest tech (especially in EVs, where battery improvements are still meaningful year-on-year).",
        "If a 3-year lease at £350/month replaces your existing buy-and-keep cycle of paying off a £25,000 car over 5 years and selling for £8,000, the cost-per-month is roughly comparable but the lease comes with full warranty and fixed costs. The hidden gotcha is mileage limits: most leases cap at 8,000 to 12,000 miles per year, with excess-mile charges of 6p to 15p per mile. Go 5,000 miles over and you owe £400+ at handover."
      ),
      createAnswerFirstSection(
        "When Buying Wins",
        "Buying outright (or with finance you pay off) wins in the long run for high-mileage drivers, anyone who keeps cars for 5+ years, and anyone happy driving a 5-to-10-year-old car for free after the loan is paid. A typical mid-size petrol car bought new at £25,000 with a 5-year loan is fully owned at age 5 and worth around £10,000 at trade-in; if you keep it another 5 years the per-month cost halves because the only ongoing cost is fuel, insurance, and maintenance.",
        "Buying also gives you the freedom to modify, sell at any time, or simply hand it down to a teenager. Leases bind you to fixed mileage, factory-spec returns, and ironclad return-condition rules (any damage above 'fair wear and tear' is charged at handover). Use the [should I keep my old car](/should-i-keep-my-old-car) calculator alongside this one if you are deciding whether to stick with what you have."
      ),
      createAnswerFirstSection(
        "Personal Contract Purchase (PCP) Is the Hybrid Option",
        "PCP is finance plus a balloon payment at the end. You pay a deposit, monthly payments for 3 to 4 years, then choose: hand the car back (like a lease), pay the balloon and own it outright, or trade it in toward a new PCP. Monthly payments are lower than HP because you are only paying off the depreciation portion. The balloon (called the Guaranteed Future Value) is set by the finance company up-front based on expected resale value.",
        "PCP hides a layer of interest. The full APR usually only becomes obvious if you actually pay the balloon to keep the car; many people roll into the next PCP without doing the maths. From a 'lease vs buy' perspective, PCP is closer to leasing in cost structure but gives you the optionality to buy. If you are comparing a PCP deal against a lease, set the buying side of this calculator with the same deposit, monthly and total months as the PCP, then add the balloon to the depreciation field."
      ),
      {
        heading: "Worked Example: 3-Year Comparison",
        table: {
          headers: ["Cost", "Buy (4yr finance)", "Lease (3yr)", "Notes"],
          rows: [
            ["Initial outlay", "£5,000 deposit", "£3,500 (initial)", "Lease typically 6-12 months upfront"],
            ["Monthly payment", "£450", "£350", "Headline figure most compare"],
            ["Total payments", "£21,600", "£12,600", "Over the contract"],
            ["Interest", "£2,000", "£0 (built in)", "Finance APR adds up"],
            ["Depreciation", "£12,500", "£0", "Buyer's loss; lease company's risk"],
            ["Maintenance", "£3,200", "£600", "Lease usually includes servicing"],
            ["End state", "Owns car (~£10k)", "Hand back keys", "Net asset position differs"],
            ["Net 3-year cost", "~£23,400", "~£12,600", "Buyer comes out ahead long-term"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between a lease and a PCP?",
        "A lease is purely a long-term rental: pay monthly, hand back at the end, owe nothing further. A PCP (Personal Contract Purchase) lets you choose at the end between handing back, paying a balloon to keep the car, or trading in for a new PCP. PCP usually has slightly higher monthly payments than lease (because you are paying interest on the balloon too) but gives you the ownership option. Both are common in the UK new-car market; lease is more common for company cars, PCP for private buyers."
      ),
      createFAQ(
        "What counts as fair wear and tear on a lease?",
        "The BVRLA (British Vehicle Rental and Leasing Association) publishes a fair wear and tear standard that all UK lease companies follow. Light scratches under 25mm, minor stone chips, and standard interior wear are acceptable. Dents over 15mm, cracked alloys, scuffed bumpers, missing service stamps and any kerb damage typically incur charges of £75 to £400+ per item. Get a pre-handback inspection done by the lease company to know what you owe before the truck arrives."
      ),
      createFAQ(
        "Should I lease an EV or buy one?",
        "Leasing an EV often makes more sense than leasing a petrol equivalent because of how fast EV tech is evolving. A 2022 EV's range and charging speed are noticeably worse than a 2026 model, so locking in a long-term purchase risks owning yesterday's technology. Lease companies absorb that depreciation risk for you. The flip side: EV residual values have been falling faster than expected, which is pushing lease prices up and may eventually flip the maths back toward buying. Run the numbers for the specific deal you are looking at."
      ),
      createFAQ(
        "Can I end a lease early?",
        "Usually only by paying an early termination fee, which can be as much as 50% of the remaining payments. Some leases have a half-life break clause (after 50% of the contract has been paid, you can hand back with notice), but these are uncommon on consumer deals. If you genuinely cannot keep paying, lease-transfer services like LeaseTake-Up can advertise your contract to other buyers; not all lease companies allow transfers, so check first. Buying gives you the flexibility to sell at any time, which is one of its main advantages."
      ),
      createFAQ(
        "Is contract hire the same as leasing?",
        "Yes. 'Personal Contract Hire' (PCH) and 'Business Contract Hire' (BCH) are the formal names for what most people call leasing. The contract is between you and the lease company; you pay monthly for use of the car and hand it back at the end with no ownership. The terms 'lease' and 'contract hire' are used interchangeably in the UK car market."
      ),
    ],
    relatedTools: [
      { slug: "car-loan-calculator", label: "Car Loan Calculator" },
      { slug: "should-i-keep-my-old-car", label: "Should I Keep My Old Car" },
      { slug: "salary-sacrifice-car-calculator", label: "Salary Sacrifice Car Calculator" },
    ],
  },

  "mileage-reimbursement-calculator": {
    sections: [
      createAnswerFirstSection(
        "HMRC Approved Mileage Rates Explained",
        "If you use your own car for business journeys, HMRC lets your employer reimburse you tax-free at 45p per mile for the first 10,000 business miles in a tax year, then 25p per mile after that. These are the Approved Mileage Allowance Payments (AMAP). Motorcycles are 24p per mile and bicycles 20p per mile, with no upper threshold. The rates have been frozen since 2011 despite fuel and maintenance costs rising significantly, which is a long-running gripe among high-mileage business drivers.",
        "Crucially, these rates cover everything: fuel, insurance, depreciation, maintenance, road tax. Your employer cannot pay separately for petrol and then add a mileage rate; that would be double-recovery and HMRC treats the petrol portion as taxable income. The 45p figure is meant to be a fair-but-not-generous estimate of total per-mile running cost for a typical UK car."
      ),
      createAnswerFirstSection(
        "When Your Employer Pays Less Than the AMAP Rate",
        "If your employer pays mileage at less than the HMRC rate (some pay 30p flat, or have a cap that hits before the 10,000-mile threshold), you can claim Mileage Allowance Relief on the difference. The relief is paid at your marginal tax rate: 20% basic, 40% higher, 45% additional.",
        "For example, if you do 8,000 business miles at 30p (paid by employer) instead of 45p (HMRC rate), the shortfall is £1,200. As a basic-rate taxpayer you can claim £240 back from HMRC; as a higher-rate taxpayer you get £480 back. Claim via a P87 form online or include it in your self-assessment if you already file one. The relief covers the previous four tax years, so backdated claims are possible if you missed it."
      ),
      createAnswerFirstSection(
        "What Counts as a Business Mile",
        "Only journeys made wholly in the course of business count. The commute to and from your usual workplace is not eligible, even if you use your own car. Driving from your usual office to a client site does count; driving from home directly to a client (where home is not your usual workplace) usually counts; driving from home to head office is ineligible.",
        "Keep a written record. HMRC can ask for evidence going back six years, and the burden of proof is on you. A simple mileage log in a notebook or app showing date, start postcode, end postcode, business reason and total miles is sufficient. Smartphone apps (TripCatcher, MileIQ) auto-track and categorise journeys, which is a good fit if you are doing more than 50 business journeys a year."
      ),
      createAnswerFirstSection(
        "When the AMAP Rate Is Generous (and When It Isn't)",
        "For a small petrol car (50+ MPG, low insurance, 10-year-old), 45p per mile is generous: actual running cost might be 25p to 30p, leaving you with a tax-free margin. For a large SUV or executive saloon (25 MPG, expensive insurance, recent purchase), 45p barely covers fuel and depreciation, and you may genuinely be losing money on every business mile. The flat rate is what it is; HMRC has resisted updating it for 15 years despite consultation calls.",
        "If you do 12,000 business miles a year in a large car, you receive 45p × 10,000 + 25p × 2,000 = £5,000 tax-free. Whether that is fair depends entirely on your real-world running cost. The [fuel cost calculator](/fuel-cost-calculator) helps you estimate the petrol portion alone, and the [car loan calculator](/car-loan-calculator) covers the depreciation and finance side; together they give you a realistic per-mile cost to compare against the AMAP figure."
      ),
      {
        heading: "AMAP Rates and Tax Relief Examples (2026/27)",
        table: {
          headers: ["Annual Business Miles", "AMAP Claim", "Basic Rate Relief", "Higher Rate Relief"],
          rows: [
            ["1,000 miles", "£450", "£90", "£180"],
            ["5,000 miles", "£2,250", "£450", "£900"],
            ["10,000 miles", "£4,500", "£900", "£1,800"],
            ["12,000 miles", "£5,000", "£1,000", "£2,000"],
            ["15,000 miles", "£5,750", "£1,150", "£2,300"],
            ["20,000 miles", "£7,000", "£1,400", "£2,800"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I claim mileage if I have a company car?",
        "Different rates apply. With a company car, you cannot claim AMAP because the car is not yours. Instead, HMRC publishes Advisory Fuel Rates (AFR), updated quarterly, which cover the fuel portion only (not depreciation or maintenance, since the company already covers those). Current AFR ranges from 8p to 23p per mile depending on engine size and fuel type. If you pay for fuel personally and claim back at AFR, the rate is tax-free; if your employer reimburses more than AFR, the excess is taxable."
      ),
      createFAQ(
        "Do I need fuel receipts to claim mileage?",
        "No. AMAP is a flat per-mile rate that bundles all running costs, so you do not need to itemise fuel separately. What you do need is a mileage log: date, start and end points, business purpose, total miles. HMRC can audit your claims for up to six years back, so keep the records that long. Apps like TripCatcher generate compliant logs automatically; a paper diary works too, as long as it is contemporaneous (filled in at the time, not retrofitted six months later)."
      ),
      createFAQ(
        "What if I have multiple jobs and use the same car?",
        "Each employment counts separately for AMAP purposes, but the 10,000-mile threshold is shared across all of them. You cannot claim 10,000 miles at 45p from each of two employers simultaneously. If your total business miles across all jobs exceeds 10,000, the higher rate applies until the threshold is hit, then 25p kicks in regardless of which job those miles came from. Track miles per employer separately on your claim, but apply the threshold to the total."
      ),
      createFAQ(
        "Does the AMAP rate include parking and tolls?",
        "No. AMAP only covers running costs (fuel, depreciation, insurance, maintenance, tax). Parking fees, tolls (M6 Toll, Dartford Crossing, Mersey Tunnels) and congestion charges are claimed separately as actual expenses. Keep receipts for these. Most employers reimburse them at cost. If you pay them personally and your employer doesn't, you can claim them on your self-assessment as a business expense."
      ),
      createFAQ(
        "Can sole traders use AMAP rates?",
        "Yes. Self-employed people can claim 'simplified expenses' which use the same AMAP rates as employees: 45p first 10k miles, 25p after, for cars. The alternative is claiming actual running costs (fuel receipts plus a percentage of insurance, road tax, repairs, depreciation), which involves more record-keeping but can produce a larger deduction for high-mileage or high-cost vehicles. You must use the same method for the entire ownership of any single vehicle; you cannot mix and match year-on-year."
      ),
    ],
    relatedTools: [
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
      { slug: "car-loan-calculator", label: "Car Loan Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
    ],
  },

  "petrol-vs-electric-total-cost": {
    sections: [
      createAnswerFirstSection(
        "Why the Sticker Price Is the Wrong Number to Compare",
        "EVs cost more to buy than equivalent petrol cars, often £5,000 to £10,000 more new. People stop reading at this point and assume petrol is cheaper. The actual total cost of ownership over 5 to 7 years tells a different story. EVs cost roughly 3p to 5p per mile to run on home electricity vs 14p to 18p per mile for petrol; over 12,000 miles a year that is £1,200 to £1,500 saved annually on fuel alone. Servicing is also cheaper because EVs have no oil, no spark plugs, no exhaust system and significantly less brake wear (regenerative braking).",
        "The calculator stacks all the costs side by side: purchase price, depreciation, fuel/electricity, insurance, road tax (VED), and maintenance. EVs typically pull ahead at year 4 to 6 of ownership for a typical driver doing 10,000+ miles per year. Below 8,000 miles a year, the petrol car often stays cheaper because there is not enough fuel saving to offset the higher purchase price."
      ),
      createAnswerFirstSection(
        "Home Charging Is the Killer App",
        "The whole 'EVs are cheaper to run' argument depends on home charging on an off-peak tariff. Octopus Go at 7.5p/kWh between midnight and 5am makes a 50 kWh full charge cost £3.75 and gives roughly 200 miles of range; that works out to under 2p per mile. Charging on a standard 28p/kWh tariff bumps that to about 7p per mile. Charging exclusively on public rapid chargers at 70p+ per kWh gets you to 18p per mile, which is no cheaper than petrol.",
        "If you do not have driveway parking or a way to install a wallbox, the EV economic case is much weaker. Workplace charging or supermarket destination chargers help, but they are not always available and not always free. The [EV charging time calculator](/ev-charging-time-calculator) shows how charging speeds and costs vary across the home/workplace/rapid spectrum."
      ),
      createAnswerFirstSection(
        "Depreciation Is Closer Than the Internet Says",
        "EV depreciation has been a moving target. Tesla's repeated price cuts hammered the resale value of recent Model 3s and Model Ys; some early adopters lost £15,000+ on cars they bought new in 2022. But that is a Tesla-specific story, not an EV-wide one. Mid-2020s data shows mainstream EVs (Nissan Leaf, Hyundai Kona Electric, VW ID.3) depreciating at roughly the same 50 to 60% over 3 years as equivalent petrol cars.",
        "Used EV demand is growing as more drivers consider them. Battery health is the main resale concern; cars with detailed service histories and a positive 'state of health' check (most are above 90% after 5 years) sell at a premium. Older Leafs (pre-2018) with smaller batteries hold value poorly because they are no longer practical for anything beyond local commuting. Recent models with 60+ kWh batteries are more like petrol cars in terms of resale risk."
      ),
      createAnswerFirstSection(
        "VED, Insurance and the Hidden Costs",
        "EVs paid no road tax (VED) until April 2025, when the Treasury closed the exemption. From April 2025, EVs registered after that date pay £10 first-year VED then £190/year from year 2 onwards. EVs registered before April 2025 are exempt up to 2025 then pay the standard £190 from 2026. Cars over £40,000 (which includes most new EVs) also pay an additional £410/year 'expensive car' supplement for years 2 to 6.",
        "Insurance for EVs runs slightly higher than equivalent petrols, typically by 5 to 15%. The reason is repair cost: battery replacement costs and specialist body repair (because of the structural battery pack) push claim costs up. As more EVs hit the road and more body shops are EV-certified, this gap is narrowing year-on-year. Quote both options on comparison sites before buying; the actual gap on a like-for-like basis is often smaller than expected."
      ),
      {
        heading: "Worked Example: 5-Year Total Cost (12,000 miles/year)",
        table: {
          headers: ["Cost", "Petrol (£20k)", "Electric (£35k)", "EV Saving"],
          rows: [
            ["Initial purchase", "£20,000", "£35,000", "-£15,000"],
            ["Fuel/electricity (5yr)", "£8,100", "£2,250", "+£5,850"],
            ["Insurance (5yr)", "£2,500", "£2,750", "-£250"],
            ["VED (5yr)", "£950", "£950", "£0"],
            ["Maintenance (5yr)", "£4,800", "£2,400", "+£2,400"],
            ["Depreciation (50% / 45%)", "£10,000", "£15,750", "-£5,750"],
            ["Total 5-year cost", "£26,350", "£24,100", "+£2,250"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the breakeven mileage for an EV vs petrol?",
        "Roughly 8,000 to 10,000 miles per year, with the breakeven hitting at around year 4 to 5 of ownership. Below that mileage, fuel savings do not accumulate fast enough to offset the higher purchase price within a typical ownership period. Above 15,000 miles per year, EVs pull ahead within 2 to 3 years, even on standard electricity tariffs. Company-car drivers with salary sacrifice schemes hit breakeven much faster because the BIK tax saving on EVs is enormous (2% in 2025/26 vs 25%+ for an equivalent petrol)."
      ),
      createFAQ(
        "Will my electricity bill jump if I get an EV?",
        "Yes, but less than you might fear. A typical UK home uses 2,700 kWh of electricity per year. Adding an EV doing 12,000 miles a year at 3.5 miles/kWh adds about 3,400 kWh, more than doubling household electricity usage. On a standard tariff that adds roughly £950 a year. On an off-peak EV tariff (Octopus Go at 7.5p/kWh for the EV portion), the same usage costs around £255. The cheap tariff is the entire reason EVs work financially; without it the maths is much closer."
      ),
      createFAQ(
        "How long do EV batteries last?",
        "Most EV manufacturers warranty their batteries for 8 years or 100,000 miles to retain at least 70% of original capacity. Real-world data from Tesla, Nissan and Hyundai shows typical degradation of 1 to 2% per year, so a well-treated battery should retain 80%+ capacity at 10 years. Catastrophic failure is rare; the more common pattern is gradual range loss. Replacement battery cost has fallen sharply; in 2026 it is around £6,000 to £10,000 for most mainstream EVs, vs £15,000+ a few years ago."
      ),
      createFAQ(
        "What happens to old EV batteries?",
        "Almost none go to landfill. Batteries that fall below 70% to 80% of original capacity get a second life as grid storage or domestic solar batteries; they still hold 70 to 80% of their original capacity, plenty for stationary applications. Beyond that, batteries are recycled for lithium, cobalt, nickel and copper, with recovery rates above 95% in modern recycling plants (Northvolt, Redwood Materials). The 'EV battery waste' crisis is largely a strawman; the industry has built recycling capacity ahead of the wave of end-of-life batteries."
      ),
      createFAQ(
        "Is a hybrid or plug-in hybrid cheaper than full EV?",
        "Plug-in hybrids (PHEVs) are usually the most expensive option in pure cost terms because you pay for both a petrol engine and a battery system, and most drivers do not actually charge the battery often enough to capture the savings. Independent studies (DfT, ICCT) have shown real-world PHEV economy is typically 50% worse than the official figures because owners drive on petrol when the battery is flat. Full EVs are mathematically simpler: charge cheap, drive cheap, no fuel costs to forget about. Use the EV vs petrol calculator to model your specific use case."
      ),
    ],
    relatedTools: [
      { slug: "ev-charging-time-calculator", label: "EV Charging Time Calculator" },
      { slug: "lease-vs-buy-car-calculator", label: "Lease vs Buy Car Calculator" },
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
    ],
  },

  "road-trip-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Estimate Trip Cost in Two Numbers",
        "Trip fuel cost depends on three inputs: how far you are going, how efficient your car is, and what the fuel costs. For a petrol car, the formula is distance / MPG x fuel price per litre / 4.546 (the litres-to-gallons conversion). A 500-mile trip in a car doing 45 MPG at £1.45/litre costs about £73. The calculator handles the conversion automatically, accepts both miles and kilometres, and lets you split costs across passengers for a true per-head figure on group trips.",
        "For electric cars, the maths flips: distance x kWh per mile x electricity price. A Tesla Model 3 at 0.23 kWh/mile doing 500 miles uses 115 kWh; on home charging at 28p/kWh that is £32, on rapid charging at 75p/kWh it is £86. The calculator switches between the two modes based on fuel type, which makes EV trip planning a lot more honest than just trusting the dashboard's predicted range."
      ),
      createAnswerFirstSection(
        "Real-World MPG vs the WLTP Number",
        "Manufacturer MPG figures (now WLTP, previously NEDC) are measured under controlled laboratory conditions and are roughly 20 to 30% better than real-world fuel economy. A car listed at 55 MPG combined typically returns 40 to 45 MPG in mixed UK driving. Motorway-only driving at 70 to 80 mph is worse still: the same car often returns 35 MPG at sustained motorway speeds because aerodynamic drag scales with the square of speed.",
        "Use the figure from your car's actual trip computer for the most realistic estimate; reset it on a long drive and read the average after. Failing that, real-world databases like Spritmonitor or What Car? aggregate user-reported MPG and tend to be 5 to 10% below the manufacturer number, which is a good middle ground. Underestimating MPG (assuming 35 when reality is 45) inflates the trip cost by 30%; the calculator is only as accurate as the efficiency input."
      ),
      createAnswerFirstSection(
        "Splitting Costs With Passengers",
        "On a group trip, the per-passenger cost is the trip cost divided by the number of people in the car. The calculator handles this directly: enter passengers, see cost per head. This is the number to send around the WhatsApp group when sorting out who owes the driver. £73 of fuel split four ways is £18.25 per person, which is roughly the cost of a London-to-Manchester train ticket if you booked weeks ahead.",
        "Bear in mind some passengers may eat more service-station cost than others (driver stays focused, three passengers eat £45 worth of M6 services food). Fuel-only splitting is the cleanest method; food and tolls are typically not in the per-head calculation unless explicitly added. For a multi-day trip, the [petrol vs electric total cost calculator](/petrol-vs-electric-total-cost) gives a more complete picture by including hotel and per-day vehicle wear."
      ),
      createAnswerFirstSection(
        "When to Drive vs Take the Train",
        "On a single-driver trip of 200+ miles, the train often loses on price (£100+ off-peak vs £30 of fuel) but wins on time and comfort. With 2 passengers, the car wins on price (£15 each vs £100 each by rail) and matches on time door-to-door if the destination is not a city centre. With 4 passengers, driving is dramatically cheaper and the comfort gap closes if you have a comfortable car.",
        "Add tolls, parking and congestion charges to the picture for city destinations. The Dartford Crossing is £2.50 each way; central London is the £15 ULEZ daily charge plus the £15 congestion charge plus £30+ for parking. Suddenly a £30 trip becomes £80. The calculator shows the fuel cost only; add a mental £20 to £50 for any city-centre drive to get a realistic total."
      ),
      {
        heading: "Common UK Trip Costs (Mid-Size Petrol, 45 MPG, £1.45/L)",
        table: {
          headers: ["Route", "Miles", "Fuel cost", "Per head (4 ppl)"],
          rows: [
            ["London to Manchester", "200", "£29", "£7.25"],
            ["London to Edinburgh", "405", "£59", "£14.75"],
            ["London to Cornwall", "300", "£44", "£11.00"],
            ["Birmingham to Newcastle", "210", "£31", "£7.75"],
            ["Bristol to Glasgow", "385", "£56", "£14.00"],
            ["UK end-to-end (Land's End to John o' Groats)", "874", "£128", "£32.00"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the average UK petrol price?",
        "As of April 2026, average UK unleaded is around £1.40 to £1.50 per litre, with diesel slightly higher at £1.45 to £1.55. Motorway services charge a 15p to 25p per litre premium; supermarket forecourts (Asda, Tesco, Sainsbury's, Morrisons) are typically the cheapest. Plan a long trip around a single supermarket fill-up and avoid topping up at the services unless absolutely necessary; on a 500-mile trip the difference can be £8 to £12 just from where you buy."
      ),
      createFAQ(
        "How do I find my car's actual MPG?",
        "Reset the trip computer on a long drive (a 100-mile motorway run is ideal) and read the average MPG figure when you stop. Alternatively, fill the tank completely, reset the trip, drive normally for a tank, then refill and divide the litres used by the miles driven. The brimming method is the most accurate but slightly tedious. Apps like Fuelly or AutoMate track this automatically over time and give a reliable real-world figure."
      ),
      createFAQ(
        "Does the calculator account for traffic or detours?",
        "No, it assumes a direct route. Traffic typically reduces real-world MPG by 5 to 15% because of stop-start driving. Detours add their own miles. For a realistic estimate, use Google Maps to get the actual driving distance for your route (it accounts for road choices), then enter that figure into the calculator. The fuel cost calculation is then accurate for that route at the chosen MPG."
      ),
      createFAQ(
        "Are EV trip costs really that much cheaper?",
        "Yes, when charging at home, but it depends entirely on charging mix. A 500-mile trip in a Tesla Model 3 charged at home costs roughly £32. The same trip with public rapid charging costs £85 to £95, which is comparable to a 45 MPG petrol car at £73. The EV advantage shows up when most of your charging is at home overnight; for trip-only EV use without home charging access, the financial advantage all but disappears."
      ),
      createFAQ(
        "Should I include depreciation in my trip cost?",
        "For a one-off holiday, no; the depreciation of driving 500 miles vs not driving them is too small to bother estimating (a few pounds at most for any normal car). For business travel or regular long-distance driving, yes; a typical car loses 10p to 20p of value per mile driven, which compounds over a year of trips. Use the [petrol vs electric total cost calculator](/petrol-vs-electric-total-cost) for that whole-life view."
      ),
    ],
    relatedTools: [
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
      { slug: "petrol-vs-electric-total-cost", label: "Petrol vs Electric Total Cost" },
      { slug: "ev-range-calculator", label: "EV Range Calculator" },
    ],
  },
};
