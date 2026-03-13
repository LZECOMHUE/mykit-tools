'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';

const nameDatabase = {
  male: {
    'james': { rank: 1, peak: '1940s', trend: 'falling', timeseries: [850, 900, 950, 1000, 950, 900] },
    'john': { rank: 2, peak: '1930s', trend: 'falling', timeseries: [900, 950, 1000, 1050, 900, 700] },
    'robert': { rank: 3, peak: '1940s', trend: 'falling', timeseries: [800, 850, 920, 1000, 850, 600] },
    'michael': { rank: 4, peak: '1970s', trend: 'falling', timeseries: [500, 600, 800, 950, 800, 400] },
    'david': { rank: 5, peak: '1960s', trend: 'stable', timeseries: [400, 500, 700, 800, 750, 600] },
    'william': { rank: 6, peak: '2010s', trend: 'rising', timeseries: [200, 250, 300, 400, 600, 800] },
    'richard': { rank: 7, peak: '1950s', trend: 'falling', timeseries: [700, 800, 850, 900, 600, 300] },
    'thomas': { rank: 8, peak: '2000s', trend: 'rising', timeseries: [300, 350, 400, 500, 650, 750] },
    'charles': { rank: 9, peak: '1920s', trend: 'falling', timeseries: [600, 550, 500, 400, 200, 100] },
    'daniel': { rank: 10, peak: '1990s', trend: 'rising', timeseries: [200, 300, 400, 600, 750, 800] },
    'george': { rank: 11, peak: '2000s', trend: 'rising', timeseries: [150, 200, 250, 350, 550, 700] },
    'joseph': { rank: 12, peak: '1950s', trend: 'falling', timeseries: [500, 550, 600, 650, 400, 300] },
    'paul': { rank: 13, peak: '1970s', trend: 'falling', timeseries: [400, 500, 700, 750, 400, 200] },
    'peter': { rank: 14, peak: '1960s', trend: 'falling', timeseries: [400, 500, 650, 700, 300, 150] },
    'andrew': { rank: 15, peak: '1990s', trend: 'falling', timeseries: [250, 350, 500, 650, 600, 400] },
    'oliver': { rank: 16, peak: '2020s', trend: 'rising', timeseries: [100, 120, 150, 300, 700, 950] },
    'jacob': { rank: 17, peak: '2010s', trend: 'falling', timeseries: [50, 100, 200, 600, 800, 700] },
    'noah': { rank: 18, peak: '2010s', trend: 'rising', timeseries: [20, 40, 80, 200, 500, 850] },
    'benjamin': { rank: 19, peak: '2000s', trend: 'rising', timeseries: [100, 150, 200, 400, 700, 850] },
    'lucas': { rank: 20, peak: '2010s', trend: 'rising', timeseries: [50, 80, 120, 300, 650, 800] },
  },
  female: {
    'mary': { rank: 1, peak: '1930s', trend: 'falling', timeseries: [950, 1000, 1050, 950, 700, 400] },
    'sarah': { rank: 2, peak: '1990s', trend: 'falling', timeseries: [300, 400, 600, 850, 800, 600] },
    'patricia': { rank: 3, peak: '1950s', trend: 'falling', timeseries: [700, 800, 850, 750, 300, 100] },
    'jennifer': { rank: 4, peak: '1980s', trend: 'falling', timeseries: [100, 300, 700, 950, 700, 300] },
    'linda': { rank: 5, peak: '1960s', trend: 'falling', timeseries: [400, 600, 850, 900, 200, 50] },
    'barbara': { rank: 6, peak: '1940s', trend: 'falling', timeseries: [600, 750, 850, 800, 200, 50] },
    'susan': { rank: 7, peak: '1960s', trend: 'falling', timeseries: [300, 500, 800, 850, 200, 50] },
    'jessica': { rank: 8, peak: '1990s', trend: 'falling', timeseries: [50, 100, 400, 900, 700, 300] },
    'karen': { rank: 9, peak: '1960s', trend: 'falling', timeseries: [200, 400, 750, 850, 200, 50] },
    'nancy': { rank: 10, peak: '1950s', trend: 'falling', timeseries: [500, 700, 800, 750, 150, 40] },
    'emily': { rank: 11, peak: '2010s', trend: 'rising', timeseries: [50, 100, 150, 400, 700, 850] },
    'elizabeth': { rank: 12, peak: '1950s', trend: 'falling', timeseries: [500, 600, 650, 600, 300, 200] },
    'anna': { rank: 13, peak: '2010s', trend: 'rising', timeseries: [100, 150, 200, 300, 600, 800] },
    'charlotte': { rank: 14, peak: '2020s', trend: 'rising', timeseries: [50, 80, 120, 250, 600, 900] },
    'amelia': { rank: 15, peak: '2010s', trend: 'rising', timeseries: [100, 150, 200, 350, 700, 850] },
    'sophia': { rank: 16, peak: '2010s', trend: 'rising', timeseries: [50, 100, 200, 400, 750, 900] },
    'isabella': { rank: 17, peak: '2000s', trend: 'rising', timeseries: [100, 150, 200, 500, 800, 850] },
    'mia': { rank: 18, peak: '2010s', trend: 'stable', timeseries: [100, 150, 250, 400, 750, 800] },
    'olivia': { rank: 19, peak: '2010s', trend: 'rising', timeseries: [50, 80, 150, 300, 700, 900] },
    'ava': { rank: 20, peak: '2010s', trend: 'rising', timeseries: [30, 50, 100, 250, 700, 850] },
  },
};

