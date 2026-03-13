"use client";
import Card from "@/components/ui/Card";

export default function A3ToTabloidDimensions() {
  const formats = [
    {
      name: "A3",
      mmWidth: 297,
      mmHeight: 420,
      inchWidth: 11.69,
      inchHeight: 16.54,
      color: "bg-green-100",
    },
    {
      name: "Tabloid",
      mmWidth: 279.4,
      mmHeight: 431.8,
      inchWidth: 11,
      inchHeight: 17,
      color: "bg-purple-100",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {formats.map((format, idx) => (
          <Card key={idx} className="p-6">
            <h3 className="font-heading font-bold text-lg text-primary mb-4">
              {format.name}
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-text-secondary">Millimetres</span>
                <span className="font-mono text-text-primary font-medium">
                  {format.mmWidth} x {format.mmHeight} mm
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-text-secondary">Inches</span>
                <span className="font-mono text-text-primary font-medium">
                  {format.inchWidth} x {format.inchHeight} in
                </span>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <div className={`w-full aspect-[11.69/16.54] ${format.color} rounded border-2 border-border flex items-center justify-center`}>
                  <span className="text-xs font-mono text-text-secondary">
                    {format.name}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          Comparison
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-text-secondary">
            A3 is the ISO 216 standard for large-format printing used across
            Europe and most countries. Tabloid is the North American equivalent
            for large-format documents.
          </p>
          <div className="bg-surface p-4 rounded border border-border space-y-2">
            <p className="text-sm">
              <span className="font-medium text-text-primary">Width difference:</span>
              <span className="ml-2 font-mono text-text-secondary">
                {(297 - 279.4).toFixed(1)} mm (0.69 in) wider
              </span>
            </p>
            <p className="text-sm">
              <span className="font-medium text-text-primary">Height difference:</span>
              <span className="ml-2 font-mono text-text-secondary">
                {(431.8 - 420).toFixed(1)} mm (0.46 in) shorter
              </span>
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          Detailed Dimensions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Format
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Millimetres
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Inches
                </th>
              </tr>
            </thead>
            <tbody>
              {formats.map((format, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {format.name}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {format.mmWidth} x {format.mmHeight}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {format.inchWidth} x {format.inchHeight}
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
