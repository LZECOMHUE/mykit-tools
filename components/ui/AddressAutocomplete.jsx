'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

export default function AddressAutocomplete({
  value = '',
  onChange,
  onSelect,
  placeholder = 'Start typing an address or postcode...',
  label,
  disabled = false,
  countryCode = 'gb',
  className = '',
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const debounceRef = useRef(null);
  const wrapperRef = useRef(null);
  const inputId = label ? label.toLowerCase().replace(/\s+/g, '-') : 'address-input';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(async (query) => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const countryParam = countryCode ? `&countrycodes=${countryCode}` : '';
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}${countryParam}&format=json&addressdetails=1&limit=5`,
        {
          headers: { 'User-Agent': 'MyKit.tools/1.0' },
        }
      );

      if (!response.ok) throw new Error('Search failed');

      const data = await response.json();
      setSuggestions(
        data.map((item) => ({
          displayName: item.display_name,
          lat: parseFloat(item.lat),
          lon: parseFloat(item.lon),
          type: item.type,
          address: item.address,
          shortName: buildShortName(item),
        }))
      );
      setShowDropdown(true);
      setHighlightIndex(-1);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [countryCode]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    onChange(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 350);
  };

  const handleSelect = (suggestion) => {
    onChange(suggestion.shortName);
    setShowDropdown(false);
    setSuggestions([]);
    if (onSelect) {
      onSelect({
        displayName: suggestion.displayName,
        shortName: suggestion.shortName,
        lat: suggestion.lat,
        lon: suggestion.lon,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown || suggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && highlightIndex >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlightIndex]);
    } else if (e.key === 'Escape') {
      setShowDropdown(false);
    }
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text-primary mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className="w-full px-3 py-2 rounded-[var(--radius-input)] border border-border bg-white text-sm text-text-primary transition-colors duration-150 min-h-[38px] outline-none focus:border-accent focus:ring-2 focus:ring-accent/10"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-border border-t-accent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute z-50 w-full mt-1 bg-white border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={`${suggestion.lat}-${suggestion.lon}`}
              onClick={() => handleSelect(suggestion)}
              onMouseEnter={() => setHighlightIndex(index)}
              className={`px-3 py-2.5 cursor-pointer text-sm transition-colors ${
                index === highlightIndex
                  ? 'bg-accent/5 text-accent'
                  : 'text-text-primary hover:bg-surface'
              }`}
            >
              <p className="font-medium truncate">{suggestion.shortName}</p>
              <p className="text-xs text-text-muted truncate mt-0.5">
                {suggestion.displayName}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function buildShortName(item) {
  const addr = item.address || {};
  const parts = [];

  if (addr.road) {
    if (addr.house_number) {
      parts.push(`${addr.house_number} ${addr.road}`);
    } else {
      parts.push(addr.road);
    }
  }

  if (addr.city || addr.town || addr.village || addr.hamlet) {
    parts.push(addr.city || addr.town || addr.village || addr.hamlet);
  }

  if (addr.postcode) {
    parts.push(addr.postcode);
  }

  if (parts.length === 0) {
    // Fallback: use first meaningful part of display_name
    return item.display_name.split(',').slice(0, 3).join(', ');
  }

  return parts.join(', ');
}
