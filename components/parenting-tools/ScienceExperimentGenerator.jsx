'use client';
import { useState } from 'react';

const EXPERIMENTS = {
  '3-5': {
    'kitchen-basics': {
      'none': [
        {
          title: 'Rainbow Milk',
          materials: ['Milk', 'Food colouring', 'Dish soap', 'Plate'],
          steps: [
            'Pour milk into a shallow plate',
            'Add drops of food colouring around the milk',
            'Dip a cotton bud in dish soap',
            'Touch the soapy cotton bud to the food colouring',
            'Watch the colours dance and swirl!'
          ],
          explanation: 'The soap breaks the surface tension of the milk, making it move. Food colouring floats on the milk, so when the surface moves, the colours move too.',
          safety: 'Keep milk away from eyes. Do not drink the milk.'
        },
        {
          title: 'Sinking and Floating',
          materials: ['Water', 'Bowl', 'Various objects (toys, apple, stone, cork)'],
          steps: [
            'Fill a bowl with water',
            'Gather objects from around the kitchen',
            'Predict which ones will sink or float',
            'Place each object in the water one by one',
            'See which ones float and which ones sink'
          ],
          explanation: 'Objects that are lighter than water float. Objects heavier than water sink. This is called buoyancy.',
          safety: 'Make sure objects are safe and clean. Supervise throughout.'
        },
        {
          title: 'Dancing Raisins',
          materials: ['Raisins', 'Clear glass', 'Fizzy drink (clear lemonade)'],
          steps: [
            'Fill a clear glass with fizzy drink',
            'Drop several raisins into the glass',
            'Watch the raisins dance up and down',
            'They will keep dancing until the fizz runs out'
          ],
          explanation: 'Bubbles of carbon dioxide gas stick to the raisins and make them float up. When they reach the top, the bubbles burst and the raisins sink back down.',
          safety: 'Do not drink the fizzy drink after. Raisins are safe if accidentally swallowed.'
        },
        {
          title: 'Baking Soda Volcano',
          materials: ['Baking soda', 'Vinegar', 'Food colouring', 'Dish soap', 'Mug', 'Tray'],
          steps: [
            'Place mug on a tray to catch spills',
            'Fill mug halfway with baking soda',
            'Add a few drops of food colouring and dish soap',
            'Pour vinegar in slowly and watch it erupt!'
          ],
          explanation: 'Baking soda and vinegar react together to make carbon dioxide gas, which creates bubbles and foam that erupt like a volcano.',
          safety: 'This is messy! Wear apron. Do not drink. Vinegar smell is strong but harmless.'
        }
      ],
      'low': [
        {
          title: 'Ice Excavation',
          materials: ['Water', 'Freezer', 'Small plastic toys', 'Salt', 'Warm water'],
          steps: [
            'Freeze toys in ice (prepare the day before)',
            'Give child the ice block and tools',
            'Let them pour warm water and use salt to melt ice',
            'They excavate and uncover the frozen toys'
          ],
          explanation: 'Salt lowers the freezing point of ice, melting it faster. Warm water also melts ice. This is how we defrost things and how salt helps roads in winter.',
          safety: 'Water may be cold. Supervise use of salt.'
        }
      ]
    },
    'craft-supplies': [
      {
          title: 'Static Electricity Balloons',
          materials: ['Balloons', 'Wool cloth', 'Small paper pieces'],
          steps: [
            'Blow up balloon and tie it',
            'Rub the balloon vigorously on wool',
            'Sprinkle small paper pieces on flat surface',
            'Hover the balloon over the paper and watch it stick!'
          ],
          explanation: 'Rubbing creates static electricity on the balloon, which attracts light objects like paper. You create the same static when you rub your feet on carpet.',
          safety: 'Keep away from eyes. Do not put balloon in mouth.'
        }
    ]
  },
  '5-7': {
    'kitchen-basics': {
      'none': [
        {
          title: 'Lava Lamp in a Bottle',
          materials: ['Clear bottle', 'Oil', 'Water', 'Food colouring', 'Fizzy tablets or baking soda + vinegar'],
          steps: [
            'Fill bottle three-quarters with oil',
            'Add water until nearly full',
            'Add food colouring drops',
            'Drop in fizzy tablets (or mix baking soda and vinegar)',
            'Watch coloured blobs move up and down like lava'
          ],
          explanation: 'Oil and water do not mix. When bubbles form, they carry coloured water up. When bubbles pop, water sinks back down because it is heavier than oil.',
          safety: 'Do not drink. Keep bottle upright.'
        },
        {
          title: 'Invisible Ink Messages',
          materials: ['Lemon juice or baking soda solution', 'Water', 'Paper', 'Paintbrush', 'Heat source (lamp)'],
          steps: [
            'Mix lemon juice with a little water',
            'Paint a secret message on paper with the solution',
            'Let it dry completely (message will be invisible)',
            'Hold paper near a warm lamp or heat source',
            'Message appears as the paper browns slightly'
          ],
          explanation: 'Lemon juice is nearly invisible when wet. When heated, it oxidises and turns brown, revealing your secret message. Spies used this method!',
          safety: 'Supervise heat source use. Do not let paper catch fire.'
        },
        {
          title: 'Crystal Growing',
          materials: ['Jar', 'Salt or sugar', 'Water', 'String', 'Pencil'],
          steps: [
            'Dissolve salt or sugar in boiling water (adult only)',
            'Pour solution into jar',
            'Tie string to pencil and suspend in jar',
            'Leave for several days',
            'Crystals will grow on the string'
          ],
          explanation: 'When salt or sugar dissolves in hot water, it spreads throughout. As it cools, it comes back out of the water and forms crystals on the string.',
          safety: 'Adult handles boiling water. Do not drink solution.'
        },
        {
          title: 'Fizzy Fountain',
          materials: ['Mentos sweets', 'Diet cola or fizzy drink', 'Tray', 'Outdoor space'],
          steps: [
            'Place bottle on tray outdoors',
            'Drop Mentos into the bottle quickly',
            'Stand back and watch the fountain erupt!'
          ],
          explanation: 'Mentos have a rough surface that provides nucleation sites. Bubbles form rapidly on this surface, causing a rapid eruption of foam.',
          safety: 'Do this outdoors. Stand back immediately. Supervise closely.'
        }
      ],
      'low': [
        {
          title: 'pH Indicator Juice',
          materials: ['Red cabbage', 'Water', 'Various liquids (lemon juice, baking soda solution, vinegar)', 'Clear cups'],
          steps: [
            'Boil and mash red cabbage to make juice',
            'Pour cabbage juice into cups',
            'Add different liquids to each cup',
            'Observe colour changes from pink to blue to green',
            'Discuss what the colours mean'
          ],
          explanation: 'Red cabbage contains anthocyanin, a natural indicator. It changes colour depending on whether a liquid is acidic or basic. This is how scientists test if something is an acid or base.',
          safety: 'Adult handles boiling water. Liquids should not be ingested.'
        }
      ]
    },
    'craft-supplies': [
      {
        title: 'Volcano with Layers',
        materials: ['Modelling dough or paper mache', 'Baking soda', 'Vinegar', 'Food colouring', 'Dish soap'],
        steps: [
          'Build a volcano shape from dough or paper',
          'Place a cup or container in the top',
          'Fill container with baking soda',
          'Add food colouring and dish soap',
          'Pour vinegar and watch it erupt with coloured foam'
        ],
        explanation: 'Chemical reaction between baking soda and vinegar creates carbon dioxide gas, which causes the eruption. Real volcanoes work differently but look similar.',
        safety: 'Vinegar is strong-smelling but safe. Avoid eyes.'
      }
    ]
  },
  '7-9': {
    'kitchen-basics': {
      'low': [
        {
          title: 'Chromatography Experiment',
          materials: ['Paper towels', 'Markers', 'Water', 'Jars'],
          steps: [
            'Cut paper towels into strips',
            'Draw a line with marker 2cm from the bottom',
            'Place paper in jar with a small amount of water',
            'Water absorbs up the paper',
            'Marker ink separates into its component colours'
          ],
          explanation: 'Markers contain multiple colours mixed together. Water dissolves the ink and carries different colours at different speeds, separating them.',
          safety: 'Marker inks are non-toxic but do not ingest.'
        },
        {
          title: 'Density Column',
          materials: ['Clear jar', 'Honey', 'Oil', 'Water', 'Vinegar', 'Food colouring', 'Spoon'],
          steps: [
            'Pour honey into jar first (heaviest)',
            'Carefully pour oil, then water, then vinegar',
            'Add food colouring to see layers clearly',
            'Drop objects to see which layer they sink to',
            'Objects sink until they reach a denser liquid'
          ],
          explanation: 'Different liquids have different densities. Denser liquids sink below lighter ones. Objects sink until they reach a liquid as dense as they are.',
          safety: 'Do not drink. Do not mix if strong smell occurs.'
        },
        {
          title: 'Egg in a Bottle',
          materials: ['Glass bottle with mouth slightly smaller than egg', 'Boiled egg (cooled)', 'Matches or lighter', 'Paper'],
          steps: [
            'Burn a small piece of paper inside the bottle',
            'Quickly place the peeled egg on top of the bottle',
            'As the air inside cools, air pressure decreases',
            'The egg is slowly sucked into the bottle!'
          ],
          explanation: 'Fire consumes oxygen and heats the air inside. When it cools, air pressure inside decreases. Outside pressure pushes the egg in.',
          safety: 'Adult handles matches and fire. Do not touch hot bottle.'
        }
      ],
      'medium': [
        {
          title: 'Rock Candy Crystals',
          materials: ['Sugar', 'Water', 'String', 'Jar', 'Food colouring (optional)'],
          steps: [
            'Make supersaturated solution: dissolve lots of sugar in hot water',
            'Pour into jar and let cool slightly',
            'Suspend string in solution on a stick',
            'Over several days, sugar crystals grow on the string',
            'You can eat your candy!'
          ],
          explanation: 'Hot water dissolves more sugar than cold water can hold. As it cools, sugar comes out of solution and crystallises on the string.',
          safety: 'Adult prepares hot water. Sugar solution is safe to eat when dry.'
        }
      ]
    },
    'science-kit': [
      {
        title: 'Electromagnet',
        materials: ['Iron nail', 'Copper wire', 'Battery', 'Small metal objects (paper clips, nails)'],
        steps: [
          'Wrap wire tightly around the nail many times',
          'Attach wire ends to battery terminals',
          'Your nail is now a magnet!',
          'Pick up metal objects with the magnetic nail',
          'Disconnect and the nail loses its magnetism'
        ],
        explanation: 'Electricity flowing through wire creates a magnetic field. When wrapped around iron, this field is amplified, turning the iron into a magnet.',
        safety: 'Do not connect battery directly without the nail (wire will get hot). Do not short-circuit battery.'
      }
    ]
  },
  '9-12': {
    'kitchen-basics': {
      'medium': [
        {
          title: 'Acid-Base Neutralisation',
          materials: ['Vinegar (acid)', 'Baking soda (base)', 'Food colouring', 'Phenolphthalein (optional)', 'Cups and spoon'],
          steps: [
            'Pour vinegar into a cup and add food colouring',
            'Add baking soda carefully and observe the reaction',
            'Temperature changes as the reaction occurs',
            'Record observations about the fizzing and heat'
          ],
          explanation: 'Acid and base reactions are exothermic (release heat). They neutralise each other to form a salt and water. This is the basis of many industrial processes.',
          safety: 'Vinegar and baking soda are safe. Phenolphthalein is for observation only.'
        },
        {
          title: 'Fermentation Experiment',
          materials: ['Sugar', 'Yeast', 'Warm water', 'Balloon', 'Bottle', 'Thermometer'],
          steps: [
            'Mix sugar, yeast, and warm water in bottle',
            'Stretch balloon over bottle opening',
            'Yeast eats sugar and produces carbon dioxide gas',
            'Balloon inflates as gas is produced',
            'Observe temperature change'
          ],
          explanation: 'Yeast are living microorganisms that consume sugar. They release carbon dioxide and alcohol as byproducts. This is how bread rises and beer is made.',
          safety: 'Do not taste. Keep bottle upright. Yeast is generally safe.'
        }
      ],
      'high': [
        {
          title: 'Osmosis Experiment',
          materials: ['Raw potato', 'Salt water', 'Fresh water', 'Knife', 'Bowls'],
          steps: [
            'Cut potato in half and scrape out a cup',
            'Fill one cup with salt water, one with fresh water',
            'Place potato cups in the corresponding bowls',
            'Over time, water moves in or out of the potato',
            'The salt water potato shrivels, the fresh water one becomes firm'
          ],
          explanation: 'Water moves across membranes toward higher salt concentration. This is osmosis. In salt water, water leaves the potato. In fresh water, water enters it.',
          safety: 'Knife use supervised. Do not eat potato.'
        }
      ]
    },
    'science-kit': [
      {
        title: 'Circuit Builders',
        materials: ['Battery', 'Wire', 'Light bulb holder', 'Switches', 'Conductors and insulators'],
        steps: [
          'Build a simple circuit with battery, wire, and bulb',
          'Light should turn on',
          'Add a switch to control the light',
          'Test different materials as conductors or insulators'
        ],
        explanation: 'Electricity flows in a complete circuit. Conductors allow flow, insulators block it. Switches break and complete the circuit to control devices.',
        safety: 'Use low-voltage battery circuits only. Do not attempt mains electricity experiments.'
      }
    ]
  }
};

