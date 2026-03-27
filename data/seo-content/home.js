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
  }
};
