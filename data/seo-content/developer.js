// SEO content for developer tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const developerSEO = {
  "image-to-base64": {
    sections: [
      createAnswerFirstSection(
        "What Is Base64 Image Encoding?",
        "Base64 encoding converts binary image data into a plain text string made up of letters, numbers, and a few symbols. This lets you embed images directly into HTML, CSS, or JSON without needing a separate image file. The output is a data URI you can paste straight into your code.",
        "The encoding process reads each byte of the image and maps it to one of 64 printable ASCII characters. Because three bytes of binary data become four characters of text, the resulting string is roughly 33% larger than the original file. For small images like icons, logos, and UI elements, this trade-off is worth it."
      ),
      createAnswerFirstSection(
        "When Should You Use Base64 Images?",
        "Base64 data URIs work best for small images under 10KB, such as icons, favicons, or simple logos. They are especially useful in HTML emails (where linked images are often blocked by email clients), single-file HTML documents, inline CSS backgrounds, and anywhere you want to reduce the number of HTTP requests.",
        "For larger images, base64 encoding is usually a bad idea. The 33% size overhead means a 100KB image becomes about 133KB of text, and browsers cannot cache inline data URIs the way they cache separate image files. If your image is larger than 20-30KB, hosting it as a separate file is almost always better for performance."
      ),
      {
        heading: "Base64 Output Format Options",
        table: {
          headers: ["Format", "Data URI Prefix", "Best For"],
          rows: [
            ["PNG", "data:image/png;base64,...", "Icons, logos, graphics with transparency"],
            ["JPEG", "data:image/jpeg;base64,...", "Photos, thumbnails, previews"],
            ["SVG", "data:image/svg+xml;base64,...", "Vector graphics, scalable icons"],
            ["GIF", "data:image/gif;base64,...", "Simple animations, tiny graphics"],
            ["WebP", "data:image/webp;base64,...", "Modern browsers, smaller file sizes"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How much larger is a base64 encoded image?",
        "Base64 encoding increases the data size by approximately 33%. A 10KB image becomes roughly 13.3KB of text. This is because every 3 bytes of binary data are represented as 4 ASCII characters. For small images this overhead is negligible, but for larger files it adds up quickly."
      ),
      createFAQ(
        "Can I use base64 images in CSS?",
        "Yes. You can use a base64 data URI as the value of a background-image property, like background-image: url('data:image/png;base64,...'). This is commonly used for small repeating patterns, icons, or decorative elements to avoid extra HTTP requests."
      ),
      createFAQ(
        "Is this tool free and private?",
        "Yes, completely free with no limits. Your image is converted entirely in your browser using JavaScript. The file never leaves your device and is not uploaded to any server."
      ),
    ],
    relatedTools: [
      { slug: "base64-to-image", label: "Base64 to Image Decoder" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
    ],
  },

  "base64-to-image": {
    sections: [
      createAnswerFirstSection(
        "How to Decode a Base64 Image",
        "Paste a base64-encoded string into the input field and the tool instantly decodes it back into a viewable image. It automatically detects the image format from the data URI prefix (PNG, JPEG, GIF, WebP, or SVG) and displays a preview you can download.",
        "If your string includes the full data URI prefix like data:image/png;base64,... the format is detected automatically. If you paste just the raw base64 characters without a prefix, the tool will attempt to identify the format from the decoded binary data. Most common image formats are recognised without any manual configuration."
      ),
      createAnswerFirstSection(
        "When Would You Need to Decode Base64 Images?",
        "You will encounter base64-encoded images when inspecting HTML emails, debugging API responses that return image data inline, extracting embedded assets from single-file HTML exports, or working with data URIs found in stylesheets and JSON payloads.",
        "Developers often need to decode base64 images during debugging to verify that an API is returning the correct image. Designers may extract embedded logos or icons from HTML email templates. Security researchers inspect base64 payloads to check for unexpected content. In all these cases, being able to quickly decode and preview the image saves time."
      ),
    ],
    faqs: [
      createFAQ(
        "What image formats can be decoded from base64?",
        "Any image format that was originally encoded to base64 can be decoded back. The most common formats are PNG, JPEG, GIF, WebP, and SVG. The tool reads the data URI prefix to determine the format. If no prefix is present, it analyses the binary header to identify the image type."
      ),
      createFAQ(
        "Why does my base64 string not decode correctly?",
        "The most common issues are incomplete strings (if the base64 text was truncated during copying), extra whitespace or line breaks inserted by email clients or code formatters, and missing or incorrect data URI prefixes. Try removing any whitespace and ensuring the full string is pasted."
      ),
      createFAQ(
        "Does the image get uploaded anywhere?",
        "No. The decoding happens entirely in your browser. The base64 string is converted to binary data locally using JavaScript, and the resulting image is displayed without any server communication."
      ),
    ],
    relatedTools: [
      { slug: "image-to-base64", label: "Image to Base64 Encoder" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
  },

  "json-prettifier": {
    sections: [
      createAnswerFirstSection(
        "Why Format JSON?",
        "Paste compressed or messy JSON into the editor and the tool instantly reformats it with proper indentation, line breaks, and syntax highlighting. Formatted JSON is dramatically easier to read, debug, and understand, especially when dealing with deeply nested objects or large API responses.",
        "Most APIs return minified JSON with no whitespace to save bandwidth. While this is efficient for machines, it is nearly impossible for humans to scan. Prettifying the output lets you see the structure at a glance, spot missing fields, verify data types, and trace nested relationships without losing your place."
      ),
      {
        heading: "Indentation Style Conventions",
        table: {
          headers: ["Indent", "Characters", "Common Usage"],
          rows: [
            ["2 spaces", "Most compact readable format", "JavaScript/Node.js projects, npm package.json"],
            ["4 spaces", "More visual separation", "Python projects, Java, enterprise codebases"],
            ["Tab", "One tab character per level", "Go, some editor defaults, personal preference"],
          ],
        },
      },
      createAnswerFirstSection(
        "Common JSON Formatting Mistakes",
        "The most frequent issues people run into with JSON are trailing commas after the last item in an array or object, using single quotes instead of double quotes around strings, including comments (JSON does not support comments), and leaving keys unquoted.",
        "If your JSON fails to parse, check for these problems first. JavaScript objects allow all of these patterns, but strict JSON does not. A valid JavaScript object like {name: 'test',} with single quotes, an unquoted key, and a trailing comma will fail as JSON. Every key must be in double quotes, every string must use double quotes, and no trailing commas are allowed."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between 2-space and 4-space indentation?",
        "There is no functional difference. Both produce valid JSON. The choice is purely about readability and convention. Two-space indent keeps deeply nested structures more compact on screen. Four-space indent gives more visual breathing room between levels. Most JavaScript projects use 2 spaces, while Python and Java communities tend to prefer 4."
      ),
      createFAQ(
        "Does prettifying JSON change the data?",
        "No. Formatting only adds or removes whitespace (spaces, tabs, newlines). The actual data, structure, keys, values, and types remain identical. A minified JSON string and a prettified JSON string parse to the exact same object."
      ),
      createFAQ(
        "Can I prettify invalid JSON?",
        "No. The tool needs to parse the JSON before it can reformat it. If the input contains syntax errors like trailing commas, single quotes, or unquoted keys, it will show an error message pointing to the problem. Fix the syntax issue first, then prettify."
      ),
    ],
    relatedTools: [
      { slug: "json-minifier", label: "JSON Minifier" },
      { slug: "json-validator", label: "JSON Validator" },
      { slug: "markdown-to-html", label: "Markdown to HTML" },
    ],
  },

  "json-minifier": {
    sections: [
      createAnswerFirstSection(
        "Why Minify JSON?",
        "Paste formatted JSON into the editor and the tool strips all unnecessary whitespace, indentation, and line breaks to produce the smallest possible output. Minified JSON is ideal for API payloads, configuration storage, URL parameters, and anywhere file size or bandwidth matters.",
        "The space savings depend on how deeply nested and well-formatted the original JSON is. A typical API response with 2-space indentation shrinks by 15-25% after minification. Deeply nested objects with 4-space indentation can shrink by 30% or more. For large datasets transferred over the network, this reduction translates directly to faster load times."
      ),
      createAnswerFirstSection(
        "When to Minify vs Prettify",
        "Minify JSON when you are sending data over the network, storing it in a database, embedding it in a URL, or including it in production code. The goal is to reduce size and keep things compact for machine consumption.",
        "Prettify JSON when you are reading it, debugging it, editing it, or including it in documentation. The goal is human readability. Most development workflows involve prettifying for editing and minifying for deployment. Your source files might be formatted, but your build process should minify JSON payloads before they reach production."
      ),
      {
        heading: "Typical Space Savings from Minification",
        table: {
          headers: ["Original Format", "Example Size", "Minified Size", "Savings"],
          rows: [
            ["2-space indent", "10 KB", "~7.5 KB", "~25%"],
            ["4-space indent", "10 KB", "~6.5 KB", "~35%"],
            ["Tab indent", "10 KB", "~7.0 KB", "~30%"],
            ["Prettified with blank lines", "10 KB", "~5.5 KB", "~45%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does minifying JSON change any data?",
        "No. Minification only removes whitespace characters like spaces, tabs, and newlines. All keys, values, arrays, objects, and data types remain exactly the same. The minified output parses to an identical object as the original formatted version."
      ),
      createFAQ(
        "How much smaller does minified JSON get?",
        "Typically 15-35% smaller depending on the original formatting. Files with 4-space indentation or extra blank lines see the biggest reductions. Deeply nested structures save more because there is more indentation whitespace to remove per line."
      ),
    ],
    relatedTools: [
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-validator", label: "JSON Validator" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
    ],
  },

  "json-validator": {
    sections: [
      createAnswerFirstSection(
        "How to Validate JSON",
        "Paste your JSON into the editor and the tool instantly checks whether it is valid according to the JSON specification. If the input is valid, you will see a confirmation. If there are errors, the tool highlights the exact line and character position where the problem occurs, along with a human-readable description of what went wrong.",
        "JSON validation is stricter than you might expect if you are used to writing JavaScript objects. Many patterns that work in JavaScript are invalid in JSON. The validator catches all of these issues and tells you exactly what to fix."
      ),
      {
        heading: "Common JSON Syntax Errors",
        table: {
          headers: ["Error", "Invalid Example", "Valid Fix"],
          rows: [
            ["Trailing comma", '{"a": 1, "b": 2,}', '{"a": 1, "b": 2}'],
            ["Single quotes", "{'name': 'test'}", '{"name": "test"}'],
            ["Unquoted keys", '{name: "test"}', '{"name": "test"}'],
            ["Comments", '{"a": 1} // note', '{"a": 1}'],
            ["Undefined/NaN", '{"val": undefined}', '{"val": null}'],
            ["Single value", "just a string", '"just a string"'],
          ],
        },
      },
      createAnswerFirstSection(
        "JSON vs JavaScript Objects",
        "A JavaScript object and a JSON string look similar but follow different rules. JSON requires all keys to be wrapped in double quotes, all strings to use double quotes (not single quotes or backticks), and does not allow trailing commas, comments, undefined, NaN, Infinity, or functions.",
        "This means you cannot simply copy a JavaScript object literal from your code and use it as JSON. You need to run it through JSON.stringify() first, or manually fix the quoting and remove any unsupported values. The validator helps you spot these differences quickly."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does my JSON have a trailing comma error?",
        "JSON does not allow a comma after the last element in an object or array. This is one of the most common mistakes because JavaScript does allow trailing commas. Remove the comma after the final item. For example, change [1, 2, 3,] to [1, 2, 3]."
      ),
      createFAQ(
        "Can JSON contain comments?",
        "No. The JSON specification does not support comments of any kind, neither // single-line nor /* multi-line */ block comments. If you need to annotate configuration files, consider using JSONC (JSON with Comments) which some tools support, or move your comments into a separate documentation file."
      ),
      createFAQ(
        "What is the difference between valid JSON and a valid JavaScript object?",
        "JSON is a strict subset of JavaScript object notation. JavaScript objects allow unquoted keys, single-quoted strings, trailing commas, comments, and special values like undefined or NaN. JSON requires double-quoted keys, double-quoted strings, no trailing commas, no comments, and only null (not undefined) for empty values."
      ),
    ],
    relatedTools: [
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-minifier", label: "JSON Minifier" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
    ],
  },

  "html-encoder-decoder": {
    sections: [
      createAnswerFirstSection(
        "Why Encode HTML Entities?",
        "HTML encoding converts special characters like <, >, &, and \" into their entity equivalents (&lt; &gt; &amp; &quot;). This prevents browsers from interpreting those characters as HTML markup, which is essential for displaying code snippets on web pages, preventing cross-site scripting (XSS) attacks, and safely embedding user-generated content.",
        "Without encoding, a string like <script>alert('hello')</script> would be executed as JavaScript by the browser instead of displayed as text. Encoding it to &lt;script&gt;alert('hello')&lt;/script&gt; ensures it renders as visible text. This is one of the most fundamental security practices in web development."
      ),
      {
        heading: "Common HTML Entities",
        table: {
          headers: ["Character", "Entity Name", "Entity Number", "Used For"],
          rows: [
            ["&", "&amp;", "&#38;", "Ampersand in text and URLs"],
            ["<", "&lt;", "&#60;", "Less-than sign, opening HTML tags"],
            [">", "&gt;", "&#62;", "Greater-than sign, closing HTML tags"],
            ["\"", "&quot;", "&#34;", "Double quotes inside attributes"],
            ["'", "&apos;", "&#39;", "Single quotes (apostrophes)"],
            [" ", "&nbsp;", "&#160;", "Non-breaking space"],
          ],
        },
      },
      createAnswerFirstSection(
        "When to Encode vs Decode HTML",
        "Encode when you are inserting dynamic content into an HTML page, displaying user input, showing code examples, or building HTML strings in JavaScript. Any text that might contain angle brackets, ampersands, or quotes should be encoded before being placed into HTML.",
        "Decode when you are reading HTML source and want to see the actual characters, extracting text content from HTML for use in a non-HTML context, or processing scraped web content. Decoding converts entities like &amp; back to & and &lt; back to <."
      ),
    ],
    faqs: [
      createFAQ(
        "What is XSS and how does HTML encoding prevent it?",
        "XSS (Cross-Site Scripting) is a security vulnerability where an attacker injects malicious scripts into web pages viewed by other users. HTML encoding prevents this by converting characters like < and > into harmless entity references. The browser displays the encoded text instead of executing it as code."
      ),
      createFAQ(
        "Should I encode all characters or just special ones?",
        "For most purposes, you only need to encode the five special HTML characters: & < > \" and '. Regular letters, numbers, and common punctuation do not need encoding. Some tools offer full encoding that converts every character to its numeric entity, but this is only necessary in rare edge cases."
      ),
      createFAQ(
        "Does this tool handle Unicode characters?",
        "Yes. Characters outside the basic ASCII range can be encoded to their numeric HTML entities (for example, &#169; for the copyright symbol). The decoder handles both named entities like &copy; and numeric entities like &#169; or &#xA9;."
      ),
    ],
    relatedTools: [
      { slug: "markdown-to-html", label: "Markdown to HTML" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-validator", label: "JSON Validator" },
    ],
  },

  "markdown-to-html": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Markdown to HTML",
        "Paste or type Markdown into the editor and the tool instantly converts it to clean, semantic HTML. You can copy the raw HTML output or preview the rendered result. This is useful for preparing content for CMS platforms, email templates, documentation sites, or any context that requires HTML markup.",
        "The converter handles all standard Markdown syntax including headings, bold, italic, links, images, code blocks, blockquotes, ordered and unordered lists, horizontal rules, and tables. The output uses semantic HTML tags like <h1>, <strong>, <em>, <a>, <code>, and <table> for proper accessibility and SEO."
      ),
      {
        heading: "Markdown Syntax Quick Reference",
        table: {
          headers: ["Markdown", "HTML Output", "Result"],
          rows: [
            ["# Heading 1", "<h1>Heading 1</h1>", "Main heading"],
            ["**bold text**", "<strong>bold text</strong>", "Bold text"],
            ["*italic text*", "<em>italic text</em>", "Italic text"],
            ["[Link](url)", '<a href="url">Link</a>', "Clickable link"],
            ["![Alt](src)", '<img src="src" alt="Alt">', "Image embed"],
            ["`inline code`", "<code>inline code</code>", "Code snippet"],
            ["- item", "<ul><li>item</li></ul>", "Bullet list"],
            ["1. item", "<ol><li>item</li></ol>", "Numbered list"],
            ["> quote", "<blockquote>quote</blockquote>", "Block quote"],
          ],
        },
      },
      createAnswerFirstSection(
        "When to Convert Markdown to HTML",
        "The most common scenario is preparing content for a CMS or website that accepts HTML but where you prefer to write in Markdown. Many developers and technical writers compose in Markdown for its simplicity, then convert to HTML for publishing.",
        "Other common use cases include creating HTML email content from Markdown drafts, generating documentation pages, migrating content between platforms (for example from a Markdown-based wiki to an HTML-based CMS), and embedding formatted content in web applications that do not have a Markdown renderer built in."
      ),
    ],
    faqs: [
      createFAQ(
        "What Markdown syntax is supported?",
        "The converter supports all standard CommonMark syntax: headings (levels 1-6), bold, italic, strikethrough, links, images, inline code, fenced code blocks with language hints, blockquotes, ordered and unordered lists, horizontal rules, and tables. Extended syntax like footnotes or task lists depends on the specific parser used."
      ),
      createFAQ(
        "Is the HTML output clean and semantic?",
        "Yes. The converter produces standard semantic HTML without unnecessary wrapper divs, inline styles, or class attributes. Headings use h1 through h6, emphasis uses strong and em, and code blocks use pre and code tags. The output is ready to use in any web project."
      ),
      createFAQ(
        "Can I use HTML inside Markdown?",
        "Yes. Markdown allows inline HTML, so you can mix Markdown syntax with raw HTML tags. For example, you can use a <div> with a class attribute inside your Markdown document and it will pass through to the HTML output unchanged. This is useful for adding custom styling or structure that Markdown does not natively support."
      ),
    ],
    relatedTools: [
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-validator", label: "JSON Validator" },
    ],
  },

  "json-to-csv": {
    sections: [
      createAnswerFirstSection(
        "When to Convert JSON to CSV",
        "Convert JSON to CSV when you need to open data in a spreadsheet, import records into a database, generate reports, or share structured data with people who work in Excel or Google Sheets. CSV is the universal tabular format that virtually every data tool understands.",
        "JSON is great for APIs and web applications, but most business users and analysts prefer working with rows and columns. Converting to CSV bridges the gap between developer-friendly JSON and the spreadsheet workflows that drive reporting, accounting, and data analysis across every industry."
      ),
      createAnswerFirstSection(
        "How Nested JSON Objects Are Handled",
        "Flat JSON arrays of objects convert cleanly into rows and columns. Each object becomes a row, and each key becomes a column header. Nested objects are flattened using dot notation, so an address object with a city field becomes a column called address.city.",
        "Arrays nested inside objects are joined into a single cell value separated by semicolons. Deeply nested structures with three or more levels are serialised as JSON strings within the cell. For best results, flatten complex nested data before converting, or restructure your JSON so each record is a simple key-value object."
      ),
      {
        heading: "Delimiter Options Explained",
        table: {
          headers: ["Delimiter", "Character", "Best For"],
          rows: [
            ["Comma", ",", "Standard CSV, Excel, Google Sheets, most tools"],
            ["Tab", "\\t", "TSV files, pasting into spreadsheets, avoiding comma conflicts"],
            ["Semicolon", ";", "European locales where commas are decimal separators"],
            ["Pipe", "|", "Data with commas and semicolons in values"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What JSON structures convert best to CSV?",
        "An array of flat objects with consistent keys converts perfectly. For example, [{\"name\": \"Alice\", \"age\": 30}, {\"name\": \"Bob\", \"age\": 25}] produces a clean two-column CSV. Objects with varying keys still work, but missing values become empty cells. Deeply nested or irregular JSON may need restructuring first."
      ),
      createFAQ(
        "How are special characters handled in the output?",
        "Values containing the delimiter character, double quotes, or newlines are automatically wrapped in double quotes following the RFC 4180 CSV standard. Double quotes inside values are escaped by doubling them. This ensures the CSV can be parsed correctly by any compliant reader."
      ),
      createFAQ(
        "Is my data processed on my device?",
        "Yes. The conversion runs entirely in your browser using JavaScript. No data is uploaded to any server. Your JSON stays on your device."
      ),
    ],
    relatedTools: [
      { slug: "csv-to-json", label: "CSV to JSON Converter" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-validator", label: "JSON Validator" },
    ],
  },

  "csv-to-json": {
    sections: [
      createAnswerFirstSection(
        "When to Convert CSV to JSON",
        "Convert CSV to JSON when you need to send tabular data to an API, load it into a web application, create configuration files, or work with data in JavaScript or Python. JSON is the standard data format for web services, and most modern applications expect it.",
        "Common scenarios include preparing data exports from Excel or Google Sheets for use in web apps, transforming database dumps into API-ready payloads, building configuration files from spreadsheet data, and converting legacy CSV data feeds into JSON for modern systems."
      ),
      createAnswerFirstSection(
        "How CSV Headers Become JSON Keys",
        "The first row of your CSV is treated as headers. Each header becomes a key in the resulting JSON objects, and each subsequent row becomes one object. A CSV with headers name, email, age produces objects like {\"name\": \"Alice\", \"email\": \"alice@example.com\", \"age\": \"30\"}.",
        "The tool auto-detects common delimiters including commas, tabs, semicolons, and pipes. If your CSV uses an unusual delimiter, you can specify it manually. Header names are used exactly as they appear, so clean up spaces or special characters in your headers before converting if your target system requires specific key formats."
      ),
      {
        heading: "Common CSV Pitfalls and Solutions",
        table: {
          headers: ["Problem", "Cause", "Solution"],
          rows: [
            ["Broken rows", "Commas inside values without quoting", "Wrap values containing commas in double quotes"],
            ["Garbled characters", "Wrong file encoding (e.g. Latin-1 vs UTF-8)", "Save your CSV as UTF-8 before converting"],
            ["Extra empty rows", "Trailing newlines in the file", "The tool trims these automatically"],
            ["Numbers as strings", "CSV has no type information", "Use the type inference option to auto-detect numbers and booleans"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does the tool auto-detect the delimiter?",
        "Yes. The tool analyses the first few rows of your CSV to determine whether it uses commas, tabs, semicolons, or pipes as the delimiter. If auto-detection picks the wrong one, you can override it manually using the delimiter selector."
      ),
      createFAQ(
        "Are numbers converted to JSON number types or kept as strings?",
        "By default, all values are kept as strings to avoid accidental data loss (for example, leading zeros in phone numbers or postcodes). If you enable type inference, the tool converts values that look like numbers to JSON numbers and recognises true/false as booleans."
      ),
      createFAQ(
        "Can I convert CSV with no header row?",
        "Yes. Disable the 'first row is header' option and the tool will generate keys like column_1, column_2, column_3 automatically. You can rename them in the JSON output if needed."
      ),
    ],
    relatedTools: [
      { slug: "json-to-csv", label: "JSON to CSV Converter" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-validator", label: "JSON Validator" },
    ],
  },

  "qr-code-reader": {
    sections: [
      createAnswerFirstSection(
        "How Browser-Based QR Code Scanning Works",
        "This tool uses your device's camera or an uploaded image to detect and decode QR codes directly in the browser. No app install is required. On supported browsers, the BarcodeDetector API handles detection natively for fast, accurate results. On other browsers, a JavaScript fallback library provides the same functionality.",
        "When you grant camera access, the tool captures video frames and analyses them in real time for QR code patterns. Detection happens locally on your device, so the camera feed is never sent to a server. You can also upload a screenshot or photo containing a QR code if you prefer not to use the camera."
      ),
      {
        heading: "Browser Support for QR Code Detection",
        table: {
          headers: ["Browser", "BarcodeDetector API", "Fallback Library"],
          rows: [
            ["Chrome (Android)", "Supported natively", "Not needed"],
            ["Chrome (Desktop)", "Supported on Chromebook, flag on others", "Used automatically"],
            ["Safari (iOS/macOS)", "Not supported", "JavaScript fallback used"],
            ["Firefox", "Not supported", "JavaScript fallback used"],
            ["Edge", "Same as Chrome", "Same as Chrome"],
            ["Samsung Internet", "Supported natively", "Not needed"],
          ],
        },
      },
      createAnswerFirstSection(
        "What QR Codes Can Contain",
        "QR codes store plain text, but that text is often formatted as a URL, email address, phone number, WiFi network credentials, calendar event, or vCard contact card. The tool detects the content type and displays it appropriately, with clickable links for URLs and structured views for WiFi and contact data.",
        "URL QR codes are the most common and simply open a website. WiFi QR codes contain the network name, password, and encryption type, letting you connect without typing the password. vCard QR codes contain contact details like name, phone, and email. Plain text QR codes can hold any short message up to about 4,000 characters."
      ),
    ],
    faqs: [
      createFAQ(
        "Is it safe to scan unknown QR codes?",
        "The tool shows you the decoded content before taking any action. If a QR code contains a URL, you can see the full address before deciding whether to visit it. Never visit URLs from QR codes that look suspicious or unfamiliar. Phishing attacks using QR codes (sometimes called 'quishing') are increasingly common."
      ),
      createFAQ(
        "Why does the tool need camera permission?",
        "Camera access is needed to capture live video for real-time QR code detection. The camera feed is processed entirely on your device and is never recorded or transmitted. If you prefer not to grant camera access, you can upload an image containing a QR code instead."
      ),
      createFAQ(
        "Can this read barcodes as well as QR codes?",
        "The primary focus is QR codes, which are the square-shaped 2D codes. Some devices with native BarcodeDetector support can also read 1D barcodes like EAN-13 and UPC. For reliable barcode scanning, a dedicated barcode reader tool is recommended."
      ),
    ],
    relatedTools: [
      { slug: "qr-code-generator", label: "QR Code Generator" },
      { slug: "base64-to-image", label: "Base64 to Image Decoder" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
    ],
  },

  "image-to-data-uri": {
    sections: [
      createAnswerFirstSection(
        "What Is a Data URI?",
        "A data URI is a way to embed a file directly inside a URL string using the data: scheme. Instead of linking to an external image file, you include the entire image as a base64-encoded string right in your HTML, CSS, or JavaScript. The browser decodes it on the fly and renders the image without making a separate network request.",
        "The format follows a simple pattern: data:[media type];base64,[encoded data]. For a PNG image, that looks like data:image/png;base64,iVBORw0KGgo... and so on. Data URIs are supported in all modern browsers and work anywhere a regular URL would, including img src attributes, CSS background-image properties, and even link tags for favicons."
      ),
      createAnswerFirstSection(
        "When to Use Data URIs vs External Images",
        "Data URIs shine in specific situations: single-file HTML documents that need to be self-contained, email signatures where linked images are often blocked, CSS backgrounds for tiny decorative elements, and offline-capable pages where no network requests are possible. They eliminate HTTP requests, which can speed up pages with many small images.",
        "The trade-off is size. Base64 encoding adds roughly 33% overhead, so a 10KB image becomes about 13.3KB as a data URI. Browsers also cannot cache data URIs separately from the document they are embedded in. For images larger than 10-20KB, external files with proper caching headers will almost always perform better. Data URIs also make your HTML or CSS harder to read and maintain."
      ),
      {
        heading: "Data URI vs External Image Comparison",
        table: {
          headers: ["Factor", "Data URI", "External Image"],
          rows: [
            ["HTTP requests", "None (embedded inline)", "One per image"],
            ["File size", "~33% larger due to base64", "Original size"],
            ["Browser caching", "Cached with the parent document only", "Cached independently"],
            ["Best for", "Icons under 10KB, single-file HTML, emails", "Photos, large graphics, reused assets"],
            ["Maintenance", "Harder to update (encoded string)", "Easy to swap files"],
            ["Email support", "Works in most email clients", "Often blocked by default"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How much larger is a data URI than the original image?",
        "Approximately 33% larger. Base64 encoding converts every 3 bytes of binary data into 4 ASCII characters. A 10KB image becomes roughly 13.3KB as a data URI. For very small images like 16x16 favicons, this overhead is negligible. For larger images, it adds up quickly."
      ),
      createFAQ(
        "Can I use data URIs in CSS?",
        "Yes. You can use a data URI as the value of a background-image property, like background-image: url('data:image/png;base64,...'). This is commonly used for small repeating patterns, UI icons, or decorative elements where eliminating an HTTP request improves performance."
      ),
      createFAQ(
        "What is the difference between a data URI and base64 encoding?",
        "Base64 is the encoding method that converts binary data into text characters. A data URI is the full URL format that wraps the base64 string with a scheme (data:), media type (image/png), and encoding declaration (;base64,). Base64 is the payload; the data URI is the complete address a browser can use."
      ),
    ],
    relatedTools: [
      { slug: "image-to-base64", label: "Image to Base64 Encoder" },
      { slug: "base64-to-image", label: "Base64 to Image Decoder" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
    ],
  },

  "json-escape": {
    sections: [
      createAnswerFirstSection(
        "What Is JSON Escaping?",
        "JSON escaping converts special characters in a string into escape sequences that are safe to include inside a JSON value. Characters like double quotes, backslashes, newlines, and tabs have special meaning in JSON, so they must be preceded by a backslash to be treated as literal text rather than syntax.",
        "For example, if you want to store the text He said \"hello\" inside a JSON string, the quotes around hello must be escaped as \\\" to avoid breaking the JSON structure. Without escaping, the parser would see the quote after said as the end of the string and fail with a syntax error."
      ),
      {
        heading: "Common JSON Escape Sequences",
        table: {
          headers: ["Character", "Escape Sequence", "Description"],
          rows: [
            ['"', '\\"', "Double quote - must be escaped inside JSON strings"],
            ["\\", "\\\\", "Backslash - escape character itself needs escaping"],
            ["Newline", "\\n", "Line feed - moves to the next line"],
            ["Tab", "\\t", "Horizontal tab - indentation character"],
            ["Carriage return", "\\r", "Return to start of line (Windows line endings)"],
            ["Backspace", "\\b", "Backspace character"],
            ["Form feed", "\\f", "Page break character (rarely used)"],
            ["Unicode", "\\uXXXX", "Any Unicode character by its 4-digit hex code"],
          ],
        },
      },
      createAnswerFirstSection(
        "When Do You Need to Escape JSON Strings?",
        "You need JSON escaping whenever you are embedding a raw string inside a JSON payload. This comes up frequently when building API request bodies, storing user-generated content in JSON fields, embedding HTML or code snippets inside JSON, and constructing JSON strings manually in code.",
        "Most programming languages handle escaping automatically when you use their JSON serialisation functions (JSON.stringify in JavaScript, json.dumps in Python). Manual escaping is needed when you are constructing JSON by hand, debugging malformed payloads, or pasting content into a JSON file that was not generated by code."
      ),
    ],
    faqs: [
      createFAQ(
        "Why do double quotes need escaping in JSON?",
        "JSON uses double quotes to delimit string values. If your string contains a literal double quote character, the parser would interpret it as the end of the string. The backslash before the quote (\\\" ) tells the parser to treat it as a regular character, not a string boundary."
      ),
      createFAQ(
        "What happens to newlines inside JSON strings?",
        "Literal newline characters are not allowed inside JSON strings. They must be replaced with the escape sequence \\n. If you paste multi-line text into a JSON string without escaping, the JSON will be invalid. This tool converts those newlines automatically."
      ),
      createFAQ(
        "Does this tool also unescape JSON strings?",
        "Yes. You can switch between escape and unescape modes. Unescaping converts sequences like \\n back to actual newline characters and \\\" back to plain double quotes, giving you the original readable text."
      ),
    ],
    relatedTools: [
      { slug: "json-validator", label: "JSON Validator" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
    ],
  },

  "json-to-text": {
    sections: [
      createAnswerFirstSection(
        "When to Extract Text from JSON",
        "Sometimes you just need the plain text content from a JSON file without all the braces, brackets, quotes, and keys. This is useful when migrating data and you need a quick readable summary, searching through API responses for specific values, extracting content from CMS exports, or converting structured data into a format you can paste into a document or email.",
        "Rather than manually picking through nested JSON, this tool pulls out the text content and presents it as a clean, readable list. It handles nested objects, arrays, and mixed data types, giving you just the human-readable parts."
      ),
      createAnswerFirstSection(
        "Three Extraction Modes Explained",
        "The Values Only mode extracts just the values from your JSON, ignoring all keys. This is the most common mode, giving you a clean list of data without field names. It works well when you already know what the data represents and just need the content.",
        "Keys and Values mode includes both the key name and its value on each line, formatted as key: value. This gives you context about what each value means. The Paths and Values mode shows the full path to each value using dot notation (like user.address.city: London), which is invaluable for understanding deeply nested structures or documenting an API response format."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between the three extraction modes?",
        "Values Only gives you just the data (Alice, 30, London). Keys and Values adds labels (name: Alice, age: 30, city: London). Paths and Values shows the full nesting path (user.name: Alice, user.age: 30, user.address.city: London). Choose based on how much context you need."
      ),
      createFAQ(
        "How does it handle nested JSON objects and arrays?",
        "Nested objects are traversed recursively, extracting values at every level. Array items are listed individually. In Paths mode, array indices appear in the path like items[0].name, items[1].name. Empty objects and arrays are skipped."
      ),
      createFAQ(
        "Can I extract text from a JSON API response?",
        "Yes. Paste the full JSON response into the input and the tool extracts all text values. This is a quick way to scan API output without reading through the raw JSON structure. Use Paths and Values mode if you need to understand which field each value came from."
      ),
    ],
    relatedTools: [
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-to-csv", label: "JSON to CSV Converter" },
      { slug: "html-to-text", label: "HTML to Text Converter" },
    ],
  },

  "csv-column-extractor": {
    sections: [
      createAnswerFirstSection(
        "When to Extract Columns from CSV",
        "Column extraction lets you pull out only the fields you need from a CSV file. This is useful when cleaning up data exports that contain dozens of columns but you only need three or four, removing sensitive columns like email addresses or phone numbers before sharing a file, preparing a focused import file for a system that expects specific columns, or reducing file size by dropping unnecessary data.",
        "Instead of opening the file in a spreadsheet and manually deleting columns, paste your CSV here and select the columns you want to keep. The tool outputs a clean CSV with only your chosen columns, preserving the original order and quoting."
      ),
      createAnswerFirstSection(
        "How Header Detection Works",
        "The tool reads the first row of your CSV and treats it as column headers. These headers appear as checkboxes you can toggle to include or exclude each column. If your CSV does not have a header row, the tool generates labels like Column 1, Column 2, and so on.",
        "Column order in the output matches the order you select them. If your original file has columns A, B, C, D and you select C then A, the output will have C first and A second. This makes it easy to reorder columns at the same time as extracting them."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I reorder columns while extracting them?",
        "Yes. The output follows the order in which you select the columns. If you want column C before column A, select C first and A second. This gives you both extraction and reordering in a single step."
      ),
      createFAQ(
        "What if my CSV does not have headers?",
        "The tool will auto-generate column labels like Column 1, Column 2, and so on. You can then select which numbered columns to extract. Enable or disable the header row option depending on your file."
      ),
      createFAQ(
        "Does this tool handle quoted fields with commas inside them?",
        "Yes. Fields wrapped in double quotes are treated as single values even if they contain commas, newlines, or other special characters. The tool follows the RFC 4180 CSV standard for parsing and output."
      ),
    ],
    relatedTools: [
      { slug: "csv-to-json", label: "CSV to JSON Converter" },
      { slug: "csv-delimiter-changer", label: "CSV Delimiter Changer" },
      { slug: "csv-validator", label: "CSV Validator" },
    ],
  },

  "csv-delimiter-changer": {
    sections: [
      createAnswerFirstSection(
        "Why Change CSV Delimiters?",
        "Not all CSV files use commas. European systems often use semicolons because commas serve as decimal separators in many European number formats. Tab-separated files (TSV) are preferred for pasting into spreadsheets. Pipe-delimited files are common in legacy data systems. This tool converts between any of these formats instantly.",
        "A common scenario is receiving a CSV exported from a European application that uses semicolons, but needing to import it into a tool that expects standard comma-separated values. Or you might need to convert a comma-delimited file to tab-separated so you can paste it cleanly into Excel or Google Sheets."
      ),
      {
        heading: "Common Delimiters and Their Use Cases",
        table: {
          headers: ["Delimiter", "Character", "Common Use Cases"],
          rows: [
            ["Comma", ",", "International standard, most tools and databases, web APIs"],
            ["Tab", "\\t", "Pasting into spreadsheets, TSV files, avoiding comma conflicts"],
            ["Semicolon", ";", "European CSV exports, systems where comma is the decimal separator"],
            ["Pipe", "|", "Legacy systems, data with commas and semicolons in values"],
            ["Colon", ":", "Some Unix config files, password/group files"],
          ],
        },
      },
      createAnswerFirstSection(
        "How the Conversion Works",
        "The tool parses your input CSV using the detected or specified source delimiter, correctly handling quoted fields that may contain the delimiter character inside them. It then re-serialises the data using your chosen target delimiter, adding quotes around any values that contain the new delimiter.",
        "This means you do not lose data when converting. A value like 'New York, NY' that was quoted in a comma-separated file will be output without quotes in a tab-separated file (since it does not contain a tab character), keeping the output as clean as possible."
      ),
    ],
    faqs: [
      createFAQ(
        "Why do European CSV files use semicolons?",
        "In many European countries (Germany, France, Italy, Spain, and others), the comma is used as a decimal separator in numbers. For example, one and a half is written as 1,5 rather than 1.5. Using a comma as both a decimal separator and a field delimiter would be ambiguous, so European systems default to semicolons for CSV exports."
      ),
      createFAQ(
        "Will changing the delimiter break quoted fields?",
        "No. The tool fully parses the CSV before converting, so quoted fields are handled correctly. If a value contains the new delimiter character, it will be wrapped in double quotes in the output to prevent parsing issues."
      ),
      createFAQ(
        "Can I convert a tab-separated file to comma-separated?",
        "Yes. Select Tab as the source delimiter and Comma as the target delimiter. The tool also auto-detects the source delimiter in most cases, so you may only need to specify the target format."
      ),
    ],
    relatedTools: [
      { slug: "csv-to-json", label: "CSV to JSON Converter" },
      { slug: "csv-column-extractor", label: "CSV Column Extractor" },
      { slug: "csv-validator", label: "CSV Validator" },
    ],
  },

  "csv-validator": {
    sections: [
      createAnswerFirstSection(
        "Why Validate CSV Files?",
        "CSV looks simple, but subtle problems can break imports, corrupt data, or cause silent errors in downstream systems. A missing quote, an extra comma, or inconsistent column counts can mean lost records or misaligned data. Validating your CSV before importing it catches these issues early, saving hours of debugging later.",
        "This tool checks your CSV against the RFC 4180 standard and common best practices. It reports every issue found with the exact row and column location, so you can fix problems quickly rather than hunting through thousands of rows in a spreadsheet."
      ),
      {
        heading: "Common CSV Problems and How to Fix Them",
        table: {
          headers: ["Problem", "Symptom", "Fix"],
          rows: [
            ["Inconsistent column count", "Some rows have more or fewer fields than the header", "Check for unquoted commas in values, or missing fields"],
            ["Unclosed quotes", "Data from multiple rows merges into one field", "Ensure every opening double quote has a matching closing quote"],
            ["Empty rows", "Blank lines between data rows", "Remove blank lines, or check for extra newlines at the end of the file"],
            ["Mixed line endings", "Rows split incorrectly on some systems", "Normalise to either LF (Unix) or CRLF (Windows) line endings"],
            ["BOM character", "Invisible character at the start of the file", "Remove the UTF-8 BOM or save the file without BOM"],
            ["Unescaped quotes", "Quotes inside values break field boundaries", "Double up quotes inside values (\"\" instead of \") or wrap the field in quotes"],
          ],
        },
      },
      createAnswerFirstSection(
        "How to Read the Validation Report",
        "The report lists each issue with a severity level (error or warning), the row number, and a description of the problem. Errors are structural issues that will likely break a CSV parser, such as unclosed quotes or inconsistent column counts. Warnings are potential issues that may or may not cause problems, such as trailing whitespace or empty rows.",
        "Start by fixing errors first, as these are the most likely to cause import failures. Warnings can often be left as-is depending on your target system, but cleaning them up produces a more reliable file."
      ),
    ],
    faqs: [
      createFAQ(
        "What does 'inconsistent column count' mean?",
        "It means one or more rows have a different number of fields than the header row. If the header has 5 columns but row 47 has 6 fields, there is probably an unquoted comma inside one of the values on that row. Wrap any values containing commas in double quotes to fix this."
      ),
      createFAQ(
        "How do unclosed quotes cause problems?",
        "When a CSV parser encounters an opening double quote, it reads everything until the next closing quote as a single field, including commas and newlines. If the closing quote is missing, the parser keeps reading across multiple rows, merging them into one giant field. This silently corrupts your data."
      ),
      createFAQ(
        "Does the validator fix problems automatically?",
        "The validator identifies and reports problems but does not modify your data. This is intentional, because automated fixes could change your data in unexpected ways. The report tells you exactly what to fix and where, so you can make corrections with confidence."
      ),
    ],
    relatedTools: [
      { slug: "csv-to-json", label: "CSV to JSON Converter" },
      { slug: "csv-delimiter-changer", label: "CSV Delimiter Changer" },
      { slug: "csv-column-extractor", label: "CSV Column Extractor" },
    ],
  },

  "csv-transpose": {
    sections: [
      createAnswerFirstSection(
        "What Does Transposing a CSV Mean?",
        "Transposing flips your data so that rows become columns and columns become rows. If your CSV has 5 columns and 100 rows, the transposed result will have 100 columns and 5 rows. The first column of the original becomes the first row of the output, and so on. It is the same operation as the TRANSPOSE function in Excel or Google Sheets.",
        "Visually, think of it as rotating the entire table 90 degrees. The header row becomes a header column, and each data row becomes a data column. This is a fundamental data reshaping operation used in data analysis, reporting, and preparing data for specific import formats."
      ),
      createAnswerFirstSection(
        "When You Need to Transpose CSV Data",
        "Transposing is useful when your data is organised the wrong way around for your target system. For example, survey results where each question is a row but your charting tool expects each question as a column. Or time series data where dates are in columns but your database expects them in rows.",
        "Other common scenarios include preparing data for pivot table analysis, reformatting data exports to match a required import template, converting wide-format data (many columns, few rows) to long-format data (few columns, many rows), and reorganising comparison tables where you want to switch the axes."
      ),
    ],
    faqs: [
      createFAQ(
        "Are there limits on how many rows or columns I can transpose?",
        "The tool runs in your browser, so practical limits depend on your device's memory. Files with a few thousand rows and a hundred columns transpose instantly. Very large files (tens of thousands of rows) may take a moment. Keep in mind that transposing a file with 10,000 rows creates 10,000 columns, which may be unwieldy in a spreadsheet."
      ),
      createFAQ(
        "What happens to the header row when transposing?",
        "The header row becomes the first column in the transposed output. If your original CSV had headers like Name, Age, City across the top row, the transposed output will have Name, Age, City running down the first column, with each original row of data becoming a new column."
      ),
      createFAQ(
        "Can I transpose a CSV with uneven row lengths?",
        "Yes. If some rows have fewer fields than others, the missing cells are treated as empty values. The transposed output will have empty cells where the original data was shorter. This is the same behaviour as pasting into a spreadsheet and transposing."
      ),
    ],
    relatedTools: [
      { slug: "csv-to-json", label: "CSV to JSON Converter" },
      { slug: "csv-column-extractor", label: "CSV Column Extractor" },
      { slug: "json-to-csv", label: "JSON to CSV Converter" },
    ],
  },

  "html-to-text": {
    sections: [
      createAnswerFirstSection(
        "When to Strip HTML and Extract Plain Text",
        "Converting HTML to plain text is useful whenever you need the readable content without the markup. Common scenarios include extracting article text from scraped web pages, cleaning up HTML email content for plain text versions, preparing content for systems that only accept plain text, removing formatting before importing into a database, and getting word counts on the actual content without counting HTML tags.",
        "The tool removes all HTML tags, decodes HTML entities (like &amp; back to &), and optionally preserves the visual structure by converting block-level elements into line breaks. The result is clean, readable text you can paste anywhere."
      ),
      createAnswerFirstSection(
        "How Line Break Preservation Works",
        "HTML uses two types of elements: block elements (like p, div, h1, li, br) that create visual line breaks, and inline elements (like span, strong, em, a) that flow within the text. When 'preserve line breaks' is enabled, the tool inserts a newline wherever a block element ends, maintaining the paragraph structure of the original HTML.",
        "Without line break preservation, all text is collapsed into a single continuous string with spaces between elements. This is useful when you need a compact single-line version, but for readability, preserved line breaks usually give a better result. Consecutive blank lines from nested block elements are collapsed to a single blank line to keep the output tidy."
      ),
    ],
    faqs: [
      createFAQ(
        "Does the tool remove scripts and style content?",
        "Yes. The content of script and style tags is completely removed, not just the tags themselves. You will only see the visible text content that a user would read on the page. Hidden elements, comments, and metadata are also stripped."
      ),
      createFAQ(
        "How are links handled in the plain text output?",
        "By default, link text is preserved but the URL is removed. So <a href=\"https://example.com\">click here</a> becomes just 'click here'. Some modes include the URL in brackets after the text, like 'click here [https://example.com]', which is useful for preserving references."
      ),
      createFAQ(
        "Can I convert HTML email content to plain text?",
        "Yes, and this is one of the most common use cases. HTML emails often contain complex table layouts, inline styles, and tracking pixels. The tool strips all of that away and gives you just the readable message text, which is perfect for creating a plain text version of an email newsletter."
      ),
    ],
    relatedTools: [
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
      { slug: "markdown-to-html", label: "Markdown to HTML" },
      { slug: "json-to-text", label: "JSON to Text Extractor" },
    ],
  },

  "string-to-binary": {
    sections: [
      createAnswerFirstSection(
        "What Is Binary Encoding?",
        "Binary encoding converts each character in a text string into its binary representation, a sequence of 0s and 1s that computers use internally to store data. For example, the letter A is stored as 01000001 in binary (its ASCII code 65 expressed in base 2). This tool shows you exactly how your text looks at the lowest level of computer storage.",
        "Modern text uses UTF-8 encoding, which represents standard ASCII characters (English letters, digits, basic punctuation) as single bytes (8 bits each) and extended characters (accented letters, emoji, CJK characters) as two, three, or four bytes. The tool handles the full UTF-8 range, so you can see how simple and complex characters differ in their binary representation."
      ),
      createAnswerFirstSection(
        "Use Cases for String to Binary Conversion",
        "Learning binary is one of the most common reasons to use this tool. Students studying computer science, networking, or digital electronics use it to understand how text is stored and transmitted. Seeing your own name in binary makes the concept tangible rather than abstract.",
        "Beyond education, developers use binary views for data inspection and debugging, verifying that text encoding is correct, understanding byte-level differences between characters, and creating encoding exercises or teaching materials. It is also useful for visualising why certain characters take more bytes than others in UTF-8, which matters for storage and bandwidth calculations."
      ),
    ],
    faqs: [
      createFAQ(
        "How many bits does each character use?",
        "Standard ASCII characters (English letters, digits, basic punctuation) use 8 bits (1 byte) each. Characters with accents or diacritics typically use 16 bits (2 bytes). Characters from Asian scripts often use 24 bits (3 bytes). Emoji use 32 bits (4 bytes). This is because UTF-8 is a variable-length encoding."
      ),
      createFAQ(
        "What is the difference between ASCII and UTF-8?",
        "ASCII covers 128 characters (English letters, digits, and basic symbols) using 7 bits each. UTF-8 is a superset that is backward-compatible with ASCII for those 128 characters, but extends to cover every character in Unicode (over 140,000 characters) using 1 to 4 bytes per character. All ASCII text is valid UTF-8, but not all UTF-8 text is valid ASCII."
      ),
      createFAQ(
        "Can I convert binary back to text?",
        "Yes. Paste a binary string (groups of 0s and 1s separated by spaces) and the tool decodes it back to readable text. Each 8-bit group is converted to its corresponding character. Multi-byte UTF-8 characters are reassembled automatically."
      ),
    ],
    relatedTools: [
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
      { slug: "json-escape", label: "JSON String Escape/Unescape" },
      { slug: "base64-to-image", label: "Base64 to Image Decoder" },
    ],
  },

  "box-shadow-generator": {
    sections: [
      createAnswerFirstSection(
        "The Five Numbers Behind Every Box Shadow",
        "A CSS box-shadow declaration has a strict order: inset (optional), offset-x, offset-y, blur-radius, spread-radius, then colour. The tool exposes each of these as its own slider so you can move them independently and watch the preview update on every change. The default starts at offset-x: 0, offset-y: 4px, blur: 6px, spread: 0, with black at 10% alpha, which matches the soft Material-style elevation most apps reach for first.",
        "Offset-x and offset-y push the shadow horizontally and vertically; positive Y values drop the shadow below the box, mimicking light from above. Blur softens the edge, while spread expands or contracts the shadow before the blur kicks in. A negative spread on a positive offset is the trick behind subtle inset card shadows that look pressed-in rather than floating."
      ),
      createAnswerFirstSection(
        "Stacking Layers for Realistic Depth",
        "A single shadow rarely looks convincing. Real objects cast a tight, dark shadow close to the surface and a wider, softer shadow further out. The Layered preset combines two shadows separated by a comma, the first at 0 2px 4px / 5% alpha and the second at 0 8px 16px / 10% alpha, which is roughly the recipe behind Stripe's and Linear's card shadows.",
        "Click 'Add Layer' to build your own stack. Each layer renders in source order, with the first listed shadow drawn on top. For glow effects, pick the Glow preset and switch the colour from black to your accent. Inset shadows are useful for input fields, pressed-button states, and faux engraving on labels. Combining one inset and one outer shadow on the same element is a common pattern for skeuomorphic toggles."
      ),
      {
        heading: "Common Shadow Recipes",
        table: {
          headers: ["Effect", "Shadow Values", "Best For"],
          rows: [
            ["Subtle card", "0 1px 3px rgba(0,0,0,0.05)", "List items, table rows"],
            ["Default elevation", "0 4px 6px rgba(0,0,0,0.1)", "Buttons, dropdown menus"],
            ["Heavy lift", "0 10px 25px rgba(0,0,0,0.2)", "Modal dialogs, popovers"],
            ["Sharp / brutalist", "2px 2px 0 rgba(0,0,0,0.3)", "Neobrutalist UI, retro buttons"],
            ["Coloured glow", "0 0 20px rgba(59,130,246,0.6)", "Focus states, hero CTAs"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between blur and spread?",
        "Blur softens the shadow's edge over the radius you specify, fading from solid colour to transparent. Spread changes the shadow's size before blur is applied; a positive spread makes the shadow visibly larger than the box, a negative spread shrinks it. Set blur to 0 and spread to 4px to get a hard, evenly enlarged outline. Set spread to 0 and blur to 20px for a soft halo."
      ),
      createFAQ(
        "How do inset shadows work?",
        "Add the keyword 'inset' before the offset values and the shadow renders inside the element instead of outside, exactly as if light were hitting from the opposite direction. Inset shadows are typical on form inputs and pressed states. You can mix inset and outer shadows on the same element by separating them with a comma."
      ),
      createFAQ(
        "Why does my shadow get clipped at the parent's edge?",
        "An ancestor element with overflow: hidden, overflow: clip, or border-radius without enough padding will clip shadows that extend past its bounds. The fix is usually to add padding to the parent equal to or greater than your shadow's blur plus spread, or to remove the overflow constraint where possible."
      ),
      createFAQ(
        "Can I animate box-shadow?",
        "Yes, but it triggers a paint on every frame and can stutter on lower-end devices. For smoother lift-on-hover effects, animate transform: translateY combined with a static shadow that already includes the lifted state, or use a pseudo-element with opacity to fade the shadow in. This keeps animations on the GPU-accelerated compositor layer."
      ),
    ],
    relatedTools: [
      { slug: "gradient-generator", label: "CSS Gradient Generator" },
      { slug: "pixel-to-rem-converter", label: "Pixel to REM Converter" },
      { slug: "contrast-checker", label: "Contrast Checker" },
    ],
  },

  "cron-builder": {
    sections: [
      createAnswerFirstSection(
        "What the Five Cron Fields Mean",
        "A standard cron expression has five fields, separated by spaces, in this order: minute (0-59), hour (0-23), day of month (1-31), month (1-12), and day of week (0-6, where 0 and 7 both mean Sunday). The tool defaults to '0 9 * * 1-5', which fires at 09:00 every weekday, the most common schedule for a morning report job.",
        "Each field accepts four notations: a single value (5), a list (1,15,30), a range (1-5), or a step (*/15 for 'every 15'). Combine them as needed; '0 8-18/2 * * 1-5' means 'on the hour, from 08:00 to 18:00, every two hours, weekdays only'. The tool parses your input, shows the plain-English translation, and computes the next five firing times so you can sanity-check the schedule before deploying."
      ),
      createAnswerFirstSection(
        "Where Cron Actually Runs and Why Timezones Bite",
        "The same cron expression can fire at different wall-clock times depending on where it runs. Linux crontab uses the system timezone, which on most production servers is UTC. Vercel Cron runs in UTC. AWS EventBridge schedule expressions accept an explicit timezone but cron expressions still default to UTC. GitHub Actions cron runs in UTC and warns you not to rely on it firing on time during high-load periods.",
        "The lesson: pick UTC for anything serverless, and write the expression for UTC even if your team thinks in local time. A 'daily 9am report' in London is '0 9 * * *' in winter and '0 8 * * *' in summer if you want it to land at 09:00 BST. If you need DST-aware scheduling, run the job hourly and gate it inside the code with a timezone-aware check, or use a scheduler that supports IANA timezone names natively such as Quartz or Temporal."
      ),
      {
        heading: "Common Cron Recipes",
        table: {
          headers: ["Schedule", "Expression", "Use Case"],
          rows: [
            ["Every minute", "* * * * *", "Health checks, queue pollers"],
            ["Every 15 minutes", "*/15 * * * *", "Cache warmers, status updates"],
            ["Hourly on the hour", "0 * * * *", "Log rotations, summary aggregations"],
            ["Daily at 02:30", "30 2 * * *", "Database backups, low-traffic windows"],
            ["Weekdays at 09:00", "0 9 * * 1-5", "Morning reports, standup reminders"],
            ["First of the month", "0 0 1 * *", "Monthly invoices, billing cycles"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What does 0 in the day-of-week field mean?",
        "In standard cron, 0 means Sunday and 6 means Saturday. Many implementations also accept 7 as Sunday for compatibility with older Unix systems. To run something on weekends, use '0,6' or '6-7'. To run only on weekdays, use '1-5'. The tool's preset list covers the most common patterns so you don't have to remember the numbering."
      ),
      createFAQ(
        "Can I use named days and months?",
        "Most modern cron implementations accept three-letter abbreviations: MON-SUN for days of the week, JAN-DEC for months. So '0 9 * * MON-FRI' is identical to '0 9 * * 1-5'. The strict POSIX cron only accepts numbers, so for maximum portability across BSD, Solaris, and minimal Docker images, stick to digits. Vercel Cron, GitHub Actions, and crontab on Linux all accept names."
      ),
      createFAQ(
        "What happens if the day-of-month and day-of-week fields conflict?",
        "Standard cron uses an OR rule when both fields are restricted: the job runs if either condition matches. So '0 0 15 * 1' fires on the 15th of every month AND on every Monday, not on Mondays that are also the 15th. To get an AND rule, you have to gate inside your script or use Quartz, which uses '?' to mark one of the two as 'no specific value'."
      ),
      createFAQ(
        "Why didn't my cron job run?",
        "The four most common causes: the expression resolves to a time that has already passed today (cron does not catch up missed runs unless you use anacron); the job's user has no PATH set in their crontab (specify full paths to binaries); the timezone differs from what you assumed (run 'date' on the server to confirm); or stdout/stderr is silently redirected and an error is swallowed. Add 'MAILTO=you@example.com' or pipe to a log file to surface failures."
      ),
    ],
    relatedTools: [
      { slug: "regex-tester", label: "Regex Tester" },
      { slug: "json-formatter", label: "JSON Formatter & Validator" },
      { slug: "uuid-generator", label: "UUID Generator" },
    ],
  },

  "css-minifier": {
    sections: [
      createAnswerFirstSection(
        "What Minification Actually Removes",
        "CSS minification strips whitespace, comments, and the redundant trailing semicolons before each closing brace. A 4KB hand-formatted stylesheet typically shrinks to between 2.5KB and 3KB after this pass, a saving of 25-40%. Add gzip on top and the over-the-wire size drops further; brotli, where it's available (everywhere except Internet Explorer), usually beats gzip by another 10-20% on text payloads.",
        "The tool runs everything client-side as you type. Paste your stylesheet and the minified output appears alongside an exact byte count for both versions and the percentage saved. There is no upload to a server, no rate limit, and no file-size cap beyond what your browser's memory can handle. Hit Copy to grab the result, or Download for a .css file."
      ),
      createAnswerFirstSection(
        "When Build Tools Beat a Manual Minifier",
        "If you're shipping a Next.js, Vite, or Webpack project, your bundler already minifies CSS using cssnano or LightningCSS as part of the production build. That pipeline does more than whitespace stripping: it merges duplicate rules, shortens hex colours from #ffffff to #fff, collapses font shorthand, and removes vendor prefixes that target dead browsers. A standalone tool like this one is useful for quick wins on hand-written CSS, single-file demos, email templates, or one-off WordPress themes where there's no build step.",
        "One thing to watch: aggressive minification can break calc() expressions if it strips spaces around the inner operators, since 'calc(100% -16px)' is invalid but 'calc(100% - 16px)' is correct. This tool is conservative and preserves spaces inside parentheses, but if you ever migrate to a heavier minifier, run a visual regression check on layouts that use calc(), clamp(), or min/max."
      ),
      {
        heading: "What Minifies and What Doesn't",
        table: {
          headers: ["Element", "Minified?", "Notes"],
          rows: [
            ["Whitespace and newlines", "Yes", "Collapsed to single spaces or removed entirely"],
            ["/* Comments */", "Yes", "All block comments stripped"],
            ["Trailing semicolons", "Yes", "; before } removed"],
            ["calc() spacing", "No", "Preserved to keep expressions valid"],
            ["Class and ID names", "No", "Renaming requires a CSS modules pipeline"],
            ["Duplicate rules", "No", "Merging needs a full AST-based optimiser"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How much can I expect to save?",
        "Typical hand-written CSS shrinks 25-40% with whitespace minification alone. After gzip, the wire savings are smaller because gzip is already very good at compressing repeated whitespace, but minified CSS still wins on initial parse time and the bytes the browser holds in memory. Brotli adds another 10-20% on top of gzip for the same payload."
      ),
      createFAQ(
        "Will minification break my CSS?",
        "The patterns this tool uses are conservative: it only strips whitespace around safe characters ({ } : ; , > + ~), removes comments, and trims trailing semicolons. It will not rename selectors, merge rules, or rewrite values. If you use unusual content like data: URIs in url() or content strings with whitespace inside double quotes, paste a small sample first and verify the output matches what you intended."
      ),
      createFAQ(
        "Can I un-minify CSS?",
        "Not back to your original formatting, but you can prettify minified CSS using any code formatter like Prettier or VS Code's built-in formatter. Indentation, line breaks, and spacing are all stylistic choices, so a re-formatted version will look clean but won't match your original style guide unless you reapply your formatter config."
      ),
      createFAQ(
        "Should I minify in development?",
        "No. Source maps and readable line numbers are essential for debugging. Most build tools only minify the production bundle and leave development output unminified. Browser DevTools also pretty-print minified CSS on the fly, but stack traces still point to the wrong lines without source maps. Keep your dev experience verbose; let the build pipeline handle the squeeze."
      ),
      createFAQ(
        "Does the order of declarations change?",
        "No. Whitespace minification preserves the original source order of every selector, every property, and every value. This matters because CSS specificity and source order both contribute to the cascade; reordering rules can change which value wins on an element. AST-based tools like cssnano sometimes reorder properties within a single rule (when safe) to improve gzip compression, but this tool does not."
      ),
    ],
    relatedTools: [
      { slug: "javascript-minifier", label: "JavaScript Minifier" },
      { slug: "json-formatter", label: "JSON Formatter & Validator" },
      { slug: "html-entity-encoder", label: "HTML Entity Encoder" },
    ],
  },

  "gradient-generator": {
    sections: [
      createAnswerFirstSection(
        "Linear, Radial, and Conic in Plain English",
        "Linear gradients fade from one colour to another along a straight line at a given angle. The default is 90deg, which fades left-to-right. Set 0deg for bottom-to-top, 180deg for top-to-bottom, or any angle in between. Radial gradients fade outwards from a centre point in concentric circles or ellipses, useful for spotlight effects and soft vignettes. Conic gradients sweep around a centre like a clock hand and are how people build pure-CSS pie charts and colour wheels.",
        "The tool starts with a two-stop linear gradient from coral (#ff6b6b) to teal (#4ecdc4) at 90deg. Drag stops along the bar to reposition them, double-click any stop to change its colour, or click the empty bar to add a new stop. Three or more stops let you build the smooth multicolour blends that have replaced flat colour as the default for hero sections in 2026."
      ),
      createAnswerFirstSection(
        "Why Stops Matter More Than Colours",
        "Two well-placed stops with mid-saturation colours look more polished than five clashing rainbow stops. The Sunset preset (#ff6b6b to #feca57 at 50% to #ff9ff3) demonstrates the rule: warm tones, similar luminance, and a gentle hue shift across roughly 80 degrees on the colour wheel. Adjacent stops at the same position create a hard line, useful for stripes; stops far apart create a soft fade.",
        "Colour space matters too. The default `linear-gradient` interpolates in sRGB, which can produce muddy mid-tones when the start and end colours sit on opposite sides of the wheel. Modern browsers also support `linear-gradient(in oklch, ...)` which interpolates in a perceptually uniform colour space and avoids the grey muddy zone. The tool outputs sRGB syntax for compatibility, but you can prefix the type with `in oklch` manually if your audience is on Chrome 111+ or Safari 16.4+."
      ),
      {
        heading: "Useful Angles for Linear Gradients",
        table: {
          headers: ["Angle", "Direction", "Common Use"],
          rows: [
            ["0deg", "Bottom to top", "Sky-to-ground hero backgrounds"],
            ["45deg", "Bottom-left to top-right", "Dynamic, energetic feel"],
            ["90deg", "Left to right", "Default, reads naturally"],
            ["135deg", "Top-left to bottom-right", "Subtle depth on cards"],
            ["180deg", "Top to bottom", "Header overlays, fade-to-dark"],
            ["to bottom right", "Diagonal, viewport-aware", "Adapts when box is non-square"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between deg and the 'to' keyword?",
        "Both work, but they're not interchangeable on non-square boxes. '90deg' fixes the gradient line at exactly 90 degrees clockwise from north. 'to right' adapts to the box's aspect ratio so the gradient travels truly corner-to-corner on rectangles. For square hero sections the difference is invisible, but on a 16:9 banner '45deg' and 'to top right' give visibly different results."
      ),
      createFAQ(
        "Do I still need vendor prefixes?",
        "No. The unprefixed `linear-gradient`, `radial-gradient`, and `conic-gradient` syntaxes have been universally supported since Chrome 26, Firefox 16, and Safari 6.1. The only real-world reason to keep -webkit- prefixes is HTML email rendering, where some clients still need them. For the open web, ship the unprefixed version."
      ),
      createFAQ(
        "How do I make a gradient text effect?",
        "Set background-image to your gradient, then add background-clip: text and color: transparent (with -webkit-background-clip: text for Safari). The text becomes a window onto the gradient. This works best with bold weights and large sizes; thin fonts at body size lose definition because the visible glyph area is too small to show the colour fade."
      ),
      createFAQ(
        "Can I animate a gradient?",
        "Not directly: CSS can't transition the gradient itself because each stop is a separate value. The trick is to set the gradient's background-size larger than the element (e.g. 200% 200%) and animate background-position. This shifts the visible portion of a fixed gradient and looks like the gradient is morphing. The newer @property API allows custom property interpolation for true gradient animation in Chrome and Edge."
      ),
    ],
    relatedTools: [
      { slug: "box-shadow-generator", label: "CSS Box Shadow Generator" },
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "contrast-checker", label: "Contrast Checker" },
    ],
  },

  "javascript-minifier": {
    sections: [
      createAnswerFirstSection(
        "What Whitespace Minification Catches and Misses",
        "Paste JavaScript and the tool removes single-line // comments, multi-line /* */ comments, leading and trailing whitespace, newlines, and the spaces around operators and punctuation. A typical hand-written file shrinks 30-50% with this pass alone. The byte counter shows pre and post sizes, so you can see exactly what you saved. Combined with gzip on the server, the wire-transfer reduction is usually 70-80% versus raw source.",
        "What this tool does NOT do is rename variables. A real production minifier like Terser or esbuild renames `customerOrderTotal` to `a`, mangles property names (when configured), removes dead code branches, and inlines small functions. Those passes need a full AST and a deep understanding of the language; they typically halve the file size again on top of whitespace stripping. For a one-off script, a snippet, or a small embedded widget, whitespace minification is fast and predictable. For shipping a 200KB SPA, use a bundler."
      ),
      createAnswerFirstSection(
        "When Minification Goes Wrong",
        "Naive whitespace minification can break JavaScript in subtle ways. Automatic semicolon insertion (ASI) is the worst offender: 'return\\n{a:1}' is treated by the parser as 'return; {a:1};' and silently returns undefined. Stripping the newline doesn't change behaviour, but if your source relied on ASI to terminate a statement, joining lines with a missing semicolon can fuse two statements into one and change meaning entirely.",
        "Template literals are another minefield. Whitespace inside `` `multi\\n  line` `` is significant; the tool preserves content inside backticks. Regex literals like /\\s+/g must not be split or have their flags stripped. The minifier here is conservative and preserves all string and template content, so the result runs identically to the source on every JavaScript engine from V8 to Hermes. Run your test suite against the minified output before shipping; if you don't have tests, paste a sample, run it in the browser console, and verify the result matches."
      ),
      {
        heading: "Minification Approaches Compared",
        table: {
          headers: ["Technique", "Typical Saving", "Tool Examples"],
          rows: [
            ["Whitespace + comments only", "30-50%", "This tool, simple regex passes"],
            ["AST-based variable mangling", "50-70%", "Terser, UglifyJS"],
            ["Bundler with tree-shaking", "60-80%", "esbuild, swc, Rollup"],
            ["Minify + gzip transfer", "75-85%", "Production CDN delivery"],
            ["Minify + brotli transfer", "80-90%", "Modern static hosts"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Will this break my code?",
        "It shouldn't, because the regex passes only touch whitespace, comments, and operator spacing. But there's no AST safety net, so if your source uses unusual constructs, run the output through Node or a browser before shipping. Common gotchas to test: ASI-dependent return statements, regex literals, JSX (which this tool will mangle if you forget to compile it first), and any code that relies on exact whitespace inside template literals."
      ),
      createFAQ(
        "Should I use this instead of Terser?",
        "For one-off scripts, embedded widgets, or paste-and-go situations, yes. For application code that you're going to deploy, no. Terser does compression passes that this tool can't (variable mangling, dead-code elimination, constant folding) and its output is roughly half the size again. Most modern build tools (Vite, Next.js, esbuild, swc) include a Terser-equivalent step automatically."
      ),
      createFAQ(
        "Does this work on TypeScript or JSX?",
        "No. Strip TypeScript types and compile JSX first using tsc, swc, or esbuild, then minify the resulting JavaScript. Running this tool directly on TypeScript will leave the type annotations in place but break the file by removing whitespace that the TypeScript parser depends on for line-based error recovery. Same logic applies to JSX: compile to React.createElement calls first."
      ),
      createFAQ(
        "Why minify if I'm using gzip anyway?",
        "Three reasons. First, gzip happens on the wire, but the unminified version still sits in your build output and your CDN cache, costing storage. Second, parse and compile time on the client matches the size of the un-gzipped file, not the gzipped one, so minified JS starts running faster. Third, on slow CPUs (low-end Android) parse time dominates load time more than transfer, so smaller source genuinely matters."
      ),
    ],
    relatedTools: [
      { slug: "css-minifier", label: "CSS Minifier" },
      { slug: "json-formatter", label: "JSON Formatter & Validator" },
      { slug: "html-entity-encoder", label: "HTML Entity Encoder" },
    ],
  },

  "json-formatter": {
    sections: [
      createAnswerFirstSection(
        "Format, Minify, and Validate in One Pass",
        "Paste raw JSON into the input box and the tool parses it with the browser's native JSON.parse, then immediately renders three things: the prettified version with your chosen indentation (2 spaces by default), the minified single-line version, and a stats panel showing total key count, maximum nesting depth, and minified byte size. If the JSON is malformed, the parser surfaces the exact character position of the failure so you can jump straight to the offending comma or unquoted key.",
        "JSON is defined by RFC 8259, which is stricter than most people remember. Trailing commas are not allowed. Single-quoted strings are not allowed. Comments are not allowed. Unquoted property names are not allowed. If you're hand-editing config and the parser screams, those four rules are nearly always the cause. JSON5 and JSONC (used in tsconfig.json and VS Code settings) relax these rules, but they're separate dialects and standard parsers reject them."
      ),
      createAnswerFirstSection(
        "Indent Width Conventions Across Ecosystems",
        "There's no single right indent width, but conventions per ecosystem are remarkably stable. NPM's package.json and most JavaScript tooling default to 2 spaces. Python's standard library `json.dump(indent=4)` and most Java tools default to 4. Go's `encoding/json` MarshalIndent leaves the choice to the caller but examples almost always use a single tab. The tool defaults to 2 spaces because that's the dominant choice for files that get committed to JavaScript repos, but you can switch to 4 spaces or tabs from the dropdown.",
        "Pick your indent based on the file's neighbours: if everything else in the project is 2 spaces, match it; consistency across files matters more than the absolute value. For deeply nested structures (depth 5+), 2 spaces stops the lines running off the screen. For shallow configs where readability matters more than line length, 4 spaces helps the eye trace nested keys."
      ),
      {
        heading: "Common JSON Errors and Fixes",
        table: {
          headers: ["Error", "Cause", "Fix"],
          rows: [
            ["Unexpected token } in JSON", "Trailing comma before closing brace", "Remove the comma"],
            ["Unexpected token ' in JSON", "Single quotes used for strings", "Change to double quotes"],
            ["Unexpected token in JSON at position 0", "BOM or whitespace before {", "Strip leading bytes"],
            ["Unexpected end of JSON input", "Truncated payload, missing brace", "Check the full response"],
            ["Bad escape character", "Backslash not followed by valid escape", "Double the backslash"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does my JSON fail validation when it looks fine?",
        "The most common silent killers are: trailing commas (allowed in JavaScript, not in JSON), single quotes around strings or keys, unquoted property names, and JavaScript-style // or /* */ comments. JSON also requires keys to be strings, even when they look like numbers; `{1: 'a'}` is invalid, you need `{\"1\": \"a\"}`."
      ),
      createFAQ(
        "What does maximum depth mean in the stats panel?",
        "Depth counts how many nested levels exist between the root and the deepest leaf. A flat object like `{a: 1}` has depth 1. `{a: {b: 1}}` has depth 2. APIs that return paginated, deeply nested resource graphs often hit depth 6+, which is a flag that the response shape is making consumers do too much traversal. Consider flattening or denormalising on the server."
      ),
      createFAQ(
        "Can I format JSON with comments (JSONC)?",
        "Not with this tool's default mode, because JSONC is not valid JSON per RFC 8259 and the browser's JSON.parse rejects it. VS Code uses JSONC for settings.json and tsconfig.json by stripping comments before parsing. If your file contains // or /* */ comments, remove them first or open it in a JSONC-aware editor."
      ),
      createFAQ(
        "Is the data sent anywhere?",
        "No. The whole pipeline runs in your browser using JSON.parse and JSON.stringify. Nothing is uploaded, logged, or cached on a server. You can paste API responses containing tokens or PII without worrying about leakage."
      ),
    ],
    relatedTools: [
      { slug: "json-validator", label: "JSON Validator" },
      { slug: "json-prettifier", label: "JSON Prettifier" },
      { slug: "json-minifier", label: "JSON Minifier" },
    ],
  },

  "jwt-decoder": {
    sections: [
      createAnswerFirstSection(
        "What Each of the Three Parts Contains",
        "A JSON Web Token is three base64url-encoded JSON blobs joined by dots: header.payload.signature. Paste a token at 11pm while debugging an API auth failure and the tool splits it on the dots, base64-decodes each segment, and parses the JSON. The header tells you the signing algorithm (alg, usually HS256, RS256, or ES256) and key id (kid). The payload contains your claims. The signature is the cryptographic seal, displayed truncated because you can't validate it without the secret or public key.",
        "The decoder also reads the standard registered claims and surfaces them at the top: iss (issuer), sub (subject, typically the user id), aud (audience), iat (issued-at, Unix seconds), exp (expiration, Unix seconds), and nbf (not-before). If exp is set, the tool computes whether the token is currently expired and how long until expiry or how long since. This catches the most common JWT bug: the API rejects a token that 'looks fine' because it expired a few minutes ago and you forgot to refresh."
      ),
      createAnswerFirstSection(
        "Decoding Is Not Validating",
        "Anyone can decode a JWT. The base64-encoded segments are not encrypted, just encoded, so the contents are visible to any party that holds the token. This is by design: JWTs are meant to be readable by both client and server. What stops them being forged is the signature, which requires either the shared secret (HS256) or the issuer's private key (RS256, ES256) to produce.",
        "Treat the payload as untrusted until your backend has verified the signature, the exp claim, and the iss/aud claims against expected values. Never put secrets, passwords, or sensitive PII inside a JWT payload; assume any token your client receives can be inspected by an attacker who steals it. If you need to encrypt the payload (not just sign it), use JWE, which is the encrypted variant defined alongside JWT in RFC 7519."
      ),
      {
        heading: "Standard JWT Claims",
        table: {
          headers: ["Claim", "Meaning", "Common Value"],
          rows: [
            ["iss", "Issuer", "https://auth.example.com"],
            ["sub", "Subject (user id)", "user_abc123"],
            ["aud", "Audience", "https://api.example.com"],
            ["iat", "Issued at (Unix seconds)", "1735689600"],
            ["exp", "Expiry (Unix seconds)", "1735693200"],
            ["nbf", "Not before (Unix seconds)", "1735689600"],
            ["jti", "Token id (for revocation)", "uuid-v4"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why is my token rejected even though the decoder shows valid JSON?",
        "Six likely causes: the token has expired (check exp); the clock skew between your server and the issuer is too large (allow 30-60s slack); the signature is wrong (you decoded it with one key but it was signed with another); the audience doesn't match what your verifier expects; the issuer URL has a trailing slash mismatch; or the algorithm in the header doesn't match what your verifier accepts (alg: 'none' should always be rejected)."
      ),
      createFAQ(
        "What is the difference between HS256, RS256, and ES256?",
        "HS256 is HMAC with SHA-256, a symmetric algorithm where the signer and verifier share the same secret. Simple, fast, but useless across organisational boundaries because anyone who can verify a token can forge one. RS256 is RSA with SHA-256, asymmetric: the issuer signs with a private key and consumers verify with a public key, which is what OAuth 2.0 (RFC 6749) and OpenID Connect deployments use. ES256 is ECDSA with the P-256 curve, smaller signatures and faster verification than RSA, increasingly the default."
      ),
      createFAQ(
        "Can I decode an expired token?",
        "Yes. Expiry is enforced by the verifier, not the decoder. The tool will happily decode any structurally valid JWT regardless of exp. It will, however, flag the token as expired and show how long ago it expired so you can confirm that's the cause of the auth failure you're debugging."
      ),
      createFAQ(
        "Where should I store JWTs in a browser?",
        "Memory (a JS variable) is safest from XSS but lost on reload. localStorage and sessionStorage are convenient but readable by any script on the page if XSS is breached. httpOnly Secure cookies survive reload and are immune to JS-level XSS but require CSRF protection and a same-site cookie strategy. The current consensus for SPAs is short-lived access tokens in memory plus a long-lived refresh token in an httpOnly cookie."
      ),
    ],
    relatedTools: [
      { slug: "json-formatter", label: "JSON Formatter & Validator" },
      { slug: "base64-converter", label: "Base64 Converter" },
      { slug: "url-encoder", label: "URL Encoder" },
    ],
  },

  "markdown-preview": {
    sections: [
      createAnswerFirstSection(
        "Type on the Left, See HTML on the Right",
        "Markdown was designed in 2004 by John Gruber as a way to write formatted text in a syntax that's still readable as plain text. The tool ships with a sample document covering headers, bold, italic, lists, and code blocks. Edit either side, see the rendering update on the next keystroke. Useful for rapidly drafting README files, blog posts, GitHub issues, and Notion-style notes without worrying about HTML.",
        "The renderer here covers the core syntax: # through ###### for headings, **bold** and *italic*, [text](url) for links, ![alt](url) for images, > for blockquotes, --- for horizontal rules, ``` for fenced code blocks, and `inline` for inline code. Ordered and unordered lists are detected automatically. This matches the original Markdown spec closely; if you need GitHub-flavoured features like tables, task lists, strikethrough, or auto-linked URLs, write your source for [Markdown to HTML](/markdown-to-html) which uses a more complete parser."
      ),
      createAnswerFirstSection(
        "GFM, CommonMark, and Why Your Output Differs",
        "There is no single Markdown standard. The original Gruber spec was vague enough that every implementation made different choices, which is why the same input can render four different ways across GitHub, Reddit, Discord, and your static site generator. CommonMark (commonmark.org) is the closest thing to a precise spec; GitHub-Flavoured Markdown (GFM) extends CommonMark with tables, strikethrough, task lists, and autolinks. Most modern tools target GFM because that's what readers expect.",
        "Quirks to watch for: a hard line break inside a paragraph is invisible in Markdown unless you end the line with two trailing spaces (which most editors strip on save) or a backslash. Tabs vs spaces inside list items behave differently across parsers. HTML embedded in Markdown is allowed by Gruber's spec but stripped by some sanitisers. If you're writing for a specific platform, render-test on that platform; this tool is a fast feedback loop, not a final preview."
      ),
      {
        heading: "Markdown Syntax Cheat Sheet",
        table: {
          headers: ["Syntax", "Renders As", "Notes"],
          rows: [
            ["# Heading", "h1 element", "One # per heading level, up to ######"],
            ["**bold**", "strong tag", "Two asterisks, no spaces inside"],
            ["*italic*", "em tag", "Single asterisks, or _underscores_"],
            ["[text](url)", "anchor link", "No space between ] and ("],
            ["![alt](url)", "img element", "Same syntax with leading exclamation"],
            ["```code```", "pre code block", "Triple backticks, language hint after the opening fence"],
            ["> quote", "blockquote", "Space after the >"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why doesn't my line break work?",
        "Markdown ignores single newlines by default and joins them into the same paragraph. To force a line break, end the line with two trailing spaces, or use a backslash, or use an empty line to start a new paragraph. This is the most common surprise for people coming from word processors."
      ),
      createFAQ(
        "Does this support GitHub Flavoured Markdown?",
        "Partially. The renderer covers headings, emphasis, links, images, lists, code, blockquotes, and horizontal rules, which are the CommonMark core. Tables, task lists, strikethrough, and autolinking are not in this fast-preview mode. For full GFM rendering use the dedicated [Markdown to HTML](/markdown-to-html) tool, which uses a parser library."
      ),
      createFAQ(
        "Can I paste rich text and get Markdown?",
        "No, this is one-way: Markdown to HTML. For HTML to Markdown, you need a different parser like Turndown. Pasting rich text from Word or Google Docs typically produces HTML on the clipboard; running it through Turndown gives you Markdown back, but the round-trip is lossy for complex formatting like nested tables or styled spans."
      ),
      createFAQ(
        "Is the source saved anywhere?",
        "No. Both the source and the rendered HTML stay in your browser tab and disappear when you close it. If you want persistence, copy the rendered HTML or the Markdown source out before navigating away."
      ),
    ],
    relatedTools: [
      { slug: "markdown-to-html", label: "Markdown to HTML" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
      { slug: "json-formatter", label: "JSON Formatter & Validator" },
    ],
  },

  "meta-tag-previewer": {
    sections: [
      createAnswerFirstSection(
        "What Google, Twitter, and Facebook Actually Show",
        "Type a page title, description, and URL, and the tool renders three side-by-side previews matching what a Google SERP, a Twitter card, and a Facebook OG share will display. Titles longer than 60 characters get truncated by Google's mobile result display; descriptions over 160 characters get cut. The tool flags both as you type, so you can rewrite before the snippet looks bad in the wild. Default values seed the form so you can see a working preview immediately.",
        "Beneath the previews, the tool generates the full HTML meta block: a `<title>`, `<meta name=\"description\">`, the seven Open Graph tags Facebook and LinkedIn read (og:title, og:description, og:url, og:image, og:type), and the three Twitter Card tags (twitter:card, twitter:title, twitter:description). Copy the block straight into your `<head>` to get correct previews on every platform that crawls your page."
      ),
      createAnswerFirstSection(
        "Image Dimensions and the Open Graph Cache",
        "Open Graph images should be 1200x630 pixels (1.91:1 ratio) for crisp rendering on Facebook, LinkedIn, and Twitter's `summary_large_image`. Smaller images get scaled up and look fuzzy; the wrong aspect ratio gets cropped unpredictably. JPG and PNG both work; PNG is better for images with text overlay or sharp graphics, JPG is smaller for photos. Keep the file under 5MB to avoid Facebook's hard reject.",
        "The frustrating reality: Facebook caches OG metadata for around seven days, and Twitter caches for similar periods. Update your tags and the new preview won't appear until the cache expires or you force a refresh. Use Facebook's Sharing Debugger (developers.facebook.com/tools/debug) and Twitter's Card Validator to scrape your URL fresh; they also surface any parsing errors in your tags. LinkedIn has its own Post Inspector. Always test there before announcing a post."
      ),
      {
        heading: "Recommended Character Limits",
        table: {
          headers: ["Field", "Ideal Length", "Hard Limit", "Why"],
          rows: [
            ["Page title (Google)", "50-60 chars", "60 chars on mobile", "Truncated with ellipsis past 60"],
            ["Meta description", "150-160 chars", "160 chars on mobile", "Google rewrites long ones"],
            ["OG title", "60-90 chars", "100 chars", "Facebook truncates around 90"],
            ["OG description", "150-200 chars", "300 chars", "Cut around line 2 in feed"],
            ["Twitter title", "70 chars", "70 chars", "Hard cap, no ellipsis"],
            ["OG image", "1200x630px", "5MB file", "1.91:1 ratio for full-bleed"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does Google show a different title than what I set?",
        "Since 2021 Google has frequently rewritten title tags using on-page H1, anchor text, or its own model when it judges your title to be misleading, stuffed with keywords, or off-topic. There's no way to disable the rewrite. The fix is to write a title that closely matches the page's primary topic, fits within 60 characters, and doesn't repeat your brand name in a way Google considers boilerplate."
      ),
      createFAQ(
        "Do I need separate OG tags if I have meta description?",
        "Yes. Google reads `<meta name=\"description\">` for the SERP snippet. Facebook, LinkedIn, Slack, Discord, and most messaging apps read `<meta property=\"og:description\">`. They're independent. Set both to the same value if you want consistency, or split them if you want a more conversational version for social shares and a search-optimised version for Google."
      ),
      createFAQ(
        "What is the right value for og:type?",
        "For most pages, `website` is correct. For blog posts, `article` enables extra Open Graph fields (article:published_time, article:author, article:section). For products, `product` if you're using the OG product extension. Facebook ignores most type-specific fields nowadays, so don't agonise; `website` is a safe default if you're unsure."
      ),
      createFAQ(
        "Why is my OG image not showing?",
        "Top causes: the image URL is on a domain that returns a 401 or requires login (use a public CDN); the URL uses HTTP not HTTPS (most platforms reject mixed content); the image is below the minimum dimensions (200x200 for Facebook); or the platform's cache is showing an older version. Run the URL through Facebook's Sharing Debugger to surface the exact reason."
      ),
    ],
    relatedTools: [
      { slug: "robots-txt-generator", label: "Robots.txt Generator" },
      { slug: "html-encoder-decoder", label: "HTML Encoder/Decoder" },
      { slug: "qr-code-generator", label: "QR Code Generator" },
    ],
  },

  "pixel-to-rem-converter": {
    sections: [
      createAnswerFirstSection(
        "Why REM Beats Pixels for Font Sizes",
        "Browsers default the root font size to 16px. One rem equals the root font size, so 1rem = 16px out of the box, and 24px = 1.5rem, 12px = 0.75rem. The tool defaults to a 16px base; type a pixel value and see the rem instantly, or flip to rem-to-pixel mode if you're reading a stylesheet that uses rem. The conversion happens on every keystroke with no Calculate button.",
        "REM matters because users can change their browser default from 16px to anything they like, usually for accessibility. If your CSS uses px everywhere, the user's setting is ignored and your text stays the size you hard-coded. If your CSS uses rem, every text size, padding, and spacing value scales with the user's preference. WCAG accessibility guidelines effectively require this; users with low vision who set their browser default to 24px depend on REM-based sites to render readably."
      ),
      createAnswerFirstSection(
        "EM vs REM and the 62.5% Reset Trick",
        "REM is always relative to the root html element. EM is relative to the parent element's font size, which means EM compounds: a 1.5em inside a 1.5em is 2.25 times the root. EM is useful for component-internal spacing where you want a button's padding to scale with its own font size. REM is what you want for global typography and layout because the maths is predictable: 1rem = root size, no matter how deeply nested.",
        "The classic 'set html font-size to 62.5%' trick (which makes 1rem = 10px) lets you write 1.6rem instead of mentally converting 16px to 1rem. It works but it has a quiet cost: if a user has set their browser default above 16px for accessibility, your 62.5% multiplier propagates that change but at a smaller starting point. Modern guidance is to leave html font-size alone, write 1rem for body text, and use the Tailwind-style scale (0.875rem, 1rem, 1.125rem, 1.25rem, 1.5rem, 1.875rem, 2.25rem) for headings."
      ),
      {
        heading: "Common Pixel Values in REM (16px Base)",
        table: {
          headers: ["Pixels", "REM", "Tailwind Equivalent"],
          rows: [
            ["12px", "0.75rem", "text-xs"],
            ["14px", "0.875rem", "text-sm"],
            ["16px", "1rem", "text-base"],
            ["18px", "1.125rem", "text-lg"],
            ["20px", "1.25rem", "text-xl"],
            ["24px", "1.5rem", "text-2xl"],
            ["32px", "2rem", "text-4xl"],
            ["48px", "3rem", "text-5xl"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I use REM, EM, or PX?",
        "Use REM for typography, layout spacing, and anything that should scale with the user's browser preferences. Use EM for component-internal spacing that should scale with that component's font size (e.g. a button's padding). Use PX for borders, hairlines, and anything that genuinely should not scale (e.g. a 1px divider should stay 1px regardless of zoom)."
      ),
      createFAQ(
        "Does REM work in older browsers?",
        "REM has been supported in every browser shipped since 2012 (IE9+). It's safe to use unconditionally. The only place you'd reach for px today is for one-pixel borders and decorative graphics where you specifically don't want scaling, plus media queries (some teams still prefer px-based breakpoints for predictability)."
      ),
      createFAQ(
        "What about media queries?",
        "Media queries can use rem and the value is calculated against the user-agent default font size, not your html element's font size. So `@media (min-width: 48rem)` resolves to 768px on a default browser, and 1152px if the user has set their default to 24px. This is intentional: it means your breakpoints scale with user accessibility settings, often a feature, sometimes a surprise. Pick a side and stay consistent."
      ),
      createFAQ(
        "Why does my rem value have lots of decimals?",
        "Pixel-to-rem conversion at non-multiples of 16 produces irrational fractions. 13px = 0.8125rem exactly, 15px = 0.9375rem. Most stylesheets round to three decimal places (0.813rem, 0.938rem). The visual difference between 0.8125rem and 0.813rem is sub-pixel and invisible. The tool shows three decimals, which is enough precision for any production use."
      ),
    ],
    relatedTools: [
      { slug: "box-shadow-generator", label: "CSS Box Shadow Generator" },
      { slug: "gradient-generator", label: "CSS Gradient Generator" },
      { slug: "contrast-checker", label: "Contrast Checker" },
    ],
  },

  "regex-tester": {
    sections: [
      createAnswerFirstSection(
        "What the Tool Tests",
        "Type a regular expression in the pattern field, paste your test string below, and the tool runs the regex against the string with whatever flags you've enabled. Matches highlight in yellow inline so you can see exactly which characters got picked up; below the test string, a list shows each match with its start position and any captured groups in parentheses. The pattern compiles on every keystroke, so you get immediate feedback when a syntax error breaks the expression - the error message tells you which part of the pattern is invalid.",
        "Quick-insert presets cover common patterns: email address, URL, phone number, IPv4, date (YYYY-MM-DD), hex colour, alphanumeric username, strong password requirement. Each one is a working regex you can use as-is or modify. The 'strong password' pattern is a good teaching example: it requires lowercase, uppercase, digit, special character, and minimum 8 characters - written with positive lookaheads (?=...) which is one of the trickier regex features to write from memory."
      ),
      createAnswerFirstSection(
        "What the Flags Actually Do",
        "g (global): without it, the regex stops after the first match. With it, the regex finds every match in the string. This is the flag you want 90% of the time when extracting or replacing patterns. i (case-insensitive): /hello/i matches 'Hello' and 'HELLO'. Useful for human-input data where capitalisation is unreliable. m (multiline): changes the meaning of ^ and $ from 'start/end of string' to 'start/end of any line'. Important when working with multi-line text. s (dotall): makes the dot character (.) match newlines, which it doesn't by default. Critical when matching across line breaks.",
        "The most common bug in newcomer regex is forgetting g and getting only the first match. The second most common is using . expecting it to match everything, then being surprised by newlines. Toggle s and the issue goes away. Test all four flags on the same pattern to see how the matches change; this is faster than reading documentation about flag behaviour."
      ),
      createAnswerFirstSection(
        "Capture Groups and Why They Matter",
        "Parentheses in a regex create capture groups - the part of the match you can extract separately. /(\\d{4})-(\\d{2})-(\\d{2})/ matched against '2026-04-27' captures three groups: '2026', '04', '27'. The tool displays these underneath each match so you can verify your groups are pulling the right data. This is essential for parsing structured text: log files, version numbers, dates, URLs.",
        "Non-capturing groups (?:...) match the same content but don't store the capture, which is faster for the regex engine and cleaner when you only need to group for repetition. Named groups (?<name>...) let you reference matches by name in some languages (Python, JavaScript ES2018+, .NET). The tool shows numbered groups; switching to named groups in production code makes the code much more readable. The [URL parser](/json-formatter) is a good companion when working with structured data - regex extracts, parser validates structure."
      ),
      {
        heading: "Common Regex Quick Reference",
        table: {
          headers: ["Pattern", "Matches", "Example"],
          rows: [
            ["\\d", "Any digit (0-9)", "2026 has 4 digits"],
            ["\\w", "Word character (a-z, A-Z, 0-9, _)", "user_123"],
            ["\\s", "Whitespace (space, tab, newline)", "splits words"],
            ["[abc]", "Any of a, b, or c", "matches single letters"],
            ["+", "One or more of previous", "\\d+ matches '123'"],
            ["*", "Zero or more of previous", "a* matches '' or 'aaa'"],
            ["?", "Zero or one (optional)", "colou?r matches both spellings"],
            ["^", "Start of line/string", "^Hello"],
            ["$", "End of line/string", "World$"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What flavour of regex does the tester use?",
        "JavaScript regex (ECMAScript), since the tool runs in the browser. JS regex is similar to PCRE but has differences: lookbehinds need ES2018+, possessive quantifiers don't exist, the s/dotall flag is ES2018+. If you're writing regex for Python, Java, or PHP, the basic syntax transfers but specific features may differ. For 90% of patterns (digits, words, anchors, quantifiers, character classes), JS regex is portable to anywhere."
      ),
      createFAQ(
        "Why doesn't my pattern match what I expect?",
        "Most common causes: missing g flag (only finds first match), greedy quantifiers (* and + match as much as possible; use *? and +? for non-greedy), unescaped special characters (. + ? * ( ) [ ] { } ^ $ | \\ all need escaping with \\ if you want the literal character), or the pattern matching whitespace differently than expected (spaces vs \\s vs newlines)."
      ),
      createFAQ(
        "What's the difference between [a-z] and \\w?",
        "[a-z] matches only lowercase letters. \\w matches letters (a-z, A-Z), digits (0-9), and underscore. Use \\w when you want 'word characters' (variable names, usernames). Use [a-z] when you specifically want lowercase only. \\w in JavaScript uses ASCII; for Unicode letter matching, you need the u flag and a Unicode property pattern."
      ),
      createFAQ(
        "Can regex handle nested HTML or JSON?",
        "Officially no - regex can't match arbitrarily nested structures (this is a well-known computer science limitation, related to regular languages vs context-free languages). In practice, regex can handle simple cases of HTML/JSON parsing, but breaks on edge cases like quoted strings containing brackets, or comments containing tags. For real HTML or JSON, use a proper parser; for stripping a simple tag from known clean input, regex is fine."
      ),
      createFAQ(
        "How do I match a literal dot or backslash?",
        "Escape with backslash. Match a dot: \\. Match a backslash: \\\\. Match a forward slash: \\/. The pattern field shows your input as raw, so \\. is what you type. In JavaScript code, you'd double-escape (`\\\\.` in a string literal) but the tester removes that layer of indirection."
      ),
    ],
    relatedTools: [
      { slug: "json-formatter", label: "JSON Formatter" },
      { slug: "json-validator", label: "JSON Validator" },
      { slug: "css-minifier", label: "CSS Minifier" },
    ],
  },

  "password-generator": {
    sections: [
      createAnswerFirstSection(
        "What Makes a Password Actually Strong",
        "NIST's 2024 password guidance flipped decades of conventional wisdom: length matters far more than character complexity. A 16-character lowercase passphrase resists brute-force attacks better than an 8-character password with mixed cases, numbers and symbols. The Password Generator builds passwords from cryptographically secure randomness (Web Crypto API rather than Math.random), which is the difference between a password that's truly unguessable and one that has subtle patterns an attacker can exploit.",
        "The actual numbers: a 12-character password with a 94-character set has 4.7 x 10^23 possible values, which a billion-attempt-per-second offline attack would take 14,000 years to exhaust. A 16-character lowercase-only password (26 characters) has 4.4 x 10^22 possibilities, also effectively unbreakable. Both are fine; both are vastly stronger than any password under 10 characters regardless of complexity."
      ),
      {
        heading: "Password Strength by Length and Character Set",
        table: {
          headers: ["Length", "Character Set", "Possibilities", "Brute-Force Time"],
          rows: [
            ["8", "Lowercase + numbers (36)", "2.8 x 10^12", "47 minutes"],
            ["8", "All printable (94)", "6.1 x 10^15", "70 days"],
            ["12", "Lowercase + numbers (36)", "4.7 x 10^18", "150 years"],
            ["12", "All printable (94)", "4.7 x 10^23", "14,000 years"],
            ["16", "Lowercase only (26)", "4.4 x 10^22", "1,400 years"],
            ["16", "All printable (94)", "3.7 x 10^31", "1.2 x 10^15 years"],
          ],
        },
      },
      createAnswerFirstSection(
        "Use a Password Manager, Not Your Memory",
        "The reason NIST stopped recommending mandatory complexity rules is that they push users into reusing passwords (because complex passwords are hard to remember). The modern answer: a password manager (Bitwarden, 1Password, KeePassXC) generates and stores a unique 16+ character password for every site, and you only memorise the master password. The Password Generator is for the master password and for passwords you must enter manually (Wi-Fi keys, server logins, anything not in the manager).",
        "Pair this with the [QR Code Generator](/qr-code-generator) if you need to share a Wi-Fi password as a printable QR code, and the [Robots.txt Generator](/robots-txt-generator) if you're hardening a site's server-side configuration alongside its access controls. Always enable two-factor authentication on accounts that support it; even a leaked password is useless without the second factor."
      ),
    ],
    faqs: [
      createFAQ(
        "How long should a password be?",
        "12 characters minimum for general accounts, 16 or more for important accounts (email, banking, password manager master), 20+ for crypto wallets and high-value accounts. NIST's 2024 guidance allows passwords up to 64 characters and recommends length over complexity. A 16-character lowercase passphrase is stronger than a 10-character mix of cases, digits and symbols."
      ),
      createFAQ(
        "Are passwords with symbols stronger than letters and numbers?",
        "Marginally, but length matters more. A 16-character lowercase password (26 character set) has more entropy than a 10-character all-printable-character password (94 character set). The reason complexity rules survived as long as they did is they made 8-character passwords slightly harder; the modern fix is just to make passwords longer."
      ),
      createFAQ(
        "What's the difference between Math.random and crypto.getRandomValues?",
        "Math.random is a pseudo-random number generator that's not cryptographically secure: outputs follow patterns that an attacker can model. crypto.getRandomValues (Web Crypto API) produces cryptographically secure random bytes suitable for password generation, encryption keys and tokens. The Password Generator uses crypto.getRandomValues exclusively."
      ),
      createFAQ(
        "Should I include similar-looking characters?",
        "Excluding similar characters (0/O, 1/l/I) makes passwords easier to read aloud or copy from a screen, at the cost of slightly less entropy. For a 16-character password the entropy reduction is about 5%, which is negligible. For passwords you'll dictate over the phone or read from a printed sheet, exclude similar characters; for passwords stored in a password manager and never seen again, include them."
      ),
      createFAQ(
        "Is it safe to generate passwords in a browser?",
        "Yes, the Password Generator runs entirely client-side using crypto.getRandomValues. The generated password never leaves your device or hits any server. You can verify this by opening the browser's network tab and confirming there are no requests when you click 'Generate'. For maximum paranoia, generate passwords offline using a password manager's built-in generator."
      ),
    ],
    relatedTools: [
      { slug: "qr-code-generator", label: "QR Code Generator" },
      { slug: "robots-txt-generator", label: "Robots.txt Generator" },
      { slug: "uuid-generator", label: "UUID Generator" },
    ],
  },

  "robots-txt-generator": {
    sections: [
      createAnswerFirstSection(
        "What robots.txt Does (and What It Doesn't)",
        "robots.txt is a text file at your site's root (yoursite.com/robots.txt) that tells crawlers which paths to request and which to skip. It uses three directives: User-agent (which bot the rule applies to), Disallow (paths to skip), and Allow (paths to include despite a broader Disallow). Sitemap (a URL pointing to your sitemap.xml) is the fourth standard directive. The Robots.txt Generator builds these visually so you can compose a config without remembering the syntax.",
        "What robots.txt does not do: enforce access control. A determined crawler ignores robots.txt entirely; a malicious scraper wouldn't bother reading it. Anything truly private must sit behind authentication, not just a Disallow. robots.txt is a polite request to well-behaved bots (Googlebot, Bingbot, AhrefsBot, the major AI crawlers), and that's the right way to think about it."
      ),
      {
        heading: "Common robots.txt Patterns",
        table: {
          headers: ["Pattern", "Effect", "When to Use"],
          rows: [
            ["User-agent: *  Disallow:", "Allow all bots everywhere", "Public marketing sites"],
            ["User-agent: *  Disallow: /", "Block all bots from everything", "Staging environments only"],
            ["Disallow: /admin/", "Block admin paths from indexing", "Login screens, dashboards"],
            ["Disallow: /api/", "Block API routes from crawling", "JSON endpoints, webhooks"],
            ["User-agent: GPTBot  Disallow: /", "Block OpenAI's crawler", "Sites blocking AI training"],
            ["Sitemap: https://...", "Point crawlers to your sitemap", "Always include if you have one"],
          ],
        },
      },
      createAnswerFirstSection(
        "Blocking AI Crawlers and Common Bots",
        "Many publishers now block AI training crawlers explicitly. The major ones to know: GPTBot (OpenAI), Google-Extended (Google's AI training, separate from Googlebot), CCBot (Common Crawl, often used as training data), ClaudeBot and anthropic-ai (Anthropic), PerplexityBot (Perplexity), Bytespider (TikTok / ByteDance). Block these without affecting search ranking by adding a per-user-agent Disallow rule, since search bots (Googlebot, Bingbot) read different identifiers.",
        "Pair this with the [Password Generator](/password-generator) for hardening the actual access controls behind robots.txt, and the [QR Code Generator](/qr-code-generator) if you're publishing a printable URL. Always test your robots.txt with Google Search Console's robots.txt tester before deploying; a misplaced slash can accidentally block your entire site."
      ),
    ],
    faqs: [
      createFAQ(
        "Where does robots.txt go on my site?",
        "At the root of your domain: yoursite.com/robots.txt. It must be a plain text file (not HTML), accessible without authentication, served with Content-Type: text/plain. Subdirectory robots.txt files (yoursite.com/blog/robots.txt) are ignored. Subdomains have their own robots.txt: blog.yoursite.com needs its own."
      ),
      createFAQ(
        "Does robots.txt prevent pages from showing in Google?",
        "No, robots.txt prevents crawling, not indexing. Google can still index a URL it has discovered through external links, even if it can't crawl the page contents. To prevent indexing, use a meta robots tag (noindex) or HTTP X-Robots-Tag header. To prevent both crawling and indexing, use both robots.txt and noindex (the page must be crawlable for noindex to be read)."
      ),
      createFAQ(
        "How do I block AI crawlers without blocking search engines?",
        "Add per-user-agent rules. Block GPTBot, Google-Extended, ClaudeBot, anthropic-ai, CCBot, PerplexityBot, and Bytespider individually with their own User-agent and Disallow lines, while leaving the catch-all User-agent: * with full access. This blocks AI training without affecting Googlebot's search-indexing crawl."
      ),
      createFAQ(
        "What is the wildcard syntax in robots.txt?",
        "The * wildcard matches any sequence of characters; $ matches end-of-URL. Disallow: /*.pdf$ blocks all URLs ending in .pdf. Disallow: /search?* blocks all URLs starting with /search?. Both Googlebot and Bingbot support wildcards; older or simpler crawlers may not, so don't rely on wildcards alone for sensitive paths."
      ),
      createFAQ(
        "Should I include a sitemap in robots.txt?",
        "Yes, always. The Sitemap directive points crawlers directly to your sitemap.xml, which speeds up the discovery of new pages. The line is simply: Sitemap: https://yoursite.com/sitemap.xml. Multiple sitemaps are allowed; each gets its own line."
      ),
    ],
    relatedTools: [
      { slug: "password-generator", label: "Password Generator" },
      { slug: "qr-code-generator", label: "QR Code Generator" },
      { slug: "sql-formatter", label: "SQL Formatter" },
    ],
  },

  "qr-code-generator": {
    sections: [
      createAnswerFirstSection(
        "How QR Codes Actually Work",
        "A QR code is a 2D barcode that encodes text in a grid of black and white squares. The QR Code Generator turns any URL or plain text into a downloadable PNG or SVG. It picks the smallest QR version that fits your data, applies error correction, and renders the result with the colours and quiet zone you choose. SVG output scales infinitely without pixelation, so it's the right choice for print; PNG suits screen embedding and email signatures.",
        "Error correction is the part most people don't understand. QR codes have four levels: L (7% damage tolerance), M (15%), Q (25%), H (30%). Higher correction means a denser code (more squares) but lets the code survive a logo overlay, a torn corner, or a smudged print. For a clean URL on a clean background, L is fine; for a code printed on a t-shirt or behind a logo, use Q or H."
      ),
      {
        heading: "QR Code Error Correction Levels",
        table: {
          headers: ["Level", "Damage Tolerance", "Density", "When to Use"],
          rows: [
            ["L (Low)", "7%", "Smallest", "Clean digital display, simple URLs"],
            ["M (Medium)", "15%", "Standard", "Default for most printed codes"],
            ["Q (Quartile)", "25%", "Larger", "Logo overlay, decorative designs"],
            ["H (High)", "30%", "Largest", "Outdoor signs, printed on fabric"],
          ],
        },
      },
      createAnswerFirstSection(
        "Designing QR Codes That Scan Reliably",
        "The biggest mistake: insufficient contrast between the foreground and background. A QR scanner needs to clearly distinguish dark from light, so don't use light grey on white or dark grey on black. Pure black on pure white is the gold standard; coloured QR codes work if the foreground is genuinely dark and the background genuinely light. The 'quiet zone' (the white margin around the code) is also critical; reduce it below 4 modules wide and scanners will struggle.",
        "Print at the right size for the scan distance: roughly 1cm of QR width for every 30cm of expected scan distance. A QR on a poster across a room needs to be at least 10 to 15cm wide. A QR on a business card scanned at arm's length needs only 2 to 3cm. Pair this with the [Password Generator](/password-generator) if you're encoding Wi-Fi credentials, and the [Robots.txt Generator](/robots-txt-generator) if the QR points to a public landing page you want indexed."
      ),
    ],
    faqs: [
      createFAQ(
        "What's the maximum amount of text a QR code can hold?",
        "A QR code can hold up to 7,089 numeric digits, 4,296 alphanumeric characters, or 2,953 binary bytes at the highest QR version (40) with the lowest error correction. In practice, codes that hold more than around 500 characters become so dense they're hard to scan from any distance. For long content, encode a URL pointing to a page with the full text instead."
      ),
      createFAQ(
        "Are QR codes free to use commercially?",
        "Yes. The QR code format is an open standard (ISO/IEC 18004) and free to use without licensing for any purpose. No royalties, no trademark restrictions on the codes themselves. The QR Code Generator outputs unrestricted PNG and SVG files you can use on packaging, posters, marketing materials, anything."
      ),
      createFAQ(
        "Can I add a logo to a QR code?",
        "Yes, but only if you use Q or H error correction. The logo covers part of the code and the error correction reconstructs the missing data. Keep the logo in the centre and no larger than 25% of the total code area. Test the result with multiple scanners (iPhone Camera app, Google Lens, dedicated scanner apps) before printing thousands."
      ),
      createFAQ(
        "Why does my QR code not scan?",
        "Most often: insufficient contrast (light grey on white doesn't read), missing quiet zone (the white margin around the code is essential), too small for the scan distance, or aspect-ratio distortion (the QR has been stretched non-proportionally). Print at original aspect ratio, use full black on full white, leave at least 4 modules of white margin around all four sides, and size to your expected scan distance."
      ),
      createFAQ(
        "What's the difference between PNG and SVG QR codes?",
        "PNG is a fixed-resolution raster image, ideal for screens and email signatures. SVG is scalable vector, ideal for print (any size, no pixelation) and for editing in design tools (Illustrator, Figma). For business cards and posters, always use SVG; for in-app embedding, PNG at 2x screen resolution is fine."
      ),
    ],
    relatedTools: [
      { slug: "password-generator", label: "Password Generator" },
      { slug: "robots-txt-generator", label: "Robots.txt Generator" },
      { slug: "json-formatter", label: "JSON Formatter" },
    ],
  },

  "sql-formatter": {
    sections: [
      createAnswerFirstSection(
        "Why Formatted SQL Catches Bugs Faster",
        "Unformatted SQL is one of the worst things to debug because the syntax is dense and the errors are subtle. A missing comma, a JOIN with a wrong key, or a GROUP BY that's missed a column can hide in a 30-line query that looks like one big run-on sentence. The SQL Formatter restructures the query with proper indentation, uppercase keywords, and aligned clauses so the structure is visible at a glance. Format any query before reading it; the few seconds you spend pasting and clicking save you minutes of squinting.",
        "Most professional SQL editors (DataGrip, DBeaver, pgAdmin, Postico) have built-in formatters; this tool is for the moments when you're staring at a query in Slack, an email, a Stack Overflow answer, or a logged error message. Paste, format, read. The formatter handles SELECT, INSERT, UPDATE, DELETE, JOIN variants (INNER, LEFT, RIGHT, FULL OUTER), CTEs (WITH ... AS), window functions, and subqueries."
      ),
      {
        heading: "Common SQL Formatting Conventions",
        table: {
          headers: ["Convention", "Example", "Why"],
          rows: [
            ["Uppercase keywords", "SELECT, FROM, WHERE", "Distinguishes SQL syntax from data"],
            ["One column per line", "SELECT a,\\n       b,\\n       c", "Easier to spot missing commas"],
            ["JOINs on new lines", "FROM users\\nJOIN orders ON ...", "Each table relationship visible"],
            ["WHERE clauses indented", "WHERE x = 1\\n  AND y = 2", "Logical structure clearer"],
            ["2-space or 4-space indent", "Either, but consistent", "Matches team style guide"],
          ],
        },
      },
      createAnswerFirstSection(
        "Reading EXPLAIN Plans Alongside Formatted SQL",
        "Once a query is formatted readably, the next debugging step is running EXPLAIN (or EXPLAIN ANALYZE in Postgres, EXPLAIN PLAN FOR in Oracle, EXPLAIN FORMAT=JSON in MySQL) to see how the database engine intends to execute it. Look for sequential scans on tables that should hit an index, nested loop joins on large tables (usually a missing index), and large estimated row counts that don't match reality (often a stale ANALYZE statistics issue). A query that looks slow to you isn't necessarily slow to the engine; EXPLAIN tells you the truth.",
        "GROUP BY queries are the most common source of subtle bugs: every column in SELECT that isn't aggregated must appear in GROUP BY, or you get either a syntax error (Postgres, strict MySQL) or silently wrong results (loose MySQL). Format the query first, scan the SELECT list and GROUP BY list side by side, and check they match. Pair this with the [JSON Formatter](/json-formatter) when working with JSONB columns, and the [Password Generator](/password-generator) for database connection passwords."
      ),
    ],
    faqs: [
      createFAQ(
        "Why are SQL keywords uppercase by convention?",
        "It's a long-standing readability convention rather than a syntactic requirement. SELECT and select are equivalent to the SQL parser, but uppercase keywords make the query's structural elements (SELECT, FROM, WHERE, GROUP BY) visually pop out from the column and table names. Most style guides require uppercase keywords for legacy compatibility and code reviews."
      ),
      createFAQ(
        "Should I put each JOIN on a new line?",
        "Yes, every JOIN on its own line with the ON clause inline. This makes table relationships visible at a glance: 'this table joins to that table on this key'. For complex queries with five or more JOINs, placing each ON clause on a separate indented line improves readability further but is less universally adopted."
      ),
      createFAQ(
        "How do I format a SELECT with many columns?",
        "One column per line, all aligned, with the comma at the end of each line (the standard) or at the start of each line (Postgres/legacy style, harder to maintain). Many teams put SELECT on its own line and indent the column list under it. The SQL Formatter applies your chosen indent (2-space or 4-space) consistently."
      ),
      createFAQ(
        "Does the formatter handle CTEs and window functions?",
        "Yes. CTEs (WITH name AS (...)) get their own block with the inner SELECT formatted independently. Window functions (OVER (PARTITION BY ... ORDER BY ...)) get the contents of the OVER clause indented for readability. Both work the same way in Postgres, MySQL 8+, SQL Server, and Oracle."
      ),
      createFAQ(
        "Why does my formatted SQL still produce errors?",
        "The formatter doesn't validate the SQL, only structures it. Missing tables, wrong column names, type mismatches, or grammar errors will still produce database errors when you run the query. After formatting, run the query through your database's EXPLAIN to validate logic, or paste it into a SQL linter (sqlfluff, sqlcheck) for static analysis before execution."
      ),
    ],
    relatedTools: [
      { slug: "json-formatter", label: "JSON Formatter" },
      { slug: "password-generator", label: "Password Generator" },
      { slug: "css-minifier", label: "CSS Minifier" },
    ],
  },

  "base64-converter": {
    sections: [
      createAnswerFirstSection(
        "What's Base64?",
        "Base64 encoding transforms binary or special-character data into a 64-character ASCII string (A-Z, a-z, 0-9, +, /, with = padding). So 'Hello' becomes 'SGVsbG8='. The encoding produces output 33% longer than the input but ensures the data survives transport through systems that only handle plain text - HTTP headers, email bodies, URLs, JSON values.",
        "Common uses: embedding images in CSS/HTML (data:image/png;base64,...), encoding binary in JSON/XML, HTTP Basic Auth headers, JWT tokens (header and payload sections are base64-url-encoded). Not encryption - it's encoding. Anyone who sees base64 can decode it instantly. Use cryptography for actual security."
      ),
      {
        heading: "Common Base64 Examples",
        table: {
          headers: ["Plain Text", "Base64"],
          rows: [
            ["A", "QQ=="],
            ["AB", "QUI="],
            ["Hello", "SGVsbG8="],
            ["Hello, World!", "SGVsbG8sIFdvcmxkIQ=="],
            ["user:password", "dXNlcjpwYXNzd29yZA=="],
            ["JSON {\"a\":1}", "anNvbiB7ImEiOjF9"],
            ["1 byte (0xFF)", "/w=="],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why does it have padding (= signs)?",
        "Base64 works in groups of 3 input bytes → 4 output characters. When the input isn't a multiple of 3 bytes, padding fills the gap. 1 byte input = 2 output + '=='. 2 bytes input = 3 output + '='. 3 bytes = 4 output, no padding needed."
      ),
      createFAQ(
        "Is base64 secure?",
        "No - it's encoding, not encryption. Anyone with the base64 string can decode it instantly to original. For actual security, use real cryptography (AES, RSA). Base64 is only useful for data transport across systems that don't handle binary."
      ),
    ],
    relatedTools: [
      { slug: "url-encoder", label: "URL Encoder" },
      { slug: "html-entity-encoder", label: "HTML Entity Encoder" },
      { slug: "hash-generator", label: "Hash Generator" },
    ],
  },

  "url-encoder": {
    sections: [
      createAnswerFirstSection(
        "How URL Encoding Works",
        "URL encoding (also called 'percent-encoding') replaces special characters with %XX where XX is the hex code of the character. So a space becomes %20, & becomes %26, # becomes %23. RFC 3986 defines which characters need encoding. Letters, digits, and -_.~ are 'unreserved' and pass through unchanged.",
        "Used everywhere URLs include user input. Search queries: 'hello world' becomes 'hello%20world' (or 'hello+world' in form data). Special characters in URLs: 'café' becomes 'caf%C3%A9' (UTF-8 bytes percent-encoded). Always encode untrusted input before placing it in a URL - failure to encode causes broken links and is a common source of XSS vulnerabilities."
      ),
      {
        heading: "Common URL Encodings",
        table: {
          headers: ["Character", "Encoded"],
          rows: [
            ["space", "%20 (or + in forms)"],
            ["#", "%23"],
            ["&", "%26"],
            ["?", "%3F"],
            ["/", "%2F"],
            [":", "%3A"],
            ["=", "%3D"],
            ["@", "%40"],
            ["café (UTF-8)", "caf%C3%A9"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why are some characters encoded and others not?",
        "Reserved characters (?, &, =, /, etc.) have special meaning in URLs - encoding preserves their literal value when used in data. Unreserved (letters, digits, -_.~) have no special URL meaning and stay as-is. The line is set by RFC 3986 spec; modern systems follow it strictly."
      ),
      createFAQ(
        "Is + the same as %20?",
        "In query strings (form data after ?): yes, + represents space. In path components (before ?): no, + is literal +. Use %20 if you want a space in a path component. Most URL encoders default to + for query strings, %20 for paths."
      ),
    ],
    relatedTools: [
      { slug: "base64-converter", label: "Base64 Converter" },
      { slug: "html-entity-encoder", label: "HTML Entity Encoder" },
      { slug: "slug-generator", label: "Slug Generator" },
    ],
  },

  "uuid-generator": {
    sections: [
      createAnswerFirstSection(
        "What's a UUID?",
        "Universally Unique Identifier - a 128-bit ID with a standard format: 8-4-4-4-12 hex digits separated by hyphens. Example: 550e8400-e29b-41d4-a716-446655440000. Designed so that any system can generate UUIDs independently and the chance of collision is essentially zero (~10^-18 collision probability per generation, less likely than a particular star colliding with Earth).",
        "Common uses: database primary keys (especially in distributed systems), API identifiers, session tokens, file names. Most languages have built-in UUID generation: JavaScript crypto.randomUUID(), Python uuid.uuid4(), Java UUID.randomUUID(). Different versions of UUID exist - v4 (random) is most common, v7 (time-ordered random) is increasingly popular for database keys."
      ),
      {
        heading: "UUID Versions",
        table: {
          headers: ["Version", "Description"],
          rows: [
            ["v1", "Time + MAC address (privacy concern)"],
            ["v3", "MD5 hash of namespace + name"],
            ["v4", "Random (most common)"],
            ["v5", "SHA-1 hash of namespace + name"],
            ["v6", "Time-ordered (better for indexes)"],
            ["v7", "Unix timestamp + random (newest)"],
            ["NIL", "All zeros: 00000000-0000-0000-0000-000000000000"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why use UUID instead of incrementing IDs?",
        "Distributed systems can generate IDs independently without coordinating with a central counter. Better for microservices, sharded databases, mobile apps generating IDs offline. Trade-off: UUIDs are larger (16 bytes vs 4 for integer), and v4 random UUIDs hurt database index performance vs sequential IDs."
      ),
      createFAQ(
        "Should I use v4 or v7?",
        "v7 is newer (RFC 9562, 2024) and ordered by time, which keeps database indexes fast. v4 is well-supported everywhere but causes random insertion in indexes. New projects in databases supporting v7 (most modern ones) should consider v7 for better performance."
      ),
    ],
    relatedTools: [
      { slug: "hash-generator", label: "Hash Generator" },
      { slug: "password-generator", label: "Password Generator" },
      { slug: "base64-converter", label: "Base64 Converter" },
    ],
  },

  "hash-generator": {
    sections: [
      createAnswerFirstSection(
        "What's a Hash?",
        "A hash function takes any input (text, file, anything) and produces a fixed-size string output. Same input always produces the same hash; different inputs produce different hashes. Common hash sizes: MD5 (128 bits, 32 hex chars), SHA-1 (160 bits, 40 hex chars), SHA-256 (256 bits, 64 hex chars), SHA-512 (512 bits, 128 hex chars).",
        "Uses: file integrity checking (hash of downloaded file should match published hash), password storage (hash with salt, never the actual password), data deduplication (same content = same hash), cryptographic signatures, blockchain. SHA-256 is the modern standard for general use; SHA-1 and MD5 are deprecated for security purposes (collisions can be engineered)."
      ),
      {
        heading: "Common Hash Algorithms",
        table: {
          headers: ["Algorithm", "Output Size", "Status"],
          rows: [
            ["MD5", "128 bit (32 hex)", "Broken, file checksums only"],
            ["SHA-1", "160 bit (40 hex)", "Deprecated for security"],
            ["SHA-256", "256 bit (64 hex)", "Standard, recommended"],
            ["SHA-512", "512 bit (128 hex)", "Highest security"],
            ["SHA-3", "Variable", "Modern alternative"],
            ["BLAKE2", "Variable", "Faster than SHA, secure"],
            ["Argon2", "Variable", "Password hashing winner"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Can I reverse a hash to get the input?",
        "No - hash functions are one-way. Reversing requires either the input itself or brute-forcing all possible inputs. For weak inputs (short passwords, common phrases), rainbow tables or dictionary attacks find the input quickly. For random/long inputs, reversal is computationally infeasible."
      ),
      createFAQ(
        "Should I use MD5 for passwords?",
        "No - MD5 is broken for cryptographic purposes. Use Argon2 (preferred), bcrypt, or scrypt for password hashing. These are slow by design, making brute force impractical. SHA-256 is fine for non-password integrity checking."
      ),
    ],
    relatedTools: [
      { slug: "uuid-generator", label: "UUID Generator" },
      { slug: "password-generator", label: "Password Generator" },
      { slug: "base64-converter", label: "Base64 Converter" },
    ],
  },

  "lorem-ipsum-generator": {
    sections: [
      createAnswerFirstSection(
        "What's Lorem Ipsum?",
        "Lorem Ipsum is the standard placeholder text used in design, publishing, and printing since the 1500s. The text comes from Cicero's 'de Finibus Bonorum et Malorum' (45 BC), with words scrambled and partially mutated. The famous opening: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'",
        "Why this specific Latin? Letter frequencies match natural English well, making layouts look realistic without distracting clients with readable English. Designers can show typography, spacing, and structure without people reading actual content. Modern alternatives exist (Bacon Ipsum, Hipster Ipsum, Cat Ipsum) but Lorem Ipsum remains the standard."
      ),
      {
        heading: "Lorem Ipsum Variations",
        table: {
          headers: ["Type", "Length", "Use case"],
          rows: [
            ["Words (10-50)", "Short labels, button text", "Tooltips, captions"],
            ["Sentences (1-3)", "Headlines, descriptions", "Section titles"],
            ["Paragraphs (1-5)", "Article body, mockups", "Blog/article layout"],
            ["Long form (10+ paragraphs)", "Full-page mockups", "Layout testing"],
            ["Bytes (specific size)", "Exact-length filling", "Cell content fitting"],
            ["List items (5-20)", "Bullet content", "Mock lists, menus"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why not just use English random text?",
        "Lorem Ipsum looks intentionally placeholder-ish - clients understand it's not real content. English-looking random text might cause clients to read it and complain about quality. Lorem signals 'this is a layout draft', avoiding wasted feedback on content."
      ),
      createFAQ(
        "Are alternatives better than classic Lorem?",
        "For specific industries: Bacon Ipsum (food), Cat Ipsum (pet sites), Hipster Ipsum (lifestyle), Corporate Ipsum (B2B SaaS). Classic Lorem is the safest default. Themed Ipsums add personality but might be too distracting in formal client meetings."
      ),
    ],
    relatedTools: [
      { slug: "random-text-generator", label: "Random Text Generator" },
      { slug: "string-repeater", label: "String Repeater" },
      { slug: "character-counter", label: "Character Counter" },
    ],
  },

  "html-entity-encoder": {
    sections: [
      createAnswerFirstSection(
        "What HTML Entity Encoding Does",
        "Replaces special HTML characters with their entity equivalents to prevent them from being interpreted as HTML. So < becomes &lt;, > becomes &gt;, & becomes &amp;, \" becomes &quot;, ' becomes &#39; or &apos;. Essential for displaying HTML/code examples on web pages without the browser rendering them as actual HTML.",
        "Critical for security: any user-submitted content displayed on a page must be entity-encoded to prevent XSS (cross-site scripting) attacks. A user posting '<script>alert(1)</script>' should display as text, not execute. All major frameworks (React, Vue, Angular) auto-encode by default. Manual encoding via this tool when working in raw HTML or testing security."
      ),
      {
        heading: "Common HTML Entities",
        table: {
          headers: ["Character", "Entity"],
          rows: [
            ["<", "&lt;"],
            [">", "&gt;"],
            ["&", "&amp;"],
            ["\"", "&quot;"],
            ["'", "&#39; or &apos;"],
            ["non-breaking space", "&nbsp;"],
            ["©", "&copy;"],
            ["£", "&pound;"],
            ["€", "&euro;"],
            ["✓", "&check; or &#10003;"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Why use entities instead of UTF-8?",
        "Both work in modern browsers. Entities are explicit (always render correctly even with encoding mishaps). UTF-8 is more compact and natural to read in source. For < > & specifically, you MUST entity-encode in HTML even with UTF-8 - those characters have HTML structural meaning."
      ),
      createFAQ(
        "Should I encode user input on display?",
        "Yes - always. Modern frameworks auto-encode. For raw HTML/template work, run user content through entity encoding before inserting. Failure to encode is the #1 cause of XSS vulnerabilities. The OWASP Top 10 has covered XSS for years for this reason."
      ),
    ],
    relatedTools: [
      { slug: "url-encoder", label: "URL Encoder" },
      { slug: "base64-converter", label: "Base64 Converter" },
      { slug: "case-converter", label: "Case Converter" },
    ],
  },
};
