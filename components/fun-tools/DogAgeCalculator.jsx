'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function DogAgeCalculator() {
  const [dogAge, setDogAge] = useState('3');
  const [size, setSize] = useState('medium');

  const sizeOptions = [
    { value: 'small', label: 'Small (under 9kg)' },
    { value: 'medium', label: 'Medium (9-23kg)' },
    { value: 'large', label: 'Large (23-40kg)' },
    { value: 'giant', label: 'Giant (over 40kg)' },
  ];

  const calculateAge = useMemo(() => {
    const years = parseFloat(dogAge) || 0;

    let humanYears;

    if (years <= 1) {
      humanYears = years * 15;
    } else if (years <= 2) {
      humanYears = 15 + (years - 1) * 9;
    } else {
      let additionalYears;
      switch (size) {
        case 'small':
          additionalYears = (years - 2) * 4;
          break;
        case 'medium':
          additionalYears = (years - 2) * 7;
          break;
        case 'large':
          additionalYears = (years - 2) * 6;
          break;
        case 'giant':
          additionalYears = (years - 2) * 7.5;
          break;
        default:
          additionalYears = 0;
      }
      humanYears = 24 + additionalYears;
    }

    // Determine life stage
    let lifeStage;
    if (humanYears < 18) {
      lifeStage = 'Puppy';
    } else if (humanYears < 35) {
      lifeStage = 'Junior';
    } else if (humanYears < 60) {
      lifeStage = 'Adult';
    } else {
      lifeStage = 'Senior';
    }

    return {
      humanYears: humanYears.toFixed(1),
      lifeStage,
      years: years.toFixed(1)
    };
  }, [dogAge, size]);

  const getHealthNotes = () => {
    const stage = calculateAge.lifeStage;

    const notes = {
      Puppy: [
        'Schedule vaccinations and microchipping',
        'Start puppy training early',
        'Use puppy-specific food',
        'Regular vet checkups every 3-4 weeks'
      ],
      Junior: [
        'Continue training and socialization',
        'Maintain regular exercise',
        'Annual vet checkups',
        'Professional grooming as needed'
      ],
      Adult: [
        'Annual vet checkups',
        'Maintain healthy weight',
        'Regular exercise and mental stimulation',
        'Dental care routine'
      ],
      Senior: [
        'Vet checkups every 6 months',
        'Adjusted diet for senior dogs',
        'Mobility support if needed',
        'Pain management for arthritis'
      ]
    };

    return notes[stage] || [];
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Dog's age (years)
            </label>
            <Input
              type="number"
              value={dogAge}
              onChange={(e) => setDogAge(e.target.value)}
              placeholder="e.g. 3"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Dog size
            </label>
            <Select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              options={sizeOptions}
            />
          </div>
        </div>

        {parseFloat(dogAge) >= 0 && (
          <div className="space-y-4">
            <div className="p-4 bg-accent-muted border border-accent rounded-lg">
              <p className="text-sm text-secondary mb-1">Human equivalent age</p>
              <p className="font-mono text-4xl font-bold text-accent">
                {calculateAge.humanYears}
              </p>
              <p className="text-sm text-secondary mt-2">
                Your dog is {calculateAge.years} dog-years old
              </p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm font-medium text-blue-700 mb-1">Life stage</p>
              <p className="font-heading text-2xl font-bold text-blue-600">
                {calculateAge.lifeStage}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                Health checkup reminders for {calculateAge.lifeStage}s
              </h3>
              <ul className="space-y-2">
                {getHealthNotes().map((note, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-primary">
                    <span className="font-bold text-accent">✓</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-purple-50 text-purple-700 rounded-lg text-sm">
              <p className="font-medium mb-1">Age conversion note:</p>
              <p className="text-xs">
                The formula used: first year = 15 human years, second = 9, then varies by size.
                This is more accurate than the old "7 dog years" rule.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
