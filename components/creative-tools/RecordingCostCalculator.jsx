'use client';

import { useState, useMemo } from 'react';

const inputCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent font-mono";
const selectCls = "w-full px-2 py-1.5 text-[13px] rounded-[var(--radius-input)] border border-border bg-white text-text-primary outline-none focus:border-accent cursor-pointer";

export default function RecordingCostCalculator() {
  const [tracks, setTracks] = useState('8');
  const [studioRate, setStudioRate] = useState('40');
  const [trackingHours, setTrackingHours] = useState('4');
  const [mixingHours, setMixingHours] = useState('3');
  const [masteringHours, setMasteringHours] = useState('2');
  const [sessionMusicians, setSessionMusicians] = useState('0');
  const [musicianRate, setMusicianRate] = useState('50');
  const [artworkCost, setArtworkCost] = useState('200');
  const [cdQuantity, setCdQuantity] = useState('0');
  const [cdUnitCost, setCdUnitCost] = useState('2');
  const [distributionFees, setDistributionFees] = useState('50');

  const results = useMemo(() => {
    const t = parseFloat(tracks) || 0;
    const sr = parseFloat(studioRate) || 0;
    const th = parseFloat(trackingHours) || 0;
    const mh = parseFloat(mixingHours) || 0;
    const mah = parseFloat(masteringHours) || 0;
    const sm = parseFloat(sessionMusicians) || 0;
    const mr = parseFloat(musicianRate) || 0;
    const ac = parseFloat(artworkCost) || 0;
    const cdq = parseFloat(cdQuantity) || 0;
    const cuc = parseFloat(cdUnitCost) || 0;
    const df = parseFloat(distributionFees) || 0;

    if (t <= 0 || sr <= 0) return null;

    const trackingCost = t * th * sr;
    const mixingCost = t * mh * sr;
    const masteringCost = mah * sr;
    const musicianCost = sm * mr;
    const cdPressingCost = cdq * cuc;

    const totalCost = trackingCost + mixingCost + masteringCost + musicianCost + ac + cdPressingCost + df;
    const costPerTrack = totalCost / t;

    return {
      trackingCost: trackingCost.toFixed(2),
      mixingCost: mixingCost.toFixed(2),
      masteringCost: masteringCost.toFixed(2),
      musicianCost: musicianCost.toFixed(2),
      cdPressingCost: cdPressingCost.toFixed(2),
      artworkCost: ac.toFixed(2),
      distributionFees: df.toFixed(2),
      totalCost: totalCost.toFixed(2),
      costPerTrack: costPerTrack.toFixed(2),
    };
  }, [tracks, studioRate, trackingHours, mixingHours, masteringHours, sessionMusicians, musicianRate, artworkCost, cdQuantity, cdUnitCost, distributionFees]);

  const fmt = (n) => '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-4 items-start">
        {/* Left Panel */}
        <div className="bg-surface border border-border rounded-lg p-4 space-y-3">
          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Number of Tracks</label>
            <input type="number" value={tracks} onChange={(e) => setTracks(e.target.value)} min="1" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Studio Rate (per hour)</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={studioRate} onChange={(e) => setStudioRate(e.target.value)} min="0" step="5" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Tracking Hours per Track</label>
            <input type="number" value={trackingHours} onChange={(e) => setTrackingHours(e.target.value)} min="0" step="0.5" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Mixing Hours per Track</label>
            <input type="number" value={mixingHours} onChange={(e) => setMixingHours(e.target.value)} min="0" step="0.5" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Mastering Hours (total)</label>
            <input type="number" value={masteringHours} onChange={(e) => setMasteringHours(e.target.value)} min="0" step="0.5" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Session Musicians</label>
            <input type="number" value={sessionMusicians} onChange={(e) => setSessionMusicians(e.target.value)} min="0" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Musician Rate per Session</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={musicianRate} onChange={(e) => setMusicianRate(e.target.value)} min="0" step="5" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Artwork Cost</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={artworkCost} onChange={(e) => setArtworkCost(e.target.value)} min="0" step="10" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">CD Pressing Quantity</label>
            <input type="number" value={cdQuantity} onChange={(e) => setCdQuantity(e.target.value)} min="0" className={inputCls} />
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Cost per CD Unit</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={cdUnitCost} onChange={(e) => setCdUnitCost(e.target.value)} min="0" step="0.10" className={inputCls} />
            </div>
          </div>

          <div>
            <label className="block text-text-primary text-[13px] font-medium mb-1">Digital Distribution Fees</label>
            <div className="flex gap-2 items-center">
              <span className="text-text-secondary text-[13px]">£</span>
              <input type="number" value={distributionFees} onChange={(e) => setDistributionFees(e.target.value)} min="0" step="10" className={inputCls} />
            </div>
          </div>
        </div>

        {/* Right Panel */}
        {results && (
          <div className="bg-accent-muted border border-border rounded-lg p-6 space-y-5">
            <div>
              <h3 className="text-text-secondary text-[13px] font-medium mb-2">Total Album Cost</h3>
              <p className="font-mono text-5xl font-bold text-accent">{fmt(results.totalCost)}</p>
            </div>

            <div className="bg-white rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Cost per Track</span>
                <span className="font-mono font-semibold text-text-primary">{fmt(results.costPerTrack)}</span>
              </div>

              <hr className="border-border" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tracking</span>
                  <span className="font-mono">{fmt(results.trackingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Mixing</span>
                  <span className="font-mono">{fmt(results.mixingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Mastering</span>
                  <span className="font-mono">{fmt(results.masteringCost)}</span>
                </div>
                {parseFloat(results.musicianCost) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Session Musicians</span>
                    <span className="font-mono">{fmt(results.musicianCost)}</span>
                  </div>
                )}
                {parseFloat(results.artworkCost) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Artwork</span>
                    <span className="font-mono">{fmt(results.artworkCost)}</span>
                  </div>
                )}
                {parseFloat(results.cdPressingCost) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">CD Pressing</span>
                    <span className="font-mono">{fmt(results.cdPressingCost)}</span>
                  </div>
                )}
                {parseFloat(results.distributionFees) > 0 && (
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Distribution</span>
                    <span className="font-mono">{fmt(results.distributionFees)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100 text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Budget Tip</p>
              <p>Consider starting with fewer tracks or shorter mixing sessions to reduce costs. Many artists phase their releases over time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
