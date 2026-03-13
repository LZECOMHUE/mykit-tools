'use client';
import { useState } from 'react';

const ELF_IDEAS = [
  {
    day: 1,
    name: 'Landing Surprise',
    difficulty: 'easy-setup',
    setup: 'Place elf by the front window or above the doorway. Surround with cotton balls as "snow".',
    supplies: ['Cotton balls or batting', 'Optional: small sign saying "Guess where I landed!"'],
    reveal: 'The elf has arrived to watch over the house during Christmas. Let kids find it and guess where it landed!'
  },
  {
    day: 2,
    name: 'Angel Wings',
    difficulty: 'medium',
    setup: 'Cut out white paper wings or use a paper towel. Glue or tape to the elf\'s back. Position on a high shelf or picture frame.',
    supplies: ['White paper', 'Tape or glue stick', 'Optional: glitter or gold pen'],
    reveal: 'The elf has been an angel all along! Position it like it\'s flying around the house.'
  },
  {
    day: 3,
    name: 'Toilet Paper Mountain',
    difficulty: 'easy-setup',
    setup: 'Roll several toilet paper rolls loosely and stack them like a mountain. Place elf on the peak with a small flag.',
    supplies: ['Toilet paper rolls', 'Toothpick or stick for flag', 'Small paper flag'],
    reveal: 'The elf climbed a mountain because it wanted to get a better view of the house from up high!'
  },
  {
    day: 4,
    name: 'Angel Halo',
    difficulty: 'easy-setup',
    setup: 'Make a halo from gold string, a yellow pipe cleaner, or tape and string. Position around the elf\'s head.',
    supplies: ['String or pipe cleaner', 'Tape', 'Optional: gold paint or marker'],
    reveal: 'The elf is feeling angelic today and made itself a halo! Looks almost too innocent...'
  },
  {
    day: 5,
    name: 'Hot Chocolate Soak',
    difficulty: 'easy-setup',
    setup: 'Fill a small mug or bowl with water and hot chocolate powder. Place elf as if bathing in it.',
    supplies: ['Small mug or bowl', 'Water', 'Hot chocolate powder', 'Optional: marshmallows'],
    reveal: 'The elf decided to take a warm hot chocolate bath to stay cosy during winter!'
  },
  {
    day: 6,
    name: 'Snowball Fight',
    difficulty: 'medium',
    setup: 'Crumple white paper or use white pom poms as snowballs. Scatter around elf as if in mid-battle with small toys.',
    supplies: ['White paper or pom poms', 'Small action figures or stuffed animals'],
    reveal: 'The elf has started a snowball fight with the toys! Who do you think is winning?'
  },
  {
    day: 7,
    name: 'Zipline Adventure',
    difficulty: 'elaborate',
    setup: 'String a line of yarn or string across a room. Attach the elf with a small loop so it "zips" across.',
    supplies: ['Yarn or string', 'Tape', 'Small loop of string around elf'],
    reveal: 'The elf went on a zipline adventure across the room! So daring!'
  },
  {
    day: 8,
    name: 'Sleeping Bag Campout',
    difficulty: 'medium',
    setup: 'Create a tiny sleeping bag from a napkin or cloth. Place elf inside with a small pillow.',
    supplies: ['Napkin or cloth scrap', 'Small pillow or cotton', 'Optional: toy flashlight'],
    reveal: 'The elf decided to camp out indoors! Cosy and adventurous at the same time.'
  },
  {
    day: 9,
    name: 'Snow Angel',
    difficulty: 'easy-setup',
    setup: 'Lay the elf on white paper or felt in a snow angel pose (arms and legs spread).',
    supplies: ['White paper or felt', 'Optional: glitter to outline the angel'],
    reveal: 'The elf made a snow angel! It\'s enjoying all the winter fun.'
  },
  {
    day: 10,
    name: 'Parachute Drop',
    difficulty: 'medium',
    setup: 'Attach a small handkerchief, napkin, or plastic bag as a parachute. Suspend the elf as if descending.',
    supplies: ['Handkerchief or napkin', 'String', 'Tape', 'Optional: helium balloon'],
    reveal: 'The elf parachuted down for a surprise visit! What a dramatic entrance!'
  },
  {
    day: 11,
    name: 'Ice Skating',
    difficulty: 'medium',
    setup: 'Create a skating rink from foil or clear plastic wrap. Make tiny skates from popsicle sticks or felt. Position elf on the ice.',
    supplies: ['Foil or plastic wrap', 'Small sticks or felt pieces', 'Tape'],
    reveal: 'The elf is practicing ice skating! Look at those fancy moves!'
  },
  {
    day: 12,
    name: 'Mailbox Delivery',
    difficulty: 'easy-setup',
    setup: 'Place the elf in or near the mailbox as if just delivered a letter.',
    supplies: ['Optional: small note or card from the elf'],
    reveal: 'The elf used the mailbox to send a special delivery message! Check for a letter!'
  },
  {
    day: 13,
    name: 'Candy Cane Striped',
    difficulty: 'easy-setup',
    setup: 'Wrap red and white tape or markers to create candy cane stripes on the elf.',
    supplies: ['Red and white tape or markers'],
    reveal: 'The elf became a candy cane! Sweet and festive!'
  },
  {
    day: 14,
    name: 'Building a Fort',
    difficulty: 'medium',
    setup: 'Create a fort from books, pillows, or cardboard boxes. Place elf inside or on top.',
    supplies: ['Books', 'Pillows', 'Cardboard boxes', 'Blanket (optional)'],
    reveal: 'The elf built an amazing fort! Would you like to have a fort adventure too?'
  },
  {
    day: 15,
    name: 'Fishing Hole',
    difficulty: 'medium',
    setup: 'Create a snowy fishing scene using white paper, a stick for a fishing rod, and string for the line. Small paper fish nearby.',
    supplies: ['White paper', 'Stick or chopstick', 'String', 'Paper or pom pom fish'],
    reveal: 'The elf went ice fishing! Looks like it caught something fishy!'
  },
  {
    day: 16,
    name: 'Holiday Movie Night',
    difficulty: 'easy-setup',
    setup: 'Position elf in front of the TV or computer screen. Place popcorn container nearby.',
    supplies: ['Optional: popcorn', 'Small bowl or container'],
    reveal: 'The elf is enjoying a holiday movie marathon! What\'s its favourite Christmas film?'
  },
  {
    day: 17,
    name: 'Rope Swing',
    difficulty: 'medium',
    setup: 'Tie a string rope between two sturdy points (doorframe, shelf). Position elf as if mid-swing.',
    supplies: ['String or rope', 'Tape', 'Optional: small platform for takeoff'],
    reveal: 'The elf found a rope swing! Such a daredevil!'
  },
  {
    day: 18,
    name: 'Build a Snowman',
    difficulty: 'medium',
    setup: 'Stack cotton balls or white paper balls to make a snowman. Place elf beside it as the builder.',
    supplies: ['Cotton balls or crumpled white paper', 'Buttons or beads for face', 'Stick for arms'],
    reveal: 'The elf built a snowman friend! They look like they\'re having a good time together.'
  },
  {
    day: 19,
    name: 'Trampoline Bounce',
    difficulty: 'medium',
    setup: 'Stretch fabric or stretchy material over a container. Toss the elf as if bouncing (use photo effect or position mid-air).',
    supplies: ['Fabric or towel', 'Container or stool'],
    reveal: 'The elf discovered the trampoline! Look how high it\'s bouncing!'
  },
  {
    day: 20,
    name: 'Sleigh Ride',
    difficulty: 'medium',
    setup: 'Create or find a small box or container. Position elf in it with "reins" (string) attached to stuffed animals pulling it.',
    supplies: ['Small box or toy sleigh', 'String', 'Stuffed animals or toy animals'],
    reveal: 'The elf took a magical sleigh ride across the house! What an adventure!'
  },
  {
    day: 21,
    name: 'Making Cookies',
    difficulty: 'easy-setup',
    setup: 'Position elf near the kitchen. Place small paper plate with drawn cookies nearby.',
    supplies: ['Small paper or felt plate', 'Markers', 'Optional: real cookie or baking ingredients'],
    reveal: 'The elf is baking Christmas cookies! The house smells amazing!'
  },
  {
    day: 22,
    name: 'Wreath Wearer',
    difficulty: 'easy-setup',
    setup: 'Make a tiny wreath from tinsel, string, or drawn paper. Drape it on or around the elf.',
    supplies: ['Tinsel or string', 'Optional: small holly or greenery'],
    reveal: 'The elf created a holiday wreath! It looks so festive!'
  },
  {
    day: 23,
    name: 'Countdown Decoration',
    difficulty: 'medium',
    setup: 'Position elf with a large countdown sign or calendar. Have it pointing to the number of days until Christmas.',
    supplies: ['Poster board or paper', 'Markers', 'Tape'],
    reveal: 'The elf is so excited about Christmas that it\'s counting down the days! Only one day left!'
  },
  {
    day: 24,
    name: 'Final Farewell',
    difficulty: 'easy-setup',
    setup: 'Position elf on the Christmas tree or near presents. Include a note saying goodbye until next year.',
    supplies: ['Paper for note', 'Markers', 'Optional: small gift or token'],
    reveal: 'The elf is saying goodbye for this year! Thank you for all the fun times together. See you next Christmas!'
  },
  {
    day: 25,
    name: 'Christmas Morning',
    difficulty: 'easy-setup',
    setup: 'Pose the elf in celebration position near the tree or presents.',
    supplies: ['Optional: small gift or treat'],
    reveal: 'It\'s Christmas morning! The elf is celebrating with you and your family. Merry Christmas!'
  }
];

