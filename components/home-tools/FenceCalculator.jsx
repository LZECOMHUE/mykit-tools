'use client';

import { useState, useMemo } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const FENCE_HEIGHTS = [
  { value: 0.9, label: '0.9m (3ft)' },
  { value: 1.2, label: '1.2m (4ft)' },
  { value: 1.5, label: '1.5m (5ft)' },
  { value: 1.8, label: '1.8m (6ft)' },
  { value: 2, label: '2m' },
];

const PANEL_WIDTHS = [
  { value: 1.83, label: '1.83m (6ft) - Standard UK' },
  { value: 1.5, label: '1.5m' },
  { value: 2, label: '2m' },
];

export default function FenceCalculator() {
  const [fenceLength, setFenceLength] = useState(20);
  const [unit, setUnit] = useState('m');
  const [fenceHeight, setFenceHeight] = useState(1.8);
  const [panelWidth, setPanelWidth] = useState(1.83);
  const [customPanelWidth, setCustomPanelWidth] = useState(false);
  const [customWidth, setCustomWidth] = useState(1.83);
  const [fixingType, setFixingType] = useState('concrete'); // 'concrete' or 'spike'
  const [includeGate, setIncludeGate] = useState(false);
  const [gateType, setGateType] = useState('single'); // 'single' or 'double'
  const [includeGravelBoard, setIncludeGravelBoard] = useState(false);
  const [pricePerPanel, setPricePerPanel] = useState(25);
  const [pricePerPost, setPricePerPost] = useState(8);
  const [pricePerCap, setPricePerCap] = useState(2);
  const [pricePerBag, setPricePerBag] = useState(3);
  const [pricePerSpike, setPricePerSpike] = useState(6);

  const fmt = (n) =>
    '£' + parseFloat(n).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Convert to metres
  const fenceLengthMetres = useMemo(() => {
    return unit === 'ft' ? fenceLength * 0.3048 : fenceLength;
  }, [fenceLength, unit]);

  // Get current panel width
  const currentPanelWidth = customPanelWidth ? customWidth : panelWidth;

  // Calculate materials needed
  const calculations = useMemo(() => {
    // Account for gate width
    let effectiveFenceLength = fenceLengthMetres;
    if (includeGate) {
      const gateWidth = gateType === 'double' ? 3 : 0.9;
      effectiveFenceLength = fenceLengthMetres - gateWidth;
    }

    // Number of panels
    const panelsNeeded = Math.ceil(effectiveFenceLength / currentPanelWidth);

    // Number of posts (panels + 1, but gate uses 2 instead of 1)
    let postsNeeded = panelsNeeded + 1;

    // Post concrete bags (one 20kg bag per post for 1.8m post)
    const concretePerPost = fixingType === 'concrete' ? 1 : 0;
    const totalConcreteBags = postsNeeded * concretePerPost;

    // Post spikes instead of concrete
    const spikesNeeded = fixingType === 'spike' ? postsNeeded : 0;

    // Post caps
    const postCapsNeeded = postsNeeded;

    // Gravel boards (one per panel)
    const gravelBoardsNeeded = includeGravelBoard ? panelsNeeded : 0;

    // Calculate costs
    const panelsCost = panelsNeeded * pricePerPanel;
    const postsCost = postsNeeded * pricePerPost;
    const capsCost = postCapsNeeded * pricePerCap;
    const concreteCost = totalConcreteBags * pricePerBag;
    const spikesCost = spikesNeeded * pricePerSpike;
    const gravelBoardsCost = gravelBoardsNeeded * 3; // standard £3 per board

    let gateCost = 0;
    if (includeGate) {
      gateCost = gateType === 'double' ? 45 : 35; // approx cost
    }

    const totalCost =
      panelsCost + postsCost + capsCost + concreteCost + spikesCost + gravelBoardsCost + gateCost;

    return {
      effectiveFenceLength: effectiveFenceLength.toFixed(2),
      panelsNeeded,
      postsNeeded,
      postCapsNeeded,
      concretePerPost,
      totalConcreteBags,
      spikesNeeded,
      gravelBoardsNeeded,
      panelsCost,
      postsCost,
      capsCost,
      concreteCost,
      spikesCost,
      gravelBoardsCost,
      gateCost,
      totalCost,
    };
  }, [fenceLengthMetres, currentPanelWidth, includeGate, gateType, fixingType, includeGravelBoard, pricePerPanel, pricePerPost, pricePerCap, pricePerBag, pricePerSpike]);

  return (
    <div className="space-y-3">
      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Fence Length</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Fence Length ({unit})
            </label>
            <Input
              type="number"
              step="0.1"
              min="0"
              value={fenceLength}
              onChange={(e) => setFenceLength(parseFloat(e.target.value) || 0)}
              placeholder="Fence length"
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">Unit</label>
            <Select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="m">Metres</option>
              <option value="ft">Feet</option>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Fence Specifications</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Fence Height</label>
            <div className="flex gap-2 flex-wrap mb-3">
              {FENCE_HEIGHTS.map((height) => (
                <Button
                  key={height.value}
                  variant={fenceHeight === height.value ? 'primary' : 'secondary'}
                  onClick={() => setFenceHeight(height.value)}
                  className="text-sm"
                >
                  {height.label}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-text-secondary text-sm font-medium mb-2">Panel Width</label>
            {!customPanelWidth && (
              <>
                <div className="flex gap-2 flex-wrap mb-3">
                  {PANEL_WIDTHS.map((width) => (
                    <Button
                      key={width.value}
                      variant={panelWidth === width.value ? 'primary' : 'secondary'}
                      onClick={() => setPanelWidth(width.value)}
                      className="text-sm"
                    >
                      {width.label}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setCustomPanelWidth(true)}
                  className="text-sm"
                >
                  Custom Width
                </Button>
              </>
            )}
            {customPanelWidth && (
              <div className="space-y-2">
                <Input
                  type="number"
                  step="0.01"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(parseFloat(e.target.value) || 0)}
                  placeholder="Width in metres"
                />
                <Button
                  variant="ghost"
                  onClick={() => setCustomPanelWidth(false)}
                  className="text-sm"
                >
                  Use Presets
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Post Fixing</h2>
        <div className="flex gap-2 mb-4">
          <Button
            variant={fixingType === 'concrete' ? 'primary' : 'secondary'}
            onClick={() => setFixingType('concrete')}
            className="text-sm"
          >
            Concrete Bags
          </Button>
          <Button
            variant={fixingType === 'spike' ? 'primary' : 'secondary'}
            onClick={() => setFixingType('spike')}
            className="text-sm"
          >
            Post Spikes
          </Button>
        </div>
        <p className="text-text-muted text-xs">
          {fixingType === 'concrete'
            ? '1× 20kg bag per post depth'
            : 'Adjustable metal spikes for easier installation'}
        </p>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Optional Additions</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={includeGravelBoard}
              onChange={(e) => setIncludeGravelBoard(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border border-border accent-accent"
            />
            <div>
              <p className="text-text-primary font-medium">Gravel Board</p>
              <p className="text-text-muted text-xs">One board per panel (prevents rot at base)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={includeGate}
              onChange={(e) => setIncludeGate(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border border-border accent-accent"
            />
            <div className="flex-1">
              <p className="text-text-primary font-medium">Include Gate</p>
              {includeGate && (
                <div className="mt-2 flex gap-2">
                  <Button
                    variant={gateType === 'single' ? 'primary' : 'secondary'}
                    onClick={() => setGateType('single')}
                    className="text-sm"
                  >
                    Single (0.9m)
                  </Button>
                  <Button
                    variant={gateType === 'double' ? 'primary' : 'secondary'}
                    onClick={() => setGateType('double')}
                    className="text-sm"
                  >
                    Double (1.8m)
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="text-text-primary font-heading text-base font-bold mb-3">Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Panel (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerPanel}
              onChange={(e) => setPricePerPanel(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Post (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerPost}
              onChange={(e) => setPricePerPost(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Post Cap (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerCap}
              onChange={(e) => setPricePerCap(parseFloat(e.target.value) || 0)}
            />
          </div>
          <div>
            <label className="block text-text-secondary text-sm font-medium mb-1">
              Price Per Concrete Bag (£)
            </label>
            <Input
              type="number"
              step="0.01"
              value={pricePerBag}
              onChange={(e) => setPricePerBag(parseFloat(e.target.value) || 0)}
            />
          </div>
          {fixingType === 'spike' && (
            <div>
              <label className="block text-text-secondary text-sm font-medium mb-1">
                Price Per Spike (£)
              </label>
              <Input
                type="number"
                step="0.01"
                value={pricePerSpike}
                onChange={(e) => setPricePerSpike(parseFloat(e.target.value) || 0)}
              />
            </div>
          )}
        </div>
      </Card>

      <Card className="border-2 border-accent bg-accent bg-opacity-5">
        <h2 className="text-text-primary font-heading text-xl font-bold mb-3">Results</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-text-secondary text-sm mb-1">Fence Length</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">
              {calculations.effectiveFenceLength} m
            </p>
          </div>
          <div>
            <p className="text-text-secondary text-sm mb-1">Fence Height</p>
            <p className="font-mono-num text-2xl font-bold text-text-primary">{fenceHeight}m</p>
          </div>
        </div>

        <div className="border-t border-border pt-6 mb-6">
          <h3 className="text-text-primary font-heading text-lg font-bold mb-4">Materials Needed</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-secondary">Panels</span>
              <span className="font-mono-num font-bold text-text-primary">
                {calculations.panelsNeeded}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Posts</span>
              <span className="font-mono-num font-bold text-text-primary">
                {calculations.postsNeeded}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Post Caps</span>
              <span className="font-mono-num font-bold text-text-primary">
                {calculations.postCapsNeeded}
              </span>
            </div>
            {fixingType === 'concrete' && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Concrete Bags (20kg)</span>
                <span className="font-mono-num font-bold text-text-primary">
                  {calculations.totalConcreteBags}
                </span>
              </div>
            )}
            {fixingType === 'spike' && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Post Spikes</span>
                <span className="font-mono-num font-bold text-text-primary">
                  {calculations.spikesNeeded}
                </span>
              </div>
            )}
            {includeGravelBoard && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Gravel Boards</span>
                <span className="font-mono-num font-bold text-text-primary">
                  {calculations.gravelBoardsNeeded}
                </span>
              </div>
            )}
            {includeGate && (
              <div className="flex justify-between">
                <span className="text-text-secondary">
                  {gateType === 'single' ? 'Single Gate' : 'Double Gate'}
                </span>
                <span className="font-mono-num font-bold text-text-primary">1</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-surface rounded p-4">
          <p className="text-text-secondary text-sm mb-3">Cost Breakdown</p>
          <div className="space-y-2 text-sm mb-4">
            {calculations.panelsCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Panels</span>
                <span className="font-mono-num">{fmt(calculations.panelsCost)}</span>
              </div>
            )}
            {calculations.postsCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Posts</span>
                <span className="font-mono-num">{fmt(calculations.postsCost)}</span>
              </div>
            )}
            {calculations.capsCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Post Caps</span>
                <span className="font-mono-num">{fmt(calculations.capsCost)}</span>
              </div>
            )}
            {calculations.concreteCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Concrete</span>
                <span className="font-mono-num">{fmt(calculations.concreteCost)}</span>
              </div>
            )}
            {calculations.spikesCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Spikes</span>
                <span className="font-mono-num">{fmt(calculations.spikesCost)}</span>
              </div>
            )}
            {calculations.gravelBoardsCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Gravel Boards</span>
                <span className="font-mono-num">{fmt(calculations.gravelBoardsCost)}</span>
              </div>
            )}
            {calculations.gateCost > 0 && (
              <div className="flex justify-between">
                <span className="text-text-secondary">Gate</span>
                <span className="font-mono-num">{fmt(calculations.gateCost)}</span>
              </div>
            )}
          </div>
          <div className="border-t border-border pt-3">
            <p className="text-text-secondary text-sm mb-1">Total Cost</p>
            <p className="font-mono-num text-3xl font-bold text-accent">{fmt(calculations.totalCost)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
