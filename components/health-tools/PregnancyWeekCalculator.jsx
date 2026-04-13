'use client';

import { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function PregnancyWeekCalculator() {
  const [inputType, setInputType] = useState('lmp');
  const [date, setDate] = useState('');
  const [results, setResults] = useState(null);

  const babySize = {
    0: { name: 'Conception', size: 'Not yet visible' },
    4: { name: 'Poppy seed', size: '0.3 mm' },
    5: { name: 'Apple seed', size: '1 mm' },
    6: { name: 'Lentil', size: '4 mm' },
    7: { name: 'Blueberry', size: '8 mm' },
    8: { name: 'Raspberry', size: '16 mm' },
    9: { name: 'Grape', size: '23 mm' },
    10: { name: 'Prune', size: '30 mm' },
    12: { name: 'Lime', size: '54 mm' },
    14: { name: 'Lemon', size: '86 mm' },
    16: { name: 'Avocado', size: '120 mm' },
    18: { name: 'Bell pepper', size: '140 mm' },
    20: { name: 'Banana', size: '165 mm' },
    22: { name: 'Papaya', size: '190 mm' },
    24: { name: 'Corn', size: '210 mm' },
    26: { name: 'Courgette', size: '240 mm' },
    28: { name: 'Aubergine', size: '240 mm' },
    30: { name: 'Cabbage', size: '270 mm' },
    32: { name: 'Butternut squash', size: '280 mm' },
    34: { name: 'Cantaloupe', size: '300 mm' },
    36: { name: 'Grapefruit', size: '330 mm' },
    38: { name: 'Pumpkin', size: '350 mm' },
    40: { name: 'Watermelon', size: '360 mm' },
  };

  const milestones = {
    8: 'Heartbeat visible on ultrasound',
    12: 'Nuchal translucency scan, dating scan, sex may be determinable',
    14: 'Movement may be felt by mother',
    16: 'Sex can usually be determined',
    20: 'Anomaly scan, anatomy scan',
    24: 'Viability point - baby could potentially survive with medical support',
    28: 'Third trimester begins',
    36: 'Full term status approaching',
    40: 'Due date',
  };

  const calculatePregnancy = () => {
    if (!date) return;

    const baseDate = new Date(date);
    if (isNaN(baseDate)) return;

    let dueDate;
    if (inputType === 'lmp') {
      dueDate = new Date(baseDate);
      dueDate.setDate(dueDate.getDate() + 280);
    } else {
      // Due date provided
      dueDate = new Date(baseDate);
    }

    const today = new Date();
    let lmpDate;

    if (inputType === 'lmp') {
      lmpDate = new Date(baseDate);
    } else {
      lmpDate = new Date(dueDate);
      lmpDate.setDate(lmpDate.getDate() - 280);
    }

    const weeksPregnant = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24 * 7));
    const daysIntoWeek = Math.floor(((today - lmpDate) / (1000 * 60 * 60 * 24)) % 7);
    const totalDaysPregnant = Math.floor((today - lmpDate) / (1000 * 60 * 60 * 24));

    const daysRemaining = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
    const progressPercent = Math.min(100, Math.max(0, ((totalDaysPregnant / 280) * 100)));

    let trimester = 1;
    if (weeksPregnant >= 13) trimester = 2;
    if (weeksPregnant >= 28) trimester = 3;

    const closestWeekMilestone = Object.keys(babySize)
      .map(Number)
      .reverse()
      .find(w => w <= weeksPregnant);

    setResults({
      weeksPregnant,
      daysIntoWeek,
      totalDaysPregnant,
      dueDate,
      daysRemaining,
      progressPercent,
      trimester,
      closestWeekMilestone: closestWeekMilestone || 0,
      lmpDate,
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

  const getTrimesterName = (trimester) => {
    if (trimester === 1) return '1st Trimester';
    if (trimester === 2) return '2nd Trimester';
    return '3rd Trimester';
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

          <Button onClick={calculatePregnancy} className="w-full">
            Calculate Pregnancy Week
          </Button>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-secondary text-sm mb-2">You are</p>
                <p className="font-mono text-5xl font-bold text-primary">
                  {results.weeksPregnant}
                </p>
                <p className="font-mono text-lg text-secondary">
                  weeks {results.daysIntoWeek} days
                </p>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">{getTrimesterName(results.trimester)}</p>
                  <Badge>{results.progressPercent.toFixed(0)}%</Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-accent h-3 rounded-full transition-all duration-300"
                    style={{ width: `${results.progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div>
                  <p className="text-secondary text-xs font-semibold mb-1">DUE DATE</p>
                  <p className="font-mono text-sm font-semibold text-primary">
                    {formatDate(results.dueDate)}
                  </p>
                </div>
                <div>
                  <p className="text-secondary text-xs font-semibold mb-1">DAYS REMAINING</p>
                  <p className="font-mono text-sm font-semibold text-primary">
                    {Math.max(0, results.daysRemaining)} days
                  </p>
                </div>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading font-bold mb-3">Baby Size</h3>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="font-mono text-2xl font-bold text-primary">
                  {babySize[results.closestWeekMilestone]?.name}
                </p>
                <p className="text-secondary text-sm">
                  {babySize[results.closestWeekMilestone]?.size}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="font-heading font-bold mb-3">Key Milestones</h3>
            <div className="space-y-2 text-sm">
              {results.weeksPregnant >= 8 && (
                <p className="text-secondary">
                  <span className="font-semibold text-primary">Week 8:</span> Heartbeat visible on ultrasound
                </p>
              )}
              {results.weeksPregnant >= 12 && (
                <p className="text-secondary">
                  <span className="font-semibold text-primary">Week 12:</span> Nuchal translucency scan, dating scan
                </p>
              )}
              {results.weeksPregnant >= 20 && (
                <p className="text-secondary">
                  <span className="font-semibold text-primary">Week 20:</span> Anomaly scan, anatomy scan
                </p>
              )}
              {results.weeksPregnant >= 28 && (
                <p className="text-secondary">
                  <span className="font-semibold text-primary">Week 28:</span> Third trimester begins
                </p>
              )}
              {results.weeksPregnant < 40 && (
                <p className="text-secondary">
                  <span className="font-semibold text-primary">Week 40:</span> Due date
                </p>
              )}
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
