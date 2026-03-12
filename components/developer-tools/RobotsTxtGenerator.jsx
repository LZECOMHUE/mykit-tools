'use client';

import { useState } from 'react';

const PRESETS = {
  allow_all: {
    name: 'Allow All Bots',
    description: 'Standard SEO-friendly configuration',
    rules: [{ userAgent: '*', directives: [{ type: 'Allow', path: '/' }] }],
    sitemapUrl: '',
  },
  block_all: {
    name: 'Block All Bots',
    description: 'Disallow all web crawlers',
    rules: [{ userAgent: '*', directives: [{ type: 'Disallow', path: '/' }] }],
    sitemapUrl: '',
  },
  block_ai: {
    name: 'Block AI Crawlers',
    description: 'Block GPTBot, Claudebot, and other AI training crawlers',
    rules: [
      { userAgent: 'GPTBot', directives: [{ type: 'Disallow', path: '/' }] },
      { userAgent: 'CCBot', directives: [{ type: 'Disallow', path: '/' }] },
      { userAgent: 'anthropic-ai', directives: [{ type: 'Disallow', path: '/' }] },
      { userAgent: '*', directives: [{ type: 'Allow', path: '/' }] },
    ],
    sitemapUrl: '',
  },
  standard: {
    name: 'Standard Config',
    description: 'Block private/admin areas, allow public content',
    rules: [
      { userAgent: '*', directives: [
        { type: 'Disallow', path: '/admin/' },
        { type: 'Disallow', path: '/private/' },
        { type: 'Disallow', path: '/api/' },
        { type: 'Allow', path: '/' },
      ]},
    ],
    sitemapUrl: '',
  },
};

export default function RobotsTxtGenerator() {
  const [rules, setRules] = useState([
    { id: 1, userAgent: '*', directives: [{ id: 1, type: 'Allow', path: '/' }] },
  ]);
  const [sitemapUrl, setSitemapUrl] = useState('https://example.com/sitemap.xml');
  const [nextId, setNextId] = useState(2);
  const [copied, setCopied] = useState(false);

  const addRule = () => {
    setRules([
      ...rules,
      { id: nextId, userAgent: '*', directives: [{ id: nextId, type: 'Allow', path: '/' }] },
    ]);
    setNextId(nextId + 1);
  };

  const deleteRule = (ruleId) => {
    setRules(rules.filter(r => r.id !== ruleId));
  };

  const updateRule = (ruleId, field, value) => {
    setRules(rules.map(r => (r.id === ruleId ? { ...r, [field]: value } : r)));
  };

  const addDirective = (ruleId) => {
    setRules(
      rules.map(r => {
        if (r.id === ruleId) {
          return {
            ...r,
            directives: [
              ...r.directives,
              { id: nextId, type: 'Disallow', path: '/' },
            ],
          };
        }
        return r;
      })
    );
    setNextId(nextId + 1);
  };

  const deleteDirective = (ruleId, directiveId) => {
    setRules(
      rules.map(r => {
        if (r.id === ruleId) {
          return {
            ...r,
            directives: r.directives.filter(d => d.id !== directiveId),
          };
        }
        return r;
      })
    );
  };

  const updateDirective = (ruleId, directiveId, field, value) => {
    setRules(
      rules.map(r => {
        if (r.id === ruleId) {
          return {
            ...r,
            directives: r.directives.map(d =>
              d.id === directiveId ? { ...d, [field]: value } : d
            ),
          };
        }
        return r;
      })
    );
  };

  const applyPreset = (presetKey) => {
    const preset = PRESETS[presetKey];
    setRules(preset.rules.map((r, idx) => ({
      ...r,
      id: idx + 1,
      directives: r.directives.map((d, didx) => ({ ...d, id: didx + 1 })),
    })));
    setSitemapUrl(preset.sitemapUrl);
    setNextId(10);
  };

  const generateRobotsTxt = () => {
    let content = '';

    rules.forEach(rule => {
      content += `User-agent: ${rule.userAgent}\n`;
      rule.directives.forEach(directive => {
        content += `${directive.type}: ${directive.path}\n`;
      });
      content += '\n';
    });

    if (sitemapUrl) {
      content += `Sitemap: ${sitemapUrl}`;
    }

    return content.trim();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateRobotsTxt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Presets */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <h3 className="text-sm font-semibold text-text-secondary mb-3">Quick Presets</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="px-3 py-2 text-xs bg-white border border-border rounded-[var(--radius-input)] text-text-primary hover:border-accent hover:bg-accent hover:text-white transition-colors"
              title={preset.description}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Rules Builder */}
      <div className="space-y-4">
        {rules.map(rule => (
          <div
            key={rule.id}
            className="p-6 rounded-[var(--radius-card)] bg-surface border border-border"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-text-primary mb-1">
                  User-Agent
                </label>
                <input
                  type="text"
                  value={rule.userAgent}
                  onChange={e => updateRule(rule.id, 'userAgent', e.target.value)}
                  placeholder="e.g., Googlebot, *"
                  className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              {rules.length > 1 && (
                <button
                  onClick={() => deleteRule(rule.id)}
                  className="ml-4 px-3 py-2 text-red-600 hover:bg-red-50 rounded-[var(--radius-input)] text-sm"
                >
                  Remove
                </button>
              )}
            </div>

            {/* Directives */}
            <div className="space-y-2 mb-4">
              {rule.directives.map(directive => (
                <div key={directive.id} className="flex gap-2">
                  <select
                    value={directive.type}
                    onChange={e =>
                      updateDirective(rule.id, directive.id, 'type', e.target.value)
                    }
                    className="px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  >
                    <option>Allow</option>
                    <option>Disallow</option>
                  </select>
                  <input
                    type="text"
                    value={directive.path}
                    onChange={e =>
                      updateDirective(rule.id, directive.id, 'path', e.target.value)
                    }
                    placeholder="/path/"
                    className="flex-1 px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                  />
                  <button
                    onClick={() => deleteDirective(rule.id, directive.id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-[var(--radius-input)] text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => addDirective(rule.id)}
              className="px-3 py-1 text-sm text-accent border border-accent rounded-[var(--radius-input)] hover:bg-accent hover:text-white transition-colors"
            >
              + Add Directive
            </button>
          </div>
        ))}
      </div>

      {/* Add Rule Button */}
      <button
        onClick={addRule}
        className="w-full px-4 py-3 border-2 border-dashed border-border rounded-[var(--radius-card)] text-text-secondary hover:border-accent hover:text-accent transition-colors font-medium"
      >
        + Add User-Agent Rule
      </button>

      {/* Sitemap URL */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <label className="block text-sm font-medium text-text-primary mb-2">
          Sitemap URL (optional)
        </label>
        <input
          type="text"
          value={sitemapUrl}
          onChange={e => setSitemapUrl(e.target.value)}
          placeholder="https://example.com/sitemap.xml"
          className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      {/* Output */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">robots.txt</h3>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] text-sm font-medium hover:bg-opacity-90"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>

        <pre className="bg-white border border-border rounded-[var(--radius-input)] p-4 overflow-x-auto text-sm font-mono text-text-primary whitespace-pre-wrap break-words">
          {generateRobotsTxt()}
        </pre>
      </div>
    </div>
  );
}
