'use client';

import { useState, useMemo } from 'react';

const BABY_NAMES = [
  // English
  { name: 'Emma', origin: 'English', gender: 'girl', meaning: 'Whole, universal' },
  { name: 'Oliver', origin: 'English', gender: 'boy', meaning: 'Olive tree' },
  { name: 'Ava', origin: 'English', gender: 'girl', meaning: 'Life, bird' },
  { name: 'James', origin: 'English', gender: 'boy', meaning: 'Supplanter' },
  { name: 'Sophia', origin: 'English', gender: 'girl', meaning: 'Wisdom' },
  { name: 'Benjamin', origin: 'English', gender: 'boy', meaning: 'Son of the right hand' },
  { name: 'Isabella', origin: 'English', gender: 'girl', meaning: 'Devoted to God' },
  { name: 'Lucas', origin: 'English', gender: 'boy', meaning: 'From Lucania' },
  { name: 'Mia', origin: 'English', gender: 'girl', meaning: 'Mine, beloved' },
  { name: 'Ethan', origin: 'English', gender: 'boy', meaning: 'Strong, firm' },
  // Irish
  { name: 'Liam', origin: 'Irish', gender: 'boy', meaning: 'Strong-willed warrior' },
  { name: 'Siobhan', origin: 'Irish', gender: 'girl', meaning: 'God is gracious' },
  { name: 'Aiden', origin: 'Irish', gender: 'boy', meaning: 'Little fire' },
  { name: 'Fiona', origin: 'Irish', gender: 'girl', meaning: 'Fair, white' },
  { name: 'Ronan', origin: 'Irish', gender: 'boy', meaning: 'Little seal' },
  { name: 'Saoirse', origin: 'Irish', gender: 'girl', meaning: 'Freedom' },
  // Scottish
  { name: 'Hamish', origin: 'Scottish', gender: 'boy', meaning: 'Supplanter' },
  { name: 'Isla', origin: 'Scottish', gender: 'girl', meaning: 'Island' },
  { name: 'Calum', origin: 'Scottish', gender: 'boy', meaning: 'Dove' },
  { name: 'Kirstie', origin: 'Scottish', gender: 'girl', meaning: 'Follower of Christ' },
  // Welsh
  { name: 'Wyn', origin: 'Welsh', gender: 'boy', meaning: 'Fair, blessed' },
  { name: 'Gwyneth', origin: 'Welsh', gender: 'girl', meaning: 'Blessed, fair' },
  { name: 'Dylan', origin: 'Welsh', gender: 'boy', meaning: 'Son of the sea' },
  { name: 'Carys', origin: 'Welsh', gender: 'girl', meaning: 'Love, care' },
  // French
  { name: 'Gabriel', origin: 'French', gender: 'boy', meaning: 'God is my strength' },
  { name: 'Sophie', origin: 'French', gender: 'girl', meaning: 'Wisdom' },
  { name: 'Luc', origin: 'French', gender: 'boy', meaning: 'From Lucania' },
  { name: 'Amelie', origin: 'French', gender: 'girl', meaning: 'Hardworking' },
  // Italian
  { name: 'Marco', origin: 'Italian', gender: 'boy', meaning: 'Dedicated to Mars' },
  { name: 'Giulia', origin: 'Italian', gender: 'girl', meaning: 'Youthful' },
  { name: 'Leonardo', origin: 'Italian', gender: 'boy', meaning: 'Brave lion' },
  { name: 'Lucia', origin: 'Italian', gender: 'girl', meaning: 'Light' },
  // Arabic
  { name: 'Amir', origin: 'Arabic', gender: 'boy', meaning: 'Prince, commander' },
  { name: 'Layla', origin: 'Arabic', gender: 'girl', meaning: 'Night' },
  { name: 'Karim', origin: 'Arabic', gender: 'boy', meaning: 'Generous, noble' },
  { name: 'Zainab', origin: 'Arabic', gender: 'girl', meaning: 'Flowering plant' },
  // Indian
  { name: 'Arjun', origin: 'Indian', gender: 'boy', meaning: 'Bright, shining' },
  { name: 'Priya', origin: 'Indian', gender: 'girl', meaning: 'Beloved' },
  { name: 'Rohan', origin: 'Indian', gender: 'boy', meaning: 'Ascending' },
  { name: 'Ananya', origin: 'Indian', gender: 'girl', meaning: 'Unique, incomparable' },
  // Japanese
  { name: 'Hiroshi', origin: 'Japanese', gender: 'boy', meaning: 'Generous' },
  { name: 'Sakura', origin: 'Japanese', gender: 'girl', meaning: 'Cherry blossom' },
  { name: 'Kenji', origin: 'Japanese', gender: 'boy', meaning: 'Intelligent second son' },
  { name: 'Yuki', origin: 'Japanese', gender: 'girl', meaning: 'Snow' },
  // Spanish
  { name: 'Carlos', origin: 'Spanish', gender: 'boy', meaning: 'Free man' },
  { name: 'Lucia', origin: 'Spanish', gender: 'girl', meaning: 'Light' },
  { name: 'Diego', origin: 'Spanish', gender: 'boy', meaning: 'Supplanter' },
  { name: 'Rosa', origin: 'Spanish', gender: 'girl', meaning: 'Rose' },
];

