'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const TIPPING_DATA = {
  us: {
    name: 'United States',
    percentage: 18,
    range: '15-20%',
    minExcellent: 20,
    culture: 'Tipping is expected and customary. Tip 15% for average service, 18-20% for good service, 20%+ for excellent.',
    venues: 'Restaurants, bars, taxis, hairdressers, hotels, delivery drivers, baristas',
    warning: 'Tipping is built into service industry wages. Not tipping is considered very rude.',
    excellent: 25,
  },
  canada: {
    name: 'Canada',
    percentage: 18,
    range: '15-20%',
    minExcellent: 20,
    culture: 'Similar to the US. Tipping is customary and expected in most service situations.',
    venues: 'Restaurants, bars, taxis, hairdressers, hotels, delivery',
    warning: 'Tipping culture is strong, especially in major cities like Toronto and Vancouver.',
    excellent: 20,
  },
  uk: {
    name: 'United Kingdom',
    percentage: 10,
    range: '10-12.5%',
    minExcellent: 15,
    culture: 'Tipping is optional and appreciated, not expected. Check if service charge is already included.',
    venues: 'Restaurants and cafes (mainly), rarely in pubs or taxis',
    warning: 'Many restaurants add 12.5% service charge automatically. Check your bill before adding more.',
    excellent: 15,
  },
  australia: {
    name: 'Australia',
    percentage: 0,
    range: '0-10%',
    minExcellent: 10,
    culture: 'Tipping is not expected. Australia has award wages, so staff earn decent salaries. Tip only for exceptional service.',
    venues: 'Rarely tipped, but can tip in upscale restaurants for outstanding service',
    warning: 'Tipping is not part of the culture. You won\'t offend anyone by not tipping.',
    excellent: 10,
  },
  japan: {
    name: 'Japan',
    percentage: 0,
    range: 'NEVER tip',
    minExcellent: 0,
    culture: 'DO NOT TIP. Tipping is considered rude and insulting in Japan. Service is included in the price.',
    venues: 'None - tipping is not done anywhere in Japan',
    warning: 'This is very important: tipping money will be rejected or returned. It is offensive.',
    excellent: 0,
  },
  india: {
    name: 'India',
    percentage: 8,
    range: '5-10%',
    minExcellent: 15,
    culture: 'Tipping is appreciated but not strictly mandatory. Round up or add 5-10% at restaurants.',
    venues: 'Restaurants, hotels, taxis, guides',
    warning: 'In some tourist areas, tipping expectations are higher. Smaller amounts are fine for casual services.',
    excellent: 15,
  },
  germany: {
    name: 'Germany',
    percentage: 5,
    range: '5-10% or round up',
    minExcellent: 10,
    culture: 'Tipping is customary but modest. Round up to the nearest euro or add 5-10%.',
    venues: 'Restaurants, bars, taxis, hairdressers',
    warning: 'In Germany, you typically tell the server the total you want to pay (including tip) rather than leaving cash.',
    excellent: 10,
  },
  france: {
    name: 'France',
    percentage: 0,
    range: 'Service already included',
    minExcellent: 5,
    culture: 'Service is included (service compris). Tipping is not expected but can round up for good service.',
    venues: 'Occasionally at restaurants for exceptional service',
    warning: 'The bill always shows "service compris" (service included). Don\'t tip unless you had outstanding service.',
    excellent: 5,
  },
  italy: {
    name: 'Italy',
    percentage: 0,
    range: 'Not expected',
    minExcellent: 5,
    culture: 'Tipping is not expected. A cover charge (coperto) is often included on your bill.',
    venues: 'Rarely tipped; only for exceptional service',
    warning: 'Check your bill for coperto (cover charge). This is already added and is not a tip.',
    excellent: 5,
  },
  spain: {
    name: 'Spain',
    percentage: 0,
    range: 'Small change or round up',
    minExcellent: 5,
    culture: 'Tipping is not customary. You may leave small change (1-2 euros) or round up if you wish.',
    venues: 'Rare in most venues; not expected',
    warning: 'Spanish service industry does not depend on tips. Leave something only if you enjoyed exceptional service.',
    excellent: 5,
  },
  uae: {
    name: 'United Arab Emirates / Dubai',
    percentage: 12,
    range: '10-15%',
    minExcellent: 15,
    culture: 'Tipping is appreciated. Add 10-15% if no service charge is included.',
    venues: 'Restaurants, hotels, taxis, spas',
    warning: 'Many restaurants automatically add a service charge. Check your bill first.',
    excellent: 15,
  },
  singapore: {
    name: 'Singapore',
    percentage: 0,
    range: 'Not expected',
    minExcellent: 5,
    culture: 'Tipping is not expected. Service charge (10%) is usually already included in restaurants.',
    venues: 'Not customary anywhere',
    warning: 'Service charge is standard on most restaurant bills. No need to add more.',
    excellent: 0,
  },
  china: {
    name: 'China',
    percentage: 0,
    range: 'Not expected',
    minExcellent: 0,
    culture: 'Tipping is not expected and can sometimes be refused or seen as insulting.',
    venues: 'Not tipped anywhere',
    warning: 'Staff may refuse tips or be confused by tipping. Service is already included in prices.',
    excellent: 0,
  },
  southkorea: {
    name: 'South Korea',
    percentage: 0,
    range: 'Not expected',
    minExcellent: 0,
    culture: 'Tipping is not part of the culture. Service is included in the price.',
    venues: 'Not tipped anywhere',
    warning: 'Do not tip in South Korea. It is not customary and may be declined.',
    excellent: 0,
  },
  brazil: {
    name: 'Brazil',
    percentage: 10,
    range: '10%',
    minExcellent: 15,
    culture: 'A 10% service charge (gorjeta) is often automatically added. If not, tip 10%.',
    venues: 'Restaurants, bars, taxis, hotels',
    warning: 'Check your bill to see if service charge is already included before tipping.',
    excellent: 15,
  },
  mexico: {
    name: 'Mexico',
    percentage: 12,
    range: '10-15%',
    minExcellent: 18,
    culture: 'Tipping is customary. Tip 10-15% at restaurants, and for good service, go up to 18-20%.',
    venues: 'Restaurants, bars, hotels, taxis, guides',
    warning: 'In tourist areas, tipping expectations may be higher. Always check if service is already included.',
    excellent: 20,
  },
};

