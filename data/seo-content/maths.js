// SEO content for maths and science tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const mathsSEO = {
  "mixed-numbers-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Is a Mixed Number?",
        "A mixed number combines a whole number and a fraction, such as 3 1/2 or 7 3/4. It represents a value greater than one whole. Mixed numbers are common in everyday life, from cooking measurements (2 1/2 cups of flour) to construction (a board that is 6 3/8 inches wide).",
        "To do arithmetic with mixed numbers, you typically convert them to improper fractions first. An improper fraction has a numerator larger than its denominator. For example, 3 1/2 becomes 7/2 (multiply 3 by 2 and add 1 for the numerator, keep the denominator). This calculator handles the conversion and arithmetic automatically."
      ),
      createAnswerFirstSection(
        "How to Add and Subtract Mixed Numbers",
        "To add mixed numbers, convert each to an improper fraction, find a common denominator, add the numerators, then simplify back to a mixed number. For example, 2 1/3 + 1 1/4: convert to 7/3 and 5/4, find common denominator 12, add 28/12 + 15/12 = 43/12, then simplify to 3 7/12.",
        "Subtraction works the same way. Convert to improper fractions, find a common denominator, subtract the numerators. If the result is an improper fraction, convert it back to a mixed number. This calculator shows each step so you can follow the working."
      ),
      createAnswerFirstSection(
        "How to Multiply and Divide Mixed Numbers",
        "To multiply mixed numbers, convert both to improper fractions and multiply straight across (numerator times numerator, denominator times denominator). For example, 2 1/2 times 1 1/3: convert to 5/2 and 4/3, multiply to get 20/6, then simplify to 3 2/6 which reduces to 3 1/3.",
        "To divide mixed numbers, convert to improper fractions, flip the second fraction (take the reciprocal), and multiply. For example, 3 1/2 divided by 1 1/4: convert to 7/2 and 5/4, flip to 7/2 times 4/5 = 28/10 = 2 4/5."
      ),
      {
        heading: "Quick Reference Examples",
        table: {
          headers: ["Calculation", "As Fractions", "Result"],
          rows: [
            ["1 1/2 + 2 1/4", "3/2 + 9/4", "3 3/4"],
            ["3 1/3 - 1 1/2", "10/3 - 3/2", "1 5/6"],
            ["2 1/2 x 1 1/3", "5/2 x 4/3", "3 1/3"],
            ["4 1/2 / 1 1/2", "9/2 / 3/2", "3"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I convert a mixed number to an improper fraction?",
        "Multiply the whole number by the denominator, add the numerator, and put the result over the original denominator. For example, 5 3/4: multiply 5 by 4 to get 20, add 3 to get 23. The improper fraction is 23/4."
      ),
      createFAQ(
        "What is the difference between a mixed number and an improper fraction?",
        "A mixed number has a whole part and a fraction part (like 3 1/2). An improper fraction has a numerator larger than or equal to its denominator (like 7/2). They represent the same value. Mixed numbers are easier to read, while improper fractions are easier to calculate with."
      ),
      createFAQ(
        "When would I use mixed numbers in real life?",
        "Mixed numbers appear in cooking (1 1/2 cups), DIY and woodworking (a 2 3/8 inch screw), telling the time (2 and a half hours), and measuring fabric or material. They are also common in primary and secondary school maths."
      ),
    ],
    relatedTools: [
      { slug: "fraction-calculator", label: "Fraction Calculator" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "decimal-to-fraction", label: "Decimal to Fraction" },
    ],
  },

  "sum-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Sum Calculator Works",
        "Paste any block of text containing numbers and the calculator instantly extracts every number it finds, then adds them all up. It handles messy input like receipts, bank statements, copied spreadsheet columns, or even paragraphs with numbers scattered throughout. You do not need to clean up your data first.",
        "The tool scans your input for valid numbers, ignoring letters, symbols, and formatting. It recognises decimals, negative numbers, and comma-separated thousands (like 1,250). Once extracted, it calculates the sum, average, minimum, maximum, and count of all detected values."
      ),
      createAnswerFirstSection(
        "Use Cases for Quick Summing",
        "The most common use is adding up a list of numbers without opening a spreadsheet. Paste a column of figures from a receipt, invoice, or bank statement and get an instant total. It is also useful for totalling scores, survey responses, or any data you have copied from a website or document.",
        "Compared to a spreadsheet, this tool requires zero setup. There are no cells to format, no formulas to write, and no file to save. Paste your numbers, see the result. It is ideal for one-off calculations where opening Excel or Google Sheets would be overkill."
      ),
      {
        heading: "Statistics Explained",
        table: {
          headers: ["Statistic", "What It Means", "Example (1, 5, 9)"],
          rows: [
            ["Sum", "Total of all numbers added together", "15"],
            ["Average (Mean)", "Sum divided by the count of numbers", "5"],
            ["Minimum", "The smallest number in the set", "1"],
            ["Maximum", "The largest number in the set", "9"],
            ["Count", "How many numbers were detected", "3"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can it extract numbers from messy text?",
        "Yes. Paste anything, including sentences, receipts, or copied tables. The tool uses pattern matching to find every number in the text and ignores everything else. It handles decimals, negatives, and thousands separators."
      ),
      createFAQ(
        "Does it work with negative numbers?",
        "Yes. Negative numbers (preceded by a minus sign) are detected and included in all calculations. This is useful for tallying transactions that include refunds or debits."
      ),
      createFAQ(
        "Why use this instead of a spreadsheet?",
        "For quick, one-off sums, this is faster. There is no file to create, no cells to select, and no formula to type. Paste your data, see the total instantly. For recurring or complex analysis, a spreadsheet is still the better choice."
      ),
    ],
    relatedTools: [
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "average-calculator", label: "Average Calculator" },
      { slug: "number-to-words", label: "Number to Words" },
    ],
  },

  "number-to-words": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Numbers to Words",
        "Type or paste any number and the tool instantly spells it out in words. It handles whole numbers, decimals, and negative values. Results are available in both British English and American English formats so you can use the correct style for your document.",
        "The conversion follows standard English number naming rules. Numbers are grouped into sets of three (hundreds, tens, units) and labelled with the appropriate scale word (thousand, million, billion, trillion). The tool supports numbers up to the trillions and beyond."
      ),
      createAnswerFirstSection(
        "UK vs US English Differences",
        "The main difference is the word 'and'. In British English, you say 'one hundred and twenty-three'. In American English, the 'and' is typically omitted, giving 'one hundred twenty-three'. Both are correct in their respective regions, but using the wrong convention can look out of place in formal documents.",
        "Another subtle difference is the naming of large numbers. Both the UK and US now use the short scale (billion = 1,000,000,000), but older British usage followed the long scale where billion meant a million million. This tool uses the modern short scale for both variants."
      ),
      createAnswerFirstSection(
        "Common Uses for Number to Words Conversion",
        "The most common use is writing cheques, where the amount must be spelled out to prevent fraud. Legal documents, contracts, and invoices also frequently require numbers written in words for clarity and to avoid disputes over ambiguous figures.",
        "Teachers and students use it for checking homework and learning number names. Content writers use it when style guides require numbers above or below a certain threshold to be spelled out in articles and reports."
      ),
      {
        heading: "Example Conversions",
        table: {
          headers: ["Number", "British English", "American English"],
          rows: [
            ["100", "one hundred", "one hundred"],
            ["1,000", "one thousand", "one thousand"],
            ["1,500", "one thousand, five hundred", "one thousand, five hundred"],
            ["1,234,567", "one million, two hundred and thirty-four thousand, five hundred and sixty-seven", "one million, two hundred thirty-four thousand, five hundred sixty-seven"],
            ["1,000,000", "one million", "one million"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between British and American number words?",
        "British English includes the word 'and' before the tens and units (for example, 'two hundred and fifty'). American English omits it ('two hundred fifty'). Both are correct in their respective regions."
      ),
      createFAQ(
        "Why do cheques require numbers written in words?",
        "Writing the amount in words alongside the numerical amount provides a safeguard against fraud. It is much harder to alter a written word than to add a digit to a number. If the two amounts do not match, the bank can flag the cheque for review."
      ),
      createFAQ(
        "What is the largest number this tool can convert?",
        "The tool handles numbers well into the trillions. For most practical purposes, including cheques, legal documents, and invoices, the supported range is more than sufficient."
      ),
    ],
    relatedTools: [
      { slug: "sum-calculator", label: "Sum Calculator" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "roman-numeral-converter", label: "Roman Numeral Converter" },
    ],
  },

  "area-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Six Shape Formulas in One Place",
        "Most area problems boil down to one of six formulas. A rectangle is length × width. A triangle is ½ × base × height (the half is what trips people up). A circle is πr². A trapezium uses ((a + b) / 2) × h, where a and b are the parallel sides. An ellipse is π × a × b, with a and b as the semi-axes. A parallelogram, despite the slanted look, is just base × height (perpendicular height, not the slanted side).",
        "The most common mistake is using the slanted edge of a triangle or parallelogram as the height. Height always means perpendicular distance between the base and the opposite side or vertex. If you only have the slanted edge, you need a bit of trigonometry first; the [Trigonometry Calculator](/trigonometry-calculator) will give you the perpendicular component from the angle."
      ),
      createAnswerFirstSection(
        "Working Out Skirting Board, Tiles, or Flooring",
        "Most real-world area maths comes from buying enough material to cover a room. Measure the floor as a rectangle, then add 10% for cuts and waste. If the room is L-shaped, split it into two rectangles, work out each one, and add them together. Awkwardly shaped rooms (a bay window, a chimney breast notch) are easiest to handle by triangulating: break them into rectangles and triangles, calculate each area, then sum.",
        "When the perimeter matters, not the area (skirting board, coving, edging tape), you want length around the outside, which is just the sum of the sides. Do not confuse the two; ordering 30 m of skirting because the floor is 30 m² is how people end up two trips deep into the local DIY shop."
      ),
      {
        heading: "Common Shape Formulas",
        table: {
          headers: ["Shape", "Formula", "Example"],
          rows: [
            ["Rectangle", "l × w", "5 × 3 = 15"],
            ["Triangle", "½ × b × h", "½ × 6 × 4 = 12"],
            ["Circle", "π × r²", "π × 5² ≈ 78.54"],
            ["Trapezium", "((a + b) / 2) × h", "((4 + 6) / 2) × 3 = 15"],
            ["Ellipse", "π × a × b", "π × 4 × 2 ≈ 25.13"],
            ["Parallelogram", "b × h", "6 × 4 = 24"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I find the area of an irregular shape?",
        "Split it into shapes you recognise. Most awkward floor plans break cleanly into two or three rectangles plus a triangle for any diagonal corner. Calculate each piece, add the results. For genuinely curved outlines, the grid method works: overlay a grid, count full squares, then estimate partial squares as halves."
      ),
      createFAQ(
        "Why does the triangle formula have a ½ in it?",
        "A triangle is exactly half of the rectangle that surrounds it (with the same base and height). That is where the ½ comes from. Drawing it out helps: a triangle inscribed in a rectangle, base × height, divided by two."
      ),
      createFAQ(
        "Should I use metres or feet?",
        "Use whatever units the materials are sold in. UK flooring and carpet are normally priced per square metre, so work in metres. American or imported timber and some DIY products are priced per square foot. The calculator switches between the two so you can match the supplier."
      ),
      createFAQ(
        "What is the difference between perimeter and area?",
        "Perimeter is the distance around the outside (used for skirting, fencing, edging). Area is the space inside (used for paint, tiles, carpet). They use different formulas and come in different units: perimeter in metres or feet, area in square metres or square feet."
      ),
    ],
    relatedTools: [
      { slug: "volume-calculator", label: "Volume Calculator" },
      { slug: "trigonometry-calculator", label: "Trigonometry Calculator" },
      { slug: "tile-calculator", label: "Tile Calculator" },
    ],
  },

  "cubic-feet-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Cubic Feet Are Calculated",
        "Cubic feet is just length × width × height with all three measurements in feet. A box that is 2 ft × 3 ft × 4 ft has a volume of 24 cubic feet. The formula does not change for shipping crates, fridges, storage units, or moving boxes; the only thing that changes is which units your dimensions started in.",
        "If you measure in inches, divide each dimension by 12 before multiplying (or multiply your final answer by 1/1728, since 12³ = 1728). If you measure in centimetres, divide each by 30.48. The calculator handles all of this automatically, but the conversion factors are worth knowing if you ever do it on the back of an envelope."
      ),
      createAnswerFirstSection(
        "When You Actually Need Cubic Feet",
        "Three common scenarios. First, shipping: international freight quotes use cubic feet (or cubic metres) to work out volumetric weight, which is often more than the actual weight for bulky-but-light items. Second, moving home: removal companies estimate van size in cubic feet, and a typical UK three-bedroom house clears around 1,000 cubic feet. Third, storage units: a 10×10 ft unit with an 8 ft ceiling is 800 cubic feet, and most facilities quote sizes in floor area only, leaving you to multiply by ceiling height yourself.",
        "Refrigerator and freezer capacity is also given in cubic feet (or litres), which is useful if you are comparing a US-spec fridge to a UK one. Multiply cubic feet by 28.3168 to get litres. A 20 cubic foot American fridge is roughly 566 litres, considerably bigger than the typical 300-litre UK fridge."
      ),
      {
        heading: "Cubic Feet to Other Units",
        table: {
          headers: ["From 1 cubic foot", "Equivalent"],
          rows: [
            ["Cubic metres", "0.0283"],
            ["Cubic yards", "0.037"],
            ["Cubic inches", "1,728"],
            ["Litres", "28.3168"],
            ["US gallons", "7.4805"],
            ["UK gallons", "6.2288"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many cubic feet is a typical moving box?",
        "Small moving boxes are around 1.5 cubic feet, medium boxes 3, and large boxes 4.5. Wardrobe boxes are bigger again, around 12 cubic feet. A standard removal van of 400 cubic feet holds about 80 medium boxes, plus the gaps for furniture."
      ),
      createFAQ(
        "How do I convert cubic feet to cubic metres?",
        "Multiply cubic feet by 0.0283. So 100 cubic feet is 2.83 cubic metres. The reverse is multiplying cubic metres by 35.31. Most UK removal companies will quote in either, so it is useful to be able to flip between them."
      ),
      createFAQ(
        "Why is volumetric weight different from actual weight?",
        "Couriers and freight companies charge by whichever is greater: actual weight, or volumetric weight (a calculation based on how much space your shipment takes up). Light, bulky items (like duvets or polystyrene) are charged on volume because they fill the lorry without filling its weight limit."
      ),
      createFAQ(
        "Does the shape matter, or only the dimensions?",
        "This calculator assumes a rectangular cuboid (a box). For cylinders, spheres, and other 3D shapes, use the [Volume Calculator](/volume-calculator), which handles the right formulas. Irregular shapes can be approximated by splitting them into cuboids and adding the results."
      ),
    ],
    relatedTools: [
      { slug: "volume-calculator", label: "Volume Calculator" },
      { slug: "litres-to-gallons", label: "Litres to Gallons" },
      { slug: "metres-to-feet", label: "Metres to Feet" },
    ],
  },

  "fraction-calculator": {
    sections: [
      createAnswerFirstSection(
        "Adding, Subtracting, Multiplying, and Dividing Fractions",
        "The four operations follow predictable rules. To add or subtract, find a common denominator first, then add or subtract the numerators. To multiply, multiply the numerators and denominators straight across. To divide, flip the second fraction (its reciprocal) and multiply. The calculator shows each step so you can see where the working comes from rather than just the answer.",
        "Common denominators are the bit students get stuck on. The quick method: multiply the two denominators together (1/4 + 1/6 → use 24). The cleaner method: find the lowest common multiple. For 4 and 6, the LCM is 12, so 1/4 + 1/6 = 3/12 + 2/12 = 5/12. The lowest common multiple keeps the numbers smaller and saves simplifying at the end."
      ),
      createAnswerFirstSection(
        "Lowest Terms vs Improper Fractions vs Mixed Numbers",
        "Every fraction has three valid forms. The improper fraction (7/4), the mixed number (1 3/4), and the lowest-terms version (already done in this case, since 7 and 4 share no common factors). Exam mark schemes usually want the answer in lowest terms, often as a mixed number unless an improper fraction is specifically asked for.",
        "To simplify, divide top and bottom by their greatest common divisor. For 18/24, the GCD is 6, so 18/24 = 3/4. For more on factors, the [Greatest Common Factor Calculator](/greatest-common-factor-calculator) explains the underlying maths. The calculator on this page automatically returns the simplified form, the improper version, the mixed number, and the decimal equivalent so you can pick whichever the question wants."
      ),
      {
        heading: "Worked Examples",
        table: {
          headers: ["Operation", "Working", "Result"],
          rows: [
            ["1/2 + 1/3", "3/6 + 2/6", "5/6"],
            ["3/4 - 1/6", "9/12 - 2/12", "7/12"],
            ["2/3 × 3/5", "(2 × 3) / (3 × 5)", "6/15 = 2/5"],
            ["3/4 ÷ 1/2", "3/4 × 2/1", "6/4 = 3/2 = 1 1/2"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why do I need a common denominator to add fractions?",
        "Fractions represent parts of a whole, and you can only add parts of the same size. Thirds and quarters are different-sized pieces; you have to convert both to twelfths (or another common size) before you can sensibly add them. Multiplication does not have this problem because you are scaling, not combining."
      ),
      createFAQ(
        "What is the difference between a mixed number and an improper fraction?",
        "A mixed number has a whole part and a fractional part (1 3/4). An improper fraction has a numerator larger than its denominator (7/4). They are the same value, written differently. Mixed numbers are easier to read; improper fractions are easier to calculate with."
      ),
      createFAQ(
        "How do I divide one fraction by another?",
        "Multiply by the reciprocal of the second fraction. So 3/4 ÷ 2/5 becomes 3/4 × 5/2 = 15/8. The phrase 'keep, change, flip' is the standard mnemonic: keep the first fraction, change ÷ to ×, flip the second."
      ),
      createFAQ(
        "Can I work with negative fractions?",
        "Yes. The sign goes with the whole fraction, not just the top or bottom. -1/2 + 1/4 = -2/4 + 1/4 = -1/4. The calculator accepts a minus sign on the numerator and treats the result accordingly."
      ),
    ],
    relatedTools: [
      { slug: "mixed-numbers-calculator", label: "Mixed Numbers Calculator" },
      { slug: "greatest-common-factor-calculator", label: "Greatest Common Factor Calculator" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
    ],
  },

  "logarithm-calculator": {
    sections: [
      createAnswerFirstSection(
        "What a Logarithm Actually Is",
        "A logarithm answers the question: 'what power do I raise this base to in order to get this number?' log₁₀(1000) = 3 because 10³ = 1000. log₂(8) = 3 because 2³ = 8. ln(x) is shorthand for log base e, where e ≈ 2.71828. The natural log shows up in growth and decay problems because e is the base of continuous compounding.",
        "If your calculator only has log10 and ln but you need a different base, use the change of base formula: log_b(x) = ln(x) / ln(b), or equivalently log(x) / log(b). So log₅(625) = log(625) / log(5) = 2.7959 / 0.6990 = 4. The calculator on this page handles any base directly so you do not have to do the conversion by hand."
      ),
      createAnswerFirstSection(
        "When You Meet Logs in Real Problems",
        "A-level students hit logs first when solving exponential equations like 2^x = 50. Take the log of both sides, drop the exponent down using the power rule, divide. log(2^x) = log(50), so x × log(2) = log(50), so x = log(50) / log(2) ≈ 5.644. That is the calculation behind every compound interest doubling-time, every radioactive decay half-life, every population growth model.",
        "Logs are also the basis of the decibel scale (sound), the Richter scale (earthquakes), and pH (chemistry). All three compress huge ranges into manageable numbers. A 6.0 earthquake releases 31.6 times more energy than a 5.0, because the scale is logarithmic in base 10. If you ever need very large or very small numbers in compact form, [Scientific Notation Converter](/scientific-notation-converter) handles the related job of expressing them as a × 10^n."
      ),
      {
        heading: "Common Logarithm Values",
        table: {
          headers: ["Expression", "Meaning", "Value"],
          rows: [
            ["log₁₀(100)", "10^? = 100", "2"],
            ["log₁₀(1000)", "10^? = 1000", "3"],
            ["log₂(64)", "2^? = 64", "6"],
            ["ln(e)", "e^? = e", "1"],
            ["ln(1)", "e^? = 1", "0"],
            ["log₅(625)", "5^? = 625", "4"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between log and ln?",
        "On most calculators, 'log' means log base 10 and 'ln' means log base e (natural log). On some scientific calculators and in computer science contexts, 'log' may default to log base 2. The calculator here lets you pick the base explicitly so there is no ambiguity."
      ),
      createFAQ(
        "Why can I not take the log of zero or a negative number?",
        "There is no power you can raise a positive base to that produces zero or a negative result. 10^x is always positive for any real x. So log(0) and log(-5) are undefined in the real numbers. (In complex analysis, you can extend the definition, but that is well past the level of a standard calculator.)"
      ),
      createFAQ(
        "What is the change of base formula?",
        "log_b(x) = log_a(x) / log_a(b), where a is any base your calculator already knows. Most use a = 10 or a = e. So log₇(50) = ln(50) / ln(7) ≈ 3.912 / 1.946 ≈ 2.011. Useful when your calculator is hardcoded to log10 and ln only."
      ),
      createFAQ(
        "What is an antilog?",
        "The inverse of a logarithm. If log_b(x) = y, then antilog_b(y) = x. So if log₁₀(x) = 2, then x = 10² = 100. The antilog button on a calculator is essentially 10^x or e^x depending on which log you used."
      ),
    ],
    relatedTools: [
      { slug: "scientific-notation-converter", label: "Scientific Notation Converter" },
      { slug: "trigonometry-calculator", label: "Trigonometry Calculator" },
      { slug: "quadratic-equation-solver", label: "Quadratic Equation Solver" },
    ],
  },

  "percentage-calculator": {
    sections: [
      createAnswerFirstSection(
        "The Four Percentage Calculations You Actually Use",
        "Almost every percentage problem fits one of four shapes. What is X% of Y? (15% of £80 = £12.) X is what % of Y? (£12 is what % of £80? = 15%.) Percentage change from old to new ((new - old) / old × 100). And increase or decrease a value by a percentage (£80 increased by 15% = £92). The calculator gives you all four side by side so you do not have to remember which formula goes with which question.",
        "The single most common mistake is confusing 'percentage of' with 'percentage change'. £100 increased by 25% is £125; £125 decreased by 25% is £93.75, not £100. Percentage change is asymmetric because the base shifts. To reverse a 20% increase, you decrease by 16.67% (because 1 / 1.2 = 0.833)."
      ),
      createAnswerFirstSection(
        "VAT, Tips, Discounts, and Pay Rises",
        "Adding 20% VAT to a £50 net price: 50 × 1.2 = £60. Removing 20% VAT from a £60 gross price: 60 / 1.2 = £50 (not 60 × 0.8, which gives £48 and is the wrong answer). A 15% tip on a £40 meal: 40 × 1.15 = £46. A 30% sale discount on a £80 jumper: 80 × 0.7 = £56. A 4% pay rise on a £35,000 salary: 35,000 × 1.04 = £36,400.",
        "When you have multiple percentages stacked, calculate them one at a time. A 20% discount followed by an extra 10% off is not 30% off; it is 1 - (0.8 × 0.9) = 28% off. The order does not matter as long as you multiply the multipliers together. If the calculation involves your salary, [UK Tax Calculator](/uk-tax-calculator) handles the rest of the deductions."
      ),
      {
        heading: "Common Percentage Calculations",
        table: {
          headers: ["Question", "Calculation", "Answer"],
          rows: [
            ["20% of £150", "150 × 0.20", "£30"],
            ["£45 is what % of £180?", "(45 / 180) × 100", "25%"],
            ["Change from 80 to 100", "((100 - 80) / 80) × 100", "+25%"],
            ["£200 + 17.5%", "200 × 1.175", "£235"],
            ["Remove 20% VAT from £120", "120 / 1.20", "£100"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I work out a percentage in my head?",
        "Find 10% first by dividing by 10, then scale. 15% of £80: 10% is £8, half of that is £4, so 15% is £12. 25% of anything is the same as dividing by 4. 5% is half of 10%. Stacking these mental steps usually gets you to a sensible answer faster than typing it in."
      ),
      createFAQ(
        "Why is removing a percentage not the same as the negative version?",
        "Because the base changes. £120 minus 20% VAT means the £120 already includes the VAT. The original net was 120 / 1.2 = £100, not 120 × 0.8 = £96. Always think about whether the percentage is being added on top or already baked in."
      ),
      createFAQ(
        "What is the difference between percentage change and percentage difference?",
        "Percentage change has a clear before and after (a 20% pay rise from £30,000 to £36,000). Percentage difference compares two values without one being the baseline (the difference between £30,000 and £36,000 as a percentage of their average is about 18.18%). Use change for time-based comparisons, difference for symmetrical ones."
      ),
      createFAQ(
        "How do I add 20% VAT correctly?",
        "Multiply the net price by 1.20. £50 × 1.20 = £60. To remove VAT from a gross price, divide by 1.20: £60 / 1.20 = £50. The common slip is multiplying by 0.80 to remove VAT, which gives the wrong answer."
      ),
    ],
    relatedTools: [
      { slug: "percent-change-calculator", label: "Percentage Change Calculator" },
      { slug: "percentage-increase-calculator", label: "Percentage Increase Calculator" },
      { slug: "fraction-calculator", label: "Fraction Calculator" },
    ],
  },

  "random-number-generator": {
    sections: [
      createAnswerFirstSection(
        "How Random Numbers Are Actually Generated",
        "Computers cannot produce truly random numbers. What they produce are pseudorandom numbers, generated by an algorithm that takes a seed and outputs a sequence so statistically uniform that you cannot tell it from random without running the same algorithm yourself. JavaScript's Math.random() typically uses a variant of Mersenne Twister or xorshift, which are fine for everyday use but predictable enough that you should not rely on them for security.",
        "When you do need cryptographic randomness (passwords, tokens, lottery picks where fairness is auditable), the browser exposes crypto.getRandomValues(), which pulls from the operating system's entropy pool. For a raffle or a homework spinner, Math.random() is plenty. For anything where someone could financially benefit from predicting the next number, use the crypto API or a server-side generator."
      ),
      createAnswerFirstSection(
        "Common Uses Beyond Picking Names",
        "Teachers use random number generators to pick a student to answer, choose pairs for group work, or shuffle question order on a printout. Game masters use them for dice rolls when running a tabletop campaign without physical dice. Statisticians use them to draw simple random samples from a list. Researchers use them for assigning participants to control or treatment groups, where any predictable pattern would bias the results.",
        "Two settings matter most. Allow duplicates: turn this on if you want each draw independent (rolling dice repeatedly), off if you want unique picks (drawing 10 names from 30 students without repeating). Range: set the min and max carefully; the calculator includes both endpoints. For random selection from a fixed list of names rather than numbers, [Random Name Picker](/random-name-picker) does the same job with text input."
      ),
      {
        heading: "Generator Settings",
        table: {
          headers: ["Setting", "What It Does", "When to Use"],
          rows: [
            ["Min and Max", "Range of possible numbers (inclusive)", "Set bounds for the draw"],
            ["Quantity", "How many numbers to generate", "1 for a single pick, more for a sample"],
            ["Allow duplicates", "Same number can appear twice", "Dice rolls, repeated draws"],
            ["Decimals", "Generate decimal values, not just integers", "Statistical simulations"],
            ["Precision", "How many decimal places", "Match the precision of your data"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are these numbers really random?",
        "They are pseudorandom. The output is statistically indistinguishable from random for any everyday use, but it is generated by an algorithm and could theoretically be replayed if you knew the seed. For lotteries, raffles, or anything you need to defend the fairness of, a cryptographic source (or a physical method, like drawing names from a hat) is safer."
      ),
      createFAQ(
        "How do I generate a number between 1 and 100?",
        "Set the minimum to 1 and the maximum to 100, with quantity 1. Both ends of the range are inclusive, so you might see a 1 or a 100. If you want unique picks (no repeats), turn off 'allow duplicates' and set the quantity to however many you want."
      ),
      createFAQ(
        "Can I use this for dice?",
        "Yes; switch to dice mode and pick the number of sides. Standard tabletop dice are d4, d6, d8, d10, d12, d20, and d100 (two d10s read together). The tool can roll multiple at once and shows each individual roll plus the total, which is what you want for damage rolls or initiative in role-playing games."
      ),
      createFAQ(
        "Why should I not use this for a real lottery or competition?",
        "Math.random() is deterministic given its seed, and a determined party could in theory replay your draws. For real prize draws, regulators usually require either a physical method (drum, ping-pong balls) or a certified random number service that produces an audit trail. For class raffles and birthday party games, this is fine."
      ),
    ],
    relatedTools: [
      { slug: "dice-roller", label: "Dice Roller" },
      { slug: "coin-flip", label: "Coin Flip" },
      { slug: "random-name-picker", label: "Random Name Picker" },
    ],
  },

  "screen-size-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why a 32-Inch Screen Is Not Twice the Size of a 16-Inch",
        "Screen size is measured along the diagonal, but what you actually see is the area, which scales with the square of the diagonal. A 32-inch 16:9 monitor is roughly four times the area of a 16-inch one, not twice. This is the most common mistake when people compare screens. Doubling the diagonal quadruples the surface area, which is why upgrading from a 24-inch to a 27-inch feels like more of a jump than the numbers suggest.",
        "The calculator works backwards from diagonal and aspect ratio to give you actual width and height in inches and centimetres, plus the visible area. For a 27-inch 16:9 monitor: width 23.53 inches, height 13.24 inches, area 311.6 square inches. A 32-inch 16:9 is 27.89 × 15.69 inches, area 437.6 square inches; about 40% larger, not 18%."
      ),
      createAnswerFirstSection(
        "Aspect Ratio Changes the Picture",
        "Two screens with the same diagonal but different aspect ratios are very different. A 34-inch 21:9 ultrawide and a 34-inch 16:9 monitor share a diagonal but the ultrawide is wider and shorter; the 16:9 is taller. For desk gaming, the ultrawide gives a more immersive horizontal field of view. For coding or document work, a 16:10 (more vertical pixels for the same diagonal) often beats 16:9 because you can see more lines of code or text without scrolling.",
        "TVs are almost always 16:9, so cross-comparisons are straightforward. Laptop screens vary: 16:9 is common, 16:10 is making a comeback, and Apple's 14-inch and 16-inch MacBooks use a slightly taller ratio. The [Aspect Ratio Calculator](/aspect-ratio-calculator) is the right tool when you want to find the third number from a known ratio (e.g. how tall a 1920px wide image is at 16:9)."
      ),
      {
        heading: "Common Monitor and TV Dimensions",
        table: {
          headers: ["Diagonal", "Aspect", "Width", "Height", "Area (in²)"],
          rows: [
            ["24\"", "16:9", "20.92\"", "11.77\"", "246.2"],
            ["27\"", "16:9", "23.53\"", "13.24\"", "311.6"],
            ["32\"", "16:9", "27.89\"", "15.69\"", "437.6"],
            ["34\"", "21:9", "31.36\"", "13.44\"", "421.5"],
            ["55\"", "16:9", "47.94\"", "26.97\"", "1,293"],
            ["65\"", "16:9", "56.66\"", "31.87\"", "1,805"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How big is a 27-inch monitor in cm?",
        "A 27-inch 16:9 monitor is roughly 59.8 cm wide, 33.6 cm tall, with a 68.6 cm diagonal. Add a couple of cm on each side for the bezel and stand. Useful when checking it will actually fit on your desk before ordering."
      ),
      createFAQ(
        "Is a curved screen measured the same way?",
        "Yes; the diagonal is still measured corner to corner along the screen surface, the same as a flat one. Curvature affects perceived size and field of view but not the manufacturer's stated diagonal. A 34-inch curved is the same nominal size as a 34-inch flat."
      ),
      createFAQ(
        "What is the difference between 16:9 and 16:10?",
        "16:10 is taller for the same width. A 24-inch 16:10 is 12.71 inches tall versus 11.77 inches for 16:9; about an inch more vertical space. That extra room is useful for office work and code, less so for video, which is mostly produced in 16:9."
      ),
      createFAQ(
        "Why does a 27-inch monitor fit two A4 pages but a 24-inch does not, comfortably?",
        "Two A4 pages side by side at 100% need roughly 21 cm × 2 = 42 cm of horizontal space. A 24-inch 16:9 is 53 cm wide; technically enough, but with browser chrome and toolbars eaten away. A 27-inch 16:9 is 59.8 cm wide, which leaves enough margin for tabs, scroll bars, and a comfortable reading zoom."
      ),
    ],
    relatedTools: [
      { slug: "aspect-ratio-calculator", label: "Aspect Ratio Calculator" },
      { slug: "area-calculator", label: "Area Calculator" },
      { slug: "cm-to-inches", label: "Cm to Inches" },
    ],
  },

  "trigonometry-calculator": {
    sections: [
      createAnswerFirstSection(
        "SOH CAH TOA, Then the Reciprocals",
        "In a right-angled triangle: sine of an angle is opposite over hypotenuse, cosine is adjacent over hypotenuse, tangent is opposite over adjacent. SOH CAH TOA. The reciprocals are less famous but show up in A-level work: cosec (csc) = 1/sin, secant = 1/cos, cotangent = 1/tan. The calculator returns all six functions for any angle in degrees or radians.",
        "Special angles are worth memorising because they come up constantly: sin 30° = 1/2, cos 60° = 1/2, sin 45° = cos 45° = √2/2, tan 45° = 1, sin 60° = √3/2. The calculator marks these as special when you hit one. For converting between degrees and radians directly, [Angle Converter](/angle-converter) is the dedicated tool, though this one switches between the two for input."
      ),
      createAnswerFirstSection(
        "Where Tan Goes Undefined",
        "tan(90°) and tan(270°) are undefined because cos(90°) = cos(270°) = 0, and tan = sin/cos. You will see 'undefined' rather than a number. Likewise, cosec is undefined at 0° and 180° (where sin is zero), and secant is undefined at 90° and 270° (where cos is zero). These are not bugs; they are mathematical realities the calculator surfaces explicitly so you do not get confused by an Infinity result.",
        "An A-level question stuck on log identities is often better tackled in stages: simplify with identities first (sin² + cos² = 1, tan = sin/cos, double-angle formulas), then plug numbers in at the end. If the question asks for an exact value, leave answers as surds (√3/2, not 0.866). The calculator gives decimal values to six places, which is precise enough for any practical bearing, surveying, or engineering problem."
      ),
      {
        heading: "Common Angles",
        table: {
          headers: ["Angle", "sin", "cos", "tan"],
          rows: [
            ["0°", "0", "1", "0"],
            ["30°", "0.5", "0.8660", "0.5774"],
            ["45°", "0.7071", "0.7071", "1"],
            ["60°", "0.8660", "0.5", "1.7321"],
            ["90°", "1", "0", "undefined"],
            ["180°", "0", "-1", "0"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between degrees and radians?",
        "Degrees split a full circle into 360 parts. Radians split it into 2π (about 6.28) parts. 180° = π radians. Radians are the natural unit for calculus and physics; degrees are more intuitive for everyday angles. Pick whichever your problem is set in and stay consistent."
      ),
      createFAQ(
        "Why is tan(90°) undefined?",
        "Tan is sin divided by cos, and cos(90°) = 0. You cannot divide by zero. As an angle approaches 90°, tan grows without bound (tan(89.99°) ≈ 5,729). At exactly 90° it is undefined."
      ),
      createFAQ(
        "What does SOH CAH TOA mean?",
        "It is the standard mnemonic for the three primary trig ratios. Sine = Opposite over Hypotenuse, Cosine = Adjacent over Hypotenuse, Tangent = Opposite over Adjacent. It only applies to right-angled triangles directly; for other triangles, use the sine rule or cosine rule."
      ),
      createFAQ(
        "How do I find an angle from a sine value?",
        "Use inverse sine, written sin⁻¹ or arcsin. If sin(θ) = 0.5, then θ = sin⁻¹(0.5) = 30°. Most calculators have inverse buttons next to sin, cos, and tan. Be aware the inverse functions only return angles in a restricted range (sin⁻¹: -90° to 90°, cos⁻¹: 0° to 180°), so check whether the original problem expects a different one."
      ),
    ],
    relatedTools: [
      { slug: "angle-converter", label: "Angle Converter" },
      { slug: "pythagorean-theorem-calculator", label: "Pythagorean Theorem Calculator" },
      { slug: "logarithm-calculator", label: "Logarithm Calculator" },
    ],
  },

  "volume-calculator": {
    sections: [
      createAnswerFirstSection(
        "Volume Formulas for the Six Standard Shapes",
        "Cube: a³, where a is the side length. Rectangular prism (a regular box): l × w × h. Sphere: (4/3)πr³. Cylinder: πr²h. Cone: (1/3)πr²h. Pyramid: (1/3) × base area × h. The pattern worth noticing: cones are always one-third of the cylinder they would fit inside, and pyramids are always one-third of the prism they would fit inside. Spheres are two-thirds of the cylinder that surrounds them.",
        "Real measurements rarely come in neat units. The calculator works in centimetres, then converts to cubic metres and litres automatically (1 litre = 1,000 cm³ = 0.001 m³). For an aquarium that is 80 cm × 35 cm × 40 cm, that is 112,000 cm³ = 112 litres of water capacity, before you subtract for substrate and decoration."
      ),
      createAnswerFirstSection(
        "Aquariums, Pools, and Pots",
        "Aquarium owners want litres so they can pick the right filter and heater. A 60 cm × 30 cm × 36 cm tank is 64,800 cm³ = 64.8 litres. Subtract about 10% for substrate and rocks, so plan filtration for around 58 litres of actual water. Pool owners want cubic metres for chemical dosing; a 3 m × 6 m rectangular pool with an average depth of 1.4 m is 25.2 m³, which gives you a starting figure for chlorine and pH adjusters.",
        "Cylindrical pots, planters, and water tanks are the most common non-rectangular case. Volume = π × r² × h. A 30 cm diameter pot (radius 15 cm) that is 25 cm tall is π × 15² × 25 = 17,671 cm³ = 17.7 litres of compost. For shipping or storage in feet rather than centimetres, [Cubic Feet Calculator](/cubic-feet-calculator) is the one to use."
      ),
      {
        heading: "Volume Formulas at a Glance",
        table: {
          headers: ["Shape", "Formula", "Example (10 cm sides/radius)"],
          rows: [
            ["Cube", "a³", "1,000 cm³"],
            ["Sphere", "(4/3)πr³", "4,189 cm³"],
            ["Cylinder", "πr²h", "3,142 cm³"],
            ["Cone", "(1/3)πr²h", "1,047 cm³"],
            ["Pyramid", "(1/3) × b × h", "depends on base"],
            ["Prism", "l × w × h", "1,000 cm³"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How many litres in a cubic metre?",
        "Exactly 1,000. So a 2 m³ water tank holds 2,000 litres. Useful for sizing rainwater butts, hot tubs, and koi ponds. Going the other way: 1 litre = 0.001 m³ = 1,000 cm³."
      ),
      createFAQ(
        "Why is a cone exactly one-third of a cylinder?",
        "Geometrically, you can fit exactly three cones inside a cylinder of the same base and height; this can be demonstrated with water, sand, or rice in physical models. The same one-third relationship holds between any pyramid and the prism that surrounds it. It comes out of the calculus of integration, but the intuition is the simple sand-pouring experiment."
      ),
      createFAQ(
        "How do I find the volume of an irregular shape?",
        "If it is solid and small enough, use water displacement: drop it into a measuring jug and read off the rise in volume (1 ml = 1 cm³). If it is too big, decompose it into shapes you can calculate: a stepped pond is two rectangular prisms stacked; an L-shaped room split into two rectangles, then multiplied by ceiling height."
      ),
      createFAQ(
        "What is the difference between volume and capacity?",
        "Volume is the space something occupies (in cm³ or m³). Capacity is how much liquid it can hold (in litres or millilitres). For containers they are essentially the same thing; for solid objects only volume applies. 1 litre of capacity equals 1,000 cm³ of internal volume."
      ),
    ],
    relatedTools: [
      { slug: "cubic-feet-calculator", label: "Cubic Feet Calculator" },
      { slug: "area-calculator", label: "Area Calculator" },
      { slug: "trigonometry-calculator", label: "Trigonometry Calculator" },
    ],
  },

  "standard-deviation-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Standard Deviation Calculator",
        "Paste your dataset into the input box. The calculator accepts numbers separated by commas, spaces, or new lines (so you can drop a column straight from a spreadsheet without reformatting). It works out the count, mean, median, mode, range, variance and standard deviation, and shows where the data sits within one, two and three standard deviations of the mean.",
        "Pick population or sample mode at the top. Population uses divisor n; sample uses divisor n-1 (Bessel's correction). The difference matters for small datasets and almost vanishes for large ones. Most real-world statistics, including pretty much every survey, every controlled experiment, and every test from a class of pupils, are samples drawn from a wider population, so sample standard deviation is the safer default unless you genuinely have every value in the population."
      ),
      createAnswerFirstSection(
        "What Standard Deviation Actually Measures",
        "Standard deviation tells you how spread out a set of numbers is around the mean. A small standard deviation means most values are clustered tightly around the average; a large one means they're scattered widely. Two datasets can share the same mean and look completely different in shape. Class A scoring 70, 70, 70, 70, 70 has a mean of 70 and a standard deviation of 0. Class B scoring 40, 55, 70, 85, 100 also has a mean of 70 but a standard deviation of about 23. The mean alone hides this entirely.",
        "The formula is sqrt(sum((x - mean)^2) / n) for population, or sqrt(sum((x - mean)^2) / (n-1)) for sample. You square the deviations to make negatives positive (otherwise they'd cancel), average them to get variance, then square-root to bring the units back to the original scale. The 68-95-99.7 rule says that for a normal distribution, roughly 68% of values fall within 1 SD of the mean, 95% within 2 SDs, and 99.7% within 3 SDs."
      ),
      {
        heading: "Worked Example: Test Scores",
        table: {
          headers: ["Score", "Difference from mean", "Squared difference"],
          rows: [
            ["62", "-8", "64"],
            ["68", "-2", "4"],
            ["70", "0", "0"],
            ["72", "+2", "4"],
            ["78", "+8", "64"],
            ["Mean = 70", "Sum = 0", "Sum = 136"],
            ["", "Population SD = sqrt(136/5) = 5.22", "Sample SD = sqrt(136/4) = 5.83"],
          ],
        },
      },
      createAnswerFirstSection(
        "When You'd Want to Know the Standard Deviation",
        "Comparing consistency. Two football pundits make scoring predictions; whichever has the lower SD between predicted and actual scores is more reliable, even if their averages are similar. Quality control. A factory wants its product weights to cluster tightly around the target; rising SD signals a problem on the line before any single weight goes badly wrong. Investment risk. Standard deviation of monthly returns is the textbook definition of volatility; a fund with low SD is steady, a fund with high SD swings.",
        "It's also the basis of z-scores, where a value is reported as 'X standard deviations above or below the mean'. A z-score of 0 is exactly average; a score of +2 means well above average (about top 2.5% if the data is normally distributed); a score of -3 means very far below. For more on combinations, sequences and core statistics, see the [Probability Calculator](/probability-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "Should I use population or sample standard deviation?",
        "Use sample SD (divide by n-1) when your data is a sample from a larger population, which is almost always the case in social science, business analytics, opinion polls and class results. Use population SD (divide by n) only when you have literally measured every member of the population, like every employee at a small company on a specific day."
      ),
      createFAQ(
        "Why divide by n-1 for sample standard deviation?",
        "It's called Bessel's correction. When you calculate variance from a sample, the sample mean is itself an estimate (not the true population mean), and using it slightly underestimates the true variance. Dividing by n-1 instead of n inflates the answer just enough to remove the bias. The effect is large for small samples (10 vs 9 changes the result by 10%) and tiny for large samples (1000 vs 999 changes it by 0.1%)."
      ),
      createFAQ(
        "What does a standard deviation of zero mean?",
        "Every value in the dataset is identical. This is rare with real measurements (there's almost always some noise) but common with categorical data converted to numbers, or in trivial test cases. A near-zero SD on real measurements suggests either extraordinary precision or that you've accidentally put the same value in every row."
      ),
      createFAQ(
        "What units is the standard deviation in?",
        "The same units as your data. Heights in centimetres give an SD in centimetres; temperatures in Celsius give an SD in Celsius. This is why we square-root the variance: variance is in 'units squared' (centimetres squared, hard to visualise), and the square root brings it back to the original scale."
      ),
      createFAQ(
        "How many decimal places should I report?",
        "One more than your raw data. If your measurements were to the nearest whole number, report SD to one decimal place. If they were to one decimal place, report to two. The calculator shows four decimal places so you can round as appropriate."
      ),
    ],
    relatedTools: [
      { slug: "probability-calculator", label: "Probability Calculator" },
      { slug: "quadratic-equation-solver", label: "Quadratic Equation Solver" },
      { slug: "greatest-common-factor-calculator", label: "Greatest Common Factor Calculator" },
    ],
  },

  "quadratic-equation-solver": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Quadratic Equation Solver",
        "Enter the three coefficients a, b and c from your equation in the form ax² + bx + c = 0. The solver works out the discriminant (b² - 4ac), uses it to decide whether the roots are real or complex, and applies the quadratic formula to give you the values of x. Steps and the discriminant value are shown alongside the answer so you can check the working rather than just trusting the output.",
        "Coefficient a cannot be zero, otherwise the equation isn't quadratic at all (it collapses to a linear equation bx + c = 0, which the solver flags as an error). Coefficients b and c can be zero. If c is zero you get x = 0 as one root automatically; if b is zero you get a pure square root."
      ),
      createAnswerFirstSection(
        "What the Discriminant Tells You",
        "The discriminant is the bit under the square root sign in the quadratic formula: b² - 4ac. It tells you the nature of the roots before you even calculate them. If it's positive, you get two distinct real roots (the parabola crosses the x-axis at two different points). If it's zero, you get one repeated real root (the parabola just touches the x-axis at its vertex). If it's negative, you get two complex roots (the parabola never touches the x-axis at all).",
        "Complex roots come in conjugate pairs of the form p + qi and p - qi, where i is the square root of negative one. They're not 'wrong' answers, they're just answers that exist in the complex plane rather than on the standard real number line. For physics and engineering problems involving oscillation, complex roots actually correspond to important damped or oscillating behaviour."
      ),
      {
        heading: "Discriminant Outcomes at a Glance",
        table: {
          headers: ["b² - 4ac", "Number of real roots", "Geometric meaning"],
          rows: [
            ["Positive", "Two distinct real roots", "Parabola crosses x-axis at two points"],
            ["Zero", "One repeated real root", "Parabola touches x-axis at the vertex"],
            ["Negative", "No real roots (two complex)", "Parabola sits entirely above or below x-axis"],
          ],
        },
      },
      createAnswerFirstSection(
        "Where Quadratic Equations Show Up",
        "Projectile motion uses them constantly. Throw a ball into the air and its height as a function of time is roughly h(t) = -½gt² + v₀t + h₀, a quadratic. Solving for h = 0 (when the ball hits the ground) is a quadratic equation. Optimisation problems, especially ones involving area and rectangles ('I have 100m of fencing, what dimensions give the largest enclosed area?'), reduce to quadratics. Profit-maximisation in business when revenue and cost are quadratic functions of quantity. Trigonometry sometimes throws them up too.",
        "Beyond physics and economics, quadratics turn up in computer graphics (intersecting a ray with a sphere), genetics (Hardy-Weinberg equilibrium), and statistics (variance is a quadratic function). For more numerical tools, see the [Probability Calculator](/probability-calculator) or [Standard Deviation Calculator](/standard-deviation-calculator)."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the quadratic formula?",
        "x = (-b ± sqrt(b² - 4ac)) / 2a. The plus and minus give you the two solutions: one root from adding the square root of the discriminant, the other from subtracting it. It's derived by completing the square on the general quadratic ax² + bx + c = 0, and works for any quadratic with real coefficients."
      ),
      createFAQ(
        "Can I solve quadratics by factoring instead?",
        "Yes, when the roots are 'nice' integers or simple fractions. Factoring x² - 5x + 6 = 0 gives (x - 2)(x - 3) = 0, so x = 2 or x = 3. The trouble starts when the roots aren't whole numbers; factoring x² - x - 1 = 0 (the equation for the golden ratio) by hand is a nightmare, while the formula gives (1 ± sqrt(5)) / 2 in one step. The solver doesn't try to factor; it always uses the formula, which works in every case."
      ),
      createFAQ(
        "What does 'completing the square' mean?",
        "It's an algebraic technique that rewrites ax² + bx + c into the form a(x - h)² + k, where (h, k) is the vertex of the parabola. It's also the method used to derive the quadratic formula in the first place. For most everyday solving you don't need to bother with it; the formula is the more direct route."
      ),
      createFAQ(
        "Are complex roots useful for anything?",
        "In a pure 'where does this graph cross zero' sense, complex roots tell you the graph never crosses, which is itself a valid answer. In engineering and physics, particularly anything involving oscillation, alternating current, signal processing or quantum mechanics, complex numbers are standard. Solving the characteristic equation of a damped oscillator yields complex roots whose imaginary part is the oscillation frequency and real part is the damping rate."
      ),
      createFAQ(
        "Why do you need a, b and c separately?",
        "Because the quadratic formula needs each coefficient explicitly. The solver lets you change one at a time and watch the roots move, which is useful when you're studying how the discriminant flips from positive to negative as one coefficient changes. If you have an equation in a different form, like x² = 5x - 4, rearrange it to x² - 5x + 4 = 0 first, then a=1, b=-5, c=4."
      ),
    ],
    relatedTools: [
      { slug: "probability-calculator", label: "Probability Calculator" },
      { slug: "standard-deviation-calculator", label: "Standard Deviation Calculator" },
      { slug: "pythagorean-theorem-calculator", label: "Pythagorean Theorem Calculator" },
    ],
  },

  "probability-calculator": {
    sections: [
      createAnswerFirstSection(
        "What the Probability Calculator Covers",
        "Four tabs handle four core questions. Basic computes the probability of a single event as favourable outcomes divided by total outcomes. Combinations (nCr) tells you how many ways you can choose r items from n when order doesn't matter. Permutations (nPr) does the same when order matters. Independent events combines two probabilities to find the chance of both happening, either happening, or neither happening.",
        "Probability values always sit between 0 (impossible) and 1 (certain), and the calculator shows them both as a decimal and a percentage. A probability of 0.25 is the same as a 25% chance, or odds of 1 in 4. The calculator doesn't deal with conditional probability or Bayesian updating directly, those are deeper topics best handled with a worked example rather than a generic tool."
      ),
      createAnswerFirstSection(
        "Combinations vs Permutations",
        "The classic way to remember the difference: combinations are about committees, permutations are about podiums. If you're picking 3 people from 10 to form a committee, the order they're picked in doesn't matter, so use nCr. If you're picking 3 people from 10 to come 1st, 2nd and 3rd in a race, the order matters (1st place is different from 3rd), so use nPr. The formulas: nCr = n! / (r! × (n-r)!), nPr = n! / (n-r)!. Permutations are always at least as large as combinations because they count more arrangements as distinct.",
        "Common surprises: the number of possible bridge hands (13 cards from 52) is C(52, 13) = 635 billion. The number of distinct handshakes in a room of 20 people is C(20, 2) = 190. The number of ways to order a deck of 52 cards is 52! which is roughly 8 × 10^67, more than the number of atoms in the Earth."
      ),
      {
        heading: "Common Probability Examples",
        table: {
          headers: ["Event", "Probability", "Approximate odds"],
          rows: [
            ["Flipping heads", "0.5 (50%)", "1 in 2"],
            ["Rolling a 6 on a die", "0.167 (16.7%)", "1 in 6"],
            ["Drawing an ace from a deck", "0.077 (7.7%)", "1 in 13"],
            ["Two coins both heads", "0.25 (25%)", "1 in 4"],
            ["Three coins all heads", "0.125 (12.5%)", "1 in 8"],
            ["Rolling a double 6 with two dice", "0.028 (2.8%)", "1 in 36"],
            ["UK Lotto jackpot (6 from 59)", "0.0000000223 (0.00000223%)", "1 in 45,057,474"],
          ],
        },
      },
      createAnswerFirstSection(
        "How Independent Events Combine",
        "Two events A and B are independent if the outcome of one doesn't affect the other. For independent events: P(A and B) = P(A) × P(B), P(A or B) = P(A) + P(B) - P(A) × P(B). Multiplying probabilities lowers them quickly, which is why getting four heads in a row drops to (1/2)^4 = 1/16 even though each flip is 50/50. The 'or' formula subtracts the overlap because P(A) + P(B) on its own would double-count the case where both happen.",
        "Common mistakes: assuming independence when the events are actually linked (drawing two cards without replacement is not independent because removing the first card changes the deck), or forgetting the subtraction in the 'or' formula. For dependent events you'd need conditional probability, which the [Standard Deviation Calculator](/standard-deviation-calculator) doesn't cover but is closely related to via Bayes' theorem."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the difference between a combination and a permutation?",
        "Order. Picking 3 people for a committee from 10 is C(10, 3) = 120 ways because no one cares who was picked first. Picking 3 people for gold, silver and bronze medals from 10 athletes is P(10, 3) = 720 ways because the medal order is part of the answer. P(n, r) = C(n, r) × r! always, since for each unordered combination there are r! ways to arrange it."
      ),
      createFAQ(
        "Why does the calculator show probabilities in two formats?",
        "Decimals between 0 and 1 are the mathematical standard and the form used in formulas, while percentages between 0% and 100% are how most people speak about chance. A 0.045 probability and a 4.5% chance are exactly the same thing, just different notations. Odds (like '1 in 22') are a third notation, useful for headline numbers but harder to combine algebraically."
      ),
      createFAQ(
        "What happens when r is greater than n?",
        "C(n, r) and P(n, r) are both zero. You can't pick more items than exist. The calculator returns 0 in that case, which can be confusing if you've made a typo, since the result looks the same as a genuine zero probability. Double-check that n is the larger of the two values."
      ),
      createFAQ(
        "Are coin flips and dice rolls really independent?",
        "Yes, in any practical sense. The result of one fair coin flip has no physical influence on the next. The 'gambler's fallacy' is the false belief that, after a streak of heads, tails is somehow 'due'; the coin doesn't know what it did before, and each flip is 50/50 fresh. The same applies to dice and lottery balls."
      ),
      createFAQ(
        "How do I calculate the probability of getting at least one success?",
        "Use the complement: P(at least one) = 1 - P(none). For example, the probability of rolling at least one 6 in four rolls is 1 - (5/6)^4 = 1 - 0.482 = 0.518, just over half. This 'at least one' technique is much easier than enumerating all the cases where you get one, two, three or four sixes."
      ),
    ],
    relatedTools: [
      { slug: "standard-deviation-calculator", label: "Standard Deviation Calculator" },
      { slug: "quadratic-equation-solver", label: "Quadratic Equation Solver" },
      { slug: "prime-number-checker", label: "Prime Number Checker" },
    ],
  },

  "percentage-increase-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Calculate Percentage Increase",
        "Formula: ((New - Original) / Original) × 100. So if a price went from £20 to £25, the increase is ((25-20)/20) × 100 = 25%. The result is always positive when the new value is higher than the original; if it's lower, you have a percentage decrease (negative increase).",
        "Used to express growth rates: salary increases, stock returns, sales growth, population changes, inflation rates. A salary going from £40,000 to £44,000 is a 10% increase. House prices rising from £300k to £360k = 20% increase. Note: percentage increases compound when applied repeatedly - 2 consecutive 10% increases produce 21% total, not 20%."
      ),
      {
        heading: "Common Percentage Increases",
        table: {
          headers: ["From", "To", "% Increase"],
          rows: [
            ["100", "110", "10%"],
            ["100", "125", "25%"],
            ["100", "150", "50%"],
            ["100", "200", "100%"],
            ["50", "60", "20%"],
            ["80", "100", "25%"],
            ["£40,000", "£44,000", "10%"],
            ["£300,000", "£360,000", "20%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I express going from 50 to 75?",
        "((75-50)/50) × 100 = 50%. So 75 is 50% more than 50. Common confusion: 'is 75 50% more than 50, or 150% of 50?' Both true - 75 IS 150% of 50, AND it's 50% MORE than 50. The 'increase' framing always uses the difference relative to the starting value."
      ),
      createFAQ(
        "Are 100% increase and doubling the same?",
        "Yes - 100% increase = doubling. £100 + 100% increase = £200. £100 + 200% increase = £300 (tripled). The terminology can confuse newcomers; 'double' (×2) and 'triple' (×3) avoid the percentage ambiguity."
      ),
    ],
    relatedTools: [
      { slug: "percentage-decrease-calculator", label: "Percentage Decrease Calculator" },
      { slug: "percent-change-calculator", label: "Percent Change Calculator" },
      { slug: "percentage-difference-calculator", label: "Percentage Difference Calculator" },
    ],
  },

  "percentage-decrease-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Calculate Percentage Decrease",
        "Formula: ((Original - New) / Original) × 100. So if a price drops from £80 to £60, the decrease is ((80-60)/80) × 100 = 25%. The result is always positive (representing the magnitude of decrease); the direction is implied by 'decrease'.",
        "Used for sales discounts, weight loss, profit margins shrinking, market downturns. A 25% decrease in stock value from £40 to £30 = same as a 'sale' of 25% off £40. Important: percentage decreases don't compound the same way as increases - a 50% decrease followed by a 50% increase doesn't return to original (£100 → £50 → £75, not £100)."
      ),
      {
        heading: "Common Percentage Decreases",
        table: {
          headers: ["From", "To", "% Decrease"],
          rows: [
            ["100", "90", "10%"],
            ["100", "75", "25%"],
            ["100", "50", "50%"],
            ["100", "25", "75%"],
            ["80", "60", "25%"],
            ["60", "45", "25%"],
            ["£200", "£170", "15%"],
            ["£500", "£350", "30%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why doesn't 50% decrease then 50% increase return to original?",
        "Math: £100 - 50% = £50. £50 + 50% = £75. The base changed - the second percentage applies to £50, not £100. To return to £100 from £50, you need a 100% increase. This 'percentage of what?' issue causes lots of confusion in finance discussions."
      ),
      createFAQ(
        "Can decrease be more than 100%?",
        "No - a 100% decrease leaves you with zero. You can't decrease below zero with percentages. If something drops from £100 to -£50, the formula technically gives 150% decrease, but this rarely appears in practice. Typical decreases stop at 100% (the value reaches zero)."
      ),
    ],
    relatedTools: [
      { slug: "percentage-increase-calculator", label: "Percentage Increase Calculator" },
      { slug: "percent-change-calculator", label: "Percent Change Calculator" },
      { slug: "discount-calculator", label: "Discount Calculator" },
    ],
  },

  "percent-change-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Calculate Percent Change",
        "Formula: ((New - Original) / Original) × 100. Same formula as percentage increase, but the result can be positive (increase) or negative (decrease). So going from £100 to £150 is +50% change; going from £100 to £80 is -20% change.",
        "Used for any directional comparison: stock price changes, year-on-year growth, weight changes, score improvements, traffic spikes/drops. Financial markets quote daily changes as +/- percentages (FTSE 100 +0.5% today, NASDAQ -1.2%). Use percent change rather than percent increase/decrease when the direction isn't predetermined."
      ),
      {
        heading: "Common Percent Changes",
        table: {
          headers: ["From", "To", "Change"],
          rows: [
            ["100", "120", "+20%"],
            ["100", "110", "+10%"],
            ["100", "100", "0% (unchanged)"],
            ["100", "90", "-10%"],
            ["100", "75", "-25%"],
            ["50", "75", "+50%"],
            ["50", "25", "-50%"],
            ["FTSE 7500", "FTSE 7575", "+1%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's the difference between percent change and percentage point change?",
        "Percent change is relative; percentage point is absolute. Going from 5% to 7% is a 2 percentage point change but a 40% percent change ((7-5)/5 × 100). Polls and economic statistics often confuse these - 'unemployment rose 2 points' vs 'unemployment rose 40%' can describe the same data differently."
      ),
      createFAQ(
        "How do I show negative changes?",
        "Use a minus sign or the word 'decrease': '-15%' or '15% decrease'. Stock and market reports use the minus convention; news articles often use 'decrease' or 'fell by'. Both unambiguous; the minus sign is more compact."
      ),
    ],
    relatedTools: [
      { slug: "percentage-increase-calculator", label: "Percentage Increase Calculator" },
      { slug: "percentage-decrease-calculator", label: "Percentage Decrease Calculator" },
      { slug: "percentage-difference-calculator", label: "Percentage Difference Calculator" },
    ],
  },

  "pythagorean-theorem-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the Pythagorean Theorem Works",
        "For a right-angled triangle: a² + b² = c², where c is the hypotenuse (longest side, opposite the right angle) and a, b are the other two sides. Given any two sides, you can find the third. So for legs of 3 and 4: c² = 9 + 16 = 25, c = 5. The classic 3-4-5 triangle is the smallest integer right triangle.",
        "Used everywhere in geometry, construction, navigation, computer graphics. To find the diagonal of a rectangular room: a = length, b = width, c = diagonal. A 3m × 4m room has a 5m diagonal. To check if a corner is square (90°): measure 3 ft from corner along one wall, 4 ft along the other - the distance between those points should be exactly 5 ft if the corner is square."
      ),
      {
        heading: "Common Pythagorean Triples",
        table: {
          headers: ["a", "b", "c (hypotenuse)"],
          rows: [
            ["3", "4", "5"],
            ["5", "12", "13"],
            ["6", "8", "10"],
            ["7", "24", "25"],
            ["8", "15", "17"],
            ["9", "40", "41"],
            ["12", "16", "20"],
            ["20", "21", "29"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are these called 'triples'?",
        "Sets of three integers (a, b, c) where a² + b² = c². The smallest is (3, 4, 5). Multiples of any triple are also triples (6, 8, 10 = 2 × the 3-4-5 triple). 'Primitive triples' are the simplest forms - (3,4,5), (5,12,13), (8,15,17) - that aren't multiples of smaller triples."
      ),
      createFAQ(
        "How do I find the third side?",
        "If you know c and a: b² = c² - a², so b = √(c² - a²). If you know a and b: c = √(a² + b²). Always remember c is the longest side (hypotenuse). Square root is the operation; result is the side length."
      ),
    ],
    relatedTools: [
      { slug: "scientific-notation-converter", label: "Scientific Notation Converter" },
      { slug: "degrees-to-radians", label: "Degrees to Radians" },
      { slug: "feet-to-metres", label: "Feet to Metres" },
    ],
  },

  "prime-number-checker": {
    sections: [
      createAnswerFirstSection(
        "What's a Prime Number?",
        "A prime is a number greater than 1 that has only two divisors: 1 and itself. So 7 is prime (only 1 and 7 divide it). 8 is not (1, 2, 4, 8 divide it). The first primes: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29... 2 is the only even prime; all other primes are odd.",
        "Primes are foundational in cryptography, number theory, and computer science. RSA encryption (used for HTTPS, banking) relies on the difficulty of factoring large numbers into their prime components. The largest known prime as of 2024: 2^82,589,933 - 1, which has 24.8 million digits. New primes are discovered occasionally by distributed computing projects (GIMPS)."
      ),
      {
        heading: "First Primes by Range",
        table: {
          headers: ["Range", "Primes"],
          rows: [
            ["1-10", "2, 3, 5, 7"],
            ["11-20", "11, 13, 17, 19"],
            ["21-30", "23, 29"],
            ["31-50", "31, 37, 41, 43, 47"],
            ["51-100", "53, 59, 61, 67, 71, 73, 79, 83, 89, 97"],
            ["100s", "25 primes (101-199)"],
            ["1000s", "143 primes"],
            ["100000s", "10,000+ primes"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I quickly check if a number is prime?",
        "For small numbers, divide by primes up to √n. So for 91: check 2, 3, 5, 7. 91 ÷ 7 = 13. So 91 = 7 × 13, NOT prime. For numbers under 100, you only need to check division by 2, 3, 5, 7 (primes up to √100 = 10)."
      ),
      createFAQ(
        "Why is 1 not prime?",
        "By definition - primes need exactly two divisors (1 and themselves). 1 has only one divisor (itself). The exclusion makes prime factorisation work cleanly: every number has a unique prime factorisation if 1 is excluded. Including 1 would break that uniqueness."
      ),
    ],
    relatedTools: [
      { slug: "greatest-common-factor-calculator", label: "Greatest Common Factor" },
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
      { slug: "scientific-notation-converter", label: "Scientific Notation Converter" },
    ],
  },

  "greatest-common-factor-calculator": {
    sections: [
      createAnswerFirstSection(
        "Finding the GCF of Two or More Numbers",
        "GCF (Greatest Common Factor, or GCD) is the largest number that divides each of the given numbers without remainder. For 12 and 18: divisors of 12 are 1, 2, 3, 4, 6, 12; divisors of 18 are 1, 2, 3, 6, 9, 18. Common: 1, 2, 3, 6. Greatest: 6. So GCF(12, 18) = 6.",
        "Used to simplify fractions: 12/18 reduces to 2/3 by dividing both top and bottom by GCF 6. Used in algebra to factor expressions, in number theory, and in algorithms (Euclid's algorithm efficiently finds GCF). Practical applications: dividing materials evenly, scaling recipes proportionally, simplifying gear ratios."
      ),
      {
        heading: "GCF Examples",
        table: {
          headers: ["Numbers", "GCF"],
          rows: [
            ["8, 12", "4"],
            ["12, 18", "6"],
            ["15, 25", "5"],
            ["24, 36", "12"],
            ["30, 45", "15"],
            ["48, 60", "12"],
            ["100, 75", "25"],
            ["7, 11 (coprime)", "1"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's Euclid's algorithm?",
        "Efficient method for finding GCF without listing all divisors. Repeatedly divide larger by smaller, take remainder, replace larger with smaller and smaller with remainder. Stop when remainder is 0; last divisor is GCF. Example: GCF(48, 36): 48÷36 = 1 rem 12. 36÷12 = 3 rem 0. GCF = 12."
      ),
      createFAQ(
        "What if the GCF is 1?",
        "Numbers are 'coprime' or 'relatively prime'. Their only common divisor is 1. Examples: any two distinct primes (like 7 and 11), or any number paired with 1. Coprime numbers can't be simplified as fractions further."
      ),
    ],
    relatedTools: [
      { slug: "prime-number-checker", label: "Prime Number Checker" },
      { slug: "percentage-difference-calculator", label: "Percentage Difference Calculator" },
      { slug: "scientific-notation-converter", label: "Scientific Notation Converter" },
    ],
  },

  "scientific-notation-converter": {
    sections: [
      createAnswerFirstSection(
        "How Scientific Notation Works",
        "Scientific notation expresses numbers as a × 10^n, where 1 ≤ a < 10 and n is an integer. So 1,234 = 1.234 × 10^3. 0.000567 = 5.67 × 10^-4. Useful for very large numbers (avogadro's number = 6.022 × 10^23) or very small (the mass of an electron = 9.109 × 10^-31 kg).",
        "Engineering and science use this constantly. Large quantities (atoms, distances in space, file sizes) and tiny quantities (chemical concentrations, microscopic measurements) compress to readable values. A scientific calculator typically displays in scientific notation when results exceed normal precision (usually past 10^9 or below 10^-9)."
      ),
      {
        heading: "Scientific Notation Examples",
        table: {
          headers: ["Number", "Scientific Notation"],
          rows: [
            ["1,000", "1 × 10^3"],
            ["1,500,000", "1.5 × 10^6"],
            ["1,000,000,000", "1 × 10^9"],
            ["0.001", "1 × 10^-3"],
            ["0.0000567", "5.67 × 10^-5"],
            ["6,022 × 10^23 (Avogadro)", "6.022 × 10^23"],
            ["Speed of light (m/s)", "3 × 10^8"],
            ["Mass of Earth (kg)", "5.972 × 10^24"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I convert by hand?",
        "Move decimal point until you have one non-zero digit before it. Count moves: positive exponent if you moved left (large numbers), negative if you moved right (small numbers). 4567 → 4.567 × 10^3. 0.0023 → 2.3 × 10^-3."
      ),
      createFAQ(
        "What's 'engineering notation'?",
        "Like scientific notation but exponent must be a multiple of 3 (3, 6, 9, etc.). So 4,567 in engineering notation = 4.567 × 10^3, but 12,345 = 12.345 × 10^3 (not 1.2345 × 10^4). Aligns with SI prefixes: kilo (10^3), mega (10^6), giga (10^9). Engineers prefer this for readability with units."
      ),
    ],
    relatedTools: [
      { slug: "binary-to-decimal", label: "Binary to Decimal" },
      { slug: "hex-to-decimal", label: "Hex to Decimal" },
      { slug: "pythagorean-theorem-calculator", label: "Pythagorean Theorem" },
    ],
  },

  "percentage-difference-calculator": {
    sections: [
      createAnswerFirstSection(
        "Percentage Difference vs Percentage Change",
        "Percentage difference is for comparing two values without a reference 'starting' value: |a - b| / ((a + b) / 2) × 100. So comparing 10 vs 20: |10-20| / 15 = 66.7% difference. Symmetric - same answer regardless of which value comes first. Used when neither value is the 'original' or 'new'.",
        "Percentage change uses one as a baseline: (New - Original) / Original × 100. Going from 10 to 20: 100% change (doubled). Going from 20 to 10: -50% change (halved). NOT symmetric. Use percentage change for time-series comparisons (this year vs last); use percentage difference for parallel comparisons (London prices vs Paris prices)."
      ),
      {
        heading: "Percentage Difference Examples",
        table: {
          headers: ["Value A", "Value B", "% Difference"],
          rows: [
            ["10", "12", "18.2%"],
            ["10", "20", "66.7%"],
            ["50", "55", "9.5%"],
            ["100", "120", "18.2%"],
            ["100", "200", "66.7%"],
            ["50", "100", "66.7%"],
            ["£10", "£12.50", "22.2%"],
            ["72 kg", "75 kg", "4.1%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "When should I use difference vs change?",
        "Use difference for symmetric comparisons (Comparing two products' prices when neither is the 'original'). Use change for time-series (this year's revenue vs last year's). Use change when there's a clear 'before' and 'after'."
      ),
      createFAQ(
        "Why does percentage difference feel different from percentage change?",
        "Difference uses the average of both values as denominator (giving symmetric, smaller numbers). Change uses one specific value (giving asymmetric results that depend on direction). 100 vs 200: change is 100% (one direction) or 50% (other). Difference is always 66.7%."
      ),
    ],
    relatedTools: [
      { slug: "percent-change-calculator", label: "Percent Change Calculator" },
      { slug: "percentage-increase-calculator", label: "Percentage Increase Calculator" },
      { slug: "percentage-decrease-calculator", label: "Percentage Decrease Calculator" },
    ],
  },
};
