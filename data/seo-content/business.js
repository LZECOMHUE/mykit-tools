// SEO content for business and ecommerce tools
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const businessSEO = {
  "amazon-fba-calculator": {
    sections: [
      createAnswerFirstSection(
        "Understanding Amazon FBA Fees in the UK",
        "Selling on Amazon via FBA (Fulfilment by Amazon) involves two main fees: the Referral Fee and the Fulfilment Fee. The Referral Fee is Amazon's commission for selling on their marketplace, usually ranging from 8% to 15% depending on the exact product category.",
        "The Fulfilment Fee covers the cost of Amazon picking, packing, and shipping your product to the customer. This fee is strictly determined by the dimensions and weight of your item. Larger, heavier items incur significantly higher fulfilment costs."
      ),
      createAnswerFirstSection(
        "Hidden FBA Costs to Watch Out For",
        "Beyond the standard referral and fulfilment fees, sellers must also account for Monthly Storage Fees, which are charged per cubic foot of space your inventory occupies in Amazon's warehouses. These storage fees triple during the Q4 peak season (October to December).",
        "If your inventory sits unsold for over 331 days, you will also be hit with Long-Term Storage Fees. Using an accurate Amazon FBA Calculator is essential for pricing your products correctly and protecting your profit margins."
      )
    ],
    faqs: [
      createFAQ(
        "What are the Amazon seller fees in the UK for 2026?",
        "Amazon frequently updates their fee structures. In the UK, standard referral fees hover around 15.3% for most categories (including the 2% Digital Services Tax). Fulfilment fees have shifted towards more granular weight and dimension tiers. Use this calculator to get exact, up-to-date fee estimates based on your product's size."
      ),
      createFAQ(
        "Is Amazon FBA still profitable in the UK?",
        "Yes, Amazon FBA can still be highly profitable, but strict margin control is required. You must accurately factor in manufacturing costs, shipping to the fulfilment centre, VAT, Amazon referral fees, and FBA fulfilment fees to ensure a healthy net profit margin."
      ),
      createFAQ(
        "How do eBay selling fees compare to Amazon FBA?",
        "eBay generally charges a single final value fee (around 10-12% plus a fixed 30p charge) and does not handle fulfilment. Amazon FBA charges higher total fees but handles the entire logistics and customer service process, typically resulting in much higher sales volume due to Prime eligibility."
      )
    ],
    relatedTools: [
      { slug: "ebay-fee-calculator", label: "eBay Fee Calculator" },
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" }
    ]
  },

  "employee-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "The True Cost of an Employee",
        "When hiring a new employee, their gross salary is only the starting point. As an employer, you must also pay national insurance (or payroll taxes depending on your country), mandatory pension contributions, software licences, office space, and benefits.",
        "A typical rule of thumb is that an employee actually costs an employer 1.25 to 1.4 times their base salary. Our cost of employment calculator breaks this down precisely to help you budget for new hires without unexpected surprises down the line."
      ),
      createAnswerFirstSection(
        "Employer National Insurance (April 2026 Updates)",
        "The cost of employing staff in the UK increased dramatically in April 2026. The rate of Employer National Insurance Contributions (NICs) was hiked from 13.8% to 15%. Additionally, the secondary threshold - the point at which employers start paying this tax - was slashed from £9,100 to just £5,000 per year.",
        "This means employers must now pay a 15% tax on almost all earnings above £5,000. For an employee earning £35,000, the employer NI bill is now £4,500 per year. Factoring these new rates into your hiring budget is critical to avoid cash flow shock."
      ),
      createAnswerFirstSection(
        "The Hidden Costs of Employment",
        "Beyond base salary, NI, and pension (usually 3%), there are dozens of hidden costs that push the true employment cost to roughly 1.4x the base salary. These include:",
        "Software licenses (Google Workspace, Microsoft 365, industry-specific tools), hardware (laptops, monitors), office space and utilities, insurance (Employer's Liability), recruitment fees, onboarding time, statutory leave (holiday pay), and non-productive time (sick days)."
      )
    ],
    faqs: [
      createFAQ(
        "How much does it cost to employ someone in Australia?",
        "In Australia, on top of the base salary, employers must legally pay an 11.5% Superannuation Guarantee (rising to 12% by July 2026) and state-based Payroll Tax if your total wage bill exceeds the threshold. You must also factor in Worker's Compensation insurance and leave loading."
      ),
      createFAQ(
        "What are the employer costs in the UK?",
        "In the UK, the major additional costs are Employer National Insurance Contributions (which increased to 15% with a much lower threshold starting April 2026) and mandatory auto-enrolment pension contributions."
      ),
      createFAQ(
        "What is the Employment Allowance?",
        "The Employment Allowance is a government relief scheme that reduces the amount of Employer National Insurance you have to pay. From April 2026, the allowance increased from £5,000 to £10,500. This effectively means many small businesses can employ up to four workers full-time on the National Living Wage without paying any Employer NI."
      ),
      createFAQ(
        "Do employers pay for Statutory Sick Pay (SSP)?",
        "Yes. In the vast majority of cases, employers bear the full cost of Statutory Sick Pay (£116.75 per week). The Percentage Threshold Scheme that previously allowed employers to reclaim SSP from the government was abolished in 2014, making sick days an unrecoverable business expense."
      )
    ]
  },

  "ebay-fee-calculator": {
    sections: [
      createAnswerFirstSection(
        "Selling on eBay: The Final Value Fee Explained",
        "eBay does not charge you to list most items (up to your monthly limit), but they take a 'Final Value Fee' when the item sells. For private sellers in the UK, this is typically 12.8% of the total amount the buyer paid (including shipping and postage), plus a fixed fee of 30p per order.",
        "For business sellers, the fee structure is entirely different and depends heavily on the category of the item. Tech and electronics might attract a lower percentage, while fashion might be higher. Business sellers must also factor in VAT on their eBay fees."
      )
    ],
    faqs: [
      createFAQ(
        "What are the eBay fees for business sellers in the UK?",
        "Business sellers pay a category-specific final value fee (usually between 5% and 12.9%), plus a fixed charge of 30p per listing. They may also pay shop subscription fees if they run an eBay Store. Use our calculator to select your specific category for an accurate net payout estimate."
      ),
      createFAQ(
        "Does eBay charge a fee on postage?",
        "Yes. eBay's final value fee is calculated on the total transaction amount, meaning it is applied to the item price plus whatever you charged the buyer for shipping and handling. This stops sellers from listing items for 1p with £50 shipping to avoid fees."
      )
    ]
  },

  "tax-year-calendar": {
    sections: [
      createAnswerFirstSection(
        "What is the UK Tax Year?",
        "Unlike the calendar year (which runs Jan 1 - Dec 31), the UK tax year uniquely runs from the 6th of April one year to the 5th of April the next. The 2026/27 tax year dates start on April 6, 2025, and end on April 5, 2026.",
        "This odd scheduling aligns with the historic British fiscal calendar, dating back to 1752 when the country transitioned to the Gregorian calendar and moved the new year to align with the Exchequer's accounting."
      )
    ],
    faqs: [
      createFAQ(
        "When does the tax year run in the UK?",
        "It officially begins on April 6th and concludes exactly on April 5th the following year. This remains true every single year continuously."
      ),
      createFAQ(
        "When is the self-assessment deadline for the 24/25 tax year?",
        "For the tax year ending April 5th 2025, your online self-assessment tax return and any final tax balancing payment must be submitted to HMRC by midnight on January 31st, 2026."
      )
    ]
  },

  "hobby-cost-tracker": {
    sections: [
      createAnswerFirstSection(
        "What Your Hobby Actually Costs You Per Year",
        "The average UK road cyclist spends £1,800 a year once you add up the bike maintenance, kit replacement, race entries, gym membership and the spaghetti-bolognese-by-the-pan that fuels long Sundays. Photographers easily run £2,000 a year on lens upgrades, subscription software (Lightroom is £120 a year alone), travel to shoot locations and the occasional workshop. The point is not that hobbies are too expensive; it is that most people massively underestimate the running cost because they only remember the obvious purchases.",
        "The tracker gives you 14 hobby presets covering Running, Cycling, Photography, Knitting, 3D Printing, Painting, Gardening, Baking, Fishing, Golf, Climbing, Gaming, Music and Woodworking, each with sensible default categories. Pick the closest match or use Custom if your hobby does not fit. Everything saves to your browser via localStorage, so you can keep adding entries over weeks and months without an account, and nothing leaves your device."
      ),
      createAnswerFirstSection(
        "Categories That Catch the Hidden Costs",
        "The eight default categories (Equipment, Materials, Subscriptions, Courses, Events, Travel, Clothing and Other) exist because hobby spending hides in places people forget to check. A Garmin watch is Equipment; the Strava Premium subscription that goes with it is Subscriptions; the parkrun travel each Saturday is Travel. Most people cheerfully log the Garmin then ignore the £71.99 Strava annual fee plus the £6 a week in petrol, and then wonder why running 'feels free but somehow always costs money'.",
        "Subscriptions are the line item where almost every hobby hides ongoing cost. Cycling has Strava (£71.99), Komoot Premium (£59.99), TrainerRoad (£189.99). Photography has Adobe Creative Cloud (£238.32 a year on the photography plan). 3D printing has Fusion 360 personal use (free) but the filament-by-spool-subscription model is increasingly common. Music software runs on annual Sibelius or Logic licences. Tag every recurring charge as Subscriptions and the monthly average will tell you a story most hobbyists do not want to hear but should."
      ),
      createAnswerFirstSection(
        "Monthly vs Yearly: Which View Tells the Truth?",
        "The monthly view is good for spotting spikes; the yearly view is good for hiding them. A £900 spend in March (new bike, kit refresh) looks alarming month-on-month but reasonable annually. A £40 a month average looks innocuous but adds up to £480 a year and you might be carrying it across three hobbies. Use both views together: monthly to catch problem patterns, yearly to put numbers next to honest budget conversations.",
        "Per-category breakdown is where most hobbyists get the genuine surprise. Almost everyone expects Equipment to be the biggest line, but for established hobbyists it is usually Materials (filament, paint, yarn, fishing bait, golf balls) or Events (race fees, competition entries, festivals). If your tracker shows Equipment dominating year after year, that is a sign you are still in the equipment-acquisition phase, which most hobbies eventually outgrow. For working out whether the hobby could pay for itself by clearing other debts, the [debt payoff calculator](/debt-payoff-calculator) compares the maths of redirecting hobby spend to credit cards, and the [savings burndown](/savings-burndown) tool shows how a savings pot disappears at any given monthly drawdown rate."
      ),
      createAnswerFirstSection(
        "When Tracking Becomes Useful (and When It Just Becomes Sad)",
        "Tracking helps when you are budgeting, justifying a purchase to a partner, deciding whether to take a hobby seriously enough to monetise, or working out if you can afford a new pursuit alongside an existing one. It stops helping the moment you start trimming purchases solely because the running total looks high. The point is awareness, not abstinence. A £1,800-a-year cycling habit is genuinely cheap if it replaces a £600-a-month gym membership and £400-a-month Friday-night taxis.",
        "The most useful end-of-year exercise is comparing each hobby's annual cost against an honest answer to 'how many hours of joy did this give me?'. £1,800 for cycling at 200 hours of riding is £9 an hour, comparable to a cinema ticket. £1,800 for golf at 30 rounds is £60 a round, which is fine for some people and absurd for others. The 3D printing community uses a similar metric: cost per print, which the dedicated [3D print cost calculator](/3d-print-cost-calculator) handles in much more granular detail than this generic tracker."
      ),
    ],
    faqs: [
      createFAQ(
        "Is my data safe? Where is it saved?",
        "Everything is saved in your browser's localStorage on your own device. Nothing is sent to any server, and there is no account. The trade-off is that if you clear your browser data, switch browser, switch device or use private/incognito mode, the entries will not be there. For long-term tracking that survives device changes, export your data periodically as a backup. A future Pro version will offer cloud sync, but the free local version is the right starting point for most people."
      ),
      createFAQ(
        "Can I track multiple hobbies in one tracker?",
        "Yes, you can swap between presets and the tracker keeps separate data per hobby. If you have three or more active hobbies it is usually clearer to use a separate browser bookmark or note for each, since the category breakdown only shows one hobby at a time. The yearly total at the top of each hobby is what you want to compare across hobbies, not the per-category breakdowns."
      ),
      createFAQ(
        "Should I include items I bought before I started tracking?",
        "Up to you. Adding existing equipment to the tracker as a one-off historic entry on the day you bought it gives a more complete picture of what the hobby has cost over its lifetime. Leaving them out keeps the running totals focused on going-forward spending, which is more useful for budgeting decisions. Most people start with going-forward only, then optionally backfill the big-ticket items (the bike, the camera body, the kiln) once they have a few months of habitual entries logged."
      ),
      createFAQ(
        "What counts as a hobby vs a side hustle?",
        "If you make money from it (selling prints, selling honey, selling 3D-printed bottle openers on Etsy) and the money is more than incidental, HMRC may treat it as a side business once turnover exceeds the £1,000 trading allowance. At that point you should stop tracking it as a hobby cost and move it into proper bookkeeping with income and expenses. The trading allowance is annual, not per project, so a hobby selling a few items occasionally is almost always under the threshold."
      ),
      createFAQ(
        "Can I export the data for tax or insurance purposes?",
        "The current free version stores data in localStorage and you would need to copy entries manually. If you are tracking equipment for insurance valuation, the simpler approach is to take photos of receipts and high-value items and store them with your insurer's app. If you are tracking expenses against side-hustle income for HMRC self-assessment, use proper accounting software rather than a hobby tracker, because HMRC will want a clean audit trail with date, amount, supplier and category."
      ),
    ],
    relatedTools: [
      { slug: "3d-print-cost-calculator", label: "3D Print Cost Calculator" },
      { slug: "debt-payoff-calculator", label: "Debt Payoff Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
    ],
  },

  "business-card-designer": {
    sections: [
      createAnswerFirstSection(
        "Designing a Business Card That Actually Gets Kept",
        "Most business cards end up in a drawer or the bin within a week. The ones people keep have three things going for them: legible contact details at glance distance, a job title that explains what you actually do, and enough breathing room around the text that the card does not feel cluttered. This designer locks the layout to the standard 85mm x 55mm UK business card ratio so what you see on screen is what comes out of the printer.",
        "The fields cover the six pieces of information someone realistically needs after meeting you at a networking event: name, role, company, phone, email and website. Skip the pager number, fax line and Twitter handle that nobody has used since 2014. If the card has six lines or fewer, the recipient can scan it in under two seconds and decide whether to keep it. Anything more and it becomes a wall of text."
      ),
      createAnswerFirstSection(
        "Print, VistaPrint and Why Bleed Matters",
        "If you are sending the JPG output to MOO, VistaPrint or a local print shop, ask them whether they want a bleed of 3mm added to the artwork. Bleed is the extra coloured area beyond the cut line that stops a thin white border appearing if the paper shifts by half a millimetre during cutting. The free JPG export here gives you a clean preview, but for production print runs of 100+ cards you usually want to send a press-ready PDF with crop marks. The premium PDF export adds the bleed and crop marks automatically.",
        "Standard UK card stock comes in three weights: 350gsm (thin, cheap, fine for handouts), 400gsm (the bookable middle ground used by most online printers) and 600gsm (the proper expensive feeling card you get from solicitors and design agencies). VistaPrint's standard runs about £15 for 250 cards on 350gsm, climbing to £45 on 400gsm matte, and roughly £80 for the same quantity on 600gsm with a soft-touch finish."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the standard UK business card size?",
        "85mm x 55mm. This is slightly smaller than a US card (which is 89mm x 51mm) so designs imported from American templates can come out subtly stretched or cropped. If you are printing in the UK, stick with the 85mm x 55mm ratio. The designer here is set to that ratio by default."
      ),
      createFAQ(
        "Can I use this for both personal freelance cards and limited company cards?",
        "Yes. For freelancers operating as a sole trader, your trading name goes in the company field (or leave it blank). For a limited company, the registered company name should match exactly what is on Companies House, and many people add 'Ltd' to be explicit. If you are VAT-registered, you do not need to put the VAT number on the business card itself, only on invoices."
      ),
      createFAQ(
        "How many cards should I order for my first batch?",
        "For most freelancers and small business owners, 100 to 250 is the right first order. You will hand out roughly 20 to 30 a year unless you actively network, and details (phone numbers, job titles, even web domains) tend to change within 18 months. Ordering 1,000 cards because the per-unit price drops sounds clever until you reprint them after your role changes and have 870 unusable cards in a box."
      ),
      createFAQ(
        "Should I include my home address?",
        "No, especially if you trade from home. Companies House publishes your registered office address but you can use a service address (around £30 to £100 a year) to keep your home address private. On a business card, a city and country is usually enough. People who need a postal address for invoicing will email you and ask."
      ),
    ],
    relatedTools: [
      { slug: "invoice-number-generator", label: "Invoice Number Generator" },
      { slug: "receipt-generator", label: "Receipt Generator" },
      { slug: "company-name-checker", label: "Company Name Checker" },
    ],
  },

  "business-name-generator": {
    sections: [
      createAnswerFirstSection(
        "Generating a Business Name That Survives First Contact With Reality",
        "The generator picks from curated word lists across eight industries (tech, food, fashion, health, finance, creative, retail and consulting) in five styles (modern, classic, playful, professional and minimalist), then combines them in one, two or three-word formats. You will get ten names per click and almost all of them will be unsuitable. That is fine. The point is that a list of mediocre names is much easier to react to than a blank page, and the two or three you keep coming back to in the list are usually the seed of a real shortlist.",
        "What the generator cannot do is check whether the name is actually available. Three things will kill a name even if it sounds great: the .com or .co.uk domain is gone, a competitor in your sector already trades under it (a real trademark conflict), or Companies House has rejected it because the name is too similar to an existing registered company. Run any shortlisted name through the [Company Name Checker](/company-name-checker) and a domain registrar (Namecheap, GoDaddy) before you fall in love with it."
      ),
      createAnswerFirstSection(
        "Trademarks, Domains and Companies House: The Three Filters",
        "Companies House will refuse a name if it is identical or 'too like' an existing one (Acme Ltd vs Acme Limited counts as identical), if it contains a sensitive word like 'British', 'Royal' or 'Bank' without permission, or if it is offensive. Different rules apply for trading names that are not registered as a limited company, but if you ever expect to incorporate, check Companies House early. The official check at gov.uk is free and takes about 30 seconds.",
        "A trademark conflict is more serious than a Companies House clash. You can register a company called 'Apex Consulting Ltd' that has nothing to do with the trademarked Apex Sports brand, but if your services overlap, the trademark holder can force you to change. Trademark search via the IPO costs nothing for a basic check; an actual registered trademark costs around £170 in the UK for one class of goods or services. Most early-stage businesses skip the trademark and discover the problem 18 months later when they receive a cease-and-desist letter."
      ),
      createAnswerFirstSection(
        "When the Generator Output Is Useful and When It Is Noise",
        "The output is most useful in two scenarios: you have writer's block and need a shove out of the blank-page state, or you are deliberately looking for an abstract, made-up name (the Pixel, Apex, Nexus, Vertex pattern) where meaningfulness matters less than memorability and domain availability. The generator is least useful if you are trying to find a name that describes your service literally, where you are better off brainstorming descriptive nouns related to what you sell. 'Sussex Plumbing Direct' will never come out of a randomiser, but it might be exactly the right name for a plumber in Brighton.",
        "Made-up names are easier to trademark because they do not collide with descriptive language, and easier to get domains for because they are not common search terms. The trade-off is that nobody knows what you do until you tell them, which costs you marketing money for the first two years. Descriptive names cost nothing to explain but are almost impossible to differentiate. The right choice depends on whether you are competing on brand or on local SEO."
      ),
    ],
    faqs: [
      createFAQ(
        "How do I know if a business name is taken in the UK?",
        "Three quick checks. First, search the free company name availability checker at gov.uk for limited companies. Second, search the IPO trademark database for registered trademarks. Third, type the name into Google and check the .co.uk and .com domain availability. If all three come back clean, the name is probably free to use. Trading names are not officially registered, so a sole trader using the same name without a trademark is a grey area."
      ),
      createFAQ(
        "Can I use a generated name as a registered company?",
        "Yes, provided it passes the Companies House and trademark checks above. The generator just gives you ideas; it does not register anything. To register a UK limited company you fill in form IN01 or use the £50 online incorporation service, which takes around 24 hours. After incorporation, the name is yours unless someone challenges it on trademark grounds."
      ),
      createFAQ(
        "What about the domain name?",
        "If the .co.uk and .com are both available, register both immediately even if you only plan to use one. Domain squatters watch newly-formed Companies House filings and snap up matching .com domains within days. Around £8 to £12 a year per domain is cheap insurance against having to pay £500 to a squatter later. Hyphens and unusual TLDs (.io, .biz) are fine but reduce memorability significantly."
      ),
      createFAQ(
        "Why do all the generated tech names sound the same?",
        "Because they probably are the same. The 2015 to 2022 startup era pushed the abstract two-word combination format ('Vertex Cloud', 'Apex Logic', 'Nexus Stack') so hard that thousands of companies now share that aesthetic. If standing out matters more than fitting in, switch the style to 'classic' or 'minimalist' and try compound real-word names instead. 'Sage' beats 'Synergon' for memorability nine times out of ten."
      ),
    ],
    relatedTools: [
      { slug: "company-name-checker", label: "Company Name Checker" },
      { slug: "business-card-designer", label: "Business Card Designer" },
      { slug: "nda-template-generator", label: "NDA Template Generator" },
    ],
  },

  "compound-interest-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Compound Interest Actually Works",
        "Compound interest is interest paid on interest. The standard formula is A = P(1 + r/n)^(nt), where A is the final amount, P is the principal (your starting deposit), r is the annual interest rate as a decimal, n is the number of times interest compounds per year, and t is the number of years. The calculator handles four compounding frequencies (daily, monthly, quarterly, annually), with monthly being the most realistic for most UK savings accounts and stocks-and-shares ISAs.",
        "A worked example: £10,000 deposited at 5% interest compounded monthly for 10 years grows to £16,470. The same deposit at 5% with annual compounding only reaches £16,289. The £181 difference is what compounding frequency buys you - meaningful but not earth-shattering. The far bigger lever is the time variable. The same £10,000 at 5% monthly compounding for 30 years becomes £44,677, roughly four and a half times the starting capital, and that is before any further deposits."
      ),
      createAnswerFirstSection(
        "Compound vs Simple Interest: Why Bank Marketing Loves the Difference",
        "Simple interest pays out only on the original principal. £10,000 at 5% simple interest for 10 years pays £500 a year for 10 years, ending at £15,000. Compound interest reinvests the interest each period and pays interest on the new larger balance. The same £10,000 at 5% compounded monthly for 10 years ends at £16,470, a £1,470 difference. Over 30 years that gap blows out to about £29,000 vs £25,000 in difference - the compound effect literally accelerates with time.",
        "Most modern UK savings accounts compound monthly, even when the rate is quoted as an annual figure (the AER, or Annual Equivalent Rate, is the standardised compound number you can compare across accounts). Personal loans and credit cards also compound, which is why a 19.9% APR credit card carrying a £3,000 balance grows by roughly £50 a month in interest if you only pay the minimum. Compounding is your friend on the saving side and your enemy on the debt side, and it works equally hard in both directions."
      ),
      createAnswerFirstSection(
        "Monthly Contributions: The Lever That Actually Matters",
        "The calculator includes a monthly contribution field because the truth is most people do not get rich by depositing £10,000 once and waiting; they get there by adding £200 or £500 a month over decades. £200 a month at 7% compounded monthly for 25 years grows to about £162,000 - of which only £60,000 is your contribution and the other £102,000 is compound growth. The same scenario over 30 years balloons to £244,000, where time alone has roughly doubled the gain.",
        "This is the maths behind the standard pension and ISA advice. The annual ISA allowance is £20,000, but most savers contribute closer to £100 to £400 a month into a stocks-and-shares ISA via direct debit. At a long-run real return of 5% to 7% (after inflation), regular contributions over 20-30 years compound into something that genuinely changes retirement options. For a more goal-focused projection use the [Pension Calculator](/pension-calculator) or [ISA Calculator](/isa-calculator); both feed the same compound formula but are framed around UK contribution limits."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the result inflation-adjusted?",
        "No, the calculator gives you a nominal amount. £100,000 in 30 years' time is not £100,000 in today's purchasing power. UK inflation has averaged roughly 2 to 3% over the last 50 years, so a rough rule is to subtract 2% from your assumed interest rate to get a 'real' return. A 7% nominal projection at 2% inflation roughly equals 5% real growth - still very good, but the headline number is slightly less impressive once you correct for what £1 will buy in three decades."
      ),
      createFAQ(
        "What rate should I assume?",
        "For an instant-access savings account in the UK in 2026, around 4 to 4.5% AER. For a fixed-term savings bond, 4.5 to 5%. For a stocks-and-shares ISA invested in a global tracker fund, the long-run average is closer to 7 to 8% nominal (about 5 to 6% after inflation), but with much higher volatility year-to-year. Use 5% as a conservative default if you are unsure; it is below most equity averages and roughly equal to current cash savings rates."
      ),
      createFAQ(
        "Why is compounding monthly more than compounding annually?",
        "Because each compounding period the balance is slightly higher, and interest is then calculated on that slightly higher balance. With monthly compounding, after January your interest joins the principal and earns more interest in February, and so on. With annual compounding, you wait 12 months before the interest joins. The effect is small at low rates and short periods, and grows with both. At 5% over 10 years, monthly vs annual is a £180 difference per £10,000. At 12% over 30 years, the gap explodes to thousands."
      ),
      createFAQ(
        "Can I use this for mortgage calculations?",
        "Not directly. UK mortgages are amortising loans, meaning each payment includes both interest and principal repayment, which compound interest does not handle. Use a dedicated mortgage tool for that. This calculator is best for savings, lump-sum investments, and general 'what would my money be worth in X years' projections."
      ),
    ],
    relatedTools: [
      { slug: "pension-calculator", label: "Pension Calculator" },
      { slug: "isa-calculator", label: "ISA Calculator" },
      { slug: "savings-burndown", label: "Savings Burndown" },
    ],
  },

  "craft-fair-calculator": {
    sections: [
      createAnswerFirstSection(
        "Was That Craft Fair Actually Worth It?",
        "Most makers do their craft fair maths after the event by counting cash takings and feeling either pleased or disappointed. The uncomfortable truth comes out when you subtract the stall fee, the petrol both ways, the materials cost of what you sold, and the eight hours you spent setting up, selling and packing down. A 'great day' with £400 in sales can quietly turn into £6 an hour once everything is accounted for. This calculator forces the honest version: stall cost plus travel plus materials plus accommodation against revenue, with your hourly rate at the bottom in black and white.",
        "The default values reflect a typical UK indoor or village hall fair: £50 stall (church halls and small markets often charge £30 to £60, larger town centres £80 to £150), 20 mile round trip at HMRC's 45p mileage rate, eight hours total time including setup, twelve items sold at £25 average. With £100 in materials cost across the day, that scenario nets a £100 profit and £12.50 an hour - above minimum wage, below most freelance rates, and only viable if you genuinely enjoy the day."
      ),
      createAnswerFirstSection(
        "The Costs Sellers Routinely Forget",
        "Travel is the most under-counted line. The 45p per mile HMRC rate is not a guess at fuel; it is the mileage allowance that covers fuel, wear and tear, insurance and depreciation. A 60-mile round trip at 45p is £27, and most sellers either ignore this entirely or only count fuel at maybe £8. Use the proper rate. Accommodation hits if the fair starts before 9am and is more than an hour away - sleeping in the car at a service station will save you £80 but is rarely worth it after one attempt.",
        "Materials cost should be the cost of items you actually sold, not your full stock. If you took £600 of stock and sold £300, your materials line is roughly half (assuming consistent margins). Some sellers prefer to track all stock as overhead and absorb unsold stock into a 'stock at hand' figure for the next event. Either approach works, but you must pick one and use it consistently. Mixing them is how people accidentally double-count and convince themselves a fair was profitable when it was not."
      ),
      createAnswerFirstSection(
        "When to Stop Doing a Fair",
        "If the calculator shows you a real hourly rate below £10 and you have done the same fair three times, the data is telling you something. It is not necessarily 'stop doing fairs', it might be 'stop doing this specific fair' or 'change what you sell'. High-margin small items (greeting cards, earrings, candles) almost always outperform low-margin large items (paintings, ceramics, large prints) at general craft fairs because foot traffic skews to impulse spend at £5 to £25 per buyer. Items priced above £40 sell better at curated maker markets or directly online via [Etsy](/etsy-fee-calculator).",
        "Also check whether the fair is brand-building or income-generating; some sellers run a stall at the local Christmas market specifically to drive Instagram followers and Etsy sales for the next two months, accepting a thin margin on the day. If that is the model, the calculator's hourly rate is the wrong metric. Track instead how many email signups, business cards taken, or follow-up custom orders the day produced. Most sellers do a mix of both kinds of event, knowing which is which."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a typical UK craft fair stall fee?",
        "Range: £30 to £150. Village halls and small charity events often charge £30 to £50. Established town centre markets and Christmas fairs in the UK charge £60 to £100. Premium curated events (Crafty Fox, Renegade Craft Fair) can be £150 to £300 with an application process. Your registry entry should match the actual stall cost, not an average."
      ),
      createFAQ(
        "Should postage be included if I take orders for later?",
        "If you take an order at the fair and post it to the customer afterwards, the postage is a cost of that sale and should be deducted before you mark it as profit. Royal Mail Tracked 24 small parcel is £4.45 (April 2026), so a £25 sale becomes £20.55 net of postage before materials. Some makers fold postage into the sale price; others charge it on top. Be explicit about which model you use."
      ),
      createFAQ(
        "Do I need to register with HMRC if I sell at craft fairs?",
        "If your total trading income (across all sales channels including Etsy, fairs and direct orders) exceeds the £1,000 trading allowance in a tax year, yes - you need to register for self-assessment and declare the income. Below £1,000 you are fine without registering. The threshold is gross sales, not profit, so high-volume low-margin sellers can hit it surprisingly fast."
      ),
      createFAQ(
        "How do I price for a craft fair vs Etsy?",
        "Many makers price the same across both channels for consistency, but craft fairs let you avoid Etsy's roughly 6.5% transaction fees plus payment processing. The trade-off is the day cost the calculator shows. Most pros price at a slight premium at fairs (round numbers, easier to say) and make slightly more per sale to offset the day costs. The [Side Hustle Hourly Rate](/side-hustle-hourly-rate) calculator gives the broader yearly view across both channels."
      ),
    ],
    relatedTools: [
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" },
      { slug: "side-hustle-hourly-rate", label: "Side Hustle Hourly Rate" },
      { slug: "hobby-cost-tracker", label: "Hobby Cost Tracker" },
    ],
  },

  "discount-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Discount Maths Works (and Why It Trips People Up)",
        "A 20% discount on a £80 item gives you £64. The straightforward formula is final = original × (1 - discount/100). Where it gets messy is when discounts stack. A '20% off, then a further 10% off' is not 30% off - it is 28% off, because the 10% applies to the already-discounted price. £80 at 20% off is £64; £64 at a further 10% off is £57.60, an effective 28% saving rather than 30%. Retailers know this and use stacked discounts to advertise bigger numbers than the actual saving warrants.",
        "The reverse calculation matters when something is already on sale and you want to know the real discount rate. If a coat was £180 and is now £108, the saving is £72 and the discount rate is 40%. The formula is rate = (original - final) / original × 100. This is the calculation that exposes the classic 'was £200, now £150' pricing trick when the item was £150 for most of the year before the brief £200 'period of original price' that retailers use to legitimise sales under UK consumer law."
      ),
      createAnswerFirstSection(
        "Sales Pricing for Sellers: The Margin Trap",
        "If you are a seller and your gross margin is 40%, a 30% off sale leaves you with 10% margin if your costs are fixed, before processing fees and shipping. If the same product sells through Stripe (1.5% + 20p) or Etsy (6.5% transaction fee plus 0.20 listing), the discounted item can easily go negative. This is why 'Black Friday discounts' are usually clustered around 10-25%; deeper than that and most retailers are losing money per unit, the discount really has to drive volume that compensates.",
        "The reverse problem hits at the high end. A 70% off clearance on premium items often means the products were marked up enormously to begin with so that the 'discount' looks dramatic. UK trading standards require that a 'was' price was the actual selling price for a meaningful period (usually 28 days) before the sale, but enforcement is patchy and many fashion retailers cycle prices in 30-day rotations specifically to keep the higher 'was' figure plausible. Use the reverse calculator to expose what the real price reduction is, not the headline number."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between markup and discount?",
        "Markup is what a seller adds to cost to set a selling price. Discount is what a seller subtracts from a selling price for a customer. They are not symmetrical. A 50% markup on £10 cost = £15 selling price. A 50% discount on £15 = £7.50, which is a £2.50 loss against the £10 cost. This is why retailers rarely discount more than the markup they originally added, and why doorbusters at 70% off are usually overstock or end-of-line items where the seller would rather take a loss than store it for another year."
      ),
      createFAQ(
        "Is the discount calculated before or after VAT?",
        "Almost always after. UK consumer-priced goods are quoted inclusive of 20% VAT, and any discount is applied to the inc-VAT price the customer sees. So '30% off £60' means the customer pays £42, and the retailer's VAT obligation reduces proportionally. For B2B transactions where prices are quoted ex-VAT, the discount is applied to the net price first and then VAT is added on the discounted figure. Using the [VAT Calculator](/vat-calculator) helps reconcile the two views."
      ),
      createFAQ(
        "How do I calculate a percentage off in my head?",
        "For 10%, move the decimal point one place left (£80 becomes £8 off, leaving £72). For 20%, do the 10% trick and double it (£8 doubles to £16 off, leaving £64). For 25%, divide by 4 (£80 / 4 = £20 off, leaving £60). For 50%, halve it. For 33%, divide by 3. Most everyday sale maths can be done with these five fractions plus a bit of mental adding. The calculator handles awkward percentages and stacked discounts that mental maths cannot."
      ),
      createFAQ(
        "What does '20% off everything' mean exactly?",
        "It usually means 20% off the marked retail price, but read the small print. Common exclusions include sale items already reduced (so you cannot stack the discount), gift cards, certain brands the retailer has agreed not to discount, and any products marked with a yellow or red sticker. The advertised saving is on the original price, not your final spend, so if you buy something already at 30% off, the 20% does not apply on top."
      ),
    ],
    relatedTools: [
      { slug: "vat-calculator", label: "VAT Calculator" },
      { slug: "profit-margin-calculator", label: "Profit Margin Calculator" },
      { slug: "markup-calculator", label: "Markup Calculator" },
    ],
  },

  "email-subject-line-tester": {
    sections: [
      createAnswerFirstSection(
        "What Actually Drives an Email Open",
        "The tester scores subject lines on six observable factors: length, power words, spam triggers, urgency, personalisation, and emoji use. None of these guarantee a good open rate; they describe whether the line follows patterns that have correlated with higher opens in industry benchmarks. The single most reliable factor is length. Subject lines between 30 and 50 characters tend to outperform shorter ones (which look thin) and longer ones (which get truncated on mobile). On an iPhone in the Mail app, anything past 41 characters disappears behind an ellipsis, so the most important word should be in the first six.",
        "Power words like 'Proven', 'Exclusive' and 'Urgent' shift opens upward in most A/B tests, but only when they describe something genuinely true. A subject line that promises 'Exclusive offer' for a generic 10% off discount that everyone gets reduces trust over the next three sends, even if it raises the open rate today. Email is a long game; the unsubscribe rate matters more than the open rate over a six-month window."
      ),
      createAnswerFirstSection(
        "Spam Triggers and Why They Still Matter in 2026",
        "Modern spam filters (Gmail's, Outlook's, Apple Mail's) do not rely on simple keyword matching the way the early 2000s filters did. A single 'Free' in a subject line will not send you to junk. What does matter is the cumulative pattern: 'FREE!!! Click here NOW! Limited time only!' across the subject and body looks like a 1990s spam template, and modern filters rate the entire send accordingly. The tester flags the obvious triggers so you can see which are doing the most harm. One or two is usually fine; five or more, especially in all-caps, will hurt deliverability significantly.",
        "Sender reputation drives more of your placement than the subject line ever will. If you are sending from a new domain (less than three months old), any aggressive subject line is more likely to land in spam regardless of content because filters have no track record. New domains should send a few hundred low-volume, plain, friendly emails first to build sender reputation before any campaign with sales language. Sending from a Gmail or Outlook personal address rather than a verified business domain (with SPF, DKIM, DMARC set up) cuts your inbox placement by roughly half."
      ),
      createAnswerFirstSection(
        "Personalisation, Numbers and the 5-9 Word Rule",
        "Subject lines with a first name in them ('Sarah, your weekly summary is ready') open at roughly 20% higher rates than the same line without personalisation in most marketing automation studies. The catch is that fake personalisation - using a name on a generic blast where it is obvious the sender does not know who you are - hurts trust. Use [first_name] only when your list is properly segmented and the email's content actually justifies the implied 'this is just for you' framing.",
        "The 5-to-9 word range is where most successful subject lines sit. Below five words you usually cannot say anything meaningful, above nine you start losing the read on a phone preview. Numbers boost slightly because the brain pattern-matches '7 ways to save £200 a month' as a specific, scannable promise. Question marks at the end open at slightly higher rates than statements ('Ready for the new tax year?' beats 'Get ready for the new tax year') because curiosity opens emails more reliably than declarative claims do."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a good open rate?",
        "Industry averages vary by sector. UK retail emails average 18 to 22%; B2B newsletters average 25 to 30%; transactional emails (order confirmations, password resets) hit 60 to 80%. If your campaign opens are under 10%, the issue is probably list quality or sender reputation, not the subject line. If you are at 15% and trying to get to 20%, subject line testing is genuinely worth the effort."
      ),
      createFAQ(
        "Should I use emojis?",
        "Sparingly. One well-placed emoji can lift opens 2 to 4% in some studies, especially for B2C audiences. Two emojis is usually the maximum. Three or more starts to look like spam. The emoji should match the email content; a fire emoji on a corporate newsletter looks try-hard. Some industries (finance, legal, healthcare) avoid emojis entirely because the audience reads them as unprofessional."
      ),
      createFAQ(
        "Does ALL CAPS in the subject line hurt deliverability?",
        "Yes. Spam filters treat ALL CAPS as a strong signal, and even your readers register all-caps subject lines as shouty and unsubscribe more often. A single capitalised word for emphasis ('OPEN' or 'NEW') is fine; 'EXCLUSIVE OFFER INSIDE - DON'T MISS OUT!!!' will send you to junk on most major mail services."
      ),
      createFAQ(
        "Does the score predict my actual open rate?",
        "No. The score predicts whether your subject line follows patterns that correlate with higher opens in industry data; it cannot predict how your specific list will respond. A 'Needs Work' score at 35 might still open at 30% if your audience knows and trusts you. Treat the tester as a checklist of common mistakes, not a guarantee."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "content-calendar-generator", label: "Content Calendar Generator" },
      { slug: "social-media-post-scheduler", label: "Social Media Post Scheduler" },
    ],
  },

  "freelance-rate-calculator": {
    sections: [
      createAnswerFirstSection(
        "Working Out a Freelance Rate That Actually Pays",
        "Most new freelancers set their rate by dividing what they earned in their last salaried job by the hours worked. This is wrong by roughly half. As an employee, your salary already excludes employer NI (15% above £5,000 from April 2026), pension contributions (3% minimum auto-enrolment), holiday pay (28 days minimum statutory), sick pay, tools and software, accountancy, professional insurance, and the gap between contracts. As a freelancer, every one of those becomes your problem. The calculator works backwards from your desired take-home figure to the gross daily rate you actually need to charge.",
        "A worked example: you want £40,000 take-home, can realistically bill 48 weeks a year at 5 days a week and 7 billable hours per day (1,680 billable hours), assume 20% effective tax (a sole trader earning £40k pays roughly 18% income tax plus 8% NI minus the personal allowance, but you can use 20% as a working approximation), £500 a month in business expenses (insurance, software, accountant), and a 20% profit margin on top. The calculator returns roughly £45 to £50 per hour or £315 to £350 per day. UK freelance developers typically charge £300 to £600 per day in 2026; designers £250 to £500; copywriters £200 to £450, depending on seniority and specialism."
      ),
      createAnswerFirstSection(
        "Billable vs Worked Hours: The 50% Rule Most Freelancers Ignore",
        "If you sit at your desk for 40 hours a week, you do not bill 40 hours a week. The realistic figure is closer to 60-70% of seat time, with the rest going to admin, marketing, invoicing, scope discussions, client emails, and dead time between projects. Senior freelancers in stable retainers can hit 80%, but new freelancers chasing work usually bill closer to 50%. The calculator's 'hours per day' field should be billable hours, not seat hours - if you set it to 8 you are assuming a fully-utilised day every day, which is rare.",
        "Adjust the working weeks downward for realism. 52 weeks minus four weeks holiday minus a week sick is 47 weeks. New freelancers who cling to '50 working weeks at 8 hours a day = 2,000 billable hours' produce rates that look reasonable until they realise they are quoting £35 an hour but only ever billing 1,200 hours, leading to actual income of £42,000 instead of the £70,000 they thought they would earn. Plan from honest billable capacity, not from arithmetic ceiling."
      ),
      createAnswerFirstSection(
        "IR35 and Why Day Rates Aren't Comparable Across Contract Types",
        "Inside IR35 contracts (where HMRC treats you as effectively employed despite being a contractor) net you significantly less than outside-IR35 contracts at the same headline day rate, because PAYE tax and employee NI is deducted at source. A £500 inside-IR35 day rate nets you roughly the same as a £350 outside-IR35 rate after personal NI and the additional employer NI passed back through the umbrella. Whenever you are quoted a day rate for a long-term contract, ask immediately whether it is inside or outside IR35.",
        "The Off-Payroll Working rules (which moved IR35 determination from the contractor to the end client for medium and large businesses) mean most large UK employers default contractors to inside-IR35 to avoid risk. This has compressed outside-IR35 rates upward (clients willing to take the risk pay a premium) and inside-IR35 rates downward (umbrella overheads eat 5-8% off the top before tax). For non-IR35 work like one-off projects for sole traders or small businesses, the freelance rate this calculator produces is the rate to charge directly. For longer-term contracts inside large organisations, multiply by roughly 1.4 to account for IR35 leakage and use the [Salary to Hourly Converter](/salary-to-hourly-converter) cross-check."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a typical UK freelance day rate?",
        "Highly sector-dependent. UK freelance developers in 2026: junior £250 to £350, mid £350 to £500, senior £500 to £700, specialist (cloud architecture, ML, etc.) £700 to £1,200. Designers: £250 to £500 day rate. Copywriters: £200 to £450. Marketers: £300 to £600. Accountants: £350 to £600. These are outside-IR35 rates for direct client work; inside-IR35 contract rates can be higher headline but lower net."
      ),
      createFAQ(
        "Should I charge VAT?",
        "If your turnover crosses the £90,000 VAT threshold (April 2024 onwards), you must register and charge 20% VAT on top of your rate. Below £90,000 it is optional. Many B2B freelancers register voluntarily because their clients can reclaim the VAT, and being VAT-registered makes you look more established. B2C freelancers (charging consumers) usually avoid voluntary registration because the customer cannot reclaim it, making your service 20% more expensive overnight."
      ),
      createFAQ(
        "Should I quote hourly or daily?",
        "Daily rates favour the freelancer because they prevent client micromanagement and allow flexibility within the day. Hourly works for genuinely small tasks (under a day's work) but encourages clients to question every hour. Project-fixed pricing (quote a flat fee for a defined scope) is the most lucrative model once you have enough experience to estimate accurately. Most established freelancers run a ladder: hourly for small tasks, day rate for short engagements, fixed fee for defined projects, retainer for ongoing work."
      ),
      createFAQ(
        "How much should I keep aside for tax?",
        "As a sole trader on £40k, around 25-30% of profit (after expenses) goes to income tax and NI. As a limited company director on the same figure split between salary and dividends, the total tax burden is similar but spread across corporation tax (19-25%) and dividend tax (8.75% basic, 33.75% higher). Most freelancers move all incoming money straight into a dedicated tax savings account at 25-30% of every payment. This avoids the January self-assessment shock that catches first-year freelancers every year without fail."
      ),
    ],
    relatedTools: [
      { slug: "salary-to-hourly-converter", label: "Salary to Hourly Converter" },
      { slug: "vat-calculator", label: "VAT Calculator" },
      { slug: "side-hustle-hourly-rate", label: "Side Hustle Hourly Rate" },
    ],
  },

  "pricing-calculator": {
    sections: [
      createAnswerFirstSection(
        "Margin vs Markup: The Distinction That Costs Sellers Money",
        "Markup and margin describe the same gap between cost and selling price but from different angles, and confusing them is one of the most common pricing mistakes. Markup is profit as a percentage of cost: a £10 item sold for £15 has a 50% markup. Margin is profit as a percentage of selling price: the same item has a 33% margin. A 100% markup gives you a 50% margin; a 50% markup gives you a 33% margin. The calculator handles both modes so you can switch depending on which way your supplier or industry typically quotes.",
        "Most retailers think in markup ('I need to mark this up 50%') because it is intuitive when buying stock. Most accountants think in margin because it is what shows on a P&L statement. If your supplier quotes you 'we sell to you with a 30% margin' that means they paid £7 for what they sell to you at £10. If they say '30% markup' they paid £7.69 and sell at £10. Always confirm which one is meant - the difference on a £100k stock buy is around £2,300."
      ),
      createAnswerFirstSection(
        "Volume Discount Tiers: When They Help and When They Hurt",
        "The bulk discount preview shows what your selling price becomes at 1, 10, 50, 100 and 500 unit tiers. Volume tiers work brilliantly for B2B - a craft supplier selling 500 metres of fabric to a clothing brand expects a discount that a single retail customer would never see. They can backfire for B2C if they cannibalise full-margin sales by training customers to wait for bulk deals.",
        "The standard tier set used here (5%, 10%, 15%, 20% at 10/50/100/500 units) is conservative for handmade goods (where labour cost barely scales) and aggressive for digital products (where unit cost is near-zero). For physical goods, the discount should roughly track the cost saving of bulk fulfilment - lower packaging cost per unit, fewer transactions, less customer service time. If your bulk discount is bigger than your per-unit cost saving, you are buying volume at the expense of margin. The [Profit Margin Calculator](/profit-margin-calculator) lets you sense-check the real margin at each tier."
      ),
      createAnswerFirstSection(
        "Real-World Pricing Pressure: Competitors, Costs and the 'Just Price It Higher' Myth",
        "Common pricing advice for new sellers - 'just charge more, you are undervaluing yourself' - works only when something else holds the line. If competitors sell the same product at £40 and you price at £60, you need either a strong brand, a better product (and the marketing to communicate it), or a niche where price sensitivity is low. For commodity products, the realistic ceiling is competitor price plus maybe 15-20% if your reviews and presentation justify a premium.",
        "Cost-plus pricing (cost x markup) sets a floor on what you can charge sustainably; the market sets a ceiling. The right price is somewhere in that band, weighted toward the ceiling early on (to fund growth) and toward the floor when you have stock to clear or are competing in a saturated category. Mid-month rate changes are a signal worth tracking - if you keep nudging price up because demand is strong, your initial price was too low; if you keep dropping it because nothing is selling, the cost-plus calculation was optimistic about demand."
      ),
    ],
    faqs: [
      createFAQ(
        "What margin should I aim for?",
        "Highly category-dependent. UK groceries run on 2-5% margins. UK retail clothing typically targets 50-60% gross margin. SaaS targets 70-90%. Handmade goods on Etsy usually target 40-50% after fees. Restaurants 60-70% on food, 70-80% on drink. The right margin is whatever covers your fixed costs, lets you reinvest, and survives the price competition in your category. Aiming for 'as much as possible' without context will price you out of the market in commodity categories."
      ),
      createFAQ(
        "Should I include VAT in my pricing calculation?",
        "If you are below the £90,000 VAT threshold and not voluntarily registered, no - your selling price is the price the customer pays. If you are VAT registered, the calculation is usually done on the ex-VAT price (the price you actually keep) and 20% is added on top for consumer-facing pricing. Many small UK retailers stay just below the £90k threshold to avoid the 20% jump in customer-facing prices that VAT registration triggers; check the [VAT Calculator](/vat-calculator) to see exactly what the gross figure becomes."
      ),
      createFAQ(
        "What is keystone pricing?",
        "A 100% markup, doubling the cost. Used historically by US retailers and still common in fashion and gift retail. £10 cost becomes £20 retail, giving a 50% margin. It is a useful starting point but not a universal answer - some categories (e.g. groceries, jewellery) use very different markups."
      ),
      createFAQ(
        "How do I price for psychological pricing (£9.99 vs £10)?",
        "The £9.99 'charm price' lifts perceived value enough in mass-market retail to offset the lost penny - studies show 5-10% sales lift in B2C consumer goods. It works less well for premium goods, where round numbers (£10, £100, £1,000) signal confidence. £9.99 on a £4 craft fair earring looks discount-store; £10 looks intentional. Match your pricing convention to your brand position rather than blindly applying the .99 trick."
      ),
    ],
    relatedTools: [
      { slug: "profit-margin-calculator", label: "Profit Margin Calculator" },
      { slug: "vat-calculator", label: "VAT Calculator" },
      { slug: "break-even-calculator", label: "Break-Even Calculator" },
    ],
  },

  "receipt-generator": {
    sections: [
      createAnswerFirstSection(
        "What a UK Business Receipt Actually Needs",
        "Under HMRC rules, a basic receipt for a business transaction should include the date, the supplier's name, a description of what was sold, and the total amount paid. If the seller is VAT-registered, the receipt becomes a VAT invoice and must additionally show the VAT registration number, the VAT rate (usually 20% standard rate, 5% reduced, 0% zero-rated, or exempt) and the VAT amount separately from the net price. The toggle for VAT in this generator handles the inclusive/exclusive maths automatically.",
        "There are two kinds of VAT receipts: simplified and full. Simplified receipts (used for sales under £250) need only the date, supplier name, VAT number, total inclusive of VAT and the rate of VAT applicable. Full VAT invoices (over £250 or any B2B sale where the customer asks) must additionally show the customer name, the unit price, quantity, and a breakdown of net, VAT and gross amounts per line. The receipt generator produces a simplified format suitable for most retail transactions and small consultancy invoicing."
      ),
      createAnswerFirstSection(
        "Receipt Retention: 6 Years Is the Real Number",
        "HMRC requires UK businesses to retain receipts and supporting records for six years from the end of the relevant tax year for VAT purposes, and at least five years and 10 months for self-assessment income tax. The often-cited '30, 60 or 90 day' retention windows refer to credit card chargeback periods (90 days under Section 75) and customer return windows, not HMRC retention. If you are running a business, six years is the safe rule. Sole traders without VAT registration only need five years and 10 months, but it is easier to keep everything for six and not have to remember which is which.",
        "Digital receipts (PDFs, JPGs) are accepted by HMRC under Making Tax Digital, provided they are legible and contain all the required information. The generator's JPG export is fine for personal expense tracking; for actual VAT-registered businesses, generate a copy and upload it into your accounting software (Xero, QuickBooks, FreeAgent) which will automatically attach it to the relevant transaction line. This satisfies HMRC and saves the box-of-paper-receipts misery at year end."
      ),
    ],
    faqs: [
      createFAQ(
        "Is a generated receipt legally valid?",
        "Yes, provided the information on it is accurate. There is no legal requirement that a receipt be printed on a till roll or come from a specific software. As long as it correctly records a real transaction, it is acceptable as evidence for HMRC, customer dispute resolution and accounting purposes. What is NOT acceptable is fabricating a receipt for a transaction that never happened - that is fraud regardless of the format used to produce it."
      ),
      createFAQ(
        "How is this different from an invoice?",
        "An invoice requests payment; a receipt confirms payment was received. They contain similar information (parties, items, amounts) but serve opposite purposes. A typical sale generates an invoice first, then a receipt once the customer pays. For instant in-person sales (a market stall, a coffee shop), there is usually no invoice and only a receipt. Use the [Invoice Number Generator](/invoice-number-generator) for the request-payment side and this tool for the payment-confirmation side."
      ),
      createFAQ(
        "Should I include my address?",
        "For a simplified receipt under £250, no - just the business name and VAT number (if registered). For a full VAT invoice, yes - the supplier's address must appear. If you trade from home, use a service address (around £30 to £100 per year) rather than your home address to maintain privacy. The customer's address only needs to appear on full invoices over £250."
      ),
      createFAQ(
        "Can I use this for an Etsy or eBay sale?",
        "Etsy and eBay generate their own receipts automatically and email them to the buyer; you usually do not need to produce a separate one. Where this generator helps is for direct sales outside those platforms - craft fair sales, cash-in-hand consultancy, repeat orders from a customer who paid via bank transfer. Generate the receipt, save the JPG, and file it alongside your bank statement so the income trail is complete."
      ),
    ],
    relatedTools: [
      { slug: "invoice-number-generator", label: "Invoice Number Generator" },
      { slug: "vat-calculator", label: "VAT Calculator" },
      { slug: "business-card-designer", label: "Business Card Designer" },
    ],
  },

  "startup-runway-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Runway Actually Works: Cash / Net Burn",
        "Runway is the number of months until your bank balance hits zero at the current rate of cash outflow. The formula is simple: runway = current cash / (monthly burn - monthly revenue). If you have £50,000 in the bank, spend £8,000 a month and earn £2,000 a month, your net burn is £6,000 a month and you have just over 8 months of runway. The calculator updates in real time as you adjust the three inputs, with a colour-coded warning band (red below 3 months, amber 3-6 months, green above 6).",
        "The number that matters is net burn, not gross burn. Founders sometimes quote impressive-sounding gross burn ('we spend £30,000 a month') without mentioning that they bring in £25,000, leaving net burn of £5,000. Both numbers are true and useful in different contexts: gross burn shows the size of the operation, net burn shows the rate of cash erosion. When investors ask for runway, they want net burn maths; when they ask about cost structure, gross burn."
      ),
      createAnswerFirstSection(
        "What 'Healthy' Runway Looks Like at Different Stages",
        "Pre-seed startups (raising under £500k) typically aim for 12-18 months of runway after a raise. This buys enough time to ship the product, get early customers and figure out whether the idea works before raising again. Below 6 months you are in fundraising mode by default, which is exhausting and bad for the product. Above 24 months and you are sometimes accused of being too cautious; investors prefer founders running lean enough to feel urgency.",
        "Seed-stage (£500k-£2m raised) usually targets 18-24 months. Series A typically targets 18-30 months. Bootstrapped startups have no fundraising deadline so the relevant question becomes 'when do we hit profitability?' rather than 'when do we run out of cash?'. The calculator's runway figure shows when cash hits zero at current trajectory; profitability is the moment net burn turns negative (i.e. revenue exceeds burn) and runway becomes infinite. Most startups never reach profitability and either fail or are acquired before they would."
      ),
      createAnswerFirstSection(
        "When the Burn Rate Is Lying To You",
        "The standard calculation assumes monthly burn is steady, which it almost never is. Annual subscriptions (Google Workspace, AWS reserved instances, insurance) lump into one month then disappear for 11. New hires add cost in step changes, not gradually. Year-end accountancy fees, VAT bills, and corporation tax all hit specific quarters. A 'monthly burn' figure derived from a single month's bank statement is almost always wrong by 10-30% in either direction.",
        "The honest method is to calculate burn from a 6-month rolling average if you have the history, or to project month-by-month over the next 12 months and average if you do not. Subtract one-off receipts (refunds, deposits returned, asset sales) from the revenue side; add expected one-off costs (annual renewals due, planned hires) to the burn side. The difference between a naive monthly average and an honest forward projection is often the difference between '12 months runway' and '7 months runway and a panic call to the investor in month 5'. The [Compound Interest Calculator](/compound-interest-calculator) helps for treasury planning if you have meaningful cash to invest in money market funds while it sits idle."
      ),
    ],
    faqs: [
      createFAQ(
        "What counts as 'cash' for runway purposes?",
        "Liquid bank balance plus any short-term deposits you can access in under 30 days. Money in fixed-term bonds maturing in 6 months counts as cash if you can break them at a small penalty. Money tied up in inventory, accounts receivable due in 60 days, or invoiced but unpaid revenue does NOT count - it is real value but cannot pay payroll on Friday. Conservative startups distinguish 'cash on hand' from 'liquid working capital' for this reason."
      ),
      createFAQ(
        "Should I include VAT in burn?",
        "Burn should be tracked at gross (VAT-inclusive) levels because that is what leaves the bank account. When you reclaim VAT on your next quarterly return, that is a cash inflow that reduces effective burn for that quarter. Month-to-month, treat VAT-out as expense and VAT-in (on sales) as revenue, then reconcile against the quarterly HMRC return."
      ),
      createFAQ(
        "How does runway differ from profitability?",
        "Profitability is whether revenue exceeds total cost in a given period. Runway is how long your cash lasts. A profitable business has infinite runway by definition (cash is going up, not down). An unprofitable but cash-rich business can have 18 months of runway. Conversely, a 'profitable on paper' business can have 2 months of runway if customers pay 90 days late and the company has no working capital cushion. UK accounting rules let companies look profitable on accruals while running out of cash; runway is the cash-truth metric."
      ),
      createFAQ(
        "Should I tell my team the runway number?",
        "Most experienced startup advisors say yes, with caveats. A team that knows the company has 7 months of cash will work harder, prioritise revenue, and self-manage cost decisions in a way that no policy document can replicate. The caveat is that sharing the number when it is below 4-5 months can trigger resignations, especially among senior staff who can read the writing on the wall. Most founders share runway monthly above 6 months and switch to weekly cash updates with a smaller leadership group below that threshold."
      ),
    ],
    relatedTools: [
      { slug: "break-even-calculator", label: "Break-Even Calculator" },
      { slug: "profit-margin-calculator", label: "Profit Margin Calculator" },
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
    ],
  },

  "time-to-double-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Rule of 72 Explained",
        "The Rule of 72 is the back-of-envelope shortcut every investor learns first. Divide 72 by the annual interest rate (as a percentage) and you get the approximate number of years for an investment to double. At 6% it's 12 years, at 9% it's 8 years, at 12% it's 6 years. The tool shows both the Rule of 72 estimate and the precise mathematical answer (using ln(2) / ln(1 + r/100), which is the exact compound-doubling formula).",
        "The rule is accurate within roughly 0.5 years between rates of 4% and 15%, which covers most realistic investment scenarios. It drifts slightly outside that range: at 1% the precise answer is 69.7 years and Rule of 72 says 72, a noticeable error of 3%. At 25%, the precise answer is 3.1 years and Rule of 72 says 2.9. For mental maths during a conversation, the rule is more than good enough; when you need an exact answer for a presentation or model, use the precise calculation the tool provides."
      ),
      createAnswerFirstSection(
        "Why the Rule of 72 Works (Briefly)",
        "Compound growth follows the formula future value = present value × (1 + r/n)^(n×t), where r is the rate, n is the compounding frequency, and t is years. Setting future value to 2 × present value and solving for t gives t = ln(2) / ln(1 + r). At small interest rates, ln(1 + r) is approximately equal to r, so t ≈ ln(2) / r ≈ 0.693 / r. Multiplying both sides by 100 to convert from decimal to percentage gives t ≈ 69.3 / r%. The number 72 was chosen instead of 69.3 because it has more divisors (2, 3, 4, 6, 8, 9, 12), which makes mental arithmetic easier.",
        "This is also why some sources use the Rule of 70 or the Rule of 69 for slightly different accuracy zones; 72 is the most common because most investment maths happens between 4% and 12% interest, where 72 is a closer approximation than 69 or 70. The tool defaults to the standard Rule of 72 and shows both the rough and precise answers side by side."
      ),
      createAnswerFirstSection(
        "Real-World Doubling Times Across Asset Classes",
        "UK easy-access cash savings at 4% double in roughly 18 years. Long-run global stock market returns (around 7% real, after inflation) double in roughly 10 years. Property in the UK has averaged 2-4% real growth, doubling in 18-36 years. Speculative assets (crypto, single-stock bets, junior mining stocks) can double in months but can also halve just as fast - the headline 'doubled in 6 months' figures often come with 50% drawdowns weeks later. Rule of 72 maths assumes constant compound growth, which describes diversified index portfolios well and individual gambles poorly.",
        "For business growth, the same maths applies to revenue. If your monthly recurring revenue is growing 6% a month, you double in 12 months (Rule of 72 applied to monthly figures: 72 / 6 = 12 months). Doubling time becomes a useful KPI for early-stage SaaS where investors want to see how long until you hit specific milestones. The [compound interest calculator](/compound-interest-calculator) shows the cumulative path of a single growth rate; this tool just answers the doubling question."
      ),
      {
        heading: "Doubling Times at Common Interest Rates",
        table: {
          headers: ["Annual Rate", "Rule of 72", "Precise Years"],
          rows: [
            ["1%", "72.0", "69.66"],
            ["3%", "24.0", "23.45"],
            ["5%", "14.4", "14.21"],
            ["7%", "10.3", "10.24"],
            ["10%", "7.2", "7.27"],
            ["15%", "4.8", "4.96"],
            ["20%", "3.6", "3.80"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is the Rule of 72 accurate enough for serious investing?",
        "It's accurate within 1-2% across the realistic range of investment returns (3-15% per year). For a quick mental check it's fine; for a financial plan submitted to a lender or pension provider, use the precise figure. The tool shows both side by side so you can quote whichever is appropriate for the conversation."
      ),
      createFAQ(
        "What rate of return is realistic for stocks?",
        "Long-run global equities have returned around 7% per year above inflation (roughly 9-10% nominal in 'normal' periods). Past performance isn't a guarantee, but for planning purposes most professionals use 5-7% real for diversified equity exposure. Higher numbers (10%+ real) implicitly assume above-average performance, which is fine for ambitious modelling but should be flagged in any plan."
      ),
      createFAQ(
        "What if I want to triple my money instead of double?",
        "The equivalent rule for tripling is the Rule of 110 - divide 110 by the rate to get years to triple. So at 7%, money triples in roughly 16 years (110/7 ≈ 15.7). For quadrupling, it's 144 (which is just doubling twice, hence 72 + 72). The tool focuses on doubling but the maths extends naturally."
      ),
      createFAQ(
        "Does inflation affect doubling time?",
        "If you're asking how long until your money doubles in absolute terms, no. If you're asking how long until your money has twice the buying power, yes - subtract inflation from the nominal rate before applying the rule. A nominal 8% return with 3% inflation gives 5% real, which doubles in 14 years rather than 9."
      ),
      createFAQ(
        "Can I use this for debt instead of investments?",
        "Yes, in reverse. A debt at 18% APR (e.g. a credit card) doubles in roughly 4 years if you make no payments and let interest compound. This is useful for showing why high-interest debt is so dangerous: a £2,000 balance at 22% APR becomes £4,000 in just over 3 years if untouched."
      ),
    ],
    relatedTools: [
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "roi-calculator", label: "ROI Calculator" },
      { slug: "break-even-calculator", label: "Break-Even Calculator" },
    ],
  },

  "vat-calculator": {
    sections: [
      createAnswerFirstSection(
        "How UK VAT Works",
        "VAT (Value Added Tax) is a consumption tax added to most goods and services in the UK. The standard rate is 20%, applied to the bulk of business-to-consumer transactions. Reduced rate (5%) covers domestic energy, children's car seats, and some health products. Zero rate (0%) applies to most food, books, children's clothing, and prescription medicines - these items still 'have VAT' in the legal sense, but the rate is 0%, which means VAT-registered sellers can reclaim VAT on related purchases. Exempt items (financial services, education, some property) are different again: no VAT charged but no VAT reclaim either.",
        "If you're a VAT-registered business, you charge VAT on what you sell (output VAT) and reclaim VAT on what you buy (input VAT). The difference is what you pay HMRC every quarter. The current registration threshold is £90,000 of taxable turnover in any rolling 12-month period; once you cross that, registration becomes mandatory within 30 days. Many small businesses register voluntarily before hitting the threshold to reclaim input VAT on big purchases."
      ),
      createAnswerFirstSection(
        "Adding VAT vs Removing VAT",
        "Adding VAT: you have a net price (what you charge before tax) and want the gross price (what the customer pays). For 20% VAT, multiply the net by 1.2. £100 net + 20% VAT = £120 gross. Removing VAT: you have a gross price (the bill or quote) and want to find the underlying net price and the VAT portion. For 20% VAT, divide the gross by 1.2 to get the net. £120 gross ÷ 1.2 = £100 net, with £20 of VAT inside.",
        "The most common error is multiplying instead of dividing when removing VAT. Doing 20% off £120 gives £24 of 'VAT' but the actual VAT inside £120 is £20 (because 20% was added to £100, not £120). The calculator handles this correctly: pick 'Remove VAT' mode and it does the right division. This matters a lot for businesses extracting net pricing from a supplier invoice or a customer-facing price quoted gross."
      ),
      {
        heading: "UK VAT Rates by Category",
        table: {
          headers: ["Rate", "Applies To", "Examples"],
          rows: [
            ["20% Standard", "Most goods and services", "Adult clothing, electronics, alcohol, restaurant meals"],
            ["5% Reduced", "Specific health/energy items", "Domestic gas/electricity, mobility aids over 60s"],
            ["0% Zero-rated", "Essentials", "Most food, children's clothes, books, newspapers"],
            ["Exempt", "Specific services", "Insurance, education, postal services, healthcare"],
          ],
        },
      },
      createAnswerFirstSection(
        "When VAT Calculations Get Tricky",
        "Hospitality VAT: temporarily reduced to 5% during 2020-2022 then back to 12.5% then back to 20%. Always check the current rate when working with old invoices. Construction services on new-build residential property are zero-rated; renovations of existing residential property are at 5% in some cases (mainly long-empty properties); commercial property is generally 20%. The calculator's 12.5% option exists for the (now historic) hospitality rate and is useful when working through old records.",
        "Reverse-charge VAT applies in the construction industry and to some imported services - the customer accounts for both input and output VAT instead of the supplier charging it. The calculator doesn't handle reverse charge directly because the cash effect is zero (you reclaim what you account for), but be aware the gross/net amounts on a reverse-charge invoice are the same as the net figure."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the VAT registration threshold for 2026?",
        "£90,000 of taxable turnover in any rolling 12-month period. The threshold rose from £85,000 to £90,000 in April 2024. If your turnover is approaching this, monitor it monthly; you must register within 30 days of the month you cross it, and HMRC backdates registration to the start of that period if you miss the deadline."
      ),
      createFAQ(
        "Can I remove VAT from a price that includes service charge?",
        "Yes, but only the bill amount before service charge counts for VAT. UK service charges (including the 'optional 12.5%' on restaurant bills) are not subject to VAT because they're a tip, not a charge for goods or services. The calculator handles whatever amount you enter; remove the service charge first if you only want to find the VAT portion of the underlying meal."
      ),
      createFAQ(
        "How do I claim back VAT as a business?",
        "Submit a VAT return through Making Tax Digital (MTD) compatible software each quarter. Your output VAT (collected from customers) minus your input VAT (paid on business purchases) gives the figure you owe HMRC, or the refund they owe you if input VAT exceeds output. Records of all invoices must be kept for 6 years."
      ),
      createFAQ(
        "Is VAT calculated on the discounted price or the original?",
        "Always on the actual price the customer pays. If you offer 20% off and the discounted price is £80, VAT is calculated on £80 (£16 VAT for a 20% rate), not on the £100 list price. Make sure your calculator inputs reflect the post-discount amount."
      ),
      createFAQ(
        "Does VAT apply to international sales?",
        "Sales to other UK businesses or consumers: yes, charge UK VAT. Exports to non-UK customers: zero-rated for businesses (with proof of export); for B2C exports the rules vary by destination country and may require registering for that country's VAT. Sales of digital services to EU consumers fall under the One Stop Shop scheme. Most international VAT questions need an accountant rather than a calculator."
      ),
    ],
    relatedTools: [
      { slug: "discount-calculator", label: "Discount Calculator" },
      { slug: "profit-margin-calculator", label: "Profit Margin Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
    ],
  },

  "word-cloud-generator": {
    sections: [
      createAnswerFirstSection(
        "How a Word Cloud Reveals Hidden Patterns",
        "Paste any text into the box and the tool counts how often each word appears, ignoring common stop words ('the', 'and', 'is', 'of') that would otherwise dominate. The most frequent words appear largest in the visual output; the colour cycles through hues so each word is distinct. This visual ranking is genuinely useful: a 5,000-word document compressed into a word cloud often surfaces the actual themes faster than reading the whole thing. A customer feedback dump that looks like 'love' and 'hate' spread evenly might reveal that 'wait', 'queue', and 'slow' all show up 30+ times, pointing to the real complaint.",
        "The tool has a minimum frequency slider so you can hide rare words and focus on the recurring ones. For a small text (a single article, a meeting transcript), set the minimum to 2 or 3. For a large dataset (a year of survey responses), bump it to 10+ to filter noise. The cloud caps at the top 50 words to keep the visual readable; beyond that it's hard to compare sizes meaningfully."
      ),
      createAnswerFirstSection(
        "When Word Clouds Are Genuinely Useful",
        "Customer feedback analysis: paste in 100+ survey responses and immediately see what people actually talk about. If 'price' is huge and 'quality' is tiny, the cost/value perception is your top issue regardless of what the survey questions tried to measure. Speech and presentation prep: paste a draft and check whether your key terms appear prominently. If you're presenting on 'sustainability' but the cloud highlights 'we', 'our', 'company', the message isn't landing.",
        "Resume keyword analysis: paste a job description, see the most-used terms, then check that your CV uses the same vocabulary. ATS (applicant tracking systems) often filter on keyword matches, so word clouds are a quick visual diagnostic. Content writing and SEO: paste competitors' top-ranking articles and see which terms recur. A cloud showing 'guide', 'beginner', '2026' tells you Google is rewarding evergreen 'how-to' framing in your niche. The [word counter](/word-counter) gives the same data in numeric form if you need exact counts."
      ),
      createAnswerFirstSection(
        "Limitations Worth Knowing",
        "Frequency isn't importance. The word that appears 50 times might be a filler word that escaped the stop list. The word that appears 5 times might be the most valuable insight. Word clouds are a starting point for analysis, not the analysis itself. They also lose context completely - 'no problem' and 'problem' both contribute to the 'problem' count even though they mean opposite things. Sentiment analysis tools handle this; word clouds don't.",
        "Stop words are language-specific. The default stop list is English; the same text in French would see 'le', 'la', 'de' dominating because those aren't in the list. Multi-word concepts get split: 'customer service' shows as two separate words even though the meaningful unit is the phrase. For deeper text analysis, the [readability score checker](/readability-score-checker) examines structure rather than word frequency."
      ),
    ],
    faqs: [
      createFAQ(
        "What stop words are filtered automatically?",
        "Common English stop words: 'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 'for', 'not', 'on', 'with', 'as', 'you', 'do', 'at', and similar function words. The list includes about 40 of the most common English words, which removes the bulk of grammatical noise without filtering meaningful terms."
      ),
      createFAQ(
        "Can I add my own stop words?",
        "Not directly in the current version. If you want to exclude a specific word (your company name, a recurring filler term), find-and-replace it out of the source text before pasting. For example, if you're analysing customer feedback and 'company' isn't useful, replace 'company' with nothing in your source, then paste."
      ),
      createFAQ(
        "Does case matter (Word vs word)?",
        "No - the tool lowercases all text before counting, so 'Word', 'WORD', and 'word' all merge into a single entry. This is usually what you want; capitalisation differences are rarely meaningful for frequency analysis."
      ),
      createFAQ(
        "What's the maximum text size?",
        "There's no hard limit but performance degrades with very large texts. A novel-length input (50,000+ words) takes a few seconds to process and the resulting cloud caps at 50 words anyway, so most of the data is discarded. Sweet spot is 500-10,000 words; beyond that, manual filtering of the source is more effective than relying on the tool."
      ),
      createFAQ(
        "How do I save the word cloud as an image?",
        "Take a screenshot of the visual output. The tool focuses on instant analysis rather than export; for a publication-quality word cloud with custom shapes and colours, dedicated tools (WordItOut, Wordclouds.com) offer more control. For business reports, the table of word counts at the bottom often communicates more than the visual."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "readability-score-checker", label: "Readability Score Checker" },
      { slug: "json-formatter", label: "JSON Formatter" },
    ],
  },

  "invoice-generator": {
    sections: [
      createAnswerFirstSection(
        "What a Compliant Invoice Must Include",
        "A UK invoice issued by a sole trader or limited company must include: a unique invoice number that runs sequentially, the date of issue, your business name and address, the customer's name and address, a clear description of goods or services, the amount being charged, and the payment terms. If you are VAT-registered you must also include your VAT number, the VAT rate per line, the amount of VAT, and the gross total.",
        "The generator builds all of this for you from the form on the left, defaulting to GBP at 20% VAT and Net 30 payment terms. Switch to USD, EUR, AUD, CAD, JPY or INR if you bill internationally; the symbol and tax rate update accordingly. Limited companies must also display the registered company name and number, plus the registered office address, on the invoice; add these to the business name and address fields if they apply to you."
      ),
      createAnswerFirstSection(
        "Choosing Payment Terms (and Why Net 30 Isn't Always Right)",
        "Net 30 means payment is due 30 days from the invoice date and is the most common term in the UK. Net 15 is appropriate for new clients, smaller jobs, or anyone where cashflow matters; Net 60 and Net 90 are usually only used when a large enterprise dictates them. The Late Payment of Commercial Debts Act lets you charge statutory interest at 8% above the Bank of England base rate on overdue B2B invoices.",
        "A freelancer issuing their first invoice should default to Net 14 or Net 15 to get paid faster, not the corporate-standard Net 30. The tool calculates the due date for you based on whichever term you pick. Track recurring receipts with the [Business Profit Calculator](/business-profit-calculator) once invoices start clearing."
      ),
      {
        heading: "VAT Rates Across the Currencies the Generator Supports",
        table: {
          headers: ["Country", "Standard VAT/Sales Tax", "Reduced Rate", "Notes"],
          rows: [
            ["United Kingdom (GBP)", "20%", "5%", "Reduced rate covers home energy, child car seats"],
            ["Ireland & most EU (EUR)", "23% (IE), varies elsewhere", "9%-13%", "Reverse charge applies on B2B EU exports"],
            ["United States (USD)", "0% to 11.5%", "Varies by state", "No federal VAT; sales tax varies city to city"],
            ["Australia (AUD)", "10% GST", "0% on basic groceries", "ABN required to charge GST"],
            ["Canada (CAD)", "5% GST + provincial", "Varies", "HST in some provinces (e.g. Ontario 13%)"],
            ["India (INR)", "5% to 28% GST", "Tiered by category", "GSTIN required on all B2B invoices"],
          ],
        },
      },
      createAnswerFirstSection(
        "How to Add Discounts Without Confusing Your Client",
        "The generator handles two discount types: a percentage off the subtotal (e.g. 10% loyalty discount), or a fixed amount (e.g. £50 off for early settlement). The discount is applied before VAT, which is the correct UK approach because VAT is calculated on the net amount actually being charged. So a £1,000 invoice with a 10% discount and 20% VAT becomes £900 net, £180 VAT, £1,080 gross.",
        "Show the discount as a separate line so the client can see what they would have paid; this both demonstrates value and avoids the awkward conversation when an old quote and a new invoice differ. For pricing decisions before you invoice, the [Markup Calculator](/markup-calculator) and [Profit Margin Calculator](/profit-margin-calculator) help you set rates that survive the discount."
      ),
    ],
    faqs: [
      createFAQ(
        "How should I number my invoices?",
        "Use a sequential, gap-free system. INV-001, INV-002, INV-003 is fine; you can prefix the year (2026-001), the client (ACME-001), or both. HMRC and Companies House require sequential numbering for VAT-registered businesses, and skipping numbers raises questions during an audit. The generator defaults to INV-001 and you bump it manually for each new invoice."
      ),
      createFAQ(
        "Do I need to register for VAT to issue an invoice?",
        "No. You can issue invoices as a non-VAT-registered sole trader or company; just leave the tax rate at 0% and don't include a VAT number. You only need to register for VAT once your taxable turnover exceeds £90,000 in any rolling 12-month period (2026 threshold). Many freelancers stay below this threshold deliberately to avoid the admin."
      ),
      createFAQ(
        "Can I add my logo to the invoice?",
        "Yes. The tool accepts a logo URL - host the image somewhere stable (your website, Imgur, Cloudinary) and paste the direct URL. The logo appears at the top of the generated invoice. For one-off use, drag-and-drop logo support is on the roadmap; for now the URL field is the way."
      ),
      createFAQ(
        "Is the downloaded invoice legally valid?",
        "Yes, provided it includes all the legally required fields listed above. HMRC accepts PDF invoices for self-assessment and VAT returns; you don't need a printed signature. Keep a copy of every invoice you issue for at least 6 years (the standard UK record-retention period for tax purposes), and ideally back them up to cloud storage as well as your accountant's portal."
      ),
      createFAQ(
        "What payment methods should I list?",
        "Bank transfer is the cheapest and fastest for UK domestic clients - include your sort code and account number in the notes field, or your IBAN and BIC for international clients. PayPal, Stripe and GoCardless are useful for clients who want card payments but cost 1.4 to 2.9% in fees, which eats into thin freelance margins. Avoid taking cheques unless absolutely necessary; they take days to clear and clients forget to send them."
      ),
    ],
    relatedTools: [
      { slug: "vat-calculator", label: "VAT Calculator" },
      { slug: "markup-calculator", label: "Markup Calculator" },
      { slug: "profit-margin-calculator", label: "Profit Margin Calculator" },
    ],
  },

  "social-media-post-scheduler": {
    sections: [
      createAnswerFirstSection(
        "What This Tool Does (and Doesn't Do)",
        "It plans a week of posts across Instagram, Twitter/X, Facebook, and LinkedIn. You add each post with a day, time, platform, and content, and the schedule builds up as a sortable list. The tool does not actually publish to those networks - that requires platform credentials, OAuth, and ongoing API costs that consumer-grade tools cost £15-50 a month for. This planner is the strategy and copy stage; the publishing happens in Buffer, Later, Hootsuite, or directly on each platform.",
        "The benefit of separating planning from publishing is honesty. Most people who say they're \"too busy to post consistently\" actually mean they're too busy to come up with what to post. Sit down for 45 minutes once a week, draft 7-15 posts here, then the daily publishing takes 90 seconds and the weekly content load drops dramatically. The tool saves to your browser so you can come back to a half-built schedule rather than starting from a blank text file."
      ),
      createAnswerFirstSection(
        "Best Time to Post by Platform",
        "The tool surfaces a quick reference panel for each platform. Instagram lands well 09:00-11:00 (commute and morning coffee window). Twitter/X peaks 17:00-19:00 (evening scroll). Facebook does best 13:00-15:00 (post-lunch break). LinkedIn favours 08:00-10:00 (start of business day). These are UK timezone defaults; shift them if your audience is mostly elsewhere.",
        "These windows are averages from large engagement studies and they hide huge variation by industry and audience. A B2B SaaS audience on LinkedIn is on at 8:30am Tuesday-Thursday; a fitness influencer's Instagram audience is on at 6am and 9pm. Check your own platform analytics after a month of posting at these defaults and adjust to whichever window your specific audience actually uses. The tool's suggested times are a starting point, not a finished answer."
      ),
      {
        heading: "Posting Cadence by Platform",
        table: {
          headers: ["Platform", "Posts per Week", "Best Window (UK)", "Content Mix"],
          rows: [
            ["Instagram", "3-5 grid + daily Stories", "09:00-11:00", "Visual-first, captions short"],
            ["Twitter/X", "10-20 (volume game)", "17:00-19:00", "Replies count more than posts"],
            ["Facebook", "3-4", "13:00-15:00", "Longer text, link previews"],
            ["LinkedIn", "2-3", "08:00-10:00 Tue-Thu", "Personal voice, niche expertise"],
          ],
        },
      },
      createAnswerFirstSection(
        "When the Schedule Falls Apart",
        "Two failure modes are common. First, batching too far ahead - you write 30 posts on a Sunday in good mood, then by Wednesday week 2 the news cycle has moved on and your scheduled posts feel out of touch. Aim for one week ahead, not four. Second, treating every post as a polished asset. Most platforms reward casual, frequent posts; over-edited content reads as marketing and gets less engagement than a quick observation typed in 90 seconds.",
        "Pair this with the [Content Calendar Generator](/content-calendar-generator) when you're stuck for what to post about; it produces topic prompts you can drop into the scheduler. For longer content like blog posts or YouTube videos that feed your social posts, the [Meeting Agenda Generator](/meeting-agenda-generator) doubles as a content brainstorm structure when you sit down to plan the week."
      ),
    ],
    faqs: [
      createFAQ(
        "Can this auto-post to Instagram and Twitter?",
        "No, this tool plans posts but doesn't publish them. To auto-post you need a tool with API access (Buffer £6/month, Later £18/month, Hootsuite £39/month). Use this planner as the writing stage and one of those for the publishing stage. The reason consumer planners don't include publishing is each platform charges API access fees that would push the monthly price tag well over what most users want to pay for a planner."
      ),
      createFAQ(
        "How many times a week should I post?",
        "Depends on the platform: Instagram 3-5 main posts a week plus daily Stories; LinkedIn 2-3; Twitter/X 10-20 if you can sustain it; Facebook 3-4. Posting more than this per platform usually has diminishing returns and starts to fatigue your audience. Posting less than this means the algorithm assumes you're inactive and your reach drops further."
      ),
      createFAQ(
        "Should I post the same content across all platforms?",
        "No, but you can adapt one core idea to each platform's format. A blog post becomes: a long LinkedIn essay, a 5-tweet thread, an Instagram carousel of slides, a single Facebook post with the link. The core idea is reused, the format respects each platform's conventions. Copy-pasting identical content reads as lazy and performs worse than tailored versions."
      ),
      createFAQ(
        "Does the tool save my schedule?",
        "Yes, the schedule saves to your browser's local storage so closing the tab won't lose your draft posts. It does not sync across devices or browsers - if you start on your laptop and continue on your phone, the schedule won't follow you. For cross-device access, copy your draft posts into a notes app or use a paid scheduler with cloud sync."
      ),
      createFAQ(
        "What's the best day to post?",
        "Tuesdays and Wednesdays give the broadest audience attention across most platforms. Mondays are reactive (people are dealing with their inbox); Fridays from lunch onwards have rapidly falling engagement; weekend rules vary by audience (B2C peaks Saturday morning, B2B drops to near-zero). Test each day for your specific audience over a month rather than copying a universal best-time-to-post chart."
      ),
    ],
    relatedTools: [
      { slug: "content-calendar-generator", label: "Content Calendar Generator" },
      { slug: "meeting-agenda-generator", label: "Meeting Agenda Generator" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "content-calendar-generator": {
    sections: [
      createAnswerFirstSection(
        "What the Generator Produces",
        "Pick a niche (technology, fitness, or business) and a frequency (daily or weekly), and the tool generates a list of content ideas tagged by format: blog posts, social posts, videos, emails, podcasts, or webinars. The daily list contains 3-4 ideas you'd rotate through; weekly is 2-3 longer-form pieces that anchor each week. The tool also outlines a three-tier content pillar strategy: core topics, related content, and engagement content.",
        "The output is a starting framework, not a finished month of content. Treat the generated ideas as topic prompts. \"Latest AI trends\" in technology or \"Recovery techniques\" in fitness is a category, not a headline; you turn each one into a specific angle (\"5 AI tools that replaced my Excel macros this quarter\") before it's something worth writing. The tool gets you past the blank page; the angle and execution still come from you."
      ),
      createAnswerFirstSection(
        "Why Content Pillars Beat Random Posting",
        "A content pillar is one of three to five recurring themes you keep coming back to. Tier 1 (core topics) is the 50-60% of your content that directly serves what you're known for - if you're a fitness coach, this is workouts, programming, recovery. Tier 2 (related content) is the 25-30% adjacent topics that broaden your reach without losing your positioning - nutrition, sleep, stress. Tier 3 (engagement) is the 15-20% lighter content - personal stories, behind-the-scenes, polls, jokes.",
        "Without pillars, content feels random and your audience never quite knows what they're following you for. With pillars, you build authority in a defined space. The classic mistake is leaning too hard on Tier 1 (boring after 3 weeks) or all the way into Tier 3 (forgettable, no value). The 50/30/20 split is a useful anchor; adjust to your industry. B2B SaaS leans more Tier 1; lifestyle creators lean more Tier 3."
      ),
      {
        heading: "Content Format Cadence",
        table: {
          headers: ["Format", "Time Investment", "Frequency", "Best For"],
          rows: [
            ["Blog post", "3-6 hours", "1-2 a week", "SEO, evergreen authority"],
            ["Social post", "10-30 mins", "Daily on chosen platforms", "Top of funnel, awareness"],
            ["Video", "4-12 hours", "1 a week", "YouTube SEO, retention"],
            ["Email newsletter", "2-3 hours", "Weekly or fortnightly", "Owned audience, direct sales"],
            ["Podcast", "2-4 hours per episode", "Weekly or fortnightly", "Niche expertise, depth"],
            ["Webinar", "8-15 hours", "Monthly or quarterly", "Lead generation, B2B sales"],
          ],
        },
      },
      createAnswerFirstSection(
        "Customising Beyond the Three Built-In Niches",
        "The tool ships with technology, fitness, and business as the niches because they cover the broadest market. If you're in a different space (parenting, finance, food, beauty, B2B SaaS), use the generated prompts as a starting structure and rewrite the topics for your audience. The format split (blog/social/video/email) and the pillar strategy work in any niche; only the specific topic seeds change.",
        "Once you have a month of ideas in front of you, slot them into the [Social Media Post Scheduler](/social-media-post-scheduler) for the actual posting calendar. The scheduler tracks day-and-time and platform; this generator gives you what to post about. For meeting-format content like webinars or sales calls, the [Meeting Agenda Generator](/meeting-agenda-generator) builds the timed run-of-show."
      ),
    ],
    faqs: [
      createFAQ(
        "How far ahead should I plan content?",
        "One month is the sweet spot for most creators. Plan further out and the world changes around you (news cycles, algorithm shifts, your own business pivots) and the calendar feels stale. Plan less than two weeks ahead and you're constantly in scramble mode. The generator gives you a month of prompts; pick the ones that resonate, leave space for reactive content tied to current events."
      ),
      createFAQ(
        "Can I generate ideas for niches not in the dropdown?",
        "The built-in niches (technology, fitness, business) are starting templates. For other niches, run the generator on the closest match and rewrite the topics to fit your audience. The format split and content pillar strategy is universal; only the topic seeds change. A travel blogger using the fitness template just swaps \"workout routine\" for \"itinerary breakdown\" and the structure carries over."
      ),
      createFAQ(
        "What's the difference between a content calendar and an editorial calendar?",
        "Used interchangeably by most people. Strict definition: a content calendar is the plan of what gets published when across all formats; an editorial calendar is specifically for written content (blog, newsletter, articles). The generator outputs a content calendar that includes editorial pieces alongside video, social, and audio. For most creators with one or two formats, the distinction doesn't matter."
      ),
      createFAQ(
        "How many topics do I need for a full month?",
        "If you're posting 3 times a week across one platform, that's 12 posts. If you're posting daily across three platforms, that's 90 posts (though most get reused across platforms, so 30-40 unique ideas). The generator gives you 3-7 ideas per run; running it three or four times with different niche/frequency combinations will fill out a month for most creators."
      ),
      createFAQ(
        "What about seasonal or holiday content?",
        "Bake holidays and key dates into your calendar as fixed anchors before you fill in regular content. Christmas, Valentine's, Black Friday, school summer holidays - these drive massive search and social interest in their respective windows. The generated prompts don't include seasonal angles automatically; layer them in when your industry has a strong seasonal pattern (retail, fitness, education, finance all do)."
      ),
    ],
    relatedTools: [
      { slug: "social-media-post-scheduler", label: "Social Media Post Scheduler" },
      { slug: "meeting-agenda-generator", label: "Meeting Agenda Generator" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "business-profit-calculator": {
    sections: [
      createAnswerFirstSection(
        "Margin vs Markup: They Are Not the Same Thing",
        "Profit margin is profit divided by selling price. Markup is profit divided by cost. A product that costs £40 and sells for £100 has a 60% margin and a 150% markup. People mix these up constantly and end up underpricing themselves, especially in retail and e-commerce where suppliers quote 'use a 50% markup' but the buyer hears 'I want a 50% margin' and ships at half the intended price.",
        "Use margin when you are reporting profitability or comparing across SKUs. Use markup when you are pricing from cost upwards on the shop floor. The calculator runs both directions: enter cost and selling price to see margin and markup side by side, or enter cost and a target margin to back out the price you need to charge."
      ),
      {
        heading: "Margin to Markup Conversion Reference",
        table: {
          headers: ["Target Margin", "Required Markup", "Example: £10 cost"],
          rows: [
            ["20%", "25%", "Sell at £12.50"],
            ["30%", "42.9%", "Sell at £14.29"],
            ["40%", "66.7%", "Sell at £16.67"],
            ["50%", "100%", "Sell at £20.00"],
            ["60%", "150%", "Sell at £25.00"],
            ["70%", "233%", "Sell at £33.33"],
          ],
        },
      },
      createAnswerFirstSection(
        "What a Healthy Margin Actually Looks Like",
        "Healthy margins vary wildly by sector. Supermarkets run on 2 to 4% net margins because volume carries them. Software businesses commonly hit 70 to 90% gross margin because the cost of the next sale is almost zero. Handmade goods on Etsy often look healthy at 50% gross margin until you subtract Etsy's 6.5% transaction fee, the £0.16 listing fee, payment processing and offsite ad fees, at which point the real number drops below 30%.",
        "Always separate gross margin (revenue minus cost of goods) from net margin (after rent, salaries, software, ads). Founders quote gross margin in pitch decks because it sounds better; banks and accountants want to see the net. If your net margin is below 5% you have almost no buffer for a bad month, so price up or cut overheads."
      ),
      createAnswerFirstSection(
        "The Break-Even Price Is Your Floor, Not Your Target",
        "Break-even is the selling price that returns your cost with zero profit. It is useful for clearance sales and competitor matching, but it is the worst possible price to anchor your menu on. Pricing 'just above break-even' leaves no room for discounts, bulk orders, returns or fees. The first time a customer asks for 10% off, you are now losing money.",
        "A more honest floor is break-even plus the percentage cost of doing business: card fees (around 1.5 to 2.5% on Stripe), refund rate (often 3 to 8% on consumer goods), and any platform commission. For an Etsy seller pricing their first product, that means break-even plus around 12 to 15% before you have made a single penny. Use the [etsy-fee-calculator](/etsy-fee-calculator) to see exactly what comes off the top before profit."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the formula for profit margin?",
        "Profit margin equals (selling price minus cost) divided by selling price, multiplied by 100. So a product that costs £40 and sells for £100 has a margin of (100 minus 40) divided by 100, which is 60%. The same product has a markup of 60 divided by 40, which is 150%. The two figures describe the same gap from different angles."
      ),
      createFAQ(
        "How do I calculate selling price from a target margin?",
        "Divide your cost by (1 minus the margin expressed as a decimal). For a 40% margin on a £15 cost item, that is 15 divided by 0.6, giving £25. The shortcut formula in the calculator does this automatically; this is the inverse of the margin calculation and the right way to price up from cost."
      ),
      createFAQ(
        "Is a 30% margin good for a small business?",
        "Gross margin of 30% is reasonable for retail and e-commerce, slim for manufacturing, and weak for software or services. The crucial question is whether 30% is enough to cover your overheads (rent, salaries, software, marketing) and still leave a net profit. Many product businesses target a 50 to 65% gross margin so that net profit lands in the 10 to 20% range after fixed costs."
      ),
      createFAQ(
        "Should I include VAT in margin calculations?",
        "No, calculate margin on the net (ex-VAT) figure. VAT is collected on behalf of HMRC and is not your money. If you sell at £120 including 20% VAT and the product cost £40 ex-VAT, your real revenue is £100 and your margin is 60%. Including VAT inflates the margin figure artificially and gives you a false sense of profitability."
      ),
      createFAQ(
        "Why does the calculator show both margin and markup?",
        "Because supplier quotes, retail pricing and accounting reports use different conventions and getting them mixed up is the most common pricing error in small businesses. Showing both side by side prevents the trap of being told 'apply a 50% markup' and accidentally pricing for a 50% margin (which would require a 100% markup), giving away half your profit on every sale."
      ),
    ],
    relatedTools: [
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" },
      { slug: "vat-calculator", label: "VAT Calculator" },
      { slug: "side-hustle-hourly-rate", label: "Side Hustle Hourly Rate" },
    ],
  },

  "meeting-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Meetings Actually Cost Your Business",
        "Plug five people on £30 to £60 hourly rates into a one-hour meeting and the bill is rarely under £200. A weekly recurring 'standup' with eight people at one hour each runs to roughly £10,000 a year. The figure feels jarring because most of us never see meeting time as a cash line item, but it sits on the salary cost ledger every single week regardless of what gets decided in the room.",
        "The hourly rate to plug in is not just gross salary divided by working hours. A loaded cost (salary plus employer NI, pension, software licences, office overhead) typically runs 1.3 to 1.5 times base salary. So a £40,000 employee actually costs around £52,000 to £60,000 a year, which means an hourly rate of roughly £28 to £33 for a 37.5-hour week, not £20. Use the loaded figure if you want the meeting bill to reflect reality."
      ),
      {
        heading: "Recurring Meeting Cost Examples (Annualised)",
        table: {
          headers: ["Meeting Setup", "Per Session", "52 Sessions/Year"],
          rows: [
            ["4 people, £30/hr, 30 min", "£60", "£3,120"],
            ["6 people, £40/hr, 1 hour", "£240", "£12,480"],
            ["8 people, £50/hr, 1 hour", "£400", "£20,800"],
            ["12 people, £45/hr, 1.5 hours", "£810", "£42,120"],
            ["3 senior people, £80/hr, 2 hours", "£480", "£24,960"],
          ],
        },
      },
      createAnswerFirstSection(
        "Using the Live Timer to Run Disciplined Meetings",
        "The live timer mode is the lever this tool exists for. Project the running cost on the screen at the start of a meeting and watch behaviour change inside three minutes. People stop telling stories that are not on the agenda, late arrivals stop apologising at length, and the chair becomes more willing to cut a tangent off because the cost of not cutting it is visible in pounds, not vague feelings.",
        "A reasonable rule that emerges from this tool: any decision-making meeting should produce a written outcome (a decision, a delegated action, a date) for every £100 of cost. A status meeting that runs to £400 with no documented outcome was a £400 chat. Status updates work better as written notes circulated before the meeting, with the meeting itself reserved for genuine debate."
      ),
      createAnswerFirstSection(
        "Smaller Rooms, Shorter Slots, Async-First",
        "The cheapest way to cut meeting cost is to invite fewer people. A six-person meeting that becomes four halves the cost. Not every team member needs to be in every meeting; circulate notes afterwards rather than pre-loading the room. Default slots of 30 minutes (rather than the calendar's automatic 60) save half the bill on any meeting that does not need the full hour, and most do not.",
        "For decisions that do not need real-time discussion, written async kills the meeting entirely. A Loom video plus a comment thread on a shared doc can replace a 45-minute review meeting that costs £300 of salary time. The general framework: real-time meetings for genuine debate or sensitive conversations, written async for status, decisions with clear options, and any update where one person is presenting and others are listening."
      ),
    ],
    faqs: [
      createFAQ(
        "What hourly rate should I use for staff in this calculator?",
        "Use a fully loaded rate that includes employer NI (15% in the UK from April 2026), pension contributions (typically 3 to 5% employer), and a share of overhead. As a shortcut, multiply gross salary by around 1.4 and divide by the annual hours worked (typically 1,950 for a 37.5-hour week). A £40,000 employee comes out to roughly £29 per hour loaded."
      ),
      createFAQ(
        "Does the timer keep running if I close my browser?",
        "No, the timer is purely client-side and runs only while the tab is open. If you reload the page or close the tab, the timer resets. This is intentional; the tool is meant for live meetings rather than long-term tracking. For longer cost analysis, use the manual minutes input instead of the running timer."
      ),
      createFAQ(
        "Should I include my own time as a manager in the cost?",
        "Yes, especially if you are running the meeting. A manager on a £70,000 salary costs around £50 per hour loaded; chairing a five-person hour-long meeting where you are also an attendee is a £250 line item that often gets forgotten because it does not show up on a separate timesheet. Include yourself for an honest figure."
      ),
      createFAQ(
        "How do I justify this cost to my team without making it awkward?",
        "Frame it as respecting people's time, not policing it. Phrases that work: 'so we know what this is worth', 'so we can decide if this needs everyone', 'so we can spot the meetings that have stopped earning their keep'. The aim is fewer better meetings, not constant cost-shaming. Most teams quietly welcome the rigour because their calendars are equally full of meetings they suspect are wasteful."
      ),
      createFAQ(
        "What is a reasonable meeting cost for a one-hour team standup?",
        "For a six-person standup at average UK rates of around £35 per hour loaded, the meeting costs roughly £210 a week or £10,920 a year. If the standup leads to clearer priorities and prevents two miscommunications a quarter, it pays for itself many times over. If it is purely status updates that could go in a written channel, that £10,000 is buying you very little."
      ),
    ],
    relatedTools: [
      { slug: "employee-cost-calculator", label: "Employee Cost Calculator" },
      { slug: "meeting-agenda-generator", label: "Meeting Agenda Generator" },
      { slug: "salary-to-hourly-converter", label: "Salary to Hourly Converter" },
    ],
  },

  "salary-to-hourly-converter": {
    sections: [
      createAnswerFirstSection(
        "Why Salary and Hourly Rate Are Not Interchangeable",
        "On paper a £40,000 salary at a 37.5-hour week converts to £20.51 per hour using 52 weeks. In practice salaried workers usually take 5.6 weeks of paid annual leave plus 8 bank holidays, which means they actually work closer to 1,762 hours, pushing the effective hourly rate to £22.70. Hourly contractors are typically only paid for hours worked, so to match a salaried equivalent including holiday pay they need a higher headline rate.",
        "When converting your salary to an hourly figure, decide whether you are calculating gross hourly equivalent (assuming all 52 weeks paid) or true hourly working rate (only counting hours actually worked). The calculator defaults to all 52 weeks because that is the most common comparison; toggle the working weeks down to 46.6 if you want to see the figure that includes statutory leave and bank holidays."
      ),
      {
        heading: "Salary to Hourly Conversion Reference (37.5 Hour Week, 52 Weeks)",
        table: {
          headers: ["Annual Salary", "Hourly Rate", "Daily (8 hr)", "Weekly"],
          rows: [
            ["£25,000", "£12.82", "£102.56", "£480.77"],
            ["£35,000", "£17.95", "£143.59", "£673.08"],
            ["£45,000", "£23.08", "£184.62", "£865.38"],
            ["£60,000", "£30.77", "£246.15", "£1,153.85"],
            ["£80,000", "£41.03", "£328.21", "£1,538.46"],
            ["£100,000", "£51.28", "£410.26", "£1,923.08"],
          ],
        },
      },
      createAnswerFirstSection(
        "Going Freelance: What Multiplier to Apply",
        "A common shortcut for salaried workers considering freelance is to take their hourly rate and multiply by 2 to 2.5. The doubling is not greed, it accounts for the costs that disappear from your day when you leave employment. As a freelancer you absorb your own pension contributions (around 5 to 8% of income for parity), your own holiday pay (10.7% to match statutory leave), sick pay, training, equipment, accounting fees, and any periods between contracts.",
        "On a £40,000 salary equivalent (£20.51 per hour), a fair freelance day rate sits between £325 and £410 (8 hours at £41 to £51). Anything below £40 per hour as a UK freelancer is below the loaded cost of an equivalent permanent employee, which means you are quietly subsidising the client's business. The [side-hustle-hourly-rate](/side-hustle-hourly-rate) tool gives a brutal truth check on what your real hourly figure looks like once expenses come out."
      ),
      createAnswerFirstSection(
        "Hourly to Salary: What Job Listings Actually Mean",
        "When a role is advertised at '£18 per hour, full time', that sits at a £35,100 annual gross at 37.5 hours over 52 weeks, or roughly £33,750 if you back out the unpaid weeks of statutory leave. Job ads are inconsistent; some include leave, some quote what would be paid if you worked every week of the year. Always ask whether quoted hours include paid holidays and bank holidays before accepting; the difference between the two assumptions is around 10% of total pay."
      ),
    ],
    faqs: [
      createFAQ(
        "How many working hours are in a year in the UK?",
        "The standard full-time week in the UK is 37.5 hours, which gives 1,950 hours over a 52-week year. After statutory holiday entitlement (28 days including bank holidays for a 5-day worker, equivalent to 5.6 weeks), actual working hours come down to roughly 1,740 to 1,762 hours per year. Use 1,950 for gross conversions and 1,740 for true working-rate comparisons."
      ),
      createFAQ(
        "Should I use 40 or 37.5 hours per week?",
        "Use 37.5 hours for most UK office and professional roles, which usually count an unpaid lunch break as outside working hours. Use 40 hours for shift work, retail, hospitality and most US-style contracts where the lunch break is included or unpaid breaks are shorter. The calculator lets you set the figure manually so you can match your specific contract."
      ),
      createFAQ(
        "Does this calculator account for tax?",
        "No, this is a gross conversion only. To see your take-home figure after income tax, National Insurance and pension contributions, use the UK tax calculator. As a quick rule of thumb, take-home in the UK is typically 70 to 75% of gross for salaries between £25,000 and £50,000, falling lower as you cross higher rate tax thresholds."
      ),
      createFAQ(
        "What hourly rate equates to a £50k salary?",
        "A £50,000 salary equates to approximately £25.64 per hour at a standard 37.5-hour week over 52 weeks. Adjusted for 5.6 weeks of statutory leave plus bank holidays, the true working-rate figure is closer to £28.41 per hour. A freelancer aiming for £50,000 a year billable income with normal expenses should target a day rate of around £400 to £450."
      ),
      createFAQ(
        "Why does the daily rate use 8 hours?",
        "Eight hours is the standard contracting and freelance day length, which usually maps to a working day with a paid hour for lunch (so a 9 to 5 day). Many salaried roles work a 7.5-hour day. The calculator uses 8 hours for the daily figure because that is the most common comparison when discussing day rates with clients or recruiters."
      ),
    ],
    relatedTools: [
      { slug: "freelance-rate-calculator", label: "Freelance Rate Calculator" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "side-hustle-hourly-rate", label: "Side Hustle Hourly Rate" },
    ],
  },

  "roi-calculator": {
    sections: [
      createAnswerFirstSection(
        "Total ROI vs Annualised Return: The Difference Matters",
        "Total ROI tells you the headline gain. A £10,000 investment that grew to £12,500 has 25% total ROI. That sounds good until you ask over what period. Earned in one year it is excellent; spread over five years it is a 4.6% annualised return, barely matching a cash ISA in 2026 and lagging inflation. The annualised figure (CAGR, compound annual growth rate) is the only honest way to compare investments of different durations.",
        "The formula behind annualised return is (final divided by initial)^(1 divided by years) minus 1, multiplied by 100. The calculator runs it both ways: enter a final value to see total and annualised ROI, or enter an annual return rate to project where you end up after a given period. Always lead with the annualised figure when comparing options because it strips out the time variable that makes raw ROI numbers meaningless."
      ),
      {
        heading: "Annualised Return Examples (£10,000 Initial)",
        table: {
          headers: ["Final Value", "Years", "Total ROI", "Annualised"],
          rows: [
            ["£10,500", "1", "5%", "5.0%"],
            ["£12,500", "5", "25%", "4.56%"],
            ["£15,000", "5", "50%", "8.45%"],
            ["£20,000", "10", "100%", "7.18%"],
            ["£25,000", "10", "150%", "9.60%"],
            ["£30,000", "20", "200%", "5.65%"],
          ],
        },
      },
      createAnswerFirstSection(
        "Benchmarks: When ROI Is Actually Good",
        "Use these reference points when judging an annualised return. Cash ISA rates in 2026 sit around 4 to 5%, which is the floor; below this you should be holding cash. UK Premium Bonds average around 4.4% but with random distribution. Long-run global stock market returns (FTSE All-World, S&P 500) average roughly 7 to 9% annualised after inflation, with significant short-term volatility. UK residential property has averaged about 5 to 6% annualised over 30 years, before transaction costs.",
        "Anything pitched at over 15% annualised should trigger immediate scepticism. Either it is short-term and unsustainable, comes with significant risk that has not been disclosed, or is a scam. Genuine 'good' returns sit in the 6 to 12% annualised range over 5+ year holding periods. Use the [compound-interest-calculator](/compound-interest-calculator) to see how those modest-looking percentages compound into substantial sums over decades."
      ),
      createAnswerFirstSection(
        "What ROI Misses: Costs, Tax and Inflation",
        "A 7% headline return becomes a 4 to 5% real return after a typical UK 2 to 3% inflation rate. If the gain is in a taxable account rather than an ISA, capital gains tax at 18 or 24% takes another bite. Investment platform fees of 0.25% to 1% per year compound over time and quietly eat 10 to 25% of your final pot over a 30-year period.",
        "The honest comparison is real, post-tax, post-fee return. A £10,000 investment growing 7% per year for 20 years reaches roughly £38,700 nominally, but only about £21,600 in 2026 spending power after 3% inflation, and less again after fees and tax. This is not a reason to avoid investing; it is a reason to use ISAs, low-cost trackers, and time horizons measured in decades rather than years."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a good annual ROI?",
        "Across diversified equity investments held for 10+ years, 7 to 9% annualised is typical and historically achievable through a global tracker fund. UK residential property averages 5 to 6% annualised before costs. Cash ISAs offer 4 to 5% in 2026. Anything claiming 'guaranteed' returns above 6% should be treated with significant scepticism, as genuine returns of that level always carry meaningful risk."
      ),
      createFAQ(
        "How is annualised return different from average return?",
        "Average return adds the annual returns and divides by years. Annualised (CAGR) compounds them. If you gain 50% in year one and lose 50% in year two, your average return is 0% but your CAGR is negative because £10,000 becomes £15,000 then £7,500. CAGR always reflects what actually happened to your money; arithmetic averages can flatter volatile investments and should be ignored."
      ),
      createFAQ(
        "Should I use ROI or IRR for evaluating projects?",
        "ROI is fine for simple buy-and-hold investments where the only cash flows are the initial outlay and a final sale. For projects with multiple cash inflows and outflows over time (such as a rental property with mortgage payments, or a business with ongoing costs and revenue), use Internal Rate of Return (IRR) instead. IRR handles the timing of every cash flow; ROI just looks at the start and end points."
      ),
      createFAQ(
        "Does the calculator account for inflation?",
        "No, it shows nominal returns. To see real (inflation-adjusted) returns, subtract approximately 2 to 3% from the annualised figure for typical UK inflation. A 7% nominal return is roughly 4 to 5% real. For longer-term planning, the real figure matters more because it tells you what your money will actually buy in the future, not what the bank statement says."
      ),
      createFAQ(
        "How long should I hold an investment to expect average returns?",
        "Long-run equity averages of 7 to 9% require 10+ year holding periods to reliably show up. Over 1 year, equity returns can range from negative 30% to positive 30%; over 20 years, the historical range narrows substantially and very few rolling 20-year periods have produced negative real returns. Time in the market is the single biggest factor in achieving the headline figures."
      ),
    ],
    relatedTools: [
      { slug: "compound-interest-calculator", label: "Compound Interest Calculator" },
      { slug: "time-to-double-calculator", label: "Time to Double Calculator" },
      { slug: "business-profit-calculator", label: "Business Profit Calculator" },
    ],
  },

  "meeting-agenda-generator": {
    sections: [
      createAnswerFirstSection(
        "Why Most Meetings Run Over and What an Agenda Fixes",
        "Meetings without timed agendas almost always overrun, and the overrun lands on whichever item is unlucky enough to be last. The fix is unglamorous: every agenda item gets a time budget, the chair sticks to it, and items that need more time get parked into a follow-up rather than steamrolling whatever was scheduled next. The generator builds this in by allocating time per item with a 5-minute welcome and 5+ minute wrap baked in.",
        "A 60-minute meeting with three discussion items typically allocates around 15 minutes per item once the welcome and wrap-up are subtracted, plus a 10-minute buffer for transition and questions. That feels tight on paper but it is realistic; most items genuinely covered in a focused 15-minute discussion would have rambled through 25 minutes in a meeting that was 'just allowed to flow'. The discipline of a written time budget is the difference between finishing on time and overrunning."
      ),
      {
        heading: "Time Allocation by Meeting Length",
        table: {
          headers: ["Total Length", "Welcome", "Per Item (3 items)", "Wrap-Up"],
          rows: [
            ["30 min", "5 min", "5 min each", "10 min"],
            ["45 min", "5 min", "10 min each", "10 min"],
            ["60 min", "5 min", "15 min each", "10 min"],
            ["90 min", "5 min", "25 min each", "10 min"],
            ["120 min", "5 min", "35 min each", "10 min"],
          ],
        },
      },
      createAnswerFirstSection(
        "Items That Belong on an Agenda (and Items That Should Not)",
        "Good agenda items are decisions, debates, or work that genuinely needs synchronous discussion. 'Approve the Q3 budget', 'Choose between supplier A and B', 'Discuss client feedback on pitch deck' all belong in a meeting because they need real-time back-and-forth. Bad agenda items are status updates, information broadcasts, and reading aloud from documents the team could have read beforehand.",
        "If you remove all status updates and reading-aloud from a typical weekly team meeting, most of them shorten by 30 to 50%. Status moves to a written channel (Slack thread, weekly Notion update, async video). The meeting becomes shorter but more useful because everyone arrives having read the context, ready to discuss and decide rather than receive information passively. This is the meeting agenda philosophy that genuinely cuts meeting cost."
      ),
      createAnswerFirstSection(
        "Sharing the Agenda Before the Meeting (Not in the Room)",
        "An agenda generated 10 minutes before the meeting and shared in the meeting room is theatre. To get the value, send the agenda 24 to 48 hours ahead with any pre-read materials linked. People come in having thought about the items, with positions formed and questions ready. This single change typically halves the time needed for genuine debate because the slow process of bringing everyone up to speed has already happened.",
        "Use the JPG download for visual circulation in chat tools (Slack, Teams), or copy the text version straight into a calendar invite description. For recurring meetings, save the agenda template, swap in the new items each week, and circulate by Friday for the following Monday. The [meeting-cost-calculator](/meeting-cost-calculator) shows what the saved time is actually worth in salary cost."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should each agenda item be?",
        "Plan around 10 to 15 minutes per substantive item once welcome and wrap are deducted, more for items that need group decision-making and less for quick informational items. The generator divides the remaining time evenly across items, which is a sensible default; manually weight time toward critical items if some clearly need more discussion than others."
      ),
      createFAQ(
        "Should the chair speak first or last on each item?",
        "Last, where possible. Chairs and senior people who speak first on an item anchor the discussion to their view and quieter voices defer to it. Letting the most junior person on the topic open the discussion, then working up the seniority ladder, surfaces a wider range of views. The chair frames the item, opens the floor, and only adds their own position once others have spoken."
      ),
      createFAQ(
        "What is the ideal agenda for a weekly team meeting?",
        "5 minutes welcome and quick personal updates, 30 minutes on the top 2 to 3 priorities for the week, 10 minutes on blockers or risks, 10 minutes on actions and ownership confirmation, 5 minutes wrap with deadlines for the next sync. This works for most 1-hour weekly meetings and avoids the trap of letting status updates eat the entire hour."
      ),
      createFAQ(
        "Do I need an agenda for a 1-on-1?",
        "A light one helps. Five minutes on personal/wellbeing check, 15 minutes on what the report wants to discuss, 10 minutes on what the manager wants to discuss, 5 minutes on actions and follow-ups for next time. The flexibility matters in 1-on-1s because the most useful conversation often emerges spontaneously, but a baseline structure prevents the meeting drifting into pure status."
      ),
      createFAQ(
        "Can I save an agenda template for reuse?",
        "The generator does not have a save feature, but the JPG download or copied text can be pasted straight into a calendar invite, Notion page, or document template. Most teams find that copying the previous week's agenda and swapping the items is the fastest workflow once the structure works for them."
      ),
    ],
    relatedTools: [
      { slug: "meeting-cost-calculator", label: "Meeting Cost Calculator" },
      { slug: "content-calendar-generator", label: "Content Calendar Generator" },
      { slug: "social-media-post-scheduler", label: "Social Media Post Scheduler" },
    ],
  },

  "nda-template-generator": {
    sections: [
      createAnswerFirstSection(
        "What an NDA Actually Does (And What It Doesn't)",
        "A non-disclosure agreement creates a legal obligation on the receiving party to keep specified information confidential and use it only for an agreed purpose. It does not stop someone leaking the information; it gives you the basis to sue for damages or seek an injunction if they do. The deterrent effect of having an NDA on file is usually more valuable than the litigation route, because most well-resourced parties simply will not breach a signed agreement.",
        "Generated NDA templates like this one cover the basic structural points (parties, purpose, definitions, term, return of materials, governing law) and produce a workable starting document for low-stakes disclosures: chatting to a freelancer about your business idea, or showing a vendor your unreleased product roadmap. For high-value transactions (M&A, licensing deals, IP transfers), have a solicitor review or draft the agreement. This template is reference guidance, not legal advice."
      ),
      createAnswerFirstSection(
        "Mutual vs One-Way: Which Direction Does Confidentiality Flow?",
        "A one-way (unilateral) NDA protects information disclosed by one party to another. The disclosing party shares; the receiving party keeps it secret. This is the default when you are showing your business to a potential investor, contractor or supplier. A mutual (bilateral) NDA protects information flowing both ways, which is appropriate when both parties expect to share sensitive information, such as in a merger discussion, joint venture or technology partnership.",
        "The generated template is structured as a one-way NDA between a Disclosing Party and a Receiving Party. To convert to mutual, both parties take on the obligations described under section 2 (Obligations) for any information they receive. If the relationship is genuinely bilateral, ask a solicitor to redraft into mutual format because the obligations and remedies need careful symmetry to be enforceable on both sides."
      ),
      {
        heading: "Common NDA Duration Choices and What They Mean",
        table: {
          headers: ["Duration", "Use Case", "Trade-off"],
          rows: [
            ["1 year", "Short pitches, brief vendor demos", "Often too short for real IP value"],
            ["2 years", "Standard early-stage commercial discussion", "Common default; balanced"],
            ["3 to 5 years", "Detailed roadmaps, proprietary methods", "Industry standard for IP-heavy deals"],
            ["7 to 10 years", "Trade secrets, formulas, source code", "Some jurisdictions limit enforcement"],
            ["Indefinite", "True trade secrets (Coca-Cola style)", "May be unenforceable in UK courts"],
          ],
        },
      },
      createAnswerFirstSection(
        "Things This Template Does Not Cover (And Probably Should In Real Use)",
        "The generated template is deliberately short to be readable and editable. Real-world NDAs often add: jurisdiction-specific carve-outs (whistleblower protections, GDPR-mandated disclosures), specific named individuals authorised to receive the information, restrictions on residual knowledge (what the receiving party can remember and use after the contract ends), liquidated damages clauses, and assignment restrictions (who can take over the agreement if the company is sold).",
        "If your situation involves any of: source code, customer data, regulated industries (finance, health, legal), cross-border transfers, or dollar values above the low five figures, do not rely on a generated template. Use it as a conversation starter with a solicitor; the legal cost of getting the agreement right is usually a small fraction of the value being protected. This generator is template guidance, not legal advice."
      ),
    ],
    faqs: [
      createFAQ(
        "Is a generated NDA legally binding?",
        "Yes, an NDA is binding as long as it is signed by both parties, identifies the parties clearly, defines what is confidential, and sets reasonable terms. The generated template covers these basics. However, enforceability in court depends on jurisdiction, the reasonableness of the obligations, and whether specific clauses meet local legal requirements. For high-value matters always have a solicitor review before relying on it."
      ),
      createFAQ(
        "How long should the confidentiality period be?",
        "2 to 5 years is the most common range for commercial NDAs. Shorter periods risk failing to cover the period during which the information has commercial value; longer periods can be challenged as unreasonable restraint of trade. The right number depends on how long the information stays valuable: software roadmaps decay fast, manufacturing processes can hold value for decades."
      ),
      createFAQ(
        "Can I use this NDA outside the UK?",
        "The generated template specifies English and Welsh law as the governing jurisdiction. For agreements between US, EU, or other parties, the governing law clause should be revised, and you should ensure the substantive obligations work under that jurisdiction. Some EU countries have specific rules around employee NDAs and trade secrets (under the EU Trade Secrets Directive) that may need to be reflected in the wording."
      ),
      createFAQ(
        "Do I need an NDA before pitching to investors?",
        "Most professional VCs and angel investors refuse to sign NDAs at the pitch stage; they see too many similar ideas and an NDA creates legal exposure if they later back a similar company. The standard practice is to share a high-level pitch without confidential operational detail, and only deeper data (cap table, customer specifics, technical IP) once an investor enters proper diligence. NDAs at the diligence stage are normal and expected."
      ),
      createFAQ(
        "What happens if someone breaches the NDA?",
        "The remedies are usually monetary damages (compensation for loss caused by the breach) and injunctive relief (a court order requiring them to stop using or disclosing the information). Damages can be hard to quantify because the loss caused by leaked confidential information is often diffuse. In practice, the threat of legal action, and the reputational damage of being known to have breached an NDA, are stronger deterrents than the financial recovery itself."
      ),
    ],
    relatedTools: [
      { slug: "invoice-generator", label: "Invoice Generator" },
      { slug: "company-name-checker", label: "Company Name Checker" },
      { slug: "meeting-agenda-generator", label: "Meeting Agenda Generator" },
    ],
  },

  "company-name-checker": {
    sections: [
      createAnswerFirstSection(
        "What Companies House Will Accept and What It Won't",
        "UK Companies House applies four broad rules to company names: they must be unique on the register, they must not be 'too similar' to an existing name, they must not contain restricted words without prior approval, and they must end with the correct suffix for the company type (Ltd, Limited, PLC, LLP, etc). The checker runs your proposed name against these structural rules before you submit, catching most issues that would cause a rejection.",
        "Restricted words include 'Royal', 'Crown', 'Government', 'NHS', 'Police', 'University', 'Bank', 'Charity', 'Trust', and 'Authority' among others. Using these requires written permission from the relevant body, and Companies House will reject names containing them without proof of approval. Even cleared names like 'British' or 'National' often need supporting justification if they appear too official or quasi-governmental."
      ),
      createAnswerFirstSection(
        "What 'Too Similar' Actually Means",
        "Companies House uses a same-as test that ignores common word variations. 'Acme Ltd' and 'Acme Limited' are considered identical. 'Acme UK Ltd' and 'Acme Ltd' are considered too similar (the geographic descriptor doesn't differentiate enough). 'Acme Holdings Ltd' and 'Acme Ltd' are usually considered different because 'Holdings' is a substantive descriptor. The line is fuzzy and ultimately decided by Companies House staff during the application review.",
        "If a name is rejected as too similar to an existing company, you have to choose a different name. There is no appeal mechanism beyond providing evidence that the existing company has explicitly consented to your use of a similar name (which they almost never will). Save yourself the rejected application by checking the live Companies House register at find-and-update.company-information.service.gov.uk before submitting."
      ),
      {
        heading: "Common Naming Mistakes That Cause Rejections",
        table: {
          headers: ["Mistake", "Why It Fails", "Fix"],
          rows: [
            ["Adding 'UK' to existing name", "Geographic descriptor not unique", "Choose distinctive name"],
            ["Using 'International' or 'Group'", "Restricted word, needs approval", "Justify with documentation"],
            ["Plural of existing name", "Same-as test fails", "Substantive change needed"],
            ["Acronym of restricted phrase", "Treated as the full phrase", "Use distinctive acronym"],
            ["Special characters at start", "Rejected on syntactic grounds", "Start with letter or digit"],
          ],
        },
      },
      createAnswerFirstSection(
        "Beyond Companies House: Trade Marks and Domains",
        "A name passing Companies House checks does not mean the name is yours to use freely. A registered trade mark in your sector blocks your right to trade under that name even if Companies House accepts the registration. The UK IPO trade mark database at ipo.gov.uk should be checked before committing to a name, especially in classes 9, 35, 38, 41 and 42 which cover most modern services.",
        "Domain availability is a third concern. The .co.uk and .com versions of your chosen name are rarely both free; if both are taken, your marketing options are constrained from day one. Check at a registrar such as Nominet (.uk) or your preferred provider before settling. The [business-name-generator](/business-name-generator) can help if you need fresh ideas after a rejection. This is a basic naming check; always verify final availability on Companies House before registering."
      ),
    ],
    faqs: [
      createFAQ(
        "Does this tool check the live Companies House register?",
        "No, the tool checks structural rules (length, restricted words, character set) but does not query the live register. To confirm a name is genuinely available, search at find-and-update.company-information.service.gov.uk. The checker catches most issues that would cause a rejection but cannot replace the live register check, which is the only authoritative source."
      ),
      createFAQ(
        "What words require special approval?",
        "Companies House publishes a list of sensitive and restricted words. Common ones requiring approval include Royal, Crown, Government, NHS, Police, University, Bank, Charity, Trust, Authority, Insurance, Solicitor, Architect, and several others. Using these without proof of authorisation causes the application to be rejected. Some require written approval from a named body before Companies House will accept them."
      ),
      createFAQ(
        "How long does the company name registration take?",
        "Online incorporation through Companies House typically takes 24 hours from a successful application. Postal applications can take 8 to 10 working days. If your name is rejected, the application is returned, you fix the issue, and resubmit; this resets the clock. Choosing a name that passes both this checker and the live register search avoids the delay."
      ),
      createFAQ(
        "Can I reserve a company name without registering?",
        "No, UK Companies House does not offer name reservation; the only way to secure a name is to incorporate the company. Some founders use a 'shelf company' with a placeholder name and rename it later, but this carries fees on both incorporation and the change of name. For most cases the simpler approach is to incorporate when you are ready to use the name."
      ),
      createFAQ(
        "What if my name passes the checker but Companies House rejects it?",
        "Companies House staff have discretion on edge cases, particularly around 'too similar' and 'misleading' rules. If your name is rejected, the application is returned with a reason code; common fixes are adding a distinctive word, removing a geographic descriptor, or providing supporting documentation for restricted words. The basic structural check this tool performs catches most issues but cannot replace human review."
      ),
    ],
    relatedTools: [
      { slug: "business-name-generator", label: "Business Name Generator" },
      { slug: "nda-template-generator", label: "NDA Template Generator" },
      { slug: "invoice-generator", label: "Invoice Generator" },
    ],
  },

  "etsy-fee-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Five Fees Etsy Takes from Every Sale",
        "Etsy fees stack up in a way that catches new sellers off guard. There is the listing fee (£0.16 per item, charged when you list and again every 4 months), the transaction fee (6.5% of the total sale including shipping), payment processing (4% plus £0.20 in the UK), the regulatory operating fee for UK and EU sellers (0.3% of the sale), and offsite ads (15% of the price if Etsy advertises your listing externally and the buyer comes through that ad).",
        "On a £25 sale with £3 shipping, the total fees come to roughly £3.32 before offsite ads, which is about 11.9% of the sale value. Add offsite ads and the figure rises to £7.07, or 25.2% of the sale. Most new sellers price using a 50% margin assumption against material cost and end up taking home far less than expected because they didn't model the fee stack."
      ),
      {
        heading: "Etsy Fee Stack on a £25 Sale (Plus £3 Shipping)",
        table: {
          headers: ["Fee", "Rate", "Amount", "Notes"],
          rows: [
            ["Listing fee", "£0.16 flat", "£0.16", "Charged per listing"],
            ["Transaction fee", "6.5% of £28", "£1.82", "Includes shipping"],
            ["Payment processing", "4% + £0.20", "£1.32", "UK/EU rate"],
            ["Regulatory fee (UK)", "0.3% of £28", "£0.08", "UK sellers only"],
            ["Offsite ads (if applicable)", "15% of £25", "£3.75", "Only on offsite-driven sales"],
            ["Total without offsite", "11.9%", "£3.38", "Always charged"],
            ["Total with offsite", "25.2%", "£7.13", "When Etsy ads drove sale"],
          ],
        },
      },
      createAnswerFirstSection(
        "How Offsite Ads Work and Whether to Opt Out",
        "Etsy enrolls all sellers in offsite ads automatically. If a buyer clicks an Etsy ad on Google, Facebook or Instagram and then buys your item within 30 days, you pay 15% of the full sale price (including shipping) in addition to all the other fees. Sellers under £8,000 in annual sales can opt out; sellers above that threshold cannot. The 15% fee can convert a profitable sale into a loss-making one if your margin is thin.",
        "Whether to opt out is genuinely contested among sellers. The case for staying in: Etsy spends real money on driving traffic to your shop, and 85% of an extra sale is more than 100% of no sale. The case for opting out: many of those 'offsite' sales would have come through anyway via direct search, and you are paying 15% on traffic that may have been organic. There is no perfect answer; the calculator lets you toggle the assumption to see your shop's specific economics."
      ),
      createAnswerFirstSection(
        "The Real Margin a Soap Maker (or Anyone) Should Aim For",
        "Plug yourself in. A handmade soap with £3.50 in materials and £1.20 packaging selling for £8.50 with £3 shipping looks healthy at a glance: gross profit per bar £4. After Etsy fees of around £1.30 (without offsite ads) and assuming you hit minimum wage on the time involved (10 minutes at £11.44 per hour is around £1.90), the true profit per bar is around £0.80. That is 9.4% net margin on the sale, which feels different from the 47% gross margin headline.",
        "For Etsy sellers, the working rule is to aim for 30% net margin after all fees, materials, and a fair hourly rate for your time. Lower than that and you are running a hobby with extra steps. Use the [side-hustle-hourly-rate](/side-hustle-hourly-rate) tool to see what your real hourly figure looks like once expenses come out, which is often the sobering moment that pushes new sellers to raise their prices."
      ),
    ],
    faqs: [
      createFAQ(
        "What percentage does Etsy take per sale in 2026?",
        "On a typical UK sale without offsite ads, Etsy fees come to around 11 to 13% of the total sale price. With offsite ads, the figure rises to 24 to 27%. The exact figure depends on the price point because the £0.16 listing fee and £0.20 fixed payment fee are flat amounts, so they take a larger percentage on lower-priced items."
      ),
      createFAQ(
        "Why are my Etsy fees higher than the headline 6.5%?",
        "The 6.5% transaction fee is just one component. On top of it sit the £0.16 listing fee, payment processing (4% plus £0.20 in the UK), the 0.3% regulatory fee, and potentially 15% offsite ads. Adding these up gets you to the real 11 to 13% (or 24%+ with offsite ads). Etsy advertises the 6.5% figure prominently because it is the lowest single component."
      ),
      createFAQ(
        "Should I include shipping in the listing price or charge it separately?",
        "Either approach has the same fee impact because Etsy charges 6.5% transaction fee plus 0.3% regulatory fee on the total of item plus shipping. The choice is really about buyer psychology: free shipping on a £15 item often converts better than a £12 item plus £3 shipping, even though the buyer pays the same. Etsy's algorithm currently favours listings that offer free shipping, which may also push you toward bundling shipping into the price."
      ),
      createFAQ(
        "Is the £0.16 listing fee charged each time someone views the listing?",
        "No, it is charged when you list the item and renews every 4 months automatically. If your item sells, the listing is automatically renewed and you are charged £0.16 again to keep it active. Multi-quantity listings (e.g. 10 of the same item) only charge one listing fee until all units sell, so for repeat-stock items the listing cost is well distributed."
      ),
      createFAQ(
        "Can I claim Etsy fees back as business expenses?",
        "Yes, all Etsy fees are deductible business expenses for self-employed UK sellers when filing self-assessment. Keep your monthly Etsy statements as records (downloadable from Shop Manager > Finances > Monthly Statements). VAT-registered sellers can also reclaim VAT on the fees, but most small UK sellers operate below the £90,000 VAT threshold and don't need to worry about VAT recovery."
      ),
    ],
    relatedTools: [
      { slug: "shopify-profit-calculator", label: "Shopify Profit Calculator" },
      { slug: "ebay-fee-calculator", label: "eBay Fee Calculator" },
      { slug: "business-profit-calculator", label: "Business Profit Calculator" },
    ],
  },

  "shopify-profit-calculator": {
    sections: [
      createAnswerFirstSection(
        "Shopify's Three Plans and Who Each Is For",
        "Shopify Basic costs $39 per month (or $29 annual) and works for shops doing under roughly $5,000 in monthly revenue. Shopify (Grow) jumps to $105 per month ($79 annual) and pays for itself once you cross around $10,000 monthly revenue thanks to lower payment processing rates. Advanced costs $399 monthly ($299 annual) and only earns its keep above roughly $25,000 monthly revenue. The breakeven points shift with your average order value and payment method.",
        "The trick is the payment processing rates. Basic is 2.9% plus $0.30 per transaction, Grow is 2.7% plus $0.30, and Advanced is 2.5% plus $0.30. The 0.4% gap between Basic and Advanced is worth $40 per $10,000 of revenue, which compounds quickly. The calculator runs the comparison side by side so you can see exactly which plan is most profitable for your sales volume."
      ),
      {
        heading: "Shopify Plan Breakeven Reference (with Shopify Payments)",
        table: {
          headers: ["Monthly Revenue", "Basic Profit", "Grow Profit", "Advanced Profit", "Best Plan"],
          rows: [
            ["$3,000", "+$26 vs Grow", "Loss", "Loss", "Basic"],
            ["$5,000", "+$8 vs Grow", "Equal", "Loss", "Basic/Grow tie"],
            ["$10,000", "Grow wins by $26", "Best", "Loss vs Grow", "Grow"],
            ["$25,000", "Loses to Grow", "Grow wins", "Equal to Grow", "Grow/Advanced tie"],
            ["$50,000", "Loses badly", "Loses to Advanced", "Best", "Advanced"],
          ],
        },
      },
      createAnswerFirstSection(
        "Third-Party Payment Gateways: The Hidden Tax",
        "Using Stripe, PayPal or any payment provider other than Shopify Payments triggers a third-party transaction fee on top of the gateway's own fee. Shopify charges 2% of the transaction value on Basic, 1% on Grow, and 0.6% on Advanced for the privilege of routing the payment outside their system. On $10,000 monthly revenue with Stripe, that is an extra $200 a month on Basic, $100 on Grow, $60 on Advanced.",
        "For most stores, using Shopify Payments natively is the cheaper choice. The exceptions are sellers in regions where Shopify Payments isn't available, sellers needing specific gateway features (recurring billing, advanced fraud rules), or sellers integrated into a wider tech stack that already uses Stripe for other revenue streams. Crunch the third-party fee into the calculator before deciding; the apparent flexibility of using your own gateway often costs more than expected."
      ),
      createAnswerFirstSection(
        "Currency Conversion: 1.5% You Probably Forgot About",
        "If your shop sells in USD but you accept payment in another currency (a UK customer paying in GBP), Shopify charges a 1.5% currency conversion fee, rising to 2% for international cards. On a $75 order from a UK buyer, that is around $1.13 to $1.50 vanishing into the conversion fee in addition to the standard payment processing. Multi-currency stores sometimes opt to set local prices in each region to avoid the conversion fee, though this requires more pricing maintenance.",
        "For dropshippers and digital product sellers serving global markets, the currency conversion fee can quietly take a percentage point off your margin that wasn't in the headline plan comparison. The calculator includes this in the per-order calculation. Compare the figure with [etsy-fee-calculator](/etsy-fee-calculator) if you're considering both platforms; Etsy's fee structure is generally simpler but takes a higher cut at the transaction level."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the cheapest Shopify plan for a small business?",
        "Shopify Basic at $39 monthly ($29 with annual billing) is the cheapest standard plan and works for stores doing under roughly $5,000 in monthly revenue. There is also Shopify Starter at $5 monthly which lets you sell through social media and chat without a full storefront, suitable for very low-volume sellers or those starting out."
      ),
      createFAQ(
        "When should I upgrade from Basic to Grow?",
        "Around $7,000 to $10,000 monthly revenue is the typical breakeven point with Shopify Payments. The lower 2.7% transaction rate (vs 2.9% on Basic) saves enough to cover the higher monthly subscription cost from that volume upward. The exact figure depends on your average order value: high-AOV stores reach breakeven faster because the 0.2% saving compounds across larger transactions."
      ),
      createFAQ(
        "Does Shopify charge transaction fees if I use Stripe?",
        "Yes. Using any payment processor other than Shopify Payments triggers an additional fee of 2% on Basic, 1% on Grow, or 0.6% on Advanced. This is on top of whatever Stripe (or your chosen gateway) charges. For most stores this makes Shopify Payments the cheaper choice unless you have specific reasons to use a third-party gateway."
      ),
      createFAQ(
        "What is a profitable margin on a Shopify product?",
        "Aim for 50 to 70% gross margin on Shopify products before fees, which gives you a 30 to 50% net margin after the typical 8 to 12% in fees, marketing costs and overheads. Dropshippers often work on 20 to 30% gross margin and rely on volume; this is workable but leaves no buffer for ad cost increases or returns. Higher-margin products give resilience against fee changes and platform shifts."
      ),
      createFAQ(
        "Are there hidden costs beyond the monthly plan?",
        "Yes. Premium themes ($150 to $400 one-off), apps for additional functionality ($10 to $200+ per month each), domain name (~$15 per year), and email marketing services (Klaviyo, Mailchimp) typically add $50 to $300 monthly to the headline plan cost. A realistic full operating cost for a Shopify store doing $10,000 a month is around $300 to $500 in tooling and subscriptions, before paid advertising."
      ),
    ],
    relatedTools: [
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" },
      { slug: "ebay-fee-calculator", label: "eBay Fee Calculator" },
      { slug: "business-profit-calculator", label: "Business Profit Calculator" },
    ],
  },

  "notice-period-calculator": {
    sections: [
      createAnswerFirstSection(
        "Statutory Notice in the UK and What 'Reasonable' Means Elsewhere",
        "UK statutory minimum notice from employee to employer is one week, regardless of how long you have worked there (after the first month). The reverse direction (employer to employee) scales with service: 1 week per year of service up to 12 weeks at 12+ years. Most employment contracts override the statutory minimum upward; a typical UK office contract requires 1 to 3 months of notice from either side, with director-level roles often requiring 6 months.",
        "The rest of the world varies dramatically. The US has at-will employment with no legal notice requirement, though 2 weeks is conventional. Germany sets statutory dismissal notice at 4 weeks to the 15th or end of the month, scaling up sharply with tenure. Australia uses a sliding scale from 1 week (under 1 year) to 4 weeks (5+ years). Always check both statutory minimum and your contract; the contract usually wins."
      ),
      {
        heading: "Notice Period by Country (Resignation by Employee)",
        table: {
          headers: ["Country", "Statutory Minimum", "Common Practice"],
          rows: [
            ["United Kingdom", "1 week (after 1 month)", "1-3 months (contract)"],
            ["United States", "None (at-will)", "2 weeks customary"],
            ["Australia", "1-4 weeks (by tenure)", "2-4 weeks"],
            ["Canada", "2 weeks (federal)", "2-4 weeks"],
            ["Germany", "4 weeks to 15th/end of month", "Often longer for senior roles"],
            ["France", "2+ weeks (varies)", "1-3 months for cadres"],
            ["Ireland", "1 week (after 13 weeks)", "1-2 weeks standard"],
            ["Singapore", "1 week to 1 month", "1 month for permanent"],
          ],
        },
      },
      createAnswerFirstSection(
        "Pay In Lieu of Notice (PILON) and Garden Leave",
        "Two clauses commonly appear in UK employment contracts that change how notice works in practice. PILON (Pay In Lieu of Notice) gives the employer the right to terminate the contract immediately and pay you the notice period as a lump sum instead of working it. Garden leave keeps you employed (and paid) but removes you from work duties during the notice period, often used to keep departing employees away from clients and information.",
        "Both are usually triggered by the employer rather than chosen by the employee. PILON is taxable in the same way as salary; garden leave technically keeps you on payroll. From the employee's perspective: PILON gives you a clean break and lump sum, garden leave delays the start of your next role. Both protect the employer, which is who is mainly worried about a departing employee taking value out of the door."
      ),
      createAnswerFirstSection(
        "Negotiating Down a Long Notice Period",
        "If you have signed a 3-month notice period and you want out faster, the realistic options are: ask your manager directly (often successful for departing employees the company is not desperate to keep), agree a shorter handover with explicit goodwill, take unpaid leave for part of it, or simply leave and accept the contractual breach (which in practice rarely results in actual legal action for ordinary employees). The first option is by far the easiest path; many employers would rather have an engaged 4-week handover than a checked-out 12-week one.",
        "If your new employer is pressing for an earlier start, ask them to discuss directly with your current employer. Companies talk to each other about this constantly and a polite call between HR teams often unlocks a 4-week start where the employee was being held to 12. Always check your contract for non-compete and gardening leave clauses before assuming you can walk; senior roles in regulated industries may face stronger restrictions."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the minimum notice period in the UK?",
        "UK statutory minimum from employee to employer is 1 week after the first month of employment, regardless of service length. Employer to employee starts at 1 week and scales up to 12 weeks at 12+ years of continuous service. However, your contract almost certainly specifies a longer figure (typically 1 to 3 months), and the contractual notice is what binds you in practice."
      ),
      createFAQ(
        "Can my employer make me work my full notice period?",
        "Yes, unless your contract has a PILON clause that lets them pay you out instead. If you resign and refuse to work the notice period, you are technically in breach of contract. In practice this rarely results in legal action against ordinary employees, but some employers will withhold the final payslip for unpaid time, refuse to give a reference, or pursue contractual breach for senior roles."
      ),
      createFAQ(
        "Does annual leave count as part of the notice period?",
        "Yes, you can use accrued annual leave during the notice period to effectively shorten the time you actually work. Your employer can usually require you to take outstanding leave during notice rather than be paid for it. Check whether your contract specifies how leave during notice is handled; the default is that any accrued but untaken leave is paid out at termination if not taken."
      ),
      createFAQ(
        "What is gardening leave and is it bad for me?",
        "Gardening leave keeps you on the payroll and continues benefits during notice but removes you from work duties. The employer keeps you contractually engaged (so you can't start at a competitor) without giving you access to information. From the employee's view it is paid time off, which sounds great but can damage skills currency on a long leave and delays the new role's start. It is most common in finance, sales and senior roles."
      ),
      createFAQ(
        "Can I quit without notice in the US?",
        "Almost all US employment is at-will, meaning either party can end the relationship at any time without legal notice. Two weeks is conventional and protects your reference; quitting without notice is legal but burns bridges. Some industries (regulated finance, healthcare, government) have specific notice rules through licensing bodies even when employment is technically at-will."
      ),
    ],
    relatedTools: [
      { slug: "salary-to-hourly-converter", label: "Salary to Hourly Converter" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
      { slug: "us-salary-vs-hourly", label: "US Salary vs Hourly" },
    ],
  },

  "side-hustle-hourly-rate": {
    sections: [
      createAnswerFirstSection(
        "The Brutal Honesty Calculation",
        "Your side hustle's true hourly rate equals (monthly income minus all expenses) divided by hours actually worked. Most makers and resellers stop at the first half of that equation. They see £800 monthly revenue, feel proud, and forget the £150 in materials, £80 in postage, £40 in marketplace fees, £20 in software subscriptions, plus another £30 in tools and equipment depreciation. £800 in becomes £480 net. Spread that across 24 hours per week (the typical weekly side hustle) and you are at £4.62 per hour - well below UK minimum wage of £11.44.",
        "The point isn't to be discouraging. Plenty of side hustles eventually hit good rates, but only if the maker confronts the numbers and adjusts. The two levers are usually price (most makers underprice their first 12 months by 30 to 50%) and time efficiency (what felt like 15 minutes per item is actually 35 once you include sourcing, photography, listing and packaging). Run the maths honestly once and the next year of decisions get a lot easier."
      ),
      {
        heading: "Hidden Side Hustle Time Categories (Per £100 Sale)",
        table: {
          headers: ["Activity", "Typical Time", "Often Forgotten Because"],
          rows: [
            ["Making the product", "30-90 min", "This is the visible work"],
            ["Photography", "15-30 min", "Felt like 'just a few photos'"],
            ["Listing copy/SEO", "15-30 min", "'Already had the description'"],
            ["Packing and posting", "10-20 min", "Adds up across multiple sales"],
            ["Customer messages", "5-15 min", "One question = 10 min reply"],
            ["Admin and accounts", "10-20 min", "Done weekly, not per sale"],
            ["Total invisible time", "55-115 min", "Usually doubles the 'making' time"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Pricing Up Almost Always Wins",
        "When a side hustle's hourly rate sits below minimum wage, the instinct is to do more sales. This is almost always the wrong move because the rate per sale is broken; doing more of a broken thing scales the loss. The right move is pricing up, even at the risk of fewer sales. A 25% price increase that loses 15% of customers leaves you with more revenue and significantly less work. Most makers test this by raising prices on their next batch and discover demand was less price-sensitive than feared.",
        "If pricing up is genuinely impossible (pure commodity products, race-to-bottom marketplaces), the side hustle's economics may be fundamentally broken and shutting it down or pivoting is the rational call. Sentimental attachment to existing products is the biggest reason side hustlers persist with sub-minimum-wage rates for years. The brutal honesty figure exists to make that conversation with yourself easier. The [etsy-fee-calculator](/etsy-fee-calculator) shows exactly what comes off the top before profit if you sell on Etsy."
      ),
      createAnswerFirstSection(
        "When a Sub-Minimum-Wage Rate Is Actually Fine",
        "There is one case where a low hourly rate is rational: when the side hustle is genuinely a hobby first and income second. If you would be making the products anyway for personal enjoyment and the income simply offsets some of the materials cost, calling it a 'business' and worrying about hourly rates is missing the point. The maths above only matters if the side hustle is being run as a financial enterprise rather than a hobby with revenue.",
        "Be honest with yourself about which one it is. Hobbyists who insist they are running a business while losing money for years are usually unhappy with the answer to 'how much am I really earning here'. Businesses that would be just as happy reframed as hobbies often relax once the pressure to scale is dropped. Both are valid; mismatched expectations between what you call it and what it actually is cause the friction."
      ),
    ],
    faqs: [
      createFAQ(
        "What counts as a side hustle expense?",
        "Anything you wouldn't spend money on if you stopped the side hustle: materials, postage, packaging, marketplace fees (Etsy, eBay, Amazon), payment processing, software subscriptions used for the business (Canva, accounting software), travel for sourcing or events, marketing and ads, plus a fair share of equipment depreciation if you bought a sewing machine, camera or 3D printer specifically for it."
      ),
      createFAQ(
        "Should I include tax in the calculation?",
        "For an honest hourly rate you should, but the calculator runs on pre-tax figures because tax depends on your other income and personal circumstances. As a UK basic-rate side hustler doing self-assessment, expect to lose around 20 to 30% of your net side hustle income to tax and NI once you cross the £1,000 trading allowance. Multiply your calculated hourly rate by 0.7 to 0.8 to get a rough post-tax figure."
      ),
      createFAQ(
        "How much should I charge to make minimum wage at my side hustle?",
        "Take the time per unit (including all the invisible categories above) and multiply by £11.44 (UK minimum wage 2026). Add materials, packaging, and marketplace fees. That is your minimum break-even price. Most side hustlers are surprised at how high this figure is; an item with 90 minutes of total time at £11.44 plus £4 in materials and £2 in fees needs to sell for £23.16 just to make minimum wage."
      ),
      createFAQ(
        "Why does my side hustle take so much time per item?",
        "Time visible to the maker (the 'making' part) is usually 30 to 60% of the total time per sale. Photography, copywriting, listing, customer messages, packaging and admin make up the rest. Most new sellers radically underestimate the invisible time. Tracking honestly for a fortnight is the standard method; the figure that comes out is almost always higher than expected and explains why the hourly rate feels so low."
      ),
      createFAQ(
        "Can a side hustle become profitable, or am I wasting time?",
        "Profitable side hustles almost always go through an unprofitable phase first; the question is whether yours is heading toward profit or stuck. Two warning signs that it is stuck: prices haven't risen in 12+ months despite cost increases, and you can't articulate what would change in the next 6 months to lift the hourly rate. A clear improvement plan (price increase, time efficiency change, new product line) is the difference between a side hustle that gets to minimum wage in year two and one that never does."
      ),
    ],
    relatedTools: [
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" },
      { slug: "salary-to-hourly-converter", label: "Salary to Hourly Converter" },
      { slug: "business-profit-calculator", label: "Business Profit Calculator" },
    ],
  },

  "invoice-number-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Number Invoices",
        "Most small businesses use sequential numbering: INV-001, INV-002, INV-003, etc. Larger systems often add a year prefix (2024-001, 2024-002), customer code (ACME-001), or department prefix (ENG-2024-001). The key is consistency - once you pick a format, stick with it for accounting reconciliation.",
        "Sequential numbering matters for tax compliance. UK HMRC and most tax authorities expect to see no gaps in invoice numbers. If you cancel an invoice, mark it as cancelled rather than reusing the number - tax investigators look for gaps as evidence of unreported income. Most accounting software (Xero, QuickBooks, FreshBooks) auto-generates numbers in your chosen format."
      ),
      {
        heading: "Common Invoice Number Formats",
        table: {
          headers: ["Format", "Example", "When to Use"],
          rows: [
            ["Sequential", "INV-001", "Simplest, small businesses"],
            ["Year + sequential", "2024-001", "Multi-year tracking"],
            ["Date-based", "20240315-1", "Date-driven reporting"],
            ["Customer code + seq", "ACME-001", "Customer-specific tracking"],
            ["Project + seq", "PROJ47-1", "Project-based billing"],
            ["Department + year + seq", "ENG-2024-001", "Multi-department orgs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Do invoice numbers need to be sequential?",
        "Most tax authorities require unique, identifiable invoice numbers but don't strictly require sequential. UK HMRC accepts any system that's consistent and uniquely identifies each invoice. Sequential is easier to audit; gap analysis is the simplest fraud check."
      ),
      createFAQ(
        "Can I restart numbering each year?",
        "Yes - many businesses do, using year prefixes (2024-001, 2025-001). Tax authorities accept this if the year is part of the unique identifier. Don't restart without the year prefix - that creates duplicate numbers across years which is non-compliant."
      ),
    ],
    relatedTools: [
      { slug: "invoice-generator", label: "Invoice Generator" },
      { slug: "salary-to-hourly-converter", label: "Salary to Hourly Converter" },
      { slug: "us-self-employment-tax-calculator", label: "Self-Employment Tax Calculator" },
    ],
  },

  "break-even-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Break-Even Actually Tells You",
        "Break-even is the sales volume where revenue exactly equals total costs - the point of zero profit and zero loss. Formula: break-even units = fixed costs ÷ (price per unit - variable cost per unit). So if fixed costs are £10,000/month, you sell at £20 per unit, and variable cost is £5 per unit: break-even = 10,000 ÷ (20-5) = 667 units per month. Below 667 = loss. Above 667 = profit.",
        "The contribution margin (price minus variable cost) is what each sale 'contributes' toward covering fixed costs. £15 contribution per unit × 667 units = £10,000 covering all fixed costs. The 668th unit is your first profitable sale. Useful for: pricing decisions, validating new product viability, understanding minimum sales targets, evaluating whether a business is sustainable."
      ),
      createAnswerFirstSection(
        "Fixed vs Variable Costs",
        "Fixed costs don't change with sales volume: rent, insurance, salaries, software subscriptions, equipment depreciation. They're paid whether you sell zero or 10,000 units. Variable costs scale with each sale: raw materials, packaging, payment processing fees, shipping. Some costs are 'semi-variable' (utilities go up with usage but have a base charge) - approximate them as fixed for break-even purposes.",
        "Misclassifying costs is the most common break-even mistake. If you treat an overtime wage as fixed, you understate variable costs and overstate margin. If you treat marketing as variable when it's actually a fixed monthly retainer, you overstate margin per unit. Be honest about which costs scale with sales and which are baseline overhead. The [Profit Margin Calculator](/profit-margin-calculator) helps with the underlying margin math."
      ),
      createAnswerFirstSection(
        "Worked Example",
        "Coffee shop scenario. Fixed monthly costs: £4,500 rent, £3,000 manager salary, £500 utilities, £200 insurance, £300 software/POS = £8,500/month. Variable cost per coffee: £0.70 (beans, milk, cup, lid, sleeve). Sale price: £4. Contribution margin: £3.30. Break-even: 8,500 ÷ 3.30 = 2,576 coffees per month, about 86/day or 11/hour during 8 working hours.",
        "Sanity check: is 86 coffees/day achievable for the location and demographic? If footfall and conversion suggest 50/day, the business won't break even at this price. Options: raise prices (4 → 5 = 4,000 needed at break-even, but reduces 100 customers/day to 80 - similar revenue), reduce fixed costs (smaller space?), or expand product mix (sell £8 lunch alongside £4 coffee). Break-even tells you the size of the gap between revenue and viability."
      ),
      createAnswerFirstSection(
        "Limitations and Adjustments",
        "Break-even assumes constant costs and prices. Real businesses have: bulk discounts on inputs (variable cost drops at higher volume), price elasticity (demand falls if prices rise), seasonal demand, competition responses, and economies of scale. Static break-even is a useful start but must be revisited regularly as conditions change.",
        "For service businesses, 'units' might be billable hours rather than products. For SaaS, monthly recurring revenue (MRR) replaces one-time unit sales. The framework is identical: fixed costs ÷ contribution per unit/hour/customer = break-even count. Use the [Markup Calculator](/markup-calculator) and [Profit Margin Calculator](/profit-margin-calculator) to set the unit economics that feed break-even."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I aim for break-even or profit?",
        "Profit, eventually. Break-even is a milestone, not a target. Most businesses aim for break-even in the early years (validate viability) and profitability after that. Sustained operation at exactly break-even means no buffer for emergencies, no growth investment, no return for owner risk."
      ),
      createFAQ(
        "How long should it take to break even?",
        "Highly variable. Service businesses with low fixed costs: weeks to months. Restaurants/retail: typically 18-24 months. Software/SaaS: 2-5 years. Hardware/manufacturing: 3-7 years. Long break-even points need substantial funding and patience; short ones suggest viable model but possibly limited scale."
      ),
      createFAQ(
        "What's a 'safety margin' over break-even?",
        "Margin of safety = (current sales - break-even) ÷ current sales. So 1,000 units at break-even 700 = 30% margin of safety. Higher = safer (sales can drop 30% before losses). Most healthy small businesses aim for 30-50% margin of safety; below 10% is precarious."
      ),
      createFAQ(
        "Does this work for online businesses?",
        "Yes - same framework. Fixed costs (hosting, software, salaries) and variable costs (payment processing, support per customer, shipping for physical goods) work the same way. SaaS businesses sometimes track 'CAC payback' (months to recover customer acquisition cost) alongside break-even on operations."
      ),
    ],
    relatedTools: [
      { slug: "markup-calculator", label: "Markup Calculator" },
      { slug: "profit-margin-calculator", label: "Profit Margin Calculator" },
      { slug: "invoice-number-generator", label: "Invoice Number Generator" },
      { slug: "us-self-employment-tax-calculator", label: "Self-Employment Tax Calculator" },
    ],
  },
};



