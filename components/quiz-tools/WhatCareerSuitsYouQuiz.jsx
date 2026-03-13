'use client';

import { useState, useMemo } from 'react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const QUESTIONS = [
  {
    id: 1,
    text: 'What type of work energizes you?',
    options: [
      { text: 'Creating new ideas and expressing myself', type: 'creative' },
      { text: 'Understanding how things work', type: 'investigative' },
      { text: 'Helping and supporting people', type: 'social' },
      { text: 'Building and fixing tangible things', type: 'realistic' },
    ],
  },
  {
    id: 2,
    text: 'Your ideal work environment is:',
    options: [
      { text: 'Organized, structured, predictable', type: 'conventional' },
      { text: 'Focused on achieving goals and results', type: 'enterprising' },
      { text: 'Collaborative with room for innovation', type: 'social' },
      { text: 'Hands-on with room to be independent', type: 'realistic' },
    ],
  },
  {
    id: 3,
    text: 'When facing a problem, you:',
    options: [
      { text: 'Research and analyze deeply', type: 'investigative' },
      { text: 'Think of creative solutions', type: 'creative' },
      { text: 'Find a practical, efficient fix', type: 'realistic' },
      { text: 'Bring together different perspectives', type: 'social' },
    ],
  },
  {
    id: 4,
    text: 'What motivates you most?',
    options: [
      { text: 'Making a positive impact on people', type: 'social' },
      { text: 'Achieving success and recognition', type: 'enterprising' },
      { text: 'Creating something beautiful or meaningful', type: 'creative' },
      { text: 'Financial security and stability', type: 'conventional' },
    ],
  },
  {
    id: 5,
    text: 'Your strength lies in:',
    options: [
      { text: 'Logical thinking and analysis', type: 'investigative' },
      { text: 'Artistic expression and imagination', type: 'creative' },
      { text: 'Leadership and persuasion', type: 'enterprising' },
      { text: 'Precision and attention to detail', type: 'conventional' },
    ],
  },
  {
    id: 6,
    text: 'You prefer to work with:',
    options: [
      { text: 'Ideas and theories', type: 'investigative' },
      { text: 'People and relationships', type: 'social' },
      { text: 'Numbers, data, and systems', type: 'conventional' },
      { text: 'Physical tools and materials', type: 'realistic' },
    ],
  },
  {
    id: 7,
    text: 'Career success to you means:',
    options: [
      { text: 'Solving important problems', type: 'investigative' },
      { text: 'Making a difference in people\'s lives', type: 'social' },
      { text: 'Reaching the top and gaining influence', type: 'enterprising' },
      { text: 'Creating something tangible', type: 'realistic' },
    ],
  },
  {
    id: 8,
    text: 'You are most satisfied when:',
    options: [
      { text: 'The work is organized and tasks are clear', type: 'conventional' },
      { text: 'I get to take charge and make decisions', type: 'enterprising' },
      { text: 'I am helping someone directly', type: 'social' },
      { text: 'I can see what I created', type: 'realistic' },
    ],
  },
  {
    id: 9,
    text: 'What type of learning excites you?',
    options: [
      { text: 'Scientific and technical subjects', type: 'investigative' },
      { text: 'Arts, music, and creative disciplines', type: 'creative' },
      { text: 'Business and economics', type: 'enterprising' },
      { text: 'Practical skills and hands-on training', type: 'realistic' },
    ],
  },
  {
    id: 10,
    text: 'You would be most upset if work meant:',
    options: [
      { text: 'Boring, repetitive, unchallenging', type: 'investigative' },
      { text: 'Stifling creativity and self-expression', type: 'creative' },
      { text: 'Not being able to help others', type: 'social' },
      { text: 'Sitting at a desk all day', type: 'realistic' },
    ],
  },
  {
    id: 11,
    text: 'Your role in projects tends to be:',
    options: [
      { text: 'The researcher and analyst', type: 'investigative' },
      { text: 'The visionary and creator', type: 'creative' },
      { text: 'The organizer and coordinator', type: 'conventional' },
      { text: 'The builder and problem-solver', type: 'realistic' },
    ],
  },
  {
    id: 12,
    text: 'What kind of income matters to you?',
    options: [
      { text: 'Stable, predictable salary', type: 'conventional' },
      { text: 'High income for high achievement', type: 'enterprising' },
      { text: 'Enough to live comfortably', type: 'social' },
      { text: 'Enough for independence', type: 'realistic' },
    ],
  },
  {
    id: 13,
    text: 'In teams, you naturally:',
    options: [
      { text: 'Take the lead and drive decisions', type: 'enterprising' },
      { text: 'Support and encourage others', type: 'social' },
      { text: 'Ensure everything is organized', type: 'conventional' },
      { text: 'Work independently but contribute practically', type: 'realistic' },
    ],
  },
  {
    id: 14,
    text: 'Your ideal work schedule is:',
    options: [
      { text: 'Regular 9-5 with clear boundaries', type: 'conventional' },
      { text: 'Flexible based on project needs', type: 'creative' },
      { text: 'Hours that let me help people when needed', type: 'social' },
      { text: 'Whatever lets me build and create', type: 'realistic' },
    ],
  },
  {
    id: 15,
    text: 'You feel most proud when:',
    options: [
      { text: 'You discover something new', type: 'investigative' },
      { text: 'You create something beautiful', type: 'creative' },
      { text: 'You helped someone succeed', type: 'social' },
      { text: 'You built or fixed something important', type: 'realistic' },
    ],
  },
];

