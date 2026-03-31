# Design System Strategy: The Digital Stationery Guild

## 1. Overview & Creative North Star
The creative direction for this design system is **"The Digital Curator."** We are moving away from the cold, clinical efficiency of SaaS "dashboards" and toward the warm, tactile familiarity of a bespoke physical planner. This system should feel like a collection of beautifully organized physical objects—vibrant stickers, high-end paper stock, and intentional ink.

We break the "template" look by leaning into **intentional nesting** and **asymmetric rhythm**. By treating the screen as a canvas rather than a grid, we create a "scrapbook" feel where elements are held together by tonal relationships rather than rigid borders.

### The Signature Look:
- **Compact & Playful:** Elements are grouped into tight, purposeful clusters.
- **Tactile Softness:** Every corner is an invitation to touch, utilizing a minimum radius of 16px.
- **Vibrant Intent:** Color is never decorative; it acts as a "highlighter" or "sticky note" to guide the user's eye.

---

## 2. Colors & Surface Architecture

The palette is rooted in a warm off-white (`surface`: `#f8f6f1`) to mimic premium paper. The vibrant green, sky blue, and sunny yellow function as your "stationery kit" accents.

### The "No-Line" Rule
**Explicit Instruction:** Traditional 1px solid borders are strictly prohibited for sectioning. Boundaries must be defined through background color shifts or subtle tonal transitions. For example, a `surface-container-low` section sitting directly on a `surface` background creates a soft, natural edge that feels like a sheet of paper laid atop a desk.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. Use the surface-container tiers to define importance:
- **`surface-container-lowest` (#ffffff):** The "top-most" active sheet. Used for cards or inputs.
- **`surface` (#f8f6f1):** The primary canvas.
- **`surface-container` (#eae8e3):** Used for background sections that need to feel "recessed" or secondary.

### The "Glass & Gradient" Rule
To elevate the "Digital Scrapbook" vibe, use **Glassmorphism** for floating elements (like navigation bars or tooltips). Utilize a semi-transparent `surface` color with a `backdrop-filter: blur(20px)`. 

For primary CTAs, use a **Signature Texture**: a subtle linear gradient from `primary` (#006b1b) to `primary_container` (#91f78e). This adds a "weighted" feel to buttons, making them feel like physical embossed tabs.

---

## 3. Typography: The Editorial Voice

We utilize a high-contrast pairing to balance playfulness with authority.

*   **Headers (Epilogue):** This is our "ink." It is bold, friendly, and carries a slight editorial weight. Use `display-lg` for hero moments to create a "book cover" feel.
*   **Body (Plus Jakarta Sans):** Our "handwritten notes." It is modern, highly legible, and soft. It keeps the system from feeling too retro or "vintage."

**Hierarchy Tip:** Use `headline-sm` for card titles. The bold weight of Epilogue ensures that even in small, compact cards, the information architecture is clear and punchy.

---

## 4. Elevation & Depth: Tonal Layering

We convey hierarchy through **Tonal Layering** rather than structural lines.

- **The Layering Principle:** Depth is achieved by stacking. Place a white card (`surface-container-lowest`) on top of a soft cream background (`surface`). The contrast alone provides the "lift."
- **Ambient Shadows:** When an element must "float" (like a dropdown), use an extra-diffused shadow.
    - **Shadow Token:** `0 20px 40px rgba(46, 47, 44, 0.06)`. 
    - Note the use of `on_surface` (#2e2f2c) for the shadow color at a very low opacity (6%) to mimic natural ambient light.
- **The "Ghost Border" Fallback:** If accessibility requires a border, use the `outline_variant` (#aeada9) at **15% opacity**. It should be barely visible—a "ghost" of a line that guides rather than boxes.

---

## 5. Components

### Buttons
- **Primary:** Gradient fill (Primary to Primary Container). `rounded-md` (1.5rem). Bold `label-md` text.
- **Secondary:** `secondary_container` (#a7d7ff) fill with `on_secondary_container` text. No border.
- **Tertiary:** `surface_container_lowest` fill with a subtle "Ghost Border."

### Input Fields
Inputs should look like "fill-in-the-blank" stationery.
- **Style:** Use `surface_container_low` for the field background. 
- **Active State:** Change background to `surface_container_lowest` and add a 2px `primary` bottom-border (mimicking an underlined notebook entry).

### Cards & Lists
- **The Forbiddance of Dividers:** Do not use horizontal lines to separate list items. Use vertical white space (from the `8` or `10` spacing scale) or alternate background tints (e.g., `surface` to `surface_container_low`).
- **Nesting Cards:** Place `surface_container_lowest` cards inside a `surface_container` wrapper to create a "kit" of tools grouped together.

### Chips
Use `tertiary_container` (Sunny Yellow) for high-importance tags. They should feel like "highlighter marks." Use `rounded-full` for a friendly, pebble-like shape.

---

## 6. Do’s and Don’ts

### Do:
- **Use Large Radii:** Embrace `rounded-xl` (3rem) for large containers to emphasize the "Soft Stationery" feel.
- **Embrace Asymmetry:** Let a card hang slightly off-center or use varying margin sizes to create a scrapbook aesthetic.
- **Use Color as Information:** A sky-blue (`secondary`) container should always denote a specific "category" or "toolset."

### Don't:
- **Don’t Use Pure Black:** Use `on_surface` (#2e2f2c) for all text. Pure black (#000) breaks the warm, tactile stationery vibe.
- **Don’t Use Hard Shadows:** Avoid the standard "drop shadow" look. If it looks like a 2010 tech app, it’s too heavy.
- **Don’t Box Everything In:** Avoid the "grid of boxes" look. Allow elements to breathe with generous `spacing-16` (3.5rem) between major sections.