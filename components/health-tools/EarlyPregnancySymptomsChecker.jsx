'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function EarlyPregnancySymptomsChecker() {
  const symptoms = [
    { id: 'missed-period', name: 'Missed Period', reliability: 'Very High' },
    { id: 'nausea', name: 'Nausea or Morning Sickness', reliability: 'High' },
    { id: 'breast-tenderness', name: 'Breast Tenderness', reliability: 'High' },
    { id: 'fatigue', name: 'Extreme Fatigue', reliability: 'High' },
    { id: 'implantation-bleeding', name: 'Light Spotting/Implantation Bleeding', reliability: 'Moderate' },
    { id: 'frequent-urination', name: 'Frequent Urination', reliability: 'Moderate' },
    { id: 'food-aversions', name: 'Food Aversions or Cravings', reliability: 'Moderate' },
    { id: 'mood-changes', name: 'Mood Changes or Emotional Sensitivity', reliability: 'Moderate' },
    { id: 'bloating', name: 'Bloating', reliability: 'Low to Moderate' },
    { id: 'cramping', name: 'Mild Cramping', reliability: 'Low to Moderate' },
    { id: 'headaches', name: 'Headaches', reliability: 'Low' },
    { id: 'constipation', name: 'Constipation', reliability: 'Low' },
    { id: 'dizziness', name: 'Dizziness or Lightheadedness', reliability: 'Low' },
    { id: 'heightened-smell', name: 'Heightened Sense of Smell', reliability: 'Low' },
    { id: 'metallic-taste', name: 'Metallic Taste', reliability: 'Low' },
  ];

  const [checkedSymptoms, setCheckedSymptoms] = useState(new Set());
  const [results, setResults] = useState(null);

  const toggleSymptom = (id) => {
    const newChecked = new Set(checkedSymptoms);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedSymptoms(newChecked);
  };

  const calculateResults = () => {
    const count = checkedSymptoms.size;
    const percentage = Math.round((count / symptoms.length) * 100);

    const highReliability = symptoms.filter(
      s => checkedSymptoms.has(s.id) && (s.reliability === 'Very High' || s.reliability === 'High')
    );

    const moderateReliability = symptoms.filter(
      s => checkedSymptoms.has(s.id) && s.reliability === 'Moderate'
    );

    const lowReliability = symptoms.filter(
      s => checkedSymptoms.has(s.id) && (s.reliability === 'Low' || s.reliability === 'Low to Moderate')
    );

    let indication = 'limited pregnancy indication';
    if (count === 0) {
      indication = 'no pregnancy symptoms reported';
    } else if (highReliability.length >= 2) {
      indication = 'possible pregnancy indication';
    } else if (count >= 4 && (highReliability.length > 0 || moderateReliability.length >= 2)) {
      indication = 'moderate pregnancy indication';
    }

    setResults({
      count,
      percentage,
      highReliability,
      moderateReliability,
      lowReliability,
      indication,
    });
  };

  const resetForm = () => {
    setCheckedSymptoms(new Set());
    setResults(null);
  };

  const getReliabilityColor = (reliability) => {
    if (reliability === 'Very High' || reliability === 'High') {
      return 'bg-green-50 border-green-200';
    } else if (reliability === 'Moderate' || reliability === 'Low to Moderate') {
      return 'bg-yellow-50 border-yellow-200';
    }
    return 'bg-gray-50 border-gray-200';
  };

  const getReliabilityBadgeVariant = (reliability) => {
    if (reliability === 'Very High' || reliability === 'High') {
      return 'success';
    } else if (reliability === 'Moderate' || reliability === 'Low to Moderate') {
      return 'warning';
    }
    return 'default';
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-4">
          <p className="text-secondary text-sm">
            Check the symptoms you are experiencing. This is for informational purposes only.
          </p>

          <div className="grid grid-cols-1 gap-3">
            {symptoms.map(symptom => (
              <label
                key={symptom.id}
                className={`flex items-start gap-3 p-3 rounded border cursor-pointer transition-colors ${
                  checkedSymptoms.has(symptom.id)
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-surface border-border hover:bg-surface-hover'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checkedSymptoms.has(symptom.id)}
                  onChange={() => toggleSymptom(symptom.id)}
                  className="mt-1 w-4 h-4 accent-accent rounded"
                />
                <div className="flex-1">
                  <p className="font-semibold text-primary">{symptom.name}</p>
                  <p className="text-secondary text-xs mt-1">
                    Reliability: <span className="font-semibold">{symptom.reliability}</span>
                  </p>
                </div>
              </label>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateResults} className="flex-1">
              Check Symptoms
            </Button>
            {checkedSymptoms.size > 0 && (
              <Button onClick={resetForm} variant="secondary" className="flex-1">
                Reset
              </Button>
            )}
          </div>
        </div>
      </Card>

      {results && (
        <div className="space-y-4">
          <Card>
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-secondary text-sm mb-2">Symptoms Reported</p>
                <p className="font-mono text-4xl font-bold text-primary">
                  {results.count}/{symptoms.length}
                </p>
                <p className="text-secondary text-lg mt-2">{results.percentage}%</p>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-secondary text-sm font-semibold mb-3 text-center">
                  {results.indication}
                </p>
              </div>

              {results.highReliability.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-secondary text-xs font-semibold mb-2">HIGH RELIABILITY INDICATORS</p>
                  <div className="space-y-2">
                    {results.highReliability.map(symptom => (
                      <div key={symptom.id} className="flex items-center justify-between bg-green-50 p-2 rounded border border-green-200">
                        <p className="text-primary font-semibold text-sm">{symptom.name}</p>
                        <Badge variant="success">{symptom.reliability}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.moderateReliability.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-secondary text-xs font-semibold mb-2">MODERATE RELIABILITY INDICATORS</p>
                  <div className="space-y-2">
                    {results.moderateReliability.map(symptom => (
                      <div key={symptom.id} className="flex items-center justify-between bg-yellow-50 p-2 rounded border border-yellow-200">
                        <p className="text-primary font-semibold text-sm">{symptom.name}</p>
                        <Badge variant="warning">{symptom.reliability}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.lowReliability.length > 0 && (
                <div className="border-t border-border pt-4">
                  <p className="text-secondary text-xs font-semibold mb-2">LOW RELIABILITY INDICATORS</p>
                  <div className="space-y-2">
                    {results.lowReliability.map(symptom => (
                      <div key={symptom.id} className="flex items-center justify-between bg-gray-50 p-2 rounded border border-gray-200">
                        <p className="text-primary font-semibold text-sm">{symptom.name}</p>
                        <Badge>{symptom.reliability}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          <Card className="bg-blue-50 border border-blue-200">
            <p className="text-secondary text-sm">
              <span className="font-semibold text-primary">Important Note:</span> A positive pregnancy test is the most reliable way to confirm pregnancy. Many of these symptoms can be caused by other conditions like PMS, stress, or illness. A missed period combined with a positive test is the most reliable indicator of pregnancy.
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
