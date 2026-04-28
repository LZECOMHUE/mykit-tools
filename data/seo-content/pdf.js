// SEO content for PDF tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const pdfSEO = {
  "crop-pdf": {
    sections: [
      createAnswerFirstSection(
        "What Cropping Actually Does to a PDF",
        "Cropping a PDF does not remove content from the file. It changes the page's CropBox, which is the rectangle the viewer uses to decide how much of the page to display. The original artwork outside that rectangle is still in the document, just hidden. This is part of the PDF 1.7 specification (ISO 32000-1) and is why a cropped PDF often has the same file size as the original.",
        "If you need the trimmed area genuinely deleted (for example, to redact a sensitive footer), cropping is the wrong tool. You would need a redaction workflow that flattens and rasterises the visible region. For ordinary tidying, like removing the wide white border on a scan of a book page, cropping is fine and reversible by anyone who reopens the file in a desktop PDF editor."
      ),
      createAnswerFirstSection(
        "When to Crop, and the Common Margin Sizes",
        "The most common reason to crop is a bad scan: a phone-camera capture of a contract that includes the table top, or a flatbed scan with a 20mm white border on every page. Removing 10% from each side usually pulls a phone-scan back to just the document. For book pages, an asymmetric crop works better, since the inner gutter margin is usually narrower than the outer.",
        "Crop dimensions are stored in PDF points, where 1 point equals 1/72 of an inch. A standard A4 page is 595 by 842 points, US Letter is 612 by 792. The tool above accepts either points or millimetres, and lets you apply the same crop to every page or just the ones you select."
      ),
      createAnswerFirstSection(
        "Privacy: This Runs Entirely in Your Browser",
        "The crop tool uses pdf-lib loaded directly into your browser. Your file is never uploaded anywhere. That matters for legal documents, NHS letters, payslips, or anything else you would not want sitting in a third-party server's logs. If you have a 200-page scanned bundle, mobile browser memory will be the bottleneck, not network speed; on a phone, files above roughly 50MB may stall.",
        "If your document still has form fields after cropping and you want to lock them in place, use [Flatten PDF](/flatten-pdf) afterwards. To remove pages entirely instead of trimming margins, [Delete PDF Pages](/delete-pdf-pages) is the right tool."
      ),
    ],
    faqs: [
      createFAQ(
        "Will cropping reduce the PDF file size?",
        "Usually no, or only a tiny amount. Cropping only changes the visible area; the original page content remains in the file. To shrink a PDF, you need a tool that recompresses images or removes embedded fonts. If your goal is a smaller email attachment, try converting to images first with [PDF to JPG](/pdf-to-jpg), then back if needed."
      ),
      createFAQ(
        "Can someone see what I cropped out?",
        "Yes. Anyone with a desktop PDF editor can reset the CropBox and see the original full page. If the trimmed area contains sensitive information, do not rely on cropping. Convert the page to an image instead, or use a proper redaction tool that removes the underlying content."
      ),
      createFAQ(
        "Why are my crop measurements in points?",
        "PDF uses points as its native unit. One point is 1/72 of an inch, so 72 points equals 25.4mm. The tool lets you switch to millimetres if you prefer, but the underlying file always stores values in points to match the PDF specification."
      ),
      createFAQ(
        "Does cropping work on encrypted or password-protected PDFs?",
        "Not directly. If the PDF has owner-password restrictions, you will need to remove those first, since pdf-lib cannot modify a document it cannot fully open. Files protected with a user-password (one that prompts you on opening) cannot be processed in the browser at all without the password."
      ),
    ],
    relatedTools: [
      { slug: "rotate-pdf", label: "Rotate PDF" },
      { slug: "flatten-pdf", label: "Flatten PDF" },
      { slug: "delete-pdf-pages", label: "Delete PDF Pages" },
    ],
  },

  "delete-pdf-pages": {
    sections: [
      createAnswerFirstSection(
        "How Page Deletion Works",
        "Deleting pages from a PDF is a structural operation: the tool reads the PDF's page tree (defined in ISO 32000-1, the PDF 1.7 specification), removes the entries for the pages you select, and writes a new file. Bookmarks pointing at deleted pages are dropped or rebound to the nearest surviving page, depending on the source structure. Cross-references between pages, like internal links, may break if they pointed somewhere you removed.",
        "A typical use case is a 40-page bank statement export where you only need pages 12 to 18 for an expense claim. Rather than printing and rescanning, you tick the unwanted pages, click delete, and download a clean 7-page file. The output keeps the original fonts, embedded images, and any form data that survives on the kept pages."
      ),
      createAnswerFirstSection(
        "Files Stay on Your Device",
        "The deletion runs entirely client-side using pdf-lib. Your PDF is read into browser memory, modified there, and offered back to you as a download. Nothing leaves your computer. That is the right model for documents you would not paste into a public uploader: tenancy agreements, medical reports, salary slips, or anything labelled confidential.",
        "There is no realistic page-count limit, but very large files (above 100MB or so) can hit browser memory ceilings, especially on phones. If a delete operation hangs, try [Split PDF](/split-pdf) first to break the file into smaller chunks, work on each one, then [Merge PDF](/merge-pdf) the survivors."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I get the deleted pages back?",
        "Not from the new file. The pages are genuinely gone from the output PDF, not hidden. If you need a recoverable trim, keep your original document somewhere safe before deleting. The tool does not modify your source file, only the downloaded copy."
      ),
      createFAQ(
        "What happens to bookmarks and links pointing to deleted pages?",
        "Bookmarks pointing to a deleted page are usually removed. Internal hyperlinks that targeted a deleted page become dead links. Links to surviving pages are renumbered automatically so they still work after the deletion."
      ),
      createFAQ(
        "Will this work on a scanned PDF?",
        "Yes. A scanned PDF is just a PDF where each page is an image, so deletion works the same way. The only thing you cannot do with a scan is search inside it, since there is no extractable text. If you need searchable text, you would need OCR first, which this tool does not perform."
      ),
      createFAQ(
        "Why does my output file look the same size as the original?",
        "PDFs often share resources (fonts, images, embedded files) across pages. Removing a page does not always free those shared resources. To genuinely shrink the file, follow up with a compression tool, or rasterise to images via [PDF to JPG](/pdf-to-jpg) and rebuild."
      ),
    ],
    relatedTools: [
      { slug: "extract-pdf-pages", label: "Extract PDF Pages" },
      { slug: "split-pdf", label: "Split PDF" },
      { slug: "merge-pdf", label: "Merge PDF" },
    ],
  },

  "flatten-pdf": {
    sections: [
      createAnswerFirstSection(
        "What Flattening a PDF Means",
        "A PDF can contain interactive layers: form fields you can type into, sticky-note annotations, freehand markup, and digital signature widgets. Flattening burns those layers into the page itself, turning them from editable objects into static drawn content. The text in a form field becomes ordinary text on the page; the tick in a checkbox becomes a tick-shaped vector path. Once flattened, no one can clear the values, edit the comments, or reuse the form.",
        "This matters when you are submitting a final version. A solicitor sending a signed contract back to the other side does not want the recipient able to retype the witness's name in the form field. A teacher sharing marked-up coursework feedback wants their comments locked in place. Flattening is the safe, irreversible way to publish a finished document."
      ),
      createAnswerFirstSection(
        "Flatten vs Lock vs Sign",
        "These three operations sound similar but solve different problems. Flattening removes the editability of fields and annotations. Locking with a password (via [Protect PDF](/protect-pdf)) controls who can open or modify the file. A digital signature cryptographically proves who issued the file and detects later tampering. For a sensitive handover, you often want all three: flatten the form, sign it, then password-protect the result.",
        "Worth knowing: a flattened PDF is much harder to reverse-engineer. Some PDF editors will let a user OCR a flattened page and rebuild rough form fields, but the original field metadata, validation rules, and tab order are gone. For most practical purposes, flattening is treated as final."
      ),
      createAnswerFirstSection(
        "Browser-Only Processing",
        "The flatten step runs in your browser using pdf-lib. The PDF never leaves your device, which is essential when the form contains personal data: National Insurance numbers, dates of birth, bank details on a direct debit mandate. Free flattening services that upload to a server are a real privacy risk for these documents. The trade-off is that very large interactive forms (200+ fields) can be slow to flatten on lower-end devices."
      ),
    ],
    faqs: [
      createFAQ(
        "Will flattening change how the PDF looks?",
        "It should not. The point of flattening is that the visual output stays identical; only the underlying interactivity is removed. If you see a difference, it is usually because the original form was using a font that is not embedded, and the viewer was substituting it on the fly. Flattening with the substituted font can lock the substitution in place."
      ),
      createFAQ(
        "Can I unflatten a PDF later?",
        "No, not in any reliable way. Flattening is a one-way operation: the form-field metadata is discarded once the visible content is drawn onto the page. Always keep an unflattened copy of any form you might need to edit again."
      ),
      createFAQ(
        "Does flattening reduce file size?",
        "Sometimes. Removing the form-field metadata can shrink the file slightly, but if the form contained embedded fonts or images those still take up the same space. Do not flatten purely for size; use it because you want the document final."
      ),
      createFAQ(
        "What happens to my digital signatures when I flatten?",
        "A flattened PDF will lose its cryptographic signatures, since flattening rewrites the file and breaks the signature's integrity check. Sign the document after flattening, never before, if you want the signature to remain valid."
      ),
    ],
    relatedTools: [
      { slug: "protect-pdf", label: "Protect PDF" },
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "crop-pdf", label: "Crop PDF" },
    ],
  },

  "jpg-to-pdf": {
    sections: [
      createAnswerFirstSection(
        "Why People Convert Images to PDF",
        "A picture of a receipt is just a JPG file; a picture of a receipt sent to your accountant is a PDF. The conversion is more about the container than the content. PDF gives you predictable page sizes, reliable printing, and a single attachment instead of a dozen image files. It is also what most expense systems, mortgage brokers, and council forms actually accept.",
        "The tool above takes JPG, PNG, and WEBP files, lays each one out on its own page, and produces a single PDF. You can pick A4 (210 by 297mm) or US Letter (8.5 by 11 inches), set portrait or landscape, and choose how much margin sits around the image. Reordering happens by drag-and-drop, which is usually quicker than sorting filenames first."
      ),
      createAnswerFirstSection(
        "Image Quality, File Size, and Colour",
        "Inside a PDF, JPG images are stored using JPEG-DCT compression - the same lossy method as the source file. So a JPG embedded in a PDF stays roughly the same quality as the original; the PDF wrapper itself does not degrade it. PNGs are stored losslessly with Flate compression, which keeps screenshots and logos sharp at the cost of slightly larger files.",
        "One trap: photo files from a modern phone are often in sRGB, but professional print workflows expect CMYK. If you are sending a PDF for print and the colours look washed out, that is the colour-model gap, not the converter. For print submissions, ask the printer what colour profile they want and convert the source images first."
      ),
      createAnswerFirstSection(
        "Privacy When Converting Sensitive Photos",
        "Conversion happens in your browser using pdf-lib. The images never leave your device, which is the only acceptable model for photos of passports, driving licences, P60s, or anything containing personal data. Online converters that upload to a server log every file they touch; for a P60 with your NI number on it, that is not a trade-off worth making.",
        "If you also need to compress the source photos before adding them, the standalone [Image Compressor](/image-compressor) tool will do that. To go the other direction (split a PDF back into images), use [PDF to JPG](/pdf-to-jpg)."
      ),
    ],
    faqs: [
      createFAQ(
        "What image formats can I convert?",
        "JPG, PNG, and WEBP are supported. HEIC files from iPhones often need to be converted to JPG first, since most browsers do not decode HEIC natively. If you drag in an unsupported file, the tool will skip it and tell you which one was the problem."
      ),
      createFAQ(
        "Will the PDF be searchable?",
        "No. A PDF made from images contains no extractable text, so search and copy-paste will not work. To make it searchable you would need OCR, which adds a text layer behind each image. This tool does not perform OCR; it produces a faithful but non-searchable PDF."
      ),
      createFAQ(
        "How big can my images be?",
        "Each image can be up to about 50MB before browser memory starts to struggle, and the total combined size matters more than individual files. On a phone, expect to combine fewer or smaller images than you would on a laptop. If you hit a wall, compress the photos first."
      ),
      createFAQ(
        "Can I add text or notes to the PDF?",
        "Not directly through this tool. JPG-to-PDF is purely a conversion. To add page numbers, use [Number PDF Pages](/number-pdf-pages) afterwards. To overlay a watermark or label, use a watermark tool on the output."
      ),
    ],
    relatedTools: [
      { slug: "pdf-to-jpg", label: "PDF to JPG" },
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "rotate-pdf", label: "Rotate PDF" },
    ],
  },

  "merge-pdf": {
    sections: [
      createAnswerFirstSection(
        "How Merging a PDF Actually Works",
        "Merging combines several PDF files into one document by copying every page from each source into a single new file. The tool reads each input, walks its page tree (the structure defined in the PDF 1.7 specification, ISO 32000-1), and appends the pages to a fresh document in whatever order you arranged them. Fonts, embedded images, and bookmarks come along; cross-document hyperlinks usually do not, because they were anchored to filenames that no longer exist.",
        "Drag the files into the upload zone, reorder them by dragging the thumbnails, and press merge. A common workflow is assembling a coursework portfolio at 11pm: cover sheet PDF, three essays exported from Word, a scanned signed declaration, and a bibliography. Five files in, one file out, ready for the upload deadline."
      ),
      createAnswerFirstSection(
        "Edge Cases to Know About",
        "Some PDFs cannot be merged. Files protected with a user-password (the one a viewer prompts for on open) cannot be read at all without that password. Files with owner-password restrictions can sometimes be processed, depending on what permissions the owner set. Encrypted PDFs from corporate document management systems often refuse to merge until the encryption is removed.",
        "Form fields are another snag. If two PDFs both contain a field called 'Name', the merged file will have two fields with the same name, and most viewers will mirror typing in one to the other. To avoid this, [Flatten PDF](/flatten-pdf) each source before merging so the fields become static content."
      ),
      createAnswerFirstSection(
        "Privacy: Nothing Uploads",
        "All merging runs in your browser using pdf-lib. The documents never reach a server, which is the right setting for confidential bundles: payslips, tenancy agreements, divorce paperwork, anything you would not want sitting in a third-party log. The trade-off is browser memory; merging twenty large scanned PDFs at once on a phone can hit limits. On a laptop, files totalling a few hundred MB usually merge in seconds."
      ),
    ],
    faqs: [
      createFAQ(
        "Is there a limit on how many PDFs I can merge?",
        "No fixed limit, but browser memory is the practical ceiling. On a modern laptop you can comfortably merge 20+ files totalling several hundred MB. On a phone, work in smaller batches if files are large. If the tool stalls, split the job in half and merge the halves separately."
      ),
      createFAQ(
        "Will the merged PDF preserve bookmarks?",
        "Bookmarks within each source are usually preserved and pointed at the new page positions in the merged file. Cross-document links (one PDF linking to another by filename) will not work after merging because the filenames no longer apply."
      ),
      createFAQ(
        "Why is my merged file so much bigger than the originals?",
        "Each source PDF carries its own embedded fonts, images, and metadata. Merging does not deduplicate these resources, so a merge of five files each containing the same font will embed that font five times. To reduce size afterwards, run a compression tool, or convert via [PDF to JPG](/pdf-to-jpg) and rebuild from images."
      ),
      createFAQ(
        "Can I merge a password-protected PDF?",
        "Only if you remove the password first. The browser cannot read inside an encrypted file without the key. If you have the password, open the file in a desktop reader, save an unprotected copy, then merge. If you do not, the document's owner needs to provide an unprotected version."
      ),
    ],
    relatedTools: [
      { slug: "split-pdf", label: "Split PDF" },
      { slug: "rotate-pdf", label: "Rotate PDF" },
      { slug: "delete-pdf-pages", label: "Delete PDF Pages" },
    ],
  },

  "number-pdf-pages": {
    sections: [
      createAnswerFirstSection(
        "Adding Page Numbers Without Breaking the Layout",
        "Page numbering is one of those small jobs that seems trivial until you try it on a 90-page thesis at midnight. The tool above stamps numbers onto each page using one of pdf-lib's StandardFonts (Helvetica by default, which avoids font-embedding issues). You pick the corner: bottom-centre is the academic norm, bottom-right matches most legal documents, top-right works for double-sided binding.",
        "The starting number defaults to 1, but you can offset it. If your front matter (title page, abstract, contents) uses Roman numerals i to vii and the main body should start at 1 on what is technically page 8 of the file, set the starting number and the first numbered page accordingly. The tool keeps the original page sizes and orientation, so a mix of A4 portrait and A3 landscape pages will all get numbers in the right place."
      ),
      createAnswerFirstSection(
        "Numbering Formats and What They Look Like",
        "The tool supports plain numbers (1, 2, 3), the format 'Page X', and 'X of Y'. The 'X of Y' style is useful for printed documents where readers might lose pages: a court bundle marked '47 of 120' tells you immediately if something is missing. Roman numerals are useful for prefaces but uncommon in main text.",
        "Font size of 10pt to 12pt is standard for body documents; larger thesis bindings use 14pt. Avoid stamping numbers right at the page edge if the document will be printed and trimmed, since printers usually need a 5mm safety margin. The tool keeps numbers 30 points (about 10mm) from the edge by default."
      ),
      createAnswerFirstSection(
        "Privacy and File Handling",
        "Numbering happens entirely in your browser. The PDF is read into memory, page numbers are drawn onto each page using pdf-lib, and a new file is offered for download. Nothing uploads anywhere, which matters for documents like tribunal bundles or medical records where confidentiality is non-negotiable.",
        "If you are preparing the document for a final submission, follow up with [Flatten PDF](/flatten-pdf) so the numbers cannot be edited out, and use [Protect PDF](/protect-pdf) to add a password if the receiving party requires one. A common bundle workflow is: merge the sources, number the pages, flatten, then protect."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I skip page numbers on the cover or title page?",
        "Yes. Set the starting page so numbering begins on page 2, 3, or wherever you prefer. The earlier pages stay untouched. For more complex needs (skip page 1, number 2 to 4 in Roman, restart at 1 on page 5), you would need a desktop editor like LibreOffice."
      ),
      createFAQ(
        "Will the page numbers cover up existing content?",
        "Possibly, if your pages have content right at the edge. The tool stamps numbers in the margin and tries to stay clear of usual content areas, but a page with a footer that already runs to the bottom edge will overlap. Preview the result and adjust the position or font size if needed."
      ),
      createFAQ(
        "Are the page numbers selectable text or images?",
        "They are real text drawn into the page using a standard PDF font (Helvetica). That means they are searchable, copyable, and screen-reader-friendly. They are not form fields, so flattening or further processing leaves them in place."
      ),
      createFAQ(
        "Can I change the colour of the page numbers?",
        "The default is black, which works on white pages. The tool does not currently expose a colour picker. If you need numbers on a dark-background page (a presentation export, for instance), you would need a desktop PDF editor that supports custom colour stamping."
      ),
    ],
    relatedTools: [
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "flatten-pdf", label: "Flatten PDF" },
      { slug: "rotate-pdf", label: "Rotate PDF" },
    ],
  },

  "pdf-to-jpg": {
    sections: [
      createAnswerFirstSection(
        "How PDF to Image Conversion Works",
        "A PDF is not really an image; it is a programme for drawing pages. To convert it to JPG or PNG, the tool has to actually run that programme: load each page, render the fonts, draw the vector shapes, paste in the embedded images, and capture the result as a bitmap. The tool above uses pdf.js, the same Mozilla rendering engine that powers Firefox's built-in PDF viewer, so what you see in the export matches what the file looks like on screen.",
        "The scale setting controls render resolution. 1x produces an image at the page's native size (roughly 72 DPI), which is fine for previews. 2x doubles the linear dimensions for sharper output (about 144 DPI), and 3x or 4x is closer to print quality. Higher scale means longer render time and bigger files; for a typical screen-shared image, 2x JPG at 80% quality is a good default."
      ),
      createAnswerFirstSection(
        "JPG vs PNG: When to Pick Which",
        "JPG uses lossy JPEG-DCT compression, the same algorithm as your phone camera. It is excellent for photographs and complex artwork, where small compression artefacts blend into the noise of the image. File sizes are small, but you cannot reduce quality and recover detail later.",
        "PNG uses lossless Flate compression. It keeps every pixel exactly, which makes it the right pick for screenshots, line drawings, scans of text, or anything with sharp edges. PNGs of text-heavy pages stay crisp; JPGs of the same pages tend to develop visible halos around letters, especially at lower quality settings. Choose PNG if the rendered page contains mostly text or vector graphics."
      ),
      createAnswerFirstSection(
        "Browser-Only, No Uploads",
        "Rendering happens entirely in your browser using pdf.js. The original PDF is never sent to a server, and neither are the resulting images. That is the right model for converting confidential PDFs to images: solicitor's letters, salary slips, NHS correspondence. Free online converters that upload to a server log every conversion they do.",
        "Mobile browsers will struggle with very long PDFs at high scale settings. A 100-page document at 4x scale generates around 100 large bitmaps in memory simultaneously. If you hit a wall, drop the scale or use [Split PDF](/split-pdf) to break the file into chunks first. For the reverse conversion, [JPG to PDF](/jpg-to-pdf) bundles images back into a single document."
      ),
    ],
    faqs: [
      createFAQ(
        "What resolution will my exported images be?",
        "It depends on the scale you choose. 1x gives roughly 72 DPI (screen quality), 2x gives about 144 DPI (decent print preview), 3x gives 216 DPI, and 4x approaches 288 DPI which is near print quality. The actual pixel dimensions depend on the original page size."
      ),
      createFAQ(
        "Can I extract images from inside the PDF, or only render the pages?",
        "This tool renders complete pages. To pull out individual embedded images (a JPG that was inserted into the PDF), you would need a different extraction tool. Rendering produces one image per page; extraction would produce one file per embedded asset."
      ),
      createFAQ(
        "Will text in the exported images be searchable?",
        "No. JPG and PNG are bitmap formats with no text layer. Once a page is rendered to an image, the text becomes pixels. If you need searchable output, keep the file as a PDF, or run OCR on the images afterwards."
      ),
      createFAQ(
        "Why is my JPG output blurrier than the original?",
        "Two likely reasons. First, the scale may be too low; bump it to 2x or 3x. Second, JPG compression at lower quality settings introduces visible artefacts, especially around text. Switch to PNG for sharp text or raise the JPG quality setting."
      ),
    ],
    relatedTools: [
      { slug: "jpg-to-pdf", label: "JPG to PDF" },
      { slug: "split-pdf", label: "Split PDF" },
      { slug: "rotate-pdf", label: "Rotate PDF" },
    ],
  },

  "protect-pdf": {
    sections: [
      createAnswerFirstSection(
        "What Password Protection Actually Does",
        "Modern PDFs support AES-256 encryption, the same standard used for online banking and disk encryption. When you password-protect a PDF, the file's content is genuinely scrambled; without the password, no PDF reader can show the text or images. This is real cryptographic protection, not a lock that says 'please do not enter'. The PDF specification (ISO 32000-1) defines two types of password: a user password (needed to open the file) and an owner password (needed to change permissions like printing or copying).",
        "The tool above sets an owner password and applies the permission flags you choose. You can allow or block printing and copying. Anyone opening the file in a normal reader will see the document, but actions you have blocked will be greyed out. To require a password just to open the file, you would need a tool that sets the user password instead."
      ),
      createAnswerFirstSection(
        "Choosing a Password That Will Survive",
        "PDF passwords are brute-forceable, even AES-256 ones, if the password itself is weak. A four-character password can be cracked in seconds; a six-character one in minutes. Use at least twelve characters with a mix of letters, numbers, and punctuation, or a passphrase of four random words. Avoid dictionary words alone, names, dates, or anything you have used elsewhere; password lists from past data breaches are the first thing crackers try.",
        "Whoever you send the file to needs the password through a separate channel. Email is usually fine for moderately sensitive content if the password goes by text or a different mailbox. For genuinely sensitive material (legal disclosure, medical records, source-protected journalism), use a password-manager-generated string and an encrypted messaging app like Signal."
      ),
      createAnswerFirstSection(
        "Privacy and What 'Browser-Only' Means Here",
        "All encryption happens in your browser using pdf-lib. The PDF and the password never leave your device. That distinction matters: services that upload your file to encrypt it have, by definition, seen the unencrypted contents. For an NDA-bound document or a contract under negotiation, that is unacceptable. The trade-off is that browser-based encryption is slower than a desktop tool for very large files; expect a few seconds per hundred pages on a laptop, longer on a phone.",
        "After protecting, follow up with [Flatten PDF](/flatten-pdf) if you want to lock down form fields too. To restrict editing while keeping the file open without a password, just enable the permission flags without setting a strong password (note: this is much weaker, since users can usually remove permission-only restrictions easily)."
      ),
    ],
    faqs: [
      createFAQ(
        "Is the encryption strong enough for confidential documents?",
        "AES-256 is genuinely strong; the weakness is the password, not the algorithm. With a long random passphrase, the file is secure against any realistic attack short of state-actor resources. With a weak password ('Password1', 'Welcome123'), it can be broken in seconds. The tool's strength is only as good as the secret you choose."
      ),
      createFAQ(
        "Can I remove the password later?",
        "Yes, if you have the password. Open the file in a PDF editor, enter the password, and save an unprotected copy. The browser-based tool cannot remove a password it does not know, since the file is genuinely encrypted, not just 'flagged' as protected."
      ),
      createFAQ(
        "What is the difference between user and owner passwords?",
        "A user password is required to open the file at all. An owner password lets the holder change permissions (printing, copying, editing) but does not block opening. Most consumer use cases want a user password for true confidentiality. The tool here sets owner-password style restrictions; for a full open-password lock, you would need a different workflow."
      ),
      createFAQ(
        "Will printing or copying restrictions actually stop a determined recipient?",
        "Not really. Permission-only restrictions (without a strong open password) can be bypassed in minutes with widely available tools, since the file content is not encrypted, only flagged. They are a deterrent for casual users, not a real barrier. For documents where unauthorised copying matters, use a strong user password instead."
      ),
    ],
    relatedTools: [
      { slug: "flatten-pdf", label: "Flatten PDF" },
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "number-pdf-pages", label: "Number PDF Pages" },
    ],
  },

  "rotate-pdf": {
    sections: [
      createAnswerFirstSection(
        "How PDF Rotation Works (and Why It Is Free)",
        "Rotating a PDF page does not re-render anything. The PDF specification (ISO 32000-1) lets each page carry a Rotate property that takes one of four values: 0, 90, 180, or 270 degrees. The tool above just changes that property. The text stays text, embedded images stay at full resolution, and the file size barely changes. That is why rotation is instant even on a 200-page document.",
        "The most common reason to rotate is a scan that came out wrong. Office multifunction devices and phone scanner apps often misjudge orientation, especially for landscape pages mixed in with portrait. Sideways scans of contracts, upside-down photos in a portfolio, or a single page in the middle of a thesis that auto-flipped - rotating fixes them in seconds without touching the underlying content."
      ),
      createAnswerFirstSection(
        "Per-Page vs Whole-Document Rotation",
        "Most rotation tools force you to rotate every page the same way. This one lets you click each thumbnail to rotate just that page, or use the bulk-rotate buttons to spin the whole document at once. That matters for mixed bundles: a court bundle where most pages are portrait but the disclosure exhibits are landscape and need separate orientation.",
        "After rotation, the page looks correct in any standards-compliant viewer (Acrobat, Preview, Chrome's built-in viewer, mobile readers). Older or non-compliant viewers may ignore the Rotate property and display the page in its stored orientation, but those are increasingly rare. If you need rotation that survives any viewer, you would need a tool that actually re-renders the page bitmap, which is a different operation."
      ),
      createAnswerFirstSection(
        "Browser-Only, No File Upload",
        "Rotation runs entirely client-side using pdf-lib. The document is read into your browser's memory, the Rotate property is updated, and the file is offered back as a download. The original never travels to a server. For solicitor letters, payslips, exhibit bundles, or anything with personal information, this is the only sensible model.",
        "Mobile browsers handle most rotations easily, since the operation is structural rather than computational. Very large encrypted PDFs are the usual exception; they need to be decrypted first before pdf-lib can modify them. If you have a final document that needs both rotation fixed and form fields locked, follow rotation with [Flatten PDF](/flatten-pdf)."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I rotate just a single page without affecting the rest?",
        "Yes. Click the thumbnail of the page you want to rotate and use the rotate button on that thumbnail. Each page has its own rotation setting, so you can mix orientations freely. To rotate everything together, use the bulk rotate buttons instead."
      ),
      createFAQ(
        "Will rotation reduce my file size?",
        "Not noticeably. Rotation just sets a metadata flag on each page; it does not re-encode any content. Expect the rotated file to be within a kilobyte or two of the original size. To actually shrink a PDF, you need a compression tool that recompresses embedded images."
      ),
      createFAQ(
        "Why does my rotated PDF still look sideways in some apps?",
        "A few older PDF viewers ignore the Rotate property and render pages in their stored orientation. This is rare in modern viewers (Acrobat, Edge, Chrome, Preview, mobile PDF readers). If you must support an old viewer, you would need a tool that physically re-renders pages, which is not how lightweight rotation works."
      ),
      createFAQ(
        "Can I rotate password-protected PDFs?",
        "Only if the file is decrypted first. Browser PDF libraries cannot modify an encrypted document without the password. If you have the password, open the file in a desktop reader and save an unprotected copy; if you do not, the document's owner needs to provide one."
      ),
    ],
    relatedTools: [
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "split-pdf", label: "Split PDF" },
      { slug: "crop-pdf", label: "Crop PDF" },
    ],
  },

  "split-pdf": {
    sections: [
      createAnswerFirstSection(
        "Three Ways to Split a PDF",
        "There is no single 'split' operation in the PDF specification, so the tool offers three patterns. Extract pulls out specific pages you select and saves them as one new file - useful for grabbing pages 5 to 12 of a long contract. Individual splits the document so every page becomes its own file - handy when you need to upload each page of a 30-page bank statement to a portal that accepts one PDF at a time. Custom ranges let you write expressions like '1-5, 8, 11-15' to produce multiple output files, one per range.",
        "Internally each mode does the same thing: it creates a new PDF document, copies the chosen pages from the source page tree, and writes a file. Fonts, embedded images, and annotations on the kept pages come along. Bookmarks and links pointing outside the kept range are dropped, since they no longer have anywhere to go."
      ),
      createAnswerFirstSection(
        "When to Split vs When to Extract or Delete",
        "Split is the right choice when you want multiple smaller PDFs from one source. If you only need one slice and want to throw the rest away, [Extract PDF Pages](/extract-pdf-pages) is more direct. If you want to keep most of the document and just remove a few pages, [Delete PDF Pages](/delete-pdf-pages) is the natural fit.",
        "A common workflow is splitting a multi-statement bank export. A bank might give you 12 monthly statements bundled into one file. Splitting by individual page or custom ranges separates them so each month is its own attachment, ready for an accountant or expense system. The split runs locally, so the statements never sit in a third-party server's logs."
      ),
      createAnswerFirstSection(
        "Browser-Only Processing",
        "Splitting happens entirely in your browser using pdf-lib. The PDF is read into memory, the page subsets are extracted, and the resulting files are offered as direct downloads. Nothing uploads anywhere, which is the right setting for personal documents (medical records, legal correspondence, tax paperwork) where confidentiality is the whole point.",
        "Splitting is fast for documents under 100MB on most devices. Very large files can hit browser memory limits, especially on phones; if a split stalls, try the Extract mode for just the pages you actually need rather than splitting into individuals. Encrypted PDFs need to be decrypted first, since the browser cannot read inside without the password."
      ),
    ],
    faqs: [
      createFAQ(
        "How do I write a custom range like '1-5, 8, 11-15'?",
        "Use commas to separate ranges and dashes for spans. '1-5' means pages 1 through 5. '8' means just page 8. '11-15' means 11 through 15. Combine them with commas: '1-5, 8, 11-15' produces three output PDFs. White space around commas is allowed."
      ),
      createFAQ(
        "Will splitting reduce the file sizes?",
        "Yes, usually significantly. Each split file only contains the pages you kept, plus the resources those pages need (fonts, images). For a long document where every page references the same fonts, the savings can be substantial; for a document where each page has unique embedded photos, less so."
      ),
      createFAQ(
        "Can I split a scanned PDF the same way?",
        "Yes. A scanned PDF is just a PDF where each page is an image, so splitting works identically. The only thing you cannot do with a scan is search inside the resulting files, since there is no extractable text without OCR."
      ),
      createFAQ(
        "What happens to bookmarks when I split?",
        "Bookmarks pointing at pages within the kept range usually survive and renumber to their new position. Bookmarks pointing at removed pages are dropped, since their targets no longer exist in the new file."
      ),
    ],
    relatedTools: [
      { slug: "merge-pdf", label: "Merge PDF" },
      { slug: "extract-pdf-pages", label: "Extract PDF Pages" },
      { slug: "delete-pdf-pages", label: "Delete PDF Pages" },
    ],
  },

  "watermark-pdf": {
    sections: [
      createAnswerFirstSection(
        "What the Watermarker Adds to Your PDF",
        "Upload a PDF and the tool adds a text watermark - 'DRAFT', 'CONFIDENTIAL', 'SAMPLE', or anything else you type - on every page of the document. You control text size (defaults to 48pt for diagonal centred watermarks, looks right on most A4 pages), opacity (the default 40% is faint enough to read the underlying document but obvious enough to be noticed), rotation (45 degrees diagonal is standard; 0 degrees gives horizontal text), and colour (grey, red, or blue - red is the conventional choice for 'DRAFT' or 'CONFIDENTIAL' to draw attention).",
        "Position has two main modes: centre, which puts a single large watermark in the middle of each page, and tiled, which repeats the watermark across the entire page in a grid pattern. Centre is the right choice for legal documents and standard 'this is a draft' marking; tiled makes the document much harder to photograph or screenshot without the watermark visible, which is what you want for 'CONFIDENTIAL' content circulated to people who shouldn't share it."
      ),
      createAnswerFirstSection(
        "When to Watermark",
        "Draft contracts and proposals: 'DRAFT' watermark prevents anyone from accidentally treating an unsigned proposal as final. Send the unwatermarked clean version only when the client agrees the contents are settled. Confidential business documents: 'CONFIDENTIAL' watermark on financial reports, board papers, or strategy documents is a visual reminder that the recipient shouldn't forward or share the file. It doesn't enforce anything technically, but it removes plausible deniability if someone shares it anyway.",
        "Sample work for portfolios or pre-purchase preview: photographers, designers, and writers commonly watermark sample work with their name or 'PREVIEW' to deter unauthorised use before payment. The tiled pattern is most effective here because it's much harder for someone to crop or remove. For sensitive personal documents (bank statements, medical records) being sent to a third party for a specific purpose, watermarking with the recipient's name or 'For [Purpose] Only' creates an audit trail discouraging misuse. To genuinely lock down access (rather than discourage misuse), use the [protect PDF](/protect-pdf) tool to add a password instead."
      ),
      createAnswerFirstSection(
        "Watermarks Are Visual, Not Cryptographic",
        "A determined recipient with image editing software can remove a watermark from a flat-rendered PDF page given enough time, especially low-opacity ones. The watermark is a deterrent, not a lock. For genuinely confidential information you don't want people sharing, combine watermarking with PDF password protection (so they can't open it without the password) and access controls (so you control who has the password). The [protect PDF](/protect-pdf) tool handles password protection.",
        "What watermarks do well: flag the document's status (draft, confidential, sample) so anyone glancing at any page can see immediately. Make screenshots and photos of the document obviously watermarked, which makes social media leaks self-incriminating. Add a paper trail (especially with named-recipient watermarks) so you know which copy leaked if multiple copies exist. They don't prevent removal by a skilled adversary, but they raise the friction of casual misuse from zero to non-trivial."
      ),
      createAnswerFirstSection(
        "Browser-Only Processing",
        "The watermarking happens entirely in your browser using pdf-lib. Your PDF never uploads to any server, never gets stored, never gets logged. Once you close the tab, the only copies are the original on your device and the watermarked version you downloaded. This is the right architecture for confidential documents - the worst version of this tool would upload your contract draft to a server in another country, watermark it there, and email back a link.",
        "Performance is good for most documents under 100MB. Very large PDFs (200+ pages with embedded images) can take 10-30 seconds to process and may strain phone browsers. If a watermark stalls, try a smaller font size or move from tiled to centre mode (tiled adds many text instances per page and is heavier than a single centred watermark)."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I add a logo or image as a watermark instead of text?",
        "Currently the tool supports text watermarks only. For image watermarks (logo, signature, brand mark), specialised PDF editors like Adobe Acrobat or PDF24 offer image overlay. If you need an image watermark and only have a text-watermark tool, you can sometimes create a single-page PDF containing only the image, then use the [merge PDF](/merge-pdf) tool to overlay it - but proper image watermarking is a different feature."
      ),
      createFAQ(
        "Why does my watermark look different on landscape pages?",
        "The text size is fixed regardless of page orientation, so the same 48pt text takes a smaller proportion of a wide landscape page than a tall portrait page. For mixed-orientation documents, you may want to use a smaller font size that looks correct on landscape pages, or run two separate watermarking passes for the portrait and landscape pages individually."
      ),
      createFAQ(
        "Can I remove a watermark I added earlier?",
        "Not with this tool. PDF watermarks added via direct text drawing become part of the page's drawing instructions and removing them requires editing the PDF's content stream. If you have the original unwatermarked version, just use that. If not, the watermark is essentially permanent. The lesson: keep the original, don't watermark over your only copy."
      ),
      createFAQ(
        "Will the watermark appear if someone prints the PDF?",
        "Yes - the watermark is rendered as part of the page content, so it appears in print, on screen, in any export to image, and in screenshots. The whole point of a watermark is that it propagates to every visual rendering of the document. The only way to print without the watermark is to have the original unwatermarked version."
      ),
      createFAQ(
        "What opacity should I use?",
        "30-50% for diagonal 'DRAFT' or 'SAMPLE' watermarks - faint enough that the underlying text is readable, obvious enough to notice. 60-80% for 'CONFIDENTIAL' or 'NOT FOR DISTRIBUTION' where you want the watermark itself to be the dominant visual. Below 25% the watermark becomes nearly invisible on pages with photos or graphics. Above 80% the document text becomes hard to read."
      ),
    ],
    relatedTools: [
      { slug: "protect-pdf", label: "Protect PDF" },
      { slug: "number-pdf-pages", label: "Number PDF Pages" },
      { slug: "merge-pdf", label: "Merge PDF" },
    ],
  },
};