export default function ElfOnTheShelfIdeaGenerator() {
  const [config, setConfig] = useState({
    difficulty: 'medium',
    ageGroup: '5-7',
    location: 'anywhere'
  });

  const [idea, setIdea] = useState(null);

  const handleGenerate = () => {
    const filtered = ELF_IDEAS.filter(idea =>
      idea.difficulty === config.difficulty || config.difficulty === 'any'
    );
    const selected = filtered[Math.floor(Math.random() * filtered.length)];
    setIdea(selected);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Setup Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            {['easy-setup', 'medium', 'elaborate'].map(level => (
              <button
                key={level}
                onClick={() => setConfig(c => ({ ...c, difficulty: level }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize text-sm ${
                  config.difficulty === level
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {level.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Preferred Location</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['bedroom', 'kitchen', 'living-room', 'bathroom', 'anywhere'].map(loc => (
              <button
                key={loc}
                onClick={() => setConfig(c => ({ ...c, location: loc }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize text-sm ${
                  config.location === loc
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {loc.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Get an Idea
        </button>
      </div>

      {idea && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="font-mono text-accent font-bold text-xl">Day {idea.day}</span>
                <span className="text-text-muted text-sm capitalize">{idea.difficulty.replace('-', ' ')}</span>
              </div>
              <h2 className="font-heading text-2xl font-bold text-text-primary">{idea.name}</h2>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">Setup Instructions</h3>
                <p className="text-text-secondary leading-relaxed">{idea.setup}</p>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">Supplies Needed</h3>
                <ul className="space-y-1">
                  {idea.supplies.map((supply, i) => (
                    <li key={i} className="text-text-secondary flex items-start">
                      <span className="mr-2">-</span>
                      <span>{supply}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent-muted border border-accent rounded-[var(--radius-input)] p-4">
                <h3 className="font-heading font-semibold text-accent mb-2">Morning Reveal</h3>
                <p className="text-accent text-sm leading-relaxed">{idea.reveal}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
          >
            Get Another Idea
          </button>
        </div>
      )}
    </div>
  );
}
