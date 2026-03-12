'use client';

import { useState, useMemo } from 'react';

// ── Base packing lists by destination type ──────────────────

const packingLists = {
  beach: {
    essentials: ['Passport', 'Travel insurance', 'Booking confirmations', 'Medications'],
    clothes: ['Swimsuit', 'Shorts', 'T-shirts', 'Light dress', 'Cover-up', 'Lightweight jacket', 'Underwear', 'Socks', 'Comfortable shoes', 'Flip-flops', 'Sunhat/cap'],
    beach: ['Sunscreen (SPF 30+)', 'Beach towel', 'Sunglasses', 'Beach bag'],
    toiletries: ['Toothbrush', 'Toothpaste', 'Deodorant', 'Soap', 'Shampoo', 'Conditioner', 'Face wash', 'Moisturizer', 'Razor', 'Feminine hygiene'],
    electronics: ['Chargers', 'Phone/camera', 'Headphones', 'Portable charger'],
  },
  city: {
    essentials: ['Passport', 'Travel insurance', 'Booking confirmations', 'Medications'],
    clothes: ['Jeans', 'Trousers', 'Shirts', 'Jumpers', 'Light jacket', 'Comfortable walking shoes', 'Dressier outfit', 'Underwear', 'Socks', 'Jacket or coat'],
    city: ['Comfortable walking shoes', 'Day backpack', 'Reusable water bottle'],
    toiletries: ['Toothbrush', 'Toothpaste', 'Deodorant', 'Soap', 'Shampoo', 'Face wash', 'Moisturizer', 'Medications'],
    electronics: ['Chargers', 'Phone/camera', 'Portable charger', 'Travel adapter'],
  },
  mountains: {
    essentials: ['Passport', 'Travel insurance', 'Booking confirmations', 'Medications'],
    clothes: ['Hiking boots', 'Thermal layers', 'Fleece jacket', 'Waterproof jacket', 'Hiking pants', 'Warm socks', 'Hat/balaclava', 'Gloves', 'Underwear'],
    outdoor: ['Hiking backpack', 'Water bottle (2L)', 'Trail snacks', 'Map/GPS', 'Torch/headlamp', 'Insect repellent'],
    toiletries: ['Toothbrush', 'Toothpaste', 'Sunscreen', 'Deodorant', 'First aid kit', 'Blister treatment'],
    electronics: ['Chargers', 'Phone/GPS', 'Portable charger'],
  },
  cold: {
    essentials: ['Passport', 'Travel insurance', 'Booking confirmations', 'Medications'],
    clothes: ['Winter coat', 'Thermal layers', 'Jumpers', 'Trousers', 'Warm socks', 'Winter boots', 'Hat', 'Gloves', 'Scarf', 'Long underwear'],
    warmth: ['Hand warmers', 'Lip balm with SPF', 'Moisturizer for dry skin'],
    toiletries: ['Toothbrush', 'Toothpaste', 'Deodorant', 'Body wash', 'Moisturizing lotion', 'Sunscreen'],
    electronics: ['Chargers', 'Phone/camera', 'Portable charger', 'Extra batteries'],
  },
};

// ── Activity-specific items ─────────────────────────────────

