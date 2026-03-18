'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function CanadaImmigrationPointsCalculator() {
  const [config, setConfig] = useState({
    age: '28',
    education: 'bachelor',
    firstLanguage: 'clb9',
    canadianExperience: '0',
    foreignExperience: '0',
    arrangedEmployment: false,
    provincialNomination: false,
    hasSpouse: false,
    spouseEducation: 'high-school',
    spouseLanguage: 'clb4',
    spouseCanadianExperience: '0',
  });

  const educationPoints = {
    'none': 0,
    'high-school': 30,
    '1-year-diploma': 50,
    '2-year-diploma': 64,
    'bachelor': 84,
    'two-degrees': 132,
    'master': 140,
    'phd': 150,
  };

  const languageClbPoints = {
    'clb4': 6,
    'clb5': 8,
    'clb6': 12,
    'clb7': 16,
    'clb8': 20,
    'clb9': 24,
    'clb10': 28,
    'clb11': 32,
    'clb12': 36,
  };

  const results = useMemo(() => {
    const age = parseInt(config.age);
    let agePoints = 0;
    if (age >= 20 && age <= 29) agePoints = 110;
    else if (age >= 30 && age <= 34) agePoints = 108;
    else if (age >= 35 && age <= 39) agePoints = 100;
    else if (age >= 40 && age <= 44) agePoints = 90;
    else if (age >= 45) agePoints = 0;
    else if (age < 20) agePoints = 0;

    const educationPts = educationPoints[config.education] || 0;
    const languagePts = languageClbPoints[config.firstLanguage] || 0;

    const canadianExpYears = parseInt(config.canadianExperience);
    const canadianExpPts = canadianExpYears === 0 ? 0 : canadianExpYears === 1 ? 15 : canadianExpYears === 2 ? 25 : canadianExpYears === 3 ? 35 : canadianExpYears >= 4 ? 40 : 0;

    const foreignExpYears = parseInt(config.foreignExperience);
    const foreignExpPts = foreignExpYears === 0 ? 0 : foreignExpYears === 1 ? 15 : foreignExpYears === 2 ? 25 : foreignExpYears >= 3 ? 35 : 0;

    const subtotal = agePoints + educationPts + languagePts + canadianExpPts + foreignExpPts;

    let total = subtotal;
    if (config.arrangedEmployment) total += 50;
    if (config.provincialNomination) total += 600;

    // Spouse points (if applicable)
    let spousePoints = 0;
    if (config.hasSpouse) {
      const spouseEdu = educationPoints[config.spouseEducation] || 0;
      const spouseLang = languageClbPoints[config.spouseLanguage] || 0;
      const spouseExpYears = parseInt(config.spouseCanadianExperience);
      const spouseExp = spouseExpYears === 0 ? 0 : spouseExpYears === 1 ? 5 : spouseExpYears >= 2 ? 10 : 0;
      spousePoints = spouseEdu + spouseLang + spouseExp;
    }

    const finalScore = total + spousePoints;

    let likelihood = 'High';
    if (finalScore < 350) likelihood = 'Low';
    else if (finalScore < 420) likelihood = 'Moderate';
    else if (finalScore < 470) likelihood = 'Good';

    return {
      agePoints,
      educationPts,
      languagePts,
      canadianExpPts,
      foreignExpPts,
      arrangedEmploymentPts: config.arrangedEmployment ? 50 : 0,
      provincialNominationPts: config.provincialNomination ? 600 : 0,
      spousePoints,
      finalScore,
      likelihood,
    };
  }, [config]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Your Information
        </h2>

        <div className="space-y-4">
          <Select
            label="Age"
            value={config.age}
            onChange={(e) => setConfig({ ...config, age: e.target.value })}
            options={[
              { value: '17', label: '17' },
              { value: '20', label: '20-29 (highest points)' },
              { value: '28', label: '28' },
              { value: '30', label: '30-34' },
              { value: '35', label: '35-39' },
              { value: '40', label: '40-44' },
              { value: '45', label: '45+' },
            ]}
          />

          <Select
            label="Education Level"
            value={config.education}
            onChange={(e) => setConfig({ ...config, education: e.target.value })}
            options={[
              { value: 'none', label: 'No formal education' },
              { value: 'high-school', label: 'High school diploma' },
              { value: '1-year-diploma', label: '1-year diploma' },
              { value: '2-year-diploma', label: '2-year diploma' },
              { value: 'bachelor', label: "Bachelor's degree" },
              { value: 'two-degrees', label: 'Two or more degrees' },
              { value: 'master', label: "Master's degree" },
              { value: 'phd', label: 'PhD or equivalent' },
            ]}
          />

          <Select
            label="First Language (CLB Level)"
            value={config.firstLanguage}
            onChange={(e) => setConfig({ ...config, firstLanguage: e.target.value })}
            options={[
              { value: 'clb4', label: 'CLB 4 (basic)' },
              { value: 'clb5', label: 'CLB 5' },
              { value: 'clb6', label: 'CLB 6' },
              { value: 'clb7', label: 'CLB 7' },
              { value: 'clb8', label: 'CLB 8' },
              { value: 'clb9', label: 'CLB 9 (IELTS ~6.5)' },
              { value: 'clb10', label: 'CLB 10 (IELTS ~7.5)' },
              { value: 'clb11', label: 'CLB 11' },
              { value: 'clb12', label: 'CLB 12 (native-like)' },
            ]}
          />

          <Select
            label="Canadian Work Experience"
            value={config.canadianExperience}
            onChange={(e) => setConfig({ ...config, canadianExperience: e.target.value })}
            options={[
              { value: '0', label: 'None' },
              { value: '1', label: '1 year' },
              { value: '2', label: '2 years' },
              { value: '3', label: '3 years' },
              { value: '4', label: '4+ years' },
            ]}
          />

          <Select
            label="Foreign Work Experience"
            value={config.foreignExperience}
            onChange={(e) => setConfig({ ...config, foreignExperience: e.target.value })}
            options={[
              { value: '0', label: 'None' },
              { value: '1', label: '1 year' },
              { value: '2', label: '2 years' },
              { value: '3', label: '3+ years' },
            ]}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="arrangedEmployment"
              checked={config.arrangedEmployment}
              onChange={(e) => setConfig({ ...config, arrangedEmployment: e.target.checked })}
              className="w-4 h-4 border border-border rounded accent-accent"
            />
            <label htmlFor="arrangedEmployment" className="text-sm text-primary">
              Have arranged employment in Canada (+50 points)
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="provincialNomination"
              checked={config.provincialNomination}
              onChange={(e) => setConfig({ ...config, provincialNomination: e.target.checked })}
              className="w-4 h-4 border border-border rounded accent-accent"
            />
            <label htmlFor="provincialNomination" className="text-sm text-primary">
              Have provincial nomination (+600 points)
            </label>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                id="hasSpouse"
                checked={config.hasSpouse}
                onChange={(e) => setConfig({ ...config, hasSpouse: e.target.checked })}
                className="w-4 h-4 border border-border rounded accent-accent"
              />
              <label htmlFor="hasSpouse" className="text-sm font-medium text-primary">
                Include spouse/common-law partner
              </label>
            </div>

            {config.hasSpouse && (
              <div className="space-y-4 ml-6 pl-4 border-l-2 border-accent-muted">
                <Select
                  label="Spouse Education"
                  value={config.spouseEducation}
                  onChange={(e) => setConfig({ ...config, spouseEducation: e.target.value })}
                  options={[
                    { value: 'none', label: 'No formal education' },
                    { value: 'high-school', label: 'High school diploma' },
                    { value: '1-year-diploma', label: '1-year diploma' },
                    { value: '2-year-diploma', label: '2-year diploma' },
                    { value: 'bachelor', label: "Bachelor's degree" },
                    { value: 'two-degrees', label: 'Two or more degrees' },
                    { value: 'master', label: "Master's degree" },
                    { value: 'phd', label: 'PhD or equivalent' },
                  ]}
                />

                <Select
                  label="Spouse Language (CLB Level)"
                  value={config.spouseLanguage}
                  onChange={(e) => setConfig({ ...config, spouseLanguage: e.target.value })}
                  options={[
                    { value: 'clb4', label: 'CLB 4' },
                    { value: 'clb5', label: 'CLB 5' },
                    { value: 'clb6', label: 'CLB 6' },
                    { value: 'clb7', label: 'CLB 7' },
                    { value: 'clb8', label: 'CLB 8' },
                    { value: 'clb9', label: 'CLB 9' },
                    { value: 'clb10', label: 'CLB 10' },
                    { value: 'clb11', label: 'CLB 11' },
                    { value: 'clb12', label: 'CLB 12' },
                  ]}
                />

                <Select
                  label="Spouse Canadian Work Experience"
                  value={config.spouseCanadianExperience}
                  onChange={(e) => setConfig({ ...config, spouseCanadianExperience: e.target.value })}
                  options={[
                    { value: '0', label: 'None' },
                    { value: '1', label: '1 year' },
                    { value: '2', label: '2+ years' },
                  ]}
                />
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-accent-muted border border-accent">
        <h2 className="font-heading text-2xl font-bold text-accent mb-2">
          CRS Score: <span className="font-mono">{results.finalScore}</span>
        </h2>
        <p className="text-secondary mb-4">
          Likelihood of invitation: <span className="font-medium text-primary">{results.likelihood}</span>
        </p>
        <p className="text-sm text-secondary">
          Recent draws have been around 470-530 points. Your score will improve with more Canadian experience or a provincial nomination.
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Score Breakdown
        </h2>

        <div className="space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-secondary">Age</span>
            <span className="font-mono font-medium text-primary">{results.agePoints}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-secondary">Education</span>
            <span className="font-mono font-medium text-primary">{results.educationPts}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-secondary">First Language</span>
            <span className="font-mono font-medium text-primary">{results.languagePts}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-secondary">Canadian Work Experience</span>
            <span className="font-mono font-medium text-primary">{results.canadianExpPts}</span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-border">
            <span className="text-secondary">Foreign Work Experience</span>
            <span className="font-mono font-medium text-primary">{results.foreignExpPts}</span>
          </div>

          {results.arrangedEmploymentPts > 0 && (
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-secondary">Arranged Employment</span>
              <span className="font-mono font-medium text-primary">+{results.arrangedEmploymentPts}</span>
            </div>
          )}

          {results.provincialNominationPts > 0 && (
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-secondary">Provincial Nomination</span>
              <span className="font-mono font-medium text-accent font-semibold">+{results.provincialNominationPts}</span>
            </div>
          )}

          {results.spousePoints > 0 && (
            <div className="flex justify-between items-center pb-2 border-b border-border">
              <span className="text-secondary">Spouse Points</span>
              <span className="font-mono font-medium text-primary">+{results.spousePoints}</span>
            </div>
          )}

          <div className="pt-2 flex justify-between items-center">
            <span className="font-medium text-primary">Total</span>
            <span className="font-mono text-lg font-bold text-accent">{results.finalScore}</span>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-blue-50 border border-blue-200">
        <h3 className="font-heading font-semibold text-primary mb-2">Tips to Improve Your Score</h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li>- Gain more Canadian work experience (even 1 year helps significantly)</li>
          <li>- Improve your language skills (each CLB level adds 4-8 points)</li>
          <li>- Get a provincial nomination (adds 600 points instantly)</li>
          <li>- Secure arranged employment (+50 points)</li>
          <li>- Pursue additional education before applying</li>
        </ul>
      </Card>
    </div>
  );
}
