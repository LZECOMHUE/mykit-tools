'use client';

import { tools } from '@/lib/tool-registry';

export default function ToolCounter({ className = '' }) {
  const count = tools.length;

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 bg-accent/5 border border-accent/20 rounded-full ${className}`}>
      <span className="font-mono-num text-lg font-bold text-accent">{count}</span>
      <span className="text-sm text-text-secondary">free tools and counting</span>
    </div>
  );
}
