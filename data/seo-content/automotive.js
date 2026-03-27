// SEO content for vehicle and transport tools
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
  }
};
