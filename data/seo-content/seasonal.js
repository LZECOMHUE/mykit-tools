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
  },

  "world-cup-2026-wall-chart": {
    sections: [
      createAnswerFirstSection(
        "What's New About the 2026 Tournament",
        "FIFA expanded the World Cup from 32 teams to 48 for 2026, the biggest format change since 1998. The 48 teams are split into 12 groups of 4, with the top two from each group plus the eight best third-placed teams advancing into a Round of 32. That gives you 104 matches in total across 39 days, up from the 64 matches of previous editions.",
        "Hosting is split between three countries (USA, Canada, Mexico) across 16 cities including New York/New Jersey, Los Angeles, Dallas, Mexico City, Toronto and Vancouver. The opener is on 11 June 2026 in Mexico City and the final lands on 19 July 2026 at MetLife Stadium in New Jersey. The wall chart in this tool reflects the new format: 12 groups, the Round of 32 stage, and the standard knockout path from there (R16, quarter-finals, semi-finals, final)."
      ),
      createAnswerFirstSection(
        "Filling In the Group Stage",
        "Each group plays 6 matches over the first two and a half weeks of the tournament. The chart lets you log Wins, Draws and Losses per team and tracks Points automatically, with 3 points for a win and 1 for a draw. FIFA's tiebreakers go in this order: total points, then goal difference, then goals scored, then head-to-head record, then yellow/red card record, then a FIFA ranking draw. Most fans only ever need to apply the first three.",
        "The third-placed team mechanic is the trickiest part of the new format and the bit most people get wrong on their first wall chart. Eight of the twelve third-placed teams progress, ranked across all groups by the same criteria above. That means a third-placed team in a tough group can absolutely qualify ahead of a runner-up from an easy group, and the bracket pairings on the Round of 32 are not finalised until every group's last match has played out. Pencil rather than pen is the wise choice."
      ),
      createAnswerFirstSection(
        "Knockout Bracket and Match Dates",
        "The Round of 32 starts on 28 June 2026 and runs until 3 July. The Round of 16 plays from 4 to 7 July. Quarter-finals are on 9 to 11 July, semi-finals on 14 and 15 July, the third-place play-off on 18 July, and the final on 19 July. That is one extra knockout round compared to 2022, which is why the tournament is roughly a week longer overall.",
        "Each knockout match is a single elimination tie with extra time and penalties if needed. The wall chart in this tool fills the bracket automatically as you input results, so a knockout slot named 'Winner of A1 vs B/F/C 3rd' will automatically show the actual qualified team once you have logged the relevant group-stage results. Pin it on the office wall, the kitchen wall, the classroom corkboard or the pub noticeboard and update it after every match. If you also want to run a friends-and-family prediction competition, pair this with the [tournament bracket generator](/tournament-bracket-generator) for the knockout pool, and the [betting odds calculator](/betting-odds-calculator) if you want to compare your gut picks against bookmaker pricing."
      ),
      createAnswerFirstSection(
        "Printing It Out (and Why PDF Is the Premium Option)",
        "The free version exports the chart as a JPG with a small watermark, which prints fine on A4 or A3 home printers. The premium PDF download (£1.99 one-off) is print-ready at 300 DPI, formatted for A2 if you want a proper kitchen-wall poster, with cleaner typography, no watermark and a fillable layout designed for ballpoint pen rather than fine-tip marker. It is the version most parents end up buying the night before the tournament starts, when the kids want a chart on the wall before the opening match.",
        "If you are using this for a workplace sweepstake or pub competition, print one master copy for the wall and give participants their own filled-in predictions using the same format. The Round of 32 expansion makes the bracket noticeably wider than 2022 charts, so anything smaller than A3 starts to feel cramped once you are deep into the knockouts."
      ),
    ],
    faqs: [
      createFAQ(
        "When does the 2026 World Cup start and finish?",
        "The opening match is 11 June 2026 at the Estadio Azteca in Mexico City, and the final is 19 July 2026 at MetLife Stadium in East Rutherford, New Jersey. That is 39 days of football, the longest World Cup ever, with 104 matches in total. Most fans focus on the group stage (11 to 27 June) and the knockouts (28 June to 19 July)."
      ),
      createFAQ(
        "How many teams are in the 2026 World Cup?",
        "48 teams qualify, split into 12 groups of 4. The top two in each group advance directly to the Round of 32, and the eight best third-placed teams across all groups also progress. That brings 32 teams into the knockout bracket, the same as the old final stage but reached via the new expanded group format."
      ),
      createFAQ(
        "What are the host cities for the 2026 World Cup?",
        "16 cities across three countries. In the US: Atlanta, Boston, Dallas, Houston, Kansas City, Los Angeles, Miami, New York/New Jersey, Philadelphia, San Francisco Bay Area and Seattle. In Mexico: Guadalajara, Mexico City and Monterrey. In Canada: Toronto and Vancouver. The final is at MetLife Stadium in New Jersey, the semi-finals split between Dallas and Atlanta."
      ),
      createFAQ(
        "Can I print the wall chart on A4 or do I need A3?",
        "The free JPG works on A4 if you do not mind small text, especially in the knockouts. A3 is much more legible and is the size most pubs and kitchens use. The premium PDF is sized for A2 or A3, with proper margins for printing on a home printer or at a print shop. If you only have A4 to hand, print the group stage on one sheet and the knockout bracket on a second."
      ),
      createFAQ(
        "How does the third-placed team qualification actually work?",
        "After every group has played its three matches, the 12 third-placed teams are ranked by points, then goal difference, then goals scored, then disciplinary record. The top eight progress to the Round of 32. Their bracket position is determined by a fixed mapping FIFA published before the tournament, so a third-placed team from Group A might end up facing the Group B winner, the Group C winner, the Group D winner or the Group E winner depending on which third-placed teams qualify. This makes Round-of-32 fixtures genuinely hard to predict until the final group games end."
      ),
    ],
    relatedTools: [
      { slug: "tournament-bracket-generator", label: "Tournament Bracket Generator" },
      { slug: "betting-odds-calculator", label: "Betting Odds Calculator" },
      { slug: "matched-betting-calculator", label: "Matched Betting Calculator" },
    ],
  },
};
