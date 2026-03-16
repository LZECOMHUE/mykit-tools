'use client';

import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const wordLists = {
  tech: {
    modern: ['Vertex', 'Pixel', 'Nexus', 'Flux', 'Nova', 'Prism', 'Helix', 'Quantum', 'Echo', 'Spark'],
    classic: ['Systems', 'Solutions', 'Digital', 'Tech', 'Networks', 'Computing', 'Data', 'Logic', 'Cloud', 'Web'],
    playful: ['Zippy', 'Quirk', 'Bounce', 'Swift', 'Zest', 'Whiz', 'Snap', 'Ping', 'Byte', 'Blip'],
    professional: ['Enterprise', 'Strategic', 'Optimal', 'Summit', 'Elite', 'Prime', 'Core', 'Hub', 'Matrix', 'Synergy'],
    minimalist: ['Dev', 'Code', 'Hub', 'Lab', 'Stack', 'Core', 'Base', 'Link', 'Net', 'Pod'],
  },
  food: {
    modern: ['Bloom', 'Canvas', 'Fork', 'Grain', 'Harvest', 'Ember', 'Sage', 'Zest', 'Ritual', 'Salt'],
    classic: ['Table', 'Kitchen', 'Bistro', 'Caf', 'Gourmet', 'House', 'Garden', 'Market', 'Mill', 'Farm'],
    playful: ['Nibble', 'Yum', 'Feast', 'Munch', 'Crumb', 'Chew', 'Slurp', 'Tipsy', 'Pop', 'Smack'],
    professional: ['Culinary', 'Premium', 'Artisan', 'Harvest', 'Elegant', 'Refined', 'Supreme', 'Gourmet', 'Select', 'Provenance'],
    minimalist: ['Eat', 'Dine', 'Sup', 'Bite', 'Plate', 'Table', 'Bowl', 'Leaf', 'Root', 'Grain'],
  },
  fashion: {
    modern: ['Vogue', 'Stitch', 'Loom', 'Canvas', 'Thread', 'Silk', 'Drape', 'Hue', 'Chic', 'Luxe'],
    classic: ['Style', 'Couture', 'Atelier', 'Haute', 'Vintage', 'Boutique', 'Elegance', 'Grace', 'Poise', 'Mode'],
    playful: ['Sass', 'Glam', 'Dapper', 'Snazzy', 'Strut', 'Flair', 'Snap', 'Fab', 'Zip', 'Pop'],
    professional: ['Premium', 'Signature', 'Exclusive', 'Heritage', 'Refined', 'Tailored', 'Bespoke', 'Select', 'Curated', 'Iconic'],
    minimalist: ['Cut', 'Fit', 'Wear', 'Cloth', 'Silk', 'Line', 'Form', 'Edge', 'Knit', 'Weave'],
  },
  health: {
    modern: ['Vitals', 'Zenith', 'Pulse', 'Bloom', 'Glow', 'Flow', 'Haven', 'Thrive', 'Radiant', 'Vital'],
    classic: ['Wellness', 'Health', 'Care', 'Medical', 'Life', 'Balance', 'Pure', 'Natural', 'Center', 'Clinic'],
    playful: ['Bounce', 'Zippy', 'Sparkle', 'Pep', 'Zest', 'Chirp', 'Beam', 'Brisk', 'Lively', 'Pop'],
    professional: ['Premier', 'Optimal', 'Advanced', 'Strategic', 'Elite', 'Comprehensive', 'Holistic', 'Summit', 'Pinnacle', 'Excellence'],
    minimalist: ['Flow', 'Glow', 'Pulse', 'Core', 'Hub', 'Zen', 'Pure', 'Fit', 'Well', 'Live'],
  },
  finance: {
    modern: ['Elevate', 'Ascent', 'Pivot', 'Flux', 'Wealth', 'Apex', 'Vertex', 'Digital', 'Quantum', 'Nexus'],
    classic: ['Capital', 'Financial', 'Securities', 'Trust', 'Bank', 'Equity', 'Investment', 'Fiscal', 'Monetary', 'Treasury'],
    playful: ['Penny', 'Buck', 'Quid', 'Profit', 'Yield', 'Surge', 'Leap', 'Boost', 'Rise', 'Gain'],
    professional: ['Strategic', 'Optimal', 'Premium', 'Premier', 'Elite', 'Pinnacle', 'Summit', 'Excellence', 'Signature', 'Exclusive'],
    minimalist: ['Fund', 'Gain', 'Rise', 'Wealth', 'Trust', 'Core', 'Plus', 'Peak', 'Prime', 'Vox'],
  },
  creative: {
    modern: ['Studio', 'Canvas', 'Palette', 'Prism', 'Spectrum', 'Form', 'Flux', 'Mesh', 'Spark', 'Bloom'],
    classic: ['Arts', 'Gallery', 'Atelier', 'Workshop', 'House', 'Studio', 'Design', 'Creative', 'Works', 'Lab'],
    playful: ['Squiggle', 'Zest', 'Whimsy', 'Doodle', 'Spark', 'Pop', 'Zing', 'Quirk', 'Jazz', 'Vibe'],
    professional: ['Signature', 'Premier', 'Bespoke', 'Artisan', 'Curated', 'Elite', 'Refined', 'Pinnacle', 'Collective', 'Studio'],
    minimalist: ['Make', 'Form', 'Edge', 'Ink', 'Art', 'Frame', 'Line', 'Color', 'Design', 'Built'],
  },
  retail: {
    modern: ['Market', 'Collective', 'Mercantile', 'Exchange', 'Bazaar', 'Plaza', 'Emporium', 'Bazaar', 'Outlet', 'Nexus'],
    classic: ['Market', 'Store', 'Shop', 'Merchant', 'Trade', 'Goods', 'Commerce', 'Buy', 'Sell', 'Import'],
    playful: ['Bargain', 'Snag', 'Treasure', 'Haul', 'Grab', 'Score', 'Pick', 'Snap', 'Find', 'Hunt'],
    professional: ['Premier', 'Select', 'Premium', 'Exclusive', 'Curated', 'Signature', 'Heritage', 'Refined', 'Luxury', 'Collection'],
    minimalist: ['Buy', 'Shop', 'Find', 'Pick', 'Cart', 'Goods', 'Store', 'Trade', 'Sell', 'Deal'],
  },
  consulting: {
    modern: ['Ascent', 'Nexus', 'Apex', 'Elevate', 'Synergy', 'Catalyst', 'Pivot', 'Strategy', 'Insight', 'Acumen'],
    classic: ['Consulting', 'Advisory', 'Partners', 'Group', 'Associates', 'Advisors', 'Strategic', 'Business', 'Corporate', 'Management'],
    playful: ['Catalyst', 'Spark', 'Shift', 'Leap', 'Pulse', 'Wave', 'Quest', 'Climb', 'Launch', 'Breakthrough'],
    professional: ['Premier', 'Strategic', 'Executive', 'Elite', 'Summit', 'Optimal', 'Pinnacle', 'Excellence', 'Global', 'Signature'],
    minimalist: ['Apex', 'Rise', 'Core', 'Peak', 'Path', 'Edge', 'Hub', 'Smart', 'Wise', 'Grow'],
  },
};

