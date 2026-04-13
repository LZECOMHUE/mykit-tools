'use client';
import { useState, useMemo } from 'react';
import Select from '@/components/ui/Select';

const COUNTRIES = [
  'Afghanistan',
  'Albania',
  'Australia',
  'Brazil',
  'Canada',
  'China',
  'Egypt',
  'France',
  'Germany',
  'India',
  'Indonesia',
  'Ireland',
  'Italy',
  'Japan',
  'Mexico',
  'New Zealand',
  'Poland',
  'Portugal',
  'Singapore',
  'South Africa',
  'South Korea',
  'Spain',
  'Switzerland',
  'Thailand',
  'Turkey',
  'United Kingdom',
  'United States',
  'Vietnam',
];

const VISA_DATABASE = {
  'United States': {
    Australia: { type: 'visa-free', duration: 90, notes: 'ESTA required for US citizens' },
    Canada: { type: 'visa-free', duration: 180, notes: 'eTA can be helpful' },
    Mexico: { type: 'visa-free', duration: 180, notes: 'Passport required' },
    UK: { type: 'visa-free', duration: 180, notes: 'Brexit: no visa needed for tourism' },
    France: { type: 'visa-free', duration: 90, notes: 'Schengen area' },
    Germany: { type: 'visa-free', duration: 90, notes: 'Schengen area' },
    Spain: { type: 'visa-free', duration: 90, notes: 'Schengen area' },
    Italy: { type: 'visa-free', duration: 90, notes: 'Schengen area' },
    Portugal: { type: 'visa-free', duration: 90, notes: 'Schengen area' },
    Japan: { type: 'visa-free', duration: 90, notes: 'Short-term stay' },
    'South Korea': { type: 'visa-free', duration: 90, notes: 'Tourist visa waiver' },
    Thailand: { type: 'visa-on-arrival', duration: 30, notes: 'Can also apply in advance' },
    Vietnam: { type: 'e-visa', duration: 90, notes: 'Electronic visa online' },
    Turkey: { type: 'e-visa', duration: 90, notes: 'Electronic visa online' },
    India: { type: 'e-visa', duration: 365, notes: 'Apply online, multiple entry' },
    China: { type: 'visa-required', duration: null, notes: 'Apply at embassy, multiple documents needed' },
    Egypt: { type: 'visa-on-arrival', duration: 30, notes: 'Available at airport' },
    Indonesia: { type: 'visa-on-arrival', duration: 30, notes: 'Tourist visa on arrival' },
    'New Zealand': { type: 'visa-free', duration: 90, notes: 'NZeTA recommended' },
    Singapore: { type: 'visa-free', duration: 90, notes: 'ASEAN passport holder' },
    'South Africa': { type: 'visa-free', duration: 90, notes: 'Tourist entry' },
    Poland: { type: 'visa-free', duration: 90, notes: 'Schengen area' },
    Switzerland: { type: 'visa-free', duration: 90, notes: 'Not in Schengen but reciprocal agreement' },
    Albania: { type: 'visa-free', duration: 365, notes: 'Full year stay allowed' },
  },
  UK: {
    'United States': { type: 'visa-required', duration: null, notes: 'ESTA or full visa needed' },
    Australia: { type: 'visa-required', duration: null, notes: 'eVisitor or full visa' },
    Canada: { type: 'e-visa', duration: 180, notes: 'eTA required' },
    Mexico: { type: 'visa-free', duration: 180, notes: 'No visa needed for tourists' },
    France: { type: 'visa-free', duration: null, notes: 'No visa, passport only' },
    Germany: { type: 'visa-free', duration: null, notes: 'No visa needed' },
    Spain: { type: 'visa-free', duration: null, notes: 'No visa needed' },
    Japan: { type: 'visa-free', duration: 90, notes: 'Short-term tourist stay' },
    Thailand: { type: 'visa-free', duration: 30, notes: 'Tourist visa on arrival available' },
    Turkey: { type: 'e-visa', duration: 90, notes: 'Electronic visa online' },
    Italy: { type: 'visa-free', duration: null, notes: 'No visa needed' },
    Portugal: { type: 'visa-free', duration: null, notes: 'No visa needed' },
    India: { type: 'e-visa', duration: 365, notes: 'Apply online, e-Visa scheme' },
    China: { type: 'visa-required', duration: null, notes: 'Apply at embassy or via agent' },
    'New Zealand': { type: 'visa-free', duration: 90, notes: 'NZeTA recommended' },
    Singapore: { type: 'visa-free', duration: 90, notes: 'No visa needed' },
  },
  Australia: {
    'United States': { type: 'visa-required', duration: null, notes: 'Apply at US embassy' },
    UK: { type: 'visa-free', duration: 180, notes: 'No visa needed' },
    Canada: { type: 'visa-required', duration: null, notes: 'eTA or full visa' },
    Japan: { type: 'visa-free', duration: 90, notes: 'Short-term tourist visa waiver' },
    'New Zealand': { type: 'visa-free', duration: 90, notes: 'Pathway Programme countries' },
    Thailand: { type: 'visa-free', duration: 30, notes: 'Tourist visa on arrival available' },
    Singapore: { type: 'visa-free', duration: 90, notes: 'No visa needed' },
  },
  Canada: {
    'United States': { type: 'visa-free', duration: 180, notes: 'Passport or NEXUS card' },
    Australia: { type: 'visa-required', duration: null, notes: 'eVisitor or full visa' },
    Mexico: { type: 'visa-free', duration: 180, notes: 'No visa needed' },
    Japan: { type: 'visa-free', duration: 90, notes: 'Tourist visa waiver' },
    UK: { type: 'visa-free', duration: 180, notes: 'No visa needed' },
  },
  Japan: {
    'United States': { type: 'visa-free', duration: 90, notes: 'Temporary visitor' },
    Australia: { type: 'visa-free', duration: 90, notes: 'Visa waiver agreement' },
    UK: { type: 'visa-free', duration: 90, notes: 'Visa waiver agreement' },
    Canada: { type: 'visa-free', duration: 90, notes: 'Visa waiver agreement' },
    Thailand: { type: 'visa-free', duration: 30, notes: 'Short-term tourist stay' },
  },
};

