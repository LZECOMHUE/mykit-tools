'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

const parseDate = (dateStr) => {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-');
  return new Date(y, m - 1, d);
};

export default function ImplantationCalculator() {
  const [inputType, setInputType] = useState('ovulation');
  const [date, setDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);

  const calculateImplantation = () => {
    if (!date) return;

    const baseDate = parseDate(date);
    if (isNaN(baseDate)) return;

    let ovulationDate;

    if (inputType === 'ovulation') {
      ovulationDate = new Date(baseDate);
    } else {
      // LMP + (cycle length - 14) = ovulation
      ovulationDate = new Date(baseDate);
      ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
    }

    // Implantation window: 6-12 days post ovulation
    const implantationStart = new Date(ovulationDate);
    implantationStart.setDate(implantationStart.getDate() + 6);

    const implantationEnd = new Date(ovulationDate);
    implantationEnd.setDate(implantationEnd.getDate() + 12);

    // Most likely implantation: 9 days post ovulation
    const mostLikelyImplantation = new Date(ovulationDate);
    mostLikelyImplantation.setDate(mostLikelyImplantation.getDate() + 9);

    // Earliest symptoms: can start right after implantation
    const earliestSymptoms = new Date(implantationStart);

    setResults({
      ovulationDate,
      implantationStart,
      implantationEnd,
      mostLikelyImplantation,
      earliestSymptoms,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getDaysUntil = (futureDate) => {
    const today = new Date();
    const diff = Math.ceil((futureDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return null;
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    return `in ${diff} days`;
  };

  const renderTimeline = () => {
    if (!results) return null;

    const events = [
      { label: 'Ovulation', date: results.ovulationDate, color: 'bg-yellow-100' },
      { label: 'Implantation Starts', date: results.implantationStart, color: 'bg-green-100' },
      { label: 'Most Likely Implantation', date: results.mostLikelyImplantation, color: 'bg-blue-100' },
      { label: 'Implantation Ends', date: results.implantationEnd, color: 'bg-green-100' },
      { label: 'Earliest Symptoms Possible', date: results.earliestSymptoms, color: 'bg-purple-100' },
    ];

    return (
      <div className="mt-6 p-4 bg-surface rounded-lg">
        <h3 className="font-heading font-bold mb-4">Implantation Timeline</h3>
        <div className="space-y-3">
          {events.map((event, idx) => (
            <div key={idx} className="flex gap-3">
              <div className={`w-24 h-24 flex items-center justify-center rounded text-xs font-mono font-bold flex-shrink-0 ${event.color}`}>
                <div className="text-center">
                  <p className="text-xs mb-1">DPO</p>
                  <p>{Math.floor((event.date - results.ovulationDate) / (1000 * 60 * 60 * 24))}</p>
                </div>
              </div>
              <div className="flex-1 py-2">
                <p className="font-semibold text-primary">{event.label}</p>
                <p className="text-secondary text-sm">{formatDate(event.date)}</p>
                {getDaysUntil(event.date) && (
                  <p className="text-secondary text-xs mt-1">{getDaysUntil(event.date)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <Select
              label="I Know My"
              options={[
                { value: 'ovulation', label: 'Ovulation Date' },
                { value: 'lmp', label: 'Last Menstrual Period (LMP)' },
              ]}
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            />
          </div>

          <div>
            <Input
              type="date"
              label={inputType === 'ovulation' ? 'Ovulation Date' : 'Last Menstrual Period Date'}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          {inputType === 'lmp' && (
            <div>
              <Select
                label="Average Cycle Length (days)"
                options={Array.from({ length: 25 }, (_, i) => ({
                  value: 21 + i,
                  label: (21 + i).toString(),
                }))}
                value={cycleLength.toString()}
                onChange={(e) => setCycleLength(parseInt(e.target.value))}
              />
            </div>
          )}

          <Button onClick={calculateImplantation} className="w-full">
            Calculate Implantation Dates
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-5">
              <div>
                <p className="text-secondary text-sm mb-1">Implantation Window</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.implantationStart)} to {formatDate(results.implantationEnd)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  The 7-day window when a fertilised egg typically burrows into the uterine lining
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-sm mb-1">Most Likely Implantation Date</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.mostLikelyImplantation)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Peak implantation occurs around 9 days after ovulation
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-sm mb-1">Earliest Pregnancy Symptoms Possible</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.earliestSymptoms)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  hCG production begins after implantation, so early symptoms (if present) may start here
                </p>
              </div>
            </div>
          </Card>

          {renderTimeline()}

          <Card className="bg-blue-50 border border-blue-200">
            <p className="text-secondary text-sm">
              <span className="font-semibold text-primary">Note:</span> Not all pregnancies show early symptoms. Implantation can occur anywhere in the 6-12 day window, so use these dates as estimates only.
            </p>
          </Card>
        </div>
      )}

      <Card className="bg-blue-50 border border-blue-200">
        <Badge>Disclaimer</Badge>
        <p className="text-secondary text-sm mt-2">
          This tool is for informational purposes only and should not replace professional medical advice.
          Always consult your healthcare provider for medical decisions.
        </p>
      </Card>
    </div>
  );
}
