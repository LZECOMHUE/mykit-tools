'use client';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';

const VOW_TEMPLATES = {
  traditional: [
    {
      title: 'Classic Vow',
      text: 'I, [YOUR_NAME], take you, [PARTNER_NAME], to be my [husband/wife]. I promise to love you, honour you, and cherish you, in sickness and in health, for richer or poorer, for as long as we both shall live.',
    },
    {
      title: 'Traditional Promise',
      text: '[PARTNER_NAME], I stand before you and our loved ones to declare my love and commitment. I vow to be your faithful companion, your support through all of life\'s journeys, and your partner in building a home filled with warmth, laughter, and kindness. With all my heart, I promise to love you and only you, for all the days of my life.',
    },
    {
      title: 'Timeless Devotion',
      text: 'I promise to love and cherish you, to support your dreams, and to build a life of joy and purpose with you. I commit to facing our future together with honesty, respect, and unwavering dedication to our marriage.',
    },
    {
      title: 'Sacred Commitment',
      text: 'Before our family and friends, I take you, [PARTNER_NAME], to be my [husband/wife]. I promise to love you with all my heart, to honour your dignity as a person, and to nurture our marriage with patience, kindness, and grace.',
    },
    {
      title: 'Solemn Promise',
      text: '[PARTNER_NAME], I promise to stand by you through every season of life. In joy and sorrow, in plenty and want, I vow to love you faithfully and to work together to create a marriage built on trust, respect, and deep, enduring love.',
    },
    {
      title: 'Enduring Love',
      text: 'Today I make this solemn promise to you, [PARTNER_NAME]. I will be your rock when times are hard, your cheerleader when you succeed, and your companion through every ordinary day in between. I choose you, now and always.',
    },
    {
      title: 'Lifelong Promise',
      text: 'I, [YOUR_NAME], promise to walk beside you through every chapter of our story. I will hold your hand in the darkness, dance with you in the light, and love you with every breath I take. You are my today, my tomorrow, and my forever.',
    },
  ],
  modern: [
    {
      title: 'Best Friend Vow',
      text: '[PARTNER_NAME], I choose you every single day. I promise to support your goals, celebrate your wins, and stand with you through the tough times. You are my best friend, my adventure buddy, and my home.',
    },
    {
      title: 'Honest Love',
      text: 'I promise to be honest with you, even when it is hard. I promise to laugh with you, cry with you, and grow with you. I am all in on this life we are building together, and I would not have it any other way.',
    },
    {
      title: 'Modern Commitment',
      text: 'From this day forward, you will not walk alone. I promise to be your champion, your comfort, and your partner through every chapter. Let us build something beautiful together, [PARTNER_NAME].',
    },
    {
      title: 'Genuine Partnership',
      text: '[PARTNER_NAME], I love the person you are and who you are becoming. I promise to support your dreams, challenge you to be your best, and love you unconditionally through it all.',
    },
    {
      title: 'Today and Every Day',
      text: 'I promise to choose you, to trust you, and to build a life with you that is full of adventure, laughter, and love. Here is to us, [PARTNER_NAME], and the incredible future we are about to create.',
    },
    {
      title: 'All In',
      text: '[PARTNER_NAME], you make me want to be the best version of myself. I promise to show up for you, fully and completely, on the easy days and the hard ones. This is my promise: I am yours, and I am not going anywhere.',
    },
    {
      title: 'Real Talk Vow',
      text: 'I will not promise you perfection because that is not real. What I will promise you is effort, honesty, and a love that keeps growing. I promise to work through the hard stuff, to never stop dating you, and to always come home to you.',
    },
  ],
  humorous: [
    {
      title: 'Honest & Funny',
      text: 'I promise to love you even when you leave the cupboard doors open. I promise to pretend I do not notice when you steal the duvet at 3am. And I solemnly swear to always let you pick the takeaway, because honestly, your taste is better than mine.',
    },
    {
      title: 'Lighthearted Vow',
      text: '[PARTNER_NAME], I promise to laugh at your jokes, even the terrible ones. I promise to let you steal chips from my plate, even though it drives me mad. And I promise to love you wildly, deeply, and forever.',
    },
    {
      title: 'Netflix & Forever',
      text: 'I vow to always have your back, to be your biggest supporter, and to never watch the next episode without you. I promise to love you more than pizza, and if you know me, you know that is saying something.',
    },
    {
      title: 'Playful Promise',
      text: 'I promise that you will never have to parallel park again, that I will always pretend to agree when you say we do not need a map, and that I will love you with everything I have got, every single day.',
    },
    {
      title: 'The Real Deal',
      text: 'They say marriage is a 50/50 partnership. I promise to try really hard to hold up my 50%, even on the days when I am clearly only at about 30%. Most importantly, I promise to love you completely, messily, and forever.',
    },
    {
      title: 'Team Us',
      text: '[PARTNER_NAME], I promise to always be on your team, even when your team is wrong. I promise to bring you tea exactly the way you like it, to never judge your questionable playlist choices, and to love every ridiculous, wonderful thing about you.',
    },
    {
      title: 'Brutally Honest',
      text: 'I cannot promise I will always put the bins out without being asked, or that I will ever learn to fold a fitted sheet. But I can promise you this: I will love you fiercely, laugh with you daily, and choose you over everyone else, always.',
    },
  ],
  poetic: [
    {
      title: 'Seasons of Love',
      text: 'Like the seasons that turn and return, I promise to grow with you through every change. You are my spring morning, my summer warmth, my autumn gold, and my winter shelter. I vow to cherish this love we have found.',
    },
    {
      title: 'Ocean Deep',
      text: 'In your eyes, I find my home. In your heart, I find my peace. I promise to love you with the depth of the ocean, with the warmth of the sun, and with a devotion as constant as the stars.',
    },
    {
      title: 'Song and Canvas',
      text: '[PARTNER_NAME], you are the verse to my song, the colour to my canvas, the meaning to my journey. I promise to paint our life together in hues of love, hope, and endless devotion.',
    },
    {
      title: 'Shelter and Light',
      text: 'I promise to be the shelter in your storm, the light in your darkness, and the home in your wandering heart. With every breath, with every beat of my heart, I choose you, forever and always.',
    },
    {
      title: 'Greatest Story',
      text: 'You are my greatest love story. I vow to honour this gift we have been given, to nurture it like a flame that burns brighter every day, and to love you beyond words, beyond measure, beyond time itself.',
    },
    {
      title: 'Wildflower Love',
      text: 'Our love is not a tidy garden, it is a wildflower meadow. Beautiful, untamed, and full of surprises. I vow to nurture every bloom, to weather every storm, and to walk barefoot through this glorious life with you.',
    },
    {
      title: 'Written in Stars',
      text: '[PARTNER_NAME], if love is a language, then you taught me to speak it fluently. I promise to write our story across every day we are given, in ink that will never fade, in a love that will never dim.',
    },
  ],
  religious: [
    {
      title: 'Faith-Based Vow',
      text: 'Before God and our loved ones, I commit to you as my [husband/wife]. I promise to love you as Christ loves the Church, to serve you faithfully, and to build a home grounded in faith, hope, and love.',
    },
    {
      title: 'Walk Together',
      text: '[PARTNER_NAME], with God as my witness, I promise to walk this journey with you in faith and love. I vow to support your spiritual growth, to pray with you and for you, and to raise a family rooted in grace and gratitude.',
    },
    {
      title: 'Blessed Union',
      text: 'I believe God brought us together for a purpose. I promise to honour that blessing by loving you unconditionally, by putting our marriage first, and by building a life that glorifies God and reflects His love.',
    },
    {
      title: 'Holy Commitment',
      text: 'I promise to be the spouse you deserve, to love you as scripture teaches, and to work daily to make our marriage a reflection of God\'s perfect love. I commit to you, heart and soul.',
    },
    {
      title: 'Faithful Devotion',
      text: 'With faith as our foundation and God\'s love as our guide, I promise to be your faithful partner. I vow to love, honour, and cherish you through every season life brings our way.',
    },
    {
      title: 'Covenant Promise',
      text: '[PARTNER_NAME], today I make a covenant with you before God. I promise to love you with patience and kindness, to forgive as we have been forgiven, and to seek God\'s wisdom in all we do together.',
    },
    {
      title: 'Grace and Mercy',
      text: 'I vow to love you with a love that mirrors God\'s grace. I will be slow to anger and quick to forgive. I will hold your hand in prayer and your heart in trust. Together, may our marriage be a testimony to His goodness.',
    },
  ],
};

