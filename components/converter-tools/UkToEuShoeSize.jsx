"use client";
import { useState } from "react";
import Select from "@/components/ui/Select";
import Card from "@/components/ui/Card";

export default function UkToEuShoeSize() {
  const [ukSize, setUkSize] = useState("6");

  const sizeTable = [
    { uk: 3, eu: 36 },
    { uk: 3.5, eu: 36.5 },
    { uk: 4, eu: 37 },
    { uk: 4.5, eu: 37.5 },
    { uk: 5, eu: 38 },
    { uk: 5.5, eu: 38.5 },
    { uk: 6, eu: 39 },
    { uk: 6.5, eu: 39.5 },
    { uk: 7, eu: 40.5 },
    { uk: 7.5, eu: 41 },
    { uk: 8, eu: 42 },
    { uk: 8.5, eu: 42.5 },
    { uk: 9, eu: 43 },
    { uk: 9.5, eu: 43.5 },
    { uk: 10, eu: 44 },
    { uk: 10.5, eu: 44.5 },
    { uk: 11, eu: 45 },
    { uk: 11.5, eu: 45.5 },
    { uk: 12, eu: 46 },
  ];

  const euSize = sizeTable.find((s) => s.uk.toString() === ukSize)?.eu || "N/A";

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
              UK Shoe Size
            </label>
            <Select
              value={ukSize}
              onChange={(e) => setUkSize(e.target.value)}
              options={ukOptions}
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
          UK to EU Shoe Size Conversion Chart
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  UK Size
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
                    row.uk.toString() === ukSize ? "bg-accent-muted" : ""
                  }`}
                >
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    UK {row.uk}
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
