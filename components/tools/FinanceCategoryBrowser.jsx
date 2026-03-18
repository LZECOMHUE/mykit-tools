'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

/* -- Country detection from timezone -- */

const TIMEZONE_TO_COUNTRY = {
  'America/New_York': 'us', 'America/Chicago': 'us', 'America/Denver': 'us',
  'America/Los_Angeles': 'us', 'America/Phoenix': 'us', 'America/Anchorage': 'us',
  'Pacific/Honolulu': 'us', 'America/Detroit': 'us', 'America/Indiana/Indianapolis': 'us',
  'America/Boise': 'us', 'America/Juneau': 'us', 'America/Adak': 'us',
  'America/Toronto': 'ca', 'America/Vancouver': 'ca', 'America/Edmonton': 'ca',
  'America/Winnipeg': 'ca', 'America/Halifax': 'ca', 'America/St_Johns': 'ca',
  'America/Regina': 'ca', 'America/Montreal': 'ca',
  'Australia/Sydney': 'au', 'Australia/Melbourne': 'au', 'Australia/Brisbane': 'au',
  'Australia/Perth': 'au', 'Australia/Adelaide': 'au', 'Australia/Hobart': 'au',
  'Australia/Darwin': 'au', 'Australia/Lord_Howe': 'au',
  'Asia/Kolkata': 'in', 'Asia/Calcutta': 'in',
  'Europe/London': 'uk', 'Europe/Belfast': 'uk',
  'Asia/Dubai': 'ae', 'Asia/Muscat': 'ae',
  'Europe/Dublin': 'ie',
  'Pacific/Auckland': 'nz', 'Pacific/Chatham': 'nz',
  'Asia/Singapore': 'sg',
  'Africa/Johannesburg': 'za',
};

function detectCountry() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return TIMEZONE_TO_COUNTRY[tz] || 'uk';
  } catch {
    return 'uk';
  }
}

/* -- Country definitions -- */

const COUNTRIES = [
  { code: 'uk', label: 'UK', flag: '\u{1F1EC}\u{1F1E7}', prefix: '' },
  { code: 'us', label: 'US', flag: '\u{1F1FA}\u{1F1F8}', prefix: 'us-' },
  { code: 'ca', label: 'Canada', flag: '\u{1F1E8}\u{1F1E6}', prefix: 'canada-' },
  { code: 'au', label: 'Australia', flag: '\u{1F1E6}\u{1F1FA}', prefix: 'australia-' },
  { code: 'in', label: 'India', flag: '\u{1F1EE}\u{1F1F3}', prefix: 'india-' },
];

const COUNTRY_PREFIXES = {
  'us-': 'us',
  'canada-': 'ca',
  'australia-': 'au',
  'india-': 'in',
  'uae-': 'ae',
  'ireland-': 'ie',
  'nz-': 'nz',
  'singapore-': 'sg',
  'sa-': 'za',
};

/* -- Classify a tool by country -- */

function getToolCountry(tool) {
  for (const [prefix, country] of Object.entries(COUNTRY_PREFIXES)) {
    if (tool.slug.startsWith(prefix)) return country;
  }

  // UK-specific tools (no prefix but UK-specific content)
  const ukSlugs = [
    'uk-tax-calculator', 'vat-calculator', 'stamp-duty-calculator',
    'student-loan-calculator', 'pension-calculator', 'council-tax-calculator',
    'national-insurance-calculator', 'inheritance-tax-calculator',
    'uk-dividend-tax-calculator', 'salary-sacrifice-calculator',
    'buy-to-let-calculator', 'isa-calculator', 'help-to-buy-calculator',
    'uk-crypto-tax-calculator', 'uk-self-assessment-calculator',
    'uk-landlord-tax-calculator', 'uk-mileage-calculator',
    'uk-childcare-cost-calculator', 'uk-benefits-calculator',
    'uk-property-stamp-duty', 'uk-wage-calculator',
    'child-benefit-calculator', 'pay-rise-calculator',
    'uk-pension-calculator', 'uk-state-pension-calculator',
  ];
  if (ukSlugs.includes(tool.slug)) return 'uk';

  // Check tags for country hints
  const countryTags = { uk: 'uk', us: 'us', canada: 'ca', australia: 'au', india: 'in' };
  for (const [tag, country] of Object.entries(countryTags)) {
    if (tool.tags && tool.tags.includes(tag)) return country;
  }

  return 'universal';
}

