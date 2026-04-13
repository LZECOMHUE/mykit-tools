'use client';

import { useState } from 'react';
import { downloadAsJPG, drawBulletList } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function ContentCalendarGenerator() {
  const [niche, setNiche] = useState('technology');
  const [frequency, setFrequency] = useState('daily');

  const contentIdeas = {
    technology: {
      daily: [
        { type: 'Blog', topic: 'Latest AI trends' },
        { type: 'Social', topic: 'Tech news roundup' },
        { type: 'Video', topic: 'Product review' },
        { type: 'Email', topic: 'Newsletter' },
      ],
      weekly: [
        { type: 'Blog', topic: 'In-depth tutorial' },
        { type: 'Podcast', topic: 'Industry interview' },
        { type: 'Webinar', topic: 'How-to session' },
      ],
    },
    fitness: {
      daily: [
        { type: 'Video', topic: 'Workout routine' },
        { type: 'Social', topic: 'Fitness tips' },
        { type: 'Blog', topic: 'Nutrition guide' },
        { type: 'Email', topic: 'Weekly meal plan' },
      ],
      weekly: [
        { type: 'Blog', topic: 'Recovery techniques' },
        { type: 'Podcast', topic: 'Fitness expert interview' },
      ],
    },
    business: {
      daily: [
        { type: 'Social', topic: 'Industry news' },
        { type: 'Blog', topic: 'Business tips' },
        { type: 'Email', topic: 'Market insights' },
      ],
      weekly: [
        { type: 'Blog', topic: 'Case study' },
        { type: 'Webinar', topic: 'Strategy session' },
        { type: 'Podcast', topic: 'Business leader interview' },
      ],
    },
  };

  const niches = Object.keys(contentIdeas);
  const ideas = contentIdeas[niche][frequency];

  const handleDownloadJPG = () => {
    const ideaLines = ideas.map(
      (idea) => `[${idea.type}] ${idea.topic}`
    );

    downloadAsJPG({
      filename: `content-calendar-${niche}-${frequency}.jpg`,
      width: 700,
      height: 900,
      title: 'Content Calendar',
      subtitle: `${niche.charAt(0).toUpperCase() + niche.slice(1)} - ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}`,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Content Ideas', area.x, y);
        y += 20;

        ideaLines.forEach((line) => {
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(area.x + 6, y + 5, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#1a1a1a';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(line, area.x + 16, y);
          y += 18;
        });

        y += 16;
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 16;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText('Content Pillar Strategy', area.x, y);
        y += 20;

        const pillars = [
          'Tier 1 - Core Topics - Main themes your audience cares about',
          'Tier 2 - Related Content - Supporting topics that add context',
          'Tier 3 - Engagement - Mix-in entertaining or lighter content'
        ];

        pillars.forEach((pillar) => {
          ctx.fillStyle = '#2563eb';
          ctx.fillRect(area.x, y - 2, 3, 3);

          ctx.fillStyle = '#1a1a1a';
          ctx.font = '10px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(pillar, area.x + 8, y);
          y += 16;
        });
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Niche / Industry
          </label>
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            {niches.map((n) => (
              <option key={n} value={n}>
                {n.charAt(0).toUpperCase() + n.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Update Frequency
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Content Ideas
        </h3>

        <div className="space-y-3">
          {ideas.map((idea, idx) => (
            <div key={idx} className="border border-border rounded-[var(--radius-input)] p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-text-primary">{idea.topic}</h4>
                <span className="px-2 py-1 bg-blue-100 text-accent text-sm font-medium rounded-[var(--radius-input)]">
                  {idea.type}
                </span>
              </div>
              <p className="text-sm text-text-secondary">
                {idea.type === 'Blog' && 'Create an article or long-form content piece'}
                {idea.type === 'Social' && 'Share on social media platforms'}
                {idea.type === 'Video' && 'Create video content for YouTube or Instagram'}
                {idea.type === 'Email' && 'Send to your mailing list'}
                {idea.type === 'Podcast' && 'Record an audio episode'}
                {idea.type === 'Webinar' && 'Host a live online session'}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4">
        <h3 className="font-heading text-lg font-bold text-text-primary mb-4">
          Content Pillar Strategy
        </h3>

        <div className="space-y-3">
          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">Tier 1: Core Topics</p>
            <p className="text-sm text-text-secondary">Main themes your audience cares about</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">Tier 2: Related Content</p>
            <p className="text-sm text-text-secondary">Supporting topics that add context</p>
          </div>

          <div className="bg-surface rounded-[var(--radius-input)] p-3">
            <p className="text-sm font-medium text-text-primary mb-1">Tier 3: Engagement</p>
            <p className="text-sm text-text-secondary">Mix-in entertaining or lighter content</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleDownloadJPG}
          variant="primary"
          className="flex-1"
        >
          Download JPG
        </Button>
      </div>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        Customize these ideas based on your audience and brand voice.
      </p>
    </div>
  );
}
