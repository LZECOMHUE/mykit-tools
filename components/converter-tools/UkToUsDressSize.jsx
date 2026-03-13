"use client";
import { useState } from "react";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";

export default function UkToUsDressSize() {
  const [ukSize, setUkSize] = useState("10");

  const sizeTable = [
    { uk: 6, us: 2 },
    { uk: 8, us: 4 },
    { uk: 10, us: 6 },
    { uk: 12, us: 8 },
    { uk: 14, us: 10 },
    { uk: 16, us: 12 },
    { uk: 18, us: 14 },
    { uk: 20, us: 16 },
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
              UK Dress Size
            </label>
            <Select
              value={ukSize}
              onChange={(e) => setUkSize(e.target.value)}
              options={ukOptions}
            />
          </div>

          <div className="bg-surface p-4 rounded-lg border border-border">
            <p className="text-sm text-text-secondary mb-1">US Dress Size</p>
            <p className="text-3xl font-bold text-primary font-mono">
              US {usSize}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          UK to US Dress Size Conversion Chart
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
