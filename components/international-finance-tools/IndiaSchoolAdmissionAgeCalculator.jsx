'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const STATE_CUTOFFS = {
  delhi: { name: 'Delhi', cutoffMonth: 3, cutoffDay: 31, class1Age: 6 },
  maharashtra: { name: 'Maharashtra', cutoffMonth: 2, cutoffDay: 28, class1Age: 6 },
  karnataka: { name: 'Karnataka', cutoffMonth: 5, cutoffDay: 31, class1Age: 6 },
  tamilnadu: { name: 'Tamil Nadu', cutoffMonth: 8, cutoffDay: 31, class1Age: 5 },
  uttar_pradesh: { name: 'Uttar Pradesh', cutoffMonth: 6, cutoffDay: 30, class1Age: 6 },
  west_bengal: { name: 'West Bengal', cutoffMonth: 3, cutoffDay: 31, class1Age: 6 },
  gujarat: { name: 'Gujarat', cutoffMonth: 3, cutoffDay: 31, class1Age: 6 },
  rajasthan: { name: 'Rajasthan', cutoffMonth: 3, cutoffDay: 31, class1Age: 6 },
  punjab: { name: 'Punjab', cutoffMonth: 3, cutoffDay: 31, class1Age: 6 },
  haryana: { name: 'Haryana', cutoffMonth: 3, cutoffDay: 31, class1Age: 6 },
};

function getAgeAt(birthDate, referenceDate) {
  let age = referenceDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = referenceDate.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && referenceDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

export default function IndiaSchoolAdmissionAgeCalculator() {
  const [dob, setDob] = useState('');
  const [state, setState] = useState('delhi');

  const results = useMemo(() => {
    if (!dob) return null;

    try {
      const birthDate = new Date(dob);
      if (isNaN(birthDate)) return null;

      const stateData = STATE_CUTOFFS[state];
      const currentYear = new Date().getFullYear();

      // Calculate cutoff for current and next academic year
      let cutoff1 = new Date(currentYear, stateData.cutoffMonth - 1, stateData.cutoffDay);
      let cutoff2 = new Date(currentYear + 1, stateData.cutoffMonth - 1, stateData.cutoffDay);

      // Determine academic year
      const today = new Date();
      let currentAcademicYear = today >= cutoff1 ? currentYear + 1 : currentYear;
      let currentAcademicYearEnd = currentAcademicYear + 1;

      let nextAcademicYear = currentAcademicYear + 1;
      let nextAcademicYearEnd = nextAcademicYear + 1;

      // Determine current class eligibility
      const ageInCurrentYear = getAgeAt(birthDate, new Date(currentAcademicYear, stateData.cutoffMonth - 1, stateData.cutoffDay));
      let currentClass = 'Nursery';

      if (ageInCurrentYear >= 6) currentClass = 'Class I (Primary)';
      else if (ageInCurrentYear >= 5) currentClass = 'LKG (Upper Kindergarten)';
      else if (ageInCurrentYear >= 4) currentClass = 'UKG (Upper Kindergarten)';
      else if (ageInCurrentYear >= 3) currentClass = 'Nursery';

      // Determine next year class eligibility
      const ageInNextYear = getAgeAt(birthDate, new Date(nextAcademicYear, stateData.cutoffMonth - 1, stateData.cutoffDay));
      let nextClass = 'Nursery';

      if (ageInNextYear >= 6) nextClass = 'Class I (Primary)';
      else if (ageInNextYear >= 5) nextClass = 'LKG (Upper Kindergarten)';
      else if (ageInNextYear >= 4) nextClass = 'UKG (Upper Kindergarten)';
      else if (ageInNextYear >= 3) nextClass = 'Nursery';

      return {
        currentAcademicYear: `${currentAcademicYear}-${currentAcademicYearEnd}`,
        currentClass,
        nextAcademicYear: `${nextAcademicYear}-${nextAcademicYearEnd}`,
        nextClass,
        cutoffDate: new Date(currentAcademicYear, stateData.cutoffMonth - 1, stateData.cutoffDay).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        error: false,
      };
    } catch (err) {
      return null;
    }
  }, [dob, state]);

  const handleReset = () => {
    setDob('');
    setState('delhi');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Child's Date of Birth
            </label>
            <Input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              State
            </label>
            <Select
              value={state}
              onChange={(e) => setState(e.target.value)}
              options={Object.entries(STATE_CUTOFFS).map(([key, data]) => ({
                value: key,
                label: data.name,
              }))}
              className="w-full"
            />
          </div>

          <Button onClick={handleReset} variant="secondary" className="w-full">
            Reset
          </Button>
        </div>
      </Card>

      {results && !results.error && (
        <>
          <Card className="p-6 bg-accent-muted">
            <h3 className="font-heading text-lg font-bold text-primary mb-3">
              Current Academic Year ({results.currentAcademicYear})
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-secondary">Eligible Class</p>
                <p className="font-heading text-2xl font-bold text-accent">
                  {results.currentClass}
                </p>
              </div>
              <p className="text-xs text-secondary">
                Cutoff date: {results.cutoffDate}
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-blue-50 border border-blue-200">
            <h3 className="font-heading text-lg font-bold text-primary mb-3">
              Next Academic Year ({results.nextAcademicYear})
            </h3>
            <div className="space-y-2">
              <div>
                <p className="text-sm text-secondary">Eligible Class</p>
                <p className="font-heading text-2xl font-bold text-blue-600">
                  {results.nextClass}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-surface">
            <div className="text-sm space-y-2 text-secondary">
              <p>
                <strong>Grade Structure in India:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nursery / Playschool: Ages 3-4</li>
                <li>Lower Kindergarten (LKG): Ages 4-5</li>
                <li>Upper Kindergarten (UKG): Ages 5-6</li>
                <li>Class I onwards: Ages 6+</li>
              </ul>
              <p className="mt-3">
                <strong>Note:</strong> Different states have different cutoff dates and age requirements. Private schools may have additional norms. Verify with your school's admission guidelines.
              </p>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
