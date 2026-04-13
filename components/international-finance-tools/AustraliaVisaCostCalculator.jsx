'use client';

import { useState } from 'react';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

export default function AustraliaVisaCostCalculator() {
  const [visaType, setVisaType] = useState('student-visa');

  const visaData = {
    'student-visa': {
      name: 'Student Visa (Subclass 500)',
      fee: 710,
      processingTime: '4-12 weeks',
      keyRequirements: [
        'Confirmation of Enrolment (CoE) from Australian institution',
        'Proof of financial capacity (usually AUD $21,000-27,000/year tuition)',
        'Proof of English language proficiency (IELTS 5.5+)',
        'Health insurance (OSHC) required for visa validity',
        'Character assessment required',
      ],
      audience: 'International students',
      validity: 'Duration of course + 6 months',
      workAllowance: '20 hours/week during semester, unlimited during breaks',
    },
    'working-holiday-417': {
      name: 'Working Holiday Visa (Subclass 417)',
      fee: 640,
      processingTime: '1-2 weeks',
      keyRequirements: [
        'Age 18-30 (some countries up to 35)',
        'From eligible country (UK, Canada, Japan, etc.)',
        'Valid passport for duration of stay',
        'Funds to support yourself (minimum AUD $5,000 suggested)',
        'Health check if required by country',
      ],
      audience: 'Young people seeking work and travel experience',
      validity: '12 months (extendable to 24 months with specific work)',
      workAllowance: 'Unlimited, but must work for same employer max 6 months',
    },
    'partner-visa-820': {
      name: 'Partner Visa (Subclass 820/801)',
      fee: 8850,
      processingTime: '12-24 months',
      keyRequirements: [
        'Genuine domestic relationship (married/de facto) with Australian citizen/PR',
        '2-year relationship history (or exceptional circumstances)',
        'Statutory declaration from two independent witnesses',
        'Character assessment required',
        'Health check required',
        'No reliance on welfare',
      ],
      audience: 'Spouses/partners of Australian citizens or permanent residents',
      validity: '820: temporary (2 years) | 801: permanent',
      workAllowance: 'Unrestricted work rights (except security/defence clearance roles)',
    },
    'skilled-independent-189': {
      name: 'Skilled Independent Visa (Subclass 189)',
      fee: 4640,
      processingTime: '8-16 weeks (after invitation)',
      keyRequirements: [
        'On skilled occupation list (SOL)',
        'Occupational skills assessment passed',
        'Minimum points (typically 65-100) on points test',
        'English language proficiency (IELTS 6.0+)',
        'Health check required',
        'Character assessment required',
      ],
      audience: 'Skilled workers without Australian sponsor/nomination',
      validity: 'Permanent',
      workAllowance: 'Unrestricted work rights',
    },
    'skilled-nominated-190': {
      name: 'Skilled Nominated Visa (Subclass 190)',
      fee: 4640,
      processingTime: '8-16 weeks (after nomination)',
      keyRequirements: [
        'Nominated by state/territory government',
        'On skilled occupation list (SOL)',
        'Occupational skills assessment passed',
        'Minimum points (typically 60+)',
        'English language proficiency (IELTS 6.0+)',
        'Commitment to work/live in nominating state for 2-3 years',
      ],
      audience: 'Skilled workers with state/territory sponsorship',
      validity: 'Permanent',
      workAllowance: 'Unrestricted work rights',
    },
    'employer-sponsored-482': {
      name: 'Employer Sponsored Visa (Subclass 482)',
      fee: '1455-3035',
      processingTime: '6-12 weeks',
      keyRequirements: [
        'Approved Australian employer sponsor',
        'Nominated occupation on relevant list',
        'Meet position requirements and experience',
        'No suitable Australian workers available',
        'Salary at market rate or higher',
        'Health check required',
      ],
      audience: 'Workers sponsored by Australian employers',
      validity: 'Up to 4 years',
      workAllowance: 'Can work for sponsoring employer; needs approval to change',
    },
    'visitor-visa-600': {
      name: 'Visitor Visa (Subclass 600)',
      fee: '190-405',
      processingTime: '1-4 weeks',
      keyRequirements: [
        'Purpose of visit (tourism, business, visiting family)',
        'Proof of funds (AUD $5,000+ for 1 month stay)',
        'Return ticket or funds for return',
        'Character assessment',
        'Health check if required',
        'No criminal record',
      ],
      audience: 'Tourists, business visitors, family visitors',
      validity: 'Up to 12 months (varies by country)',
      workAllowance: 'NO paid work permitted',
    },
    'parent-visa-143': {
      name: 'Parent Visa (Subclass 143)',
      fee: 49370,
      processingTime: '18-36 months',
      keyRequirements: [
        'Have adult child who is Australian citizen/PR/eligible NZ citizen',
        'Child meets balance of family test',
        'Visa applicant sponsor meets financial requirements',
        'Health check required',
        'Character assessment required',
        'Must not be receiving government assistance',
      ],
      audience: 'Parents of Australian citizens/PR holders',
      validity: 'Permanent',
      workAllowance: 'Unrestricted work rights',
    },
    'citizenship': {
      name: 'Australian Citizenship Application',
      fee: 490,
      processingTime: '6-12 months',
      keyRequirements: [
        'Held PR visa for at least 4 years (or 1 year if spouse/partner)',
        'Passed citizenship test (English + Australian knowledge)',
        'Good character',
        'Physical presence in Australia (main residence)',
        'Intent to reside or maintain connection',
      ],
      audience: 'Permanent residents applying for citizenship',
      validity: 'Permanent (citizenship)',
      workAllowance: 'Full rights as Australian citizen',
    },
  };

  const selectedVisa = visaData[visaType];

  const visaOptions = [
    { value: 'student-visa', label: 'Student Visa (Subclass 500)' },
    { value: 'working-holiday-417', label: 'Working Holiday Visa (Subclass 417)' },
    { value: 'partner-visa-820', label: 'Partner Visa (Subclass 820/801)' },
    { value: 'skilled-independent-189', label: 'Skilled Independent Visa (Subclass 189)' },
    { value: 'skilled-nominated-190', label: 'Skilled Nominated Visa (Subclass 190)' },
    { value: 'employer-sponsored-482', label: 'Employer Sponsored Visa (Subclass 482)' },
    { value: 'visitor-visa-600', label: 'Visitor Visa (Subclass 600)' },
    { value: 'parent-visa-143', label: 'Parent Visa (Subclass 143)' },
    { value: 'citizenship', label: 'Australian Citizenship Application' },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <h2 className="font-heading text-xl font-semibold text-primary mb-4">
          Select Visa Type
        </h2>

        <Select
          label="Visa Category"
          value={visaType}
          onChange={(e) => setVisaType(e.target.value)}
          options={visaOptions}
        />
      </Card>

      <Card className="bg-accent-muted border border-accent">
        <h2 className="font-heading text-2xl font-bold text-accent mb-2">
          {selectedVisa.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <p className="text-sm text-secondary mb-1">Application Fee</p>
            <p className="text-3xl font-mono font-bold text-primary">
              ${selectedVisa.fee}
            </p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Processing Time</p>
            <p className="text-lg font-medium text-primary">{selectedVisa.processingTime}</p>
          </div>
          <div>
            <p className="text-sm text-secondary mb-1">Visa Validity</p>
            <p className="text-lg font-medium text-primary">{selectedVisa.validity}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-heading font-semibold text-primary mb-4">Key Requirements</h3>
        <ul className="space-y-2">
          {selectedVisa.keyRequirements.map((req, idx) => (
            <li key={idx} className="flex gap-3">
              <span className="text-accent font-bold flex-shrink-0 mt-0.5">-</span>
              <span className="text-secondary">{req}</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="bg-blue-50 border border-blue-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Work Allowance</h3>
        <p className="text-secondary">{selectedVisa.workAllowance}</p>
      </Card>

      <Card className="bg-green-50 border border-green-200">
        <h3 className="font-heading font-semibold text-primary mb-3">
          For: {selectedVisa.audience}
        </h3>
        <p className="text-secondary">
          {visaType === 'student-visa' &&
            'You\'re planning to study at an Australian university or vocational institution. The visa requires health insurance and valid enrolment confirmation.'}
          {visaType === 'working-holiday-417' &&
            'You\'re a young person (18-35) from an eligible country wanting to work and travel. This is one of the quickest and cheapest options.'}
          {visaType === 'partner-visa-820' &&
            'You\'re married to or in a de facto relationship with an Australian citizen or PR. This is a pathway to permanent residence.'}
          {visaType === 'skilled-independent-189' &&
            'You\'re a skilled worker without an employer or state sponsor. This visa requires points and English language proficiency but no sponsorship.'}
          {visaType === 'skilled-nominated-190' &&
            'You\'re a skilled worker with state/territory sponsorship. You\'ll need to commit to living and working in that state for 2-3 years.'}
          {visaType === 'employer-sponsored-482' &&
            'Your Australian employer has sponsored you. The employer must demonstrate no suitable Australian workers are available.'}
          {visaType === 'visitor-visa-600' &&
            'You\'re visiting Australia for tourism, business meetings, or visiting family. You cannot work for pay on this visa.'}
          {visaType === 'parent-visa-143' &&
            'You\'re the parent of an adult Australian citizen or PR. This is a permanent visa but has a very high fee and long processing time.'}
          {visaType === 'citizenship' &&
            'You\'re a permanent resident applying to become an Australian citizen. You must pass the citizenship test and meet residency requirements.'}
        </p>
      </Card>

      <Card>
        <h3 className="font-heading font-semibold text-primary mb-3">Additional Costs to Consider</h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Health check (medical examination): AUD $200-600</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Skills assessment (for skilled visas): AUD $300-2,000</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>English language test (IELTS/TOEFL): AUD $300-400</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Character certificate from home country: AUD $0-100</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>Visa agency fees (if using agent): AUD $500-3,000</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">+</span>
            <span>OSHC (student health insurance): AUD $3,000-8,000/year</span>
          </li>
        </ul>
      </Card>

      <Card className="bg-amber-50 border border-amber-200">
        <h3 className="font-heading font-semibold text-primary mb-3">Important Notes</h3>
        <ul className="space-y-2 text-sm text-secondary">
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Visa fees are current as of March 2026 and may be indexed annually</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Processing times are approximate; actual times vary based on application complexity</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Eligibility varies by country of citizenship (e.g., working holiday visa availability)</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>Always check the official Department of Home Affairs website for the latest requirements</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent font-bold">*</span>
            <span>This is general information only; seek professional immigration advice for your situation</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
