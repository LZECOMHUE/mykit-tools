'use client';
import { useState, useRef } from 'react';
import Button from '@/components/ui/Button';
import { downloadAsJPG, drawSectionHeading, drawBulletList } from '@/lib/download-utils';

const ELF_IDEAS = [
  // ── Easy Setup ────────────────────────────────────
  {
    day: 1, name: 'Landing Surprise', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Place elf by the front window or above the doorway. Surround with cotton balls as "snow".',
    supplies: ['Cotton balls or batting', 'Optional: small sign saying "Guess where I landed!"'],
    reveal: 'The elf has arrived to watch over the house during Christmas. Let kids find it and guess where it landed!',
  },
  {
    day: 3, name: 'Toilet Paper Mountain', difficulty: 'easy-setup', location: 'bathroom',
    setup: 'Roll several toilet paper rolls loosely and stack them like a mountain. Place elf on the peak with a small flag.',
    supplies: ['Toilet paper rolls', 'Toothpick or stick for flag', 'Small paper flag'],
    reveal: 'The elf climbed a mountain because it wanted to get a better view of the house from up high!',
  },
  {
    day: 4, name: 'Angel Halo', difficulty: 'easy-setup', location: 'bedroom',
    setup: "Make a halo from gold string, a yellow pipe cleaner, or tape and string. Position around the elf's head.",
    supplies: ['String or pipe cleaner', 'Tape', 'Optional: gold paint or marker'],
    reveal: 'The elf is feeling angelic today and made itself a halo! Looks almost too innocent...',
  },
  {
    day: 5, name: 'Hot Chocolate Soak', difficulty: 'easy-setup', location: 'kitchen',
    setup: 'Fill a small mug or bowl with water and hot chocolate powder. Place elf as if bathing in it.',
    supplies: ['Small mug or bowl', 'Water', 'Hot chocolate powder', 'Optional: marshmallows'],
    reveal: 'The elf decided to take a warm hot chocolate bath to stay cosy during winter!',
  },
  {
    day: 9, name: 'Snow Angel', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Lay the elf on white paper or felt in a snow angel pose (arms and legs spread).',
    supplies: ['White paper or felt', 'Optional: glitter to outline the angel'],
    reveal: "The elf made a snow angel! It's enjoying all the winter fun.",
  },
  {
    day: 12, name: 'Mailbox Delivery', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Place the elf in or near the mailbox (or a shoe) as if just delivered a letter.',
    supplies: ['Optional: small note or card from the elf'],
    reveal: 'The elf used the mailbox to send a special delivery message! Check for a letter!',
  },
  {
    day: 13, name: 'Candy Cane Stripes', difficulty: 'easy-setup', location: 'kitchen',
    setup: 'Wrap red and white tape or ribbon around the elf to create candy cane stripes.',
    supplies: ['Red and white tape or ribbon'],
    reveal: 'The elf became a candy cane! Sweet and festive!',
  },
  {
    day: 16, name: 'Holiday Movie Night', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Position elf in front of the TV or a tablet screen. Place popcorn container nearby.',
    supplies: ['Optional: popcorn', 'Small bowl or container'],
    reveal: "The elf is enjoying a holiday movie marathon! What's its favourite Christmas film?",
  },
  {
    day: 21, name: 'Making Cookies', difficulty: 'easy-setup', location: 'kitchen',
    setup: 'Position elf near the kitchen. Place small paper plate with drawn cookies or real mini cookies nearby.',
    supplies: ['Small paper or felt plate', 'Markers', 'Optional: real cookie or baking ingredients'],
    reveal: 'The elf is baking Christmas cookies! The house smells amazing!',
  },
  {
    day: 22, name: 'Wreath Wearer', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Make a tiny wreath from tinsel, string, or drawn paper. Drape it on or around the elf.',
    supplies: ['Tinsel or string', 'Optional: small holly or greenery'],
    reveal: 'The elf created a holiday wreath! It looks so festive!',
  },
  {
    day: 24, name: 'Final Farewell', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Position elf on the Christmas tree or near presents. Include a note saying goodbye until next year.',
    supplies: ['Paper for note', 'Markers', 'Optional: small gift or token'],
    reveal: "The elf is saying goodbye for this year! Thank you for all the fun times together. See you next Christmas!",
  },
  {
    day: 25, name: 'Christmas Morning', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Pose the elf in celebration position near the tree or presents.',
    supplies: ['Optional: small gift or treat'],
    reveal: "It's Christmas morning! The elf is celebrating with you and your family. Merry Christmas!",
  },
  {
    name: 'Bookworm Elf', difficulty: 'easy-setup', location: 'bedroom',
    setup: 'Stack a pile of books and sit the elf on top with a tiny open book (folded paper). Add tiny paper glasses.',
    supplies: ['Small stack of books', 'Folded paper for mini book', 'Optional: pipe cleaner glasses'],
    reveal: "The elf stayed up all night reading! Looks like it's a real bookworm.",
  },
  {
    name: 'Fruit Bowl Hideaway', difficulty: 'easy-setup', location: 'kitchen',
    setup: 'Nestle the elf in the fruit bowl surrounded by apples, oranges, or bananas.',
    supplies: ['Fruit bowl with fruit'],
    reveal: 'The elf tried to hide in the fruit bowl! Not the best hiding spot though...',
  },
  {
    name: 'Shoe Surprise', difficulty: 'easy-setup', location: 'bedroom',
    setup: "Place the elf inside one of the child's shoes or boots by the door, peeking out.",
    supplies: ['A shoe or boot'],
    reveal: 'The elf snuck into your shoe for a nap! Careful when you put your shoes on!',
  },
  {
    name: 'Mirror Message', difficulty: 'easy-setup', location: 'bathroom',
    setup: 'Use a dry-erase marker to write a message on the bathroom mirror. Sit elf next to the marker.',
    supplies: ['Dry-erase marker', 'Bathroom mirror'],
    reveal: 'The elf left you a secret message on the mirror! What does it say?',
  },
  {
    name: 'Stocking Peek', difficulty: 'easy-setup', location: 'living-room',
    setup: 'Tuck the elf halfway into a Christmas stocking so it peeks out the top.',
    supplies: ['A Christmas stocking'],
    reveal: "The elf climbed into a stocking! Looks like it's checking what's inside.",
  },
  {
    name: 'Drawer Diver', difficulty: 'easy-setup', location: 'bedroom',
    setup: "Open a drawer slightly and position the elf as if climbing out, surrounded by socks or clothes.",
    supplies: ['A drawer with soft items'],
    reveal: 'The elf tried to organise your drawer... or maybe just wanted to try on socks!',
  },

  // ── Medium ────────────────────────────────────────
  {
    day: 2, name: 'Angel Wings', difficulty: 'medium', location: 'living-room',
    setup: "Cut out white paper wings or use a paper towel. Tape to the elf's back. Position on a high shelf or picture frame.",
    supplies: ['White paper', 'Tape or glue stick', 'Optional: glitter or gold pen'],
    reveal: "The elf has been an angel all along! Position it like it's flying around the house.",
  },
  {
    day: 6, name: 'Snowball Fight', difficulty: 'medium', location: 'living-room',
    setup: 'Crumple white paper or use white pom poms as snowballs. Scatter around elf as if in mid-battle with small toys.',
    supplies: ['White paper or pom poms', 'Small action figures or stuffed animals'],
    reveal: 'The elf has started a snowball fight with the toys! Who do you think is winning?',
  },
  {
    day: 8, name: 'Sleeping Bag Campout', difficulty: 'medium', location: 'bedroom',
    setup: 'Create a tiny sleeping bag from a napkin or cloth. Place elf inside with a small pillow.',
    supplies: ['Napkin or cloth scrap', 'Small pillow or cotton', 'Optional: toy flashlight'],
    reveal: 'The elf decided to camp out indoors! Cosy and adventurous at the same time.',
  },
  {
    day: 10, name: 'Parachute Drop', difficulty: 'medium', location: 'living-room',
    setup: 'Attach a small handkerchief, napkin, or plastic bag as a parachute. Suspend the elf as if descending.',
    supplies: ['Handkerchief or napkin', 'String', 'Tape'],
    reveal: 'The elf parachuted down for a surprise visit! What a dramatic entrance!',
  },
  {
    day: 11, name: 'Ice Skating', difficulty: 'medium', location: 'kitchen',
    setup: 'Create a skating rink from foil or clear plastic wrap. Make tiny skates from popsicle sticks or felt. Position elf on the ice.',
    supplies: ['Foil or plastic wrap', 'Small sticks or felt pieces', 'Tape'],
    reveal: 'The elf is practicing ice skating! Look at those fancy moves!',
  },
  {
    day: 14, name: 'Building a Fort', difficulty: 'medium', location: 'living-room',
    setup: 'Create a fort from books, pillows, or cardboard boxes. Place elf inside or on top.',
    supplies: ['Books', 'Pillows', 'Cardboard boxes', 'Blanket (optional)'],
    reveal: 'The elf built an amazing fort! Would you like to have a fort adventure too?',
  },
  {
    day: 15, name: 'Fishing Hole', difficulty: 'medium', location: 'bathroom',
    setup: 'Create a snowy fishing scene using white paper, a stick for a fishing rod, and string for the line. Small paper fish nearby.',
    supplies: ['White paper', 'Stick or chopstick', 'String', 'Paper or pom pom fish'],
    reveal: 'The elf went ice fishing! Looks like it caught something fishy!',
  },
  {
    day: 17, name: 'Rope Swing', difficulty: 'medium', location: 'living-room',
    setup: 'Tie a string rope between two sturdy points (doorframe, shelf). Position elf as if mid-swing.',
    supplies: ['String or rope', 'Tape', 'Optional: small platform for takeoff'],
    reveal: 'The elf found a rope swing! Such a daredevil!',
  },
  {
    day: 18, name: 'Build a Snowman', difficulty: 'medium', location: 'kitchen',
    setup: 'Stack cotton balls or white paper balls to make a snowman. Place elf beside it as the builder.',
    supplies: ['Cotton balls or crumpled white paper', 'Buttons or beads for face', 'Stick for arms'],
    reveal: "The elf built a snowman friend! They look like they're having a good time together.",
  },
  {
    day: 19, name: 'Trampoline Bounce', difficulty: 'medium', location: 'bedroom',
    setup: 'Stretch fabric or stretchy material over a container. Position the elf as if bouncing mid-air.',
    supplies: ['Fabric or towel', 'Container or stool'],
    reveal: "The elf discovered the trampoline! Look how high it's bouncing!",
  },
  {
    day: 20, name: 'Sleigh Ride', difficulty: 'medium', location: 'living-room',
    setup: 'Create or find a small box or container. Position elf in it with "reins" (string) attached to stuffed animals pulling it.',
    supplies: ['Small box or toy sleigh', 'String', 'Stuffed animals or toy animals'],
    reveal: 'The elf took a magical sleigh ride across the house! What an adventure!',
  },
  {
    day: 23, name: 'Countdown Decoration', difficulty: 'medium', location: 'living-room',
    setup: 'Position elf with a large countdown sign or calendar. Have it pointing to the number of days until Christmas.',
    supplies: ['Poster board or paper', 'Markers', 'Tape'],
    reveal: "The elf is so excited about Christmas that it's counting down the days!",
  },
  {
    name: 'Marshmallow Igloo', difficulty: 'medium', location: 'kitchen',
    setup: 'Build a small igloo from marshmallows and toothpicks. Sit the elf inside or beside it.',
    supplies: ['Marshmallows', 'Toothpicks', 'Plate or tray'],
    reveal: 'The elf built an igloo out of marshmallows! Now that is some creative architecture.',
  },
  {
    name: 'Art Studio', difficulty: 'medium', location: 'kitchen',
    setup: 'Set up a tiny easel (propped cardboard) with a small painting (drawn on paper). Give elf a cotton bud "paintbrush" and small paint dabs on a plate.',
    supplies: ['Small cardboard for easel', 'Paper for painting', 'Cotton bud', 'Washable paint dabs on a plate'],
    reveal: "The elf has been painting a masterpiece! I think it's been taking art lessons at the North Pole.",
  },
  {
    name: 'Banana Message', difficulty: 'medium', location: 'kitchen',
    setup: 'Use a toothpick to scratch a message into a banana skin (it turns brown and becomes readable). Position elf next to bananas with the toothpick.',
    supplies: ['Banana', 'Toothpick'],
    reveal: 'The elf wrote a secret message on the banana! Peel it to read the full note.',
  },
  {
    name: 'Toilet Roll Telescope', difficulty: 'medium', location: 'bathroom',
    setup: 'Hold a toilet roll tube up to the elf\'s eye like a telescope. Position on a windowsill looking out.',
    supplies: ['Empty toilet roll tube', 'Tape'],
    reveal: "The elf is keeping lookout with a telescope! Probably watching for Santa's sleigh.",
  },
  {
    name: 'Toy Car Race', difficulty: 'medium', location: 'bedroom',
    setup: 'Line up toy cars at a start line made from tape. Sit elf in or behind one car, holding a paper chequered flag.',
    supplies: ['Toy cars', 'Tape for start line', 'Paper chequered flag'],
    reveal: 'The elf organised a toy car race! Ready, set, go!',
  },

  // ── Elaborate ─────────────────────────────────────
  {
    day: 7, name: 'Zipline Adventure', difficulty: 'elaborate', location: 'living-room',
    setup: 'String a line of yarn or string across a room. Attach the elf with a small loop so it "zips" across.',
    supplies: ['Yarn or string', 'Tape', 'Small loop of string around elf'],
    reveal: 'The elf went on a zipline adventure across the room! So daring!',
  },
  {
    name: 'North Pole Post Office', difficulty: 'elaborate', location: 'living-room',
    setup: 'Create a tiny post office from a shoebox. Cut a mail slot in the front. Add a "North Pole Mail" sign. Fill with tiny envelopes (folded paper). Sit elf behind the counter.',
    supplies: ['Shoebox', 'Scissors', 'Paper for sign and envelopes', 'Markers', 'Tape'],
    reveal: "The elf opened a post office! You can write letters to Santa and post them through the slot.",
  },
  {
    name: "Santa's Workshop", difficulty: 'elaborate', location: 'living-room',
    setup: 'Set up a miniature workshop using a small box as a workbench. Scatter tiny tools (toothpicks, buttons, cotton), mini wrapped presents, and position elf as if building toys.',
    supplies: ['Small box', 'Toothpicks', 'Buttons', 'Cotton', 'Small wrapped sweets as presents', 'Paper and markers'],
    reveal: "The elf brought a piece of Santa's workshop home! Look at all the tiny toys being made.",
  },
  {
    name: 'Gingerbread House Builder', difficulty: 'elaborate', location: 'kitchen',
    setup: 'Build a tiny gingerbread house from biscuits/crackers and icing. Position elf as the architect with blueprints (drawn on paper).',
    supplies: ['Biscuits or graham crackers', 'Icing or peanut butter as glue', 'Sweets for decorations', 'Paper for blueprints'],
    reveal: 'The elf is a master builder! Look at the gingerbread house it designed.',
  },
  {
    name: 'Indoor Camping Trip', difficulty: 'elaborate', location: 'living-room',
    setup: 'Build a mini tent from fabric and sticks. Add a fake campfire (scrunched orange/red tissue paper around sticks). Scatter mini marshmallows. Position elf toasting a marshmallow.',
    supplies: ['Fabric scrap or handkerchief', 'Sticks or chopsticks', 'Orange/red tissue paper', 'Small sticks for fire', 'Mini marshmallows', 'Toothpick'],
    reveal: "The elf went camping in the living room! There's even s'mores by the campfire.",
  },
  {
    name: 'Spy Mission', difficulty: 'elaborate', location: 'living-room',
    setup: 'Create a laser grid using red yarn or string criss-crossed across a doorway (low enough for kids to step over). Position elf mid-crawl underneath.',
    supplies: ['Red yarn or string', 'Tape', 'Optional: toy binoculars or sunglasses for elf'],
    reveal: "The elf is on a top-secret spy mission! Can you get through the laser grid too?",
  },
  {
    name: 'Hot Air Balloon Ride', difficulty: 'elaborate', location: 'living-room',
    setup: 'Inflate a small balloon and attach a small basket (paper cup or berry punnet) below it with string. Place elf in the basket. Suspend from ceiling or shelf.',
    supplies: ['Small balloon', 'Paper cup or berry punnet', 'String', 'Tape or hook for ceiling'],
    reveal: 'The elf took a hot air balloon ride across the living room! What a view from up there!',
  },
  {
    name: 'Dinosaur Discovery', difficulty: 'elaborate', location: 'bedroom',
    setup: 'Create a mini archaeological dig using a tray of flour or sand. Bury small toy dinosaurs. Give elf a toothbrush and small tools. Add a "Dig Site" sign.',
    supplies: ['Tray', 'Flour or sand', 'Small toy dinosaurs', 'Toothbrush', 'Paper sign'],
    reveal: 'The elf discovered dinosaur fossils! Grab a brush and help with the excavation!',
  },
  {
    name: 'Elf Spa Day', difficulty: 'elaborate', location: 'bathroom',
    setup: 'Fill a small bowl with water and bubbles. Give the elf a tiny towel turban (face cloth), cucumber slices (cut from paper), and a robe (draped cloth).',
    supplies: ['Small bowl', 'Bubble bath or soap', 'Face cloth', 'Green paper for cucumber slices', 'Small cloth for robe'],
    reveal: 'The elf is having a spa day! Even elves need to relax during the busy Christmas season.',
  },
  {
    name: 'Band Practice', difficulty: 'elaborate', location: 'bedroom',
    setup: 'Set up a mini band with the elf and other toys. Make instruments from household items: a drum (small container), guitar (cardboard cutout), microphone (marker).',
    supplies: ['Small container for drum', 'Cardboard for guitar cutout', 'Marker for microphone', 'Other toys as band members'],
    reveal: "The elf started a band! Looks like they're rehearsing for the North Pole Christmas concert.",
  },
  {
    name: 'Snowflake Factory', difficulty: 'elaborate', location: 'kitchen',
    setup: 'Cut out several paper snowflakes of different sizes. Scatter around the elf with scissors and folded paper, as if the elf is mid-production. Hang some from string above.',
    supplies: ['White paper', 'Scissors', 'String', 'Tape'],
    reveal: 'The elf has been making snowflakes all night! The house looks like a winter wonderland.',
  },
  {
    name: 'Reindeer Stable', difficulty: 'elaborate', location: 'living-room',
    setup: 'Build a small stable from a cardboard box. Add hay (shredded paper), a water trough (small container), and toy reindeer or horses. Elf positioned as the stable keeper.',
    supplies: ['Small cardboard box', 'Shredded paper for hay', 'Small container for water', 'Toy reindeer or horses', 'Markers for signs'],
    reveal: "The elf is looking after Santa's reindeer! They need a rest stop on their journey.",
  },
];

