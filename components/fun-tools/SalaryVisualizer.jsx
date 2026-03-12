'use client';

import { useState, useEffect, useMemo } from 'react';
import { downloadSalaryCard } from '@/lib/export';

const SalaryVisualizer = () => {
  const [salaryInput, setSalaryInput] = useState('35000');
  const [period, setPeriod] = useState('year');
  const [earnedSinceOpen, setEarnedSinceOpen] = useState('0.00');
  const [openTime, setOpenTime] = useState(null);

  // Initialize time when component mounts
  useEffect(() => {
    setOpenTime(Date.now());
  }, []);

  // Live counter effect
  useEffect(() => {
    if (!openTime || !salaryInput || salaryInput === '0') return;

    const interval = setInterval(() => {
      const now = Date.now();
      const secondsElapsed = (now - openTime) / 1000;
      const annualSalary = getAnnualSalary();
      const salaryPerSecond = annualSalary / (365.25 * 24 * 60 * 60);
      const earned = salaryPerSecond * secondsElapsed;
      setEarnedSinceOpen(earned.toFixed(2));
    }, 100);

    return () => clearInterval(interval);
  }, [openTime, salaryInput, period]);

  // Get annual salary from input
  const getAnnualSalary = () => {
    const amount = parseFloat(salaryInput) || 0;
    switch (period) {
      case 'year':
        return amount;
      case 'month':
        return amount * 12;
      case 'week':
        return amount * 52;
      case 'hour':
        return amount * 260 * 7.5; // 260 working days, 7.5 hours/day
      default:
        return amount;
    }
  };

  const annualSalary = getAnnualSalary();

  // Breakdown calculations
  const breakdown = useMemo(() => {
    if (annualSalary === 0) {
      return {
        year: '0.00',
        month: '0.00',
        week: '0.00',
        day: '0.00',
        hour: '0.00',
        minute: '0.00',
        second: '0.00',
      };
    }

    return {
      year: (annualSalary).toFixed(2),
      month: (annualSalary / 12).toFixed(2),
      week: (annualSalary / 52).toFixed(2),
      day: (annualSalary / 260).toFixed(2),
      hour: (annualSalary / (260 * 7.5)).toFixed(2),
      minute: (annualSalary / (260 * 7.5 * 60)).toFixed(2),
      second: (annualSalary / (365.25 * 24 * 60 * 60)).toFixed(2),
    };
  }, [annualSalary]);

  // Time to earn common items
  const timeToEarn = useMemo(() => {
    const salaryPerSecond = annualSalary / (365.25 * 24 * 60 * 60);
    if (salaryPerSecond === 0) {
      return {
        coffee: '-',
        beer: '-',
        netflix: '-',
        petrol: '-',
        iphone: '-',
        rent: '-',
        holiday: '-',
        car: '-',
        house: '-',
      };
    }

    const formatTime = (seconds) => {
      if (seconds < 60) {
        return `${Math.round(seconds)} seconds`;
      }
      if (seconds < 3600) {
        const minutes = Math.round(seconds / 60);
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
      }
      if (seconds < 86400) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.round((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
      }
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      return `${days}d ${hours}h`;
    };

    return {
      coffee: formatTime((4.5 / salaryPerSecond)),
      beer: formatTime((6.5 / salaryPerSecond)),
      netflix: formatTime((10.99 / salaryPerSecond)),
      petrol: formatTime((80 / salaryPerSecond)),
      iphone: formatTime((1199 / salaryPerSecond)),
      rent: formatTime((1300 / salaryPerSecond)),
      holiday: formatTime((800 / salaryPerSecond)),
      car: formatTime((25000 / salaryPerSecond)),
      house: formatTime((290000 / salaryPerSecond)),
    };
  }, [annualSalary]);

  // Comparison calculations
  const comparison = useMemo(() => {
    const UK_MEDIAN = 34963;
    const UK_MIN_WAGE_FT = 22308;
    const PM_SALARY = 167786;

    const medianDiff = annualSalary - UK_MEDIAN;
    const minWageDiff = annualSalary - UK_MIN_WAGE_FT;
    const pmDiff = annualSalary - PM_SALARY;

    return {
      median: {
        diff: medianDiff,
        percent: medianDiff !== 0 ? Math.round((medianDiff / UK_MEDIAN) * 100) : 0,
        text:
          medianDiff > 0
            ? `${Math.abs(Math.round((medianDiff / UK_MEDIAN) * 100))}% more than UK median`
            : `${Math.abs(Math.round((medianDiff / UK_MEDIAN) * 100))}% less than UK median`,
        color: medianDiff > 0 ? 'text-green-600' : medianDiff < 0 ? 'text-red-600' : 'text-text-muted',
      },
      minWage: {
        diff: minWageDiff,
        percent: minWageDiff !== 0 ? Math.round((minWageDiff / UK_MIN_WAGE_FT) * 100) : 0,
        text:
          minWageDiff > 0
            ? `${Math.abs(Math.round((minWageDiff / UK_MIN_WAGE_FT) * 100))}% more than minimum wage`
            : `${Math.abs(Math.round((minWageDiff / UK_MIN_WAGE_FT) * 100))}% less than minimum wage`,
        color: minWageDiff > 0 ? 'text-green-600' : minWageDiff < 0 ? 'text-red-600' : 'text-text-muted',
      },
      pm: {
        diff: pmDiff,
        percent: pmDiff !== 0 ? Math.round((pmDiff / PM_SALARY) * 100) : 0,
        text:
          pmDiff < 0
            ? `You'd need ${Math.abs(Math.round((pmDiff / annualSalary) * 100))}% more to match the PM`
            : `You earn more than the Prime Minister 💪`,
        color: pmDiff > 0 ? 'text-accent' : 'text-text-secondary',
      },
    };
  }, [annualSalary]);

  // Fun facts
  const funFacts = useMemo(() => {
    const salaryPerMinute = annualSalary / (365.25 * 24 * 60);
    const blinksPerMinute = 17.5; // average
    const blinkEarnings = salaryPerMinute / blinksPerMinute;

    const salaryPerDay = annualSalary / 365.25;
    const bigMacsPerDay = salaryPerDay / 4.49;

    const yearsToMillion = annualSalary > 0 ? 1000000 / annualSalary : Infinity;

    return {
      blink: blinkEarnings > 0 ? `£${blinkEarnings.toFixed(2)}` : '£0.00',
      bigMacs: bigMacsPerDay > 0 ? Math.floor(bigMacsPerDay) : 0,
      millionYears: yearsToMillion !== Infinity ? Math.round(yearsToMillion) : '∞',
    };
  }, [annualSalary]);

  const handleSalaryChange = (e) => {
    setSalaryInput(e.target.value);
  };

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleDownloadCard = async () => {
    const funFactsArray = [
      `You earn ${funFacts.blink} every time you blink`,
      `You could buy ${funFacts.bigMacs} Big Macs per day with your daily earnings`,
      `It would take you ${funFacts.millionYears} year${funFacts.millionYears !== 1 ? 's' : ''} to earn £1 million`,
    ];

    await downloadSalaryCard(
      parseFloat(salaryInput) || 0,
      period,
      breakdown,
      funFactsArray
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-6 p-4">
      {/* Input Section */}
      <div className="bg-white border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            What's your salary?
          </label>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary font-medium">
                £
              </span>
              <input
                type="number"
                value={salaryInput}
                onChange={handleSalaryChange}
                placeholder="0"
                className="w-full pl-7 pr-4 py-3 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-mono-num text-lg"
              />
            </div>
            <select
              value={period}
              onChange={handlePeriodChange}
              className="px-4 py-3 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 font-medium"
            >
              <option value="year">Per Year</option>
              <option value="month">Per Month</option>
              <option value="week">Per Week</option>
              <option value="hour">Per Hour</option>
            </select>
          </div>
        </div>
      </div>

      {/* Breakdown Card */}
      {annualSalary > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">Your Earnings Breakdown</h2>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per year</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.year}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per month</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.month}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per week</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.week}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per day</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.day}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per hour</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.hour}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per minute</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.minute}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">Per second</span>
              <span className="font-mono-num text-lg font-semibold text-text-primary">
                £{breakdown.second}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Time to Earn Card */}
      {annualSalary > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">How Long to Earn...</h2>
          <div className="space-y-2.5">
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">☕ Cup of coffee</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.coffee}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">🍺 Pint of beer</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.beer}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">📺 Netflix subscription</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.netflix}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">⛽ Tank of petrol</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.petrol}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">📱 iPhone 15</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.iphone}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">🏠 Average UK rent</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.rent}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">✈️ Holiday to Spain</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.holiday}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">🚗 New car</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.car}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-text-secondary">🏡 Average UK house</span>
              <span className="font-mono-num font-medium text-text-primary">{timeToEarn.house}</span>
            </div>
          </div>
        </div>
      )}

      {/* Live Counter Card */}
      {annualSalary > 0 && (
        <div className="bg-accent/10 border border-accent/30 rounded-[var(--radius-card)] p-6 space-y-2">
          <h2 className="text-lg font-semibold text-text-primary">While you read this...</h2>
          <p className="text-text-secondary text-sm">
            You've earned since opening this tool:
          </p>
          <p className="font-mono-num text-3xl font-bold text-accent pt-2">
            £{earnedSinceOpen}
          </p>
        </div>
      )}

      {/* Comparison Card */}
      {annualSalary > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">How You Compare</h2>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm mb-1">UK Median Salary (£34,963)</p>
              <p className={`font-medium ${comparison.median.color}`}>
                {comparison.median.text}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-1">UK Minimum Wage Full-Time (£22,308)</p>
              <p className={`font-medium ${comparison.minWage.color}`}>
                {comparison.minWage.text}
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm mb-1">Prime Minister Salary (£167,786)</p>
              <p className={`font-medium ${comparison.pm.color}`}>
                {comparison.pm.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Download Card Button */}
      {annualSalary > 0 && (
        <button
          onClick={handleDownloadCard}
          className="w-full px-6 py-3 bg-accent text-white font-medium rounded-[var(--radius-input)] hover:bg-accent-hover transition-colors focus:outline-none focus:ring-2 focus:ring-accent/50"
        >
          📸 Download Shareable Card
        </button>
      )}

      {/* Fun Facts Card */}
      {annualSalary > 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">Fun Facts</h2>
          <div className="space-y-3">
            <div>
              <p className="text-text-secondary text-sm">
                💸 You earn <span className="font-mono-num font-semibold text-text-primary">{funFacts.blink}</span> every time you blink
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">
                🍔 You could buy <span className="font-mono-num font-semibold text-text-primary">{funFacts.bigMacs}</span> Big Macs per day with your daily earnings
              </p>
            </div>
            <div>
              <p className="text-text-secondary text-sm">
                💰 It would take you <span className="font-mono-num font-semibold text-text-primary">{funFacts.millionYears}</span> year{funFacts.millionYears !== 1 ? 's' : ''} to earn £1 million
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {annualSalary === 0 && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-5 text-center">
          <p className="text-text-muted">Enter your salary to see the breakdown</p>
        </div>
      )}
    </div>
  );
};

export default SalaryVisualizer;
