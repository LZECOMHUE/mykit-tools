"use client";
import { useState } from "react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function NumberToRomanNumerals() {
  const [number, setNumber] = useState("42");

  const convertToRoman = (num) => {
    if (!num || num < 1 || num > 3999) return "";

    const romanMap = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";
    let remaining = num;

    for (let i = 0; i < romanMap.length; i++) {
      while (remaining >= romanMap[i].value) {
        result += romanMap[i].numeral;
        remaining -= romanMap[i].value;
      }
    }

    return result;
  };

  const roman = convertToRoman(parseInt(number));
  const isValid = number && !isNaN(number) && parseInt(number) >= 1 && parseInt(number) <= 3999;

  const handleCopy = () => {
    navigator.clipboard.writeText(roman);
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

  const examples = [
    { num: 1, roman: "I" },
    { num: 4, roman: "IV" },
    { num: 9, roman: "IX" },
    { num: 27, roman: "XXVII" },
    { num: 49, roman: "XLIX" },
    { num: 99, roman: "XCIX" },
    { num: 444, roman: "CDXLIV" },
    { num: 1994, roman: "MCMXCIV" },
    { num: 3999, roman: "MMMCMXCIX" },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Enter Number (1 to 3999)
            </label>
            <Input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Enter a number"
              min="1"
              max="3999"
            />
            {!isValid && number && (
              <p className="text-sm text-error mt-1">
                Please enter a number between 1 and 3999
              </p>
            )}
          </div>

          {isValid && (
            <div className="bg-surface p-4 rounded-lg border border-border">
              <p className="text-sm text-text-secondary mb-1">Roman Numeral</p>
              <p className="text-3xl font-bold text-primary font-mono">
                {roman}
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
          Roman Numeral Reference
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
          Common Examples
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Number
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Roman Numeral
                </th>
              </tr>
            </thead>
            <tbody>
              {examples.map((item, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {item.num}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-primary font-medium">
                    {item.roman}
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
