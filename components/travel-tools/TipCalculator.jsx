'use client';
import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const COUNTRIES = [
  { value: 'us', label: 'United States', tipRange: { min: 15, max: 20 }, typical: 18 },
  { value: 'uk', label: 'United Kingdom', tipRange: { min: 10, max: 15 }, typical: 12 },
  { value: 'canada', label: 'Canada', tipRange: { min: 15, max: 20 }, typical: 18 },
  { value: 'australia', label: 'Australia', tipRange: { min: 10, max: 15 }, typical: 12 },
  { value: 'france', label: 'France', tipRange: { min: 0, max: 5 }, typical: 0 },
  { value: 'germany', label: 'Germany', tipRange: { min: 5, max: 10 }, typical: 5 },
  { value: 'spain', label: 'Spain', tipRange: { min: 5, max: 10 }, typical: 5 },
  { value: 'italy', label: 'Italy', tipRange: { min: 5, max: 10 }, typical: 5 },
  { value: 'japan', label: 'Japan', tipRange: { min: 0, max: 0 }, typical: 0 },
  { value: 'china', label: 'China', tipRange: { min: 0, max: 5 }, typical: 0 },
  { value: 'thailand', label: 'Thailand', tipRange: { min: 5, max: 10 }, typical: 10 },
  { value: 'mexico', label: 'Mexico', tipRange: { min: 15, max: 20 }, typical: 15 },
  { value: 'brazil', label: 'Brazil', tipRange: { min: 10, max: 15 }, typical: 10 },
  { value: 'singapore', label: 'Singapore', tipRange: { min: 0, max: 5 }, typical: 0 },
  { value: 'india', label: 'India', tipRange: { min: 5, max: 10 }, typical: 5 },
];

export default function TipCalculator() {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const [billAmount, setBillAmount] = useState('50');
  const [tipPercentage, setTipPercentage] = useState(null);
  const [numberOfPeople, setNumberOfPeople] = useState('1');

  const countryData = COUNTRIES.find((c) => c.value === selectedCountry);
  const finalTipPercentage = tipPercentage !== null ? tipPercentage : countryData.typical;

  const results = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = (bill * finalTipPercentage) / 100;
    const total = bill + tip;
    const perPerson = total / people;

    return {
      bill: bill.toFixed(2),
      tip: tip.toFixed(2),
      total: total.toFixed(2),
      perPerson: perPerson.toFixed(2),
    };
  }, [billAmount, finalTipPercentage, numberOfPeople]);

  const quickButtons = [
    countryData.tipRange.min,
    countryData.typical,
    countryData.tipRange.max,
  ].filter((v, i, arr) => arr.indexOf(v) === i);

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Country
            </label>
            <Select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              options={COUNTRIES.map((c) => ({ value: c.value, label: c.label }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bill Amount
            </label>
            <Input
              type="number"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              placeholder="Enter bill amount"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Number of People
            </label>
            <Input
              type="number"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              placeholder="1"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-3">
              Tip Percentage: <span className="font-mono text-accent">{finalTipPercentage}%</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {quickButtons.map((pct) => (
                <Button
                  key={pct}
                  onClick={() => setTipPercentage(pct)}
                  variant={tipPercentage === pct ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {pct}%
                </Button>
              ))}
              <Button
                onClick={() => setTipPercentage(null)}
                variant={tipPercentage === null ? 'primary' : 'secondary'}
                size="sm"
              >
                Typical ({countryData.typical}%)
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Bill Amount</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {results.bill}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Tip Amount</p>
            <p className="font-mono text-2xl font-semibold text-accent">
              {results.tip}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Total Bill</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {results.total}
            </p>
          </div>
        </Card>

        <Card>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">Per Person</p>
            <p className="font-mono text-2xl font-semibold text-text-primary">
              {results.perPerson}
            </p>
          </div>
        </Card>
      </div>

      <Card>
        <p className="text-sm text-text-secondary">
          In {countryData.label}, tipping typically ranges from {countryData.tipRange.min}% to{' '}
          {countryData.tipRange.max}%.
        </p>
      </Card>
    </div>
  );
}
