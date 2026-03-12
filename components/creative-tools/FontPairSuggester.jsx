'use client';

import { useState, useMemo } from 'react';

const googleFonts = [
  { name: 'Playfair Display', weight: 700, category: 'serif', pairs: ['Lato', 'Open Sans', 'Raleway'] },
  { name: 'Montserrat', weight: 700, category: 'sans', pairs: ['Lora', 'Playfair Display', 'Merriweather'] },
  { name: 'Poppins', weight: 600, category: 'sans', pairs: ['Crimson Text', 'Lora', 'IBM Plex Serif'] },
  { name: 'Raleway', weight: 700, category: 'sans', pairs: ['Lora', 'Crimson Text', 'Cormorant Garamond'] },
  { name: 'Roboto', weight: 700, category: 'sans', pairs: ['Roboto Slab', 'Playfair Display', 'Merriweather'] },
  { name: 'Lato', weight: 700, category: 'sans', pairs: ['Playfair Display', 'Crimson Text', 'Droid Serif'] },
  { name: 'Oswald', weight: 700, category: 'sans', pairs: ['Lora', 'Merriweather', 'Crimson Text'] },
  { name: 'PT Serif', weight: 700, category: 'serif', pairs: ['Open Sans', 'Lato', 'Raleway'] },
  { name: 'Merriweather', weight: 400, category: 'serif', pairs: ['Montserrat', 'Raleway', 'Open Sans'] },
  { name: 'Cormorant Garamond', weight: 700, category: 'serif', pairs: ['Lato', 'Raleway', 'Open Sans'] },
  { name: 'Crimson Text', weight: 400, category: 'serif', pairs: ['Montserrat', 'Raleway', 'Poppins'] },
  { name: 'Lora', weight: 400, category: 'serif', pairs: ['Montserrat', 'Raleway', 'Poppins'] },
  { name: 'Droid Serif', weight: 400, category: 'serif', pairs: ['Lato', 'Open Sans', 'Roboto'] },
  { name: 'Source Serif Pro', weight: 400, category: 'serif', pairs: ['Open Sans', 'Source Sans Pro', 'Lato'] },
  { name: 'Open Sans', weight: 400, category: 'sans', pairs: ['Playfair Display', 'PT Serif', 'Merriweather'] },
  { name: 'Libre Baskerville', weight: 400, category: 'serif', pairs: ['Montserrat', 'Raleway', 'Source Sans Pro'] },
  { name: 'Bitter', weight: 700, category: 'serif', pairs: ['Montserrat', 'Raleway', 'Open Sans'] },
  { name: 'Inconsolata', weight: 400, category: 'mono', pairs: ['Raleway', 'Montserrat', 'Lato'] },
  { name: 'IBM Plex Serif', weight: 400, category: 'serif', pairs: ['Poppins', 'IBM Plex Sans', 'Lato'] },
  { name: 'IBM Plex Sans', weight: 400, category: 'sans', pairs: ['IBM Plex Serif', 'Lora', 'Merriweather'] },
];

const headingSample = 'The Quick Brown Fox';
const bodySample =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

