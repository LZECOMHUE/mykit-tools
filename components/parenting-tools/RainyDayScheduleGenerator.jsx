'use client';
import { useState } from 'react';

const ACTIVITY_SLOTS = {
  '3-5': {
    craft: [
      { name: 'Paper Plate Art', duration: 30, supplies: 'Paper plates, markers, stickers' },
      { name: 'Collage Making', duration: 25, supplies: 'Magazine, glue, scissors' },
      { name: 'Paint with Sponges', duration: 20, supplies: 'Paints, sponges, paper' },
      { name: 'Sticker Creations', duration: 20, supplies: 'Stickers, paper' },
      { name: 'Play Dough Sculptures', duration: 25, supplies: 'Play dough' },
      { name: 'Flower Pressing', duration: 15, supplies: 'Flowers, paper, books' }
    ],
    screen: [
      { name: 'Cartoon Time', duration: 30, supplies: 'TV or tablet' },
      { name: 'Educational App', duration: 20, supplies: 'Tablet with app' },
      { name: 'YouTube Learning', duration: 25, supplies: 'YouTube Kids' },
      { name: 'Children\'s Film', duration: 60, supplies: 'Movie' },
      { name: 'Music Videos', duration: 20, supplies: 'YouTube or Spotify' }
    ],
    baking: [
      { name: 'Decorate Biscuits', duration: 20, supplies: 'Biscuits, icing, sprinkles' },
      { name: 'Fruit Snacks', duration: 15, supplies: 'Fruit, yogurt' },
      { name: 'Simple Cookies', duration: 30, supplies: 'Ingredients' },
      { name: 'Fruit Kabobs', duration: 10, supplies: 'Fruit, sticks' },
      { name: 'Smoothie Making', duration: 15, supplies: 'Fruit, yogurt, blender' }
    ],
    game: [
      { name: 'Hide and Seek', duration: 20, supplies: 'None' },
      { name: 'Building Blocks', duration: 30, supplies: 'Blocks' },
      { name: 'Board Game', duration: 25, supplies: 'Game' },
      { name: 'Indoor Picnic', duration: 20, supplies: 'Food, blanket' },
      { name: 'Treasure Hunt', duration: 25, supplies: 'Small toys' }
    ],
    read: [
      { name: 'Story Time', duration: 20, supplies: 'Books' },
      { name: 'Picture Book Exploration', duration: 15, supplies: 'Books' },
      { name: 'Audiobook Listening', duration: 30, supplies: 'Audiobook' }
    ]
  },
  '5-7': {
    craft: [
      { name: 'Paper Airplane Folding', duration: 20, supplies: 'Paper' },
      { name: 'Origami Creation', duration: 30, supplies: 'Origami paper' },
      { name: 'Tie-Dye Project', duration: 45, supplies: 'White fabric, dye' },
      { name: 'String Art', duration: 40, supplies: 'String, nails, board' },
      { name: 'Make Greeting Cards', duration: 30, supplies: 'Card stock, markers, stickers' },
      { name: 'Paper Mache', duration: 45, supplies: 'Paper, glue, balloon' }
    ],
    screen: [
      { name: 'Movie Marathon', duration: 90, supplies: 'Movie' },
      { name: 'Gaming Session', duration: 60, supplies: 'Console or computer' },
      { name: 'Educational YouTube', duration: 30, supplies: 'YouTube' },
      { name: 'Streaming Series', duration: 45, supplies: 'Streaming service' },
      { name: 'Video Game Play', duration: 45, supplies: 'Game console' }
    ],
    baking: [
      { name: 'Brownies From Scratch', duration: 45, supplies: 'Ingredients' },
      { name: 'Decorate Cup Cakes', duration: 30, supplies: 'Cupcakes, icing, sprinkles' },
      { name: 'Pizza Making', duration: 40, supplies: 'Dough, sauce, toppings' },
      { name: 'Homemade Ice Cream', duration: 30, supplies: 'Ingredients' },
      { name: 'Cookie Decorating', duration: 25, supplies: 'Cookies, icing' }
    ],
    game: [
      { name: 'Board Game Tournament', duration: 45, supplies: 'Games' },
      { name: 'Card Games', duration: 30, supplies: 'Playing cards' },
      { name: 'Scavenger Hunt', duration: 30, supplies: 'List' },
      { name: 'Charades', duration: 30, supplies: 'None' },
      { name: 'Obstacle Course', duration: 25, supplies: 'Cushions, furniture' }
    ],
    read: [
      { name: 'Independent Reading', duration: 30, supplies: 'Book' },
      { name: 'Read Aloud Together', duration: 45, supplies: 'Book' },
      { name: 'Comic Book Exploration', duration: 25, supplies: 'Comics' }
    ]
  },
  '7-9': {
    craft: [
      { name: 'Jewellery Making', duration: 45, supplies: 'Beads, string, tools' },
      { name: 'Model Building', duration: 60, supplies: 'Model kit' },
      { name: 'Painting Project', duration: 60, supplies: 'Canvas, paints, brushes' },
      { name: 'Sketching Challenge', duration: 40, supplies: 'Paper, pencils, prompts' },
      { name: 'Photography Project', duration: 45, supplies: 'Camera or phone' },
      { name: 'Scrapbooking', duration: 60, supplies: 'Photos, paper, decorations' }
    ],
    screen: [
      { name: 'Video Gaming', duration: 60, supplies: 'Console or PC' },
      { name: 'Streaming Movies', duration: 120, supplies: 'Streaming service' },
      { name: 'YouTube Exploration', duration: 45, supplies: 'YouTube' },
      { name: 'Online Gaming with Friends', duration: 60, supplies: 'Game, internet' },
      { name: 'Educational Documentary', duration: 60, supplies: 'Video platform' }
    ],
    baking: [
      { name: 'Complex Recipe Cooking', duration: 60, supplies: 'Recipe ingredients' },
      { name: 'Cake Decorating', duration: 45, supplies: 'Cake, icing, tools' },
      { name: 'Homemade Pizza', duration: 45, supplies: 'Dough ingredients' },
      { name: 'Biscuit Baking', duration: 40, supplies: 'Recipe ingredients' },
      { name: 'Pasta Making', duration: 60, supplies: 'Pasta ingredients' }
    ],
    game: [
      { name: 'Board Game Marathon', duration: 90, supplies: 'Games' },
      { name: 'Strategy Games', duration: 60, supplies: 'Games' },
      { name: 'DIY Challenge', duration: 60, supplies: 'Various materials' },
      { name: 'Quiz Bowl', duration: 45, supplies: 'Questions' },
      { name: 'LEGO Building Project', duration: 90, supplies: 'LEGO set' }
    ],
    read: [
      { name: 'Novel Reading', duration: 60, supplies: 'Novel' },
      { name: 'Comic Series Reading', duration: 45, supplies: 'Comics' },
      { name: 'Graphic Novel', duration: 45, supplies: 'Graphic novel' }
    ]
  },
  '9-12': {
    craft: [
      { name: 'Advanced Art Project', duration: 90, supplies: 'Art supplies' },
      { name: 'Video/Film Making', duration: 120, supplies: 'Camera, editing software' },
      { name: 'Fashion Design', duration: 90, supplies: 'Fabric, tools' },
      { name: 'Graphics Design', duration: 90, supplies: 'Computer, design software' },
      { name: 'Creative Writing', duration: 75, supplies: 'Paper, pen' },
      { name: 'Photography Editing', duration: 60, supplies: 'Photos, editing software' }
    ],
    screen: [
      { name: 'Gaming Session', duration: 120, supplies: 'Console or PC' },
      { name: 'Streaming or Binge-Watch', duration: 120, supplies: 'Streaming service' },
      { name: 'Online Learning Course', duration: 90, supplies: 'Course platform' },
      { name: 'YouTube Content Creation', duration: 120, supplies: 'Camera, editing software' },
      { name: 'Competitive Gaming', duration: 90, supplies: 'Game, internet' }
    ],
    baking: [
      { name: 'Advanced Cooking', duration: 90, supplies: 'Recipe, ingredients' },
      { name: 'Cake Design Project', duration: 120, supplies: 'Ingredients, decorating tools' },
      { name: 'Gourmet Meal Prep', duration: 120, supplies: 'Recipe, quality ingredients' },
      { name: 'Dessert Experiment', duration: 75, supplies: 'Ingredients' },
      { name: 'International Cuisine', duration: 90, supplies: 'Recipe ingredients' }
    ],
    game: [
      { name: 'Tournament Gaming', duration: 120, supplies: 'Games, scoring system' },
      { name: 'Strategy Game', duration: 90, supplies: 'Complex game' },
      { name: 'Escape Room Challenge', duration: 75, supplies: 'At-home escape room' },
      { name: 'Debate or Discussion', duration: 60, supplies: 'Topics' },
      { name: 'Model Building Competition', duration: 90, supplies: 'Model kits' }
    ],
    read: [
      { name: 'Novel Reading', duration: 120, supplies: 'Novel' },
      { name: 'Research Project', duration: 120, supplies: 'Books, internet' },
      { name: 'Manga or Graphic Novel Series', duration: 90, supplies: 'Series' }
    ]
  }
};

