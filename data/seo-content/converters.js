// SEO content for converter tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const convertersSEO = {
  "kg-to-stone": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kilograms to Stone",
        "To convert kilograms to stone, divide the weight in kilograms by 6.35029. For example, 70 kg divided by 6.35029 equals 11 stone and 0.2 pounds. The UK commonly uses stone for body weight, while most of the world (and medical settings) use kilograms.",
        "The stone is a unit of weight equal to 14 pounds or approximately 6.35 kg. It is used primarily in the UK and Ireland for measuring body weight. If you step on a scale at a UK gym, it will likely show stone and pounds. If your doctor measures you, they will likely record it in kilograms."
      ),
      {
        heading: "Common Kg to Stone Conversions",
        table: {
          headers: ["Kilograms", "Stone", "Stone & Pounds"],
          rows: [
            ["50 kg", "7.87 st", "7st 12lb"],
            ["60 kg", "9.45 st", "9st 6lb"],
            ["70 kg", "11.02 st", "11st 0lb"],
            ["75 kg", "11.81 st", "11st 11lb"],
            ["80 kg", "12.60 st", "12st 8lb"],
            ["85 kg", "13.39 st", "13st 5lb"],
            ["90 kg", "14.17 st", "14st 2lb"],
            ["100 kg", "15.75 st", "15st 10lb"],
          ],
        },
      },
      createAnswerFirstSection(
        "When You Need Kg to Stone Conversion",
        "The most common reason is tracking body weight. NHS guidelines, BMI charts, and GP records typically use kilograms, but most people in the UK think of their weight in stone. If your bathroom scales show kilograms and you want to know your weight in stone, this converter gives you an instant answer.",
        "It is also useful when following fitness or weight loss programmes. Many UK-based plans quote target weights in stone, while gym equipment and food tracking apps often use kilograms. Having a quick reference makes it easier to switch between the two without mental arithmetic."
      ),
    ],
    faqs: [
      createFAQ(
        "How many kg is 1 stone?",
        "One stone is exactly 6.35029318 kilograms, or roughly 6.35 kg. This means 10 stone is about 63.5 kg, and 15 stone is about 95.3 kg."
      ),
      createFAQ(
        "Why does the UK still use stone?",
        "The UK officially uses the metric system, but stone remains the most common way to discuss body weight in everyday conversation. It persists because people find it easier to think in stone for weights they encounter daily, even though medical and scientific settings use kilograms."
      ),
      createFAQ(
        "What is a healthy weight in stone?",
        "A healthy weight depends on your height. For example, a person who is 5ft 7in (170 cm) has a healthy BMI range of roughly 8st 2lb to 11st 0lb (52-70 kg). Use a BMI calculator alongside this converter to check your healthy weight range."
      ),
    ],
    relatedTools: [
      { slug: "stone-to-kg", label: "Stone to Kg" },
      { slug: "kg-to-lbs", label: "Kg to Lbs" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },

  "miles-to-steps": {
    sections: [
      createAnswerFirstSection(
        "How Many Steps in a Mile?",
        "The average person takes approximately 2,000 to 2,500 steps per mile, depending on stride length. A person with a shorter stride (around 2.2 feet) will take closer to 2,400 steps per mile, while someone taller with a longer stride (around 2.7 feet) will take closer to 1,950 steps.",
        "The commonly cited figure of 2,000 steps per mile is a reasonable average, but your actual count can vary by up to 25% based on your height, walking speed, and terrain. Walking uphill or on uneven ground shortens your stride and increases your step count per mile."
      ),
      {
        heading: "Steps per Mile by Height",
        table: {
          headers: ["Height", "Average Stride", "Steps per Mile"],
          rows: [
            ["5ft 0in (152 cm)", "2.1 ft", "~2,514"],
            ["5ft 4in (163 cm)", "2.2 ft", "~2,400"],
            ["5ft 8in (173 cm)", "2.5 ft", "~2,112"],
            ["6ft 0in (183 cm)", "2.7 ft", "~1,956"],
            ["6ft 4in (193 cm)", "2.9 ft", "~1,818"],
          ],
        },
      },
      createAnswerFirstSection(
        "Reaching 10,000 Steps a Day",
        "The popular target of 10,000 steps per day is roughly equivalent to walking 4 to 5 miles, depending on your stride length. For the average person, this takes about 60 to 90 minutes of total walking time throughout the day.",
        "Research suggests that health benefits start at around 7,000 to 8,000 steps per day, with diminishing returns above 10,000. If 10,000 steps feels like too much, even reaching 7,500 steps is associated with a significant reduction in all-cause mortality. Every additional 1,000 steps helps."
      ),
      createAnswerFirstSection(
        "Walking for Weight Loss",
        "Walking one mile burns approximately 80 to 100 calories, depending on your weight and pace. At 10,000 steps per day (roughly 5 miles), you could burn an extra 400 to 500 calories daily. Over a week, that adds up to about 1 pound of fat loss if combined with a balanced diet.",
        "Brisk walking (around 3.5 mph or 5.6 km/h) burns more calories per mile than a leisurely stroll because your body works harder to maintain the faster pace. Adding incline further increases calorie burn."
      ),
    ],
    faqs: [
      createFAQ(
        "How do I measure my stride length?",
        "Walk 10 steps at your normal pace, measure the total distance in feet, and divide by 10. Alternatively, walk a known distance (like 100 metres) and count your steps. Divide the distance by the number of steps to get your average stride length."
      ),
      createFAQ(
        "Are phone step counters accurate?",
        "Most smartphones are accurate to within 10-20% for step counting. Dedicated fitness trackers worn on the wrist tend to be slightly more accurate. For the best results, keep your phone in a trouser pocket rather than a bag, and calibrate your tracker with your actual stride length."
      ),
      createFAQ(
        "How far is 10,000 steps in miles?",
        "For the average person, 10,000 steps is approximately 4.5 to 5 miles (7.2 to 8 km). The exact distance depends on your stride length. Taller people cover more ground per step, so 10,000 steps might be closer to 5.5 miles for someone over 6 feet tall."
      ),
    ],
    relatedTools: [
      { slug: "steps-to-miles", label: "Steps to Miles" },
      { slug: "km-to-miles", label: "Km to Miles" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },

  "cups-to-grams-butter": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Cups of Butter to Grams",
        "One US cup of butter weighs 227 grams (8 ounces or 2 standard sticks). Half a cup is approximately 113.5 grams and a quarter cup is about 57 grams. Butter is one of the easier ingredients to convert because its density is consistent, unlike flour or sugar which can vary based on how tightly they are packed.",
        "In UK recipes, butter is almost always measured by weight in grams. American recipes use cups or sticks. If you are following an American baking recipe in a UK kitchen, this converter saves you from guessing and helps you get the proportions right."
      ),
      {
        heading: "Butter Measurement Conversions",
        table: {
          headers: ["Cups", "Grams", "Ounces", "Sticks", "Tablespoons"],
          rows: [
            ["1/4 cup", "57 g", "2 oz", "1/2 stick", "4 tbsp"],
            ["1/3 cup", "76 g", "2.7 oz", "2/3 stick", "5.3 tbsp"],
            ["1/2 cup", "113 g", "4 oz", "1 stick", "8 tbsp"],
            ["2/3 cup", "151 g", "5.3 oz", "1 1/3 sticks", "10.7 tbsp"],
            ["3/4 cup", "170 g", "6 oz", "1 1/2 sticks", "12 tbsp"],
            ["1 cup", "227 g", "8 oz", "2 sticks", "16 tbsp"],
            ["2 cups", "454 g", "16 oz", "4 sticks", "32 tbsp"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Weight Matters in Baking",
        "Baking is a science, and small measurement errors can affect the outcome. Cup measurements can vary by 10-20% depending on how you scoop and level the ingredient. A cup of flour scooped and packed might weigh 140 grams, while a cup spooned and levelled might weigh only 120 grams.",
        "Butter is more forgiving than flour because its density does not change much. However, if your recipe calls for softened butter in a cup, the measurement assumes it is firmly packed with no air gaps. For the most accurate results, weigh your butter on a kitchen scale."
      ),
      createAnswerFirstSection(
        "Salted vs Unsalted Butter",
        "The weight conversion is the same for salted and unsalted butter. One cup of either type weighs 227 grams. However, if your recipe calls for unsalted butter and you only have salted, reduce any added salt in the recipe by about 1/4 teaspoon per half cup (113g) of butter.",
        "Most baking recipes call for unsalted butter so you can control the salt level precisely. If a recipe does not specify, assume unsalted."
      ),
    ],
    faqs: [
      createFAQ(
        "How many grams is 1 cup of butter?",
        "One US cup of butter is 227 grams. This is equal to 8 ounces, 2 US sticks, or 16 tablespoons. In UK cooking, 225 grams is the closest standard measurement and is close enough for any recipe."
      ),
      createFAQ(
        "What is a 'stick' of butter in grams?",
        "One US stick of butter is 113 grams (4 ounces or 1/2 cup). American recipes often call for butter in sticks. Two sticks equal one cup (227 grams). A stick typically has tablespoon markings on the wrapper for easy measuring."
      ),
      createFAQ(
        "Can I use margarine instead of butter?",
        "For baking, margarine and butter can usually be swapped at a 1:1 ratio by weight. However, margarines with less than 80% fat content contain more water and can affect texture. For pastry, pie crusts, and laminated doughs (like croissants), real butter gives better results."
      ),
    ],
    relatedTools: [
      { slug: "cups-to-grams", label: "Cups to Grams (All Ingredients)" },
      { slug: "grams-to-cups", label: "Grams to Cups" },
      { slug: "cups-to-ml", label: "Cups to ml" },
    ],
  },
};
