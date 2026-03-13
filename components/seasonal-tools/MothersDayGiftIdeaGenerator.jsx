'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

const giftIdeas = {
  mum: {
    cooking: {
      under10: [
        { name: 'Kitchen herbs gift set', price: '8' },
        { name: 'Recipe card set', price: '7' },
      ],
      '10-25': [
        { name: 'Personalised recipe book', price: '20' },
        { name: 'Baking tool set', price: '22' },
      ],
      '25-50': [
        { name: 'Premium knife set', price: '40' },
        { name: 'Cookery class voucher', price: '45' },
      ],
      over50: [
        { name: 'Professional stand mixer', price: '350' },
        { name: 'Premium cookery course', price: '100' },
      ],
    },
    gardening: {
      under10: [
        { name: 'Seed packet collection', price: '8' },
        { name: 'Garden markers set', price: '7' },
      ],
      '10-25': [
        { name: 'Garden tool set', price: '20' },
        { name: 'Personalised plant pots', price: '18' },
      ],
      '25-50': [
        { name: 'Premium gardening gloves', price: '35' },
        { name: 'Garden kneeler seat', price: '40' },
      ],
      over50: [
        { name: 'Garden furniture', price: '250' },
        { name: 'Greenhouse kit', price: '150' },
      ],
    },
    reading: {
      under10: [
        { name: 'Book voucher', price: '10' },
        { name: 'Bookmark set', price: '8' },
      ],
      '10-25': [
        { name: 'Hardback book by favourite author', price: '20' },
        { name: 'Personalised book embosser', price: '15' },
      ],
      '25-50': [
        { name: 'First edition book', price: '40' },
        { name: 'Reading light and stand', price: '35' },
      ],
      over50: [
        { name: 'Premium bookshelf', price: '200' },
        { name: 'Book subscription (annual)', price: '80' },
      ],
    },
    fitness: {
      under10: [
        { name: 'Yoga mat carrier', price: '10' },
        { name: 'Sports socks set', price: '9' },
      ],
      '10-25': [
        { name: 'Resistance band set', price: '18' },
        { name: 'Water bottle (insulated)', price: '20' },
      ],
      '25-50': [
        { name: 'Yoga class pack', price: '40' },
        { name: 'Fitness tracker', price: '45' },
      ],
      over50: [
        { name: 'Home gym equipment', price: '500' },
        { name: 'Annual gym membership', price: '200' },
      ],
    },
    spa: {
      under10: [
        { name: 'Face mask set', price: '10' },
        { name: 'Bath bombs', price: '8' },
      ],
      '10-25': [
        { name: 'Luxury bath set', price: '20' },
        { name: 'Silk sleep mask', price: '15' },
      ],
      '25-50': [
        { name: 'Massage gun', price: '40' },
        { name: 'Spa voucher', price: '50' },
      ],
      over50: [
        { name: 'Home spa package', price: '150' },
        { name: 'Luxury spa weekend', price: '300' },
      ],
    },
  },
};

export default function MothersDayGiftIdeaGenerator() {
  const [interests, setInterests] = useState(['cooking']);
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
      const categoryIdeas = giftIdeas.mum[interest];
      if (categoryIdeas && categoryIdeas[budget]) {
        const ideaOptions = categoryIdeas[budget];
        const selected = ideaOptions[Math.floor(Math.random() * ideaOptions.length)];
        ideas_list.push({ ...selected, interest });
      }
    });
    setIdeas(ideas_list);
  };

  const availableInterests = [
    { key: 'cooking', label: 'Cooking' },
    { key: 'gardening', label: 'Gardening' },
    { key: 'reading', label: 'Reading' },
    { key: 'fitness', label: 'Fitness' },
    { key: 'spa', label: 'Spa & Wellness' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 space-y-4">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">
            Select Interests (pick at least one)
          </label>
          <div className="space-y-2">
            {availableInterests.map(({ key, label }) => (
              <div key={key} className="flex items-center gap-2">
                <Checkbox
                  id={key}
                  checked={interests.includes(key)}
                  onChange={() => toggleInterest(key)}
                />
                <label htmlFor={key} className="text-text-primary cursor-pointer">
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
          <h3 className="font-heading text-lg font-bold text-text-primary">Perfect Gift Ideas for Mum</h3>
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

          <div className="bg-pink-50 border border-pink-200 rounded-[var(--radius-card)] p-4">
            <p className="text-text-secondary text-sm">
              Pro tip: Pair a small gift with a handmade card or a promise coupon (e.g., breakfast in bed, a nice dinner) to make it extra special!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
