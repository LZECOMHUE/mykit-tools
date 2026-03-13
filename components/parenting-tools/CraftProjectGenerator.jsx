'use client';
import { useState } from 'react';

const CRAFTS = {
  '3-5': {
    'paper-only': [
      {
        title: 'Paper Plate Rainbow',
        time: '15min',
        materials: ['Paper plate', 'Markers or crayons', 'Scissors (safety)'],
        instructions: [
          'Draw a large circle on the paper plate',
          'Divide it into sections with markers',
          'Colour each section a different colour of the rainbow',
          'Cut out the circle and hang it in a window',
          'Let light shine through to see your rainbow!'
        ]
      },
      {
        title: 'Hand Print Animals',
        time: '15min',
        materials: ['Paper', 'Paint or markers', 'Your hands'],
        instructions: [
          'Paint your hand with washable paint',
          'Press your hand firmly on paper',
          'Let dry, then add details with markers to make animals',
          'A hand print can become: butterfly (two hands), cat paw, flower petals, or peacock feathers',
          'Sign your name and display your creation'
        ]
      },
      {
        title: 'Folded Paper Boat',
        time: '15min',
        materials: ['Paper', 'Markers for decoration'],
        instructions: [
          'Fold a rectangular piece of paper in half lengthwise',
          'Fold the top corners down to make a triangle',
          'Fold the bottom edge up twice to hide the paper edges',
          'Pull the sides apart gently to create a boat',
          'Decorate with markers and float it in water or carry it around'
        ]
      },
      {
        title: 'Tissue Paper Stained Glass',
        time: '30min',
        materials: ['Black paper', 'Tissue paper (coloured)', 'Glue stick', 'Scissors'],
        instructions: [
          'Cut black paper into a frame shape with a window in the middle',
          'Tear or cut tissue paper into colourful pieces',
          'Glue tissue pieces over the window to create a stained glass effect',
          'Mix colours for pretty effects',
          'Hang in window to see light shine through'
        ]
      }
    ],
    'basic-craft': [
      {
        title: 'Pom Pom Animals',
        time: '30min',
        materials: ['Pom poms (various sizes)', 'Glue', 'Googly eyes', 'Markers'],
        instructions: [
          'Glue pom poms together to make animal bodies',
          'Glue googly eyes onto the smallest pom pom for the head',
          'Use markers to add details (smile, nose, spots)',
          'Create: bunny, caterpillar, sheep, or beetle',
          'Let glue dry before playing with your new friend'
        ]
      },
      {
        title: 'Pipe Cleaner Creations',
        time: '20min',
        materials: ['Pipe cleaners (various colours)', 'Scissors', 'Beads (optional)'],
        instructions: [
          'Twist pipe cleaners to make simple shapes',
          'Create: flowers, butterflies, snakes, or stars',
          'Thread beads onto pipe cleaners for decoration',
          'Twist two colours together for patterns',
          'Display your colourful creations'
        ]
      },
      {
        title: 'Foam Cup Caterpillar',
        time: '25min',
        materials: ['Foam or paper cups', 'Paint or markers', 'Googly eyes', 'Pipe cleaner', 'Glue'],
        instructions: [
          'Stack cups upside down and glue them together',
          'Paint or colour the cups in bright colours',
          'Glue googly eyes to the top cup',
          'Add a pipe cleaner antenna',
          'Your caterpillar is ready to display'
        ]
      }
    ]
  },
  '5-7': {
    'paper-only': [
      {
        title: 'Origami Paper Crane',
        time: '30min',
        materials: ['Square paper', 'Coloured paper (optional)'],
        instructions: [
          'Fold square paper diagonally both ways, then unfold',
          'Fold all four corners to the centre point',
          'Repeat this fold again',
          'Fold the paper in half',
          'Fold the wings down on both sides',
          'Gently pull the neck and head out, shape it with your fingers',
          'You have created a paper crane!'
        ]
      },
      {
        title: 'Paper Mache Bowl',
        time: '1hr (plus drying)',
        materials: ['Newspaper', 'Paste (flour and water)', 'Balloon', 'Paint (optional)'],
        instructions: [
          'Blow up a balloon and place in a bowl',
          'Tear newspaper into strips',
          'Mix flour and water to make paste',
          'Dip strips in paste and stick to balloon',
          'Layer strips until covered (2-3 layers)',
          'Let dry completely (overnight)',
          'Pop balloon carefully, paint your bowl',
          'Use it to hold small items'
        ]
      },
      {
        title: 'Newspaper Weaving',
        time: '30min',
        materials: ['Newspaper or colourful paper', 'Glue', 'Scissors'],
        instructions: [
          'Cut a sheet into strips from one edge (don\'t cut all the way through)',
          'Tear other paper into strips',
          'Weave the strips over and under the cuts',
          'Create patterns with different colours',
          'Glue everything in place',
          'Display your woven artwork'
        ]
      },
      {
        title: 'Concertina Fan',
        time: '15min',
        materials: ['A4 paper', 'Markers', 'Stickers or paint'],
        instructions: [
          'Draw a picture or pattern on your paper',
          'Fold the paper back and forth in accordion folds',
          'Gather all the folds at one end',
          'Hold the gathered end like a handle',
          'Wave it gently to create a breeze',
          'Perfect for hot summer days!'
        ]
      }
    ],
    'basic-craft': [
      {
        title: 'Salt Dough Ornaments',
        time: '30min (plus baking)',
        materials: ['Flour', 'Salt', 'Water', 'Cookie cutters', 'Paint (optional)'],
        instructions: [
          'Mix 2 cups flour, 1 cup salt, 1 cup water to make dough',
          'Knead until smooth',
          'Roll out flat and cut with cookie cutters',
          'Poke a hole at the top with a toothpick for hanging',
          'Bake at 180C for 1-2 hours until hard',
          'Paint and decorate when cool',
          'Hang from a string'
        ]
      },
      {
        title: 'Painted Rocks',
        time: '30min',
        materials: ['Smooth rocks', 'Acrylic paint', 'Paintbrushes', 'Sealant (optional)'],
        instructions: [
          'Wash and dry rocks',
          'Paint designs: animals, mandalas, patterns, or sayings',
          'Use fine brushes for details',
          'Let paint dry completely',
          'Seal with clear coat if outdoors',
          'Place in garden or give as gifts'
        ]
      },
      {
        title: 'Friendship Bracelets',
        time: '45min',
        materials: ['Embroidery thread', 'Scissors', 'Tape or clipboard'],
        instructions: [
          'Cut 6-8 strands of embroidery thread (each about 60cm)',
          'Tie at one end and tape to a clipboard',
          'Separate threads into two groups',
          'Braid the groups by crossing left over right, repeat',
          'Continue until bracelet is long enough',
          'Braid the ends and tie off',
          'Give to a friend!'
        ]
      },
      {
        title: 'Decorated Wind Chime',
        time: '1hr',
        materials: ['Stick or bamboo circle', 'String', 'Beads', 'Bells', 'Paint (optional)'],
        instructions: [
          'Paint the base stick or ring if desired',
          'Attach multiple strings of varying lengths',
          'Thread beads onto the strings',
          'Tie bells at the bottom of strings',
          'Hang near a window or outside',
          'Enjoy the gentle chiming sounds'
        ]
      }
    ],
    'full-supplies': [
      {
        title: 'Collage Landscape',
        time: '45min',
        materials: ['Poster board', 'Magazines or coloured paper', 'Scissors', 'Glue', 'Markers'],
        instructions: [
          'Draw a landscape outline lightly in pencil (sky, mountains, trees, ground)',
          'Tear or cut paper into sections',
          'Glue pieces to create your landscape (blue for sky, brown for trees)',
          'Layer pieces for depth and texture',
          'Add details with markers',
          'Frame your finished masterpiece'
        ]
      }
    ]
  },
  '7-9': {
    'basic-craft': [
      {
        title: 'Clay Pinch Pots',
        time: '45min',
        materials: ['Modelling clay or air-dry clay', 'Water', 'Sculpting tools or pencils'],
        instructions: [
          'Roll a ball of clay about the size of an apple',
          'Poke your thumb into the centre and rotate as you pinch',
          'Gradually shape into a bowl, keeping walls even',
          'Smooth with wet fingers',
          'Add decorative details or texture with tools',
          'Let dry or bake according to clay instructions',
          'Paint when completely dry'
        ]
      },
      {
        title: 'Jewellery Box',
        time: '1hr',
        materials: ['Wooden box kit or decorated box', 'Paint', 'Fabric', 'Decorations', 'Glue'],
        instructions: [
          'Start with a plain wooden box',
          'Paint the outside in your chosen colours',
          'Glue fabric or felt inside for padding',
          'Decorate with stickers, jewels, or paint details',
          'Line with pretty paper',
          'Use to store jewellery or treasures'
        ]
      },
      {
        title: 'Terrarium in a Jar',
        time: '30min (plus growth time)',
        materials: ['Clear glass jar', 'Soil', 'Small plants or seeds', 'Gravel', 'Water'],
        instructions: [
          'Layer gravel at the bottom of the jar',
          'Add a layer of soil',
          'Plant small plants or seeds',
          'Add moss for decoration',
          'Water lightly (soil should be moist, not wet)',
          'Cover loosely and place in indirect light',
          'Watch your mini ecosystem grow'
        ]
      }
    ],
    'full-supplies': [
      {
        title: 'Tie Dye Shirt',
        time: '1hr (plus drying)',
        materials: ['White cotton shirt', 'Tie dye kit or food colouring', 'Elastic bands', 'Plastic bags', 'Water'],
        instructions: [
          'Dampen the shirt with water',
          'Fold, bunch, or tie with elastic bands to create patterns',
          'Mix dye according to package instructions',
          'Apply dye to the folded areas',
          'Wrap in plastic and let sit (24 hours for best results)',
          'Rinse in cold water until water runs clear',
          'Wash and dry',
          'Wear your unique creation!'
        ]
      },
      {
        title: 'Stained Glass Window Art',
        time: '1hr',
        materials: ['Black card or paper', 'Tissue paper', 'Glue', 'Scissors', 'Clear tape or glue stick'],
        instructions: [
          'Create a frame by cutting a shape from black card',
          'Leave a window in the middle',
          'Tear or cut tissue paper into shapes',
          'Glue tissue to the back of the frame to fill the window',
          'Create a picture with overlapping tissue layers',
          'Tape to a sunny window',
          'Watch light shine through your artwork'
        ]
      },
      {
        title: 'Marbled Paper Art',
        time: '45min',
        materials: ['Marbling ink or oil paint', 'Water tray', 'White paper', 'Comb or stick', 'Newspaper'],
        instructions: [
          'Fill a shallow tray with water',
          'Drop coloured inks or paints onto the water surface',
          'Use a comb or stick to swirl the colours',
          'Carefully lay paper on top of the colours',
          'Lift off slowly to reveal your marbled pattern',
          'Let dry on newspaper',
          'Each piece is unique and beautiful'
        ]
      }
    ]
  },
  '9-12': {
    'full-supplies': [
      {
        title: '3D Paper Sculpture',
        time: '1-2hrs',
        materials: ['Poster board or card', 'Scissors', 'Glue', 'Paint or markers', 'Optional: wire for support'],
        instructions: [
          'Sketch your sculpture design (animal, building, abstract shape)',
          'Cut multiple pieces from card',
          'Fold pieces to add dimension',
          'Glue together to create a 3D structure',
          'Paint or colour your sculpture',
          'Display where it can be viewed from different angles',
          'Experiment with balance and support'
        ]
      },
      {
        title: 'Resin Art Coasters',
        time: '30min (plus curing)',
        materials: ['Epoxy resin', 'Hardener', 'Moulds', 'Dried flowers', 'Acrylic paint', 'Mixing cups', 'Gloves'],
        instructions: [
          'Prepare mould and materials (wearing gloves)',
          'Mix resin and hardener according to instructions',
          'Pour thin layer into mould',
          'Arrange flowers or decorations',
          'Top with more resin',
          'Remove bubbles with a heat gun or carefully with a stick',
          'Let cure for 24 hours',
          'Pop out of mould and sand edges smooth'
        ]
      },
      {
        title: 'Miniature Diorama',
        time: '2-3hrs',
        materials: ['Shoebox or cardboard', 'Paint', 'Clay or craft materials', 'Small figurines', 'Natural materials (twigs, leaves)', 'Glue'],
        instructions: [
          'Choose a scene (underwater, forest, desert, space)',
          'Paint the interior background',
          'Create landscape with clay or materials',
          'Arrange figurines and decorations',
          'Add details like trees, rocks, or water',
          'Use lighting effects if possible',
          'Tell the story of your scene'
        ]
      }
    ]
  }
};

