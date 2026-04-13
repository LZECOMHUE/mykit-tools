'use client';

import { useState } from 'react';
import { downloadAsJPG, drawKeyValue } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function BusinessCardDesigner() {
  const [name, setName] = useState('Jane Smith');
  const [title, setTitle] = useState('Marketing Director');
  const [company, setCompany] = useState('Acme Corp');
  const [phone, setPhone] = useState('+44 7700 123456');
  const [email, setEmail] = useState('jane@acme.com');
  const [website, setWebsite] = useState('www.acme.com');

  const handleCopy = () => {
    const text = `${name}\n${title}\n${company}\n${phone}\n${email}\n${website}`;
    navigator.clipboard.writeText(text).catch(() => {});
  };

  const handleDownloadJPG = () => {
    downloadAsJPG({
      filename: `business-card-${name.replace(/\s+/g, '-').toLowerCase()}.jpg`,
      width: 800,
      height: 480,
      title: 'Business Card',
      subtitle: name,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        const cardW = 400;
        const cardH = 250;
        const cardX = area.x + (area.width - cardW) / 2;
        const cardY = area.y + (area.height - cardH) / 2;

        ctx.fillStyle = '#2563eb';
        ctx.fillRect(cardX, cardY, cardW, cardH);

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 20px sans-serif';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(name, cardX + 24, cardY + 16);

        ctx.font = '12px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.fillText(title, cardX + 24, cardY + 42);

        ctx.font = '11px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.75)';
        ctx.fillText(company, cardX + 24, cardY + 62);

        ctx.font = '11px sans-serif';
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        let contactY = cardY + cardH - 65;
        ctx.fillText(phone, cardX + 24, contactY);
        ctx.fillText(email, cardX + 24, contactY + 16);
        ctx.fillText(website, cardX + 24, contactY + 32);
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Job Title
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
            Company
          </label>
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Website
          </label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          />
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Business Card Preview
        </h3>

        <div className="flex justify-center">
          <div className="w-full md:w-96 h-56 bg-accent rounded-[var(--radius-card)] text-white flex flex-col justify-between shadow-lg" style={{ aspectRatio: '85.6 / 53.98' }}>
            <div>
              <p className="text-2xl font-bold">{name}</p>
              <p className="text-sm opacity-90 mt-1">{title}</p>
              <p className="text-sm opacity-75 mt-4">{company}</p>
            </div>
            <div className="text-xs opacity-85 space-y-1">
              <p>{phone}</p>
              <p>{email}</p>
              <p>{website}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] font-medium hover:bg-blue-700"
          >
            Copy Details
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