export default function TravelVisaChecker() {
  const [passportCountry, setPassportCountry] = useState('United States');
  const [destinationCountry, setDestinationCountry] = useState('Mexico');

  const visaResult = useMemo(() => {
    const countryDB = VISA_DATABASE[passportCountry];
    if (!countryDB) return null;
    return countryDB[destinationCountry];
  }, [passportCountry, destinationCountry]);

  const getVisualsForType = (type) => {
    switch (type) {
      case 'visa-free':
        return {
          emoji: '✓',
          title: 'Visa Free',
          color: 'bg-green-50 border-green-200',
          textColor: 'text-green-900',
        };
      case 'visa-on-arrival':
        return {
          emoji: '✓',
          title: 'Visa on Arrival',
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-900',
        };
      case 'e-visa':
        return {
          emoji: '✓',
          title: 'e-Visa Required',
          color: 'bg-blue-50 border-blue-200',
          textColor: 'text-blue-900',
        };
      case 'visa-required':
        return {
          emoji: '!',
          title: 'Visa Required',
          color: 'bg-orange-50 border-orange-200',
          textColor: 'text-orange-900',
        };
      default:
        return {
          emoji: '?',
          title: 'Unknown',
          color: 'bg-gray-50 border-gray-200',
          textColor: 'text-gray-900',
        };
    }
  };

  const visuals = visaResult ? getVisualsForType(visaResult.type) : null;

  return (
    <div className="space-y-4">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Your Passport Country
          </label>
          <Select
            value={passportCountry}
            onChange={(e) => setPassportCountry(e.target.value)}
            options={COUNTRIES.map((c) => ({ value: c, label: c }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Destination Country
          </label>
          <Select
            value={destinationCountry}
            onChange={(e) => setDestinationCountry(e.target.value)}
            options={COUNTRIES.map((c) => ({ value: c, label: c }))}
          />
        </div>
      </div>

      {visaResult ? (
        <div
          className={`${visuals.color} border rounded-[var(--radius-card)] space-y-4`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`text-4xl font-bold ${visuals.textColor} flex-shrink-0`}
            >
              {visuals.emoji}
            </div>
            <div>
              <h3 className={`font-heading text-xl font-bold ${visuals.textColor}`}>
                {visuals.title}
              </h3>
              {visaResult.duration && (
                <p className={`text-sm ${visuals.textColor} mt-1`}>
                  Allowed stay: up to{' '}
                  <span className="font-mono font-semibold">
                    {visaResult.duration}
                  </span>{' '}
                  days
                </p>
              )}
            </div>
          </div>

          {visaResult.notes && (
            <p className={`text-sm ${visuals.textColor}`}>
              {visaResult.notes}
            </p>
          )}
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-[var(--radius-card)]">
          <p className="text-sm text-text-secondary">
            Visa information for this country combination not available in our database. Please check
            your government's travel advisory website.
          </p>
        </div>
      )}

      <div className="bg-surface border border-border rounded-[var(--radius-card)]">
        <p className="text-xs text-text-muted">
          Disclaimer: This information is provided as a general guide only. Visa requirements can
          change without notice. Always check your country's official immigration website or
          contact the relevant embassy before making travel plans.
        </p>
      </div>
    </div>
  );
}
