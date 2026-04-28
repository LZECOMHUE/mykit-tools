// SEO content for education tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const educationSEO = {
  "writing-prompt-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Writing Prompt Generator",
        "Choose a genre from the eight options - Fantasy, Sci-Fi, Mystery, Horror, Romance, Literary, Adventure, or Comedy - then select a length. Flash gives you a single evocative sentence to spark an idea. Short delivers a full paragraph with a setup and hook. Expanded breaks the prompt into four elements: a character, a setting, a conflict, and a twist, giving you a complete story foundation to build from.",
        "Click Generate Prompt or press Space to get a new prompt instantly. If a prompt resonates, hit Copy to grab the text for your notebook, document, or writing app. Save bookmarks up to five prompts at a time - useful if you find several you like and want to compare them before committing. Prompts are stored locally in your browser, so your saved list will still be there when you return."
      ),
      createAnswerFirstSection(
        "Which Length Should You Choose?",
        "Flash prompts are best for daily warm-ups, timed writing exercises, or when you want a single spark without too much scaffolding. They force you to fill in all the gaps yourself, which is great for building imaginative muscle. Short prompts suit writers who benefit from a concrete scenario but want room to develop their own characters and plot. Expanded prompts are ideal for tackling a new project or getting unstuck - the four-part structure gives you enough to begin a first scene immediately.",
        "Teachers often find the Expanded format particularly useful for classroom exercises: students can share and compare their four elements before writing, or the class can collaboratively choose the best character, setting, conflict, and twist from different generated prompts to build a group story."
      ),
    ],
    faqs: [
      createFAQ(
        "Are the writing prompts suitable for younger students?",
        "Most prompts are aimed at teens and adults. Literary and Horror prompts in particular deal with themes like grief, mortality, and psychological unease, which may not suit younger classrooms. Fantasy, Adventure, and Comedy prompts are generally appropriate for students aged 12 and above. For younger students, the Comedy and Adventure genres tend to produce the most accessible material."
      ),
      createFAQ(
        "Can I use these prompts for published work?",
        "Yes. The prompts are generated for your use and inspiration. Any story, scene, or piece of writing you create from a prompt is entirely yours. Prompts themselves are not copyrightable - they are simply starting-point ideas."
      ),
      createFAQ(
        "How many unique prompts are available?",
        "There are over 15 flash prompts, 5-15 short prompts, and 3-6 expanded prompt sets per genre - across eight genres, that's more than 250 distinct prompts in total. Prompts are selected at random within each genre and length combination, so you can keep generating to find one that suits your current project."
      ),
      createFAQ(
        "What is the spacebar shortcut for?",
        "Pressing the Space bar on your keyboard generates a new prompt instantly, without needing to click the button. This is useful for rapid browsing - press Space repeatedly to flick through prompts quickly until one catches your attention, the same way you might flick through index cards."
      ),
      createFAQ(
        "What does the Save feature do?",
        "Clicking Save on any prompt adds it to a local bookmark list visible at the bottom of the tool. You can save up to five prompts at a time. The list persists in your browser's local storage, so it will still be there if you close and reopen the page. Saved prompts can be copied individually or removed when you are done with them."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "flashcard-maker", label: "Flashcard Maker" },
      { slug: "reading-level-checker", label: "Reading Level Checker" },
    ],
  },

  "annual-leave-by-country": {
    sections: [
      createAnswerFirstSection(
        "How Statutory Annual Leave Differs Around the World",
        "The headline numbers vary wildly. France gives 25 working days plus 11 public holidays for a 36-day total. The UK sits at 28 days when you add 20 days of statutory leave to 8 bank holidays (5.6 weeks under the Working Time Regulations). The United States has no federal mandate at all, which is why a job offer there might list 10 days when you are used to 25.",
        "Bear in mind that bank holiday inclusion varies by country. UK employers can count the 8 bank holidays as part of your 28-day allowance, so a contract saying \"20 days holiday plus bank holidays\" gives the same total as one saying \"28 days inclusive\". Scotland and Northern Ireland each have slightly different bank holiday calendars too, which is why the tool lists 8 as a standard. If you are planning around UK public holidays, the [UK Tax Calculator](/uk-tax-calculator) can help you estimate take-home pay for the part of the year you are actually working."
      ),
      createAnswerFirstSection(
        "Comparing Job Offers Across Borders",
        "If you are weighing up a relocation, leave entitlement matters more than people realise. Tick France, Germany, the UK and the US. The ranking will show 36, 31, 28 and 0. That is a five-week gap between France and the UK, and a six-week gap between the UK and the US for someone with no negotiated extras. Multiply that by 30 working years and the lifetime difference is enormous.",
        "Two caveats worth flagging. Statutory minimums are floors, not ceilings; many German and Dutch employers offer 30 days as standard, well above the 20 required by law. And take-up culture matters - Japan mandates 10 days of leave but the average worker uses around half. Use the comparison as a starting point, then ask the recruiter about company policy and how often people actually take their full entitlement."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the UK really only get 28 days of leave?",
        "The statutory minimum is 5.6 weeks per year, which works out to 28 days for a five-day-a-week worker. Employers can choose to include the 8 bank holidays in that figure or offer them on top. Plenty of UK employers offer 25 days plus bank holidays (33 total), and senior roles often include 30 days plus bank holidays. The 28-day figure shown here is the legal floor, not what most people actually get."
      ),
      createFAQ(
        "Why does the United States show zero days?",
        "There is no federal law requiring paid annual leave in the US. Most employers offer something - typically 10 days for new hires rising to 15 or 20 with tenure - but it is a benefit rather than a right. A handful of states and cities have introduced paid sick leave laws, but paid vacation remains entirely at the employer's discretion."
      ),
      createFAQ(
        "Are public holidays the same as annual leave?",
        "They serve different purposes. Public holidays are specific dates (Christmas Day, Bastille Day, Independence Day) when most workplaces close. Annual leave is time you choose when to take. The tool adds them together to give a \"total days off\" figure for fair comparison, but the experience is different - public holidays cluster around predictable dates while annual leave offers genuine flexibility."
      ),
      createFAQ(
        "Do part-time workers get the same proportion?",
        "In most countries, yes. UK part-timers accrue 5.6 weeks pro rata, so someone working three days a week gets 16.8 days. The numbers shown in the tool assume full-time five-day-a-week work. If you are switching to part-time, multiply the days figure by your fraction (3/5, 4/5) to get your entitlement."
      ),
    ],
    relatedTools: [
      { slug: "maternity-leave-by-country", label: "Maternity Leave by Country" },
      { slug: "australia-public-holiday-planner", label: "Australia Public Holiday Planner" },
      { slug: "uk-tax-calculator", label: "UK Tax Calculator" },
    ],
  },

  "christmas-word-search": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Christmas Word Search",
        "The puzzle loads with 30 festive words ready to find: short ones like ELF, JOY and ICE for younger children, working up to longer entries like GINGERBREAD and NUTCRACKER for stronger readers. Click the first letter of a word in the grid, drag through the letters, then release on the last letter. Found words are crossed off the list and a tally shows progress. The default 12x12 grid suits children aged 6 and up; bump it to 15x15 or 18x18 for a bigger challenge.",
        "The difficulty selector changes how words are placed. Easy mode hides words horizontally and vertically only, which is right for a Year 1 or Year 2 classroom. Medium adds diagonals (Year 3 upwards). Hard adds backwards placement, which suits ages 9 and up or anyone who finishes the medium version too quickly. Switch to a 20x20 grid only if you have a strong colour printer at home, since 20x20 grids print quite small on standard A4."
      ),
      createAnswerFirstSection(
        "Printing for a Classroom or Christmas Party",
        "Hit the download button to grab a printable PDF with the grid on page one and the word list on page two. The free version watermarks the page corner; the premium download (£1.99) removes the watermark and includes an answer key with each word circled, which is the version teachers usually want for marking. The PDF prints cleanly at A4 with margins set for both UK and US letter paper.",
        "For a school Christmas party, generate one puzzle and print 30 copies rather than letting children share. The medium difficulty version typically takes a Year 3 child 8 to 12 minutes, which is the right length to fill the gap between the nativity rehearsal and home time. For older classes (Year 5 and 6), try the [Halloween Word Search](/halloween-word-search) at hard difficulty as an autumn-term equivalent."
      ),
    ],
    faqs: [
      createFAQ(
        "What age group is this Christmas word search aimed at?",
        "The default settings (12x12 grid, medium difficulty) suit children aged 7 to 10. For Reception and Year 1, drop to a 10x10 grid on easy difficulty so words sit only horizontally and vertically, and stick with the shorter words by mentally skipping GINGERBREAD and MISTLETOE. For ages 11 and above, push to 18x18 with hard difficulty to add backwards placement."
      ),
      createFAQ(
        "Can I customise the word list for my class?",
        "This page uses a fixed Christmas-themed word list. If you want to swap words (perhaps to match this week's spelling list, or to add the names of class pets), use the general [Word Search Generator](/word-search-generator) where you type in your own words. The themed page exists for parents and teachers who want a ready-made puzzle without any setup."
      ),
      createFAQ(
        "Why does my printed grid look squashed?",
        "Word search grids over 18x18 start to print quite small on A4 because each cell shrinks to keep the whole grid on one page. If letters look cramped, drop the grid size to 15x15 and the cells will be about 35% larger. Avoid 20x20 unless you are printing on A3 or you genuinely need a long puzzle. Most home printers and school photocopiers handle 12x12 to 15x15 best."
      ),
      createFAQ(
        "Does the puzzle work on a tablet?",
        "Yes. Tap the first letter, drag your finger across the word, and lift to confirm. The grid rescales for phone and tablet screens, though you may want to rotate to landscape if you push the grid to 18x18 or larger. For classroom use on iPads, 12x12 fits comfortably in portrait orientation."
      ),
    ],
    relatedTools: [
      { slug: "halloween-word-search", label: "Halloween Word Search" },
      { slug: "word-search-generator", label: "Word Search Generator" },
      { slug: "christmas-countdown", label: "Christmas Countdown" },
    ],
  },

  "citation-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Build a Citation",
        "Pick the source type first - book, website, journal article, newspaper article or video. Different fields appear depending on what you choose. A journal article asks for volume, issue and DOI; a book asks for publisher, edition and city; a website asks for the date you accessed it because URLs change over time. Fill in what you know; missing fields are handled gracefully so a website with no named author still produces a valid citation.",
        "Once you have entered the details, switch between the five tabs at the top to see your reference formatted in APA 7th, MLA 9th, Harvard, Chicago author-date and Vancouver styles. Each tab shows the same source rewritten in that house style. Click the copy icon to grab the formatted citation for your essay, dissertation or bibliography. You can add multiple sources and the tool keeps them all in one list, ready to paste into a reference section."
      ),
      createAnswerFirstSection(
        "Picking the Right Citation Style for Your Essay",
        "The style is usually dictated by your department or journal. Psychology and education courses tend to require APA 7th, which is author-date with a hanging-indent reference list. English and humanities subjects often use MLA 9th, which uses Author Last Name and a page number in-text. Harvard is the standard at most UK universities outside of psychology, especially in business and social sciences; check your handbook because Harvard has many regional variations. Chicago author-date appears in history and some sciences, while Vancouver is used for medicine, nursing and biomedical journals.",
        "If your tutor specifies a style not listed here, the closest matches are usually Harvard (for OSCOLA-style legal references, you will need a specialist tool), or APA (for Cite Them Right Harvard, which is used at many UK universities and is very similar). Always check one citation against an example in your handbook before generating a full bibliography - automated tools handle 95% of cases well but can stumble on edited collections, translated works, or edge cases like government reports. While you are tightening up your essay, run the text through a [Word Counter](/word-counter) to confirm you are within the assignment word limit."
      ),
    ],
    faqs: [
      createFAQ(
        "Will this citation generator handle every source type?",
        "It handles the five most common: books, websites, journal articles, newspaper articles and videos. It does not generate citations for podcasts, social media posts, government reports, conference papers, theses, or legal cases - those have format quirks that are easier to handle by hand using your style guide. For 90% of undergraduate essays, the five supported types cover everything you cite."
      ),
      createFAQ(
        "What is the difference between APA 7th and APA 6th?",
        "APA 7th (released 2019) is the current standard. The main changes from 6th: DOIs are formatted as full URLs (https://doi.org/10.xxxx); the publisher location is no longer required for books; \"et al.\" is used after three or more authors instead of six; and singular \"they\" is now accepted. If your handbook still shows APA 6th, check whether your institution has updated since the handbook was written - most have."
      ),
      createFAQ(
        "Why does my citation look slightly different from my professor's example?",
        "Even within one style, formatting varies. Cite Them Right Harvard differs from the original Anglia Ruskin Harvard. Your university may have a house style that tweaks indentation, italics or punctuation. Use the generated citation as a starting point and adjust to match the example in your specific handbook. The order of fields and the punctuation between them is the part the tool gets right; small font choices may need a manual tweak."
      ),
      createFAQ(
        "Should I cite Wikipedia?",
        "Generally not in academic work. Most tutors will accept Wikipedia as a starting point for finding sources but not as a citation. If you do need to cite it (for example, in a piece about Wikipedia itself), treat it as a website with the page title, the URL, and the date you accessed it. Be aware that Wikipedia content changes, so the access date is essential."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "readability-checker", label: "Readability Checker" },
      { slug: "case-converter", label: "Case Converter" },
    ],
  },

  "country-quiz": {
    sections: [
      createAnswerFirstSection(
        "How the Country Quiz Works",
        "Pick a mode - Flag Quiz shows a flag and asks you to name the country, Capital Quiz shows a country and asks for its capital city. You then get 10 multiple-choice questions, each with four options. Click an answer; correct picks turn green and add to your score, wrong ones go red. A streak counter rewards consecutive correct answers, and the score persists locally so you can come back to your high score later.",
        "The questions pull from a live country database covering all 195 UN-recognised countries plus a handful of territories. That breadth is what makes it interesting and occasionally frustrating - questions about Tuvalu, Eswatini or Kiribati will catch most players out, even those who breeze through European geography. Treat sub-50% scores on a first attempt as normal and use the wrong answers to learn."
      ),
      createAnswerFirstSection(
        "Tips for Boosting Your Score",
        "Flag recognition tends to be easier than capitals because flags use a small palette of recurring elements - stripes, crescents, red-white-red Pan-Slavic schemes, the Union Jack canton on Commonwealth flags. Group countries by region and learn flag families: Nordic crosses (Sweden, Norway, Denmark, Finland, Iceland), Pan-African red-yellow-green (Ghana, Mali, Senegal), and the Latin American horizontal tricolours that catch out almost everyone.",
        "Capitals are trickier because the well-known ones (Paris, Tokyo, Cairo) are the rare cases. Many capitals are not the largest city - Brasília not Rio, Canberra not Sydney, Ottawa not Toronto, Wellington not Auckland. Some recently changed - Astana became Nur-Sultan and then went back to Astana again. The quiz uses current names, so if you were taught a name 20 years ago, double-check before being too confident. If you want to drill capitals systematically rather than randomly, build a deck in the [Flashcard Maker](/flashcard-maker) and use it for spaced repetition."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the quiz fair on countries I have never heard of?",
        "It is honestly weighted towards general knowledge, which means smaller countries do appear. You will sometimes get questions about places like Comoros, Vanuatu or São Tomé and Príncipe. This is intentional - a quiz that only asked about the G20 would be too easy. Treat unfamiliar questions as a chance to guess based on regional clues (a flag with green and white probably belongs to a Muslim-majority country; a capital ending in -stan suggests Central Asia) and learn from the result."
      ),
      createFAQ(
        "Why are some countries missing?",
        "The quiz uses the REST Countries database, which covers UN members plus a few widely recognised territories. Disputed regions like Taiwan, Kosovo, Western Sahara and Palestine are handled inconsistently across data sources. The quiz includes them where the source data does. If a country you expected does not appear, it is usually because it lacks a registered capital city in the source data."
      ),
      createFAQ(
        "How is the streak counter useful?",
        "The streak resets to zero on every wrong answer, which means a 10-question quiz scoring 9/10 might end with a streak of 4 (if your one mistake landed mid-quiz) or a streak of 10 (if you got every answer right). It is a pure flex metric - useful for friendly competition, less useful as a learning tool. Score is the more honest number."
      ),
      createFAQ(
        "Can I review my mistakes after the quiz?",
        "Not directly - questions are generated fresh each round so there is no saved log. If you want to learn from mistakes, take a screenshot or note the country down when you get one wrong. For systematic study, picking a region (Europe, Africa, Asia) and running through atlases or memory apps tends to work better than relying on a quiz alone."
      ),
    ],
    relatedTools: [
      { slug: "writing-prompt-generator", label: "Writing Prompt Generator" },
      { slug: "flashcard-maker", label: "Flashcard Maker" },
      { slug: "reading-level-checker", label: "Reading Level Checker" },
    ],
  },

  "grade-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Weighted Grades Are Calculated",
        "Start by entering each component of your course - homework, quizzes, midterm, final, projects - along with the percentage weight of each. The weights should sum to 100, but the tool also handles partial scenarios where you have only completed some assessments and want to project where you currently stand. Type in the percentage you scored on each and the calculator returns your weighted average plus a letter grade on the standard A-F scale (A 90+, B 80-89, C 70-79, D 60-69, F below 60).",
        "The calculation is straightforward: multiply each score by its weight, sum the results, divide by total weight. A student with 85% on homework (weight 20), 78% on quizzes (weight 20) and 91% on midterm (weight 30) has a weighted total of (85 × 20 + 78 × 20 + 91 × 30) / 70, which is 85.4% with two-thirds of the course complete. The remaining 30% (typically the final exam) determines the final grade, which is exactly what students need to plan revision time."
      ),
      createAnswerFirstSection(
        "What Score You Need on the Final",
        "Once you have entered your current grades, the tool tells you what you need to score on the remaining assessments to hit a target. If you are sitting on 85.4% with 30% of the course left and you want a final A (90%), you need (90 × 100 - 85.4 × 70) / 30 on the final, which is 100.7%. That is impossible, which tells you an A is out of reach unless extra credit appears. Aiming for a B (80%) is comfortably achievable with a 70% on the final, which is the kind of clarity that helps students prioritise revision against other modules.",
        "A common scenario: students enter their grades the night before a final and discover that even a perfect score will not save the grade, or conversely that they only need 50% to keep a B. Both pieces of information are useful. The first reframes the goal (focus on minimising damage and prioritising other modules); the second reduces panic and frees up energy for genuinely make-or-break exams elsewhere. If your course awards grades on a different scale (UK degree class, German Abschlussnote, Australian high distinction), use the [International Grade Converter](/grade-conversion-tool) to translate the percentage figure here into your local grading system."
      ),
    ],
    faqs: [
      createFAQ(
        "Does this work for UK university grades?",
        "It uses the US-style A-F letter scale, which works directly for international schools using that system and roughly maps to UK degree classifications (A is First, B is 2:1, C is 2:2, D is Third, F is Fail). UK universities calculate using percentages with thresholds at 70 (First), 60 (2:1), 50 (2:2) and 40 (Pass), so the underlying weighted-average calculation works fine - just ignore the letter grade and read the percentage figure instead."
      ),
      createFAQ(
        "What if my weights do not add up to 100?",
        "The tool handles this gracefully by dividing by the actual sum of weights rather than assuming 100. So if you enter weights of 25, 25 and 25 (total 75) the calculator treats it as 1/3, 1/3, 1/3. This is useful when you want to track progress mid-semester before all assessments are listed. Once you know all components, double-check that the weights sum to 100 to match your syllabus exactly."
      ),
      createFAQ(
        "Can I use percentages above 100 for extra credit?",
        "Yes. The tool accepts any positive number, including scores over 100% if your professor offers bonus marks. Be careful with this - a 110% on a 10%-weighted assignment only adds an extra 1% to your overall grade, which is rarely enough to push a B to an A. Use the calculator to check whether the extra credit is worth chasing or whether your time is better spent on a heavier assessment."
      ),
      createFAQ(
        "Why does my online grade portal show a different number?",
        "Most portals (Canvas, Blackboard, PowerSchool) calculate grades the same way, but the figure they show often excludes assignments not yet graded. If you have submitted a paper that has not been marked, the portal might show 92% based on completed work only. This calculator shows the weighted total including any zeros for missing submissions, which can make it look lower than the portal figure - check that you have entered scores for every assessment and not left blanks."
      ),
    ],
    relatedTools: [
      { slug: "percentage-calculator", label: "Percentage Calculator" },
      { slug: "grade-conversion-tool", label: "International Grade Converter" },
      { slug: "fraction-calculator", label: "Fraction Calculator" },
    ],
  },

  "halloween-word-search": {
    sections: [
      createAnswerFirstSection(
        "How to Use the Halloween Word Search",
        "The puzzle loads with 30 spooky words ready to hunt: short three-letter ones like BAT, BOO and HEX, building up to BROOMSTICK, SKELETON and SCARECROW for stronger readers. Click and drag through the grid to highlight a word, release to confirm. The word list updates as you find each one, with a counter showing your progress. The default 12x12 grid suits children from age 6 upwards; push it to 15x15 or 18x18 for older players or a longer puzzle.",
        "Difficulty changes how words sit in the grid. Easy uses horizontal and vertical placement only, which is the right level for a Year 1 or Year 2 classroom. Medium adds diagonals - the standard for ages 7 to 10. Hard adds backwards words too, which means HOWL might appear as LWOH and TOMB might read BMOT. That backwards twist is what catches out children who race through the medium version, so save it for ages 9 and up."
      ),
      createAnswerFirstSection(
        "Halloween Party Activity Without the Setup",
        "If you are running a Halloween classroom session or a party for trick-or-treaters who arrive early, this puzzle plus a printer is a 30-second activity. Print one copy per child, hand out pencils, and you have 10 to 15 minutes of focused quiet that pairs nicely with carved pumpkin biscuits. The premium PDF (£1.99) gives you an answer key, which is essential if you have 25 children working at different speeds and you want to mark them quickly. The free version watermarks the corner but is fine for casual home use.",
        "For a brain-stretching twist, set a 5-minute timer and challenge children to find as many words as they can. The longer entries (WEREWOLF, BROOMSTICK, SCARECROW) tend to be spotted last because the eye scans for short words first. After Halloween, swap in the [Christmas Word Search](/christmas-word-search) for the December half of term - same mechanics, festive theme."
      ),
    ],
    faqs: [
      createFAQ(
        "What age group is this Halloween word search for?",
        "The default 12x12 medium-difficulty version suits ages 7 to 10. For Reception and Year 1, drop to a 10x10 grid and easy difficulty so words run only horizontally and vertically. For ages 11 and above, push to 18x18 with hard difficulty for backwards placement. The 30-word list mixes easy and hard words, so younger children typically find 15 to 20 of them and that is fine."
      ),
      createFAQ(
        "Are the words age-appropriate?",
        "The list leans on the lighter side of Halloween: BLOOD and ZOMBIE are the spookiest entries; nothing graphic. Most words (PUMPKIN, COSTUME, CANDY, GHOST, WITCH, SPIDER) sit firmly in the trick-or-treat zone that even nervous five-year-olds enjoy. If a child is particularly sensitive, scan the word list with them before printing and you can mentally skip any words they would rather not look for."
      ),
      createFAQ(
        "Will the puzzle print clearly?",
        "Yes, the PDF is sized for A4 with cell spacing that prints cleanly on most home and office printers. Stick to grid sizes of 12x12 or 15x15 for the cleanest print; 18x18 and 20x20 grids are still readable but the cells get small and pencils need a sharper point. Print in black and white to save ink - the puzzle does not rely on colour."
      ),
      createFAQ(
        "Can I make my own themed word search?",
        "Yes. Use the [Word Search Generator](/word-search-generator) and paste in any list of words you like, including pupils' names, weekly spellings or vocabulary from a current topic. The Halloween version exists as a ready-made shortcut for the season, but the general generator handles any theme you can think of."
      ),
    ],
    relatedTools: [
      { slug: "christmas-word-search", label: "Christmas Word Search" },
      { slug: "word-search-generator", label: "Word Search Generator" },
      { slug: "halloween-costume-generator", label: "Halloween Costume Generator" },
    ],
  },

  "handwriting-practice-sheet": {
    sections: [
      createAnswerFirstSection(
        "How to Generate a Practice Sheet",
        "Type the letters, words or sentences you want a child to practise into the text box. Choose Print or Cursive style. Print is the standard ball-and-stick letter shape used in UK Reception and Year 1 classrooms. Cursive is the joined-up handwriting taught in Year 2 onwards in most UK schools, with entry strokes from the baseline. Set the line style (solid or dashed guides), line spacing (small for Year 4 and up, medium for Year 2 to 3, large for Reception), and font size to match the child's current writing level.",
        "The repetition setting controls how many times the text appears on the sheet. Set it to 1 for a single practice line; set it to 4 or 5 for sustained practice on tricky letters. For letter formation work, keep the text short - a single letter repeated, or three difficult letters like b, d and p that children commonly reverse. For sentence-level practice, drop the repetition to 1 and keep the sentence short enough to fit on one or two lines."
      ),
      createAnswerFirstSection(
        "Print Versus Cursive: Which to Use",
        "UK schools teach printed letters first (Reception and Year 1), then introduce pre-cursive letter shapes with entry and exit strokes in Year 1 or 2. Fully joined cursive comes in around Year 3. If you are supporting a UK pupil, follow whatever style the school uses - mixing styles slows children down. Ask the class teacher which scheme they follow (common ones are Letterjoin, Penpals, and Nelson handwriting); each has slightly different letter formations.",
        "Note that handwriting practice differs by country. American schools often teach D'Nealian, which is a slanted print style with hooks designed to ease the transition to cursive, rather than the upright UK ball-and-stick style. The cursive option in this tool produces a flowing joined-up style closer to the UK Nelson model than to American Zaner-Bloser. If you are an American parent, check that the cursive style here matches what your child is being taught at school before using it for homework practice. For weekly spelling work alongside handwriting, the [Spelling Test Generator](/spelling-test-generator) gives you printable test sheets that pair well with handwriting drills."
      ),
    ],
    faqs: [
      createFAQ(
        "What age is handwriting practice useful for?",
        "Pencil-grip and letter formation work starts around age 4 in Reception. Most letter formation problems are resolved by age 7. Children with dysgraphia, fine motor delays or who started school later may benefit from extra practice into Years 4 and 5. The tool's large font size and large line spacing settings are designed for early-years work; small spacing and small font suit fluent writers refining neatness rather than learning shapes."
      ),
      createFAQ(
        "What is the difference between solid and dashed lines?",
        "Solid guidelines are the standard tramline style with a baseline, x-height line and ascender line for letters to sit on. Dashed lines do the same job but with a broken pattern that some children find less visually busy. Use solid for first introduction (the lines are clearer); switch to dashed once the child is forming letters well and would benefit from a less prescriptive guide. Both print and cursive styles work with either line type."
      ),
      createFAQ(
        "Can I print sheets with my child's name at the top?",
        "Yes, fill in the optional Student Name field and it appears at the top of the sheet. This is useful when generating a stack of sheets for a classroom (each child gets their own personalised sheet) or for home practice where you want to date the work for a portfolio. The name does not appear in the practice text itself unless you also type it in the practice box."
      ),
      createFAQ(
        "Why does my downloaded sheet look different to the on-screen preview?",
        "The PDF is sized for printing at A4 with 2cm margins, so the spacing might look tighter on screen at smaller browser zoom levels. Print one sheet and check it against the child's exercise book line spacing - if the lines are too close, increase the spacing setting and regenerate. Children's writing books in UK schools typically use 8mm or 12mm line spacing, which the medium and large settings approximate."
      ),
    ],
    relatedTools: [
      { slug: "spelling-test-generator", label: "Spelling Test Generator" },
      { slug: "maths-worksheet-generator", label: "Maths Worksheet Generator" },
      { slug: "word-scramble-generator", label: "Word Scramble Generator" },
    ],
  },

  "maternity-leave-by-country": {
    sections: [
      createAnswerFirstSection(
        "How Maternity and Parental Leave Compare Internationally",
        "The differences are staggering. The UK offers 52 weeks of statutory maternity leave with 39 paid weeks - the first 6 at 90% of average earnings, then 33 weeks at the flat rate of £187.18 (2025/26 SMP), with the remaining 13 weeks unpaid. Sweden offers 480 days (around 68 weeks) of paid parental leave shared between both parents at 80% of earnings. The United States has no federal paid leave at all, with FMLA providing 12 weeks of unpaid job-protected leave for eligible employees only.",
        "The numbers in the tool show statutory minimums, but actual employer policies often go further. Many large UK employers offer enhanced maternity pay - 6 months at full pay is fairly standard at FTSE 100 firms and the public sector. Tech companies in the US sometimes offer 16 to 20 weeks fully paid despite the lack of any legal floor. If you are weighing up jobs, ask about the company's specific scheme rather than relying on the country average."
      ),
      createAnswerFirstSection(
        "Reading the Pay Rates Carefully",
        "Pay rates are where countries diverge most. \"Paid leave\" means very different things across borders. The UK's 39 paid weeks include 33 weeks at £187.18 per week, which works out to about £8,103 over those weeks - far less than full pay for most earners. By contrast, Norway pays 100% for 49 weeks. Germany pays Elterngeld at roughly 65% of net pay, capped at €1,800/month. Always look at the pay rate alongside the duration; a long unpaid leave is not the same as a long paid leave.",
        "Paternity leave is often overlooked in these comparisons. The UK gives 2 weeks of statutory paternity leave at the same flat rate as SMP. Sweden splits its 480 days between parents with 90 days reserved for each (use it or lose it). Iceland and Norway are similar. Countries that ringfence weeks for fathers see significantly higher take-up by men, which is one of the reasons Nordic countries report more equal childcare distribution between parents. If you are considering relocation as a couple, the paternity column matters as much as the maternity column. To compare overall time off as well, cross-reference with the [Annual Leave by Country](/annual-leave-by-country) tool."
      ),
    ],
    faqs: [
      createFAQ(
        "How much will I actually receive in the UK?",
        "Statutory Maternity Pay (SMP) for 2025/26 is 90% of your average weekly earnings for the first 6 weeks, then £187.18 per week or 90% of your earnings (whichever is lower) for the next 33 weeks. The final 13 weeks of your year-long leave are unpaid. Many employers offer more generous occupational maternity pay on top - check your employee handbook. To get SMP at all, you must have worked for the same employer for 26 weeks by the 15th week before your due date and earn at least £125/week."
      ),
      createFAQ(
        "What does the United States actually offer?",
        "Federally, FMLA gives 12 weeks of unpaid, job-protected leave but only to employees of larger firms (50+ workers) who have worked at least 12 months. There is no federal requirement for paid leave. Some states (California, New York, New Jersey, Washington, Massachusetts among others) run their own state paid family leave schemes funded by payroll deductions, with pay rates around 60 to 90% of wages capped at a weekly maximum. Big tech and finance employers often offer 16+ weeks of fully paid leave as a recruitment perk."
      ),
      createFAQ(
        "Is it worth relocating for better maternity leave?",
        "Probably not for the leave alone - relocation costs and tax differences usually outweigh the benefit. But if you are already considering a move (for career reasons, family, cost of living), maternity policy is one factor that adds up over a working lifetime. Two children with 12 months of leave each in the UK means roughly 18 months of paid time off your career, compared to potentially zero in the US. That difference compounds over decades and affects pension, savings, and career trajectory."
      ),
      createFAQ(
        "What is the difference between maternity and parental leave?",
        "Maternity leave is reserved for mothers who have given birth (or sometimes adopted, depending on country). Parental leave is a broader category that either parent can take, often shared. Sweden, Iceland and Norway have moved largely to parental leave models with smaller maternity-specific portions. The UK has Shared Parental Leave (SPL) which lets parents share up to 50 weeks and 37 weeks of pay, but uptake remains under 5% - most UK families still default to the mother taking traditional maternity leave."
      ),
    ],
    relatedTools: [
      { slug: "annual-leave-by-country", label: "Annual Leave by Country" },
      { slug: "maternity-pay-calculator", label: "UK Maternity Pay Calculator" },
      { slug: "child-benefit-calculator", label: "Child Benefit Calculator" },
    ],
  },

  "maths-worksheet-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Generate a Maths Worksheet",
        "Pick the operations you want on the sheet - addition, subtraction, multiplication, division, or any combination. Choose a difficulty level, which sets the number range automatically: easy (1-10) for Reception and Year 1, medium (1-50) for Years 2 to 4, hard (1-100) for Years 5 and 6. You can also override the range manually if you want a tight focus, like multiplication tables 2 to 12 only. Set the question count (10 for a quick warm-up, 20 for a focused practice session, 50 for a substantial homework piece) and hit generate.",
        "The tool produces a printable PDF with questions on the first page and an answer key on the last. The free version watermarks the corner; the premium PDF (£1.99) removes the watermark and adds a clean header with student name, date and a score box, which is the version most teachers print for class. Toggle the columns setting between 1 and 2 - 1-column suits younger children with more space per question, 2-column fits more questions per page for fluent learners."
      ),
      createAnswerFirstSection(
        "Matching Worksheets to UK Maths Topics",
        "The tool maps loosely to the UK National Curriculum. Year 1 and 2 focus on addition and subtraction within 100, which the easy and medium ranges cover. Year 3 introduces times tables up to 12x12 - generate multiplication-only sheets with the range set to 1-12 for a Year 3 times tables drill. Years 4 to 6 cover written long multiplication, long division and operations with larger numbers; bump the range to 1-100 or higher for those.",
        "For mixed-operation practice, tick all four operation boxes and the worksheet randomises across them, which is the closest equivalent to the SATs-style mixed arithmetic paper that UK Year 6 pupils sit. Division questions default to no remainders (clean integer answers), but tick the include-remainders box for trickier Year 5 and 6 work. For times-table-specific practice, the dedicated [Times Tables Practice](/times-tables-practice) tool is faster, since it lets you pick a specific table and drill it."
      ),
    ],
    faqs: [
      createFAQ(
        "What ages is the worksheet generator for?",
        "Easy difficulty (1-10) suits ages 4 to 6 (Reception, Year 1). Medium (1-50) covers ages 6 to 9 (Years 2 to 4). Hard (1-100) and the manual range options work for ages 9 and up (Years 5 and 6, plus Year 7 catch-up work). Younger children benefit from the 1-column layout with fewer questions per page; older children handle 2-column layouts with 30 to 50 questions per sheet."
      ),
      createFAQ(
        "Can I generate timed mental maths practice?",
        "The tool produces the worksheet itself but does not run a timer. For mental maths, generate 30 to 50 mixed-operation questions and set a 10-minute timer separately. UK Year 6 SATs arithmetic papers are 30 minutes for 36 questions, which works out to 50 seconds per question. Train at this pace by generating 36-question sheets at hard difficulty and timing the practice."
      ),
      createFAQ(
        "Why does my division question give a strange answer?",
        "If you generated questions with \"include remainders\" off, the tool ensures all division questions have integer answers (15 ÷ 3 = 5, never 16 ÷ 3 = 5 r1). With remainders on, you get the realistic mix found in primary maths (16 ÷ 3 = 5 r1). For Year 4 to 6 work where pupils are learning long division with remainders, leave the box ticked. For Year 2 and 3 introduction to division, leave it off so children only meet clean answers."
      ),
      createFAQ(
        "Does the answer key match exactly?",
        "Yes, the answer key is generated at the same time as the questions and matches them in order. Print the question page for the child and keep the answer page for marking. If you regenerate the worksheet, both pages refresh with new questions, so make sure to print both pages from the same generation. Each download is independently randomised - two siblings can each have their own unique sheet on the same topic."
      ),
    ],
    relatedTools: [
      { slug: "times-tables-practice", label: "Times Tables Practice" },
      { slug: "fraction-calculator", label: "Fraction Calculator" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
    ],
  },

  "number-facts": {
    sections: [
      createAnswerFirstSection(
        "How the Number Facts Tool Works",
        "Type in any positive whole number and hit Get Facts. The tool returns two pieces of information: a maths fact (whether the number is prime, what its factors look like, whether it is a perfect square or a Fibonacci number, what mathematical properties make it interesting) and a trivia fact (cultural references, historical events, sporting records, or general knowledge connections to that number). Try 7 for the prime/lucky-number combination, 42 for the Hitchhiker's Guide reference, 365 for the year-long associations, or 1066 for the Battle of Hastings.",
        "The maths content is sourced from the Numbers API, which catalogues numerical properties for every integer up to several million. Cultural trivia is more selective - common numbers (1 to 100, plus key dates and round numbers like 1000) tend to have rich entries, while obscure numbers may only return a basic mathematical description. Random Number is the fastest way to explore: click it, see what comes back, and follow whatever rabbit hole the result suggests."
      ),
      createAnswerFirstSection(
        "Using It in the Classroom",
        "Number Facts works well as a starter activity in primary maths lessons. Each pupil enters their birthday day-of-month or their lucky number and reports back one fact to the class. This generates a 5-minute speaking activity that reinforces number properties (prime, square, factor) without feeling like a drill. For older pupils, ask them to verify the fact - is 27 really 3 cubed? Can they prove it? This switches passive consumption into active mathematical reasoning.",
        "For a fun cross-curricular link, try house numbers, shoe sizes, or famous dates. The trivia results often pull in history (1066, 1492, 1789, 1945), sport (jersey numbers, world records), and pop culture references. Use the [Prime Number Checker](/prime-number-checker) alongside to verify mathematical claims, or the [Number Base Converter](/number-base-converter) to see the same number in binary, octal and hexadecimal for a computing tie-in."
      ),
    ],
    faqs: [
      createFAQ(
        "Are the facts always accurate?",
        "The mathematical facts are generated from the number's actual properties (prime status, factor list, sequence membership) so they are reliable. The trivia facts are pulled from a curated database and are generally accurate, but as with any aggregated trivia source, very obscure or recent claims should be verified independently before quoting them in academic work. Use it as a conversation starter and follow up with a quick check on anything you intend to cite."
      ),
      createFAQ(
        "Why does my number return \"no fact available\"?",
        "Some numbers, particularly large or obscure ones, do not have a notable trivia entry in the source database. The maths fact will usually return something even for unusual numbers (if nothing else, it can identify the number as composite and give its prime factorisation). If both maths and trivia draw a blank, try a slightly different number or use the Random Number button to find one with richer content."
      ),
      createFAQ(
        "Can negative numbers or decimals be used?",
        "No, the tool accepts positive whole numbers only. Most number-fact databases catalogue the integers, since rational and real numbers form an infinite continuum that does not fit a fact-based catalogue. For decimal facts, you would generally look up the integer part (so for 3.14, look up 3 or 314) or use a dedicated mathematics resource on irrational numbers."
      ),
      createFAQ(
        "What does \"a perfect square\" mean?",
        "A perfect square is a whole number that is the result of multiplying an integer by itself. So 1 (1×1), 4 (2×2), 9 (3×3), 16 (4×4), 25 (5×5), 100 (10×10), and 144 (12×12) are perfect squares. The number facts tool flags this property when relevant. Perfect squares appear frequently in geometry, algebra and number theory, which is why they are highlighted as mathematically interesting."
      ),
    ],
    relatedTools: [
      { slug: "prime-number-checker", label: "Prime Number Checker" },
      { slug: "number-base-converter", label: "Number Base Converter" },
      { slug: "percentage-calculator", label: "Percentage Calculator" },
    ],
  },

  "spelling-test-generator": {
    sections: [
      createAnswerFirstSection(
        "What the Generator Produces",
        "Paste in your weekly spelling list (one word per line, 5-20 words is typical), add the student's name and date, and the tool generates a printable test sheet with numbered blanks for each word. You can choose between numbered lines for write-in answers, or extra sentence-completion lines below each word for context-based testing. Generate up to 4 different shuffled versions of the same word list at once - useful when seating two students next to each other and you need them to get different orderings to discourage copying.",
        "The output is a clean PDF, ready to print on A4. Each test takes about 15 seconds to generate even with multiple versions. The answer key option puts the words back in their original order on a separate sheet for marking - this saves the teacher having to retype the list or refer back to the original. For classes practicing the same words across multiple weeks, regenerate with the same list to get fresh shuffled versions every time."
      ),
      createAnswerFirstSection(
        "Why Shuffling Matters",
        "When students always see words in the same order, some memorise the position rather than the spelling - 'word 5 is friend, word 7 is because, word 12 is through'. Mix up the order and they have to actually know each word independently. Shuffling is particularly important for retests and practice rounds where the same list appears across multiple sessions; without shuffling, you're not testing spelling, you're testing list memorisation.",
        "The tool re-shuffles each time you click generate, so even within a single classroom session you can produce multiple unique versions. Standard practice is two versions for a 30-pupil class to break up rows; for high-stakes tests where copying is a bigger concern, four versions distributed in a checkerboard pattern across desks is more secure. The [word search generator](/word-search-generator) does similar shuffling work for puzzle-based vocabulary practice."
      ),
      createAnswerFirstSection(
        "Setting Up Effective Spelling Practice",
        "Spelling lists work best when grouped by phonetic pattern or word family rather than random selection. The Year 3-4 statutory spelling list groups words by patterns ('actual', 'natural', 'usual' all sharing the '-ual' ending; 'centre', 'theatre', 'metre' all sharing the '-tre' pattern). Generating a test from a single phonetic group reinforces the pattern; generating from random unrelated words reinforces only memorisation. The UK National Curriculum spelling appendix is the standard source for these grouped lists.",
        "For struggling spellers, reduce the list to 5 words and use the sentence-completion option, which gives them context cues that aid recall. For confident spellers, push to 15-20 words and consider mixing word patterns to test broader knowledge. The [handwriting practice sheet](/handwriting-practice-sheet) pairs well for younger pupils who need both letter formation and spelling reinforcement."
      ),
      createAnswerFirstSection(
        "Marking and Feedback Loops",
        "The most effective spelling practice has tight feedback - test, mark, identify the wrong words, retest just those words two days later. The answer key option in the tool makes the marking step fast; pulling out the wrong words and creating a follow-up list takes another minute. Research on spelling retention consistently shows that immediate retest of incorrect words within 48 hours is more effective than re-teaching the whole list a week later.",
        "For self-marking at home, generate two copies: one with answer key, one without. The student does the test from memory, then checks their own work against the key. This works well for KS2 pupils onwards. For younger pupils, parent or sibling marking with a verbal corrections discussion is more effective than silent self-marking, because it creates the verbal-aural reinforcement that strengthens spelling memory."
      ),
    ],
    faqs: [
      createFAQ(
        "How many words should be on a weekly spelling list?",
        "Year 1: 5-8 words. Year 2-3: 8-12 words. Year 4-5: 10-15 words. Year 6 and above: 12-20 words. These are typical UK primary school benchmarks; individual children vary. A list that's 20% wrong on first try is at the right difficulty level - mostly correct shows the words are too easy, mostly wrong shows too hard."
      ),
      createFAQ(
        "Can I include words with apostrophes or hyphens?",
        "Yes, the tool accepts words with apostrophes ('don't', 'we're') and hyphens ('twenty-one', 'mother-in-law') as single entries. Each word must be on its own line in the input. The generator preserves the punctuation in the answer key but on the test sheet only the blank line appears."
      ),
      createFAQ(
        "What's the best paper to print these on?",
        "Standard 80gsm A4 office paper is fine for one-time use. For longer-term wall display or assessment files, 100gsm paper holds up better. The default layout fits one test per page; for younger pupils with bigger handwriting, increase margins or use Year 1-2 lined paper instead of plain."
      ),
      createFAQ(
        "Can students take this online?",
        "The tool is designed for printable physical tests because handwriting reinforces spelling memory more effectively than typing. If you need an online format for remote learning, the word lists themselves can be used in any digital quiz tool; export your list and rebuild the quiz on a digital platform like Quizlet or Google Forms."
      ),
      createFAQ(
        "How do I make tests harder for advanced spellers?",
        "Three approaches: longer lists (20+ words), tighter time limits (typically 15-20 seconds per word for dictation), or include context where the student must identify the correct homophone (their/there/they're; affect/effect). The tool supports the first option directly; the time limit and homophone challenges happen in delivery, not generation."
      ),
    ],
    relatedTools: [
      { slug: "word-search-generator", label: "Word Search Generator" },
      { slug: "handwriting-practice-sheet", label: "Handwriting Practice Sheet" },
      { slug: "word-scramble-generator", label: "Word Scramble Generator" },
    ],
  },

  "word-search-generator": {
    sections: [
      createAnswerFirstSection(
        "What Goes Into a Good Word Search Puzzle",
        "Three things: a word list with the right length spread, a grid sized to fit it, and a difficulty level that matches the player. The generator caps each word at roughly 80% of the grid size, so a 12 x 12 grid (the default) holds words up to 9 letters; pushing longer words into a small grid causes placement failures. It will quietly drop words it can't fit and tell you which ones, rather than producing a half-finished puzzle.",
        "Five built-in themes ship with the tool: Animals (CAT, DOG, FROG, PENGUIN, ELEPHANT), Food (PIE, SUSHI, CHOCOLATE), Sports (GOLF, RUGBY, BASEBALL), Science (DNA, GRAVITY, ECLIPSE), and Countries (USA, JAPAN, FRANCE). Each theme has a graded mix of 3-letter, 4-letter and longer words so the puzzle has visual variety. Or paste your own word list - one per line, or comma-separated - to build a custom puzzle for a classroom topic, a birthday party, or a wedding favour."
      ),
      createAnswerFirstSection(
        "Picking Difficulty (Easy, Medium, Hard)",
        "Difficulty controls direction. Easy uses only right and down; medium adds left and up; hard adds all four diagonals, including the awkward up-and-back-to-the-left direction that turns kids into puzzle detectives. For Key Stage 1 (5 to 7 year-olds) easy is right; Key Stage 2 (7 to 11) tolerates medium; from KS3 onwards hard is fair game. Adults rarely find even hard challenging unless the word list is unfamiliar.",
        "Bigger grid + harder direction set = much longer solve time. A 15 x 15 hard puzzle with 20 words takes a competent adult 8 to 12 minutes; the same word list at easy on a 10 x 10 grid takes 3 to 4. The built-in timer is useful for classroom challenges, party games, and personal-best tracking. For a related printable puzzle format, see the [Word Scramble Generator](/word-scramble-generator)."
      ),
      {
        heading: "Recommended Settings by Age and Use Case",
        table: {
          headers: ["Use Case", "Grid Size", "Difficulty", "Word Count"],
          rows: [
            ["Reception / EYFS", "8 x 8", "Easy", "6 - 8"],
            ["KS1 (5-7 years)", "10 x 10", "Easy", "10 - 12"],
            ["KS2 (7-11 years)", "12 x 12", "Medium", "12 - 15"],
            ["KS3+ (11+ years)", "14 x 14", "Hard", "15 - 18"],
            ["Adult / dinner party", "16 x 16", "Hard", "20 - 25"],
            ["Themed party favour", "12 x 12", "Medium", "10 - 12 (theme words)"],
          ],
        },
      },
      createAnswerFirstSection(
        "Printing for the Classroom or Party Bag",
        "The premium PDF download outputs a clean A4 puzzle with the word list at the side, a separate solution sheet on page 2, and an optional caller-style answer key showing where each word starts. A teacher running 30 children through a Friday-afternoon vocabulary recap can print the same puzzle 30 times, or run the generator 30 times for unique grids that prevent copying.",
        "For seasonal classrooms, you can shortcut to themed variants directly: [Christmas Word Search](/christmas-word-search), [Halloween Word Search](/halloween-word-search), and [Animals Word Search](/animals-word-search) are pre-themed pages with the right vocabulary baked in, suitable for assemblies and party-bag inserts. Or generate your own if your classroom topic doesn't have a pre-built theme."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I include words with spaces or hyphens?",
        "The generator strips spaces and hyphens automatically, so 'ICE CREAM' becomes 'ICECREAM' and 'X-RAY' becomes 'XRAY' in the grid. The word list shown to the player keeps the original formatting so they know what to look for. If you absolutely need the space preserved (for a name like 'NEW YORK'), break it into two separate entries."
      ),
      createFAQ(
        "What grid size should I pick?",
        "Match the longest word: the grid should be at least 25% longer than your longest word. So 'ELEPHANT' (8 letters) needs a 10 x 10 grid minimum, and 'INTERNATIONAL' (13 letters) wants 16 x 16 or larger. The default 12 x 12 is the right starting point for most school and party use."
      ),
      createFAQ(
        "How does it handle words that don't fit?",
        "It tries up to 200 placements per word with random positions and directions. If it still can't fit a word, the word is added to the unplaced list and the puzzle is still generated with the words that did fit. You'll see a message saying which words were dropped, so you can either shrink the word, enlarge the grid, or remove the difficult word entirely."
      ),
      createFAQ(
        "Is the puzzle the same every time?",
        "No. The placement is randomised on every generation, so the same word list produces a different layout each time you click Generate. This is great for printing class sets where each child gets a slightly different puzzle. Hit the button until you get a layout you like, then download."
      ),
      createFAQ(
        "Can I make a word search where words go backwards?",
        "Yes - that's what 'medium' difficulty turns on. Right-to-left and bottom-to-top placement makes the puzzle harder because the eye is trained to read left-to-right. Hard difficulty adds the four diagonal directions on top, including up-left, which is the hardest single direction for most solvers to spot."
      ),
    ],
    relatedTools: [
      { slug: "christmas-word-search", label: "Christmas Word Search" },
      { slug: "halloween-word-search", label: "Halloween Word Search" },
      { slug: "word-scramble-generator", label: "Word Scramble Generator" },
    ],
  },
};
