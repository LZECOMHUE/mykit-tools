'use client';

import { useState, useMemo } from 'react';

export default function ThanksgivingDinnerCalculator() {
  const [numGuests, setNumGuests] = useState(12);
  const [stuffedTurkey, setStuffedTurkey] = useState(false);

  const calculations = useMemo(() => {
    const guests = Math.max(4, Math.min(30, parseInt(numGuests) || 12));

    // Turkey: 1.5 lbs per person (allow extra)
    const turkeyLbs = (guests * 1.5).toFixed(1);

    // Cooking time: 15 min/lb unstuffed, 20 min/lb stuffed at 325F
    const cookingMinutesPerLb = stuffedTurkey ? 20 : 15;
    const totalCookingMinutes = Math.ceil(parseFloat(turkeyLbs) * cookingMinutesPerLb);
    const hours = Math.floor(totalCookingMinutes / 60);
    const minutes = totalCookingMinutes % 60;
    const cookingTime = `${hours}h ${minutes}m`;

    // Mashed potatoes: 0.5 lb per person
    const potatoesLbs = (guests * 0.5).toFixed(1);
    const potatoesServings = Math.ceil(guests / 4); // ~4 people per 2lb serving

    // Gravy: 1/3 cup per person
    const gravyCups = (guests / 3).toFixed(1);
    const gravyQuarts = (guests / 12).toFixed(1);

    // Stuffing: 3/4 cup per person
    const stuffingCups = ((guests * 0.75) / 1).toFixed(1);
    const stuffingBoxes = Math.ceil(guests / 4); // ~4 people per box

    // Cranberry sauce: 1/4 cup per person
    const cranberryCups = (guests / 4).toFixed(1);
    const cranberryCans = Math.ceil(guests / 8); // ~8 people per can

    // Green bean casserole: 1 can per 4 people
    const greenBeanCans = Math.ceil(guests / 4);
    const greenBeans = greenBeanCans;

    // Dinner rolls: 2 per person
    const rolls = guests * 2;
    const rollPackages = Math.ceil(rolls / 12); // ~12 per package

    // Pumpkin pie: 1 per 8 people
    const pumpkinPies = Math.ceil(guests / 8);

    // Sweet potatoes: 1 per person
    const sweetPotatoes = guests;

    return {
      guests,
      turkeyLbs,
      cookingTime,
      stuffedTurkey,
      potatoesLbs,
      potatoesServings,
      gravyCups,
      gravyQuarts,
      stuffingCups,
      stuffingBoxes,
      cranberryCups,
      cranberryCans,
      greenBeanCans,
      greenBeans,
      rolls,
      rollPackages,
      pumpkinPies,
      sweetPotatoes,
    };
  }, [numGuests, stuffedTurkey]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      {/* Header with warm autumn colors */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6">
        <h1 className="text-3xl font-heading font-bold text-amber-900 mb-2">Thanksgiving Dinner Calculator</h1>
        <p className="text-amber-800">Plan the perfect feast for your gathering</p>
      </div>

      {/* Guest Count */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-4">Number of Guests</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="4"
              max="30"
              value={numGuests}
              onChange={(e) => setNumGuests(parseInt(e.target.value))}
              className="flex-1 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="text-right">
              <div className="font-mono text-3xl font-bold text-amber-700">{calculations.guests}</div>
              <div className="text-xs text-text-muted">people</div>
            </div>
          </div>
        </div>

        {/* Turkey Type */}
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Turkey</label>
          <div className="flex gap-2">
            <button
              onClick={() => setStuffedTurkey(false)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                !stuffedTurkey
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Unstuffed
            </button>
            <button
              onClick={() => setStuffedTurkey(true)}
              className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                stuffedTurkey
                  ? 'bg-amber-500 text-white'
                  : 'bg-white border border-border text-text-primary hover:bg-surface'
              }`}
            >
              Stuffed
            </button>
          </div>
        </div>
      </div>

      {/* Turkey Info Box */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <p className="text-orange-600 text-sm font-medium mb-1">Turkey Size & Cooking Time</p>
        <p className="font-mono text-3xl font-bold text-orange-700">{calculations.turkeyLbs} lbs</p>
        <p className="text-orange-600 text-xs mt-1 mb-3">at 325°F</p>
        <div className="bg-white rounded-lg p-3 border border-orange-200">
          <p className="text-sm text-text-primary">
            <strong>Cooking Time:</strong> <span className="font-mono font-semibold text-orange-700">{calculations.cookingTime}</span>
          </p>
          <p className="text-xs text-text-muted mt-1">
            {calculations.stuffedTurkey ? '20 min/lb (stuffed)' : '15 min/lb (unstuffed)'}
          </p>
        </div>
      </div>

      {/* Shopping List */}
      <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-bold text-text-primary">Shopping List</h3>

        <div className="space-y-3">
          {/* Turkey */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Turkey</p>
              <p className="text-xs text-text-muted">{calculations.turkeyLbs} lbs (1.5 lbs per person)</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.turkeyLbs}</p>
              <p className="text-xs text-text-muted">lbs</p>
            </div>
          </div>

          {/* Mashed Potatoes */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Potatoes</p>
              <p className="text-xs text-text-muted">Russet for mashing</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.potatoesLbs}</p>
              <p className="text-xs text-text-muted">lbs</p>
            </div>
          </div>

          {/* Stuffing */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Stuffing Mix</p>
              <p className="text-xs text-text-muted">Dry seasoned bread cubes</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.stuffingBoxes}</p>
              <p className="text-xs text-text-muted">boxes</p>
            </div>
          </div>

          {/* Cranberry Sauce */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Cranberry Sauce</p>
              <p className="text-xs text-text-muted">Canned or homemade</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.cranberryCans}</p>
              <p className="text-xs text-text-muted">cans</p>
            </div>
          </div>

          {/* Green Bean Casserole */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Canned Green Beans</p>
              <p className="text-xs text-text-muted">For green bean casserole</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.greenBeanCans}</p>
              <p className="text-xs text-text-muted">cans</p>
            </div>
          </div>

          {/* Sweet Potatoes */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Sweet Potatoes</p>
              <p className="text-xs text-text-muted">1 per person</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.sweetPotatoes}</p>
              <p className="text-xs text-text-muted">potatoes</p>
            </div>
          </div>

          {/* Dinner Rolls */}
          <div className="flex items-start justify-between py-3 border-b border-border">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Dinner Rolls</p>
              <p className="text-xs text-text-muted">2 per person</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.rollPackages}</p>
              <p className="text-xs text-text-muted">packages</p>
            </div>
          </div>

          {/* Pumpkin Pie */}
          <div className="flex items-start justify-between py-3">
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Pumpkin Pie</p>
              <p className="text-xs text-text-muted">1 pie per 8 people</p>
            </div>
            <div className="text-right">
              <p className="font-mono font-semibold text-text-primary">{calculations.pumpkinPies}</p>
              <p className="text-xs text-text-muted">pies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cooking Tips */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Cooking Tips</h3>
        <ul className="space-y-2 text-text-secondary text-sm">
          <li>• <strong>Thaw turkey:</strong> Allow 24 hours for every 4-5 lbs (plan ahead!)</li>
          <li>• <strong>Oven space:</strong> Start turkey early - it takes the longest</li>
          <li>• <strong>Food safety:</strong> Turkey is done when thickest thigh reaches 165°F</li>
          <li>• <strong>Prep potatoes:</strong> Peel and chop the day before, store in water</li>
          <li>• <strong>Make ahead:</strong> Pie, cranberry sauce, and stuffing prep can be done 1-2 days early</li>
          <li>• <strong>Timing:</strong> Work backwards from when you want to eat</li>
        </ul>
      </div>

      {/* Shopping Checklist */}
      <div className="bg-white border border-border rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Don't Forget!</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="butter" className="w-4 h-4" />
            <label htmlFor="butter" className="text-text-secondary">Butter (for mashed potatoes, rolls, vegetables)</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="cream" className="w-4 h-4" />
            <label htmlFor="cream" className="text-text-secondary">Heavy cream or sour cream</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="gravy" className="w-4 h-4" />
            <label htmlFor="gravy" className="text-text-secondary">Gravy ingredients or stock</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="spices" className="w-4 h-4" />
            <label htmlFor="spices" className="text-text-secondary">Fresh herbs (sage, thyme)</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="mushrooms" className="w-4 h-4" />
            <label htmlFor="mushrooms" className="text-text-secondary">Cream of mushroom soup (for casserole)</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="onions" className="w-4 h-4" />
            <label htmlFor="onions" className="text-text-secondary">Onions and garlic</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="celery" className="w-4 h-4" />
            <label htmlFor="celery" className="text-text-secondary">Celery (for stuffing)</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="drinks" className="w-4 h-4" />
            <label htmlFor="drinks" className="text-text-secondary">Beverages and dessert wine</label>
          </div>
        </div>
      </div>

      {/* Serving Portions */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
        <h3 className="text-text-primary font-semibold">Serving Portions Per Person</h3>
        <div className="space-y-2 text-sm text-text-secondary">
          <div className="flex justify-between">
            <span>Turkey</span>
            <span className="font-mono">~0.75 lbs</span>
          </div>
          <div className="flex justify-between">
            <span>Mashed Potatoes</span>
            <span className="font-mono">~0.5 cup</span>
          </div>
          <div className="flex justify-between">
            <span>Gravy</span>
            <span className="font-mono">~1/3 cup</span>
          </div>
          <div className="flex justify-between">
            <span>Stuffing</span>
            <span className="font-mono">~0.75 cup</span>
          </div>
          <div className="flex justify-between">
            <span>Cranberry Sauce</span>
            <span className="font-mono">~1/4 cup</span>
          </div>
          <div className="flex justify-between">
            <span>Sweet Potatoes</span>
            <span className="font-mono">1 small</span>
          </div>
          <div className="flex justify-between">
            <span>Dinner Rolls</span>
            <span className="font-mono">2 rolls</span>
          </div>
        </div>
      </div>
    </div>
  );
}