export default function ScienceExperimentGenerator() {
  const [config, setConfig] = useState({
    ageGroup: '7-9',
    messLevel: 'none',
    supervisionLevel: 'adult-led',
    materials: 'kitchen-basics'
  });

  const [experiment, setExperiment] = useState(null);

  const handleGenerate = () => {
    const ageData = EXPERIMENTS[config.ageGroup];
    let selected = null;

    if (ageData[config.materials]) {
      const materialData = ageData[config.materials];
      if (Array.isArray(materialData)) {
        selected = materialData[Math.floor(Math.random() * materialData.length)];
      } else if (materialData[config.messLevel]) {
        const messData = materialData[config.messLevel];
        selected = messData[Math.floor(Math.random() * messData.length)];
      }
    }

    if (!selected && ageData['kitchen-basics']) {
      const fallback = ageData['kitchen-basics'];
      if (Array.isArray(fallback)) {
        selected = fallback[Math.floor(Math.random() * fallback.length)];
      } else {
        const messKeys = Object.keys(fallback);
        const messData = fallback[messKeys[0]];
        selected = messData[Math.floor(Math.random() * messData.length)];
      }
    }

    setExperiment(selected);
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
          <label className="block text-text-secondary text-sm font-medium mb-3">Mess Level</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {['none', 'low', 'medium', 'high'].map(level => (
              <button
                key={level}
                onClick={() => setConfig(c => ({ ...c, messLevel: level }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize ${
                  config.messLevel === level
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-text-secondary text-sm font-medium mb-3">Supervision</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['adult-led', 'guided', 'independent'].map(level => (
              <button
                key={level}
                onClick={() => setConfig(c => ({ ...c, supervisionLevel: level }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize ${
                  config.supervisionLevel === level
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
          <label className="block text-text-secondary text-sm font-medium mb-3">Materials</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['kitchen-basics', 'craft-supplies', 'science-kit'].map(mat => (
              <button
                key={mat}
                onClick={() => setConfig(c => ({ ...c, materials: mat }))}
                className={`py-2 px-3 rounded-[var(--radius-input)] font-medium transition capitalize ${
                  config.materials === mat
                    ? 'bg-accent text-white'
                    : 'bg-white border border-border text-text-primary hover:bg-surface'
                }`}
              >
                {mat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
        >
          Generate Experiment
        </button>
      </div>

      {experiment && (
        <div className="space-y-4">
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <h2 className="font-heading text-2xl font-bold text-text-primary mb-4">{experiment.title}</h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">Materials Needed</h3>
                <ul className="space-y-1">
                  {experiment.materials.map((material, i) => (
                    <li key={i} className="text-text-secondary flex items-start">
                      <span className="mr-2">-</span>
                      <span>{material}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">Steps</h3>
                <ol className="space-y-2">
                  {experiment.steps.map((step, i) => (
                    <li key={i} className="text-text-secondary flex">
                      <span className="font-mono font-medium text-accent mr-3">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="font-heading font-semibold text-text-primary mb-2">What Happens?</h3>
                <p className="text-text-secondary">{experiment.explanation}</p>
              </div>

              <div className="bg-orange-50 border border-orange-200 rounded-[var(--radius-input)] p-4">
                <h3 className="font-heading font-semibold text-orange-900 mb-2">Safety Notes</h3>
                <p className="text-orange-800 text-sm">{experiment.safety}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-accent text-white py-3 rounded-[var(--radius-input)] font-medium hover:bg-accent-hover transition"
          >
            Generate Another
          </button>
        </div>
      )}
    </div>
  );
}
