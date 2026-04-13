'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function CatAgeCalculator() {
  const [catAge, setCatAge] = useState('3');
  const [lifestyle, setLifestyle] = useState('indoor');

  const lifestyleOptions = [
    { value: 'indoor', label: 'Indoor only' },
    { value: 'outdoor', label: 'Outdoor/Indoor' },
  ];

  const calculateAge = useMemo(() => {
    const years = parseFloat(catAge) || 0;

    let humanYears;

    if (years <= 1) {
      humanYears = years * 15;
    } else if (years <= 2) {
      humanYears = 15 + (years - 1) * 9;
    } else {
      humanYears = 24 + (years - 2) * 4;
    }

    // Determine life stage
    let lifeStage;
    if (humanYears < 18) {
      lifeStage = 'Kitten';
    } else if (humanYears < 35) {
      lifeStage = 'Young Adult';
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
  }, [catAge]);

  const getHealthNotes = () => {
    const stage = calculateAge.lifeStage;

    const notes = {
      Kitten: [
        'Vaccinations complete by 16 weeks',
        'Start training and socialization',
        'Play daily for exercise and bonding',
        'Check for fleas and parasites monthly'
      ],
      'Young Adult': [
        'Annual vet checkups',
        'Keep play sessions active and engaging',
        'Monitor weight and diet',
        'Continue vaccinations as scheduled'
      ],
      Adult: [
        'Annual vet checkups',
        'Maintain healthy weight',
        'Regular dental care',
        'Environmental enrichment important'
      ],
      Senior: [
        'Vet checkups twice yearly',
        'Monitor for kidney disease signs',
        'Senior food formula',
        'Comfort: easy access litter box, softer bedding'
      ]
    };

    return notes[stage] || [];
  };

  const getLifestyleInfo = () => {
    if (lifestyle === 'outdoor') {
      return [
        'Ensure vaccinations are current',
        'Consider microchipping for safety',
        'Regular parasite prevention',
        'Provide shelter and escape routes from dangers'
      ];
    }
    return [
      'Provide vertical spaces for climbing',
      'Enrichment toys and scratching posts',
      'Window perches for bird watching',
      'Regular playtime to prevent boredom'
    ];
  };

  return (
    <Card>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Cat's age (years)
            </label>
            <Input
              type="number"
              value={catAge}
              onChange={(e) => setCatAge(e.target.value)}
              placeholder="e.g. 3"
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Lifestyle
            </label>
            <Select
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value)}
              options={lifestyleOptions}
            />
          </div>
        </div>

        {parseFloat(catAge) >= 0 && (
          <div className="space-y-4">
            <div className="p-4 bg-accent-muted border border-accent rounded-lg">
              <p className="text-sm text-secondary mb-1">Human equivalent age</p>
              <p className="font-mono text-4xl font-bold text-accent">
                {calculateAge.humanYears}
              </p>
              <p className="text-sm text-secondary mt-2">
                Your cat is {calculateAge.years} cat-years old
              </p>
            </div>

            <div className="p-4 bg-pink-50 border border-pink-200 rounded-lg">
              <p className="text-sm font-medium text-pink-700 mb-1">Life stage</p>
              <p className="font-heading text-2xl font-bold text-pink-600">
                {calculateAge.lifeStage}
              </p>
            </div>

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                Health reminders for {calculateAge.lifeStage}s
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

            <div>
              <h3 className="font-heading text-lg font-semibold text-primary mb-3">
                {lifestyle === 'outdoor' ? 'Outdoor cat care' : 'Indoor cat care'}
              </h3>
              <ul className="space-y-2">
                {getLifestyleInfo().map((note, idx) => (
                  <li key={idx} className="flex gap-2 text-sm text-primary">
                    <span className="font-bold text-green-600">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-purple-50 text-purple-700 rounded-lg text-sm">
              <p className="font-medium mb-1">Senior care tip:</p>
              <p className="text-xs">
                Senior cats (over 60 in human years) often develop kidney disease. Watch for
                increased thirst or bathroom visits and visit the vet every 6 months.
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
