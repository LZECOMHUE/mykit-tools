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

  "3d-print-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "What This Calculator Includes (and Why Most Free Calculators Get It Wrong)",
        "Most online 3D print cost calculators only count the filament. This one adds the four hidden costs that actually determine whether you make money on a print: electricity, printer depreciation, failure overhead, and labour. The total cost formula is: (filament + electricity + depreciation) × (1 + failure rate %) + labour cost.",
        "Worked example. A 50g PLA print at £18 per kg uses £0.90 of filament. On a 350-watt printer running for 2 hours at £0.28 per kWh, electricity is £0.20. A £350 printer with a 5,000-hour lifespan adds £0.14 of depreciation per print. Subtotal: £1.24. With a 10% failure rate that becomes £1.36. Add 20 minutes of post-processing at £12 per hour (£4.00) and the true cost is £5.36. The filament alone was just 17% of that. This is why charging customers \"twice the filament cost\" leaves you working for free."
      ),
      createAnswerFirstSection(
        "Setting a Realistic Failure Rate",
        "If you are honest, your failure rate is probably 10 to 15%, not the 5% most makers claim. That includes prints that come out usable but with visible defects you would not sell, prints that fail mid-way and waste filament, and prints you have to throw away because of warping, layer separation, or stringing.",
        "FDM printers with a year of tinkering and a known-good profile can hit 5%. Resin printers fresh out of the box are closer to 20% until you dial in exposure times for each new resin. Bigger and longer prints fail more often than small quick ones (a 36-hour print has 36 hours of opportunities to go wrong). Bumping the failure rate slider from 5% to 15% on a £20 print adds £2 to the cost; that £2 covers the eventual print you bin. Underestimating failure rate is the single most common reason makers run their Etsy shop at a loss without realising."
      ),
      createAnswerFirstSection(
        "Depreciation: The Hidden Cost That Builds Up Fast",
        "Depreciation is the printer's purchase price spread across its expected lifespan in print hours. A £600 Bambu P1S with a realistic 5,000-hour lifespan costs you £0.12 per print hour. On an 8-hour print that is just £0.96, but at 50 prints a month that is £48 a month going toward eventual replacement.",
        "Pick a lifespan honestly. A budget Ender 3 might give you 3,000 to 4,000 hours before major repairs become uneconomical. A premium machine like the Prusa MK4 or Bambu X1C will last 8,000 to 10,000+ hours of regular use. Halfway through the lifespan you will probably replace the hot-end (£30 to £50), nozzles (£5 each), build plate (£20 to £50) and eventually the mainboard. Add roughly 30% to the printer purchase price to estimate true total cost of ownership; the calculator does this implicitly when you set lifespan accurately."
      ),
      createAnswerFirstSection(
        "Pricing for Etsy, Local Sales and Custom Commissions",
        "If you are selling prints, the cost figure is the floor, not the price. Most successful Etsy 3D print shops use a markup of 200 to 400% on the calculator's total cost figure, then test against what comparable items actually sell for on the platform. The calculator's markup field defaults to 40% which suits commission work; for retail you usually need much more.",
        "A £5.36 cost item with 40% markup sells for £7.50, which leaves £2.14 profit per print before Etsy's 6.5% transaction fee, the £0.20 listing fee, payment processing, and shipping costs. After all of that you might keep £1.20. To make Etsy worth your time you generally need either much higher per-item profit (charge £15 to £20 for that £5.36 item) or volume that lets you batch prints. Use the [filament comparison](/filament-comparison) tool to find cheaper material alternatives and the [filament usage calculator](/filament-calculator) to plan whether your current spool is enough for a job."
      ),
      {
        heading: "Cost Breakdown for Common Print Scenarios",
        table: {
          headers: ["Print", "Filament", "Time", "True Cost", "Etsy Price (200% markup)"],
          rows: [
            ["Keychain (PLA)", "5g", "15 min", "£0.95", "£2.85"],
            ["Phone stand (PLA)", "30g", "2 hr", "£3.20", "£9.60"],
            ["Vase (PETG)", "120g", "8 hr", "£8.40", "£25.20"],
            ["Cosplay helmet (PLA, multi-part)", "400g", "36 hr", "£32.80", "£98.40"],
            ["Resin miniature batch (8 figures)", "60ml", "5 hr", "£6.50", "£19.50"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How do I work out how much filament my print uses?",
        "Your slicer gives the exact figure. In Cura, look at the bottom-right of the preview screen for grams and metres of filament. In PrusaSlicer, the info panel shows total filament in g and the cost (if you set the price per kg). Bambu Studio and OrcaSlicer both display estimated material in the slice summary. Always slice with the same settings you will print at, since infill, walls and supports change the figure significantly."
      ),
      createFAQ(
        "What is the cheapest filament that actually works well?",
        "Generic PLA from a reputable brand sits around £15 to £20 per kg in 2026 and prints reliably on almost any machine. Sunlu, Eryone and Polymaker are common budget choices that match Prusament quality at half the price. Avoid no-brand £10 spools; they are cheap because of inconsistent diameter, brittle filament and contaminated resin, all of which push your failure rate up far more than the savings justify."
      ),
      createFAQ(
        "Should I include my time in the cost?",
        "If you are printing for hobby use, no. If you are selling, absolutely yes. Post-processing (removing supports, sanding, painting, glueing, packaging) is usually 15 to 45 minutes per print and adds up fast. If you do not include labour, you are subsidising your customers from your own free time. The calculator defaults to £12 per hour (UK minimum-ish) but you should set a rate you would actually accept for skilled work, typically £15 to £25."
      ),
      createFAQ(
        "Is FDM or resin cheaper to run?",
        "FDM is cheaper per gram of material (£18 per kg PLA versus £30 to £60 per litre of resin) and uses less electricity. Resin is cheaper per minute of print time for small detailed parts because resin printers cure a whole layer at once regardless of how much area is on it. For miniatures, jewellery, and small detailed parts, resin wins. For brackets, enclosures, large parts and prototyping, FDM wins."
      ),
      createFAQ(
        "How much should I charge for a custom commission?",
        "Take the calculator's true cost figure, multiply by 2.5 to 3.5 for commission work (more if the design is custom and not just printing a customer file), then add any design time at £25 to £50 per hour. A simple commission of an existing model with 1 hour of design work typically lands at £25 to £60. If you are getting low-balled, walk away; race-to-the-bottom commission work eats your printer hours and produces nothing for your portfolio."
      ),
    ],
    relatedTools: [
      { slug: "filament-calculator", label: "Filament Usage Calculator" },
      { slug: "filament-comparison", label: "Filament Comparison" },
      { slug: "3d-print-pricing-guide", label: "3D Print Pricing Guide" },
    ],
  },

  "candle-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Does It Actually Cost to Make a Candle?",
        "A standard 200ml soy candle works out to roughly £2.80 to £3.40 in materials and 20 minutes of labour, putting your true cost around £4.80. The big variables are wax type and fragrance load. Soy at £8 per kg is the cheap workhorse; beeswax at £15 per kg roughly doubles the wax line.",
        "The calculator assumes 0.9 grams of wax per ml of container space, which accounts for the air gap at the top and the volume the wick takes up. A 200ml jar therefore needs about 180g of wax, costing £1.44 in soy or £2.70 in beeswax. Fragrance is the second biggest cost: an 8% load on that same 200ml jar uses 16g of fragrance oil, which at the typical UK trade price of £4.50 per 100ml costs £0.72. Once you add a £0.50 wick, £1.20 container, £0.30 label and 20 minutes of labour at £12 per hour, you land at around £4.80 of true cost before any markup."
      ),
      createAnswerFirstSection(
        "How Much to Charge: Markup, Margin and the Etsy Reality",
        "A 60% markup on a £4.80 cost candle gives a £7.68 selling price and a 37.5% gross margin. That sounds healthy until Etsy takes its cut. After the 6.5% transaction fee, £0.20 listing fee, payment processing and postage, you typically keep around £4.50 net on a £7.68 sale - basically your costs back, with no real labour pay.",
        "This is why candle sellers who actually make money price at 2.5x to 4x their materials cost, not 1.5x. A £4.80 cost candle usually needs to retail at £14 to £18 to leave room for marketplace fees, returns, broken jars in transit and the dozens of little expenses that never make it into a calculator (printer ink, packing tape, the box you bought for shipping). The [Etsy fee calculator](/etsy-fee-calculator) shows exactly what each platform takes, and the [side hustle hourly rate](/side-hustle-hourly-rate) tool tells you whether your batch is paying you a real wage once everything is accounted for."
      ),
      {
        heading: "Realistic Cost Per Candle by Wax Type and Size",
        table: {
          headers: ["Container", "Wax Type", "Wax Cost", "Fragrance (8%)", "Total Materials", "Suggested Retail"],
          rows: [
            ["100ml", "Soy", "£0.72", "£0.36", "£2.58", "£8 to £10"],
            ["200ml", "Soy", "£1.44", "£0.72", "£3.66", "£14 to £18"],
            ["200ml", "Coconut", "£2.16", "£0.72", "£4.38", "£18 to £22"],
            ["200ml", "Beeswax", "£2.70", "£0.72", "£4.92", "£22 to £28"],
            ["300ml", "Soy", "£2.16", "£1.08", "£5.04", "£20 to £26"],
          ],
        },
      },
      createAnswerFirstSection(
        "Batch Pricing and the Hidden Efficiency Gain",
        "When you make a batch of 10 candles instead of one, the labour per candle drops because melting wax, weighing fragrance and washing pouring jugs is roughly the same effort whether you make 1 or 12. The calculator builds in a 15% labour efficiency gain on batches, which usually understates reality once you have a real production setup with multiple pouring stations.",
        "A batch of 12 candles using the £4.80 unit cost above lands at roughly £53 in total cost (versus £57.60 if you priced each individually), revenue of £92.16 at the £7.68 retail, and £39 batch profit before fees. Realistic profit after Etsy fees and postage on 12 sales is closer to £18 to £22. That is two and a half hours of work for £20: better than nothing but it explains why successful candle businesses lean hard on direct sales (markets, Instagram, repeat customers) where the platform fee is zero."
      ),
    ],
    faqs: [
      createFAQ(
        "How much fragrance oil should I add to soy wax?",
        "Soy wax safely holds 8 to 12% fragrance load by weight. For a 200ml container with about 180g of wax, that is 14g to 22g of fragrance oil. Beeswax is much lower at 4 to 6% maximum because the natural honey scent competes and the structure cannot bind more oil. Paraffin sits in the middle at 6 to 10%. Going above the safe maximum causes oil to weep out of the wax surface and creates fire risk."
      ),
      createFAQ(
        "Is soy or beeswax cheaper for a small candle business?",
        "Soy is roughly half the cost of beeswax (£8 versus £15 per kg in 2026 UK prices) and pours more easily, which is why most starter candle makers begin with soy. Beeswax has a higher perceived value, so you can charge £6 to £10 more per candle, but the upfront cost per batch is significantly higher and the natural scent limits which fragrances actually work."
      ),
      createFAQ(
        "What hourly rate should I pay myself when pricing candles?",
        "If you do not pay yourself anything, you are subsidising your customers. £12 per hour is the bare minimum that keeps you above the UK National Living Wage. £15 to £20 per hour is more realistic for skilled craft work; £25 to £30 if you are doing custom commissions or wedding favours where the design work itself takes time. The [wax melt calculator](/wax-melt-calculator) and [fragrance load calculator](/fragrance-load-calculator) use the same labour assumptions if you are pricing other products."
      ),
      createFAQ(
        "Why does my candle cost calculator say I am losing money?",
        "Usually one of three reasons. Either your fragrance oil is much more expensive than the £4.50 per 100ml default (premium oils run £8 to £15 per 100ml and crush margins), your container cost is high because you are buying in small quantities (£3 jars at retail versus £1.20 at wholesale), or your hourly rate is too high for the price point you are aiming at. Drop the wholesale containers to get unit cost down, or push retail price up to keep your hourly rate intact."
      ),
      createFAQ(
        "Do I need insurance and CLP labels to sell candles in the UK?",
        "Yes to both, and neither is in the calculator because they are fixed business costs rather than per-candle costs. Public liability insurance for a small candle maker runs £80 to £150 per year. CLP-compliant labels (which list the fragrance allergens and hazard warnings) need a chemist-issued safety data sheet for each fragrance, which costs £10 to £20 per fragrance. Spread across a year of sales these add maybe £0.10 to £0.30 per candle."
      ),
    ],
    relatedTools: [
      { slug: "wax-melt-calculator", label: "Wax Melt Calculator" },
      { slug: "fragrance-load-calculator", label: "Fragrance Load Calculator" },
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" },
    ],
  },

  "3d-print-pricing-guide": {
    sections: [
      createAnswerFirstSection(
        "How to Set a Selling Price for 3D Prints",
        "Take your true cost from a print cost calculator (material, electricity, depreciation, failure overhead, labour) and multiply by 1.5x to 4x depending on the category. A typical phone case costing £2.50 to make sells for £8 to £15. A miniature costing £0.80 sells for £3 to £8. The variance is huge because customer expectations vary wildly between categories.",
        "The pricing guide bakes in a default 50% markup, a 12.5% Etsy platform fee and £3.50 postage. On a £5 cost item this produces a £7.50 selling price, but after fees and postage you keep just £3.06 - meaning you have made £0.06 profit on top of cost. To actually take home meaningful money you usually need 100 to 200% markup, especially on lower-priced items where the £0.20 Etsy listing fee and 6.5% transaction fee eat a fixed slice of every sale. Use the [3D print cost calculator](/3d-print-cost-calculator) first to get accurate inputs."
      ),
      createAnswerFirstSection(
        "Market Price Ranges by Category",
        "Miniatures and figurines sit at £3 to £15. Phone cases £8 to £20. Replacement parts £5 to £25. Cosplay props £20 to £100. Planters £10 to £40. These ranges are what comparable items actually sell for on Etsy and eBay in 2026, not what they should sell for. The price marker on the calculator shows where your number lands relative to each market.",
        "Below the range usually means you are underpricing. Buyers see suspiciously cheap and assume poor quality. Within the range means the price will not stop the sale, and your listing photos and reviews do the convincing. Above the range needs justification: premium materials (Nylon, TPU, metal-filled), exceptional finishing (multi-colour painting, acetone smoothing), or a recognisable brand. A first-time seller pricing 30% above market with no reviews will get zero sales."
      ),
      createAnswerFirstSection(
        "Why Platform Fees Quietly Destroy Your Margin",
        "Etsy charges 6.5% transaction fee plus £0.20 per listing plus 4% payment processing on UK sales. eBay charges around 12.8% all-in. That £7.50 print sale after Etsy fees nets you about £6.56, then £3.50 postage comes out, leaving £3.06. Subtract your £5 cost and you are 6 pence in profit. This is why prints below £10 often lose money even when the markup looks healthy on paper.",
        "The fix is either pricing high enough that the fixed fees become a small percentage (a £30 sale with £0.20 listing fee is 0.7%, while a £6 sale is 3.3%), or shifting to channels with lower fees like local Facebook Marketplace, market stalls, or your own website. Many 3D print sellers run Etsy as a top-of-funnel discovery tool and direct repeat customers to direct order at lower prices. The [Etsy fee calculator](/etsy-fee-calculator) shows the full breakdown for any sale price."
      ),
      {
        heading: "True Profit on Common Selling Prices",
        table: {
          headers: ["Sell Price", "Etsy Fees (12.5%)", "Postage", "Net to You", "Cost £3", "Cost £5", "Cost £8"],
          rows: [
            ["£8", "£1.00", "£3.50", "£3.50", "+£0.50", "Loss £1.50", "Loss £4.50"],
            ["£12", "£1.50", "£3.50", "£7.00", "+£4.00", "+£2.00", "Loss £1.00"],
            ["£18", "£2.25", "£3.50", "£12.25", "+£9.25", "+£7.25", "+£4.25"],
            ["£25", "£3.13", "£3.50", "£18.37", "+£15.37", "+£13.37", "+£10.37"],
            ["£40", "£5.00", "£3.50", "£31.50", "+£28.50", "+£26.50", "+£23.50"],
          ],
        },
      },
    ],
    faqs: [
      createFAQ(
        "How much should I charge for a 3D print on Etsy?",
        "Take your cost from the 3D print cost calculator and multiply by 2.5 to 4 for retail. Then check the calculator's market range bars - if your figure lands inside the typical range for your category, you are competitive. Below the range and you are leaving money on the table. Above and you need premium photos, reviews and finishing to justify it. For a £3 cost item, £10 to £15 is the realistic Etsy sweet spot."
      ),
      createFAQ(
        "What is a fair markup for 3D printing?",
        "Markup depends on what you are pricing in. If your cost figure includes labour and machine time honestly, 50 to 100% markup leaves room for fees and postage. If your cost only counts material, you need 200 to 400% markup to actually pay yourself. Most successful sellers use 150 to 250% on top of an honest cost figure that includes everything: filament, electricity, machine depreciation, failure rate and post-processing time."
      ),
      createFAQ(
        "Is selling 3D prints on Etsy actually worth it?",
        "It can be, but the maths is tighter than people expect. After Etsy fees, postage and material, a £15 sale typically nets £8 to £10 of profit. To make the equivalent of a £15 per hour wage you need to sell roughly two prints per hour of work invested (including listing time, customer messages, packing). High-volume sellers with batch printing make it work; one-off custom commissions usually do not pay below £25 per item."
      ),
      createFAQ(
        "Should I include postage in the price or charge separately?",
        "Either works but the maths is the same. Etsy's algorithm slightly favours free postage listings (the platform calls them out in search results), which is why many sellers build the £3.50 to £5 postage into the price and offer free shipping. The trick is making sure the postage bake-in does not push your price above the market range bar in the pricing guide."
      ),
      createFAQ(
        "What categories sell best for 3D prints?",
        "In 2026 the consistent sellers are: phone grips and stands (£8 to £15, low cost to make), bag charms and keychains (£3 to £8, perfect impulse buys), replacement parts for IKEA furniture and appliances (£10 to £25, low competition), cosplay accessories (£15 to £80, high markup but slow turnover), and tabletop gaming miniatures (£3 to £12, repeat-customer driven). Avoid generic decor: planters and vases are saturated and price-pressured."
      ),
    ],
    relatedTools: [
      { slug: "3d-print-cost-calculator", label: "3D Print Cost Calculator" },
      { slug: "filament-calculator", label: "Filament Usage Calculator" },
      { slug: "etsy-fee-calculator", label: "Etsy Fee Calculator" },
    ],
  },

  "pixel-dpi-calculator": {
    sections: [
      createAnswerFirstSection(
        "What DPI Should I Use? The Quick Answer",
        "72 DPI for screen-only graphics, 96 DPI for Windows displays, 150 DPI for web images you want to look sharp on Retina screens, and 300 DPI for any image you plan to print. 600 DPI exists for line art and high-quality archival print but is overkill for most photographic work.",
        "DPI (dots per inch) and PPI (pixels per inch) describe how densely pixels are packed into a physical inch when displayed or printed. A 1920x1080 image displayed at 96 DPI takes up 20 inches by 11.25 inches; the same image printed at 300 DPI is just 6.4 inches by 3.6 inches. The pixel count never changes - only the physical size does. This is why exporting a web graphic at 300 DPI does not make it sharper; it just metadata-tags it for print at a smaller physical size."
      ),
      createAnswerFirstSection(
        "Pixel Dimensions for Common Print Sizes",
        "A4 at 300 DPI needs 2480 x 3508 pixels. US Letter at 300 DPI needs 2550 x 3300 pixels. A 4x6 inch photo print needs 1200 x 1800 pixels. If your source image is smaller than these targets, the printer will upscale and the result will look soft. If the image is larger, the printer downsamples and quality is fine.",
        "The maths is simple: pixels = inches × DPI. A 5x7 print at 300 DPI needs 1500 x 2100 pixels. A 16x20 poster at 300 DPI needs 4800 x 6000 pixels (28.8 megapixels - more than most phone cameras produce). For posters larger than A2 you can drop to 200 DPI without visible quality loss because the typical viewing distance is further away. Use the [aspect ratio calculator](/aspect-ratio-calculator) to plan crops before you size for print."
      ),
      {
        heading: "Pixel Requirements by Print Size and Quality",
        table: {
          headers: ["Print Size", "150 DPI (web/draft)", "300 DPI (photo)", "600 DPI (archival)"],
          rows: [
            ["4x6 inch photo", "600 x 900", "1200 x 1800", "2400 x 3600"],
            ["5x7 inch photo", "750 x 1050", "1500 x 2100", "3000 x 4200"],
            ["8x10 inch photo", "1200 x 1500", "2400 x 3000", "4800 x 6000"],
            ["A4 (8.27 x 11.69 in)", "1240 x 1754", "2480 x 3508", "4960 x 7016"],
            ["A3 (11.69 x 16.54 in)", "1754 x 2481", "3508 x 4961", "7016 x 9922"],
          ],
        },
      },
      createAnswerFirstSection(
        "Common DPI Mistakes That Ruin Print Jobs",
        "The classic error is pulling a 1080 x 1080 Instagram image and trying to print it at A4. At 300 DPI that image is just 3.6 inches square - smaller than a postcard. Stretched up to A4, every pixel becomes roughly 6 actual print dots and the result looks like a screenshot of a screenshot. The image needed to be at least 2480 x 2480 to print A4 cleanly.",
        "The other common mistake is the opposite: shooting in 24 megapixels and emailing the full file when a 1500-pixel-wide version would have done. That 24MP raw is 50MB+ as JPEG and chokes the recipient's inbox. For email and web, 1500 to 2400 pixels on the longest edge at 72 to 96 DPI is plenty. Use the [image resizer](/image-resizer) and [image compressor](/image-compressor) to bring file sizes down before sending. The DPI tag on a screen-only image literally does nothing - it is metadata that print software uses, not browsers."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the difference between DPI and PPI?",
        "Technically DPI (dots per inch) refers to printer dots and PPI (pixels per inch) refers to screen pixels, but in practice the terms are used interchangeably for image resolution. Photoshop labels the field as PPI; print shops and image software usually call it DPI. The number means the same thing: how many image pixels are crammed into one inch of physical output."
      ),
      createFAQ(
        "Does changing DPI from 72 to 300 improve quality?",
        "No. Changing the DPI metadata field alone does nothing to the actual pixels. It only changes how big the image will print. A 1920 x 1080 image at 72 DPI prints at 26.7 x 15 inches; the same file at 300 DPI prints at 6.4 x 3.6 inches. To genuinely improve quality you need either more pixels (re-shoot, re-render, or AI upscale) or to print smaller."
      ),
      createFAQ(
        "How many pixels do I need for a sharp A4 print?",
        "2480 x 3508 pixels is the standard for A4 at 300 DPI. If you only have 1240 x 1754 you can still print at 150 DPI and get a perfectly readable result for most uses (newsletters, posters viewed from a distance, draft proofs). Anything below 1000 pixels on the long edge of an A4 print will look visibly fuzzy when held at arm's length."
      ),
      createFAQ(
        "Why does my Instagram photo look pixelated when printed?",
        "Instagram serves images at 1080 x 1080 maximum. At 300 DPI that prints to 3.6 x 3.6 inches - smaller than a CD case. Anything larger requires upscaling, which is why the print looks soft. To print Instagram-style square photos properly, save the original from your camera roll (likely 3024 x 3024 or larger) before posting, since Instagram heavily compresses what you upload."
      ),
      createFAQ(
        "What DPI do professional photographers use?",
        "300 DPI is the print industry standard for photo books, magazines, gallery prints up to 16x20, and most fine art applications. Newspapers and budget print runs often drop to 150 to 200 DPI to save on file size and processing time. Large format (4ft+ posters, billboards) deliberately uses 100 to 150 DPI because the viewer is far away and higher resolution is wasted."
      ),
    ],
    relatedTools: [
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "image-compressor", label: "Image Compressor" },
      { slug: "aspect-ratio-calculator", label: "Aspect Ratio Calculator" },
    ],
  },

  "aspect-ratio-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Aspect Ratio Do I Actually Need?",
        "It depends on where the image will live. YouTube thumbnails are 1280 x 720 (16:9). Instagram square posts are 1080 x 1080 (1:1). Instagram Stories and TikTok are 1080 x 1920 (9:16, vertical). Twitter/X timeline images are 1200 x 675 (16:9). Pick the platform first, then size the canvas to match - cropping a 16:9 video into a 9:16 Reel after the fact loses the top and bottom of every shot.",
        "If your tool input shows a ratio like 17:9 or 853:480 instead of one of the clean ratios, the image is slightly off-spec for the platform you intended. The calculator simplifies any width and height into the smallest whole-number ratio using the greatest common divisor, then matches it against standard presets like 16:9, 4:3, 21:9 and 1:1. A perfectly square 1024 x 1024 will read 1:1; an Instagram Reel-bound 1080 x 1920 reads 9:16."
      ),
      createAnswerFirstSection(
        "Locking the Ratio While Resizing",
        "Toggle the lock icon and the calculator will keep the aspect ratio fixed while you change either dimension. Type a new width and the height auto-adjusts; type a new height and the width follows. This is the right way to scale a 1920 x 1080 video frame down to 1280 x 720 for a thumbnail without distorting people's faces.",
        "Without the lock you can break the ratio on purpose, which is occasionally useful (squashing a 16:9 graphic into 1200 x 675 for a Twitter card lops a thin strip off the height because they are both 16:9 already, but a 1500 x 500 banner crop is genuinely a different ratio). The megapixel readout helps you spot when a resize has pushed an image below useful resolution: anything under 0.5 megapixels (roughly 800 x 625) starts to look soft on retina screens."
      ),
      createAnswerFirstSection(
        "Common Resolutions for Print and Video",
        "1920 x 1080 is the long-standing Full HD video standard at 16:9. 4K UHD is 3840 x 2160 (also 16:9, exactly four times the pixels of Full HD). Cinematic 21:9 widescreen typically renders at 2560 x 1080 or 3440 x 1440. For print, A4 lands at roughly 2480 x 3508 pixels at 300 DPI, which is closer to a 5:7 ratio than to any of the screen presets.",
        "A common error is assuming Instagram posts are still 1080 x 1080 - the platform now accepts 1080 x 1350 (4:5 portrait) which gets considerably more screen real estate in the feed. The [colour palette generator](/colour-palette-generator) and [font pair suggester](/font-pair-suggester) can help finalise the look once you have committed to the right canvas size."
      ),
    ],
    faqs: [
      createFAQ(
        "What does 16:9 actually mean?",
        "16:9 means for every 16 units of width, the image is 9 units tall. So a 16:9 image at 1920 wide is 1080 tall (1920 divided by 16, multiplied by 9). It is the dominant ratio for modern TVs, YouTube videos and most computer monitors. The 4:3 ratio it replaced was the standard for older CRT TVs."
      ),
      createFAQ(
        "How do I convert a 4:3 image to 16:9 without distortion?",
        "You either crop or pad. Cropping a 1024 x 768 (4:3) image to 16:9 means cutting 96 pixels off the top or bottom (1024 x 576). Padding adds 192 pixels of background colour on left and right, giving a 1365 x 768 result. Distortion - simply stretching - is what to avoid because it makes circles oval and people look squashed."
      ),
      createFAQ(
        "What aspect ratio is best for Instagram?",
        "Instagram now supports four formats: 1:1 (square 1080 x 1080), 4:5 (portrait 1080 x 1350), 9:16 (Stories and Reels at 1080 x 1920), and 1.91:1 (landscape 1080 x 566). Portrait 4:5 takes the most space in the feed and tends to perform best for static posts. Reels and Stories must be 9:16 or they get letterboxed."
      ),
      createFAQ(
        "Why does my image look different on TikTok versus Instagram?",
        "TikTok crops the visible area to 1080 x 1920 (full 9:16) but the safe zone where text and faces will not be hidden by UI is closer to 1080 x 1350. Instagram Reels apply a similar safe zone. If you mastered for one platform without keeping critical content within the centre 60% of the frame, important elements may be hidden behind buttons or captions on the other."
      ),
    ],
    relatedTools: [
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "megapixel-calculator", label: "Megapixel Calculator" },
    ],
  },

  "canvas-size-guide": {
    sections: [
      createAnswerFirstSection(
        "What Canvas Size Fits My Wall?",
        "For a small room of 10 to 15 square metres, A4 (21 x 29.7cm), A3 (29.7 x 42cm) or 30 x 40cm prints sit comfortably above a desk or in a hallway. Medium rooms suit 40 x 50cm, A2 (42 x 59.4cm) or 50 x 60cm. Large living rooms need at least 60 x 80cm to hold the wall, and a feature piece above a sofa typically wants 80 x 100cm or larger so it does not look stranded.",
        "The standard advice is that art should be roughly two-thirds the width of the furniture below it. A 180cm sofa wants a piece (or grouping) about 120cm wide. Centre the work so the middle is at eye level - around 145cm to 155cm from the floor. Hang too high and the room feels disconnected; hang too low and it competes with the sofa back."
      ),
      createAnswerFirstSection(
        "Metric Versus Imperial Canvas Sizes",
        "European canvases follow A-series and round metric sizes: A4, A3, A2, A1 plus 30 x 40, 40 x 50, 50 x 60, 60 x 80 and 70 x 100cm. American sizes are based on inches: 12 x 16, 16 x 20, 18 x 24, 24 x 36 and 30 x 40 inch. The two systems do not overlap cleanly - a 12 x 16 inch canvas is 30.5 x 40.6cm, almost but not quite the same as a 30 x 40cm European one. Off-the-shelf frames are not interchangeable.",
        "Aspect ratios vary too. A4, A3 and A2 are all 1:1.41 (the silver ratio that lets you fold one in half to get the next size down). 30 x 40cm and 40 x 50cm are both 4:5. A 24 x 36 inch canvas is 2:3 - a longer, more cinematic shape. Match the ratio to the orientation: 4:5 portrait suits posters and figure work, 2:3 landscape suits photographs and panoramic scenes."
      ),
      createAnswerFirstSection(
        "Frame and Mount Considerations",
        "European A-series canvases pair with off-the-shelf A-series frames at most home stores. Round metric sizes (30 x 40, 40 x 50) have decent frame availability in the UK and Europe. US standard sizes are easy to frame in North America but harder in Europe - expect to order custom or buy unframed. Adding a 5cm mount around a print effectively bumps it up one size: a mounted A3 needs an A2 frame.",
        "Gallery wraps (canvas stretched over a wooden frame, no external frame needed) work best at 40 x 50cm and above. Smaller canvases tend to look thin without a frame to anchor them. For floating frame effects, leave 1 to 2cm of space between the canvas edge and the frame. Use the [art pricing calculator](/art-pricing-calculator) and [painting cost calculator](/painting-cost-calculator) to budget materials before committing to a large piece."
      ),
    ],
    faqs: [
      createFAQ(
        "What size canvas should I use for a living room?",
        "For an average living room (15 to 25 square metres), aim for at least 60 x 80cm above a sofa. A pair of 50 x 70cm pieces side by side also works well. If the wall behind the sofa is over 3 metres wide, step up to 80 x 100cm or 100 x 120cm so the art holds its own against the furniture and ceiling height."
      ),
      createFAQ(
        "What is the most popular canvas size for prints?",
        "30 x 40cm and A3 (29.7 x 42cm) are the most popular sizes for home decor prints because they fit standard frames and look proportionate on most walls without overwhelming. For Etsy and gallery sales, 40 x 50cm and A2 (42 x 59.4cm) are the bestsellers - large enough to feel substantial but still easy to ship and frame."
      ),
      createFAQ(
        "Can I frame a 30 x 40cm canvas in an A3 frame?",
        "No, the dimensions are slightly different. A3 is 29.7 x 42cm; a 30 x 40cm canvas is shorter and wider. The canvas will not sit flat in an A3 mount. You need either a 30 x 40cm frame specifically, or a custom frame cut to fit. This is the most common framing mistake when buying European canvas prints."
      ),
      createFAQ(
        "What aspect ratio is best for landscape photography?",
        "2:3 (matching most DSLR sensors) is the natural choice. That maps to 24 x 36 inch in US sizing or roughly 40 x 60cm in metric. For wide panoramic landscapes, 1:2 or 1:3 ratios work better - think 30 x 60cm or 30 x 90cm. Square 1:1 crops suit Instagram-style street and architectural photography but rarely landscape work."
      ),
    ],
    relatedTools: [
      { slug: "art-pricing-calculator", label: "Art Pricing Calculator" },
      { slug: "painting-cost-calculator", label: "Painting Cost Calculator" },
      { slug: "aspect-ratio-calculator", label: "Aspect Ratio Calculator" },
    ],
  },

  "colour-contrast-checker-pro": {
    sections: [
      createAnswerFirstSection(
        "What Contrast Ratio Do I Need?",
        "WCAG AA - the legal accessibility standard for most websites - requires 4.5:1 contrast for normal body text and 3:1 for large text (18pt or 14pt bold and above). UI components like buttons and form borders need at least 3:1 against their background. The stricter AAA standard, which you should aim for on critical reading content like long-form articles, demands 7:1 for normal text and 4.5:1 for large text.",
        "Black on white sits at 21:1 - the maximum possible. Pure white on a mid-grey #777777 lands at exactly 4.48:1 and fails AA by a hair. Light grey #999 on white is 2.85:1 and fails everything. The contrast checker calculates the WCAG ratio using the relative luminance formula (it weighs green more than red and red more than blue, matching how human eyes perceive brightness)."
      ),
      createAnswerFirstSection(
        "Why Contrast Matters Beyond Compliance",
        "About 8% of men and 0.5% of women have some form of colour vision deficiency. People over 40 lose contrast sensitivity gradually, and outdoor screen use in bright sunlight effectively halves the contrast you experience indoors. Designing to WCAG AA is not just legal cover - it is what makes your interface readable for the actual humans using it on a phone in a sunlit cafe.",
        "The classic mistake is using brand colours that look great on a designer's calibrated monitor but fail on real devices. A subtle medium-grey body text at #888888 on white renders as 3.54:1 - it looks elegant in mockups and unreadable on a Kindle. The checker gives you nearby accessible variations: bumping #888 down to about #6b6b6b clears AA, and #595959 clears AAA, with minimal visual change for sighted users."
      ),
      createAnswerFirstSection(
        "Common Combinations That Just Work",
        "Black (#000000) on white (#FFFFFF) is the universal safe choice at 21:1. Dark navy #1a365d on pale blue #e0f2fe lands around 9.8:1 and clears AAA easily. White (#FFFFFF) on the standard accent blue #2563eb sits at 6.39:1 - clears AA for normal text and AAA for large. Dark on cream (#1a1a1a on #fffef0) is around 18.5:1 and works beautifully for long reading.",
        "Combinations to avoid: any pastel on white, any colour on a similar hue (red text on pink, blue on light blue), and most coloured-on-coloured combinations except true complements. Yellow on white is almost always a fail. Red on green is the worst possible choice for the 8% of people with red-green colour blindness because the two colours look identical to them. Use the [colour palette generator](/colour-palette-generator) to pick palettes with built-in contrast headroom."
      ),
    ],
    faqs: [
      createFAQ(
        "What is WCAG AA versus AAA?",
        "AA is the standard most regulators require: 4.5:1 contrast for normal text, 3:1 for large text. AAA is the enhanced level: 7:1 for normal, 4.5:1 for large. AAA is appropriate for content people read for extended periods (news articles, documentation). For interface chrome and short labels, AA is plenty and AAA can force visually heavy designs."
      ),
      createFAQ(
        "Does contrast apply to icons and logos?",
        "Logos are exempt from WCAG contrast requirements because brand identity overrides accessibility for that one element. Functional icons (a search magnifying glass, a hamburger menu) need 3:1 contrast against their background under WCAG 2.1 because users have to identify them to use the interface. Decorative icons that have a text label next to them have no contrast requirement on their own."
      ),
      createFAQ(
        "How do I fix failing contrast without changing my brand colours?",
        "Three options. First, use the brand colour for accents and headings only, with body text in near-black on white. Second, place the brand colour against a contrasting background (white text on the brand colour, instead of brand colour on white). Third, darken or lighten the brand colour by 20 to 30% for body text use - call it 'brand dark' as a separate variable. The checker's nearby accessible suggestions show you exactly how far to nudge."
      ),
      createFAQ(
        "What contrast ratio do I need for buttons?",
        "Button text needs 4.5:1 against the button background under AA (3:1 if the text is 18pt or larger). The button background also needs 3:1 against the surrounding page background, which catches the common mistake of pale-blue buttons on white. Disabled buttons are exempt from text contrast rules but still need to look visibly different from active buttons."
      ),
    ],
    relatedTools: [
      { slug: "contrast-checker", label: "Contrast Checker" },
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "font-pair-suggester", label: "Font Pair Suggester" },
    ],
  },

  "crochet-blanket-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Yarn Will I Actually Need?",
        "A throw blanket at 130 x 180cm in worsted-weight yarn using double crochet stitches needs roughly 515 metres - about 4 to 5 balls of standard 150-metre yarn. The same throw in chunky yarn needs 690 metres because each stitch eats more material. A baby blanket at 75 x 100cm in DK weight comes in at around 150 metres (1 to 2 balls); a king-size 260 x 260cm blanket in worsted weight needs over 1,500 metres or 10 to 12 balls.",
        "The calculator multiplies the area by yarn-usage-per-square-metre figures derived from the stitch type and yarn weight, then adds 10% for joining seams and edge work. It also adds one extra ball on top of the rounded total because real-life dye lots vary, frogged sections happen, and ending a project 5 metres short of the cast-off row is the most demoralising thing in crochet."
      ),
      createAnswerFirstSection(
        "Stitch Type Changes Everything",
        "Single crochet uses the least yarn per square metre because the stitches sit close together and are short. Double crochet uses about 50% more yarn but works up roughly twice as fast. Granny squares are the most yarn-hungry of the common patterns because the cluster stitches and the joining yarn add extra material per row.",
        "Yarn weight (lace, fingering, DK, worsted, aran, chunky, super-chunky) is the bigger lever. A super-chunky throw made in single crochet still uses considerably more yarn than a fingering-weight blanket made in granny squares, because each individual stitch is much larger. Pick the yarn weight first based on the weight and drape you want, then choose the stitch for speed and texture. The [yarn cost calculator](/yarn-cost-calculator) is useful when you have already settled on yarn brand and price per ball."
      ),
      createAnswerFirstSection(
        "How Long Will It Take?",
        "An average crocheter makes about 0.15 square metres of fabric per hour. A baby blanket (0.75 square metres) takes around 5 hours. A throw (2.34 square metres) takes about 16 hours. A king-size (6.76 square metres) takes 45 hours - roughly six full evenings of dedicated work. Faster crocheters can do 0.2 to 0.3 square metres per hour with a simple stitch and bulky yarn; intricate granny-square work can drop to 0.05 square metres per hour.",
        "These times assume continuous crocheting without setup, pattern reading, or unpicking. Factor in 20 to 30% extra for first-time patterns and add another 50% if you are testing a new stitch you have never made before. For commission work, time tracking matters - you need to charge for hours, not just yarn cost."
      ),
    ],
    faqs: [
      createFAQ(
        "How many balls of yarn for a baby blanket?",
        "For a 75 x 100cm baby blanket in DK or worsted weight using double crochet stitches, 1 to 2 standard 150-metre balls is enough. For chunky yarn or granny-square patterns, plan on 2 to 3 balls. Always buy one extra ball - returning unused yarn is easy at most shops, but matching dye lots months later is nearly impossible."
      ),
      createFAQ(
        "How do I calculate yarn for any blanket size?",
        "Multiply width by height in centimetres to get area, then divide by 10,000 to get square metres. Multiply by the yarn-per-square-metre figure for your stitch and weight (worsted with double crochet is about 2.1 metres per square metre stitched), then add 10% for edges and joining. Divide by metres per ball and round up. The calculator does this automatically for any size you enter."
      ),
      createFAQ(
        "Should I always buy extra yarn?",
        "Yes - one extra ball minimum, two for any project over 130 x 180cm. Dye lots vary subtly between batches, and finishing a blanket with the last 20 rows in a marginally different shade is obvious in good light. If you finish the project with one ball left over, most yarn shops will take it back if it is unopened with the label intact."
      ),
      createFAQ(
        "How long does a king-size crochet blanket take?",
        "Around 45 hours of actual crochet time using double crochet in worsted weight (about 6.76 square metres at the standard 0.15 m²/hr pace). Granny-square king blankets can take 80 to 100 hours because the joining work between squares adds substantial time. A king-size blanket is a 6 to 12 month project for most people working evenings and weekends."
      ),
    ],
    relatedTools: [
      { slug: "yarn-cost-calculator", label: "Yarn Cost Calculator" },
      { slug: "yarn-weight-converter", label: "Yarn Weight Converter" },
      { slug: "stitch-counter", label: "Stitch Counter" },
    ],
  },

  "curtain-fabric-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Fabric Do I Need for Curtains?",
        "A single window 120cm wide with floor-length pencil-pleat curtains (2x fullness) needs about 4.4 metres of standard 137cm-wide fabric. The maths: width 120cm times 2x fullness equals 240cm of curtain. Standard fabric is 137cm wide so you need 2 widths joined down the middle. Multiply 2 widths by the 220cm drop, add 10% for hems and headers, and you land at roughly 4.4 metres at £15/m, or around £66 for the fabric alone.",
        "Different heading types pull fabric quantities up or down. Eyelet and tab-top use 1.5x fullness (less material). Pinch pleats use 2.5x (more luxurious but expensive). Wave headings sit at 2x. The same window in pinch pleats needs 5.5 metres - over a metre more than pencil pleats. Always measure the pole or track width, not the window opening, because curtains overlap the frame by 15 to 20cm each side."
      ),
      createAnswerFirstSection(
        "Drop Length Decisions",
        "Three standard drops apply to most British windows. Sill-length (around 180cm from a typical pole) sits just below the windowsill - a casual look that works in kitchens and bathrooms. Floor-length (220cm from a typical pole) just brushes the floor - the safest option for living rooms and bedrooms. Below-sill or pooled lengths add 5 to 30cm extra and pool fabric on the floor for a dramatic look.",
        "Always measure your specific window before relying on the defaults - ceiling heights vary from 220cm in older British homes to 270cm or more in modern builds and Victorian conversions. The pole or track sits 15cm above the window frame in most cases, but extending the pole higher (up to 30cm above the frame) makes the window look taller and the room look bigger. The calculator lets you enter a custom drop for those non-standard situations."
      ),
      createAnswerFirstSection(
        "Lining and Total Costs",
        "Lined curtains hang better, block more light, and last longer. Standard cotton lining costs about £6 to £8 per metre and you need roughly 95% as much lining as main fabric (lining is slightly narrower and you skip the bottom hem). For a 120cm window with floor-length pencil pleats, that is around 4.2 metres of lining at £6/m, or £25 to add to the £66 fabric cost.",
        "Blackout lining costs £10 to £14 per metre and is essential for bedrooms facing east or street-lit pavements. Interlining (a soft middle layer) doubles the warmth and weight, costs another £4 to £8 per metre, and turns DIY curtains into a serious project that takes 6 to 10 hours per pair to make. The [fabric cost calculator](/fabric-cost-calculator) handles broader sewing projects beyond just curtains."
      ),
    ],
    faqs: [
      createFAQ(
        "How much fabric for floor-length curtains?",
        "For a single 120cm window with pencil-pleat heading and floor-length drop on a standard 137cm-wide fabric, plan on about 4.4 metres of fabric plus the same again of lining. For two windows side by side, double the figure: roughly 8.8 metres of fabric and 8.4 metres of lining. Always add 10 to 15% for pattern matching if your fabric has a repeat."
      ),
      createFAQ(
        "What is fullness in curtain making?",
        "Fullness is how many times the curtain width is multiplied to create the gathered look. A 1x fullness curtain hangs flat with no gathers. 2x fullness (pencil pleats and wave) is standard for most rooms. 2.5x (pinch pleats) creates a more luxurious draped look but uses 25% more fabric. 1.5x (eyelet, tab top) gives a casual flatter drape that suits modern interiors."
      ),
      createFAQ(
        "What heading type uses the least fabric?",
        "Eyelet and tab-top headings use 1.5x fullness, the lowest of the common options. They suit modern, minimal interiors and lighter fabrics. Pencil pleat at 2x is the traditional choice and looks good in most homes. Pinch pleat at 2.5x uses the most fabric and is the most formal - typically reserved for living rooms and dining rooms in classical interiors."
      ),
      createFAQ(
        "Do I need lining for curtains?",
        "Almost always yes. Unlined curtains are translucent at night when the lights are on inside, hang poorly, and look thin. Cotton lining at £6 to £8 per metre adds about 35% to the fabric budget but transforms the finished result. Skip lining only for sheer voiles where seeing through the fabric is the point, or for very lightweight kitchen curtains."
      ),
    ],
    relatedTools: [
      { slug: "fabric-cost-calculator", label: "Fabric Cost Calculator" },
      { slug: "quilt-calculator", label: "Quilt Calculator" },
      { slug: "seam-allowance-calculator", label: "Seam Allowance Calculator" },
    ],
  },

  "filament-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Filament Is Left on My Spool?",
        "Weigh the spool with a kitchen scale, subtract the empty spool weight (printed on the side, typically 200g to 250g for a 1kg spool), and you have the filament weight. Enter that figure and the calculator converts it to length using the filament's density and diameter. A 500g remainder of 1.75mm PLA (density 1.24 g/cm³) gives roughly 168 metres of usable filament - enough for about 10 small prints averaging 50g each.",
        "If you do not want to dismount the spool, the calculator also accepts a percentage estimate. Looking at how full the spool is by eye is surprisingly accurate - 50% by visible volume is roughly 50% by weight because the filament is wound evenly. Just be aware that the cardboard or plastic core takes up 10 to 15% of the spool's outer volume, so what looks 25% full is closer to 15% by actual filament."
      ),
      createAnswerFirstSection(
        "Density Differences That Matter",
        "Different filaments have different densities, which changes the length you get from the same weight. PLA at 1.24 g/cm³ gives the standard length figure most calculators use. PETG at 1.27 is almost identical. ABS is lighter at 1.04 - meaning a 500g spool of ABS gives you about 19% more length than the same weight of PLA. Nylon at 1.14 sits in the middle. TPU varies between 1.20 and 1.25 depending on shore hardness.",
        "Diameter is the bigger lever. 1.75mm filament is by far the most common - it works in nearly every consumer printer. 2.85mm (sometimes labelled 3mm) is used by Ultimaker, Lulzbot and a handful of older printers. The same weight of 2.85mm filament is much shorter in length because each metre is over twice the volume. A 1kg spool of 1.75mm PLA is roughly 335 metres; a 1kg spool of 2.85mm PLA is around 125 metres."
      ),
      createAnswerFirstSection(
        "Will I Have Enough for the Next Print?",
        "Enter your average print weight and the calculator works out how many full prints remain on the current spool. A common mistake is using the slicer's estimated filament weight without adding 5 to 10% buffer for support material, brim, and the purge line. A 50g print in your slicer is realistically 53 to 55g of actual material consumed.",
        "If a print needs 80g and you have 75g left, do not start it - the print will fail at 95% complete and you will waste 5 hours. Either swap to a fresh spool or pick a smaller model. The [filament comparison](/filament-comparison) tool helps you choose between PLA, PETG and ABS when you are deciding what to load next, and the [3D print cost calculator](/3d-print-cost-calculator) puts the material cost into pounds and pence."
      ),
    ],
    faqs: [
      createFAQ(
        "How long does 1kg of PLA filament last?",
        "A 1kg spool of 1.75mm PLA is approximately 335 metres of filament. At 50g per typical small print, that is 20 prints. For larger functional prints averaging 200g, it is 5 prints. Heavy use printing benchmarks and large models can burn through 1kg in a weekend; hobbyist printers making the occasional figurine might stretch a spool over 6 to 12 months."
      ),
      createFAQ(
        "How do I weigh just the filament without dismounting it?",
        "Weigh the full spool with a kitchen scale (most printers' spools are too heavy for digital coffee scales). Look up the empty spool weight - it is usually printed on the spool itself or listed on the manufacturer's website. Subtract empty weight from total weight to get filament weight. For Bambu Lab, Prusament and most major brands, empty spools weigh 200 to 280g."
      ),
      createFAQ(
        "Why does PETG show different length than PLA at same weight?",
        "PETG is slightly denser than PLA (1.27 vs 1.24 g/cm³), so a 1kg spool of PETG is about 2.5% shorter than a 1kg spool of PLA at the same diameter. The differences become noticeable across the range of materials: ABS at 1.04 g/cm³ gives 19% more length per kilogram than PLA, while Polycarbonate at 1.20 is nearly identical."
      ),
      createFAQ(
        "Should I keep the empty spool weight written down?",
        "Yes. Either write it on the spool with a marker as soon as it arrives, or photograph the printed weight on the side. Once a spool is half-empty and tangled up with reload labels, the original printed empty weight gets hard to find. Tracking it lets you weigh accurately throughout the spool's life rather than guessing by eye in the final 30%."
      ),
    ],
    relatedTools: [
      { slug: "filament-comparison", label: "3D Printing Filament Comparison" },
      { slug: "3d-print-cost-calculator", label: "3D Print Cost Calculator" },
      { slug: "3d-print-pricing-guide", label: "3D Print Pricing Guide" },
    ],
  },

  "filament-comparison": {
    sections: [
      createAnswerFirstSection(
        "PLA vs ABS vs PETG: Which Should I Print With?",
        "PLA for almost everything - it prints easily at 190 to 220°C with no heated bed required, has minimal odour, and costs around £18/kg. Pick PETG (£22/kg, 225 to 250°C) when you need the print to survive outdoors, hold water, or take impact - phone holders, bottle caps, plant pots. Pick ABS (£20/kg, 230 to 250°C with a heated bed at 80 to 110°C) only when you specifically need the high-temperature resistance for car interior parts or enclosures.",
        "The honest truth is that 80% of hobbyist 3D printing should just be PLA. ABS is fussy, smells bad, and warps off the bed if your printer does not have an enclosure. The functional advantages over PETG are marginal in most situations. The exception is if you live somewhere hot and need parts that will not deform in a sun-warmed car - PLA softens at around 60°C while ABS holds shape past 100°C."
      ),
      createAnswerFirstSection(
        "When You Need Specialty Materials",
        "TPU (£28/kg) is the flexible filament for phone cases, gaskets, watch straps and anything that needs to bend. It prints slowly (15 to 25mm/s versus 50 to 80mm/s for PLA) and demands a direct-drive extruder. Nylon (£35/kg) is the strongest of the common materials at 5 out of 5 on strength rating - perfect for working gears and hinges - but it absorbs moisture from the air aggressively and prints poorly without a dry box.",
        "ASA (£25/kg) is essentially ABS with excellent UV resistance. If you are printing outdoor signage, garden brackets or anything that lives in direct sun for years, ASA does not yellow or crack the way ABS does. It still requires the heated chamber and patience that ABS demands. For most outdoor non-structural use, PETG is good enough and far easier."
      ),
      createAnswerFirstSection(
        "Cost Per Print Reality Check",
        "Material cost for a typical small print of 50g: PLA is roughly 90p, PETG £1.10, ABS £1.00, TPU £1.40 and Nylon £1.75. The £1 difference between materials is rarely the deciding factor - a failed ABS print that wasted 5 hours of machine time and electricity costs far more than the same print succeeding in PLA. Print failures are the real cost driver, and PLA fails the least.",
        "Electricity adds 5 to 15p per hour of print time. A 5-hour print costs 25p to 75p in power. The full cost of a 50g print is closer to £1.50 to £2.00 once you include the wear-and-tear share of nozzles, build plates and printer depreciation. The [3D print cost calculator](/3d-print-cost-calculator) handles these full-cost figures for accurate pricing if you sell prints."
      ),
    ],
    faqs: [
      createFAQ(
        "Is PETG stronger than PLA?",
        "Yes, but not by as much as you might think. PETG is more impact-resistant and more flexible (it bends rather than snapping), but PLA is actually stiffer in tension. For a part that needs to take a sudden impact, PETG wins. For a part under steady load, PLA holds up well. Both rate 3 or 4 out of 5 on overall strength - Nylon is the proper choice if you need a material that genuinely outperforms both."
      ),
      createFAQ(
        "Why is my ABS print warping off the bed?",
        "ABS shrinks as it cools (around 0.7% linear shrinkage versus 0.3% for PLA). Without a heated bed at 100°C+ and ideally an enclosure to keep ambient air warm, the bottom layer cools faster than upper layers, contracts, and pulls itself off the build plate. Solutions: heated enclosure, brim or raft adhesion, ABS slurry on the bed, or just switch to PETG which warps far less."
      ),
      createFAQ(
        "Is PLA food-safe?",
        "Pure PLA is technically food-safe but the printing process introduces concerns. The nozzle leaves microscopic crevices in every layer that harbour bacteria, and most nozzles are brass with lead content. Some additives in coloured PLA are not food-rated. For genuine food contact, use PETG with a stainless steel nozzle, print in vase mode (single-wall, no bacteria-trapping layers), and do not put it in the dishwasher."
      ),
      createFAQ(
        "What temperature should I print PLA at?",
        "Start at 200°C nozzle and 60°C bed for most PLA brands. Premium PLA (Polymaker, Prusament) often prefers 210 to 215°C. PLA+ formulations sometimes need 220°C. Always print a temperature tower for any new spool - even the same brand varies between batches. Bed temperature matters less than nozzle temperature for PLA; some printers run PLA on an unheated bed with PEI sheets."
      ),
    ],
    relatedTools: [
      { slug: "filament-calculator", label: "Filament Usage Calculator" },
      { slug: "3d-print-cost-calculator", label: "3D Print Cost Calculator" },
      { slug: "print-shrinkage-calculator", label: "Print Shrinkage Calculator" },
    ],
  },

  "font-pair-suggester": {
    sections: [
      createAnswerFirstSection(
        "What Makes Two Fonts Pair Well?",
        "Contrast and harmony at the same time. The two fonts should not look identical (boring), but they should share an underlying mood. The classic recipe is a serif heading with a sans-serif body, or vice versa - the structural difference creates a visual hierarchy. Playfair Display headings paired with Lato body text is the canonical example: a high-contrast modern serif against a humanist sans, both with similar x-heights and a calm tonal feel.",
        "Avoid pairing two fonts from the same family classification. Two serifs together (Merriweather and Lora) often look like a designer could not decide. Two geometric sans fonts (Montserrat and Poppins) blur into each other and lose hierarchy. The exception is a font superfamily designed to work together, like IBM Plex Sans with IBM Plex Serif - they share the same skeleton but display differently enough to create useful contrast."
      ),
      createAnswerFirstSection(
        "Tested Pairings From the Suggester",
        "The 20-font library covers the Google Fonts catalogue's most reliable workhorses. Playfair Display heading with Lato body works for editorial sites and luxury brands. Montserrat headings with Lora body suit blogs and SaaS marketing. Poppins headings with Crimson Text body lean modern with editorial warmth. Roboto with Roboto Slab is the safe corporate choice. Cormorant Garamond with Lato gives wedding and lifestyle vibes.",
        "The suggester pulls three pre-vetted body font options for each heading font. These pairings come from the Google Fonts community recommendations and have been used in production by enough sites to be safe defaults. Click any suggestion to see it live in the preview. The CSS @import line is generated for you to copy directly into your stylesheet - it pulls only the weights you actually need (600 and 700 for headings, 400 and 500 for body) to keep page weight down."
      ),
      createAnswerFirstSection(
        "Loading Google Fonts Without Slowing Your Site",
        "Each Google Font you load adds 30 to 80KB to your initial page weight, and roughly 100 to 300ms of perceived load time on a slow connection. Two fonts is the practical upper limit for a fast site. Three is acceptable if one is only used in a small place (like a logo). Four or more starts to noticeably hurt Core Web Vitals scores.",
        "Self-hosting the font files (download from Google Fonts and serve from your own domain) generally beats the @import approach now that browsers no longer share cached fonts across sites. Use font-display: swap in your @font-face declaration so text appears immediately in a fallback font and switches to the web font once it loads - this prevents invisible text during the load phase. Pair the typography choices with the [colour palette generator](/colour-palette-generator) and [colour contrast checker](/colour-contrast-checker-pro) to lock in a complete visual system."
      ),
    ],
    faqs: [
      createFAQ(
        "What font goes with Playfair Display?",
        "Lato, Open Sans and Raleway are the three most reliable body partners for Playfair Display. Lato is the safest - both have similar x-heights and complementary letterform proportions. Source Sans Pro and Poppins also work but feel more contemporary. Avoid pairing Playfair with another serif (Merriweather, Crimson) because the high contrast of Playfair makes other serifs look heavy by comparison."
      ),
      createFAQ(
        "Should the heading font be serif or sans-serif?",
        "Either works - what matters is contrast with the body. The most common setup is serif heading + sans body (gives a magazine feel) or sans heading + serif body (gives an editorial blog feel). All-sans pairings are fine if the two fonts have different weights and personalities (Montserrat heading + IBM Plex Sans body works because they read distinctly). All-serif is the trickiest combination."
      ),
      createFAQ(
        "How many Google Fonts should I use?",
        "Two is ideal: one heading font, one body font. Three is acceptable if the third has a tiny role (logo only, or a single decorative pull-quote). Each additional font costs 30 to 80KB and a chunk of paint time. Most successful sites use just one or two fonts. Multi-font systems work well only when designed by someone with strong typographic discipline."
      ),
      createFAQ(
        "What is the difference between font weight 400 and 700?",
        "Weight 400 is regular (the default body weight). 500 is medium (slightly heavier, often used for buttons and labels). 600 is semibold. 700 is bold (common for headings). 900 is black or extrabold. Loading every weight is overkill - body text typically needs only 400 and 500, headings need 600 or 700. Loading just two weights per font keeps page size manageable."
      ),
    ],
    relatedTools: [
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "colour-contrast-checker-pro", label: "Colour Contrast Checker" },
      { slug: "favicon-generator", label: "Favicon Generator" },
    ],
  },

  "golden-hour-calculator": {
    sections: [
      createAnswerFirstSection(
        "When Is Golden Hour Today?",
        "Golden hour is the hour just after sunrise and the hour just before sunset, when the sun sits low and the light turns warm and directional. In London on a typical April morning, sunrise is around 06:00 BST and the morning golden hour runs roughly 06:00 to 07:00. Evening golden hour runs from about 19:00 to 20:00 (sunset around 20:00). The calculator works out exact times for any of 10 preset cities or any latitude/longitude you enter, on any date.",
        "Times shift dramatically across the year. London in December: sunrise at 08:05, golden hour ends at 09:05; evening golden hour 14:55 to 15:55 with sunset at 15:55. Same city in June: sunrise 04:43, golden hour ends 05:43; evening golden hour 20:21 to 21:21. The further north or south of the equator, the more dramatic the seasonal swing. Reykjavik has a 24-hour golden hour at midsummer; Sydney's golden hour barely shifts season to season because it sits closer to the equator."
      ),
      createAnswerFirstSection(
        "Blue Hour vs Golden Hour",
        "Blue hour is the 20 to 30 minutes before sunrise and after sunset when the sun is below the horizon but the sky still glows. It produces a deep blue cast across the entire scene, with city lights and architecture in contrast. The morning blue hour starts roughly 30 minutes before sunrise; the evening blue hour ends 30 minutes after sunset.",
        "Use golden hour for portraits, landscapes with side-lit textures, and anything where you want warm directional light. Use blue hour for cityscapes, architecture and twilight scenes - the artificial lighting (street lamps, building windows) reads at the same exposure as the sky, which is impossible during full daylight when buildings are silhouetted. Blue hour is shorter and harder to plan, which is why arriving 45 minutes before sunset gives you both: blue hour transitions into golden hour without the need to relocate."
      ),
      createAnswerFirstSection(
        "Planning a Shoot Around the Light",
        "Arrive 30 minutes before golden hour starts to scout your composition, set up tripod height and check exposure. Light conditions change every two minutes during the actual golden hour - you have time for maybe 10 to 15 carefully composed frames per shot before the quality drops. Bracket exposures because the dynamic range between bright sky and shaded ground is at its widest just before sunset.",
        "Check the season in the calculator output. Summer evenings give you a long, slow golden hour. Winter golden hour is brief and the angle is so low that long shadows cover most of the foreground. Spring and autumn give the most flattering portrait light because the sun sits at roughly 30 degrees - high enough to light faces from above, low enough to stay warm. The [photography pricing calculator](/photography-pricing-calculator) helps when you are quoting timed sessions, since travel plus golden hour shooting plus editing rarely fits inside a one-hour booking."
      ),
    ],
    faqs: [
      createFAQ(
        "How long does golden hour actually last?",
        "Roughly an hour at temperate latitudes, hence the name. Closer to the equator (Bangkok, Cape Town) it can be as short as 20 minutes because the sun rises and sets nearly vertically. At high latitudes (Edinburgh, Stockholm) it can stretch beyond 90 minutes near the solstices. The calculator gives the exact duration for your location and date."
      ),
      createFAQ(
        "What time is blue hour?",
        "About 30 minutes before sunrise (morning blue hour, ending exactly at sunrise) and 30 minutes after sunset (evening blue hour, starting at sunset). For London on a April day with 20:00 sunset, evening blue hour runs roughly 20:00 to 20:30. Blue hour is shorter than golden hour because the sun moves quickly through the band where it lights the sky from below."
      ),
      createFAQ(
        "Why does my photo look orange during golden hour?",
        "Because golden hour light is genuinely orange - it has a colour temperature of around 3000K to 4000K compared to 5500K at midday. Your camera's auto white balance often tries to neutralise this and removes the warmth that made you want to shoot in the first place. Switch to manual white balance at around 5500K to 6500K (daylight setting) to preserve the golden tones rather than letting the camera correct them away."
      ),
      createFAQ(
        "Is golden hour the same as magic hour?",
        "Yes, photographers and filmmakers use both terms for the same period. 'Magic hour' is the older film-industry term; 'golden hour' is more common in photography. Some sources split them: magic hour as the broader 90-minute window covering blue hour through golden hour, golden hour as just the warm-light portion. In practice they are interchangeable."
      ),
    ],
    relatedTools: [
      { slug: "photography-pricing-calculator", label: "Photography Pricing Calculator" },
      { slug: "photo-print-cost-calculator", label: "Photo Print Cost Calculator" },
      { slug: "aspect-ratio-calculator", label: "Aspect Ratio Calculator" },
    ],
  },

  "image-dpi-changer": {
    sections: [
      createAnswerFirstSection(
        "What Happens When I Change DPI?",
        "Two completely different things, depending on whether you tick 'resample'. Without resampling, changing DPI from 72 to 300 only updates a metadata tag in the file. The pixels stay identical. A 3840 x 2160 image at 72 DPI prints at 53 x 30 inches; the same file relabelled as 300 DPI prints at 12.8 x 7.2 inches. Same pixels, smaller print, sharper output. With resampling on, the calculator instead works out new pixel dimensions to maintain the original print size - which means inventing pixels that did not exist (a 72 DPI image resampled up to 300 DPI grows from 3840 to 16000 pixels wide, and looks soft).",
        "The classic mistake is dragging a 1080 x 1080 Instagram graphic into Photoshop, changing the DPI to 300, and expecting it to print sharply at A4. With metadata-only change, the print just becomes 3.6 inches square (a postcard). With resampling, the image gets stretched up to 2480 x 2480 and looks blurry because Photoshop is averaging neighbouring pixels to invent new ones. Neither gives you a sharp A4 print - you needed the original at 2480 pixels wide in the first place."
      ),
      createAnswerFirstSection(
        "When Should I Change DPI?",
        "Change to 300 DPI (metadata only) when sending an image to a print shop. They will reject 72 DPI files even if the pixel count is enough, because their workflow software reads the DPI tag to lay out the print. Change to 72 DPI when exporting for web - it does not affect how browsers display the image (they ignore DPI entirely), but it shaves a few bytes off the file metadata.",
        "Resample up (add pixels) only when you genuinely need more resolution and the source has been lost. Modern AI upscalers (Topaz, Magnific, even free options like Real-ESRGAN) do this far better than Photoshop's Bicubic resampling. Resample down (remove pixels) when emailing or uploading - the [image resizer](/image-resizer) and [image compressor](/image-compressor) handle this efficiently and let you preview file size savings before downloading."
      ),
      createAnswerFirstSection(
        "DPI Settings for Common Tasks",
        "Web and email: 72 DPI is the historic standard. The actual figure does not matter for screen display - it is purely a metadata tag. Print at home on a 600 DPI inkjet: 150 DPI source images give acceptable results, 300 DPI gives photo-quality output. Photo lab prints (5x7, 8x10, A4): 300 DPI is the spec. Large format posters viewed from over 1 metre away: 150 to 200 DPI is enough because viewing distance hides the lower resolution.",
        "The calculator shows current physical print size, new physical size after a metadata-only change, and the pixel dimensions needed if you choose to resample to maintain physical size. It also estimates uncompressed file size in megabytes so you can see how much heavier the resampled version becomes. A 3840 x 2160 image at 72 DPI is 24MB uncompressed; resampled to 300 DPI to keep the same print size, it balloons to 415MB."
      ),
    ],
    faqs: [
      createFAQ(
        "Does changing DPI from 72 to 300 improve image quality?",
        "Not by itself. If you only change the DPI metadata tag, the actual pixels are identical - the image just prints smaller. To genuinely improve print quality you need either more pixels (re-shoot, re-render, or AI upscale) or to print at a smaller physical size. Resampling up to 300 DPI at the original print size invents new pixels by averaging neighbours and the result looks soft."
      ),
      createFAQ(
        "Why does my print shop ask for 300 DPI?",
        "Their layout and prepress software reads the DPI metadata to position the image on the print. A file labelled 72 DPI tells the software the image is intended for screen and may get rejected automatically, even if the pixel count is sufficient. Open the file in Photoshop or use this calculator to change just the DPI metadata to 300 - no resampling needed if your pixel count already matches the desired print size."
      ),
      createFAQ(
        "What is resampling and when should I do it?",
        "Resampling means changing the actual number of pixels in the image. Resampling up adds invented pixels (always reduces sharpness). Resampling down throws away pixels (works fine if you do not need the original size). Use resampling down to make a 4K phone photo into a web-friendly 1500-pixel version. Avoid resampling up unless using an AI upscaler designed for that purpose."
      ),
      createFAQ(
        "How much bigger does the file get if I resample to 300 DPI?",
        "If you resample a 3840 x 2160 image (72 DPI, 53 x 30 inch print size) up to 300 DPI while keeping the same print size, the image grows to 16000 x 9000 pixels. Uncompressed file size jumps from 24MB to 415MB. Even compressed as JPEG the file is 4 to 8 times larger. This is rarely worth it unless you are genuinely trying to print at billboard size."
      ),
    ],
    relatedTools: [
      { slug: "pixel-dpi-calculator", label: "Pixel DPI Calculator" },
      { slug: "image-resizer", label: "Image Resizer" },
      { slug: "megapixel-calculator", label: "Megapixel Calculator" },
    ],
  },

  "jewellery-pricing-calculator": {
    sections: [
      createAnswerFirstSection(
        "How to Price Handmade Jewellery Without Underselling Yourself",
        "Add up your materials, your time at a real hourly rate, packaging and postage, then layer marketplace fees on top before applying a markup. The classic mistake is pricing at materials plus a small fee, forgetting that an hour spent stringing beads is an hour you cannot get back. A pair of earrings using £4 of beads, 30 minutes of stringing at £18/hour, 75p packaging and an Etsy fee of 12.5% costs you about £15 once postage is included. Selling them for £8 might feel reasonable next to high street brands, but you are paying yourself less than the kettle on your hob.",
        "The calculator splits costs into materials, labour, packaging, postage and platform fees, then shows a minimum break-even price plus a suggested price with your chosen markup. Use 40% as a starting markup if you sell on Etsy or Folksy and want headroom for sales and discount codes; closer to 100% if you sell direct through Instagram and need to absorb the cost of the customer service yourself. Anything below 40% rarely survives a busy month with broken clasps to replace and refunds to issue."
      ),
      {
        heading: "Marketplace Fees and Postage Reality Check",
        table: {
          headers: ["Platform", "Listing Fee", "Transaction Fee", "Effective Cost on £25 Sale"],
          rows: [
            ["Etsy UK", "£0.16 per listing", "6.5% + 4% payment", "~£3.30"],
            ["Folksy", "£0.20 per listing", "6% commission", "~£1.70"],
            ["eBay", "Free up to 1000", "12.9% final value", "~£3.20"],
            ["Own website (Shopify)", "Subscription", "1.5% + 25p Stripe", "~£0.65"],
            ["Instagram + bank transfer", "Nil", "Nil (your time)", "£0"],
          ],
        },
      },
      createAnswerFirstSection(
        "Material Costs That Sellers Forget to Track",
        "Findings get expensive faster than people expect. Sterling silver headpins are cheap individually, but if you make 30 pairs of earrings a month you will get through a £15 pack in two weeks. Gold-fill wire (which is sold by the foot, around £2.20 per foot at current prices) blows through budgets quietly because you cut more than the design needs. Track these as separate line items rather than rolling them into a vague 'materials' figure, otherwise you will keep wondering why your numbers look fine on paper and your bank balance disagrees.",
        "Hidden costs to add to packaging: tissue paper, branded stickers, gift boxes for orders over £30, return postage labels, and the time spent printing dispatch notes. A 75p packaging line item is realistic for a small earring order; a fully branded gift-boxed necklace with ribbon and a thank-you card is closer to £2.50. The [art pricing calculator](/art-pricing-calculator) handles a similar breakdown for paintings and prints if you sell mixed work."
      ),
    ],
    faqs: [
      createFAQ(
        "What hourly rate should I pay myself for handmade jewellery?",
        "Most UK handmade sellers use £15 to £25 per hour for assembly time once they have the basic skills. Below £12 (around the National Living Wage) you are effectively paying yourself less than a supermarket job for skilled craft work. Above £30 starts to feel hard to justify against high street brands unless you sell at craft fairs or galleries where buyers expect higher prices. Rate your time honestly: design time, photography and listing time count too, and most sellers underestimate listing time by half."
      ),
      createFAQ(
        "How much markup should I add for handmade jewellery?",
        "A 40% markup over total costs is the floor for sustainable selling on Etsy or Folksy, where you need room for sales and the occasional refund. 60-100% is typical for direct sales through your own site or Instagram, where you carry no platform fee but spend more on marketing. Higher-end pieces using gold-fill or sterling silver often sit at 200% or more because materials are only a fraction of perceived value. Check what comparable sellers charge in your style and adjust from there."
      ),
      createFAQ(
        "Should I include packaging in the price or charge separately?",
        "Include it. Buyers compare 'price plus shipping' against other listings and a transparent total wins more sales than a low headline price plus £4 postage. Build packaging (around 75p to £2.50 depending on whether you use a gift box) into the item price, then offer free or low-cost shipping. Small parcel postage in the UK is currently £4.19 for second class signed-for via Royal Mail, which most sellers absorb for orders over £25."
      ),
      createFAQ(
        "Why does Etsy charge so much in fees?",
        "Etsy currently takes 6.5% transaction fee plus 4% payment processing on UK sales, which lands at roughly 12.5% once you add VAT and the listing fee. They argue this covers traffic and the marketplace infrastructure. For most sellers it is worth it because the alternative (driving traffic to your own site) costs more in ads. The break-even point is usually around £2,000 monthly turnover; below that, Etsy is cheaper, above that, Shopify with paid ads can be more profitable."
      ),
    ],
    relatedTools: [
      { slug: "art-pricing-calculator", label: "Art Pricing Calculator" },
      { slug: "photography-pricing-calculator", label: "Photography Pricing Calculator" },
      { slug: "ring-size-converter", label: "Ring Size Converter" },
    ],
  },

  "knitting-gauge-calculator": {
    sections: [
      createAnswerFirstSection(
        "Why Gauge Matters More Than the Pattern Says",
        "Gauge is the number of stitches and rows your knitting produces over a 10cm square in the yarn and needles you are using. DK weight on 4mm needles typically gives 22 stitches and 30 rows per 10cm; aran on 5mm needles is closer to 18 stitches and 24 rows. Patterns assume you knit at a specific gauge, and even a single stitch difference per 10cm compounds over a project. A jumper knitted at 20 stitches per 10cm instead of the pattern's 22 will end up around 10% wider, which on a 100cm chest jumper is 10cm extra room - the difference between fitted and falling off your shoulders.",
        "The calculator takes your swatch gauge plus the pattern gauge and rescales the cast-on count automatically. Cast on 110 stitches at the pattern gauge of 22 sts/10cm gives a 50cm-wide piece; if your gauge is only 20 sts/10cm, the calculator tells you to cast on 100 stitches instead to land at the same 50cm. Same logic for rows: if you knit looser than the pattern, you need fewer rows to reach the right length, and the row counter saves you from mid-project frogging."
      ),
      createAnswerFirstSection(
        "Swatching Properly Saves You Days of Knitting",
        "Cast on at least 30 stitches and knit a 15cm square before you measure, because the edge stitches always lie differently from the middle. Wash and block the swatch the way you intend to wash the finished piece - a cotton or wool blend can grow 5% in length after the first wash, which turns a perfectly-sized cardigan into something that hangs to your knees. Measure across the middle 10cm in two places and average them, ignoring the cast-on row and the live stitches at the top.",
        "Dye lot is the silent killer of long projects. A jumper using 8 balls of yarn from the same dye lot will look uniform; mixing two dye lots midway through (say, two balls from lot A4521 and two from lot A4528) creates a visible band where the colour changes. Buy enough yarn for the full project plus one extra ball at the start, even if it costs more, because reordering later almost always means a different lot. The [yarn cost calculator](/yarn-cost-calculator) helps work out how many balls you actually need before you commit at the till."
      ),
    ],
    faqs: [
      createFAQ(
        "What is the standard knitting gauge for DK yarn?",
        "DK weight wool on 4mm needles typically produces 22 stitches and 30 rows per 10cm in stocking stitch. Cotton DK runs slightly tighter, around 23 stitches per 10cm. Acrylic DK can vary more depending on brand. Always check the ball band for the manufacturer's recommended gauge and use that as your starting point, then adjust needle size up or down if your swatch is off."
      ),
      createFAQ(
        "How do I adjust a pattern if my gauge is different?",
        "Multiply the pattern's stitch count by the ratio of pattern gauge to your gauge. If the pattern is 22 sts/10cm with a 110-stitch cast-on and you knit at 20 sts/10cm, the maths is 110 × (20/22) = 100 stitches. Same for rows. The calculator does this automatically and rounds to the nearest stitch, but it is worth understanding so you can sanity-check the result before casting on."
      ),
      createFAQ(
        "Should I go up or down a needle size if my gauge is too tight?",
        "Tight gauge (more stitches per 10cm than the pattern) means your fabric is denser than intended. Go up half a needle size (3.75mm to 4mm, or 4mm to 4.5mm) and re-swatch. Half-size adjustments are the standard fix because a full size jump usually overshoots. If the pattern calls for 4mm needles and you knit at 24 sts/10cm instead of 22, try 4.5mm needles and expect to land around 21-22 sts/10cm."
      ),
      createFAQ(
        "Why does washing change my gauge?",
        "Wool and natural fibre yarns relax when wet, which can change both the stitch count per 10cm and the overall dimensions of the fabric. Cotton tends to grow lengthwise; wool plumps up and tightens slightly. Always swatch, wash and block the swatch the way you will treat the finished garment, then measure again. Pre-washed yarn is more stable but most knitters work with yarn straight from the ball, so factoring in the wash is essential."
      ),
    ],
    relatedTools: [
      { slug: "yarn-cost-calculator", label: "Yarn Cost Calculator" },
      { slug: "yarn-weight-converter", label: "Yarn Weight Converter" },
      { slug: "stitch-counter", label: "Stitch Counter" },
    ],
  },

  "megapixel-calculator": {
    sections: [
      createAnswerFirstSection(
        "What Megapixels Actually Tell You",
        "A megapixel is one million pixels, calculated as width times height divided by one million. A 4K image at 3840 x 2160 works out to 8,294,400 pixels, or 8.3MP. The number is useful for two things: knowing whether your file is sharp enough for a print at a given size, and estimating uncompressed file size (around 3MB per megapixel for an RGB JPEG before compression). It is not a sharpness metric on its own. A 50MP medium format file from a Fujifilm GFX has more usable detail than a 50MP cropped phone sensor because the larger photosites collect more light per pixel.",
        "Bayer interpolation muddies the picture too. Every standard camera sensor captures only red, green or blue at each photosite, then the camera interpolates the missing two channels from neighbours. So a 24MP camera does not actually record 24 million full-colour pixels; it records 24 million single-channel measurements and works out the rest. Real resolving power is closer to 70-80% of the headline figure once interpolation is accounted for, which is why a 12MP iPhone photo can look softer than the spec implies when blown up to A3."
      ),
      {
        heading: "Print Quality at Common Sizes (300 DPI Target)",
        table: {
          headers: ["Print Size", "Required Pixels", "Required MP", "Acceptable from"],
          rows: [
            ["6x4 inch", "1800 x 1200", "2.2MP", "Most phone cameras"],
            ["7x5 inch", "2100 x 1500", "3.2MP", "Most phone cameras"],
            ["A4 (300 DPI)", "2480 x 3508", "8.7MP", "12MP+ camera"],
            ["A3 (300 DPI)", "3508 x 4961", "17.4MP", "20MP+ camera"],
            ["A2 (240 DPI)", "3996 x 5664", "22.6MP", "24MP+ camera"],
            ["Poster 24x36 in", "5760 x 8640", "49.8MP", "Medium format or stitched"],
          ],
        },
      },
      createAnswerFirstSection(
        "How to Choose Camera Megapixels for Your Work",
        "12MP is enough for Instagram, web display, and prints up to A4 at viewing distance. 24MP gives you cropping room and clean A3 prints, which is why most enthusiast mirrorless bodies sit there. 45-50MP is overkill for general photography but right for landscape work where you want to crop heavily or print A1+. Beyond 50MP you are paying for diminishing returns unless you do commercial product or fine art prints. Wedding photographers in the UK typically charge £1,000 to £3,000 per day and almost universally shoot 24-30MP because the workflow stays manageable.",
        "File size grows linearly with pixel count and quadratically with print size. A 50MP RAW from a Canon R5 is 60MB on disk, a 100MP medium format file is 110-120MB, and editing a wedding's worth of either in Lightroom needs at least 32GB of RAM. Use the calculator to check the uncompressed file size and storage cost before you buy a higher resolution body. Pair with the [pixels to physical size converter](/pixels-to-physical-converter) to translate a target print size back into the megapixel count you genuinely need."
      ),
    ],
    faqs: [
      createFAQ(
        "How many megapixels do I need for an A4 print?",
        "8.7 megapixels at 300 DPI, which equates to a 2480 x 3508 pixel image. Most modern phones (12MP and up) and any mirrorless camera can produce A4 prints with no resampling needed. If you only need 240 DPI (acceptable for prints viewed at arm's length), the requirement drops to about 5.6MP. The calculator shows current DPI for your image at every standard print size so you can see exactly what holds up."
      ),
      createFAQ(
        "Are 108MP phone cameras really better than 12MP?",
        "Not always. High-megapixel phone sensors use a technique called pixel binning, where four (or more) tiny photosites are merged into one virtual pixel for low-light shots. The 108MP figure is marketing-led; in default mode the phone outputs around 12-27MP. Daylight sharpness can be slightly better but noise performance, dynamic range and lens limitations matter far more than the headline figure for most users."
      ),
      createFAQ(
        "Why does my 12MP photo look fuzzy when printed at A3?",
        "12MP is around 4000 x 3000 pixels. At A3 (11.7 x 16.5 inches), that gives 240-250 DPI, which is acceptable but not crisp. For perfect 300 DPI sharpness you would need 17.4MP. The fuzziness is more visible if the original photo had any motion blur, was taken in low light with high ISO, or has been compressed heavily by social media before you saved it back."
      ),
      createFAQ(
        "How big a file is a 50MP photo?",
        "Uncompressed RGB at 8 bits per channel works out to 150MB for a 50MP image (50 million pixels x 3 bytes). A typical RAW file with compression sits at 50-65MB. A high-quality JPEG from the same image is 12-25MB depending on subject complexity. Storage adds up fast: 1000 50MP RAW files needs around 60GB of drive space."
      ),
    ],
    relatedTools: [
      { slug: "pixels-to-physical-converter", label: "Pixels to Physical Size Converter" },
      { slug: "image-dpi-changer", label: "Image DPI Changer" },
      { slug: "image-file-size-calculator", label: "Image File Size Calculator" },
    ],
  },

  "meme-generator": {
    sections: [
      createAnswerFirstSection(
        "How to Make a Meme That Actually Lands",
        "Upload an image (or use a coloured background), type your top and bottom text, and let the generator render the classic Impact-style font with a thick black outline. The outline is what makes meme text readable on any background; without it, white text vanishes against a sky and black text gets lost in shadows. Most meme templates work best at 1200 x 1200 for Instagram square posts or 1200 x 630 for Twitter and link previews, and the generator scales the font automatically so longer text shrinks rather than running off the edge.",
        "Tone is everything. The reason 'Drake pointing' or 'Distracted Boyfriend' templates keep working is that the format already does the comedy heavy lifting; your text just specifies what the joke is about. Original photos work too but need a sharper hook. Keep top text under 6 words and bottom text under 8 - more than that and the meme starts to read like a Twitter screenshot, which kills the format. Save with the download button as a PNG to preserve sharpness; JPEG compression turns the white-on-outlined-black text into a soup of artefacts."
      ),
      createAnswerFirstSection(
        "Copyright, Templates and Where Memes Come From",
        "Most popular meme templates are stills from films, TV shows, sports broadcasts or paparazzi photos, all of which are technically copyrighted. Meme use sits in a grey zone: rights holders rarely chase individual posts because the marketing value of going viral usually outweighs the cost of enforcement, but commercial use (selling t-shirts, putting a meme in an advert, using one in a paid sponsorship) is a different matter and gets cease-and-desisted regularly. If you are making memes for your business account, use templates from royalty-free sources or your own photos to stay safe.",
        "The generator does not store templates because hosting copyrighted material would create liability. Bring your own image, use a solid colour background, or use one of the gradient presets. For brand-safe meme content, photograph your own products or team and use those as the base; the meme format works just as well with original material once you have a recognisable visual hook. Pair this with the [add text to image](/add-text-to-image) tool if you need more text positions than the classic top/bottom layout."
      ),
    ],
    faqs: [
      createFAQ(
        "What font do memes use?",
        "Impact, an Adobe-licensed condensed sans-serif, is the traditional meme font. It became the default on the original Impawards and Quickmeme generators in the early 2000s and has stuck. Some modern meme styles use Helvetica Bold, Arial Black, or thin-stroked sans-serifs for a cleaner look (typical of Tumblr-era memes). The generator uses Impact-style rendering with a heavy black stroke for the classic look."
      ),
      createFAQ(
        "What size should a meme be for Instagram?",
        "1200 x 1200 pixels for square feed posts, or 1080 x 1350 for portrait posts (the maximum Instagram allows). For Stories, use 1080 x 1920. The generator auto-scales the canvas based on your uploaded image, but if you are designing for a specific platform, resize the source image to the target dimensions first using the image resizer to avoid Instagram doing the cropping for you."
      ),
      createFAQ(
        "Can I sell memes I make with this generator?",
        "You can sell creative work that uses memes as a format, but selling a specific meme that uses someone else's image, photo, screenshot or character is risky and frequently challenged. Your own photos with meme-style text are fully yours to sell. Templates derived from films, TV shows, athletes or celebrities are not. The generator is intended for personal social posting; commercial use requires you to own (or license) the underlying image."
      ),
      createFAQ(
        "Why does my meme text look pixelated when I share it?",
        "Two common causes. First, the platform is recompressing your image (Twitter and Facebook both reduce quality on upload). Save as PNG rather than JPEG to start with cleaner output. Second, you may have created the meme at a small canvas size, which the platform then upscales. The generator outputs at 600px width by default; for sharper results, upload a larger source image so the canvas grows to match."
      ),
    ],
    relatedTools: [
      { slug: "add-text-to-image", label: "Add Text to Image" },
      { slug: "photo-filter-tool", label: "Photo Filter Tool" },
      { slug: "image-resizer", label: "Image Resizer" },
    ],
  },

  "paint-mixing-ratios": {
    sections: [
      createAnswerFirstSection(
        "How Paint Mixing Ratios Work in Practice",
        "Pick a target colour and the calculator suggests approximate ratios from the standard primaries: red, blue, yellow, plus white and black for tinting and shading. Orange comes from roughly 40% red and 60% yellow; purple sits around 50/50 red and blue; a soft sage green needs about 60% yellow, 30% blue and 10% white to lift it from the muddy mid-tone you get with raw mixes. The maths is approximate because real pigments behave differently: cadmium red leans warmer than alizarin crimson, and cobalt blue is much greener than ultramarine. Two artists mixing 'red plus blue' will get visibly different purples depending on which red and which blue are in the tube.",
        "Acrylic and oil paints follow similar mixing logic but dry differently. Acrylics darken slightly as they dry (around 5-10% shift toward the underlying tone) so always mix a touch lighter than the target if the painting is acrylic. Oils stay wet on the palette for hours and let you adjust as you go, but mineral spirits or linseed oil added to thin the paint will shift colour saturation. Test a small dab on the canvas first, let it dry properly, then commit to the larger mix."
      ),
      createAnswerFirstSection(
        "Why Your Mixed Colour Drifts From the Calculator's Estimate",
        "Pigment opacity is the biggest factor. Titanium white is very opaque and will dominate any mix it is in; using zinc white instead gives a more transparent, gentler tint. Phthalo blue and phthalo green are staining colours and a tiny amount overpowers everything else; cobalt and ultramarine are more polite and require larger ratios to show. The calculator assumes equal-strength pigments, which is why the suggested 'red 40%, yellow 60%' might land closer to orange-red rather than the bright orange you wanted: the red was a phthalo-based heavy tinter and grabbed the mix.",
        "Lighting changes everything. A colour mixed under cool LED daylight bulbs (5000-6500K) looks completely different under warm domestic incandescent (2700K). Mix paint in the same lighting it will be displayed in, ideally near the actual canvas with the source colour reference held next to your test mix. Pair this with the [colour palette generator](/colour-palette-generator) when you are choosing target colours from a digital reference; it shows the hex codes and helps translate a screen colour into something achievable in physical paint."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I get any colour from the three primaries?",
        "In theory yes, in practice no. Real-world pigments cannot mix to a fully saturated cyan, magenta or bright purple because each pigment absorbs a slightly different chunk of the spectrum, and the result of mixing two pigments is always more muted than either alone (subtractive mixing loss). For really vivid greens, pinks or violets, buy a tube of that colour rather than trying to mix it. Cadmium yellow plus phthalo blue gives a passable green; pure phthalo green is far brighter."
      ),
      createFAQ(
        "How do I make a colour darker without using black?",
        "Most professional painters avoid black because it deadens any mix it touches. Use the colour's complement instead: deepen red with a touch of green, deepen yellow with violet, deepen blue with orange. The result is a darker, richer version of the original colour rather than a muddy grey-tinged version. Burnt umber and raw umber are also useful 'natural' darkeners that warm a mix while shading it."
      ),
      createFAQ(
        "Why does my white paint look different from another brand's white?",
        "Titanium white (PW6) is brilliant, opaque and slightly cool. Zinc white (PW4) is semi-transparent and warmer. Mixing white (a blend of titanium and zinc) sits between the two. Different brands use different pigment blends and binders, so a Winsor & Newton titanium white will mix slightly differently from a Liquitex titanium white. Stick to one brand within a single painting if colour matching matters."
      ),
      createFAQ(
        "Can I mix watercolour and acrylic paint together?",
        "No, not reliably. Watercolour uses gum arabic as a binder and stays water-soluble forever; acrylic uses an acrylic polymer that dries permanent. Mixing them gives unpredictable results: the acrylic film locks in the watercolour but can crack, and the layer behaves differently in different humidity. Stick to one medium at a time, or use acrylic glazing techniques to get the watery feel without combining the two."
      ),
    ],
    relatedTools: [
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "painting-cost-calculator", label: "Painting Cost Calculator" },
      { slug: "color-palette-from-image", label: "Color Palette from Image" },
    ],
  },

  "photo-filter-tool": {
    sections: [
      createAnswerFirstSection(
        "How the Filters Actually Change Your Photo",
        "Each filter is a stack of CSS-style image adjustments applied live in the browser. Brightness scales every pixel up or down; contrast pushes light pixels lighter and dark pixels darker; saturation increases or decreases the distance of each colour from grey. Blur uses a Gaussian convolution that averages neighbouring pixels (heavy blur destroys fine detail and cannot be undone). Hue rotation shifts every colour around the colour wheel by the same number of degrees, which is why the 'Cool' preset turns warm orange skin tones into a sickly cyan if you push it too far. Use the comparison toggle to flip between original and filtered before committing to a download.",
        "The vintage preset adds 60% sepia, drops saturation to 80%, raises contrast to 120% and dims brightness to 90%, which together give you the faded-newsprint look without crushing detail. Dramatic uses 80% brightness and 150% contrast for a moody, high-contrast cinematic feel. Black and white sets saturation to zero with grayscale at 100%; you can then add a touch of sepia (10-20%) for a warmer mono look that mimics film. Everything is non-destructive: the filter values are applied at download time, the original file stays untouched."
      ),
      createAnswerFirstSection(
        "When to Use Filters and When to Edit Properly",
        "Filters are right for social posts, quick adjustments and ideas you want to test. They are not right for serious editing because every filter applies globally - you cannot brighten just the shadows, deepen just one colour, or fix a crooked horizon. For Instagram or a blog header, a single filter from this tool plus a brightness tweak gets you 90% of the way there in 30 seconds. For a portfolio shot, a print sale, or anything you will look at in a year, open the file in Lightroom, Affinity Photo or Photopea and edit properly with masks and adjustment layers.",
        "Save filtered photos as PNG if the image has flat colour areas (graphics, logos with photo backgrounds), JPEG at 85-90% quality for everything else. The download keeps the original aspect ratio. If you need to adjust dimensions or compress further, use the [image resizer](/image-resizer) before applying filters, since downscaling after a strong sharpen filter often re-introduces artefacts that undo the filter's effect."
      ),
    ],
    faqs: [
      createFAQ(
        "Are the filters destructive to my photo?",
        "Not until you download. The filters are previewed live by applying CSS transforms to a canvas; the original image data stays in memory and you can flip back to the original at any time. When you click download, the canvas is rendered to a new PNG or JPEG with the filter baked in. Your original file on disk is not touched."
      ),
      createFAQ(
        "Why does the cool filter make skin look strange?",
        "The cool preset rotates the hue by 180 degrees, which inverts warm tones to cool ones. Skin tones contain a lot of red and orange, and shifting them all the way around the colour wheel produces unnatural blue-green hues. For more subtle cooling, reduce the hue rotation to 10-20 degrees instead of 180, or turn down the saturation slightly without changing the hue at all."
      ),
      createFAQ(
        "Can I apply multiple filters to one photo?",
        "Yes - the tool stacks individual adjustments (brightness, contrast, saturation, blur, sepia, hue rotation, grayscale, invert) so you can build a custom look. The presets are pre-mixed combinations of those adjustments. Pick a preset as a starting point, then fine-tune the individual sliders for the exact look you want."
      ),
      createFAQ(
        "What format should I download my filtered image as?",
        "PNG for graphics, screenshots, logos with transparency, or anything with flat colour areas. JPEG at 85-90% quality for photos with continuous tones (faces, landscapes, food). PNG files are typically 3-5 times larger than equivalent JPEG, so for web use stick with JPEG unless you specifically need transparency or pixel-perfect detail. The tool exports both formats."
      ),
    ],
    relatedTools: [
      { slug: "adjust-image-brightness", label: "Adjust Image Brightness" },
      { slug: "adjust-image-contrast", label: "Adjust Image Contrast" },
      { slug: "sepia-filter", label: "Sepia Filter" },
    ],
  },

  "photo-print-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "Real Print Lab Costs for UK Photographers",
        "Print costs vary more than buyers realise. A 6x4 standard glossy print from a UK pro lab (Loxley, OneVision, theprintspace) is around £1.50; the same image as a 6x4 fine art giclée on Hahnemühle paper is closer to £5. Step up to 8x10 inches and the standard print is £3.50, fine art is £12, and a stretched 8x10 canvas runs £18-20. The calculator builds in these market-rate figures so you can see what you actually pay before adding any markup. Lab pricing is usually per print without setup fees if you batch multiple prints in one order; one-off prints attract minimum order charges that can double the unit cost.",
        "Frame costs add a separate layer. A basic 8x10 standard frame from a high street picture framer is around £25; a premium oak or matt-cut museum frame is £60+. Custom framing (cutting glass, mounting on board, signing) easily adds £100 to the cost of a 16x20 print. The trick is whether to absorb framing as part of your sale price or offer it as an add-on. Most fine art photographers charge separately for framing because it lets the customer choose, while wedding albums fold framing into the package price."
      ),
      {
        heading: "Standard UK Print Sizes and Required Pixel Dimensions",
        table: {
          headers: ["Print Size", "300 DPI Pixels", "Lab Cost (Standard)", "Typical Sell Price"],
          rows: [
            ["6x4 inch", "1800 x 1200", "£1.50", "£8 - £15"],
            ["7x5 inch", "2100 x 1500", "£2.00", "£10 - £20"],
            ["8x10 inch", "3000 x 2400", "£3.50", "£20 - £45"],
            ["A4 (8.3x11.7)", "2480 x 3508", "£4.00", "£25 - £50"],
            ["A3 (11.7x16.5)", "3508 x 4961", "£6.00", "£45 - £90"],
            ["16x20 inch", "6000 x 4800", "£10.00", "£75 - £150"],
          ],
        },
      },
      createAnswerFirstSection(
        "How Much Markup is Reasonable on a Photo Print?",
        "80% over total cost is a comfortable starting point for direct-to-consumer print sales. A £5 fine art print at 8x10 sells for £9; an £18 canvas at 8x10 sells for £32. Higher markup (150-200%) is justified for limited editions, signed prints, gallery sales or commission work. Lower markup (40-60%) is necessary for high-volume online stores that compete on price - though you usually then make it up on quantity rather than per-piece profit. The calculator lets you adjust the markup percentage live to see the resulting margin against different print types and frame options.",
        "Don't forget time costs. Printing 50 prints for a wedding album takes 30-45 minutes of file prep and quality checking even before the print order is placed. Wedding photographers typically charge £1,000-3,000 for the day, then album add-ons start at £400 for a basic 30-page leather-bound album. Standalone fine art print sales are slimmer-margin and need volume; the [photography pricing calculator](/photography-pricing-calculator) handles full session pricing if prints are bundled with shoots."
      ),
    ],
    faqs: [
      createFAQ(
        "What DPI does my photo need to be for an A4 print?",
        "300 DPI is the gold standard, requiring 2480 x 3508 pixels at A4. Most modern phone cameras (12MP and up) and any mirrorless camera produce A4-quality files. For lower DPI prints (240 DPI, viewable at arm's length), the requirement drops to about 1980 x 2810 pixels. The calculator shows the required pixel dimensions for every standard print size so you can check your file before sending to the lab."
      ),
      createFAQ(
        "Are canvas prints worth selling?",
        "Canvas has higher perceived value and better margins than standard paper prints. An 8x10 canvas costs £18 to print but sells comfortably at £45-60, giving 150-230% markup compared to 80-130% on standard paper. The downside is bulkier shipping (around £8-12 for canvas vs £4 for flat prints) and longer production lead times from labs (5-7 days vs 2-3 for standard). Best for prints over A4 size where the canvas finish makes a real visual difference."
      ),
      createFAQ(
        "Should I include the frame in the print price?",
        "Most fine art photographers charge for prints and frames separately so the customer can choose - some buyers prefer to frame themselves or already have frames at home. Wedding photographers typically include frames in album packages because the customer expects a finished product. Online sellers often offer both options: 'Print only £25, framed £55'. The calculator handles both scenarios via the frame option dropdown."
      ),
      createFAQ(
        "How many prints can I sell per shoot to make it worth my time?",
        "Wedding photographers typically sell 30-100 prints per wedding (album plus parent copies plus standalone prints), grossing £400-1500 in print sales on top of the shoot fee. Portrait photographers average 8-15 prints per session at £20-50 each, so £160-750. If you average less than 5 prints per session at low margin, focus on session fees instead and offer prints as add-ons rather than the main income."
      ),
    ],
    relatedTools: [
      { slug: "photography-pricing-calculator", label: "Photography Pricing Calculator" },
      { slug: "pixel-dpi-calculator", label: "Pixel DPI Calculator" },
      { slug: "megapixel-calculator", label: "Megapixel Calculator" },
    ],
  },

  "photography-pricing-calculator": {
    sections: [
      createAnswerFirstSection(
        "What to Charge for a Photoshoot Without Underpricing Yourself",
        "The honest formula is shooting time plus editing time plus equipment depreciation plus travel plus a sensible markup. A half-day portrait session at 4 hours of shooting plus 6 hours of editing at £50/hour is £500 of labour alone, before camera depreciation and travel. Many new photographers quote £150 for the same session because they only count the shoot itself, then wonder why they cannot afford to upgrade gear two years later. The calculator forces every cost into the open: shooting hours, editing hours (auto-set per shoot type, since weddings need 3x edit-to-shoot ratio while portraits only need 1.5x), camera and lens depreciation, mileage, second shooter, deliverables.",
        "UK market rates as of 2026: portrait sessions £150-300 per session, family events £400-800 per day, weddings £1,000-3,000 per day for full-day coverage, product shoots £300-800 per shoot, newborn sessions £300-600 per session. The wide ranges reflect experience level, location, post-production complexity and what's included. London-based wedding photographers with 5+ years experience routinely charge £2,500-4,000 for full-day coverage; rural or starter photographers in less competitive markets charge £800-1,500 for the same day. The calculator suggests a price targeting roughly 150% gross margin over costs."
      ),
      {
        heading: "Editing Time Multipliers by Shoot Type",
        table: {
          headers: ["Shoot Type", "Edit-to-Shoot Ratio", "8-Hour Shoot Edit Time", "Why"],
          rows: [
            ["Portrait", "1.5x", "12 hours", "Modest selection, light retouching"],
            ["Event", "2x", "16 hours", "Larger volume, faster culling"],
            ["Wedding", "3x", "24 hours", "Highest volume, detail retouching, album"],
            ["Product", "2.5x", "20 hours", "Background removal, colour matching"],
            ["Pet", "1.5x", "12 hours", "Sharp on eyes, light retouching"],
            ["Newborn", "2x", "16 hours", "Skin retouching, colour grading"],
          ],
        },
      },
      createAnswerFirstSection(
        "Equipment Depreciation Most Photographers Forget",
        "A £1,500 camera body lasts about 200 paid shoots before needing replacement (shutter wear, sensor cleaning, repair costs). That is £7.50 per shoot in pure depreciation, before lenses, batteries, memory cards, computer upgrades and software subscriptions (Lightroom + Photoshop is £21.99/month). Add a £800 lens that lasts 300 shoots and you are at £10.18 per shoot just to maintain your kit. The calculator builds depreciation in by dividing equipment cost by your expected shoots; if you only do 50 paid shoots a year, the per-shoot depreciation is much higher and your prices need to reflect that.",
        "Travel costs are easy to under-charge. HMRC mileage allowance is currently 45p per mile for the first 10,000 miles a year, dropping to 25p after that. A 30-mile round-trip site visit before the shoot, 30 miles to the venue and back, plus 10 miles for an album delivery adds up to over £30 in mileage alone. The calculator handles this via the travel distance and mileage rate fields. Pair with the [photo print cost calculator](/photo-print-cost-calculator) if your packages include album or print sales as add-ons."
      ),
    ],
    faqs: [
      createFAQ(
        "How much should I charge for a wedding as a beginner photographer?",
        "£800-1,200 is a reasonable starting band for a UK wedding photographer with under 2 years of experience and a portfolio. Below £800 you struggle to cover equipment depreciation plus 30-40 hours of shooting and editing time. Above £1,500 expects 2+ years of weddings shot and a polished portfolio. Build experience through second-shooter roles for established photographers (typical £150-300 per day) before charging full-day rates."
      ),
      createFAQ(
        "Do I charge for travel time or just mileage?",
        "Both, ideally. Mileage covers fuel and vehicle wear (45p/mile is the HMRC standard). Travel time is your professional time and should be billed at a reduced rate (typically 50% of your shooting rate) for journeys over 30 miles each way. For a 90-mile round-trip wedding, that's £40.50 mileage plus 1.5 hours x £25 = £37.50 travel time, totaling £78."
      ),
      createFAQ(
        "Should I include album costs in the wedding price?",
        "Including a basic album (20-30 pages, leather bound) in the package price simplifies the sale and feels generous to clients. Premium album upgrades (more pages, fine leather, bigger size) sell better as add-ons because the upgrade is a clear extra. A typical UK wedding package includes a 20-page album worth around £400 trade cost, with upgrades to 40 pages or fine leather sold at £200-500 extra."
      ),
      createFAQ(
        "How do I price a second shooter?",
        "Most UK second shooters charge £150-300 per day depending on experience and location. London rates run £200-350; rural rates £150-200. As the lead photographer, you absorb the second shooter cost into your overall package price - typical wedding packages with a second shooter cost the bride £200-400 more than the same package without. The calculator handles this via the second shooter toggle and rate field."
      ),
    ],
    relatedTools: [
      { slug: "photo-print-cost-calculator", label: "Photo Print Cost Calculator" },
      { slug: "art-pricing-calculator", label: "Art Pricing Calculator" },
      { slug: "golden-hour-calculator", label: "Golden Hour Calculator" },
    ],
  },

  "pixel-art-maker": {
    sections: [
      createAnswerFirstSection(
        "How to Make Pixel Art in the Browser",
        "Choose a grid size (16x16 is classic NES/Game Boy territory, 32x32 is SNES-era detail, 64x64 lets you do recognisable portraits), pick a colour from the palette, and click cells to fill them. The pen tool draws single pixels, the eraser removes them, and the fill bucket flood-fills any connected matching colour. Hold and drag to draw lines, undo with Ctrl+Z (or the back arrow). The 16-colour default palette mimics the EGA palette that defined early DOS games - bright primaries plus a few earth tones - though you can pick custom colours for anything beyond 8-bit retro work.",
        "The trick to pixel art that does not look amateur is restraint. Use 8 colours max for character sprites; reserve the last 2-3 colours for shadow accents and highlights rather than entirely separate hues. Anti-aliasing (smoothly blending edge pixels) is the wrong instinct - pure pixel art keeps hard edges and lets the eye do the smoothing. The grid forces you into chunky shapes, which is why a single-pixel-thick line at the wrong angle ruins the whole sprite. Stay symmetric and pixel-perfect; jagged outlines should be deliberate rather than mistakes."
      ),
      createAnswerFirstSection(
        "Saving and Using Pixel Art in Other Software",
        "Download the canvas as PNG to preserve sharp pixel edges. JPEG compression smooths out pixel boundaries and turns clean lines into blurry edges, which defeats the entire point of pixel art. The PNG export is at native canvas resolution: a 32x32 grid downloads as a 32x32 PNG that you can scale up in any image editor using nearest-neighbour resampling (not bilinear or bicubic, which blur the pixels). For game assets, that 32x32 sprite usually gets imported into Unity or Godot at the native size and scaled in the engine using point filtering.",
        "If you want to use pixel art on social media or in a blog, scale up to at least 512x512 with nearest-neighbour interpolation before posting. Twitter and Instagram both auto-resize uploaded images, and they default to bilinear smoothing, which blurs pixel art badly. Pre-scaling to a high resolution PNG with hard edges preserves the look. The [meme generator](/meme-generator) or [add text to image](/add-text-to-image) tool can add captions to your pixel art without smoothing the original pixels if you set the right export options."
      ),
    ],
    faqs: [
      createFAQ(
        "What grid size should I use for pixel art?",
        "16x16 for tiny icons or Game Boy-style sprites (Pokémon Red/Blue used 16x16). 32x32 for detailed character sprites in 16-bit style (Mega Man X, Final Fantasy VI). 64x64 for portrait pieces with recognisable facial features. Bigger is not always better in pixel art - the limitation is the point, and a well-made 32x32 sprite communicates more than a sloppy 128x128 one."
      ),
      createFAQ(
        "Can I save my pixel art and continue later?",
        "The current version exports your work as a PNG image when you click download. Reopening the PNG in the maker is not currently supported because the tool reads from a canvas grid rather than re-parsing image pixels. For now, save the PNG when you finish a session, and start a new piece next time. To continue specific work, take a screenshot of the canvas as a reference and recreate the early stages quickly."
      ),
      createFAQ(
        "How do I scale up pixel art without it going blurry?",
        "Use nearest-neighbour interpolation when scaling. In Photoshop: Image > Image Size, set Resample to 'Nearest Neighbor (hard edges)'. In Photopea (free, browser-based): Image > Image Size, choose 'Nearest neighbor'. In Affinity Photo: Document > Resize Document, set Resample to 'Nearest neighbor'. Scaling at 100%, 200%, 400% or other integer multiples gives the cleanest results."
      ),
      createFAQ(
        "What format should pixel art be saved in?",
        "PNG, always. PNG uses lossless compression and supports transparency, which both matter for pixel art. JPEG is compressed in a way that introduces colour artefacts at sharp edges - exactly the kind of edges pixel art is made of. GIF works for animated pixel art but is limited to 256 colours; static pieces should use PNG. The maker's download button outputs PNG by default."
      ),
    ],
    relatedTools: [
      { slug: "meme-generator", label: "Meme Generator" },
      { slug: "favicon-generator", label: "Favicon Generator" },
      { slug: "whiteboard", label: "Whiteboard" },
    ],
  },

  "pixels-to-physical-converter": {
    sections: [
      createAnswerFirstSection(
        "How to Convert Pixels to Inches, Centimetres or Millimetres",
        "The maths is simple: physical size = pixels divided by DPI (dots per inch). 300 pixels at 300 DPI is 1 inch; 1500 pixels at 150 DPI is 10 inches; 2480 pixels at 300 DPI is exactly A4 width (8.27 inches, 21cm, 210mm). The DPI tag in the file controls the output size at the print stage; the same 1500-pixel image prints at 5 inches if labelled 300 DPI, or at 10 inches if labelled 150 DPI. The calculator handles both directions: enter pixels plus DPI to get physical size in mm, cm and inches; or enter physical size and DPI to get the pixel count needed.",
        "Different uses need different DPI. Web display ignores DPI entirely (browsers measure in CSS pixels, never paper inches), so the figure is purely metadata for any image used online. Photo lab prints standardise on 300 DPI for sizes up to A3, dropping to 240 DPI for A2 and 200 DPI for posters viewed at a metre or more. Newspaper printing uses 150 DPI because the paper itself cannot reproduce finer detail. Office laser printers run at 600 DPI on the printer side but typically receive 300 DPI source files because beyond that the file size grows with no visible benefit."
      ),
      {
        heading: "Common Pixel-to-Print Conversions at 300 DPI",
        table: {
          headers: ["Pixels", "Inches", "Centimetres", "Common Use"],
          rows: [
            ["1800 x 1200", "6 x 4", "15.2 x 10.2", "Standard photo print"],
            ["2100 x 1500", "7 x 5", "17.8 x 12.7", "Large photo print"],
            ["2480 x 3508", "8.27 x 11.7", "21 x 29.7", "A4 page"],
            ["3000 x 2400", "10 x 8", "25.4 x 20.3", "8x10 inch print"],
            ["3508 x 4961", "11.7 x 16.5", "29.7 x 42", "A3 page"],
            ["4961 x 7016", "16.5 x 23.4", "42 x 59.4", "A2 poster"],
          ],
        },
      },
      createAnswerFirstSection(
        "When the DPI Setting Actually Matters",
        "The DPI tag matters when the destination uses it: print labs, professional layout software (InDesign, QuarkXPress, Affinity Publisher), and some print-on-demand platforms (Printful, Society6) all read the DPI metadata to position the image at the intended physical size. A file labelled 72 DPI sent to a print lab will get rejected even if the pixel count is sufficient, because the lab's prepress software treats it as a screen-only file. Use the calculator to confirm both the pixel count and the implied physical size before sending files anywhere print-related.",
        "DPI does not matter for web, email, social media, app icons, or any digital-first use case. Browsers and apps measure in CSS pixels and ignore the DPI tag completely. A 1200x630 image labelled 72 DPI displays exactly the same as the same file labelled 300 DPI on every website. If a designer says 'send me images at 300 DPI' and the destination is a webpage, they are repeating something they heard in design school but it does not change the output. For physical print, follow the [image DPI changer](/image-dpi-changer) to update metadata without resampling, or pair with the [megapixel calculator](/megapixel-calculator) to check whether a pixel count is enough for the intended print size."
      ),
    ],
    faqs: [
      createFAQ(
        "How many pixels are in an inch?",
        "It depends on the DPI setting. At 72 DPI, 1 inch is 72 pixels. At 96 DPI (the Windows default), 1 inch is 96 pixels. At 300 DPI (the print standard), 1 inch is 300 pixels. There is no universal pixels-per-inch figure; the conversion always requires you to specify DPI. For screen display, 96 DPI is the historical figure but modern high-resolution displays use 144, 192 or higher actual pixel densities."
      ),
      createFAQ(
        "How do I convert centimetres to pixels?",
        "Convert centimetres to inches first (divide by 2.54), then multiply by DPI. 10cm at 300 DPI: 10/2.54 = 3.937 inches, then x 300 = 1181 pixels. The calculator does this in one step when you enter centimetres and DPI directly. Most A-series paper sizes are easier to remember in pixels at 300 DPI: A4 is 2480 x 3508, A3 is 3508 x 4961, A5 is 1748 x 2480."
      ),
      createFAQ(
        "Why does my A4 print come out smaller than expected?",
        "Either the file is labelled at a higher DPI than the lab is using (so the physical size shrinks), or the print software is auto-fitting to the page with margins. A 1500x2100 image labelled 300 DPI prints at 5x7 inches, not A4. To fill A4 you need at least 2480x3508 pixels at 300 DPI. Check the DPI metadata before sending to print, and confirm the lab does not auto-scale to fit margins."
      ),
      createFAQ(
        "What's the difference between DPI and PPI?",
        "Strictly speaking, DPI (dots per inch) refers to printer output and PPI (pixels per inch) refers to digital images, but the terms are used interchangeably in practice. Camera and image software use 'DPI' even though they really mean PPI. Unless you are deep in the prepress industry, treating them as the same value is fine. The calculator uses 'DPI' throughout to match what most users are searching for."
      ),
    ],
    relatedTools: [
      { slug: "pixel-dpi-calculator", label: "Pixel DPI Calculator" },
      { slug: "megapixel-calculator", label: "Megapixel Calculator" },
      { slug: "image-dpi-changer", label: "Image DPI Changer" },
    ],
  },

  "interior-palette-creator": {
    sections: [
      createAnswerFirstSection(
        "What the 60-30-10 Rule Actually Means",
        "60-30-10 is a proportion guide, not a formula: 60% of the room reads as a dominant colour (walls, large rugs, the sofa if it dominates), 30% as a secondary tone (cabinetry, curtains, the second largest piece of furniture), and 10% as an accent (artwork, cushions, a feature chair, the thing your eye lands on). Get the proportions wrong and a room feels either flat or chaotic.",
        "This palette generator picks six harmonious colours that already sit in those proportions; the dominant wall tone is the largest, the secondary trim and furniture sit in the middle band, and the accent is the saturated punch. Think of a Cotswold cottage living room: cream walls (60%), oatmeal sofa and natural-wood beams (30%), a single deep terracotta cushion and an oil painting (10%)."
      ),
      createAnswerFirstSection(
        "Picking a Mood That Matches the Room",
        "Choose the room first, then the mood. A bedroom set to 'Romantic & Soft' shifts the hue cooler and drops saturation, giving you dusty rose and powder blue against a near-white wall. A kitchen set to 'Bold & Dramatic' returns the same base hue at higher saturation and lower value, producing forest greens and inky navies that work well against brass handles.",
        "Eight moods are built in: Cosy & Warm, Modern & Clean, Earthy & Natural, Coastal & Airy, Bold & Dramatic, Minimalist, Romantic & Soft, and Industrial & Raw. Each adjusts hue shift, saturation and brightness rather than picking from a fixed swatch list, so the palette stays harmonious whatever base colour you start with. Try the [Colour Palette Generator](/colour-palette-generator) for non-room creative work."
      ),
      {
        heading: "Mood to Room Quick Match",
        table: {
          headers: ["Room", "Best Moods", "Avoid"],
          rows: [
            ["Living room", "Cosy, Modern, Earthy", "Industrial alone"],
            ["Bedroom", "Romantic, Coastal, Minimalist", "Bold (sleep impact)"],
            ["Kitchen", "Bold, Modern, Industrial", "Romantic (clashes with appliances)"],
            ["Bathroom", "Coastal, Minimalist, Modern", "Earthy with low light"],
            ["Nursery", "Romantic, Coastal, Minimalist", "Bold, Industrial"],
            ["Home office", "Modern, Minimalist, Industrial", "Romantic (low focus)"],
          ],
        },
      },
      createAnswerFirstSection(
        "From Hex Codes to a Pot of Paint",
        "Hex codes do not match paint codes one-for-one. A hex like #E8DCC4 might be Farrow & Ball Tallow, Dulux Soft Stone, or Little Greene Stone-Mid Warm depending on the lighting in your room. Take the generated hex to a paint shop and ask for a colour match; modern in-store spectrophotometers can read a printout or a phone screen and find the closest match in any range.",
        "A few practical notes. Always paint a 1m x 1m test patch in the actual room and watch it for 24 hours; north-facing rooms shift colours cooler, south-facing shift them warmer. Estimate paint quantity with the [Paint Calculator](/paint-calculator) once you have settled. And for accessibility (especially text-on-wall murals or feature signage) run the chosen wall and accent through a [Contrast Checker](/contrast-checker) to make sure they meet WCAG AA at 4.5:1."
      ),
    ],
    faqs: [
      createFAQ(
        "Can I lock a colour and regenerate the rest?",
        "Yes. Click any swatch to set it as the wall colour, then regenerate; the other five colours rebuild around your fixed choice. This is useful when you have already bought a sofa or committed to a kitchen worktop and need the wall, trim and accents to harmonise around it."
      ),
      createFAQ(
        "What is the difference between trim and accent?",
        "Trim is the supporting neutral applied to skirting, architrave, doors and ceiling, usually a near-white tone derived from the wall colour rather than pure brilliant white. Accent is the saturated punch that appears in cushions, artwork or a single feature chair, typically 5 to 10% of the visible surface area. Mixing the two up makes the room read as too busy or too washed out."
      ),
      createFAQ(
        "Should I use the same palette across the whole house?",
        "Use a thread, not a clone. Pick one or two anchor neutrals (the dominant and trim) that run through hallways, landings and open-plan areas, then vary the accent and saturation room by room. This gives flow without making every room feel identical, and is exactly how interior designers handle a Victorian terrace where every room is visible from the next."
      ),
      createFAQ(
        "How does this differ from generic palette tools?",
        "A general palette generator like Coolors picks pretty colours; an interior palette generator picks colours in the right proportions for a room, with saturation and brightness tuned to read well on actual paint and fabric rather than on a screen. The 60-30-10 weighting is built into the export, so the dominant colour gets the biggest swatch and the accent gets the smallest."
      ),
      createFAQ(
        "Will the screen colours look the same on the wall?",
        "Almost never exactly. Monitors emit light; paint reflects it, so saturated colours always look duller on the wall than on screen. Drop your expectation by about 10 to 15% on saturation when you imagine the finished room, and always test a sample pot before committing to a full tin."
      ),
    ],
    relatedTools: [
      { slug: "colour-palette-generator", label: "Colour Palette Generator" },
      { slug: "contrast-checker", label: "Contrast Checker" },
      { slug: "paint-calculator", label: "Paint Calculator" },
    ],
  },

  "yarn-cost-calculator": {
    sections: [
      createAnswerFirstSection(
        "How Much Yarn You Actually Need",
        "An adult medium DK jumper takes around 2,600 metres, or roughly 1,200 grams. A typical adult-size DK throw or blanket comes in between 5,800 and 7,400 metres depending on size, which is 800g to 1,500g of yarn. A pair of adult fingering-weight socks needs about 550 metres (around 100g, conveniently one ball). The calculator looks up the right figure for your project type, size, and yarn weight, then rounds up and adds one extra ball as a safety buffer.",
        "The buffer matters more than people think. Dye lots vary visibly between batches, so if you run out partway through a jumper and pop back to the shop a fortnight later, you may end up with subtly different shades of green meeting at the shoulder seam. Buying one extra ball at the start, from the same dye lot, costs another £4 or £5 at typical DK prices and saves a project-ruining colour mismatch. Knitters who substitute yarns or work cables and colourwork should add 15 to 20% on top of the calculator's estimate, because both consume more yardage than plain stocking stitch."
      ),
      createAnswerFirstSection(
        "Reading Ball Bands and Sense-Checking the Math",
        "A standard 100g ball of DK weight yarn typically holds around 200 to 240 metres. A 50g ball of fingering or 4-ply usually contains 175 to 210 metres. Aran yarn is denser, so a 100g ball is closer to 170 to 200 metres. The calculator asks for ball weight in grams and the metres per ball figure printed on the band, so you can use any yarn from any brand without converting. Substitute Drops Karisma for Stylecraft Special DK and the only number that changes is the price per ball.",
        "UK high-street DK ranges from £2.50 a ball for budget acrylic up to £12 or more for hand-dyed merino. A reasonable mid-range pure wool DK costs £4 to £6 per 100g ball; a luxury 4-ply or fingering with cashmere or silk content runs £15 to £30 per 100g. The total project cost is balls needed multiplied by price per ball, and the calculator shows both the exact and rounded figures. If a jumper estimate comes out at 12 balls of £8 yarn, that is £96 of materials, which is worth knowing before casting on rather than discovering at ball 9. The [yarn weight converter](/yarn-weight-converter) helps when a US pattern lists 'worsted' but the shop only stocks UK weights."
      ),
      {
        heading: "Yardage Estimates by Project (DK Weight)",
        table: {
          headers: ["Project", "Baby", "Child", "Adult M", "Adult L"],
          rows: [
            ["Scarf", "600 m", "1,000 m", "1,700 m", "2,000 m"],
            ["Hat", "600 m", "1,000 m", "1,300 m", "1,400 m"],
            ["Jumper", "1,000 m", "1,800 m", "2,600 m", "3,000 m"],
            ["Blanket", "2,000 m", "3,600 m", "5,800 m", "6,600 m"],
            ["Cardigan", "1,400 m", "2,400 m", "3,400 m", "3,800 m"],
          ],
        },
      },
      createAnswerFirstSection(
        "Time Estimates and What They Don't Include",
        "Average knitting speed sits at around 20 metres per hour for plain stocking stitch with DK yarn. The tool uses this rate to estimate how long the project will take. An adult medium DK jumper at 2,600 metres works out to 130 hours, which is roughly two months of regular evening sessions. A baby blanket at 2,000 metres is around 100 hours. Faster knitters using basic stitches can hit 30 metres per hour; slower or beginner knitters can be closer to 12.",
        "What the time estimate doesn't include: ribbing (slower than plain stocking stitch), cables (much slower, sometimes halving the speed), colourwork (slower again), seaming, blocking, swatching, and the inevitable rip-back when you spot a dropped stitch six rows ago. Plan for the calculated hours plus 30 to 50% of finishing time on top. Crocheters work at different rates, generally completing fabric faster than knitters but consuming more yarn per square inch. For socks specifically, factor in time for kitchener stitch grafting at the toe; first-time grafters can spend an hour on a single toe."
      ),
    ],
    faqs: [
      createFAQ(
        "How much yarn do I need for a jumper?",
        "An adult medium jumper in DK weight needs roughly 2,600 metres (around 12 balls of 220m, or 1,200g total). Aran weight needs about 3,800m for the same size, fingering needs about 2,000m. Adjust up by 15% for cables or colourwork, and down by 10% for short-sleeved or vest versions. The calculator handles all weight and size combinations automatically, including child and baby sizes."
      ),
      createFAQ(
        "Why does the calculator round up and add a ball?",
        "Two reasons. First, ball lookups are a guideline, and your tension or yarn substitution can push actual usage higher than the estimate. Second, dye lots vary, so buying all your yarn at once from a single batch protects you against colour shifts mid-project. The extra ball usually costs £3 to £6 and is well worth the insurance. Many knitters keep leftover balls from previous projects to use as scrap yarn for swatches, repairs, or small accessories."
      ),
      createFAQ(
        "Is it cheaper to knit a jumper than to buy one?",
        "Almost never. A handmade DK jumper in mid-range yarn costs £40 to £80 in materials, and you spend 100 to 150 hours making it. A comparable jumper from a high-street shop costs £30 to £60 and arrives instantly. The value of knitting is in the bespoke fit, the choice of fibre, the satisfaction of the craft, and the absence of fast-fashion guilt; not in the per-pound cost saving. Hand-dyed yarn jumpers can easily run £150 to £300 in materials alone."
      ),
      createFAQ(
        "Can I use this for crochet projects?",
        "Yes. Crochet and knitting use yarn at slightly different rates: crochet typically consumes 20 to 30% more yarn per square inch than knitting because the stitches are bulkier. Add a 25% buffer to the calculator's estimate when working on a crochet project, or use the dedicated crochet blanket calculator for blankets specifically. The principles for ball weight, dye lots and project sizing are otherwise identical."
      ),
      createFAQ(
        "What if my yarn doesn't match the standard weights?",
        "Use the metres per ball field on the calculator regardless of what the band calls the weight. A 'sport' yarn might list as 4.5-ply on a UK ball band and DK on a US one. The calculator works from the actual metres per ball you enter, so you can substitute freely. If you have no metres figure (rare on modern yarn), divide the weight in grams by the wraps-per-inch figure to estimate, or pick the nearest standard weight from the dropdown and accept some rounding error."
      ),
    ],
    relatedTools: [
      { slug: "yarn-weight-converter", label: "Yarn Weight Converter" },
      { slug: "knitting-gauge-calculator", label: "Knitting Gauge Calculator" },
      { slug: "crochet-blanket-calculator", label: "Crochet Blanket Calculator" },
    ],
  },
};
