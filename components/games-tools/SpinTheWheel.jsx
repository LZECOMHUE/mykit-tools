"use client";

import { useState, useRef, useCallback } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const SLICE_COLORS = [
  "#ef4444", "#3b82f6", "#22c55e", "#eab308",
  "#a855f7", "#ec4899", "#f97316", "#06b6d4",
];

export default function SpinTheWheel() {
  const [items, setItems] = useState(["Option 1", "Option 2", "Option 3", "Option 4"]);
  const [newItem, setNewItem] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState(null);
  const [editingIdx, setEditingIdx] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [history, setHistory] = useState([]);

  // Track cumulative rotation so we never jump backwards
  const currentAngle = useRef(0);
  const wheelRef = useRef(null);

  const addItem = () => {
    const val = newItem.trim();
    if (val && items.length < 8) {
      setItems([...items, val]);
      setNewItem("");
    }
  };

  const removeItem = (idx) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== idx));
      setWinner(null);
    }
  };

  const startEdit = (idx) => {
    setEditingIdx(idx);
    setEditValue(items[idx]);
  };

  const saveEdit = () => {
    if (editValue.trim() && editingIdx !== null) {
      setItems(items.map((item, i) => (i === editingIdx ? editValue.trim() : item)));
    }
    setEditingIdx(null);
    setEditValue("");
  };

  const spin = useCallback(() => {
    if (isSpinning || items.length < 2) return;

    setIsSpinning(true);
    setWinner(null);

    // Random extra spins (5-8 full rotations) + random landing angle
    const extraSpins = (5 + Math.random() * 3) * 360;
    const randomAngle = Math.random() * 360;
    const targetAngle = currentAngle.current + extraSpins + randomAngle;

    // Apply rotation via CSS transform
    if (wheelRef.current) {
      wheelRef.current.style.transition = "transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)";
      wheelRef.current.style.transform = `rotate(${targetAngle}deg)`;
    }

    currentAngle.current = targetAngle;

    setTimeout(() => {
      // The pointer is at the top (12 o'clock). Figure out which slice is there.
      const normalised = ((targetAngle % 360) + 360) % 360;
      const sliceAngle = 360 / items.length;
      // Wheel rotates clockwise, pointer at top. The slice at top is at (360 - normalised).
      const pointerAngle = (360 - normalised + 360) % 360;
      const winIdx = Math.floor(pointerAngle / sliceAngle) % items.length;

      setWinner(items[winIdx]);
      setHistory((prev) => [items[winIdx], ...prev].slice(0, 20));
      setIsSpinning(false);
    }, 4200);
  }, [isSpinning, items]);

  const sliceAngle = 360 / items.length;

  return (
    <div className="space-y-4">
      {/* Wheel */}
      <Card padding={false} className="overflow-hidden">
        <div className="flex flex-col items-center py-6 px-4">
          {/* Pointer triangle */}
          <div className="w-0 h-0 mb-[-6px] z-10"
            style={{
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "16px solid #1a1a1a",
            }}
          />

          {/* Wheel SVG */}
          <div className="relative" style={{ width: 320, height: 320 }}>
            <svg
              ref={wheelRef}
              viewBox="0 0 300 300"
              width="320"
              height="320"
              style={{ transform: `rotate(${currentAngle.current}deg)` }}
            >
              {items.map((item, idx) => {
                const startAngle = (idx * sliceAngle - 90) * (Math.PI / 180);
                const endAngle = ((idx + 1) * sliceAngle - 90) * (Math.PI / 180);
                const x1 = 150 + 145 * Math.cos(startAngle);
                const y1 = 150 + 145 * Math.sin(startAngle);
                const x2 = 150 + 145 * Math.cos(endAngle);
                const y2 = 150 + 145 * Math.sin(endAngle);
                const largeArc = sliceAngle > 180 ? 1 : 0;

                // Text position — midpoint of the slice, 60% from center
                const midAngle = ((idx + 0.5) * sliceAngle - 90) * (Math.PI / 180);
                const textX = 150 + 90 * Math.cos(midAngle);
                const textY = 150 + 90 * Math.sin(midAngle);
                const textRotation = (idx + 0.5) * sliceAngle;

                return (
                  <g key={idx}>
                    <path
                      d={`M 150 150 L ${x1} ${y1} A 145 145 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={SLICE_COLORS[idx % SLICE_COLORS.length]}
                      stroke="white"
                      strokeWidth="2"
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fill="white"
                      fontSize={items.length > 6 ? "10" : "12"}
                      fontWeight="bold"
                      transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                      style={{ pointerEvents: "none" }}
                    >
                      {item.length > 14 ? item.slice(0, 12) + "…" : item}
                    </text>
                  </g>
                );
              })}
              {/* Center circle */}
              <circle cx="150" cy="150" r="18" fill="white" stroke="#e5e5e5" strokeWidth="2" />
              <circle cx="150" cy="150" r="6" fill="#1a1a1a" />
            </svg>
          </div>

          {/* Spin button */}
          <div className="mt-4 w-full max-w-xs">
            <Button onClick={spin} disabled={isSpinning || items.length < 2} size="lg" className="w-full">
              {isSpinning ? "Spinning…" : "🎯 Spin!"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Winner display */}
      {winner && (
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 text-center space-y-2">
          <p className="text-xs text-text-muted font-semibold uppercase tracking-wider">Winner</p>
          <p className="font-heading text-3xl font-bold text-text-primary">{winner}</p>
        </Card>
      )}

      {/* Item management */}
      <Card>
        <h3 className="text-sm font-semibold text-text-primary mb-3">
          Wheel Items ({items.length}/8)
        </h3>

        <div className="space-y-2 mb-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ background: SLICE_COLORS[idx % SLICE_COLORS.length] }}
              />
              {editingIdx === idx ? (
                <>
                  <input
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                    autoFocus
                    className="flex-1 text-sm px-2 py-1 border border-accent rounded-md bg-white text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <button
                    onClick={saveEdit}
                    className="text-xs text-accent font-semibold hover:underline"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingIdx(null)}
                    className="text-xs text-text-muted hover:underline"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm text-text-primary truncate">{item}</span>
                  <button
                    onClick={() => startEdit(idx)}
                    className="text-xs text-accent hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeItem(idx)}
                    disabled={items.length <= 2}
                    className="text-xs text-red-500 hover:underline disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ✕
                  </button>
                </>
              )}
            </div>
          ))}
        </div>

        {items.length < 8 && (
          <div className="flex gap-2">
            <input
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addItem()}
              placeholder="Add new item…"
              className="flex-1 text-sm px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            />
            <Button onClick={addItem} disabled={!newItem.trim()} size="sm">
              Add
            </Button>
          </div>
        )}
      </Card>

      {/* History */}
      {history.length > 0 && (
        <Card>
          <h3 className="text-sm font-semibold text-text-primary mb-2">History</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((h, i) => (
              <span
                key={i}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  i === 0
                    ? "bg-accent/10 text-accent"
                    : "bg-surface text-text-secondary"
                }`}
              >
                {h}
              </span>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
