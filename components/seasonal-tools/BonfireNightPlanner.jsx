'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';

const safetyChecklist = [
  'Check fireworks are from approved retailers',
  'Never use fireworks after drinking alcohol',
  'Keep fireworks dry in a closed metal box',
  'Never go back to a dud firework',
  'Wear appropriate clothing (avoid loose sleeves)',
  'Have bucket of water nearby',
  'Designate a fireworks handler',
  'Keep children and pets at safe distance',
  'Read all instructions before lighting',
];

const foodItems = [
  { name: 'Toffee apples', perPerson: 0.5 },
  { name: 'Hot dogs', perPerson: 1 },
  { name: 'Hot dog buns', perPerson: 1.2 },
  { name: 'Tomato sauce (ml)', perPerson: 30 },
  { name: 'Jacket potatoes', perPerson: 1 },
  { name: 'Beef stew (servings)', perPerson: 1 },
  { name: 'Soup (litre)', perPerson: 0.3 },
  { name: 'Bread roll', perPerson: 1 },
  { name: 'Marshmallows (g)', perPerson: 100 },
  { name: 'Hot chocolate (cups)', perPerson: 1 },
];

export default function BonfireNightPlanner() {
  const [hosting, setHosting] = useState(true);
  const [guests, setGuests] = useState('20');
  const [checkedItems, setCheckedItems] = useState({});
  const [shoppingList, setShoppingList] = useState([]);

  const generateList = () => {
    const numGuests = parseInt(guests) || 20;
    const list = foodItems.map(item => ({
      ...item,
      quantity: Math.ceil(item.perPerson * numGuests),
    }));
    setShoppingList(list);
  };

  const toggleCheckbox = (idx) => {
    setCheckedItems(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="hosting"
            checked={hosting}
            onChange={() => setHosting(!hosting)}
          />
          <label htmlFor="hosting" className="text-text-primary cursor-pointer">
            I'm hosting at home
          </label>
        </div>

        {hosting && (
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">
              Number of Guests
            </label>
            <Input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="5"
              className="w-full max-w-xs"
            />
          </div>
        )}

        {hosting && (
          <Button onClick={generateList} className="bg-accent text-white">
            Generate Shopping List
          </Button>
        )}
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <h3 className="font-heading text-base font-bold text-text-primary">Safety Checklist</h3>
        <div className="space-y-3">
          {safetyChecklist.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <Checkbox
                id={`safety-${idx}`}
                checked={checkedItems[`safety-${idx}`] || false}
                onChange={() => toggleCheckbox(`safety-${idx}`)}
              />
              <label htmlFor={`safety-${idx}`} className="text-text-primary cursor-pointer text-sm">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      {shoppingList.length > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
          <h3 className="font-heading text-base font-bold text-text-primary">Food & Drink List (for {guests} guests)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-2 font-medium text-text-secondary">Item</th>
                  <th className="text-right py-2 px-2 font-medium text-text-secondary">Qty</th>
                  <th className="text-left py-2 px-2 font-medium text-text-secondary">Notes</th>
                </tr>
              </thead>
              <tbody>
                {shoppingList.map((item, idx) => (
                  <tr key={idx} className="border-b border-border">
                    <td className="py-2 px-2 text-text-primary">{item.name}</td>
                    <td className="py-2 px-2 text-text-secondary text-right font-mono font-bold">{item.quantity}</td>
                    <td className="py-2 px-2 text-text-muted text-xs">Allow per person: {item.perPerson}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
          <h3 className="font-heading text-base font-bold text-text-primary">Sparkler Safety Guide</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>Safe for ages 8+ only. Never given to children under 5.</p>
            <p>Wear protective gloves and keep at arm's length away from body.</p>
            <p>Never hold a sparkler if wearing loose clothing.</p>
            <p>Light just before using. Once finished, place in water bucket to cool.</p>
            <p>Never point sparklers at people or animals.</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
          <h3 className="font-heading text-base font-bold text-text-primary">Bonfire Building Tips</h3>
          <div className="space-y-2 text-sm text-text-secondary">
            <p>Use dry wood and kindling. Create a teepee shape with sticks.</p>
            <p>Clear area around fire to at least 2 metres in all directions.</p>
            <p>Never use accelerants like petrol. Use firelighters instead.</p>
            <p>Have water and sand nearby for emergencies.</p>
            <p>Keep fireworks away from bonfire.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