export default function FontPairSuggester() {
  const [selectedHeading, setSelectedHeading] = useState('Playfair Display');
  const [selectedBody, setSelectedBody] = useState('Lato');

  const headingFont = useMemo(
    () => googleFonts.find((f) => f.name === selectedHeading),
    [selectedHeading]
  );

  const suggestedPairs = useMemo(() => {
    if (!headingFont) return [];
    return headingFont.pairs
      .map((name) => googleFonts.find((f) => f.name === name))
      .filter(Boolean);
  }, [headingFont]);

  const bodyFont = useMemo(() => googleFonts.find((f) => f.name === selectedBody), [selectedBody]);

  const fontFamilyUrl = (fontName) => {
    const encoded = fontName.replace(/\s+/g, '+');
    return `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;600;700&display=swap`;
  };

  const getCSSImport = () => {
    const headingEncoded = selectedHeading.replace(/\s+/g, '+');
    const bodyEncoded = selectedBody.replace(/\s+/g, '+');
    return `@import url('https://fonts.googleapis.com/css2?family=${headingEncoded}:wght@600;700&family=${bodyEncoded}:wght@400;500&display=swap');`;
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(getCSSImport());
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      {/* Selection */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <h2 className="text-xl font-bold text-text-primary">Font Pair Suggester</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Heading Font */}
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-3">
              Heading Font
            </label>
            <select
              value={selectedHeading}
              onChange={(e) => setSelectedHeading(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              {googleFonts.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
          </div>

          {/* Body Font */}
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-3">
              Body Font
            </label>
            <select
              value={selectedBody}
              onChange={(e) => setSelectedBody(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            >
              {googleFonts.map((font) => (
                <option key={font.name} value={font.name}>
                  {font.name} ({font.category})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-surface border border-border rounded-lg p-8 space-y-8">
        <div>
          <p className="text-text-secondary text-sm mb-2">Heading (Primary)</p>
          <p
            style={{
              fontFamily: `"${selectedHeading}", serif`,
              fontSize: '2.5rem',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
            className="text-text-primary"
          >
            {headingSample}
          </p>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-text-secondary text-sm mb-2">Body (Secondary)</p>
          <p
            style={{
              fontFamily: `"${selectedBody}", sans-serif`,
              fontSize: '1rem',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
            className="text-text-primary"
          >
            {bodySample}
          </p>
        </div>
      </div>

      {/* Suggested Pairs */}
      {suggestedPairs.length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
          <h3 className="text-text-primary font-semibold">Recommended Pairings for {selectedHeading}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestedPairs.slice(0, 3).map((pair) => (
              <button
                key={pair.name}
                onClick={() => setSelectedBody(pair.name)}
                className={`p-4 rounded-lg border-2 transition-colors text-left ${
                  selectedBody === pair.name
                    ? 'bg-blue-100 border-accent'
                    : 'bg-white border-blue-200 hover:border-accent'
                }`}
              >
                <p className="text-text-secondary text-sm mb-2">{pair.category.toUpperCase()}</p>
                <p
                  style={{
                    fontFamily: `"${pair.name}", sans-serif`,
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}
                  className="text-text-primary"
                >
                  {pair.name}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Font Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-text-primary font-semibold mb-4">Heading Font Details</h3>
          {headingFont && (
            <div className="space-y-3">
              {[
                { label: 'Font Name', value: headingFont.name },
                { label: 'Type', value: headingFont.category.charAt(0).toUpperCase() + headingFont.category.slice(1) },
                { label: 'Weight', value: headingFont.weight.toString() },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-semibold text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h3 className="text-text-primary font-semibold mb-4">Body Font Details</h3>
          {bodyFont && (
            <div className="space-y-3">
              {[
                { label: 'Font Name', value: bodyFont.name },
                { label: 'Type', value: bodyFont.category.charAt(0).toUpperCase() + bodyFont.category.slice(1) },
                { label: 'Weight', value: bodyFont.weight.toString() },
              ].map((item) => (
                <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-b-0">
                  <span className="text-text-secondary">{item.label}</span>
                  <span className="font-semibold text-text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CSS Import */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">CSS Import</h3>
        <div className="bg-white border border-border rounded p-4 font-mono-num text-sm overflow-x-auto">
          <code>{getCSSImport()}</code>
        </div>
        <button
          onClick={handleCopyCSS}
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-accent-hover transition-colors"
        >
          Copy CSS Import
        </button>
        <p className="text-text-secondary text-sm">
          Add this to your CSS or HTML &lt;head&gt; to load both fonts from Google Fonts.
        </p>
      </div>

      {/* CSS Usage Example */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 space-y-4">
        <h3 className="text-text-primary font-semibold">CSS Usage Example</h3>
        <div className="bg-white border border-purple-200 rounded p-4 font-mono-num text-sm space-y-2">
          <div>
            <code className="text-text-primary">h1, h2, h3 {'{}'}</code>
          </div>
          <div className="ml-4 text-text-secondary">
            <code>font-family: '{selectedHeading}', serif;</code>
          </div>
          <div>
            <code className="text-text-primary">body, p {'{}'}</code>
          </div>
          <div className="ml-4 text-text-secondary">
            <code>font-family: '{selectedBody}', sans-serif;</code>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Font Pairing Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>✓ Serif fonts (Playfair) work well for headings and elegance</li>
          <li>✓ Sans-serif fonts (Lato, Raleway) are better for body text and readability</li>
          <li>✓ Pair serif with sans-serif for classic contrast</li>
          <li>✓ Use monospace fonts sparingly for code or special emphasis</li>
          <li>✓ Limit yourself to 2-3 fonts maximum per design</li>
          <li>✓ Test readability at different sizes and on mobile devices</li>
        </ul>
      </div>
    </div>
  );
}