const QUALITY_OPTIONS = [
  { value: 'average', label: 'Average Service' },
  { value: 'good', label: 'Good Service' },
  { value: 'excellent', label: 'Excellent Service' },
];

export default function TippingGuideByCountry() {
  const [country, setCountry] = useState('us');
  const [billAmount, setBillAmount] = useState('50');
  const [serviceQuality, setServiceQuality] = useState('good');
  const [result, setResult] = useState(null);

  const countryOptions = Object.entries(TIPPING_DATA).map(([key, value]) => ({
    value: key,
    label: value.name,
  }));

  function calculate() {
    const data = TIPPING_DATA[country];
    const bill = parseFloat(billAmount) || 0;

    let tipPercentage = data.percentage;
    if (serviceQuality === 'excellent') {
      tipPercentage = data.excellent;
    } else if (serviceQuality === 'average') {
      tipPercentage = Math.max(0, data.percentage - 3);
    }

    const tipAmount = (bill * tipPercentage) / 100;
    const total = bill + tipAmount;

    setResult({
      country: data.name,
      bill,
      tipPercentage,
      tipAmount: tipAmount.toFixed(2),
      total: total.toFixed(2),
      culture: data.culture,
      venues: data.venues,
      warning: data.warning,
      range: data.range,
      serviceQuality,
    });
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-6">
      <Card className="p-6">
        <h2 className="font-heading text-2xl font-bold text-primary mb-6">
          International Tipping Guide
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Country
            </label>
            <Select
              options={countryOptions}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Bill Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-secondary">
                {TIPPING_DATA[country]?.culture?.includes('¥') ? '¥' : '$'}
              </span>
              <Input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="Enter bill amount"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Service Quality
            </label>
            <Select
              options={QUALITY_OPTIONS}
              value={serviceQuality}
              onChange={(e) => setServiceQuality(e.target.value)}
            />
          </div>

          <Button onClick={calculate} className="w-full mt-6">
            Calculate Tip
          </Button>
        </div>
      </Card>

      {result && (
        <div className="space-y-6">
          {/* Quick Result */}
          <Card className="p-6 bg-accent-muted border-2 border-accent">
            <h3 className="font-heading text-xl font-bold text-primary mb-4">
              {result.country}
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-secondary text-sm mb-1">Bill Amount</p>
                <p className="font-mono text-2xl font-bold text-primary">
                  ${parseFloat(result.bill).toFixed(2)}
                </p>
              </div>

              <div>
                <p className="text-secondary text-sm mb-1">
                  Tip ({result.tipPercentage}%)
                </p>
                <p className="font-mono text-2xl font-bold text-accent">
                  ${result.tipAmount}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-secondary text-sm mb-1">Total to Pay</p>
                <p className="font-mono text-3xl font-bold text-accent">
                  ${result.total}
                </p>
              </div>
            </div>

            <p className="text-xs text-secondary mt-4 p-3 bg-white rounded border border-border">
              Typical tipping range: {result.range}
            </p>
          </Card>

          {/* Cultural Information */}
          <Card className="p-6 space-y-4">
            <div>
              <h4 className="font-heading font-bold text-primary mb-2">
                Tipping Culture
              </h4>
              <p className="text-secondary text-sm leading-relaxed">
                {result.culture}
              </p>
            </div>

            <div>
              <h4 className="font-heading font-bold text-primary mb-2">
                Where to Tip
              </h4>
              <p className="text-secondary text-sm leading-relaxed">
                {result.venues}
              </p>
            </div>

            {result.warning && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="font-bold text-yellow-900 text-sm mb-1">
                  Important Note:
                </p>
                <p className="text-yellow-800 text-sm leading-relaxed">
                  {result.warning}
                </p>
              </div>
            )}
          </Card>

          {/* Common Tipping Scenarios */}
          <Card className="p-6">
            <h4 className="font-heading font-bold text-primary mb-4">
              Quick Reference: Common Scenarios
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 font-medium text-primary">
                      Scenario
                    </th>
                    <th className="text-right py-2 px-2 font-medium text-primary">
                      Recommendation
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Restaurant (full service)</td>
                    <td className="text-right font-mono text-primary">
                      {TIPPING_DATA[country].percentage}%
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Bar / Cafe</td>
                    <td className="text-right font-mono text-primary">
                      {Math.round(TIPPING_DATA[country].percentage * 1.1)}%
                    </td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-2">Taxi / Rideshare</td>
                    <td className="text-right font-mono text-primary">
                      {TIPPING_DATA[country].percentage}%
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-2">Hotel / Bellhop</td>
                    <td className="text-right font-mono text-primary">
                      {TIPPING_DATA[country].percentage > 0
                        ? '$2-5 per bag'
                        : 'Optional'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