const activityItems = {
  swimming: {
    label: '🏊 Swimming',
    items: {
      swimming: ['Goggles', 'Swim cap', 'Quick-dry towel', 'Waterproof phone pouch', 'Pool shoes/water shoes'],
    },
  },
  hiking: {
    label: '🥾 Hiking',
    items: {
      hiking: ['Hiking boots', 'Walking poles', 'Daypack', 'Trail snacks', 'Water bottle (2L)', 'Blister plasters', 'Insect repellent', 'Rain poncho', 'Headlamp/torch'],
    },
  },
  dining: {
    label: '🍽️ Dining Out',
    items: {
      'dining out': ['Smart/dressy outfit', 'Dress shoes', 'Evening bag/clutch', 'Jewellery/accessories'],
    },
  },
  business: {
    label: '💼 Business',
    items: {
      business: ['Suit/blazer', 'Formal shirts', 'Dress shoes', 'Laptop', 'Business cards', 'Notebook & pen', 'Tie/scarf'],
    },
  },
  photography: {
    label: '📷 Photography',
    items: {
      photography: ['Camera body', 'Extra lenses', 'Tripod', 'Memory cards', 'Camera battery charger', 'Lens cloth'],
    },
  },
  skiing: {
    label: '⛷️ Skiing / Snow Sports',
    items: {
      'snow sports': ['Ski goggles', 'Ski gloves', 'Base layers', 'Neck warmer', 'Helmet', 'Hand/toe warmers', 'Ski socks'],
    },
  },
  camping: {
    label: '⛺ Camping',
    items: {
      camping: ['Tent', 'Sleeping bag', 'Sleeping mat', 'Camping stove', 'Lighter/matches', 'Torch/headlamp', 'Bin bags', 'Pocket knife'],
    },
  },
  gym: {
    label: '💪 Gym / Fitness',
    items: {
      fitness: ['Trainers', 'Gym clothes', 'Resistance band', 'Sports bra', 'Gym towel', 'Protein snacks'],
    },
  },
};

// ── Duration multiplier tips ────────────────────────────────

const durationTips = {
  weekend: 'Pack light — you only need 2-3 outfits plus layers.',
  '1week': 'Plan to do laundry midway, or pack 5-6 tops and 2-3 bottoms.',
  '2weeks': 'Definitely plan laundry stops. Pack mix-and-match items.',
  month: 'Pack for one week and plan regular laundry. Add a few extras for variety.',
};

// ═══════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════

