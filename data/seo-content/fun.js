// SEO content for fun and games tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const funSEO = {
  "typing-speed-test": {
    sections: [
      createAnswerFirstSection(
        "How Typing Speed Is Measured",
        "Typing speed is measured in words per minute (WPM). A 'word' is standardised as five characters, including spaces. So if you type 200 characters in one minute, your speed is 40 WPM. This standardisation means your score is comparable regardless of whether the text contains short or long words.",
        "The test presents a passage of text and measures how quickly and accurately you type it. Your WPM score accounts for errors, so mistyped words reduce your effective speed. The accuracy percentage shows what proportion of words you typed correctly on the first attempt."
      ),
      {
        heading: "Average Typing Speed by Skill Level",
        table: {
          headers: ["Skill Level", "WPM Range", "Description"],
          rows: [
            ["Beginner", "20-30 WPM", "Hunt-and-peck typing, looking at the keyboard"],
            ["Average", "35-45 WPM", "Casual typist, some touch typing"],
            ["Above average", "45-60 WPM", "Comfortable touch typist, office worker"],
            ["Fast", "60-80 WPM", "Skilled typist, most professional needs covered"],
            ["Professional", "80-100 WPM", "Transcriptionist, journalist, developer"],
            ["Expert", "100+ WPM", "Competitive typist, stenographer-level speed"],
          ],
        },
      },
      createAnswerFirstSection(
        "Tips to Improve Your Typing Speed",
        "The single most important habit is touch typing, which means keeping your fingers on the home row (ASDF JKL;) and reaching for other keys without looking at the keyboard. This feels slower at first but quickly becomes faster than hunt-and-peck because your eyes stay on the screen.",
        "Focus on accuracy before speed. Correcting mistakes takes more time than typing slowly but correctly. Practise for 10-15 minutes daily rather than one long session per week. Use the different difficulty levels in this tool to progress gradually. Easy mode uses common short words, medium mode adds longer words and punctuation, and hard mode includes numbers, symbols, and technical vocabulary."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a good typing speed for office work?",
        "45-60 WPM with high accuracy is sufficient for most office jobs. Data entry roles typically require 60-80 WPM. Transcription and court reporting require 80+ WPM. For general computer use, anything above 40 WPM means typing is not a bottleneck in your workflow."
      ),
      createFAQ(
        "Should I prioritise speed or accuracy?",
        "Accuracy first, always. A typist who types 50 WPM with 98% accuracy is more productive than one who types 70 WPM with 85% accuracy, because the faster typist spends significant time fixing mistakes. Once your accuracy is consistently above 95%, you can safely push for higher speed."
      ),
      createFAQ(
        "How often should I practise to see improvement?",
        "Short daily sessions of 10-15 minutes are more effective than occasional long sessions. Most people see measurable improvement within two weeks of daily practice. Speed gains come quickly at first, then slow down as you approach your natural plateau. Consistent practice is the key."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "random-number-generator", label: "Random Number Generator" },
      { slug: "stopwatch", label: "Online Stopwatch" },
    ],
  },

  "fortune-cookie-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Fortune Cookie Generator Works",
        "Our fortune cookie generator lets you crack a virtual cookie to reveal a randomly chosen fortune message, a set of six lucky numbers from 1 to 49, and a Chinese word of the day with its pinyin pronunciation and meaning. Click the cookie or the button to crack it - or press spacebar for a quick new fortune without reaching for the mouse.",
        "Choose from five fortune categories before you crack: Funny for a lighthearted laugh, Wise for genuine life advice, Love for romantic and relationship insights, Career for work and ambition inspiration, and Cryptic for mysterious and thought-provoking messages. Each category contains over 15 unique fortunes, giving plenty of variety across multiple cracks."
      ),
      createAnswerFirstSection(
        "The History of Fortune Cookies",
        "Despite their strong association with Chinese restaurants, fortune cookies are largely an American invention. The most widely accepted origin story traces them to Makoto Hagiwara, a Japanese-American landscape designer who served them at the Japanese Tea Garden in San Francisco around 1914. The concept spread to Chinese restaurants after World War II and became a staple of the American Chinese dining experience.",
        "In China itself, fortune cookies are virtually unknown - they are considered a distinctly American phenomenon. The classic message-in-a-cookie format was popularised by mass production in the mid-20th century, and today billions of fortune cookies are produced each year. The fortunes themselves range from pithy wisdom to lucky numbers, with the tradition of adding 'in bed' to the end of any fortune being a popular western game."
      ),
      {
        heading: "What Do the Lucky Numbers Mean?",
        body: "The six lucky numbers generated alongside your fortune are randomly picked from 1 to 49 - the same range used in many lottery formats. In Chinese culture, certain numbers carry special significance. The number 8 is considered the luckiest, associated with prosperity and wealth. The number 6 represents smooth progress. The number 9 symbolises longevity. Numbers like 4 are traditionally avoided in some contexts as the word sounds similar to 'death' in Mandarin. Our generator picks numbers with equal probability, so every combination is equally auspicious.",
      },
    ],
    faqs: [
      createFAQ(
        "Are the fortunes random every time?",
        "Yes - each crack of the cookie picks a new fortune at random from the selected category. Lucky numbers are also freshly generated on each crack. With 15 or more fortunes per category and a fresh random pick each time, you are unlikely to see the same fortune twice in a short session."
      ),
      createFAQ(
        "Can I use the fortunes for parties or events?",
        "Absolutely. The fortune messages are designed to be entertaining and shareable. You can copy any fortune with the copy button and paste it into a message, use it as a conversation starter, or include it in a party game. For printed fortune cookies at events, you could use the messages as inspiration for writing your own paper fortunes."
      ),
      createFAQ(
        "What does the Chinese word of the day mean?",
        "Each crack reveals a Chinese character with its pinyin romanisation and English meaning. Pinyin is the official system for writing Mandarin using the Latin alphabet and tone marks. The characters selected are all positive concepts - happiness, fortune, love, harmony, wisdom, and similar themes that fit the spirit of fortune cookies."
      ),
      createFAQ(
        "How many fortunes are in each category?",
        "Each of the five categories (Funny, Wise, Love, Career, and Cryptic) contains at least 16 unique fortune messages. That gives a total of over 80 different fortunes across the full set."
      ),
    ],
    relatedTools: [
      { slug: "lucky-number-generator", label: "Lucky Number Generator" },
      { slug: "daily-horoscope-generator", label: "Daily Horoscope Generator" },
      { slug: "compliment-generator", label: "Compliment Generator" },
    ],
  },

  "six-word-story": {
    sections: [
      createAnswerFirstSection(
        "What Is a Six-Word Story?",
        "A six-word story is a complete narrative - beginning, middle, and end - told in exactly six words. The form was popularised by the legend that Ernest Hemingway once wrote 'For sale: baby shoes, never worn.' as the saddest story imaginable. Whether the attribution is accurate or not, the challenge stuck: can you tell a whole story in just six words?",
        "The appeal is in the constraint. Six words force you to strip away everything except what truly matters. Every word carries enormous weight. A six-word story can be funny, heartbreaking, mysterious, or absurd. The reader's imagination fills in the gaps, which is often more powerful than spelling everything out. This tool gives you a live word counter, themed prompts to spark ideas, and a gallery of famous examples to study."
      ),
      createAnswerFirstSection(
        "Tips for Writing a Good Six-Word Story",
        "The best six-word stories create a sense of movement - something changes between the first word and the last. 'I married her. She left. Good.' implies a whole life. Contrast is powerful: a happy opening and a dark ending (or vice versa) creates instant tension. Avoid descriptions and adjectives - use nouns and verbs that carry the full story themselves.",
        "Choose your theme and read the writing prompt before you start. If you are stuck, try writing a longer version of your idea first and then cutting it down ruthlessly. Often a single phrase you land on while editing turns out to be the whole story. The famous examples in the gallery are worth studying - notice how many rely on a twist in the final word or two."
      ),
    ],
    faqs: [
      createFAQ(
        "Did Hemingway really write 'For sale: baby shoes, never worn.'?",
        "Almost certainly not. The story is widely attributed to Hemingway, but no documentary evidence connects it to him. Similar classified advertisements appeared in newspapers decades before Hemingway's time. The attribution is likely a myth that grew because the story's quality seemed worthy of a Nobel laureate. It remains one of the most discussed examples of flash fiction regardless of its true origin."
      ),
      createFAQ(
        "What is flash fiction or micro fiction?",
        "Flash fiction is any very short story - typically under 1,000 words. Six-word stories are an extreme form of micro fiction. Related formats include the 50-word story, the 100-word drabble, and the 55-word story. All share the same philosophy: constraint sharpens writing. Having fewer words forces writers to make every single one earn its place."
      ),
      createFAQ(
        "Can my story be more or fewer than six words?",
        "Traditionally, no - the six-word story is defined by the constraint. But this tool's word counter shows amber at 5 or 7 words and green at exactly 6, so you can experiment freely. Many writers draft at 7-8 words and then cut down to 6, which often produces the strongest version. The discipline of hitting exactly six is part of what makes the form interesting."
      ),
      createFAQ(
        "How do I save my stories?",
        "Click 'Save My Story' once your story is exactly 6 words. Your stories are saved in your browser's local storage - they stay between visits on the same device. You can save up to 10 stories at a time. Each saved story shows the date it was written and the theme you chose. Use the delete button to remove old ones and make room for new ones."
      ),
      createFAQ(
        "What are the best themes for six-word stories?",
        "Loss and love consistently produce the most affecting six-word stories because they deal with universal human experiences that readers can project their own feelings onto. Horror works well because the brevity leaves everything to the imagination. Childhood is a rich theme because a single image - a toy, a smell, a sound - can carry enormous emotional weight without needing explanation."
      ),
    ],
    relatedTools: [
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
      { slug: "compliment-generator", label: "Compliment Generator" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "mad-libs-generator": {
    sections: [
      createAnswerFirstSection(
        "How the Mad Libs Generator Works",
        "Pick a theme - School Day, Pirate Adventure, Haunted House, Zoo Trip, Space Mission, or Fairy Tale - then fill in the blanks with nouns, verbs, adjectives, and other word types. The sillier your choices, the funnier the story. Once every blank is filled, hit 'Reveal Story' to see the complete tale with your words highlighted in colour.",
        "The classic Mad Libs format hides the story while you fill in random words, so you never know how they fit until the big reveal. A perfectly normal word like 'sandwich' or 'Tuesday' becomes hilarious dropped into an unexpected sentence. A live preview lets you watch your words slot in as you type, with each word type shown in a distinct colour so you can see the story take shape."
      ),
      createAnswerFirstSection(
        "Tips for the Funniest Results",
        "The best Mad Libs answers are either very specific or completely absurd. Instead of 'dog' for an animal, try 'hairless chihuahua'. Instead of 'ran' for a past tense verb, try 'somersaulted'. Ordinary words make ordinary stories - bold choices make unforgettable ones.",
        "Mad Libs work brilliantly as a group activity. One person reads out each blank type aloud while others call out answers without seeing the story. This blind input is what makes the format so entertaining. Works well on long car journeys, at the dinner table, or as an icebreaker at parties. Children aged 6 and up love it as a sneaky way to practise parts of speech without it feeling like a lesson."
      ),
    ],
    faqs: [
      createFAQ(
        "What age group is Mad Libs suitable for?",
        "Mad Libs is enjoyable from around age 6 upwards. Younger children can join in with a little help understanding what a noun or adjective means. Older kids and adults often find it even funnier because they can think of more unexpected words. It works well as a family activity because everyone can contribute and the results are always amusing."
      ),
      createFAQ(
        "What is an adjective, noun, or adverb?",
        "A noun is a person, place, or thing - like 'cat', 'kitchen', or 'umbrella'. An adjective describes a noun - like 'soggy', 'enormous', or 'purple'. A verb is an action word - like 'sneezed', 'wobbled', or 'exploded'. An adverb describes how something happens - like 'loudly', 'slowly', or 'accidentally'. For extra silliness, pick the most dramatic version you can think of."
      ),
      createFAQ(
        "Can I play Mad Libs with friends?",
        "Yes - this is the classic way to play. One person acts as the host and reads out each blank type ('Give me an adjective'). The other players call out answers without seeing the story. Once all the blanks are filled, the host reveals the story and reads it aloud. The more players involved, the more chaotic and funny the results tend to be."
      ),
      createFAQ(
        "Can I save or share my story?",
        "Once your story is revealed, use the Copy button to copy the full text to your clipboard and paste it into a message or note. Want to start fresh? Click New Round to clear your answers and try again with the same theme, or switch to a different theme for a completely new story."
      ),
    ],
    relatedTools: [
      { slug: "six-word-story", label: "Six-Word Story" },
      { slug: "fortune-cookie-generator", label: "Fortune Cookie Generator" },
      { slug: "excuse-generator", label: "Excuse Generator" },
    ],
  },
};