/* -- Tool Card Components -- */

function ToolGridCard({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group block bg-white border border-border rounded-[var(--radius-card)] p-5 max-sm:p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-border-hover"
    >
      <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors mb-1.5">
        {tool.name}
      </h3>
      <p className="text-xs text-text-secondary line-clamp-2">
        {tool.description}
      </p>
    </Link>
  );
}

function ToolListItem({ tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex items-center gap-4 bg-white border border-border rounded-lg px-4 py-3 transition-all duration-200 hover:border-accent/30 hover:shadow-sm"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-sm font-bold text-text-primary group-hover:text-accent transition-colors truncate">
          {tool.name}
        </h3>
        <p className="text-xs text-text-secondary truncate mt-0.5">
          {tool.description}
        </p>
      </div>
      <span className="shrink-0 text-xs text-text-muted">&rarr;</span>
    </Link>
  );
}

/* -- Section with collapsible country group -- */

function CountrySection({ title, flag, tools, viewMode, defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (tools.length === 0) return null;

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 mb-4 group w-full text-left"
      >
        {flag && <span className="text-xl">{flag}</span>}
        <h2 className="font-heading text-lg font-bold text-text-primary">
          {title}
        </h2>
        <span className="font-mono text-sm text-text-muted">
          ({tools.length})
        </span>
        <svg
          className={`w-4 h-4 text-text-muted transition-transform ml-1 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map((tool) => (
              <ToolGridCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {tools.map((tool) => (
              <ToolListItem key={tool.slug} tool={tool} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

/* -- Main Component -- */

export default function FinanceCategoryBrowser({ allTools }) {
  const [activeCountry, setActiveCountry] = useState('all');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [detectedCountry, setDetectedCountry] = useState(null);

  // Detect country on mount
  useEffect(() => {
    const country = detectCountry();
    setDetectedCountry(country);
    setActiveCountry(country);
  }, []);

  // Classify all tools by country
  const toolsByCountry = useMemo(() => {
    const groups = { uk: [], us: [], ca: [], au: [], in: [], universal: [], other: [] };

    for (const tool of allTools) {
      const country = getToolCountry(tool);
      if (groups[country]) {
        groups[country].push(tool);
      } else {
        groups.other.push(tool);
      }
    }

    // Sort each group: tier 1 first, then alphabetical
    for (const group of Object.values(groups)) {
      group.sort((a, b) => {
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.name.localeCompare(b.name);
      });
    }

    return groups;
  }, [allTools]);

  // Filter by search
  const filterBySearch = (tools) => {
    if (!search.trim()) return tools;
    const q = search.toLowerCase().trim();
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.tags && t.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  };

  // Get the country order based on active selection
  const countryOrder = useMemo(() => {
    const active = activeCountry === 'all' ? (detectedCountry || 'uk') : activeCountry;
    const base = ['uk', 'us', 'ca', 'au', 'in'];
    // Move active country to front
    const reordered = [active, ...base.filter((c) => c !== active)];
    return reordered;
  }, [activeCountry, detectedCountry]);

  const countryMeta = {
    uk: { label: 'UK', flag: '\u{1F1EC}\u{1F1E7}' },
    us: { label: 'United States', flag: '\u{1F1FA}\u{1F1F8}' },
    ca: { label: 'Canada', flag: '\u{1F1E8}\u{1F1E6}' },
    au: { label: 'Australia', flag: '\u{1F1E6}\u{1F1FA}' },
    in: { label: 'India', flag: '\u{1F1EE}\u{1F1F3}' },
  };

  // When a specific country tab is active, show only that country + universal
  const showAllCountries = activeCountry === 'all';

  return (
    <div>
      {/* -- Country Tabs -- */}
      <div className="flex flex-wrap gap-2 mb-5">
        <button
          onClick={() => setActiveCountry('all')}
          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
            activeCountry === 'all'
              ? 'bg-accent text-white border-accent'
              : 'bg-white text-text-secondary border-border hover:border-accent/40 hover:text-accent'
          }`}
        >
          All Countries
        </button>
        {COUNTRIES.map((c) => (
          <button
            key={c.code}
            onClick={() => setActiveCountry(c.code)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all flex items-center gap-1.5 ${
              activeCountry === c.code
                ? 'bg-accent text-white border-accent'
                : 'bg-white text-text-secondary border-border hover:border-accent/40 hover:text-accent'
            }`}
          >
            <span>{c.flag}</span>
            {c.label}
            <span className={`font-mono text-xs ${activeCountry === c.code ? 'text-white/70' : 'text-text-muted'}`}>
              {toolsByCountry[c.code]?.length || 0}
            </span>
          </button>
        ))}
      </div>

      {/* -- Search + View Toggle -- */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search finance tools..."
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-border rounded-lg outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all"
          />
        </div>

        <div className="hidden sm:flex border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-2.5 text-sm transition-colors ${
              viewMode === 'grid'
                ? 'bg-accent text-white'
                : 'bg-white text-text-secondary hover:bg-surface'
            }`}
            aria-label="Grid view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="6" height="6" rx="1" />
              <rect x="9" y="1" width="6" height="6" rx="1" />
              <rect x="1" y="9" width="6" height="6" rx="1" />
              <rect x="9" y="9" width="6" height="6" rx="1" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-2.5 text-sm transition-colors ${
              viewMode === 'list'
                ? 'bg-accent text-white'
                : 'bg-white text-text-secondary hover:bg-surface'
            }`}
            aria-label="List view"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <rect x="1" y="1" width="14" height="3" rx="1" />
              <rect x="1" y="6.5" width="14" height="3" rx="1" />
              <rect x="1" y="12" width="14" height="3" rx="1" />
            </svg>
          </button>
        </div>
      </div>

      {/* -- Tool Sections -- */}
      {showAllCountries ? (
        <>
          {/* Show detected/first country, then universal, then other countries */}
          {countryOrder.map((code, idx) => {
            const filtered = filterBySearch(toolsByCountry[code] || []);
            const meta = countryMeta[code];
            if (!meta || filtered.length === 0) return null;
            return (
              <CountrySection
                key={code}
                title={meta.label}
                flag={meta.flag}
                tools={filtered}
                viewMode={viewMode}
                defaultOpen={idx === 0}
              />
            );
          })}

          {/* Universal tools */}
          <CountrySection
            title="Works Everywhere"
            flag={'\u{1F30D}'}
            tools={filterBySearch([...toolsByCountry.universal, ...toolsByCountry.other])}
            viewMode={viewMode}
            defaultOpen={true}
          />
        </>
      ) : (
        <>
          {/* Selected country tools */}
          {(() => {
            const filtered = filterBySearch(toolsByCountry[activeCountry] || []);
            const meta = countryMeta[activeCountry];
            if (!meta) return null;
            return (
              <CountrySection
                title={meta.label}
                flag={meta.flag}
                tools={filtered}
                viewMode={viewMode}
                defaultOpen={true}
              />
            );
          })()}

          {/* Universal tools */}
          <CountrySection
            title="Works Everywhere"
            flag={'\u{1F30D}'}
            tools={filterBySearch([...toolsByCountry.universal, ...toolsByCountry.other])}
            viewMode={viewMode}
            defaultOpen={true}
          />
        </>
      )}

      {/* -- Empty State -- */}
      {search.trim() && filterBySearch(allTools).length === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-8 text-center">
          <p className="text-text-secondary mb-2">No tools match your search.</p>
          <button
            onClick={() => setSearch('')}
            className="text-sm text-accent font-medium hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}
