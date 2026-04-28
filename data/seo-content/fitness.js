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
  },

  "body-fat-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the US Navy Body Fat Method Works",
        "This calculator uses the US Navy circumference method, which estimates body fat from a tape measure rather than a scale. For men it uses height, neck and waist. For women it adds hip circumference because fat distribution differs around the pelvis. The numbers go through a logarithmic formula and you get a percentage out the other end.",
        "Measure first thing in the morning before food or water, standing relaxed. Neck just below the larynx, waist at the navel for men or the narrowest point for women, hips at the widest part of the buttocks. A small mistake (1cm out on the waist) shifts the result by about 1% body fat, so do each measurement twice and use the average."
      ),
      {
        heading: "Body Fat Categories (American Council on Exercise)",
        table: {
          headers: ["Category", "Men", "Women"],
          rows: [
            ["Essential fat", "2-5%", "10-13%"],
            ["Athlete", "6-13%", "14-20%"],
            ["Fitness", "14-17%", "21-24%"],
            ["Average", "18-24%", "25-31%"],
            ["Obese", "25%+", "32%+"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Different Methods Give Different Numbers",
        "If you have ever had body fat measured three different ways and got three answers, you are not alone. Skinfold calipers tend to read 2-3% lower than the Navy tape method. Bioelectrical impedance (BIA) scales swing wildly with hydration, often varying by 4-5% from morning to evening. DEXA scans are the closest thing to a gold standard but typically read 3-5% higher than tape methods.",
        "The trick is to pick one method and stick with it for tracking. A woman starting at 28% by Navy method who reaches 24% three months later by Navy method has lost real fat. Comparing her starting Navy reading to a final DEXA reading tells her almost nothing. The trend matters far more than the absolute number."
      ),
    ],
    faqs: [
      createFAQ(
        "Is body fat percentage more useful than BMI?",
        "For most people who exercise, yes. BMI cannot tell muscle from fat, so a heavily muscled rugby player and a sedentary office worker can score the same BMI despite very different bodies. Body fat percentage gives you the actual ratio of fat to lean tissue, which correlates better with metabolic health markers. The exception: if you are sedentary and overweight, BMI and body fat percentage will agree closely enough that either works."
      ),
      createFAQ(
        "What body fat percentage shows abs?",
        "Visible abs typically appear at around 12% for men and 20% for women, give or take a couple of points based on genetics. Some people have a defined six-pack at 15% because their abdominal muscles are well developed and abdominal fat distribution is favourable; others stay smooth-stomached until 9% because they store fat there preferentially. Genetics decides where your body sheds fat last, and there is nothing you can do to spot-reduce."
      ),
      createFAQ(
        "How accurate is the Navy method really?",
        "The Navy formula is accurate to within about 3-4% for most adults compared to DEXA scan. It tends to underestimate body fat in very lean athletic men and overestimate it in shorter women. It also assumes typical fat distribution patterns; if yours is unusual (very narrow hips relative to bust, for example) the formula will be off. Treat the result as a starting point for tracking change rather than a precise medical reading. For genuine clinical body composition assessment, ask your GP about referral for a DEXA scan."
      ),
    ],
    relatedTools: [
      { slug: "bmi-calculator", label: "BMI Calculator" },
      { slug: "ideal-weight-calculator", label: "Ideal Weight Calculator" },
      { slug: "tdee-calculator", label: "TDEE Calculator" },
    ],
  },

  "calorie-deficit-calculator": {
    sections: [
      createAnswerFirstSection(
        "How a Calorie Deficit Actually Causes Fat Loss",
        "There are roughly 7,700 calories in a kilogram of body fat. To lose 1kg you need to be 7,700 calories below your maintenance level over time, which can be split however you like: 1,100 calories a day for a week, or 250 calories a day for a month. The calculator works out your maintenance calories from your weight and activity level, then subtracts the deficit needed to reach your goal in your chosen timeframe.",
        "A safe deficit sits between 300 and 700 calories per day for most adults. Anything beyond 1,000 a day risks muscle loss, energy crashes, and the kind of hunger that ends in a Saturday-night binge that wipes out the week's progress. The NHS recommends losing no more than 0.5 to 1kg per week, which lines up with a daily deficit of about 500 to 1,000 calories."
      ),
      createAnswerFirstSection(
        "Why the Scale Stalls After a Few Weeks",
        "Almost everyone hits a plateau around week 3 or 4. There are three reasons. Your metabolism adapts: as you lose weight your body needs fewer calories to run, so the deficit that once produced loss now equals maintenance. Water retention masks fat loss: a stressful week or a salty takeaway can hide 3kg of real fat loss for days. And calorie creep: portion sizes drift up as the diet feels familiar, particularly with oils, nut butters, and cheese which are dense and easy to under-count.",
        "If the scale has been flat for 3 weeks or more, recalculate using your current weight and shave another 100-200 calories off the daily target. Equally check tracking accuracy: weigh five everyday foods you eat regularly and you will probably find at least one is 30% larger than your eyeball estimate. Pair this calculator with the [TDEE calculator](/tdee-calculator) to see how your maintenance number changes as you lose weight."
      ),
      createAnswerFirstSection(
        "How Slow Is Too Slow, How Fast Is Too Fast",
        "A sustainable rate is 0.5-1% of your body weight per week. For an 80kg person that is 400-800g per week, around 200-400g for a 40kg child or teenager. Anything faster than 1% per week and you are mostly losing water and muscle, which is why crash dieters always rebound: they regain water immediately, look bloated, get demoralised, and quit.",
        "If your deficit comes back warning red on the calculator, your goal weight is too aggressive for your timeframe. Either extend the timeframe or move the goal weight closer. A 15kg loss is realistic in 6 months, exhausting in 3 months, and almost guaranteed to fail in 6 weeks. Slower diets keep more muscle, look better at the end, and stay off."
      ),
    ],
    faqs: [
      createFAQ(
        "How many calories should I cut to lose 1lb a week?",
        "About 500 calories per day. There are roughly 3,500 calories in a pound of fat, so a 500-calorie daily deficit produces about 1lb of loss per week. For 2lb a week you need 1,000 calories per day, which is uncomfortable for most people and not generally recommended unless supervised by a GP or dietitian."
      ),
      createFAQ(
        "Can I exercise instead of eating less?",
        "You can, but it is much harder than it sounds. A 30-minute jog burns around 300 calories, which is undone by one chocolate bar. Most successful weight loss happens through eating less, with exercise added for general health, mood, and to preserve muscle. The NHS Eatwell Guide recommends combining a modest deficit (around 500 cal/day) with at least 150 minutes of moderate activity per week, not relying on exercise alone."
      ),
      createFAQ(
        "Will I lose muscle in a deficit?",
        "Some, unless you actively work to keep it. Eat at least 1.6g of protein per kilogram of body weight per day, do resistance training 2-3 times a week, and keep your deficit moderate (under 700 calories per day). With those three things in place you will lose mostly fat. Without them, expect about 25-30% of your weight loss to come from muscle, particularly if you are over 40."
      ),
      createFAQ(
        "Is this calculator suitable if I have a medical condition?",
        "These numbers are general estimates only. If you have diabetes, thyroid issues, PCOS, are pregnant or breastfeeding, are recovering from an eating disorder, or are taking medications that affect appetite or metabolism, please speak to your GP or a registered dietitian before starting any calorie deficit. The right plan for you may look very different from a generic calculator output."
      ),
    ],
    relatedTools: [
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "macro-calculator", label: "Macro Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },

  "early-pregnancy-symptoms-checker": {
    sections: [
      createAnswerFirstSection(
        "When Symptoms Actually Start",
        "Most people who go on to test positive notice their first symptom somewhere between 1 and 2 weeks after conception, which is around the time their period would have been due. The earliest reliable sign is a missed period. Everything else (sore breasts, fatigue, queasiness, frequent trips to the loo) tends to arrive in the days after, although a small percentage notice them slightly earlier.",
        "Implantation bleeding, when it happens at all, occurs around 6-12 days post-ovulation as the embryo embeds into the uterine wall. It is much lighter than a period and usually pinkish-brown rather than red. Many women never notice it; about a third of pregnancies show some implantation spotting."
      ),
      {
        heading: "Symptom Reliability for Early Pregnancy",
        table: {
          headers: ["Symptom", "Reliability", "Typical timing"],
          rows: [
            ["Missed period", "Very high", "Around 4 weeks gestational age"],
            ["Breast tenderness", "High", "1-2 weeks after conception"],
            ["Nausea / morning sickness", "High", "Peaks around weeks 6-12"],
            ["Extreme fatigue", "High", "From around week 4"],
            ["Implantation spotting", "Moderate", "6-12 days post-ovulation"],
            ["Frequent urination", "Moderate", "From around week 6"],
            ["Bloating, cramping", "Low to moderate", "Easily mistaken for PMS"],
            ["Heightened smell, metallic taste", "Low", "Variable, often weeks 5-8"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why So Many Symptoms Could Be Something Else",
        "The cruel reality of trying to conceive is that almost every early pregnancy symptom is also a perfectly normal late-luteal-phase PMS symptom. Sore breasts, mood swings, bloating, fatigue, and food cravings happen monthly to many women regardless of pregnancy. This is why no online checker (including this one) can tell you you are pregnant. Only a positive home pregnancy test or a blood test from your GP can do that.",
        "If your period is late, take a home test. Modern tests detect hCG from the day of your missed period with about 99% accuracy. If it is negative and you are still late after another 5-7 days, retest or contact your GP. If you are getting symptoms but tests keep coming back negative, an irregular cycle or delayed ovulation is much more likely than a hidden pregnancy. The [period tracker](/period-tracker) can help you spot whether your cycle is genuinely late."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I have pregnancy symptoms before a positive test?",
        "Sometimes, but not usually. Home tests detect hCG, the hormone that causes most pregnancy symptoms. If you have enough hCG to feel queasy or sore, you almost always have enough for a sensitive test to detect. The main exception is testing too early in the morning with diluted urine. If you are convinced you have symptoms but test negative, wait 48 hours and retest first thing in the morning."
      ),
      createFAQ(
        "How early can I test?",
        "Most home tests are accurate from the day of your missed period. Some early-detection tests claim accuracy 5-6 days before your period is due, but the false-negative rate is much higher (around 50% at 5 days early). For peace of mind, wait until at least the day your period is due. The NHS recommends testing one day after a missed period for the most reliable result."
      ),
      createFAQ(
        "I have all the symptoms but my test is negative. What now?",
        "Three common explanations: you tested too early, you ovulated later than usual this cycle so your period is delayed, or your symptoms are PMS rather than pregnancy. Wait 48-72 hours, retest with first-morning urine, and if it is still negative and your period has not arrived after another week, contact your GP. They can do a blood test (more sensitive than urine) and check for other causes of a missed period."
      ),
      createFAQ(
        "Is this checker a substitute for a pregnancy test?",
        "No, and please do not treat it as one. This tool is for educational reference only. It cannot diagnose pregnancy and it cannot rule it out. If you suspect you are pregnant, take a home test or speak to your GP or pharmacist. If you are pregnant and starting to plan, see the [pregnancy due date calculator](/pregnancy-due-date-calculator)."
      ),
    ],
    relatedTools: [
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "period-tracker", label: "Period Tracker" },
    ],
  },

  "ideal-weight-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Four Formulas Differ",
        "The calculator runs four classic formulas: Devine (1974, originally developed for medication dosing), Robinson (1983), Miller (1983), and Hamwi (1964, used for diabetes care). All take a base weight at 60 inches (5ft) and add a set amount of weight per inch above that. The Devine formula is the strictest, Hamwi is the most generous for taller men, and Robinson and Miller sit in the middle.",
        "Because each formula uses slightly different coefficients, you get a range rather than a single number. For a 175cm man, Devine gives 71.5kg, Robinson 70.4kg, Miller 71.7kg, Hamwi 76.5kg. The calculator shows you all four, plus a min-max range and an average, then adjusts for your frame size by adding or subtracting roughly 5kg for large or small frames."
      ),
      {
        heading: "NHS Healthy BMI Range vs Ideal Weight Formulas",
        table: {
          headers: ["Height", "NHS BMI 18.5-24.9", "Devine (women)", "Devine (men)"],
          rows: [
            ["155cm (5'1\")", "44-60kg", "47.6kg", "52.1kg"],
            ["165cm (5'5\")", "50-68kg", "56.7kg", "61.2kg"],
            ["175cm (5'9\")", "57-76kg", "65.8kg", "71.5kg"],
            ["185cm (6'1\")", "63-85kg", "75.0kg", "80.6kg"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Ideal Weight Is a Range, Not a Number",
        "The whole concept of one ideal weight for a given height is medically out of date. Body composition matters more than the number on the scale. A muscular 80kg woman at 168cm is healthier than a 60kg woman of the same height with low muscle mass and high visceral fat, even though the formulas would call the lighter weight more ideal. The NHS uses the BMI healthy range of 18.5 to 24.9 as a population guideline, not a personal target.",
        "Better questions than what should I weigh include: do my clothes fit how I want them to, is my waist measurement under 94cm (men) or 80cm (women), is my blood pressure healthy, can I do daily activities without breathlessness. The [BMI calculator](/bmi-calculator) and [body fat calculator](/body-fat-calculator) together give a fuller picture than any ideal weight formula on its own."
      ),
    ],
    faqs: [
      createFAQ(
        "Which formula should I trust most?",
        "For most adults, Robinson and Miller produce the most realistic numbers. Devine tends to read low for tall men. Hamwi reads high. If you want one figure, take the average of all four. If you have a small or large frame (measured at the wrist), adjust the result down or up by about 5kg accordingly. None of these is a medical diagnosis; they are population averages from decades-old studies."
      ),
      createFAQ(
        "How do I work out my frame size?",
        "Wrap your thumb and middle finger around the opposite wrist. If they overlap easily, you have a small frame. If they just touch, medium. If they do not meet, large. For a more precise reading, measure the wrist circumference: men under 16.5cm is small, 16.5-19cm medium, over 19cm large. Women under 14cm small, 14-16.5cm medium, over 16.5cm large."
      ),
      createFAQ(
        "Are these formulas suitable for athletes?",
        "Not really. The formulas assume average muscle mass, which is fine for sedentary or lightly active adults but underestimates a healthy weight for athletes, weightlifters, or anyone with significantly above-average lean mass. A rugby player might be 15kg above their formula ideal weight while sitting at 12% body fat and being entirely healthy. Body fat percentage and waist measurement are far more meaningful for athletic populations."
      ),
      createFAQ(
        "Should I aim for the lowest number from the formulas?",
        "Generally no. The lowest number is usually Devine, originally created for drug dosing not for health goals. Aiming for it can drive disordered eating in some people. The healthy range, particularly the average across all four formulas, is a more sensible target. If you have specific medical reasons for needing a particular weight (joint problems, sleep apnoea, fertility treatment), your GP or consultant can advise on a personalised target."
      ),
    ],
    relatedTools: [
      { slug: "bmi-calculator", label: "BMI Calculator" },
      { slug: "body-fat-calculator", label: "Body Fat Calculator" },
      { slug: "tdee-calculator", label: "TDEE Calculator" },
    ],
  },

  "irregular-cycle-ovulation-estimator": {
    sections: [
      createAnswerFirstSection(
        "Why Standard Ovulation Calculators Fail with Irregular Cycles",
        "The standard ovulation calculator assumes you ovulate roughly 14 days before your next period and that your cycle is reliable enough to predict that next period. With an irregular cycle, neither assumption holds. If your cycles range from 26 to 38 days, ovulation could happen anywhere from day 12 to day 24, and trying to time intercourse to a single day is hopeless.",
        "This estimator takes a different approach. Enter your last 3-6 cycle lengths and it works out the statistical range. Instead of one ovulation day, you get a window from your earliest to your latest likely ovulation, which gives you a fertile window that may stretch over 10-14 days. The calculator also flags how regular your cycles are using standard deviation: under 3 days is very regular, 3-7 moderately regular, 7-10 somewhat irregular, over 10 highly irregular."
      ),
      createAnswerFirstSection(
        "What Causes Irregular Cycles",
        "PCOS (polycystic ovary syndrome) is the most common cause and affects about 1 in 10 women in the UK. Cycles in PCOS are typically long (over 35 days) and unpredictable because ovulation may not happen every month. Thyroid disorders disrupt cycles in both directions. Significant weight loss or gain can stop or shift cycles. So can high stress, intense exercise, perimenopause (typically late 40s onwards), travel across time zones, and recent hormonal contraception use; the pill in particular often takes 3-6 months to clear from the system before natural cycles return.",
        "If your cycles are consistently shorter than 21 days, longer than 35 days, or vary by more than 7-10 days, please talk to your GP. They can run blood tests for thyroid function, PCOS markers (LH, FSH, testosterone, AMH), and prolactin, and refer you to a gynaecologist if needed. Irregular cycles are common but they are also worth investigating because the underlying cause often affects fertility, bone health, and long-term cardiovascular risk."
      ),
      createAnswerFirstSection(
        "Better Tools for Pinpointing Ovulation",
        "When cycles are irregular, secondary fertility signs become much more useful than calendar predictions. Cervical mucus changes from sticky and dry to clear, slippery, and stretchy (the egg-white texture) in the few days before ovulation. Basal body temperature rises 0.2-0.5C the day after ovulation has happened, useful for confirming a cycle was ovulatory but not for predicting it forward. Ovulation predictor kits detect the LH surge 12-36 hours before the egg releases; with irregular cycles, you may need to test daily for 2-3 weeks per cycle to catch it.",
        "Combining these methods (calendar window from this estimator, plus mucus checking, plus OPK testing in the predicted window) gives a much better chance of catching ovulation than any single approach. Pair this with the [ovulation calculator](/ovulation-calculator) once you start getting more predictable cycles."
      ),
    ],
    faqs: [
      createFAQ(
        "How many cycles do I need to log for a useful estimate?",
        "Three is the absolute minimum, six is much better. With three cycles you can spot the rough range; with six you start to see whether one was an outlier or whether you genuinely vary by 10 days every month. If you are tracking for fertility planning, log at least 6 cycles before drawing conclusions and continue tracking once you start trying."
      ),
      createFAQ(
        "Could I be ovulating without knowing?",
        "Yes, plenty of women with irregular cycles still ovulate, just on an unpredictable schedule. Equally, some cycles are anovulatory (no egg released) even though a period still happens. If you have been trying to conceive for over 12 months (or 6 months if you are over 35) with irregular cycles, please see your GP. They can confirm whether you are ovulating with a day-21 progesterone blood test, or earlier if your cycles are short."
      ),
      createFAQ(
        "Will birth control regulate my cycles?",
        "Hormonal contraception masks the underlying issue rather than fixing it. The pill imposes a 28-day artificial cycle but does not address why your natural cycles are irregular. Many women find their cycles return to their previous irregular pattern within 3-6 months of stopping. If irregularity is causing fertility concerns or symptoms like heavy bleeding, treating the underlying cause (PCOS, thyroid imbalance, weight) is more useful long-term than managing it with the pill."
      ),
      createFAQ(
        "Should I use this if I have PCOS?",
        "It can give you a working window, but PCOS cycles are particularly unpredictable, with anovulatory months and cycles that occasionally stretch over 60 days. The calculator is most useful as a rough guide alongside ovulation strips and cervical mucus tracking. If you have PCOS and are trying to conceive, please involve your GP early; ovulation induction treatments (such as letrozole) can dramatically improve your chances and are available on the NHS in many cases."
      ),
    ],
    relatedTools: [
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "period-tracker", label: "Period Tracker" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
    ],
  },

  "ovulation-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Ovulation Timing Actually Works",
        "Ovulation typically happens about 14 days before your next period, not 14 days after the start of your last one. That distinction matters a lot if your cycle is not exactly 28 days. For a 32-day cycle, ovulation falls around day 18, not day 14. For a 26-day cycle it falls around day 12. The luteal phase (ovulation to next period) stays roughly constant at 14 days for most women; what varies is the follicular phase before ovulation.",
        "The egg lives for 12-24 hours after release. Sperm can survive in fertile cervical mucus for up to 5 days. That gives you a fertile window of roughly 6 days: 5 days before ovulation through to the day of ovulation itself. The 2-3 days immediately before ovulation are the most fertile because mucus is most welcoming and sperm have time to travel."
      ),
      {
        heading: "Fertile Window by Cycle Length",
        table: {
          headers: ["Cycle length", "Approx ovulation day", "Fertile window"],
          rows: [
            ["24 days", "Day 10", "Days 5-10"],
            ["26 days", "Day 12", "Days 7-12"],
            ["28 days", "Day 14", "Days 9-14"],
            ["30 days", "Day 16", "Days 11-16"],
            ["32 days", "Day 18", "Days 13-18"],
            ["35 days", "Day 21", "Days 16-21"],
          ],
        },
      },
      createAnswerFirstSection(
        "How to Confirm You Have Actually Ovulated",
        "A calendar prediction is a starting point, not a guarantee. To confirm ovulation has actually happened, watch for three signals. Cervical mucus shifts from creamy and sticky to clear, slippery, and stretchy (resembling raw egg white) in the days leading up to ovulation. Basal body temperature, taken first thing every morning before getting out of bed, rises by 0.2-0.5C the morning after ovulation and stays elevated until your period starts. Ovulation predictor kits (OPKs) detect the LH surge 12-36 hours before the egg releases.",
        "If you are trying to conceive, intercourse every 2-3 days throughout your fertile window is more effective than trying to time a single perfect day. Sperm need to be present and waiting when the egg releases, not racing to catch up. If you have been trying for 12 months without success (or 6 months if you are over 35), please see your GP. The NHS offers fertility investigations through your GP referral. If your cycles are unpredictable, the [irregular cycle ovulation estimator](/irregular-cycle-ovulation-estimator) handles variable cycle lengths better than this one."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between fertile window and ovulation day?",
        "Ovulation day is the single day the egg is released. The fertile window is the 6-day period during which intercourse can result in pregnancy: the 5 days before ovulation plus ovulation day itself. The egg only lives 12-24 hours but sperm survive up to 5 days, which is why the window is wider on the front end. The most fertile days are the 2-3 days immediately before ovulation."
      ),
      createFAQ(
        "Can I get pregnant outside my fertile window?",
        "Pregnancy outside the predicted window is rare but possible, especially if your cycle is irregular or if you ovulated earlier or later than usual that month. Stress, illness, travel, and changes in sleep can all shift ovulation by a few days in either direction. This is also why calendar-only natural family planning has a real-world failure rate of about 24% per year if not combined with mucus and temperature tracking."
      ),
      createFAQ(
        "What if my cycle length varies?",
        "If your cycles vary by more than 5 days from month to month, this calculator will only give you a rough estimate. A 26-32 day cycle range means ovulation could be anywhere from day 12 to day 18, a 7-day spread. The [irregular cycle ovulation estimator](/irregular-cycle-ovulation-estimator) handles this case properly by analysing several past cycles to give you a statistical fertile window rather than a single day."
      ),
      createFAQ(
        "Is this calculator a contraceptive method?",
        "No. Calendar-based methods alone are not reliable contraception, with a typical failure rate of 24% per year. If you do not want to get pregnant, use a proven method (condom, IUD, implant, pill, or other NHS-approved contraception) and speak to your GP, sexual health clinic, or pharmacist about the right option for you. This tool is for fertility awareness, not pregnancy prevention."
      ),
    ],
    relatedTools: [
      { slug: "irregular-cycle-ovulation-estimator", label: "Irregular Cycle Estimator" },
      { slug: "period-tracker", label: "Period Tracker" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
    ],
  },

  "period-tracker": {
    sections: [
      createAnswerFirstSection(
        "Why Tracking Beats Guessing",
        "Most adults can name their average cycle length to within a few days, but very few can predict when their next period will arrive without help. Logging the start date of each period over 3-6 cycles gives you an actual average, an actual minimum and maximum, and a reasonable next-period prediction. The tracker saves your data locally so it persists between visits, and once you have logged at least two cycles it works out the gap between them automatically.",
        "A healthy adult menstrual cycle ranges from 21 to 35 days according to the NHS, with the average around 28 days. Cycles outside that range, or that vary by more than 7-10 days, are worth mentioning to your GP. Period length is typically 3-7 days; anything longer than 8 days or heavy enough to soak through a pad or tampon every hour is also worth a conversation with your GP."
      ),
      {
        heading: "What Your Cycle Pattern Suggests",
        table: {
          headers: ["Pattern", "What it might mean"],
          rows: [
            ["Cycles 21-35 days, varying by less than 5 days", "Healthy regular cycle"],
            ["Cycles consistently under 21 days", "Possibly polymenorrhoea or short luteal phase, see GP"],
            ["Cycles consistently over 35 days", "Possibly oligomenorrhoea, PCOS, or thyroid issue"],
            ["Variation over 10 days month to month", "Irregular cycle, worth investigating"],
            ["Skipped periods (over 90 days)", "See GP within a month, particularly if not pregnant"],
            ["Sudden change from a previous pattern", "Always worth mentioning to GP"],
          ],
        },
      },
      createAnswerFirstSection(
        "Using Cycle Data Beyond Period Prediction",
        "Once you have logged 3-6 cycles, the tracker estimates not just your next period but also your next likely fertile window (typically days 9-14 of a 28-day cycle, scaled to your average). For trying to conceive this is useful as a baseline; for general health it helps you anticipate energy dips, mood changes, and PMS. Many women plan demanding work, social events, or holidays around their cycle once they know it, which makes the tracking habit worthwhile even outside of fertility planning.",
        "If you spot patterns you do not like (severe PMS, painful periods, very heavy flow, mid-cycle pain that is not just ovulation), bring the tracking data to your GP. Showing 6 months of logged cycles is far more useful than trying to remember from memory. If you suspect pregnancy, the [pregnancy due date calculator](/pregnancy-due-date-calculator) takes your last period date as its starting point."
      ),
    ],
    faqs: [
      createFAQ(
        "How many cycles should I track before predictions are reliable?",
        "Two cycles minimum to get any prediction, six for genuine reliability. With two cycles the tracker has one cycle length to work with; the next-period prediction is essentially that one length added to your last period. With six cycles it has a real average and can spot whether one cycle was an outlier."
      ),
      createFAQ(
        "Is my data sent anywhere?",
        "By default, your tracking data is saved only to your browser's localStorage on this device. It is not sent to any server, and clearing your browser data will delete it. If you sign in with a MyKit account, the data syncs to your account so you can access it from other devices, but it remains private to you."
      ),
      createFAQ(
        "What does it mean if I miss a period?",
        "Pregnancy is the most common cause for sexually active women of reproductive age, so take a home test first. Other common causes include stress, significant weight change, intense exercise, hormonal contraception changes, thyroid issues, PCOS, and perimenopause. The NHS recommends seeing your GP if you miss three periods in a row, or sooner if you have additional symptoms like pelvic pain or unusual discharge."
      ),
      createFAQ(
        "Can a tracker really help with fertility?",
        "It can give you the cycle data you need to spot your fertile window, but it cannot replace ovulation predictor kits, basal body temperature charting, or a GP fertility assessment. If you have been trying to conceive for over a year (or 6 months if you are over 35), please book a GP appointment. The cycle data you have logged will be useful information for them."
      ),
    ],
    relatedTools: [
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "irregular-cycle-ovulation-estimator", label: "Irregular Cycle Estimator" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
    ],
  },

  "pregnancy-due-date-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Due Date Is Calculated",
        "The standard method uses Naegele's rule: due date equals the first day of your last menstrual period (LMP) plus 280 days, or about 40 weeks. The calculation assumes you ovulated around day 14 of a 28-day cycle and conceived shortly after. If you know the conception date instead (perhaps from IVF or careful tracking), the due date is conception plus 266 days, or 38 weeks.",
        "This is also why pregnancies are dated from LMP rather than conception. The 'gestational age' a midwife uses is roughly 2 weeks ahead of fetal age. So when you are 6 weeks pregnant by NHS dating, the embryo itself is around 4 weeks old. It feels confusing at first but it makes sense once you know that doctors do not know exactly when conception happened, but they usually know when the last period was."
      ),
      {
        heading: "Key Dates Through Pregnancy",
        table: {
          headers: ["Milestone", "Weeks from LMP", "What happens"],
          rows: [
            ["End of first trimester", "13 weeks", "Major organs formed, miscarriage risk drops sharply"],
            ["Anatomy scan", "20 weeks", "Detailed scan of organs and growth"],
            ["Viability point", "24 weeks", "Baby could survive with intensive medical support"],
            ["Third trimester begins", "28 weeks", "Lungs continue maturing, growth accelerates"],
            ["Full term", "37 weeks", "Baby is no longer considered preterm"],
            ["Estimated due date", "40 weeks", "Average delivery date"],
            ["Post-term", "42 weeks", "Induction usually offered"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Only 5% of Babies Arrive on Their Due Date",
        "Your due date is a single point in a delivery window that runs from 37 to 42 weeks. Only about 5% of babies actually arrive on the calculated date. Around 80% are born within two weeks either side, and the rest are earlier or later. First babies tend to come a little later than the due date on average; subsequent pregnancies often deliver closer to or slightly before the predicted date.",
        "The earliest dating ultrasound (offered between 8 and 14 weeks at your NHS booking appointment) is usually more accurate than the LMP calculation, particularly if you have irregular cycles or are not certain of your last period date. If the scan date differs from your LMP date by more than 5-7 days, the scan date typically becomes your official due date. Use the [pregnancy week calculator](/pregnancy-week-calculator) to track how far along you are throughout the pregnancy."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the due date from ultrasound more accurate than from LMP?",
        "Yes, particularly when the scan is done before 14 weeks. Early ultrasounds measure the fetus directly and are accurate to within about 5 days. LMP calculations assume regular cycles and consistent ovulation timing, neither of which everyone has. If your scan date and LMP date differ by more than 5-7 days, the NHS uses the scan date as your official due date going forward."
      ),
      createFAQ(
        "What if I have irregular cycles?",
        "An LMP-based due date is unreliable if your cycles are over 35 days or vary significantly. Ovulation in long or irregular cycles often happens later than day 14, which makes you less pregnant than the LMP suggests. Always rely on the dating ultrasound at 8-14 weeks rather than LMP if your cycles are not predictable. Mention your cycle pattern to your midwife at the booking appointment."
      ),
      createFAQ(
        "Can I calculate my due date from IVF transfer?",
        "Yes, and it is more accurate than LMP. For a 5-day frozen embryo transfer, the due date is the transfer date plus 261 days. For a 3-day transfer it is plus 263 days. For a fresh egg-collection cycle it is the egg-collection date plus 266 days. Your fertility clinic will give you the exact figure based on your protocol."
      ),
      createFAQ(
        "What happens if I go past my due date?",
        "About 1 in 5 first-time mothers reach 41 weeks. The NHS typically offers a membrane sweep at 40-41 weeks and an induction by 41-42 weeks because risks to the baby (placental aging, reduced amniotic fluid) start to rise after 42 weeks. Your midwife will discuss the options at your antenatal appointments. Going a few days past your due date is completely normal and does not on its own indicate a problem."
      ),
    ],
    relatedTools: [
      { slug: "pregnancy-week-calculator", label: "Pregnancy Week Calculator" },
      { slug: "pregnancy-milestone-calendar", label: "Pregnancy Milestone Calendar" },
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
    ],
  },

  "pregnancy-milestone-calendar": {
    sections: [
      createAnswerFirstSection(
        "What the Calendar Shows",
        "The milestone calendar plots the standard NHS antenatal pathway against your specific dates. Enter your last menstrual period or your due date and it works out the calendar dates of your dating scan (8-14 weeks), nuchal translucency screening (11-14 weeks), anatomy scan (around 20 weeks), glucose tolerance test (24-28 weeks if needed), and the final stretch of weekly checks from week 36 onwards.",
        "Alongside appointment dates, you also get a week-by-week summary of what is developing in the baby and what is changing in your body. Week 8: heartbeat visible on ultrasound. Week 12: all major organs formed, around 6cm long. Week 20: full anatomy scan, baby around 25cm. Week 24: viability point, lungs developing. Week 28: third trimester begins. Week 36: full term approaching, head usually engaged."
      ),
      createAnswerFirstSection(
        "How NHS Antenatal Care Lines Up",
        "First-time mothers in England typically have around 10 NHS antenatal appointments. The booking appointment with your midwife happens around weeks 8-10, where you give your medical history, get a pack of information, and have blood tests. The dating scan is usually combined with the 11-14 week appointment for the combined screening test. The anatomy scan at 20 weeks is the next big one. From there, appointments are roughly every 4 weeks until 28 weeks, then every 2-3 weeks, then weekly from week 36.",
        "Second or subsequent pregnancies usually have fewer appointments (around 7) because the medical team already has your history. Higher-risk pregnancies (twins, pre-existing conditions, age over 40, previous complications) include extra growth scans and consultant appointments. The calendar in this tool shows the standard pathway; your actual schedule may differ slightly depending on local trust practice and your individual circumstances."
      ),
      createAnswerFirstSection(
        "When to Print or Save the Calendar",
        "The premium PDF gives you the full month-by-month calendar to print, with appointment dates, weekly highlights, and space to write in actual scan times and midwife appointments as they get booked. Many first-time parents stick it on the fridge or keep it in the back of their NHS notes. It also makes a useful reference if you are planning maternity leave, work travel, or holidays around key milestones such as the anatomy scan and the third trimester.",
        "If you are still working out your due date, run the [pregnancy due date calculator](/pregnancy-due-date-calculator) first. The milestone calendar uses that due date as its anchor for everything else. The [pregnancy week calculator](/pregnancy-week-calculator) tracks your week-by-week progress in more detail."
      ),
    ],
    faqs: [
      createFAQ(
        "Are the milestone dates exact?",
        "The dates are calculated from your LMP or due date assuming standard NHS scheduling, but the actual scan and appointment dates depend on your local NHS trust's booking system. Your dating scan might be at 11 weeks 3 days rather than exactly 12 weeks, depending on availability. Use the calendar as a guide and update it with the actual times you are given at your booking appointment."
      ),
      createFAQ(
        "What if I am having a private scan as well as NHS?",
        "Private gender scans, growth scans, or 4D scans typically slot in between NHS scans. Common timings are 16 weeks for early gender scanning, 28-32 weeks for 4D bonding scans, and 32-34 weeks for growth and presentation checks. The calendar does not auto-include these, but the gaps between NHS scans give you a good sense of when extra checks would fit."
      ),
      createFAQ(
        "What about screening I want to opt out of?",
        "All screening tests in NHS antenatal care are optional. You can decline the combined screening, anatomy scan, or any other test at any point. If you decline a test, your midwife will note this in your records and continue with the rest of your care unchanged. The calendar lists what is offered; what you accept is entirely your choice."
      ),
      createFAQ(
        "Can the calendar replace my actual NHS notes?",
        "No. Your green or digital NHS notes contain your full medical history, blood results, and detailed appointment notes. The calendar is an at-a-glance reference for what milestones are coming up. Always bring your NHS notes to appointments and discuss any concerns directly with your midwife."
      ),
    ],
    relatedTools: [
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "pregnancy-week-calculator", label: "Pregnancy Week Calculator" },
      { slug: "early-pregnancy-symptoms-checker", label: "Early Pregnancy Symptoms Checker" },
    ],
  },

  "pregnancy-week-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Pregnancy Weeks Are Counted",
        "Pregnancy is dated from the first day of your last menstrual period, not from conception. So week 1 is technically the week of your last period, before you were even pregnant, and conception itself happened around week 2 or 3. By the time you miss your period and test positive, you are already considered 4 weeks pregnant. This is gestational age, the figure your midwife and notes will always use.",
        "Fetal age (the actual age of the embryo) is roughly 2 weeks behind gestational age. So at 12 weeks gestational age your baby is about 10 weeks old in fetal terms. Both numbers are correct, they just measure different things. NHS care, scan reports, and most parenting apps use gestational age throughout."
      ),
      {
        heading: "Baby Size at Each Stage",
        table: {
          headers: ["Week", "Approximate size", "Comparable to"],
          rows: [
            ["Week 8", "16mm", "Raspberry"],
            ["Week 12", "54mm", "Lime"],
            ["Week 16", "120mm", "Avocado"],
            ["Week 20", "165mm", "Banana"],
            ["Week 24", "210mm", "Corn cob"],
            ["Week 28", "240mm", "Aubergine"],
            ["Week 32", "280mm", "Butternut squash"],
            ["Week 36", "330mm", "Grapefruit (head only)"],
            ["Week 40", "360mm", "Watermelon"],
          ],
        },
      },
      createAnswerFirstSection(
        "What Each Trimester Brings",
        "The first trimester (weeks 1-12) covers the most rapid development. All major organs form, the heartbeat starts around week 6, and miscarriage risk drops sharply after week 12. Most early pregnancy symptoms (nausea, exhaustion, breast tenderness) peak in this stretch and often ease into the second trimester. The second trimester (weeks 13-27) is often called the easier middle: energy returns, the bump becomes visible, and you usually feel the first movements between weeks 16 and 22.",
        "The third trimester (weeks 28-40+) is the home stretch. Lungs continue maturing, the baby gains around 200g a week from week 28 onwards, and most position into head-down by around week 32-36. Common late symptoms include shortness of breath, swollen feet, sleep disruption, and Braxton Hicks contractions. From week 37 the pregnancy is full term, and you might go into labour any time. The [pregnancy milestone calendar](/pregnancy-milestone-calendar) maps appointments across the whole pregnancy."
      ),
    ],
    faqs: [
      createFAQ(
        "Why do I see week and days written like '20+3'?",
        "That format means 20 weeks and 3 days. Pregnancy notes use it because each individual day matters, particularly around scan timings. So 20+3 is more pregnant than 20+0 but less pregnant than 21+0. The calculator shows your current week along with how many days into that week you are."
      ),
      createFAQ(
        "Should I trust the LMP calculation or my scan date?",
        "If you had a dating scan before 14 weeks, trust the scan date. It is more accurate than LMP, particularly if your cycles are irregular. From the scan date onwards, your due date and weekly progress should be calculated from that, not from your LMP. The calculator allows you to input your due date directly if your dating scan has already adjusted it."
      ),
      createFAQ(
        "Are the baby size estimates exact?",
        "No, they are population averages and can vary by 10-15% in either direction. A baby measuring smaller or larger than the listed size for that week is usually completely normal. Concerns about growth are based on percentile tracking across multiple scans, not on a single measurement. If your growth scans show concerns, your midwife or consultant will explain what is being monitored and why."
      ),
      createFAQ(
        "When does the second trimester start?",
        "The second trimester starts at week 13 (or week 14 by some definitions) and runs through to the end of week 27. The third trimester begins at week 28. Some sources mark the boundaries slightly differently, but NHS guidance generally uses 13 and 28 as the trimester transitions."
      ),
    ],
    relatedTools: [
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "pregnancy-milestone-calendar", label: "Pregnancy Milestone Calendar" },
      { slug: "early-pregnancy-symptoms-checker", label: "Early Pregnancy Symptoms Checker" },
    ],
  },

  "protein-intake-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Protein You Actually Need",
        "The current research-backed guidance for protein intake depends entirely on what you're trying to achieve. Sedentary adults: 0.8g per kilogram of bodyweight per day, the long-standing minimum to prevent muscle loss. General fitness or maintenance: 1.0-1.2g/kg, slightly above the minimum to support recovery from regular exercise. Building muscle: 1.6-2.2g/kg, the range repeatedly validated in meta-analyses of resistance-trained adults. Heavy training or athletes: 2.0-2.4g/kg, particularly during high-volume training blocks. Weight loss while preserving muscle: 1.6-2.2g/kg, on the high end because protein protects lean mass when calories are reduced.",
        "For an 80kg adult aiming to build muscle, that works out to 128-176g of protein per day, typically split across 4 meals at 32-44g each. The per-meal target matters because muscle protein synthesis appears to plateau at around 30-40g of high-quality protein in a single sitting, so spreading intake gets more out of the same total than dumping it all in one shake."
      ),
      createAnswerFirstSection(
        "Lean Body Mass vs Total Body Weight",
        "If your body fat is high (above 25% for men, 32% for women), calculating protein on total bodyweight overshoots the actual requirement because fat tissue doesn't need protein to maintain. The tool offers a body fat percentage option that recalculates based on lean body mass instead. A 100kg person at 30% body fat has 70kg of lean mass; their muscle-building protein target should be 1.9 × 70 = 133g, not 1.9 × 100 = 190g.",
        "For people in normal body fat ranges (10-25% men, 18-30% women), using total bodyweight is a reasonable simplification and the difference is usually under 10g per day. The lean mass calculation matters most for people who are significantly overweight and trying to drop body fat while keeping muscle - the protein number from total bodyweight would be unrealistic to actually eat, while the lean-mass figure is achievable and effective."
      ),
      createAnswerFirstSection(
        "Where Your Protein Comes From",
        "Whole-food sources average around 20-30g of protein per 100g portion: chicken breast (31g), beef (26g), salmon (25g), tuna (29g). Eggs sit lower at 6g per large egg but are cheap and complete-protein. Greek yogurt and cottage cheese give 10-11g per 100g and add convenience for snacking. Plant sources: tofu (15g), lentils (9g), chickpeas (9g), nuts (6g per 30g serving). Vegan diets need slightly higher total protein (perhaps +10%) because plant proteins are typically lower in leucine, the amino acid most directly linked to muscle protein synthesis.",
        "Whey protein powder is the cheap-and-fast supplement, providing 20-25g per scoop with minimal calories and complete amino acid profile. It's not magical - whole food does the same job - but it solves the practical problem of hitting 150g+ per day without spending hours preparing meals. The [TDEE calculator](/tdee-calculator) helps work out your total calorie target so the protein number sits within a sensible total intake."
      ),
      {
        heading: "Protein Targets by Goal (80kg Adult Example)",
        table: {
          headers: ["Goal", "Ratio", "Daily Total", "Per Meal (4 meals)"],
          rows: [
            ["Sedentary", "0.8g/kg", "64g", "16g"],
            ["Maintenance", "1.0g/kg", "80g", "20g"],
            ["Muscle gain", "1.9g/kg", "152g", "38g"],
            ["Athlete", "2.2g/kg", "176g", "44g"],
            ["Weight loss", "1.9g/kg", "152g", "38g"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I eat too much protein?",
        "For healthy adults with normal kidney function, intakes up to 3.5g/kg have been studied without adverse effects. Most people couldn't physically eat that much anyway. Concerns about kidney damage from high protein apply specifically to people with pre-existing kidney disease, where their nephrologist will give specific guidance. For everyone else, 1.6-2.2g/kg is well within safe limits."
      ),
      createFAQ(
        "Do I need more protein on training days?",
        "Total daily protein matters more than timing on training versus rest days. The research on 'protein timing' (eating protein within an hour of training) shows much smaller effects than total daily intake. Hit your daily target consistently and the training-day vs rest-day distinction doesn't make a meaningful difference for most non-athletes."
      ),
      createFAQ(
        "Is plant protein as good as animal protein?",
        "Per gram, animal protein has slightly higher leucine content and a more complete amino acid profile. Plant-based eaters can match the effects on muscle building by eating slightly more total protein (around 10-15% extra) and varying sources (combining legumes, grains, soy, nuts) to cover all essential amino acids. Athletes on plant diets sometimes use a leucine supplement to close the gap."
      ),
      createFAQ(
        "How accurate is body fat percentage from a smart scale?",
        "Smart scales using bioelectrical impedance are typically accurate within ±5% for trends but can be off by 5-10% in absolute terms. They're useful for tracking change over weeks (is your body fat going up or down?), less useful for the precise 'I am 22.4% body fat' figure. For protein calculations, even a rough estimate is fine; what matters is being in the right ballpark, not the exact decimal."
      ),
      createFAQ(
        "Should pregnant women follow these targets?",
        "Pregnancy increases protein needs but the math is different - typically 1.1g/kg in the second and third trimesters. This calculator's targets are for non-pregnant adults; pregnant women should follow guidance from their midwife or NHS-recommended sources rather than general fitness ratios."
      ),
    ],
    relatedTools: [
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "macro-calculator", label: "Macro Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },

  "when-can-i-take-a-pregnancy-test": {
    sections: [
      createAnswerFirstSection(
        "When You Can Reliably Test",
        "Home pregnancy tests detect HCG (human chorionic gonadotropin), a hormone produced by the placenta starting roughly 6-10 days after conception. Sensitive urine tests can pick up HCG from about 11-14 days post-conception, but the most reliable result comes from testing on or after the first day of your missed period - by then HCG levels are usually high enough that even less sensitive tests will read positive. Blood tests at a clinic can detect HCG even earlier, around 6-8 days post-conception, but home urine tests are what most people use for the initial check.",
        "The calculator works back from either your last menstrual period (LMP) or known ovulation date to give you the earliest reasonable urine test date, the earliest blood test date, and the most accurate urine test date (which is your missed period date or later). If you test too early and get a negative, that doesn't mean you're not pregnant - HCG may simply be below the detection threshold. The standard advice is to retest in 2-3 days; HCG roughly doubles every 48 hours in early pregnancy."
      ),
      createAnswerFirstSection(
        "How Cycle Length Affects the Math",
        "The calculation relies on the assumption that ovulation happens roughly 14 days before your next period would start. For a 28-day cycle, that's day 14 of the cycle (counted from day 1 of LMP). For a 30-day cycle, ovulation is around day 16. For a 26-day cycle, around day 12. This 'luteal phase' (the time from ovulation to next period) is more consistent than the 'follicular phase' (LMP to ovulation), which is why the calculation works backwards from the expected next period rather than forwards from LMP.",
        "If your cycles are very irregular, the LMP-based calculation is less reliable. People with PCOS or other conditions causing variable cycle length might find the ovulation-date input more useful if they've been tracking with ovulation predictor kits, basal body temperature, or fertility awareness. The [ovulation calculator](/ovulation-calculator) helps establish ovulation timing if you haven't yet."
      ),
      createAnswerFirstSection(
        "Test Sensitivity and Reading Results",
        "Tests are rated by their HCG sensitivity, measured in mIU/mL (milli-international units per millilitre). The most sensitive home tests detect from 10 mIU/mL; mid-range tests detect from 25 mIU/mL; basic supermarket tests typically need 50 mIU/mL or higher. Earlier testing requires a more sensitive test. By the day of your missed period, HCG is typically 25-100 mIU/mL, so any standard test should pick it up; testing 3-4 days before your missed period might require a 'first response' or similar early-detection test.",
        "False negatives are common when testing early and become rare after the missed period date. False positives are very rare in modern tests but can occur with certain medications (HCG-containing fertility treatments, some cancer treatments) or in the days following a miscarriage when HCG is still clearing. A faint line is still a positive line; HCG concentration affects line darkness but presence is binary. A positive result should be followed up with a GP or midwife appointment within a few weeks to confirm and start antenatal care."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the earliest a blood test can detect pregnancy?",
        "Quantitative blood tests at a GP or clinic can detect HCG from about 6-8 days post-conception, sometimes earlier. They measure exact HCG concentration rather than just present/not present, which makes them useful for tracking very early pregnancy progression or evaluating possible miscarriage. They're not done routinely as 'first check' tests because home urine tests are good enough by missed-period day."
      ),
      createFAQ(
        "Why did I get a negative test the day before my missed period?",
        "HCG levels rise rapidly in early pregnancy but vary between people. If you ovulated later than the calculator estimated (which happens with stress, illness, or natural variation), implantation might be 2-3 days later than expected, and HCG might still be below detection threshold. Wait 48-72 hours and retest with first-morning urine, when HCG is most concentrated."
      ),
      createFAQ(
        "Should I use first-morning urine?",
        "Yes if testing early. First-morning urine has the most concentrated HCG because you've been holding it overnight. After your missed period, time of day matters less because HCG is high enough that any urine sample will register. If testing 2+ days after missed period, any time of day works; if testing earlier, stick to first-morning."
      ),
      createFAQ(
        "How accurate are home pregnancy tests?",
        "Modern home tests are 99% accurate when used correctly on the day of missed period or later. Accuracy drops to around 75-85% when used 4-5 days before missed period, and a meaningful portion of pregnancies show negative on early tests because HCG hasn't crossed the detection threshold yet. Accuracy means correctly identifying pregnancy when HCG is detectable, not predicting future pregnancy."
      ),
      createFAQ(
        "What if I have an irregular cycle?",
        "Wait at least 19-21 days after possible conception before testing. Without a reliable LMP-based projection, this 'definitely past implantation' window is more reliable than counting from LMP. If you're tracking ovulation through OPKs or temperature charting, use the ovulation date input on the tool for a more accurate test date."
      ),
    ],
    relatedTools: [
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "early-pregnancy-symptoms-checker", label: "Early Pregnancy Symptoms Checker" },
    ],
  },
};
