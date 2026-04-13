'use client';

import { useState } from 'react';
import { downloadAsJPG, drawBulletList } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function MeetingAgendaGenerator() {
  const [title, setTitle] = useState('Project Status Review');
  const [duration, setDuration] = useState(60);
  const [items, setItems] = useState(['Quarterly updates', 'Budget review', 'Action items']);

  const getTimePerItem = () => {
    const buffer = 10;
    return Math.floor((duration - buffer) / (items.length + 1));
  };

  const timePerItem = getTimePerItem();

  const agenda = [];
  let currentTime = 0;

  agenda.push({
    time: currentTime,
    duration: 5,
    item: 'Welcome & Introductions',
  });

  currentTime += 5;
  items.forEach((item) => {
    agenda.push({
      time: currentTime,
      duration: timePerItem,
      item,
    });
    currentTime += timePerItem;
  });

  agenda.push({
    time: currentTime,
    duration: Math.max(5, duration - currentTime),
    item: 'Action Items & Wrap-Up',
  });

  const handleCopy = () => {
    const text = agenda
      .map((a) => `${String(a.time).padStart(2, '0')}:00 - ${a.item} (${a.duration} mins)`)
      .join('\n');
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleDownloadJPG = () => {
    const agendaLines = agenda.map(
      (a) => `${String(a.time).padStart(2, '0')}:00 - ${a.item} (${a.duration} mins)`
    );

    downloadAsJPG({
      filename: `meeting-agenda-${title.replace(/\s+/g, '-').toLowerCase()}.jpg`,
      width: 700,
      height: 900,
      title: 'Meeting Agenda',
      subtitle: title,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Duration: ' + duration + ' minutes', area.x, y);
        y += 20;

        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 16;

        ctx.font = '12px sans-serif';
        ctx.fillStyle = '#2563eb';
        ctx.fillText('Agenda Items', area.x, y);
        y += 20;

        agendaLines.forEach((line) => {
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(area.x + 6, y + 6, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#1a1a1a';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(line, area.x + 16, y);
          y += 18;
        });
      },
    });
  };

  const addItem = () => {
    setItems([...items, 'New topic']);
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  const updateItem = (idx, value) => {
    const newItems = [...items];
    newItems[idx] = value;
    setItems(newItems);
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Meeting Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="15"
            max="480"
            step="5"
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Topics
        </h3>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateItem(idx, e.target.value)}
                className="flex-1 px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
              />
              <button
                onClick={() => removeItem(idx)}
                className="px-3 py-2 text-error bg-red-100 rounded-[var(--radius-input)] hover:opacity-80"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addItem}
          className="w-full mt-3 px-3 py-2 border border-accent text-accent rounded-[var(--radius-input)] font-medium hover:bg-blue-50"
        >
          Add Topic
        </button>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Agenda
        </h3>
        <div className="space-y-2">
          {agenda.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center bg-surface rounded-[var(--radius-input)] p-3">
              <div>
                <p className="font-mono font-bold text-text-primary">
                  {String(item.time).padStart(2, '0')}:00
                </p>
                <p className="text-sm text-text-secondary">{item.item}</p>
              </div>
              <p className="text-sm font-medium text-text-muted">
                {item.duration} mins
              </p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
          >
            Copy Agenda
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
    </div>
  );
}
