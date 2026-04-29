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

  "flashcard-maker": {
    sections: [
      createAnswerFirstSection(
        "How to Build a Flashcard Deck That Actually Sticks",
        "Aim for 20 to 50 cards per deck and one fact per card. Anything bigger and you'll spend the session shuffling rather than learning; anything multi-fact and the brain anchors the recall to the wrong cue. The maker holds your front (question) and back (answer) pairs, lets you shuffle for randomised review, and tracks which cards you've marked as Known so the deck shrinks as you go.",
        "Worked example: revising 30 GCSE biology terms. Don't write 'photosynthesis' on the front and a 60-word definition on the back. Write 'What gas do plants release in photosynthesis?' on the front and 'Oxygen' on the back, then a separate card for 'What gas do plants absorb?' with 'Carbon dioxide'. Two atomic cards beat one fat one because each one tests recall in a single direction, which is how flashcards earn their reputation."
      ),
      createAnswerFirstSection(
        "Active Recall and Why Shuffle Matters",
        "Studying flashcards in the order you wrote them is barely better than re-reading notes. Your brain remembers position, not content, and you start anticipating the next card. Hit Shuffle before every session so each card surfaces cold. The maker re-randomises with one click and the order resets every time you toggle it.",
        "Pair the shuffle with the Known button. When you flip a card and the answer comes back inside two seconds with no hesitation, mark it Known. The next pass focuses on the smaller pile of weak cards. Tomorrow, reset Known and run the whole deck again, fresh; the cards that were strong yesterday will mostly stay strong, and the truly fragile ones will resurface. Two short sessions of 10 minutes a day beats one 40-minute slog every Sunday."
      ),
      createAnswerFirstSection(
        "What Each Card Should Look Like",
        "Front: one question, ideally answerable in a single word or short phrase. Back: that one answer, plus a tiny mnemonic or hint if it helps. No paragraphs, no bullet lists, no 'and also'. If you can't fit the answer on a Post-it, split it into two cards.",
        "For language learners, that means front = English word, back = target-language word with gender or article. For maths, front = formula name, back = formula. For history, front = 'Year of the Battle of Hastings?', back = '1066'. For medical students, front = drug name, back = mechanism in three or four words. Keep the [spelling test generator](/spelling-test-generator) and the [times tables practice](/times-tables-practice) in mind for things flashcards aren't great at, like spelling drills and pure number recall, where typed input beats flipping."
      ),
      createAnswerFirstSection(
        "Spaced Repetition on a Budget",
        "Proper spaced-repetition apps (Anki, Quizlet) schedule each card based on how confident you were last time. This maker is simpler and faster to set up: it gives you the deck, the shuffle and the Known toggle. That's enough for most school and university revision if you put the spacing in yourself.",
        "The home-grown system: review the deck the day you build it, again 24 hours later, again 3 days later, again 1 week later, again 2 weeks later. Five sessions across a fortnight will move 80% of the deck into long-term memory. After that, a single review the morning of the exam is usually all you need. Skip a day and the timing slips, but the order matters more than the exact intervals; just keep coming back."
      ),
    ],
    faqs: [
      createFAQ(
        "How many flashcards should I make for one topic?",
        "Roughly one card per fact you actually need to recall, capped at about 50 per deck. A typical GCSE topic ends up at 30 to 40 cards. If your topic feels bigger, split it into two decks (e.g. 'Cell biology - structures' and 'Cell biology - processes') rather than building one giant 100-card deck you'll never finish in a sitting."
      ),
      createFAQ(
        "Should the question or the answer go on the front?",
        "Always the question (or the cue) on the front, the answer on the back. Flashcards work because they force you to retrieve the answer from memory before flipping; if the answer is on the front, you're just re-reading. For pairs you need to know in both directions (English to French AND French to English), make two separate cards, one in each direction."
      ),
      createFAQ(
        "Is it better to write flashcards by hand or use this online?",
        "Honestly, both work and the writing-by-hand-helps-you-learn evidence is weaker than the studyfluencers say. Online cards win on shuffling, on never losing the deck, and on being studyable on a phone in 10 spare minutes. Paper cards win on being away from screens, which matters if you're trying to break a phone-doomscroll habit. Pick the one you'll actually use daily."
      ),
      createFAQ(
        "Why does shuffling matter so much?",
        "Because in a fixed order your brain learns the sequence, not the content. After 3 reviews you can predict that 'Mitochondria' comes after 'Ribosome' and the next answer pops up before you've actually retrieved it. Shuffling forces a cold pull on every card. Click Shuffle before every session, even if the deck is short."
      ),
      createFAQ(
        "Can I save my deck and come back to it later?",
        "This version doesn't save decks between visits, so build the deck and complete the session in one go, or copy your question/answer pairs into a notes app for next time. For longer-term decks (medical school finals, language learning over months), Anki is still the gold standard. For one-off exam revision over a weekend, this is faster to set up."
      ),
    ],
    relatedTools: [
      { slug: "spelling-test-generator", label: "Spelling Test Generator" },
      { slug: "times-tables-practice", label: "Times Tables Practice" },
      { slug: "pomodoro-timer", label: "Pomodoro Timer" },
    ],
  },

  "animals-word-search": {
    sections: [
      createAnswerFirstSection(
        "What's in This Animals Word Search",
        "30 animal words ranging from 3 letters (CAT, DOG, COW, PIG, HEN) up to 8 letters (ELEPHANT, FLAMINGO, KANGAROO). The grid is generated fresh every time you click Generate, so you can print a different layout for every child in a class. Choose easy (forwards only), medium (adds backwards) or hard (adds all eight diagonal directions including upside-down).",
        "The full word pool covers farm animals, big cats, sea creatures, primates and birds. Younger children will spot the short ones first (CAT, FROG, BEAR), which keeps confidence up while they hunt for the longer giraffe, gorilla and octopus. The puzzle prints clean on A4 with the word list underneath, and the [premium PDF download](/animals-word-search) gives you the answer key on a separate page so the teacher can mark it without revealing the solutions."
      ),
      createAnswerFirstSection(
        "Choosing the Right Difficulty for the Age Group",
        "Easy (left-to-right and top-to-bottom only) suits 4 to 6 year olds, who are still learning to scan in one direction. Medium adds right-to-left and bottom-to-top, which works for 6 to 8 year olds who can read fluently but find diagonals frustrating. Hard adds all four diagonals, including the up-left direction that even adults find tricky; reserve it for ages 9 and up.",
        "Class teachers running a mixed-age session can print easy and hard side by side and let kids pick. The animals are the same, but the hard version takes about 4 times as long to solve. Pair the puzzle with a colouring sheet on the back of the page so early finishers have something to do while you wait for the slower solvers."
      ),
      createAnswerFirstSection(
        "Using This in the Classroom or at Home",
        "For Reception and Year 1 (ages 4 to 6): use the easy grid as a phonics warm-up. The teacher reads each word out, kids find it, then write it underneath. This embeds the spelling at the same time as the visual scan.",
        "For Year 2 to Year 4 (ages 6 to 9): use the medium grid as an independent activity during literacy hour or at home as a 15-minute calm-down. Pair with the [word scramble generator](/word-scramble-generator) for variety and the [spelling test generator](/spelling-test-generator) when you want a more direct assessment. For supply teachers walking into an unfamiliar classroom, a stack of pre-printed animal word searches is the cheapest cover material on earth, and kids genuinely enjoy them more than worksheets."
      ),
      createAnswerFirstSection(
        "Print, Save or Play on Screen",
        "Solve directly on screen by clicking and dragging across each word; the puzzle highlights as you go and the word list ticks off as you find them. This version is great for tablets in class or for kids who hate handwriting. Print to paper for traditional puzzle solving with a pencil and a big circle around each word found.",
        "The free version downloads as a watermarked JPG of a single grid. The premium PDF (£1.99) gives you the cleanly typeset puzzle, an answer key, and is print-ready at 300 DPI so the letters look crisp at any size. Bulk-print 30 copies for a whole-class set and the per-page cost is pence."
      ),
    ],
    faqs: [
      createFAQ(
        "What age is this animals word search suitable for?",
        "Ages 4 to 11, depending on difficulty. Set the difficulty to easy for Reception and KS1 (4 to 7), medium for lower KS2 (7 to 9) and hard for upper KS2 and above (9 to 11). The animal words themselves are familiar to all ages, so the difficulty comes from the direction of the words, not the vocabulary."
      ),
      createFAQ(
        "How many animals are in the puzzle?",
        "30 animal words in the pool, but the grid won't necessarily fit all of them depending on the size you choose and which words happen to be too long. The tool tries 200 placements per word; any words that won't fit are listed underneath so you know what was dropped. For the full 30, use a 20x20 grid or larger."
      ),
      createFAQ(
        "Can I print this for my whole class?",
        "Yes, the puzzle is free to print as a watermarked JPG. For class sets, the premium PDF (£1.99) removes the watermark and gives you a high-resolution version that holds up to 30 photocopies without going fuzzy. Each click of Generate produces a different grid, so you can hand out individual variants if you don't want kids copying answers."
      ),
      createFAQ(
        "Where's the answer key?",
        "The answer key is on a separate page in the premium PDF. The on-screen version reveals answers when you click Show Answers below the grid, so for home use you don't need a printed key at all. For classroom use, the separate page lets the teacher mark without giving the puzzle away in advance."
      ),
    ],
    relatedTools: [
      { slug: "word-search-generator", label: "Word Search Generator" },
      { slug: "christmas-word-search", label: "Christmas Word Search" },
      { slug: "halloween-word-search", label: "Halloween Word Search" },
      { slug: "word-scramble-generator", label: "Word Scramble Generator" },
    ],
  },

  "times-tables-practice": {
    sections: [
      createAnswerFirstSection(
        "Practice Mode vs Worksheet Mode",
        "Practice Mode runs an interactive 20-question drill: you select the tables (any combination of 2x through 12x), click Start, and the tool fires multiplication questions one at a time. You type the answer, get instant green-tick or red-cross feedback, and a running score in the corner. Worksheet Mode generates a printable PDF with 20, 40 or 60 questions plus an answer key, in 1 or 2 column layouts.",
        "Practice mode is fastest for 5 to 10 minutes of daily revision; worksheet mode is for the Sunday-night homework session, supply teachers and parents who want to step away while a child works. The drill mixes the selected tables in random order, so picking just 6, 7 and 8 (the three that 90% of children find hardest) is the most effective use of a 10-minute session."
      ),
      createAnswerFirstSection(
        "Which Times Tables Should My Child Practise?",
        "Year 2 (ages 6 to 7): 2x, 5x and 10x. Year 3 (ages 7 to 8): add 3x, 4x and 8x. Year 4 (ages 8 to 9): all tables up to 12x; the multiplication tables check (MTC) is taken in June of Year 4 and tests 6x, 7x, 8x, 9x, 11x and 12x most heavily. Year 5 and 6: maintenance practice across all tables, plus mixed division facts.",
        "If your child is in Year 4 and you only have time for one daily drill, set the tool to 6, 7, 8, 9, 11 and 12. Skip 5 and 10 because almost every child has those nailed by Year 3. Skip 2, 3 and 4 because they're easy enough to recompute on the fly. The MTC measures speed, not just accuracy: 6 seconds per question is the threshold, so practice with the on-screen drill is closer to test conditions than written worksheets."
      ),
      createAnswerFirstSection(
        "How the Worksheet PDF Works",
        "Pick your tables, choose 20, 40 or 60 questions, choose 1 or 2 columns and click Download. The PDF lays out the questions with answer lines, plus a separate answer key page so you can mark without working through it yourself. 20 questions usually takes a Year 3 child 5 to 10 minutes; 60 questions is around 20 to 30 minutes and works well as a Saturday-morning session.",
        "Two columns fit roughly twice as much on a page but the smaller font is harder for younger children. For Year 2 and 3, stick to 1 column. For Year 4 and up, 2 columns saves paper and looks closer to the layout of the [maths worksheet generator](/maths-worksheet-generator) which handles addition, subtraction and division too."
      ),
      createAnswerFirstSection(
        "Why Drill Practice Beats Memorisation",
        "Children who can recite the 7 times table from start to finish often can't answer 'what's 7 times 8?' without starting from 7x1 and counting up. That's because they've memorised a sequence, not the individual facts. A randomised drill forces them to retrieve each fact independently, which is what the MTC and most maths exams actually test.",
        "Set the tool to your weakest table and run 20 questions. If a child gets stuck on 7x8, the answer pops up after the wrong attempt so they see 56 immediately. Within a week of daily 10-minute sessions, that fact moves from 'I have to count' to 'instant recall'. Pair times tables practice with the [flashcard maker](/flashcard-maker) for vocabulary and the [pomodoro timer](/pomodoro-timer) if you're building a longer revision routine."
      ),
    ],
    faqs: [
      createFAQ(
        "What age is the multiplication tables check (MTC) taken?",
        "June of Year 4, when most children are 8 or 9 years old. The MTC is a 25-question on-screen test where each question has 6 seconds. Schools focus heavily on it from Year 3 onward. This practice tool mimics the format with a typed answer and instant feedback, so a child running daily 20-question drills from Easter onward of Year 3 will hit the test in form."
      ),
      createFAQ(
        "How long does the practice drill take?",
        "About 3 to 5 minutes for 20 questions if your child is fluent, 8 to 10 minutes if they're still learning. The sweet spot is short and frequent: 10 minutes a day, 5 days a week beats a 60-minute Sunday cram session by miles for actually building recall speed."
      ),
      createFAQ(
        "Why is 6 seconds per question so important?",
        "Because beyond about 6 seconds, the brain is calculating, not recalling. Mental arithmetic in secondary school maths needs the basic times tables to be automatic so the brain has spare capacity for the harder steps. The MTC sets 6 seconds as the threshold; this drill doesn't enforce a timer, but if your child takes 15 seconds per question they need more practice on those tables before moving on."
      ),
      createFAQ(
        "Can I practise mixed division and multiplication?",
        "This tool is multiplication-only, but the mental link is so close that mastering the times tables makes division mostly free. If you know 8 times 7 is 56, you also know 56 divided by 7 is 8. For dedicated division practice, use the [maths worksheet generator](/maths-worksheet-generator) which can produce mixed-operation worksheets."
      ),
      createFAQ(
        "Does the worksheet include answers?",
        "Yes - every PDF download includes a separate answer key page at the end. So you can hand the worksheet to your child, walk away, and mark it in 60 seconds when they're done. The answer key shows the question and the correct answer side by side, so wrong answers are easy to spot without re-doing the maths."
      ),
    ],
    relatedTools: [
      { slug: "maths-worksheet-generator", label: "Maths Worksheet Generator" },
      { slug: "spelling-test-generator", label: "Spelling Test Generator" },
      { slug: "flashcard-maker", label: "Flashcard Maker" },
      { slug: "pomodoro-timer", label: "Pomodoro Timer" },
    ],
  },

  "country-comparison-tool": {
    sections: [
      createAnswerFirstSection(
        "What This Tool Compares",
        "Pick any two countries from the worldwide list and the tool pulls live data from the REST Countries database to compare them side by side. The metrics shown are population, land area in square kilometres, capital city, region (Europe, Asia, Africa, Americas, Oceania), subregion, official languages, currencies and timezones. It's a snapshot view, not a deep economic dive.",
        "Worked example: comparing the United Kingdom and Japan. The UK has 67 million people in 244,376 km, capital London, currency GBP. Japan has 125 million people in 377,975 km, capital Tokyo, currency JPY. Japan is bigger by area and population, has a denser landmass, and uses a different timezone (UTC+9 vs UTC+0). The tool surfaces these differences instantly without you having to flip between Wikipedia tabs."
      ),
      createAnswerFirstSection(
        "Geography Homework and KS2 Projects",
        "For Year 5 and Year 6 children doing 'compare two countries' projects, this is the fastest way to get the basic facts on one screen. Pick the home country and the country being studied, take a screenshot of the comparison and paste it into the report. The structured layout means children get used to seeing data in fields rather than buried in prose, which is what the new KS2 geography curriculum expects.",
        "For older students, treat the data as a starting point, not a finished essay. Population and area give you density (calculate it: population divided by area equals people per km). Comparing a small dense country (Bangladesh, 1,265 per km) with a large sparse one (Mongolia, 2 per km) opens up real questions about agriculture, urbanisation and infrastructure that aren't visible from the raw numbers."
      ),
      createAnswerFirstSection(
        "Travel Planning Use Cases",
        "Comparing your home country with a holiday destination tells you the practical things at a glance: what currency you'll need, what timezone offset to expect, what language(s) the locals speak, and roughly how long the flight will be (use the [distance calculator](/distance-calculator) for that part).",
        "Worked example: planning a trip from the UK to Australia. Comparison shows GBP vs AUD (use the [currency converter](/currency-converter) for live rates), UTC+0 vs UTC+10 for Sydney (10-hour difference, jet-lag warning), English official in both, and total area 31 times bigger in Australia (so don't try to see it all in two weeks). Internal flights between Sydney and Perth cover 3,930 km - similar to London to Karachi."
      ),
      createAnswerFirstSection(
        "Where the Data Comes From",
        "All comparisons pull from the open REST Countries API, which sources from official UN statistics and CIA World Factbook entries. Population figures are typically updated annually and may lag the latest census by 1 to 2 years. Area figures are stable (they don't change). Capital and currency are official government data; some countries have multiple capitals (e.g. South Africa has Pretoria, Cape Town and Bloemfontein) and the tool shows the primary one.",
        "If a number looks off (population for a small country, area for an island nation), cross-check with the World Bank or UN Population Division. The tool is for quick comparison and homework, not for academic citation; if you're writing a dissertation, use the original source data directly."
      ),
    ],
    faqs: [
      createFAQ(
        "How many countries can I compare at once?",
        "Two countries side by side. Comparing three or more on one screen makes the layout cramped and hard to read on a phone. If you need to compare four countries, run the tool twice with different pairs and take screenshots. For aggregate stats across many countries (e.g. all of EU), the World Bank's data portal is better suited."
      ),
      createFAQ(
        "How current is the data?",
        "Population and economic figures are typically 1 to 2 years out of date because they rely on national statistics offices publishing annual updates. Area, capital and currency are stable and accurate. For up-to-the-minute population estimates, the UN Population Division publishes daily projected figures."
      ),
      createFAQ(
        "Why doesn't the tool show GDP, life expectancy or other stats?",
        "The REST Countries API focuses on basic identity data (population, area, capital, languages, currencies, timezones). Economic and health indicators come from different datasets (World Bank, WHO, OECD) which need separate API calls and licensing. We may add a premium 'extended comparison' view in the future; for now, use the basic comparison plus the World Bank's free data tools for extras."
      ),
      createFAQ(
        "Can I save or share the comparison?",
        "The current version doesn't save comparisons between sessions, but you can screenshot the result. For sharing with a class or in a report, the screenshot drops cleanly into Google Docs or Word. For repeated lookups of the same pair, bookmark the page after selecting both countries (the URL captures the state on some browsers)."
      ),
    ],
    relatedTools: [
      { slug: "currency-converter", label: "Currency Converter" },
      { slug: "distance-calculator", label: "Distance Calculator" },
      { slug: "date-format-converter", label: "Date Format Converter" },
    ],
  },

  "grade-conversion-tool": {
    sections: [
      createAnswerFirstSection(
        "What Grade Systems This Converts Between",
        "Six systems, all bidirectional: US GPA (4.0 scale), Canadian GPA (4.0 scale), UK university classifications (First, 2:1, 2:2, Third), Australian (HD, D, C, P), German (1.0 to 5.0, where 1.0 is best), French (0 to 20) and Indian (percentage or CGPA on a 10-point scale, multiply CGPA by 9.5 for percentage). Pick your input system, enter the grade, and the tool shows the equivalent in every other system at once.",
        "The conversion path is: input grade gets converted to a percentage on a 0 to 100 scale, then that percentage gets mapped onto every other scale. So a US GPA of 3.5 = 87.5%, which maps to a UK 2:1 (60-69% is the band, but 70%+ is First class so 87.5% would be a strong First in UK reckoning), an Australian D (75-84%), a German grade around 2.0, a French 17.5/20 and an Indian percentage of 87.5%."
      ),
      createAnswerFirstSection(
        "Why Grade Conversion Is Always Approximate",
        "No two grading systems mark the same way. A UK First-class degree (70%+) is genuinely rare (about 28% of graduates in 2023), whereas a US GPA of 3.7+ (the rough equivalent) is held by closer to 40% of US graduates. The percentages match on paper but the underlying difficulty curve doesn't. So a UK 2:1 might be 'better' than a US 3.5 in terms of relative ranking, even though the numbers convert directly.",
        "Universities know this. When a UK 2:1 graduate applies to a US master's programme, the admissions office will use a conversion table broadly similar to this tool's output but will also weight the institution's reputation, the specific modules taken, and any standardised test scores like the [SAT](/sat-score-calculator) or GRE. Don't treat the converted GPA as definitive; treat it as the starting point for a conversation."
      ),
      createAnswerFirstSection(
        "Common Conversions for Real Applications",
        "UK 2:1 (60-69%) converts to roughly US GPA 3.0 to 3.5, which is the cut-off most US graduate schools want. UK First (70%+) converts to US GPA 3.6 to 4.0, the range top schools (Harvard, MIT, Stanford) require. UK 2:2 (50-59%) converts to US GPA 2.4 to 2.9, which struggles to clear the GPA threshold at most American graduate programmes.",
        "Going the other way: a US GPA of 3.0 (the typical 'B average') converts to a UK percentage of 75%, which lands at the top of the 2:1 range. US GPA 3.5 lands at 87.5%, well into First-class territory. The mismatch is mostly because UK degrees apply much harder grading curves at the top end, while US schools have grade-inflated for decades. For UK students applying to US schools, your degree is usually 'better' than the raw GPA conversion suggests; for US students applying to UK schools, the opposite. Use the [US GPA calculator](/us-gpa-calculator) if you need to compute your GPA from raw US course grades first."
      ),
      createAnswerFirstSection(
        "Where the Tool Falls Short and Where It Doesn't",
        "It doesn't know about the institution. A 2:1 from Oxford and a 2:1 from a less selective university convert identically in this tool, but admissions offices treat them very differently. It also doesn't account for module weighting (a 2:1 with First-class marks in the dissertation reads stronger than a 2:1 with weak honours papers). For a final, signed-off conversion that universities will accept, use WES (World Education Services) which charges around $200 and produces an official document.",
        "What the tool does well: gives you the ballpark in 10 seconds for free, lets you sense-check what a recruiter or university is asking for, and runs entirely in your browser so your grades don't leave your device. Useful for: writing a CV that needs both the UK and US versions, checking entry requirements before paying application fees, or just understanding what a friend's overseas degree means."
      ),
    ],
    faqs: [
      createFAQ(
        "Is a UK 2:1 the same as a US GPA of 3.0?",
        "Roughly, yes - though it depends on which university and which grade band of 2:1 you achieved. A solid mid-2:1 (around 65%) maps to US GPA 3.2; a high 2:1 (68%+) is closer to GPA 3.5. Both clear the typical GPA 3.0 minimum that US graduate programmes require. For competitive programmes (Ivy League, top public universities), aim for an upper 2:1 or First."
      ),
      createFAQ(
        "What is a First-class honours in US GPA?",
        "Roughly 3.7 to 4.0 on the US 4.0 scale. UK First-class honours (70%+) is genuinely rare and is treated by US admissions offices as equivalent to summa cum laude or magna cum laude (top of the class). If you graduated with a First, list both: 'BSc First-class honours (equivalent to GPA 3.8)' so the US reader doesn't have to convert."
      ),
      createFAQ(
        "How do I convert an Indian percentage to UK or US grade?",
        "Indian universities mostly use a 0-100 percentage system. 60%+ in India is typically First-class, which converts to UK upper second (2:1) or US GPA around 3.0 to 3.3. 75%+ is Distinction, which converts to UK First (70%+) or US GPA 3.7+. CGPA on a 10-point scale: multiply by 9.5 to get percentage, then convert from there. So CGPA 8.0 becomes 76%, which is a UK First."
      ),
      createFAQ(
        "Will universities accept this conversion?",
        "Most universities will accept it as a guide only. For formal admissions, you'll usually need an official credential evaluation from WES (World Education Services), ECE (Educational Credential Evaluators) or a similar service, which costs around $200 and produces a document the university will trust. This tool is for self-orientation: figuring out whether you're in the right ballpark before paying for the official version."
      ),
      createFAQ(
        "Why is the German system reversed (1.0 is best)?",
        "Historical convention. The German Notensystem runs 1.0 (sehr gut, very good) to 5.0 (nicht ausreichend, fail), with 4.0 being the pass threshold. So German 1.5 is excellent (roughly UK First, US GPA 3.8+), German 2.5 is good (UK 2:1, US GPA 3.0 to 3.3), German 3.5 is satisfactory (UK 2:2, US GPA 2.0 to 2.5). The tool flips this automatically, but be aware when reading German transcripts that 'low number = high grade'."
      ),
    ],
    relatedTools: [
      { slug: "us-gpa-calculator", label: "US GPA Calculator" },
      { slug: "sat-score-calculator", label: "SAT Score Calculator" },
      { slug: "us-college-cost-calculator", label: "US College Cost Calculator" },
    ],
  },

  "sat-score-calculator": {
    sections: [
      createAnswerFirstSection(
        "How the SAT Composite Score Works",
        "The SAT is scored out of 1600. Two sections each contribute up to 800: Evidence-Based Reading and Writing (combined into one section as of the 2024 digital SAT redesign) and Math. Enter your section scores from 200 to 800 each and the calculator adds them, returns the composite, and looks up your percentile against the national pool of test-takers. A composite of 1600 is a perfect score; the national average sits around 1050.",
        "Worked example: Reading and Writing 650, Math 700. Composite is 1350. The percentile lookup returns roughly the 91st percentile, meaning you scored higher than about 91% of all SAT takers that year. That's strong enough for most state universities and for serious consideration at competitive private schools, though Ivy League admissions typically expect 1500+ for a first-look."
      ),
      createAnswerFirstSection(
        "Score Bands and What They Actually Mean for College",
        "1600 is perfect, achieved by under 1% of test-takers each year. 1500+ (top 1%) puts you in the Ivy League conversation. 1400+ (top 5%) is the cut-off for many selective universities (Tufts, Vanderbilt, Northwestern, Notre Dame). 1300+ (top 15%) opens up many top public flagship universities (UCLA, UVA, Michigan). 1200 is a solid score for most four-year colleges. 1050 is the national average and clears most state university requirements.",
        "Don't read those bands as guarantees. The SAT is one part of a holistic application that also weighs GPA, course rigor, essays, recommendations and extracurriculars. A 1500 with a weak GPA gets rejected from Harvard; a 1350 with a 4.0 unweighted GPA, a state debate championship and a strong essay can land at Princeton. The score is a hurdle to clear, not a ticket. Use the [US college cost calculator](/us-college-cost-calculator) to plan financially once you have target schools."
      ),
      createAnswerFirstSection(
        "Section Scores: Reading and Writing vs Math",
        "Each section is graded independently from 200 to 800, in 10-point increments. Get every question right on Reading and Writing and you score 800; the same on Math gets you another 800, for a 1600 composite. The College Board uses an equating curve that adjusts for difficulty, so two test-takers might answer different numbers of questions correctly but get the same scaled score if their tests had different difficulty levels.",
        "The 800/800 ceiling means you can't compensate for one weak section with a stellar other section if you're aiming for the highest scores. To break 1500, you typically need at least 730 in both sections. If your Math is 800 but Reading and Writing is 600, that's a 1400 composite, which still slips you out of the top tier. Schools like MIT will look at your Math score in isolation; humanities-leaning schools (Yale, Brown) may weight Reading and Writing slightly more, but officially most schools say they look at the composite."
      ),
      createAnswerFirstSection(
        "Practice, Retakes and Superscoring",
        "The average student improves by 60 to 90 points after one retake, and by 100 to 150 points after structured prep over 3 to 6 months. The College Board's free official practice tests on Khan Academy give you a realistic baseline. Plan to take the SAT once in spring of junior year, then retake in the fall of senior year if you want to push the score up before applications close in early January.",
        "Most US universities now superscore: they take your highest section score from any sitting and combine them into a personal best composite. So if you got 700 Reading and Writing + 650 Math in March, then 680 Reading and Writing + 720 Math in October, your superscore is 700 + 720 = 1420, even though you never achieved that composite on a single test. Stanford, MIT, Yale and most Ivies superscore. Some, like Caltech (until recently test-optional), don't. Always check the school's specific policy. For grade conversion if you're applying internationally, use the [grade conversion tool](/grade-conversion-tool) to translate your US GPA for non-US universities."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a good SAT score in 2026?",
        "A good score depends on your target school. The national average is around 1050. 1200 is solid for most four-year colleges. 1400 puts you in the top 5% of test-takers and clears most selective private universities. 1500+ is competitive for the Ivy League. For a top-tier engineering or computer science programme (MIT, Caltech, Stanford), aim for 1550+ with the Math section at 780 or higher."
      ),
      createFAQ(
        "Is the SAT still required for college admissions?",
        "It depends. After 2020, many universities went test-optional. Some have stayed test-optional permanently (most of the UC system, Wake Forest), some reinstated the requirement (MIT in 2022, Dartmouth and Yale in 2024 for the class of 2029), and some are still flexible. Check each target school's website for the current policy. For test-optional schools, submitting a strong score (1450+) usually helps; submitting a weak one (1100 or below) may hurt versus not submitting at all."
      ),
      createFAQ(
        "How is the SAT percentile calculated?",
        "The percentile shows what percentage of test-takers scored at or below your score. So a 1300 at the 87th percentile means 87% of people who took the SAT scored 1300 or lower. The College Board publishes percentiles annually based on the most recent three years of test-takers. The percentile drifts slightly each year as the test population changes; this calculator uses representative figures from recent years."
      ),
      createFAQ(
        "Can I send only my best scores to colleges?",
        "If your school superscores, they'll automatically take your highest section scores across all sittings. Score Choice is a separate College Board feature: it lets you choose which test dates' scores get sent to a school, but each chosen sitting is sent in full (you can't send Math from one date and Reading from another). Some schools (Yale until recently, Georgetown) require all scores from all sittings; check each school's policy before paying score-send fees."
      ),
      createFAQ(
        "How does the SAT compare to the ACT?",
        "Both are accepted by virtually all US universities. The SAT runs 200-800 per section for a 1600 max; the ACT runs 1-36 per section for a 36 max composite. Roughly, SAT 1500 = ACT 34, SAT 1400 = ACT 31, SAT 1300 = ACT 28, SAT 1200 = ACT 25. Take a practice test of each if you're undecided; some students naturally do better on one than the other based on test format and pacing."
      ),
    ],
    relatedTools: [
      { slug: "us-gpa-calculator", label: "US GPA Calculator" },
      { slug: "us-college-cost-calculator", label: "US College Cost Calculator" },
      { slug: "grade-conversion-tool", label: "International Grade Converter" },
      { slug: "us-school-grade-calculator", label: "US School Grade Calculator" },
    ],
  },
};
