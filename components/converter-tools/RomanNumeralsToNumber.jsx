"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function RomanNumeralsToNumber() {
  const [roman, setRoman] = useState("XLII");

  const convertToNumber = (romanStr) => {
    if (!romanStr) return null;

    const romanMap = {
      I: 1,
      V: 5,
      X: 10,
      L: 50,
      C: 100,
      D: 500,
      M: 1000,
    };

    const upperRoman = romanStr.toUpperCase();
    let result = 0;
    let prevValue = 0;

    for (let i = upperRoman.length - 1; i >= 0; i--) {
      const currentChar = upperRoman[i];
      const currentValue = romanMap[currentChar];

      if (currentValue === undefined) {
        return null;
      }

      if (currentValue < prevValue) {
        result -= currentValue;
      } else {
        result += currentValue;
      }

      prevValue = currentValue;
    }

    return result;
  };

  const number = convertToNumber(roman);
  const isValid = roman && number !== null && number >= 1 && number <= 3999;

  const handleCopy = () => {
    navigator.clipboard.writeText(number.toString());
  };

  const referenceRomanNumerals = [
    { numeral: "I", value: 1 },
    { numeral: "V", value: 5 },
    { numeral: "X", value: 10 },
    { numeral: "L", value: 50 },
    { numeral: "C", value: 100 },
    { numeral: "D", value: 500 },
    { numeral: "M", value: 1000 },
  ];

  const subtractiveCombinations = [
    { numeral: "IV", value: 4 },
    { numeral: "IX", value: 9 },
    { numeral: "XL", value: 40 },
    { numeral: "XC", value: 90 },
    { numeral: "CD", value: 400 },
    { numeral: "CM", value: 900 },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Enter Roman Numeral
            </label>
            <Input
              type="text"
              value={roman}
              onChange={(e) => setRoman(e.target.value)}
              placeholder="Enter Roman numeral (e.g., XLII)"
              className="uppercase"
            />
            {roman && !isValid && (
              <p className="text-sm text-error mt-1">
                Invalid Roman numeral format
              </p>
            )}
          </div>

          {isValid && (
            <div className="bg-surface p-4 rounded-lg border border-border">
              <p className="text-sm text-text-secondary mb-1">Decimal Number</p>
              <p className="text-3xl font-bold text-primary font-mono">
                {number}
              </p>
              <Button
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="mt-3"
              >
                Copy
              </Button>
            </div>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          Basic Roman Numerals
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Roman Numeral
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Decimal Value
                </th>
              </tr>
            </thead>
            <tbody>
              {referenceRomanNumerals.map((item, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-2 px-2 font-mono text-text-primary font-medium">
                    {item.numeral}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          Subtractive Combinations
        </h3>
        <p className="text-sm text-text-secondary mb-4">
          When a smaller numeral appears before a larger one, it is subtracted:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Roman Numeral
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Decimal Value
                </th>
              </tr>
            </thead>
            <tbody>
              {subtractiveCombinations.map((item, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-2 px-2 font-mono text-text-primary font-medium">
                    {item.numeral}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
