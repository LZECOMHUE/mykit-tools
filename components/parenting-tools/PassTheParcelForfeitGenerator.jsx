'use client';
import { useState } from 'react';

const FORFEITS = {
  '3-5': {
    easy: [
      'Make a funny face',
      'Dance like a chicken',
      'Hop on one leg',
      'Say your name backwards',
      'Clap your hands fast',
      'Spin around three times',
      'Touch your toes',
      'Make animal sounds',
      'Wiggle your bottom',
      'Jump up and down',
      'Laugh loudly',
      'Growl like a bear',
      'Pretend to be asleep',
      'Wave like royalty',
      'Stomp your feet',
      'Shrug your shoulders',
      'Wink one eye',
      'Stick out your tongue',
      'Hug the nearest person',
      'Skip around the room'
    ]
  },
  '5-7': {
    easy: [
      'Do five jumping jacks',
      'Sing a line from a nursery rhyme',
      'Walk backwards for ten steps',
      'Do a silly dance',
      'Make the funniest face you can',
      'Stand on one leg for ten seconds',
      'Say a tongue twister',
      'Do ten star jumps',
      'Pretend to be a robot',
      'Waddle like a penguin',
      'Shake hands with everyone',
      'Do an impression of someone',
      'Juggle (or pretend to)',
      'Walk like a crab',
      'Recite the alphabet backwards',
      'Do a cartwheel (or try to)',
      'Laugh for ten seconds',
      'Sit on the floor and laugh',
      'Do the twist',
      'Freeze in a funny position'
    ],
    medium: [
      'Tell a joke to the group',
      'Do a handstand (against wall)',
      'Sing happy birthday loudly',
      'Do impressions of three people',
      'Tell the group a funny story',
      'Do ten push-ups (or attempt them)',
      'Recite a funny poem',
      'Do high kicks around the room',
      'Pretend to be a famous person',
      'Do a silly walk across the room',
      'Play air guitar for one song',
      'Hop around the room like a frog',
      'Pretend to be a superhero',
      'Do a funny voice for one minute',
      'Dance with a cushion'
    ],
    hard: [
      'Get everyone to do something silly with you',
      'Have everyone write your name with their eyes closed',
      'Tell the funniest joke possible',
      'Have everyone give you a compliment',
      'Get the group to do a group hug',
      'Sing a whole song loudly',
      'Do a silly talent show',
      'Make everyone laugh in ten seconds',
      'Have everyone copy your moves',
      'Tell a scary story'
    ]
  },
  '7-9': {
    easy: [
      'Do twenty jumping jacks',
      'Do a handstand for five seconds',
      'Sing a song in a silly voice',
      'Do an impression of a teacher',
      'Walk like a gorilla',
      'Do the moonwalk',
      'Speak in an accent for one minute',
      'Do a forward roll',
      'Climb the stairs on your hands and feet',
      'Do an exaggerated walk'
    ],
    medium: [
      'Teach everyone a new dance move',
      'Do a comedy act for one minute',
      'Tell the funniest joke you know',
      'Do an impression of three celebrities',
      'Make up a silly song and sing it',
      'Have everyone follow you in a chain',
      'Do a cartwheel or hand walk',
      'Recite a funny poem dramatically',
      'Do a silly sport commentary',
      'Play act a funny scene',
      'Do twenty push-ups',
      'Sing a song in three different voices',
      'Tell a really funny story',
      'Do a funny magic trick',
      'Get everyone to sing a line of a song'
    ],
    hard: [
      'Make everyone laugh within thirty seconds',
      'Do a stand-up comedy routine',
      'Get the group to do something embarrassing',
      'Sing a song while doing an activity',
      'Have everyone give you a piggyback ride',
      'Do an elaborate silly performance',
      'Get everyone to do a group dance',
      'Tell a funny story while jumping on one leg',
      'Do impressions of everyone in the room',
      'Get everyone to share their most embarrassing moment'
    ]
  },
  '9-12': {
    easy: [
      'Do thirty jumping jacks',
      'Recite the alphabet backwards in under ten seconds',
      'Do a stand on your hands for five seconds',
      'Speak in rhymes for one minute',
      'Do an impersonation of someone famous',
      'Do a split or attempt it',
      'Do an elaborate stretch routine',
      'Sing a song in three octaves',
      'Do a funny walk the full length of the room',
      'Tell a joke with a full setup and punchline'
    ],
    medium: [
      'Do a five-minute comedy act',
      'Get everyone to do something embarrassing',
      'Do an elaborate prank on someone',
      'Sing a whole song perfectly',
      'Do a funny talent show act',
      'Teach everyone an impressive skill',
      'Tell the funniest story of the night',
      'Do an elaborate dance routine',
      'Make everyone laugh in under fifteen seconds',
      'Do an impression of everyone in the room',
      'Do a handstand for ten seconds',
      'Speak only in questions for five minutes',
      'Do a parkour run (safe version)',
      'Tell a really dark joke',
      'Do an elaborate silly walk routine'
    ],
    hard: [
      'Have a five-minute stand-up comedy set',
      'Get everyone to participate in an embarrassing activity',
      'Do something truly hilarious that makes everyone laugh hard',
      'Sing a song while executing an activity',
      'Have everyone share an embarrassing secret about you',
      'Do an elaborate performance art piece',
      'Get everyone to do the silliest challenge',
      'Make a funny video that everyone approves',
      'Do an improv scene with three other people',
      'Have everyone vote on your silliest moment',
      'Tell a joke so funny everyone laughs',
      'Do a full comedy routine',
      'Convince everyone you\'re a different person',
      'Do something so embarrassing you can\'t stop laughing',
      'Get everyone to help you pull off a prank'
    ]
  }
};

