'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Tabs from '@/components/ui/Tabs';

const loremWords = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
];

const firstNames = [
  'James', 'Mary', 'Robert', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda',
  'David', 'Barbara', 'Richard', 'Elizabeth', 'Joseph', 'Susan', 'Thomas', 'Jessica',
  'Charles', 'Sarah', 'Christopher', 'Karen', 'Daniel', 'Nancy', 'Matthew', 'Lisa',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
];

const domains = ['example.com', 'test.com', 'domain.com', 'email.com', 'mail.com'];

const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Pine St', 'Elm Ave', 'Cedar Ln', 'Birch Dr'];
const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'];

export default function RandomTextGenerator() {
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');

  const generateLoremIpsum = () => {
    const words = [];
    for (let i = 0; i < count; i++) {
      words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
    }
    return words.join(' ') + '.';
  };

  const generateNames = () => {
    const names = [];
    for (let i = 0; i < count; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      names.push(`${first} ${last}`);
    }
    return names.join('\n');
  };

  const generateEmails = () => {
    const emails = [];
    for (let i = 0; i < count; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)].toLowerCase();
      const last = lastNames[Math.floor(Math.random() * lastNames.length)].toLowerCase();
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const num = Math.floor(Math.random() * 1000);
      emails.push(`${first}.${last}${num}@${domain}`);
    }
    return emails.join('\n');
  };

  const generateAddresses = () => {
    const addresses = [];
    for (let i = 0; i < count; i++) {
      const number = Math.floor(Math.random() * 9000) + 1;
      const street = streets[Math.floor(Math.random() * streets.length)];
      const city = cities[Math.floor(Math.random() * cities.length)];
      const zip = Math.floor(Math.random() * 90000) + 10000;
      addresses.push(`${number} ${street}, ${city} ${zip}`);
    }
    return addresses.join('\n');
  };

  const generateNumbers = () => {
    const numbers = [];
    for (let i = 0; i < count; i++) {
      numbers.push(Math.floor(Math.random() * 1000000));
    }
    return numbers.join('\n');
  };

  const handleGenerate = (generator) => {
    setOutput(generator());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output).catch(() => {});
  };

  const tabs = [
    {
      id: 'lorem',
      label: 'Lorem Ipsum',
      content: (
        <Button
          onClick={() => handleGenerate(generateLoremIpsum)}
          className="w-full"
        >
          Generate Lorem Ipsum
        </Button>
      ),
    },
    {
      id: 'names',
      label: 'Names',
      content: (
        <Button
          onClick={() => handleGenerate(generateNames)}
          className="w-full"
        >
          Generate Names
        </Button>
      ),
    },
    {
      id: 'emails',
      label: 'Email Addresses',
      content: (
        <Button
          onClick={() => handleGenerate(generateEmails)}
          className="w-full"
        >
          Generate Emails
        </Button>
      ),
    },
    {
      id: 'addresses',
      label: 'Addresses',
      content: (
        <Button
          onClick={() => handleGenerate(generateAddresses)}
          className="w-full"
        >
          Generate Addresses
        </Button>
      ),
    },
    {
      id: 'numbers',
      label: 'Numbers',
      content: (
        <Button
          onClick={() => handleGenerate(generateNumbers)}
          className="w-full"
        >
          Generate Numbers
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-secondary mb-2">
          Count
        </label>
        <Input
          type="number"
          min="1"
          max="100"
          value={count}
          onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
          placeholder="Number of items to generate"
        />
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)]">
        <Tabs tabs={tabs} />
      </div>

      {output && (
        <div className="bg-surface border border-border rounded-[var(--radius-card)] space-y-3">
          <p className="text-sm font-medium text-text-secondary">Output:</p>
          <textarea
            value={output}
            readOnly
            className="w-full min-h-[200px] px-4 py-3 font-mono text-text-primary bg-white border border-border rounded-[var(--radius-input)] resize-vertical"
          />
          <Button onClick={handleCopy} className="w-full">
            Copy Output
          </Button>
        </div>
      )}

      <div className="text-sm text-text-muted">
        <p>Generate random text for testing, prototyping, or placeholder content.</p>
      </div>
    </div>
  );
}
