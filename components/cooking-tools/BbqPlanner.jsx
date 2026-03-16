'use client';

import { useState } from 'react';
import { downloadAsJPG, drawBulletList, drawKeyValue } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function BbqPlanner() {
  const [numGuests, setNumGuests] = useState(8);
  const [items, setItems] = useState({
    burgers: false,
    sausages: false,
    chicken: false,
    ribs: false,
    corn: false,
    coleslaw: false,
  });

  const portions = {
    burgers: 0.25,
    sausages: 0.3,
    chicken: 0.3,
    ribs: 0.4,
    corn: 0.5,
    coleslaw: 0.15,
  };

  const costs = {
    burgers: 4,
    sausages: 3.5,
    chicken: 5,
    ribs: 12,
    corn: 2,
    coleslaw: 1.5,
  };

  const selected = Object.entries(items).filter(([_, selected]) => selected);
  const totalQuantity = selected.reduce((sum, [item]) => sum + (portions[item] * numGuests), 0);
  const totalCost = selected.reduce((sum, [item]) => sum + (costs[item] * numGuests), 0);

  const handleDownloadJPG = () => {
    const shoppingItems = selected.map(([item]) => {
      const quantity = portions[item] * numGuests;
      const cost = costs[item] * numGuests;
      return `${item.charAt(0).toUpperCase() + item.slice(1)}: ${quantity.toFixed(1)} units (£${cost.toFixed(2)})`;
    });

    downloadAsJPG({
      filename: `bbq-plan-${numGuests}-guests.jpg`,
      width: 700,
      height: 900,
      title: 'BBQ Plan',
      subtitle: `${numGuests} guests`,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Shopping List', area.x, y);
        y += 20;

        if (selected.length === 0) {
          ctx.fillStyle = '#525252';
          ctx.font = '11px sans-serif';
          ctx.fillText('No items selected', area.x, y);
          y += 20;
        } else {
          shoppingItems.forEach((item) => {
            ctx.fillStyle = '#2563eb';
            ctx.beginPath();
            ctx.arc(area.x + 6, y + 5, 2.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1a1a1a';
            ctx.font = '11px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(item, area.x + 16, y);
            y += 18;
          });
        }

        y += 12;
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 16;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Total Budget', area.x, y);
        ctx.textAlign = 'right';
        ctx.font = 'bold 13px monospace';
        ctx.fillText(`£${totalCost.toFixed(2)}`, area.x + area.width, y);
        y += 18;

        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#525252';
        ctx.fillText('Per Guest', area.x, y);
        ctx.textAlign = 'right';
        ctx.font = '11px monospace';
        ctx.fillStyle = '#1a1a1a';
        ctx.fillText(`£${(totalCost / numGuests).toFixed(2)}`, area.x + area.width, y);

        y += 32;
        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Pro Tips', area.x, y);
        y += 18;

        const tips = [
          'Prep marinades the night before',
          'Grill burgers last to keep them warm',
          'Always have extra ice',
          'Keep cooked food warm with foil tents',
        ];

        tips.forEach((tip) => {
          ctx.fillStyle = '#2563eb';
          ctx.fillRect(area.x, y - 2, 3, 3);

          ctx.fillStyle = '#1a1a1a';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(tip, area.x + 8, y);
          y += 14;
        });
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 md:p-8 space-y-6">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Number of Guests
        </label>
        <input
          type="number"
          min="1"
          max="100"
          value={numGuests}
          onChange={(e) => setNumGuests(Number(e.target.value))}
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Menu Items
        </h3>

        <div className="space-y-3">
          {Object.entries(items).map(([item, checked]) => (
            <label key={item} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setItems({ ...items, [item]: e.target.checked })}
                className="w-4 h-4 rounded border-border"
              />
              <span className="ml-3 text-sm font-medium text-text-primary capitalize">
                {item} (£{costs[item].toFixed(2)} each)
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-6 space-y-4">
        <h3 className="font-heading text-lg font-bold text-text-primary">
          Shopping List
        </h3>

        {selected.length === 0 ? (
          <p className="text-center text-text-secondary py-4">Select items to see shopping list</p>
        ) : (
          <div className="space-y-3">
            {selected.map(([item]) => {
              const quantity = portions[item] * numGuests;
              const cost = costs[item] * numGuests;
              return (
                <div key={item} className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
                  <div>
                    <p className="font-medium text-text-primary capitalize">{item}</p>
                    <p className="text-sm text-text-secondary">
                      {quantity.toLocaleString('en-GB', { maximumFractionDigits: 1 })} units
                    </p>
                  </div>
                  <p className="font-mono font-bold text-accent">
                    £{cost.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {selected.length > 0 && (
          <>
            <div className="border-t border-border pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-text-primary">Total Budget</span>
                <span className="text-2xl font-mono font-bold text-accent">
                  £{totalCost.toLocaleString('en-GB', { maximumFractionDigits: 2 })}
                </span>
              </div>
              <p className="text-sm text-text-secondary mt-1">
                £{(totalCost / numGuests).toLocaleString('en-GB', { maximumFractionDigits: 2 })} per guest
              </p>
            </div>
          </>
        )}
      </div>

      <Button
        onClick={handleDownloadJPG}
        variant="primary"
        className="w-full"
      >
        Download JPG
      </Button>

      <div className="space-y-3">
        <div className="bg-surface rounded-[var(--radius-input)] p-4">
          <p className="text-sm font-medium text-text-primary mb-1">Pro Tips</p>
          <ul className="text-sm text-text-secondary space-y-1 list-disc list-inside">
            <li>Prep marinades the night before</li>
            <li>Grill burgers last to keep them warm</li>
            <li>Always have extra ice</li>
            <li>Keep cooked food warm with foil tents</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
