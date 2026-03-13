'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';

const tippingGuides = {
  usa: {
    name: 'United States',
    currency: 'USD',
    services: [
      { type: 'Restaurants', percentage: '15-20%', note: 'Standard for table service. 10% for poor service.', included: false },
      { type: 'Bar', percentage: '15-20%', note: 'Per drink or per round.', included: false },
      { type: 'Taxi/Rideshare', percentage: '15-20%', note: 'Based on fare.', included: false },
      { type: 'Hotel Bellhop', percentage: '$1-2 per bag', note: 'Regardless of service quality.', included: false },
      { type: 'Room Service', percentage: '15-20%', note: 'Often added automatically.', included: false },
      { type: 'Delivery', percentage: '15-20%', note: 'Especially in bad weather.', included: false },
      { type: 'Hairdresser', percentage: '15-20%', note: 'For good service.', included: false },
    ]
  },
  uk: {
    name: 'United Kingdom',
    currency: 'GBP',
    services: [
      { type: 'Restaurants', percentage: '10-15%', note: 'Optional. Often added automatically at 12.5%.', included: false },
      { type: 'Bar', percentage: '£1-2', note: 'Discretionary, not expected.', included: false },
      { type: 'Taxi', percentage: '10%', note: 'Round up or add 10%.', included: false },
      { type: 'Hotel Bellhop', percentage: '50p-£1 per bag', note: 'Appreciated but not obligatory.', included: false },
      { type: 'Delivery', percentage: 'Not expected', note: 'Rarely tipped.', included: false },
      { type: 'Hairdresser', percentage: '10-15%', note: 'Good service appreciated.', included: false },
    ]
  },
  france: {
    name: 'France',
    currency: 'EUR',
    services: [
      { type: 'Restaurants', percentage: 'Included', note: 'Service charge is included in the bill.', included: true },
      { type: 'Bar', percentage: 'Not expected', note: 'Tipping is very rare.', included: true },
      { type: 'Taxi', percentage: 'Round up', note: 'Rounding up is polite, 5-10% for long trips.', included: false },
      { type: 'Hotel Bellhop', percentage: '€1-2 per bag', note: 'Not required.', included: false },
      { type: 'Delivery', percentage: 'Not expected', note: 'Service charge included.', included: true },
      { type: 'Hairdresser', percentage: '5-10%', note: 'Optional.', included: false },
    ]
  },
  germany: {
    name: 'Germany',
    currency: 'EUR',
    services: [
      { type: 'Restaurants', percentage: '5-10%', note: 'Usually included. Add 5-10% for good service.', included: true },
      { type: 'Bar', percentage: 'Round up', note: 'Rounding up is common.', included: false },
      { type: 'Taxi', percentage: '5-10%', note: 'Round up or add 10%.', included: false },
      { type: 'Hotel Bellhop', percentage: '€1-2', note: 'Appreciated but not required.', included: false },
      { type: 'Delivery', percentage: '5%', note: 'Optional.', included: false },
      { type: 'Hairdresser', percentage: '5-10%', note: 'Expected.', included: false },
    ]
  },
  japan: {
    name: 'Japan',
    currency: 'JPY',
    services: [
      { type: 'Restaurants', percentage: 'Never', note: 'Tipping is not done and can be offensive.', included: true },
      { type: 'Bar', percentage: 'Never', note: 'Not part of the culture.', included: true },
      { type: 'Taxi', percentage: 'Never', note: 'Drivers may refuse.', included: true },
      { type: 'Hotel Bellhop', percentage: 'Not expected', note: 'Included in hotel costs.', included: true },
      { type: 'Delivery', percentage: 'Not expected', note: 'No tipping culture.', included: true },
      { type: 'Hairdresser', percentage: 'Not expected', note: 'Service charge included.', included: true },
    ]
  },
  australia: {
    name: 'Australia',
    currency: 'AUD',
    services: [
      { type: 'Restaurants', percentage: '10-15%', note: 'Optional. Service workers are well paid.', included: false },
      { type: 'Bar', percentage: '10-15%', note: 'Or round up per drink.', included: false },
      { type: 'Taxi', percentage: 'Round up', note: 'Rounding up is polite.', included: false },
      { type: 'Hotel Bellhop', percentage: '$1-2 per bag', note: 'Appreciated.', included: false },
      { type: 'Delivery', percentage: 'Not expected', note: 'Rarely tipped.', included: false },
      { type: 'Hairdresser', percentage: '10-15%', note: 'Good service appreciated.', included: false },
    ]
  },
  canada: {
    name: 'Canada',
    currency: 'CAD',
    services: [
      { type: 'Restaurants', percentage: '15-20%', note: 'Expected for table service.', included: false },
      { type: 'Bar', percentage: '15-20%', note: 'Per drink or per round.', included: false },
      { type: 'Taxi', percentage: '15%', note: 'Based on fare.', included: false },
      { type: 'Hotel Bellhop', percentage: '$1-2 per bag', note: 'Appreciated.', included: false },
      { type: 'Delivery', percentage: '10-15%', note: 'Expected.', included: false },
      { type: 'Hairdresser', percentage: '15-20%', note: 'For good service.', included: false },
    ]
  },
  spain: {
    name: 'Spain',
    currency: 'EUR',
    services: [
      { type: 'Restaurants', percentage: 'Included', note: 'Service included. Leave 5-10% for excellent service.', included: true },
      { type: 'Bar', percentage: 'Round up', note: 'Rounding up or small change.', included: false },
      { type: 'Taxi', percentage: '5-10%', note: 'Round up or add 5-10%.', included: false },
      { type: 'Hotel Bellhop', percentage: '€1-2', note: 'Not required.', included: false },
      { type: 'Delivery', percentage: 'Not expected', note: 'Service charge included.', included: true },
      { type: 'Hairdresser', percentage: '5-10%', note: 'Optional.', included: false },
    ]
  },
  thailand: {
    name: 'Thailand',
    currency: 'THB',
    services: [
      { type: 'Restaurants', percentage: '10%', note: 'Expected at most restaurants.', included: false },
      { type: 'Bar', percentage: '10-20 baht', note: 'Per drink or round up.', included: false },
      { type: 'Taxi', percentage: 'Round up', note: 'Small change or round to nearest baht.', included: false },
      { type: 'Hotel Bellhop', percentage: '20-50 baht', note: 'Per bag.', included: false },
      { type: 'Delivery', percentage: 'Not expected', note: 'Rarely done.', included: false },
      { type: 'Hairdresser', percentage: '10-20%', note: 'Optional.', included: false },
    ]
  },
};

export default function TippingGuideAbroad() {
  const [selectedCountry, setSelectedCountry] = useState('uk');

  const guide = tippingGuides[selectedCountry];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <label className="block text-text-secondary text-sm font-medium mb-2">
          Select Country
        </label>
        <Select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)} className="w-full">
          {Object.entries(tippingGuides).map(([key, { name }]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </Select>
      </div>

      {guide && (
        <div className="space-y-4">
          <div className="bg-accent text-white border border-accent rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-2xl font-bold mb-2">{guide.name}</h2>
            <p className="text-sm opacity-90">Currency: {guide.currency}</p>
          </div>

          <div className="space-y-3">
            {guide.services.map((service) => (
              <div key={service.type} className="bg-surface border border-border rounded-[var(--radius-card)] p-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-heading text-base font-bold text-text-primary">{service.type}</h4>
                  <div className="bg-accent text-white px-3 py-1 rounded text-sm font-mono font-bold">
                    {service.percentage}
                  </div>
                </div>
                <p className="text-text-secondary text-sm">{service.note}</p>
                {service.included && (
                  <div className="mt-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    Service Included
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm">
              Tip: Always check your bill to see if service charge is already included. When in doubt, tip 10-15% or round up.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
