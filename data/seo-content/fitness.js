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

  "tdee-calculator": {
    sections: [
      createAnswerFirstSection(
        "What TDEE Actually Tells You",
        "Your Total Daily Energy Expenditure is the calorie figure your body burns in 24 hours including everything: breathing, heart rate, walking the dog, the gym session, fidgeting at your desk. This calculator works it out in two steps. First it computes your Basal Metabolic Rate using the Mifflin-St Jeor equation (the most accurate of the common formulas for adults), then multiplies that by an activity factor between 1.2 and 1.9 to land on TDEE.",
        "A worked example. A 35-year-old woman, 165cm, 68kg, who trains 3 to 5 days a week sits at a BMR of about 1,392 and a TDEE of around 2,158 (BMR x 1.55). Eat that number and weight stays flat. Eat 500 fewer (around 1,658) and the calculator marks that as a weight-loss target of roughly 0.45kg per week. Eat 500 more and that is the gain target. The 500 figure comes from the rough rule that 7,700 kcal equals 1kg of body fat, so a daily 500-kcal change works out to half a kilo a week."
      ),
      createAnswerFirstSection(
        "Picking the Right Activity Multiplier",
        "Almost everyone overestimates this. Sedentary (1.2) is desk work and almost no purposeful exercise. Light (1.375) is 1 to 3 short workouts a week. Moderate (1.55) is 3 to 5 sessions. Very active (1.725) is 6 to 7 sessions or a physical job. Extremely active (1.9) is twice-a-day training or hard manual labour. If you are unsure, drop one level - underestimating activity gives a TDEE that is closer to your real maintenance, which is exactly what you want for a fat-loss target.",
        "The activity multiplier already includes your incidental movement (NEAT), not just the workout itself. So a one-hour gym session does not bump you up a tier on its own. The honest test: have you trained at least 3 times this week, AND walked or moved noticeably outside that? If only the first is true, stay on light. If you sit at a desk all day and train hard 4 times a week, moderate is closer than very active. Pair the result with the [calorie deficit calculator](/calorie-deficit-calculator) if you want a deficit target tied to a specific weekly weight-loss goal."
      ),
      createAnswerFirstSection(
        "Why the Scale Tells You More Than the Calculator",
        "The Mifflin-St Jeor equation has a standard error of about 10% in either direction. So a TDEE of 2,200 might actually be 1,980 or 2,420 for a real human. The calculator is a starting point; your bathroom scale and tape measure are the editor. Eat at the calculated maintenance for two weeks, weigh yourself daily and average the readings. If weight is steady, the number is right. If you have gained 0.5kg, drop the target by 100 to 150 calories. If you have lost without trying, add the same.",
        "Two specific things break the formula. Muscular people are underestimated (the equation assumes average body composition), so a lifter at 80kg often has a higher TDEE than the maths suggests. People with very low body fat after a long diet are over-estimated because metabolic adaptation reduces TDEE by 5 to 15% below predicted. If you have just finished a long cut, expect maintenance to be lower than the calculator says for 8 to 12 weeks. The [BMI calculator](/bmi-calculator) gives a rough sense of whether the standard formula will fit your body, and the [protein intake calculator](/protein-intake-calculator) helps split the calorie target into macros."
      ),
      createAnswerFirstSection(
        "Macros Inside the TDEE Number",
        "The calculator splits your calorie total into protein, carbs and fats. A sensible default for active adults is around 30% protein, 40% carbs, 30% fat. On a 2,200-calorie target that is 165g protein, 220g carbs, 73g fat. Protein and carbs are 4 calories per gram; fat is 9. That ratio works for most people; weight-loss phases lean higher protein (35 to 40%), endurance athletes lean higher carbs (50 to 55%).",
        "If you only track one number, track protein. Hitting the protein target is what protects muscle in a deficit and what fills you up so the deficit is bearable. A useful floor: 1.6g per kg of bodyweight (so 109g for the 68kg woman in the worked example), 2.2g per kg if you are lean and lifting hard. The carb and fat split is mostly preference; some people sleep better with more carbs at dinner, some feel sharper with more fat in the morning. Test both for two weeks and pick the one you actually stick to."
      ),
    ],
    faqs: [
      createFAQ(
        "Is TDEE the same as BMR?",
        "No. BMR is what you would burn lying in bed for 24 hours - the calorie cost of just keeping organs running. TDEE is BMR plus everything else you do: walking, working, training, digesting food. For most people TDEE is 30 to 90% higher than BMR depending on activity level. The calculator gives you both numbers; you eat to TDEE, not BMR."
      ),
      createFAQ(
        "Why does the calorie loss target subtract exactly 500?",
        "1kg of body fat stores roughly 7,700 calories of energy. A daily deficit of 500 calories adds up to 3,500 a week, which works out to about 0.45kg of fat loss per week (1lb in old money). It is the round number that ends up being the safe upper limit for sustainable fat loss without losing too much muscle. If you want faster, the [calorie deficit calculator](/calorie-deficit-calculator) lets you set the deficit manually, but going beyond 1,000 calories below TDEE rarely sticks for more than a few weeks."
      ),
      createFAQ(
        "Should I recalculate TDEE as I lose weight?",
        "Yes. Every time you drop 5kg, TDEE drops by roughly 50 to 100 calories because there is less of you to maintain. If your weekly weight loss has stalled for 3+ weeks, recalculate using your current weight and shave another 100 to 150 calories off the daily target. Do not eat back exercise calories on top of the activity multiplier; that double-counts."
      ),
      createFAQ(
        "Does TDEE include the workout I just did?",
        "Only via the activity multiplier. The calculator does not let you log a specific session and add the calories burned. The activity factor is a weekly average baked into your maintenance number. So if you train 4 times a week, the moderate multiplier (1.55) already accounts for those sessions on average. Adding extra calories on training days is a personal preference, not a calculation requirement."
      ),
      createFAQ(
        "Why does the same height and weight give different TDEE for men and women?",
        "Mifflin-St Jeor uses different constants for each: men get +5, women get -161 in the BMR equation. The gap is about 166 calories at the same height, weight and age. The reason is that men typically carry more lean tissue and less fat at the same total bodyweight, and lean tissue burns more calories at rest. The formula approximates that population difference."
      ),
    ],
    relatedTools: [
      { slug: "calorie-deficit-calculator", label: "Calorie Deficit Calculator" },
      { slug: "protein-intake-calculator", label: "Protein Intake Calculator" },
      { slug: "macro-calculator", label: "Macro Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },

  "heart-rate-zone-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the 5 Heart Rate Zones Are Calculated",
        "The calculator uses the simplest reliable estimate of maximum heart rate: 220 minus your age. So a 35-year-old has an estimated max HR of 185 bpm. From there it splits the range into five zones at 50/60/70/80/90% intensity: Recovery (50-60%), Fat Burn (60-70%), Aerobic (70-80%), Anaerobic (80-90%) and VO2 Max (90-100%). Each zone has a different physiological purpose, and structuring training around them is what separates polarised training from grinding away at one pace forever.",
        "There is also a Karvonen toggle, which is more accurate. Karvonen takes your heart rate reserve (max HR minus resting HR) and applies the zone percentages to the reserve, then adds back the resting figure. For the same 35-year-old with a resting HR of 60, the aerobic zone via 220-age is 130-148 bpm; via Karvonen it is 148-160. Karvonen produces higher zone targets because it accounts for the fact that fit people start with a lower resting HR and have more dynamic range to work with."
      ),
      createAnswerFirstSection(
        "What Each Zone Is Actually For",
        "Recovery (50-60%) is genuinely conversational - you could sing. It is for active recovery, warm-ups and cool-downs. Fat Burn (60-70%) is the longest part of any aerobic build; it is where most of your weekly volume should sit if you are building base fitness. Aerobic (70-80%) is comfortably hard, the tempo zone, where threshold improves. Anaerobic (80-90%) is what most people picture when they say 'hard cardio' - intervals of 3 to 8 minutes. VO2 Max (90-100%) is short, awful efforts of 30 seconds to 5 minutes that improve maximum oxygen uptake.",
        "The single most common mistake is spending all your time in zone 3 (aerobic). Comfortable enough to do every day, hard enough to feel like training, hard enough to leave you tired without any of the adaptations of true zone 2 or true zone 5. The 80/20 rule from coaching research: 80% of weekly minutes in Recovery and Fat Burn, 20% in Aerobic and above. If a session feels moderately hard the whole way, you are probably grey-zoning. Use a chest strap and push the easy days easier."
      ),
      createAnswerFirstSection(
        "Why the 220-Age Formula is Only Roughly Right",
        "The 220-minus-age formula was derived in the 1970s and has a standard deviation of about 10-12 bpm. So for any given age, real max HR ranges over roughly 25 bpm. A 40-year-old might have a true max of 168 or 192. The calculator's estimate is the population midpoint, not your actual ceiling. If your zone 4 efforts feel impossibly easy or impossibly hard at the predicted heart rates, your true max HR is probably above or below the formula.",
        "The accurate way to find max HR is a hard test. After a thorough warm-up, do 4 minutes hard, 2 minutes easy, then run or cycle uphill for 3 minutes increasing pace until you cannot maintain it. The peak number on your watch is close to true max HR. Do not do this without a baseline of training, and not at all if you have any history of heart issues. Beta blockers, thyroid medication and some antidepressants change resting and max HR; if you take any, ask your GP before training to numbers from this calculator."
      ),
      createAnswerFirstSection(
        "When to Use Karvonen Instead",
        "If you know your resting heart rate, Karvonen is the better default. Resting HR drops as you get fitter, so the gap between the two methods grows over a training year. A new runner with a resting HR of 75 and an experienced runner with a resting HR of 50 will have very different zones at the same age, and Karvonen reflects that. The plain 220-age method ignores resting HR completely.",
        "Measure resting HR for accuracy. First thing in the morning, before getting up, before coffee or your phone alarm, take a 30-second pulse at the wrist or neck and double it. Do that for three to seven days and average. A typical adult sits at 60-80 bpm; trained endurance athletes are often in the 40s; under 40 bpm is normal in highly trained runners and cyclists but warrants a chat with your GP if you also feel dizzy or fatigued. The [TDEE calculator](/tdee-calculator) is useful alongside this if you are training for fat loss and want to set the calorie target to match the cardio volume."
      ),
    ],
    faqs: [
      createFAQ(
        "Which zone burns the most fat?",
        "By percentage, the Fat Burn zone (60-70% of max HR) burns the highest fraction of calories from fat - around 50 to 60% of total calories. By absolute amount, harder zones burn more total calories and therefore more grams of fat in the same workout, even though the percentage from fat is lower. So 'fat burn zone' is a misleading name. For weight loss, total weekly calories burned matters more than the zone you burn them in. Use whichever zone you can sustain for the most minutes per week."
      ),
      createFAQ(
        "Should I train in the higher zones every day?",
        "No. The polarised model that elite endurance athletes use puts roughly 80% of weekly time in zones 1-2 and 20% in zones 4-5, with very little in zone 3. High intensity needs recovery; doing zone 4 every day produces overtraining within 6 to 8 weeks for most non-elite athletes. A typical week for a recreational runner: three easy zone 2 runs, one zone 4 interval session, one long zone 1-2 run, two rest days."
      ),
      createFAQ(
        "Why does my heart rate spike higher than my predicted max?",
        "Because the formula is an average. About 30% of people have a true max HR more than 10 bpm above or below 220-age. If your watch shows you regularly hitting 195 when your predicted max is 185, your true max is probably 195 (or higher) and your zones should be recalculated using that. Heat, dehydration, caffeine and stress can all push HR up by 5 to 15 bpm without changing your effort level, so a one-off spike on a hot day is normal."
      ),
      createFAQ(
        "Is heart rate or pace the better way to control intensity?",
        "Heart rate is better for solo training, hilly terrain, hot days and base-building. Pace is better for flat track work, race-pace efforts and when you know your fitness exactly. Most experienced runners use both: pace as the target on track sessions, heart rate as a reality check on easy days when ego pushes pace too high. If your easy run heart rate is climbing week-on-week at the same pace, you are tired."
      ),
    ],
    relatedTools: [
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "swim-pace-calculator", label: "Swim Pace Calculator" },
      { slug: "bmi-calculator", label: "BMI Calculator" },
    ],
  },

  "conception-date-calculator": {
    sections: [
      createAnswerFirstSection(
        "How This Tool Works Backwards From Your Due Date",
        "This calculator runs the pregnancy clock in reverse. Give it a due date and it subtracts 266 days to land on the most likely conception date. Give it the first day of your last period (LMP) and it adds 14 days. Both routes assume a textbook 28-day cycle with ovulation on day 14, which is why the result is a single date and not a range. Knowing this number is useful for matching ultrasound dating, working out which night actually counts and answering a partner's quietly persistent maths.",
        "Worked example. Your due date is 1 January 2027. Subtract 266 days and conception was around 11 April 2026. Or: your last period started on 28 March 2026, add 14 days, conception around 11 April 2026. The two methods agree because the standard pregnancy duration of 280 days from LMP is exactly 266 days from conception plus 14 days from LMP to ovulation. Use the [pregnancy due date calculator](/pregnancy-due-date-calculator) if you need to go the other way and pin down the due date first."
      ),
      createAnswerFirstSection(
        "Why It Differs From What You Remember",
        "Sperm survive in the female reproductive tract for up to 5 days. The egg lives 12 to 24 hours after ovulation. So the conception date is not necessarily the same as the date of intercourse: a Saturday encounter can result in fertilisation on the following Wednesday if ovulation arrives later. The calculator gives you the most likely fertilisation day, not the most likely fun day. For couples trying to confirm paternity timing or date a complicated pregnancy, the realistic intercourse window is conception date minus 5 days through to conception date plus 1 day.",
        "Cycle length matters too. The 14-day estimate assumes ovulation is exactly halfway through the cycle, but for someone on a 35-day cycle ovulation is closer to day 21, not day 14. If your cycles are reliably longer or shorter than 28 days, the LMP-based estimate from this tool will be off by the difference. The conception date calculation from due date is more reliable in that case, because the due date itself was usually adjusted for cycle length at your dating scan."
      ),
      createAnswerFirstSection(
        "Matching It Up With Your Dating Scan",
        "An early ultrasound (8 to 13 weeks) measures crown-rump length and works out how far along the embryo is. The result is a 'gestational age' counted from LMP, so subtract 14 days to get a conception estimate. If the scan says you are 9 weeks 4 days on the day of the scan, you conceived approximately 9 weeks 4 days minus 14 days = 7 weeks 4 days before scan day. Most due dates are revised at the dating scan if the scan-based age differs from LMP-based age by more than 5 to 7 days, because the scan is more reliable than memory of the last period.",
        "If the calculator says one date and the scan says another, trust the scan. Your last period might have been a week earlier or later than you remember; ovulation might have been delayed by stress or illness. Scan dating is accurate to within 3 to 5 days in the first trimester. After 14 weeks scan dating gets less reliable because growth rates vary. The [implantation calculator](/implantation-calculator) projects the next milestone forward from this conception date, and the [fertile window calculator](/fertile-window-calculator) shows the broader window of intercourse dates that could explain the same conception."
      ),
      createAnswerFirstSection(
        "When Knowing the Conception Date Actually Matters",
        "Three real reasons people work this out. First, pinning down whose pregnancy it is when there are two possible partners and the last period predates both. Second, matching the conception window to a specific event - a wedding, a holiday, a fertility treatment cycle - so the rough timing makes sense. Third, working out whether a positive test is consistent with what you remember; a 4-week pregnancy means conception roughly 2 weeks ago, so a date 5 weeks ago should not have produced a positive test until last week.",
        "This is a planning tool, not a diagnostic one. It cannot prove paternity (only DNA testing can), it cannot account for an irregular cycle without more information than 'last period date', and it does not replace medical advice. If the answer here matters legally, talk to your GP and ask for a dating scan as early as possible; the NHS offers one between 8 and 14 weeks and that is the date a court will rely on, not a calculator."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does the calculator show one date and my partner counts a different week?",
        "Because pregnancy is dated from LMP, not from conception. Doctors say 'you are 8 weeks pregnant' starting 8 weeks after your last period, when the actual embryo is 6 weeks old. The 2-week gap exists because you cannot pinpoint conception accurately, but you can pinpoint the LMP. So the conception date from this tool will always be roughly 2 weeks after the start of your gestational age count."
      ),
      createFAQ(
        "Can I get pregnant from sex earlier or later than the calculated date?",
        "Yes, within a 6-day window. Sperm can fertilise an egg up to 5 days after intercourse, and the egg itself lasts 12 to 24 hours after ovulation. So sex from 5 days before through to 1 day after the conception date can result in this pregnancy. If the question is which specific encounter caused the pregnancy and dates are close, only DNA testing can answer definitively."
      ),
      createFAQ(
        "What if my cycle is not 28 days?",
        "The LMP-based method assumes day 14 ovulation, which is wrong for most people. If your cycles run 30 days, ovulation is closer to day 16; for 35-day cycles, day 21. Add or subtract those days from the calculator's result. The due-date-based method (266 days back from due date) is more reliable for irregular cycles because the due date was probably already corrected at your dating scan."
      ),
      createFAQ(
        "Why is conception 266 days before due date and not 280?",
        "280 days (40 weeks) is measured from the first day of LMP. Conception happens roughly 14 days into that cycle, so 280 minus 14 = 266 days from conception to birth. The same baby, two reference points, two day counts. Pregnancy literature uses both, which is where most of the confusion comes from."
      ),
      createFAQ(
        "Is this accurate enough to work out paternity?",
        "Not on its own. The tool gives a single most-likely conception date based on the assumption of a regular 28-day cycle. The real conception window spans 6 days. If two possible partners had intercourse within that 6-day band, the calculator cannot distinguish between them. For paternity certainty, a non-invasive prenatal paternity test (from 7 weeks) or postnatal DNA test is the only reliable answer."
      ),
    ],
    relatedTools: [
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "implantation-calculator", label: "Implantation Calculator" },
      { slug: "fertile-window-calculator", label: "Fertile Window Calculator" },
    ],
  },

  "implantation-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Implantation Window is Projected",
        "Implantation is when the fertilised egg burrows into the uterine lining, and it happens 6 to 12 days after ovulation, with peak frequency around day 9. Give the calculator either an ovulation date or your last period (LMP) plus cycle length, and it projects the start, peak and end of the implantation window. The default 28-day cycle puts ovulation at LMP + 14 days; a 30-day cycle pushes that to day 16, and the implantation window shifts with it.",
        "Worked example. Ovulation on 12 May. Implantation window: 18 May (day 6) to 24 May (day 12). Most likely date: 21 May (day 9). The earliest a sensitive home pregnancy test would pick anything up is around day 8 to 10 post-ovulation, which is right inside this window, but most negative tests during the window are not false reassurance - they are just too early. The [when can I take a pregnancy test calculator](/when-can-i-take-a-pregnancy-test) tells you when to test based on this same timing."
      ),
      createAnswerFirstSection(
        "Why This is Different From Conception Dating",
        "Conception happens when sperm meets egg - within 24 hours of ovulation. Implantation happens 6 to 12 days later. Plenty of fertilised eggs never implant; medical estimates put pre-implantation loss at around 30% of all conceptions, mostly without the woman ever knowing she was pregnant. Implantation is the moment the body starts producing detectable HCG, the hormone home tests look for. So implantation, not conception, is the start of pregnancy biology that is visible from outside.",
        "This is why the [conception date calculator](/conception-date-calculator) is the wrong tool if you are looking at a positive test and trying to match it to an event. A test going positive on day 14 post-ovulation means implantation happened around day 8 or 9, not necessarily that conception was 14 days ago - it was conception that planted the seed and implantation that announced it. If you are tracking early symptoms, count from the implantation window, not from intercourse."
      ),
      createAnswerFirstSection(
        "What Implantation Actually Feels Like (and What It Doesn't)",
        "Around 25 to 30% of pregnancies produce noticeable implantation bleeding: light pink or brown spotting that lasts a few hours to two days, lighter than a period and not always seen at all. It happens 6 to 12 days post-ovulation, often mistaken for an early period. Cramping is reported in a minority of cases, usually mild and one-sided. The other 70% of pregnancies implant silently - no spotting, no symptoms, just a positive test a week later. Absence of bleeding does not mean implantation failed.",
        "What is not implantation: heavy bleeding with clots, sharp pain, fever, or any symptom that worsens over hours. Those need a phone call to your GP or 111, not a Google search. Symptoms that overlap (sore breasts, mild fatigue, queasiness) usually do not appear until a few days after implantation, when HCG is climbing. If you are tracking these for personal interest the [early pregnancy symptoms checker](/early-pregnancy-symptoms-checker) lists the timeline; just note that pre-period symptoms feel similar enough that most early signs are not diagnostic."
      ),
      createAnswerFirstSection(
        "When You Can Reliably Test After Implantation",
        "HCG starts at 0 mIU/mL the day before implantation and roughly doubles every 48 hours. By the day of missed period (usually 14 to 16 days post-ovulation), levels in a confirmed pregnancy are typically 25 to 100 mIU/mL, well above the 10 to 25 mIU/mL detection threshold of standard home tests. Tests labelled 'early result' or 'first response' detect from around 6.5 mIU/mL, so they can pick up pregnancy 2 to 4 days before missed period in roughly 70% of cases.",
        "Three things help test reliability. Use first-morning urine when HCG is most concentrated. Wait at least 11 days post-ovulation; testing earlier produces false negatives even in textbook pregnancies. If a test is negative and your period has not arrived, retest in 48 hours. HCG that doubles every 2 days will cross the detection threshold within a few days even if it started below it. The [when can I take a pregnancy test calculator](/when-can-i-take-a-pregnancy-test) gives the day-by-day reliability curve if you are deciding whether to test or wait another two days."
      ),
    ],
    faqs: [
      createFAQ(
        "I had spotting 8 days after ovulation. Is that implantation?",
        "It might be. Implantation bleeding occurs in 25 to 30% of pregnancies in the 6-12 day post-ovulation window, with day 8 well inside that range. The colour is usually pink or brown, the volume is much less than a period, and it stops within a day or two. The other possibility is a normal cycle with light spotting before a period; you cannot tell the difference until you test, and a useful test result usually needs another 3 to 5 days for HCG to rise enough."
      ),
      createFAQ(
        "Can implantation happen later than 12 days after ovulation?",
        "Rarely. The medical literature reports implantation at day 13 or 14 post-ovulation in a small percentage of pregnancies, and these later implantations have higher rates of early loss. If you are testing and getting negatives at 14 to 16 days post-ovulation but your period also has not arrived, repeat the test in 48 hours and contact your GP if it is still negative after 18 to 21 days post-ovulation."
      ),
      createFAQ(
        "Does pain during the implantation window mean implantation is happening?",
        "Probably not. Mid-cycle cramping is common around ovulation and the days that follow, with or without pregnancy. If pain is on one side, sharp, persistent or accompanied by shoulder-tip pain or dizziness, get medical advice the same day - those can be signs of an ectopic pregnancy and need ruling out. Mild, intermittent twinges are not a reliable sign of implantation either way."
      ),
      createFAQ(
        "If I miscarried at 5 weeks, when did implantation actually fail?",
        "Most very early miscarriages (called chemical pregnancies) reflect implantation that started but did not establish a stable connection with the uterine wall. The pregnancy registers on a test, then HCG fails to double or starts to fall within 1 to 2 weeks. The implantation window itself was probably normal; the issue is usually chromosomal in the embryo and not something the parent caused or could prevent."
      ),
      createFAQ(
        "What if I do not know when I ovulated?",
        "Use the LMP option and enter your usual cycle length. The calculator estimates ovulation as LMP + (cycle length - 14) days, then projects the implantation window from there. The estimate is rougher than working from a confirmed ovulation date (from OPKs, basal temperature charting or fertility tracking apps), but it is close enough for planning when to test. Add or subtract a couple of days of uncertainty either side."
      ),
    ],
    relatedTools: [
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "fertile-window-calculator", label: "Fertile Window Calculator" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "early-pregnancy-symptoms-checker", label: "Early Pregnancy Symptoms Checker" },
    ],
  },

  "fertile-window-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Your Fertile Window is Calculated",
        "The fertile window is the 6-day stretch each cycle when intercourse can result in pregnancy: the 5 days before ovulation plus ovulation day itself. The calculator works it out from your LMP and average cycle length. Ovulation is estimated as cycle length minus 14 (so day 14 for a 28-day cycle, day 16 for a 30-day cycle, day 21 for a 35-day cycle), and the fertile window is the 5 days before that plus the day itself.",
        "Worked example. LMP on 1 May, 28-day cycle. Predicted ovulation: 14 May. Fertile window: 9 May to 14 May. Best chance of conception is the 2 to 3 days right before ovulation - around 11 to 13 May - because sperm need time to reach the egg and fertilisation chances peak when sperm are already waiting when the egg arrives. The calculator highlights ovulation day with a thicker ring and shades the fertile window across multiple months so you can plan ahead."
      ),
      createAnswerFirstSection(
        "Why It is a 6-Day Window, Not a Single Day",
        "Two biological windows decide it. Sperm can survive in the cervical mucus and fallopian tubes for up to 5 days, especially when fertile-quality mucus (clear, stretchy, slippery) is present. The egg, by contrast, only lives for about 12 to 24 hours after ovulation. Multiply those: sex up to 5 days before ovulation can still produce pregnancy because viable sperm are present when the egg drops, but sex more than 24 hours after ovulation is too late.",
        "The classic Wilcox study from 1995 found that 100% of pregnancies in the dataset were conceived within this 6-day window, and roughly 30% of cycles in fertile couples produced pregnancy when intercourse happened within it. Daily intercourse during the window slightly outperforms every-other-day, but every-other-day is enough for most couples and is more sustainable. Pair this calculator with the [ovulation calculator](/ovulation-calculator) for a sharper view of the single highest-probability day."
      ),
      createAnswerFirstSection(
        "What This Tool Cannot Predict",
        "Calendar-based prediction works on the day-14-before-period assumption. That assumption holds for women with cycles between 26 and 32 days that are reasonably regular. It breaks for irregular cycles, cycles after coming off hormonal contraception, perimenopause, breastfeeding, after a recent miscarriage and during high-stress months. If your cycles vary by more than 5 days month to month, calendar prediction is a rough guide at best and can be completely wrong in any given cycle.",
        "More reliable methods stack on top of the calendar. Cervical mucus changes from sticky and white to clear and stretchy in the days before ovulation. Basal body temperature rises by 0.2-0.5°C the day after ovulation, confirming it has happened. Ovulation predictor kits (OPKs) detect the LH surge 24 to 36 hours before ovulation. Used together with this calculator, they confirm whether the calendar prediction matches the body's actual signal. The [implantation calculator](/implantation-calculator) takes the next step forward and tells you when to expect implantation and when a test would be reliable."
      ),
      createAnswerFirstSection(
        "Trying to Conceive vs Trying to Avoid",
        "Reverse the use case and the same calculator becomes a fertility awareness tool. Couples avoiding pregnancy without hormonal contraception use this window plus 4-day buffers either side: do not have unprotected sex from 7 days after the start of the period until 3 days after temperature confirms ovulation. The buffer accounts for cycles that ovulate earlier than predicted (sperm could be alive and waiting) or later than predicted (an egg that arrives outside the calculated window).",
        "Effectiveness varies dramatically. Calendar method on its own (Knaus-Ogino), the same approach this calculator uses, has a typical-use failure rate around 24% per year. Symptothermal methods that combine calendar with cervical mucus and temperature charting drop that to 2 to 5% with perfect use. If avoiding pregnancy matters, do not rely on this tool alone - use it alongside a fertility awareness method with proper training, or pair it with barrier protection during the highlighted window."
      ),
    ],
    faqs: [
      createFAQ(
        "How often should we have sex during the fertile window?",
        "Every 1 to 2 days is the sweet spot. Daily intercourse marginally raises per-cycle pregnancy chances but can lead to lower sperm counts in some men and burns couples out fast. Every-other-day during the 6-day window catches all the high-fertility days while keeping things sustainable. Save the more strategic days (2 days before ovulation through ovulation day) for guaranteed timing if energy is finite."
      ),
      createFAQ(
        "Why does the calendar predict day 14 ovulation but my OPK says day 17?",
        "Because the calendar prediction is an average, not a personal measurement. Many women ovulate later than day 14 even with a 28-day cycle; the luteal phase (post-ovulation) varies from 10 to 16 days between people. If your OPKs consistently detect the LH surge on day 17 in 28-day cycles, your fertile window is actually days 13 to 18, not days 9 to 14. Trust the OPK over the calculator when they disagree."
      ),
      createFAQ(
        "Can I get pregnant outside the fertile window?",
        "Almost never if calendar prediction is correct. The few documented pregnancies outside the calculated window happened because ovulation was earlier or later than the calendar predicted, not because sperm somehow survived 6+ days. The window itself is biological; only the timing of when it falls in your cycle is variable. If your cycles are unpredictable, the safe assumption is that fertile days could fall anywhere from day 7 to day 21 of any cycle."
      ),
      createFAQ(
        "How long does it take to get pregnant within the fertile window?",
        "For couples under 35 with no fertility issues, about 30% per cycle when intercourse is timed within the window, 50% within 3 cycles, 85% within 12 cycles. After 35, monthly chances drop to around 20%. If you have been timing intercourse correctly within the fertile window for 12 cycles (6 cycles if over 35) without conceiving, that is the threshold for talking to your GP about fertility investigations."
      ),
      createFAQ(
        "What if my cycle length changes from month to month?",
        "Track at least 6 cycles before relying on the calculator. Pick the shortest cycle and the longest cycle, then calculate the fertile window using both. If the shortest is 26 days, ovulation could be as early as day 12; if the longest is 33 days, as late as day 19. The combined fertile window for a variable cycle is the union: roughly day 7 to day 19, which is wide enough that calendar tracking alone is much less useful than it would be for someone with regular 28-day cycles."
      ),
    ],
    relatedTools: [
      { slug: "ovulation-calculator", label: "Ovulation Calculator" },
      { slug: "implantation-calculator", label: "Implantation Calculator" },
      { slug: "conception-date-calculator", label: "Conception Date Calculator" },
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
    ],
  },

  "maternity-leave-planner": {
    sections: [
      createAnswerFirstSection(
        "What This Planner Calculates",
        "Give the planner your due date, employment start date, average weekly earnings and (optionally) your intended leave start, and it works out four things: the earliest date you can start maternity leave (11 weeks before due date), your MATB1 deadline (you must give your employer the form by the end of the 15th week before due date), your Statutory Maternity Pay schedule, and your return-to-work date if you take the full 52 weeks. SMP is paid for 39 weeks: 6 weeks at 90% of your average weekly earnings, then 33 weeks at the statutory rate of £184.03 per week (or 90% of earnings, whichever is lower).",
        "Worked example. Due date 1 October 2026, average weekly earnings £600, employment started January 2024. The planner shows: earliest leave start 17 July 2026, MATB1 deadline 18 June 2026, SMP weeks 1-6 at £540/week (£3,240 total), SMP weeks 7-39 at £184.03/week (£6,073 total), total SMP £9,313 across 39 weeks, leave end 30 September 2027. Weeks 40-52 of leave are unpaid. Job protection runs the full 52 weeks; you have a right to return to the same job if you take 26 weeks or less, a similar job if longer."
      ),
      createAnswerFirstSection(
        "How to Qualify for SMP",
        "You qualify for Statutory Maternity Pay if you have worked for the same employer for at least 26 weeks ending with the 15th week before your due date (the 'qualifying week'), and your average weekly earnings in the 8 weeks before that qualifying week are at least £125 (the lower earnings limit for 2025/26). Earnings means gross pay including overtime and bonuses, not just basic salary. The planner uses your declared earnings figure to compute SMP; double-check it against actual payslips for the calculation reference period.",
        "If you do not qualify for SMP, you might qualify for Maternity Allowance via the DWP, which pays the same statutory rate (£184.03 for 2025/26) for 39 weeks but has different employment requirements. You can be self-employed, recently changed jobs, or have low earnings and still qualify for MA in many cases. The form is MA1 and you can claim from week 26 of pregnancy. This calculator focuses on SMP; for the alternative track, the gov.uk maternity-allowance page has the eligibility checker."
      ),
      createAnswerFirstSection(
        "Picking the Right Leave Start Date",
        "The earliest you can start maternity leave is 11 weeks before your due date. The latest is when the baby arrives. Most people start somewhere in between, and the choice matters financially. Starting at 11 weeks before due date means SMP starts at 11 weeks before due date - so you are paid 39 weeks from then, ending at 28 weeks postpartum. Starting at 4 weeks before due date pushes the SMP end date out to roughly 35 weeks postpartum but leaves you working in late pregnancy.",
        "There is also an automatic trigger: if you are off sick with a pregnancy-related illness in the 4 weeks before due date, your maternity leave starts automatically the day after the first day of sickness. So planning to work until the day before due date is risky; many people aim to start leave at 35 to 38 weeks pregnant to give themselves cushion. You must give your employer 28 days' notice of your intended leave start (or 28 days' notice of any change to it), and the MATB1 form is the formal evidence. The [paye calculator](/paye-calculator) is useful alongside this if you are working out tax on the SMP figures (SMP is taxable income just like salary)."
      ),
      createAnswerFirstSection(
        "What Happens to Pension and Benefits During Leave",
        "Pension contributions continue during the paid 39 weeks at the level you would have received if working normally. So if your employer contributes 5% of salary, they should contribute 5% of your normal salary (not 5% of SMP) for the full 39 weeks. Your own contributions are based on what you actually receive - 5% of SMP, not 5% of normal salary. During the unpaid 13 weeks (weeks 40-52), employer pension contributions are not legally required, though some employers continue them.",
        "Holiday accrues throughout the full 52 weeks of leave at your normal rate. So 28 days statutory holiday over a year of leave is still 28 days you can take when you return (or before, by tagging it on to maternity leave). Universal Credit, child benefit and tax credits work alongside SMP; child benefit kicks in once the baby is born and is currently £26.05 a week for the first child. The [child benefit calculator](/child-benefit-calculator) handles the high-income charge if either parent earns over £60,000. SMP itself is taxable and counts as earnings for tax credit purposes, so include it in your annual earnings declarations."
      ),
    ],
    faqs: [
      createFAQ(
        "When do I have to tell my employer I am pregnant?",
        "By the end of the 15th week before your due date, which is 25 weeks pregnant, give or take a week depending on cycle. Most people tell their employer earlier than that for practical reasons (occupational health, risk assessments), but the legal deadline for triggering SMP entitlement is the 15th-week-before mark. You also need to give them the MATB1 form (issued by your GP or midwife from week 20) by the same deadline."
      ),
      createFAQ(
        "What is the actual difference between SMP and Maternity Allowance?",
        "SMP is paid by your employer (who recovers most of it from HMRC). Maternity Allowance is paid directly by the DWP. The pay rates and 39-week duration are identical at the statutory level (£184.03/week for 2025/26). The difference is in qualifying conditions: SMP needs 26 weeks with the same employer, MA needs 26 weeks of work in the 66 weeks before your due date but allows multiple jobs, gaps and self-employment."
      ),
      createFAQ(
        "Can I take all 52 weeks of maternity leave?",
        "Yes. Statutory maternity leave is up to 52 weeks regardless of how long you have worked there. The first 26 weeks are 'ordinary maternity leave' and the second 26 weeks are 'additional maternity leave'. Pay only runs for 39 of those 52 weeks, so weeks 40 to 52 are unpaid unless your employer offers enhanced terms. You can return earlier than 52 weeks; you must give 8 weeks' notice of an early return."
      ),
      createFAQ(
        "Does the planner account for shared parental leave?",
        "Not directly. This tool plans your maternity leave assuming you take it all. If you and a partner are converting unused maternity leave into shared parental leave, you can transfer up to 50 weeks of leave and 37 weeks of pay (the 39 SMP weeks minus the 2 mandatory post-birth weeks). The maths gets fiddly and depends on how you split the time. Use the gov.uk shared parental leave calculator for that scenario, or the [child benefit calculator](/child-benefit-calculator) for the income-tax knock-on effects of either route."
      ),
      createFAQ(
        "What is the MATB1 form and when do I get it?",
        "MATB1 is the maternity certificate issued by your GP, midwife or hospital from 20 weeks pregnant. It states your due date and is the legal evidence your employer needs to start SMP. You must give the original (not a copy) to your employer no later than the end of the 15th week before due date - so usually around week 25 of pregnancy. Without MATB1, the employer is not legally required to start SMP."
      ),
    ],
    relatedTools: [
      { slug: "pregnancy-due-date-calculator", label: "Pregnancy Due Date Calculator" },
      { slug: "child-benefit-calculator", label: "Child Benefit Calculator" },
      { slug: "paye-calculator", label: "PAYE Calculator" },
    ],
  },

  "blood-alcohol-limit-by-country": {
    sections: [
      createAnswerFirstSection(
        "How Drink-Drive Limits Compare Across Countries",
        "Legal blood alcohol limits range from zero tolerance to 0.08% BAC depending on country. The lowest enforcement is in the UAE and Saudi Arabia at 0.00% (any alcohol behind the wheel is illegal). Sweden, Norway and Poland sit at 0.02%. Most of continental Europe (Germany, France, Spain, Italy) is at 0.05%. The UK (England, Wales, Northern Ireland), the US and Canada are at 0.08%. Scotland tightened to 0.05% in 2014 but the rest of the UK kept the older 0.08% limit. The calculator highlights the limit for the country you select and compares your estimated BAC against it.",
        "Worked example. A 70kg adult drinks 2 standard drinks (each 14g of pure alcohol, roughly a pint of 4% beer) over an hour. The Widmark formula gives a starting BAC of around 0.05 to 0.06%, dropping at 0.015% per hour. After 1 hour, BAC sits around 0.04 to 0.05%. That is below the UK limit of 0.08% but at or above the Scottish, French and German limits of 0.05%. Same drinks, same body, three different countries, three different legal answers."
      ),
      createAnswerFirstSection(
        "Why a Standard Drink is Not the Same Everywhere",
        "The calculator uses 14g of pure alcohol per drink, the US definition. UK 'units' are 8g of alcohol each, Australia uses 10g, Japan uses about 19.75g. So 'one drink' on this tool is roughly 1.75 UK units, 1.4 Australian standard drinks, or 0.7 Japanese single drinks. If you are using UK units and want to convert, multiply UK units by 0.57 to get this tool's drink count. A pint of 4% beer is about 2.3 UK units which is 1.3 'drinks' on this calculator. A 175ml glass of 13% wine is 2.3 UK units, also about 1.3 drinks here.",
        "Drink size matters more than people realise. A British pub pint at 5.2% beer carries 3 UK units (1.7 drinks). A 250ml glass of 13.5% wine carries 3.4 UK units (1.9 drinks). 'Two drinks' in a UK setting, calculated honestly, is often 4 to 5 UK units, which is 2.3 to 2.9 drinks on this tool. The result is a BAC closer to 0.08-0.10% for the same body weight. The [wedding drink calculator](/wedding-drink-calculator) is the same family of maths if you are working out drink quantities for an event."
      ),
      createAnswerFirstSection(
        "Why a Calculator Cannot Tell You If You Are Safe to Drive",
        "Real BAC depends on more than weight, drinks and time. Genetics affect alcohol dehydrogenase activity, sex changes the water-to-tissue ratio (women generally hit higher BAC than men at the same drinks and weight, by about 30%), food in the stomach slows absorption, fitness and hydration shift it. The Widmark formula this calculator uses is a population average and individual results can differ by 30 to 40%. So if the tool says 0.06% and the limit is 0.08%, your real BAC could be anywhere from 0.04% to 0.09%.",
        "Police breath tests measure breath alcohol, which is converted to blood alcohol equivalent. The conversion ratio is set by law per country and is conservative: a borderline reading on this calculator can fail a breath test. Penalties scale fast: in the UK, drink-driving is a 12-month minimum disqualification, an unlimited fine, possible 6 months prison. In Sweden a result over 0.10% can be 2 years prison. In France first offence at 0.05% is a 4,500 EUR fine and 6-point licence penalty. The only safe BAC is zero, which means no alcohol within at least 12 hours of driving (longer if you drank heavily the night before). If in doubt, do not drive - taxi, public transport or a taxi-like app."
      ),
      createAnswerFirstSection(
        "Specific Country Rules to Know",
        "Some countries have lower limits for new drivers. Germany has 0.00% for under-21s and drivers in the first 2 years of holding a licence. France imposes 0.02% for new drivers (within 2 years of licence). Australia varies by state but most have 0.00% for learner and probationary drivers. The US has 0.02% for under-21 drivers in most states (zero tolerance). The calculator uses the standard adult limit; if you are a new or under-21 driver, treat any reading above 0.02% as illegal in most countries.",
        "Commercial drivers face stricter limits everywhere. Truckers, bus drivers and taxi drivers in the UK and most of Europe are at 0.02% or zero. Aviation pilots in most jurisdictions are at 0.02% with an 8-hour bottle-to-throttle rule. Cycling under the influence is illegal in many European countries (Germany at 0.16% for cyclists, France at 0.05% same as drivers). The [travel visa checker](/travel-visa-checker) covers entry rules but each country's transport laws are worth checking before driving abroad - especially Italy, Czech Republic, Hungary and Romania, all at 0.00% for any driver."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the UK limit really 0.08% when most of Europe is 0.05%?",
        "England, Wales and Northern Ireland are still 0.08% BAC, the joint highest in Europe alongside Malta. Scotland reduced its limit to 0.05% in December 2014. There has been ongoing campaigning to bring the rest of the UK in line with Scotland and the EU norm but the law has not changed. So a driver crossing from Carlisle to Gretna sees the legal limit drop in one step."
      ),
      createFAQ(
        "How long does it take to be safe to drive after drinking?",
        "Roughly 1 hour per UK unit, but the safe answer is longer. Alcohol elimination averages 0.015% BAC per hour, so a 0.06% peak takes around 4 hours to drop to 0.00%. After heavy drinking (5+ drinks), expect 8 to 12 hours minimum and potentially still over the limit the next morning. Coffee, cold showers and food do not speed up elimination - only time does. Plan ahead: if you drink past 11pm, do not drive before lunch."
      ),
      createFAQ(
        "What is the limit in Saudi Arabia, Dubai and other zero-tolerance countries?",
        "0.00% BAC. In the UAE, Kuwait, Qatar and Saudi Arabia, any detectable alcohol behind the wheel is a serious criminal offence carrying jail time, fines and deportation for foreigners. This applies regardless of where the alcohol was consumed - drinking on a flight in and then driving from the airport can be enough to trigger prosecution. If travelling to these countries, do not drink anything if you might drive."
      ),
      createFAQ(
        "Does my body weight really change the legal answer?",
        "Yes, significantly. The same 3 drinks produce 0.07% BAC in a 60kg adult, 0.05% in a 80kg adult, 0.04% in a 100kg adult. So at the UK 0.08% limit a heavier person can drink more before hitting it - but reaction time, judgement and coordination are impaired well below the legal limit for everyone. The [tipping guide abroad](/tipping-guide-abroad) is the kind of pre-trip check; this is another: know the limit, know your weight, plan transport home before the first drink."
      ),
      createFAQ(
        "Can I be over the limit the morning after?",
        "Easily. 8 standard drinks finished at midnight gives a BAC around 0.16%; at 0.015% elimination per hour, that drops to 0.06% by 7am - still over the Scottish, French and German limits, and only just under the English limit. Police set up morning checkpoints partly because of this. Heavy drinking the night before driving is one of the most common ways legitimate adults end up failing a breath test. If you want to drive at 8am and you drank 4+ standard drinks the previous evening, the safe rule is do not."
      ),
    ],
    relatedTools: [
      { slug: "tipping-guide-abroad", label: "Tipping Guide Abroad" },
      { slug: "travel-visa-checker", label: "Travel Visa Checker" },
      { slug: "road-trip-cost-calculator", label: "Road Trip Cost Calculator" },
    ],
  },

  "us-health-insurance-cost-estimator": {
    sections: [
      createAnswerFirstSection(
        "Why US Health Insurance Costs So Much",
        "Average US individual premium for employer-sponsored coverage 2024: $8,400/year ($700/month), with employees typically paying 17-25% ($1,400-2,100/year). Family coverage averages $25,000/year, employees paying $6,500. ACA marketplace plans without employer subsidy: $7,000-15,000/year for individual depending on age, location, and plan tier.",
        "Premiums are only part of the cost. Deductibles ($1,500-7,500/year typical), copays ($20-50 per primary care visit, $30-80 for specialists), coinsurance (20% typical after deductible), and out-of-pocket maximums ($9,450 individual, $18,900 family in 2024) all add up. Total annual healthcare spending including premiums often $5,000-15,000 even for healthy people."
      ),
      createAnswerFirstSection(
        "Reading the Plan Tiers",
        "ACA marketplace plans use 'metal tiers': Bronze (60% of medical costs covered, lowest premium, highest deductible), Silver (70%), Gold (80%), Platinum (90%, highest premium, lowest deductible). Bronze plans suit healthy people who rarely use healthcare. Gold/Platinum suit chronic conditions or expected high use. Silver is the only tier eligible for cost-sharing reductions if you qualify for ACA subsidies.",
        "HMO plans require referrals from primary care for specialists. PPO plans let you see specialists directly. EPO plans (Exclusive Provider Organisation) similar to HMO but no referral needed. POS (Point of Service) hybrid - referral required but out-of-network covered partly. Network restrictions are the biggest source of unexpected bills."
      ),
      createAnswerFirstSection(
        "Subsidies Make ACA Affordable",
        "Premium tax credits (PTCs): subsidies based on income relative to federal poverty level. Through 2025, expanded subsidies eliminate the 'subsidy cliff' so anyone above 400% FPL still gets help if premiums exceed 8.5% of income. A family of 4 earning $80k can typically get $400-800/month in PTCs, dramatically reducing premium costs.",
        "Cost-sharing reductions (CSRs): only on Silver plans for households under 250% FPL. Reduces deductibles, copays, and OOP max significantly. A family at 200% FPL on Silver might have $1,500 deductible vs $7,500 unsubsidised. Combined PTCs and CSRs make Silver plans much cheaper than they appear in the marketplace listing."
      ),
      createAnswerFirstSection(
        "Choosing Wisely",
        "Strategy depends on health usage. Healthy with minimal expected medical use: Bronze with HSA (low premium, save for future expenses). Chronic condition or expected major medical event: Gold/Platinum with predictable cost-sharing. Pregnancy planning: ensure maternity coverage adequate, factor in $5-8k typical OOP for delivery.",
        "Out-of-network risk: any care outside network can add $1,000s in 'balance billing'. Emergency care has some No Surprises Act protections (since 2022) but ambulance services and air ambulance often excluded. Always verify in-network status of every provider in any procedure. The [US 401(k) Calculator](/us-401k-calculator) and [US HSA Calculator](/us-hsa-calculator) work alongside health insurance for tax-advantaged saving."
      ),
    ],
    faqs: [
      createFAQ(
        "When can I sign up?",
        "Annual open enrollment is November 1 - January 15 in most states. Outside that window, you need a 'qualifying life event' - marriage, divorce, birth, job loss, job change, moving across state lines, aging out of a parent's plan at 26. Without an event, wait until next open enrollment."
      ),
      createFAQ(
        "What's a deductible vs out-of-pocket maximum?",
        "Deductible: amount you pay before insurance starts contributing. Then you pay coinsurance (typically 20%) until OOP max. OOP max: total amount you pay in a year, after which insurance covers 100% of in-network care. 2024 OOP max limits: $9,450 individual / $18,900 family for ACA plans."
      ),
      createFAQ(
        "Can I keep my plan when I switch jobs?",
        "Generally no - employer plans end when you leave. Options: COBRA (continue old plan, you pay full premium ~$700/month individual), spouse's employer plan (qualifying event allows mid-year enrollment), ACA marketplace, short-term plans (cheaper but limited coverage). Short gaps between jobs can leave you uninsured if not planned."
      ),
      createFAQ(
        "Are mental health visits covered?",
        "Mental health parity law requires same coverage as medical. In-network therapy ($20-50 copay typical), psychiatry covered. Network availability is the bigger issue - many therapists don't accept insurance and require self-pay $150-300/session. Some plans cover out-of-network therapy at 60-80% reimbursement."
      ),
    ],
    relatedTools: [
      { slug: "us-health-insurance-estimator", label: "US Health Insurance Estimator" },
      { slug: "us-hsa-calculator", label: "US HSA Calculator" },
      { slug: "us-401k-calculator", label: "US 401(k) Calculator" },
      { slug: "us-paycheck-calculator", label: "US Paycheck Calculator" },
    ],
  },

  "australia-skin-cancer-check-reminder": {
    sections: [
      createAnswerFirstSection(
        "Australia's Skin Cancer Reality",
        "Australia has the highest skin cancer rates in the world. 2 in 3 Australians will be diagnosed with skin cancer by age 70. Melanoma is the third most common cancer in Australian men and women. The good news: when detected early, melanoma has a 90%+ 5-year survival rate. The bad news: late detection drops that to 30-50%.",
        "Cancer Council Australia recommends self-checks every 3 months and professional skin checks annually for adults, especially after age 40. People with risk factors (fair skin, red hair, blue eyes, history of sunburn, family history of melanoma, multiple moles, immunosuppression) should consider 6-monthly professional checks."
      ),
      createAnswerFirstSection(
        "Self-Check Method (ABCDE)",
        "Asymmetry: one half doesn't match the other. Border: irregular, ragged, blurred edges. Colour: varied within the same spot - tans, blacks, blues, whites. Diameter: larger than 6mm (pencil eraser). Evolving: changing in size, shape, colour, or symptoms. Any spot meeting one or more ABCDE criteria warrants professional review.",
        "Beyond ABCDE: 'ugly duckling' moles that look different from your other moles. New moles appearing after age 40. Spots that itch, bleed, or don't heal. Photos every 3-6 months help track changes you might not notice gradually. Apps like Skinvision, Molescope use AI-assisted analysis but should supplement, not replace, professional examination."
      ),
      createAnswerFirstSection(
        "Professional Skin Checks",
        "Bulk-billed GP skin check: free at GPs offering bulk-billing, but quick (5-10 min) and usually only spots they look at. Full body skin check at a skin cancer clinic: $150-300, typically 30-45 min including dermoscopy of suspicious spots. Skin cancer specialist or dermatologist: $200-400, more thorough but Medicare rebate covers some costs.",
        "Medicare rebates apply to most skin checks at GPs (Medicare item 36). Specialist dermatologist visits typically need GP referral (though direct booking allowed). Mole mapping (full-body photographic survey for tracking) costs $300-600 - worthwhile for high-risk patients (multiple moles, family history)."
      ),
      createAnswerFirstSection(
        "Prevention",
        "Slip on a shirt, slop on sunscreen (SPF 30+ broad spectrum, applied every 2 hours), slap on a hat, seek shade, slide on sunglasses. UV is most intense 10am-3pm in Australian summer; even 'cool' days have high UV. Daily SPF 30+ moisturiser for face and hands is now common practice for many Australians.",
        "Sunburn is cumulative damage. Each childhood sunburn doubles the lifetime melanoma risk. Outdoor workers, athletes, beach lovers should consider higher SPF (50+) and physical sun-protective clothing. The SunSmart UV alert on weather apps shows when UV exceeds 3 (when sunburn becomes easy). Use the [Australia Income Tax Calculator](/australia-income-tax-calculator) for broader Australian context."
      ),
    ],
    faqs: [
      createFAQ(
        "How often should I get checked?",
        "Annual professional check minimum for adults. 6-monthly if you have moderate risk factors (fair skin, history of sunburn). 3-monthly if high risk (previous skin cancer, family history, immunosuppression, many atypical moles). Self-checks every 3 months between professional appointments."
      ),
      createFAQ(
        "What does a skin check actually involve?",
        "Doctor examines all skin (head to toe) including scalp (parted hair), behind ears, soles of feet, between toes, fingernails. Dermoscope (handheld magnifier with light) used on suspicious spots. Photos taken of suspicious or changing moles for comparison at next visit. Suspicious spots biopsied (usually shave biopsy) sent for pathology."
      ),
      createFAQ(
        "What if a spot is removed?",
        "Biopsy or excision under local anaesthetic at the clinic visit, typically takes 5-15 minutes. Stitches in for 7-10 days, scar permanent but usually small. Pathology results in 1-2 weeks. If positive, more extensive surgery (wide excision) may be needed to ensure clear margins."
      ),
      createFAQ(
        "Is solarium use legal in Australia?",
        "Commercial solariums (sunbeds) banned in Australia since 2014 due to skin cancer risk. UK solariums still legal but heavily regulated. Australian regulations also ban tanning of under-18s. Solarium use, even briefly, dramatically increases melanoma risk - dose-response relationship is well-established in research."
      ),
    ],
    relatedTools: [
      { slug: "australia-income-tax-calculator", label: "Australia Income Tax Calculator" },
      { slug: "australia-pay-calculator", label: "Australia Pay Calculator" },
      { slug: "australia-cost-of-living-by-city", label: "Australia Cost of Living" },
      { slug: "uv-index-checker", label: "UV Index Checker" },
    ],
  },

  "steps-to-miles": {
    sections: [
      createAnswerFirstSection(
        "How Many Steps in a Mile?",
        "Approximately 2,000 steps per mile for the average adult walking pace (3 mph, 30-inch stride). Variation by stride length: shorter stride (5'2\" person, 25-inch stride): ~2,400 steps/mile. Longer stride (6'2\" person, 35-inch stride): ~1,800 steps/mile. Running uses longer strides: roughly 1,500-1,700 steps/mile depending on speed.",
        "The 10,000 steps/day target (popularised by 1965 Japanese pedometer marketing) equals roughly 5 miles. Modern research suggests 7,000-8,000 steps/day captures most health benefits; 10,000 is a useful aspirational target. UK Active Lives Survey: average UK adult walks ~5,000-6,000 steps daily."
      ),
      {
        heading: "Steps to Miles Conversion",
        table: {
          headers: ["Steps", "Miles (avg)"],
          rows: [
            ["1,000 steps", "0.5 mi"],
            ["2,000 steps", "1 mi"],
            ["5,000 steps", "2.5 mi"],
            ["7,500 steps", "3.75 mi"],
            ["10,000 steps", "5 mi"],
            ["12,500 steps", "6.25 mi"],
            ["15,000 steps", "7.5 mi"],
            ["20,000 steps", "10 mi"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How can I measure my actual stride length?",
        "Walk 100 steps along a measured course (track, sports field). Distance ÷ 100 = average stride length. Stride length tends to be 0.4 × your height in metres for walking, 0.5 × height for running. Use this as starting estimate; measure your actual for personalised conversion."
      ),
      createFAQ(
        "Are 10,000 steps the right target?",
        "Originally a 1960s Japanese marketing slogan for the 'manpo-kei' pedometer. Recent research finds 7,000-8,000 steps/day captures most cardiovascular benefits; 10,000 isn't more harmful but isn't significantly better. For weight loss, focus on duration and intensity, not just step count."
      ),
    ],
    relatedTools: [
      { slug: "miles-to-km", label: "Miles to Kilometres" },
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "cycling-calorie-calculator", label: "Cycling Calorie Calculator" },
    ],
  },

  "water-intake-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Water Do You Actually Need?",
        "The 'eight 8-oz glasses' (8x8) rule = 64 oz = 1.9 L. NHS recommendation: 6-8 cups of fluids daily, mostly water. EFSA: 2.0 L/day women, 2.5 L/day men - including ALL fluid sources (food contains 20% of daily water need, beverages 80%). Activity, climate, and body size shift these baselines significantly.",
        "Multiply by activity: sedentary office work in temperate climate = baseline. Add 0.5-1 L for moderate exercise. Add 1-2 L for heavy exercise or hot climate. Body weight: roughly 30-40 ml/kg body weight gives a personalised baseline. So a 70 kg person needs about 2.1-2.8 L/day. Heavy training, hot weather, or pregnancy increase needs."
      ),
      {
        heading: "Daily Water Intake by Body Weight",
        table: {
          headers: ["Weight", "Sedentary", "Moderately active", "Heavy training"],
          rows: [
            ["50 kg (110 lb)", "1.5 L", "2.0 L", "3.0 L"],
            ["60 kg (132 lb)", "1.8 L", "2.4 L", "3.5 L"],
            ["70 kg (154 lb)", "2.1 L", "2.8 L", "4.0 L"],
            ["80 kg (176 lb)", "2.4 L", "3.2 L", "4.5 L"],
            ["90 kg (198 lb)", "2.7 L", "3.6 L", "5.0 L"],
            ["100 kg (220 lb)", "3.0 L", "4.0 L", "5.5 L"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does coffee count toward water intake?",
        "Yes. Despite caffeine's mild diuretic effect, coffee and tea contribute net positive to hydration. The diuretic effect is overstated - most studies show only modest urine increase with normal caffeine intake. Treat 1 cup of coffee as roughly 1 cup of water for hydration purposes."
      ),
      createFAQ(
        "Can you drink too much water?",
        "Yes - hyponatremia (low blood sodium) from drinking 4-5 L+ in a short period without electrolyte replacement. Most common in marathon runners and military trainees. For sedentary or moderate activity, drinking to thirst is sufficient. Forcing 'extra' water beyond thirst rarely helps."
      ),
    ],
    relatedTools: [
      { slug: "tdee-calculator", label: "TDEE Calculator" },
      { slug: "ml-to-cups", label: "Millilitres to Cups" },
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
    ],
  },
};
