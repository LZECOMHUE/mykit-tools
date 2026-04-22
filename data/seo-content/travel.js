// SEO content for travel tools
// Rule: no em dashes. Use " - " instead.
import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const travelSEO = {
  "drive-vs-train-cost": {
    sections: [
      createAnswerFirstSection(
        "Is It Cheaper to Drive or Take the Train in the UK?",
        "It depends on the journey length, how many people are travelling, and whether you book train tickets in advance. For short trips under 100 miles with one person, the train is often cheaper once you factor in fuel, parking and wear. For longer journeys with multiple passengers splitting fuel costs, driving can win by a significant margin.",
        "Use this calculator to enter the real numbers for your trip. The driving side covers fuel (calculated from your car's MPG and the current fuel price per litre), plus any parking costs, split across everyone in the car. The train side covers ticket price per person, number of tickets, and transfer costs - taxis or buses to and from each station."
      ),
      {
        heading: "Typical UK Fuel and Train Cost Comparisons",
        table: {
          headers: ["Journey (one way)", "Drive cost (1 person)", "Drive cost (4 people)", "Train (advance)"],
          rows: [
            ["London to Birmingham (120 mi)", "~£17", "~£4 per person", "~£15-35"],
            ["London to Manchester (200 mi)", "~£28", "~£7 per person", "~£25-70"],
            ["London to Edinburgh (400 mi)", "~£56", "~£14 per person", "~£40-120"],
            ["Bristol to Cardiff (45 mi)", "~£7", "~£2 per person", "~£10-20"],
          ],
        },
      },
      createAnswerFirstSection(
        "What the Calculator Does Not Include",
        "For a truly fair comparison, you should also consider car depreciation (roughly 10-15p per mile for an average car), insurance, and servicing costs. These are real costs of car ownership that fuel alone does not capture.",
        "On the train side, the headline ticket price rarely tells the whole story - consider luggage fees on some operators, on-board food and drink, and the taxi or bus transfer at both ends. The calculator has a dedicated transfer costs field so you can add those in."
      ),
    ],
    faqs: [
      createFAQ(
        "How does the calculator work out fuel cost?",
        "It converts your car's MPG (miles per gallon, UK imperial) into litres per 100km using the formula 282.5 / MPG. It then calculates litres used for the round trip distance and multiplies by your fuel price per litre. The result is split by the number of passengers in the car."
      ),
      createFAQ(
        "Why does my MPG default to 45?",
        "45 MPG is roughly the UK average for a modern petrol family car. If you drive a diesel, SUV, or older vehicle your figure will differ - check your car's real-world MPG on sites like Fuelly or your manufacturer's spec sheet for an accurate result."
      ),
      createFAQ(
        "Is driving or the train better for the environment?",
        "For a solo driver, the train almost always produces fewer CO2 emissions per passenger. A typical UK car emits around 171g of CO2 per km, while rail averages around 41g per passenger km. With 4 people in the car the maths shifts closer to parity, though the train is still typically greener."
      ),
      createFAQ(
        "When is driving clearly cheaper than the train?",
        "Driving tends to win clearly when: you have 3 or more people splitting costs, you book last minute (train walk-up fares are expensive), you need to carry large amounts of luggage, or the destination has free parking. It also wins for door-to-door rural journeys where train transfers add both cost and time."
      ),
      createFAQ(
        "What fuel price should I use?",
        "The default is £1.42 per litre, which reflects UK average unleaded petrol prices in early 2026. Check the latest price at your local station - prices vary by 10-15p/litre across the UK and fluctuate week to week. Diesel is typically 5-10p higher per litre than petrol."
      ),
    ],
    relatedTools: [
      { slug: "fuel-cost-calculator", label: "Fuel Cost Calculator" },
      { slug: "travel-budget-calculator", label: "Travel Budget Calculator" },
      { slug: "distance-calculator", label: "Distance Calculator" },
    ],
  },
};
