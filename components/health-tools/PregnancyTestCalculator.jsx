'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function PregnancyTestCalculator() {
  const [inputType, setInputType] = useState('lmp');
  const [date, setDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);

  const calculateTestDates = () => {
    if (!date) return;

    const baseDate = new Date(date);
    if (isNaN(baseDate)) return;

    let ovulationDate;
    let missedPeriodDate;

    if (inputType === 'lmp') {
      ovulationDate = new Date(baseDate);
      ovulationDate.setDate(ovulationDate.getDate() + cycleLength - 14);
      missedPeriodDate = new Date(baseDate);
      missedPeriodDate.setDate(missedPeriodDate.getDate() + cycleLength);
    } else {
      // Ovulation date provided
      ovulationDate = new Date(baseDate);
      missedPeriodDate = new Date(baseDate);
      missedPeriodDate.setDate(missedPeriodDate.getDate() + 14);
    }

    // Earliest urine test: 12-14 days after ovulation
    const earliestUrine = new Date(ovulationDate);
    earliestUrine.setDate(earliestUrine.getDate() + 12);

    // Blood test: 6-8 days after ovulation
    const earliestBlood = new Date(ovulationDate);
    earliestBlood.setDate(earliestBlood.getDate() + 6);

    // Most accurate urine: day of missed period or later
    const mostAccurateUrine = new Date(missedPeriodDate);

    setResults({
      earliestUrine,
      earliestBlood,
      mostAccurateUrine,
      missedPeriod: missedPeriodDate,
      ovulationDate,
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

  return (
    <div className="space-y-4">
      <Card>
        <div className="space-y-4">
          <div>
            <Select
              label="I Know My"
              options={[
                { value: 'lmp', label: 'Last Menstrual Period (LMP)' },
                { value: 'ovulation', label: 'Ovulation Date' },
              ]}
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            />
          </div>

          <div>
            <Input
              type="date"
              label={inputType === 'lmp' ? 'Last Menstrual Period Date' : 'Ovulation Date'}
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

          <Button onClick={calculateTestDates} className="w-full">
            Calculate Test Dates
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 p-3 rounded">
                <p className="text-secondary text-xs font-semibold mb-1">BLOOD TEST EARLIEST</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.earliestBlood)}
                </p>
                {getDaysUntil(results.earliestBlood) && (
                  <p className="text-secondary text-sm mt-2">
                    {getDaysUntil(results.earliestBlood)}
                  </p>
                )}
                <p className="text-secondary text-sm mt-2">
                  Most sensitive test type, 6-8 days after ovulation
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 p-3 rounded">
                <p className="text-secondary text-xs font-semibold mb-1">URINE TEST EARLIEST</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.earliestUrine)}
                </p>
                {getDaysUntil(results.earliestUrine) && (
                  <p className="text-secondary text-sm mt-2">
                    {getDaysUntil(results.earliestUrine)}
                  </p>
                )}
                <p className="text-secondary text-sm mt-2">
                  12-14 days after ovulation
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-xs font-semibold mb-1">MOST ACCURATE TEST</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.mostAccurateUrine)}
                </p>
                {getDaysUntil(results.mostAccurateUrine) && (
                  <p className="text-secondary text-sm mt-2">
                    {getDaysUntil(results.mostAccurateUrine)}
                  </p>
                )}
                <p className="text-secondary text-sm mt-2">
                  First day of missed period or later provides most reliable results
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-blue-50 border border-blue-200">
            <p className="text-secondary text-sm">
              Testing too early may result in a false negative. For best results, test with first morning urine which has higher hormone concentration.
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
