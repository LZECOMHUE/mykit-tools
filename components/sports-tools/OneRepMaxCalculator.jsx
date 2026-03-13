"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function OneRepMaxCalculator() {
  const [weight, setWeight] = useState("100");
  const [reps, setReps] = useState("8");
  const [unit, setUnit] = useState("kg");

  const w = parseFloat(weight) || 0;
  const r = parseInt(reps) || 0;

  const epleyFormula = (weight, reps) => {
    return weight * (1 + reps / 30);
  };

  const brzycki = (weight, reps) => {
    return weight / (1.0278 - 0.0278 * reps);
  };

  const lombardi = (weight, reps) => {
    return weight * Math.pow(reps, 0.1);
  };

  const oneRepMaxEpley = epleyFormula(w, r);
  const oneRepMaxBrzycki = brzycki(w, r);
  const oneRepMaxLombardi = lombardi(w, r);

  const percentages = [95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

  const getRepRanges = (percentage) => {
    if (percentage === 95) return "1-2 reps";
    if (percentage === 90) return "3-4 reps";
    if (percentage === 85) return "5-6 reps";
    if (percentage === 80) return "6-8 reps";
    if (percentage === 75) return "8-10 reps";
    if (percentage === 70) return "10-12 reps";
    if (percentage === 65) return "12-15 reps";
    if (percentage === 60) return "15-18 reps";
    if (percentage === 55) return "18-20 reps";
    if (percentage === 50) return "20+ reps";
    return "N/A";
  };

  const isValidInput = w > 0 && r > 0;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Weight Lifted
              </label>
              <Input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter weight"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Repetitions
              </label>
              <Input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="Enter reps"
                min="1"
                max="50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="kg">Kilograms (kg)</option>
                <option value="lbs">Pounds (lbs)</option>
              </select>
            </div>
          </div>
        </div>
      </Card>

      {isValidInput && (
        <>
          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              Estimated 1 Rep Max
            </h3>
            <div className="space-y-3">
              <div className="bg-surface p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-1">
                  Epley Formula (most common)
                </p>
                <p className="text-2xl font-bold text-primary font-mono">
                  {oneRepMaxEpley.toFixed(1)} {unit}
                </p>
              </div>

              <div className="bg-surface p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-1">
                  Brzycki Formula
                </p>
                <p className="text-2xl font-bold text-primary font-mono">
                  {oneRepMaxBrzycki.toFixed(1)} {unit}
                </p>
              </div>

              <div className="bg-surface p-4 rounded-lg border border-border">
                <p className="text-sm text-text-secondary mb-1">
                  Lombardi Formula
                </p>
                <p className="text-2xl font-bold text-primary font-mono">
                  {oneRepMaxLombardi.toFixed(1)} {unit}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              Training Percentages (based on Epley 1RM)
            </h3>
            <p className="text-sm text-text-secondary mb-4">
              Recommended weight and rep ranges for different intensity levels:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-text-primary">
                      % of 1RM
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-text-primary">
                      Weight ({unit})
                    </th>
                    <th className="text-left py-2 px-2 font-medium text-text-primary">
                      Rep Range
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {percentages.map((percentage) => (
                    <tr key={percentage} className="border-b border-border">
                      <td className="py-2 px-2 font-mono text-text-primary">
                        {percentage}%
                      </td>
                      <td className="py-2 px-2 font-mono text-text-secondary">
                        {(oneRepMaxEpley * (percentage / 100)).toFixed(1)}
                      </td>
                      <td className="py-2 px-2 text-text-secondary">
                        {getRepRanges(percentage)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              About the Formulas
            </h3>
            <div className="space-y-3 text-sm text-text-secondary">
              <div>
                <p className="font-medium text-text-primary mb-1">Epley</p>
                <p>
                  Most commonly used formula. Good balance between simplicity
                  and accuracy. Formula: 1RM = weight x (1 + reps/30)
                </p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Brzycki</p>
                <p>
                  Tends to give slightly lower estimates than Epley, especially
                  for higher rep ranges.
                </p>
              </div>
              <div>
                <p className="font-medium text-text-primary mb-1">Lombardi</p>
                <p>
                  Uses a power function. Often gives higher estimates for lower
                  rep ranges.
                </p>
              </div>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
