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

  "a3-to-tabloid-dimensions": {
    sections: [
      createAnswerFirstSection(
        "A3 vs Tabloid: Close, But Not the Same",
        "A3 measures 297 x 420 mm (11.69 x 16.54 inches), while Tabloid (also called Ledger or sometimes B size in North America) measures 11 x 17 inches (279.4 x 431.8 mm). They are similar enough that a casual glance treats them as identical, but the actual difference matters when designing print artwork or feeding paper through a printer. A3 is roughly 17.6 mm wider and 11.8 mm shorter than Tabloid; that is enough to clip artwork or jam a printer's auto-feeder if the wrong size is loaded.",
        "The two formats are the large-format equivalents of A4 and US Letter respectively: A3 is exactly twice the area of A4 (the entire ISO 216 system follows this folded-in-half rule), while Tabloid is exactly twice the area of US Letter. ISO 216 (A3) is used in every country except the US, Canada, the Philippines and a few Central American nations; Tabloid is the dominant North American format for posters, large spreadsheets, architectural drafts and tabloid-format newspapers."
      ),
      createAnswerFirstSection(
        "When You'd Need to Convert Between Them",
        "The conversion comes up most often when designing print work for a US client from outside the US, or vice versa. A poster designed at A3 will not fit cleanly on a Tabloid printer; the artwork will either crop the long edges or print with awkward white margins on the short edges. Most design software (Adobe InDesign, Affinity Publisher, Canva) lets you set up the document at one size and export to the other, with optional scaling or fitting modes. Use 'Fit to Printable Area' to add small margins; use 'Scale to Fill' to crop the edges.",
        "Office printers also matter. A typical UK office multi-function printer accepts A3 and A4 in its tray. A US office printer accepts Tabloid and Letter. Loading the wrong paper type into an auto-feeder usually causes a misfeed; loading manually onto the bypass tray usually works, with a small amount of trial-and-error on the size setting in the print dialogue. The [paper size converter](/paper-size-converter) covers the full A-series to US-series cross-reference."
      ),
      createAnswerFirstSection(
        "Why ISO and US Paper Sizes Diverged",
        "ISO 216 (the A and B series) was standardised in Germany in 1922 and adopted internationally because of one elegant feature: every size has the same width-to-height ratio (1:√2, or roughly 1:1.414). Cut an A0 sheet in half and you get two A1 sheets with the same proportions. This makes scaling artwork between sizes trivial and predictable. The mathematical purity of the system is why it spread globally.",
        "The US never adopted ISO 216 because Letter, Legal and Tabloid were already entrenched in business and government use. The US sizes do not have a consistent width-to-height ratio (Letter is 1:1.294, Legal is 1:1.647, Tabloid is 1:1.546), so scaling artwork up or down requires manual adjustment. The American National Standards Institute (ANSI) eventually formalised the US sizes in 1995 as ANSI A through E, with Tabloid corresponding to ANSI B."
      ),
      createAnswerFirstSection(
        "Working With Both Sizes in One Project",
        "If you are producing a document for an international audience and need it to print cleanly on both A3 and Tabloid, design with a 5 mm safe area on all four edges. Anything inside that boundary will print on both formats. Anything closer to the edge risks being cropped on one of them. This is the same principle as designing for both 16:9 and 4:3 video output: keep the important content in the centre, treat the edges as 'might survive, might not'.",
        "For very precise applications (technical drawings, blueprint reductions), specify the actual size on the drawing itself rather than assuming the page format. A '1:50 scale' drawing only works at 1:50 if the paper is the size you designed for. Many architectural offices keep both A3 and Tabloid stock to handle US and international projects without rescaling."
      ),
      {
        heading: "A3 vs Tabloid Dimensions Comparison",
        table: {
          headers: ["Metric", "A3", "Tabloid", "Difference"],
          rows: [
            ["Width (mm)", "297", "279.4", "A3 is 17.6 mm wider"],
            ["Height (mm)", "420", "431.8", "Tabloid is 11.8 mm taller"],
            ["Width (inches)", "11.69", "11", "A3 is 0.69 in wider"],
            ["Height (inches)", "16.54", "17", "Tabloid is 0.46 in taller"],
            ["Aspect ratio", "1:1.414", "1:1.546", "Tabloid is more elongated"],
            ["Area", "0.125 m² (193.4 sq in)", "0.125 m² (187 sq in)", "A3 is 3.4% larger"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I print an A3 document on a Tabloid printer?",
        "Yes, with caveats. The Tabloid sheet is taller but narrower, so the design will need to scale to fit. Most printers offer a 'Fit to Printable Area' option that scales the document to the largest size that fits inside the page margins; this prints A3 artwork at about 94% scale on Tabloid paper, with white margins on the short edges. If exact 1:1 size matters (architectural drawings, scale models, technical schematics), the 6% scale-down can be a problem; reformat the artwork to native Tabloid dimensions instead."
      ),
      createFAQ(
        "What is the same as Tabloid in metric?",
        "Tabloid in metric is 279.4 mm x 431.8 mm. There is no exact ISO 216 equivalent; A3 is the closest metric size but is wider and shorter. Some metric publishers use 'Super B' (305 x 457 mm) as a Tabloid-with-bleed equivalent for posters, which gives 13 mm of bleed on all four sides."
      ),
      createFAQ(
        "Is Ledger the same as Tabloid?",
        "Yes, in North America. 'Ledger' and 'Tabloid' both refer to 11 x 17 inch paper. The names sometimes distinguish orientation: Ledger when used landscape (17 x 11), Tabloid when used portrait (11 x 17). In day-to-day office use the two terms are interchangeable; both are stocked together in office supply stores."
      ),
      createFAQ(
        "What is ANSI B paper?",
        "ANSI B is the formal name for Tabloid in the American National Standards Institute paper-size system. It is identical to Tabloid: 11 x 17 inches (279.4 x 431.8 mm). The ANSI series goes from A (8.5 x 11, the same as Letter) through B, C, D and E, with each size double the previous. ANSI B = 2 x ANSI A, ANSI C = 2 x ANSI B, and so on, mirroring the ISO 216 doubling principle."
      ),
      createFAQ(
        "Is A3 used in the US at all?",
        "Rarely. Some US design studios, architectural firms with international clients and technical-drawing offices keep A3 paper stocked, but it is not standard. Most US printers and copiers do not auto-feed A3, and most US office supply stores do not carry it as standard stock. If you need A3 in the US, order it online (Amazon, Office Depot custom-order); expect a slight price premium over Tabloid."
      ),
    ],
    relatedTools: [
      { slug: "a4-to-letter-dimensions", label: "A4 to Letter Paper Size" },
      { slug: "a5-to-half-letter-dimensions", label: "A5 to Half Letter Paper Size" },
      { slug: "paper-size-converter", label: "Paper Size Converter" },
    ],
  },

  "a4-to-letter-dimensions": {
    sections: [
      createAnswerFirstSection(
        "A4 vs US Letter: Where the Difference Bites",
        "A4 measures 210 x 297 mm (8.27 x 11.69 inches). US Letter measures 8.5 x 11 inches (215.9 x 279.4 mm). The visual difference is small enough that most people do not notice when comparing the two side by side, but the practical difference matters constantly: a UK CV designed at A4 will not fit cleanly on a US Letter printer, and a US one-pager designed at Letter will print with awkward margins on a UK A4 printer. Letter is wider but shorter than A4 by about 6 mm in each dimension.",
        "The two formats are the dominant 'standard sheet' sizes in their respective regions. A4 is used everywhere except the US, Canada, the Philippines, Mexico and a few Central American countries. Letter is the standard in the US and Canada (and a non-standard secondary option in Mexico). If you are sending a CV or business document across the Atlantic, formatting it for the recipient's region rather than your own is a small touch that saves them from awkward print results."
      ),
      createAnswerFirstSection(
        "What Goes Wrong When You Print the Wrong Size",
        "A4 artwork on a Letter printer typically scales down to 94% of its design size (the 'Fit to Printable Area' default), which adds small white margins on the long edges and shrinks all text proportionally. Designed at 11 pt, you end up reading 10.3 pt on paper, which is fine for body text but makes 8 pt footnote text uncomfortably small. The same effect happens in reverse for Letter on A4.",
        "If the document was designed with bleed (artwork extending past the trim edge for borderless printing), the size mismatch crops the bleed unevenly. A border designed to extend 3 mm past the page edge becomes either a thin visible white strip or a thicker-than-intended border, depending on which way the size mismatch goes. For any document where layout precision matters (CVs, brochures, certificates), set up the document at the recipient's native size rather than yours."
      ),
      createAnswerFirstSection(
        "Setting Up Documents for Both Sizes",
        "In Microsoft Word, change the page size from File > Page Setup > Paper Size. The default in UK installations is A4; in US installations it is Letter. Switching just the page size scales nothing; it changes the boundary and lets your content reflow. Word also has a 'Scale Content to Paper Size' option in print settings that applies a one-time scale to fit, which is fine for a quick send but ugly for archival use.",
        "In Adobe InDesign, Affinity Publisher and similar layout software, page size is set per document and is fixed at creation. Switching size mid-design requires the 'Layout Adjustment' feature, which scales objects proportionally to the new page size. This works better than Word's approach but still requires manual checks afterwards. The cleanest approach is to design twice (once at A4, once at Letter) for any document destined for both audiences."
      ),
      createAnswerFirstSection(
        "Why the US Never Adopted A4",
        "Letter size was the de facto US standard by the 1920s, used by typewriter manufacturers and government agencies long before ISO 216 was formalised in 1975. Switching to A4 would have invalidated millions of filing cabinets, pre-printed forms and office supplies. The benefits (mathematical elegance, international consistency) were not enough to offset the costs of replacement. The same inertia kept the US on imperial measurements while the rest of the world standardised on metric.",
        "The result is that the US still operates on a non-ISO 216 paper system, which creates a small but constant friction in international business. Over decades, that friction has been mitigated by smart-scaling print drivers, scaling preferences in word processors and PDF viewers (Acrobat 'Fit to Page' is enabled by default for cross-region printing). For most one-page documents, the difference is invisible to the reader. The [paper size converter](/paper-size-converter) gives the full lookup table across A-series, US Letter, Legal and Tabloid."
      ),
      {
        heading: "A4 vs US Letter Dimensions",
        table: {
          headers: ["Metric", "A4", "US Letter", "Difference"],
          rows: [
            ["Width (mm)", "210", "215.9", "Letter is 5.9 mm wider"],
            ["Height (mm)", "297", "279.4", "A4 is 17.6 mm taller"],
            ["Width (inches)", "8.27", "8.5", "Letter is 0.23 in wider"],
            ["Height (inches)", "11.69", "11", "A4 is 0.69 in taller"],
            ["Aspect ratio", "1:1.414", "1:1.294", "Letter is more square"],
            ["Area (sq in)", "96.7", "93.5", "A4 is 3.4% larger"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I save a Word document as both A4 and Letter?",
        "Yes, but you have to do it twice. Save once at A4, change Page Setup to Letter, save the same document again under a different filename. Word does not save multiple page sizes inside a single document. For frequently-shared documents, a PDF export is a good middle ground: PDFs can be viewed at any size and the print driver handles the scaling automatically with 'Shrink to Page' enabled by default."
      ),
      createFAQ(
        "What is the closest metric equivalent of Letter size?",
        "There is no exact ISO 216 equivalent. A4 is the closest standard size but is taller and narrower. Some printers and PDF viewers offer 'Letter' as a custom paper size in addition to the A-series; selecting Letter prints at the actual 215.9 x 279.4 mm dimensions rather than scaling to A4. Most UK office printers can handle Letter paper if you load it manually, but it is not standard stock."
      ),
      createFAQ(
        "Why is my CV in A4 cutting off when sent to a US recruiter?",
        "Because the recruiter's system is sized for Letter and your A4 page is taller than Letter by about 17 mm. Either save the CV as PDF (which lets the recruiter's PDF viewer auto-scale to fit), or switch the page size in Word to US Letter before saving for US applications. Sending a Word document at A4 to a US recruiter without PDF is the most common cause of CV formatting issues across the Atlantic."
      ),
      createFAQ(
        "What is 'US Legal' size?",
        "US Legal is 8.5 x 14 inches (215.9 x 355.6 mm). It is taller than both Letter and A4 and is used primarily for legal documents (contracts, court filings, real-estate paperwork) where space for boilerplate text and signatures is needed. Legal is largely a US-only format; the closest ISO 216 size is A4 (which is significantly shorter) or B5 (smaller). Most US printers can handle Legal alongside Letter; UK printers typically cannot without a manual paper-size override."
      ),
      createFAQ(
        "Is A4 the same as 'international fanfold'?",
        "No. International fanfold is a continuous-feed dot-matrix printer paper format, 8.25 x 12 inches per sheet, used in old multi-part forms (carbon copies). It has been almost completely replaced by laser and inkjet printing on standard cut-sheet sizes. If you have inherited a stack of fanfold paper, it does not fit any modern printer; it is destined for recycling."
      ),
    ],
    relatedTools: [
      { slug: "a3-to-tabloid-dimensions", label: "A3 to Tabloid Paper Size" },
      { slug: "a5-to-half-letter-dimensions", label: "A5 to Half Letter Paper Size" },
      { slug: "paper-size-converter", label: "Paper Size Converter" },
    ],
  },

  "fahrenheit-weather-guide": {
    sections: [
      createAnswerFirstSection(
        "How to Read Fahrenheit at a Glance",
        "Fahrenheit is the everyday temperature scale in the US, the Bahamas, the Cayman Islands and a couple of other places; everywhere else uses Celsius. The two scales meet at -40 (where -40°F = -40°C) and diverge from there. Quick mental conversions: 32°F = 0°C (water freezes), 50°F = 10°C (cold), 70°F = 21°C (room temperature), 100°F = 38°C (hot, slightly above body temperature). The exact formula is C = (F - 32) x 5/9; the calculator does it instantly without the mental arithmetic.",
        "What this guide adds beyond a numbers conversion is context: at any given Fahrenheit reading, what do you wear, what activities make sense, and is there any health risk to be aware of? A 70°F day in San Diego and a 70°F day in Houston feel very different (humidity, sun angle, breeze) but the basic rule is the same: short sleeves, light layers, comfortable for outdoor activity. The guide bands the Fahrenheit range into freezing, cold, cool, comfortable, hot and extreme zones, with practical recommendations for each."
      ),
      createAnswerFirstSection(
        "What 32°F, 50°F, 70°F and 90°F Actually Feel Like",
        "32°F (0°C) is the freezing point of water. Surfaces start to glaze with ice; standing water becomes slippery; pipes risk freezing in unheated buildings. Heavy coat, gloves, hat. 50°F (10°C) is a cool spring or autumn day in most of the US; light jacket, long sleeves, jeans. Comfortable for hiking and most outdoor activity. 70°F (21°C) is the standard indoor target temperature in most American homes; shorts and t-shirt outdoors are comfortable, anything more is overdressed.",
        "90°F (32°C) is properly hot, common in the southern US in summer. Light, breathable clothing, sunscreen, hats, plenty of water. Above 100°F (38°C) the body's natural cooling starts to struggle; heat exhaustion becomes a real risk after 30+ minutes of outdoor activity, especially in humid conditions. The 'extreme' zone in the calculator (95°F and above) carries a real health warning, not just a clothing recommendation. For the reverse direction, the [Celsius to Fahrenheit](/celsius-to-fahrenheit) converter handles the same range without commentary."
      ),
      createAnswerFirstSection(
        "Why Tourists Get Caught Out in the US",
        "British tourists arriving in Florida often see '85°F' on their phone and pack as if for a UK summer. 85°F is 29°C, which is comfortable summer warmth in the UK, but Florida combines that with 70%+ humidity and overhead sun, which makes it feel closer to 35°C in UK terms. The 'feels like' temperature (heat index) is a separate calculation that includes humidity. A Fahrenheit reading without humidity context understates the heat in the US South, and overstates it in dry-air states like Arizona.",
        "Conversely, US tourists in the UK see '60°F' and assume it is mild; 60°F (16°C) in the UK is often combined with light wind, drizzle and overcast skies, all of which make it feel cooler than the equivalent dry-air 60°F in California. Pack layers, not absolutes. The temperature scale gives a baseline; local weather conditions adjust how it actually feels by 5 to 10 degrees in either direction."
      ),
      createAnswerFirstSection(
        "When the Number Triggers Real Health Concerns",
        "The two danger zones to watch for: below 32°F with wind (frostbite risk on exposed skin within 30 minutes at -10°F or lower with significant wind chill), and above 95°F with high humidity (heat exhaustion and heat stroke risk for vulnerable people within 1 to 2 hours of outdoor exposure). The calculator's 'extreme heat' band starts at 95°F because that is the threshold where the National Weather Service begins issuing heat advisories.",
        "Children and the elderly tolerate temperature extremes worse than healthy adults. Outdoor activity in 95°F+ heat should be limited to 15 to 20 minute bursts with shaded breaks; outdoor activity below 15°F with wind should similarly be time-limited. Indoor temperature regulation matters too: setting your home thermostat too low in winter (below 60°F) increases respiratory illness risk, particularly for older residents. The CDC recommends 68 to 70°F as a healthy minimum."
      ),
      {
        heading: "Fahrenheit to Celsius Quick Reference",
        table: {
          headers: ["Fahrenheit", "Celsius", "Description", "Typical clothing"],
          rows: [
            ["0°F", "-18°C", "Bitterly cold, frostbite risk", "Heavy parka, thermal layers, hat, gloves"],
            ["32°F", "0°C", "Freezing point, ice on surfaces", "Winter coat, hat, gloves"],
            ["50°F", "10°C", "Cool, light jacket weather", "Long sleeves, light jacket"],
            ["68°F", "20°C", "Pleasantly warm room temp", "T-shirt, jeans"],
            ["80°F", "27°C", "Hot summer day", "Shorts, t-shirt, sun protection"],
            ["95°F", "35°C", "Properly hot, hydrate", "Light, loose clothing, hat, plenty of water"],
            ["104°F", "40°C", "Dangerous heat", "Stay indoors if possible, AC, hydrate constantly"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does the US still use Fahrenheit?",
        "Same reason the US still uses Letter paper, miles for distance and pounds for weight: the existing infrastructure (thermostats, oven dials, weather forecasts, building HVAC) is calibrated in Fahrenheit, and switching would cost more than it saves. There is no functional reason to prefer Fahrenheit over Celsius scientifically; both scales describe the same physical phenomena. Fahrenheit's only practical advantage is finer granularity in the everyday range (a 1-degree change in F is smaller than a 1-degree change in C, so weather forecasts feel more precise)."
      ),
      createFAQ(
        "Is body temperature 98.6°F or 98.4°F?",
        "Both are commonly cited but neither is exactly right for everyone. The historical standard of 98.6°F (37°C) comes from a German study in 1851 and reflects average oral temperature in healthy adults. More recent research (Stanford 2020) puts the modern average closer to 97.9°F (36.6°C), suggesting human body temperature has dropped slightly over the past century. Individual variation is significant: a healthy adult's normal can be anywhere from 97 to 99°F. Fever is generally diagnosed at 100.4°F (38°C) or above."
      ),
      createFAQ(
        "What is 0°F in Celsius?",
        "0°F is -17.78°C, calculated as (0 - 32) x 5/9. This is properly cold; common in the northern US and Canada in deep winter, occasionally seen in the UK during severe cold snaps but very rare. At this temperature, exposed skin is at frostbite risk within an hour even without wind; with significant wind chill, the risk window shortens dramatically. UK weather forecasts use Celsius and describe -18°C as 'severe cold' rather than as a routine winter temperature."
      ),
      createFAQ(
        "Do I need to convert my UK car's display when in the US?",
        "Most modern UK cars have a settings menu that switches the temperature display from Celsius to Fahrenheit. This is useful when in the US so the figure on your dashboard matches the figure on weather signs and forecasts. Look in your in-car settings menu under 'Units' or 'Display'. Older cars may not offer the option; in that case the calculator gives you the conversion in two seconds without needing dashboard fiddling."
      ),
      createFAQ(
        "What's a 'feels like' temperature?",
        "The 'feels like' temperature combines the air temperature with humidity, wind speed and sun exposure to estimate how hot or cold the conditions actually feel to a human. In hot weather it is called the heat index; in cold weather it is called the wind chill. A 32°F day with 25 mph wind 'feels like' about 21°F because the wind strips body heat faster than still air. A 95°F day with 80% humidity 'feels like' about 110°F because sweat cannot evaporate efficiently. Weather apps and forecasts usually show both numbers."
      ),
    ],
    relatedTools: [
      { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
      { slug: "celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
    ],
  },

  "uk-to-eu-dress-size": {
    sections: [
      createAnswerFirstSection(
        "How UK and EU Dress Sizes Compare",
        "EU dress sizes run roughly 22 numbers higher than UK sizes for women's clothing. UK 6 = EU 34, UK 8 = EU 36, UK 10 = EU 38, UK 12 = EU 40, UK 14 = EU 42, UK 16 = EU 44, UK 18 = EU 46. The pattern is a clean +28 from UK number for the EU number (UK 12 + 28 = EU 40), but the underlying garment measurements are not always identical between brands. Treat the conversion as a starting point, not a guarantee.",
        "EU sizing follows a German/French standard that is approximately based on bust size in centimetres minus a fixed offset. UK sizing has historic ties to imperial measurements and to the British high-street tradition of 'high-street fit', which has crept slightly larger over the past two decades (a UK 12 today is generally a touch roomier than a UK 12 from 1995). When buying from European brands like Zara, Mango, COS or H&M (which uses EU sizes despite the Swedish origin), use the conversion as a guide and check the brand's specific size chart for bust, waist and hip measurements."
      ),
      createAnswerFirstSection(
        "Why the Conversion Is Approximate",
        "Two UK 12s from different brands can vary by 2 to 3 inches in the waist or hip, even though both are labelled identically. EU sizing is no different in this respect. The official EN 13402 standard tries to harmonise EU sizing around bust/waist/hip in centimetres (for example, EU 38 = bust 88-92 cm, waist 72-76 cm, hip 96-100 cm), but most fashion brands ignore this in favour of their own house sizing. Zara famously runs small; Mango's M is closer to a UK 10; COS sits roughly true to chart.",
        "The result is that the UK-to-EU conversion in this calculator is the standard reference number, not the guaranteed correct size for any specific brand. Always check measurements (chest, waist, hip in cm or inches) against the brand's chart before buying online. If you are between sizes (e.g. a UK 12 with hips closer to a UK 14), size up for fitted styles, size to bust for floaty cuts."
      ),
      createAnswerFirstSection(
        "Vanity Sizing and Why Modern UK 12 Is Looser Than 1995 UK 12",
        "Vanity sizing is the slow drift of garment measurements upward while the size labels stay the same. A UK 12 dress in 2026 typically has a 30-31 inch waist; in 1995 a UK 12 had a 27-28 inch waist. The same 'size 12' label hides about 3 inches of expansion. EU sizing has been more resistant to this, particularly in luxury brands where a EU 40 today is reasonably close to a EU 40 from 25 years ago. Mass-market EU brands (H&M, Zara) have followed the UK trend slightly, but not as aggressively.",
        "This means buying EU brands when sized down by the standard conversion (UK 12 = EU 40) sometimes produces clothes that feel tighter than expected, because the EU 40 is closer to the original UK 12 than the modern UK 12 is. If your UK clothes typically feel roomy or you usually size down, consider sizing up by one in EU. The [UK to US dress size](/uk-to-us-dress-size) converter has a similar caveat for shopping US brands, where US sizing has experienced even more vanity creep than UK."
      ),
      createAnswerFirstSection(
        "When the Conversion Goes Wrong",
        "Three scenarios cause regular returns. First, fitted styles (tailored dresses, work shifts, structured blazers) where the EU-to-UK conversion needs to account for cut. Sizing by chest works for tops; sizing by hip works for skirts; sizing by waist works for dresses. The standard conversion works for a 'classic A-line' shape; for anything else, check measurements. Second, brand-specific quirks (Italian brands often run small, Scandinavian brands often run loose). Third, men's-vs-women's sizing where some brands use a unisex EU number that does not map cleanly to UK women's sizing.",
        "When in doubt, order two sizes (the converted EU and one above) and return the one that does not fit. Most online retailers in the EU and UK offer free returns since the Consumer Contracts Regulations 2013 require a 14-day return window. Check the specific retailer's policy; some require returns at your own cost despite the legal minimum."
      ),
      {
        heading: "UK to EU Women's Dress Size Conversion",
        table: {
          headers: ["UK", "EU", "US", "Bust (cm)", "Waist (cm)", "Hip (cm)"],
          rows: [
            ["6", "34", "2", "80-82", "60-62", "84-86"],
            ["8", "36", "4", "84-86", "64-66", "88-90"],
            ["10", "38", "6", "88-90", "68-70", "92-94"],
            ["12", "40", "8", "92-94", "72-74", "96-98"],
            ["14", "42", "10", "96-98", "76-80", "100-102"],
            ["16", "44", "12", "100-104", "82-86", "104-106"],
            ["18", "46", "14", "106-110", "88-92", "108-112"],
            ["20", "48", "16", "112-116", "94-98", "114-118"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is EU 40 the same as UK 12?",
        "Yes, by the standard conversion. EU 40 corresponds to UK 12 in women's clothing across most European brands. The bust, waist and hip measurements for EU 40 are typically 92-94 cm bust, 72-74 cm waist, 96-98 cm hip. The actual fit varies by brand: Zara EU 40 tends to run small (closer to UK 10), COS EU 40 runs roomier (closer to UK 14). Always check the brand's size chart before buying."
      ),
      createFAQ(
        "Are French and Italian sizes the same as German?",
        "Officially yes (all use the EN 13402 standard), but in practice French sizing (taille) and Italian sizing run slightly differently. French sizes often label one number lower (UK 12 = FR 38 in some brands, FR 40 in others). Italian sizes are usually labelled the same as German EU but run smaller in cut, particularly for fitted styles like Italian-cut blazers. Always check measurements against the brand's chart, not just the label."
      ),
      createFAQ(
        "What is EU size 36 in UK?",
        "EU 36 is UK 8. This is one of the most common sizes for fashion-forward women's clothing in European brands, comparable to a US 4 in dress sizes. Bust around 84-86 cm, waist 64-66 cm, hip 88-90 cm. If you are between EU 34 and EU 36, size up for structured cuts and size down for stretchy or oversized styles."
      ),
      createFAQ(
        "Why do EU sizes use even numbers?",
        "EU sizing increments by 2 (34, 36, 38, 40 etc.) because each increment represents a 4 cm increase in bust circumference. This gives you a workable size every 4 cm of measurement. UK sizing uses 2-number increments (6, 8, 10, 12) for the same reason, but the underlying centimetre values are different. The 'half size' (EU 35, EU 37) is rare in standard women's clothing but appears in shoes and sometimes in luxury brands that offer in-between fits."
      ),
      createFAQ(
        "Do plus-size brands use the same EU conversion?",
        "Generally yes for the standard plus range (UK 18 to UK 26 = EU 46 to EU 54), but brand-specific sizing becomes more important above UK 22. Many plus-size brands publish their own house-size charts that may not perfectly match the standard EN 13402 measurements. The conversion is a starting point; check the brand's chart for hip and bust measurements in inches or cm before ordering."
      ),
    ],
    relatedTools: [
      { slug: "uk-to-us-dress-size", label: "UK to US Dress Size" },
      { slug: "uk-to-eu-shoe-size", label: "UK to EU Shoe Size" },
      { slug: "clothing-size-converter", label: "Clothing Size Converter" },
    ],
  },

  "uk-to-us-shoe-size-womens": {
    sections: [
      createAnswerFirstSection(
        "The +2 Rule for UK-to-US Women's Shoes",
        "US women's shoe sizes are 2 larger than UK women's sizes. UK 3 = US 5, UK 4 = US 6, UK 5 = US 7, UK 6 = US 8, UK 7 = US 9, UK 8 = US 10. The rule applies in half-size increments too: UK 5.5 = US 7.5, UK 6.5 = US 8.5. This is one of the cleanest size conversions in clothing because both systems use the same length-based 'last' (the foot mould the shoe is built around) and just label them differently.",
        "Mens-to-mens UK-to-US is +0.5 (UK 8 = US 8.5), which is much closer; women's-to-women's needing the larger +2 jump comes from the historical accident of how each country numbered its first standard women's-shoe size in the early 20th century. Both systems mean the same physical foot length; the labels are just translated. The calculator handles the half-sizes automatically and gives the EU equivalent if you also need that for European brands."
      ),
      createAnswerFirstSection(
        "EU Shoe Sizes Are Yet Another Scheme",
        "EU shoe sizing uses the Paris Point system: each size is 2/3 of a centimetre. UK 6 women's = US 8 = EU 39 = 25 cm foot length. EU sizing does not use half-sizes for women's shoes (it goes 39, 40, 41); some Italian brands offer half-sizes (39.5) but these are uncommon. When buying European brands online, the EU number is usually the most reliable to use because it is more directly tied to actual foot length than the UK or US numbers.",
        "The conversion table in the calculator includes all three (UK, US, EU) so you can cross-reference. If you are buying from a US brand that ships to the UK (Zappos, Nordstrom, certain Amazon listings), the US number is what they will use; if buying from European brands (Aldo, Mango, COS), the EU number is the cleanest reference. The [UK to EU shoe size](/uk-to-eu-shoe-size) converter handles that direction directly."
      ),
      createAnswerFirstSection(
        "Why Foot Length Alone Doesn't Tell You the Right Size",
        "Even with a clean conversion, two pairs of women's shoes labelled UK 6 from different brands can fit differently. The 'last' (mould) varies by brand: French and Italian brands often run narrow, American brands often run wide, British brands tend to sit in the middle. Width fittings (the letter after the size: B for narrow, D for medium, EE for wide) are widely available in the US and largely absent from UK retail. If you have particularly narrow or wide feet, US brands often offer a better fit because they openly support multiple width options on the same length.",
        "Trainers (sneakers in US English) are an exception. Nike, Adidas, New Balance and similar global brands use a 'unisex' length system where men's and women's sizes are 2 numbers apart (men's UK 6 = women's UK 8). This is independent of the country-specific sizing, which is why size charts on running-shoe sites can look confusing. Always check the brand's chart for the specific shoe; one size up or down from your usual is often the right call when starting with an unfamiliar brand."
      ),
      createAnswerFirstSection(
        "Buying Shoes Across the Atlantic",
        "Online ordering of US-labelled shoes from a UK address (or vice versa) is the most common reason this conversion gets searched. Three practical tips: order one size up if you usually have width issues (the standard US last is slightly wider than the UK last); check if the seller ships internationally with simple returns (Amazon and Zappos do; some smaller US brands do not); and budget for return-shipping costs even if the listing says 'free returns' (many free-returns offers are US-only).",
        "The size conversion is the easy part; logistics usually causes more problems than the size labelling. UK customers ordering US shoes pay UK VAT (20%) plus customs duty (typically 8 to 16% on footwear) on imports above £135. This adds significantly to the headline price; factor it in before deciding the US listing is cheaper than the UK equivalent. The opposite direction (US customers ordering UK shoes) avoids customs duty in many cases under the de minimis threshold but pays state sales tax on arrival."
      ),
      {
        heading: "UK to US Women's Shoe Size Conversion",
        table: {
          headers: ["UK", "US", "EU", "Foot Length (cm)", "Foot Length (inches)"],
          rows: [
            ["3", "5", "36", "22.5", "8.86"],
            ["3.5", "5.5", "36", "22.9", "9.02"],
            ["4", "6", "37", "23.5", "9.25"],
            ["4.5", "6.5", "37", "23.8", "9.37"],
            ["5", "7", "38", "24.1", "9.49"],
            ["5.5", "7.5", "38", "24.6", "9.69"],
            ["6", "8", "39", "25", "9.84"],
            ["6.5", "8.5", "39", "25.4", "10.0"],
            ["7", "9", "40", "25.7", "10.1"],
            ["7.5", "9.5", "40", "26.2", "10.3"],
            ["8", "10", "41", "26.7", "10.5"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is UK 6 the same as US 8 for women's shoes?",
        "Yes. UK 6 = US 8 in women's shoes. This is the most commonly searched conversion because UK 6 is the modal women's shoe size in Britain. The corresponding EU size is 39 and the foot length is roughly 25 cm or 9.84 inches. If you are buying from a US brand and your UK size is 6, order a US 8."
      ),
      createFAQ(
        "How is men's UK to US different from women's?",
        "Men's UK to US is +0.5 only. UK 8 men's = US 8.5 men's, UK 9 men's = US 9.5 men's. This is much smaller than the +2 for women's because the men's sizing systems aligned more closely historically. Note that some unisex shoes (especially Nike, Adidas trainers) use a single labelling system that requires you to look at the men's vs women's distinction explicitly on the shoe page."
      ),
      createFAQ(
        "Do US shoes run wider than UK shoes?",
        "Generally yes, by about a half-width. US sizing uses an explicit width letter (A through EEE) so you can pick a narrower or wider fit. UK sizing rarely shows width letters at retail; British shoe brands typically use a 'medium' width as default. If you have narrow feet, US brands offering 2A or 4A widths give you more options than the UK retail equivalent."
      ),
      createFAQ(
        "What is half-size in shoes?",
        "A half-size is one quarter inch (about 6 mm) of foot length. UK 6.5 sits exactly between UK 6 and UK 7. Half-sizes exist in UK and US sizing but typically not in EU sizing; if you take a UK 6.5 in trainers, the EU equivalent is usually labelled as a single 39 (not 39.5). For dress shoes, sizing up to the next whole size is generally fine if your size is between two; for athletic shoes, the half-size matters more because of how the shoe deforms during use."
      ),
      createFAQ(
        "Can I measure my foot at home to find my size?",
        "Yes. Stand on a piece of paper, mark the heel and the longest toe, then measure between marks in centimetres. UK 6 women = 25 cm, UK 7 women = 25.7 cm, etc. (each UK size is roughly 0.85 cm longer than the previous). If your measurement is between two sizes, size up; shoes never give you back length you do not have, but a slightly loose shoe can be fixed with insoles or a lace adjustment."
      ),
    ],
    relatedTools: [
      { slug: "uk-to-us-shoe-size-mens", label: "UK to US Shoe Size (Men's)" },
      { slug: "uk-to-eu-shoe-size", label: "UK to EU Shoe Size" },
      { slug: "clothing-size-converter", label: "Clothing Size Converter" },
    ],
  },

  "uk-to-us-shoe-size-mens": {
    sections: [
      createAnswerFirstSection(
        "Men's UK to US Shoe Sizes Are Just +1",
        "Men's US shoe sizes are 1 number larger than UK men's sizes. UK 8 men's = US 9, UK 9 = US 10, UK 10 = US 11, UK 11 = US 12. Half-sizes follow the same rule: UK 8.5 = US 9.5, UK 9.5 = US 10.5. This holds across the calculator's full range from UK 6 (US 7) up to UK 13 (US 14). It is one of the simplest international shoe-size conversions, much cleaner than the women's +2 jump or the EU's Paris Point system.",
        "The reason men's is +1 and women's is +2 is largely historical. When the modern US sizing system was finalised in the early 20th century, the starting reference foot for women's size 1 was set differently to the starting reference for men's size 1. Both countries' systems use the same physical 'last' (the foot mould inside the shoe), so a UK 9 and a US 10 are the same length of shoe; only the number on the label changes. The calculator covers UK 6 through 13, which is the full standard adult men's range."
      ),
      createAnswerFirstSection(
        "Where the Conversion Breaks Down",
        "Trainers (sneakers) ignore most of this. Nike, Adidas, New Balance, Asics and Reebok use a global system tied to centimetres, and their men's UK 9 listing is roughly the same shoe as the US 10 listing, but you'll often see UK and US labels both on the box. Always check the brand chart for the specific model. Running shoes in particular tend to fit half a size smaller than dress shoes from the same brand because of the closer foot-to-shoe contact when running.",
        "Width is the bigger conversion problem than length. UK men's shoes typically come in one width (medium, sometimes called 'F' or 'G' in British retailers like Clarks). US men's shoes are widely available in B (narrow), D (medium), 2E (wide) and 4E (extra wide) on the same length. If your UK size 9 medium feels tight at the toes, a US size 10 in 2E width may fit much better than a US size 10.5 medium. UK retail rarely sells width options outside specialist orthotic shops."
      ),
      createAnswerFirstSection(
        "Worked Example: UK Size 9 Across Three Systems",
        "A UK 9 men's shoe corresponds to a US 10 men's, an EU 43 and a foot length of roughly 27.5 cm or 10.83 inches. If you also need centimetres (Japanese sizing uses cm directly, so 27.5 cm appears on Japanese listings), you have all four numbers from this single starting point. UK 9.5 is US 10.5, EU 43.5, 27.9 cm. UK 8 is US 9, EU 42, 26.7 cm.",
        "Brands you might encounter: Clarks (UK retail), Cole Haan (US retail), Allen Edmunds (US dress shoes, narrow last), Crockett & Jones (UK dress shoes, wider last). Clarks and Crockett & Jones run true to UK size; Allen Edmunds historically runs half a size large; Cole Haan tends to run true to US size with a slightly wider toe box. The conversion table tells you which size to order; the brand-specific running advice tells you whether to size up or down within that system."
      ),
      {
        heading: "UK to US Men's Shoe Size Conversion",
        table: {
          headers: ["UK", "US", "EU", "Foot Length (cm)", "Foot Length (inches)"],
          rows: [
            ["6", "7", "39.5", "24.6", "9.69"],
            ["7", "8", "40.5", "25.4", "10.0"],
            ["8", "9", "42", "26.7", "10.51"],
            ["8.5", "9.5", "42.5", "27.1", "10.67"],
            ["9", "10", "43", "27.5", "10.83"],
            ["9.5", "10.5", "43.5", "27.9", "10.98"],
            ["10", "11", "44", "28.3", "11.14"],
            ["11", "12", "45", "29.2", "11.50"],
            ["12", "13", "46", "30", "11.81"],
            ["13", "14", "47", "30.8", "12.13"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is UK 9 the same as US 10 in men's shoes?",
        "Yes, UK 9 men's = US 10 men's. This is the most common search because UK 9 is the modal men's size in Britain. The matching EU size is 43 and the foot length is roughly 27.5 cm or 10.83 inches. If you're ordering from a US brand and your UK size is 9, look for a US 10."
      ),
      createFAQ(
        "Why are women's UK to US +2 but men's only +1?",
        "Historical accident. The two systems were standardised separately in the early 20th century with different starting points for size 1, and both have stuck. The actual physical shoes are the same length; only the printed number differs. The calculator does the conversion for you so you don't need to remember which gender uses which offset."
      ),
      createFAQ(
        "Do US men's shoes really run wider than UK men's?",
        "On the same length, yes, slightly. The standard US 'D' width is marginally roomier than the UK 'F' width that most British retailers default to. If you have a wide foot and have always struggled with British shoes, a US 'D' or '2E' often fits better than a UK shoe sized up. Width letters (A, B, D, E, EE, EEE) are printed on most US shoe boxes; UK shoes rarely show them."
      ),
      createFAQ(
        "What if my UK size is between two whole numbers?",
        "Most UK retailers stock half-sizes for men's footwear (UK 8.5, 9.5, etc.), and the US system mirrors them (US 9.5, 10.5). If a brand only offers whole sizes and you're a 9.5, size up to 10 rather than down to 9 - shoes can be tightened with insoles or lacing but cannot be made longer. EU sizing rarely uses half-sizes for men's, so a UK 9.5 typically maps to either EU 43 or 44 depending on the brand."
      ),
    ],
    relatedTools: [
      { slug: "uk-to-us-shoe-size-womens", label: "UK to US Shoe Size (Women's)" },
      { slug: "uk-to-eu-shoe-size", label: "UK to EU Shoe Size" },
      { slug: "us-to-eu-shoe-size", label: "US to EU Shoe Size" },
      { slug: "clothing-size-converter", label: "Clothing Size Converter" },
    ],
  },

  "uk-to-eu-shoe-size": {
    sections: [
      createAnswerFirstSection(
        "Why UK to EU Shoe Sizes Don't Have a Single +Number",
        "EU sizes use the Paris Point system: each size is exactly 2/3 of a centimetre longer than the previous. UK sizes use a system based on the 'iron' (one third of an inch). The two scales line up unevenly, so the offset between UK and EU sizes is roughly +33 to +34 but drifts a little across the range. UK 6 = EU 39, UK 7 = EU 40.5, UK 8 = EU 42, UK 9 = EU 43, UK 10 = EU 44. There is no clean integer rule; you need a lookup table, which the calculator provides.",
        "EU sizing is the closest of the three systems (UK, US, EU) to genuine foot length. EU 39 means a 26 cm shoe internal length, EU 40 a 26.67 cm shoe, EU 41 a 27.33 cm shoe. If you're between two EU sizes, look at your foot length in centimetres and pick whichever is closest. UK and US sizes hide this length information behind arbitrary numbering, which is why EU sizes are often the most reliable label when shopping for foreign brands."
      ),
      createAnswerFirstSection(
        "EU Sizes Treat Men's and Women's the Same",
        "Unlike UK and US sizing, the EU system uses one continuous scale for both men's and women's shoes. EU 38 is EU 38 whether on a man, woman or unisex shoe. The shoes themselves are still cut differently for men and women (women's lasts are usually narrower at the heel, with a higher arch), but the numbering doesn't switch. This avoids the confusion of 'is this a men's 8 or a women's 8' you get with UK and US labels.",
        "When converting, this means a UK 6 women's and a UK 6 men's both have EU equivalents (38.5 and 39.5 respectively in some tables, or both 39 in simplified ones). The calculator's table is the unisex version that most European retailers use. If you're buying from a brand that distinguishes men's vs women's, double-check by looking at the foot-length-in-cm column instead. Italian brands (Geox, Tods, Ferragamo) tend to be fastidious about cm; Spanish and Portuguese brands (Mango, Camper) tend to use round EU numbers and fit slightly large."
      ),
      createAnswerFirstSection(
        "Worked Example: A UK 7 in EU Sizing",
        "A UK 7 maps to EU 40.5 by the standard table (the calculator returns 40.5 for that input). Some retailers round to either 40 or 41, which can produce a half-size difference between identical UK 7 shoes from two European brands. The actual foot length is roughly 26 cm or 10.24 inches.",
        "If you're buying from a German brand like Birkenstock, sizes are whole numbers only (39, 40, 41). A UK 7 woman would buy a 40 from Birkenstock; a UK 7 man would also buy a 40 since the brand uses a single scale. If you're a UK 7.5 (not in the standard half-size system used by the calculator), you'd need to choose between EU 41 and EU 42 - generally size up, since the EU half-step is larger than a UK quarter-inch step."
      ),
      {
        heading: "UK to EU Shoe Size Conversion",
        table: {
          headers: ["UK", "EU", "US (Men's)", "US (Women's)", "Foot Length (cm)"],
          rows: [
            ["3", "36", "4", "5", "22"],
            ["4", "37", "5", "6", "23"],
            ["5", "38", "6", "7", "24"],
            ["6", "39", "7", "8", "25"],
            ["7", "40.5", "8", "9", "26"],
            ["8", "42", "9", "10", "26.7"],
            ["9", "43", "10", "11", "27.5"],
            ["10", "44", "11", "12", "28.3"],
            ["11", "45", "12", "13", "29.2"],
            ["12", "46", "13", "14", "30"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is UK 8 the same as EU 42?",
        "Yes for men's; for women's it's roughly EU 41. The calculator's standard table returns EU 42 for UK 8, which is the unisex/men's reference. The corresponding foot length is around 26.7 cm. If you're a woman buying European shoes, double-check whether the brand distinguishes by gender; many use the same scale, but Italian brands sometimes split."
      ),
      createFAQ(
        "Why does UK 6.5 give EU 39.5?",
        "Because the UK system uses half-sizes in 1/3-inch increments and the EU system uses 2/3-cm increments, the conversion is not a clean integer step. UK 6.5 lands at roughly EU 39.5. Most European retailers don't actually stock a 39.5; they'll either round to 39 or 40 depending on the brand. Italian brands are most likely to genuinely stock half-sizes; German and Scandinavian brands typically don't."
      ),
      createFAQ(
        "Should I trust the EU number or the foot length in cm?",
        "When buying online, foot length is the most reliable. Measure your foot in cm (heel to longest toe) and look for that number on the size chart. EU sizes claim to map directly to cm but brand variations can be 5-10mm in either direction. Most reputable brand size charts publish the cm value next to the EU number; use that to choose, especially if you're buying without being able to try on."
      ),
    ],
    relatedTools: [
      { slug: "uk-to-us-shoe-size-mens", label: "UK to US Shoe Size (Men's)" },
      { slug: "uk-to-us-shoe-size-womens", label: "UK to US Shoe Size (Women's)" },
      { slug: "us-to-eu-shoe-size", label: "US to EU Shoe Size" },
      { slug: "clothing-size-converter", label: "Clothing Size Converter" },
    ],
  },

  "uk-to-us-dress-size": {
    sections: [
      createAnswerFirstSection(
        "UK Dress Sizes Are Roughly 4 Larger Than US",
        "UK women's dress sizes run 4 numbers higher than US sizes. UK 6 = US 2, UK 8 = US 4, UK 10 = US 6, UK 12 = US 8, UK 14 = US 10, UK 16 = US 12, UK 18 = US 14, UK 20 = US 16. The calculator covers UK 6 through 20, the standard British high-street range. If you wear a UK 12 from Marks & Spencer, you would order a US 8 from a brand like J.Crew or Banana Republic.",
        "The 'minus 4' rule holds across the whole high-street range, but breaks down at extremes. Petite sizing in the US uses different numbers (the 'P' suffix denotes 5'4\" and under), and plus sizing above US 16/UK 20 is labelled in different ways depending on the brand (1X, 2X, 3X in some American brands). The calculator handles the standard range; outside it, always check the brand's own size guide because labels become inconsistent."
      ),
      createAnswerFirstSection(
        "Why Vanity Sizing Makes the Numbers Lie",
        "Both UK and US sizes have drifted larger over the last 30 years through 'vanity sizing': the practice of relabelling a slightly larger garment with a smaller number so the customer feels good. A UK 12 today has a 92 cm bust; a UK 12 from a 1980s pattern book had an 86 cm bust. US sizes have drifted even more aggressively because of the cultural premium on small-number labels. So a US 4 in 2026 is genuinely roughly the same as a UK 8 in 2026, but a 1990s US 4 was substantially smaller.",
        "This is why measurements (bust, waist, hip in cm or inches) are more useful than size labels when ordering across markets. Most reputable retailers (Nordstrom, Net-a-Porter, ASOS) publish a size chart with cm values alongside the size labels. Use those values, not the number, to pick. The [clothing size converter](/clothing-size-converter) handles a wider range of size systems including dress, tops, trousers and outerwear."
      ),
      createAnswerFirstSection(
        "EU and Italian Sizing Are Different Again",
        "EU dress sizes are roughly UK +28 (a UK 10 is an EU 38). Italian sizes (Diesel, Prada, etc.) are roughly UK +30 (UK 10 = IT 40). French sizes match EU. Spanish and Portuguese brands often use a mix. The calculator's UK-to-US conversion is the cleanest of these because the two countries' systems share a similar history; conversions to continental sizes need a separate lookup, which the [UK to EU dress size](/uk-to-eu-dress-size) converter handles.",
        "Worked example: A UK 12 dress is a US 8, an EU 40 and an IT 42 (some sources say IT 44; Italian sizing varies brand to brand more than any other system). Buy from a brand once, take note of which size in their range fits, and stick with that brand. The number on the label tells you less than how that specific brand cuts."
      ),
      {
        heading: "UK to US Dress Size Conversion",
        table: {
          headers: ["UK", "US", "EU", "Bust (cm)", "Waist (cm)"],
          rows: [
            ["6", "2", "34", "80", "60"],
            ["8", "4", "36", "84", "64"],
            ["10", "6", "38", "88", "68"],
            ["12", "8", "40", "92", "72"],
            ["14", "10", "42", "96", "76"],
            ["16", "12", "44", "100", "80"],
            ["18", "14", "46", "104", "84"],
            ["20", "16", "48", "108", "88"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is UK 10 the same as US 6 dress size?",
        "Yes. UK 10 = US 6 in standard women's dress sizing. The bust measurement at this size is roughly 88 cm (34.6 inches) and the waist is roughly 68 cm (26.8 inches). If you're a UK 10 buying from an American retailer like J.Crew or Old Navy, order a US 6."
      ),
      createFAQ(
        "Why does a US 4 sometimes fit when I'm a UK 10?",
        "Vanity sizing varies wildly between US brands. American Eagle and Old Navy run noticeably larger than the standard table; J.Crew and Theory run closer to true. If a US 4 fits, the brand has padded its sizing chart to flatter customers. Always cross-check the brand's actual chart in cm rather than relying on the label number."
      ),
      createFAQ(
        "What's the difference between US misses, juniors and petite?",
        "Misses (or just 'women's') is the standard US 0-16 range and matches the UK conversion. Juniors uses odd numbers (1, 3, 5, 7, 9) and is cut for a younger, less-developed body shape, so a juniors 9 fits a smaller bust than a misses 8. Petite ('P' suffix) is the same numbering as misses but cut shorter for women under 5'4\"; the proportions, not the sizes, change."
      ),
    ],
    relatedTools: [
      { slug: "uk-to-eu-dress-size", label: "UK to EU Dress Size" },
      { slug: "uk-to-us-shoe-size-womens", label: "UK to US Shoe Size (Women's)" },
      { slug: "uk-to-eu-shoe-size", label: "UK to EU Shoe Size" },
      { slug: "clothing-size-converter", label: "Clothing Size Converter" },
    ],
  },

  "a5-to-half-letter-dimensions": {
    sections: [
      createAnswerFirstSection(
        "A5 vs Half Letter: Both Compact, But Different Shapes",
        "A5 is 148 x 210 mm (5.83 x 8.27 in). Half Letter is 139.7 x 215.9 mm (5.5 x 8.5 in). A5 is 8.3 mm wider and 5.9 mm shorter than Half Letter. The two formats look similar at a glance and many people use them interchangeably for personal planners, notebooks and small printables, but they don't share dimensions and a printable designed for one will get cropped or leave whitespace if printed on the other.",
        "A5 follows the ISO 216 standard used everywhere outside the US and Canada: every A-size has the same 1:1.414 width-to-height ratio, so cutting an A4 in half gives you exactly two A5 sheets. Half Letter follows the ANSI standard used in North America: it's exactly half a US Letter sheet (216 x 280 mm folded in half lengthwise gives Half Letter at 139.7 x 215.9 mm). The aspect ratios are different (1.42 for A5, 1.55 for Half Letter), so A5 is squarer and Half Letter is more elongated."
      ),
      createAnswerFirstSection(
        "When You'll Hit This Conversion in Practice",
        "Three common scenarios. First: you've downloaded a printable planner template made in the US (Half Letter) and you're trying to print it on UK paper (A5 closer match) - it'll look slightly off because the proportions differ. Second: you sell digital planner inserts to an international audience and need both sizes to cover both markets (you'll need separate files; you can't just resize one to the other without distortion). Third: you're buying notebook refills internationally - Filofax 'Personal' size is closer to Half Letter, Filofax 'A5' is genuinely A5, and the two are not interchangeable.",
        "The cleanest workflow for designers: build your master in A5 if your audience is UK/EU/global, build it in Half Letter if it's North America-first, then create a 'fit-to-page' export for the other format. For paper-only use (just printing onto whichever paper you have), set the printer to 'fit to printable area' and accept a 4 mm white margin difference. For high-design work where bleed and registration matter (zines, art prints), build separate files; the proportional difference will warp critical layout otherwise."
      ),
      createAnswerFirstSection(
        "Other Paper Sizes Near This Range",
        "A5 sits between A6 (105 x 148 mm, postcard size) and A4 (210 x 297 mm, standard office). Half Letter sits between Quarter Letter (140 x 108 mm) and Letter (216 x 280 mm). Statement (5.5 x 8.5 in / 139.7 x 215.9 mm) is the same as Half Letter; the names are interchangeable in North America. 'Junior Legal' (5 x 8 in) is smaller than both. If you're buying a notebook and the spec sheet says 'B5' (176 x 250 mm), that's significantly bigger than A5; don't assume.",
        "For paper purchases: A5 paper is ubiquitous in the UK/EU at any office supply shop. Half Letter is harder to find as actual sheets in the UK; you usually buy Letter paper and cut it in half. North American shops do the opposite. If you're shipping printed product internationally, A5 will be familiar to UK/EU customers; Half Letter to US/Canada. The [A4 to Letter dimensions](/a4-to-letter-dimensions) and [A3 to Tabloid dimensions](/a3-to-tabloid-dimensions) tools cover the larger sizes."
      ),
    ],
    faqs: [
      createFAQ(
        "Are A5 and Half Letter close enough to use interchangeably?",
        "For personal use (a planner, a journal, sketch notes), yes. The 8.3 mm width and 5.9 mm height differences are small enough that most people don't notice. For design work with critical margins, bleeds or registration marks, no - the aspect ratios are different (1.42 vs 1.55), so a layout designed for one will visibly stretch or crop when forced into the other. If your printables include backgrounds that go to the edge of the page, design separately for each."
      ),
      createFAQ(
        "Can I print an A5 PDF onto Half Letter paper?",
        "Yes, with a fit-to-page setting on your printer. The result will have a 4-5 mm white margin on the longer sides because A5 is squarer than Half Letter. Most home printers default to fit-to-printable-area which scales down slightly to avoid clipping; this gives a slightly smaller print than full A5 size. For best results, set the PDF reader to 'actual size' and the printer to A5 paper if you have it."
      ),
      createFAQ(
        "Is Half Letter the same as Statement?",
        "Yes. Half Letter and Statement are two names for the same size: 5.5 x 8.5 inches (139.7 x 215.9 mm). Microsoft Word historically labelled it 'Statement' in the page setup dropdown. Stationery retailers in the US sometimes use 'Half Letter' on product packaging and 'Statement' on internal SKUs. They're identical."
      ),
      createFAQ(
        "What's the difference between A5 and Filofax Personal?",
        "Filofax 'Personal' size is 95 x 171 mm - much smaller than both A5 and Half Letter. Filofax 'A5' is genuinely 148 x 210 mm and accepts standard A5 inserts. If you're buying refills, check the Filofax size name carefully because a 'Personal' insert won't fit an 'A5' binder and vice versa. The naming convention is unique to Filofax and predates ISO standardisation."
      ),
    ],
    relatedTools: [
      { slug: "a4-to-letter-dimensions", label: "A4 to Letter Dimensions" },
      { slug: "a3-to-tabloid-dimensions", label: "A3 to Tabloid Dimensions" },
      { slug: "inches-to-mm", label: "Inches to Millimetres" },
      { slug: "mm-to-cm", label: "Millimetres to Centimetres" },
    ],
  },

  "us-to-eu-shoe-size": {
    sections: [
      createAnswerFirstSection(
        "The Quick US to EU Conversion Rule",
        "For men: US size + 33 ≈ EU size, roughly. So US 9 = EU 42, US 10 = EU 43, US 11 = EU 44, US 12 = EU 45. For women: US size + 31 ≈ EU size. US 7 = EU 38, US 8 = EU 39, US 9 = EU 40. The math isn't perfectly linear because the underlying scales count differently (US uses 1/3-inch increments per half-size; EU uses Paris Points at 6.67 mm per size).",
        "These numbers are approximations. Within 0.5 EU sizes is normal variation between brands. Italian brands often run small (size up by half from your US-to-EU conversion). German brands (Birkenstock, Adidas) tend to run true-to-EU. French luxury brands (Hermes, Louboutin) sometimes run big. When buying online from European retailers, check the brand-specific size chart rather than relying on the universal conversion."
      ),
      createAnswerFirstSection(
        "Common Conversions for American Shoppers",
        "Men's: US 7 = EU 40, US 7.5 = EU 40.5, US 8 = EU 41, US 8.5 = EU 41.5, US 9 = EU 42, US 9.5 = EU 42.5, US 10 = EU 43, US 10.5 = EU 43.5, US 11 = EU 44, US 11.5 = EU 44.5, US 12 = EU 45, US 13 = EU 46, US 14 = EU 47.",
        "Women's: US 5 = EU 35.5, US 5.5 = EU 36, US 6 = EU 36.5, US 6.5 = EU 37, US 7 = EU 37.5, US 7.5 = EU 38, US 8 = EU 38.5, US 8.5 = EU 39, US 9 = EU 39.5, US 9.5 = EU 40, US 10 = EU 40.5, US 10.5 = EU 41, US 11 = EU 41.5. Kids: harder to convert universally - measure foot length in centimetres for under-12 and consult the brand's chart."
      ),
      createAnswerFirstSection(
        "Why Brand Variation Matters More Than the Conversion",
        "Same US 10 in Nike, New Balance, and Adidas can fit noticeably differently. Nike running shoes often run small (size up half). New Balance offers width fittings (D, 2E, 4E) which can substitute for going up a size. Adidas European-design models (Sambas, Stan Smiths) genuinely fit EU-sized. Tech sneakers from US brands (Brooks, Saucony, ASICS US) tend to use US sizing primarily.",
        "Buying European luxury (Gucci, Prada, Saint Laurent): these brands size by EU. Always look up their specific size chart - some run a half-size small, some run true. For high-value purchases, check return policies before ordering. The [Inches to Millimetres](/inches-to-mm) tool helps if you need to measure foot length to compare against EU mm-based brand charts."
      ),
      createAnswerFirstSection(
        "Measure Your Foot for Best Results",
        "Place foot on paper, trace outline, measure heel to longest toe. Most adults: men 25-30 cm, women 22-26 cm. EU sizes are roughly: foot length × 1.5 ≈ EU size for men, similar for women but slightly offset. So 26 cm foot ≈ EU 41 men's. This direct measurement bypasses the US-EU conversion confusion entirely.",
        "Brands that publish foot-length charts (most modern brands online): use the cm measurement directly. Brand inconsistency goes away when you size by actual foot length. Useful for first-time buyers of any brand or for kids whose feet grow fast. Better measurement: do it at the end of the day when feet are slightly swollen, similar to how they'll be when wearing shoes."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the US to EU conversion the same for men and women?",
        "Different. Men's: US + 33 ≈ EU. Women's: US + 31 ≈ EU. Kids' shoes use different scales again, often more variable. Always check whether a chart is men's, women's, or unisex before applying the conversion."
      ),
      createFAQ(
        "Why do European shoes seem to fit differently?",
        "Different lasts (the foot-shaped form a shoe is built around). European lasts often have different toe-box widths and heel cup shapes than American lasts. Italian brands tend toward narrow elegant fits; German brands toward roomier orthopaedic-style. Same EU size, different brand, different fit."
      ),
      createFAQ(
        "What about UK shoe sizes?",
        "UK and US are similar but not identical. Men's US = UK + 1 (US 10 = UK 9). Women's US = UK + 2 (US 8 = UK 6). For UK-to-EU conversions specifically, see the [UK to EU Shoe Size](/uk-to-eu-shoe-size) tool. For US to UK, see [UK to US Shoe Size](/uk-to-us-shoe-size-mens)."
      ),
      createFAQ(
        "How do I handle half sizes?",
        "EU shoes commonly come in half sizes (40.5, 41.5, etc.) - more than US shoes traditionally do. If a brand offers half sizes, take the half nearer to your true size. Some brands skip half sizes above 45 (men's) or 41 (women's) - in that case round up rather than down."
      ),
    ],
    relatedTools: [
      { slug: "uk-to-eu-shoe-size", label: "UK to EU Shoe Size" },
      { slug: "uk-to-us-shoe-size-mens", label: "UK to US Shoe Size (Men's)" },
      { slug: "uk-to-us-dress-size", label: "UK to US Dress Size" },
      { slug: "clothing-size-converter", label: "Clothing Size Converter" },
    ],
  },

  "kg-to-lbs": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kilograms to Pounds",
        "1 kg = 2.20462 lbs. Multiply weight in kg by 2.20462 to get pounds. So 70 kg × 2.20462 = 154.32 lbs. The international avoirdupois pound has been defined as exactly 0.45359237 kg since 1959, so this conversion is identical in the UK, US and elsewhere.",
        "For quick mental conversions, multiply by 2.2: 50 kg ≈ 110 lbs, 80 kg ≈ 176 lbs. Accurate to within 0.2% for everyday weights, which is well within the precision you need for travel, fitness or cooking. Use the full 2.20462 only when accuracy under 0.1% matters."
      ),
      {
        heading: "Common Kilograms to Pounds Conversions",
        table: {
          headers: ["Kilograms", "Pounds"],
          rows: [
            ["1 kg", "2.20 lbs"],
            ["5 kg", "11.02 lbs"],
            ["10 kg", "22.05 lbs"],
            ["25 kg", "55.12 lbs"],
            ["50 kg", "110.23 lbs"],
            ["75 kg", "165.35 lbs"],
            ["80 kg", "176.37 lbs"],
            ["100 kg", "220.46 lbs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the exact conversion factor?",
        "1 kg = 2.20462262 lbs. The international agreement defines 1 pound as exactly 0.45359237 kg, so the reverse is exact too. For practical use, 2.205 is more than precise enough."
      ),
      createFAQ(
        "Are UK and US pounds the same weight?",
        "Yes for everyday weight (avoirdupois pound = 0.45359237 kg in both). Only differs in specialised contexts like troy pounds for precious metals (0.3732 kg). Standard 'pounds' is identical UK and US."
      ),
    ],
    relatedTools: [
      { slug: "lbs-to-kg", label: "Pounds to Kilograms" },
      { slug: "stone-to-kg", label: "Stone to Kilograms" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
    ],
  },

  "lbs-to-kg": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Pounds to Kilograms",
        "1 lb = 0.45359 kg. Divide pounds by 2.20462 (or multiply by 0.45359) to get kilograms. So 150 lbs ÷ 2.20462 = 68.04 kg. The pound has been defined as exactly 0.45359237 kg since the international agreement of 1959, identical in the UK, US and Canada.",
        "Quick mental method: divide pounds by 2.2. 150 lbs ÷ 2.2 ≈ 68 kg, 200 lbs ÷ 2.2 ≈ 91 kg. Accurate within 0.2%, fine for body weight, luggage allowances and shipping. Use the full 0.45359 only when sub-0.1% accuracy is needed."
      ),
      {
        heading: "Common Pounds to Kilograms Conversions",
        table: {
          headers: ["Pounds", "Kilograms"],
          rows: [
            ["1 lb", "0.45 kg"],
            ["10 lbs", "4.54 kg"],
            ["50 lbs", "22.68 kg"],
            ["100 lbs", "45.36 kg"],
            ["150 lbs", "68.04 kg"],
            ["180 lbs", "81.65 kg"],
            ["200 lbs", "90.72 kg"],
            ["250 lbs", "113.40 kg"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How accurate is dividing by 2.2?",
        "Within about 0.2% for most weights. 150 lbs gives 68.18 kg by dividing by 2.2 vs 68.04 kg exact. Close enough for body weight and luggage; not for precision lab work."
      ),
      createFAQ(
        "Do airline luggage limits use kg or lbs?",
        "Most non-US carriers use kg (23 kg standard checked), US carriers usually use lbs (50 lbs). The numbers are roughly equivalent. 50 lbs ≈ 22.68 kg, so a 50 lb US allowance is slightly under the typical 23 kg international standard."
      ),
    ],
    relatedTools: [
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "lbs-to-stone", label: "Pounds to Stone" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
    ],
  },

  "oz-to-grams": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Ounces to Grams",
        "1 oz = 28.3495 grams. Multiply ounces by 28.35 (close enough for cooking and most everyday use) to get grams. So 4 oz × 28.35 = 113 grams. The avoirdupois ounce is 1/16 of a pound, defined exactly as 28.349523125 grams since the 1959 international agreement.",
        "Most kitchen scales offer both units already. The conversion mainly comes up for American recipes in non-US kitchens, where weight ingredients (chocolate, butter, cheese) are listed in ounces and need conversion to grams for European-style scales. Use the lookup table for quick reference."
      ),
      {
        heading: "Common Ounces to Grams Conversions",
        table: {
          headers: ["Ounces", "Grams"],
          rows: [
            ["1 oz", "28 g"],
            ["2 oz", "57 g"],
            ["3 oz", "85 g"],
            ["4 oz", "113 g"],
            ["8 oz (1/2 lb)", "227 g"],
            ["12 oz", "340 g"],
            ["16 oz (1 lb)", "454 g"],
            ["32 oz (2 lb)", "907 g"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is 'oz' the same as 'fluid oz'?",
        "No - oz (avoirdupois ounce) is weight, fl oz (fluid ounce) is volume. 1 cup of water happens to weigh roughly 8 oz AND measure 8 fl oz, which causes confusion, but they're different units. For cooking, weight oz and fl oz only match for water and similar-density liquids."
      ),
      createFAQ(
        "Is 1 oz exactly 28 g?",
        "Close - 28.35 g is more precise. The exact value is 28.3495 g per ounce. Most cooking applications round to 28 g without issue. Precision baking should use 28.35 or the full conversion."
      ),
    ],
    relatedTools: [
      { slug: "grams-to-oz", label: "Grams to Ounces" },
      { slug: "lbs-to-kg", label: "Pounds to Kilograms" },
      { slug: "fl-oz-to-ml", label: "Fluid Ounces to Millilitres" },
    ],
  },

  "grams-to-oz": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Grams to Ounces",
        "1 gram = 0.03527 oz. Divide grams by 28.35 (or multiply by 0.0353) to get ounces. So 100 g ÷ 28.35 = 3.53 oz. Most accurate at higher weights - small gram values (under 5 g) round awkwardly because the conversion factor isn't a clean integer.",
        "The conversion is most useful for adapting European recipes to American kitchens where ingredient weights need to be in ounces. A 250 g block of European butter equals roughly 8.8 oz, so an American recipe specifying '8 oz butter' is effectively asking for the standard European 250 g block."
      ),
      {
        heading: "Common Grams to Ounces Conversions",
        table: {
          headers: ["Grams", "Ounces"],
          rows: [
            ["10 g", "0.35 oz"],
            ["25 g", "0.88 oz"],
            ["50 g", "1.76 oz"],
            ["100 g", "3.53 oz"],
            ["250 g", "8.82 oz"],
            ["500 g", "17.64 oz"],
            ["750 g", "26.46 oz"],
            ["1000 g (1 kg)", "35.27 oz"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many grams in an ounce?",
        "28.35 g per ounce. So 1 oz ≈ 28 g, 2 oz ≈ 57 g, 4 oz ≈ 113 g. Useful to memorise the 28 g approximation for quick mental conversions."
      ),
      createFAQ(
        "Can I convert dry weight to volume?",
        "Only with the ingredient density. 100 g of flour is not the same volume as 100 g of sugar. Use the [Recipe Unit Converter](/recipe-unit-converter) for ingredient-specific conversions, or weight is more reliable than volume conversions for baking precision."
      ),
    ],
    relatedTools: [
      { slug: "oz-to-grams", label: "Ounces to Grams" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
    ],
  },

  "stone-to-kg": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Stone to Kilograms",
        "1 stone = 6.35 kg. Multiply stone by 6.35 to get kilograms. So 12 stone × 6.35 = 76.2 kg. The stone has been defined as exactly 14 lbs since 1835, and 14 lbs = 6.35029318 kg under the modern international pound. Stone is still standard for body weight in the UK and Ireland but obsolete in most other countries.",
        "Stone-and-pounds (e.g. '12 stone 4 pounds') is a hybrid unit used commonly in the UK. To convert stone-and-pounds to kg: multiply stones by 6.35, multiply remaining pounds by 0.4536, add together. So 12 st 4 lb = (12 × 6.35) + (4 × 0.4536) = 76.2 + 1.81 = 78.01 kg."
      ),
      {
        heading: "Common Stone to Kilograms Conversions",
        table: {
          headers: ["Stone", "Kilograms"],
          rows: [
            ["8 st", "50.80 kg"],
            ["9 st", "57.15 kg"],
            ["10 st", "63.50 kg"],
            ["11 st", "69.85 kg"],
            ["12 st", "76.20 kg"],
            ["13 st", "82.55 kg"],
            ["14 st", "88.90 kg"],
            ["15 st", "95.25 kg"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does the UK use stone for body weight?",
        "Tradition more than logic. Stone was historically used across Europe for weighing produce; the UK retained it for body weight after metrification in the 1970s. Most UK gym equipment now shows kg too, but stone remains the conversational norm."
      ),
      createFAQ(
        "Do other countries use stone?",
        "Mostly just the UK and Ireland for body weight. Australia, Canada, the US and most of Europe use kg or lbs. American doctors universally use lbs; UK doctors often record both stone and kg."
      ),
    ],
    relatedTools: [
      { slug: "kg-to-stone", label: "Kilograms to Stone" },
      { slug: "stone-to-lbs", label: "Stone to Pounds" },
      { slug: "lbs-to-kg", label: "Pounds to Kilograms" },
    ],
  },

  "stone-to-lbs": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Stone to Pounds",
        "1 stone = 14 lbs exactly. Multiply stone by 14 to get pounds. So 11 stone × 14 = 154 lbs. Unlike most weight conversions which involve decimal factors, stone-to-pounds is a clean whole-number relationship - 1 stone is defined as 14 lbs by international agreement.",
        "For stone-and-pounds notation common in the UK (12 st 4 lb), the conversion to total pounds is straightforward: multiply stone by 14 and add the leftover pounds. 12 st 4 lb = (12 × 14) + 4 = 172 lbs. This direct conversion makes stone the simplest unit to translate to lbs."
      ),
      {
        heading: "Common Stone to Pounds Conversions",
        table: {
          headers: ["Stone", "Pounds"],
          rows: [
            ["8 st", "112 lbs"],
            ["9 st", "126 lbs"],
            ["10 st", "140 lbs"],
            ["11 st", "154 lbs"],
            ["12 st", "168 lbs"],
            ["13 st", "182 lbs"],
            ["14 st", "196 lbs"],
            ["15 st", "210 lbs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are 14 lbs always 1 stone?",
        "Yes, by definition. The stone has been defined as 14 avoirdupois pounds since 1835. This is consistent worldwide where stone is used. Other historical 'stones' (like the smaller 'stone' for some commodities) are obsolete."
      ),
      createFAQ(
        "Can a person be over 30 stone?",
        "Yes - 30 stone = 420 lbs = 190 kg. Severely obese individuals can weigh more, with weight loss surgery candidates often in the 25-40 stone range. Most adult weight scales used at home are calibrated up to about 25-30 stone (160-190 kg)."
      ),
    ],
    relatedTools: [
      { slug: "lbs-to-stone", label: "Pounds to Stone" },
      { slug: "stone-to-kg", label: "Stone to Kilograms" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
    ],
  },

  "lbs-to-stone": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Pounds to Stone",
        "1 lb = 1/14 stone. Divide pounds by 14 to get stone. So 154 lbs ÷ 14 = 11 stone. For values that don't divide evenly, the remainder gives you stone-and-pounds: 156 lbs ÷ 14 = 11 stone with 2 lbs left over, written as 11 st 2 lb. This is the standard UK format.",
        "The notation makes the conversion intuitive once you're used to it. Adults typically weigh 8-15 stone (112-210 lbs); body weight charts in the UK universally show stone-and-pounds because the granularity is comfortable for everyday use - one pound is a small, meaningful weight change, but a stone is a notable milestone."
      ),
      {
        heading: "Common Pounds to Stone Conversions",
        table: {
          headers: ["Pounds", "Stone (and lbs)"],
          rows: [
            ["100 lbs", "7 st 2 lb"],
            ["120 lbs", "8 st 8 lb"],
            ["140 lbs", "10 st 0 lb"],
            ["150 lbs", "10 st 10 lb"],
            ["160 lbs", "11 st 6 lb"],
            ["180 lbs", "12 st 12 lb"],
            ["200 lbs", "14 st 4 lb"],
            ["220 lbs", "15 st 10 lb"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is body weight given in stone in the UK?",
        "Cultural convention dating back to pre-metric weighing. UK people commonly think about body weight in stone-and-pounds despite metric being official since 1965. American body weight is exclusively in lbs; metric countries use kg."
      ),
      createFAQ(
        "Should I record body weight in stone or lbs?",
        "Either works for tracking. Stone-and-pounds is more readable for UK readers (12 st 4 lb is easier to remember than 172 lbs). Lbs is more conversation-friendly for American audiences. Pick whichever suits your context."
      ),
    ],
    relatedTools: [
      { slug: "stone-to-lbs", label: "Stone to Pounds" },
      { slug: "lbs-to-kg", label: "Pounds to Kilograms" },
      { slug: "stone-to-kg", label: "Stone to Kilograms" },
    ],
  },

  "lbs-to-oz": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Pounds to Ounces",
        "1 lb = 16 oz exactly. Multiply pounds by 16 to get ounces. So 3 lbs × 16 = 48 oz. This is a clean integer conversion because the avoirdupois pound is defined as exactly 16 ounces. No decimals or rounding involved.",
        "Useful for American recipes calling for ingredients in fractional pounds (e.g. '1.5 lbs ground beef' = 24 oz) or for converting bulk-pack weights to per-portion amounts. A 5 lb bag of flour is 80 oz - useful when meal-planning with per-recipe ounce requirements."
      ),
      {
        heading: "Common Pounds to Ounces Conversions",
        table: {
          headers: ["Pounds", "Ounces"],
          rows: [
            ["1/4 lb", "4 oz"],
            ["1/2 lb", "8 oz"],
            ["1 lb", "16 oz"],
            ["1.5 lbs", "24 oz"],
            ["2 lbs", "32 oz"],
            ["3 lbs", "48 oz"],
            ["5 lbs", "80 oz"],
            ["10 lbs", "160 oz"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is a pound 16 ounces?",
        "Tradition from medieval merchant weighing. The avoirdupois system (literally 'goods of weight' from Old French) was standardised by King Edward I in 1303 with 16 oz to a pound. The relationship has been continuous since."
      ),
      createFAQ(
        "Are recipe ounces always weight ounces?",
        "Usually yes for dry/solid ingredients. Liquids in American recipes use fluid ounces (fl oz) which is a volume measurement. 1 cup = 8 fl oz of any liquid (or 8 oz of water by happenstance because water has density 1 g/ml)."
      ),
    ],
    relatedTools: [
      { slug: "oz-to-lbs", label: "Ounces to Pounds" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
    ],
  },

  "oz-to-lbs": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Ounces to Pounds",
        "1 oz = 1/16 lb = 0.0625 lbs. Divide ounces by 16 to get pounds. So 48 oz ÷ 16 = 3 lbs. For values not divisible by 16, the remainder gives ounces left over: 50 oz ÷ 16 = 3 lbs 2 oz.",
        "The conversion comes up in American grocery shopping where bulk packages might be labelled in ounces (e.g. '32 oz tub' = 2 lbs of yoghurt). It's a clean integer conversion since 16 oz = 1 lb by definition."
      ),
      {
        heading: "Common Ounces to Pounds Conversions",
        table: {
          headers: ["Ounces", "Pounds"],
          rows: [
            ["8 oz", "0.5 lb"],
            ["12 oz", "0.75 lb"],
            ["16 oz", "1 lb"],
            ["24 oz", "1.5 lbs"],
            ["32 oz", "2 lbs"],
            ["48 oz", "3 lbs"],
            ["64 oz", "4 lbs"],
            ["80 oz", "5 lbs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many ounces in a quarter pound?",
        "1/4 lb = 4 oz. Common in burger sizing - a 'quarter-pounder' burger has 4 oz of beef before cooking. Half-pound burger = 8 oz. Third-pound = 5.33 oz."
      ),
      createFAQ(
        "Are 'oz' on packaging always weight?",
        "Almost always for solids. For liquids, 'fl oz' (fluid ounce) is volume, not weight. Some packaging shows both ('NET WT 16 oz / 1 lb' for solids; 'CONTENTS 16 fl oz / 473 ml' for liquids). The 'fl' before 'oz' is the giveaway for volume."
      ),
    ],
    relatedTools: [
      { slug: "lbs-to-oz", label: "Pounds to Ounces" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
    ],
  },

  "grams-to-kg": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Grams to Kilograms",
        "1000 grams = 1 kilogram. Divide grams by 1000 (or move the decimal point three places left) to get kg. So 2,500 g = 2.5 kg. The cleanest possible conversion - just powers of ten, no decimal factors to remember.",
        "This conversion is more about unit preference than calculation. Most recipes and shopping show one or the other based on quantity: under 1 kg usually shown in grams (250 g flour, 500 g mince), over 1 kg usually in kg (2 kg potatoes, 5 kg dog food). Both are SI-compliant and equivalent."
      ),
      {
        heading: "Common Grams to Kilograms Conversions",
        table: {
          headers: ["Grams", "Kilograms"],
          rows: [
            ["100 g", "0.1 kg"],
            ["250 g", "0.25 kg"],
            ["500 g", "0.5 kg"],
            ["750 g", "0.75 kg"],
            ["1000 g", "1 kg"],
            ["1500 g", "1.5 kg"],
            ["2500 g", "2.5 kg"],
            ["5000 g", "5 kg"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are some weights in grams and others in kg?",
        "Convenience. Sub-1000 weights are cleaner in grams (250 g vs 0.25 kg). Above 1000, kg is cleaner (2.5 kg vs 2,500 g). Both are correct; the choice is just readability for the typical use case."
      ),
      createFAQ(
        "Can I have decimal grams?",
        "Yes - lab measurements, jewellery (0.5 g of gold) and pharmaceutical doses use decimal grams or smaller units (milligrams, where 1 g = 1000 mg). Everyday cooking and shopping rarely needs sub-gram precision."
      ),
    ],
    relatedTools: [
      { slug: "kg-to-grams", label: "Kilograms to Grams" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
    ],
  },

  "kg-to-grams": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kilograms to Grams",
        "1 kilogram = 1000 grams. Multiply kilograms by 1000 (or move the decimal point three places right) to get grams. So 2.5 kg = 2,500 g. The simplest metric conversion, since 'kilo' literally means 1,000.",
        "Useful when scaling recipes, calculating per-100-gram nutrition values, or working with large bags of flour where the ingredient list is in grams. A 5 kg bag = 5,000 g, divided by typical 250 g recipe portions = 20 batches."
      ),
      {
        heading: "Common Kilograms to Grams Conversions",
        table: {
          headers: ["Kilograms", "Grams"],
          rows: [
            ["0.1 kg", "100 g"],
            ["0.25 kg", "250 g"],
            ["0.5 kg", "500 g"],
            ["1 kg", "1000 g"],
            ["1.5 kg", "1500 g"],
            ["2.5 kg", "2500 g"],
            ["5 kg", "5000 g"],
            ["10 kg", "10000 g"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the prefix system?",
        "SI prefixes: kilo = 1,000, mega = 1,000,000, giga = 1,000,000,000. Below 1: milli = 1/1,000, micro = 1/1,000,000. So 1 kg = 1,000 g = 1,000,000 mg = 1,000,000,000 µg. Each step is a factor of 1,000."
      ),
      createFAQ(
        "Why do scales show kg and grams?",
        "Most digital scales auto-switch units based on weight - sub-1 kg shows in grams (more precision), over 1 kg shows in kg (more readable). Toggle button forces specific unit. Same physical weight, different display."
      ),
    ],
    relatedTools: [
      { slug: "grams-to-kg", label: "Grams to Kilograms" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "grams-to-oz", label: "Grams to Ounces" },
    ],
  },

  "kg-to-ounces": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kilograms to Ounces",
        "1 kg = 35.274 oz. Multiply kg by 35.274 to get ounces. So 2 kg × 35.274 = 70.55 oz. This combines two conversions in one step (1 kg = 1000 g, 1 oz = 28.35 g), useful when going directly between metric weight and American avoirdupois ounces.",
        "Common when converting bulk metric purchases to recipe-friendly ounce measurements. A 1 kg bag of flour is 35.27 oz, so an American recipe needing '8 oz flour' uses 8/35.27 = 22.7% of the bag, or roughly 227 g."
      ),
      {
        heading: "Common Kilograms to Ounces Conversions",
        table: {
          headers: ["Kilograms", "Ounces"],
          rows: [
            ["0.25 kg", "8.82 oz"],
            ["0.5 kg", "17.64 oz"],
            ["1 kg", "35.27 oz"],
            ["1.5 kg", "52.91 oz"],
            ["2 kg", "70.55 oz"],
            ["3 kg", "105.82 oz"],
            ["5 kg", "176.37 oz"],
            ["10 kg", "352.74 oz"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does this have so many decimals?",
        "Because the conversion factor isn't a clean integer (1 kg = 35.274 oz). Smaller weights round more awkwardly. For practical use, going via grams (kg → grams → oz) is sometimes mentally easier."
      ),
      createFAQ(
        "Should I use kg-to-oz or kg-to-lbs?",
        "Lbs for body weight and shipping; oz mainly for cooking ingredients. American recipes default to ounces for ingredients under a pound, lbs for larger quantities. Going kg-to-lbs first then lbs-to-oz can be faster mentally if you're comfortable with both."
      ),
    ],
    relatedTools: [
      { slug: "ounces-to-kg", label: "Ounces to Kilograms" },
      { slug: "kg-to-lbs", label: "Kilograms to Pounds" },
      { slug: "grams-to-oz", label: "Grams to Ounces" },
    ],
  },

  "cm-to-inches": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Centimetres to Inches",
        "1 cm = 0.3937 inches. Divide centimetres by 2.54 (or multiply by 0.3937) to get inches. So 30 cm ÷ 2.54 = 11.81 in. The inch is defined as exactly 2.54 cm by international agreement (1959), so the conversion is precise.",
        "Quick mental method: divide by 2.5. 30 cm ÷ 2.5 = 12 in (exact value 11.81 - within 1.6%). 100 cm ÷ 2.5 = 40 in (exact 39.37). Useful for height comparisons - 180 cm = 70.87 in = 5'10\", a typical adult male height."
      ),
      {
        heading: "Common Centimetres to Inches Conversions",
        table: {
          headers: ["Centimetres", "Inches"],
          rows: [
            ["1 cm", "0.39 in"],
            ["10 cm", "3.94 in"],
            ["30 cm", "11.81 in"],
            ["50 cm", "19.69 in"],
            ["100 cm (1 m)", "39.37 in"],
            ["152 cm (5 ft)", "59.84 in"],
            ["180 cm", "70.87 in"],
            ["200 cm", "78.74 in"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is 2.54 cm exactly 1 inch?",
        "Yes, by international agreement since 1959. The international yard and pound agreement defines the inch as exactly 2.54 cm. So the conversion is mathematically exact, not approximate."
      ),
      createFAQ(
        "What is 5'10\" in centimetres?",
        "5 feet 10 inches = 70 inches = 177.8 cm. Common adult male height. 5'5\" (typical adult female) = 165.1 cm. 6 ft = 182.88 cm."
      ),
    ],
    relatedTools: [
      { slug: "inches-to-cm", label: "Inches to Centimetres" },
      { slug: "mm-to-inches", label: "Millimetres to Inches" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },

  "inches-to-cm": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Inches to Centimetres",
        "1 inch = 2.54 cm exactly. Multiply inches by 2.54 to get centimetres. So 12 in × 2.54 = 30.48 cm. The exact factor of 2.54 has been the international definition since 1959, making this a precise conversion with no rounding error.",
        "Most common for converting American measurements to metric: TV sizes (55-inch TV = 139.7 cm diagonal), height (5'10\" = 178 cm), shoe lengths. American DIY measurements default to inches; converting to cm/mm helps when buying European materials."
      ),
      {
        heading: "Common Inches to Centimetres Conversions",
        table: {
          headers: ["Inches", "Centimetres"],
          rows: [
            ["1 in", "2.54 cm"],
            ["6 in", "15.24 cm"],
            ["12 in (1 ft)", "30.48 cm"],
            ["24 in", "60.96 cm"],
            ["36 in (1 yd)", "91.44 cm"],
            ["48 in", "121.92 cm"],
            ["60 in (5 ft)", "152.4 cm"],
            ["72 in (6 ft)", "182.88 cm"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How big is a 65-inch TV?",
        "65 inches measured diagonally = 165.1 cm. The actual width is roughly 56 in (142 cm) and height 32 in (81 cm) for a 16:9 widescreen. Always check the published dimensions before buying for fit."
      ),
      createFAQ(
        "What's the difference between 'inch' and 'in'?",
        "Same thing. 'in' is the abbreviation for 'inch'. Plural is 'inches' (or 'in' still in technical writing). The double-prime mark (\") is also used: 5'10\" means 5 feet 10 inches."
      ),
    ],
    relatedTools: [
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
      { slug: "inches-to-mm", label: "Inches to Millimetres" },
    ],
  },

  "feet-to-metres": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Feet to Metres",
        "1 foot = 0.3048 metres exactly. Multiply feet by 0.3048 to get metres. So 6 ft × 0.3048 = 1.83 m. The international foot has been defined as exactly 0.3048 m since the 1959 agreement, identical in the UK, US, Canada and elsewhere where feet are still used.",
        "Most useful for height conversions (6 ft = 1.83 m, 5 ft 8 in = 1.73 m), construction measurements, and aviation altitudes (10,000 ft = 3,048 m). Common adult heights: 5 ft = 1.52 m, 5'6\" = 1.68 m, 6 ft = 1.83 m, 6'4\" = 1.93 m."
      ),
      {
        heading: "Common Feet to Metres Conversions",
        table: {
          headers: ["Feet", "Metres"],
          rows: [
            ["1 ft", "0.30 m"],
            ["3 ft", "0.91 m"],
            ["5 ft", "1.52 m"],
            ["6 ft", "1.83 m"],
            ["10 ft", "3.05 m"],
            ["20 ft", "6.10 m"],
            ["50 ft", "15.24 m"],
            ["100 ft", "30.48 m"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How tall is 6 ft in metres?",
        "6 ft = 1.83 m (rounded to 2 decimal places, exact value 1.8288 m). 6'2\" = 1.88 m. Standard doorways are usually around 2.0 m to clear most adults plus headroom."
      ),
      createFAQ(
        "Why is the conversion exactly 0.3048?",
        "Defined by international agreement in 1959 to standardise the inch (and therefore the foot, yard, etc.) across English-speaking countries. Before 1959, the US and UK had slightly different feet - the difference was tiny but mattered for surveying."
      ),
    ],
    relatedTools: [
      { slug: "metres-to-feet", label: "Metres to Feet" },
      { slug: "feet-to-inches", label: "Feet to Inches" },
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
    ],
  },

  "metres-to-feet": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Metres to Feet",
        "1 metre = 3.2808 feet. Multiply metres by 3.2808 (or divide by 0.3048) to get feet. So 1.8 m × 3.2808 = 5.91 ft. For values where the answer should be a clean number of feet plus inches, multiply the decimal portion by 12 to get the leftover inches.",
        "Useful when reading European technical specs in metric and translating to American/UK feet for everyday context. A 1.83 m person is 6 ft, a 2.4 m ceiling is 7'10\". A 100 m sprint is 328 ft, equivalent to a city block in many North American cities."
      ),
      {
        heading: "Common Metres to Feet Conversions",
        table: {
          headers: ["Metres", "Feet"],
          rows: [
            ["1 m", "3.28 ft"],
            ["1.5 m", "4.92 ft"],
            ["1.8 m", "5.91 ft"],
            ["2 m", "6.56 ft"],
            ["2.5 m", "8.20 ft"],
            ["5 m", "16.40 ft"],
            ["10 m", "32.81 ft"],
            ["100 m", "328.08 ft"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How tall is 1.75 m in feet?",
        "1.75 m = 5.74 ft. To express as feet-inches: 5.74 ft is 5 ft + (0.74 × 12) = 5 ft 8.9 in, often written as 5'9\" rounded. A common adult woman's height."
      ),
      createFAQ(
        "Are 'metre' and 'meter' different?",
        "Same unit, different spellings. 'Metre' is British/Commonwealth English; 'meter' is American English. Both refer to the SI base unit of length. The same measurement either way."
      ),
    ],
    relatedTools: [
      { slug: "feet-to-metres", label: "Feet to Metres" },
      { slug: "metres-to-yards", label: "Metres to Yards" },
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
    ],
  },

  "mm-to-inches": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Millimetres to Inches",
        "1 mm = 0.03937 inches. Divide millimetres by 25.4 (or multiply by 0.03937) to get inches. So 100 mm ÷ 25.4 = 3.94 in. The exact factor: 1 inch = 25.4 mm by international agreement, so the inverse is 1/25.4 = 0.039370...",
        "Most common for engineering and DIY work where European materials use mm and American specifications use fractional inches. A 12 mm drill bit ≈ 15/32 in (0.469 vs 0.472 - very close). Construction drawings, screw sizes, and pipe diameters are the typical contexts."
      ),
      {
        heading: "Common Millimetres to Inches Conversions",
        table: {
          headers: ["Millimetres", "Inches"],
          rows: [
            ["1 mm", "0.04 in"],
            ["5 mm", "0.20 in"],
            ["10 mm", "0.39 in"],
            ["25 mm", "0.98 in"],
            ["50 mm", "1.97 in"],
            ["100 mm", "3.94 in"],
            ["200 mm", "7.87 in"],
            ["500 mm", "19.69 in"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does engineering use mm not cm?",
        "mm gives whole-number precision for typical part sizes (M6 bolt = 6 mm diameter). cm would mean decimal values for the same parts (0.6 cm). Whole numbers are easier to specify and avoid decimal-place errors in technical drawings."
      ),
      createFAQ(
        "What's a common screw size in inches?",
        "A 3 mm screw ≈ 1/8 in, 6 mm ≈ 1/4 in, 12 mm ≈ 1/2 in. Some fasteners are sold in either standard - look for 'metric' or 'imperial' on packaging. Don't mix the two in a single project; threads don't match between systems."
      ),
    ],
    relatedTools: [
      { slug: "inches-to-mm", label: "Inches to Millimetres" },
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
      { slug: "mm-to-cm", label: "Millimetres to Centimetres" },
    ],
  },

  "inches-to-mm": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Inches to Millimetres",
        "1 inch = 25.4 mm exactly. Multiply inches by 25.4 to get millimetres. So 4 in × 25.4 = 101.6 mm. The exact factor of 25.4 makes this a precise conversion - useful for engineering work where dimensional accuracy matters.",
        "Common DIY application: converting US lumber sizes to mm. A '2x4' US lumber actually measures 38 mm × 89 mm finished (the nominal '2x4' is rough-sawn dimension before planing). Similarly, screw sizes: 1/4 inch = 6.35 mm, 1/2 inch = 12.7 mm, 1 inch = 25.4 mm."
      ),
      {
        heading: "Common Inches to Millimetres Conversions",
        table: {
          headers: ["Inches", "Millimetres"],
          rows: [
            ["1/8 in", "3.18 mm"],
            ["1/4 in", "6.35 mm"],
            ["1/2 in", "12.7 mm"],
            ["3/4 in", "19.05 mm"],
            ["1 in", "25.4 mm"],
            ["2 in", "50.8 mm"],
            ["6 in", "152.4 mm"],
            ["12 in (1 ft)", "304.8 mm"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What are common fractional inch conversions?",
        "1/16 in = 1.59 mm, 1/8 in = 3.18 mm, 1/4 in = 6.35 mm, 1/2 in = 12.7 mm, 3/4 in = 19.05 mm, 1 in = 25.4 mm. These show up in lumber, fasteners, and pipe sizes."
      ),
      createFAQ(
        "Is 1 inch always 25.4 mm?",
        "Yes, by international agreement since 1959. Before that, the US and UK had slightly different inches (the difference was tiny - about 1/100,000th). The 1959 agreement standardised exact conversion factors for all imperial-to-metric units."
      ),
    ],
    relatedTools: [
      { slug: "mm-to-inches", label: "Millimetres to Inches" },
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },

  "mm-to-cm": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Millimetres to Centimetres",
        "10 mm = 1 cm. Divide millimetres by 10 (or move the decimal point one place left) to get centimetres. So 250 mm = 25 cm. The cleanest possible metric conversion - just powers of ten.",
        "Used when switching between fine-precision measurements (mm, common in engineering) and everyday measurements (cm, common in clothing and household). A 250 mm cake tin is a 25 cm tin - same thing, different scale of unit."
      ),
      {
        heading: "Common Millimetres to Centimetres Conversions",
        table: {
          headers: ["Millimetres", "Centimetres"],
          rows: [
            ["1 mm", "0.1 cm"],
            ["10 mm", "1 cm"],
            ["50 mm", "5 cm"],
            ["100 mm", "10 cm"],
            ["250 mm", "25 cm"],
            ["500 mm", "50 cm"],
            ["1000 mm (1 m)", "100 cm"],
            ["1500 mm", "150 cm"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why use mm vs cm?",
        "mm for precision and small dimensions (electronics, fastener sizes, paper thickness). cm for everyday objects (paper sizes, clothing measurements, height in metric countries). Both are SI; pick the unit where typical values are whole numbers."
      ),
      createFAQ(
        "Are mm and cm interchangeable?",
        "Mathematically yes (just a factor of 10). Conventionally, contexts pick one over the other for readability. A 'mm' precision measurement (3 mm) reads more naturally than '0.3 cm', though both are correct."
      ),
    ],
    relatedTools: [
      { slug: "cm-to-mm", label: "Centimetres to Millimetres" },
      { slug: "mm-to-inches", label: "Millimetres to Inches" },
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
    ],
  },

  "cm-to-mm": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Centimetres to Millimetres",
        "1 cm = 10 mm. Multiply centimetres by 10 (or move the decimal point one place right) to get millimetres. So 25 cm = 250 mm. The simplest possible conversion - just multiply by 10.",
        "Useful when scaling up from everyday metric measurements (cm, used for clothing, body dimensions) to engineering-precision metric (mm, used for fastener sizes, machined parts). A 30 cm ruler is 300 mm; a 12.5 cm cake tin is 125 mm."
      ),
      {
        heading: "Common Centimetres to Millimetres Conversions",
        table: {
          headers: ["Centimetres", "Millimetres"],
          rows: [
            ["0.5 cm", "5 mm"],
            ["1 cm", "10 mm"],
            ["2.5 cm", "25 mm"],
            ["5 cm", "50 mm"],
            ["10 cm", "100 mm"],
            ["25 cm", "250 mm"],
            ["50 cm", "500 mm"],
            ["100 cm (1 m)", "1000 mm"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are mm marks on a ruler the same as cm marks?",
        "No - mm marks are 10 times denser. A ruler marked in cm has 10 mm marks between each cm. The big numbered marks are usually cm; the smaller subdivisions are mm."
      ),
      createFAQ(
        "What's a common precision measurement in mm?",
        "Fastener thickness (M6 = 6 mm), wire gauge, paper thickness (80 gsm paper is about 0.1 mm), and pen tip width (medium pen ≈ 0.7 mm). mm is the unit of choice for sub-cm dimensions in technical work."
      ),
    ],
    relatedTools: [
      { slug: "mm-to-cm", label: "Millimetres to Centimetres" },
      { slug: "cm-to-inches", label: "Centimetres to Inches" },
      { slug: "mm-to-inches", label: "Millimetres to Inches" },
    ],
  },

  "metres-to-yards": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Metres to Yards",
        "1 metre = 1.0936 yards. Multiply metres by 1.0936 to get yards. So 100 m × 1.0936 = 109.36 yd. The yard has been defined as exactly 0.9144 metres since 1959, so 1 metre is 1/0.9144 = 1.0936... yards exactly.",
        "Useful when converting metric athletics distances to American yard-based contexts (American football, golf). A 100 m sprint is 109 yards. A 1500 m run (Olympic distance) is 1640 yd. American football fields are 100 yards = 91.44 metres long, so a soccer pitch (100-110 m) is roughly the same length plus end zones."
      ),
      {
        heading: "Common Metres to Yards Conversions",
        table: {
          headers: ["Metres", "Yards"],
          rows: [
            ["1 m", "1.09 yd"],
            ["10 m", "10.94 yd"],
            ["50 m", "54.68 yd"],
            ["91.44 m", "100 yd (US football field)"],
            ["100 m", "109.36 yd"],
            ["400 m", "437.45 yd"],
            ["1000 m (1 km)", "1093.61 yd"],
            ["1500 m", "1640.42 yd"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are 'yard' and 'metre' similar lengths?",
        "Yes - 1 m = 1.09 yd, so they're within 10% of each other. This makes mental conversion easy: round metres to yards by adding 10%, or vice versa. Useful for quick estimates."
      ),
      createFAQ(
        "Is yard still used officially?",
        "Yes in the US (highway distances, sports, fabric measurements). Less in the UK, where metric is now standard for most purposes but yard persists in everyday speech ('a yard or two'). Most other countries use exclusively metric."
      ),
    ],
    relatedTools: [
      { slug: "yards-to-metres", label: "Yards to Metres" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
      { slug: "km-to-miles", label: "Kilometres to Miles" },
    ],
  },

  "yards-to-metres": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Yards to Metres",
        "1 yard = 0.9144 metres exactly. Multiply yards by 0.9144 to get metres. So 100 yd × 0.9144 = 91.44 m. The exact factor of 0.9144 has been the international definition since 1959.",
        "Mainly used in American sports (football, baseball, golf) where yards are the primary unit. 100-yard football field = 91.44 m. Tiger Woods' typical drive of 300+ yards = 274+ m. A 1-yard touchdown attempt = 0.91 m. Fabric and textile measurements in the UK often use yards still (1 yard fabric = 0.9 m)."
      ),
      {
        heading: "Common Yards to Metres Conversions",
        table: {
          headers: ["Yards", "Metres"],
          rows: [
            ["1 yd", "0.91 m"],
            ["10 yd", "9.14 m"],
            ["25 yd", "22.86 m"],
            ["50 yd", "45.72 m"],
            ["100 yd (US football)", "91.44 m"],
            ["220 yd", "201.17 m"],
            ["440 yd", "402.34 m"],
            ["1000 yd", "914.4 m"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many metres in a US football field?",
        "100 yards (the playing field) = 91.44 m. Including end zones (10 yd each), total length is 120 yd = 109.73 m. Width is 53.33 yd = 48.77 m. About the same length as a soccer pitch (100-105 m FIFA standard)."
      ),
      createFAQ(
        "Is the UK yard the same as the US yard?",
        "Identical since 1959. Both define yard as exactly 0.9144 m. Before 1959, the US and UK had tiny differences (about 1 part in a million); the international yard agreement standardised them."
      ),
    ],
    relatedTools: [
      { slug: "metres-to-yards", label: "Metres to Yards" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
      { slug: "miles-to-km", label: "Miles to Kilometres" },
    ],
  },

  "feet-to-inches": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Feet to Inches",
        "1 foot = 12 inches exactly. Multiply feet by 12 to get inches. So 5 ft × 12 = 60 in. This is a clean integer relationship - 1 foot is defined as 12 inches by definition, no decimal conversion factor.",
        "Most common when expressing height in pure inches (5 ft 10 in = 70 in total) for medical records or measurement systems that prefer single units. American shoe sizes are based on inches; American doorways and ceilings are typically described in feet but technical specifications use inches."
      ),
      {
        heading: "Common Feet to Inches Conversions",
        table: {
          headers: ["Feet", "Inches"],
          rows: [
            ["1 ft", "12 in"],
            ["2 ft", "24 in"],
            ["3 ft", "36 in"],
            ["4 ft", "48 in"],
            ["5 ft", "60 in"],
            ["6 ft", "72 in"],
            ["8 ft", "96 in"],
            ["10 ft", "120 in"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why 12 inches in a foot?",
        "Historical convention from medieval English measurement. Twelve was a useful base for practical fractions (halves, thirds, quarters, sixths) before decimal calculations were common. The 12-inch foot has been standardised in the imperial system since the 14th century."
      ),
      createFAQ(
        "How tall is 5 ft 10 in in inches?",
        "70 inches (5 × 12 = 60, plus 10 = 70). Multiply feet by 12 and add the leftover inches. 5'5\" = 65 in, 6 ft = 72 in, 6'4\" = 76 in."
      ),
    ],
    relatedTools: [
      { slug: "inches-to-feet", label: "Inches to Feet" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
      { slug: "inches-to-cm", label: "Inches to Centimetres" },
    ],
  },

  "inches-to-feet": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Inches to Feet",
        "1 inch = 1/12 foot. Divide inches by 12 to get feet. So 60 in ÷ 12 = 5 ft. For values not divisible by 12, the remainder gives leftover inches: 70 in ÷ 12 = 5 ft 10 in. This is the standard way to express US heights and dimensions.",
        "Most useful when reading total-inch measurements (medical charts, technical drawings) and translating to the more common feet-and-inches format. A 76-inch person is 6'4\". A 96-inch ceiling height is 8 ft. A 24-inch monitor is 2 ft wide diagonally."
      ),
      {
        heading: "Common Inches to Feet Conversions",
        table: {
          headers: ["Inches", "Feet (and inches)"],
          rows: [
            ["12 in", "1 ft"],
            ["24 in", "2 ft"],
            ["48 in", "4 ft"],
            ["60 in", "5 ft"],
            ["66 in", "5 ft 6 in"],
            ["72 in", "6 ft"],
            ["78 in", "6 ft 6 in"],
            ["96 in", "8 ft"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How tall is 70 inches?",
        "70 in ÷ 12 = 5.83 ft = 5 ft 10 in. Average adult male height in the US. To convert decimal feet back to inches: take the decimal portion and multiply by 12 (0.83 × 12 ≈ 10 in)."
      ),
      createFAQ(
        "What's a typical doorway height?",
        "Standard US interior doorway is 80 inches (6'8\") tall. UK standard is similar. Commercial buildings often have taller doors (84-96 inches = 7-8 ft). Always measure your doorway before buying tall furniture or appliances."
      ),
    ],
    relatedTools: [
      { slug: "feet-to-inches", label: "Feet to Inches" },
      { slug: "inches-to-cm", label: "Inches to Centimetres" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
    ],
  },

  "miles-to-km": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Miles to Kilometres",
        "1 mile = 1.60934 km. Multiply miles by 1.60934 (or 1.6 for quick mental math) to get kilometres. So 60 miles × 1.6 = 96 km (exact value 96.56 km - within 0.5%). The international mile has been defined as exactly 1609.344 metres since 1959.",
        "Most common context: driving directions and speed limits when crossing borders. A 70 mph US/UK speed limit is 113 km/h. A 60 mile commute is 97 km. Marathon distance: 26.2 miles = 42.2 km. Useful for travel planning when route distances are quoted in the other country's unit."
      ),
      {
        heading: "Common Miles to Kilometres Conversions",
        table: {
          headers: ["Miles", "Kilometres"],
          rows: [
            ["1 mile", "1.61 km"],
            ["5 miles", "8.05 km"],
            ["10 miles", "16.09 km"],
            ["26.2 miles (marathon)", "42.20 km"],
            ["50 miles", "80.47 km"],
            ["60 miles", "96.56 km"],
            ["100 miles", "160.93 km"],
            ["500 miles", "804.67 km"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Quick mental conversion?",
        "Multiply miles by 1.6 (or add half + tenth: 60 + 30 + 6 = 96). For higher precision, multiply by 8 then divide by 5 (60 × 8 = 480, ÷5 = 96). Both within 0.5% of exact value."
      ),
      createFAQ(
        "How long is a marathon in km?",
        "26.2 miles = 42.2 km exactly (by historical convention). The official marathon distance was set at 26 miles 385 yards in 1908 (London) and adopted globally in 1921. In km, it rounds to 42.195 km, often shown as 42.2."
      ),
    ],
    relatedTools: [
      { slug: "km-to-miles", label: "Kilometres to Miles" },
      { slug: "mph-to-kph", label: "MPH to KPH" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
    ],
  },

  "km-to-miles": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kilometres to Miles",
        "1 km = 0.62137 miles. Divide kilometres by 1.60934 (or multiply by 0.62137) to get miles. So 100 km × 0.62 = 62 miles. Quick mental approximation: divide by 1.6 (or multiply by 0.625, which is 5/8). 80 km × 5/8 = 50 miles, accurate to within 0.5%.",
        "The conversion comes up most often when interpreting European driving distances or speed limits in American/UK terms. A 100 km/h Autobahn limit is 62 mph. A 200 km route is 124 miles. Olympic 5000 m run = 5 km = 3.1 miles. The 5/8 mental shortcut works well for road-trip planning."
      ),
      {
        heading: "Common Kilometres to Miles Conversions",
        table: {
          headers: ["Kilometres", "Miles"],
          rows: [
            ["1 km", "0.62 mi"],
            ["5 km", "3.11 mi"],
            ["10 km", "6.21 mi"],
            ["50 km", "31.07 mi"],
            ["100 km", "62.14 mi"],
            ["160 km", "99.42 mi"],
            ["200 km", "124.27 mi"],
            ["500 km", "310.69 mi"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is 1 km = 0.62 miles?",
        "Because 1 mile = 1.60934 km, the inverse is 1/1.60934 ≈ 0.62137. The relationship dates back to Roman 'mille passus' (thousand paces) standardised at 1,000 paces of about 1.6 m each, which became 1 mile = 1,609 m approximately."
      ),
      createFAQ(
        "What's 5K and 10K in miles?",
        "5K = 5 km = 3.11 miles. 10K = 10 km = 6.21 miles. Half marathon = 21.1 km = 13.1 miles. Marathon = 42.2 km = 26.2 miles. These are the standard race distances globally."
      ),
    ],
    relatedTools: [
      { slug: "miles-to-km", label: "Miles to Kilometres" },
      { slug: "kph-to-mph", label: "KPH to MPH" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
    ],
  },

  "metres-to-km": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Metres to Kilometres",
        "1000 metres = 1 kilometre. Divide metres by 1000 (or move the decimal three places left) to get km. So 5,000 m = 5 km. The simplest possible metric conversion.",
        "Used when scaling up running and cycling distances from metres (used for track athletics) to kilometres (used for road races and longer distances). 800 m and 1500 m are track events; 5 km, 10 km, half marathon, marathon are all road races."
      ),
      {
        heading: "Common Metres to Kilometres Conversions",
        table: {
          headers: ["Metres", "Kilometres"],
          rows: [
            ["100 m", "0.1 km"],
            ["400 m", "0.4 km"],
            ["1000 m", "1 km"],
            ["1500 m", "1.5 km"],
            ["5000 m", "5 km"],
            ["10000 m", "10 km"],
            ["21097 m", "21.1 km (half mar.)"],
            ["42195 m", "42.2 km (marathon)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's an Olympic 800 m in km?",
        "0.8 km. The Olympic distance for middle-distance running is 800 metres on the track. Converted to km it's 0.8 - rarely expressed that way because '800 m' is the established competition distance name."
      ),
      createFAQ(
        "How long is a 1500 m run?",
        "1.5 km, slightly under 1 mile (1.61 km). Olympic middle-distance event roughly equivalent to the imperial mile. The mile is sometimes still raced separately at meets, especially in the US."
      ),
    ],
    relatedTools: [
      { slug: "km-to-metres", label: "Kilometres to Metres" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
      { slug: "miles-to-km", label: "Miles to Kilometres" },
    ],
  },

  "km-to-metres": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kilometres to Metres",
        "1 kilometre = 1000 metres. Multiply km by 1000 (or move the decimal three places right). So 2.5 km = 2,500 m. The 'kilo' prefix means exactly 1,000 in all SI units, so this is a definition not a calculation.",
        "Useful when working with running and cycling pace calculations. A 5 km run = 5,000 m. Pace per 100 m × 50 = pace per 5 km. Useful for splitting longer training runs into measurable segments by metres on a track."
      ),
      {
        heading: "Common Kilometres to Metres Conversions",
        table: {
          headers: ["Kilometres", "Metres"],
          rows: [
            ["0.1 km", "100 m"],
            ["0.5 km", "500 m"],
            ["1 km", "1000 m"],
            ["2.5 km", "2500 m"],
            ["5 km", "5000 m"],
            ["10 km", "10000 m"],
            ["21.1 km", "21100 m"],
            ["42.2 km", "42200 m"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many laps of a track is 5 km?",
        "12.5 laps of a standard 400 m track. A 5 km road race usually equals 12.5 track laps in distance. Other common: 1500 m = 3.75 laps, 10 km = 25 laps."
      ),
      createFAQ(
        "What's the metre defined as today?",
        "Since 1983, the metre is defined as the distance light travels in a vacuum in 1/299,792,458 seconds. Earlier definitions used a platinum-iridium bar in Paris (1889-1960) and the Earth's circumference (1791-1889)."
      ),
    ],
    relatedTools: [
      { slug: "metres-to-km", label: "Metres to Kilometres" },
      { slug: "km-to-miles", label: "Kilometres to Miles" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },

  "celsius-to-fahrenheit": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Celsius to Fahrenheit",
        "Multiply Celsius by 9/5 (or 1.8) and add 32. Formula: °F = °C × 1.8 + 32. So 25 °C × 1.8 + 32 = 77 °F. The two scales meet at -40 (it's the same in both), and 0 °C (water freezing) corresponds to 32 °F.",
        "Most useful for following American recipes (oven temperatures), interpreting US weather forecasts, or describing UK temperatures to American audiences. Comfortable indoor temperature of 20 °C = 68 °F. Hot summer day at 30 °C = 86 °F. Bread baking 200 °C = 392 °F."
      ),
      {
        heading: "Common Celsius to Fahrenheit Conversions",
        table: {
          headers: ["Celsius", "Fahrenheit"],
          rows: [
            ["-10 °C", "14 °F"],
            ["0 °C (freezing)", "32 °F"],
            ["10 °C", "50 °F"],
            ["20 °C", "68 °F"],
            ["25 °C", "77 °F"],
            ["30 °C", "86 °F"],
            ["37 °C (body temp)", "98.6 °F"],
            ["100 °C (boiling)", "212 °F"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Quick mental method?",
        "Double the Celsius value, subtract 10%, add 32. So 20 °C: 20×2 = 40, -4 = 36, +32 = 68 °F. Accurate to within 1 °F for most temperatures. The exact formula is ×1.8+32; the '×2 minus 10%' shortcut approximates the 1.8 factor."
      ),
      createFAQ(
        "Why does the US use Fahrenheit?",
        "Historical inertia. Fahrenheit was the dominant English-speaking scientific scale from 1724 until the late 1800s. Most countries shifted to Celsius (formally adopted by the General Conference on Weights and Measures in 1948) but the US has not formally switched to metric/Celsius."
      ),
    ],
    relatedTools: [
      { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
      { slug: "celsius-to-kelvin", label: "Celsius to Kelvin" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
    ],
  },

  "fahrenheit-to-celsius": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Fahrenheit to Celsius",
        "Subtract 32 from Fahrenheit, then multiply by 5/9 (or 0.5556). Formula: °C = (°F - 32) × 5/9. So 86 °F: (86-32) × 5/9 = 54 × 5/9 = 30 °C. The 32 offset accounts for the different zero points (Fahrenheit's 32 °F = water freezing).",
        "Useful for converting American weather forecasts and recipes to Celsius. 70 °F (typical room temperature in US) = 21 °C. 100 °F (hot summer day) = 38 °C. 350 °F oven (American baking standard) = 177 °C, often expressed as 180 °C in metric recipes."
      ),
      {
        heading: "Common Fahrenheit to Celsius Conversions",
        table: {
          headers: ["Fahrenheit", "Celsius"],
          rows: [
            ["32 °F (freezing)", "0 °C"],
            ["50 °F", "10 °C"],
            ["68 °F (room temp)", "20 °C"],
            ["77 °F", "25 °C"],
            ["86 °F", "30 °C"],
            ["98.6 °F (body)", "37 °C"],
            ["100 °F", "37.8 °C"],
            ["350 °F (oven)", "177 °C"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Quick mental method?",
        "Subtract 32, divide by 2, add 10%. So 86 °F: 86-32=54, ÷2=27, +10%=29.7 °C (close to exact 30 °C). The '÷2 plus 10%' approximates the 5/9 multiplier. Within 1 °C for most everyday temperatures."
      ),
      createFAQ(
        "Why is body temperature 98.6 °F not a round number?",
        "Original 1851 measurement gave 37 °C (round in Celsius). Converting 37 °C to Fahrenheit gives 98.6 - the precision is from the metric original, not the Fahrenheit. Modern research suggests average body temperature is closer to 36.6 °C (97.9 °F), with significant variation between individuals."
      ),
    ],
    relatedTools: [
      { slug: "celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
      { slug: "kelvin-to-celsius", label: "Kelvin to Celsius" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
    ],
  },

  "celsius-to-kelvin": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Celsius to Kelvin",
        "Add 273.15 to Celsius. Formula: K = °C + 273.15. So 25 °C = 298.15 K. Kelvin uses absolute zero (-273.15 °C, the theoretical lowest possible temperature) as 0 K, but uses the same degree size as Celsius.",
        "Kelvin is the SI base unit for temperature, used in scientific contexts where absolute temperature matters (thermodynamics, gas law calculations, astronomy). Notice no '°' symbol - kelvin is just 'K'. Common reference points: 0 K (absolute zero, -273.15 °C), 273.15 K (water freezing, 0 °C), 373.15 K (water boiling, 100 °C)."
      ),
      {
        heading: "Common Celsius to Kelvin Conversions",
        table: {
          headers: ["Celsius", "Kelvin"],
          rows: [
            ["-273.15 °C (abs zero)", "0 K"],
            ["-100 °C", "173.15 K"],
            ["0 °C (freezing)", "273.15 K"],
            ["20 °C (room)", "293.15 K"],
            ["25 °C", "298.15 K"],
            ["100 °C (boiling)", "373.15 K"],
            ["1000 °C", "1273.15 K"],
            ["5500 °C (sun surface)", "5773.15 K"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is Kelvin the SI temperature unit?",
        "Because it's based on absolute zero, all values are positive numbers. This avoids negative-number issues in physics calculations. The kelvin scale was adopted as SI in 1954; the size of a kelvin is identical to a degree Celsius for ease of conversion."
      ),
      createFAQ(
        "Should it be °K or just K?",
        "Just K. The degree symbol was officially dropped in 1967. So write '298 K' not '298 °K'. Same convention applies to all kelvin temperatures."
      ),
    ],
    relatedTools: [
      { slug: "kelvin-to-celsius", label: "Kelvin to Celsius" },
      { slug: "celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
      { slug: "fahrenheit-to-kelvin", label: "Fahrenheit to Kelvin" },
    ],
  },

  "kelvin-to-celsius": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kelvin to Celsius",
        "Subtract 273.15 from kelvin. Formula: °C = K - 273.15. So 300 K - 273.15 = 26.85 °C. The kelvin and Celsius scales use the same degree size; they differ only by the offset (Celsius zero is water freezing, Kelvin zero is absolute zero).",
        "Used when interpreting scientific measurements (which often quote kelvin) for everyday context. A scientific paper might describe a process at 350 K - that's 76.85 °C, well above body temperature but below boiling. Astronomy and physics commonly use kelvin; everyday weather and cooking use Celsius."
      ),
      {
        heading: "Common Kelvin to Celsius Conversions",
        table: {
          headers: ["Kelvin", "Celsius"],
          rows: [
            ["0 K (abs zero)", "-273.15 °C"],
            ["100 K", "-173.15 °C"],
            ["200 K", "-73.15 °C"],
            ["273.15 K", "0 °C (freezing)"],
            ["293.15 K", "20 °C (room temp)"],
            ["310 K", "36.85 °C (body)"],
            ["373.15 K", "100 °C (boiling)"],
            ["1000 K", "726.85 °C"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why include the .15?",
        "The 0.15 in 273.15 K = 0 °C reflects the precise definition of the triple point of water (273.16 K) used to define both scales. For everyday use, 273 K is a fine approximation."
      ),
      createFAQ(
        "What's the temperature of space?",
        "Approximately 2.7 K (2.7 K above absolute zero) - the cosmic microwave background temperature. That's -270.45 °C. 'Space' isn't actually empty enough to have a single temperature, but the radiation flowing through it has this characteristic temperature."
      ),
    ],
    relatedTools: [
      { slug: "celsius-to-kelvin", label: "Celsius to Kelvin" },
      { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
      { slug: "kelvin-to-fahrenheit", label: "Kelvin to Fahrenheit" },
    ],
  },

  "cups-to-ml": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Cups to Millilitres",
        "1 US cup = 240 ml. Multiply cups by 240 to get ml. So 2 cups = 480 ml. UK and Australian cups are slightly larger (250 ml standard); the US cup at 240 ml is the most common in published recipes globally because of US recipe export.",
        "American recipes use cups for liquids and bulk dry ingredients. Converting to ml gives metric kitchens an exact volume. A US cup of milk is 240 ml. A UK cup of stock is 250 ml. The 4% difference rarely matters for savory cooking; precision baking should match the recipe's origin (US recipe = US cup = 240 ml)."
      ),
      {
        heading: "Common Cups to Millilitres Conversions",
        table: {
          headers: ["Cups (US)", "Millilitres"],
          rows: [
            ["1/4 cup", "60 ml"],
            ["1/3 cup", "80 ml"],
            ["1/2 cup", "120 ml"],
            ["2/3 cup", "160 ml"],
            ["3/4 cup", "180 ml"],
            ["1 cup", "240 ml"],
            ["1.5 cups", "360 ml"],
            ["2 cups", "480 ml"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is a UK cup the same as a US cup?",
        "Close but not identical. US cup = 240 ml; UK metric cup = 250 ml; UK old (imperial) cup = 284 ml (rare now). The 4% difference between US and UK metric cup rarely matters for most recipes."
      ),
      createFAQ(
        "Can I use a measuring jug for cups?",
        "Yes if marked. Most measuring jugs show ml/L primarily, sometimes with cup markings. Converting cups to ml first lets you use any volume measuring device. For dry ingredients in cups, weight (grams) is more accurate than volume."
      ),
    ],
    relatedTools: [
      { slug: "ml-to-cups", label: "Millilitres to Cups" },
      { slug: "cups-to-grams", label: "Cups to Grams" },
      { slug: "cups-to-tbsp", label: "Cups to Tablespoons" },
    ],
  },

  "ml-to-cups": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Millilitres to Cups",
        "1 cup (US) = 240 ml. Divide millilitres by 240 to get cups. So 480 ml ÷ 240 = 2 cups. UK metric cups are 250 ml so divide by 250 if working with UK recipes specifically. Most published recipes globally use the 240 ml US cup standard.",
        "Useful when reading European recipes that specify volumes in ml/L and you're more comfortable with cups, or when scaling recipes proportionally. A 750 ml batch ÷ 240 = 3.13 cups, useful for figuring out cup-based equivalent."
      ),
      {
        heading: "Common Millilitres to Cups Conversions",
        table: {
          headers: ["Millilitres", "Cups (US)"],
          rows: [
            ["50 ml", "0.21 cup"],
            ["100 ml", "0.42 cup"],
            ["120 ml", "0.5 cup"],
            ["240 ml", "1 cup"],
            ["360 ml", "1.5 cups"],
            ["480 ml", "2 cups"],
            ["720 ml", "3 cups"],
            ["1000 ml (1 L)", "4.17 cups"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many cups in a litre?",
        "About 4.17 US cups per litre, or exactly 4 metric cups (250 ml each). Quick mental: 1 L ≈ 4 cups + a splash."
      ),
      createFAQ(
        "Why are cup sizes different by region?",
        "Tradition. US adopted 8 fl oz = 236.6 ml ≈ 240 ml standard. UK and Australia later defined the 'metric cup' as a clean 250 ml. The historical UK imperial cup was 284 ml. Always check which 'cup' a recipe means if precision matters."
      ),
    ],
    relatedTools: [
      { slug: "cups-to-ml", label: "Cups to Millilitres" },
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
      { slug: "litres-to-pints", label: "Litres to Pints" },
    ],
  },

  "cups-to-grams": {
    sections: [
      createAnswerFirstSection(
        "Cups to Grams Depends on the Ingredient",
        "Volume-to-weight conversion isn't a single number - it depends on what you're measuring. 1 cup of flour weighs about 125 g; 1 cup of sugar weighs 200 g; 1 cup of butter is 227 g; 1 cup of honey is 340 g. Same volume, very different weights because each ingredient has different density.",
        "For accurate baking, weight is far more reliable than volume. American recipes use cups by tradition; professional bakers and modern recipe writers globally are shifting to grams. When converting an American recipe, look up each ingredient's specific cup-to-gram conversion."
      ),
      {
        heading: "Common Ingredient Cup-to-Gram Conversions",
        table: {
          headers: ["Ingredient", "1 Cup =", "2 Cups ="],
          rows: [
            ["All-purpose flour", "125 g", "250 g"],
            ["Bread flour", "130 g", "260 g"],
            ["Granulated sugar", "200 g", "400 g"],
            ["Brown sugar (packed)", "215 g", "430 g"],
            ["Butter", "227 g", "454 g"],
            ["Honey/molasses", "340 g", "680 g"],
            ["Cocoa powder", "85 g", "170 g"],
            ["Rice (uncooked)", "200 g", "400 g"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is volume measurement unreliable?",
        "Packing density varies. A 'cup of flour' can weigh 110-150 g depending on whether it was scooped (denser) or sifted (lighter). Weight measurement gives consistent results. Recipe writers who trust weight will get consistent baking; volume measurement leads to high recipe failure rates."
      ),
      createFAQ(
        "What's the standard cup size?",
        "US cup = 240 ml. UK metric cup = 250 ml. The 4% difference rarely matters for cooking but can matter for baking. Use the cup-to-gram conversion that matches the recipe's origin (US recipes use US cups)."
      ),
    ],
    relatedTools: [
      { slug: "cups-to-ml", label: "Cups to Millilitres" },
      { slug: "recipe-unit-converter", label: "Recipe Unit Converter" },
      { slug: "kitchen-unit-converter", label: "Kitchen Unit Converter" },
    ],
  },

  "tbsp-to-ml": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Tablespoons to Millilitres",
        "1 US tablespoon = 15 ml (technically 14.79 ml, rounded). Multiply tablespoons by 15 to get ml. So 4 tbsp = 60 ml. UK and Canadian tablespoons are 15 ml standard; Australian tablespoons are 20 ml (notably larger).",
        "Most recipes assume 15 ml per tbsp. If following an Australian recipe, the 20 ml tbsp gives slightly more (33% more) per spoon - usually noted in the recipe header. For everyday use across countries, 15 ml is the safe default."
      ),
      {
        heading: "Common Tablespoons to Millilitres Conversions",
        table: {
          headers: ["Tablespoons", "Millilitres"],
          rows: [
            ["1 tbsp", "15 ml"],
            ["2 tbsp", "30 ml"],
            ["4 tbsp (1/4 cup)", "60 ml"],
            ["6 tbsp", "90 ml"],
            ["8 tbsp (1/2 cup)", "120 ml"],
            ["10 tbsp", "150 ml"],
            ["12 tbsp (3/4 cup)", "180 ml"],
            ["16 tbsp (1 cup)", "240 ml"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many tablespoons in a cup?",
        "16 US tablespoons = 1 US cup (240 ml). The math: 240 ÷ 15 = 16. UK/Canadian similar. Australian 20 ml tablespoons = 12 per metric cup (250 ml ÷ 20 = 12.5)."
      ),
      createFAQ(
        "Should I use measuring spoons or eyeball?",
        "Always use measuring spoons for baking and precise cooking. Eyeballing 'a tablespoon of soy sauce' is fine for everyday cooking. For bread, pastry, or recipes specifying exact ratios, measuring spoons are essential."
      ),
    ],
    relatedTools: [
      { slug: "tbsp-to-tsp", label: "Tablespoons to Teaspoons" },
      { slug: "cups-to-ml", label: "Cups to Millilitres" },
      { slug: "tsp-to-ml", label: "Teaspoons to Millilitres" },
    ],
  },

  "tsp-to-ml": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Teaspoons to Millilitres",
        "1 teaspoon = 5 ml (technically 4.93 ml in US, rounded to 5). Multiply teaspoons by 5 to get ml. So 3 tsp = 15 ml. UK, US, Canadian and Australian teaspoons are all 5 ml standard - unlike tablespoons, the teaspoon size is consistent globally.",
        "Most precise small-volume measurement in cooking. Used for spices, vanilla extract, baking powder, salt. Critical for baking where small differences matter (1 tsp baking soda vs 1.25 tsp can ruin a cake). Use measuring spoons, not table teaspoons - actual teaspoons vary widely in size."
      ),
      {
        heading: "Common Teaspoons to Millilitres Conversions",
        table: {
          headers: ["Teaspoons", "Millilitres"],
          rows: [
            ["1/4 tsp", "1.25 ml"],
            ["1/2 tsp", "2.5 ml"],
            ["1 tsp", "5 ml"],
            ["1.5 tsp", "7.5 ml"],
            ["2 tsp", "10 ml"],
            ["3 tsp (1 tbsp)", "15 ml"],
            ["6 tsp", "30 ml"],
            ["10 tsp", "50 ml"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many tsp in a tablespoon?",
        "3 teaspoons = 1 tablespoon (in US, UK, Canada). Australian: 4 teaspoons = 1 (Australian) tablespoon, since their tbsp is 20 ml. The 3:1 ratio is standard everywhere except Australia."
      ),
      createFAQ(
        "Are kitchen teaspoons accurate?",
        "Measuring teaspoons (the calibrated ones from a set) are accurate. Regular dining teaspoons vary widely - typically 4-8 ml depending on style. Always use measuring teaspoons for cooking, never table flatware."
      ),
    ],
    relatedTools: [
      { slug: "ml-to-tsp", label: "Millilitres to Teaspoons" },
      { slug: "tsp-to-tbsp", label: "Teaspoons to Tablespoons" },
      { slug: "tbsp-to-ml", label: "Tablespoons to Millilitres" },
    ],
  },

  "ml-to-tsp": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Millilitres to Teaspoons",
        "1 teaspoon = 5 ml. Divide millilitres by 5 to get teaspoons. So 30 ml ÷ 5 = 6 tsp. The teaspoon is one of the more consistent kitchen units globally - 5 ml across US, UK, Canada and Australia.",
        "Useful when reading metric cooking instructions (often given in ml for liquids) and translating to spoon measurements for kitchens equipped only with measuring spoons. 10 ml = 2 tsp = 2/3 tbsp. 25 ml = 5 tsp = 1.67 tbsp."
      ),
      {
        heading: "Common Millilitres to Teaspoons Conversions",
        table: {
          headers: ["Millilitres", "Teaspoons"],
          rows: [
            ["1 ml", "0.2 tsp"],
            ["2.5 ml", "0.5 tsp"],
            ["5 ml", "1 tsp"],
            ["10 ml", "2 tsp"],
            ["15 ml", "3 tsp (1 tbsp)"],
            ["25 ml", "5 tsp"],
            ["30 ml", "6 tsp (2 tbsp)"],
            ["50 ml", "10 tsp"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How precise is teaspoon measurement?",
        "Measuring teaspoons (the standardised set kind) are accurate to within 5%. The variation between different brands of measuring spoons is small. The bigger error is from using non-measuring spoons (regular tea or table spoons), which can vary 30-50% from the standard 5 ml."
      ),
      createFAQ(
        "Can I use ml-marked syringes?",
        "Yes, if you have one (often used for medicine dosing). 5 ml syringe = 1 tsp. More precise than measuring spoons for very small quantities. Useful for liquid medicines or extracts where 1-2 ml accuracy matters."
      ),
    ],
    relatedTools: [
      { slug: "tsp-to-ml", label: "Teaspoons to Millilitres" },
      { slug: "ml-to-cups", label: "Millilitres to Cups" },
      { slug: "tbsp-to-ml", label: "Tablespoons to Millilitres" },
    ],
  },

  "cups-to-tbsp": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Cups to Tablespoons",
        "1 cup = 16 tablespoons (US/UK/Canada). Multiply cups by 16 to get tablespoons. So 1/2 cup = 8 tbsp; 1/4 cup = 4 tbsp. Australian cups (250 ml) at Australian tablespoons (20 ml) = 12.5 per cup, so for Australian recipes the math differs.",
        "Useful when scaling down a recipe that uses cups but you want spoon-level precision, or when measuring just a small amount of an ingredient that would be unwieldy with a full cup. 1/8 cup is awkward to measure as 1/8 cup but easy as 2 tbsp."
      ),
      {
        heading: "Common Cups to Tablespoons Conversions",
        table: {
          headers: ["Cups", "Tablespoons"],
          rows: [
            ["1/8 cup", "2 tbsp"],
            ["1/4 cup", "4 tbsp"],
            ["1/3 cup", "5.33 tbsp"],
            ["1/2 cup", "8 tbsp"],
            ["2/3 cup", "10.67 tbsp"],
            ["3/4 cup", "12 tbsp"],
            ["1 cup", "16 tbsp"],
            ["2 cups", "32 tbsp"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does 1/3 cup not divide evenly?",
        "Because 16 (tbsp per cup) doesn't divide cleanly by 3. 1/3 cup = 5.33 tbsp, rounded down to 5 tbsp + 1 tsp (since 0.33 tbsp = 1 tsp). 2/3 cup = 10 tbsp + 2 tsp."
      ),
      createFAQ(
        "Should I scale up or scale down?",
        "Scale down (cup to tbsp) when the cup amount is small (1/4 cup or less) - tbsp is easier to measure precisely. Scale up (tbsp to cup) when the recipe calls for many tbsp of the same ingredient - 8+ tbsp is faster as a half cup."
      ),
    ],
    relatedTools: [
      { slug: "tbsp-to-cups", label: "Tablespoons to Cups" },
      { slug: "cups-to-ml", label: "Cups to Millilitres" },
      { slug: "tbsp-to-tsp", label: "Tablespoons to Teaspoons" },
    ],
  },

  "tbsp-to-cups": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Tablespoons to Cups",
        "16 tablespoons = 1 cup (US/UK/Canada). Divide tablespoons by 16 to get cups. So 8 tbsp = 0.5 cup. Australian: 12 Australian tbsp = 1 Australian cup (since AU tbsp is 20 ml).",
        "Useful when a recipe lists many tablespoons of the same ingredient and you want to scale up to a single cup measurement. 12 tbsp of butter is much easier to measure as 3/4 cup than 12 individual spoonfuls."
      ),
      {
        heading: "Common Tablespoons to Cups Conversions",
        table: {
          headers: ["Tablespoons", "Cups"],
          rows: [
            ["2 tbsp", "1/8 cup"],
            ["4 tbsp", "1/4 cup"],
            ["6 tbsp", "3/8 cup"],
            ["8 tbsp", "1/2 cup"],
            ["10 tbsp", "5/8 cup"],
            ["12 tbsp", "3/4 cup"],
            ["14 tbsp", "7/8 cup"],
            ["16 tbsp", "1 cup"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the easiest fraction?",
        "Halves and quarters are simplest: 8 tbsp = 1/2 cup, 4 tbsp = 1/4 cup, 12 tbsp = 3/4 cup. These are clean to measure. Eighths (2 tbsp = 1/8 cup, 6 tbsp = 3/8 cup) work too but feel less natural."
      ),
      createFAQ(
        "When should I use cups vs tbsp?",
        "Cups for amounts above 6-8 tbsp (faster to measure). Tbsp for amounts under 4 (more precise for small quantities). The decision is mostly about ease of measurement and avoiding decimals."
      ),
    ],
    relatedTools: [
      { slug: "cups-to-tbsp", label: "Cups to Tablespoons" },
      { slug: "ml-to-cups", label: "Millilitres to Cups" },
      { slug: "tbsp-to-tsp", label: "Tablespoons to Teaspoons" },
    ],
  },

  "tbsp-to-tsp": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Tablespoons to Teaspoons",
        "1 tablespoon = 3 teaspoons (US/UK/Canada). Multiply tablespoons by 3 to get teaspoons. So 2 tbsp = 6 tsp. Australian: 1 Australian tbsp (20 ml) = 4 teaspoons. Outside Australia, the 3:1 ratio is universal.",
        "Useful when scaling down a recipe that uses tablespoons but you want spoon-level precision, or when out of measuring tablespoons but have teaspoons available. 1 tbsp baking powder = 3 tsp baking powder - same amount, just different spoon."
      ),
      {
        heading: "Common Tablespoons to Teaspoons Conversions",
        table: {
          headers: ["Tablespoons", "Teaspoons"],
          rows: [
            ["1/2 tbsp", "1.5 tsp"],
            ["1 tbsp", "3 tsp"],
            ["1.5 tbsp", "4.5 tsp"],
            ["2 tbsp", "6 tsp"],
            ["3 tbsp", "9 tsp"],
            ["4 tbsp (1/4 cup)", "12 tsp"],
            ["6 tbsp", "18 tsp"],
            ["8 tbsp (1/2 cup)", "24 tsp"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are tbsp 3 tsp?",
        "Historical convention from the metric/customary system standardisation. The relationship goes back to apothecary measurements where 60 grains = 1 dram, 8 drams = 1 ounce, etc. The 3:1 tbsp:tsp ratio fits the broader hierarchy."
      ),
      createFAQ(
        "Are tbsp and tsp interchangeable for small amounts?",
        "Mathematically yes (3 tsp = 1 tbsp). Physically using a tbsp scoop for 3 tsp of an ingredient is fine. The reverse (using a tsp scoop 3 times for 1 tbsp) works but takes longer and increases small measurement errors."
      ),
    ],
    relatedTools: [
      { slug: "tsp-to-tbsp", label: "Teaspoons to Tablespoons" },
      { slug: "tbsp-to-ml", label: "Tablespoons to Millilitres" },
      { slug: "tsp-to-ml", label: "Teaspoons to Millilitres" },
    ],
  },

  "tsp-to-tbsp": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Teaspoons to Tablespoons",
        "3 teaspoons = 1 tablespoon (US/UK/Canada). Divide teaspoons by 3 to get tablespoons. So 6 tsp ÷ 3 = 2 tbsp. Australian: 4 Australian teaspoons = 1 Australian tbsp.",
        "Useful when a recipe lists many teaspoons of the same ingredient (often for spices) and you want to scale up to fewer tablespoon measurements. Six teaspoons of dried herbs in a single recipe is awkward to measure individually; 2 tbsp is one quick scoop."
      ),
      {
        heading: "Common Teaspoons to Tablespoons Conversions",
        table: {
          headers: ["Teaspoons", "Tablespoons"],
          rows: [
            ["1 tsp", "0.33 tbsp"],
            ["1.5 tsp", "0.5 tbsp"],
            ["3 tsp", "1 tbsp"],
            ["6 tsp", "2 tbsp"],
            ["9 tsp", "3 tbsp"],
            ["12 tsp", "4 tbsp"],
            ["18 tsp", "6 tbsp"],
            ["24 tsp", "8 tbsp (1/2 cup)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "When does converting tsp to tbsp save time?",
        "Mostly when measuring 6+ tsp of the same ingredient. Below 6 tsp, just measuring with a tsp is faster than computing the conversion to tbsp."
      ),
      createFAQ(
        "Are 1.5 tsp and 1/2 tbsp the same?",
        "Yes. 1 tbsp = 3 tsp, so 0.5 tbsp = 1.5 tsp. Useful when a recipe specifies 1/2 tbsp - measure as 1 tsp + 1/2 tsp if you don't have a 1/2 tbsp scoop."
      ),
    ],
    relatedTools: [
      { slug: "tbsp-to-tsp", label: "Tablespoons to Teaspoons" },
      { slug: "tsp-to-ml", label: "Teaspoons to Millilitres" },
      { slug: "tbsp-to-cups", label: "Tablespoons to Cups" },
    ],
  },

  "fl-oz-to-ml": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Fluid Ounces to Millilitres",
        "1 US fluid ounce = 29.57 ml. Multiply fl oz by 29.57 to get ml. So 16 fl oz × 29.57 = 473 ml. UK fluid ounce = 28.41 ml (slightly smaller); old British imperial cooking still uses UK fl oz, but US measurements dominate global recipes.",
        "Common when converting American liquid measurements (drinks, broths, sauces) to metric. A 12 fl oz can of soda = 355 ml. A US pint (16 fl oz) = 473 ml. Cooking oils are often sold in fl oz US bottles - a 16 fl oz bottle is 473 ml."
      ),
      {
        heading: "Common Fluid Ounces to Millilitres Conversions",
        table: {
          headers: ["Fluid Ounces (US)", "Millilitres"],
          rows: [
            ["1 fl oz", "30 ml"],
            ["4 fl oz", "118 ml"],
            ["8 fl oz (1 cup)", "237 ml"],
            ["12 fl oz", "355 ml"],
            ["16 fl oz (1 pint)", "473 ml"],
            ["20 fl oz", "591 ml"],
            ["32 fl oz (1 quart)", "946 ml"],
            ["64 fl oz", "1893 ml"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are US and UK fl oz the same?",
        "Different. US fl oz = 29.57 ml, UK fl oz = 28.41 ml. The US value is slightly larger (about 4% bigger). For everyday recipe conversion, either is fine. Precision drink-mixing (cocktails, coffee) might care."
      ),
      createFAQ(
        "How big is a US pint?",
        "16 US fluid ounces = 473 ml. Notably smaller than the UK pint (568 ml). When ordering 'a pint' of beer, the UK gets 95 ml more than the US."
      ),
    ],
    relatedTools: [
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
      { slug: "cups-to-ml", label: "Cups to Millilitres" },
      { slug: "pints-to-litres", label: "Pints to Litres" },
    ],
  },

  "ml-to-fl-oz": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Millilitres to Fluid Ounces",
        "1 ml = 0.0338 US fluid ounces (or 0.0352 UK fl oz). Divide ml by 29.57 to get US fl oz. So 500 ml ÷ 29.57 = 16.91 US fl oz. Common context: converting European-bottled liquids (wine, oil, sauces) to American fluid ounce equivalents.",
        "A 750 ml bottle of wine = 25.4 fl oz, the standard US wine bottle size. A 100 ml shot = 3.38 fl oz. A 500 ml beer can = 16.9 fl oz, slightly more than a US pint. Useful for international shopping and recipe adaptation."
      ),
      {
        heading: "Common Millilitres to Fluid Ounces Conversions",
        table: {
          headers: ["Millilitres", "US Fluid Ounces"],
          rows: [
            ["10 ml", "0.34 fl oz"],
            ["50 ml", "1.69 fl oz"],
            ["100 ml", "3.38 fl oz"],
            ["250 ml", "8.45 fl oz"],
            ["500 ml", "16.91 fl oz"],
            ["750 ml", "25.36 fl oz"],
            ["1000 ml (1 L)", "33.81 fl oz"],
            ["1500 ml", "50.72 fl oz"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does my recipe say 'fluid ounce' but the package says 'oz'?",
        "Likely either liquid (fl oz) or weight (oz) - context tells you which. Liquids: 'fl oz'. Solids: 'oz'. American packaging sometimes drops 'fl' in informal labels but keeps it on official nutrition labels."
      ),
      createFAQ(
        "Can I substitute fl oz for cup measurements?",
        "8 fl oz = 1 US cup. So 4 fl oz = 1/2 cup, 16 fl oz = 2 cups. Direct equivalence for water and most liquid ingredients (since cups are essentially fl oz × 8 for liquids)."
      ),
    ],
    relatedTools: [
      { slug: "fl-oz-to-ml", label: "Fluid Ounces to Millilitres" },
      { slug: "ml-to-cups", label: "Millilitres to Cups" },
      { slug: "litres-to-pints", label: "Litres to Pints" },
    ],
  },

  "pints-to-litres": {
    sections: [
      createAnswerFirstSection(
        "Pints Are Different Sizes (UK vs US)",
        "UK pint = 568 ml = 0.568 litres. US pint = 473 ml = 0.473 litres. The UK pint is about 20% larger - a major difference for beer drinkers crossing the Atlantic. Both are 'pints' but the volume differs significantly. Multiply UK pints by 0.568 (or US pints by 0.473) to get litres.",
        "UK pubs serve UK pints (568 ml). US bars serve US pints (473 ml). The pint glass size is a national tradition; same word, very different drink. UK milk has historically been sold in pints; this is now mostly metric in supermarkets but the 'pint of milk' phrase persists."
      ),
      {
        heading: "Common Pints to Litres Conversions",
        table: {
          headers: ["Pints", "UK Litres", "US Litres"],
          rows: [
            ["1 pint", "0.568 L", "0.473 L"],
            ["2 pints", "1.136 L", "0.946 L"],
            ["4 pints", "2.273 L", "1.893 L"],
            ["6 pints", "3.409 L", "2.839 L"],
            ["8 pints", "4.546 L", "3.785 L"],
            ["10 pints", "5.682 L", "4.732 L"],
            ["12 pints", "6.819 L", "5.678 L"],
            ["20 pints", "11.36 L", "9.46 L"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are UK pints bigger?",
        "Historical accident. The UK retained the older Imperial pint (568 ml) when it standardised in 1824. The US, having gained independence in 1776, used an earlier (smaller) Queen Anne pint definition (473 ml). Both retained their respective pint sizes."
      ),
      createFAQ(
        "Is beer always served in pints?",
        "In UK pubs: standard pour is a UK pint (568 ml) or a half pint (284 ml). US bars: pints are 473 ml, but many serve 16 oz pints in deceptive 'pub' glasses that look bigger. Australia uses 'schooners' (425 ml) and 'middys' (285 ml) instead of pints in most states."
      ),
    ],
    relatedTools: [
      { slug: "litres-to-pints", label: "Litres to Pints" },
      { slug: "gallons-to-litres", label: "Gallons to Litres" },
      { slug: "fl-oz-to-ml", label: "Fluid Ounces to Millilitres" },
    ],
  },

  "litres-to-pints": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Litres to Pints",
        "1 litre = 1.76 UK pints OR 2.11 US pints. Divide litres by 0.568 (UK) or 0.473 (US) to get pints. So 2 L = 3.52 UK pints or 4.23 US pints. Always specify which system - the pint size differs significantly between UK and US.",
        "Common context: scaling up drink quantities for parties, converting European bottle sizes to pint equivalents. A 2 L Coca-Cola bottle = 3.52 UK pints (or 4.23 US). A 750 ml wine bottle = 1.32 UK pints (or 1.59 US). Standard UK milk bottles are sold in 1, 2, 4 or 6 pint sizes (568 ml × n)."
      ),
      {
        heading: "Common Litres to Pints Conversions",
        table: {
          headers: ["Litres", "UK Pints", "US Pints"],
          rows: [
            ["0.5 L", "0.88 pt", "1.06 pt"],
            ["1 L", "1.76 pt", "2.11 pt"],
            ["1.5 L", "2.64 pt", "3.17 pt"],
            ["2 L", "3.52 pt", "4.23 pt"],
            ["3 L", "5.28 pt", "6.34 pt"],
            ["5 L", "8.80 pt", "10.57 pt"],
            ["10 L", "17.60 pt", "21.13 pt"],
            ["20 L", "35.20 pt", "42.27 pt"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many pints in a 2-litre bottle?",
        "2 L = 3.52 UK pints (or 4.23 US pints). A typical 2 L Coca-Cola bottle is just over 3.5 UK pints or just over 4 US pints."
      ),
      createFAQ(
        "Why doesn't a litre equal a pint?",
        "Pints are an old non-metric volume measurement; litres are metric. They were independently defined - 1 L is 1000 ml; 1 UK pint is 568 ml. The conversion factor reflects that history."
      ),
    ],
    relatedTools: [
      { slug: "pints-to-litres", label: "Pints to Litres" },
      { slug: "litres-to-gallons", label: "Litres to Gallons" },
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
    ],
  },

  "gallons-to-litres": {
    sections: [
      createAnswerFirstSection(
        "Gallons Are Different Sizes (UK vs US)",
        "UK gallon = 4.546 litres. US gallon = 3.785 litres. The UK gallon is about 20% larger - significant when converting fuel prices or bulk liquid measurements. Multiply UK gallons by 4.546 (or US gallons by 3.785) to get litres.",
        "Most US fuel pricing uses US gallons. UK fuel pricing now uses litres exclusively (since 1995); the UK gallon survives mainly in older non-fuel contexts. American brewing recipes often specify 'a gallon of water' meaning US gallon (3.785 L). Always check origin."
      ),
      {
        heading: "Common Gallons to Litres Conversions",
        table: {
          headers: ["Gallons", "UK Litres", "US Litres"],
          rows: [
            ["1 gal", "4.546 L", "3.785 L"],
            ["2 gal", "9.092 L", "7.571 L"],
            ["3 gal", "13.638 L", "11.356 L"],
            ["5 gal", "22.730 L", "18.927 L"],
            ["10 gal", "45.461 L", "37.854 L"],
            ["15 gal", "68.191 L", "56.781 L"],
            ["20 gal", "90.922 L", "75.708 L"],
            ["50 gal", "227.305 L", "189.271 L"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are UK and US gallons different?",
        "Different historical bases. UK gallon comes from the wine gallon as defined by Queen Anne in 1707, equal to 8 pints of 568 ml. The US adopted a smaller version of the gallon definition (231 cubic inches), which became 3.785 L."
      ),
      createFAQ(
        "What does '1 gallon' mean in a recipe?",
        "Almost always US gallon (3.785 L) for American recipes, UK gallon (4.546 L) for British recipes. The 20% difference can ruin yields if the wrong assumption is made. American recipe sites and cookbooks default to US gallon."
      ),
    ],
    relatedTools: [
      { slug: "litres-to-gallons", label: "Litres to Gallons" },
      { slug: "pints-to-litres", label: "Pints to Litres" },
      { slug: "fl-oz-to-ml", label: "Fluid Ounces to Millilitres" },
    ],
  },

  "litres-to-gallons": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Litres to Gallons",
        "1 litre = 0.220 UK gallons OR 0.264 US gallons. Divide litres by 4.546 (UK) or 3.785 (US). So 50 L = 11 UK gallons or 13.2 US gallons. Specify which gallon you mean - the UK gallon is about 20% larger than the US.",
        "Useful when converting European fuel quantities or bulk liquids to gallon-based pricing for comparison. Petrol at £1.45/L in UK = roughly £6.59/UK gallon (2.5 imperial gallons of petrol per £10) or $5.49/US gallon for direct comparison with US pump prices."
      ),
      {
        heading: "Common Litres to Gallons Conversions",
        table: {
          headers: ["Litres", "UK Gallons", "US Gallons"],
          rows: [
            ["1 L", "0.22 gal", "0.26 gal"],
            ["10 L", "2.20 gal", "2.64 gal"],
            ["20 L", "4.40 gal", "5.28 gal"],
            ["50 L", "11.00 gal", "13.21 gal"],
            ["100 L", "22.00 gal", "26.42 gal"],
            ["200 L", "43.99 gal", "52.83 gal"],
            ["500 L", "109.99 gal", "132.09 gal"],
            ["1000 L", "219.97 gal", "264.17 gal"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many litres are in a US gallon of fuel?",
        "1 US gallon = 3.785 L. So $4 per US gallon = $1.06 per L. To compare with UK pump prices in £/L, also convert currency. US fuel is dramatically cheaper per L than UK fuel - largely due to lower fuel tax."
      ),
      createFAQ(
        "Are wine bottles in gallons?",
        "Standard wine bottle: 750 ml = 0.165 UK gallons or 0.198 US gallons. A case of 12 bottles = 9 L = 2 UK gallons (1.98 to be precise) or 2.4 US gallons. Pints rather than gallons are more common for retail wine."
      ),
    ],
    relatedTools: [
      { slug: "gallons-to-litres", label: "Gallons to Litres" },
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
      { slug: "litres-to-pints", label: "Litres to Pints" },
    ],
  },

  "mph-to-kph": {
    sections: [
      createAnswerFirstSection(
        "How to Convert MPH to KPH",
        "1 mph = 1.60934 km/h. Multiply mph by 1.60934 to get km/h. So 60 mph × 1.60934 = 96.56 km/h. Quick mental: multiply by 1.6, or by 8/5. 70 mph × 8/5 = 112 km/h, accurate to within 0.5%.",
        "Most useful for driving across borders. UK and US use mph for road speed limits. Most of the rest of the world (including all of Europe except UK) uses km/h. A 70 mph US/UK motorway speed = 113 km/h. A 30 mph residential = 48 km/h. Useful when adapting US road trip plans for European travel."
      ),
      {
        heading: "Common MPH to KPH Conversions",
        table: {
          headers: ["MPH", "KPH"],
          rows: [
            ["20 mph", "32.19 km/h"],
            ["30 mph", "48.28 km/h"],
            ["40 mph", "64.37 km/h"],
            ["50 mph", "80.47 km/h"],
            ["60 mph", "96.56 km/h"],
            ["70 mph", "112.65 km/h"],
            ["80 mph", "128.75 km/h"],
            ["100 mph", "160.93 km/h"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the German Autobahn speed?",
        "Most stretches have no posted limit but the recommended (advisory) speed is 130 km/h = 81 mph. Many drivers exceed this. UK motorway top legal speed is 70 mph = 113 km/h. The Autobahn experience is generally faster than UK motorways."
      ),
      createFAQ(
        "How do speed cameras handle the conversion?",
        "Speed cameras measure in the local unit (mph in UK/US, km/h elsewhere). The reading is the local unit; conversion is just for travelers' understanding. UK police will quote you 32 mph; converting that to 51 km/h for your insurance company doesn't change the offence."
      ),
    ],
    relatedTools: [
      { slug: "kph-to-mph", label: "KPH to MPH" },
      { slug: "miles-to-km", label: "Miles to Kilometres" },
      { slug: "knots-to-mph", label: "Knots to MPH" },
    ],
  },

  "kph-to-mph": {
    sections: [
      createAnswerFirstSection(
        "How to Convert KPH to MPH",
        "1 km/h = 0.621 mph. Divide km/h by 1.60934 (or multiply by 0.621) to get mph. So 100 km/h ÷ 1.60934 = 62.14 mph. Quick mental: multiply by 5/8 or by 0.625. 100 × 5/8 = 62.5 mph (within 0.6% of exact 62.14).",
        "Useful when interpreting European speed limits in UK/US terms. A 130 km/h French motorway limit = 81 mph (faster than UK/US 70 mph). A 50 km/h urban limit = 31 mph. A 30 km/h school zone = 19 mph. The 5/8 rule (multiply by 5/8) is fast enough to do mentally."
      ),
      {
        heading: "Common KPH to MPH Conversions",
        table: {
          headers: ["KPH", "MPH"],
          rows: [
            ["30 km/h", "18.64 mph"],
            ["50 km/h", "31.07 mph"],
            ["60 km/h", "37.28 mph"],
            ["80 km/h", "49.71 mph"],
            ["100 km/h", "62.14 mph"],
            ["110 km/h", "68.35 mph"],
            ["120 km/h", "74.56 mph"],
            ["130 km/h", "80.78 mph"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's a typical European motorway limit?",
        "Most EU countries: 130 km/h (81 mph), some allow 150 km/h on selected motorways. UK: 70 mph (113 km/h). Germany Autobahn: no limit on most stretches (advisory 130 km/h). Italy 130 km/h, France 130 km/h."
      ),
      createFAQ(
        "Should rental cars switch to mph in UK?",
        "Most rental cars in UK come with mph speedometers (UK uses mph). European mainland rentals typically have km/h (or both). Always check before driving - misreading mph as km/h leads to embarrassing fines."
      ),
    ],
    relatedTools: [
      { slug: "mph-to-kph", label: "MPH to KPH" },
      { slug: "km-to-miles", label: "Kilometres to Miles" },
      { slug: "knots-to-kph", label: "Knots to KPH" },
    ],
  },

  "oz-to-ml": {
    sections: [
      createAnswerFirstSection(
        "Volume Ounces to Millilitres",
        "1 US fl oz = 29.57 ml. Multiply by 30 for quick mental math (within 1.5%) or 29.57 for precision. So 8 fl oz = 237 ml. UK fluid ounce is 28.41 ml (slightly smaller). Note: this is fluid ounce (volume), not weight ounce (28.35 g) - they share the name and rough number but measure different things.",
        "Common context: converting American liquid recipes to metric. A 12 fl oz can of soda = 355 ml. A 32 fl oz US quart = 946 ml. A 64 fl oz half-gallon = 1.89 L. Cooking oils sold in US fl oz bottles convert directly when reading European recipes."
      ),
      {
        heading: "Common Fluid Ounces to Millilitres",
        table: {
          headers: ["Fluid Ounces", "Millilitres"],
          rows: [
            ["1 oz", "29.57 ml"],
            ["4 oz", "118.29 ml"],
            ["8 oz", "236.59 ml"],
            ["12 oz", "354.88 ml"],
            ["16 oz (1 pint)", "473.18 ml"],
            ["24 oz", "709.76 ml"],
            ["32 oz (1 quart)", "946.35 ml"],
            ["64 oz", "1892.71 ml"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is this fl oz or weight oz?",
        "fl oz (fluid, volume). For weight ounces (oz, used for solids), see [Ounces to Grams](/oz-to-grams). They happen to be roughly equal for water (1 fl oz of water weighs about 1 oz) but differ for everything else."
      ),
      createFAQ(
        "Quick mental math?",
        "Multiply by 30. 8 oz × 30 = 240 ml (true value 237 ml, within 1.5%). Good enough for kitchen use. Use 29.57 for precise pharmaceutical or scientific work."
      ),
    ],
    relatedTools: [
      { slug: "ml-to-oz", label: "Millilitres to Fluid Ounces" },
      { slug: "fl-oz-to-ml", label: "Fluid Ounces to Millilitres" },
      { slug: "cups-to-ml", label: "Cups to Millilitres" },
    ],
  },

  "ml-to-oz": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Millilitres to Fluid Ounces",
        "1 ml = 0.0338 US fluid ounces. Divide ml by 29.57 to get US fl oz, or by 28.41 for UK fl oz. So 500 ml ÷ 29.57 = 16.91 US fl oz. The conversion is most useful when reading European liquid measurements (wine, oil, sauce bottles) and translating to American fluid ounce equivalents.",
        "Common bottles and what they convert to: 750 ml wine = 25.36 fl oz, 500 ml beer = 16.91 fl oz, 330 ml can = 11.16 fl oz, 100 ml = 3.38 fl oz. UK milk in 1-litre cartons = 33.81 US fl oz. Useful for adapting recipes that specify metric ml to US fl oz traditional kitchen tools."
      ),
      {
        heading: "Common Millilitres to Fluid Ounces",
        table: {
          headers: ["Millilitres", "US Fluid Ounces"],
          rows: [
            ["50 ml", "1.69 fl oz"],
            ["100 ml", "3.38 fl oz"],
            ["250 ml", "8.45 fl oz"],
            ["330 ml", "11.16 fl oz"],
            ["500 ml", "16.91 fl oz"],
            ["750 ml", "25.36 fl oz"],
            ["1000 ml (1 L)", "33.81 fl oz"],
            ["1500 ml", "50.72 fl oz"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do labels show both ml and fl oz?",
        "International product packaging often shows both for global compatibility. A US-imported wine in UK shows '750 ml' and '25.4 fl oz' or similar. The fl oz value is for American consumers; ml for everyone else."
      ),
      createFAQ(
        "Can I convert via cups?",
        "Yes. 1 cup = 240 ml = 8 fl oz. So divide ml by 240 to get cups, then multiply by 8 to get fl oz. Or divide ml directly by 29.57 to get fl oz - one step, same answer."
      ),
    ],
    relatedTools: [
      { slug: "oz-to-ml", label: "Fluid Ounces to Millilitres" },
      { slug: "ml-to-fl-oz", label: "Millilitres to Fluid Ounces" },
      { slug: "ml-to-cups", label: "Millilitres to Cups" },
    ],
  },

  "miles-to-metres": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Miles to Metres",
        "1 mile = 1609.344 metres exactly. Multiply miles by 1609.344 to get metres. So 1 mile = 1,609 m, 5 miles = 8,047 m. The international mile has been defined as exactly 1,609.344 m since the 1959 international yard and pound agreement.",
        "Less common than miles-to-km (which gives a smaller, more readable number) but useful for athletics where event distances are sometimes specified in miles but tracks/measurements use metres. A mile race on a 400 m track is exactly 4 laps + 9.344 m. That extra 9.34 m is why the 1500 m race is preferred over the mile in metric athletics meets."
      ),
      {
        heading: "Common Miles to Metres",
        table: {
          headers: ["Miles", "Metres"],
          rows: [
            ["1 mile", "1609 m"],
            ["2 miles", "3219 m"],
            ["3 miles", "4828 m"],
            ["5 miles", "8047 m"],
            ["10 miles", "16093 m"],
            ["13.1 miles (half)", "21082 m"],
            ["26.2 miles (mar.)", "42164 m"],
            ["100 miles", "160934 m"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many metres in a 5-mile race?",
        "5 miles = 8,047 m, or 8.047 km. Common road race distance in the UK and US, slightly shorter than a 10K (which is 6.21 miles)."
      ),
      createFAQ(
        "Why use metres instead of km?",
        "Metres for short-distance precision (track athletics, race walks). Kilometres for long-distance readability (road races, driving distances). Both are SI; metres is the base unit, km is just metres × 1000."
      ),
    ],
    relatedTools: [
      { slug: "metres-to-miles", label: "Metres to Miles" },
      { slug: "miles-to-km", label: "Miles to Kilometres" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },

  "metres-to-miles": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Metres to Miles",
        "1 metre = 0.000621 miles. Divide metres by 1609.344 (or multiply by 0.000621) to get miles. So 5,000 m ÷ 1609 = 3.11 miles. The cleanest way to convert is via km first (m → km → miles): divide by 1000, then divide by 1.609.",
        "Used for converting athletic distances or scientific measurements expressed in metres into mile-based contexts. A 400 m track lap = 0.249 miles. A 10,000 m run = 6.21 miles. The Mariana Trench is 10,994 m deep = 6.83 miles."
      ),
      {
        heading: "Common Metres to Miles",
        table: {
          headers: ["Metres", "Miles"],
          rows: [
            ["100 m", "0.062 mi"],
            ["400 m", "0.249 mi"],
            ["1000 m", "0.621 mi"],
            ["1609 m", "1 mi"],
            ["5000 m", "3.107 mi"],
            ["10000 m", "6.214 mi"],
            ["21097 m (half)", "13.109 mi"],
            ["42195 m (mar.)", "26.219 mi"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many laps of a 400 m track is a mile?",
        "4 laps = 1600 m, just 9 m short of an actual mile. Some tracks have a 'mile mark' painted slightly past the 4-lap line. The IAAF's metric 1500 m race (3.75 laps) is preferred over the mile for major international meets."
      ),
      createFAQ(
        "Why isn't the metre used for road distance?",
        "Awkward numbers. A road sign saying '5,000 metres' is harder to read than '5 km' - same distance, cleaner display. Metres are used for short distances; km for longer."
      ),
    ],
    relatedTools: [
      { slug: "miles-to-metres", label: "Miles to Metres" },
      { slug: "km-to-miles", label: "Kilometres to Miles" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
    ],
  },

  "ounces-to-kg": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Ounces to Kilograms",
        "1 oz = 0.02835 kg. Divide ounces by 35.274 (or multiply by 0.02835) to get kilograms. So 100 oz ÷ 35.274 = 2.83 kg. This combines two conversions (oz → grams → kg) into one step. Cleanest for larger weights; small ounce values produce very small kg values better expressed in grams.",
        "Most useful when reading large American-weight specifications (shipping weights, agricultural produce) and translating to metric. A 16 oz package = 0.45 kg = 454 g. A 32 oz tub of yoghurt = 0.91 kg. A 50 oz bag of dog food = 1.42 kg."
      ),
      {
        heading: "Common Ounces to Kilograms",
        table: {
          headers: ["Ounces", "Kilograms"],
          rows: [
            ["8 oz", "0.23 kg"],
            ["16 oz (1 lb)", "0.45 kg"],
            ["32 oz (2 lb)", "0.91 kg"],
            ["48 oz", "1.36 kg"],
            ["64 oz (4 lb)", "1.81 kg"],
            ["100 oz", "2.83 kg"],
            ["160 oz (10 lb)", "4.54 kg"],
            ["320 oz (20 lb)", "9.07 kg"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I convert via lbs or directly?",
        "Either works. Direct: divide oz by 35.274. Via lbs: oz ÷ 16 = lbs, lbs × 0.4536 = kg. Same answer; via-lbs has cleaner intermediate numbers (whole lbs from whole oz multiples of 16)."
      ),
      createFAQ(
        "Why does this conversion have decimals?",
        "Because the oz-to-kg ratio (0.02835) isn't a clean number. The avoirdupois ounce wasn't designed to align with metric. Going via grams (1 oz = 28.35 g) is sometimes more intuitive."
      ),
    ],
    relatedTools: [
      { slug: "kg-to-ounces", label: "Kilograms to Ounces" },
      { slug: "lbs-to-kg", label: "Pounds to Kilograms" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
    ],
  },

  "sticks-butter-to-grams": {
    sections: [
      createAnswerFirstSection(
        "What's a Stick of Butter?",
        "A stick of butter (US) is 1/2 cup = 8 tbsp = 4 oz = 113 grams. American butter is sold in 1-lb (453 g) packages divided into 4 sticks of 113 g each, with tablespoon markings on the wrapper for easy partial-stick measurement. UK and Australian butter is sold in 250 g blocks without stick divisions.",
        "When a US recipe calls for '1 stick of butter,' substitute 113 g (or roughly 100-115 g for non-precision baking). 2 sticks = 226 g, close to a UK 250 g block (within 10%). 4 sticks = 453 g = 1 lb. The difference between 113 g (1 US stick) and 125 g (a UK quarter-block) is small enough that most baking recipes survive the swap."
      ),
      {
        heading: "Sticks of Butter to Grams",
        table: {
          headers: ["Sticks", "Grams", "Cups"],
          rows: [
            ["1/4 stick", "28 g", "1/16 cup"],
            ["1/2 stick", "57 g", "1/4 cup"],
            ["1 stick", "113 g", "1/2 cup"],
            ["1.5 sticks", "170 g", "3/4 cup"],
            ["2 sticks", "227 g", "1 cup"],
            ["3 sticks", "340 g", "1.5 cups"],
            ["4 sticks (1 lb)", "453 g", "2 cups"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why doesn't UK butter come in sticks?",
        "Different packaging tradition. UK butter is sold in 250 g blocks (sometimes 500 g). The US packaging convention dates to the 1880s; UK never adopted it. Both work; sticks are slightly more convenient for measuring partial amounts via tbsp markings."
      ),
      createFAQ(
        "How much salt is in salted vs unsalted?",
        "US salted butter: about 1.5-2% salt by weight (so a 113 g stick has 1.7-2.3 g salt). UK salted: similar 1.5-2%. Recipes calling for unsalted butter assume you'll add salt separately to control total seasoning."
      ),
    ],
    relatedTools: [
      { slug: "cups-to-grams", label: "Cups to Grams" },
      { slug: "tbsp-to-ml", label: "Tablespoons to Millilitres" },
      { slug: "oz-to-grams", label: "Ounces to Grams" },
    ],
  },

  "gas-mark-to-celsius": {
    sections: [
      createAnswerFirstSection(
        "How British Gas Marks Translate to °C",
        "Older UK ovens use Gas Marks instead of degrees: Gas Mark 1 = 140 °C, Mark 2 = 150 °C, Mark 3 = 170 °C, Mark 4 = 180 °C, Mark 5 = 190 °C, Mark 6 = 200 °C, Mark 7 = 220 °C, Mark 8 = 230 °C, Mark 9 = 240 °C. Each mark step is roughly 10-25 °C. Modern UK ovens show °C primarily; gas marks are now the secondary scale.",
        "Recipe conversion: a gas oven 'preheat to Mark 6' = 200 °C, equivalent to a 'moderate to hot' setting. Mark 4 = 180 °C is the most common baking temperature (cakes, biscuits). Mark 7 = 220 °C is for breads and quick-roast vegetables. Mark 1 = 140 °C is for slow-cooking, casseroles, low-and-slow roasts."
      ),
      {
        heading: "Gas Mark to Celsius (and Fahrenheit)",
        table: {
          headers: ["Gas Mark", "°C", "°F"],
          rows: [
            ["1/4", "110 °C", "225 °F"],
            ["1/2", "130 °C", "250 °F"],
            ["1", "140 °C", "275 °F"],
            ["2", "150 °C", "300 °F"],
            ["3", "170 °C", "325 °F"],
            ["4", "180 °C", "350 °F"],
            ["5", "190 °C", "375 °F"],
            ["6", "200 °C", "400 °F"],
            ["7", "220 °C", "425 °F"],
            ["8", "230 °C", "450 °F"],
            ["9", "240 °C", "475 °F"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do gas ovens use Marks not °C?",
        "Pre-electronic gas ovens couldn't easily display precise temperatures, so a numbered scale (1-9) was used. The Mark system was standardised by British Gas in the 1950s. Modern gas ovens show °C; Mark labels persist for older recipes and oven dials."
      ),
      createFAQ(
        "Should I reduce temperature for fan/convection ovens?",
        "Yes - reduce by 20 °C from the recipe's stated temperature. A recipe specifying 200 °C should be set to 180 °C in a fan oven. Same temperature transfer to food, less browning. The Mark equivalent is roughly one mark down (Mark 6 → Mark 5)."
      ),
    ],
    relatedTools: [
      { slug: "celsius-to-fahrenheit", label: "Celsius to Fahrenheit" },
      { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
      { slug: "oven-temperature-converter", label: "Oven Temperature Converter" },
    ],
  },

  "fahrenheit-to-kelvin": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Fahrenheit to Kelvin",
        "Two-step conversion. First convert F to C: °C = (°F - 32) × 5/9. Then add 273.15 for K. Combined formula: K = (°F + 459.67) × 5/9. So 70 °F: (70 + 459.67) × 5/9 = 294.26 K.",
        "Used in scientific contexts where Fahrenheit-measured data needs conversion to absolute temperature for calculations. Astronomy and physics commonly require kelvin. Standard room temperature 70 °F = 294 K. Body temperature 98.6 °F = 310 K. Boiling water 212 °F = 373 K."
      ),
      {
        heading: "Common Fahrenheit to Kelvin",
        table: {
          headers: ["Fahrenheit", "Kelvin"],
          rows: [
            ["-460 °F (~abs zero)", "0 K"],
            ["0 °F", "255.37 K"],
            ["32 °F (freezing)", "273.15 K"],
            ["70 °F (room)", "294.26 K"],
            ["98.6 °F (body)", "310.15 K"],
            ["100 °F", "310.93 K"],
            ["212 °F (boiling)", "373.15 K"],
            ["1000 °F", "810.93 K"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why convert F to K directly?",
        "Saves a step in scientific work. Most measurements done in Fahrenheit (US lab equipment) sometimes need direct K conversion for thermodynamic calculations. The combined formula K = (°F + 459.67) × 5/9 is faster than going via Celsius."
      ),
      createFAQ(
        "What's absolute zero in Fahrenheit?",
        "-459.67 °F. Below this, no thermal motion. Theoretical lower bound for temperature in any unit. In Celsius: -273.15 °C. In Kelvin: 0 K."
      ),
    ],
    relatedTools: [
      { slug: "kelvin-to-fahrenheit", label: "Kelvin to Fahrenheit" },
      { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
      { slug: "celsius-to-kelvin", label: "Celsius to Kelvin" },
    ],
  },

  "kelvin-to-fahrenheit": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kelvin to Fahrenheit",
        "Two-step: K to C (subtract 273.15), then C to F (multiply by 9/5, add 32). Combined formula: °F = K × 9/5 - 459.67. So 300 K × 9/5 - 459.67 = 80.33 °F.",
        "Used when interpreting scientific temperatures (often given in K) for everyday Fahrenheit context. The Sun's surface is about 5,778 K = 9,941 °F. The cosmic microwave background is 2.7 K = -454.81 °F. Liquid nitrogen boils at 77 K = -321 °F."
      ),
      {
        heading: "Common Kelvin to Fahrenheit",
        table: {
          headers: ["Kelvin", "Fahrenheit"],
          rows: [
            ["0 K", "-459.67 °F"],
            ["100 K", "-279.67 °F"],
            ["200 K", "-99.67 °F"],
            ["273.15 K", "32 °F"],
            ["294 K", "69.53 °F"],
            ["310 K", "98.33 °F"],
            ["373.15 K", "212 °F"],
            ["1000 K", "1340.33 °F"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How hot is liquid nitrogen?",
        "Liquid nitrogen boils at 77.36 K = -195.79 °C = -320.4 °F. So storing things in 'liquid nitrogen' means at -195 °C. Used in cryogenic preservation, food freezing, and some industrial processes."
      ),
      createFAQ(
        "What's the temperature inside the Sun?",
        "Surface: ~5,778 K (~9,941 °F). Core: ~15,000,000 K (~27 million °F). Solar fusion happens at the core's high temperature. Sun's surface is what we see; the corona above is hotter (~1-2 million K)."
      ),
    ],
    relatedTools: [
      { slug: "fahrenheit-to-kelvin", label: "Fahrenheit to Kelvin" },
      { slug: "kelvin-to-celsius", label: "Kelvin to Celsius" },
      { slug: "fahrenheit-to-celsius", label: "Fahrenheit to Celsius" },
    ],
  },

  "square-feet-to-square-metres": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Square Feet to Square Metres",
        "1 sq ft = 0.0929 sq m. Multiply square feet by 0.0929 (or divide by 10.764). So 1,000 sq ft × 0.0929 = 92.9 sq m. The square-metre value comes from squaring the metre-foot conversion: 1 ft = 0.3048 m, so 1 sq ft = 0.3048² = 0.09290304 sq m.",
        "Most common context: real estate. American property listings show square feet; international/UK listings show square metres. A typical 2,000 sq ft American house = 186 sq m, comparable to a UK '186 m² house' (large 4-bedroom). A 1,200 sq ft apartment = 111 sq m."
      ),
      {
        heading: "Common Square Feet to Square Metres",
        table: {
          headers: ["Square Feet", "Square Metres"],
          rows: [
            ["100 sq ft", "9.29 sq m"],
            ["500 sq ft", "46.45 sq m"],
            ["750 sq ft", "69.68 sq m"],
            ["1000 sq ft", "92.90 sq m"],
            ["1500 sq ft", "139.35 sq m"],
            ["2000 sq ft", "185.81 sq m"],
            ["3000 sq ft", "278.71 sq m"],
            ["5000 sq ft", "464.52 sq m"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How big is a typical UK 1-bed flat?",
        "Typically 30-50 sq m = 323-538 sq ft. UK new-builds often around 35 sq m for 1-bed, 60 sq m for 2-bed. American 1-bed apartments often 600-800 sq ft = 56-74 sq m, slightly larger than UK norms."
      ),
      createFAQ(
        "How does this affect property pricing?",
        "Price per square metre or per square foot is the standard normalised property metric. UK prices typically £4,000-£12,000/sq m in major cities. US prices typically $200-$1,000/sq ft, varies hugely by city. Compare via /sq m for international standardisation."
      ),
    ],
    relatedTools: [
      { slug: "square-metres-to-square-feet", label: "Square Metres to Square Feet" },
      { slug: "acres-to-hectares", label: "Acres to Hectares" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },

  "square-metres-to-square-feet": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Square Metres to Square Feet",
        "1 sq m = 10.764 sq ft. Multiply square metres by 10.764 (or divide by 0.0929). So 100 sq m × 10.764 = 1,076 sq ft. The factor is the square of the metre-foot conversion: (3.2808)² = 10.7639.",
        "Useful for converting European real estate listings to American square footage. A typical 100 sq m UK flat = 1,076 sq ft, a comfortable 2-bed apartment by US standards. A 200 sq m house = 2,153 sq ft, mid-size US suburban home. Hotel rooms internationally often listed in sq m; US hotels typically in sq ft."
      ),
      {
        heading: "Common Square Metres to Square Feet",
        table: {
          headers: ["Square Metres", "Square Feet"],
          rows: [
            ["10 sq m", "107.64 sq ft"],
            ["25 sq m", "269.10 sq ft"],
            ["50 sq m", "538.20 sq ft"],
            ["75 sq m", "807.29 sq ft"],
            ["100 sq m", "1076.39 sq ft"],
            ["150 sq m", "1614.59 sq ft"],
            ["200 sq m", "2152.78 sq ft"],
            ["300 sq m", "3229.17 sq ft"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are UK flats smaller than US apartments?",
        "Land scarcity and density. UK new-build minimum standards (since 2015 in London) are 37 sq m for 1-bed, 50 sq m for 2-bed. US apartments often 60+ sq m for 1-bed, 80+ sq m for 2-bed. Big urban differences too: NYC apartments smaller than typical Texas equivalents."
      ),
      createFAQ(
        "Does sq m include common areas?",
        "Depends on listing. Some show 'gross internal area' (within walls), some include corridor allotments, some include exterior balconies. Always check what's measured. UK uses NIA (Net Internal Area) standard for flats; US sometimes includes hall/lobby floor area."
      ),
    ],
    relatedTools: [
      { slug: "square-feet-to-square-metres", label: "Square Feet to Square Metres" },
      { slug: "hectares-to-acres", label: "Hectares to Acres" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
    ],
  },

  "acres-to-hectares": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Acres to Hectares",
        "1 acre = 0.405 hectares. Multiply acres by 0.4047 to get hectares. So 100 acres × 0.4047 = 40.47 ha. The hectare (10,000 sq m = 100 m × 100 m) is the standard metric unit for land area; the acre is the imperial counterpart.",
        "Used for international land transactions, agriculture, and conservation reporting. A typical UK farm: 200-500 acres = 81-202 ha. A residential estate: 1-5 acres = 0.4-2 ha. Central Park NYC = 843 acres = 341 ha. Agricultural pricing per hectare or acre varies hugely by location and use."
      ),
      {
        heading: "Common Acres to Hectares",
        table: {
          headers: ["Acres", "Hectares"],
          rows: [
            ["0.5 acre", "0.20 ha"],
            ["1 acre", "0.40 ha"],
            ["2.5 acres", "1.01 ha"],
            ["5 acres", "2.02 ha"],
            ["10 acres", "4.05 ha"],
            ["25 acres", "10.12 ha"],
            ["100 acres", "40.47 ha"],
            ["1000 acres", "404.69 ha"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is 1 acre 0.4 hectares?",
        "Historical accident. The acre was originally 'as much land as a yoke of oxen could plough in one day' - eventually standardised at 4,840 sq yards = 43,560 sq ft. The hectare is purely metric (100 × 100 m). Their ratio (0.4047) reflects the imperial-metric differences in linear units squared."
      ),
      createFAQ(
        "What's a typical farm size?",
        "UK average farm: 86 ha = 213 acres. US average farm: 446 acres = 180 ha. Australian average farm: vast - 4,330 ha = 10,700 acres typical due to outback grazing. Sizes vary enormously by farm type and country."
      ),
    ],
    relatedTools: [
      { slug: "hectares-to-acres", label: "Hectares to Acres" },
      { slug: "square-feet-to-square-metres", label: "Square Feet to Square Metres" },
      { slug: "square-miles-to-square-km", label: "Square Miles to Square Km" },
    ],
  },

  "hectares-to-acres": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Hectares to Acres",
        "1 hectare = 2.471 acres. Multiply hectares by 2.471 to get acres. So 100 ha × 2.471 = 247.1 acres. The hectare is 10,000 square metres, defined to match a 100m × 100m square, the basic unit of land in metric countries.",
        "Useful for translating European agricultural and forestry data into acre-based context. Wine industry: a small French vineyard might be 10 ha = 24.7 acres. National parks: Welsh Brecon Beacons = 134,000 ha = 331,000 acres. Agricultural land prices commonly quoted per ha in EU, per acre in US/UK rural areas."
      ),
      {
        heading: "Common Hectares to Acres",
        table: {
          headers: ["Hectares", "Acres"],
          rows: [
            ["0.5 ha", "1.24 acres"],
            ["1 ha", "2.47 acres"],
            ["2.5 ha", "6.18 acres"],
            ["5 ha", "12.36 acres"],
            ["10 ha", "24.71 acres"],
            ["25 ha", "61.78 acres"],
            ["100 ha", "247.11 acres"],
            ["1000 ha", "2471.05 acres"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How big is a hectare?",
        "10,000 square metres - a 100m × 100m square. A football pitch (FIFA standard) is roughly 0.7 hectare; a city block is variable but typically 1-2 hectares. Useful baseline for visualising larger land areas."
      ),
      createFAQ(
        "Are hectares used in the US?",
        "Rarely. American real estate and farming use acres almost exclusively. Hectares appear in international export data, scientific publications, and some conservation organisations operating internationally. US Geological Survey publishes data in both."
      ),
    ],
    relatedTools: [
      { slug: "acres-to-hectares", label: "Acres to Hectares" },
      { slug: "square-metres-to-square-feet", label: "Square Metres to Square Feet" },
      { slug: "square-km-to-square-miles", label: "Square Km to Square Miles" },
    ],
  },

  "mb-to-gb": {
    sections: [
      createAnswerFirstSection(
        "How to Convert MB to GB",
        "1 GB = 1,024 MB (binary, IEC standard) or 1,000 MB (decimal, marketing standard). Most operating systems use binary (1 GB = 1,024 MB); most storage manufacturers and ISPs use decimal (1 GB = 1,000 MB), which is why a '1 TB' drive shows as 931 GB in your OS.",
        "Practical conversion: divide MB by 1,024 (or 1,000). So 5,120 MB = 5 GB binary, or 5.12 GB decimal. The choice usually doesn't matter for ordinary use but does explain the 'missing storage' that confuses people when checking new drives. A 64 GB phone often shows ~58 GB in OS due to binary conversion plus system files."
      ),
      {
        heading: "Common MB to GB",
        table: {
          headers: ["Megabytes", "Gigabytes (binary)", "Gigabytes (decimal)"],
          rows: [
            ["100 MB", "0.098 GB", "0.1 GB"],
            ["500 MB", "0.488 GB", "0.5 GB"],
            ["1024 MB", "1 GB", "1.024 GB"],
            ["2048 MB", "2 GB", "2.048 GB"],
            ["5120 MB", "5 GB", "5.12 GB"],
            ["10240 MB", "10 GB", "10.24 GB"],
            ["51200 MB", "50 GB", "51.2 GB"],
            ["102400 MB", "100 GB", "102.4 GB"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does my new 500 GB drive show as 465 GB?",
        "The drive manufacturer used decimal (1 GB = 10^9 bytes), but your OS uses binary (1 GiB = 2^30 bytes = 1.074 × 10^9 bytes). 500 × 10^9 / 2^30 = 465.66 GiB. The 'missing' 35 GB is real to the marketing definition; the binary GiB is what your OS reports."
      ),
      createFAQ(
        "Should I use MB or MiB?",
        "Strictly, MiB (mebibyte = 2^20) = 1,048,576 bytes. MB (megabyte) usually = 10^6 = 1,000,000 bytes (decimal). Most consumers use MB for both; technically rigorous specifications use MiB for binary."
      ),
    ],
    relatedTools: [
      { slug: "gb-to-mb", label: "GB to MB" },
      { slug: "kb-to-mb", label: "KB to MB" },
      { slug: "gb-to-tb", label: "GB to TB" },
    ],
  },

  "gb-to-mb": {
    sections: [
      createAnswerFirstSection(
        "How to Convert GB to MB",
        "1 GB = 1,024 MB (binary) or 1,000 MB (decimal). Multiply GB by 1,024 (or 1,000). So 5 GB = 5,120 MB binary, or 5,000 MB decimal. The operating system standard is binary (1 GB = 1,024 MB), so when you see a file's actual size after download, it usually shows MB in binary terms.",
        "Useful when planning storage usage for video files, large datasets, or game installs. A typical 1080p movie is 4-8 GB = 4,096-8,192 MB. A modern game is 50-150 GB = 51,200-153,600 MB. Cloud storage purchases often quote in GB; downloads complete and report progress in MB."
      ),
      {
        heading: "Common GB to MB",
        table: {
          headers: ["Gigabytes", "Megabytes (binary)", "Megabytes (decimal)"],
          rows: [
            ["0.5 GB", "512 MB", "500 MB"],
            ["1 GB", "1024 MB", "1000 MB"],
            ["2 GB", "2048 MB", "2000 MB"],
            ["5 GB", "5120 MB", "5000 MB"],
            ["10 GB", "10240 MB", "10000 MB"],
            ["25 GB", "25600 MB", "25000 MB"],
            ["50 GB", "51200 MB", "50000 MB"],
            ["100 GB", "102400 MB", "100000 MB"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many MB in a movie?",
        "Highly variable. A 1080p movie from a streaming service compressed: 4-8 GB. A 4K movie: 25-100 GB. A blu-ray rip: 30-50 GB. Downloads quoted in GB; progress and speed often shown in MB/sec."
      ),
      createFAQ(
        "What's the difference between MB/s and Mbps?",
        "Megabytes per second vs megabits per second. 1 byte = 8 bits, so 100 Mbps = 12.5 MB/s. Internet speeds are typically advertised in Mbps; download progress shown in MB/s. Watch the case - 'MB' (capital B) is megabyte; 'Mb' (lowercase) is megabit."
      ),
    ],
    relatedTools: [
      { slug: "mb-to-gb", label: "MB to GB" },
      { slug: "gb-to-tb", label: "GB to TB" },
      { slug: "kb-to-mb", label: "KB to MB" },
    ],
  },

  "gb-to-tb": {
    sections: [
      createAnswerFirstSection(
        "How to Convert GB to TB",
        "1 TB = 1,024 GB (binary) or 1,000 GB (decimal). Divide GB by 1,024 (or 1,000) to get TB. So 2,048 GB = 2 TB binary, or 2.048 TB decimal. As with all data conversions, OS and consumer/marketing usage diverges - drives marketed as '1 TB' actually deliver 0.91 TiB (931 GiB) in OS terms.",
        "Useful for planning large storage purchases. A 4 TB external drive holds about 4,000 GB of files (decimal) or 3,725 GiB in OS view (binary). Cloud storage commonly purchased in TB increments (1 TB iCloud, 2 TB Google One). Personal media archives can grow into TB territory quickly with 4K video."
      ),
      {
        heading: "Common GB to TB",
        table: {
          headers: ["Gigabytes", "Terabytes (binary)", "Terabytes (decimal)"],
          rows: [
            ["100 GB", "0.098 TB", "0.1 TB"],
            ["512 GB", "0.5 TB", "0.512 TB"],
            ["1024 GB", "1 TB", "1.024 TB"],
            ["2048 GB", "2 TB", "2.048 TB"],
            ["4096 GB", "4 TB", "4.096 TB"],
            ["8192 GB", "8 TB", "8.192 TB"],
            ["10240 GB", "10 TB", "10.24 TB"],
            ["20480 GB", "20 TB", "20.48 TB"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What can I store in 1 TB?",
        "About 250,000 photos at 4 MB each, or 250 hours of HD video, or 200 typical games (50 GB average), or about 500,000 documents. Modern phones can shoot 100 GB of 4K video per hour, so a TB holds about 10 hours of 4K phone footage."
      ),
      createFAQ(
        "Are SSD and HDD storage measured the same?",
        "Yes - both use the same GB/TB measurements. SSDs are typically smaller capacity per dollar but much faster. Modern SSDs and HDDs both use the decimal marketing standard (TB = 10^12 bytes), so a '1 TB SSD' and a '1 TB HDD' have nominally the same capacity."
      ),
    ],
    relatedTools: [
      { slug: "tb-to-gb", label: "TB to GB" },
      { slug: "mb-to-gb", label: "MB to GB" },
      { slug: "gb-to-mb", label: "GB to MB" },
    ],
  },

  "tb-to-gb": {
    sections: [
      createAnswerFirstSection(
        "How to Convert TB to GB",
        "1 TB = 1,024 GB (binary) or 1,000 GB (decimal). Multiply TB by 1,024 (or 1,000). So 5 TB = 5,120 GB binary, or 5,000 GB decimal. The binary value is what your OS reports; the decimal is what the manufacturer puts on the box.",
        "Useful when purchasing storage and planning capacity. A 2 TB drive marketed by capacity = 2,000 GB decimal = 1,863 GB binary as your OS will show it. The 137 GB difference is real - your OS files don't see capacity that the manufacturer labelled."
      ),
      {
        heading: "Common TB to GB",
        table: {
          headers: ["Terabytes", "Gigabytes (binary)", "Gigabytes (decimal)"],
          rows: [
            ["0.5 TB", "512 GB", "500 GB"],
            ["1 TB", "1024 GB", "1000 GB"],
            ["2 TB", "2048 GB", "2000 GB"],
            ["3 TB", "3072 GB", "3000 GB"],
            ["4 TB", "4096 GB", "4000 GB"],
            ["8 TB", "8192 GB", "8000 GB"],
            ["12 TB", "12288 GB", "12000 GB"],
            ["20 TB", "20480 GB", "20000 GB"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I buy a TB drive or multiple GB drives?",
        "TB drives almost always cheaper per GB at consumer level. A 4 TB drive often costs less than 4× a 1 TB drive. Multiple smaller drives offer redundancy through RAID setups - 2× 4 TB drives in RAID 1 give 4 TB usable plus mirroring."
      ),
      createFAQ(
        "What's a petabyte?",
        "1 PB = 1,024 TB (binary) or 1,000 TB (decimal). Mostly relevant in enterprise/data-center contexts. Personal storage rarely reaches PB scale. Massive media archives (video production studios, scientific research) can be in PB."
      ),
    ],
    relatedTools: [
      { slug: "gb-to-tb", label: "GB to TB" },
      { slug: "gb-to-mb", label: "GB to MB" },
      { slug: "mb-to-gb", label: "MB to GB" },
    ],
  },

  "kb-to-mb": {
    sections: [
      createAnswerFirstSection(
        "How to Convert KB to MB",
        "1 MB = 1,024 KB (binary) or 1,000 KB (decimal). Divide KB by 1,024 (or 1,000) to get MB. So 5,120 KB = 5 MB binary. Most software uses binary, so a 5 MB attachment is technically 5,120 KB by file system measurement.",
        "Useful for understanding email attachment limits, image file sizes, and document storage. A typical email-friendly image is 50-500 KB = 0.05-0.5 MB. A pdf document averages 200 KB - 2 MB depending on content. Email providers typically cap attachments at 25 MB = 25,600 KB."
      ),
      {
        heading: "Common KB to MB",
        table: {
          headers: ["Kilobytes", "Megabytes (binary)", "Megabytes (decimal)"],
          rows: [
            ["100 KB", "0.098 MB", "0.1 MB"],
            ["500 KB", "0.488 MB", "0.5 MB"],
            ["1024 KB", "1 MB", "1.024 MB"],
            ["2048 KB", "2 MB", "2.048 MB"],
            ["5120 KB", "5 MB", "5.12 MB"],
            ["10240 KB", "10 MB", "10.24 MB"],
            ["25600 KB", "25 MB", "25.6 MB"],
            ["51200 KB", "50 MB", "51.2 MB"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's a typical photo file size?",
        "JPEG from phone camera: 2-5 MB = 2,048-5,120 KB. RAW files: 10-50 MB. Compressed for web: 50-500 KB. Compressed for email: under 1 MB usually fine. Compression matters - same photo can range 100x in file size depending on compression settings."
      ),
      createFAQ(
        "Why do file sizes round oddly?",
        "Binary vs decimal interpretation differences. A 'truly 1 MB' file (1,000,000 bytes decimal) shows as 0.95 MB binary. A 'truly 1 MiB' file (1,048,576 bytes binary) shows as 1.05 MB decimal. Round numbers in one system are awkward in the other."
      ),
    ],
    relatedTools: [
      { slug: "mb-to-kb", label: "MB to KB" },
      { slug: "mb-to-gb", label: "MB to GB" },
      { slug: "bits-to-bytes", label: "Bits to Bytes" },
    ],
  },

  "mb-to-kb": {
    sections: [
      createAnswerFirstSection(
        "How to Convert MB to KB",
        "1 MB = 1,024 KB (binary) or 1,000 KB (decimal). Multiply MB by 1,024 (or 1,000). So 25 MB = 25,600 KB binary, or 25,000 KB decimal. Most operating systems and software use binary, so the 1,024 multiplier is the standard.",
        "Useful when working with very small files (icons, web favicons, simple text documents) or when a system reports sizes in MB but you need KB resolution. A 1 MB email attachment = 1,024 KB. A small 100 KB PDF = 0.097 MB. A standard 2 MB photo = 2,048 KB."
      ),
      {
        heading: "Common MB to KB",
        table: {
          headers: ["Megabytes", "Kilobytes (binary)", "Kilobytes (decimal)"],
          rows: [
            ["0.1 MB", "102.4 KB", "100 KB"],
            ["0.5 MB", "512 KB", "500 KB"],
            ["1 MB", "1024 KB", "1000 KB"],
            ["2 MB", "2048 KB", "2000 KB"],
            ["5 MB", "5120 KB", "5000 KB"],
            ["10 MB", "10240 KB", "10000 KB"],
            ["25 MB", "25600 KB", "25000 KB"],
            ["100 MB", "102400 KB", "100000 KB"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How small can I make a photo?",
        "Compressed JPEG can drop to 50-100 KB and still look acceptable for web display. Below 50 KB, visible quality loss appears. Original camera photos are typically 2-5 MB; aggressive web optimization can take them to 100-200 KB."
      ),
      createFAQ(
        "What's a kilobyte good for?",
        "Plain text documents (1 KB ≈ 1,000 characters). Small icons. CSS files. Simple data files. Email body text. The KB is the practical unit for these small file types."
      ),
    ],
    relatedTools: [
      { slug: "kb-to-mb", label: "KB to MB" },
      { slug: "mb-to-gb", label: "MB to GB" },
      { slug: "bytes-to-bits", label: "Bytes to Bits" },
    ],
  },

  "bits-to-bytes": {
    sections: [
      createAnswerFirstSection(
        "Bits and Bytes - 8:1 Ratio",
        "1 byte = 8 bits. Divide bits by 8 to get bytes. So 1,024 bits = 128 bytes; 1 megabit = 125,000 bytes (1 million ÷ 8) = 122 KB binary. The byte is 8 bits because that's the historical word size of early computers (and a clean 256 = 2^8 unique values per byte).",
        "Most useful for understanding internet speed claims. ISPs advertise speeds in megabits per second (Mbps); files download at megabytes per second (MB/s). 100 Mbps = 12.5 MB/s. So a 100 Mbps connection downloads a 1 GB file in about 80 seconds (1,024 MB ÷ 12.5 MB/s)."
      ),
      {
        heading: "Common Bits to Bytes",
        table: {
          headers: ["Bits", "Bytes"],
          rows: [
            ["8 bits", "1 byte"],
            ["16 bits", "2 bytes"],
            ["32 bits", "4 bytes"],
            ["64 bits", "8 bytes"],
            ["1000 bits (1 kbit)", "125 bytes"],
            ["1 megabit (1 Mbit)", "125000 bytes (125 KB)"],
            ["1 gigabit", "125 megabytes"],
            ["10 gigabits", "1.25 gigabytes"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do ISPs use Mbps instead of MB/s?",
        "Marketing - bigger numbers look better. 100 Mbps is the same speed as 12.5 MB/s; the Mbps figure is 8x larger. Most internet quality discussions and review sites translate to MB/s for the practical 'how fast files download' picture."
      ),
      createFAQ(
        "What's a 64-bit operating system?",
        "Refers to processor word size - 64-bit CPUs handle 64 bits (8 bytes) of memory address per operation, supporting much more RAM than 32-bit (4 bytes) systems. All modern desktops and phones are 64-bit; 32-bit systems are mostly legacy."
      ),
    ],
    relatedTools: [
      { slug: "bytes-to-bits", label: "Bytes to Bits" },
      { slug: "kb-to-mb", label: "KB to MB" },
      { slug: "mb-to-gb", label: "MB to GB" },
    ],
  },

  "bytes-to-bits": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Bytes to Bits",
        "1 byte = 8 bits. Multiply bytes by 8 to get bits. So 100 bytes = 800 bits. The relationship is fixed across all computing systems - the byte was historically defined as 8 bits when 8-bit microprocessors became standard in the 1970s.",
        "Used mainly when crossing between data storage measurements (which use bytes) and data transmission rates (which use bits). A 10 MB file = 80 megabits. Transmitted on a 100 megabit per second connection, that's 0.8 seconds of theoretical speed (real world: 1-2x slower due to overhead)."
      ),
      {
        heading: "Common Bytes to Bits",
        table: {
          headers: ["Bytes", "Bits"],
          rows: [
            ["1 byte", "8 bits"],
            ["10 bytes", "80 bits"],
            ["100 bytes", "800 bits"],
            ["1024 bytes (1 KB)", "8192 bits (8 kbits)"],
            ["1 MB", "8 megabits"],
            ["1 GB", "8 gigabits"],
            ["1 TB", "8 terabits"],
            ["1 PB", "8 petabits"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How does 'bit' relate to 'binary'?",
        "Bit is short for 'binary digit' - a 0 or 1. Combining 8 bits gives 256 unique combinations (2^8) which is enough to represent characters in ASCII or numbers 0-255. The byte is the smallest practically-useful storage unit; bits matter for transmission speeds and individual flag values."
      ),
      createFAQ(
        "Why is 'b' lowercase for bits, capital for bytes?",
        "Lowercase 'b' = bit. Capital 'B' = byte. So 'Mbps' (lowercase b) = megabits per second; 'MB/s' (capital B) = megabytes per second. The case distinction matters - getting it wrong off by 8x."
      ),
    ],
    relatedTools: [
      { slug: "bits-to-bytes", label: "Bits to Bytes" },
      { slug: "mb-to-kb", label: "MB to KB" },
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
    ],
  },

  "hex-to-decimal": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Hexadecimal to Decimal",
        "Hex (base 16) uses digits 0-9 and letters A-F (where A=10, B=11, C=12, D=13, E=14, F=15). To convert to decimal, multiply each digit by 16 raised to its position power (rightmost = 16^0). So 'FF' hex = (15 × 16) + (15 × 1) = 240 + 15 = 255 decimal.",
        "Used in programming for memory addresses, color codes (#FF0000 = red), and unicode. A hex byte (00-FF) covers 0-255 in decimal. Two hex digits = 1 byte. The 6-character HTML colour codes (e.g. #2C3E50) are three byte values for red/green/blue intensity."
      ),
      {
        heading: "Common Hex to Decimal",
        table: {
          headers: ["Hex", "Decimal"],
          rows: [
            ["1", "1"],
            ["A", "10"],
            ["F", "15"],
            ["10", "16"],
            ["20", "32"],
            ["FF", "255"],
            ["100", "256"],
            ["FFFF", "65535"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why use hex instead of binary?",
        "Hex is more compact - one hex digit = 4 bits. So a 32-bit number is 8 hex digits vs 32 binary digits. Easier to read and write. Computer science discussions and binary file inspection routinely use hex."
      ),
      createFAQ(
        "How are hex colours read?",
        "RGB color codes use 6 hex digits: first 2 = red intensity (00-FF), next 2 = green, last 2 = blue. So #FF0000 = pure red. #00FF00 = green. #0000FF = blue. #FFFFFF = white. #000000 = black."
      ),
    ],
    relatedTools: [
      { slug: "decimal-to-hex", label: "Decimal to Hex" },
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
      { slug: "hex-to-rgb", label: "Hex to RGB" },
    ],
  },

  "decimal-to-hex": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Decimal to Hexadecimal",
        "Divide the decimal number by 16 repeatedly, recording remainders. The remainders form the hex digits (read from bottom to top). For decimal 255: 255 ÷ 16 = 15 remainder 15. 15 ÷ 16 = 0 remainder 15. Reading bottom-up: 15, 15 = 'FF' hex.",
        "Most useful in programming, color manipulation, and data inspection. Decimal 256 = '100' in hex (just one more than 255 = FF). Decimal 65535 = 'FFFF' (two bytes, max value). Browser developer tools often show colour values in both hex and decimal RGB formats."
      ),
      {
        heading: "Common Decimal to Hex",
        table: {
          headers: ["Decimal", "Hex"],
          rows: [
            ["10", "A"],
            ["16", "10"],
            ["32", "20"],
            ["100", "64"],
            ["128", "80"],
            ["255", "FF"],
            ["1000", "3E8"],
            ["65535", "FFFF"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do hex addresses look weird?",
        "Hex digits A-F look like letters but represent values 10-15. So 'A2' hex = 162 decimal. The mix of letters and digits is the trade-off for compactness - hex packs more value per character than decimal or binary."
      ),
      createFAQ(
        "Can hex be capitalised differently?",
        "Yes - 'FF' and 'ff' are both valid hex for 255. Most conventions favour uppercase for HTML/CSS color codes (#FF0000), lowercase or mixed for programming (0xff). Both work; consistency within a codebase matters."
      ),
    ],
    relatedTools: [
      { slug: "hex-to-decimal", label: "Hex to Decimal" },
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
      { slug: "hex-to-rgb", label: "Hex to RGB" },
    ],
  },

  "binary-to-decimal": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Binary to Decimal",
        "Binary (base 2) uses only 0 and 1. Each digit's value is its position raised by power of 2 (rightmost = 2^0 = 1). So binary '1011' = (1×8) + (0×4) + (1×2) + (1×1) = 11 decimal. Each binary digit (bit) doubles in value as you move left.",
        "Used in computing fundamentals - all data is binary at the lowest level. CPU operations, network packets, file storage all happen in binary at the hardware level. Programmers occasionally convert between binary and decimal when working with bit manipulation, error codes, or low-level protocols."
      ),
      {
        heading: "Common Binary to Decimal",
        table: {
          headers: ["Binary", "Decimal"],
          rows: [
            ["0", "0"],
            ["1", "1"],
            ["10", "2"],
            ["100", "4"],
            ["1010", "10"],
            ["11111111", "255"],
            ["10000000", "128"],
            ["1111111111111111", "65535"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the largest 8-bit binary number?",
        "11111111 = 255 decimal. This is one byte's maximum value. The next number (256) requires 9 bits: 100000000. The byte structure (8 bits = 0-255) is the foundation of all character encodings, RGB colour values, and many protocols."
      ),
      createFAQ(
        "Why is computing binary?",
        "Hardware reliability. A circuit can be reliably 'on' or 'off' (1 or 0) but harder to distinguish 10 voltage levels for decimal. Binary makes hardware simpler and faster. The translation from binary to decimal/hex/text happens in software for human readability."
      ),
    ],
    relatedTools: [
      { slug: "hex-to-decimal", label: "Hex to Decimal" },
      { slug: "decimal-to-hex", label: "Decimal to Hex" },
      { slug: "bits-to-bytes", label: "Bits to Bytes" },
    ],
  },

  "number-to-roman-numerals": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Numbers to Roman Numerals",
        "Roman numerals use seven base symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000. Combine them by addition (II=2, XII=12, MCC=1200) or subtraction when a smaller symbol precedes a larger one (IV=4, IX=9, XL=40, XC=90, CD=400, CM=900). The system has no zero.",
        "Most modern uses: book/movie sequel numbering (Star Wars: Episode IV), Super Bowl labels (Super Bowl LVIII = 58), monarch names (Queen Elizabeth II), clock faces, copyright dates. Maximum standard numeric is 3999 (MMMCMXCIX); larger numbers historically used various extensions but no single accepted system."
      ),
      {
        heading: "Common Numbers to Roman Numerals",
        table: {
          headers: ["Number", "Roman Numeral"],
          rows: [
            ["1", "I"],
            ["4", "IV"],
            ["9", "IX"],
            ["50", "L"],
            ["100", "C"],
            ["500", "D"],
            ["1000", "M"],
            ["2024", "MMXXIV"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why no zero?",
        "Romans didn't conceptualise zero as a number. Roman numerals predate the Arabic-Hindu zero by centuries. The lack of zero makes Roman arithmetic harder than positional decimal systems - one of the reasons for the eventual switch to Arabic numerals in Europe (around 13th century)."
      ),
      createFAQ(
        "What's IIII vs IV?",
        "Both used historically. IV is the standard subtractive form (5-1=4). IIII appears on clock faces (a stylistic exception). Both technically valid; subtractive notation (IV) became standard from the Middle Ages onwards for written numbers."
      ),
    ],
    relatedTools: [
      { slug: "roman-numerals-to-number", label: "Roman Numerals to Numbers" },
      { slug: "decimal-to-hex", label: "Decimal to Hex" },
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
    ],
  },

  "roman-numerals-to-number": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Roman Numerals to Numbers",
        "Add up symbol values, but subtract when a smaller symbol precedes a larger one. So MCMXC: M=1000, C before M means -100, M=1000, X before C means -10, so 1000 + (1000-100) + (100-10) = 1000 + 900 + 90 = 1990.",
        "Useful for reading old building dates, movie sequel numbers, or pope/monarch designations. Roman numerals appear on copyright dates (MCMXC = 1990), Super Bowl events, dynasty names. The conversion isn't always linear - subtractive pairs (IV, IX, XL, XC, CD, CM) need careful reading."
      ),
      {
        heading: "Common Roman Numerals to Numbers",
        table: {
          headers: ["Roman Numeral", "Number"],
          rows: [
            ["I", "1"],
            ["X", "10"],
            ["L", "50"],
            ["C", "100"],
            ["MCM", "1900"],
            ["MMXX", "2020"],
            ["MMXXIV", "2024"],
            ["MMMCMXCIX", "3999"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the maximum?",
        "Standard form: 3999 = MMMCMXCIX. Above this, no single accepted notation - some use 'M̄' (M with overbar) for 1000×1000, but this isn't standard. For numbers above 3999, modern usage typically reverts to Arabic numerals."
      ),
      createFAQ(
        "Are Roman numerals still used in legal contexts?",
        "Yes - some legal documents, book chapter numbering, and outline numbering use Roman numerals. Court cases sometimes use 'I, II, III...' for numbered defendants. Religious texts use Roman numerals for chapter and verse references."
      ),
    ],
    relatedTools: [
      { slug: "number-to-roman-numerals", label: "Numbers to Roman Numerals" },
      { slug: "decimal-to-hex", label: "Decimal to Hex" },
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
    ],
  },

  "calories-to-joules": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Calories to Joules",
        "1 calorie (cal) = 4.184 joules (J). Multiply calories by 4.184 to get joules. So 100 cal × 4.184 = 418.4 J. Note: this 'small calorie' (cal) is rare in everyday use; 'food calories' (kcal or Cal) are 1,000 small calories each, so 1 kcal = 4,184 J = 4.184 kJ.",
        "Used in scientific energy calculations and precision nutrition labelling. The thermodynamics calorie (4.184 J) is the energy needed to raise 1 gram of water by 1 °C. Most everyday 'calorie' references are food calories (kcal), thousand times larger - a 250 kcal snack = 1,046 kJ."
      ),
      {
        heading: "Common Calories to Joules",
        table: {
          headers: ["Calories (cal)", "Joules (J)"],
          rows: [
            ["1 cal", "4.184 J"],
            ["10 cal", "41.84 J"],
            ["100 cal", "418.4 J"],
            ["500 cal", "2092 J"],
            ["1000 cal (1 kcal)", "4184 J"],
            ["2000 kcal (food)", "8368 kJ"],
            ["10000 kcal", "41840 kJ"],
            ["50000 kcal", "209200 kJ"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are food calories small or large calories?",
        "Food 'calories' are large calories (kcal). When a label says '500 calories', it means 500 kcal = 500,000 small calories. The capital C in 'Calorie' (rarely seen) historically distinguished kcal from cal, but most modern usage just says 'calorie' for food despite meaning kcal."
      ),
      createFAQ(
        "Should I use joules or calories for nutrition?",
        "EU nutrition labels show both kJ and kcal. UK uses both equally. US uses kcal only (called 'calories'). Australian and many Asian countries use kJ primarily. 1 kcal = 4.184 kJ for conversion."
      ),
    ],
    relatedTools: [
      { slug: "joules-to-calories", label: "Joules to Calories" },
      { slug: "kcal-to-calories", label: "Kcal to Calories" },
      { slug: "calories-to-kcal", label: "Calories to Kcal" },
    ],
  },

  "joules-to-calories": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Joules to Calories",
        "1 joule = 0.239 calories. Divide joules by 4.184 to get calories. So 1000 J ÷ 4.184 = 239 cal. This conversion uses the 'small calorie' (cal); for food calories (kcal), divide by 4,184. So 8,368 kJ = 2,000 kcal (a typical daily food intake).",
        "Most useful for translating European nutrition labels (which often lead with kJ) to American kcal-based calorie counts. A 500 kJ snack = 119 kcal. A 2,000 kJ meal = 478 kcal. 'Daily energy intake' targets vary by country: US ~2,000 kcal = 8,368 kJ; AU/NZ ~8,700 kJ = 2,080 kcal."
      ),
      {
        heading: "Common Joules to Calories",
        table: {
          headers: ["Joules (J)", "Calories (cal)", "Kcal (food)"],
          rows: [
            ["100 J", "23.9 cal", "0.024 kcal"],
            ["1000 J (1 kJ)", "239 cal", "0.239 kcal"],
            ["10000 J", "2390 cal", "2.39 kcal"],
            ["100000 J (100 kJ)", "23,900 cal", "23.9 kcal"],
            ["500 kJ", "119,500 cal", "119.5 kcal"],
            ["1000 kJ (1 MJ)", "239,000 cal", "239 kcal"],
            ["8400 kJ", "2,008,000 cal", "2008 kcal"],
            ["10000 kJ", "2,390,000 cal", "2390 kcal"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does my Australian food label show kJ?",
        "Australian nutrition labelling regulation defaults to kJ. UK shows both kJ and kcal. US shows only kcal (labelled as 'calories'). A 2000 kcal daily diet = 8,400 kJ approximately. Use 4.184 as the conversion factor."
      ),
      createFAQ(
        "How precise is the 4.184 factor?",
        "More precisely 4.18400 J per cal (exact, by definition since 1956). Some older sources use 4.1868 (different historical definition). Modern usage standardises on 4.184. Within nutrition/cooking contexts, the 0.04% difference is irrelevant."
      ),
    ],
    relatedTools: [
      { slug: "calories-to-joules", label: "Calories to Joules" },
      { slug: "calories-to-kcal", label: "Calories to Kcal" },
      { slug: "kcal-to-calories", label: "Kcal to Calories" },
    ],
  },

  "calories-to-kcal": {
    sections: [
      createAnswerFirstSection(
        "Calories vs Kilocalories - the Confusion Cleared",
        "1 kcal = 1,000 calories. The 'calorie' on a food label (US) is actually a kilocalorie scientifically. So 100 'food calories' = 100 kcal = 100,000 small calories (cal). Divide calories by 1,000 to get kcal. The capital C in 'Calorie' historically signalled kcal, but most American food labels just say 'calorie' meaning kcal.",
        "Most useful for understanding scientific vs nutritional contexts. A 100 cal physics calculation = 0.1 kcal. A 100 'calorie' food label = 100 kcal = 418 kJ. Always check whether a 'calorie' is the small (cal) or large (kcal) variety. Most everyday usage means kcal; most physics texts mean cal."
      ),
      {
        heading: "Calories to Kcal",
        table: {
          headers: ["Calories (cal)", "Kilocalories (kcal)"],
          rows: [
            ["1 cal", "0.001 kcal"],
            ["100 cal", "0.1 kcal"],
            ["1000 cal", "1 kcal"],
            ["5000 cal", "5 kcal"],
            ["10000 cal", "10 kcal"],
            ["100000 cal", "100 kcal"],
            ["1000000 cal", "1000 kcal"],
            ["2000000 cal", "2000 kcal (daily)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is a 'food calorie' really a kcal?",
        "Yes. A US 'calorie' on food labels is technically a kilocalorie (kcal). The capital C convention was meant to distinguish them but it's not consistently used. Practical rule: 'calorie' in food/nutrition = kcal; 'calorie' in physics/chemistry = small cal."
      ),
      createFAQ(
        "When does the small calorie matter?",
        "Mostly in physics, chemistry, and engineering. Heat capacity (4.184 J/cal), thermodynamics, and certain industrial processes. Everyday nutrition uses kcal exclusively, even when the label just says 'calories'."
      ),
    ],
    relatedTools: [
      { slug: "kcal-to-calories", label: "Kcal to Calories" },
      { slug: "calories-to-joules", label: "Calories to Joules" },
      { slug: "joules-to-calories", label: "Joules to Calories" },
    ],
  },

  "kcal-to-calories": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Kcal to Calories",
        "1 kcal = 1,000 small calories. Multiply kcal by 1,000 to get small calories. So 250 kcal × 1,000 = 250,000 cal. This conversion only matters in scientific contexts; for nutrition, kcal IS the food 'calorie' (despite the labels just saying 'calories').",
        "When a recipe or food label says '250 calories,' this means 250 kcal = 250,000 small calories. Most calorie-tracking apps and food databases use kcal even when labelled simply 'calories.' The conversion to small cal is mostly relevant for thermodynamic or chemistry calculations."
      ),
      {
        heading: "Kcal to Calories (small)",
        table: {
          headers: ["Kcal", "Small Calories"],
          rows: [
            ["1 kcal", "1000 cal"],
            ["10 kcal", "10000 cal"],
            ["100 kcal", "100000 cal"],
            ["250 kcal", "250000 cal"],
            ["500 kcal", "500000 cal"],
            ["1000 kcal", "1000000 cal"],
            ["2000 kcal (daily)", "2000000 cal"],
            ["3500 kcal (1 lb fat)", "3500000 cal"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is there confusion between cal and kcal?",
        "The 'big calorie' was originally written 'Calorie' (capital C) and 'small calorie' was 'calorie' (lowercase). When food labels dropped the capital, the distinction became invisible. Most everyday usage is fine treating 'calorie' as kcal in nutrition contexts."
      ),
      createFAQ(
        "How many kcal in a pound of fat?",
        "Roughly 3,500 kcal in a pound of body fat. To lose 1 lb of fat, you need a 3,500 kcal deficit (deficit of 500 kcal/day for a week). This rule of thumb is approximate but useful for weight management math."
      ),
    ],
    relatedTools: [
      { slug: "calories-to-kcal", label: "Calories to Kcal" },
      { slug: "joules-to-calories", label: "Joules to Calories" },
      { slug: "calories-to-joules", label: "Calories to Joules" },
    ],
  },

  "knots-to-mph": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Knots to MPH",
        "1 knot = 1.151 mph. Multiply knots by 1.151 (or 1.15 for quick mental). So 30 knots × 1.151 = 34.5 mph. The knot is the standard speed unit for marine and aviation - 1 knot is exactly 1 nautical mile per hour, and 1 nautical mile = 1.151 statute miles.",
        "Used for sailing, marine weather, aviation. A storm with 50 knot winds = 57.6 mph (severe gale). 100 knots = 115 mph (most aircraft cruise speed). Hurricane categories use knots: Cat 1 (74-95 mph) = 64-82 knots, Cat 5 (157+ mph) = 137+ knots."
      ),
      {
        heading: "Common Knots to MPH",
        table: {
          headers: ["Knots", "MPH"],
          rows: [
            ["1 knot", "1.15 mph"],
            ["10 knots", "11.51 mph"],
            ["20 knots", "23.02 mph"],
            ["30 knots", "34.52 mph"],
            ["40 knots", "46.03 mph"],
            ["50 knots", "57.54 mph"],
            ["75 knots", "86.30 mph"],
            ["100 knots", "115.08 mph"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why use knots instead of mph?",
        "Maritime and aviation tradition. 1 knot = 1 nautical mile/hour, where the nautical mile is 1 minute of latitude at the equator (1,852 m). This makes the unit naturally aligned with navigation - useful when working with ocean charts or great-circle aviation routes."
      ),
      createFAQ(
        "What's a typical sailboat speed?",
        "Cruising sailboats: 5-7 knots typical (5.7-8 mph). Racing boats: 8-12 knots. The 'hull speed' for displacement boats: roughly 1.34 × sqrt(waterline length in feet). A 32-foot waterline boat: 1.34 × √32 = 7.6 knots = 8.7 mph."
      ),
    ],
    relatedTools: [
      { slug: "mph-to-knots", label: "MPH to Knots" },
      { slug: "knots-to-kph", label: "Knots to KPH" },
      { slug: "miles-to-km", label: "Miles to Kilometres" },
    ],
  },

  "mph-to-knots": {
    sections: [
      createAnswerFirstSection(
        "How to Convert MPH to Knots",
        "1 mph = 0.869 knots. Multiply mph by 0.869 (or divide by 1.151) to get knots. So 60 mph × 0.869 = 52.14 knots. The conversion comes up most often when interpreting marine forecasts (which use knots) for boat owners more familiar with mph.",
        "Useful for boating, sailing, and aviation contexts where mph values need to be expressed in knots. A 25 mph wind = 21.7 knots = moderate breeze. 35 mph = 30.4 knots = near gale. 60 mph = 52 knots = strong gale to storm. Hurricane minimum (74 mph) = 64.3 knots."
      ),
      {
        heading: "Common MPH to Knots",
        table: {
          headers: ["MPH", "Knots"],
          rows: [
            ["10 mph", "8.69 kt"],
            ["20 mph", "17.38 kt"],
            ["25 mph", "21.72 kt"],
            ["35 mph", "30.41 kt"],
            ["50 mph", "43.45 kt"],
            ["74 mph (hurricane)", "64.30 kt"],
            ["100 mph", "86.90 kt"],
            ["157 mph (Cat 5)", "136.43 kt"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How does the Beaufort scale relate to knots?",
        "Beaufort 0 (calm): 0 knots. Beaufort 5 (fresh breeze): 17-21 knots. Beaufort 8 (gale): 34-40 knots. Beaufort 12 (hurricane): 64+ knots. The scale is the standard global wind classification."
      ),
      createFAQ(
        "What's typical aircraft speed in knots?",
        "Commercial jets cruise at 450-490 knots true airspeed (about 520-565 mph). Private aircraft: 100-200 knots. Helicopter cruise: 100-150 knots. The 'V speeds' on aircraft instruments (rotation speed, takeoff safety) are always in knots."
      ),
    ],
    relatedTools: [
      { slug: "knots-to-mph", label: "Knots to MPH" },
      { slug: "mph-to-kph", label: "MPH to KPH" },
      { slug: "kph-to-knots", label: "KPH to Knots" },
    ],
  },

  "psi-to-bar": {
    sections: [
      createAnswerFirstSection(
        "How to Convert PSI to Bar",
        "1 bar = 14.504 psi. Divide psi by 14.504 to get bar. So 30 psi ÷ 14.504 = 2.07 bar. Bar is roughly equal to atmospheric pressure (1 atm ≈ 1.013 bar), so it's intuitive for everyday pressure measurements like tyre pressure, plumbing, or weather.",
        "Tyre pressure example: a typical car tyre at 32 psi = 2.21 bar. UK and EU tyre placards usually show bar; US show psi. Cycling tyres: road bike 100-130 psi = 6.9-9.0 bar. Mountain bike 25-50 psi = 1.7-3.4 bar. Higher pressures = harder rolling (better for road), lower = better grip (better for mountain)."
      ),
      {
        heading: "Common PSI to Bar",
        table: {
          headers: ["PSI", "Bar"],
          rows: [
            ["1 psi", "0.069 bar"],
            ["14.5 psi", "1 bar"],
            ["30 psi", "2.07 bar"],
            ["32 psi (typical tyre)", "2.21 bar"],
            ["50 psi", "3.45 bar"],
            ["100 psi (road bike)", "6.89 bar"],
            ["120 psi", "8.27 bar"],
            ["200 psi", "13.79 bar"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the right tyre pressure?",
        "Check the placard in the driver's door jamb or owner's manual. Typically 30-35 psi (2.07-2.41 bar) for cars. Truck tyres often higher 50-60 psi (3.4-4.1 bar). Always check pressure cold (before driving)."
      ),
      createFAQ(
        "Are bar and atmosphere the same?",
        "Close: 1 atm = 1.01325 bar. Bar is metric pressure (10^5 pascal); atmosphere is the average pressure at sea level. Often used interchangeably in casual usage but technically different by about 1.3%."
      ),
    ],
    relatedTools: [
      { slug: "bar-to-psi", label: "Bar to PSI" },
      { slug: "atm-to-psi", label: "Atmosphere to PSI" },
      { slug: "psi-to-atm", label: "PSI to Atmosphere" },
    ],
  },

  "bar-to-psi": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Bar to PSI",
        "1 bar = 14.504 psi. Multiply bar by 14.504 to get psi. So 2.5 bar × 14.504 = 36.26 psi. Most European/UK tyre and pressure equipment uses bar; US equipment uses psi. The conversion is essential for international car owners or anyone using equipment from another region.",
        "Air conditioning systems: typically 30-50 psi = 2.07-3.45 bar low side, 200-300 psi = 13.79-20.68 bar high side. Espresso machines: 9 bar = 130.5 psi (the standard pressure for proper espresso extraction). Hot water tanks: typically 1.5-3 bar = 22-44 psi safety pressure."
      ),
      {
        heading: "Common Bar to PSI",
        table: {
          headers: ["Bar", "PSI"],
          rows: [
            ["0.5 bar", "7.25 psi"],
            ["1 bar", "14.50 psi"],
            ["1.5 bar", "21.76 psi"],
            ["2 bar", "29.01 psi"],
            ["2.5 bar", "36.26 psi"],
            ["3 bar", "43.51 psi"],
            ["6 bar", "87.02 psi"],
            ["10 bar", "145.04 psi"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does espresso use 9 bar?",
        "9 bar (130 psi) is the pressure traditionally needed to force water through tightly-packed coffee grounds for proper extraction. Modern machines deliver 9 bar at the group head despite pumps producing higher pressures (15+ bar). Some specialty equipment uses lower 6-7 bar for distinctive extraction styles."
      ),
      createFAQ(
        "What does '3 bar' on a watch mean?",
        "Watch water resistance rating in bar (often labelled '30 m', '100 m', etc.). 3 bar = approximately 30 metres = 'splash resistant' but not for swimming. 10 bar = 100 metres = swimming/snorkelling. 20 bar = scuba diving. The depth ratings are approximate; actual safe depth is usually less than the rating suggests."
      ),
    ],
    relatedTools: [
      { slug: "psi-to-bar", label: "PSI to Bar" },
      { slug: "atm-to-psi", label: "Atmosphere to PSI" },
      { slug: "psi-to-atm", label: "PSI to Atmosphere" },
    ],
  },

  "degrees-to-radians": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Degrees to Radians",
        "Multiply degrees by π/180. So 90° × π/180 = π/2 ≈ 1.571 radians. Radians are the SI unit for angles, mathematically natural because the radian definition makes calculus and trigonometry cleaner. Full circle = 360° = 2π radians = 6.283 radians.",
        "Used in mathematics, physics, computer graphics, and game programming. Trigonometric functions (sin, cos, tan) in most programming languages require radians, not degrees. So if your input is in degrees, multiply by π/180 first. Common conversion in graphics programming: rotating a sprite '45°' means rotating it π/4 ≈ 0.785 radians."
      ),
      {
        heading: "Common Degrees to Radians",
        table: {
          headers: ["Degrees", "Radians"],
          rows: [
            ["0°", "0"],
            ["30°", "π/6 ≈ 0.524"],
            ["45°", "π/4 ≈ 0.785"],
            ["60°", "π/3 ≈ 1.047"],
            ["90°", "π/2 ≈ 1.571"],
            ["180°", "π ≈ 3.142"],
            ["270°", "3π/2 ≈ 4.712"],
            ["360°", "2π ≈ 6.283"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why use radians instead of degrees?",
        "Mathematical elegance. The derivative of sin(x) is cos(x) only when x is in radians (in degrees, you get extra factors of π/180 cluttering the math). Calculus, physics, and engineering use radians for cleaner equations. Geometry textbooks often use degrees for accessibility."
      ),
      createFAQ(
        "How do I convert in code?",
        "Most languages: radians = degrees × Math.PI / 180. So 90 degrees in JavaScript: 90 * Math.PI / 180 = 1.5708. The reverse: degrees = radians × 180 / Math.PI."
      ),
    ],
    relatedTools: [
      { slug: "radians-to-degrees", label: "Radians to Degrees" },
      { slug: "degrees-to-gradians", label: "Degrees to Gradians" },
      { slug: "gradians-to-degrees", label: "Gradians to Degrees" },
    ],
  },
};
