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

export default function ConceptionDateCalculator() {
  const [inputType, setInputType] = useState('lmp');
  const [date, setDate] = useState('');
  const [results, setResults] = useState(null);

  const calculateConception = () => {
    if (!date) return;

    const baseDate = parseDate(date);
    if (isNaN(baseDate)) return;

    let conceptionDate;
    let implantationStart;
    let implantationEnd;

    if (inputType === 'lmp') {
      // LMP + 14 days = conception
      conceptionDate = new Date(baseDate);
      conceptionDate.setDate(conceptionDate.getDate() + 14);
    } else {
      // Due date - 266 days = conception (or 280 - 14)
      conceptionDate = new Date(baseDate);
      conceptionDate.setDate(conceptionDate.getDate() - 266);
    }

    implantationStart = new Date(conceptionDate);
    implantationStart.setDate(implantationStart.getDate() + 6);

    implantationEnd = new Date(conceptionDate);
    implantationEnd.setDate(implantationEnd.getDate() + 12);

    setResults({
      conceptionDate,
      implantationStart,
      implantationEnd,
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

  const getDaysDifference = (futureDate) => {
    const today = new Date();
    const diff = Math.ceil((futureDate - today) / (1000 * 60 * 60 * 24));
    if (diff < 0) return `${Math.abs(diff)} days ago`;
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
              label="Calculate From"
              options={[
                { value: 'lmp', label: 'Last Menstrual Period (LMP)' },
                { value: 'duedate', label: 'Due Date' },
              ]}
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
            />
          </div>

          <div>
            <Input
              type="date"
              label={inputType === 'lmp' ? 'Last Menstrual Period Date' : 'Due Date'}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <Button onClick={calculateConception} className="w-full">
            Calculate Conception Date
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-5">
              <div>
                <p className="text-secondary text-sm mb-1">Estimated Conception Date</p>
                <p className="font-mono text-lg font-semibold text-primary">
                  {formatDate(results.conceptionDate)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  {getDaysDifference(results.conceptionDate)}
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-sm mb-1">Implantation Window</p>
                <p className="font-mono text-base font-semibold text-primary">
                  {formatDate(results.implantationStart)} to {formatDate(results.implantationEnd)}
                </p>
                <p className="text-secondary text-sm mt-2">
                  Implantation typically occurs 6 to 12 days after conception
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-secondary text-sm">
                  <span className="font-semibold text-primary">Most Likely Implantation:</span> {formatDate(new Date(results.conceptionDate.getTime() + 9 * 24 * 60 * 60 * 1000))}
                </p>
              </div>
            </div>
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