export default function CraftProjectGenerator() {
  const [config, setConfig] = useState({
    ageGroup: '7-9',
    materials: 'basic-craft',
    difficulty: 'easy',
    time: '30min'
  });

  const [craft, setCraft] = useState(null);

  const handleGenerate = () => {
    const ageData = CRAFTS[config.ageGroup];
    const materialData = ageData[config.materials] || ageData['paper-only'];
    const selected = materialData[Math.floor(Math.random() * materialData.length)];
    setCraft(selected);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Age Group</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['3-5', '5-7', '7-9', '9-12'].map(age => (
              <button
                key={age}
                onClick={() => setConfig(c => ({ ...c, ageGroup: age }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition ${
                  config.ageGroup === age
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {age}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Available Materials</label>
          <div className="space-y-2">
            {['paper-only', 'basic-craft', 'full-supplies'].map(mat => (
              <label key={mat} className="flex items-center">
                <input
                  type="radio"
                  name="materials"
                  value={mat}
                  checked={config.materials === mat}
                  onChange={() => setConfig(c => ({ ...c, materials: mat }))}
                  className="w-4 h-4 cursor-pointer"
                />
                <span className="ml-3 text-text-secondary capitalize">
                  {mat.replace('-', ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Get a Craft Idea
        </button>
      </div>

      {craft && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div className="flex items-start justify-between mb-4">
              <h2 className="font-heading text-2xl font-bold text-text-primary">{craft.title}</h2>
              <span className="bg-accent-muted text-accent px-3 py-1 rounded-[var(--radius-input)] text-sm font-medium whitespace-nowrap ml-4">
                {craft.time}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">What You Need</h3>
                <ul className="space-y-1">
                  {craft.materials.map((material, i) => (
                    <li key={i} className="text-text-secondary flex items-start">
                      <span className="mr-2">-</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">How to Make It</h3>
                <ol className="space-y-2">
                  {craft.instructions.map((instruction, i) => (
                    <li key={i} className="text-text-secondary flex">
                      <span className="font-mono font-medium text-accent mr-3">{i + 1}.</span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
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
