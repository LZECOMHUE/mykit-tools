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
  }
};

