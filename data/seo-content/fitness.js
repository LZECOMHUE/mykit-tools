// SEO content for fitness and sports tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const fitnessSEO = {
  "swim-pace-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Swim Pace is Calculated",
        "Swim pace is typically measured in time per 100 metres (or 100 yards). To calculate your pace, divide your total swim time by the total distance, then multiply by 100. Our calculator does this instantly, allowing you to convert between metres, yards, and different pool lengths.",
        "Knowing your pacing is crucial for interval training. If you know your base pace (often called Critical Swim Speed or CSS), you can structure workouts effectively, ensuring you swim hard enough to improve without burning out early in the set."
      ),
      {
        heading: "Common Swim Paces (per 100m)",
        table: {
          headers: ["Skill Level", "100m Pace", "400m Time", "1500m Time"],
          rows: [
            ["Beginner", "2:15 - 2:30", "9:00 - 10:00", "33:45 - 37:30"],
            ["Intermediate", "1:45 - 2:00", "7:00 - 8:00", "26:15 - 30:00"],
            ["Advanced", "1:25 - 1:35", "5:40 - 6:20", "21:15 - 23:45"],
            ["Elite/Pro", "1:05 - 1:15", "4:20 - 5:00", "16:15 - 18:45"],
          ],
        },
      },
      createAnswerFirstSection(
        "Short Course vs Long Course",
        "Pool length significantly affects your pace. 'Short Course' pools are 25m or 25y long, meaning more turns. Every turn gives you a push-off advantage where you travel faster underwater than swimming on the surface. 'Long Course' pools are 50m long, meaning fewer turns and typically slower times.",
        "As a rule of thumb, most swimmers are about 1-2 seconds faster per 100m in a 25m pool compared to a 50m pool. When projecting race times, always account for the pool length you are training in."
      )
    ],
    faqs: [
      createFAQ(
        "What is CSS (Critical Swim Speed)?",
        "Critical Swim Speed (CSS) is roughly the pace you can maintain for a continuous 1500m swim without exhaustion. It is a benchmark used to set interval training paces. You test it by swimming a 400m time trial followed by a 200m time trial, and calculating the difference."
      ),
      createFAQ(
        "Why is my pool 25 yards instead of metres?",
        "In the United Kingdom and Europe, almost all pools are measured in metres (usually 25m or 50m). In the United States, high school and college swimming is competed in 25-yard pools ('Short Course Yards' or SCY). 100 yards is shorter than 100 metres (about 91.4 metres), so yard times are faster."
      ),
      createFAQ(
        "How can I improve my swim pace?",
        "Unlike running, swimming is highly technique-dependent. Drag reduction often yields faster improvements than increasing fitness. Focus on body position (hips high), streamlining off the wall, and an efficient catch. Interval training using your calculated pace will build the specific fitness needed."
      )
    ],
    relatedTools: [
      { slug: "running-pace-calculator", label: "Running Pace Calculator" },
      { slug: "cycling-pace-calculator", label: "Cycling Pace Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" }
    ]
  }
};