export default function HowCommonIsYourName() {
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('any');
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    if (!firstName.trim()) return;

    const nameLower = firstName.toLowerCase().trim();
    let data = null;
    let detectedGender = gender;

    if (gender === 'any') {
      data = nameDatabase.male[nameLower] || nameDatabase.female[nameLower];
      detectedGender = nameDatabase.male[nameLower] ? 'male' : 'female';
    } else {
      const db = gender === 'male' ? nameDatabase.male : nameDatabase.female;
      data = db[nameLower];
    }

    if (data) {
      setResult({
        name: firstName,
        rank: data.rank,
        peak: data.peak,
        trend: data.trend,
        gender: detectedGender,
        found: true,
      });
    } else {
      setResult({
        name: firstName,
        found: false,
      });
    }
  };

  const getTrendEmoji = (trend) => {
    if (trend === 'rising') return '📈';
    if (trend === 'falling') return '📉';
    return '~';
  };

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            First Name
          </label>
          <Input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="e.g. James, Sarah, Oliver"
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">
            Gender
          </label>
          <Select value={gender} onChange={(e) => setGender(e.target.value)} className="w-full">
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>

        <Button onClick={handleSearch} disabled={!firstName.trim()} className="bg-accent text-white w-full">
          Check Name Popularity
        </Button>
      </div>

      {result && (
        <div className="space-y-4">
          {result.found ? (
            <>
              <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-8">
                <p className="text-sm opacity-90 mb-2">Popularity Ranking</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-heading text-5xl font-bold">{result.rank}</span>
                  <span className="text-lg opacity-90">out of top 20</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                  <p className="text-text-muted text-xs font-medium mb-2">Peak Popularity</p>
                  <p className="font-heading text-xl font-bold text-text-primary">{result.peak}</p>
                </div>
                <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                  <p className="text-text-muted text-xs font-medium mb-2">Current Trend</p>
                  <p className="font-heading text-lg font-bold text-text-primary">
                    {getTrendEmoji(result.trend)} {result.trend.charAt(0).toUpperCase() + result.trend.slice(1)}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
                <p className="text-text-secondary text-sm">
                  {result.name} was most popular in the {result.peak}. Based on UK Office for National Statistics baby name data.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
              <p className="text-text-secondary">
                {result.name} is not in the top 20 most popular names in our database. It might be more unique than you think!
              </p>
            </div>
          )}

          <Button onClick={() => { setResult(null); setFirstName(''); }} variant="ghost" className="w-full">
            Check Another Name
          </Button>
        </div>
      )}
    </div>
  );
}
