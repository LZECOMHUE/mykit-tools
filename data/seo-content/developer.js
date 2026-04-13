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
};
