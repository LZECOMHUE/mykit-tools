'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

const giftIdeas = {
  dad: {
    sport: {
      under10: [
        { name: 'Golf balls (premium set)', price: '10' },
        { name: 'Sports socks set', price: '9' },
      ],
      '10-25': [
        { name: 'Golf glove and balls bundle', price: '20' },
        { name: 'Sports watch', price: '25' },
      ],
      '25-50': [
        { name: 'Golf rangefinder', price: '45' },
        { name: 'Football kit or shirt', price: '40' },
      ],
      over50: [
        { name: 'Golf clubs set', price: '200' },
        { name: 'Match day experience', price: '150' },
      ],
    },
    cooking: {
      under10: [
        { name: 'BBQ tool set', price: '10' },
        { name: 'Specialty hot sauce collection', price: '9' },
      ],
      '10-25': [
        { name: 'Premium BBQ rub set', price: '18' },
        { name: 'Steak knives set', price: '22' },
      ],
      '25-50': [
        { name: 'Smoking thermometer', price: '40' },
        { name: 'Cookery class voucher', price: '45' },
      ],
      over50: [
        { name: 'Premium BBQ smoker', price: '400' },
        { name: 'Luxury dining experience', price: '150' },
      ],
    },
    diy: {
      under10: [
        { name: 'LED work light', price: '10' },
        { name: 'Screwdriver bit set', price: '8' },
      ],
      '10-25': [
        { name: 'Tool belt', price: '20' },
        { name: 'Cordless drill bits', price: '18' },
      ],
      '25-50': [
        { name: 'Power tools bundle', price: '45' },
        { name: 'Workshop storage system', price: '50' },
      ],
      over50: [
        { name: 'Premium power tool set', price: '300' },
        { name: 'Workshop cabinet', price: '200' },
      ],
    },
    gaming: {
      under10: [
        { name: 'Gaming chair cushion', price: '10' },
        { name: 'Game gift card', price: '10' },
      ],
      '10-25': [
        { name: 'Gaming headset', price: '20' },
        { name: 'Controller pad', price: '25' },
      ],
      '25-50': [
        { name: 'Gaming mouse and keyboard', price: '45' },
        { name: 'VR headset accessory', price: '40' },
      ],
      over50: [
        { name: 'High-end gaming setup', price: '500' },
        { name: 'Latest gaming console', price: '300' },
      ],
    },
    music: {
      under10: [
        { name: 'Vinyl record (classic)', price: '10' },
        { name: 'Guitar strings set', price: '8' },
      ],
      '10-25': [
        { name: 'Premium headphones', price: '20' },
        { name: 'Bluetooth speaker', price: '25' },
      ],
      '25-50': [
        { name: 'Vinyl turntable', price: '45' },
        { name: 'Quality studio headphones', price: '50' },
      ],
      over50: [
        { name: 'Electric guitar', price: '300' },
        { name: 'Vintage vinyl collection starter', price: '200' },
      ],
    },
    outdoors: {
      under10: [
        { name: 'Camping mug set', price: '10' },
        { name: 'Survival paracord', price: '8' },
      ],
      '10-25': [
        { name: 'Fishing tackle set', price: '20' },
        { name: 'Outdoor watch', price: '25' },
      ],
      '25-50': [
        { name: 'Quality hiking boots', price: '45' },
        { name: 'Camping tent upgrade', price: '50' },
      ],
      over50: [
        { name: 'Premium camping gear bundle', price: '300' },
        { name: 'Adventure trip experience', price: '250' },
      ],
    },
    tech: {
      under10: [
        { name: 'Phone stand', price: '10' },
        { name: 'USB-C cable bundle', price: '9' },
      ],
      '10-25': [
        { name: 'Wireless charging pad', price: '18' },
        { name: 'Portable power bank', price: '22' },
      ],
      '25-50': [
        { name: 'Smart home device', price: '40' },
        { name: 'Quality laptop stand', price: '35' },
      ],
      over50: [
        { name: 'Premium laptop', price: '800' },
        { name: 'Smart home system', price: '200' },
      ],
    },
    cars: {
      under10: [
        { name: 'Car air freshener premium', price: '10' },
        { name: 'Microfiber cloth set', price: '8' },
      ],
      '10-25': [
        { name: 'Car detailing kit', price: '20' },
        { name: 'Dash cam', price: '25' },
      ],
      '25-50': [
        { name: 'Premium car seat covers', price: '45' },
        { name: 'Wheel cleaning kit', price: '40' },
      ],
      over50: [
        { name: 'Car alarm system', price: '200' },
        { name: 'Track day experience', price: '300' },
      ],
    },
  },
};

export default function FathersDayGiftIdeaGenerator() {
  const [interests, setInterests] = useState(['sport']);
  const [budget, setBudget] = useState('25-50');
  const [ideas, setIdeas] = useState([]);

  const toggleInterest = (interest) => {
    setInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generateIdeas = () => {
    const ideas_list = [];
    interests.forEach(interest => {
      const categoryIdeas = giftIdeas.dad[interest];
      if (categoryIdeas && categoryIdeas[budget]) {
        const ideaOptions = categoryIdeas[budget];
        const selected = ideaOptions[Math.floor(Math.random() * ideaOptions.length)];
        ideas_list.push({ ...selected, interest });
      }
    });
    setIdeas(ideas_list);
  };

  const availableInterests = [
    { key: 'sport', label: 'Sport' },
    { key: 'cooking', label: 'Cooking/BBQ' },
    { key: 'diy', label: 'DIY' },
    { key: 'gaming', label: 'Gaming' },
    { key: 'music', label: 'Music' },
    { key: 'outdoors', label: 'Outdoors' },
    { key: 'tech', label: 'Tech' },
    { key: 'cars', label: 'Cars' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Select Interests (pick at least one)
          </label>
          <div className="grid grid-cols-2 gap-3">
            {availableInterests.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={key}
                  checked={interests.includes(key)}
                  onChange={() => toggleInterest(key)}
                />
                <label htmlFor={key} className="text-text-primary cursor-pointer text-sm">
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-2">Budget</label>
          <Select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full">
            <option value="under10">Under £10</option>
            <option value="10-25">£10-25</option>
            <option value="25-50">£25-50</option>
            <option value="over50">£50+</option>
          </Select>
        </div>

        <Button
          onClick={generateIdeas}
          disabled={interests.length === 0}
          className="bg-accent text-white w-full"
        >
          Generate Gift Ideas
        </Button>
      </div>

      {ideas.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-heading text-lg font-bold text-text-primary">Perfect Gift Ideas for Dad</h3>
          <div className="space-y-3">
            {ideas.map((gift, idx) => (
              <div key={idx} className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-heading text-base font-bold text-text-primary">{gift.name}</h4>
                  <span className="font-mono font-bold text-accent bg-white border border-border px-3 py-1 rounded text-sm">
                    £{gift.price}
                  </span>
                </div>
                <span className="inline-block text-xs text-text-muted bg-white border border-border px-2 py-1 rounded">
                  {availableInterests.find(i => i.key === gift.interest)?.label}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm">
              Pro tip: Combine a practical gift with a fun experience (like tickets to a match) or a gift card for something he's been wanting!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
