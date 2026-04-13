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
};
