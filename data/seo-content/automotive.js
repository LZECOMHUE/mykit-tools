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

  "fuel-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Estimate the Fuel Cost of a Drive",
        "Three numbers do almost all the work: the distance you are driving, your car's MPG (or litres per 100km, or miles per kWh for an EV), and the price you are paying per litre or per kWh. Drop those in and you get total fuel needed plus the cost. With petrol around £1.45 per litre in April 2026 and a typical family car returning 45 mpg, a 200-mile round trip works out at roughly £29 in fuel; the same trip in a 24 mpg SUV is closer to £55.",
        "The calculator handles both miles and kilometres, both MPG and L/100km, and lets you set up several vehicles side by side so you can see the cost gap before deciding which one to take. The bottom line is simple: you want a low cost per mile, and that depends much more on the car you choose than on whether the trip is long or short."
      ),
      createAnswerFirstSection(
        "Petrol vs Diesel vs EV on the Same Trip",
        "On a 300-mile run, the differences are clear. A 50 mpg diesel needs about 27 litres of fuel; at £1.50 per litre that is roughly £40. A 35 mpg petrol uses 39 litres at £1.45, which is around £57. A typical EV doing 3.5 miles per kWh uses 86 kWh; at home overnight rates of around 7.5p per kWh that is just £6.50, but at public rapid rates of 80p per kWh it is £69, more than the petrol car.",
        "The headline lesson is that EV running costs swing wildly based on where you charge. With a home wallbox on an off-peak tariff, an EV is around six times cheaper to fuel per mile than petrol. Without home charging, the picture flattens; using only public rapid chargers, an EV can actually cost more per mile than a frugal diesel on the same trip."
      ),
      createAnswerFirstSection(
        "Where Fuel Costs Get Distorted",
        "The pump price you see is one of the more variable numbers in personal finance. Motorway services routinely add 15p to 25p per litre over supermarket forecourts, so on a 60-litre tank fill you can pay £15 more for the convenience. Plan a long trip around a single supermarket fill where possible, and your trip cost drops accordingly.",
        "Real-world MPG is also typically 10 to 20% lower than the official figure. The brochure number is run on a lab cycle that is gentler than real driving. To get a personal MPG figure, reset the trip computer on a 100-mile motorway run and read the average. Or fill the tank, drive a tank, refill, and divide litres used by miles. That figure, fed into the calculator, gives you a cost estimate that will match what your bank statement actually shows."
      ),
      {
        heading: "Common UK Trip Fuel Costs (April 2026 prices)",
        table: {
          headers: ["Trip", "Distance", "45 mpg petrol (£1.45/L)", "55 mpg diesel (£1.50/L)", "EV at home (7.5p/kWh)"],
          rows: [
            ["London - Manchester (return)", "400 miles", "£58", "£49", "£8.50"],
            ["Bristol - Edinburgh (one way)", "375 miles", "£55", "£46", "£8"],
            ["Cardiff - Cornwall holiday", "500 miles", "£73", "£62", "£11"],
            ["School run, daily for a year", "1,800 miles", "£263", "£221", "£39"],
            ["Average UK annual mileage", "7,400 miles", "£1,082", "£910", "£159"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What MPG should I use if I don't know my car's real figure?",
        "As a rough guide: small petrol hatchbacks (Fiesta, Polo, Corsa) average 40 to 50 mpg in real conditions; mid-size petrol saloons (Focus, Astra, Golf) average 35 to 45 mpg; family SUVs (Sportage, Tiguan, CR-V) average 28 to 38 mpg; large diesel SUVs and 4x4s (X5, Discovery) average 30 to 40 mpg. Brochure figures are typically 10 to 20% optimistic compared to mixed real-world driving."
      ),
      createFAQ(
        "How is L/100km different from MPG?",
        "MPG measures distance per fuel; L/100km measures fuel per distance. Lower L/100km is better, lower MPG is worse. Roughly: 5 L/100km = 56 mpg, 6 L/100km = 47 mpg, 7 L/100km = 40 mpg, 8 L/100km = 35 mpg, 10 L/100km = 28 mpg. The calculator converts automatically; pick whichever number your dashboard shows and it does the rest."
      ),
      createFAQ(
        "Should I include the cost of getting to the petrol station?",
        "Only if it is a meaningful detour. A 5-mile diversion to save 5p per litre on 50 litres saves £2.50 but costs around 30p in fuel for the detour, so it is still worth it. A 15-mile diversion for the same saving is closer to break-even. Use this calculator to check both routes before committing."
      ),
      createFAQ(
        "Why is my real cost higher than the calculator says?",
        "The calculator assumes a constant MPG over the whole trip. In real driving, cold starts, traffic, headwinds, and roof boxes all reduce efficiency. A loaded family car with a roof box on a windy motorway can drop 15 to 25% below brochure MPG. For holiday packing, knock 15% off the headline figure for a more honest forecast."
      ),
      createFAQ(
        "Does the calculator work for hybrids?",
        "Yes; just enter the average MPG your dashboard shows. Most hybrids report a single combined figure that accounts for both petrol and electric portions. Plug-in hybrids are trickier because efficiency depends on whether the battery is charged; for a typical PHEV with a 30-mile electric range used daily, the [petrol vs electric total cost calculator](/petrol-vs-electric-total-cost) gives a more accurate whole-life view."
      ),
    ],
    relatedTools: [
      { slug: "cost-per-mile-calculator", label: "Cost Per Mile Calculator" },
      { slug: "road-trip-cost-calculator", label: "Road Trip Cost Calculator" },
      { slug: "petrol-vs-electric-total-cost", label: "Petrol vs Electric Total Cost" },
    ],
  },

  "tyre-size-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Read a Tyre Size",
        "A tyre marking like 205/55 R16 looks cryptic but breaks down cleanly. The first number (205) is the section width in millimetres. The second (55) is the aspect ratio, the sidewall height as a percentage of the width; here that means the sidewall is 55% of 205, or about 113 mm tall. The R means radial construction (basically every modern tyre), and the 16 is the wheel diameter in inches. The calculator translates all that into millimetres: overall diameter, circumference, and how that compares to your original tyre.",
        "Why does this matter? If you swap from 205/55 R16 to 225/45 R17, the wheels look better but the rolling diameter changes slightly, and your speedometer reads off because it counts wheel rotations. A 1% diameter difference equals a 1% speedometer error; UK MoT testing allows up to 10% optimistic but no negative reading at all, so most upsizes need careful checking before they are road-legal."
      ),
      createAnswerFirstSection(
        "When Speedometer Error Becomes a Problem",
        "Speedometers are calibrated to a specific tyre rolling diameter. Fit a tyre 2% larger and the speedometer reads 2% slow: 70 mph indicated is actually 71.4 mph. Fit one 2% smaller and it reads 2% fast, which is illegal in the UK because speedometers must never under-read your true speed. The calculator shows the percentage difference between any two tyres so you can spot the issue before you buy.",
        "For winter tyres, going one size narrower with a taller sidewall is common; this gives better grip in snow without breaking speedometer accuracy. For low-profile upgrades, going up an inch in wheel size while dropping aspect ratio (the 'plus one' formula) is the standard way to keep rolling diameter constant. The tyre comparison panel shows you whether your chosen swap stays within tolerance."
      ),
      createAnswerFirstSection(
        "What Changes With Tyre Size",
        "Wider tyres (more grip in the dry, often slightly worse in standing water and at slow parking speeds, more road noise). Lower profile (better steering response, more crashy ride, much easier to kerb the alloy). Taller overall diameter (taxes the gearbox slightly, raises ride height, can hit the wheel arch on full lock). Narrower (better in snow, slightly worse braking on dry roads, lower fuel cost from less rolling resistance). The calculator shows you the geometry so you know what you are signing up for before the new tyres go on the car."
      ),
      {
        heading: "Common UK Tyre Sizes by Vehicle Type",
        table: {
          headers: ["Vehicle Type", "Typical Size", "Width (mm)", "Sidewall (mm)", "Diameter (mm)"],
          rows: [
            ["City car (Picanto, Aygo)", "175/65 R14", "175", "114", "584"],
            ["Hatchback (Fiesta, Polo)", "195/65 R15", "195", "127", "635"],
            ["Family hatch (Focus, Golf)", "205/55 R16", "205", "113", "632"],
            ["Saloon/Estate (Passat)", "215/55 R17", "215", "118", "668"],
            ["Mid-SUV (Tiguan, Sportage)", "225/55 R18", "225", "124", "706"],
            ["Large SUV (X5, Discovery)", "255/50 R19", "255", "128", "738"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I fit a different size tyre to my car?",
        "Within reason, yes. Manufacturers usually approve two or three sizes for a single car (check the tyre placard inside the driver's door). Outside that list, you must keep the rolling diameter within roughly 3% of the original, and the new size must clear suspension and bodywork on full lock. Insurance can be invalidated if you fit non-approved sizes without telling the insurer."
      ),
      createFAQ(
        "What is the 'plus one' rule?",
        "Plus one means going up one inch in wheel diameter while dropping the aspect ratio enough to keep the overall tyre diameter the same. For example, 205/55 R16 has roughly the same rolling diameter as 215/45 R17. This is the safe way to fit larger alloys without breaking the speedometer or rubbing the arches."
      ),
      createFAQ(
        "How do I find the right size for my car?",
        "Three reliable sources: the placard inside the driver's door (a small sticker showing approved sizes and pressures), the owner's manual, and the existing tyres on the car. Anything Halfords, Kwik Fit, or your local tyre fitter quotes is also fine; they will refuse to fit an obviously wrong size."
      ),
      createFAQ(
        "Will bigger tyres improve fuel economy?",
        "Usually no, often the opposite. Wider tyres add rolling resistance and weight; both lower fuel economy. Going to a taller sidewall on the same wheel can help slightly because the overall diameter rises, dropping engine RPM at motorway speed. But the difference is rarely more than 1 to 2 mpg either way, and it is dwarfed by driving style."
      ),
      createFAQ(
        "Is the speedometer reading accurate?",
        "By UK law, no speedometer may under-read your true speed (so it is always biased optimistic). Most modern cars read about 2 to 4% high straight from the factory, and tyre wear adds another 1 to 2% as the rubber thins. Use this calculator with your current tyre size to confirm; or run a phone GPS speedometer alongside the dashboard to check."
      ),
    ],
    relatedTools: [
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
      { slug: "cost-per-mile-calculator", label: "Cost Per Mile Calculator" },
      { slug: "car-tax-checker", label: "Car Tax Checker" },
    ],
  },

  "car-loan-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Car Finance Actually Works",
        "Most UK car finance is a fixed-rate, fixed-term agreement: you borrow the price minus your deposit, pay interest on the balance, and clear it over 36 to 84 months. On a £25,000 car with a £5,000 deposit and 4.5% APR over 60 months, you borrow £20,000, pay roughly £373 a month, and end up paying about £2,388 in interest on top of the principal. The calculator works out monthly payment, total interest, and total cost for any combination of those numbers.",
        "The single biggest factor is the interest rate. The same £20,000 loan at 8.5% costs £410 a month and £4,580 in interest, almost double. Always check the APR rather than the headline rate; APR includes fees, so it is the only fair like-for-like figure between dealers and manufacturer finance offers."
      ),
      createAnswerFirstSection(
        "PCP vs HP vs Personal Loan",
        "PCP (Personal Contract Purchase) splits the cost into deposit, monthly payments, and a final balloon payment to own the car outright. Monthly payments are lower because you are only paying off the depreciation, not the whole car. HP (Hire Purchase) is a traditional loan: you pay the whole car off in equal monthly instalments and own it at the end. A personal loan from a bank is similar to HP but the car is yours from day one and the bank is not interested in what the money was for.",
        "PCP is the cheapest monthly payment but you do not own the car at the end unless you pay the balloon (typically £8,000 to £15,000 on a £25,000 car). HP and personal loan are higher monthly but you own the car when the term ends. The calculator on this page is set up for HP/personal loan style fixed payments. For PCP comparisons, compare the monthly payment plus the final balloon as a separate decision."
      ),
      createAnswerFirstSection(
        "How Big a Deposit Should You Put Down?",
        "More deposit means lower monthly payment and less total interest, but tying up cash that could earn 4 to 5% in a savings account is also a cost. The sweet spot is usually 10 to 20% of the car price, enough that the loan starts in equity (you owe less than the car is worth) and stays there even after first-year depreciation. A new car loses 15 to 25% of its value in year one, so a 10% deposit on a brand new car still leaves you slightly upside down at month 12.",
        "If the car is two or three years old, a smaller deposit is fine because depreciation has already slowed. The calculator's deposit percentage shortcut buttons (10%, 20%, 30%) make it easy to see how monthly payment shifts. As a rule of thumb, every 10% increase in deposit drops the monthly payment by roughly 10% on the same term."
      ),
      {
        heading: "£20,000 Loan Monthly Payments by Term and Rate",
        table: {
          headers: ["Term", "4.0% APR", "5.5% APR", "7.0% APR", "9.0% APR"],
          rows: [
            ["36 months", "£590", "£604", "£617", "£636"],
            ["48 months", "£451", "£465", "£479", "£497"],
            ["60 months", "£368", "£382", "£396", "£415"],
            ["72 months", "£313", "£327", "£341", "£361"],
            ["84 months", "£273", "£287", "£302", "£322"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What APR should I expect on car finance in 2026?",
        "Manufacturer 0% deals appear from time to time on slow-selling models, but typical mainstream rates in April 2026 are 6 to 9% APR through dealers, 5 to 7% through banks for personal loans, and 4 to 6% from credit unions if you are a member. Always check personal loan rates against PCP/HP; banks are often cheaper than dealers for buyers with strong credit history."
      ),
      createFAQ(
        "Should I take a longer term to lower my monthly payment?",
        "Only if the alternative is genuinely unaffordable. Stretching from 60 months to 84 months drops a £20,000 loan from £382 to £287 per month at 5.5% APR, but you pay £1,160 more in total interest. You also keep paying for a car that may be at the end of its useful life by the time you finish. 48 to 60 months is the realistic sweet spot for new cars; 36 months is sometimes possible for used."
      ),
      createFAQ(
        "Can I pay off the loan early?",
        "Yes, on almost all UK car finance. By law, lenders must accept a full or partial early settlement, though some apply a 1 to 2% early settlement charge to recover some of the lost interest. Always check the early settlement quote rather than just multiplying the remaining payments; the figure is usually lower because you are no longer paying future interest."
      ),
      createFAQ(
        "What is GAP insurance and do I need it?",
        "GAP (Guaranteed Asset Protection) covers the gap between your insurer's payout if the car is written off and the amount still outstanding on the finance. Useful in the first 18 to 24 months of a new car loan when depreciation outruns the loan balance. After that, the finance balance usually drops below market value and GAP becomes unnecessary. Bank-arranged GAP is typically half the price of dealer-arranged GAP."
      ),
      createFAQ(
        "Does the calculator include road tax and insurance?",
        "No, only the loan element (principal, monthly payment, total interest, total cost). Road tax (VED), insurance, fuel and maintenance are separate. For total running costs, add those to the loan figure or use the [cost per mile calculator](/cost-per-mile-calculator) to see the all-in number."
      ),
    ],
    relatedTools: [
      { slug: "lease-vs-buy-car-calculator", label: "Lease vs Buy Car Calculator" },
      { slug: "cost-per-mile-calculator", label: "Cost Per Mile Calculator" },
      { slug: "should-i-keep-my-old-car", label: "Should I Keep My Old Car" },
    ],
  },

  "ev-vs-petrol-company-car": {
    sections: [
      createAnswerFirstSection(
        "Why EV Company Cars Are So Much Cheaper Right Now",
        "The Benefit-in-Kind (BiK) tax rate on electric company cars is 2% for 2025/26, rising to 3% in 2026/27 and 4% in 2027/28. A petrol car emitting 140 g/km of CO2 sits at around 33% BiK. On a £35,000 car, that is the difference between £700 of taxable benefit (EV) and £11,550 (petrol). For a 40% taxpayer, that converts to £280 a year in tax for the EV vs £4,620 for the petrol, a £4,340 annual saving before fuel even enters the picture.",
        "The calculator pulls all this together: BiK tax for both cars at your tax rate, fuel cost across your annual mileage, and the side-by-side annual and 3-year totals. The headline saving is rarely small. For most company car drivers in 2026, an EV beats petrol by £3,000 to £6,000 a year on total cost, which makes the choice straightforward unless your usage genuinely does not work for an EV."
      ),
      createAnswerFirstSection(
        "When the EV Numbers Stop Working",
        "The model assumes home charging at around 28p per kWh, or off-peak rates of 7p to 10p per kWh. If you cannot charge at home (street parker, flat without a wallbox, no workplace charging), the picture changes. Public rapid charging at 80p per kWh on 12,000 miles a year costs around £2,750, vs £960 at home rates and roughly £1,800 in petrol for a 45 mpg saloon. The EV loses its fuel-cost advantage and you keep only the BiK saving.",
        "Long-distance work also matters. A 25,000-mile-a-year sales rep doing daily 200-mile trips needs charging stops every 150 to 200 miles, and the cost difference vs a frugal diesel narrows further. The calculator lets you set realistic miles per kWh (typically 3.0 to 4.0 in mixed UK conditions) and electricity cost so you can stress-test the assumption against your actual driving."
      ),
      createAnswerFirstSection(
        "The 3-Year Total Is the Real Number",
        "Company cars are usually run for 3 to 4 years. Over that horizon, a typical comparison looks like this: an EV at £35,000 P11D, 2% BiK rising over the term, charged mostly at home, returning roughly £4,000 per year of tax + fuel. A petrol at £28,000 P11D, 33% BiK, returning around £8,500 per year. The 3-year totals come out to roughly £12,000 vs £25,500, a £13,500 saving over three years.",
        "That margin shrinks if BiK rates rise faster than expected (the government has signalled this through 2030), if fuel prices drop sharply, or if your real-world EV efficiency is worse than headline figures. The [salary sacrifice car calculator](/salary-sacrifice-car-calculator) shows how the same EV looks under salary sacrifice rather than traditional company car arrangements; for many employees the salary sacrifice route is even better."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the EV BiK rate for 2026/27?",
        "3% for fully electric vehicles in 2026/27, rising to 4% in 2027/28 and 5% in 2028/29. Even at 5%, an EV is dramatically cheaper as a company car than a petrol equivalent at 25 to 35% BiK. The advantage shrinks but does not disappear, and for company cars taken on now, the rate locks in for the duration of the lease in most cases."
      ),
      createFAQ(
        "How does the calculator estimate EV fuel cost?",
        "Annual mileage divided by miles per kWh, multiplied by your electricity cost. Default values are 3.5 miles per kWh (mixed driving for a typical mid-size EV) and 28p per kWh (standard UK home rate). Set your real-world figures to get an accurate comparison. Off-peak overnight rates of 7p to 10p make EVs roughly six times cheaper to fuel than a 45 mpg petrol; standard daytime rates make them around three times cheaper."
      ),
      createFAQ(
        "Does the comparison include road tax?",
        "Not currently. EVs paid no Vehicle Excise Duty until April 2025; from April 2025 they pay the standard rate (£190 in 2025/26) plus a £390 'expensive car supplement' for cars with a list price over £40,000. Add £190 to £580 a year to the petrol car to make the comparison apples-to-apples; it does not change the conclusion much because the BiK saving still dwarfs VED."
      ),
      createFAQ(
        "What if the company pays for fuel?",
        "If your employer reimburses fuel, the picture changes because petrol fuel benefit is also taxed (using a fixed multiplier based on CO2 emissions). EV electricity reimbursement is not currently classed as a fuel benefit if claimed under HMRC's Approved Mileage Allowance Payments at the special EV rate. This is an area where the calculator's defaults assume you pay your own fuel; if your employer reimburses, the saving is even larger because the petrol fuel benefit tax is removed too."
      ),
      createFAQ(
        "Can I get a salary sacrifice EV?",
        "Yes, this is a popular route. Through a salary sacrifice scheme, the lease cost comes out of your gross salary (saving income tax and National Insurance) and you only pay the small BiK charge. Effective monthly cost is often 30 to 40% lower than a personal lease. Check whether your employer participates in a scheme like Octopus Electric Vehicles, Tusker, or Loveelectric."
      ),
    ],
    relatedTools: [
      { slug: "salary-sacrifice-car-calculator", label: "Salary Sacrifice Car Calculator" },
      { slug: "company-car-tax-calculator", label: "Company Car Tax Calculator" },
      { slug: "petrol-vs-electric-total-cost", label: "Petrol vs Electric Total Cost" },
    ],
  },

  "salary-sacrifice-car-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Salary Sacrifice Cars Work",
        "Your employer leases the car and the lease payment comes out of your gross salary before income tax and National Insurance are deducted. On a £450 a month lease, a 40% taxpayer effectively pays around £270 a month after tax savings, because the £450 is no longer in their taxable income. You then pay a small Benefit-in-Kind tax charge on the company car, which for an electric vehicle is 2% rising to 5% by 2028/29. For an EV at £35,000 list price, the BiK tax is roughly £30 a month for a 40% taxpayer. So a £450 lease can cost £300 in real money, monthly.",
        "The catch is that this only works well for low-emission vehicles. Petrol and diesel cars carry BiK rates of 25 to 37%, which destroys the saving. The maths effectively means salary sacrifice in 2026 is an EV scheme; trying to do it with a petrol family car gives you most of the lease cost back as BiK tax and the saving disappears."
      ),
      createAnswerFirstSection(
        "When the Saving Is Biggest",
        "The higher your tax band, the better salary sacrifice gets. A 20% basic rate taxpayer saves 20% income tax + 8% National Insurance = 28% on each pound sacrificed. A 40% taxpayer saves 40% + 2% NI = 42%. A 45% additional rate taxpayer saves 47%. So on the same £450 lease, a basic rate payer saves £126 a month, a higher rate payer saves £189, and an additional rate payer saves £211.",
        "The tradeoff is that the sacrifice reduces the salary your pension, mortgage application, and life insurance use as inputs. For most people on a 3 to 4 year lease this is fine, but if you are about to apply for a mortgage, lenders will use the post-sacrifice salary, which can drop the loan amount you qualify for. Plan the timing around big life events accordingly."
      ),
      createAnswerFirstSection(
        "What the Calculator Does",
        "It takes your gross salary, the car's P11D value, the monthly lease cost, and your tax band, then works out: gross sacrifice (annual lease cost), income tax relief, National Insurance relief, BiK tax cost on the car, and your net monthly cost after all the moving parts. The bottom line is the 'true monthly cost' you actually feel in your bank account, which for an EV salary sacrifice typically lands at 50 to 65% of the headline lease price.",
        "Compare that to a personal lease where you would pay the full £450 from post-tax salary, which for a 40% taxpayer requires around £775 of pre-tax earnings. That puts the salary sacrifice route at a saving of £475 a month, or £5,700 a year, against the equivalent personal lease. For an EV in particular, this is the most cost-efficient way to drive a new car in the UK in 2026."
      ),
      {
        heading: "Typical Salary Sacrifice EV Examples",
        table: {
          headers: ["Car", "Lease/month", "20% taxpayer", "40% taxpayer", "45% taxpayer"],
          rows: [
            ["MG4 Standard", "£330", "£250", "£202", "£185"],
            ["Tesla Model 3", "£450", "£340", "£275", "£253"],
            ["Polestar 2", "£480", "£362", "£293", "£269"],
            ["Hyundai Ioniq 5", "£520", "£392", "£317", "£292"],
            ["BMW i4", "£610", "£460", "£372", "£342"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Will my employer offer this?",
        "Larger employers often do, particularly NHS Trusts, councils, universities, and any company with 100+ employees. Smaller companies may not, but the setup cost is low if there is enough employee interest. Ask HR; common providers are Octopus Electric Vehicles, Tusker, ElectriX, and Loveelectric."
      ),
      createFAQ(
        "What happens if I leave the company?",
        "Most schemes have an early termination charge if you leave during the lease (typically 4 to 12 months of payments). Some employers absorb this for redundancy or maternity leave; others pass it on. Check the scheme's early exit terms before signing; this is the biggest risk of salary sacrifice and it has caught out leavers in the past."
      ),
      createFAQ(
        "Is salary sacrifice better than buying outright?",
        "It depends on cash position and how often you change cars. If you have £30,000+ available and plan to keep the car 7+ years, buying outright is usually cheaper because you skip lease interest and the lease company's profit margin. If you change cars every 2 to 4 years and want predictable monthly costs, salary sacrifice almost always wins on EVs because of the BiK tax break."
      ),
      createFAQ(
        "Does the saving include insurance and maintenance?",
        "Most salary sacrifice EV schemes bundle in fully comprehensive insurance, maintenance, MoT, breakdown, and tyres. The headline monthly figure is therefore close to the total cost of running the car, fuel aside. Check the scheme details; if any of these are excluded, add £80 to £150 a month for insurance and £30 to £50 a month for tyres and maintenance to get the full picture."
      ),
      createFAQ(
        "How does this compare to a company car?",
        "Salary sacrifice and traditional company car taxation work the same way for BiK; the difference is who pays. Salary sacrifice = you pay the lease via gross salary deduction. Company car = employer pays the lease and you pay BiK tax. Salary sacrifice gives you tax relief on the lease cost; company car does not. So salary sacrifice is usually better for the employee, while company car is usually better for senior staff who would not personally pay £400 to £600 a month otherwise."
      ),
    ],
    relatedTools: [
      { slug: "ev-vs-petrol-company-car", label: "EV vs Petrol Company Car" },
      { slug: "company-car-tax-calculator", label: "Company Car Tax Calculator" },
      { slug: "lease-vs-buy-car-calculator", label: "Lease vs Buy Car Calculator" },
    ],
  },

  "cost-per-mile-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Cost Per Mile Actually Includes",
        "There is a quick version (fuel only) and a real version (fuel, insurance, road tax, depreciation, tyres, servicing, MoT). This calculator focuses on the fuel-cost-per-mile, which is the figure that reacts to pump price changes and is the easiest to compare across vehicles. At April 2026 prices: a 45 mpg petrol at £1.45 per litre costs around 14.5p per mile in fuel. A 55 mpg diesel at £1.50 per litre is around 12.4p per mile. An EV at 3.5 miles per kWh charging at home (28p) is 8p per mile; at off-peak rates of 8p per kWh it drops to 2.3p per mile.",
        "For business mileage claimed against tax, HMRC's Approved Mileage Allowance Payment (AMAP) rates are 45p per mile for the first 10,000 business miles and 25p per mile beyond that, regardless of fuel type. Compare that to your actual fuel cost per mile and you can see whether claiming AMAP comes out ahead of having the company reimburse actual fuel."
      ),
      createAnswerFirstSection(
        "The HMRC AMAP Comparison",
        "If your fuel cost per mile is below 45p (which it almost always is), claiming AMAP rather than billing actual costs gives you free margin against tax. On 8,000 business miles in a 45 mpg petrol, AMAP returns £3,600 in tax-free reimbursement; the actual fuel cost is roughly £1,160. The difference (£2,440) is yours to keep, and is meant to cover the wider running costs (insurance, depreciation, servicing) that the bare fuel figure misses.",
        "For an EV, the gap is larger still. 8,000 miles at home charging rates of 8p per mile is £640 in fuel; AMAP is £3,600. EVs do have lower wear-and-tear and almost zero servicing, so this difference is real margin. Note the special HMRC EV reimbursement rate (currently 7p per mile for fuel-only reimbursement when an employer pays) is separate from AMAP, and is what employers use to refund EV mileage without a tax cost to the employee."
      ),
      createAnswerFirstSection(
        "Total Cost Per Mile, Not Just Fuel",
        "For a fuller picture, add: depreciation (£0.10 to £0.20 per mile for new cars in the first 3 years, falling to £0.03 to £0.05 for older used cars); insurance (£300 to £900 a year divided by your annual mileage); road tax (£0 to £580 depending on car age and emissions); maintenance and tyres (£300 to £600 a year for an average family car, less for an EV).",
        "A typical petrol family car covering 10,000 miles a year ends up around 35 to 45p total cost per mile when everything is included, which is exactly why HMRC's 45p AMAP figure exists. EVs come in lower at around 25 to 35p total cost per mile if you have home charging. The fuel calculator on this page is the starting figure; layer the rest on top to find the all-in number."
      ),
      {
        heading: "Fuel Cost Per Mile by Vehicle Type (April 2026 prices)",
        table: {
          headers: ["Vehicle", "Efficiency", "Fuel Price", "Cost per mile"],
          rows: [
            ["Diesel saloon", "55 mpg", "£1.50/L", "12.4p"],
            ["Petrol hatchback", "45 mpg", "£1.45/L", "14.6p"],
            ["Petrol family SUV", "32 mpg", "£1.45/L", "20.6p"],
            ["Hybrid (Toyota Prius)", "65 mpg", "£1.45/L", "10.1p"],
            ["EV at home (28p/kWh)", "3.5 mi/kWh", "£0.28/kWh", "8.0p"],
            ["EV at off-peak (7.5p/kWh)", "3.5 mi/kWh", "£0.075/kWh", "2.1p"],
            ["EV at public rapid (80p/kWh)", "3.5 mi/kWh", "£0.80/kWh", "22.9p"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is HMRC's 45p per mile generous or stingy?",
        "Generous for fuel-only costs (which are typically 10 to 25p per mile depending on car), but realistic when you include insurance, depreciation and servicing. The 45p rate has not changed since 2011/12, so in real terms it has gradually fallen behind inflation and rising fuel prices. For owners of efficient cars driving moderate annual mileage, AMAP is still a useful tax break."
      ),
      createFAQ(
        "Should I claim AMAP or have my employer reimburse fuel?",
        "AMAP if your actual fuel cost is under 45p per mile, which it nearly always is. If your employer pays a fuel-only rate (typically the HMRC Advisory Fuel Rates of around 13 to 18p per mile depending on engine size), you can still claim the difference up to 45p as Mileage Allowance Relief on your self-assessment tax return."
      ),
      createFAQ(
        "Does the calculator handle electric cars?",
        "Yes. Set fuel type to Electric, enter your miles per kWh (typical 3.0 to 4.0 for mid-size EVs in mixed UK conditions), and your electricity cost. Home rates of 28p per kWh produce around 8p per mile; off-peak overnight tariffs of 7 to 10p per kWh drop that to 2 to 3p per mile."
      ),
      createFAQ(
        "What is the average UK car's cost per mile?",
        "Around 14 to 18p per mile for fuel only, on a typical family petrol or diesel car. Including insurance, road tax, depreciation, servicing and tyres, the all-in figure is closer to 35 to 45p per mile. The HMRC AMAP rate of 45p effectively assumes that all-in figure when reimbursing business mileage."
      ),
      createFAQ(
        "Why is rapid-charged EV mileage so expensive?",
        "Public rapid chargers in 2026 commonly cost 70p to 90p per kWh, three to four times the home rate. At 80p per kWh, an EV at 3.5 miles per kWh costs 22.9p per mile, more than most petrol family cars. Rapid charging is a top-up tool for long trips, not a daily fuelling source; if you cannot charge at home, the EV cost case is much weaker."
      ),
    ],
    relatedTools: [
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
      { slug: "mileage-reimbursement-calculator", label: "Mileage Reimbursement Calculator" },
      { slug: "petrol-vs-electric-total-cost", label: "Petrol vs Electric Total Cost" },
    ],
  },

  "ev-range-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why WLTP Range Is Optimistic",
        "The WLTP figure on the brochure is run on a test cycle at mild temperatures with no accessories on, no roof box, no headwinds, and a gentle acceleration profile. Real driving rarely matches that, especially in UK weather. As a rule of thumb, expect around 85% of WLTP in summer mixed driving, 70% in cold winter motorway driving, and as low as 60% in extreme cold with the heater on full. A 300-mile WLTP car typically delivers 200 to 270 real-world miles depending on conditions.",
        "The calculator applies derating factors for driving condition (city, mixed, motorway), temperature, accessory use (heating draws around 2 to 3 kW continuously, AC about 1 kW), and vehicle load. Combine these and you get a realistic range figure for your actual journey rather than the lab-test number."
      ),
      createAnswerFirstSection(
        "Cold Weather Is the Biggest Factor",
        "Lithium-ion battery chemistry simply does not perform as well below 5°C. Internal resistance rises, the heat pump or resistive heater draws cabin warmth from the battery itself, and you lose 25 to 30% of usable range vs the same drive in mild weather. A 250-mile WLTP EV that returns 220 miles in spring may only do 160 to 180 miles on a frosty January motorway run.",
        "Heat pumps mitigate this significantly. An EV with a heat pump (Tesla Model 3, Polestar 2, Hyundai Ioniq 5, most newer mainstream EVs) loses around 10 to 15% in the cold; one with resistive heating only (older Nissan Leaf, some entry trims of newer cars) loses 25 to 35%. If you are buying an EV for UK winter use, a heat pump is genuinely worth paying extra for."
      ),
      createAnswerFirstSection(
        "Motorway Speed Is the Second Biggest Factor",
        "Aerodynamic drag scales with the cube of speed. At 70 mph, an EV uses roughly 35 to 40% more energy per mile than at 40 mph in town. The 'motorway' setting in the calculator applies a 30% derating because the energy needed to push through the air rises rapidly above 60 mph.",
        "This is why EV road trip stops are spaced around 130 to 180 miles in real motorway driving rather than the brochure 250 to 300. Slowing down 5 mph (from 75 to 70) gives back 10 to 15% of range for a small time penalty; on a long trip, that can save a charging stop. Compare against [petrol vs electric total cost calculator](/petrol-vs-electric-total-cost) to see how this affects total trip cost."
      ),
      {
        heading: "Realistic Range from a 60 kWh Battery (300-mile WLTP car)",
        table: {
          headers: ["Conditions", "Multiplier", "Realistic Range"],
          rows: [
            ["Summer city driving (mild, no AC)", "0.95×", "285 miles"],
            ["Summer mixed driving", "0.85×", "255 miles"],
            ["Mild motorway (15°C)", "0.70×", "210 miles"],
            ["Winter mixed (cold, heater on)", "0.65×", "195 miles"],
            ["Cold motorway (0°C, heater)", "0.55×", "165 miles"],
            ["Extreme cold (−5°C, heater, headwind)", "0.45×", "135 miles"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How much does a roof box cost in range?",
        "A standard roof box typically costs 10 to 20% of range at motorway speed because it disrupts the car's aerodynamics significantly. A bike rack on the roof or back is similar. An EV that does 250 miles unloaded might do 200 to 225 with the box on. The penalty drops sharply at slower speeds; in town driving, the loss is closer to 5%."
      ),
      createFAQ(
        "Does air conditioning use less energy than heating?",
        "Yes, by a significant margin. AC typically draws 0.5 to 1.5 kW; resistive heating draws 3 to 7 kW. A heat pump cuts heating draw to 1 to 3 kW. In summer with AC, expect around 5% range loss; in winter with resistive heating in cold weather, expect 20 to 30% loss. Pre-conditioning the cabin while still plugged into the wallbox softens this by using grid power instead of battery power."
      ),
      createFAQ(
        "Does the calculator work for any EV?",
        "Yes. Enter battery capacity in kWh and WLTP range; the tool calculates efficiency (miles per kWh) automatically. From there, the derating factors apply regardless of make. Tesla, Hyundai, MG, Polestar, BMW, Audi all behave similarly under the same conditions. The exception is brand-new ultra-efficient EVs (Hyundai Ioniq 6 long range, Tesla Model 3 Highland), which can outperform older cars by 10 to 15% on the same battery size."
      ),
      createFAQ(
        "What about regenerative braking?",
        "Regen recovers around 20 to 30% of the energy used to accelerate, which is already baked into the WLTP figure and into real-world miles per kWh. The calculator does not need a separate regen input; it is captured in the underlying efficiency you provide. Regen is most useful in city driving and least useful at constant motorway speed, which is one reason motorway range is shorter even before accounting for aerodynamic drag."
      ),
      createFAQ(
        "Can I rely on the trip computer's predicted range?",
        "Mostly. Modern EV trip computers learn from your driving style and weather over recent days and produce a fairly accurate prediction. They struggle when conditions change abruptly (sudden cold snap, motorway after a week of city driving, headwind appearing on a long trip). For trip planning, use this calculator with worst-case conditions for your route, then add a 20% buffer; that lands you at the next charger with comfortable margin."
      ),
    ],
    relatedTools: [
      { slug: "ev-charging-time-calculator", label: "EV Charging Time Calculator" },
      { slug: "petrol-vs-electric-total-cost", label: "Petrol vs Electric Total Cost" },
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
    ],
  },

  "should-i-keep-my-old-car": {
    sections: [
      createAnswerFirstSection(
        "The Maths Behind Keep vs Replace",
        "An old car has the lowest possible monthly cost: nothing on finance, low road tax (or zero for very old cars), insurance often £20 to £50 cheaper a month than a new equivalent, and depreciation already taken. Repairs and a slightly higher fuel bill are the offsetting costs. A new car has the opposite profile: high monthly finance, fresh depreciation eating £200 to £400 a month, low fuel and maintenance, full warranty cover.",
        "The break-even is simpler than people think. Add up: annual repairs + annual fuel + annual insurance + annual road tax for the old car. Compare against: annual finance + annual fuel + annual insurance + annual road tax for the new car (depreciation is already inside the finance number for a sensible 36 to 60 month deal). When the old-car total exceeds the new-car total, replacement is cheaper. Most cars cross this line somewhere between 12 and 18 years old, depending on annual mileage and reliability."
      ),
      createAnswerFirstSection(
        "When Repairs Tip the Decision",
        "A single £1,200 repair on a 14-year-old car feels enormous, but spread across 24 months of avoided £400 finance payments, it is actually £350 a month of saved cost vs new. The number to watch is annual repair spend rather than individual bills. Once your annual repair bill regularly exceeds the annual depreciation of an equivalent new (or newer used) car, the old car is genuinely costing more to keep.",
        "Use the calculator's break-even repair figure: it shows how high annual repairs would need to climb before replacement becomes cheaper. For a 12-year-old £4,000 car against a £25,000 new replacement at £400 a month, the break-even is typically £3,000 to £4,000 per year in repairs. Below that, keeping the car wins; above that, replacing wins."
      ),
      createAnswerFirstSection(
        "The Hidden Costs People Forget",
        "Insurance often drops every year on an older car as its value falls; new cars have higher premiums for years. Road tax (VED) on cars registered before April 2017 can be substantially lower than on new cars, particularly for low-displacement engines. ULEZ and clean-air zones are the opposite story: pre-2015 petrol and pre-2016 diesel cars pay £12.50 a day in London ULEZ and similar charges in Birmingham and Bristol Clean Air Zones, which adds up to around £4,500 a year for a London commuter; that alone funds a newer compliant car.",
        "Reliability risk is harder to quantify but real. A 15-year-old car that has been well-maintained will probably keep going for years; one with a patchy service history can develop expensive problems suddenly. The break-even calculation assumes average repair costs; if your car is on borrowed time, the actual cost can spike unpredictably. The right answer is often to set aside a 'repair reserve' equal to 6 months of new-car finance costs, and replace if a single repair would consume more than that."
      ),
      {
        heading: "Typical UK Old Car vs New Car Annual Cost (£25,000 replacement)",
        table: {
          headers: ["Category", "10-year-old £4k car", "New £25k car"],
          rows: [
            ["Finance/depreciation", "£0 (depreciation done)", "£4,800 (60-month loan)"],
            ["Fuel (10k miles, 35 mpg vs 50 mpg)", "£1,860", "£1,300"],
            ["Insurance", "£480", "£720"],
            ["Road tax", "£200", "£190"],
            ["Repairs and servicing", "£1,200", "£200 (in warranty)"],
            ["MoT", "£55", "£0 (first 3 years)"],
            ["Annual total", "£3,795", "£7,210"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the average lifespan of a UK car?",
        "Around 14 years and 150,000 miles on the road, though many well-maintained cars run for 200,000+ miles. Japanese makes (Toyota, Honda, Mazda) and German diesels (BMW 320d, Mercedes E-Class) are the longest-living mainstream choices. American and French cars typically retire 2 to 3 years earlier on average. The brand of the car you currently own is one of the strongest predictors of how long it will keep going at low repair cost."
      ),
      createFAQ(
        "Is it worth fixing an old car or scrapping it?",
        "If the repair cost is more than 50% of the car's market value, scrapping or selling for parts is usually the cheaper move. A £1,500 repair on a £4,000 car is reasonable; a £2,500 repair on a £3,000 car is almost always not. Get a price for the repair, look up the car's market value on Auto Trader's valuation tool, and apply the 50% rule."
      ),
      createFAQ(
        "Does ULEZ change the maths?",
        "Yes, dramatically, if you drive in London regularly. A non-compliant car in ULEZ costs £12.50 a day. At 5 days a week of London driving that is £3,250 a year, which on its own funds a 4-year-old compliant car at around £200 a month finance. If you live in a ULEZ-affected area and your car is non-compliant, replacement is almost always financially obvious."
      ),
      createFAQ(
        "Should I trade in or sell privately?",
        "Selling privately on Auto Trader, eBay or Gumtree typically nets 15 to 25% more than trade-in value, though it takes more effort. For cars worth under £2,000 the difference shrinks because dealers are less aggressive on low-value trade-ins. Webuyanycar and Motorway are middle-ground options: less hassle than private, slightly better prices than dealer trade-in."
      ),
      createFAQ(
        "What about going used instead of new?",
        "A 2 to 3 year old used car with 20,000 to 30,000 miles is the strongest value proposition in the UK car market. You skip the worst of the depreciation (which the first owner has paid), still get decent reliability and a part-warranty in some cases, and pay 30 to 50% less than new. The calculator compares against any replacement cost, so you can model new vs used vs keep on equal footing."
      ),
    ],
    relatedTools: [
      { slug: "car-loan-calculator", label: "Car Loan Calculator" },
      { slug: "lease-vs-buy-car-calculator", label: "Lease vs Buy Car Calculator" },
      { slug: "cost-per-mile-calculator", label: "Cost Per Mile Calculator" },
    ],
  },
};
