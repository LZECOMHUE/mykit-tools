'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const GRADE_SYSTEMS = {
  us: {
    name: 'US GPA (4.0 scale)',
    min: 0,
    max: 4.0,
    step: 0.1,
    description: 'Grade Point Average on 4.0 scale',
    convert: (value) => value,
    parse: (value) => parseFloat(value) || 0,
  },
  uk: {
    name: 'UK University (Percentage)',
    min: 0,
    max: 100,
    step: 1,
    description: 'University degree classification',
    convert: (value) => {
      if (value >= 70) return { grade: 'First Class', percent: '70%+' };
      if (value >= 60) return { grade: 'Upper Second (2:1)', percent: '60-69%' };
      if (value >= 50) return { grade: 'Lower Second (2:2)', percent: '50-59%' };
      if (value >= 40) return { grade: 'Third', percent: '40-49%' };
      return { grade: 'Fail', percent: '<40%' };
    },
    parse: (value) => parseFloat(value) || 0,
  },
  australia: {
    name: 'Australian (Percentage)',
    min: 0,
    max: 100,
    step: 1,
    description: 'Australian tertiary education grades',
    convert: (value) => {
      if (value >= 85) return { grade: 'High Distinction (HD)', percent: '85%+' };
      if (value >= 75) return { grade: 'Distinction (D)', percent: '75-84%' };
      if (value >= 65) return { grade: 'Credit (C)', percent: '65-74%' };
      if (value >= 50) return { grade: 'Pass (P)', percent: '50-64%' };
      return { grade: 'Fail (F)', percent: '<50%' };
    },
    parse: (value) => parseFloat(value) || 0,
  },
  germany: {
    name: 'German (1.0-5.0 scale)',
    min: 1.0,
    max: 5.0,
    step: 0.1,
    description: 'German grade scale (lower is better)',
    convert: (value) => {
      if (value <= 1.5) return { grade: 'Sehr gut (Very Good)', rating: '1.0-1.5' };
      if (value <= 2.5) return { grade: 'Gut (Good)', rating: '1.6-2.5' };
      if (value <= 3.5) return { grade: 'Befriedigend (Satisfactory)', rating: '2.6-3.5' };
      if (value <= 4.0) return { grade: 'Ausreichend (Adequate)', rating: '3.6-4.0' };
      return { grade: 'Fail', rating: '>4.0' };
    },
    parse: (value) => parseFloat(value) || 3.0,
  },
  india: {
    name: 'India (Percentage or CGPA)',
    min: 0,
    max: 100,
    step: 1,
    description: 'Indian percentage or CGPA (multiply by 9.5 for percentage)',
    convert: (value) => {
      if (value >= 90) return { grade: 'O (Outstanding)', percent: '90%+' };
      if (value >= 80) return { grade: 'A+ (Excellent)', percent: '80-89%' };
      if (value >= 70) return { grade: 'A (Very Good)', percent: '70-79%' };
      if (value >= 60) return { grade: 'B+ (Good)', percent: '60-69%' };
      if (value >= 50) return { grade: 'B (Average)', percent: '50-59%' };
      if (value >= 40) return { grade: 'C (Below Average)', percent: '40-49%' };
      return { grade: 'F (Fail)', percent: '<40%' };
    },
    parse: (value) => parseFloat(value) || 0,
  },
  france: {
    name: 'French (20-point scale)',
    min: 0,
    max: 20,
    step: 0.5,
    description: 'French grading system out of 20',
    convert: (value) => {
      if (value >= 16) return { grade: 'Tres bien (Very Good)', rating: '16-20' };
      if (value >= 14) return { grade: 'Bien (Good)', rating: '14-15.9' };
      if (value >= 12) return { grade: 'Assez bien (Satisfactory)', rating: '12-13.9' };
      if (value >= 10) return { grade: 'Passable (Pass)', rating: '10-11.9' };
      return { grade: 'Fail', rating: '<10' };
    },
    parse: (value) => parseFloat(value) || 10,
  },
  canada: {
    name: 'Canadian GPA (4.0 scale)',
    min: 0,
    max: 4.0,
    step: 0.1,
    description: 'Similar to US GPA system',
    convert: (value) => value,
    parse: (value) => parseFloat(value) || 0,
  },
};

