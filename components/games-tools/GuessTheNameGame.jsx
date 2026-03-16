"use client";

import { useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function GuessTheNameGame() {
  const [itemName, setItemName] = useState("");
  const [numSlips, setNumSlips] = useState(20);
  const [showPreview, setShowPreview] = useState(false);
  const printRef = useRef(null);

  const downloadAsJPG = () => {
    if (!itemName.trim()) return;

    const numSlipsInt = Math.max(10, Math.min(100, parseInt(numSlips) || 20));
    const slips = Array.from({ length: numSlipsInt }, (_, i) => i + 1);

    const canvas = document.createElement('canvas');
    const scale = 2;
    const width = 800;
    const height = 100 + Math.ceil(slips.length / 3) * 200 + 80;

    canvas.width = width * scale;
    canvas.height = height * scale;
    const ctx = canvas.getContext('2d');
    ctx.scale(scale, scale);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    let y = 50;

    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Guess the Mystery Item - Entry Slips', 40, y);

    y += 50;

    ctx.fillStyle = '#525252';
    ctx.font = '12px sans-serif';
    ctx.fillText('Print, cut, and distribute these slips. The mystery item is: ' + itemName, 40, y);

    y += 40;

    const slipsPerRow = 3;
    let slipNum = 1;

    for (let row = 0; row < Math.ceil(slips.length / slipsPerRow); row++) {
      for (let col = 0; col < slipsPerRow && slipNum <= slips.length; col++) {
        const slipX = 50 + col * 250;
        const slipY = y + row * 200;

        ctx.strokeStyle = '#d4d4d4';
        ctx.lineWidth = 1;
        ctx.strokeRect(slipX, slipY, 220, 180);

        ctx.fillStyle = '#2563eb';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('#' + slipNum, slipX + 110, slipY + 30);

        ctx.fillStyle = '#525252';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Your Name:', slipX + 15, slipY + 60);

        ctx.strokeStyle = '#d4d4d4';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(slipX + 15, slipY + 75);
        ctx.lineTo(slipX + 205, slipY + 75);
        ctx.stroke();

        ctx.fillText('Your Guess:', slipX + 15, slipY + 105);

        ctx.beginPath();
        ctx.moveTo(slipX + 15, slipY + 120);
        ctx.lineTo(slipX + 205, slipY + 120);
        ctx.stroke();

        ctx.fillStyle = '#a3a3a3';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Guess the Item', slipX + 110, slipY + 160);

        slipNum++;
      }
    }

    ctx.fillStyle = '#a3a3a3';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('mykit.tools', width / 2, height - 20);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.download = 'guess-the-item-slips.jpg';
    link.click();
  };

  const generateSlips = () => {
    if (!itemName.trim()) return;
    setShowPreview(true);
  };

  const numSlipsInt = Math.max(10, Math.min(100, parseInt(numSlips) || 20));
  const slips = Array.from({ length: numSlipsInt }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      {/* Configuration Panel */}
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="space-y-4">
          <Input
            label="Item Name"
            placeholder="e.g., Teddy Bear, Wedding Cake, Doll"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            helper="The mystery item people need to guess"
          />

          <div>
            <label className="text-sm font-medium text-text-primary mb-2 block">
              Number of Entry Slips: {numSlipsInt}
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={numSlips}
              onChange={(e) => setNumSlips(e.target.value)}
              className="w-full"
            />
            <p className="text-xs text-text-muted mt-1">10-100 slips</p>
          </div>

          <Button
            onClick={generateSlips}
            disabled={!itemName.trim()}
            className="w-full"
            size="lg"
          >
            Generate Entry Slips
          </Button>
        </div>
      </Card>

      {/* Preview Section */}
      {showPreview && (
        <div className="space-y-6">
          {/* Organiser Answer Card */}
          <Card className="border-2 border-accent bg-accent-muted">
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-accent">
                🎯 Organiser Answer Card
              </h3>
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-accent text-center">
                <p className="text-sm text-text-muted mb-2">THE MYSTERY ITEM IS:</p>
                <p className="font-heading text-4xl font-bold text-accent">
                  {itemName}
                </p>
                <p className="text-xs text-text-muted mt-4">
                  Keep this secret until all guesses are collected!
                </p>
              </div>
              <p className="text-xs text-text-secondary text-center">
                Print this card separately for the organiser
              </p>
            </div>
          </Card>

          {/* Entry Slips Grid */}
          <Card>
            <div className="space-y-4">
              <h3 className="font-heading text-lg font-bold text-text-primary">
                📋 Entry Slips (Print & Cut)
              </h3>
              <p className="text-sm text-text-secondary">
                Print this page, cut along dotted lines, and distribute to players
              </p>

              {/* Print Preview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 print:gap-0 print:grid-cols-3">
                {slips.map((num) => (
                  <div
                    key={num}
                    className="bg-white border-2 border-dashed border-border rounded-lg p-3 print:border-solid print:border-gray-300 print:rounded-none print:p-2 print:break-inside-avoid"
                    style={{
                      pageBreakInside: "avoid",
                    }}
                  >
                    <div className="space-y-3">
                      {/* Slip Number */}
                      <div className="text-center">
                        <p className="font-mono font-bold text-lg text-accent">
                          #{num}
                        </p>
                      </div>

                      {/* Name Field */}
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-text-secondary">
                          Your Name:
                        </p>
                        <div className="border-b border-dashed border-text-muted h-6"></div>
                      </div>

                      {/* Guess Field */}
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-text-secondary">
                          Your Guess:
                        </p>
                        <div className="border-b border-dashed border-text-muted h-6"></div>
                      </div>

                      {/* Decorative Footer */}
                      <div className="text-center">
                        <p className="text-xs text-text-muted">
                          🎪 Guess the Mystery Item
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> Adjust your browser zoom to 85-90% before printing for
                  optimal slip size.
                </p>
              </div>

              <Button
                onClick={downloadAsJPG}
                variant="secondary"
                className="w-full"
              >
                Download JPG
              </Button>
            </div>
          </Card>

          {/* Instructions Card */}
          <Card className="bg-amber-50 border border-amber-200">
            <div className="space-y-3">
              <h4 className="font-heading font-bold text-text-primary">
                📖 How to Use
              </h4>
              <ol className="space-y-2 text-sm text-text-secondary list-decimal list-inside">
                <li>Print the organiser answer card and keep it secret</li>
                <li>Print and cut the entry slips</li>
                <li>Distribute slips to all players</li>
                <li>Players write their name and guess without telling others</li>
                <li>Collect all slips when done</li>
                <li>Reveal the answer and find the winner(s)</li>
              </ol>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