export default function RainyDayScheduleGenerator() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [duration, setDuration] = useState('half');
  const [supplies, setSupplies] = useState('basic');
  const [generated, setGenerated] = useState(false);
  const [schedule, setSchedule] = useState([]);

  const generateSchedule = () => {
    const activities = ACTIVITY_SLOTS[ageGroup] || ACTIVITY_SLOTS['5-7'];
    const durationMin = duration === 'half' ? 180 : 360; // half day (3 hrs), full day (6 hrs)

    // Select activities to fill the time, rotating through categories
    const categories = Object.keys(activities);
    let selectedActivities = [];
    let timeUsed = 0;
    let categoryIndex = 0;

    while (timeUsed < durationMin * 0.9) {
      const category = categories[categoryIndex % categories.length];
      const categoryActivities = activities[category];
      const randomActivity = categoryActivities[Math.floor(Math.random() * categoryActivities.length)];

      if (timeUsed + randomActivity.duration <= durationMin) {
        selectedActivities.push({ ...randomActivity, category });
        timeUsed += randomActivity.duration;
      }

      categoryIndex++;

      if (categoryIndex > categories.length * 3) break;
    }

    // If we don't have enough, add more
    while (timeUsed < durationMin * 0.8 && selectedActivities.length < 8) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomActivity = activities[randomCategory][Math.floor(Math.random() * activities[randomCategory].length)];

      if (timeUsed + randomActivity.duration <= durationMin) {
        selectedActivities.push({ ...randomActivity, category: randomCategory });
        timeUsed += randomActivity.duration;
      }
    }

    setSchedule(selectedActivities);
    setGenerated(true);
  };

  const totalDuration = schedule.reduce((sum, activity) => sum + activity.duration, 0);
  const startTime = duration === 'half' ? '10:00 AM' : '9:00 AM';

  const getCategoryIcon = (category) => {
    const icons = {
      craft: '🎨',
      screen: '📺',
      baking: '🍪',
      game: '🎮',
      read: '📚'
    };
    return icons[category] || '';
  };

  const getCategoryName = (category) => {
    const names = {
      craft: 'Craft Activity',
      screen: 'Screen Time',
      baking: 'Cooking/Baking',
      game: 'Games',
      read: 'Reading'
    };
    return names[category] || category;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Schedule Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Age Group</label>
            <div className="flex gap-2">
              {['3-5', '5-7', '7-9', '9-12'].map(age => (
                <button
                  key={age}
                  onClick={() => setAgeGroup(age)}
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
            <label className="block text-text-secondary text-sm font-medium">Duration</label>
            <div className="flex gap-2">
              {['half', 'full'].map(dur => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors flex-1 ${
                    duration === dur
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {dur === 'half' ? 'Half Day' : 'Full Day'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Supplies Available</label>
            <select
              value={supplies}
              onChange={(e) => setSupplies(e.target.value)}
              className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary"
            >
              <option value="basic">Basic</option>
              <option value="craft">With Craft Supplies</option>
              <option value="full">Full Supplies</option>
            </select>
          </div>
        </div>

        <button
          onClick={generateSchedule}
          className="w-full bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] py-2 font-medium transition-colors"
        >
          Generate Daily Schedule
        </button>
      </div>

      {generated && (
        <div className="space-y-6">
          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-text-primary">Your Rainy Day Schedule</h2>
              <p className="text-text-secondary text-sm mt-1">Starting at <span className="font-mono font-bold">{startTime}</span> - Total <span className="font-mono font-bold">{totalDuration} minutes</span></p>
            </div>

            <div className="space-y-3">
              {schedule.map((activity, idx) => {
                const elapsedMinutes = schedule.slice(0, idx).reduce((sum, a) => sum + a.duration, 0);
                const startHour = startTime.includes('10') ? 10 : 9;
                const activityStartMin = (startHour * 60 + elapsedMinutes) % 720;
                const activityHour = Math.floor(activityStartMin / 60);
                const activityMin = activityStartMin % 60;
                const timeStr = `${String(activityHour).padStart(2, '0')}:${String(activityMin).padStart(2, '0')}`;

                return (
                  <div key={idx} className="bg-white border border-border rounded-[var(--radius-card)] p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-mono font-bold text-sm">
                        {idx + 1}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h3 className="font-heading font-bold text-text-primary">{activity.name}</h3>
                            <p className="text-text-secondary text-sm">{getCategoryIcon(activity.category)} {getCategoryName(activity.category)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-mono font-bold text-accent">{activity.duration} min</p>
                            <p className="text-text-muted text-xs">{timeStr}</p>
                          </div>
                        </div>
                        {activity.supplies && (
                          <p className="text-text-secondary text-xs mt-2"><span className="font-medium">Supplies:</span> {activity.supplies}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-blue-900 mb-2">Schedule Tips</h3>
            <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
              <li>Feel free to adjust times based on your child\'s mood and energy</li>
              <li>Alternate between active and calm activities</li>
              <li>Include screen time but spread it out throughout the day</li>
              <li>Build in snack and meal breaks (add 15-30 min as needed)</li>
              <li>Have backup activities ready if something finishes early</li>
              <li>Let activities run longer if your child is really engaged</li>
              <li>Make transitions smoother with a 5-minute warning</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-green-900 mb-2">Supplies Checklist</h3>
            <div className="text-sm text-green-900 space-y-1">
              {supplies === 'basic' && (
                <>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="s1" className="rounded" />
                    <label htmlFor="s1">Paper and pencils</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="s2" className="rounded" />
                    <label htmlFor="s2">Colouring pens/markers</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="s3" className="rounded" />
                    <label htmlFor="s3">Building blocks or LEGO</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="s4" className="rounded" />
                    <label htmlFor="s4">Board games</label>
                  </div>
                </>
              )}
              {supplies === 'craft' && (
                <>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="c1" className="rounded" />
                    <label htmlFor="c1">Craft supplies (glue, scissors, stickers)</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="c2" className="rounded" />
                    <label htmlFor="c2">Paints and brushes</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="c3" className="rounded" />
                    <label htmlFor="c3">Beads and string</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="c4" className="rounded" />
                    <label htmlFor="c4">Fabric and sewing kit</label>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="w-full px-4 py-2 bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] font-medium transition-colors"
          >
            Print Schedule
          </button>
        </div>
      )}
    </div>
  );
}
