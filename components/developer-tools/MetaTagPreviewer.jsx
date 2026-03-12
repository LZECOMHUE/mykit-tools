'use client';

import { useState } from 'react';

export default function MetaTagPreviewer() {
  const [pageTitle, setPageTitle] = useState('Amazing Online Tools | MyKit.tools');
  const [metaDescription, setMetaDescription] = useState('Free online tools for everything. Calculators, converters, generators, and more.');
  const [url, setUrl] = useState('https://mykit.tools/example-tool');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('google');
  const [copied, setCopied] = useState(false);

  const getTruncatedTitle = () => {
    return pageTitle.length > 60 ? pageTitle.substring(0, 57) + '...' : pageTitle;
  };

  const getTruncatedDescription = () => {
    return metaDescription.length > 160
      ? metaDescription.substring(0, 157) + '...'
      : metaDescription;
  };

  const getDomain = () => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'example.com';
    }
  };

  const generateMetaTags = () => {
    return `<title>${pageTitle}</title>
<meta name="description" content="${metaDescription}">
<meta property="og:title" content="${pageTitle}">
<meta property="og:description" content="${metaDescription}">
<meta property="og:url" content="${url}">
${ogImageUrl ? `<meta property="og:image" content="${ogImageUrl}">` : ''}
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${pageTitle}">
<meta name="twitter:description" content="${metaDescription}">
${ogImageUrl ? `<meta name="twitter:image" content="${ogImageUrl}">` : ''}`;
  };

  const handleCopyMeta = () => {
    navigator.clipboard.writeText(generateMetaTags());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      {/* Input Panel */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Meta Tag Settings</h3>

        <div className="space-y-4">
          {/* Page Title */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={pageTitle}
              onChange={e => setPageTitle(e.target.value)}
              placeholder="Page title..."
              className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-text-muted">
                {pageTitle.length} characters
              </span>
              {pageTitle.length > 60 && (
                <span className="text-xs text-red-600">⚠ Title too long (ideal: 30-60 chars)</span>
              )}
            </div>
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Meta Description
            </label>
            <textarea
              value={metaDescription}
              onChange={e => setMetaDescription(e.target.value)}
              placeholder="Meta description..."
              rows="3"
              className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-text-muted">
                {metaDescription.length} characters
              </span>
              {metaDescription.length > 160 && (
                <span className="text-xs text-red-600">⚠ Description too long (ideal: 120-160 chars)</span>
              )}
            </div>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Page URL
            </label>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* OG Image URL */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">
              Open Graph Image URL (optional)
            </label>
            <input
              type="text"
              value={ogImageUrl}
              onChange={e => setOgImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full px-3 py-2 bg-white border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Preview Tabs */}
      <div className="border-b border-border">
        <div className="flex gap-4">
          {[
            { id: 'google', label: 'Google Search' },
            { id: 'twitter', label: 'Twitter Card' },
            { id: 'facebook', label: 'Facebook/OG' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Panels */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        {activeTab === 'google' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">Google Search Result Preview</h3>
            <div className="bg-white p-4 rounded-[var(--radius-input)] space-y-1">
              <div className="text-[#1a73e8] text-lg font-medium cursor-pointer hover:underline">
                {getTruncatedTitle()}
              </div>
              <div className="text-[#006621] text-sm">
                {getDomain()} › ...
              </div>
              <div className="text-[#545454] text-sm leading-relaxed">
                {getTruncatedDescription()}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'twitter' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">Twitter Card Preview</h3>
            <div className="bg-white border border-border rounded-[var(--radius-input)] overflow-hidden">
              {ogImageUrl && (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-text-muted">
                  [Image Preview: {ogImageUrl}]
                </div>
              )}
              <div className="p-4 space-y-2">
                <div className="font-bold text-text-primary">
                  {pageTitle}
                </div>
                <div className="text-sm text-text-secondary">
                  {metaDescription}
                </div>
                <div className="text-xs text-text-muted">
                  {getDomain()}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'facebook' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-text-secondary mb-4">Facebook/Open Graph Preview</h3>
            <div className="bg-white border border-border rounded-[var(--radius-input)] overflow-hidden">
              {ogImageUrl && (
                <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-text-muted">
                  [Image Preview: {ogImageUrl}]
                </div>
              )}
              <div className="p-4 space-y-1 border-t border-border">
                <div className="text-xs text-text-muted uppercase tracking-wide">
                  {getDomain()}
                </div>
                <div className="font-bold text-text-primary text-lg">
                  {pageTitle}
                </div>
                <div className="text-sm text-text-secondary">
                  {metaDescription}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Generated Meta Tags */}
      <div className="p-6 rounded-[var(--radius-card)] bg-surface border border-border">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Generated Meta Tags</h3>
          <button
            onClick={handleCopyMeta}
            className="px-4 py-2 bg-accent text-white rounded-[var(--radius-input)] text-sm font-medium hover:bg-opacity-90"
          >
            {copied ? '✓ Copied' : 'Copy HTML'}
          </button>
        </div>

        <pre className="bg-white border border-border rounded-[var(--radius-input)] p-4 overflow-x-auto text-sm font-mono text-text-primary">
          {generateMetaTags()}
        </pre>
      </div>
    </div>
  );
}