export default function PackingListGenerator() {
  const [destType, setDestType] = useState('beach');
  const [duration, setDuration] = useState('1week');
  const [activities, setActivities] = useState({});
  const [checked, setChecked] = useState(new Set());

  // Build the full packing list: base items + activity items (deduped)
  const fullList = useMemo(() => {
    const base = packingLists[destType];
    const merged = {};

    // Copy base categories
    for (const [cat, items] of Object.entries(base)) {
      merged[cat] = [...items];
    }

    // Add activity-specific categories
    for (const [actKey, isActive] of Object.entries(activities)) {
      if (!isActive) continue;
      const activity = activityItems[actKey];
      if (!activity) continue;
      for (const [cat, items] of Object.entries(activity.items)) {
        if (!merged[cat]) {
          merged[cat] = [];
        }
        for (const item of items) {
          // Deduplicate
          if (!merged[cat].includes(item)) {
            merged[cat].push(item);
          }
        }
      }
    }

    return merged;
  }, [destType, activities]);

  const allItems = useMemo(() => Object.values(fullList).flat(), [fullList]);

  const toggleChecked = (item) => {
    const newChecked = new Set(checked);
    if (newChecked.has(item)) {
      newChecked.delete(item);
    } else {
      newChecked.add(item);
    }
    setChecked(newChecked);
  };

  const toggleAll = () => {
    if (checked.size === allItems.length) {
      setChecked(new Set());
    } else {
      setChecked(new Set(allItems));
    }
  };

  // Only count items that are still in the current list
  const checkedCount = allItems.filter((item) => checked.has(item)).length;
  const completionPercent = allItems.length > 0 ? (checkedCount / allItems.length) * 100 : 0;

  const activeActivityCount = Object.values(activities).filter(Boolean).length;

  return (
    <div className="w-full max-w-3xl mx-auto space-y-5">
      {/* Configuration */}
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1.5">Destination Type</label>
            <select
              value={destType}
              onChange={(e) => {
                setDestType(e.target.value);
                setChecked(new Set());
              }}
              className="w-full px-3 py-2.5 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
            >
              <option value="beach">🏖️ Beach Holiday</option>
              <option value="city">🏙️ City Break</option>
              <option value="mountains">⛰️ Mountains / Outdoors</option>
              <option value="cold">❄️ Cold Climate</option>
            </select>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1.5">Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-border rounded-[var(--radius-input)] text-text-primary text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
            >
              <option value="weekend">Weekend (2-3 days)</option>
              <option value="1week">1 Week</option>
              <option value="2weeks">2 Weeks</option>
              <option value="month">1 Month</option>
            </select>
          </div>
        </div>

        {/* Activities */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Activities
            {activeActivityCount > 0 && (
              <span className="ml-2 text-xs text-accent font-normal">
                {activeActivityCount} selected — extra items added below
              </span>
            )}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(activityItems).map(([key, { label }]) => (
              <label
                key={key}
                className={`flex items-center gap-2 px-3 py-2 rounded-[var(--radius-input)] border cursor-pointer transition-colors text-sm ${
                  activities[key]
                    ? 'bg-accent/10 border-accent text-accent font-medium'
                    : 'bg-white border-border text-text-secondary hover:border-border-hover'
                }`}
              >
                <input
                  type="checkbox"
                  checked={!!activities[key]}
                  onChange={(e) => setActivities({ ...activities, [key]: e.target.checked })}
                  className="sr-only"
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duration tip */}
        <p className="text-xs text-text-muted italic">
          💡 {durationTips[duration]}
        </p>
      </div>

      {/* Packing List */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-text-primary font-semibold">
            Packing Checklist
            <span className="text-text-muted font-normal text-sm ml-2">
              ({allItems.length} items)
            </span>
          </h3>
          <button
            onClick={toggleAll}
            className="text-accent text-sm font-medium hover:underline cursor-pointer"
          >
            {checkedCount === allItems.length ? 'Clear All' : 'Check All'}
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
            <div
              className="h-full transition-all duration-300 rounded-full"
              style={{
                width: `${completionPercent}%`,
                backgroundColor: completionPercent === 100 ? 'var(--success)' : 'var(--accent)',
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-muted">
            <span>{checkedCount} of {allItems.length} items packed</span>
            {completionPercent === 100 && (
              <span className="text-success font-medium">✓ All packed!</span>
            )}
          </div>
        </div>

        {/* Category Lists */}
        {Object.entries(fullList).map(([category, items]) => (
          <div key={category} className="bg-surface border border-border rounded-[var(--radius-card)] p-4 space-y-1">
            <div className="flex justify-between items-center mb-1">
              <h4 className="text-text-primary font-medium text-sm capitalize">{category}</h4>
              <span className="text-[11px] text-text-muted">
                {items.filter((i) => checked.has(i)).length}/{items.length}
              </span>
            </div>
            <div className="space-y-0.5">
              {items.map((item) => (
                <label
                  key={`${category}-${item}`}
                  className="flex items-center gap-3 px-2 py-1.5 rounded-[var(--radius-input)] hover:bg-white cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={checked.has(item)}
                    onChange={() => toggleChecked(item)}
                    className="w-4 h-4 rounded cursor-pointer accent-accent shrink-0"
                  />
                  <span className={`text-sm transition-colors ${checked.has(item) ? 'text-text-muted line-through' : 'text-text-primary'}`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="bg-accent/5 border border-accent/20 rounded-[var(--radius-card)] p-4 text-sm text-text-secondary space-y-2">
        <p className="font-medium text-text-primary">💡 Packing Tips</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Pack 50% of what you think you need — you can always buy essentials</li>
          <li>Wear your bulkiest items on the plane to save luggage space</li>
          <li>Roll clothes instead of folding to save space and reduce creases</li>
          <li>Check weather forecasts 3 days before departure for last-minute swaps</li>
          <li>Leave room in your bag for souvenirs and purchases</li>
        </ul>
      </div>
    </div>
  );
}
