'use client';

import { useState, useMemo, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import GamblingDisclaimer from '@/components/ui/GamblingDisclaimer';

const LOTTERY_DATA = {
  UK: [
    {
      id: 'uk-lotto',
      name: 'UK Lotto',
      country: 'United Kingdom',
      drawsPerWeek: 'Twice weekly (Wed, Sat)',
      ticketPrice: 2.0,
      currency: 'GBP',
      format: '6 numbers from 1 to 59 + Bonus ball',
      jackpotOdds: 45057474,
      jackpotOddsLabel: '1 in 45,057,474',
      typicalJackpot: '2M - 20M',
      prizeBreakdown: [
        { match: 'Jackpot (all 6)', odds: 45057474, avgPrize: '1,000,000+' },
        { match: '5 + Bonus', odds: 7509974, avgPrize: '100,000' },
        { match: '5', odds: 144415, avgPrize: '1,000' },
        { match: '4', odds: 2244, avgPrize: '140' },
        { match: '3', odds: 97, avgPrize: '30' },
      ],
      expectedValue: -0.65,
    },
    {
      id: 'euromillions',
      name: 'EuroMillions',
      country: 'United Kingdom',
      drawsPerWeek: 'Twice weekly (Tue, Fri)',
      ticketPrice: 2.5,
      currency: 'GBP',
      format: '5 numbers from 1 to 50 + 2 Stars from 1 to 12',
      jackpotOdds: 139838160,
      jackpotOddsLabel: '1 in 139,838,160',
      typicalJackpot: '15M - 100M+',
      prizeBreakdown: [
        { match: 'All 5 + 2 Stars', odds: 139838160, avgPrize: '5,000,000+' },
        { match: '5 + 1 Star', odds: 6991908, avgPrize: '500,000' },
        { match: '5 + 0 Stars', odds: 3107940, avgPrize: '50,000' },
        { match: '4 + 2 Stars', odds: 518460, avgPrize: '5,000' },
        { match: '4 + 1 Star', odds: 25940, avgPrize: '200' },
      ],
      expectedValue: -0.68,
    },
    {
      id: 'thunderball',
      name: 'Thunderball',
      country: 'United Kingdom',
      drawsPerWeek: 'Daily',
      ticketPrice: 1.0,
      currency: 'GBP',
      format: '5 numbers from 1 to 39 + 1 Thunderball from 1 to 14',
      jackpotOdds: 8060598,
      jackpotOddsLabel: '1 in 8,060,598',
      typicalJackpot: '500K - 5M',
      prizeBreakdown: [
        { match: '5 + Thunderball', odds: 8060598, avgPrize: '250,000' },
        { match: '5', odds: 74724, avgPrize: '500' },
        { match: '4 + Thunderball', odds: 13328, avgPrize: '250' },
        { match: '4', odds: 123, avgPrize: '50' },
        { match: '3 + Thunderball', odds: 296, avgPrize: '20' },
      ],
      expectedValue: -0.55,
    },
    {
      id: 'set-for-life',
      name: 'Set for Life',
      country: 'United Kingdom',
      drawsPerWeek: 'Daily',
      ticketPrice: 1.5,
      currency: 'GBP',
      format: '5 numbers from 1 to 47 + 1 Life Ball from 1 to 10',
      jackpotOdds: 15339390,
      jackpotOddsLabel: '1 in 15,339,390',
      typicalJackpot: '10K/month for 30 years',
      prizeBreakdown: [
        { match: '5 + Life Ball', odds: 15339390, avgPrize: '120,000/year' },
        { match: '5', odds: 1533939, avgPrize: '7,000' },
        { match: '4 + Life Ball', odds: 113996, avgPrize: '3,000' },
        { match: '4', odds: 11399, avgPrize: '250' },
        { match: '3 + Life Ball', odds: 844, avgPrize: '100' },
      ],
      expectedValue: -0.52,
    },
  ],
  US: [
    {
      id: 'powerball',
      name: 'Powerball',
      country: 'United States',
      drawsPerWeek: 'Thrice weekly (Mon, Wed, Sat)',
      ticketPrice: 2.0,
      currency: 'USD',
      format: '5 numbers from 1 to 69 + 1 Powerball from 1 to 26',
      jackpotOdds: 292201338,
      jackpotOddsLabel: '1 in 292,201,338',
      typicalJackpot: '20M - 2B+',
      prizeBreakdown: [
        { match: '5 + Powerball', odds: 292201338, avgPrize: '500,000,000+' },
        { match: '5', odds: 11688054, avgPrize: '1,000,000' },
        { match: '4 + Powerball', odds: 913129, avgPrize: '50,000' },
        { match: '4', odds: 36525, avgPrize: '100' },
        { match: '3 + Powerball', odds: 12245, avgPrize: '100' },
      ],
      expectedValue: -0.71,
    },
    {
      id: 'mega-millions',
      name: 'Mega Millions',
      country: 'United States',
      drawsPerWeek: 'Twice weekly (Tue, Fri)',
      ticketPrice: 2.0,
      currency: 'USD',
      format: '5 numbers from 1 to 70 + 1 Mega Ball from 1 to 25',
      jackpotOdds: 302575350,
      jackpotOddsLabel: '1 in 302,575,350',
      typicalJackpot: '20M - 1B+',
      prizeBreakdown: [
        { match: '5 + Mega Ball', odds: 302575350, avgPrize: '200,000,000+' },
        { match: '5', odds: 12607306, avgPrize: '1,000,000' },
        { match: '4 + Mega Ball', odds: 931402, avgPrize: '10,000' },
        { match: '4', odds: 38769, avgPrize: '150' },
        { match: '3 + Mega Ball', odds: 13781, avgPrize: '200' },
      ],
      expectedValue: -0.71,
    },
  ],
  EU: [
    {
      id: 'eurojackpot',
      name: 'EuroJackpot',
      country: 'European Union',
      drawsPerWeek: 'Once weekly (Fri)',
      ticketPrice: 2.0,
      currency: 'EUR',
      format: '5 numbers from 1 to 50 + 2 Euronumbers from 1 to 12',
      jackpotOdds: 139838160,
      jackpotOddsLabel: '1 in 139,838,160',
      typicalJackpot: '10M - 100M',
      prizeBreakdown: [
        { match: '5 + 2 Euronumbers', odds: 139838160, avgPrize: '5,000,000' },
        { match: '5 + 1 Euronumber', odds: 6991908, avgPrize: '500,000' },
        { match: '5 + 0 Euronumbers', odds: 3107940, avgPrize: '50,000' },
        { match: '4 + 2 Euronumbers', odds: 518460, avgPrize: '2,000' },
        { match: '4 + 1 Euronumber', odds: 25970, avgPrize: '100' },
      ],
      expectedValue: -0.68,
    },
  ],
  AU: [
    {
      id: 'oz-lotto',
      name: 'Oz Lotto',
      country: 'Australia',
      drawsPerWeek: 'Once weekly (Tue)',
      ticketPrice: 0.45,
      currency: 'AUD',
      format: '7 numbers from 1 to 47 + 1 Supplementary ball',
      jackpotOdds: 45379620,
      jackpotOddsLabel: '1 in 45,379,620',
      typicalJackpot: '3M - 30M',
      prizeBreakdown: [
        { match: 'All 7', odds: 45379620, avgPrize: '1,000,000' },
        { match: '6 + Supplementary', odds: 3342973, avgPrize: '100,000' },
        { match: '6', odds: 62416, avgPrize: '5,000' },
        { match: '5', odds: 1533, avgPrize: '100' },
        { match: '4', odds: 141, avgPrize: '20' },
      ],
      expectedValue: -0.62,
    },
    {
      id: 'powerball-au',
      name: 'Powerball AU',
      country: 'Australia',
      drawsPerWeek: 'Once weekly (Thu)',
      ticketPrice: 0.7,
      currency: 'AUD',
      format: '7 numbers from 1 to 35 + 1 Powerball from 1 to 20',
      jackpotOdds: 134490400,
      jackpotOddsLabel: '1 in 134,490,400',
      typicalJackpot: '5M - 80M',
      prizeBreakdown: [
        { match: 'All 7 + Powerball', odds: 134490400, avgPrize: '3,000,000' },
        { match: 'All 7', odds: 6724520, avgPrize: '500,000' },
        { match: '6 + Powerball', odds: 592549, avgPrize: '50,000' },
        { match: '6', odds: 29627, avgPrize: '5,000' },
        { match: '5', odds: 1372, avgPrize: '1,000' },
      ],
      expectedValue: -0.65,
    },
  ],
  CA: [
    {
      id: 'lotto-6-49',
      name: 'Lotto 6/49',
      country: 'Canada',
      drawsPerWeek: 'Twice weekly (Wed, Sat)',
      ticketPrice: 3.5,
      currency: 'CAD',
      format: '6 numbers from 1 to 49 + Bonus ball',
      jackpotOdds: 13983816,
      jackpotOddsLabel: '1 in 13,983,816',
      typicalJackpot: '5M - 50M',
      prizeBreakdown: [
        { match: '6', odds: 13983816, avgPrize: '5,000,000' },
        { match: '5 + Bonus', odds: 2330636, avgPrize: '250,000' },
        { match: '5', odds: 55491, avgPrize: '1,000' },
        { match: '4', odds: 1083, avgPrize: '100' },
        { match: '3 + Bonus', odds: 650, avgPrize: '20' },
      ],
      expectedValue: -0.58,
    },
    {
      id: 'lotto-max',
      name: 'Lotto Max',
      country: 'Canada',
      drawsPerWeek: 'Once weekly (Fri)',
      ticketPrice: 5.0,
      currency: 'CAD',
      format: '7 numbers from 1 to 50 + Bonus ball',
      jackpotOdds: 33294800,
      jackpotOddsLabel: '1 in 33,294,800',
      typicalJackpot: '10M - 100M+',
      prizeBreakdown: [
        { match: '7', odds: 33294800, avgPrize: '50,000,000' },
        { match: '6 + Bonus', odds: 2330337, avgPrize: '500,000' },
        { match: '6', odds: 52216, avgPrize: '5,000' },
        { match: '5', odds: 1550, avgPrize: '500' },
        { match: '4 + Bonus', odds: 388, avgPrize: '50' },
      ],
      expectedValue: -0.62,
    },
  ],
  IE: [
    {
      id: 'irish-lotto',
      name: 'Irish Lotto',
      country: 'Ireland',
      drawsPerWeek: 'Twice weekly (Wed, Sat)',
      ticketPrice: 1.5,
      currency: 'EUR',
      format: '6 numbers from 1 to 47 + Bonus ball',
      jackpotOdds: 10737573,
      jackpotOddsLabel: '1 in 10,737,573',
      typicalJackpot: '2M - 20M',
      prizeBreakdown: [
        { match: '6', odds: 10737573, avgPrize: '1,000,000' },
        { match: '5 + Bonus', odds: 1789596, avgPrize: '100,000' },
        { match: '5', odds: 44679, avgPrize: '1,000' },
        { match: '4 + Bonus', odds: 1486, avgPrize: '100' },
        { match: '4', odds: 186, avgPrize: '20' },
      ],
      expectedValue: -0.48,
    },
  ],
  ES: [
    {
      id: 'el-gordo',
      name: 'El Gordo',
      country: 'Spain',
      drawsPerWeek: 'Once yearly (Dec 22)',
      ticketPrice: 20.0,
      currency: 'EUR',
      format: 'Number-based (00000 to 99999)',
      jackpotOdds: 100000,
      jackpotOddsLabel: '1 in 100,000',
      typicalJackpot: '4M',
      prizeBreakdown: [
        { match: 'First Prize', odds: 100000, avgPrize: '4,000,000' },
        { match: '2nd Prize', odds: 100000, avgPrize: '1,250,000' },
        { match: '3rd Prize', odds: 100000, avgPrize: '500,000' },
        { match: 'Tenths', odds: 10000, avgPrize: '400,000' },
      ],
      expectedValue: -0.60,
    },
    {
      id: 'la-primitiva',
      name: 'La Primitiva',
      country: 'Spain',
      drawsPerWeek: 'Thrice weekly (Mon, Thu, Sat)',
      ticketPrice: 1.5,
      currency: 'EUR',
      format: '6 numbers from 1 to 49 + Reintegro',
      jackpotOdds: 13983816,
      jackpotOddsLabel: '1 in 13,983,816',
      typicalJackpot: '1M - 10M',
      prizeBreakdown: [
        { match: '6', odds: 13983816, avgPrize: '500,000' },
        { match: '5 + Reintegro', odds: 2330636, avgPrize: '100,000' },
        { match: '5', odds: 55491, avgPrize: '2,000' },
        { match: '4', odds: 1083, avgPrize: '100' },
      ],
      expectedValue: -0.55,
    },
  ],
  IT: [
    {
      id: 'superenalotto',
      name: 'SuperEnalotto',
      country: 'Italy',
      drawsPerWeek: 'Thrice weekly (Tue, Thu, Sat)',
      ticketPrice: 1.0,
      currency: 'EUR',
      format: '6 numbers from 1 to 90 + 1 Jolly + 1 Superstar',
      jackpotOdds: 622614630,
      jackpotOddsLabel: '1 in 622,614,630',
      typicalJackpot: '2M - 50M+',
      prizeBreakdown: [
        { match: '6', odds: 622614630, avgPrize: '5,000,000' },
        { match: '5 + Jolly', odds: 103519000, avgPrize: '500,000' },
        { match: '5', odds: 1550000, avgPrize: '50,000' },
        { match: '4 + Jolly', odds: 130000, avgPrize: '10,000' },
      ],
      expectedValue: -0.68,
    },
  ],
  FR: [
    {
      id: 'french-lotto',
      name: 'French Lotto',
      country: 'France',
      drawsPerWeek: 'Thrice weekly (Mon, Wed, Sat)',
      ticketPrice: 2.2,
      currency: 'EUR',
      format: '5 numbers from 1 to 49 + 1 Chance number from 1 to 10',
      jackpotOdds: 19068840,
      jackpotOddsLabel: '1 in 19,068,840',
      typicalJackpot: '1M - 20M',
      prizeBreakdown: [
        { match: '5 + Chance', odds: 19068840, avgPrize: '1,000,000' },
        { match: '5', odds: 1906884, avgPrize: '100,000' },
        { match: '4 + Chance', odds: 9534, avgPrize: '500' },
        { match: '4', odds: 953, avgPrize: '50' },
      ],
      expectedValue: -0.58,
    },
  ],
  DE: [
    {
      id: 'german-lotto',
      name: 'German Lotto',
      country: 'Germany',
      drawsPerWeek: 'Thrice weekly (Wed, Sat, Sun)',
      ticketPrice: 1.3,
      currency: 'EUR',
      format: '6 numbers from 1 to 49 + 1 Superzahl from 0 to 9',
      jackpotOdds: 139838160,
      jackpotOddsLabel: '1 in 139,838,160',
      typicalJackpot: '1M - 50M',
      prizeBreakdown: [
        { match: '6 + Superzahl', odds: 139838160, avgPrize: '2,000,000' },
        { match: '6', odds: 13983816, avgPrize: '500,000' },
        { match: '5 + Superzahl', odds: 2330636, avgPrize: '100,000' },
        { match: '5', odds: 233063, avgPrize: '10,000' },
      ],
      expectedValue: -0.63,
    },
  ],
};

const COUNTRIES = Object.keys(LOTTERY_DATA).sort();

export default function LotteryOddsComparison() {
  const [selectedCountries, setSelectedCountries] = useState(() => {
    if (typeof window !== 'undefined') {
      const browserLang = navigator.language || 'en-US';
      if (browserLang.includes('en-GB') || browserLang.includes('en-IE')) return ['UK'];
      if (browserLang.includes('de')) return ['DE'];
      if (browserLang.includes('fr')) return ['FR'];
      if (browserLang.includes('es')) return ['ES'];
      if (browserLang.includes('it')) return ['IT'];
      if (browserLang.includes('en-AU')) return ['AU'];
      if (browserLang.includes('en-CA')) return ['CA'];
    }
    return ['UK'];
  });

  const [sortBy, setSortBy] = useState('odds'); // odds, jackpot, price
  const [expandedLottery, setExpandedLottery] = useState(null);

  const allLotteries = useMemo(() => {
    const lotteries = [];
    selectedCountries.forEach((country) => {
      if (LOTTERY_DATA[country]) {
        lotteries.push(...LOTTERY_DATA[country]);
      }
    });
    return lotteries;
  }, [selectedCountries]);

  const sortedLotteries = useMemo(() => {
    const sorted = [...allLotteries];
    switch (sortBy) {
      case 'odds':
        return sorted.sort((a, b) => a.jackpotOdds - b.jackpotOdds);
      case 'jackpot':
        return sorted.sort((a, b) => b.typicalJackpot.localeCompare(a.typicalJackpot));
      case 'price':
        return sorted.sort((a, b) => a.ticketPrice - b.ticketPrice);
      default:
        return sorted;
    }
  }, [allLotteries, sortBy]);

  const formatOdds = (odds) => {
    if (!odds) return 'N/A';
    return `1 in ${odds.toLocaleString()}`;
  };

  const getOddsColor = (odds) => {
    if (odds < 10000000) return 'text-green-600';
    if (odds < 50000000) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOddsVisualPercentage = (odds) => {
    const maxOdds = 622614630;
    return (1 - odds / maxOdds) * 100;
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      {/* Educational intro */}
      <Card className="bg-blue-50 border border-blue-200">
        <h2 className="font-heading font-bold text-xl mb-2 text-blue-900">How to Read These Odds</h2>
        <p className="text-blue-800 text-sm mb-3">
          Lottery odds show how many tickets you would need to buy (on average) to win the jackpot. These are astronomical numbers. To put it in perspective:
        </p>
        <ul className="space-y-1 text-blue-700 text-sm">
          <li>- Struck by lightning this year: about 1 in 500,000</li>
          <li>- Finding a pearl in an oyster: about 1 in 12,000</li>
          <li>- Hole-in-one (if you golf): about 1 in 12,500</li>
          <li>- Most lottery jackpots: 1 in 13 million to 1 in 600+ million</li>
        </ul>
      </Card>

      {/* Country filter */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-primary mb-3">Select Countries</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {COUNTRIES.map((country) => (
              <button
                key={country}
                onClick={() => {
                  setSelectedCountries((prev) =>
                    prev.includes(country) ? prev.filter((c) => c !== country) : [...prev, country]
                  );
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition text-sm ${
                  selectedCountries.includes(country)
                    ? 'bg-accent text-white'
                    : 'bg-surface text-primary border border-border hover:bg-border'
                }`}
              >
                {country === 'EU' ? 'Europe' : country}
              </button>
            ))}
          </div>
        </div>

        {/* Sort options */}
        <div>
          <label className="block text-sm font-semibold text-primary mb-3">Sort By</label>
          <div className="flex gap-3">
            {[
              { value: 'odds', label: 'Best Odds' },
              { value: 'price', label: 'Cheapest' },
              { value: 'jackpot', label: 'Biggest Jackpot' },
            ].map(({ value, label }) => (
              <Button
                key={value}
                onClick={() => setSortBy(value)}
                className={`px-4 py-2 text-sm ${
                  sortBy === value ? 'bg-accent text-white' : 'bg-surface text-primary border border-border'
                }`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Lotteries grid */}
      {sortedLotteries.length > 0 ? (
        <div className="space-y-4">
          {sortedLotteries.map((lottery) => (
            <Card key={lottery.id} className="space-y-4 hover:shadow-md transition">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-xl text-primary">{lottery.name}</h3>
                  <p className="text-secondary text-sm">{lottery.country}</p>
                </div>
                <Badge className="bg-accent text-white">{lottery.currency}</Badge>
              </div>

              {/* Key stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Odds */}
                <div>
                  <p className="text-secondary text-xs font-semibold mb-1">JACKPOT ODDS</p>
                  <p className={`font-mono font-bold text-sm ${getOddsColor(lottery.jackpotOdds)}`}>
                    {formatOdds(lottery.jackpotOdds)}
                  </p>
                  {/* Visual odds bar */}
                  <div className="mt-2 h-2 bg-surface rounded overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-red-500"
                      style={{ width: `${getOddsVisualPercentage(lottery.jackpotOdds)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Ticket price */}
                <div>
                  <p className="text-secondary text-xs font-semibold mb-1">TICKET PRICE</p>
                  <p className="font-mono font-bold text-lg">
                    {lottery.currency === 'GBP' ? '£' : lottery.currency === 'EUR' ? '€' : lottery.currency === 'USD' ? '$' : lottery.currency === 'CAD' ? 'C$' : lottery.currency === 'AUD' ? 'A$' : ''}
                    {lottery.ticketPrice.toFixed(2)}
                  </p>
                </div>

                {/* Typical jackpot */}
                <div>
                  <p className="text-secondary text-xs font-semibold mb-1">TYPICAL JACKPOT</p>
                  <p className="font-mono font-bold text-sm">{lottery.typicalJackpot}</p>
                </div>

                {/* Draw frequency */}
                <div>
                  <p className="text-secondary text-xs font-semibold mb-1">DRAWS</p>
                  <p className="text-sm text-primary">{lottery.drawsPerWeek}</p>
                </div>
              </div>

              {/* Format and expected value */}
              <div className="pt-2 border-t border-border">
                <p className="text-secondary text-sm mb-2">{lottery.format}</p>
                <p className="text-xs text-orange-600 font-semibold">
                  Expected Value: {lottery.expectedValue.toFixed(2)} (you lose this much per ticket on average)
                </p>
              </div>

              {/* Expand prize breakdown */}
              <button
                onClick={() => setExpandedLottery(expandedLottery === lottery.id ? null : lottery.id)}
                className="text-accent text-sm font-semibold hover:underline"
              >
                {expandedLottery === lottery.id ? 'Hide' : 'Show'} Prize Breakdown
              </button>

              {expandedLottery === lottery.id && (
                <div className="pt-2 border-t border-border space-y-2">
                  {lottery.prizeBreakdown.map((tier, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-surface rounded">
                      <div>
                        <p className="font-semibold text-primary text-sm">{tier.match}</p>
                        <p className="text-secondary text-xs">1 in {tier.odds?.toLocaleString() || 'N/A'}</p>
                      </div>
                      <p className="font-mono font-bold text-sm">~{tier.avgPrize}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-secondary">Select at least one country to compare lotteries</p>
        </div>
      )}

      {/* SEO content section */}
      <Card className="bg-surface space-y-4">
        <h2 className="font-heading font-bold text-2xl">Understanding Lottery Odds</h2>

        <div className="space-y-4 text-secondary">
          <div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">Why Lottery Odds Are So Bad</h3>
            <p>
              Lottery odds are mathematically designed to ensure the lottery operator always wins. The "expected value" of every ticket is negative, meaning you lose money on average. For every pound you spend on a ticket, you can expect to get back only 50p in prizes over time.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">Best Odds Lotteries</h3>
            <p>
              If you must play, the Irish Lotto has some of the best odds among major European lotteries at 1 in 10.7 million for the jackpot. The UK Lotto (1 in 45 million) is also better than EuroMillions (1 in 139 million) or SuperEnalotto (1 in 622 million).
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">What Affects Your Odds</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Number range: More numbers = worse odds</li>
              <li>Bonus balls: Additional bonus balls multiply the odds</li>
              <li>Ticket price: Higher prices don't improve odds</li>
              <li>Draw frequency: More draws don't improve individual ticket odds</li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">The Probability Reality Check</h3>
            <p>
              Buying 2 tickets per week for 50 years gives you approximately 0.52% chance of ever winning the UK Lotto jackpot. You're more likely to become a professional athlete than win a major lottery jackpot. If you enjoy the game, set a strict budget (like £5 per week) and never spend more thinking it improves your chances.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg text-primary mb-2">Better Alternatives</h3>
            <p>
              If you're looking to build wealth, investing that money in a low-cost index fund would have a much better expected return over time. The average lottery player would accumulate thousands in assets instead of a near-certain loss.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick facts box */}
      <Card className="border-2 border-accent-warm bg-yellow-50">
        <h3 className="font-heading font-bold text-lg text-accent-warm mb-4">Quick Facts About Lotteries</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-bold text-accent-warm text-xl">1 in 292M</p>
            <p className="text-sm text-secondary">Powerball jackpot odds (US)</p>
          </div>
          <div>
            <p className="font-bold text-accent-warm text-xl">1 in 622M</p>
            <p className="text-sm text-secondary">SuperEnalotto jackpot odds (Italy) - worst</p>
          </div>
          <div>
            <p className="font-bold text-accent-warm text-xl">1 in 10.7M</p>
            <p className="text-sm text-secondary">Irish Lotto jackpot odds - best in list</p>
          </div>
        </div>
      </Card>

      <GamblingDisclaimer type="lottery" />
    </div>
  );
}
