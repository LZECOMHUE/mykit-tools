'use client';

import { useState, useMemo } from 'react';

const inputCls = 'w-full px-3 py-2 bg-white border border-[#e5e5e5] rounded-[8px] text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb1f] transition-colors';
const selectCls = 'w-full px-3 py-2 bg-white border border-[#e5e5e5] rounded-[8px] text-[13px] text-[#1a1a1a] focus:outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb1f] transition-colors cursor-pointer';
const cardCls = 'bg-white border border-[#e5e5e5] rounded-[12px] p-6';

const canvasSizes = [
  { label: 'A4', cmW: 21, cmH: 29.7, aspectRatio: '3:4', frameType: 'A4', roomSize: 'Small' },
  { label: 'A3', cmW: 29.7, cmH: 42, aspectRatio: '3:4', frameType: 'A3', roomSize: 'Small' },
  { label: 'A2', cmW: 42, cmH: 59.4, aspectRatio: '3:4', frameType: 'A2', roomSize: 'Medium' },
  { label: '30x40cm', cmW: 30, cmH: 40, aspectRatio: '3:4', frameType: 'Standard', roomSize: 'Small' },
  { label: '40x50cm', cmW: 40, cmH: 50, aspectRatio: '4:5', frameType: 'Standard', roomSize: 'Medium' },
  { label: '50x60cm', cmW: 50, cmH: 60, aspectRatio: '5:6', frameType: 'Standard', roomSize: 'Medium' },
  { label: '60x80cm', cmW: 60, cmH: 80, aspectRatio: '3:4', frameType: 'Standard', roomSize: 'Large' },
  { label: '70x100cm', cmW: 70, cmH: 100, aspectRatio: '7:10', frameType: 'Standard', roomSize: 'Large' },
  { label: '80x100cm', cmW: 80, cmH: 100, aspectRatio: '4:5', frameType: 'Large', roomSize: 'Large' },
  { label: '100x120cm', cmW: 100, cmH: 120, aspectRatio: '5:6', frameType: 'Large', roomSize: 'Extra Large' },
  { label: '12x16"', cmW: 30.5, cmH: 40.6, aspectRatio: '3:4', frameType: 'US Standard', roomSize: 'Small' },
  { label: '16x20"', cmW: 40.6, cmH: 50.8, aspectRatio: '4:5', frameType: 'US Standard', roomSize: 'Medium' },
  { label: '18x24"', cmW: 45.7, cmH: 61, aspectRatio: '3:4', frameType: 'US Standard', roomSize: 'Medium' },
  { label: '24x36"', cmW: 61, cmH: 91.4, aspectRatio: '2:3', frameType: 'US Standard', roomSize: 'Large' },
  { label: '30x40"', cmW: 76.2, cmH: 101.6, aspectRatio: '3:4', frameType: 'US Standard', roomSize: 'Large' },
];

export default function CanvasSizeGuide() {
  const [sortBy, setSortBy] = useState('size');
  const [filterRoom, setFilterRoom] = useState('all');

  const filtered = useMemo(() => {
    let result = canvasSizes;
    if (filterRoom !== 'all') {
      result = result.filter(s => s.roomSize === filterRoom);
    }

    if (sortBy === 'size') {
      result = [...result].sort((a, b) => (a.cmW * a.cmH) - (b.cmW * b.cmH));
    } else if (sortBy === 'aspect') {
      result = [...result].sort((a, b) => a.aspectRatio.localeCompare(b.aspectRatio));
    }

    return result;
  }, [sortBy, filterRoom]);

  const roomSizes = ['Small', 'Medium', 'Large', 'Extra Large'];

  return (
    <div className="max-w-4xl space-y-4">
      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div>
          <label className="text-[13px] text-[#525252] mb-1 block">Sort By</label>
          <select
            className={selectCls}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="size">Canvas Area (smallest first)</option>
            <option value="aspect">Aspect Ratio</option>
          </select>
        </div>
        <div>
          <label className="text-[13px] text-[#525252] mb-1 block">Filter by Room Size</label>
          <select
            className={selectCls}
            value={filterRoom}
            onChange={(e) => setFilterRoom(e.target.value)}
          >
            <option value="all">All Sizes</option>
            {roomSizes.map(room => (
              <option key={room} value={room}>{room}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Size Guide Cards */}
      <div className="space-y-2">
        {filtered.map((size, idx) => {
          const areaInches = (size.cmW / 2.54) * (size.cmH / 2.54);
          const areaCm = size.cmW * size.cmH;

          return (
            <div key={idx} className={cardCls}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
                <div>
                  <p className="text-[#a3a3a3] mb-1">Size</p>
                  <p className="font-semibold text-[#1a1a1a]">{size.label}</p>
                </div>
                <div>
                  <p className="text-[#a3a3a3] mb-1">Dimensions</p>
                  <p className="font-mono text-[#1a1a1a]">
                    {size.cmW}×{size.cmH}cm
                  </p>
                  <p className="text-[#a3a3a3] text-[12px]">
                    {(size.cmW / 2.54).toFixed(1)}×{(size.cmH / 2.54).toFixed(1)}"
                  </p>
                </div>
                <div>
                  <p className="text-[#a3a3a3] mb-1">Aspect Ratio</p>
                  <p className="font-semibold text-[#1a1a1a]">{size.aspectRatio}</p>
                </div>
                <div>
                  <p className="text-[#a3a3a3] mb-1">Recommended For</p>
                  <p className="font-semibold text-[#1a1a1a]">{size.roomSize}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guidelines */}
      <div className={`${cardCls} bg-[#2563eb12]`}>
        <h3 className="font-heading text-sm font-semibold text-[#1a1a1a] mb-3">Room Size Guidelines</h3>
        <div className="space-y-2 text-[13px]">
          <div>
            <p className="font-semibold text-[#1a1a1a]">Small Rooms (10-15m²)</p>
            <p className="text-[#525252]">A4, A3, 30×40cm — works over desk or small wall space</p>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a]">Medium Rooms (15-25m²)</p>
            <p className="text-[#525252]">A2, 40×50cm, 50×70cm — focal point above sofa or bed</p>
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a]">Large Rooms (25m²+)</p>
            <p className="text-[#525252]">60×80cm, 70×100cm, 80×100cm — makes a statement, fills tall walls</p>
          </div>
        </div>
      </div>

      {/* Standard Frames Info */}
      <div className={`${cardCls} bg-[#f8f8f8]`}>
        <h3 className="font-heading text-sm font-semibold text-[#1a1a1a] mb-3">Frame Availability</h3>
        <p className="text-[13px] text-[#525252] leading-relaxed">
          Standard frame sizes (A4, A3, A2, 12×16", 16×20", etc.) are widely available at frame shops and online retailers. Custom sizes like 60×80cm may need bespoke framing, which adds cost.
        </p>
      </div>
    </div>
  );
}