export default function ElfOnTheShelfIdeaGenerator() {
  const [config, setConfig] = useState({
    difficulty: 'medium',
    location: 'anywhere',
  });

  const [idea, setIdea] = useState(null);
  const lastIdeaRef = useRef(null);

  const handleGenerate = () => {
    let filtered = ELF_IDEAS.filter((i) => {
      const diffMatch = config.difficulty === 'any' || i.difficulty === config.difficulty;
      const locMatch = config.location === 'anywhere' || i.location === config.location;
      return diffMatch && locMatch;
    });

    // If too few results, relax the location filter
    if (filtered.length < 2) {
      filtered = ELF_IDEAS.filter(
        (i) => config.difficulty === 'any' || i.difficulty === config.difficulty
      );
    }

    // Avoid repeating the last idea if possible
    if (filtered.length > 1) {
      filtered = filtered.filter((i) => i.name !== lastIdeaRef.current);
    }

    if (filtered.length === 0) filtered = ELF_IDEAS;

    const selected = filtered[Math.floor(Math.random() * filtered.length)];
    lastIdeaRef.current = selected.name;
    setIdea(selected);
  };

  const downloadIdea = () => {
    if (!idea) return;

    downloadAsJPG({
      filename: 'elf-idea.jpg',
      width: 900,
      height: 1200,
      title: `Day ${idea.day || '?'}: ${idea.name}`,
      subtitle: 'Elf on the Shelf Idea',
      accentColor: '#dc2626',
      render: (ctx, area) => {
        let y = area.y;

        y = drawSectionHeading(ctx, 'Setup Instructions', area.x, y, area.width);
        y += 8;
        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#1a1a1a';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        const textX = area.x;
        const wrapText = (text, startY) => {
          let cy = startY;
          const words = text.split(' ');
          let line = '';
          words.forEach((word) => {
            const testLine = line + (line ? ' ' : '') + word;
            if (ctx.measureText(testLine).width > area.width - 16 && line) {
              ctx.fillText(line, textX, cy);
              cy += 22;
              line = word;
            } else {
              line = testLine;
            }
          });
          if (line) { ctx.fillText(line, textX, cy); cy += 22; }
          return cy;
        };

        y = wrapText(idea.setup, y);
        y += 12;
        y = drawSectionHeading(ctx, 'Supplies Needed', area.x, y, area.width);
        y = drawBulletList(ctx, idea.supplies, area.x, y, { fontSize: 12, lineHeight: 20, maxWidth: area.width - 16 });

        y += 12;
        ctx.fillStyle = '#dc2626';
        ctx.fillRect(area.x, y, area.width, 1);
        y += 12;

        y = drawSectionHeading(ctx, 'Morning Reveal', area.x, y, area.width, '#dc2626');
        y += 8;
        ctx.font = '13px sans-serif';
        ctx.fillStyle = '#1a1a1a';
        y = wrapText(idea.reveal, y);
      },
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Setup Difficulty</label>
          <div className="grid grid-cols-3 gap-2">
            {['easy-setup', 'medium', 'elaborate'].map((level) => (
              <button
                key={level}
                onClick={() => setConfig((c) => ({ ...c, difficulty: level }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize text-sm cursor-pointer ${
                  config.difficulty === level
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {level === 'easy-setup' ? 'Easy Setup' : level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Preferred Location</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['bedroom', 'kitchen', 'living-room', 'bathroom', 'anywhere'].map((loc) => (
              <button
                key={loc}
                onClick={() => setConfig((c) => ({ ...c, location: loc }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize text-sm cursor-pointer ${
                  config.location === loc
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {loc === 'living-room' ? 'Living Room' : loc.charAt(0).toUpperCase() + loc.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition cursor-pointer"
        >
          Get an Idea
        </button>
      </div>

      {idea && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="mb-4">
              <div className="flex items-baseline gap-2 mb-2">
                {idea.day && <span className="font-mono text-accent font-bold text-xl">Day {idea.day}</span>}
                <span className="text-text-muted text-sm capitalize">{idea.difficulty.replace('-', ' ')}</span>
                <span className="text-text-muted text-sm capitalize">/ {idea.location.replace('-', ' ')}</span>
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

          <div className="flex gap-3">
            <button
              onClick={handleGenerate}
              className="flex-1 bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition cursor-pointer"
            >
              Get Another Idea
            </button>
            <Button onClick={downloadIdea} className="flex-1 bg-accent text-white">
              Download JPG
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
