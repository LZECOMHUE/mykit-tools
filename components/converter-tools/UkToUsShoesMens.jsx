"use client";
import { useState } from "react";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";

export default function UkToUsShoesMens() {
  const [ukSize, setUkSize] = useState("8");

  const sizeTable = [
    { uk: 6, us: 7 },
    { uk: 6.5, us: 7.5 },
    { uk: 7, us: 8 },
    { uk: 7.5, us: 8.5 },
    { uk: 8, us: 9 },
    { uk: 8.5, us: 9.5 },
    { uk: 9, us: 10 },
    { uk: 9.5, us: 10.5 },
    { uk: 10, us: 11 },
    { uk: 10.5, us: 11.5 },
    { uk: 11, us: 12 },
    { uk: 11.5, us: 12.5 },
    { uk: 12, us: 13 },
    { uk: 13, us: 14 },
  ];

  const usSize = sizeTable.find((s) => s.uk.toString() === ukSize)?.us || "N/A";

  const ukOptions = sizeTable.map((s) => ({
    label: `UK ${s.uk}`,
    value: s.uk.toString(),
  }));

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              UK Mens Shoe Size
            </label>
            <Select
              value={ukSize}
              onChange={(e) => setUkSize(e.target.value)}
              options={ukOptions}
            />
          </div>

          <div className="bg-surface p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary mb-1">US Mens Size</p>
            <p className="text-3xl font-bold text-primary font-mono">
              US {usSize}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          UK to US Mens Shoe Size Conversion Chart
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  UK Size
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  US Size
                </th>
              </tr>
            </thead>
            <tbody>
              {sizeTable.map((row, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border ${
                    row.uk.toString() === ukSize ? "bg-accent-muted" : ""
                  }`}
                >
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    UK {row.uk}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    US {row.us}
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
