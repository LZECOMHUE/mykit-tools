// SEO content for text tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const textSEO = {
  "word-randomizer": {
    sections: [
      createAnswerFirstSection(
        "How the Word Randomizer Works",
        "Paste a list of words or items, choose a separator, and the tool instantly shuffles them into a random order. It uses the Fisher-Yates shuffle algorithm, which guarantees an unbiased, truly random permutation every time you click. Every possible arrangement has an equal chance of appearing.",
        "You can separate your input by new lines, commas, spaces, or custom delimiters. The tool preserves your original items exactly as entered, including capitalisation and punctuation. It simply rearranges the order."
      ),
      createAnswerFirstSection(
        "Common Uses for Randomising Words",
        "Teachers use it to randomise student names for reading order, group assignments, or classroom activities. Writers use it to shuffle creative writing prompts or brainstorm new combinations. Game nights benefit from randomising player order, drawing lots, or shuffling card lists.",
        "It is also useful for randomising survey answer options to avoid order bias, shuffling playlist or setlist ideas, and picking a random winner from a list of names. Any time you need a fair, unbiased shuffle, this tool handles it."
      ),
      {
        heading: "Separator Options",
        table: {
          headers: ["Separator", "Input Example", "When to Use"],
          rows: [
            ["New line", "Apple\\nBanana\\nCherry", "One item per line, the most common format"],
            ["Comma", "Apple, Banana, Cherry", "Comma-separated lists from spreadsheets or text"],
            ["Space", "Apple Banana Cherry", "Simple single-word items"],
            ["Custom", "Apple|Banana|Cherry", "Any delimiter you choose, such as pipes or tabs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is the shuffle truly random?",
        "Yes. The tool uses the Fisher-Yates (Knuth) shuffle algorithm, which produces an unbiased random permutation. Every possible order is equally likely. The randomness comes from your browser's built-in cryptographic random number generator."
      ),
      createFAQ(
        "Can I shuffle names for a classroom or competition?",
        "Absolutely. Paste your list of names, click shuffle, and use the result as your random order. Each shuffle produces a completely new arrangement, so you can reshuffle as many times as you like."
      ),
      createFAQ(
        "Does it remove duplicates?",
        "No, the tool preserves your list exactly as entered, including any duplicates. If you want to remove duplicates first, use the Sort Lines tool with the deduplicate option, then paste the result here."
      ),
    ],
    relatedTools: [
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "random-number-generator", label: "Random Number Generator" },
    ],
  },

  "sort-lines": {
    sections: [
      createAnswerFirstSection(
        "How the Sort Lines Tool Works",
        "Paste any multi-line text and sort it instantly using several different modes. Choose alphabetical (A-Z or Z-A), numerical, by line length, or random order. You can also remove duplicate lines and trim whitespace in a single step.",
        "The tool processes your text entirely in the browser. Nothing is uploaded or stored. Paste your data, pick a sort mode, and copy the sorted result. It handles thousands of lines without any delay."
      ),
      createAnswerFirstSection(
        "Sort Modes Explained",
        "Alphabetical sorting arranges lines from A to Z (or reversed). It is case-insensitive by default, so 'apple' and 'Apple' are treated as equal. Numerical sorting compares lines by their leading number, which is useful for data like '10 items' or '2.5kg'. By-length sorting orders lines from shortest to longest.",
        "Random sorting shuffles all lines into a completely random order, useful for randomising lists. The deduplicate option removes exact duplicate lines while preserving the first occurrence of each unique line."
      ),
      {
        heading: "Sort Mode Examples",
        table: {
          headers: ["Mode", "Input", "Output"],
          rows: [
            ["Alphabetical (A-Z)", "Banana, Apple, Cherry", "Apple, Banana, Cherry"],
            ["Alphabetical (Z-A)", "Banana, Apple, Cherry", "Cherry, Banana, Apple"],
            ["Numerical", "10 cats, 2 dogs, 5 birds", "2 dogs, 5 birds, 10 cats"],
            ["By length (short first)", "Hi, Hello, Hey", "Hi, Hey, Hello"],
            ["Random", "A, B, C, D", "C, A, D, B (varies)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I sort a CSV column?",
        "Yes. Copy the column of data you want to sort (one value per line) and paste it into the tool. Sort it, then paste it back into your spreadsheet. For full CSV manipulation, a spreadsheet may be more appropriate."
      ),
      createFAQ(
        "Does it remove blank lines?",
        "The trim whitespace option removes leading and trailing spaces from each line. Combined with deduplication, it effectively cleans up messy lists. Completely empty lines can be filtered out as part of the process."
      ),
      createFAQ(
        "How does numerical sorting differ from alphabetical?",
        "Alphabetical sorting treats '10' as coming before '2' because '1' comes before '2' character by character. Numerical sorting understands that 2 is less than 10, giving you the correct numeric order. Always use numerical sorting when your lines start with numbers."
      ),
    ],
    relatedTools: [
      { slug: "word-randomizer", label: "Word Randomizer" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "extract-emails", label: "Extract Emails" },
    ],
  },

  "extract-emails": {
    sections: [
      createAnswerFirstSection(
        "How Email Extraction Works",
        "Paste any block of text and the tool instantly finds and extracts every email address it contains. It uses regular expression pattern matching to detect valid email formats, pulling them out of paragraphs, HTML code, CSV files, log files, or any other text. The results are listed one per line, ready to copy.",
        "The tool recognises standard email formats following the RFC specification: a local part (before the @), the @ symbol, and a domain with at least one dot. It handles common variations including plus-addressing (user+tag@example.com), subdomains, and international domains."
      ),
      createAnswerFirstSection(
        "Common Uses for Email Extraction",
        "The most common use is pulling email addresses from large blocks of unstructured text. This includes extracting contacts from email threads, parsing sign-up lists, cleaning CRM data exports, or pulling addresses from website source code and documents.",
        "It is also useful for auditing content before publishing to ensure no email addresses are accidentally exposed, or for building mailing lists from meeting notes and correspondence. The deduplicate option removes repeated addresses automatically."
      ),
      createAnswerFirstSection(
        "Privacy and Security",
        "All processing happens entirely in your browser. Your text is never uploaded to any server, and no data leaves your device. This makes the tool safe for handling sensitive business communications, customer data, or confidential correspondence.",
        "For GDPR and data protection compliance, client-side processing means there is no third-party data processor involved. The extracted emails exist only in your browser until you copy or close the page."
      ),
    ],
    faqs: [
      createFAQ(
        "What counts as a valid email address?",
        "The tool matches the standard format: local-part@domain.tld. The local part can contain letters, numbers, dots, hyphens, underscores, and plus signs. The domain must contain at least one dot and use valid characters. Malformed addresses like 'user@' or '@domain.com' are ignored."
      ),
      createFAQ(
        "Does it remove duplicate emails?",
        "Yes, the tool can deduplicate the results so each email address appears only once, regardless of how many times it occurs in the source text. This is useful when parsing long email threads where the same addresses repeat."
      ),
      createFAQ(
        "Is my data sent to a server?",
        "No. Everything runs in your browser using JavaScript. Your text is never transmitted anywhere. You can verify this by disconnecting from the internet and using the tool offline."
      ),
    ],
    relatedTools: [
      { slug: "extract-urls", label: "Extract URLs" },
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "extract-urls": {
    sections: [
      createAnswerFirstSection(
        "How URL Extraction Works",
        "Paste any text and the tool scans it to find every URL, pulling out web addresses from paragraphs, code, documents, emails, or log files. It detects both full URLs (https://example.com/page) and shorter formats (www.example.com), listing each one cleanly on its own line.",
        "The extraction uses pattern matching to identify URLs starting with http://, https://, or www. It handles complex URLs with query parameters, fragments, ports, and encoded characters. Trailing punctuation like commas and full stops at the end of sentences is stripped automatically so you get clean, usable links."
      ),
      createAnswerFirstSection(
        "Common Uses for URL Extraction",
        "Content auditors use it to pull every link from a document, article, or web page for checking. Developers use it to parse log files for API endpoints or to extract URLs from configuration files. Marketers extract links from competitor content or email campaigns for analysis.",
        "It is also useful for creating link inventories from documentation, finding all referenced sources in a research paper, or building redirect lists during website migrations. The deduplication option ensures each URL appears only once in the output."
      ),
      {
        heading: "Detected URL Formats",
        table: {
          headers: ["Format", "Example", "Detected?"],
          rows: [
            ["Full HTTPS", "https://example.com/path?q=1", "Yes"],
            ["Full HTTP", "http://example.com/page", "Yes"],
            ["WWW prefix", "www.example.com", "Yes"],
            ["With port", "https://example.com:8080/api", "Yes"],
            ["With fragment", "https://example.com/page#section", "Yes"],
            ["Bare domain (no prefix)", "example.com", "Depends on context"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does it find URLs without https:// or www?",
        "The tool primarily detects URLs that start with http://, https://, or www. Bare domains without any prefix (like 'example.com' in running text) may not be detected reliably, since they are difficult to distinguish from regular words or abbreviations."
      ),
      createFAQ(
        "Can it extract URLs from HTML source code?",
        "Yes. Paste raw HTML and the tool will find URLs in href attributes, src attributes, and anywhere else they appear in the markup. It extracts the URL itself, not the surrounding HTML tags."
      ),
      createFAQ(
        "Is my pasted text stored anywhere?",
        "No. All processing happens locally in your browser. Nothing is uploaded or stored on any server. Your data stays on your device."
      ),
    ],
    relatedTools: [
      { slug: "extract-emails", label: "Extract Emails" },
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "zalgo-text-generator": {
    sections: [
      createAnswerFirstSection(
        "What Is Zalgo Text?",
        "Zalgo text is regular text with a large number of Unicode combining diacritical marks stacked above, below, and through each character. These combining characters are legitimate Unicode code points designed for accents and annotations, but when dozens are applied to a single letter the result is a chaotic, glitchy appearance that seems to overflow its line. The effect is sometimes called \"corrupted\" or \"cursed\" text.",
        "This generator lets you control the intensity of the effect from subtle (a few marks per character) to extreme (heavy stacking that spills across multiple lines). You can type or paste any text, adjust the intensity slider, and copy the result to your clipboard instantly."
      ),
      createAnswerFirstSection(
        "Where to Use Zalgo Text",
        "Zalgo text is popular on social media profiles, gaming usernames, Discord messages, Halloween-themed content, and creative writing for eerie or unsettling effects. It works anywhere that supports Unicode, including Twitter, Reddit, Instagram bios, and most chat platforms.",
        "Be aware that some platforms strip or limit combining characters for readability and accessibility reasons. Facebook, for example, may remove excessive diacriticals. Screen readers also struggle with heavily modified text, so use it for decorative purposes rather than important information."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does Zalgo text look glitchy?",
        "Each visible letter has dozens of Unicode combining marks attached to it. These marks are designed to sit above or below characters (like accents), but when stacked in large numbers they overflow their normal space and overlap neighbouring lines, creating the chaotic appearance."
      ),
      createFAQ(
        "Will Zalgo text work on all platforms?",
        "It works on most platforms that support Unicode, including Twitter, Reddit, Discord, and Instagram. However, some platforms strip excessive combining characters, and others may render it differently depending on the font. Test on your target platform before committing to it."
      ),
      createFAQ(
        "Is Zalgo text accessible?",
        "No. Screen readers attempt to read every combining mark individually, which makes the text unintelligible for users relying on assistive technology. Use Zalgo text only for decorative or entertainment purposes, never for critical information."
      ),
    ],
    relatedTools: [
      { slug: "unicode-text-converter", label: "Unicode Text Converter" },
      { slug: "upside-down-text-generator", label: "Upside Down Text" },
      { slug: "text-repeater", label: "Text Repeater" },
    ],
  },

  "rot13-encoder": {
    sections: [
      createAnswerFirstSection(
        "What Is ROT13?",
        "ROT13 is a simple letter substitution cipher that replaces each letter with the letter 13 positions after it in the alphabet. Because the English alphabet has 26 letters, applying ROT13 twice returns the original text, making the same operation both the encoder and decoder. It is not encryption; it is a lightweight way to obscure text so it cannot be read at a glance.",
        "ROT13 originated on Usenet in the 1980s as a way to hide spoilers, punchlines, and mildly offensive content. Readers who wanted to see the hidden text could apply ROT13 themselves. It remains a common convention in online forums, puzzle communities, and programming exercises."
      ),
      {
        heading: "ROT Cipher Variants",
        table: {
          headers: ["Variant", "Applies To", "Shift", "Example"],
          rows: [
            ["ROT13", "Letters only (A-Z)", "13 positions", "Hello → Uryyb"],
            ["ROT5", "Digits only (0-9)", "5 positions", "12345 → 67890"],
            ["ROT18", "Letters + digits", "ROT13 + ROT5", "Hi5 → Uv0"],
            ["ROT47", "All printable ASCII", "47 positions", "Hello! → w6==@P"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Is ROT13 secure?",
        "No. ROT13 provides zero security. It is trivially reversible and offers no protection against anyone who recognises it. It is purely an obfuscation tool for hiding spoilers or making text unreadable at a casual glance, not a form of encryption."
      ),
      createFAQ(
        "Why does applying ROT13 twice give back the original?",
        "The English alphabet has 26 letters. Shifting by 13 and then shifting by 13 again totals 26, which is a full rotation back to the starting position. This symmetry is what makes ROT13 convenient: the same function encodes and decodes."
      ),
      createFAQ(
        "Does ROT13 affect numbers and punctuation?",
        "Standard ROT13 only affects letters (A-Z, a-z). Numbers, spaces, and punctuation pass through unchanged. If you need to obscure digits as well, use ROT5 for numbers or ROT47 for all printable ASCII characters."
      ),
    ],
    relatedTools: [
      { slug: "base64-encoder", label: "Base64 Encoder" },
      { slug: "morse-code-converter", label: "Morse Code Converter" },
      { slug: "binary-text-converter", label: "Binary Text Converter" },
    ],
  },

  "word-reverser": {
    sections: [
      createAnswerFirstSection(
        "Three Ways to Reverse Text",
        "This tool offers three distinct reversal modes. Word order reversal rearranges the words in each line so 'the quick brown fox' becomes 'fox brown quick the'. Letter order reversal flips each word's characters individually, turning 'hello world' into 'olleh dlrow'. Full reverse flips the entire string character by character, so 'hello world' becomes 'dlrow olleh'.",
        "Each mode serves different purposes. Word order reversal is useful for reordering phrases or testing how sentences read backwards. Letter reversal helps with word puzzles, palindrome checking, and creative writing exercises. Full reverse is the classic string reversal used in programming challenges."
      ),
      createAnswerFirstSection(
        "Common Uses for Reversing Text",
        "Puzzle creators use word and letter reversal to generate clues, hidden messages, and word games. Writers experiment with reversed phrases for creative effects, song lyrics, or poetry. Developers use string reversal for coding practice, interview preparation, and testing text processing functions.",
        "It is also a quick way to check for palindromes. Reverse the text and compare it to the original; if they match, you have a palindrome. The tool handles multi-line input, so you can check or reverse an entire list of words at once."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between word order and letter order reversal?",
        "Word order reversal keeps each word intact but changes their sequence: 'one two three' becomes 'three two one'. Letter order reversal keeps words in the same position but spells each one backwards: 'one two three' becomes 'eno owt eerht'."
      ),
      createFAQ(
        "Can I use this to check for palindromes?",
        "Yes. Use the full reverse mode and compare the output to your original text. If they are identical (ignoring spaces and punctuation), the text is a palindrome. Works for single words like 'racecar' and full phrases like 'a man a plan a canal panama'."
      ),
    ],
    relatedTools: [
      { slug: "word-randomizer", label: "Word Randomizer" },
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "upside-down-text-generator", label: "Upside Down Text" },
    ],
  },

  "text-repeater": {
    sections: [
      createAnswerFirstSection(
        "When to Repeat Text",
        "The text repeater duplicates any text a specified number of times with your choice of separator between copies. Common uses include generating placeholder or filler content for designs, creating repeated SQL values for database inserts, building test data for software, filling social media posts with repeated characters, and producing bulk content for stress testing.",
        "You can choose from separators like new lines, spaces, commas, or a custom string. This makes it easy to produce comma-separated lists, one-per-line entries, or continuously joined text depending on your needs."
      ),
      createAnswerFirstSection(
        "Separator Options and Performance",
        "The new line separator places each repetition on its own line, which is ideal for list-based output. The comma separator creates CSV-friendly output. The space separator joins everything into one flowing block. Custom separators let you insert any string between copies, such as a pipe character, semicolon, or HTML tag.",
        "For very high repeat counts (10,000+), the tool processes everything in your browser, so extremely large outputs may take a moment to generate. If you need millions of repetitions, consider using a command-line tool instead. For typical use cases up to a few thousand repetitions, results appear instantly."
      ),
    ],
    faqs: [
      createFAQ(
        "Is there a limit to how many times I can repeat?",
        "There is no hard limit, but very high counts (above 50,000) may slow your browser since all processing happens client-side. For most practical purposes, counts up to 10,000 work instantly."
      ),
      createFAQ(
        "Can I repeat multiple lines of text?",
        "Yes. The entire input block is treated as one unit and repeated as a whole. If your input is three lines, each repetition includes all three lines. The separator is placed between each complete copy of the input."
      ),
      createFAQ(
        "What is this useful for in development?",
        "Developers commonly use it to generate bulk test data, create repeated SQL INSERT values, build dummy content for UI testing, or produce strings of a specific length for boundary testing. The custom separator option makes it easy to format output for any context."
      ),
    ],
    relatedTools: [
      { slug: "lorem-ipsum-generator", label: "Lorem Ipsum Generator" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "add-line-numbers", label: "Add Line Numbers" },
    ],
  },

  "add-line-numbers": {
    sections: [
      createAnswerFirstSection(
        "When to Number Lines",
        "Adding line numbers makes text easier to reference, discuss, and navigate. Code reviewers use numbered lines to point to specific sections ('see line 42'). Legal documents, scripts, and academic papers often require numbered lines for precise citation. Teachers number lines in reading passages so students can locate specific text quickly.",
        "This tool lets you paste any text and instantly add line numbers with configurable formatting. Choose your separator (dot, colon, tab, or custom), set the starting number, and adjust padding so numbers align neatly regardless of how many lines you have."
      ),
      createAnswerFirstSection(
        "Formatting Options",
        "The separator appears between the line number and the text content. A tab separator aligns text in columns, which works well for code. A dot and space ('1. ') creates a numbered list format. A colon ('1: ') is common in code review contexts. Zero-padding ensures consistent width, so lines are numbered 001, 002, 003 instead of 1, 2, 3.",
        "Starting from zero is useful for programming contexts where arrays and indices are zero-based. Starting from a number other than one is helpful when numbering a section of a larger document or continuing from a previous page."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I start numbering from zero?",
        "Yes. Set the starting number to 0, which is useful for programming contexts where zero-based indexing is standard. You can start from any number, so you can also continue numbering from where a previous section left off."
      ),
      createFAQ(
        "Does it handle thousands of lines?",
        "Yes. The tool processes text entirely in your browser and handles tens of thousands of lines without any issues. Padding automatically adjusts to the total number of lines, so line 1 and line 10,000 stay neatly aligned."
      ),
      createFAQ(
        "What is zero-padding?",
        "Zero-padding adds leading zeros so all line numbers have the same width. For a 200-line document, line 1 becomes '001' and line 42 becomes '042'. This keeps text aligned in monospaced fonts and is standard in log files and programming output."
      ),
    ],
    relatedTools: [
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "remove-empty-lines", label: "Remove Empty Lines" },
      { slug: "line-prefix-suffix", label: "Add Line Prefix/Suffix" },
    ],
  },

  "remove-empty-lines": {
    sections: [
      createAnswerFirstSection(
        "When to Clean Blank Lines",
        "Extra blank lines creep into text when copying from websites, pasting from emails, exporting from databases, or working with code that has inconsistent formatting. This tool strips them out instantly, leaving you with clean, compact text. It is especially useful for cleaning up code, tidying pasted data before importing into a spreadsheet, and preparing documents for consistent formatting.",
        "You can choose between two modes: remove all empty lines (eliminates every blank line) or collapse consecutive blank lines into a single one (preserves paragraph spacing while removing excessive gaps). Both modes can optionally treat whitespace-only lines as empty."
      ),
      createAnswerFirstSection(
        "Collapse vs Remove",
        "Removing all empty lines produces a solid block of text with no gaps, which is ideal for data processing, log cleanup, and creating compact lists. Collapsing reduces multiple consecutive blank lines down to one, which maintains readability and paragraph structure while eliminating ugly triple or quadruple spacing.",
        "The whitespace-only option is important because lines that look empty may actually contain spaces or tabs. With this option enabled, lines containing only whitespace characters are treated as blank and cleaned up along with truly empty lines."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a whitespace-only line?",
        "A whitespace-only line looks empty but contains invisible characters like spaces or tabs. These often appear when copying text from websites or formatted documents. The tool can detect and treat these as empty lines when the whitespace-only option is enabled."
      ),
      createFAQ(
        "Should I collapse or remove blank lines?",
        "Use collapse when you want to preserve paragraph breaks but eliminate excessive spacing, such as cleaning up a document or email. Use remove when you need compact output with no gaps at all, such as preparing data for import or cleaning log files."
      ),
      createFAQ(
        "Can I clean up code formatting with this?",
        "Yes. Developers commonly use it to remove excessive blank lines from code files. The collapse mode is usually best for code, as it maintains separation between functions and blocks while removing unnecessary extra gaps."
      ),
    ],
    relatedTools: [
      { slug: "remove-extra-spaces", label: "Remove Extra Spaces" },
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "add-line-numbers", label: "Add Line Numbers" },
    ],
  },

  "line-prefix-suffix": {
    sections: [
      createAnswerFirstSection(
        "Batch Text Transformation with Prefixes and Suffixes",
        "This tool adds a prefix, suffix, or both to every line of your text at once. Instead of editing each line manually, paste your content, specify what to add at the start and end of each line, and the tool transforms everything instantly. It is one of the fastest ways to format lists, wrap lines in markup, or prepare data for another system.",
        "Common uses include adding bullet points, wrapping lines in HTML tags, quoting strings for SQL or code, adding comment markers, and prefixing list items with numbers or symbols. The tool handles any number of lines and preserves your original content exactly."
      ),
      {
        heading: "Common Prefix and Suffix Combinations",
        table: {
          headers: ["Use Case", "Prefix", "Suffix", "Example Output"],
          rows: [
            ["Bullet list", "- ", "(none)", "- First item"],
            ["HTML list items", "<li>", "</li>", "<li>First item</li>"],
            ["SQL string values", "'", "',", "'First item',"],
            ["Code comments", "// ", "(none)", "// First item"],
            ["Markdown checkboxes", "- [ ] ", "(none)", "- [ ] First item"],
            ["CSV quoting", "\"", "\",", "\"First item\","],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I add a prefix without a suffix?",
        "Yes. Leave the suffix field empty and only the prefix will be added to each line. The same works in reverse; leave the prefix empty to add only a suffix."
      ),
      createFAQ(
        "Does it skip empty lines?",
        "By default, the prefix and suffix are applied to every line including blank ones. Some versions of the tool offer a toggle to skip empty lines, so only lines with content are modified."
      ),
      createFAQ(
        "How is this different from find and replace?",
        "Find and replace changes specific text within lines. This tool adds text at the start and end of every line without modifying existing content. It is a structural transformation rather than a content substitution, which makes it ideal for formatting and wrapping tasks."
      ),
    ],
    relatedTools: [
      { slug: "add-line-numbers", label: "Add Line Numbers" },
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "find-and-replace", label: "Find and Replace" },
    ],
  },

  "remove-extra-spaces": {
    sections: [
      createAnswerFirstSection(
        "Three Modes for Cleaning Spaces",
        "This tool offers three modes to handle unwanted spaces. Collapse mode reduces multiple consecutive spaces to a single space, which is the most common need. Remove all mode strips every space from the text entirely, useful for creating compact identifiers or cleaning specific data formats. Trim mode removes leading and trailing spaces from each line while leaving internal spacing intact.",
        "Extra spaces commonly appear when copying text from websites, PDFs, or OCR output. HTML rendering collapses visible whitespace, so when you copy formatted web content you often get irregular spacing in the plain text. Pasting from Word documents, email clients, and scanned documents produces similar problems."
      ),
      createAnswerFirstSection(
        "When to Use Each Mode",
        "Collapse is the right choice for most text cleanup: emails, documents, pasted content, and anywhere you want normal single-spaced text. It fixes double spaces after full stops, irregular gaps from copy-paste, and any other multiple-space sequences without affecting the text structure.",
        "Remove all is useful when spaces should not exist at all, such as cleaning up phone numbers, removing spaces from code identifiers, or stripping whitespace from data fields. Trim is ideal for cleaning up lists and tabular data where internal spacing is intentional but leading and trailing whitespace needs to go."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does copied text have extra spaces?",
        "Web pages use CSS to control visual spacing, but when you copy text the browser produces plain text that may not match what you see on screen. PDFs and OCR software also introduce irregular spacing because they reconstruct text from visual layouts rather than structured data."
      ),
      createFAQ(
        "Does trim mode remove tabs as well?",
        "Trim mode removes leading and trailing whitespace characters from each line, which includes both spaces and tabs. Internal tabs within the line are preserved unless you use the collapse or remove mode."
      ),
      createFAQ(
        "Can I clean spaces and blank lines at the same time?",
        "This tool focuses on horizontal spacing (spaces within lines). To remove blank lines as well, run your text through the Remove Empty Lines tool after cleaning spaces. The two tools complement each other for thorough text cleanup."
      ),
    ],
    relatedTools: [
      { slug: "remove-empty-lines", label: "Remove Empty Lines" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "sort-lines", label: "Sort Lines" },
    ],
  },

  "msn-text-generator": {
    sections: [
      createAnswerFirstSection(
        "What Is the MSN Text Generator?",
        "It is the year 2004. You have just spent 45 minutes choosing the perfect MSN display name. It must contain at least three special characters, one currency symbol, and communicate your entire emotional state to anyone who dares glance at your contact list. This tool recreates that exact energy by converting your boring normal text into 12 different styles of early-2000s internet chaos.",
        "Whether you were a scene kid who typed in brackets and crosses, an emo poet who needed umlauts on every vowel, or a hacker who replaced every letter with numbers and pipes, this generator has you covered. Type your text once, see all 12 styles instantly, and click to copy whichever one best captures your inner 14-year-old self."
      ),
      {
        heading: "The 12 Styles Explained",
        table: {
          headers: ["Style", "Vibe", "Example"],
          rows: [
            ["MSN Classic", "The default MSN display name starter pack", "×ĦëĿĿ◊ Ŵ◊ŔĿĐ×"],
            ["Emo/Scene", "For when life is pain and so is your font", "ëmø kîđ vîßëš"],
            ["1337 H4X0R", "You definitely had a Limewire folder", "|#3110 \\/\\/0|21|)"],
            ["Money Talks", "For the kid who thought they were a rapper", "₥◊₦€¥ ₮₳£K$"],
            ["Viking Runes", "Pillaging your contact list aesthetically", "ĦɇŁŁØ ŴØɌŁĐ"],
            ["A E S T H E T I C", "Fullwidth characters, maximum vibes", "Ｈ ｅ ｌ ｌ ｏ"],
            ["Sparkle Queen", "You had a pink MySpace background, guaranteed", "✧・ﾟ:* Hello *:・ﾟ✧"],
            ["Flower Power", "Peace, love, and dial-up internet", "H ✿ e ❀ l ❁ l ✾ o"],
            ["Star Bright", "For those who peaked during the Bebo era", "★ H✦e✦l✦l✦o ★"],
            ["Scene Kid", "Rawr XD meets French accents", "»ĦëĿĿ◊«"],
            ["~Tilde Vibes~", "Minimum effort, maximum 2004", "~*~Hello~*~"],
            ["aLtErNaTiNg", "SpOnGeBoB mOcKiNg TeXt before it was a meme", "hElLo WoRlD"],
          ],
        },
      },
      createAnswerFirstSection(
        "Where Can You Use MSN-Style Text?",
        "Everywhere your boring friends use normal letters. These Unicode characters work on Discord, Instagram bios, Twitter/X, TikTok usernames, WhatsApp messages, Twitch chat, gaming profiles, email signatures (if you want to get fired), and anywhere else that supports Unicode. Which is basically everywhere in 2026.",
        "The text is not an image or a special font. It uses real Unicode characters that look like fancy versions of normal letters. This means you can paste it anywhere that accepts text, and it will display exactly as you see it here. No app needed, no font download, no asking your mum to install anything."
      ),
      createAnswerFirstSection(
        "A Brief History of MSN Display Names",
        "Before social media, your entire online identity lived in your MSN Messenger display name. It had to do a lot of heavy lifting. It communicated your mood, your relationship status, whatever song lyric you were feeling that day, and ideally contained enough special characters to make your parents wonder if their keyboard was broken.",
        "The classic formula was: decorative brackets + your name in special characters + an emotional song lyric + more brackets. Something like: ~*~×Ðårk_Äñg€l×~*~ says: nobody understands me. If your display name did not cause at least one older relative to ask if you had been hacked, you were not trying hard enough."
      ),
    ],
    faqs: [
      createFAQ(
        "Will this text work on Discord and Instagram?",
        "Yes. All 12 styles use standard Unicode characters, not custom fonts. They work on Discord, Instagram, Twitter/X, TikTok, WhatsApp, Telegram, Reddit, gaming platforms, and anywhere else that supports Unicode text. Just click a style to copy it, then paste wherever you want."
      ),
      createFAQ(
        "Why do some styles look different on different devices?",
        "Each device and operating system renders Unicode characters using its own fonts. A character that looks perfect on your phone might look slightly different on someone else's laptop. The currency symbols and accented letters are the most consistent across devices. The more obscure characters (Viking Runes, some 1337 substitutions) may vary."
      ),
      createFAQ(
        "Is this the same as the Fancy Text Generator?",
        "Different vibe entirely. The Fancy Text Generator uses clean Unicode mathematical symbols for styles like Bold, Italic, Script, and Gothic. This tool is specifically for the chaotic, special-character-swapping aesthetic of early 2000s internet culture. Think MSN Messenger display names, MySpace about sections, and Bebo skins. The Fancy Text Generator is for looking professional. This one is for looking like you have a Linkin Park poster on your wall."
      ),
      createFAQ(
        "Did people really type like this?",
        "Oh, they absolutely did. Between approximately 2003 and 2008, an entire generation typed exclusively in special characters, tildes, and brackets. Your MSN display name was updated more frequently than most people change their socks. It was an art form, and this tool is its museum."
      ),
    ],
    relatedTools: [
      { slug: "fancy-text-generator", label: "Fancy Text Generator" },
      { slug: "zalgo-text-generator", label: "Zalgo Text Generator" },
      { slug: "emoji-search", label: "Emoji Search" },
    ],
  },
};
