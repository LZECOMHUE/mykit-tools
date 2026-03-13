"use client";
import { useState } from "react";
import Textarea from "@/components/ui/Textarea";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function TextToBinary() {
  const [input, setInput] = useState("Hello");
  const [spacesBetweenBytes, setSpacesBetweenBytes] = useState(true);

  const textToBinary = (text) => {
    return text
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(2).padStart(8, "0");
      })
      .join(spacesBetweenBytes ? " " : "");
  };

  const textToHex = (text) => {
    return text
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(16).padStart(2, "0").toUpperCase();
      })
      .join(spacesBetweenBytes ? " " : "");
  };

  const textToOctal = (text) => {
    return text
      .split("")
      .map((char) => {
        return char.charCodeAt(0).toString(8).padStart(3, "0");
      })
      .join(spacesBetweenBytes ? " " : "");
  };

  const binary = textToBinary(input);
  const hex = textToHex(input);
  const octal = textToOctal(input);

  const handleCopyBinary = () => {
    navigator.clipboard.writeText(binary);
  };

  const handleCopyHex = () => {
    navigator.clipboard.writeText(hex);
  };

  const handleCopyOctal = () => {
    navigator.clipboard.writeText(octal);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Input Text
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to convert"
              rows={6}
            />
          </div>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={spacesBetweenBytes}
              onChange={(e) => setSpacesBetweenBytes(e.target.checked)}
              className="w-4 h-4"
            />
            <span className="text-sm text-text-secondary">
              Add spaces between bytes
            </span>
          </label>
        </div>
      </Card>

      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-text-secondary mb-2">Binary (8-bit)</p>
            <div className="bg-surface p-4 rounded-lg border border-border break-all max-h-32 overflow-y-auto">
              <p className="font-mono text-text-primary text-sm">
                {binary}
              </p>
            </div>
            <Button
              onClick={handleCopyBinary}
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Copy Binary
            </Button>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-2">Hexadecimal</p>
            <div className="bg-surface p-4 rounded-lg border border-border break-all max-h-32 overflow-y-auto">
              <p className="font-mono text-text-primary text-sm">
                {hex}
              </p>
            </div>
            <Button
              onClick={handleCopyHex}
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Copy Hex
            </Button>
          </div>

          <div>
            <p className="text-sm text-text-secondary mb-2">Octal</p>
            <div className="bg-surface p-4 rounded-lg border border-border break-all max-h-32 overflow-y-auto">
              <p className="font-mono text-text-primary text-sm">
                {octal}
              </p>
            </div>
            <Button
              onClick={handleCopyOctal}
              variant="secondary"
              size="sm"
              className="mt-2"
            >
              Copy Octal
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-heading font-bold text-lg text-primary mb-4">
          Character Reference
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Character
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Binary
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Hex
                </th>
                <th className="text-left py-2 px-2 font-medium text-text-primary">
                  Decimal
                </th>
              </tr>
            </thead>
            <tbody>
              {input.split("").map((char, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-2 px-2 font-mono text-text-primary">
                    {char === " " ? "(space)" : char}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {char.charCodeAt(0).toString(2).padStart(8, "0")}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {char
                      .charCodeAt(0)
                      .toString(16)
                      .padStart(2, "0")
                      .toUpperCase()}
                  </td>
                  <td className="py-2 px-2 font-mono text-text-secondary">
                    {char.charCodeAt(0)}
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