export default function PassTheParcelForfeitGenerator() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [numLayers, setNumLayers] = useState('8');
  const [difficulty, setDifficulty] = useState('medium');
  const [generated, setGenerated] = useState(false);
  const [forfeits, setForfeits] = useState([]);

  const generateForfeits = () => {
    const forfeitSet = FORFEITS[ageGroup]?.[difficulty] || FORFEITS['5-7'].easy;
    const count = parseInt(numLayers);

    const shuffled = [...forfeitSet].sort(() => Math.random() - 0.5).slice(0, count);
    setForfeits(shuffled);
    setGenerated(true);
  };

  const difficultyOptions = {
    '3-5': ['easy'],
    '5-7': ['easy', 'medium', 'hard'],
    '7-9': ['easy', 'medium', 'hard'],
    '9-12': ['easy', 'medium', 'hard']
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Forfeit Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Age Group</label>
            <div className="flex gap-2">
              {['3-5', '5-7', '7-9', '9-12'].map(age => (
                <button
                  key={age}
                  onClick={() => {
                    setAgeGroup(age);
                    setDifficulty('easy');
                  }}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors ${
                    ageGroup === age
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Number of Layers</label>
            <input
              type="range"
              min="5"
              max="15"
              value={numLayers}
              onChange={(e) => setNumLayers(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-accent font-mono font-medium">{numLayers} layers</div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Difficulty</label>
            <div className="flex gap-2">
              {difficultyOptions[ageGroup].map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors flex-1 ${
                    difficulty === diff
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Prize</label>
            <select className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary">
              <option>Wrapped gift in centre</option>
              <option>Chocolate coin in each layer</option>
              <option>Small toy or trinket</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateForfeits}
          className="w-full bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] py-2 font-medium transition-colors"
        >
          Generate Forfeits
        </button>
      </div>

      {generated && (
        <div className="space-y-6">
          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-xl font-bold text-text-primary">Forfeit List for Each Layer</h2>
            <p className="text-text-secondary text-sm">Print this list and keep it with the parcel. Call out the forfeit when each layer is unwrapped.</p>

            <div className="space-y-3">
              {forfeits.map((forfeit, idx) => (
                <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-[var(--radius-card)] border border-border">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-mono font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-grow">
                    <p className="text-text-primary font-medium">{forfeit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-amber-900 mb-2">How to Play Pass the Parcel</h3>
            <ol className="text-sm text-amber-900 space-y-2 list-decimal list-inside">
              <li>Wrap a gift in multiple layers of paper or newspaper</li>
              <li>When music starts, children pass the parcel around in a circle</li>
              <li>When music stops, whoever holds the parcel unwraps one layer</li>
              <li>Call out the forfeit for that layer - they must do it immediately</li>
              <li>Then music starts again and play continues</li>
              <li>The child who unwraps the final layer keeps the prize inside</li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-blue-900 mb-2">Setup Tips</h3>
            <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
              <li>Prepare the parcel before the party starts</li>
              <li>Use a good music playlist so you can control when it stops</li>
              <li>Print this forfeit list and keep it visible</li>
              <li>Make sure the final layer is easy to unwrap so the winner doesn\'t struggle</li>
              <li>Have everyone encourage the person doing the forfeit</li>
              <li>For younger children, keep forfeits simple and fun</li>
              <li>For older children, make forfeits more challenging and embarrassing</li>
            </ul>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] font-medium transition-colors"
          >
            Print Forfeit List
          </button>
        </div>
      )}
    </div>
  );
}
