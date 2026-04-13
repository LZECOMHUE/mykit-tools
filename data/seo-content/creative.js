// SEO content for creative/image tools
// RULE: Never use em dashes. Use commas, "or", semicolons, or " - " instead.

import { createAnswerFirstSection, createFAQ } from "@/components/tools/ToolSEOContent";

export const creativeSEO = {
  "pixelate-image": {
    sections: [
      createAnswerFirstSection(
        "How to Pixelate an Image Online",
        "Upload any image, choose a pixel block size, and the tool instantly applies a mosaic pixelation effect. You can pixelate the entire image or switch to region mode and drag a box over just the area you want to blur out. The result downloads as PNG or JPG.",
        "Pixelation works by dividing the image into square blocks and replacing each block with a single averaged colour. A larger block size creates a stronger, more abstract effect. A smaller block size keeps more detail visible while still obscuring fine features like text or faces."
      ),
      createAnswerFirstSection(
        "Common Uses for Image Pixelation",
        "The most popular use is censoring sensitive information before sharing screenshots or photos online. This includes blurring out faces for privacy, hiding licence plates, obscuring personal details in documents, or masking usernames and email addresses in screenshots.",
        "Pixelation is also used creatively. Designers use heavy pixelation for retro or 8-bit style graphics. Thumbnail designers pixelate parts of an image to create curiosity. Social media managers use it to obscure spoilers or sensitive content while still showing context."
      ),
      {
        heading: "Pixel Block Size Guide",
        table: {
          headers: ["Block Size", "Effect", "Best For"],
          rows: [
            ["2-4px", "Subtle softening", "Light privacy blur, slight texture"],
            ["8-12px", "Clear pixelation", "Censoring text, small details"],
            ["16-24px", "Strong mosaic", "Hiding faces, licence plates"],
            ["32-48px", "Heavy abstraction", "Retro art, thumbnails, full obscuring"],
          ],
        },
      },
      createAnswerFirstSection(
        "Region Pixelation for Targeted Censoring",
        "Switch to 'Select Region' mode and drag a rectangle over the specific area you want to pixelate. The rest of the image stays perfectly sharp. This is ideal for censoring a single face in a group photo, hiding one line of text in a screenshot, or blurring a number plate while keeping the rest of the car visible.",
        "The region selection works on both desktop (click and drag) and mobile (touch and drag). You can redraw the region as many times as you need before downloading."
      ),
    ],
    faqs: [
      createFAQ(
        "Can pixelation be reversed?",
        "No. Pixelation permanently destroys detail by averaging pixel data into blocks. Once an image is pixelated and saved, the original detail cannot be recovered. This is why pixelation is a reliable method for censoring sensitive information, unlike simple blurring which can sometimes be partially reversed with AI tools."
      ),
      createFAQ(
        "What pixel block size should I use to hide faces?",
        "A block size of 16 to 24 pixels is usually enough to make a face completely unrecognisable. For smaller faces in the background of a photo, 12px may be sufficient. Always check the result at full zoom before sharing to make sure no identifying features are visible."
      ),
      createFAQ(
        "Is this tool free to use?",
        "Yes, completely free with no limits. Your images are processed entirely in your browser and are never uploaded to any server. Nothing leaves your device."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "invert-image-colors", label: "Invert Image Colors" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
    ],
  },

  "image-resizer": {
    sections: [
      createAnswerFirstSection(
        "How to Resize an Image Online",
        "Upload your image, enter a new width or height (the other dimension adjusts automatically to keep proportions), and download the resized version. You can also resize by percentage or pick a preset for social media platforms like Instagram, Twitter, Facebook, and YouTube.",
        "The aspect ratio lock is enabled by default, which prevents your image from being stretched or squashed. Toggle it off if you need a specific width and height that differs from the original proportions, for example when creating a square crop from a landscape photo."
      ),
      {
        heading: "Social Media Image Sizes",
        table: {
          headers: ["Platform", "Type", "Recommended Size"],
          rows: [
            ["Instagram", "Post", "1080 x 1080px"],
            ["Instagram", "Story", "1080 x 1920px"],
            ["Twitter / X", "Post", "1200 x 675px"],
            ["Facebook", "Cover Photo", "820 x 312px"],
            ["YouTube", "Thumbnail", "1280 x 720px"],
            ["LinkedIn", "Post", "1200 x 627px"],
          ],
        },
      },
      createAnswerFirstSection(
        "Why Resize Images?",
        "Resizing reduces file size for faster website loading, meets upload requirements for social media platforms, and fits images into specific layouts. A 4000px wide photo from a modern phone is far larger than needed for most online uses, and resizing to 1200px wide can reduce the file size by 80% or more.",
        "For email attachments, most providers limit files to 25 MB. Resizing a batch of holiday photos from their original 6000px width down to 1600px makes them small enough to email without quality loss that is visible on screen."
      ),
    ],
    faqs: [
      createFAQ(
        "Does resizing reduce image quality?",
        "Reducing an image's dimensions slightly softens detail because pixel information is merged. For most practical purposes (web, social media, email), the difference is invisible. Enlarging an image beyond its original size will noticeably reduce sharpness, since the tool must invent new pixels."
      ),
      createFAQ(
        "What is the maximum image size supported?",
        "This tool supports images up to 16,384 pixels in either dimension, which covers virtually all photographs and design files. The processing happens entirely in your browser, so very large images may take a moment on older devices."
      ),
      createFAQ(
        "Are my images uploaded to a server?",
        "No. All resizing happens locally in your browser using the HTML Canvas API. Your images never leave your device, making this tool safe for sensitive or private photos."
      ),
    ],
    relatedTools: [
      { slug: "crop-image", label: "Crop Image" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "png-to-jpg", label: "PNG to JPG" },
    ],
  },

  "image-compressor": {
    sections: [
      createAnswerFirstSection(
        "How to Compress an Image Without Losing Quality",
        "Upload your image, adjust the quality slider to find the sweet spot between file size and visual quality, and download the compressed version. The tool shows you the original and compressed file sizes in real time, so you can see exactly how much space you are saving.",
        "A quality setting of 80% typically reduces file size by 60-70% with no visible difference on screen. Below 50%, compression artefacts (blocky patches, colour banding) become noticeable. The preview lets you check the result before downloading."
      ),
      createAnswerFirstSection(
        "JPG vs WebP Compression",
        "JPG is the most widely supported format and works everywhere, from browsers to email clients to social media. WebP produces smaller files at the same visual quality (typically 25-35% smaller than JPG), but older software may not open it.",
        "If you are compressing images for a website, WebP is the better choice since all modern browsers support it. For email attachments, social media uploads, or sharing with others, JPG is the safer option because compatibility is guaranteed."
      ),
      {
        heading: "Compression Quality Guide",
        table: {
          headers: ["Quality", "File Size Reduction", "Visual Result"],
          rows: [
            ["90-100%", "20-40% smaller", "Virtually identical to original"],
            ["70-85%", "50-70% smaller", "No visible difference on screen"],
            ["50-65%", "70-80% smaller", "Slight softening on close inspection"],
            ["20-45%", "80-90% smaller", "Noticeable artefacts, good for thumbnails"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the best quality setting for web images?",
        "Between 75% and 85% for JPG. This range gives excellent visual quality while cutting file size by roughly 60%. Google recommends keeping web images under 200 KB where possible for fast page loading."
      ),
      createFAQ(
        "Does compression remove image metadata?",
        "Yes. When the image is re-encoded through the canvas, EXIF data (camera model, GPS location, date taken) is stripped. This is actually a privacy benefit if you are sharing photos online."
      ),
      createFAQ(
        "Can I compress PNG files?",
        "This tool converts your image to JPG or WebP for compression. PNG is a lossless format that does not support quality-based compression. If you need to keep the PNG format, try reducing the image dimensions with the Image Resizer instead."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "png-to-jpg", label: "PNG to JPG" },
      { slug: "jpg-to-png", label: "JPG to PNG" },
    ],
  },

  "rotate-image": {
    sections: [
      createAnswerFirstSection(
        "How to Rotate an Image Online",
        "Upload any image and rotate it by 90, 180, or 270 degrees with one click. For precise adjustments, use the custom angle slider to rotate by any amount from 0 to 359 degrees. The rotated image is available to download as PNG or JPG.",
        "Quick rotation buttons handle the most common needs: fixing a photo taken in the wrong orientation, turning a landscape image to portrait, or flipping an upside-down scan. The custom angle slider is useful for straightening a slightly crooked photo or creating artistic tilted effects."
      ),
      createAnswerFirstSection(
        "When You Need to Rotate Images",
        "The most common scenario is fixing phone photos that saved in the wrong orientation. This happens when the phone's accelerometer misreads the position, leaving you with a sideways or upside-down photo. A single 90-degree rotation fixes it instantly.",
        "Other uses include straightening scanned documents that went through the scanner at a slight angle, rotating product photos to match a consistent layout for an online store, and adjusting architectural or landscape photos where the horizon is not quite level."
      ),
    ],
    faqs: [
      createFAQ(
        "Does rotating an image reduce quality?",
        "Rotating by exactly 90, 180, or 270 degrees is mathematically lossless for the pixel data. Rotating by other angles requires resampling, which can introduce a very slight softening. For practical purposes the quality difference is negligible."
      ),
      createFAQ(
        "Why does the image size change when I rotate by a custom angle?",
        "When you rotate an image by an angle that is not a multiple of 90 degrees, the canvas must expand to fit the tilted rectangle. The tool automatically calculates the new bounding box so no part of your image is cropped off."
      ),
    ],
    relatedTools: [
      { slug: "flip-image", label: "Flip Image" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
  },

  "flip-image": {
    sections: [
      createAnswerFirstSection(
        "How to Flip or Mirror an Image Online",
        "Upload your image and click Flip Horizontal to mirror it left to right, Flip Vertical to flip it upside down, or Flip Both for a 180-degree mirror. The tool shows your original and flipped images side by side so you can compare them instantly.",
        "Horizontal flipping (mirroring) is the most commonly needed operation. It reverses the image as if you were looking at it in a mirror. Vertical flipping turns the image upside down, which is useful for correcting inverted scans or creating reflection effects."
      ),
      createAnswerFirstSection(
        "Common Uses for Flipping Images",
        "Selfie correction is the number one use. Phone cameras mirror selfies by default, which makes text in the background appear backwards. Flipping the image horizontally restores the correct orientation.",
        "Designers flip images to change the visual direction of a composition. If a person in a photo faces left but the layout needs them facing right, a horizontal flip solves it without reshooting. Flipping is also used to create symmetrical patterns, mirror reflections for artistic effects, and correct scanned images that were placed face-down the wrong way."
      ),
    ],
    faqs: [
      createFAQ(
        "Is flipping the same as rotating?",
        "No. Flipping mirrors the image along an axis, reversing it like a reflection. Rotating turns the image around its centre point. A horizontally flipped image has left and right swapped. A 180-degree rotated image has top and bottom swapped AND left and right swapped."
      ),
      createFAQ(
        "Will flipping affect image quality?",
        "No. Flipping is a lossless operation that simply rearranges existing pixels without any resampling or compression. The flipped image is identical in quality to the original."
      ),
    ],
    relatedTools: [
      { slug: "rotate-image", label: "Rotate Image" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
  },

  "crop-image": {
    sections: [
      createAnswerFirstSection(
        "How to Crop an Image Online",
        "Upload an image, then click and drag to draw a crop selection. Choose a preset aspect ratio (1:1 for square, 16:9 for widescreen, 4:3 for standard) or crop freely to any shape. The tool shows the exact pixel dimensions of your selection in real time. Click Apply Crop and download.",
        "The crop area has draggable corner handles so you can fine-tune the selection after drawing it. A dark overlay shows what will be removed, making it easy to see exactly what your final image will look like."
      ),
      {
        heading: "Common Aspect Ratios and Their Uses",
        table: {
          headers: ["Ratio", "Pixels Example", "Used For"],
          rows: [
            ["1:1", "1080 x 1080", "Instagram posts, profile pictures, app icons"],
            ["16:9", "1920 x 1080", "YouTube videos, presentations, desktop wallpapers"],
            ["9:16", "1080 x 1920", "Instagram Stories, TikTok, phone wallpapers"],
            ["4:3", "1600 x 1200", "Traditional photos, iPad screens, presentations"],
            ["3:2", "1800 x 1200", "DSLR photos, print photography, postcards"],
          ],
        },
      },
      createAnswerFirstSection(
        "Tips for Better Crops",
        "Use the rule of thirds when cropping. Place your subject roughly one-third from the edge of the frame rather than dead centre. This creates a more dynamic, professional-looking composition.",
        "When cropping for social media, leave some breathing room around your subject. Platforms sometimes crop thumbnails slightly differently, and a tight crop risks cutting off important details. For profile pictures, make sure the face fills at least 60% of the square frame."
      ),
    ],
    faqs: [
      createFAQ(
        "Does cropping reduce image quality?",
        "Cropping does not compress or resample pixels, so the cropped area retains full original quality. However, the resulting image has fewer total pixels since you are removing the outer portions. A heavily cropped photo from a low-resolution source may not have enough pixels for large prints."
      ),
      createFAQ(
        "Can I crop to a custom size in pixels?",
        "The crop selection shows pixel dimensions in real time as you drag. Choose the Free aspect ratio and drag until the dimensions match what you need. For exact dimensions, pair this tool with the Image Resizer to set precise width and height after cropping."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "rotate-image", label: "Rotate Image" },
      { slug: "pixelate-image", label: "Pixelate Image" },
    ],
  },

  "png-to-jpg": {
    sections: [
      createAnswerFirstSection(
        "How to Convert PNG to JPG",
        "Upload a PNG file and the tool instantly converts it to JPG format. Adjust the quality slider to balance file size and visual quality. If your PNG has transparent areas, choose a background colour (white by default) to fill them, since JPG does not support transparency.",
        "PNG files are often 3 to 10 times larger than the equivalent JPG because PNG uses lossless compression while JPG uses lossy compression. Converting a 5 MB PNG to JPG at 90% quality typically produces a file under 500 KB with no visible quality difference."
      ),
      createAnswerFirstSection(
        "When to Convert PNG to JPG",
        "Convert to JPG when file size matters more than pixel-perfect quality. This includes uploading photos to websites, sending images by email, posting on social media, and storing large photo libraries. JPG is the standard format for photographs.",
        "Keep your image as PNG when you need transparency (logos, icons, overlays), pixel-perfect sharpness (screenshots, diagrams, text-heavy images), or when the image will be edited further. PNG preserves every pixel exactly, while JPG introduces subtle compression artefacts."
      ),
      {
        heading: "PNG vs JPG at a Glance",
        table: {
          headers: ["Feature", "PNG", "JPG"],
          rows: [
            ["Compression", "Lossless (exact pixels)", "Lossy (slight quality loss)"],
            ["File size", "Larger", "Much smaller"],
            ["Transparency", "Supported", "Not supported"],
            ["Best for", "Screenshots, logos, graphics", "Photos, web images, social media"],
            ["Colour depth", "Up to 48-bit", "24-bit"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What happens to transparent areas when converting PNG to JPG?",
        "JPG does not support transparency. Any transparent pixels in your PNG are filled with a solid background colour. The default is white, but you can choose any colour using the colour picker. Black is a common choice for dark-themed graphics."
      ),
      createFAQ(
        "What quality setting should I use?",
        "92% is a good default for most uses. It produces a file roughly 80% smaller than the PNG with imperceptible quality loss. For web use where size matters most, 80-85% is excellent. Below 70%, compression artefacts become visible on close inspection."
      ),
    ],
    relatedTools: [
      { slug: "jpg-to-png", label: "JPG to PNG" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
  },

  "jpg-to-png": {
    sections: [
      createAnswerFirstSection(
        "How to Convert JPG to PNG",
        "Upload a JPG file and the tool instantly converts it to PNG format. No settings are needed. The conversion is lossless, meaning the PNG output is a perfect pixel-for-pixel copy of the JPG input. Download the result with one click.",
        "Note that the PNG file will almost always be larger than the original JPG. This is normal. PNG uses lossless compression which preserves every pixel exactly, while JPG uses lossy compression which achieves smaller sizes by discarding some detail. You are not losing quality by converting, you are preserving the quality that already exists in the JPG."
      ),
      createAnswerFirstSection(
        "When to Convert JPG to PNG",
        "Convert to PNG when you need to edit the image further without accumulating compression artefacts. Each time a JPG is saved, it is re-compressed and loses a tiny amount of detail. Converting to PNG first, editing, and then saving as PNG avoids this quality degradation.",
        "Other reasons include needing a format that supports transparency for compositing work (though the converted file will not have transparency unless you add it in an editor), uploading to a platform that requires PNG, or when you need pixel-exact reproduction for screenshots and documentation."
      ),
    ],
    faqs: [
      createFAQ(
        "Does converting JPG to PNG improve quality?",
        "No. The conversion preserves the existing quality of the JPG but cannot recover detail that was already lost during JPG compression. Think of it like photocopying a photocopy - the copy is faithful, but it cannot be sharper than the source."
      ),
      createFAQ(
        "Why is the PNG file bigger than the JPG?",
        "PNG uses lossless compression, which stores every pixel exactly. JPG uses lossy compression, which discards subtle detail to achieve smaller sizes. The quality already in your JPG is preserved, it just takes more bytes to store it losslessly."
      ),
    ],
    relatedTools: [
      { slug: "png-to-jpg", label: "PNG to JPG" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
  },

  "invert-image-colors": {
    sections: [
      createAnswerFirstSection(
        "How to Invert Image Colours Online",
        "Upload any image and the tool instantly inverts all colours, turning it into a photographic negative. Use the strength slider to control how much inversion is applied, from a subtle shift at 25% to full inversion at 100%. Toggle between the original and inverted views to compare.",
        "Colour inversion replaces each pixel with its opposite on the colour spectrum. White becomes black, red becomes cyan, blue becomes yellow, and green becomes magenta. At partial inversion strengths, the original and inverted colours are blended together, creating unique tonal effects."
      ),
      createAnswerFirstSection(
        "Creative Uses for Colour Inversion",
        "Full inversion creates striking photographic negatives that work well as artistic statements, album covers, or social media posts designed to grab attention. The unfamiliar colour relationships make viewers pause and look more closely.",
        "Partial inversion at 40-60% creates surreal, dreamlike colour palettes that are difficult to achieve with other editing techniques. Designers use this as a starting point for colour exploration, inverting an image and then adjusting individual channels. It is also used in accessibility testing to check how designs look with reversed contrast."
      ),
    ],
    faqs: [
      createFAQ(
        "What does 50% inversion look like?",
        "At 50% strength, each colour is blended halfway between its original value and its inverted value. The result is a flat, grey-ish image with muted colours. Most of the contrast and vibrancy disappears, which creates an eerie, washed-out effect that can be interesting for certain artistic purposes."
      ),
      createFAQ(
        "Can I invert just one colour channel?",
        "This tool inverts all three colour channels (red, green, blue) together. For single-channel inversion, which creates more unusual colour shifts, try the Photo Filter Tool which lets you adjust individual channels independently."
      ),
    ],
    relatedTools: [
      { slug: "sepia-filter", label: "Sepia Filter" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "pixelate-image", label: "Pixelate Image" },
    ],
  },

  "sepia-filter": {
    sections: [
      createAnswerFirstSection(
        "How to Add a Sepia Filter to a Photo",
        "Upload a photo and adjust the sepia intensity slider to apply a warm, brownish tone that replicates the look of aged photographs. Fine-tune the effect with warmth, film grain, and vignette controls, or pick a preset like Classic, Aged Photo, or Light Vintage for instant results.",
        "The sepia tone is created by mapping each pixel's brightness to a warm brown colour palette using the standard sepia matrix formula. Unlike a simple colour overlay, this preserves the luminosity and detail of the original image while shifting the colour palette to warm earth tones."
      ),
      createAnswerFirstSection(
        "Building an Authentic Vintage Look",
        "Real aged photographs have more than just a colour shift. They show film grain from the silver halide crystals, darkened corners from lens vignetting, slightly warm colour casts from paper oxidation, and reduced contrast from fading. This tool lets you layer all of these effects.",
        "Start with 60-70% sepia for a natural aged tone. Add a touch of warmth (20-30%) to push the highlights toward amber. Enable film grain for texture, and turn on vignette to darken the edges. The Aged Photo preset combines all of these for a one-click result."
      ),
      createAnswerFirstSection(
        "Popular Uses for Sepia Effects",
        "Wedding photography often uses light sepia for a romantic, timeless feel. Real estate photography uses it for 'heritage' style shots of older properties. Social media creators use sepia to give a consistent vintage aesthetic to their feeds. Scrapbookers and card makers use it to match modern photos with vintage design themes.",
        "In web design, sepia-toned images create a warm, approachable feel and work well as muted backgrounds that do not compete with text overlays. A light sepia at 20-30% can unify a set of photos that were taken in different lighting conditions."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between sepia and grayscale?",
        "Grayscale removes all colour, producing a neutral black-and-white image. Sepia replaces the colours with warm brown tones, creating a warmer, more nostalgic feel. Sepia is essentially a tinted grayscale. Both remove the original colours, but sepia adds warmth back in."
      ),
      createFAQ(
        "What sepia intensity looks most realistic?",
        "Between 50% and 70%. Below 40%, the effect is too subtle and looks like a slightly warm photo. Above 80%, the brown tone becomes very heavy and starts to look artificial. Real aged photographs typically fall in the 55-65% range."
      ),
      createFAQ(
        "Does the grain effect add to the file size?",
        "Film grain adds random noise to each pixel, which makes the image harder to compress. A sepia photo with grain enabled will produce a slightly larger file when saved as JPG compared to the same photo without grain, typically 10-20% larger."
      ),
    ],
    relatedTools: [
      { slug: "invert-image-colors", label: "Invert Image Colors" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "pixelate-image", label: "Pixelate Image" },
    ],
  },

  "adjust-image-brightness": {
    sections: [
      createAnswerFirstSection(
        "How to Adjust Image Brightness Online",
        "Upload your image and drag the brightness slider left to darken or right to brighten. The preview updates in real time so you can see the effect before downloading. The tool works with JPG, PNG, and WebP files of any size.",
        "Brightness adjustment shifts every pixel's luminance value up or down by a uniform amount. Increasing brightness adds light to all pixels equally, which lifts shadows but can wash out highlights if pushed too far. Decreasing brightness removes light, deepening shadows but potentially losing detail in dark areas."
      ),
      createAnswerFirstSection(
        "When to Adjust Brightness",
        "The most common reason is fixing photos that came out too dark or too light. Indoor photos without flash, backlit subjects, and overcast outdoor shots often need a brightness boost of 10-20% to look natural. Overexposed shots from bright sunlight or flash that fired too close need brightness reduced.",
        "Brightness adjustment is also useful for preparing images for print, since printed images typically appear darker than they do on screen. Bumping brightness up by 5-10% before printing compensates for this. For social media, slightly brighter images tend to perform better in feeds because they catch the eye while scrolling."
      ),
      {
        heading: "Brightness Adjustment Guide",
        table: {
          headers: ["Adjustment", "Effect", "Best For"],
          rows: [
            ["+5 to +15%", "Subtle lift", "Slightly underexposed photos, print preparation"],
            ["+20 to +40%", "Noticeable brightening", "Dark indoor photos, shadow recovery"],
            ["+50% and above", "Heavy brightening", "Artistic effects, creating airy/dreamy looks"],
            ["-5 to -15%", "Subtle darkening", "Slightly overexposed photos, richer colours"],
            ["-20 to -40%", "Noticeable darkening", "Harsh flash correction, moody effects"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What is the difference between brightness and exposure?",
        "Brightness shifts all pixel values by the same amount, which is a simple uniform adjustment. Exposure mimics the effect of changing camera exposure time, affecting highlights and shadows differently. For quick fixes, brightness is simpler and works well. For more natural-looking corrections on photos, exposure adjustment preserves more tonal range."
      ),
      createFAQ(
        "Will increasing brightness make my image look washed out?",
        "It can if you go too far. When bright areas are pushed to pure white, detail is lost and the image looks flat. Keep the adjustment under +30% for natural results. If your image still looks washed out, try increasing contrast alongside brightness to restore depth."
      ),
      createFAQ(
        "Is this processed on my device?",
        "Yes. The brightness adjustment happens entirely in your browser using the HTML Canvas API. Your images are never uploaded to any server."
      ),
    ],
    relatedTools: [
      { slug: "adjust-image-contrast", label: "Adjust Image Contrast" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },

  "adjust-image-contrast": {
    sections: [
      createAnswerFirstSection(
        "How to Adjust Image Contrast Online",
        "Upload your image and use the contrast slider to increase or decrease contrast. Moving right makes darks darker and lights lighter, giving the image more punch. Moving left brings tones closer together, creating a softer, flatter look. The live preview shows changes instantly.",
        "Contrast controls the difference between the lightest and darkest areas of an image. High contrast makes colours and details pop but can clip shadows and highlights. Low contrast creates a muted, even look that can feel vintage or cinematic depending on the subject."
      ),
      createAnswerFirstSection(
        "Brightness vs Contrast - What is the Difference?",
        "Brightness shifts all pixel values in the same direction, making the entire image lighter or darker. Contrast pushes light and dark values apart from each other, stretching or compressing the tonal range. They solve different problems and are often used together.",
        "A dark photo with flat lighting benefits from both a brightness boost and a contrast increase. A photo taken in harsh midday sun may need brightness reduced and contrast reduced to tame the extremes. Adjusting one without the other can leave the image looking unbalanced."
      ),
      {
        heading: "Contrast Adjustment Effects",
        table: {
          headers: ["Adjustment", "Visual Effect", "Best For"],
          rows: [
            ["High increase (+30 to +60%)", "Bold, punchy, dramatic", "Landscapes, architecture, product photos"],
            ["Moderate increase (+10 to +25%)", "Crisp, clean, vibrant", "General photo improvement, social media"],
            ["No change (0%)", "As shot", "Already well-exposed photos"],
            ["Moderate decrease (-10 to -25%)", "Soft, muted, vintage", "Portraits, film look, pastel aesthetic"],
            ["High decrease (-30% and below)", "Flat, washed out", "Artistic effects, background images for text overlay"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Should I adjust contrast or brightness first?",
        "Start with brightness to get the overall exposure right, then adjust contrast to fine-tune the tonal range. If you adjust contrast first, changing brightness afterwards can undo your contrast work. Think of brightness as setting the baseline, and contrast as adding depth."
      ),
      createFAQ(
        "Why does increasing contrast make colours look more vivid?",
        "Higher contrast stretches the difference between colour values, not just light and dark. A slightly blue sky becomes a deeper blue because the blue channel values are pushed further from the midpoint. This is why landscape photographers often boost contrast to make skies and foliage more vivid."
      ),
      createFAQ(
        "Can I adjust both brightness and contrast together?",
        "Yes. Use the Brightness tool and the Contrast tool in sequence. Adjust brightness first, download the result, then upload it to the contrast tool. Or use the Photo Filter Tool which includes both adjustments on a single page."
      ),
    ],
    relatedTools: [
      { slug: "adjust-image-brightness", label: "Adjust Image Brightness" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },

  "webp-to-jpg": {
    sections: [
      createAnswerFirstSection(
        "How to Convert WebP to JPG",
        "Upload a WebP file and the tool instantly converts it to JPG format. Adjust the quality slider to control the balance between file size and visual quality. The default 92% quality produces excellent results for nearly all uses. Download with one click.",
        "WebP is a modern image format developed by Google that produces smaller files than JPG at equivalent quality. However, WebP is not universally supported by older software, email clients, image editors, and some social media platforms. Converting to JPG gives you a file that works everywhere."
      ),
      createAnswerFirstSection(
        "Why Convert WebP to JPG?",
        "The main reason is compatibility. If you have saved an image from a website and it downloaded as a WebP file, you may find that your image editor, email client, or social media platform cannot open it. JPG is the most widely supported image format and works in virtually every application.",
        "Other common reasons include: printing services that only accept JPG or PDF, sharing photos with people who use older devices or software, uploading to platforms that reject WebP, and batch processing workflows built around JPG. While WebP support is growing, JPG remains the universal safe choice."
      ),
      {
        heading: "WebP vs JPG Comparison",
        table: {
          headers: ["Feature", "WebP", "JPG"],
          rows: [
            ["File size", "25-35% smaller at same quality", "Larger"],
            ["Browser support", "All modern browsers", "All browsers, all devices"],
            ["Software support", "Limited in older apps", "Universal"],
            ["Transparency", "Supported", "Not supported"],
            ["Animation", "Supported", "Not supported"],
            ["Best for", "Web delivery, fast loading", "Sharing, printing, editing, archiving"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does converting WebP to JPG lose quality?",
        "There is a small quality reduction because JPG uses lossy compression. If the original WebP was also lossy, you are re-compressing an already compressed image, which can introduce subtle artefacts. At 90-95% quality, the difference is invisible for practical purposes. If you need lossless output, convert to PNG instead."
      ),
      createFAQ(
        "What quality setting should I use for WebP to JPG conversion?",
        "92% is a good default. It produces a file that is visually indistinguishable from the WebP original in almost all cases. For web use where file size matters, 80-85% is fine. For printing or archiving where quality is paramount, use 95-100%."
      ),
      createFAQ(
        "What happens to transparency in WebP files?",
        "JPG does not support transparency. Any transparent areas in the WebP file are filled with a solid background colour (white by default). If you need to preserve transparency, convert to PNG instead."
      ),
    ],
    relatedTools: [
      { slug: "webp-to-png", label: "WebP to PNG" },
      { slug: "jpg-to-webp", label: "JPG to WebP" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "png-to-jpg", label: "PNG to JPG" },
    ],
  },

  "jpg-to-webp": {
    sections: [
      createAnswerFirstSection(
        "How to Convert JPG to WebP",
        "Upload a JPG file and the tool converts it to WebP format instantly. Adjust the quality slider to control compression. At the same visual quality, the WebP file will typically be 25-35% smaller than the original JPG, making it ideal for websites and apps where loading speed matters.",
        "WebP is a modern image format created by Google specifically for the web. It uses more efficient compression algorithms than JPG, achieving smaller file sizes without a visible quality difference. All modern browsers, including Chrome, Firefox, Safari, and Edge, fully support WebP."
      ),
      createAnswerFirstSection(
        "Why Convert JPG to WebP?",
        "Faster websites. Image files are usually the largest assets on a web page, and switching from JPG to WebP can reduce total page weight by 20-30%. This directly improves loading speed, which benefits user experience, SEO rankings, and mobile data usage.",
        "Google's PageSpeed Insights specifically recommends serving images in WebP format. If you manage a website, blog, or online store, converting your JPG images to WebP is one of the simplest performance improvements you can make. Many content management systems now accept WebP uploads directly."
      ),
      {
        heading: "JPG vs WebP File Size Comparison",
        table: {
          headers: ["Image Type", "JPG (85% quality)", "WebP (85% quality)", "Savings"],
          rows: [
            ["Photo (12MP)", "~2.4 MB", "~1.6 MB", "~33%"],
            ["Product image", "~350 KB", "~230 KB", "~34%"],
            ["Blog header", "~180 KB", "~120 KB", "~33%"],
            ["Thumbnail", "~25 KB", "~17 KB", "~32%"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Do all browsers support WebP?",
        "Yes, all modern browsers support WebP, including Chrome, Firefox, Safari (since version 14, released 2020), Edge, and Opera. The only browsers that do not support WebP are Internet Explorer and very old versions of Safari. For websites, you can serve WebP with a JPG fallback using the HTML picture element."
      ),
      createFAQ(
        "When should I NOT convert to WebP?",
        "Keep your images as JPG if you need maximum compatibility with older software, email clients, or print services. Also keep the original JPG if you plan to edit the image further, since each re-encoding introduces a small quality loss. WebP is best used as a final delivery format for the web, not as an editing or archival format."
      ),
      createFAQ(
        "What quality setting gives the best results?",
        "For web delivery, 80-85% offers an excellent balance of quality and file size. At 80%, WebP files are roughly 30% smaller than equivalent JPG files with no visible difference on screen. For high-quality portfolio or photography sites, use 90-95%."
      ),
    ],
    relatedTools: [
      { slug: "webp-to-jpg", label: "WebP to JPG" },
      { slug: "png-to-webp", label: "PNG to WebP" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },

  "png-to-webp": {
    sections: [
      createAnswerFirstSection(
        "How to Convert PNG to WebP",
        "Upload a PNG file and the tool converts it to WebP format. WebP supports both lossy and lossless compression, so you can choose between maximum quality (lossless) or minimum file size (lossy with adjustable quality). Transparent areas in the PNG are preserved in the WebP output.",
        "This is one of the most impactful image conversions you can make for web performance. PNG files are often very large because they use lossless compression. A WebP version of the same image is typically 50-80% smaller with lossy compression, or 20-30% smaller even with lossless compression, while keeping transparency intact."
      ),
      createAnswerFirstSection(
        "Why Convert PNG to WebP?",
        "PNG files with transparency are essential for logos, icons, and UI elements, but they are often far larger than necessary for web delivery. WebP is the only widely supported format that combines transparency with efficient lossy compression, giving you small files that still look sharp with transparent backgrounds.",
        "For example, a PNG logo at 200 KB might compress to 40 KB as a lossy WebP with no visible quality loss, or 150 KB as a lossless WebP with pixel-perfect quality. This matters when you have dozens of transparent images on a single page, such as product images on an e-commerce site."
      ),
      {
        heading: "PNG vs WebP Comparison",
        table: {
          headers: ["Feature", "PNG", "WebP"],
          rows: [
            ["Compression", "Lossless only", "Lossless or lossy"],
            ["File size (photo)", "Very large", "50-80% smaller (lossy)"],
            ["File size (graphic)", "Medium", "20-30% smaller (lossless)"],
            ["Transparency", "Full alpha channel", "Full alpha channel"],
            ["Animation", "Not supported (use APNG)", "Supported"],
            ["Browser support", "Universal", "All modern browsers"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Does WebP preserve transparency from PNG files?",
        "Yes. WebP fully supports alpha channel transparency, both in lossy and lossless modes. Your transparent backgrounds, semi-transparent shadows, and smooth edges are all preserved in the conversion."
      ),
      createFAQ(
        "Should I use lossy or lossless WebP?",
        "Use lossy (quality 80-90%) for photographs and complex images where small file size matters and slight compression artefacts are invisible. Use lossless for graphics, logos, screenshots, and any image where pixel-perfect accuracy matters. Lossless WebP is still smaller than PNG."
      ),
      createFAQ(
        "Can I convert animated PNGs (APNG) to WebP?",
        "This tool converts static PNG images to WebP. Animated PNGs are a separate format and would need a specialised animation conversion tool that handles frame timing and sequencing."
      ),
    ],
    relatedTools: [
      { slug: "webp-to-png", label: "WebP to PNG" },
      { slug: "jpg-to-webp", label: "JPG to WebP" },
      { slug: "png-to-jpg", label: "PNG to JPG" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },

  "webp-to-png": {
    sections: [
      createAnswerFirstSection(
        "How to Convert WebP to PNG",
        "Upload a WebP file and the tool converts it to PNG format with lossless quality. Transparency is fully preserved. No settings are needed since PNG is a lossless format, so every pixel is an exact reproduction of the WebP source. Download the result with one click.",
        "PNG is the standard lossless image format, supported by every image editor, operating system, and platform. Converting WebP to PNG is useful when you need to edit an image in software that does not support WebP, or when you want a lossless copy for archiving or further processing."
      ),
      createAnswerFirstSection(
        "When to Convert WebP to PNG",
        "Convert to PNG when you need lossless quality for editing, archiving, or sharing with software that does not accept WebP. PNG is the best choice when pixel accuracy matters, such as for screenshots, diagrams, logos, and graphics with text. It also preserves transparency, unlike JPG.",
        "Keep in mind that PNG files are larger than WebP files. A WebP image that is 150 KB might become 400 KB or more as a PNG. This is the expected trade-off for lossless compression and universal compatibility. If file size is your priority and you do not need lossless quality, consider converting to JPG instead."
      ),
    ],
    faqs: [
      createFAQ(
        "Does converting WebP to PNG improve image quality?",
        "No. The conversion preserves the quality that exists in the WebP file but cannot recover any detail that was lost during WebP compression. If the WebP was created with lossy compression, those artefacts will be present in the PNG as well, just stored losslessly."
      ),
      createFAQ(
        "Why is the PNG file so much larger than the WebP?",
        "PNG uses lossless compression, which stores every pixel exactly. WebP uses more efficient compression algorithms, and if the source was lossy WebP, it discarded some detail to achieve a smaller size. The PNG faithfully preserves everything in the WebP, but it takes more bytes to do so losslessly."
      ),
      createFAQ(
        "Is transparency preserved when converting WebP to PNG?",
        "Yes. Both WebP and PNG support full alpha channel transparency. Any transparent or semi-transparent areas in the WebP file are preserved exactly in the PNG output."
      ),
    ],
    relatedTools: [
      { slug: "webp-to-jpg", label: "WebP to JPG" },
      { slug: "png-to-webp", label: "PNG to WebP" },
      { slug: "jpg-to-png", label: "JPG to PNG" },
    ],
  },

  "color-picker": {
    sections: [
      createAnswerFirstSection(
        "How the Colour Picker Works",
        "Click anywhere on the colour canvas to select a colour, then fine-tune it using the hue slider and saturation/brightness controls. The tool shows your selected colour in hex, RGB, and HSL formats simultaneously, ready to copy and paste into CSS, design tools, or any application that accepts colour codes.",
        "The colour canvas uses the HSV (Hue, Saturation, Value) model. The horizontal axis controls saturation (vivid to muted) and the vertical axis controls value (bright to dark). The hue slider along the top or side cycles through the full colour spectrum from red through yellow, green, cyan, blue, magenta, and back to red."
      ),
      {
        heading: "Colour Format Comparison",
        table: {
          headers: ["Format", "Example (Blue)", "Best For"],
          rows: [
            ["Hex", "#2563eb", "CSS, web design, Figma, most design tools"],
            ["RGB", "rgb(37, 99, 235)", "CSS, JavaScript, screen colour mixing"],
            ["HSL", "hsl(217, 83%, 53%)", "CSS, intuitive colour adjustments"],
            ["HSV/HSB", "hsv(217, 84%, 92%)", "Photoshop, colour theory, picker UIs"],
          ],
        },
      },
      createAnswerFirstSection(
        "Picking Accessible Colours",
        "When choosing colours for text and backgrounds, contrast matters. The WCAG accessibility guidelines recommend a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text. Dark text on light backgrounds or light text on dark backgrounds generally meets these requirements.",
        "A good rule of thumb is to avoid mid-range colours for text. Very light pastels and very dark shades work well as backgrounds, while pure or near-pure white and dark colours work for text. If you are choosing brand colours, test them against both white and dark backgrounds to ensure readability in all contexts."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between hex and RGB?",
        "They represent the same colour in different notation. Hex uses a six-character code with two characters each for red, green, and blue (e.g. #2563eb). RGB uses decimal numbers from 0 to 255 for each channel (e.g. rgb(37, 99, 235)). Both describe the exact same colour; hex is more common in CSS and design tools, while RGB is useful in JavaScript and colour calculations."
      ),
      createFAQ(
        "What does HSL stand for and when should I use it?",
        "HSL stands for Hue, Saturation, Lightness. It is the most intuitive format for making colour adjustments. To make a colour lighter, increase the lightness value. To make it more muted, decrease saturation. To shift the colour entirely, change the hue. HSL is excellent in CSS when you need to create colour variations from a single base colour."
      ),
      createFAQ(
        "Can I enter a colour code to preview it?",
        "Yes. Paste any hex, RGB, or HSL value into the input field and the picker will jump to that exact colour. This is useful when you have a colour from a design spec or brand guide and want to see it visually or convert it to a different format."
      ),
    ],
    relatedTools: [
      { slug: "gradient-generator", label: "Gradient Generator" },
      { slug: "contrast-checker", label: "Contrast Checker" },
      { slug: "emoji-search", label: "Emoji Search" },
    ],
  },

  "heic-to-jpg": {
    sections: [
      createAnswerFirstSection(
        "What Is HEIC and Why Do iPhones Use It?",
        "HEIC (High Efficiency Image Container) is the default photo format on iPhones and iPads running iOS 11 or later. Apple adopted it because HEIC files are roughly 50% smaller than JPG files at the same visual quality, saving significant storage space on your device.",
        "The format uses the HEVC (H.265) compression standard, which is more advanced than the JPEG compression algorithm from 1992. This means sharper photos in smaller files. However, HEIC is not widely supported outside the Apple ecosystem, which is why converting to JPG is often necessary for sharing, printing, or editing."
      ),
      {
        heading: "HEIC vs JPG Comparison",
        table: {
          headers: ["Feature", "HEIC", "JPG"],
          rows: [
            ["File size", "~50% smaller at same quality", "Larger"],
            ["Quality", "Excellent, modern compression", "Good, but older algorithm"],
            ["Compatibility", "Apple devices, some newer apps", "Universal, works everywhere"],
            ["Transparency", "Supported", "Not supported"],
            ["Colour depth", "10-bit and 12-bit", "8-bit"],
            ["Edit support", "Limited in many editors", "Supported by all image editors"],
          ],
        },
      },
      createAnswerFirstSection(
        "Choosing a Quality Setting",
        "The default quality of 92% produces JPG files that are visually indistinguishable from the HEIC original for virtually all uses. This is the best setting for sharing photos, uploading to social media, or printing.",
        "If file size is critical (for example, emailing many photos or uploading to a size-restricted platform), 80-85% produces significantly smaller files with only minor quality loss visible at full zoom. Below 70%, compression artefacts become noticeable in areas with gradients like skies. For professional or archival use, 95-100% preserves maximum detail."
      ),
    ],
    faqs: [
      createFAQ(
        "Why can I not open HEIC files on my Windows PC?",
        "Windows does not include HEIC support by default. You can install the HEIC Image Extension from the Microsoft Store, but many applications still cannot open the files. Converting to JPG gives you a file that works in every Windows application, from Paint to Photoshop, without installing anything."
      ),
      createFAQ(
        "Does converting HEIC to JPG lose quality?",
        "There is a small quality reduction because JPG uses older compression. At 90-95% quality, the difference is invisible in normal viewing. HEIC files store slightly more colour information (10-bit vs 8-bit), so very subtle gradients may show minor banding after conversion, but this is rarely noticeable in everyday photos."
      ),
      createFAQ(
        "Is my photo uploaded to a server?",
        "No. The conversion happens entirely in your browser. Your photos never leave your device. This makes it safe to convert personal or sensitive images without privacy concerns."
      ),
    ],
    relatedTools: [
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "webp-to-jpg", label: "WebP to JPG" },
    ],
  },

  "emoji-search": {
    sections: [
      createAnswerFirstSection(
        "How to Find and Copy Emojis",
        "Type a keyword like 'happy', 'food', or 'animal' into the search bar and the tool instantly shows matching emojis. Click any emoji to copy it to your clipboard, then paste it anywhere, in social media posts, messages, documents, emails, or website content. No installs or extensions needed.",
        "The search matches emoji names, descriptions, and related keywords. Searching 'sad' finds the crying face, the pensive face, the disappointed face, and other sad-related emojis. Searching 'cat' finds all cat face emojis plus the cat emoji itself. Results appear instantly as you type."
      ),
      createAnswerFirstSection(
        "Where Can You Use Emojis?",
        "Emojis work in virtually all modern platforms: social media (Instagram, Twitter, Facebook, TikTok, LinkedIn), messaging apps (WhatsApp, Slack, Teams, Discord), email clients, Google Docs, Microsoft Word, website content, and even file names on most operating systems.",
        "For social media, emojis in posts and captions increase engagement rates. Studies consistently show that posts with emojis get more likes, comments, and shares. For business communications, emojis in subject lines can boost email open rates, and platforms like Slack and Teams use them heavily for quick reactions."
      ),
      {
        heading: "Popular Emoji Categories",
        table: {
          headers: ["Category", "Search Terms", "Examples"],
          rows: [
            ["Faces and emotions", "happy, sad, angry, love, laugh", "Smileys, hearts, hand gestures"],
            ["Animals and nature", "cat, dog, flower, tree, sun", "Animal faces, plants, weather"],
            ["Food and drink", "pizza, coffee, fruit, cake, beer", "Meals, snacks, beverages"],
            ["Travel and places", "car, plane, house, mountain, beach", "Vehicles, buildings, landscapes"],
            ["Objects and symbols", "phone, money, star, music, flag", "Tech, tools, symbols, flags"],
            ["Activities", "sport, game, art, music, party", "Sports, hobbies, celebrations"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "Do emojis look the same on every device?",
        "No. Each platform (Apple, Google, Samsung, Microsoft, Twitter) designs its own emoji artwork. A smiley face on an iPhone looks different from the same emoji on an Android phone or a Windows PC. The meaning is the same, but the visual style varies. This can occasionally cause confusion with more ambiguous emojis."
      ),
      createFAQ(
        "How do I find the right emoji quickly?",
        "Use descriptive keywords rather than trying to guess the official emoji name. For example, search 'thinking' instead of 'chin'. Search 'rocket' or 'launch' to find the rocket emoji. If your first search does not find what you need, try a synonym or a broader term."
      ),
      createFAQ(
        "Can I use emojis in professional emails?",
        "It depends on your workplace culture. Emojis are increasingly accepted in business communication, especially in internal messages on Slack or Teams. For external emails, a single relevant emoji in the subject line can increase open rates, but keep the email body professional. When in doubt, match the tone of the person you are writing to."
      ),
    ],
    relatedTools: [
      { slug: "unicode-lookup", label: "Unicode Lookup" },
      { slug: "text-formatter", label: "Text Formatter" },
      { slug: "word-counter", label: "Word Counter" },
    ],
  },

  "reduce-image-quality": {
    sections: [
      createAnswerFirstSection(
        "How to Reduce Image Quality on Purpose",
        "Upload any image and apply intentional degradation effects to create lo-fi, retro, or meme-ready visuals. Choose from effects like pixelation, blur, noise, JPEG artefacts, and posterisation, or pick a preset like Lo-fi, VHS, or Deep Fried for instant results.",
        "Unlike compression tools that try to minimise visible quality loss, this tool does the opposite. It deliberately degrades your image in controlled, stylistic ways. Each effect targets a different aspect of image quality, and you can stack multiple effects together for more extreme results."
      ),
      {
        heading: "Degradation Effects Explained",
        table: {
          headers: ["Effect", "What It Does", "Visual Result"],
          rows: [
            ["Pixelation", "Enlarges pixel blocks, destroying fine detail", "Blocky, mosaic, retro game look"],
            ["Blur", "Averages neighbouring pixels together", "Soft, out-of-focus, dreamy"],
            ["Noise", "Adds random grain across the image", "Grainy, film-like, gritty texture"],
            ["JPEG Artefacts", "Simulates heavy JPEG compression banding", "Blocky colour bands, smeared edges"],
            ["Posterise", "Reduces the number of colour levels", "Flat, poster-like colour blocks"],
          ],
        },
      },
      createAnswerFirstSection(
        "Preset Styles for Quick Results",
        "The Lo-fi preset adds light noise and colour fade for a vintage camcorder feel. VHS applies scan lines, colour bleeding, and tracking distortion to mimic old video recordings. Deep Fried stacks extreme JPEG artefacts, noise, and saturation for the classic internet meme look.",
        "Each preset is a starting point. After applying one, you can adjust individual effect sliders to fine-tune the result. Combine a VHS base with extra pixelation for an 8-bit retro game aesthetic, or start with Deep Fried and dial back the noise for a subtler grunge effect."
      ),
      createAnswerFirstSection(
        "Common Uses for Intentional Quality Reduction",
        "Meme creators use heavy artefacts and saturation to give images the iconic Deep Fried look. Designers use subtle degradation to create vintage or analogue aesthetics for branding, album covers, and social media content. Artists use noise and posterisation as creative texture layers.",
        "Retro gaming communities use pixelation to recreate 8-bit and 16-bit art styles. Filmmakers use VHS and grain effects on stills for mood boards and promotional material. Even web designers use subtle quality reduction to create background textures that feel organic rather than clinical."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the Deep Fried meme effect?",
        "Deep Fried is an internet meme style where images are heavily degraded with extreme JPEG compression artefacts, oversaturated colours, added noise, and sometimes lens flare or emoji overlays. The name comes from the idea that the image has been 'fried' by being saved and re-saved at low quality many times. This tool replicates the look in one step."
      ),
      createFAQ(
        "Can I control how much degradation is applied?",
        "Yes. Every effect has an intensity slider so you can go from subtle vintage warmth to extreme destruction. You can also combine multiple effects at different intensities. The presets give you a good starting point, and then you can tweak each slider individually."
      ),
      createFAQ(
        "Is this tool free?",
        "Yes, completely free with no limits. All processing happens in your browser and your images are never uploaded to any server."
      ),
    ],
    relatedTools: [
      { slug: "pixelate-image", label: "Pixelate Image" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "sepia-filter", label: "Sepia Filter" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },

  "rainbow-filter": {
    sections: [
      createAnswerFirstSection(
        "How to Add a Rainbow Filter to an Image",
        "Upload a photo and the tool overlays a smooth rainbow gradient across the entire image. Choose a blend mode to control how the colours interact with the original photo, adjust opacity to set the intensity, and pick a style like Standard, Pastel, or Neon. Download the result as PNG or JPG.",
        "The rainbow gradient cycles through the full colour spectrum from red through orange, yellow, green, blue, and violet. The blend mode determines how these colours combine with your original image. Overlay preserves the photo's shadows and highlights while adding colour. Multiply darkens the image with rich tones. Screen lightens it for a dreamy glow."
      ),
      createAnswerFirstSection(
        "Rainbow Style Options",
        "Standard uses fully saturated spectrum colours for a bold, vibrant rainbow effect. Pastel uses softer, lighter tones that blend gently with the photo, ideal for a subtle and elegant look. Neon uses high-intensity electric colours that pop against dark backgrounds, perfect for eye-catching social media graphics.",
        "The gradient direction can also be adjusted. Horizontal gradients work well for landscape photos. Vertical gradients suit portrait orientation. Diagonal and radial options add variety. Radial places the rainbow colours in a circular pattern from the centre outward."
      ),
      createAnswerFirstSection(
        "Popular Uses for Rainbow Effects",
        "Pride content is the most common use, adding rainbow colours to profile pictures, event graphics, and social media posts for Pride Month and LGBTQ+ celebrations. The effect is also popular for album art, party invitations, festival posters, and any design that needs a colourful, joyful energy.",
        "Photographers use subtle rainbow overlays at low opacity to add warmth and colour interest to otherwise flat images. Social media managers use bolder rainbow effects for attention-grabbing carousel posts and stories. Kids' party planners use it for invitations and decorations."
      ),
    ],
    faqs: [
      createFAQ(
        "What blend mode should I use?",
        "Overlay is the most versatile; it adds colour while keeping the photo's detail and contrast. Use Screen for a lighter, more ethereal look. Use Multiply for deeper, richer tones on lighter photos. Soft Light gives the most subtle effect. Try a few to see which suits your image best."
      ),
      createFAQ(
        "Can I use this for Pride profile pictures?",
        "Yes, it is one of the most popular uses. Upload your photo, choose the Standard rainbow style, set the blend mode to Overlay, and adjust opacity to around 40-60% for a visible but not overwhelming effect. The colours will be clearly recognisable as a pride rainbow."
      ),
      createFAQ(
        "Does this work with transparent PNG images?",
        "Yes. The rainbow overlay is applied only to the visible areas of the image. Transparent regions stay transparent in the PNG output."
      ),
    ],
    relatedTools: [
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "sepia-filter", label: "Sepia Filter" },
      { slug: "invert-image-colors", label: "Invert Image Colors" },
      { slug: "adjust-image-brightness", label: "Adjust Image Brightness" },
    ],
  },

  "background-remover": {
    sections: [
      createAnswerFirstSection(
        "How to Remove an Image Background",
        "Upload an image and click on the background colour you want to remove. The tool uses colour-matching to find and erase all pixels similar to the colour you clicked. Adjust the tolerance slider to control how much colour variation is included. The result is a transparent PNG ready for use in designs, presentations, or product listings.",
        "The colour-click method works by comparing every pixel in the image to the colour you selected. Pixels within the tolerance range are made transparent. A low tolerance (10-20) removes only very similar colours, useful for solid backgrounds. A higher tolerance (40-60) catches gradients and slight colour variations, useful for photos with uneven lighting."
      ),
      createAnswerFirstSection(
        "Tolerance and Edge Settings",
        "Tolerance controls how aggressively the tool matches colours. At 0, only the exact colour you clicked is removed. At 100, nearly everything is removed. For most solid-colour backgrounds, a tolerance of 20-30 works well. For photos with shadows or gradients on the background, try 40-50.",
        "Edge-only mode restricts removal to pixels connected to the image border, which prevents the tool from accidentally removing interior areas that happen to match the background colour. For example, if you are removing a white background from a photo of a white mug, edge-only mode removes the white background without touching the white mug."
      ),
      createAnswerFirstSection(
        "Tips for Best Results",
        "Start with photos that have a clear contrast between the subject and background. Solid colour backgrounds (white, green, blue) give the cleanest results. If the background has multiple colours, click each one separately and adjust tolerance for each. Zoom in to check edges after removal.",
        "Save your result as PNG to preserve transparency. JPG does not support transparency, so transparent areas will be filled with white if you export as JPG. For product photography, remove the background and place items on a pure white or custom colour background for a clean, professional look."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between colour-click and AI background removal?",
        "Colour-click removal works by matching a specific colour you select and removing all similar pixels. It is fast and works very well for solid or simple backgrounds. AI removal uses machine learning to detect the subject of the photo and remove everything else, which handles complex backgrounds like outdoor scenes or busy rooms. This tool uses the colour-click method."
      ),
      createFAQ(
        "Why should I save as PNG instead of JPG?",
        "PNG supports transparency, so the removed background stays transparent. JPG does not support transparency and will fill removed areas with white. Always save as PNG if you plan to place the image on a different background or use it in a design tool."
      ),
      createFAQ(
        "Can I remove a background that is not a single colour?",
        "Yes, but you will need to click multiple times on different areas. Each click removes a different colour range. For complex, multi-colour backgrounds like outdoor photos, an AI-based removal tool may give faster results. This tool works best with solid or near-solid backgrounds."
      ),
    ],
    relatedTools: [
      { slug: "crop-image", label: "Crop Image" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-color-picker", label: "Image Color Picker" },
      { slug: "color-palette-from-image", label: "Color Palette from Image" },
    ],
  },

  "blur-image": {
    sections: [
      createAnswerFirstSection(
        "How to Blur an Image Online",
        "Upload any image and adjust the blur radius slider to apply a smooth Gaussian blur. The preview updates in real time. A small radius adds a subtle softness, while a large radius creates a strong, dreamy effect that obscures all detail. Download the result as PNG or JPG.",
        "Gaussian blur works by averaging each pixel with its neighbours using a bell-curve weighting. Nearby pixels have the most influence, and the effect falls off with distance. This produces a natural, smooth blur that looks like genuine optical defocus rather than a flat smear."
      ),
      {
        heading: "Blur Radius Guide",
        table: {
          headers: ["Radius", "Effect", "Best For"],
          rows: [
            ["1-3px", "Very subtle softening", "Skin smoothing, reducing noise"],
            ["4-7px", "Noticeable soft focus", "Gentle background blur, portrait backgrounds"],
            ["8-12px", "Strong blur", "Privacy censoring, depth of field simulation"],
            ["13-15px", "Extreme blur", "Abstract backgrounds, text overlay backgrounds"],
          ],
        },
      },
      createAnswerFirstSection(
        "Common Uses for Image Blurring",
        "Privacy is the top use, blurring faces, number plates, addresses, or screen content before sharing screenshots and photos online. Designers blur images to create soft backgrounds for text overlays, hero sections, and presentation slides. Photographers use selective blur to simulate depth of field.",
        "Blurred images also make excellent wallpapers and gradient-like backgrounds. A heavily blurred landscape photo produces a smooth, colourful background that feels organic. Web designers use blurred hero images behind text to keep the page visually interesting without competing with the content."
      ),
      createAnswerFirstSection(
        "Blur vs Pixelation",
        "Blur and pixelation both obscure detail, but they look very different. Blur produces a smooth, continuous softening where shapes blend into each other. Pixelation creates hard-edged square blocks. Blur looks more natural and is better for backgrounds and artistic effects. Pixelation is more commonly used for censoring because the blocky look clearly signals that something has been intentionally hidden.",
        "For privacy purposes, both methods work. Pixelation is slightly more secure because blur can sometimes be partially reversed with AI deblurring tools, while pixelation permanently destroys the underlying data."
      ),
    ],
    faqs: [
      createFAQ(
        "Can a blurred image be unblurred?",
        "Partially. AI deblurring tools can recover some detail from lightly blurred images, especially if the blur radius is small. For privacy-sensitive content, use a large blur radius (10+) or consider pixelation instead, which is harder to reverse. Heavy blur destroys enough information to be practically irreversible."
      ),
      createFAQ(
        "What is Gaussian blur?",
        "Gaussian blur is the most common blur algorithm. It averages each pixel with its surrounding pixels using a Gaussian (bell curve) distribution, giving more weight to nearby pixels and less to distant ones. The result is a natural-looking, smooth blur. The 'radius' controls how many surrounding pixels are included in the average."
      ),
      createFAQ(
        "Is this processed on my device?",
        "Yes. All blurring happens in your browser using the HTML Canvas API. Your images are never uploaded to any server."
      ),
    ],
    relatedTools: [
      { slug: "pixelate-image", label: "Pixelate Image" },
      { slug: "sharpen-image", label: "Sharpen Image" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "reduce-image-quality", label: "Reduce Image Quality" },
    ],
  },

  "sharpen-image": {
    sections: [
      createAnswerFirstSection(
        "How to Sharpen an Image Online",
        "Upload a slightly soft or blurry image and apply sharpening to bring out detail and crispness. Adjust the strength slider to control the intensity. The tool uses an unsharp mask algorithm, which enhances edges and fine detail by increasing the contrast between adjacent pixels.",
        "Unsharp masking works by creating a slightly blurred copy of the image, then comparing it to the original. Wherever the blurred version differs from the original, the tool amplifies that difference. This boosts edges, textures, and fine details while leaving smooth areas mostly untouched."
      ),
      createAnswerFirstSection(
        "When to Sharpen an Image",
        "The most common use is rescuing slightly soft photos, images that are almost sharp but not quite, often caused by minor camera shake, slow autofocus, or shooting through glass. Scanned documents and old photographs also benefit from sharpening to make text and details clearer.",
        "Sharpening is also useful after resizing an image. Downscaling a photo can soften it slightly, so applying a light sharpen after resizing restores crispness. Product photographers routinely sharpen images as a final step before publishing to ensure every detail is visible."
      ),
      {
        heading: "Sharpening Strength Guide",
        table: {
          headers: ["Strength", "Effect", "Best For"],
          rows: [
            ["Low (10-30%)", "Subtle crispness", "Photos that are almost sharp, post-resize cleanup"],
            ["Medium (30-60%)", "Noticeable detail enhancement", "Soft photos, scanned documents, product images"],
            ["High (60-80%)", "Strong edge enhancement", "Very soft images, restoring old scanned prints"],
            ["Very high (80-100%)", "Extreme sharpening", "Artistic effect only, creates visible halos"],
          ],
        },
      },
      createAnswerFirstSection(
        "Avoiding Over-Sharpening",
        "Too much sharpening creates visible bright halos around edges and makes the image look crunchy and unnatural. Noise and grain are also amplified by sharpening, so images with visible noise will look worse with heavy sharpening. The key is to sharpen just enough to improve clarity without introducing artefacts.",
        "Start with a low strength and increase gradually while watching the preview. Zoom in to 100% to check for halos around high-contrast edges. If you see bright outlines forming around dark objects, you have gone too far. Dial it back until the edges look clean."
      ),
    ],
    faqs: [
      createFAQ(
        "Can sharpening fix a blurry photo?",
        "Sharpening can improve slightly soft photos, but it cannot recover a heavily blurred image. It works by enhancing edges that already exist, not by recreating lost detail. If the blur is severe (motion blur, heavy defocus), sharpening will only amplify the blur artefacts. For slight softness, it works very well."
      ),
      createFAQ(
        "What is unsharp masking?",
        "Despite the confusing name, unsharp masking is a sharpening technique. It compares the image to a blurred version of itself and amplifies the differences. Areas where detail changes rapidly (edges) get boosted, while smooth areas stay the same. It is the most widely used sharpening method in photo editing."
      ),
      createFAQ(
        "Should I sharpen before or after resizing?",
        "Sharpen after resizing. Resizing changes the pixel structure of the image, so any sharpening done before resize is partially undone. Apply sharpening as one of the final steps in your editing workflow, after cropping, resizing, and colour adjustments."
      ),
    ],
    relatedTools: [
      { slug: "blur-image", label: "Blur Image" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "adjust-image-contrast", label: "Adjust Image Contrast" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
    ],
  },

  "add-text-to-image": {
    sections: [
      createAnswerFirstSection(
        "How to Add Text to an Image Online",
        "Upload an image, type your text, and position it anywhere on the photo by dragging. Choose a font, size, colour, and optional stroke or shadow to make the text stand out. The preview updates in real time so you can fine-tune the placement before downloading.",
        "The tool supports multiple text layers, so you can add a heading, subheading, and body text in different styles. Each text element can be positioned, sized, and styled independently. Download the final image as PNG (for transparency support) or JPG."
      ),
      createAnswerFirstSection(
        "Tips for Readable Text on Images",
        "The biggest challenge when adding text to photos is readability. Text that looks fine on a white background can disappear against a busy photograph. Adding a stroke (outline) in a contrasting colour is the simplest fix. White text with a black stroke is readable on virtually any background.",
        "Other options include adding a semi-transparent dark overlay behind the text, using a text shadow for depth, or positioning text on a naturally dark or light area of the image. Bold fonts at larger sizes are more legible than thin fonts. Sans-serif fonts tend to be clearer at small sizes than serif fonts."
      ),
      createAnswerFirstSection(
        "Common Uses for Text on Images",
        "Meme creation is one of the most popular uses, with bold white text and black outlines at the top and bottom of an image. Social media managers add captions, quotes, and calls to action directly onto images for posts and stories. Watermarking uses small, semi-transparent text to protect photos from unauthorised use.",
        "Other uses include creating quick promotional graphics, adding dates and captions to event photos, labelling diagrams and screenshots, and creating thumbnail images for YouTube or blog posts. For professional-quality results, consider using consistent fonts and colours that match your brand."
      ),
    ],
    faqs: [
      createFAQ(
        "What font should I use for memes?",
        "Impact is the classic meme font, white with a black outline. It is bold, condensed, and highly readable at any size. For a more modern meme style, use a bold sans-serif font like Arial Black or Helvetica Bold. The key is using a heavy weight with a contrasting stroke."
      ),
      createFAQ(
        "How do I make text readable on a busy background?",
        "Add a stroke (outline) in a contrasting colour. White text with a 2-3px black stroke works on almost any image. Alternatively, add a text shadow or place a semi-transparent dark rectangle behind the text. Increasing font size and using bold weight also helps."
      ),
      createFAQ(
        "Can I add multiple text elements?",
        "Yes. You can add as many text layers as you need, each with its own font, size, colour, position, and style. This lets you create complex layouts with headings, subheadings, and captions all on a single image."
      ),
    ],
    relatedTools: [
      { slug: "add-watermark-to-image", label: "Add Watermark to Image" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
    ],
  },

  "add-watermark-to-image": {
    sections: [
      createAnswerFirstSection(
        "How to Add a Watermark to an Image",
        "Upload your image, type your watermark text (or upload a logo), and the tool places it on the image. Choose between a single centred watermark or a repeating tile pattern that covers the entire image. Adjust opacity, size, angle, and colour to get the right balance between visibility and subtlety.",
        "A good watermark is visible enough to deter theft but not so heavy that it ruins the image. Opacity between 20-40% is usually ideal. The tiled pattern is harder to crop out than a single corner watermark, making it better for protecting high-value images that you are sharing publicly."
      ),
      createAnswerFirstSection(
        "Single vs Tiled Watermarks",
        "A single watermark is placed once, typically in a corner or the centre. It is clean and unobtrusive, but someone can crop or clone-stamp it out relatively easily. A tiled watermark repeats across the entire image in a diagonal grid, making it much harder to remove without damaging the photo.",
        "Use single placement for portfolio previews, social media posts, and situations where you want minimal visual interference. Use tiled placement for client proofs, stock photo previews, and any image where preventing unauthorised use is the priority."
      ),
      createAnswerFirstSection(
        "Professional Watermarking Tips",
        "Use your business name, logo, or website URL as the watermark text. Keep the font clean and professional. White text at 25-35% opacity works on most images, or use a semi-transparent version of your logo. Angle the text at 30-45 degrees for tiled patterns to make it harder to remove with horizontal or vertical cropping.",
        "For batch watermarking, set up your preferred settings once and apply them consistently across all images. Consistent watermark placement and style becomes part of your brand identity. Photographers often use a signature-style watermark in a consistent corner position."
      ),
    ],
    faqs: [
      createFAQ(
        "What opacity should I use for a watermark?",
        "Between 20% and 40% for most uses. At 20%, the watermark is visible on close inspection but does not distract from the image. At 40%, it is clearly visible and more effective as a deterrent. For client proofs where preventing theft is the primary goal, go up to 50-60%."
      ),
      createFAQ(
        "Can watermarks be removed?",
        "Simple watermarks in corners can be cropped out. Single watermarks over the main subject can sometimes be removed with AI inpainting tools, though results vary. Tiled watermarks across the full image are very difficult to remove cleanly. No watermark is completely tamper-proof, but tiled patterns at medium opacity provide good protection."
      ),
      createFAQ(
        "Should I use text or a logo for my watermark?",
        "A logo looks more professional and is more recognisable, especially if you have an established brand. Text is simpler and works well if you do not have a logo. Your website URL as text is a practical choice because it tells viewers where to find or purchase the full image."
      ),
    ],
    relatedTools: [
      { slug: "add-text-to-image", label: "Add Text to Image" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "crop-image", label: "Crop Image" },
    ],
  },

  "image-color-picker": {
    sections: [
      createAnswerFirstSection(
        "How to Pick Colours from an Image",
        "Upload any image and click anywhere on it to sample the exact colour at that pixel. The tool displays the colour value in Hex, RGB, and HSL formats, all ready to copy with one click. Move your cursor across the image to see a magnified preview of the area under the pointer.",
        "The eyedropper reads the precise colour data from the pixel you click. Unlike visual guessing, this gives you the exact colour value that designers and developers use in CSS, design tools, and brand guidelines. Every click updates the colour display instantly."
      ),
      createAnswerFirstSection(
        "Understanding Colour Formats",
        "Hex codes like #2563EB are the most common format for web design and CSS. They encode red, green, and blue channels as two-digit hexadecimal values. RGB values like rgb(37, 99, 235) express the same information as decimal numbers from 0 to 255 for each channel. HSL values like hsl(217, 83%, 53%) describe colour as hue (position on the colour wheel), saturation (intensity), and lightness.",
        "For web development, use Hex or RGB. For design work where you need to adjust colour relationships, HSL is more intuitive because you can shift the hue, adjust saturation, or change lightness independently. All three formats describe the same colour, just in different ways."
      ),
      createAnswerFirstSection(
        "Common Uses for Colour Picking",
        "Designers use it to match brand colours from logos, screenshots, or reference images. Web developers sample colours from design mockups to use in CSS. Artists use it to analyse colour palettes in paintings, photographs, or nature images for reference. Social media managers sample colours from brand assets to maintain visual consistency.",
        "It is also useful for identifying exact paint colours from product images, matching fabric colours for crafts or interior design, and extracting colours from inspiration images to build mood boards."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between Hex, RGB, and HSL?",
        "They are three different ways to write the same colour. Hex (#FF5733) uses hexadecimal notation and is the standard in web design. RGB (255, 87, 51) uses decimal values for red, green, and blue channels. HSL (11, 100%, 60%) describes hue, saturation, and lightness. Use whichever format your project requires."
      ),
      createFAQ(
        "Why does the colour I picked look different on another screen?",
        "Screen colour accuracy varies between devices. Monitors, laptops, tablets, and phones all display colours slightly differently depending on their panel type, calibration, brightness, and colour profile. The colour values are exact, but the visual appearance depends on the display. For colour-critical work, use a calibrated monitor."
      ),
      createFAQ(
        "Can I pick colours from any image format?",
        "Yes. The tool works with JPG, PNG, WebP, GIF, BMP, and any other format your browser can display. Upload any image and click to sample colours."
      ),
    ],
    relatedTools: [
      { slug: "color-palette-from-image", label: "Color Palette from Image" },
      { slug: "color-converter", label: "Color Converter" },
      { slug: "hex-to-rgb", label: "Hex to RGB" },
      { slug: "background-remover", label: "Background Remover" },
    ],
  },

  "ascii-art-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Generate ASCII Art from Images",
        "Upload any image and the tool converts it into text-based art using ASCII characters. Lighter areas of the image are represented by sparse characters like dots and dashes, while darker areas use dense characters like @ and #. The result is a text rendering of your image that you can copy and paste anywhere text is supported.",
        "The generator analyses the brightness of each region in the image and maps it to a character from a density scale. Characters with more ink coverage (like W, M, @) represent dark areas. Characters with less coverage (like period, comma, space) represent light areas. The result is a recognisable image made entirely of plain text."
      ),
      createAnswerFirstSection(
        "Font Styles and Character Sets",
        "Different character sets produce different visual textures. The standard set uses a full range of ASCII printable characters for maximum tonal range. A blocks set uses Unicode block characters for a denser, more uniform look. A simple set uses just a handful of characters for a cleaner, more minimal result.",
        "The output width controls how many characters per line, which determines the level of detail. A wider output captures more detail but requires a monospaced font to display correctly. For best results, always view ASCII art in a monospaced font like Courier, Consolas, or JetBrains Mono."
      ),
      createAnswerFirstSection(
        "Where to Use ASCII Art",
        "Code comments and README files are classic locations, adding visual flair to technical documentation. Terminal and command-line applications use ASCII art for splash screens and banners. Social media posts on platforms like Reddit and Discord support ASCII art in code blocks. Email signatures and forum posts are other popular uses.",
        "ASCII art also has a long creative tradition. Artists create elaborate text-based illustrations, portraits, and landscapes entirely from keyboard characters. It is a distinctive art form that dates back to the earliest days of computing and remains popular in hacker, retro computing, and internet subcultures."
      ),
    ],
    faqs: [
      createFAQ(
        "Why does my ASCII art look distorted?",
        "ASCII art must be displayed in a monospaced (fixed-width) font where every character takes up the same horizontal space. If you paste it into a program using a proportional font (like Arial or Times New Roman), the characters will not align and the image will look scrambled. Use Courier New, Consolas, or any monospaced font."
      ),
      createFAQ(
        "What image width works best?",
        "Between 60 and 120 characters wide for most uses. At 60 characters, you get a compact image that fits in most terminals and text fields. At 120 characters, you get more detail but the art is wider. For code comments, 40-60 is best. For terminal display, match your terminal width."
      ),
      createFAQ(
        "Can I use ASCII art in code comments?",
        "Yes, it is a long-standing tradition in software development. Many open source projects include ASCII art logos in their source files. Just make sure the art fits within your project's line width convention (typically 80 or 120 characters) and wrap it in a comment block."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "pixelate-image", label: "Pixelate Image" },
      { slug: "text-formatter", label: "Text Formatter" },
      { slug: "reduce-image-quality", label: "Reduce Image Quality" },
    ],
  },

  "color-palette-from-image": {
    sections: [
      createAnswerFirstSection(
        "How to Extract a Colour Palette from an Image",
        "Upload any photo or image and the tool automatically extracts the dominant colours using a clustering algorithm. The result is a clean colour palette showing each extracted colour with its Hex, RGB, and HSL values. Click any colour to copy its value to your clipboard.",
        "The extraction uses a technique similar to k-means clustering, which groups all the pixels in the image by colour similarity and finds the most representative colours. This identifies the true dominant colours rather than just picking the most common single pixel values, which gives a more visually meaningful palette."
      ),
      createAnswerFirstSection(
        "Choosing the Right Number of Colours",
        "The default is 5 colours, which captures the key tones in most images. For simpler images like logos or illustrations, 3-4 colours may be enough. For complex photographs with many tones, 6-8 colours gives a more complete representation. Very high numbers (10+) start to include subtle variations that may not be useful for design work.",
        "For branding projects, extract 5-6 colours, then choose 2-3 as your primary brand palette and use the rest as accents. For web design, a 5-colour palette maps well to primary, secondary, accent, background, and text colours."
      ),
      createAnswerFirstSection(
        "Common Uses for Colour Palette Extraction",
        "Designers extract palettes from inspiration photos, artwork, and nature images to use in branding, web design, and graphic design projects. Interior designers sample colours from room photos to find matching paint colours. Artists analyse the colour composition of paintings they admire to understand colour relationships and apply similar harmonies.",
        "Content creators extract palettes from their brand photography to ensure social media graphics and marketing materials use consistent, complementary colours. Wedding planners extract palettes from inspiration images to coordinate decorations, flowers, and stationery."
      ),
    ],
    faqs: [
      createFAQ(
        "How does colour extraction work?",
        "The tool analyses all the pixels in the image and groups them by colour similarity using a clustering algorithm. Each cluster represents a dominant colour region. The centre of each cluster becomes one of the extracted palette colours. This approach finds the most visually significant colours rather than simply the most frequently occurring pixel values."
      ),
      createFAQ(
        "How many colours should I extract?",
        "5 is a good default for most uses. For simple graphics, try 3-4. For complex photos with many distinct colour areas, try 6-8. For branding, extract 5-6 and then narrow down to 2-3 primary colours plus accents."
      ),
      createFAQ(
        "Can I use the extracted palette in design software?",
        "Yes. Copy the Hex values and paste them into any design tool, including Figma, Canva, Adobe Photoshop, Illustrator, or CSS. Hex codes are the universal colour format supported by every design application."
      ),
    ],
    relatedTools: [
      { slug: "image-color-picker", label: "Image Color Picker" },
      { slug: "color-converter", label: "Color Converter" },
      { slug: "hex-to-rgb", label: "Hex to RGB" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
    ],
  },

  "image-to-pdf": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Images to PDF",
        "Upload one or more images (JPG, PNG, WebP) and the tool combines them into a single PDF document. Each image is placed on its own page. Choose the page size, orientation, and margins, then download the PDF with one click. The images are embedded at their original quality.",
        "This is useful whenever you need to share multiple images as a single file, create a printable document from photos, or archive images in a universally readable format. PDF is supported by every device and operating system, making it the best format for sharing image collections."
      ),
      {
        heading: "Page Size Guide",
        table: {
          headers: ["Size", "Dimensions", "Best For"],
          rows: [
            ["A4", "210 x 297 mm", "Standard documents, European printing"],
            ["Letter", "216 x 279 mm", "US standard paper size"],
            ["A3", "297 x 420 mm", "Large prints, posters, technical drawings"],
            ["A5", "148 x 210 mm", "Booklets, notebooks, half-page prints"],
            ["Fit to image", "Matches image dimensions", "Exact reproduction, no margins"],
          ],
        },
      },
      createAnswerFirstSection(
        "Common Uses for Image to PDF Conversion",
        "Combining multiple product photos into a single catalogue PDF for clients. Archiving receipts, documents, and whiteboard photos as searchable PDF files. Creating photo books and portfolios for printing. Packaging presentation slides or design mockups into a shareable document.",
        "Students use it to combine scanned assignment pages into a single submission file. Real estate agents combine property photos into listing documents. Teachers create printable worksheet packs from individual image files."
      ),
      createAnswerFirstSection(
        "Tips for Best Quality",
        "Use the highest quality source images available. The PDF embeds images at their original resolution, so a low-resolution image will look pixelated when printed. For print-quality results, use images that are at least 300 DPI at the intended print size. For screen viewing only, 150 DPI is sufficient.",
        "If your images are different sizes, the 'fit to page' option scales each image to fill the page while maintaining its aspect ratio. The 'fit to image' page size option creates pages that match each image exactly, which is ideal when you want no margins or whitespace."
      ),
    ],
    faqs: [
      createFAQ(
        "Does converting images to PDF reduce quality?",
        "No. The images are embedded in the PDF at their original quality. The PDF is essentially a container that holds the images without re-compressing them. The file size of the PDF will be roughly equal to the total size of all the images combined."
      ),
      createFAQ(
        "Can I combine different image formats in one PDF?",
        "Yes. You can mix JPG, PNG, and WebP images in the same PDF. Each image is placed on its own page regardless of format. PNG transparency is preserved on the PDF page."
      ),
      createFAQ(
        "How do I control the order of images in the PDF?",
        "Images appear in the PDF in the order you upload them. Drag and drop to rearrange the order before generating the PDF. The first image becomes page 1, the second becomes page 2, and so on."
      ),
    ],
    relatedTools: [
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "png-to-jpg", label: "PNG to JPG" },
    ],
  },

  "favicon-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Generate a Favicon for Your Website",
        "Upload an image (logo, icon, or any square graphic) and the tool generates all the favicon sizes your website needs. Download a complete package including ICO, PNG, and Apple Touch Icon files ready to add to your site. The tool handles resizing, cropping, and format conversion automatically.",
        "Favicons are the small icons that appear in browser tabs, bookmarks, home screens, and search results next to your website name. They help users identify your site quickly among many open tabs and bookmark entries. A missing favicon makes your site look unfinished."
      ),
      {
        heading: "Favicon Sizes and Where They Are Used",
        table: {
          headers: ["Size", "Format", "Used By"],
          rows: [
            ["16x16", "ICO/PNG", "Browser tab icon (standard)"],
            ["32x32", "ICO/PNG", "Browser tab icon (high-DPI), taskbar"],
            ["48x48", "ICO/PNG", "Windows site shortcut"],
            ["180x180", "PNG", "Apple Touch Icon (iOS home screen)"],
            ["192x192", "PNG", "Android Chrome home screen"],
            ["512x512", "PNG", "Progressive Web App splash screen"],
          ],
        },
      },
      createAnswerFirstSection(
        "How to Add a Favicon to Your Website",
        "Place the favicon files in your website's root directory or a dedicated icons folder. Add link tags to the head section of your HTML. The essential tags are: a link with rel 'icon' pointing to your favicon.ico, a link with rel 'apple-touch-icon' pointing to the 180x180 PNG, and optionally a web app manifest linking the 192x192 and 512x512 sizes.",
        "Most modern browsers look for favicon.ico in the root directory automatically, even without a link tag. However, adding explicit link tags ensures all browsers and platforms find the correct icon and size. The Apple Touch Icon is particularly important for iOS users who save your site to their home screen."
      ),
      createAnswerFirstSection(
        "Tips for a Good Favicon",
        "Keep it simple. Favicons display at tiny sizes (16x16 pixels), so fine detail is lost. Use bold shapes, simple icons, or a single letter from your brand name. High contrast between the icon and background helps visibility. Avoid photographs or complex illustrations.",
        "If your logo does not work at small sizes, create a simplified version. Many brands use just their initial letter or a simplified icon mark as their favicon. Test your favicon against both light and dark browser themes to make sure it is visible in both."
      ),
    ],
    faqs: [
      createFAQ(
        "What image should I use for my favicon?",
        "A square version of your logo or brand mark works best. If your logo is horizontal or complex, use a simplified version, like just the icon or the first letter of your brand name. The source image should be at least 512x512 pixels for the best quality across all sizes."
      ),
      createFAQ(
        "Do I need all the sizes?",
        "At minimum, you need a 32x32 ICO or PNG for browser tabs. For a complete setup, include 16x16, 32x32, 180x180 (Apple), and 192x192 (Android). The 512x512 size is only needed if your site is a Progressive Web App. This tool generates all sizes from a single upload."
      ),
      createFAQ(
        "Why is my favicon not showing up?",
        "Browsers cache favicons aggressively. After uploading a new favicon, try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R), clear your browser cache, or test in a private/incognito window. Also check that the file path in your HTML link tags matches the actual file location on your server."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "png-to-jpg", label: "PNG to JPG" },
    ],
  },

  "image-dimensions": {
    sections: [
      createAnswerFirstSection(
        "How to Check Image Dimensions",
        "Upload any image and the tool instantly displays its width, height, aspect ratio, file size, format, and megapixel count. No processing or conversion happens; the tool simply reads and displays the metadata and pixel dimensions of your file.",
        "Image dimensions are measured in pixels (px). Width is the number of pixels across, and height is the number of pixels from top to bottom. A 1920x1080 image is 1920 pixels wide and 1080 pixels tall. These dimensions determine how large the image appears on screen and how much detail it contains when printed."
      ),
      {
        heading: "Recommended Resolutions for Different Uses",
        table: {
          headers: ["Use", "Recommended Size", "Why"],
          rows: [
            ["Website images", "1200-1920px wide", "Fills most screens without excess file size"],
            ["Social media posts", "1080x1080 to 1200x1200", "Optimal for Instagram, Facebook, Twitter feeds"],
            ["Email attachments", "800-1200px wide", "Loads quickly, looks good on all devices"],
            ["Print (A4, 300 DPI)", "2480x3508px", "Crisp detail at standard print resolution"],
            ["Print (photo 6x4, 300 DPI)", "1800x1200px", "Standard photo print size at full quality"],
            ["4K display", "3840x2160px", "Full resolution for 4K monitors and TVs"],
          ],
        },
      },
      createAnswerFirstSection(
        "Understanding Aspect Ratio",
        "Aspect ratio is the proportional relationship between an image's width and height. Common ratios include 16:9 (widescreen, used for videos and presentations), 4:3 (traditional monitor shape), 3:2 (standard photo camera format), and 1:1 (square, popular on social media). The ratio stays the same regardless of the image's actual pixel size.",
        "Knowing an image's aspect ratio helps when resizing, cropping, or fitting images into specific layouts. If you resize a 16:9 image to fit a 1:1 square frame, parts of the image will be cropped off. Matching aspect ratios avoids distortion and unwanted cropping."
      ),
      createAnswerFirstSection(
        "What Are Megapixels?",
        "Megapixels measure the total number of pixels in an image. A 12-megapixel image has 12 million pixels, for example 4000x3000. More megapixels means more detail, which matters for printing and cropping. A 12MP photo can be printed clearly at A4 size (300 DPI) or cropped significantly while still retaining enough resolution for web use.",
        "For web and social media, 2-4 megapixels is plenty. For printing, 8-12 megapixels produces excellent results at typical print sizes. Professional photography often uses 24-50 megapixels to allow for heavy cropping and large-format printing."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between image dimensions and resolution?",
        "Dimensions are the width and height in pixels (e.g. 1920x1080). Resolution is the pixel density, usually measured in DPI (dots per inch) or PPI (pixels per inch). Dimensions tell you how many pixels exist. Resolution tells you how densely those pixels are packed when displayed or printed. A 1920x1080 image at 72 DPI looks large on screen but only prints at about 27x15 inches. The same image at 300 DPI prints at about 6.4x3.6 inches but with much finer detail."
      ),
      createFAQ(
        "How many megapixels do I need?",
        "For web use and social media, even 2 megapixels is sufficient. For printing at standard sizes (up to A4 or 8x10 inches), 8-12 megapixels is ideal. For large prints, billboards, or heavy cropping, 20+ megapixels provides more flexibility. More megapixels also means larger file sizes, so do not use more than you need."
      ),
      createFAQ(
        "Why is my image blurry when I print it?",
        "The image likely does not have enough pixels for the print size. For sharp prints, you need at least 300 pixels per inch (DPI). Divide your image width by 300 to find the maximum sharp print width in inches. For example, a 1800px wide image prints sharply at up to 6 inches wide. Beyond that, the printer stretches the pixels and the result looks soft or pixelated."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "crop-image", label: "Crop Image" },
      { slug: "image-to-pdf", label: "Image to PDF" },
    ],
  },

  "adjust-image-saturation": {
    sections: [
      createAnswerFirstSection(
        "What Is Image Saturation?",
        "Saturation controls the intensity of colours in an image. Higher saturation makes colours more vivid and vibrant, while lower saturation pushes colours towards grey. At zero saturation, the image becomes completely black and white. Upload any photo, drag the slider, and see the result update in real time.",
        "Every pixel in an image has three properties: hue (the actual colour), lightness (how bright it is), and saturation (how pure or intense that colour is). When you increase saturation, you are pushing each colour closer to its purest form. When you decrease it, you are mixing in more grey."
      ),
      createAnswerFirstSection(
        "When to Increase or Decrease Saturation",
        "Increase saturation when photos look flat or washed out, for example shots taken on an overcast day, indoor photos with poor lighting, or food photography that needs colours to pop. Decrease saturation when you want a muted, film-like aesthetic, a calmer mood for portraits, or a desaturated background that makes a subject stand out.",
        "Be careful not to over-saturate. Pushing the slider too high makes skin tones look unnatural and bright areas clip into neon. A boost of 10 to 25% is usually enough to bring a dull photo to life without looking overdone."
      ),
      {
        heading: "Saturation Slider Guide",
        table: {
          headers: ["Slider Value", "Effect", "Best For"],
          rows: [
            ["-100%", "Full greyscale, no colour", "Black and white conversions"],
            ["-50% to -25%", "Muted, desaturated tones", "Film look, moody portraits, vintage aesthetic"],
            ["0%", "Original image, no change", "Baseline comparison"],
            ["+10% to +25%", "Subtle colour boost", "Dull photos, overcast day shots, food photography"],
            ["+25% to +50%", "Vivid, punchy colours", "Landscapes, product photos, social media posts"],
            ["+50% to +100%", "Extreme saturation", "Artistic effects, abstract art, psychedelic style"],
          ],
        },
      },
      createAnswerFirstSection(
        "Saturation vs Vibrance",
        "Saturation increases the intensity of all colours equally, which can make already-bright colours clip and skin tones turn orange. Vibrance is a smarter adjustment that boosts muted colours more than already-saturated ones, and it protects skin tones from shifting. Most professional editors use vibrance for portraits and saturation for landscapes or product shots.",
        "This tool adjusts saturation uniformly across the image. If you need to boost only the dull areas while keeping bright areas natural, consider making a smaller saturation adjustment and combining it with a contrast or brightness tweak."
      ),
    ],
    faqs: [
      createFAQ(
        "Will increasing saturation make skin tones look unnatural?",
        "Yes, high saturation boosts affect skin tones heavily because skin contains a lot of warm colour. A boost above 25% often makes faces look orange or sunburnt. For portraits, keep saturation increases modest (10 to 15%) or use vibrance in a dedicated photo editor if available."
      ),
      createFAQ(
        "Can I use saturation to convert a photo to black and white?",
        "Yes. Dragging the saturation slider all the way to -100% removes all colour information, producing a greyscale image. This is a quick way to create a black and white version, though dedicated greyscale tools offer more control over how individual colours map to shades of grey."
      ),
      createFAQ(
        "Is this tool free and private?",
        "Yes, completely free with no watermarks or limits. All processing happens in your browser using the HTML Canvas API. Your images are never uploaded to any server."
      ),
    ],
    relatedTools: [
      { slug: "adjust-image-brightness", label: "Adjust Image Brightness" },
      { slug: "adjust-image-contrast", label: "Adjust Image Contrast" },
      { slug: "adjust-image-hue", label: "Adjust Image Hue" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
    ],
  },

  "adjust-image-hue": {
    sections: [
      createAnswerFirstSection(
        "What Is Hue Rotation?",
        "Hue rotation shifts every colour in your image around the colour wheel by a specified number of degrees. A 0 degree rotation leaves the image unchanged. A 180 degree rotation maps every colour to its exact opposite, turning reds into cyans, blues into oranges, and greens into magentas. Upload a photo, drag the slider, and the preview updates instantly.",
        "The colour wheel arranges all hues in a circle from 0 to 360 degrees. Red sits at 0, yellow at 60, green at 120, cyan at 180, blue at 240, and magenta at 300. When you rotate by a given number of degrees, each pixel's hue moves that many steps around the wheel while its brightness and saturation stay the same."
      ),
      {
        heading: "Hue Rotation Degree Guide",
        table: {
          headers: ["Degrees", "Effect", "Example"],
          rows: [
            ["0", "No change, original colours", "Original photo"],
            ["30", "Slight warm shift", "Reds shift towards orange, greens towards teal"],
            ["60", "Moderate shift", "Reds become yellow, blues become violet"],
            ["90", "Strong shift", "Reds become green-yellow, greens become blue"],
            ["120", "Major colour swap", "Reds become green, greens become blue, blues become red"],
            ["180", "Complementary colours", "Every colour becomes its opposite"],
            ["270", "Reverse major swap", "Reds become blue, blues become green"],
          ],
        },
      },
      createAnswerFirstSection(
        "Creative Uses for Hue Shifting",
        "Hue rotation is a popular technique for colour grading and artistic effects. Photographers use subtle shifts (10 to 30 degrees) to create warm or cool colour casts across an entire image. Designers use larger shifts to create colour variations of the same graphic, for example generating a blue version and a green version of the same illustration without redrawing anything.",
        "Other creative uses include creating surreal or psychedelic art, making infrared-style landscapes (shift greens towards reds or magentas), producing pop art colour variations, and generating alternative colourways for branding or product mockups."
      ),
      createAnswerFirstSection(
        "How Hue Rotation Differs from Colour Filters",
        "A colour filter overlays a single tint across the image, pushing everything towards one colour. Hue rotation preserves the relationships between colours and simply moves them all around the wheel together. The image retains its full range of distinct colours, they are just different colours. This makes hue rotation useful for recolouring while keeping visual variety.",
        "For example, applying a blue filter to a sunset makes everything blue-tinted. Rotating the hue by 180 degrees turns the warm oranges and reds into cool cyans and teals, but the sky, clouds, and landscape each remain distinct from one another."
      ),
    ],
    faqs: [
      createFAQ(
        "Does hue rotation affect brightness or saturation?",
        "No. Hue rotation only changes which colour each pixel displays. The brightness (lightness) and saturation (colour intensity) of every pixel remain exactly the same. The image keeps the same tonal structure, just with shifted colours."
      ),
      createFAQ(
        "What happens if I rotate by 360 degrees?",
        "A 360 degree rotation brings every colour full circle back to its starting position, so the image looks identical to the original. Similarly, rotating by -90 degrees produces the same result as rotating by +270 degrees."
      ),
      createFAQ(
        "Can I use hue rotation to fix white balance?",
        "Hue rotation is not the right tool for white balance correction. White balance problems involve colour temperature (warm vs cool tint), which is better fixed with temperature and tint sliders. Hue rotation shifts all colours equally, which can fix one colour cast but introduce another."
      ),
    ],
    relatedTools: [
      { slug: "adjust-image-saturation", label: "Adjust Image Saturation" },
      { slug: "adjust-image-brightness", label: "Adjust Image Brightness" },
      { slug: "invert-image-colors", label: "Invert Image Colors" },
      { slug: "rainbow-filter", label: "Rainbow Filter" },
    ],
  },

  "gif-to-png": {
    sections: [
      createAnswerFirstSection(
        "How to Convert GIF to PNG",
        "Upload your GIF file and the tool extracts the first frame as a high-quality PNG image. The conversion happens instantly in your browser. Click download to save the PNG file. This works with both animated GIFs and static GIFs.",
        "When you convert an animated GIF, only the first frame is extracted. The animation data, timing, and subsequent frames are discarded. If you need a specific frame from the animation rather than the first one, you may need a frame-by-frame GIF editor to select the exact frame before converting."
      ),
      createAnswerFirstSection(
        "When to Convert GIF to PNG",
        "Convert when you need a still image from a GIF for use in a document, presentation, or design project. PNG is also the better choice when you need transparency support with crisp edges, since GIF only supports binary transparency (fully transparent or fully opaque) while PNG supports smooth, graduated alpha transparency.",
        "Other common reasons include: extracting a thumbnail from an animated GIF, reducing file size when you only need a single frame, preparing an image for editing in tools that do not support GIF input, or replacing a GIF on a website with a lighter static image for faster page loading."
      ),
      {
        heading: "GIF vs PNG Comparison",
        table: {
          headers: ["Feature", "GIF", "PNG"],
          rows: [
            ["Animation", "Supported (multiple frames)", "Not supported (single image)"],
            ["Colour depth", "256 colours maximum", "16.7 million colours (24-bit)"],
            ["Transparency", "Binary only (on or off per pixel)", "Full alpha channel (graduated transparency)"],
            ["Compression", "Lossless, limited by colour palette", "Lossless, full colour range"],
            ["Best for", "Simple animations, small icons", "Screenshots, graphics, images needing transparency"],
            ["File size", "Small for simple graphics, large for animations", "Moderate, larger than JPG for photos"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "What happens to the animation when I convert to PNG?",
        "The animation is removed entirely. PNG does not support animation, so only the first frame of the GIF is extracted and saved as a static image. All other frames, frame delays, and loop settings are discarded."
      ),
      createFAQ(
        "Will the image quality change during conversion?",
        "The quality of the extracted frame will be the same as or better than the original GIF. GIF is limited to 256 colours, so any colour banding or dithering from the GIF is preserved. The PNG output supports millions of colours, so no additional quality is lost in the conversion."
      ),
      createFAQ(
        "Is my file uploaded to a server?",
        "No. The conversion runs entirely in your browser. Your GIF file is never sent anywhere, and the PNG is generated locally on your device. This makes it safe for private or sensitive images."
      ),
    ],
    relatedTools: [
      { slug: "png-to-jpg", label: "PNG to JPG" },
      { slug: "jpg-to-png", label: "JPG to PNG" },
      { slug: "webp-to-png", label: "WebP to PNG" },
      { slug: "image-compressor", label: "Image Compressor" },
    ],
  },
};
