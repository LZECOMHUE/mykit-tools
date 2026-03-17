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
};
