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
};