const CAREER_INFO = {
  creative: {
    name: 'Creative & Design',
    emoji: '🎨',
    color: '#ec4899',
    lightColor: '#fce7f3',
    description: 'You thrive in roles that let you express yourself and create something meaningful. Your imagination is your greatest asset.',
    careers: [
      'Graphic Designer',
      'Artist or Sculptor',
      'Interior Designer',
      'Fashion Designer',
      'UX/UI Designer',
      'Animator',
      'Creative Director',
      'Copywriter or Novelist',
      'Photographer',
      'Music Producer',
    ],
    strengths: [
      'Innovative and imaginative thinking',
      'Strong artistic and aesthetic sense',
      'Excellent at communicating visually',
      'Natural problem-solving through creativity',
      'Brings beauty and meaning to work',
    ],
  },
  investigative: {
    name: 'Investigative & Research',
    emoji: '🔬',
    color: '#0ea5e9',
    lightColor: '#cffafe',
    description: 'You are driven to understand and discover. Your analytical mind loves solving complex problems and uncovering truth.',
    careers: [
      'Scientist (Physics, Chemistry, Biology)',
      'Software Engineer',
      'Data Scientist',
      'Researcher',
      'Mathematician',
      'Quality Assurance Analyst',
      'Economist',
      'Forensic Analyst',
      'Medical Researcher',
      'Systems Analyst',
    ],
    strengths: [
      'Strong analytical and logical thinking',
      'Excellent problem-solving abilities',
      'Detail-oriented and thorough',
      'Enjoys complex intellectual challenges',
      'Curious and loves to learn',
    ],
  },
  social: {
    name: 'Social & Support',
    emoji: '🤝',
    color: '#16a34a',
    lightColor: '#dcfce7',
    description: 'You find fulfillment in helping and supporting others. Your empathy and communication skills make you a natural mentor and guide.',
    careers: [
      'Teacher or Professor',
      'Counselor or Therapist',
      'Social Worker',
      'Nurse or Healthcare Provider',
      'Human Resources Manager',
      'Coach or Mentor',
      'Community Outreach Coordinator',
      'Customer Success Manager',
      'Non-profit Manager',
      'Veterinarian',
    ],
    strengths: [
      'Excellent communication and listening',
      'Natural empathy and understanding',
      'Patient and supportive nature',
      'Great at motivating others',
      'Builds strong relationships',
    ],
  },
  enterprising: {
    name: 'Enterprising & Leadership',
    emoji: '🚀',
    color: '#f97316',
    lightColor: '#ffedd5',
    description: 'You are driven, ambitious, and comfortable taking charge. You excel at achieving goals and inspiring others to do the same.',
    careers: [
      'Business Manager',
      'Entrepreneur',
      'Executive or C-Suite',
      'Sales Manager',
      'Marketing Manager',
      'Product Manager',
      'Politician or Public Figure',
      'Management Consultant',
      'Investment Manager',
      'Event Manager',
    ],
    strengths: [
      'Natural leadership abilities',
      'Ambitious and goal-oriented',
      'Excellent persuasion skills',
      'Strategic thinking',
      'Comfortable with risk and competition',
    ],
  },
  conventional: {
    name: 'Conventional & Administration',
    emoji: '📋',
    color: '#a855f7',
    lightColor: '#f3e8ff',
    description: 'You value organization, stability, and clear processes. You excel at bringing order and efficiency to systems.',
    careers: [
      'Accountant',
      'Administrative Manager',
      'Data Entry Specialist',
      'Bookkeeper',
      'Office Manager',
      'Insurance Agent',
      'Bank Teller',
      'Records Manager',
      'Financial Analyst',
      'Compliance Officer',
    ],
    strengths: [
      'Excellent organizational skills',
      'Detail-oriented and precise',
      'Reliable and dependable',
      'Values accuracy and order',
      'Strong with systems and procedures',
    ],
  },
  realistic: {
    name: 'Realistic & Hands-On',
    emoji: '🔧',
    color: '#6b7280',
    lightColor: '#f3f4f6',
    description: 'You love working with your hands and creating tangible results. You prefer practical solutions and independent work.',
    careers: [
      'Carpenter or Craftsperson',
      'Electrician',
      'Plumber',
      'Mechanic',
      'Construction Manager',
      'Equipment Operator',
      'Welder',
      'Landscape Designer',
      'Chef or Cook',
      'Manufacturing Engineer',
    ],
    strengths: [
      'Practical and hands-on approach',
      'Excellent mechanical skills',
      'Problem-solver with tangible results',
      'Physically capable and strong',
      'Independent and self-reliant',
    ],
  },
};

export default function WhatCareerSuitsYouQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    if (Object.keys(answers).length === 0) return null;

    const typeCounts = {
      creative: 0,
      investigative: 0,
      social: 0,
      enterprising: 0,
      conventional: 0,
      realistic: 0,
    };

    Object.values(answers).forEach((type) => {
      typeCounts[type] += 1;
    });

    const dominantType = Object.keys(typeCounts).reduce((a, b) =>
      typeCounts[a] > typeCounts[b] ? a : b
    );

    return { typeCounts, dominantType };
  }, [answers]);

  const progress = ((Object.keys(answers).length) / QUESTIONS.length) * 100;
  const question = QUESTIONS[currentQuestion];
  const allAnswered = Object.keys(answers).length === QUESTIONS.length;

  if (showResults && results) {
    const careerType = results.dominantType;
    const info = CAREER_INFO[careerType];

    return (
      <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-text-primary">Your Ideal Career Path</h2>
          <p className="mt-2 text-text-secondary">Work that aligns with your strengths and values</p>
        </div>

        <Card className="border-2" style={{ borderColor: info.color, backgroundColor: info.lightColor }}>
          <div className="space-y-4 text-center">
            <div className="text-6xl">{info.emoji}</div>
            <h3 className="font-heading text-3xl font-bold text-text-primary">{info.name}</h3>
            <p className="text-lg text-text-secondary">{info.description}</p>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Career Ideas for You</h4>
            <ul className="space-y-2">
              {info.careers.map((career, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">•</span>
                  <span>{career}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="bg-white">
          <div className="space-y-4">
            <h4 className="font-heading text-lg font-bold text-text-primary">Your Strengths</h4>
            <ul className="space-y-2">
              {info.strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-3 text-text-secondary">
                  <span className="text-accent font-bold">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="rounded-[var(--radius-card)] border-l-4 p-4" style={{ borderLeftColor: info.color, backgroundColor: info.lightColor }}>
          <p className="text-sm text-text-secondary">
            <strong>Remember:</strong> This quiz is a starting point. Most people have interests from multiple categories. Explore careers that combine your top 2-3 results for the best fit.
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            size="lg"
            className="flex-1"
            onClick={() => {
              setShowResults(false);
              setCurrentQuestion(0);
              setAnswers({});
            }}
          >
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 rounded-[var(--radius-card)] bg-surface p-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-text-primary">
            Question {currentQuestion + 1} of {QUESTIONS.length}
          </span>
          <span className="text-text-secondary">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full border border-border bg-white">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <Card className="border-2 bg-white">
        <p className="mb-6 text-lg font-medium text-text-primary">{question.text}</p>

        <div className="space-y-3">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => {
                setAnswers({ ...answers, [question.id]: option.type });
              }}
              className={`w-full rounded-[var(--radius-input)] border-2 p-4 text-left transition-all ${
                answers[question.id] === option.type
                  ? 'border-accent bg-accent bg-opacity-10'
                  : 'border-border hover:border-accent'
              }`}
            >
              <div className="font-medium text-text-primary">{option.text}</div>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex justify-between gap-3">
        <Button
          variant="secondary"
          size="lg"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
        >
          Previous
        </Button>

        {currentQuestion < QUESTIONS.length - 1 ? (
          <Button
            variant="primary"
            size="lg"
            disabled={answers[question.id] === undefined}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="primary"
            size="lg"
            disabled={!allAnswered}
            onClick={() => setShowResults(true)}
          >
            See Results
          </Button>
        )}
      </div>
    </div>
  );
}