export default function BabyNameExplorer() {
  const [originFilter, setOriginFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [startsWith, setStartsWith] = useState('');
  const [minLength, setMinLength] = useState('');
  const [maxLength, setMaxLength] = useState('');
  const [meaningKeyword, setMeaningKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const origins = [...new Set(BABY_NAMES.map(n => n.origin))].sort();

  const filtered = useMemo(() => {
    return BABY_NAMES.filter(name => {
      if (originFilter && name.origin !== originFilter) return false;
      if (genderFilter && name.gender !== genderFilter) return false;
      if (startsWith && !name.name.toLowerCase().startsWith(startsWith.toLowerCase())) return false;
      if (minLength && name.name.length < parseInt(minLength)) return false;
      if (maxLength && name.name.length > parseInt(maxLength)) return false;
      if (meaningKeyword && !name.meaning.toLowerCase().includes(meaningKeyword.toLowerCase())) return false;
      return true;
    });
  }, [originFilter, genderFilter, startsWith, minLength, maxLength, meaningKeyword]);

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedResults = filtered.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="w-full space-y-6">
      {/* Filters */}
      <div className="rounded-[var(--radius-card)] bg-surface border border-border p-4">
        <p className="text-text-secondary text-sm font-medium mb-4">
          Filters
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Origin */}
          <div>
            <label className="text-text-secondary text-[11px] font-medium uppercase">
              Origin
            </label>
            <select
              value={originFilter}
              onChange={(e) => {
                setOriginFilter(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">All Origins</option>
              {origins.map(origin => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="text-text-secondary text-[11px] font-medium uppercase">
              Gender
            </label>
            <select
              value={genderFilter}
              onChange={(e) => {
                setGenderFilter(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-2 py-1.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="">All Genders</option>
              <option value="boy">Boy</option>
              <option value="girl">Girl</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Starts With */}
          <div>
            <label className="text-text-secondary text-[11px] font-medium uppercase">
              Starts With
            </label>
            <input
              type="text"
              value={startsWith}
              onChange={(e) => {
                setStartsWith(e.target.value);
                setCurrentPage(0);
              }}
              placeholder="Letter"
              maxLength="1"
              className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-2 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent uppercase"
            />
          </div>

          {/* Length */}
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-text-secondary text-[11px] font-medium uppercase">
                Min Length
              </label>
              <input
                type="number"
                value={minLength}
                onChange={(e) => {
                  setMinLength(e.target.value);
                  setCurrentPage(0);
                }}
                placeholder="Min"
                min="1"
                max="20"
                className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-2 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex-1">
              <label className="text-text-secondary text-[11px] font-medium uppercase">
                Max Length
              </label>
              <input
                type="number"
                value={maxLength}
                onChange={(e) => {
                  setMaxLength(e.target.value);
                  setCurrentPage(0);
                }}
                placeholder="Max"
                min="1"
                max="20"
                className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-2 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          {/* Meaning */}
          <div className="sm:col-span-2">
            <label className="text-text-secondary text-[11px] font-medium uppercase">
              Meaning Keyword
            </label>
            <input
              type="text"
              value={meaningKeyword}
              onChange={(e) => {
                setMeaningKeyword(e.target.value);
                setCurrentPage(0);
              }}
              placeholder="Search meanings..."
              className="w-full mt-1 rounded-[var(--radius-input)] border border-border bg-white px-2 py-1.5 text-sm text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-text-secondary text-sm">
        Found {filtered.length} name{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Names Grid */}
      {paginatedResults.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedResults.map(name => (
            <div
              key={name.name}
              className="rounded-[var(--radius-card)] bg-surface border border-border p-3"
            >
              <p className="text-text-primary font-medium text-lg">{name.name}</p>
              <p className="text-text-secondary text-[11px] font-medium uppercase mt-1">
                {name.origin} - {name.gender}
              </p>
              <p className="text-text-secondary text-sm mt-2">
                {name.meaning}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-[var(--radius-card)] bg-surface border border-border p-6 text-center">
          <p className="text-text-secondary">No names match your filters. Try adjusting your search.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex gap-2 justify-center">
          <button
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`rounded-[var(--radius-card)] px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === i
                    ? 'bg-accent text-white'
                    : 'border border-border bg-white hover:bg-surface'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="rounded-[var(--radius-card)] border border-border bg-white px-3 py-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