export default function GradeConversionTool() {
  const [inputSystem, setInputSystem] = useState('us');
  const [inputValue, setInputValue] = useState('3.5');
  const [result, setResult] = useState(null);

  const systemOptions = Object.entries(GRADE_SYSTEMS).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));

  function getEquivalences(fromSystem, value) {
    const conversions = {};

    // Convert from input system to percentage first
    let percentage = 0;

    if (fromSystem === 'us' || fromSystem === 'canada') {
      percentage = (value / 4.0) * 100;
    } else if (fromSystem === 'germany') {
      percentage = ((5.0 - value) / 4.0) * 100;
    } else if (fromSystem === 'france') {
      percentage = (value / 20) * 100;
    } else if (fromSystem === 'india') {
      percentage = value;
    } else {
      percentage = value;
    }

    // Now convert to all systems
    conversions.us = (percentage / 100) * 4.0;
    conversions.canada = conversions.us;
    conversions.germany = 5.0 - (percentage / 100) * 4.0;
    conversions.france = (percentage / 100) * 20;
    conversions.india = percentage;

    conversions.uk = percentage;
    conversions.australia = percentage;

    return conversions;
  }

  function calculate() {
    const system = GRADE_SYSTEMS[inputSystem];
    const parsedValue = system.parse(inputValue);

    const conversions = getEquivalences(inputSystem, parsedValue);

    const ukGrade = system === GRADE_SYSTEMS.uk ? system.convert(parsedValue) : GRADE_SYSTEMS.uk.convert(conversions.uk);
    const ausGrade = system === GRADE_SYSTEMS.australia ? system.convert(parsedValue) : GRADE_SYSTEMS.australia.convert(conversions.australia);
    const germanGrade = system === GRADE_SYSTEMS.germany ? system.convert(parsedValue) : GRADE_SYSTEMS.germany.convert(conversions.germany);
    const indianGrade = system === GRADE_SYSTEMS.india ? system.convert(parsedValue) : GRADE_SYSTEMS.india.convert(conversions.india);
    const frenchGrade = system === GRADE_SYSTEMS.france ? system.convert(parsedValue) : GRADE_SYSTEMS.france.convert(conversions.france);

    setResult({
      inputSystem: GRADE_SYSTEMS[inputSystem].name,
      inputValue: parsedValue,
      equivalences: {
        us: conversions.us.toFixed(2),
        canada: conversions.canada.toFixed(2),
        uk: ukGrade,
        australia: ausGrade,
        germany: germanGrade.toFixed(2),
        france: conversions.france.toFixed(2),
        india: indianGrade,
      },
      percentage: conversions.us ? ((conversions.us / 4.0) * 100).toFixed(1) : 0,
    });
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      <Card>
        <h2 className="font-heading text-2xl font-bold text-primary mb-2">
          International Grade Converter
        </h2>
        <p className="text-secondary text-sm mb-4">
          Convert your grades from one country's system to another
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Grade System
            </label>
            <Select
              options={systemOptions}
              value={inputSystem}
              onChange={(e) => {
                setInputSystem(e.target.value);
                setInputValue(
                  GRADE_SYSTEMS[e.target.value].min === 0
                    ? '50'
                    : GRADE_SYSTEMS[e.target.value].name.includes('4.0')
                      ? '3.5'
                      : GRADE_SYSTEMS[e.target.value].min.toString()
                );
              }}
            />
            <p className="text-xs text-secondary mt-1">
              {GRADE_SYSTEMS[inputSystem].description}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Your Grade
            </label>
            <div className="relative">
              <Input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter grade"
                min={GRADE_SYSTEMS[inputSystem].min}
                max={GRADE_SYSTEMS[inputSystem].max}
                step={GRADE_SYSTEMS[inputSystem].step}
              />
              <p className="text-xs text-secondary mt-1">
                Range: {GRADE_SYSTEMS[inputSystem].min} to {GRADE_SYSTEMS[inputSystem].max}
              </p>
            </div>
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Convert Grade
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-4">
          {/* Percentage Overview */}
          <Card className="bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Your Grade Overview
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-secondary text-sm mb-1">Input System</p>
                <p className="font-mono text-lg font-bold text-primary">
                  {result.inputSystem}
                </p>
              </div>

              <div>
                <p className="text-secondary text-sm mb-1">Your Grade</p>
                <p className="font-mono text-lg font-bold text-accent">
                  {typeof result.inputValue === 'number'
                    ? result.inputValue.toFixed(2)
                    : result.inputValue}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-secondary text-sm mb-1">Approximate Percentage</p>
                <div className="flex items-baseline gap-2">
                  <p className="font-mono text-3xl font-bold text-accent">{result.percentage}%</p>
                  <p className="text-secondary text-sm">
                    (approximate equivalent across most systems)
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Conversion Table */}
          <Card>
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              Equivalent Grades in Other Systems
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* US GPA */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">US GPA (4.0 scale)</p>
                  <p className="font-mono text-2xl font-bold text-primary">
                    {result.equivalences.us}
                  </p>
                  <p className="text-xs text-secondary mt-2">
                    {result.equivalences.us >= 3.8
                      ? 'Excellent - Ivy League competitive'
                      : result.equivalences.us >= 3.5
                        ? 'Very Good - Top universities'
                        : result.equivalences.us >= 3.0
                          ? 'Good - Competitive'
                          : 'Pass'}
                  </p>
                </div>

                {/* Canadian GPA */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">Canadian GPA (4.0 scale)</p>
                  <p className="font-mono text-2xl font-bold text-primary">
                    {result.equivalences.canada}
                  </p>
                </div>

                {/* UK */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">UK University</p>
                  <p className="font-mono text-lg font-bold text-primary mb-1">
                    {typeof result.equivalences.uk === 'object'
                      ? result.equivalences.uk.grade
                      : result.equivalences.uk}
                  </p>
                  {typeof result.equivalences.uk === 'object' && (
                    <p className="text-xs text-secondary">
                      {result.equivalences.uk.percent}
                    </p>
                  )}
                </div>

                {/* Australia */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">Australian</p>
                  <p className="font-mono text-lg font-bold text-primary mb-1">
                    {typeof result.equivalences.australia === 'object'
                      ? result.equivalences.australia.grade
                      : result.equivalences.australia}
                  </p>
                  {typeof result.equivalences.australia === 'object' && (
                    <p className="text-xs text-secondary">
                      {result.equivalences.australia.percent}
                    </p>
                  )}
                </div>

                {/* Germany */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">German (1.0-5.0)</p>
                  <p className="font-mono text-lg font-bold text-primary mb-1">
                    {typeof result.equivalences.germany === 'object'
                      ? result.equivalences.germany.grade
                      : result.equivalences.germany}
                  </p>
                  {typeof result.equivalences.germany === 'object' && (
                    <p className="text-xs text-secondary">
                      {result.equivalences.germany.rating}
                    </p>
                  )}
                </div>

                {/* France */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">French (0-20)</p>
                  <p className="font-mono text-lg font-bold text-primary mb-1">
                    {typeof result.equivalences.france === 'object'
                      ? result.equivalences.france.grade
                      : result.equivalences.france}
                  </p>
                  {typeof result.equivalences.france === 'object' && (
                    <p className="text-xs text-secondary">
                      {result.equivalences.france.rating}
                    </p>
                  )}
                </div>

                {/* India */}
                <div className="border border-border rounded-lg p-4">
                  <p className="text-secondary text-sm font-bold mb-2">Indian</p>
                  <p className="font-mono text-lg font-bold text-primary mb-1">
                    {typeof result.equivalences.india === 'object'
                      ? result.equivalences.india.grade
                      : result.equivalences.india}
                  </p>
                  {typeof result.equivalences.india === 'object' && (
                    <p className="text-xs text-secondary">
                      {result.equivalences.india.percent}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Interpretation Guide */}
          <Card className="bg-blue-50 border-2 border-blue-200">
            <h3 className="font-heading text-lg font-bold text-primary mb-4">
              Interpretation Guide
            </h3>

            <div className="space-y-3 text-sm">
              <div>
                <p className="font-bold text-primary mb-1">Percentage Range:</p>
                <p className="text-secondary">
                  Your grade is approximately {result.percentage}% on a 0-100 scale
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Important Notes:</p>
                <ul className="text-secondary list-disc list-inside space-y-1">
                  <li>Conversions are approximate - grading systems have different philosophies</li>
                  <li>German grades are inverted (1 is best, 5 is worst)</li>
                  <li>Some universities may use different conversion formulas</li>
                  <li>Always check with your target institution for their specific conversion method</li>
                  <li>GPA calculations vary by institution and program</li>
                </ul>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">For International Applications:</p>
                <p className="text-secondary">
                  When applying to universities abroad, provide both your original grade and an
                  equivalent, or request an official conversion from your institution.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
