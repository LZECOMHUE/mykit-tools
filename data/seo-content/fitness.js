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
  },

  "macro-calculator": {
    sections: [
      createAnswerFirstSection(
        "How This Macro Calculator Works",
        "The calculator first works out your Basal Metabolic Rate using the Mifflin-St Jeor equation, which is the most accurate BMR formula for the general population. It then multiplies your BMR by an activity factor (1.2 for sedentary up to 1.9 for extremely active) to get your Total Daily Energy Expenditure, then adjusts up or down based on your goal.",
        "The maths in plain numbers: a 30-year-old male, 175cm, 75kg has a BMR of about 1,673 calories. At a moderately active job (factor 1.55) that is a TDEE of 2,593 calories. To lose weight at a 20% deficit, you eat 2,074. To lean bulk at a 10% surplus, you eat 2,852. Calories are then split into grams of protein, carbs and fat using your chosen diet ratio. Protein and carbs each have 4 calories per gram; fat has 9 calories per gram, which is why even small amounts of fat add up fast."
      ),
      createAnswerFirstSection(
        "Picking the Right Macro Split for Your Goal",
        "There is no single best split. The right macros depend on what you are training for and which foods you actually enjoy eating. The calculator offers nine pre-set diets covering keto (5% carbs, 70% fat), high protein (40% protein), Mediterranean (50% carbs, lots of olive oil), vegan (50% carbs, 25% protein), and others including a custom option.",
        "Real world rules of thumb: if you are losing weight and lifting weights, you want at least 1.6g of protein per kg of body weight to keep muscle. If you are doing endurance work (long runs, cycling), you need carbs above 50% of total calories. If you are sedentary and trying to manage blood sugar, lower-carb splits like Low Carb or Mediterranean tend to work better. The biggest mistake is picking the most aggressive split (full keto, 1g/lb protein) when a moderate split would be far easier to actually stick to. The diet you can keep up for 6 months beats the diet you abandon in 3 weeks."
      ),
      createAnswerFirstSection(
        "How Much Protein Do You Actually Need?",
        "The legally required minimum (RDA) is 0.8g per kg of body weight, but research on muscle protein synthesis points to a higher target: 1.6 to 2.2g per kg if you are building or maintaining muscle, and 1.2 to 1.6g per kg for general fitness and health.",
        "For a 75kg person, that is 120 to 165g of protein per day for muscle building, or 90 to 120g for general health. Spread across 3 to 5 meals so each meal hits 25 to 40g, which is the amount needed to maximise muscle protein synthesis per sitting. Practical examples: 150g chicken breast (45g protein), 200g Greek yoghurt (20g), three eggs (18g), one scoop of whey (25g). If you struggle to hit your target on whole foods alone, a daily protein shake covers the gap. Pair this calculator with the [calorie deficit calculator](/calorie-deficit-calculator) and the [TDEE calculator](/tdee-calculator) for a full picture of your nutrition plan."
      ),
      createAnswerFirstSection(
        "When to Recalculate",
        "Recalculate every time your weight changes by more than 5kg, or after about 3 months on the same plan. Your BMR drops as you lose weight (a smaller body needs fewer calories), so a calorie target that worked at 90kg will be too high once you reach 80kg.",
        "The most common reason people stop losing weight is that their body has adapted to the new lower calorie level and they have not adjusted again. Re-run this calculator with your current weight and trim another 100 to 200 calories from the daily target if the scale has stalled for more than 3 weeks. Equally important: if you are bulking and the scale has been flat for 2 weeks, add 150 to 200 calories. Tracking accuracy slips over time too. If you have stopped weighing food, re-weigh your portions for a few days and you will often find what you thought was 100g is actually 130g."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between BMR, TDEE and target calories?",
        "BMR is the calories your body burns at rest, doing nothing. TDEE is BMR plus the calories you burn from movement and exercise (BMR multiplied by an activity factor). Target calories is TDEE adjusted for your goal: lower than TDEE for weight loss, equal for maintenance, higher for muscle gain. The calculator shows all three so you can see the breakdown."
      ),
      createFAQ(
        "Should I eat the same macros every day or cycle them?",
        "For most people, the same daily target is easier to stick to and works fine. Carb cycling (high carbs on training days, lower on rest days) can give a slight edge for advanced lifters or athletes, but it adds complexity that often is not worth it. Stick to consistent daily macros for 8 to 12 weeks before adding any cycling protocol, and only add it if you have already nailed the basics."
      ),
      createFAQ(
        "How accurate are these macro calculations really?",
        "The Mifflin-St Jeor equation is accurate to within about 10% for most people. Your real burn rate depends on factors no formula can capture: your genetics, gut microbiome, sleep quality, stress levels and even the temperature of your environment. Treat the calculator output as a starting point for the next 2 to 3 weeks. If the scale moves as expected, the numbers are right. If not, adjust by 100 to 200 calories and try again."
      ),
      createFAQ(
        "Do I need to weigh and track every meal?",
        "For the first 2 to 4 weeks, yes. You will be shocked at how off your eyeball estimates are (peanut butter, oils, cheese and nuts are usually 30 to 50% under-counted). After a month of tracking, most people can switch to estimating common meals and only weighing the trickier high-calorie foods. Long-term tracking everything is rarely sustainable, but periodic check-ins (a tracking week every 6 to 8 weeks) keep you honest."
      ),
      createFAQ(
        "Is keto better than low carb for fat loss?",
        "Both work, and the difference comes down to whether you can actually sustain it. Keto (5% carbs, around 30g per day) forces your body into ketosis, which suppresses appetite for many people. Low carb (20% carbs, around 100g per day) is much easier to maintain socially and includes more vegetables. Strict keto rarely beats moderate low carb in long-term trials because adherence falls off; pick the one you can stick with for 6 months."
      ),
    ],
    relatedTools: [
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "calorie-deficit-calculator", label: "Calorie Deficit Calculator" },
      { slug: "protein-intake-calculator", label: "Protein Intake Calculator" },
    ],
  }
};