export default function BusinessNameGenerator() {
  const [industry, setIndustry] = useState('tech');
  const [style, setStyle] = useState('modern');
  const [wordCount, setWordCount] = useState('2');
  const [names, setNames] = useState([]);

  const generateNames = () => {
    const words = wordLists[industry][style];
    const newNames = [];
    const count = parseInt(wordCount);

    for (let i = 0; i < 10; i++) {
      const nameArray = [];
      for (let j = 0; j < count; j++) {
        nameArray.push(words[Math.floor(Math.random() * words.length)]);
      }
      newNames.push(nameArray.join(''));
    }

    setNames(newNames);
  };

  return (
    <div className="space-y-6">
      {/* Configuration */}
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h2 className="font-heading text-lg font-semibold text-text-primary">
          Configure Your Name Generator
        </h2>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Industry
          </label>
          <Select
            value={industry}
            onChange={setIndustry}
            options={[
              { value: 'tech', label: 'Technology' },
              { value: 'food', label: 'Food & Drink' },
              { value: 'fashion', label: 'Fashion' },
              { value: 'health', label: 'Health & Wellness' },
              { value: 'finance', label: 'Finance' },
              { value: 'creative', label: 'Creative' },
              { value: 'retail', label: 'Retail' },
              { value: 'consulting', label: 'Consulting' },
            ]}
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Style
          </label>
          <Select
            value={style}
            onChange={setStyle}
            options={[
              { value: 'modern', label: 'Modern' },
              { value: 'classic', label: 'Classic' },
              { value: 'playful', label: 'Playful' },
              { value: 'professional', label: 'Professional' },
              { value: 'minimalist', label: 'Minimalist' },
            ]}
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Number of Words
          </label>
          <Select
            value={wordCount}
            onChange={setWordCount}
            options={[
              { value: '1', label: '1 word' },
              { value: '2', label: '2 words' },
              { value: '3', label: '3 words' },
            ]}
          />
        </div>
      </div>

      {/* Generate Button */}
      <Button onClick={generateNames} className="w-full">
        Generate Names
      </Button>

      {/* Names Grid */}
      {names.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-heading text-lg font-semibold text-text-primary">
            Your Business Names
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {names.map((name, idx) => (
              <Card key={idx} className="flex items-center justify-between">
                <span className="font-mono font-semibold text-text-primary text-lg">
                  {name}
                </span>
                <span className="text-text-muted text-xs">
                  {name.toLowerCase()}.com
                </span>
              </Card>
            ))}
          </div>
          <Button onClick={generateNames} variant="secondary" className="w-full">
            Regenerate
          </Button>
        </div>
      )}
    </div>
  );
}
