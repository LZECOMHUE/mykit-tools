"use client";
import { useState } from "react";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";

export default function UsToEuShoeSize() {
  const [usSize, setUsSize] = useState("9");

  const sizeTable = [
    { us: 4, eu: 36 },
    { us: 4.5, eu: 36.5 },
    { us: 5, eu: 37 },
    { us: 5.5, eu: 37.5 },
    { us: 6, eu: 38 },
    { us: 6.5, eu: 38.5 },
    { us: 7, eu: 39 },
    { us: 7.5, eu: 39.5 },
    { us: 8, eu: 40 },
    { us: 8.5, eu: 40.5 },
    { us: 9, eu: 41 },
    { us: 9.5, eu: 41.5 },
    { us: 10, eu: 42 },
    { us: 10.5, eu: 42.5 },
    { us: 11, eu: 43 },
    { us: 11.5, eu: 43.5 },
    { us: 12, eu: 44 },
    { us: 12.5, eu: 44.5 },
    { us: 13, eu: 45 },
  ];

  const euSize = sizeTable.find((s) => s.us.toString() === usSize)?.eu || "N/A";

  const usOptions = sizeTable.map((s) => ({
    label: `US ${s.us}`,
    value: s.us.toString(),
  }));

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              US Shoe Size
            </label>
            <Select
              value={usSize}
              onChange={(e) => setUsSize(e.target.value)}
              options={usOptions}
            />
          </div>

          <div className="bg-surface p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary mb-1">EU Shoe Size</p>
            <p className="text-3xl font-bold text-primary font-mono">
              EU {euSize}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          US to EU Shoe Size Conversion Chart
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  US Size
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  EU Size
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeTable.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border ${
                    row.us.toString() === usSize ? "bg-accent-muted" : ""
                  }`}
                >
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    US {row.us}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    EU {row.eu}
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
