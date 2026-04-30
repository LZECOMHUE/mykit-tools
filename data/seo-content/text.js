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

  "text-diff": {
    sections: [
      createAnswerFirstSection(
        "How to Compare Two Pieces of Text",
        "Paste your original on the left, the new version on the right, and the tool walks both inputs line by line and marks each line as added, removed, or unchanged. Removed lines highlight red, added lines highlight green, and matching lines stay neutral. The summary above the result tells you exactly how many of each appear, so you can spot at a glance whether an edit changed two lines or twenty.",
        "The comparison runs on whole lines, not characters or words. That matters when you are diffing prose: rewording a sentence shows as one line removed and one line added, even if 90% of the words match. For paragraph-level edits this is what you want; for tracking individual word changes inside a sentence, copy the two lines into a [find and replace](/find-and-replace) workflow instead. The diff also treats whitespace as significant, so a line with trailing spaces will not match a line without them. Run the text through the [whitespace remover](/whitespace-remover) first if invisible characters are tripping you up."
      ),
      createAnswerFirstSection(
        "When You Actually Need a Diff",
        "Three situations come up most often. First, comparing two contract drafts a lawyer sent back, where you need to know which clauses moved. Second, checking what a copy editor changed in your article. Third, debugging two configuration files when one works and one does not. In all three the goal is the same: see only the changes, ignore the bulk of the text that did not move.",
        "A worked example: you sent a 600-word blog post to an editor and got back a version with no track changes. Pasting both into the diff shows 14 lines unchanged, 6 removed, 8 added. You can now read just those 14 lines of edits in 30 seconds instead of re-reading the whole post and trying to remember the original. For longer documents this can save 10 to 20 minutes per review cycle."
      ),
      createAnswerFirstSection(
        "Reading the Summary Stats",
        "The header above the diff shows three counters: lines unchanged, lines added, lines removed. A small edit might give you 38 unchanged, 2 added, 2 removed. A heavy rewrite of the same source might show 5 unchanged, 35 added, 33 removed. The ratio between unchanged and changed lines is a quick proxy for how much real work happened on the document.",
        "Watch out for one common gotcha. If the original has Windows line endings (CRLF) and the modified version has Unix line endings (LF), every single line will appear changed because the invisible carriage returns do not match. The fix is to paste both into a plain text editor first, save with consistent line endings, and re-run the comparison. The [whitespace remover](/whitespace-remover) will not fix this on its own; use a text editor's line-ending conversion."
      ),
      createAnswerFirstSection(
        "Privacy and What Happens to Your Text",
        "Both texts you paste in stay on your device. The diff calculation runs entirely in your browser using JavaScript, so nothing is uploaded to a server, logged, or stored after you close the tab. That makes the tool safe for confidential drafts, contracts, and code that should never leave your machine.",
        "If you are working on something sensitive, you can run the tool offline by loading the page once with the network on, then disconnecting. The diff will keep working because all the logic is already in your browser. There is no server-side fallback, no telemetry on the text content, and no ad network reading the textareas."
      ),
    ],
    faqs: [
      createFAQ(
        "Can it diff documents longer than a few thousand words?",
        "Yes, but the rendering slows down past about 5,000 lines because the browser has to paint every coloured row. For very large files (entire codebases, books) a desktop diff tool like Beyond Compare or Meld will be faster. For most articles, contracts, emails, and configuration files this tool handles them in under a second."
      ),
      createFAQ(
        "Why does it show two lines as different when they look identical?",
        "Almost always invisible whitespace. Trailing spaces, tabs versus spaces, or different line-ending conventions (CRLF vs LF) make lines unequal even when they look the same. Run both texts through the [whitespace remover](/whitespace-remover) with 'Trim lines' enabled, then compare again."
      ),
      createFAQ(
        "Does it work as a code diff?",
        "It works for any plain text including code, but it only diffs whole lines, not tokens or syntax. For serious code review use git diff or a code-aware tool like Diffchecker; for quick checks of two pasted snippets this tool is fine. It will not understand that swapping the order of two function arguments is a meaningful change."
      ),
      createFAQ(
        "Can I share the diff with someone else?",
        "Not as a link. The text never leaves your browser, so there is no server-side state to share. To share results, take a screenshot of the diff or copy both texts and the summary into an email. If you need a shareable link, GitHub Gist is a free option and provides proper diff URLs."
      ),
    ],
    relatedTools: [
      { slug: "find-and-replace", label: "Find and Replace" },
      { slug: "whitespace-remover", label: "Whitespace Remover" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "readability-checker": {
    sections: [
      createAnswerFirstSection(
        "What the Five Scores Actually Mean",
        "The tool runs five different readability formulas on your text and shows them side by side: Flesch Reading Ease (a 0 to 100 score where 60 to 70 is plain English), Flesch-Kincaid Grade Level (the US school grade needed to read it), Gunning Fog Index (years of formal education needed), SMOG (a polysyllable-based grade for technical writing), and Coleman-Liau (a character-count-based grade that ignores syllables). Below all five the tool averages the four grade-level scores into one number and gives a label: Very Easy, Easy, Fairly Easy, Standard, Fairly Difficult, Difficult, or Very Difficult.",
        "Five formulas instead of one because each captures something different. Flesch-Kincaid and SMOG penalise long syllable counts; Coleman-Liau cares only about characters and sentence length, so it works on text where syllable detection is unreliable (initialism-heavy technical writing, for example). Gunning Fog is the formula journalists are taught in school. Showing all five together stops you from optimising to one number and missing a problem the others would catch."
      ),
      createAnswerFirstSection(
        "What Score You Should Aim For",
        "It depends on the audience. For a general consumer blog, news article, or marketing copy aim for Flesch Reading Ease 60 to 70 and grade level 7 to 9. The Sun and the Daily Mirror sit around grade 6; The Guardian sits around grade 9 to 10; The Economist runs grade 14. For a B2B SaaS landing page aim grade 9 to 11. For a legal contract or academic paper grade 14 plus is normal and not a problem.",
        "Concrete example: paste in a 200-word email to a customer and you might get Flesch Reading Ease 72, Flesch-Kincaid grade 7.2, average sentence length 14 words. That is on target for customer-facing email. If the same email returns Flesch Reading Ease 38 and grade 14, you have written something that reads like a legal disclaimer; the tips panel will tell you to break long sentences and replace polysyllabic words. Re-run after editing and watch the score move."
      ),
      createAnswerFirstSection(
        "Reading Time and What Drives It",
        "The reading time estimate uses 200 words per minute, which is the average for adults reading English prose silently. A 1,000-word article comes out as 5 minutes; a 250-word product description as roughly 1 minute. Reading aloud is slower (about 130 to 150 wpm); skimming is faster (300 to 400 wpm). The number is a rough planning aid, not a stopwatch.",
        "If your text reads slowly even though the word count is short, it usually means very long sentences or very dense sentences. The improvement tips at the bottom of the result flag the specific issue: average sentence length over 15 words, average syllables per word over 1.5, complex words above 10% of the total. Fix the flagged item, paste the rewrite, and you will usually see the grade level drop by 1 to 2 levels. The [word counter](/word-counter) will give you a more granular breakdown if you need exact totals."
      ),
      createAnswerFirstSection(
        "Limitations Every Score Has",
        "Readability formulas measure surface features (sentence length, syllable count, character count) not actual comprehension. A 7th-grade-rated paragraph about quantum entanglement is still incomprehensible to a 7th grader because the concepts are hard, not the syntax. Equally, a Hemingway novel with a Flesch-Kincaid grade of 4 is not literally a children's book; the prose is just unusually clean.",
        "The formulas were also calibrated on US English text decades ago. They work fine for British English but mishandle some specific things: hyphenated compounds get over-counted as polysyllabic, technical jargon with three or four syllables (kilometre, organisation) inflates Gunning Fog without genuinely making the text harder, and very short texts (under 100 words) give unreliable scores because there is not enough data. Treat the score as a strong hint, not a verdict."
      ),
    ],
    faqs: [
      createFAQ(
        "Is Flesch Reading Ease or grade level the better number to use?",
        "Use whichever your audience speaks. American writers and editors mostly cite grade level (Hemingway App, Yoast SEO use it). British and European writers more often cite Flesch Reading Ease. They are essentially the same information on different scales: Flesch Reading Ease 70 and Flesch-Kincaid grade 7 describe the same text. Pick one and stick to it across a team for consistency."
      ),
      createFAQ(
        "What is a 'complex' or polysyllabic word?",
        "Any word with three or more syllables, like 'organisation' (5), 'particularly' (5), or 'consequently' (4). Two-syllable words like 'happy' or 'morning' do not count. Gunning Fog and SMOG both penalise polysyllabic words because they correlate strongly with reading difficulty in real research."
      ),
      createFAQ(
        "Why do I get different scores from Hemingway App?",
        "Hemingway uses its own modified Flesch-Kincaid that adds penalties for adverbs, passive voice, and 'hard to read' sentences (subjective rules). This tool uses the original published formulas, unmodified. For a marketing website Hemingway's score will be slightly worse; for a comparison against academic standards the unmodified formulas (here) are the right baseline."
      ),
      createFAQ(
        "Does it work on text under 100 words?",
        "It runs, but the scores wobble. With three sentences the average sentence length is dominated by whichever sentence is longest, and one polysyllabic word can swing Gunning Fog by 2 grades. For meaningful results paste at least 200 to 300 words. For a single sentence the score is essentially noise."
      ),
      createFAQ(
        "Should I aim for the lowest possible score?",
        "No. Writing a B2B sales page at grade 5 makes you sound like you think the reader is stupid; writing a children's book at grade 12 fails the audience. Pick the right level for the reader. The exception is web content for a general audience, where grade 7 to 9 is consistently a safe ceiling."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "character-counter", label: "Character Counter" },
      { slug: "readability-score-checker", label: "Readability Score Checker" },
    ],
  },

  "fancy-text-generator": {
    sections: [
      createAnswerFirstSection(
        "How Unicode Lets You Use 'Fancy' Fonts in Plain Text",
        "Type into the input and the tool converts your letters into Unicode mathematical and decorative characters that look like different fonts: bold, italic, script, gothic, double-struck, monospace, sans-serif variants, circled letters, squared letters, fullwidth, small caps, upside-down, strikethrough and underline. Click the style you want and the converted text copies to your clipboard ready to paste into Instagram, TikTok bios, Twitter, Discord, or any other plain-text field.",
        "The trick is that these are not real fonts. They are characters from blocks like Mathematical Alphanumeric Symbols (U+1D400 to U+1D7FF), Enclosed Alphanumerics (U+2460 to U+24FF), and Fullwidth Forms (U+FF00 to U+FFEF). Because they are real Unicode codepoints, every modern app that handles text at all (browser, social network, messaging app) renders them. There is no installation, no font upload, no plugin. The downside: search engines and screen readers cannot read them properly, so do not use them in headlines, link text, or anywhere accessibility matters."
      ),
      createAnswerFirstSection(
        "Where Each Style Actually Renders Properly",
        "Bold, italic, sans-serif, and monospace styles display correctly almost everywhere because they live in the Mathematical Alphanumeric Symbols block, which is well-supported. Script, fraktur (gothic), and double-struck render fine in most modern browsers and apps but can fall back to plain text on older Android devices. Circled and squared letters work universally. Upside-down text uses real Latin letter forms (ɐqɔp) and works everywhere. Strikethrough and underline use combining diacritics, which most platforms render correctly but a few mobile email clients drop.",
        "If a style looks broken on a particular platform, the receiving app does not have the right font for that Unicode block and is rendering tofu boxes (□). The fix is to pick a different style. Bold and italic almost always work; if you need maximum compatibility, use those two. For Instagram bios and captions specifically, all 17 styles in this tool render correctly because Instagram uses the system font."
      ),
      createAnswerFirstSection(
        "Using It for Bios, Captions, and Branding",
        "The most common use is making one or two words stand out in a social media bio that does not let you bold or italicise. For example, an Instagram bio reading 'Photographer based in 𝐒𝐭𝐨𝐜𝐤𝐡𝐨𝐥𝐦' uses bold characters for the city name. A LinkedIn headline reading '𝙎𝙚𝙣𝙞𝙤𝙧 𝘿𝙚𝙨𝙞𝙜𝙣𝙚𝙧 - 𝙀𝙭-𝙂𝙤𝙤𝙜𝙡𝙚' uses bold italic to draw the eye to the seniority and the prior employer. A TikTok caption with 'ⓢⓤⓜⓜⓔⓡ ⓟⓛⓐⓝⓢ' uses circled letters as a quirky visual hook.",
        "Used sparingly this can lift engagement on bios and captions; used aggressively across every post it reads as gimmicky and accessibility-hostile. A reasonable rule: pick one style, apply it to one or two words per bio or post, never use it for the call-to-action or links. For full posts where line breaks matter on Instagram, pair this with the [Instagram caption formatter](/instagram-caption-formatter) so your spacing survives."
      ),
      createAnswerFirstSection(
        "What It Will Not Do",
        "It cannot apply bold or italic to text that already uses fancy characters: applying italic to a bold-converted string just gives you back the original input as italic. It cannot bold or italicise numbers in every style (script, double-struck and a couple of others have no number support); the tool falls back to plain digits in those cases. It cannot mix two styles in one word; you would have to convert each portion separately and concatenate.",
        "Most importantly, do not use this on anything Google indexes. Page titles, meta descriptions, blog post H1s, link anchors, alt text - all of those should be plain Latin characters because search engines treat 𝐡𝐞𝐥𝐥𝐨 and hello as different words and your SEO will suffer. Bios, captions, and chat messages are fine; structured content is not. Use the [case converter](/case-converter) for proper title-casing instead."
      ),
    ],
    faqs: [
      createFAQ(
        "Will the fancy text show up correctly on iPhone, Android, and desktop?",
        "Bold, italic, sans-serif, monospace, fullwidth, small caps, circled and squared all render correctly across iOS, Android, Windows and macOS in modern browsers. Script, fraktur and double-struck work everywhere except some older Android phones (pre-Android 8) where they display as boxes. Upside-down text and strikethrough work on every platform tested in 2026."
      ),
      createFAQ(
        "Can I use fancy text in my email signature?",
        "Yes for Gmail, Outlook 365, Apple Mail and Yahoo Mail - all four render Unicode mathematical alphanumerics correctly. Older Outlook desktop versions (2013 and earlier) sometimes show boxes for less-common styles like Gothic and Double Struck. Test by sending yourself a draft to whichever client you care about most."
      ),
      createFAQ(
        "Is fancy text legal to use in a username on Instagram or Twitter?",
        "Yes for Instagram, TikTok, Threads and most platforms - they accept any Unicode in display names. X (Twitter) restricts certain Unicode blocks in usernames (the @handle) but allows them freely in display names and bios. LinkedIn allows them in headlines and About sections but they may flag overly stylised names as suspicious during account review."
      ),
      createFAQ(
        "Why does my converted text not work in Microsoft Word?",
        "It does, but Word will sometimes auto-correct fancy characters back to plain text on paste, particularly for italic and bold styles. Disable AutoCorrect's 'Replace text as you type' or use Paste Special > Unformatted Text. For a Word document you should genuinely use Word's built-in bold (Ctrl+B) - fancy Unicode is for places that do not have a bold button."
      ),
      createFAQ(
        "Does this hurt my SEO if I use it on a website?",
        "Yes, badly. Google indexes 𝐡𝐞𝐥𝐥𝐨 (mathematical bold) and hello (plain) as different words. Using fancy text in headlines, meta titles, page H1s, link anchors or body content tanks your rankings for the real keyword. Keep it to social bios and captions only."
      ),
    ],
    relatedTools: [
      { slug: "instagram-caption-formatter", label: "Instagram Caption Formatter" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "slug-generator", label: "Slug Generator" },
    ],
  },

  "email-template-generator": {
    sections: [
      createAnswerFirstSection(
        "Pick the Right Template Type for the Situation",
        "The tool offers seven types: complaint, request, thank you, follow-up, introduction, apology, and resignation. Pick the type that matches your goal, then choose a tone (formal, professional, or friendly), fill in the recipient, the topic, and any specific details, and the email assembles itself with the right opening, structure, and sign-off. The output is plain text ready to paste into Gmail, Outlook, or any email client.",
        "Choosing well matters. Sending a 'request' template when you should have used 'follow-up' makes you look like you have forgotten the first message. Sending a 'formal' apology to your boss who you speak to daily reads as overcompensating. The default is professional tone with the thank-you template, which is the safest combination if you are not sure - polite, neutral, and unlikely to land badly."
      ),
      createAnswerFirstSection(
        "When Each Tone Fits",
        "Formal opens with 'Dear [Name],' and closes with 'Best regards' or 'Thank you for your consideration.' Use it for legal correspondence, complaints to large companies, resignation letters, and any first email to a senior person you do not know. Professional opens with 'Hi [Name],' and closes with 'Best' or 'Thanks.' Use it for almost everything else: colleagues, clients you have a relationship with, recruiters, peers in other companies. Friendly opens with 'Hey [Name],' and closes with 'Cheers.' Use it only with people you actually know well; using friendly tone with a stranger reads as unprofessional.",
        "A common mistake is using formal tone for routine internal email. Writing 'Dear Sarah, I hope this email finds you well' to your direct colleague Sarah, who you spoke to in the kitchen 20 minutes ago, comes across as cold or sarcastic. The professional tone is right for 95% of work email; reserve formal for genuinely formal situations and friendly for actual friends."
      ),
      createAnswerFirstSection(
        "Filling in the Three Detail Fields",
        "The template uses three placeholders: recipient (the person's name, used in the greeting), details (the topic in a few words), and specifics (the meat of the email, 1-3 sentences of context). For a thank-you to a client, recipient is 'Sarah', details is 'introducing me to your finance team last week', specifics is 'the conversation with Mark led to a six-month engagement starting in May. I really appreciate you making the connection at the right moment.'",
        "Keep specifics tight. The default templates work because they are short and let your specific words carry the message. Pasting in three paragraphs of explanation makes the email feel templated and sycophantic at the same time. If you need to write a long email with multiple sections, generate the structure here, then edit the result rather than trying to fit everything into one specifics field. The [word counter](/word-counter) is handy for keeping your final draft under 200 words, which is what most professional emails should be."
      ),
      createAnswerFirstSection(
        "When You Should Not Use a Template",
        "Templates are starting points, not finished emails. For high-stakes messages (negotiating a pay rise, breaking bad news to a client, declining a job offer) the template should anchor the structure but every sentence needs your own wording. Templates that are obviously templated read as low-effort, and the recipient can tell. The 'Hey {recipient}, I wanted to apologize for {details}' pattern is fine for a missed standup; it is not fine for apologising to a customer who lost data.",
        "Also skip templates for emails where the relationship matters more than the content. A condolence message, a personal recommendation, a goodbye email to a long-term colleague: these need to sound like you, not like a generator. Use the resignation template to remember the structure (date, transition offer, thanks), then rewrite the entire body in your own words. For polished output, run the result through the [Instagram caption formatter](/instagram-caption-formatter) if you also want to share excerpts on social."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I save my own custom templates?",
        "Not in this tool. The seven types are built in, and the tool generates fresh output each time without storing anything between sessions. If you find yourself rewriting the same template repeatedly, save it as a draft in your email client (Gmail's 'Templates' feature, Outlook's 'Quick Parts') instead."
      ),
      createFAQ(
        "Are these templates appropriate for British or American workplaces?",
        "The templates use neutral business English that works in both. 'Best regards' and 'Best' work in the UK, US, Canada and Australia. 'Cheers' is more common in UK and Australian friendly email; some American readers parse it as casual but not unprofessional. If in doubt, use 'professional' tone, which uses 'Thanks' and 'Best' - the most platform-neutral combination."
      ),
      createFAQ(
        "What is the difference between a follow-up and a request template?",
        "A request is a first ask - you have not asked this person about this topic before. A follow-up is a second or third reminder when you have not had a reply. Using request when you should follow up makes the recipient think you have forgotten the original message; using follow-up on a fresh topic reads as passive-aggressive. The wording is meaningfully different."
      ),
      createFAQ(
        "Should I always include a subject line?",
        "Always, but this tool only generates the body. Your subject should be the topic in 5 to 8 words, ideally with the action you want: 'Quick question about Tuesday's invoice', 'Thanks for the introduction to Sarah', 'Following up: contract review by Friday'. Vague subjects ('Hi', 'Question') get ignored; concrete subjects with a deadline get answered first."
      ),
    ],
    relatedTools: [
      { slug: "instagram-caption-formatter", label: "Instagram Caption Formatter" },
      { slug: "fancy-text-generator", label: "Fancy Text Generator" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "text-reverser": {
    sections: [
      createAnswerFirstSection(
        "Three Ways to Reverse Text",
        "Pick a mode, paste your text, and the result updates as you type. Character mode reverses every character so 'Hello World' becomes 'dlroW olleH'. Word mode keeps words intact but reverses their order so 'The quick brown fox' becomes 'fox brown quick The'. Line mode keeps each line intact but reverses the order of lines, useful for flipping a top-to-bottom list into bottom-to-top.",
        "The three modes solve different problems. Character reversal is for palindrome checking, novelty social media posts, and obfuscating answers ('the murderer is reldun' as a quiz spoiler). Word reversal is occasionally useful for testing how a layout handles right-to-left languages without actually translating. Line reversal is the most genuinely useful: flipping a chronological event log into reverse-chronological, or reversing a sorted list without re-sorting."
      ),
      createAnswerFirstSection(
        "Palindromes and How to Spot Them",
        "A palindrome reads the same backwards as forwards. 'Racecar' reversed is 'racecar'; 'Madam' reversed is 'madam'; 'A man, a plan, a canal: Panama' reversed (ignoring punctuation and spaces) is the same. To check whether a phrase is a palindrome, paste it, switch to character mode, and compare the result to your original. If you want to ignore spaces and punctuation, run the input through the [whitespace remover](/whitespace-remover) with 'Remove all whitespace' enabled first.",
        "Some famous palindromes to test the tool with: 'Was it a car or a cat I saw?', 'Never odd or even', 'Eva, can I see bees in a cave?'. Each becomes itself when reversed. Pangrams (sentences using every letter) are not palindromes; 'The quick brown fox jumps over the lazy dog' reversed is 'god yzal eht revo spmuj xof nworb kciuq ehT', which is gibberish."
      ),
      createAnswerFirstSection(
        "Reversing Lists and Logs",
        "Line mode is the option you will actually reach for at work. A worked example: you have a meeting log with 12 entries from oldest at the top to newest at the bottom, and your manager wants the most recent items first. Paste it in, pick line mode, copy the output. Done in five seconds. The same applies to reversing a numbered to-do list to put completed items at the top, or flipping a timeline to read newest-first.",
        "Word mode is rare but occasionally useful for designers testing whether a UI breaks when text reads right-to-left. It does not actually translate to RTL; for proper bidirectional testing use a Lorem Ipsum tool with Arabic or Hebrew samples instead. For most everyday text manipulation, you will find more value pairing this with the [text sorter](/text-sorter) (sort first, then reverse to flip ascending to descending) or with the [whitespace remover](/whitespace-remover) (clean first, then reverse)."
      ),
    ],
    faqs: [
      createFAQ(
        "Does it reverse emoji and accented characters correctly?",
        "Mostly yes, but with caveats. Single-character emoji (😀, 🎉) reverse fine. Compound emoji built from multiple codepoints (👨‍👩‍👧 = three faces joined by zero-width joiners) sometimes split apart on character reversal because the tool reverses each codepoint individually. Accented Latin characters (é, ñ, ü) reverse correctly because each is a single codepoint."
      ),
      createFAQ(
        "Can I reverse only part of the text?",
        "No, the tool reverses everything in the input. To reverse just a section, paste only that section. To preserve some lines and reverse others, split the text into two passes and concatenate the result manually."
      ),
      createFAQ(
        "Is there a way to reverse text live as I type?",
        "It already does. The output updates the moment you change the input or switch modes - there is no 'Reverse' button to click. Just type or paste into the input field and the result appears below."
      ),
      createFAQ(
        "What is the difference between word mode and line mode for a single sentence?",
        "On a sentence with no line breaks, line mode does nothing (one line in, one line out, in the same order). Word mode flips the words. Use word mode for sentence-level word order reversal; line mode is for multi-line text where you want to keep each line's content intact but flip their sequence."
      ),
    ],
    relatedTools: [
      { slug: "text-sorter", label: "Text Sorter" },
      { slug: "whitespace-remover", label: "Whitespace Remover" },
      { slug: "word-frequency-counter", label: "Word Frequency Counter" },
    ],
  },

  "whitespace-remover": {
    sections: [
      createAnswerFirstSection(
        "Four Cleanup Options You Can Combine",
        "Toggle any combination of four options: trim lines (removes leading and trailing spaces from each line), remove blank lines (deletes empty lines so the text closes up), collapse spaces (replaces runs of multiple spaces with a single space), and remove all whitespace (the nuclear option, strips every space, tab, and line break). Output updates live as you toggle. The first three are usually combined; the fourth is for special cases like generating a slug or a hash input.",
        "Real example. Paste this in: '  Hello    World  \\n\\nThis  has   extra   spaces' and turn on 'Trim lines' + 'Collapse spaces' + 'Remove blank lines'. Output: 'Hello World\\nThis has extra spaces'. Two of the original 17 problem characters survive; the rest are gone. This is the single most common cleanup you will run on text copied out of PDFs, scraped websites, or messy email threads."
      ),
      createAnswerFirstSection(
        "What Each Option Actually Does",
        "Trim lines targets only line beginnings and ends, leaving spaces inside a line untouched - so 'word    word' stays 'word    word' but '   word    word   ' becomes 'word    word'. Collapse spaces targets every run of two or more spaces inside a line, replacing them with one space - 'word    word' becomes 'word word'. Run both together and 'word    word' becomes 'word word' with no leading or trailing space. Remove blank lines acts on whole lines that contain nothing or only whitespace, dropping them entirely.",
        "'Remove all whitespace' is exactly what it says: every space, tab, and newline disappears. 'Hello World' becomes 'HelloWorld'. Use it for generating clean strings to feed into hash functions, URL slugs (though the [slug generator](/slug-generator) is purpose-built for that), or compact concatenations. Most of the time you do not want this; you want trim + collapse + remove blanks instead."
      ),
      createAnswerFirstSection(
        "Common Cleanup Scenarios",
        "Pasting text out of a PDF: turn on all three of trim, collapse, and remove blanks. PDFs typically introduce trailing spaces, double-spaces between sentences, and blank lines between paragraphs that you do not want. Cleaning up text scraped from a website: same combination, plus consider running it through the [find and replace](/find-and-replace) tool afterwards to fix curly quotes or non-breaking spaces. Cleaning up code copied from Stack Overflow: just trim lines, since you want to keep blank lines and indentation intact.",
        "One thing this tool does not handle: invisible Unicode characters like zero-width spaces (U+200B), zero-width joiners (U+200D), or non-breaking spaces (U+00A0). Those are not detected as 'whitespace' by JavaScript's regular whitespace pattern. If a line still looks misaligned after running the tool, copy it into a hex viewer or use the [find and replace](/find-and-replace) with regex mode to target those specific codepoints. The [text diff](/text-diff) tool will also reveal mystery whitespace differences when comparing two versions of the same paragraph."
      ),
    ],
    faqs: [
      createFAQ(
        "Does 'collapse spaces' affect tabs?",
        "Yes. Tabs count as whitespace, so a sequence of tabs, mixed tabs and spaces, or runs of either gets collapsed to a single space when 'Collapse spaces' is on. If you need to preserve tab indentation in code, do not enable collapse spaces - use only 'Trim lines' instead."
      ),
      createFAQ(
        "Will it remove non-breaking spaces (U+00A0)?",
        "Only with 'Remove all whitespace' enabled. The other three options use JavaScript's whitespace pattern which excludes some Unicode space characters. For non-breaking spaces and zero-width spaces specifically, use the [find and replace](/find-and-replace) tool with regex mode and the appropriate codepoint."
      ),
      createFAQ(
        "Is there a way to keep paragraph breaks but remove single line breaks?",
        "Not directly in this tool. To do it, use [find and replace](/find-and-replace) with regex mode: replace single newlines (not double) with a space. Pattern: (?<!\\n)\\n(?!\\n) replaced with a space. That is a more advanced operation than the four toggles here cover."
      ),
      createFAQ(
        "Can I undo a removal if I clean too aggressively?",
        "Use Ctrl+Z or Cmd+Z in the input field to undo your paste, or paste again from your clipboard if the original is still there. The tool does not have an undo button because the cleanup runs live - just toggle the options off and the original text reappears in the output."
      ),
    ],
    relatedTools: [
      { slug: "text-reverser", label: "Text Reverser" },
      { slug: "text-sorter", label: "Text Sorter" },
      { slug: "find-and-replace", label: "Find and Replace" },
    ],
  },

  "text-to-morse-code": {
    sections: [
      createAnswerFirstSection(
        "How Morse Code Maps Letters to Dots and Dashes",
        "Type a message and the tool replaces each letter, number, or punctuation mark with its Morse equivalent: dot (.) for short signal, dash (-) for long signal. SOS becomes '... --- ...'. HELLO becomes '.... . .-.. .-.. ---'. Spaces between letters use a single space; spaces between words use a forward slash. The mapping follows the International Morse Code standard adopted in 1865 and still used in amateur radio and aviation today.",
        "The full set covers A through Z, 0 through 9, and 13 punctuation marks (full stop, comma, question mark, apostrophe, exclamation, slash, parentheses, ampersand, colon, semicolon, equals, plus, hyphen, underscore, quotation marks, dollar sign, at sign). Letters most common in English have the shortest codes - E is one dot, T is one dash - while rare letters like Q (--.-) and J (.---) get longer sequences. This is not a coincidence; Samuel Morse and Alfred Vail designed the codebook by counting letter frequencies in a printer's type case and assigning short codes to common letters."
      ),
      createAnswerFirstSection(
        "When Morse Code Still Gets Used",
        "Mostly amateur radio (ham radio) operators, who still pass licensing exams that include Morse comprehension in some countries. Aviation beacons broadcast their two- or three-letter station identifiers in Morse so pilots can confirm they are tuned to the right transmitter. Submarines used Morse for emergency communications well into the 2000s. Rarely, the military still uses it for low-bandwidth covert signalling. Outside those niches, Morse is more cultural than practical.",
        "The most common everyday use today is novelty: tapping out 'I love you' (.. / .-.. --- ...- . / -.-- --- ..-) on someone's hand, hidden Morse messages in birthday cards or escape rooms, and accessibility devices that translate eye-blinks or single-button presses into text via Morse. The Apple Watch and various assistive technologies still use Morse input as an option for people with limited motor control."
      ),
      createAnswerFirstSection(
        "Reading and Decoding by Eye",
        "If you can recognise the patterns for SOS (... --- ...), CQ ('Calling Anyone' -.-. --.-), and your own initials, you can spot Morse in the wild. The classic learning trick is to memorise five-letter groups: ETIANM (one to five characters of E's pattern, building up), or ETARSL (the most common letters). Once you know those, the rest of the alphabet falls into place because the patterns build logically from the short codes outward.",
        "For decoding back to plain text, this tool only goes one way (text to Morse). To go the other way, paste the Morse into your favourite Morse decoder, or use a fixed reference table. Morse is more concise than English (about 4 characters of Morse per English letter on average), but reading it visually takes practice. The [text to binary](/text-to-binary) tool is a better choice if you want a similar 'encoded text' look that decodes more easily by eye."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does my Morse not include certain symbols I expected?",
        "International Morse Code is a finite character set. Symbols like the asterisk (*), backslash (\\), tilde (~), pipe (|), and emoji do not have official Morse equivalents and are dropped from the output. If you need to represent them, prosigns like 'AS' (.-...) or 'AR' (.-.-.) are sometimes used as substitutes, but those are conventions inside ham radio rather than universal."
      ),
      createFAQ(
        "How long does it take to learn to read Morse fluently?",
        "Casual recognition (SOS, your name, common words) takes about an hour. Conversational Morse at 5 words per minute takes 10 to 20 hours of practice spread over a few weeks. Operator-grade Morse at 20 words per minute takes 200+ hours. The Koch method (learning two characters at full speed, then adding more) is the most efficient training approach if you are serious about it."
      ),
      createFAQ(
        "Can Morse code transmit numbers and punctuation?",
        "Yes. Numbers 0 through 9 each have a five-symbol Morse code (e.g. 5 is ..... and 0 is -----). Punctuation marks have longer codes; full stop is .-.-.- (six symbols) and question mark is ..--.. (six symbols). Both are part of the International Morse Code standard, not extensions, so they are recognised by every Morse-trained operator."
      ),
      createFAQ(
        "What does the slash mean in Morse output?",
        "It separates words. In handwritten or printed Morse, a single space separates letters within a word and a longer pause (transcribed as / or as a wider space) separates words. Without it, '.... . .-.. .-.. --- .-- --- .-. .-.. -..' could be parsed as one word; with the slash you get 'HELLO / WORLD' which is unambiguous."
      ),
    ],
    relatedTools: [
      { slug: "text-to-binary", label: "Text to Binary Converter" },
      { slug: "slug-generator", label: "Slug Generator" },
      { slug: "password-generator", label: "Password Generator" },
    ],
  },

  "readability-score-checker": {
    sections: [
      createAnswerFirstSection(
        "The Four Scores This Tool Calculates",
        "Paste text and the tool computes Flesch Reading Ease (0 to 100), Flesch-Kincaid Grade Level (US school grade), Gunning Fog Index (years of education), and Coleman-Liau Index (also a grade level, but built from character counts not syllables). Below the scores it shows the underlying stats: word count, sentence count, syllable count, average words per sentence, and average syllables per word. Each score gets a colour-coded label - green for easy, yellow for standard, orange for advanced, red for very advanced.",
        "Four scores instead of one because each formula weights things differently. Flesch Reading Ease and Flesch-Kincaid are the dominant choices for general writing because they balance sentence length and syllable count. Gunning Fog penalises words of three or more syllables harder, which makes it sensitive to jargon. Coleman-Liau ignores syllables entirely and works only from characters and sentences, which makes it the most reliable score on text where automatic syllable counting fails (acronyms, technical abbreviations, proper nouns)."
      ),
      createAnswerFirstSection(
        "What 'Standard' Means and What to Aim For",
        "On the Flesch Reading Ease scale, 60 to 70 is 'Standard' - readable by an average 13- to 15-year-old. Below 30 is 'Very Difficult' and is academic-paper territory; above 90 is 'Very Easy' and reads like a children's book. For the grade-level scores (Flesch-Kincaid, Gunning Fog, Coleman-Liau), the colour coding here flags 0 to 6 as easy, 7 to 9 as standard, 10 to 12 as advanced, 13+ as very advanced. Most online writing should target Flesch Reading Ease 60-70 and grade level 7-9.",
        "If you write for a B2C audience and your scores come back grade 14, your sentences are too long or your words are too polysyllabic. The 'Average words per sentence' stat will tell you which: above 20 means cut your sentences; above 1.7 average syllables per word means swap long words for short ones. A worked example: a paragraph with 92 words, 3 sentences, average 30.7 words per sentence and 1.9 syllables per word will score around grade 18. Break those three sentences into seven, replace 'utilise' with 'use' and 'subsequently' with 'then', and the same content will read at grade 9."
      ),
      createAnswerFirstSection(
        "Differences Between This and the Sister Tool",
        "This tool focuses on four core formulas with side-by-side stats and colour rating. The [readability checker](/readability-checker) adds a fifth formula (SMOG), an averaged grade level across all four formulas, an estimated reading time at 200 words per minute, and an automatic improvement-tips panel. If you want a quick check with raw numbers and stats, use this one. If you want a full assessment with an automatic verdict and suggestions, use the other.",
        "Both tools use the same underlying formulas (originals, not modified) so the numbers will match within rounding. The choice is presentation: this tool exposes the inputs (syllable count, character count, average sentence length) so you can see what is driving each score. The other tool focuses on outputs (verdict, reading time, tips) so you can act faster. Pair this with the [word counter](/word-counter) if you also need section-by-section word counts."
      ),
    ],
    faqs: [
      createFAQ(
        "Why are SMOG scores missing from this tool?",
        "This tool focuses on the four most-cited formulas: Flesch Reading Ease, Flesch-Kincaid, Gunning Fog, and Coleman-Liau. SMOG is included in the [readability checker](/readability-checker) instead. SMOG is most useful for technical and medical writing where polysyllabic words are common; for general prose the four formulas here cover the same ground."
      ),
      createFAQ(
        "Why might Flesch-Kincaid and Coleman-Liau give different grade levels for the same text?",
        "Because they measure different things. Flesch-Kincaid uses syllables per word; Coleman-Liau uses characters per word. A text full of long but simple words ('representative', 'organisation', 'environment') reads as harder by Flesch-Kincaid (high syllable count) but only moderately hard by Coleman-Liau (long characters but not unusually so). A 2-grade gap between the two scores is normal; a 5-grade gap usually means automatic syllable detection has failed on some unusual words."
      ),
      createFAQ(
        "Does this work on languages other than English?",
        "No. All four formulas were calibrated on English text and use English syllable rules and English character frequencies. Running them on French, German, or Spanish gives nonsense scores because syllable structure and average word length differ substantially. Use a language-specific readability tool for non-English text."
      ),
      createFAQ(
        "How long does my text need to be for accurate scores?",
        "At least 100 words, ideally 300+. Below 100 words a single long sentence or one polysyllabic word can swing the score by 2 to 3 grade levels. Below 30 words the scores are essentially noise. Marketing copy is often shorter than this threshold; in that case judge it by the underlying stats (average sentence length, syllables per word) rather than the composite scores."
      ),
    ],
    relatedTools: [
      { slug: "readability-checker", label: "Readability Checker" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "line-counter", label: "Line Counter" },
    ],
  },

  "text-encryption-tool": {
    sections: [
      createAnswerFirstSection(
        "Two Classical Ciphers, Side by Side",
        "Pick Vigenere or Caesar, type your plaintext, set a key (a passphrase for Vigenere, a number from 1 to 25 for Caesar), and hit Encrypt. The tool shifts each letter according to the cipher rules and outputs the ciphertext. Hit Decrypt with the same key to recover the original. The default Caesar shift is 3 (the original 'Caesar shift' that Julius Caesar reportedly used for military dispatches around 50 BC); Vigenere has no default and requires you to enter a passphrase.",
        "Caesar shifts every letter by the same fixed amount. With shift 3, 'HELLO' becomes 'KHOOR' (H→K, E→H, L→O twice, O→R). Vigenere uses a repeating passphrase to vary the shift letter by letter. With key 'KEY', 'HELLO' becomes 'RIJVS' (H+K=R, E+E=I, L+Y=J, then the key repeats: L+K=V, O+E=S). Vigenere is much harder to crack by hand because the same plaintext letter can become different ciphertext letters depending on its position."
      ),
      createAnswerFirstSection(
        "Why You Should Not Use This for Real Secrets",
        "Both ciphers were broken decades or centuries ago. Caesar with 25 possible shifts can be brute-forced in under a second by trying every shift and looking for English words; the Kasiski examination cracks Vigenere given enough ciphertext (and a computer cracks it instantly with frequency analysis on the most likely key length). Modern attackers do not even bother running these as 'encryption' - they are puzzle-book ciphers, not security primitives.",
        "If you need actual encryption for sensitive data, use AES-256 via a password manager (1Password, Bitwarden) or PGP for email. For password generation use the [password generator](/password-generator) and store the result in a manager. This tool is for educational purposes (learning how classical ciphers work), for puzzle creation (escape rooms, treasure hunts), and for low-stakes obfuscation (hiding spoilers in a forum post). Anything you would care about a stranger reading deserves real encryption."
      ),
      createAnswerFirstSection(
        "Choosing Between Caesar and Vigenere for Puzzles",
        "For a children's birthday party treasure hunt, use Caesar with shift 3 or shift 13 (ROT13). Kids can decode it with a paper alphabet wheel in a few minutes. For an adult escape room or a more challenging puzzle, use Vigenere with a 4 to 6 letter passphrase that is itself a clue (the room's theme, a date, a character's name). Decoding requires either knowing the key or doing the cryptanalysis, which takes a sharp adult 5 to 15 minutes with paper.",
        "A worked example for a puzzle: encode the message 'THE NEXT CLUE IS UNDER THE BLUE BOOK' with Vigenere key 'BISHOP' to get a string of letters that means nothing without the key. Hide a clue elsewhere that points to BISHOP - a chess piece on a desk, a portrait of a bishop on the wall - and the puzzle solves itself. The [password generator](/password-generator) is useful for picking memorable but non-obvious keys when the plot calls for a random-looking password rather than a thematic one."
      ),
    ],
    faqs: [
      createFAQ(
        "What happens to numbers, spaces, and punctuation when I encrypt?",
        "They pass through unchanged. The ciphers in this tool only operate on the 26 Latin letters (A-Z and a-z); digits, spaces, punctuation, and any other character appears in the ciphertext exactly as it does in the plaintext. That is a deliberate choice for puzzle-making but does leak information about the original (sentence boundaries, word lengths). For real encryption you want everything obfuscated."
      ),
      createFAQ(
        "Is the case preserved when I encrypt?",
        "Yes. Uppercase letters in the plaintext stay uppercase in the ciphertext; lowercase stay lowercase. The shift maths uses the same offset either way, just based on different reference codepoints (65 for uppercase A, 97 for lowercase a). 'Hello' encrypted with Caesar shift 3 is 'Khoor', preserving the capital H."
      ),
      createFAQ(
        "What is ROT13 and is it the same as Caesar?",
        "ROT13 is Caesar with shift 13. Because the alphabet has 26 letters, shifting by 13 twice brings you back to the original - so encrypting and decrypting are the same operation. ROT13 is the de facto standard for hiding spoilers, jokes, and answers in plain-text forums; this tool will produce ROT13 if you set the Caesar shift to 13."
      ),
      createFAQ(
        "Could a computer crack a Vigenere with a long passphrase?",
        "Yes, given enough ciphertext. With a 6-letter key and 200+ characters of ciphertext, frequency analysis recovers the key in under a second on a laptop. Even a 12-letter random key falls to a determined attacker if they have a few thousand characters. Vigenere is unbreakable only when the key is at least as long as the message and never reused (the one-time pad), and that is impractical for almost everything."
      ),
    ],
    relatedTools: [
      { slug: "password-generator", label: "Password Generator" },
      { slug: "base64-converter", label: "Base64 Converter" },
      { slug: "text-to-binary", label: "Text to Binary Converter" },
    ],
  },

  "case-converter": {
    sections: [
      createAnswerFirstSection(
        "Common Text Case Conversions",
        "UPPERCASE: ALL CAPITALS. lowercase: all small. Title Case: First Letter Of Each Word Capitalised. Sentence case: first letter of sentence capitalised, rest lowercase. camelCase: noSpaces, firstWordLowerThenCapsForRest. PascalCase: SameButFirstLetterAlsoCapital. snake_case: words_separated_by_underscores. kebab-case: words-separated-by-hyphens.",
        "Case conventions matter for: programming variable names (camelCase or snake_case depending on language), URL slugs (lowercase-kebab-case), professional headings (Title Case), formal communication (proper sentence case, no SHOUTING). Adopting consistent case in writing improves readability; mixing cases inconsistently looks unprofessional."
      ),
      {
        heading: "Case Conversion Examples",
        table: {
          headers: ["Style", "Example"],
          rows: [
            ["UPPERCASE", "HELLO WORLD"],
            ["lowercase", "hello world"],
            ["Title Case", "Hello World"],
            ["Sentence case", "Hello world"],
            ["camelCase", "helloWorld"],
            ["PascalCase", "HelloWorld"],
            ["snake_case", "hello_world"],
            ["kebab-case", "hello-world"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "When should I use Title Case?",
        "Headings, book titles, song titles, formal documents. Style guides differ on which words to capitalise (articles 'a', 'the' are often kept lowercase except when first word). Consistent application matters more than the specific style chosen."
      ),
      createFAQ(
        "What's the difference between camelCase and PascalCase?",
        "camelCase: first letter lowercase (helloWorld). PascalCase: first letter uppercase (HelloWorld). Different programming languages have different conventions: JavaScript uses camelCase for variables; C# uses PascalCase. Both readable; pick by language convention."
      ),
    ],
    relatedTools: [
      { slug: "character-counter", label: "Character Counter" },
      { slug: "slug-generator", label: "Slug Generator" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "character-counter": {
    sections: [
      createAnswerFirstSection(
        "When Character Counts Matter",
        "Twitter (now X): 280 character limit (long-form Premium goes to 25,000). SMS: 160 characters per message (concatenated SMS chains for longer). Email subject lines: best at 41-50 chars (mobile preview). Title tags (HTML SEO): 60 chars (Google's display limit). Meta descriptions: 155-160 chars. SMS short codes: typically 4-6 chars.",
        "Most modern character counters distinguish between characters (including spaces) and characters-without-spaces. They may also count words, sentences, and paragraphs. For platform-specific limits, count carefully - emoji count as 2-4 characters in most systems, certain accented characters count as 2 in SMS. The counter handles these encoding subtleties automatically."
      ),
      {
        heading: "Common Character Limits",
        table: {
          headers: ["Platform", "Char Limit"],
          rows: [
            ["Twitter (X)", "280"],
            ["LinkedIn post", "3,000"],
            ["Instagram caption", "2,200"],
            ["YouTube description", "5,000"],
            ["SMS (single message)", "160"],
            ["Email subject", "60-78 (mobile cuts shorter)"],
            ["Page title (SEO)", "60"],
            ["Meta description", "155-160"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does Twitter sometimes count tweets as more characters?",
        "Some Unicode characters count as 2-4 in Twitter's encoding (CJK characters, certain emojis, special symbols). The displayed character count adjusts; Twitter's API returns the 'weighted' character count. Plain ASCII counts as 1 each."
      ),
      createFAQ(
        "Are spaces counted?",
        "Usually yes. Most character counters include spaces by default. Some show 'characters' and 'characters without spaces' as separate counts. The platform you're targeting determines which matters - SMS counts spaces; Twitter counts spaces."
      ),
    ],
    relatedTools: [
      { slug: "word-counter", label: "Word Counter" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "line-counter", label: "Line Counter" },
    ],
  },

  "slug-generator": {
    sections: [
      createAnswerFirstSection(
        "What's a URL Slug?",
        "A slug is the URL-friendly version of a page title. Example: 'How to Make Bread' becomes 'how-to-make-bread' in the URL. Conversion rules: lowercase only, replace spaces with hyphens, remove punctuation, encode special characters. Avoid: stop words ('the', 'a', 'an'), redundant words, very long slugs (over 5 words rarely beneficial).",
        "Slugs matter for SEO, sharing, and user experience. A clean slug like 'best-coffee-shops-london' tells users (and search engines) the page topic instantly. Compare to '/post/12345' which is opaque. Modern CMS systems auto-generate slugs from titles but allow editing - take the time to craft a focused slug for important pages."
      ),
      {
        heading: "Title to Slug Examples",
        table: {
          headers: ["Title", "Slug"],
          rows: [
            ["How to Make Pasta", "how-to-make-pasta"],
            ["Best Coffee Shops in London", "best-coffee-shops-london"],
            ["The Ultimate Guide to SEO", "ultimate-guide-seo"],
            ["What's the Difference?", "whats-the-difference"],
            ["10 Tips for Better Sleep", "10-tips-better-sleep"],
            ["Café & Bistro Reviews", "cafe-bistro-reviews"],
            ["£10 Wines for Christmas", "10-wines-for-christmas"],
            ["Python vs JavaScript", "python-vs-javascript"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I include stop words?",
        "Mostly remove for cleaner slugs ('the-best-recipes' → 'best-recipes'). Keep when they change meaning ('how-to-cook' is fine; 'how' is integral). SEO impact of stop word removal is minor; readability impact is positive."
      ),
      createFAQ(
        "How long should a slug be?",
        "5 words or fewer typically. Some SEO experts recommend 3-5 words. Longer slugs work but provide diminishing returns and clutter URLs. The page title can be longer than the slug; the slug is a clean, focused URL identifier."
      ),
    ],
    relatedTools: [
      { slug: "case-converter", label: "Case Converter" },
      { slug: "text-to-slug", label: "Text to Slug" },
      { slug: "character-counter", label: "Character Counter" },
    ],
  },

  "text-to-slug": {
    sections: [
      createAnswerFirstSection(
        "How Text Becomes a URL Slug",
        "Conversion process: 1) Convert to lowercase. 2) Replace spaces with hyphens. 3) Remove or replace punctuation (apostrophes removed; ampersands → 'and' or removed). 4) Decode accented characters to ASCII (café → cafe). 5) Optionally remove stop words ('the', 'a'). 6) Trim to a reasonable length. The result is a clean, lowercase, hyphen-separated string that's URL-safe and readable.",
        "Different from slug-generator: text-to-slug emphasises the algorithmic conversion (any text in, slug out). Slug-generator might offer more configuration. Both produce the same fundamental output - a URL-friendly string. Used in CMS systems, blogging platforms, e-commerce category URLs, and personal blog post URLs."
      ),
      {
        heading: "Conversion Examples",
        table: {
          headers: ["Input Text", "Output Slug"],
          rows: [
            ["Hello World!", "hello-world"],
            ["My First Blog Post (2024)", "my-first-blog-post-2024"],
            ["Café & Croissants", "cafe-croissants"],
            ["What's New?", "whats-new"],
            ["Spaces, Commas, and Periods.", "spaces-commas-and-periods"],
            ["MULTIPLE   SPACES", "multiple-spaces"],
            ["100% Organic Coffee", "100-organic-coffee"],
            ["Émile Zola's Germinal", "emile-zolas-germinal"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are accents kept in slugs?",
        "Usually decoded to ASCII for compatibility. café → cafe, naïve → naive, résumé → resume. Some systems support Unicode slugs (café stays café in the URL) but ASCII is universally compatible. Older systems and many programming frameworks default to ASCII slugs."
      ),
      createFAQ(
        "What about uppercase characters?",
        "Almost always converted to lowercase. URLs are technically case-sensitive, but search engines and users expect lowercase. Mixed-case slugs work but break user expectations and SEO best practice. Stick to lowercase always."
      ),
    ],
    relatedTools: [
      { slug: "slug-generator", label: "Slug Generator" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "whitespace-cleaner", label: "Whitespace Cleaner" },
    ],
  },

  "line-counter": {
    sections: [
      createAnswerFirstSection(
        "When You Need Line Counts",
        "Code reviews and version control: file size in lines often used to estimate complexity. Programming style guides: limit functions to 50-100 lines for readability. Configuration files: keep under 500 lines for maintainability. Log files: line count helps gauge volume - a 10,000-line log indicates significant activity. Translation jobs are often quoted per line (along with per-word).",
        "Line counters typically count: total lines (every newline character), non-empty lines (excluding blank lines), and sometimes 'logical' lines (excluding comments). Some count physical lines; others wrap-aware. Most code editors show the line count in the status bar. Use line counts as one indicator alongside word count and character count for content sizing."
      ),
      {
        heading: "Line Count Reference",
        table: {
          headers: ["Content Type", "Typical Lines"],
          rows: [
            ["Tweet", "1-3"],
            ["Email", "5-30"],
            ["Blog post", "100-300"],
            ["Short story", "200-1000"],
            ["Programming function", "10-50"],
            ["Class file", "100-500"],
            ["Configuration file", "50-300"],
            ["Log file (1 day)", "1000-100000+"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Are blank lines counted?",
        "Depends on the tool. Most counters offer both options: 'all lines' (including blank) and 'non-empty lines'. For word count purposes, non-empty lines are more meaningful. For storage/file size, all lines matter."
      ),
      createFAQ(
        "What if my text wraps in the editor?",
        "Wrapping is display-only; the underlying line count is based on actual newline characters. A long paragraph that wraps to 5 visible lines is still 1 line technically. Line counters use the underlying newlines, not display wrapping."
      ),
    ],
    relatedTools: [
      { slug: "character-counter", label: "Character Counter" },
      { slug: "word-counter", label: "Word Counter" },
      { slug: "remove-duplicate-lines", label: "Remove Duplicate Lines" },
    ],
  },

  "whitespace-cleaner": {
    sections: [
      createAnswerFirstSection(
        "Cleaning Whitespace from Text",
        "Common whitespace cleanup operations: remove leading/trailing spaces, replace multiple consecutive spaces with single space, strip blank lines, remove tabs, normalise line endings (CRLF vs LF). Pasting text from PDFs or copies between programs often introduces messy whitespace - cleanup makes the text searchable, comparable, and consistent.",
        "Programming and data work especially benefit. CSV files with extra spaces around values cause comparison failures. JSON with random whitespace can be unparseable. Code with mixed tabs and spaces breaks Python indentation. Regular text writing benefits too - copying text from web pages often picks up odd Unicode whitespace characters that look like normal spaces but don't behave like them."
      ),
      {
        heading: "Common Whitespace Issues",
        table: {
          headers: ["Issue", "Cleanup Action"],
          rows: [
            ["Multiple spaces", "Replace with single space"],
            ["Tabs vs spaces", "Convert to consistent type"],
            ["Trailing spaces", "Remove from line endings"],
            ["Blank lines", "Remove or limit to 1"],
            ["Mixed line endings (CRLF/LF)", "Normalise to one style"],
            ["Non-breaking space (U+00A0)", "Replace with regular space"],
            ["Zero-width characters", "Remove (invisible)"],
            ["Em/en spaces", "Replace with regular space"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What's a non-breaking space?",
        "Unicode character U+00A0 - looks identical to a regular space but doesn't allow word breaks. Common in PDFs, Word documents, web content. Causes problems when comparing strings or word counting. Visible only with whitespace-aware editors."
      ),
      createFAQ(
        "Should I remove all blank lines?",
        "Depends on context. For storage/database: yes, often. For human-readable text: no, blank lines separate paragraphs. Programming: variable conventions exist. Modern tools usually allow 'remove all' or 'collapse consecutive' as separate options."
      ),
    ],
    relatedTools: [
      { slug: "character-counter", label: "Character Counter" },
      { slug: "remove-duplicate-lines", label: "Remove Duplicate Lines" },
      { slug: "text-to-slug", label: "Text to Slug" },
    ],
  },

  "string-repeater": {
    sections: [
      createAnswerFirstSection(
        "What's a String Repeater?",
        "A string repeater takes input text and repeats it a specified number of times, with optional separator (newline, comma, space, etc.). Useful for creating test data, padding, repeated patterns, or simply duplicating phrases without manual copy-paste. Type 'hello' × 5 with newline separator: hello / hello / hello / hello / hello on five separate lines.",
        "Programmers use repeaters to generate test inputs, fill placeholder content, or create structured data quickly. Writers use them for formatted output (5 bullet points with the same intro). Designers use them for creating filler text patterns. The repeated string can be a single character (like '.' for dotted lines) or a full sentence."
      ),
      {
        heading: "Common Uses",
        table: {
          headers: ["Use case", "Example"],
          rows: [
            ["Test data", "'apple, ' × 100 = 100 commas"],
            ["Visual padding", "'-' × 40 = horizontal line"],
            ["Mock content", "'Lorem ipsum...' × 5 paragraphs"],
            ["Form filling", "'test' × 50 = stress test inputs"],
            ["Indentation", "' ' × 4 = 4-space tab"],
            ["Asterisk borders", "'*' × 80 = 80-char border"],
            ["Repeated CSV header", "'name,age,city' × 3 lines"],
            ["Numerical patterns", "'12345' × 100 = test number"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I add separators?",
        "Yes - typical options: newline (\\n), comma, space, semicolon, custom string. Newline separator gives multiple lines. Comma separator gives a CSV-like single line. Custom separators allow specific formats."
      ),
      createFAQ(
        "What's the maximum repetition?",
        "Browser-based tools usually handle thousands of repetitions without issue. Tens of thousands may slow down rendering or copying to clipboard. For massive volume (millions), use programming languages directly (Python's `'x' * 1000000` is instant)."
      ),
    ],
    relatedTools: [
      { slug: "remove-duplicate-lines", label: "Remove Duplicate Lines" },
      { slug: "character-counter", label: "Character Counter" },
      { slug: "random-text-generator", label: "Random Text Generator" },
    ],
  },

  "remove-duplicate-lines": {
    sections: [
      createAnswerFirstSection(
        "How Duplicate Removal Works",
        "Compares each line of text against others and keeps only unique lines. Output preserves the order of first occurrence by default. Most tools also offer: case-insensitive matching (treat 'APPLE' and 'apple' as the same), trim whitespace before comparison, sort the unique results alphabetically, count occurrences before deduplicating.",
        "Common scenarios: cleaning up email lists (each address only once), processing log files (unique error messages), data preparation (unique IDs from a CSV column), text editing (collapsing repeated lines from concatenation). Programming languages have built-in deduplication: Python set(), JavaScript [...new Set(arr)], SQL DISTINCT. Online tools save the trouble for ad-hoc text manipulation."
      ),
      {
        heading: "Common Deduplication Options",
        table: {
          headers: ["Option", "Effect"],
          rows: [
            ["Case-sensitive", "'Apple' ≠ 'apple'"],
            ["Case-insensitive", "'Apple' = 'apple'"],
            ["Trim whitespace", "' apple ' = 'apple'"],
            ["Preserve order", "First occurrence wins"],
            ["Sort A-Z", "Alphabetical order"],
            ["Sort frequency", "Most common first"],
            ["Count duplicates", "Show how many duplicates removed"],
            ["Ignore blank lines", "Skip empty lines entirely"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I sort before or after dedup?",
        "Order matters for some workflows. If you want alphabetical unique list: sort then dedup. If you want unique items in original order: dedup only (preserves first occurrence). Most tools offer both - 'sort and dedup' or 'dedup, preserve order'."
      ),
      createFAQ(
        "How does this differ from 'remove duplicates' in Excel?",
        "Excel removes duplicate rows considering all selected columns. Text duplicate removal works on each line as a unit. Same concept, different scope. Use Excel for spreadsheet work; text tools for plain-text work."
      ),
    ],
    relatedTools: [
      { slug: "string-repeater", label: "String Repeater" },
      { slug: "line-counter", label: "Line Counter" },
      { slug: "whitespace-cleaner", label: "Whitespace Cleaner" },
    ],
  },

  "random-text-generator": {
    sections: [
      createAnswerFirstSection(
        "Random Text Generation",
        "Most random text generators use either Lorem Ipsum (placeholder Latin used since the 1500s) or Markov-chain-generated nonsense based on real text patterns. Lorem Ipsum is the standard for design mockups - readable-looking text without specific meaning. Random English text is useful for testing input handling, filling forms, or creating visual noise.",
        "Common configurations: number of words/paragraphs/characters, language preset (Lorem, English, technical jargon, fairy-tale style). Some generators include 'realistic-looking' text with natural punctuation and capitalisation. Used in: web design mockups (50%), form testing (20%), creative writing prompts (15%), filler content (15%)."
      ),
      {
        heading: "Common Random Text Variants",
        table: {
          headers: ["Type", "Use case"],
          rows: [
            ["Lorem Ipsum", "Design mockups, layout testing"],
            ["English random", "Form input testing"],
            ["Technical jargon", "Tech mockups, fake reports"],
            ["Hipster Ipsum", "Trendy/lifestyle mockups"],
            ["Cat Ipsum", "Pet sites, fun copy"],
            ["Bacon Ipsum", "Food blogs, casual mockups"],
            ["Customisable length", "5 words to 50 paragraphs"],
            ["Realistic punctuation", "Mock human-readable text"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is Lorem Ipsum so common?",
        "Tradition - it's been used by typesetters since the 1500s. The Latin words have natural English-looking letter frequencies. Designers can show layout without distracting clients with readable English text. The phrase 'Lorem ipsum dolor sit amet...' is the canonical opening."
      ),
      createFAQ(
        "Can I get truly random characters?",
        "Yes - pure character randomness (jumbled letters, no words). Useful for password testing, encryption work. Less common in design contexts (looks too 'noisy'). Most random text tools offer both 'word-based' (real-looking) and 'pure random characters' options."
      ),
    ],
    relatedTools: [
      { slug: "lorem-ipsum-generator", label: "Lorem Ipsum Generator" },
      { slug: "string-repeater", label: "String Repeater" },
      { slug: "password-generator", label: "Password Generator" },
    ],
  },

  "text-to-csv-converter": {
    sections: [
      createAnswerFirstSection(
        "Converting Plain Text to CSV",
        "CSV (Comma-Separated Values) is the universal format for tabular data. Conversion takes structured plain text (one record per line, fields separated by tabs/commas/spaces/etc.) and outputs proper CSV with quote-escaping for special characters. So 'Alice 30 Engineer\\nBob 25 Designer' becomes 'Alice,30,Engineer\\nBob,25,Designer'.",
        "Common scenarios: pasted spreadsheet data needs CSV format, log files with consistent structure to spreadsheet, scraped table data to CSV. Most converters handle: tab-separated input (TSV), space-separated, custom delimiters, quoted fields, escape characters. Output works in Excel, Google Sheets, databases, and any CSV-aware tool."
      ),
      {
        heading: "Common Conversions",
        table: {
          headers: ["Input format", "Output (CSV)"],
          rows: [
            ["Tab-separated", "Replace tabs with commas"],
            ["Space-separated", "Detect field boundaries"],
            ["Pipe-separated", "Replace pipes with commas"],
            ["Fixed-width", "Detect column positions"],
            ["JSON arrays", "Flatten to CSV rows"],
            ["XML data", "Extract values to columns"],
            ["Plain text lists", "One field per line"],
            ["Markdown tables", "Strip formatting to CSV"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What if my text has commas in it?",
        "Quote-escape: surround the field with double quotes. So 'Hello, world' becomes \"Hello, world\". This is the CSV standard - commas inside quoted fields don't break parsing. Quotes themselves get escaped as \\\" within quoted fields."
      ),
      createFAQ(
        "Will Excel open my CSV correctly?",
        "Usually yes if the structure is clean. Excel's auto-detection handles most CSV variations. If issues: open Excel first, then File → Import → Text/CSV with explicit delimiter setting. UTF-8 BOM helps Excel recognise non-ASCII characters correctly."
      ),
    ],
    relatedTools: [
      { slug: "remove-duplicate-lines", label: "Remove Duplicate Lines" },
      { slug: "case-converter", label: "Case Converter" },
      { slug: "whitespace-cleaner", label: "Whitespace Cleaner" },
    ],
  },

  "email-extractor": {
    sections: [
      createAnswerFirstSection(
        "Extracting Emails from Text",
        "Pattern matching finds strings matching email format: word characters + @ + domain + dot + TLD. Standard regex: \\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b. Most extractors handle: plain text input, output as comma-separated list, deduplication of repeated emails, simple validation of format.",
        "Useful for: cleaning up scraped data (web pages with mixed text and emails), processing email exports, contact list extraction from documents. Caveat: extracted emails are addresses found in the text - whether they're valid working addresses requires sending email or using verification services. Format-valid doesn't mean active."
      ),
      {
        heading: "Common Email Patterns Extracted",
        table: {
          headers: ["Pattern", "Match"],
          rows: [
            ["alice@example.com", "Standard"],
            ["john.smith@company.co.uk", "Multi-dot domain"],
            ["user+tag@gmail.com", "Plus addressing"],
            ["test_123@subdomain.example.org", "Underscore"],
            ["info@münchen.de", "International domain"],
            ["weird.format@email.xn--p1ai", "Punycode TLD"],
            ["MIXED.case@Example.COM", "Case preserved"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Will it find emails in PDFs?",
        "If you copy the PDF text and paste it - yes. The extractor works on plain text input. Direct PDF reading would require OCR or PDF parsing libraries (most online text extractors don't handle PDFs natively)."
      ),
      createFAQ(
        "Can I verify the emails work?",
        "The extractor finds format-valid addresses. Verification (whether they actually receive mail) requires services like Mailgun, NeverBounce, ZeroBounce. They check domain MX records and sometimes attempt SMTP handshakes without sending mail."
      ),
    ],
    relatedTools: [
      { slug: "text-to-csv-converter", label: "Text to CSV Converter" },
      { slug: "remove-duplicate-lines", label: "Remove Duplicate Lines" },
      { slug: "url-encoder", label: "URL Encoder" },
    ],
  },
};
