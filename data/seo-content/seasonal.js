// SEO content for seasonal and holiday tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const seasonalSEO = {
  "when-is-hanukkah": {
    sections: [
      createAnswerFirstSection(
        "How the Dates of Hanukkah Are Decided",
        "Hanukkah is an eight-day Jewish festival that begins on the 25th day of Kislev in the Hebrew calendar. Because the Hebrew calendar is lunisolar (based on both the moon and the sun) and the Gregorian calendar is solar, the exact dates of Hanukkah shift every year.",
        "Typically, Hanukkah starts sometime between late November and late December. The holiday is celebrated by lighting the menorah, eating fried foods like latkes and sufganiyot, and spinning the dreidel."
      )
    ],
    faqs: [
      createFAQ(
        "When does Hanukkah start this year?",
        "Hanukkah typically begins at sundown on the first day of the festival. You can use this calculator to find the exact start date, end date, and track a live countdown to the first night of the holiday."
      ),
      createFAQ(
        "What days are Hanukkah?",
        "Hanukkah lasts for exactly eight days and nights. Each night, an additional candle is lit on the menorah until all eight are burning brightly on the final evening."
      ),
      createFAQ(
        "How is Hanukkah celebrated?",
        "The most critical tradition is lighting the hanukkiah (a nine-branched menorah) each night. Other traditions include playing with a dreidel (a spinning top), exchanging small gifts or gelt (chocolate coins), and eating foods fried in oil to commemorate the miracle of the oil."
      )
    ]
  },

  "when-is-remembrance-day": {
    sections: [
      createAnswerFirstSection(
        "Remembrance Day vs Remembrance Sunday",
        "Remembrance Day in the UK specifically falls on the 11th of November every year, marking the exact day in 1918 when the Armistice was signed to end World War I at the eleventh hour. On this day, a two-minute silence is observed at 11am.",
        "Remembrance Sunday, however, is the second Sunday in November. This is when the main national commemorations take place, including the National Service of Remembrance at the Cenotaph in London, attended by the Royal Family and political leaders."
      )
    ],
    faqs: [
      createFAQ(
        "When is Remembrance Sunday this year?",
        "Because it always falls on the second Sunday of November, the date changes every year. Our tool calculates the exact date and provides a live countdown. It usually falls between the 8th and 14th of November."
      ),
      createFAQ(
        "Why do we wear poppies?",
        "The red poppy became a symbol of remembrance following the famous poem 'In Flanders Fields', written by Canadian physician Lieutenant-Colonel John McCrae. Poppies were among the first plants to grow in the churned-up earth of soldiers' graves in Belgium and France."
      )
    ]
  }
};