export default function WeddingVowGenerator() {
  const [tone, setTone] = useState('traditional');
  const [currentSet, setCurrentSet] = useState(0);
  const [selectedVow, setSelectedVow] = useState(null);
  const [customNames, setCustomNames] = useState({
    yourName: '',
    partnerName: '',
    pronouns: 'husband/wife',
  });

  const templates = VOW_TEMPLATES[tone] || [];
  const currentTemplate = templates[currentSet];

  const generateNewSet = () => {
    setCurrentSet((prev) => (prev + 1) % templates.length);
    setSelectedVow(null);
  };

  const processVow = (vow) => {
    let processed = vow.text;
    processed = processed.replace(/\[YOUR_NAME\]/g, customNames.yourName || '[YOUR_NAME]');
    processed = processed.replace(/\[PARTNER_NAME\]/g, customNames.partnerName || '[PARTNER_NAME]');
    processed = processed.replace(/\[husband\/wife\]/g, customNames.pronouns);
    return processed;
  };

  const copyToClipboard = () => {
    if (selectedVow) {
      const text = processVow(selectedVow);
      navigator.clipboard.writeText(text).catch(() => {});
    }
  };

  return (
    <div className="space-y-4">
      {/* Configuration */}
      <Card>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Vow Tone
            </label>
            <Select
              options={[
                { value: 'traditional', label: 'Traditional' },
                { value: 'modern', label: 'Modern' },
                { value: 'humorous', label: 'Humorous' },
                { value: 'poetic', label: 'Poetic' },
                { value: 'religious', label: 'Religious' },
              ]}
              value={tone}
              onChange={(e) => {
                setTone(e.target.value);
                setCurrentSet(0);
                setSelectedVow(null);
              }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Your Name (optional, for personalization)
            </label>
            <input
              type="text"
              value={customNames.yourName}
              onChange={(e) =>
                setCustomNames({ ...customNames, yourName: e.target.value })
              }
              placeholder="Your first name"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Partner's Name (optional)
            </label>
            <input
              type="text"
              value={customNames.partnerName}
              onChange={(e) =>
                setCustomNames({ ...customNames, partnerName: e.target.value })
              }
              placeholder="Partner's first name"
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] text-text-primary placeholder-text-muted focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent focus:ring-opacity-10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Partner's Pronouns
            </label>
            <Select
              options={[
                { value: 'husband/wife', label: 'husband/wife' },
                { value: 'husband', label: 'husband' },
                { value: 'wife', label: 'wife' },
                { value: 'spouse', label: 'spouse' },
                { value: 'partner', label: 'partner' },
              ]}
              value={customNames.pronouns}
              onChange={(e) => setCustomNames({ ...customNames, pronouns: e.target.value })}
            />
          </div>
        </div>
      </Card>

      {/* Current Vow Template */}
      {currentTemplate && (
        <Card className="bg-rose-50 border-rose-100">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
            {currentTemplate.title}
          </h3>

          <div className="bg-white rounded-[var(--radius-input)] p-4 border border-border mb-4 leading-relaxed">
            <p className="text-text-primary whitespace-pre-wrap">
              {processVow(currentTemplate)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={() => setSelectedVow(currentTemplate)}
              className="flex-1"
              variant="primary"
            >
              Select This Vow
            </Button>
            <Button
              onClick={generateNewSet}
              className="flex-1"
              variant="secondary"
            >
              Generate Different Vow
            </Button>
          </div>
        </Card>
      )}

      {/* Selected Vow Display */}
      {selectedVow && (
        <Card className="bg-green-50 border-green-100">
          <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
            Your Selected Vow
          </h3>

          <div className="bg-white rounded-[var(--radius-input)] p-4 border border-border mb-4 leading-relaxed">
            <p className="text-text-primary whitespace-pre-wrap">
              {processVow(selectedVow)}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              onClick={copyToClipboard}
              className="flex-1"
              variant="primary"
            >
              Copy to Clipboard
            </Button>
            <Button
              onClick={() => setSelectedVow(null)}
              className="flex-1"
              variant="secondary"
            >
              Try Another Vow
            </Button>
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card>
        <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
          Tips for Writing Your Vows
        </h3>

        <ul className="space-y-3 text-sm text-text-secondary">
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">1</span>
            <span>
              <span className="font-medium text-text-primary">Be specific.</span> Instead of generic promises, mention specific things you love about your partner.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">2</span>
            <span>
              <span className="font-medium text-text-primary">Practice out loud.</span> Vows sound different when spoken. Read them aloud several times before the big day.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">3</span>
            <span>
              <span className="font-medium text-text-primary">Keep it concise.</span> Aim for 2-3 minutes. Your guests will appreciate brevity, and you\'ll get through without overwhelming emotions.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">4</span>
            <span>
              <span className="font-medium text-text-primary">Add personal touches.</span> Mix in inside jokes, shared memories, or private promises that mean something to both of you.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">5</span>
            <span>
              <span className="font-medium text-text-primary">Write it down.</span> Have printed or handwritten notes as backup in case you get emotional and forget your words.
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-accent mr-2 font-bold">6</span>
            <span>
              <span className="font-medium text-text-primary">Make eye contact.</span> Lock eyes with your partner while reciting. It creates an intimate moment just for the two of you.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
