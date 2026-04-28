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

  "find-and-replace": {
    sections: [
      createAnswerFirstSection(
        "How Find and Replace Works",
        "Paste your text, type the term you want to find, type what you want to replace it with, and a live preview shows the result. The match counter at the top right tells you how many times your search term appears before you commit to anything. Click Apply to overwrite the original text with the replaced version, or just hit Copy to grab the preview output.",
        "Three toggles change the matching behaviour. Case sensitive forces an exact match, so 'Apple' and 'apple' are treated as different. Whole word stops partial matches, so searching for 'art' will not turn 'cartoon' into 'cb'. Regex mode lets you write patterns like \\d+ to match every number or \\s+$ to match trailing whitespace. The first two toggles are disabled when regex mode is on, because regex flags handle that work itself."
      ),
      createAnswerFirstSection(
        "Regex Mode for Power Users",
        "When regex mode is active, twelve special characters do special things: . * + ? ^ $ { } ( ) | [ ] \\\\. A common trip-up: searching for the literal string '$10.00' in regex mode without escaping the dot or the dollar sign will match '$10X00' and similar variants. If you want a literal dollar sign or full stop, prefix it with a backslash. Outside regex mode, the tool escapes all of these for you, so 'find $10.00' works as you would expect.",
        "Useful patterns for everyday writing: \\bteh\\b catches a frequent typo without breaking 'them'. ([A-Z][a-z]+)\\s+([A-Z][a-z]+) with a replacement of $2 $1 swaps first and last names in a roster. Two newlines collapsed to one is \\n{2,} replaced with \\n. The replacement field supports $1, $2 and so on for capture groups, the same syntax JavaScript's String.replace uses."
      ),
      {
        heading: "Common Find and Replace Patterns",
        table: {
          headers: ["Goal", "Find (regex mode)", "Replace with"],
          rows: [
            ["Strip trailing spaces from every line", "[ \\t]+$", "(empty)"],
            ["Collapse double spaces", " {2,}", " "],
            ["Wrap every numeric value in <strong>", "(\\d+(?:\\.\\d+)?)", "<strong>$1</strong>"],
            ["Convert UK dates to ISO", "(\\d{2})/(\\d{2})/(\\d{4})", "$3-$2-$1"],
            ["Remove blank lines", "^\\s*\\n", "(empty)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does my regex not match anything?",
        "The most common cause is unescaped special characters. Symbols like ., *, +, ?, ^, $, (, ), [, ], {, }, | and \\\\ all carry meaning in regex. If you want them treated as literal characters, prefix each one with a backslash. The match counter staying at zero is your hint that the pattern is malformed. Switch off regex mode for plain literal searches."
      ),
      createFAQ(
        "Will it process huge documents?",
        "All matching runs in your browser using JavaScript's RegExp engine, which handles documents up to a few megabytes comfortably. A 50,000 word manuscript replaces in well under a second. Once you get into millions of lines you may notice a delay, especially with greedy regex patterns. Nothing leaves your machine, so even confidential client work stays private."
      ),
      createFAQ(
        "Can I undo a replacement?",
        "Until you click Apply, the original text is untouched. The right-hand panel just shows a preview. After applying, use your browser's standard undo (Ctrl+Z or Cmd+Z) inside the textarea, or paste the original back from your clipboard. For long editing sessions, consider working in chunks rather than running one mega-replacement."
      ),
      createFAQ(
        "Does it support multi-line patterns?",
        "Yes, but you need to use the right metacharacter. \\n matches a newline, \\s matches any whitespace including newlines. The dot . does not match newlines by default in JavaScript regex. If you need that behaviour, use [\\s\\S] as a workaround, which matches absolutely any character including line breaks."
      ),
    ],
    relatedTools: [
      { slug: "whitespace-cleaner", label: "Whitespace Cleaner" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "remove-empty-lines", label: "Remove Empty Lines" },
    ],
  },

  "instagram-caption-formatter": {
    sections: [
      createAnswerFirstSection(
        "Why Instagram Eats Your Line Breaks",
        "Instagram's caption editor strips out plain line breaks the moment you publish. Type something across five lines in your drafts, hit post, and it collapses into one wall of text. The fix is to insert a zero-width joiner character (Unicode U+200D) at the end of each line. Instagram sees a non-empty line and preserves your spacing. The tool inserts these for you automatically when 'Preserve Line Breaks' is ticked.",
        "Captions can run up to 2,200 characters and accept up to 30 hashtags before any of them stop working. The four counters under the input track characters, hashtags, mentions and line breaks live as you type, so you know whether you are about to hit the cap. Mentions parse as @ followed by word characters, hashtags as # followed by word characters, the same rules Instagram uses internally."
      ),
      createAnswerFirstSection(
        "How a Social Manager Uses It",
        "Picture a social media manager scheduling a Reels caption for a coffee brand. They draft three short paragraphs in the textarea, drop a row of three branded hashtags below, and tag two collaborators. The hashtag counter shows 3 of 30 used, so there is room for more discoverability tags. They paste the formatted output straight into Later, Buffer or Instagram itself, and the spacing survives the round trip.",
        "Common pitfall: pasting captions from Word or Google Docs brings invisible smart quotes and non-breaking spaces along for the ride. The tool preserves whatever you give it, so retype any text that originally came from a rich-text editor, or run it through the [Whitespace Cleaner](/whitespace-cleaner) first. For longer-form storytelling captions, place hashtags in a single block at the end or in the first comment so they do not break the reading flow."
      ),
    ],
    faqs: [
      createFAQ(
        "What is a zero-width joiner and is it safe to use?",
        "A zero-width joiner is a real Unicode character (U+200D) that takes up no visible space. It was originally designed for connecting characters in scripts like Devanagari and Arabic. Instagram, TikTok, LinkedIn and most other platforms render it as nothing visible, but treat the line containing it as non-empty, which is why your line breaks survive. It is harmless and will not flag your post as spam."
      ),
      createFAQ(
        "Why do my hashtags disappear after 30?",
        "Instagram stops indexing hashtags once you exceed 30 in a single caption. The post is still published, but the extra tags are ignored for discovery, and historically posts with hashtag stuffing have been quietly downranked. The hashtag counter turns informational once you cross 30 - aim for 5 to 15 tightly relevant tags rather than maxing out."
      ),
      createFAQ(
        "Will the formatted caption work on TikTok and LinkedIn?",
        "Yes. Both platforms also strip plain line breaks but respect zero-width joiners. The same formatted output drops cleanly into a TikTok caption or a LinkedIn status update. Twitter/X handles line breaks natively so the trick is unnecessary there, but it does no harm."
      ),
      createFAQ(
        "Can I save drafts in the tool?",
        "Not in this tool itself; it is a one-shot formatter rather than a content scheduler. For drafts, paste your caption into a notes app or use a scheduling tool like Later or Buffer. The formatter is meant for the final polishing step before you publish."
      ),
    ],
    relatedTools: [
      { slug: "character-counter", label: "Character Counter" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "fancy-text-generator", label: "Fancy Text Generator" },
    ],
  },

  "rhyme-finder": {
    sections: [
      createAnswerFirstSection(
        "How the Rhyme Finder Works",
        "Type a word, hit Enter, and the tool queries the Datamuse word-finding API for two sets of results: perfect rhymes (words sharing the final stressed vowel and everything after it, like 'tide' and 'inside') and near rhymes (slant rhymes where the consonants almost match but the vowel shifts, like 'tide' and 'time'). Perfect rhymes get grouped into syllable buckets so you can choose words that fit your meter without counting beats by hand.",
        "Click any word to copy it instantly to your clipboard. There is no sign-in, no per-word limit beyond what your network can fetch, and the tool returns up to 50 perfect rhymes plus 20 near rhymes per query. Datamuse pulls from a corpus of around 170,000 English words and adjusts results based on phonetic matching, not just trailing letter overlap, which is why 'though' rhymes with 'tow' rather than 'cough'."
      ),
      createAnswerFirstSection(
        "Songwriters and Poets, Read This",
        "A songwriter mid-bridge needing one more rhyme for 'fire' will find 'desire', 'higher', 'aspire' and 'admire' under the two-syllable bucket, plus the near-rhyme cluster around 'tired' and 'wire' for slant options. A children's author writing rhyming couplets will lean on the one-syllable bucket where things are simpler. A copywriter crafting a tagline rarely needs a perfect rhyme - assonance often lands harder, which is what the near rhymes section is built for.",
        "Some words have famously few rhymes in English: 'orange', 'silver', 'purple' and 'month' are the classic almost-unrhymables. The tool will return near rhymes for these (sporange, chilver, hirple, hundredth) but they are mostly archaic or dialectal. For these stubborn cases, songwriters typically rework the line so the rhyme falls on a different word, or lean into deliberate slant rhyming."
      ),
      {
        heading: "Perfect Rhyme vs Near Rhyme",
        table: {
          headers: ["Type", "Definition", "Example for 'love'"],
          rows: [
            ["Perfect (true)", "Identical stressed vowel and following consonants", "above, dove, glove, shove"],
            ["Near (slant)", "Similar but not identical phonetic ending", "loft, lobe, of, off"],
            ["Eye rhyme", "Looks like it rhymes but does not sound like it", "love + move (not returned)"],
            ["Identity", "Same word repeated", "love + love (filtered out)"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are some common words missing from the results?",
        "The Datamuse phonetic engine matches based on the Carnegie Mellon Pronouncing Dictionary, which covers around 134,000 entries. Slang, recent neologisms and most proper nouns are not in the dictionary, so they will not return. If a word you expect is missing, try a phonetic variant or the Near Rhymes set, which is more forgiving."
      ),
      createFAQ(
        "Are British and American pronunciations both supported?",
        "The underlying dictionary uses American pronunciation, so words like 'tomato' will rhyme with 'potato' but not with the British 'plato' / 'play-to' pronunciation. For most mainstream rhyming this gap does not matter, but spoken-word artists writing for a UK audience should listen to candidates aloud rather than trusting the list blindly."
      ),
      createFAQ(
        "Can I search for words that rhyme with a phrase?",
        "Only single words are supported. For multi-word rhymes, search the last stressed word in your phrase. 'Heart of gold' rhymes are essentially rhymes of 'gold' (sold, told, hold, bold, fold), and you can build up phrase rhymes by combining single-word results creatively."
      ),
      createFAQ(
        "Does it tell me which words are good for songwriting versus poetry?",
        "The list is sorted by syllable count rather than by genre suitability. As a rule of thumb: monosyllabic punchy rhymes work for hip-hop and pop hooks, two and three syllable rhymes flow better in folk and Americana, and unusual five-plus syllable rhymes are the territory of comedy songwriters. Listen to candidates aloud before committing."
      ),
    ],
    relatedTools: [
      { slug: "synonym-finder", label: "Synonym Finder" },
      { slug: "word-association-tool", label: "Word Association Tool" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "synonym-finder": {
    sections: [
      createAnswerFirstSection(
        "How the Synonym Finder Works",
        "Enter a word, press Enter, and the tool returns two ordered lists. The Synonyms section lists words that mean roughly the same thing, ranked by Datamuse's relevance score (the longer the bar next to each word, the closer the meaning). The Similar Meaning section returns up to 30 thematically related words; broader and looser, useful when the perfect synonym does not exist or feels stale. Click any word to copy it.",
        "Datamuse's synonym data comes from a blend of WordNet (a curated lexical database used by linguists since 1985) and statistical co-occurrence patterns from a multi-billion-word web corpus. That mix is why you sometimes get stylistic neighbours rather than strict dictionary synonyms. 'Happy' returns 'glad', 'joyful', 'cheerful' as core synonyms plus 'content', 'pleased', 'delighted' as stylistic alternatives - all defensible swaps in different registers."
      ),
      createAnswerFirstSection(
        "When the Closest Synonym Is the Wrong One",
        "A student polishing a 1,500 word essay who has used 'important' six times will reach for 'crucial', 'vital' or 'significant' from the synonym list. But the highest-ranked synonym is not always the right one. 'Crucial' carries urgency, 'vital' carries necessity for survival, 'significant' carries measurable weight. Reading the list and picking the synonym that matches your intent is the work the tool cannot do for you.",
        "A handful of antipatterns to avoid: replacing every 'said' in dialogue with 'opined', 'exclaimed' or 'pontificated' makes prose ridiculous - 'said' is invisible to readers and that is the point. Swapping technical terms ('algorithm', 'mortgage', 'photosynthesis') for synonyms usually creates inaccuracy rather than variety. The synonym finder is a tool for adjectives, verbs and abstract nouns, not specialised vocabulary."
      ),
    ],
    faqs: [
      createFAQ(
        "Why are some synonyms ranked higher than others?",
        "The bar next to each word reflects Datamuse's relevance score, which combines WordNet's curated synonym links with frequency data from real text. A score-five synonym appears alongside the search word in actual writing more often than a score-one synonym. Higher scores tend to be safer swaps; lower scores tend to be more interesting but riskier."
      ),
      createFAQ(
        "Does it know about British versus American spelling?",
        "Yes for most common words. Searching 'colour' returns 'color' as a synonym, and vice versa. Specialised terms ('aluminium', 'kerb') sometimes only return their dominant variant. If you are writing in British English, double-check the synonyms you pick are not American-only spellings before you paste them in."
      ),
      createFAQ(
        "Why do I get fewer results for unusual words?",
        "WordNet's coverage drops off sharply for jargon, neologisms and rare words. A word like 'effervescent' returns plenty of synonyms; 'rizz' returns nothing because it is not in the dictionary. The Similar Meaning section is sometimes the rescue here, because it falls back on co-occurrence rather than dictionary links."
      ),
      createFAQ(
        "Can I find antonyms?",
        "This tool focuses on synonyms only. For opposites, use the [Word Association Tool](/word-association-tool) and look for contrasting concepts in the cloud, or search for the opposite word directly here. Datamuse does support an antonyms endpoint, and a dedicated antonym finder is a feature on the roadmap."
      ),
    ],
    relatedTools: [
      { slug: "rhyme-finder", label: "Rhyme Finder" },
      { slug: "word-association-tool", label: "Word Association Tool" },
      { slug: "readability-checker", label: "Readability Checker" },
    ],
  },

  "text-sorter": {
    sections: [
      createAnswerFirstSection(
        "How the Text Sorter Works",
        "Paste your list, one item per line, pick a sort mode from the pill row, and the right-hand panel updates instantly. Five modes are available: A-Z, Z-A, shortest first, longest first, and random. The line counter under the input shows how many non-empty lines you started with, and the matching counter on the output side confirms nothing was lost. Click Copy to grab the sorted result.",
        "Alphabetical sorting uses JavaScript's localeCompare with case-insensitive matching, so 'Apple' and 'apple' end up next to each other rather than separated by all the lowercase entries. Length sorting counts every character including spaces, so 'New York' sorts as eight characters. Random mode runs a Fisher-Yates shuffle, which is unbiased: every possible ordering is equally likely. The Reshuffle button generates a fresh permutation without you having to switch modes."
      ),
      createAnswerFirstSection(
        "Real Sorting Scenarios",
        "A teacher with a roster of 28 pupil names pastes them into the input, picks A-Z, and has an alphabetised register in two seconds. An event organiser with a guest list sorted by 'longest first' immediately sees which names will need wider place cards. A YouTuber drafting a giveaway runs random mode, hits Reshuffle, and announces the first three lines as the winners. None of these tasks need a spreadsheet.",
        "Trip-ups to watch for: leading spaces or tabs change A-Z order, because ' Apple' (with a leading space) sorts before 'Apple' in ASCII order. Run [Whitespace Cleaner](/whitespace-cleaner) first if your list came from a copy-paste with inconsistent indentation. Numbers in alphabetical mode sort lexically, so '10' comes before '2'. If you have a numbered list, prefix each number with a leading zero so the lengths match, or sort by length-short instead."
      ),
    ],
    faqs: [
      createFAQ(
        "Does it preserve duplicates?",
        "Yes. The sorter does not remove duplicate lines; it just rearranges what you give it. If two pupils share the name 'Smith', both 'Smith' entries will appear next to each other after A-Z sorting. To deduplicate, run the result through [Remove Duplicate Lines](/remove-duplicate-lines) afterwards."
      ),
      createFAQ(
        "How does it handle accents and non-Latin characters?",
        "localeCompare uses the browser's default locale for ordering, which in most cases produces the result you would expect: 'café' sorts after 'cafe' but before 'caffeine'. Cyrillic, Greek, Arabic and CJK scripts are supported and sort correctly within their respective alphabets, but mixing scripts in one list produces locale-dependent results."
      ),
      createFAQ(
        "Is the random shuffle truly random?",
        "It uses Math.random() which is a pseudorandom generator, not cryptographically secure but more than random enough for shuffling lists of names or items. For a giveaway with high stakes (large prize, public draw), use a verifiable random source like random.org. For everyday use, this is indistinguishable from true random."
      ),
      createFAQ(
        "What is the upper line limit?",
        "There is no hard cap, but performance becomes noticeable above 100,000 lines because each sort runs in your browser. Up to 10,000 lines is instant. Beyond that, expect a brief pause. For multi-million line files, a desktop tool or scripting language is the right choice rather than a browser."
      ),
    ],
    relatedTools: [
      { slug: "sort-lines", label: "Sort Lines" },
      { slug: "word-randomizer", label: "Word Randomizer" },
      { slug: "remove-duplicate-lines", label: "Remove Duplicate Lines" },
    ],
  },

  "text-to-binary": {
    sections: [
      createAnswerFirstSection(
        "How Text to Binary Works",
        "Each character in your input gets converted to its numeric code point and then expressed as a binary, hexadecimal or octal string. ASCII characters use 7 bits but the tool pads to 8 bits per byte for readability, so 'A' (decimal 65) becomes 01000001 in binary, 41 in hex, 101 in octal. Pick a format from the pills at the top, toggle 'Spaces between bytes' on or off, and the output regenerates instantly.",
        "For inputs of 20 characters or fewer, a reference table appears below showing each character alongside its binary, hex and decimal values. This is the easy way to check that a particular byte is what you expected. The conversion runs entirely in your browser using JavaScript's charCodeAt(), so even confidential snippets stay local. Pasted text up to a few hundred kilobytes converts without delay."
      ),
      createAnswerFirstSection(
        "ASCII vs UTF-8 - The Multibyte Catch",
        "Plain English text is 7-bit ASCII, so 'Hello' produces five clean 8-bit bytes. The moment you include an em dash, an accented vowel, an emoji or any non-Latin character, you are in UTF-8 territory and a single visible character can occupy 2, 3 or 4 bytes. The tool uses charCodeAt() which returns UTF-16 code units, so the £ symbol comes out as a single 16-bit value (00000000 10100011), and emoji like the rocket consist of a surrogate pair where each half has its own binary representation.",
        "If you need true UTF-8 byte-by-byte output (for example, to verify what an HTTP server sees), encode your string with TextEncoder first in a developer console, or paste only ASCII characters. For the typical use cases (homework, learning binary, encoding short messages for fun), the default behaviour is exactly what you want. ASCII codes 0-127 are identical across all encodings, so 'Hello World' is unambiguous."
      ),
      {
        heading: "Common Character Codes",
        table: {
          headers: ["Char", "Decimal", "Binary (8-bit)", "Hex"],
          rows: [
            ["A", "65", "01000001", "41"],
            ["a", "97", "01100001", "61"],
            ["0", "48", "00110000", "30"],
            ["space", "32", "00100000", "20"],
            ["!", "33", "00100001", "21"],
            ["newline", "10", "00001010", "0A"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is each byte 8 bits when ASCII only needs 7?",
        "Standard ASCII fits in 7 bits (128 characters from 0 to 127), but computers store data in 8-bit bytes. The leading zero is padding for alignment. Extended ASCII and ISO-8859-1 use the eighth bit for additional 128 characters. UTF-8 uses the leading bits as a multibyte marker, which is why the eighth bit being a 1 in your output usually signals you have a non-ASCII character."
      ),
      createFAQ(
        "Can I convert binary back to text?",
        "Not in this tool, which is one-way text-to-binary. For the reverse direction (binary digits back to readable text), use the [String to Binary](/string-to-binary) tool which handles both directions, or paste your binary into [Text to Morse Code](/text-to-morse-code) for a different code system entirely."
      ),
      createFAQ(
        "What does 'spaces between bytes' actually do?",
        "With the toggle on, you get '01001000 01100101 01101100' (one space per character boundary). With it off, you get '010010000110010101101100' (one solid run of bits). Spaces are useful for human reading and for pasting into a binary-to-text converter that needs delimiters. No spaces is the format used in raw transmission and in some computer science homework conventions."
      ),
      createFAQ(
        "Is hexadecimal more efficient than binary for the same data?",
        "Hex represents 4 bits per character, so two hex digits encode the same byte that takes 8 binary digits to write. For human readability, hex is denser (HELLO is 48 65 4C 4C 4F in hex, 40 binary digits compressed into 10 hex digits). Binary is what hardware actually stores; hex is what programmers actually read."
      ),
    ],
    relatedTools: [
      { slug: "rot13-encoder", label: "ROT13 Encoder / Decoder" },
      { slug: "text-to-morse-code", label: "Text to Morse Code" },
      { slug: "hex-to-decimal", label: "Hex to Decimal" },
    ],
  },

  "text-to-speech-previewer": {
    sections: [
      createAnswerFirstSection(
        "How the Text to Speech Previewer Works",
        "Type or paste up to a few thousand characters, pick a voice from the dropdown, slide the speed and pitch controls to taste, and click Play. The browser's built-in Web Speech API does the actual synthesis, which means there is no server round-trip, no API key, and no usage cap. Speed runs from 0.5x to 2x in 0.1 increments. Pitch runs from 0.5 (deeper) to 2 (higher) on the same scale.",
        "The voice list comes from your operating system, not the tool. Chrome on Windows offers Microsoft David, Mark, Zira and a clutch of regional voices. Safari on macOS exposes the full Apple voice catalogue including Daniel (UK), Karen (Australia) and Moira (Ireland). Firefox tends to expose fewer options. The Default badge shows which voice the system uses if you do not choose one explicitly."
      ),
      createAnswerFirstSection(
        "Voice Quality Differs Between Engines",
        "An accessibility consultant previewing a 200-word announcement will get noticeably different output between Chrome's Microsoft Mark and Safari's Daniel, even though both are listed as 'English (United Kingdom)'. Microsoft voices on modern Windows tend to be neural and natural-sounding, while older system voices on Linux or earlier Windows builds can sound robotic. There is no way to standardise this from JavaScript - the tool only controls speed and pitch.",
        "Practical scenario: a podcaster previewing show notes before recording uses 1.0x speed and default pitch to hear how the words land. A teacher checking pronunciation of unfamiliar words uses 0.8x speed to slow individual syllables. A copywriter testing whether an Instagram caption sounds natural reads it at 1.2x to match how people actually scan social posts. Pause and Resume let you stop mid-sentence; Stop fully cancels and resets, useful for switching voice or re-running with different settings."
      ),
    ],
    faqs: [
      createFAQ(
        "Why is the voice list empty when I first open the tool?",
        "Voice loading is asynchronous in most browsers. Chrome, in particular, fires the voiceschanged event a fraction of a second after page load. The 'Loading voices...' placeholder waits for that event and replaces itself with the dropdown once the list is ready. If voices never appear, your browser may have speech synthesis disabled, or you are on a platform without TTS engines installed."
      ),
      createFAQ(
        "Can I download the audio as an MP3?",
        "Not from the Web Speech API directly. It plays through your speakers but does not expose a recordable audio stream. To capture the output, use your operating system's audio recorder pointed at the system audio device, or screen-record with audio. For pure file output, dedicated TTS APIs (ElevenLabs, OpenAI TTS, Amazon Polly) are the right tool."
      ),
      createFAQ(
        "How long can the input text be?",
        "There is no formal cap, but most browsers stop or stutter around 32,000 characters in a single utterance. For long documents, split into paragraphs and play sections individually. Reading speed at 1.0x is roughly 250 words per minute, so a 1,000-word piece takes about four minutes to read aloud."
      ),
      createFAQ(
        "Does it work offline?",
        "Yes, once the page has loaded. The synthesis runs entirely on your device using whatever TTS engines your operating system provides. This is why voices differ between Windows, macOS, Linux and mobile - each platform ships its own engines and the API exposes whatever is locally installed."
      ),
    ],
    relatedTools: [
      { slug: "readability-score-checker", label: "Readability Score Checker" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "readability-checker", label: "Readability Checker" },
    ],
  },

  "word-association-tool": {
    sections: [
      createAnswerFirstSection(
        "How the Word Association Tool Works",
        "Enter a word, press Enter, and the tool returns up to 50 'trigger words' from the Datamuse API: words that humans tend to think of when they see your search term. The output renders as a word cloud sized by relevance score, so the strongest associations appear largest and the weaker ones smaller. Click any word to copy it. The associations are not synonyms or rhymes; they are statistical neighbours pulled from a multi-billion-word reading corpus, capturing the thoughts people have when they read your word in context.",
        "Search 'coffee' and you get bean, espresso, Starbucks, mug, morning, caffeine, cup, dark, brewed, roast, latte. Search 'rain' and you get umbrella, wet, storm, drops, puddle, weather, clouds, falling, autumn, soaked. The associations include things, places, actions, emotions and modifiers all jumbled together, which is exactly the bag a human brainstorm produces. That messiness is the point."
      ),
      createAnswerFirstSection(
        "Brainstorming with the Word Cloud",
        "A novelist stuck on a chapter set in a Cornish fishing village searches 'harbour' and harvests 'mooring', 'tide', 'gull', 'rope', 'pilchard', 'lobster', 'lighthouse'. Three of these become sensory details in the next paragraph. A copywriter pitching a sleep mattress brand searches 'rest' and pulls in 'pillow', 'dream', 'cosy', 'quiet', 'breath' for tagline drafting. A primary school teacher building a vocabulary lesson around 'autumn' uses the word cloud to populate a brainstorming sheet for the class.",
        "Where it pays off most: any creative task where you need adjacent concepts rather than direct equivalents. The [Synonym Finder](/synonym-finder) gives you 'rest' and 'sleep' and 'slumber'. This tool gives you 'pillow', 'dream', 'tired', 'eyes' - the surrounding world rather than the same idea repackaged. For poetry, advertising copy, song lyrics and creative essays, that surrounding world is usually what you actually need."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between an association and a synonym?",
        "A synonym means roughly the same thing (happy = glad, joyful, cheerful). An association is what tends to appear nearby in real text (happy + birthday, happy + meal, happy + ending, happy + tears). Associations include nouns, verbs, modifiers and even unrelated common collocations, capturing how language actually works rather than how a dictionary defines it."
      ),
      createFAQ(
        "Why are some associations surprising?",
        "The data comes from real-world text including news, books, web pages and social media. Sometimes a strong association reflects a famous phrase ('Big Apple' for New York), a brand ('Apple' returns 'iPhone'), or a cultural reference ('apple' returns 'pie' more strongly than it returns 'tree'). Surprising associations often make the best creative prompts."
      ),
      createFAQ(
        "Can I find associations for two words at once?",
        "Only single-word queries are supported. For two-word brainstorming (say, 'mountain river'), search each word separately and look at the overlap between the two clouds. Words that appear in both lists are the strongest joint associations. This is a manual step but takes about 30 seconds for two queries."
      ),
      createFAQ(
        "Why does my obscure search return nothing?",
        "Datamuse's trigger-word data needs the source word to appear with statistical regularity in the corpus. Rare technical jargon, neologisms, slang and brand names often return empty results. Try a more general parent word; 'cybersecurity' might be sparse, but 'security' returns plenty of associations you can narrow down manually."
      ),
    ],
    relatedTools: [
      { slug: "synonym-finder", label: "Synonym Finder" },
      { slug: "rhyme-finder", label: "Rhyme Finder" },
      { slug: "word-randomizer", label: "Word Randomizer" },
    ],
  },

  "word-counter": {
    sections: [
      createAnswerFirstSection(
        "How the Word Counter Works",
        "Type or paste text into the box and the eight stat tiles update on every keystroke. Words are counted by splitting on any whitespace (spaces, tabs, newlines, multiple spaces collapse to one). Characters count every Unicode code point including spaces. Sentences count terminal punctuation (full stops, exclamation marks, question marks). Paragraphs count blocks separated by one or more blank lines. Average word length is characters-without-spaces divided by word count.",
        "Read time uses 200 words per minute, the standard adult silent reading pace for general non-fiction. Speak time uses 130 words per minute, the average for clear public speaking. Below the stats, the top five most-frequent words appear as small chips - common words like 'the' and 'and' are filtered out so what you see are content words. The whole calculation happens in the browser, so even 50,000-word manuscripts process without any noticeable delay."
      ),
      createAnswerFirstSection(
        "Why These Numbers Matter",
        "A student polishing a 1,500-word essay watches the word count tick toward the assignment cap and stops at 1,498 to leave breathing room. A blogger checking that a draft sits within Google's preferred 300-2,500 word range for ranking does it in one paste. A best man timing a wedding speech aims for 1,000 words at speak time, knowing that 7-8 minutes is the sweet spot between heartfelt and rambling. A copywriter checking that an Instagram caption fits the 2,200-character cap watches the character count, not the word count.",
        "Reading time is approximate and skewed for adult native speakers reading fluent prose. Technical, dense or unfamiliar material reads slower (around 130 wpm). Light fiction reads faster (around 280 wpm). Speak time depends on delivery: news anchors hit 150 wpm, casual conversation runs around 110 wpm, audiobook narration averages 150-160 wpm. Use the numbers as starting points and adjust by the genre you are working in."
      ),
      {
        heading: "Reading and Speaking Speeds Compared",
        table: {
          headers: ["Activity", "Words per minute", "1,000 words takes"],
          rows: [
            ["Speed reading", "400-700", "1m 30s to 2m 30s"],
            ["Adult silent reading", "200-300", "3m 20s to 5m"],
            ["Audiobook narration", "150-160", "6m 15s to 6m 40s"],
            ["Public speaking", "120-150", "6m 40s to 8m 20s"],
            ["Slow reading aloud", "80-100", "10m to 12m 30s"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are sentences counted accurately?",
        "Sentences are detected by counting full stops, exclamation marks and question marks. This works for standard prose but undercounts in technical writing (where decimal points and abbreviations like 'e.g.' do not end sentences) and overcounts in informal text with ellipses. For most use cases the count is within 5% of the true number, which is plenty for word-cap checking."
      ),
      createFAQ(
        "What counts as a paragraph?",
        "Any block of text separated from the next by at least one blank line. If your document is one solid wall of text with no paragraph breaks, the count will read 1 regardless of length. Press Enter twice to start a new paragraph if you want them counted separately."
      ),
      createFAQ(
        "Why does the top words list ignore 'the' and 'and'?",
        "Those are stop words - words that appear so frequently in English they tell you nothing about content. The tool filters out around 60 of the most common (the, a, an, is, are, of, on, in, with, that, this, etc) so the top five reveals genuine recurring themes in your writing. For a complete frequency analysis without any filtering, use the [Word Frequency Counter](/word-frequency-counter)."
      ),
      createFAQ(
        "Does it work with non-English text?",
        "Word splitting works for any language that uses spaces between words: French, German, Spanish, Italian, Portuguese, Russian, Greek, Arabic. It does not work cleanly for Chinese, Japanese or Thai, where words run together without spaces - it will count each character as a word, dramatically overstating the count. Reading time and speak time estimates are based on English speeds and are unreliable for other languages."
      ),
    ],
    relatedTools: [
      { slug: "character-counter", label: "Character Counter" },
      { slug: "readability-checker", label: "Readability Checker" },
      { slug: "word-frequency-counter", label: "Word Frequency Counter" },
    ],
  },

  "word-frequency-counter": {
    sections: [
      createAnswerFirstSection(
        "How the Word Frequency Counter Works",
        "Paste any block of text, choose your filters, and the tool produces a ranked table of the 20 most-frequent words. Each row shows the word, the number of occurrences, a horizontal bar showing relative frequency against the top word, and the percentage of total words. Three controls shape the result: 'Ignore Common Words' filters out 60 stop words like 'the', 'and', 'is', 'of'; 'Case Sensitive' decides whether 'Apple' and 'apple' merge or stay separate; 'Minimum Word Length' lets you exclude short connectives if the stop-word list misses any.",
        "The total word count and unique word count appear at the top of the results. The ratio between them is a rough lexical diversity score: 1,000 total words with 300 unique words gives a 30% type-token ratio, which is normal for general prose. Below 20% suggests heavy repetition; above 50% suggests very varied vocabulary. Punctuation is stripped before counting, so 'cat,' and 'cat.' both count as 'cat'."
      ),
      createAnswerFirstSection(
        "Editing With Frequency Data",
        "An editor checking a 5,000-word feature for accidental repetition pastes the manuscript, ticks Ignore Common Words, and immediately sees that 'really' appears 47 times - a clear filler-word habit to fix. A content marketer auditing a blog post for SEO keyword density wants to see the target keyword in the top three but not above 3% (a sign of stuffing). A linguistics student profiling the vocabulary of a 19th-century novel turns off the stop-word filter to study how prose-glue words like 'said' and 'thou' actually distribute.",
        "A few caveats: the top-20 cap means very long documents (10,000+ words) may need multiple analyses to dig deeper. Hyphenated compounds like 'self-aware' get split into 'self' and 'aware' because the regex strips non-alphanumeric characters. Contractions like 'don't' become 'dont'. For a rougher overview that includes reading time and the top five content words, [Word Counter](/word-counter) is the lighter-weight sibling of this tool."
      ),
    ],
    faqs: [
      createFAQ(
        "Why are some short words still showing despite the stop-word filter?",
        "The built-in stop-word list covers around 60 of the most common English filler words. It is deliberately not exhaustive - words like 'just', 'really', 'very' and 'actually' are left in because they often signal a writer's voice tic worth flagging. To exclude additional words, raise the Minimum Word Length filter, or run a [Find and Replace](/find-and-replace) pass to strip the words you do not want counted before pasting."
      ),
      createFAQ(
        "How does it handle plurals and verb conjugations?",
        "It treats them as separate words. 'Cat' and 'cats' are two different entries; 'run' and 'running' and 'ran' are three. This is unusual for academic linguistics tools (which often lemmatise) but is the behaviour writers actually want for editing - you usually do want to see both 'cat' and 'cats' as separate counts because their narrative functions differ."
      ),
      createFAQ(
        "What is a healthy keyword density for SEO?",
        "Most SEO guides recommend 1-3% for the primary keyword. Below 1% suggests the keyword is barely present; above 3% reads as keyword-stuffed and may trigger Google's spam classifiers. Use the percentage column to check your target keyword sits in this band. Modern Google ranking factors weight content quality and topic relevance far more than raw density, so do not optimise to four decimal places."
      ),
      createFAQ(
        "Does it count compound words correctly?",
        "Hyphenated compounds like 'mother-in-law' or 'self-aware' get split into their parts because punctuation is stripped before counting. Solid compounds like 'mailbox' or 'sunset' count as single words because there is no separator. Open compounds like 'high school' count as two separate words. There is no settings switch for this; if you need accurate compound counting, replace your hyphens with a placeholder before pasting."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "character-counter", label: "Character Counter" },
      { slug: "readability-checker", label: "Readability Checker" },
    ],
  },
};
