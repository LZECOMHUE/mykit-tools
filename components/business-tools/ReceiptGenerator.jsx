'use client';

import { useState } from 'react';
import { downloadAsJPG, drawKeyValue, drawBulletList } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function ReceiptGenerator() {
  const [businessName, setBusinessName] = useState('Acme Ltd');
  const [items, setItems] = useState([
    { description: 'Product A', qty: 1, price: 19.99 },
    { description: 'Service B', qty: 1, price: 49.99 },
  ]);
  const [includeVAT, setIncludeVAT] = useState(true);

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const vat = includeVAT ? subtotal * 0.2 : 0;
  const total = subtotal + vat;

  const addItem = () => {
    setItems([...items, { description: 'Item', qty: 1, price: 0 }]);
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, field, value) => {
    const newItems = [...items];
    newItems[idx] = { ...newItems[idx], [field]: field === 'description' ? value : Number(value) };
    setItems(newItems);
  };

  const copyReceipt = () => {
    let text = `${businessName}\n`;
    text += `Receipt\n`;
    text += `Date: ${new Date().toLocaleDateString('en-GB')}\n\n`;
    items.forEach((item) => {
      text += `${item.description} x${item.qty} = £${(item.qty * item.price).toFixed(2)}\n`;
    });
    text += `\nSubtotal: £${subtotal.toFixed(2)}\n`;
    if (includeVAT) {
      text += `VAT (20%): £${vat.toFixed(2)}\n`;
    }
    text += `Total: £${total.toFixed(2)}\n`;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleDownloadJPG = () => {
    downloadAsJPG({
      filename: `receipt-${new Date().toISOString().split('T')[0]}.jpg`,
      width: 500,
      height: 800,
      title: 'Receipt',
      subtitle: businessName,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(businessName, area.x + area.width / 2, y);
        y += 20;

        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#525252';
        ctx.fillText(`Receipt - ${new Date().toLocaleDateString('en-GB')}`, area.x + area.width / 2, y);
        y += 24;

        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 12;

        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1a1a1a';
        items.forEach((item) => {
          const lineTotal = (item.qty * item.price).toFixed(2);
          ctx.fillText(item.description, area.x + 8, y);
          ctx.textAlign = 'right';
          ctx.font = '11px monospace';
          ctx.fillText(`£${lineTotal}`, area.x + area.width - 8, y);
          ctx.textAlign = 'left';
          ctx.font = '11px sans-serif';
          y += 16;
        });

        y += 8;
        ctx.strokeStyle = '#e5e5e5';
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 12;

        ctx.fillStyle = '#525252';
        ctx.textAlign = 'left';
        ctx.fillText('Subtotal', area.x + 8, y);
        ctx.textAlign = 'right';
        ctx.font = 'bold 11px monospace';
        ctx.fillStyle = '#1a1a1a';
        ctx.fillText(`£${subtotal.toFixed(2)}`, area.x + area.width - 8, y);
        y += 16;

        if (includeVAT) {
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillStyle = '#525252';
          ctx.fillText('VAT (20%)', area.x + 8, y);
          ctx.textAlign = 'right';
          ctx.font = 'bold 11px monospace';
          ctx.fillStyle = '#1a1a1a';
          ctx.fillText(`£${vat.toFixed(2)}`, area.x + area.width - 8, y);
          y += 16;
        }

        y += 4;
        ctx.strokeStyle = '#e5e5e5';
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 12;

        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#1a1a1a';
        ctx.fillText('Total', area.x + 8, y);
        ctx.textAlign = 'right';
        ctx.font = 'bold 13px monospace';
        ctx.fillText(`£${total.toFixed(2)}`, area.x + area.width - 8, y);
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Business Name
        </label>
        <input
          type="text"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
        />
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Items
        </h3>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="grid grid-cols-4 gap-2">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(idx, 'description', e.target.value)}
                className="col-span-2 px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm"
                placeholder="Description"
              />
              <input
                type="number"
                value={item.qty}
                onChange={(e) => updateItem(idx, 'qty', e.target.value)}
                className="px-2 py-1 border border-border rounded-[var(--radius-input)] text-sm font-mono"
                placeholder="Qty"
              />
              <div className="flex gap-1">
                <div className="relative flex-1">
                  <span className="absolute left-2 text-text-primary text-sm">£</span>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(idx, 'price', e.target.value)}
                    className="w-full pl-6 pr-2 py-1 border border-border rounded-[var(--radius-input)] text-sm font-mono"
                    placeholder="Price"
                    step="0.01"
                  />
                </div>
                <button
                  onClick={() => removeItem(idx)}
                  className="px-2 text-error text-sm hover:bg-red-100 rounded"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="w-full mt-3 px-3 py-2 border border-accent text-accent rounded-[var(--radius-input)] font-medium hover:bg-blue-50"
        >
          Add Item
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={includeVAT}
          onChange={(e) => setIncludeVAT(e.target.checked)}
          className="w-4 h-4 rounded border-border"
        />
        <label className="text-sm font-medium text-text-primary">Include VAT (20%)</label>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border font-mono text-sm">
        <p className="text-center font-bold text-text-primary text-lg mb-4">{businessName}</p>
        <p className="text-center text-text-secondary mb-4">Receipt</p>
        <div className="border-t border-b border-border py-3 space-y-1">
          {items.map((item, idx) => (
            <div key={idx} className="flex justify-between text-text-primary">
              <span>{item.description}</span>
              <span>£{(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex justify-between text-text-primary">
            <span>Subtotal</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
          {includeVAT && (
            <div className="flex justify-between text-text-primary">
              <span>VAT (20%)</span>
              <span>£{vat.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-text-primary text-base pt-2 border-t border-text-primary">
            <span>Total</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
        <p className="text-center text-text-muted text-xs mt-4">
          {new Date().toLocaleDateString('en-GB')}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={copyReceipt}
          className="flex-1 px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
        >
          Copy Receipt as Text
        </button>
        <Button
          onClick={handleDownloadJPG}
          variant="secondary"
          className="flex-1"
        >
          Download JPG
        </Button>
      </div>
    </div>
  );
}
