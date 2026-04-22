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
};
