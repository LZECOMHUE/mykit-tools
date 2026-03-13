'use client';
import { useState } from 'react';

const ACTIVITIES = {
  '3-5': [
    { name: 'Build a Fort', duration: '30 min', supplies: 'Pillows, blankets, chairs', description: 'Create an indoor fort with pillows and blankets. Use it as a hideout for games.' },
    { name: 'Color and Paint', duration: '20 min', supplies: 'Paper, crayons, paints', description: 'Free painting or coloring. Let creativity flow with whatever supplies you have.' },
    { name: 'Play with Blocks', duration: '30 min', supplies: 'Building blocks', description: 'Build towers, houses, or whatever they can imagine with blocks.' },
    { name: 'Singing and Dancing', duration: '15 min', supplies: 'Music player', description: 'Play music and dance around. Freeze dance if they like competition.' },
    { name: 'Story Time', duration: '20 min', supplies: 'Picture books', description: 'Read stories together. Let them pick their favorites.' },
    { name: 'Play with Toys', duration: '30 min', supplies: 'Action figures, dolls', description: 'Free play with their favorite toys. Let them create stories.' },
    { name: 'Play Dough Fun', duration: '25 min', supplies: 'Play dough', description: 'Make snakes, balls, and shapes with play dough or homemade dough.' },
    { name: 'Bubble Blowing', duration: '15 min', supplies: 'Bubble wand, bubble solution', description: 'Blow bubbles inside or outside. Chase and pop them.' },
    { name: 'Simple Puzzle', duration: '20 min', supplies: 'Chunky puzzles', description: 'Do a large piece puzzle together. Very satisfying.' },
    { name: 'Animal Sounds', duration: '10 min', supplies: 'None', description: 'Make animal sounds and guess which animal it is.' },
    { name: 'Hide and Seek', duration: '20 min', supplies: 'None', description: 'Simple hiding game in one room or the whole house.' },
    { name: 'Dress Up', duration: '25 min', supplies: 'Old clothes, hats, scarves', description: 'Put on funny outfits and costumes. Be silly together.' },
    { name: 'Sensory Play', duration: '20 min', supplies: 'Sand, water, rice', description: 'Play with different textures in a tray or container.' },
    { name: 'Jump and Hop', duration: '15 min', supplies: 'None', description: 'Jumping, hopping, and bouncing around for energy.' },
    { name: 'Sticker Fun', duration: '15 min', supplies: 'Sticker sheets, paper', description: 'Stick stickers onto paper and create sticker pictures.' },
    { name: 'Pretend Play', duration: '25 min', supplies: 'Props', description: 'Pretend to be animals, superheroes, or shopkeepers.' },
    { name: 'Water Play', duration: '20 min', supplies: 'Containers, water, bath toys', description: 'Splash and pour water. Great for warm days or the bath.' },
    { name: 'Chalk Drawing', duration: '20 min', supplies: 'Chalk, paper or driveway', description: 'Draw on pavement or large paper with colorful chalk.' },
    { name: 'Counting Game', duration: '15 min', supplies: 'Objects to count', description: 'Count toys, fingers, steps, or anything you find.' },
    { name: 'Scribble Art', duration: '20 min', supplies: 'Paper, markers, crayons', description: 'Free scribbling. It\'s all about the process, not the result.' }
  ],
  '5-7': [
    { name: 'Craft Project', duration: '45 min', supplies: 'Paper, glue, scissors, decorations', description: 'Make a paper craft like masks, puppets, or paper chains.' },
    { name: 'Simple Baking', duration: '30 min', supplies: 'Ingredients, mixing bowls', description: 'Bake simple cookies or cupcakes together. Great for learning.' },
    { name: 'Scavenger Hunt', duration: '30 min', supplies: 'List of items', description: 'Search the house for common items. Great for energy.' },
    { name: 'Board Game', duration: '40 min', supplies: 'Age-appropriate board game', description: 'Play a game together. Takes turns and strategy.' },
    { name: 'Science Experiment', duration: '30 min', supplies: 'Baking soda, vinegar, water', description: 'Simple experiments like volcano or color mixing.' },
    { name: 'Bike or Scooter Riding', duration: '30 min', supplies: 'Bike or scooter, helmet', description: 'Ride around safely in garden or park.' },
    { name: 'Movie Night', duration: '90 min', supplies: 'TV, streaming service', description: 'Watch an age-appropriate movie together.' },
    { name: 'Card Games', duration: '30 min', supplies: 'Playing cards or game cards', description: 'Play simple card games like Go Fish or Snap.' },
    { name: 'Outdoor Nature Walk', duration: '30 min', supplies: 'Nothing needed', description: 'Walk around and find interesting leaves, rocks, or insects.' },
    { name: 'Building Challenge', duration: '40 min', supplies: 'Blocks, Lego, or cardboard', description: 'Build something specific like a bridge or tower.' },
    { name: 'Story Writing', duration: '30 min', supplies: 'Paper, pencil', description: 'Write or dictate a short story together.' },
    { name: 'Bubble Wrap Pop', duration: '15 min', supplies: 'Bubble wrap', description: 'Satisfying popping activity for restless energy.' },
    { name: 'Obstacle Course', duration: '25 min', supplies: 'Cushions, chairs, cones', description: 'Create a course they can run, jump, and crawl through.' },
    { name: 'Gardening Project', duration: '40 min', supplies: 'Seeds, pots, soil', description: 'Plant seeds in a pot or garden. Watch them grow.' },
    { name: 'Drawing Challenge', duration: '30 min', supplies: 'Paper, pencils, prompt list', description: 'Draw whatever is suggested. Very creative activity.' },
    { name: 'Water Gun Fight', duration: '25 min', supplies: 'Water guns, buckets', description: 'Outdoor water play on warm days. Loads of fun.' },
    { name: 'Cooking Simple Lunch', duration: '45 min', supplies: 'Ingredients, pots, pans', description: 'Make simple sandwiches or pasta together.' },
    { name: 'Sidewalk Chalk Art', duration: '35 min', supplies: 'Sidewalk chalk', description: 'Draw elaborate pictures on the driveway or path.' },
    { name: 'Trampoline Jumping', duration: '20 min', supplies: 'Trampoline, safety mat', description: 'Jump safely on a trampoline. Great exercise.' },
    { name: 'Friendship Bracelet Making', duration: '30 min', supplies: 'Embroidery thread, scissors', description: 'Make colorful bracelets to give to friends.' }
  ],
  '7-9': [
    { name: 'DIY Science Project', duration: '45 min', supplies: 'Various household items', description: 'Build a catapult, volcano, or simple machine.' },
    { name: 'Video Game or Minecraft', duration: '60 min', supplies: 'Console or computer', description: 'Age-appropriate gaming. Good for building and creativity.' },
    { name: 'Cooking Challenge', duration: '60 min', supplies: 'Recipe, ingredients, cooking equipment', description: 'Follow a recipe and prepare a meal or snack.' },
    { name: 'Model Building', duration: '90 min', supplies: 'Model kit, glue, paint', description: 'Build a plane, car, or ship model. Requires patience.' },
    { name: 'Creative Writing', duration: '45 min', supplies: 'Paper, pencil, writing prompts', description: 'Write a short story, poem, or comic strip.' },
    { name: 'Art Class at Home', duration: '60 min', supplies: 'Canvas, paints, brushes', description: 'Follow an online tutorial or create your own masterpiece.' },
    { name: 'Sports Practice', duration: '45 min', supplies: 'Ball, goal, or equipment', description: 'Practice a skill in football, basketball, or other sport.' },
    { name: 'Photography Project', duration: '45 min', supplies: 'Camera or phone', description: 'Take photos around the house or garden.' },
    { name: 'LEGO Building Project', duration: '90 min', supplies: 'LEGO bricks, instructions', description: 'Build a complex LEGO set or create your own design.' },
    { name: 'Reading Challenge', duration: '60 min', supplies: 'Book, comfortable spot', description: 'Read a book independently or listen to an audiobook.' },
    { name: 'Puzzle Assembly', duration: '60 min', supplies: '500-piece puzzle', description: 'Work together on a complex jigsaw puzzle.' },
    { name: 'Coding or Robotics', duration: '60 min', supplies: 'Computer, coding app or robot kit', description: 'Learn basic coding or program a robot.' },
    { name: 'Skateboarding or Roller Skating', duration: '45 min', supplies: 'Skateboard, roller skates, safety gear', description: 'Practice tricks or just cruise around safely.' },
    { name: 'Movie or TV Series', duration: '120 min', supplies: 'Streaming service', description: 'Watch an episode or film together. Make it special.' },
    { name: 'Bike Riding Adventure', duration: '60 min', supplies: 'Bike, helmet, route', description: 'Explore the neighborhood on bikes.' },
    { name: 'DIY Fashion Design', duration: '60 min', supplies: 'Fabric, markers, sewing kit', description: 'Design and decorate your own clothing or accessories.' },
    { name: 'Board Game Tournament', duration: '90 min', supplies: '2-3 board games', description: 'Compete in multiple games and keep score.' },
    { name: 'Magic Trick Learning', duration: '45 min', supplies: 'Magic kit or tutorial', description: 'Learn card tricks or illusions to impress friends.' },
    { name: 'Sports Lesson Video', duration: '30 min', supplies: 'YouTube channel', description: 'Watch a tutorial on a sport or skill they want to learn.' },
    { name: 'Pool or Beach Time', duration: '120 min', supplies: 'Pool, swimwear, safety', description: 'Swim, play games, or just relax in water.' }
  ],
  '9-12': [
    { name: 'Advanced STEM Project', duration: '120 min', supplies: 'Electronics kit, code editor', description: 'Build a circuit, code a program, or design an experiment.' },
    { name: 'Video Editing Project', duration: '90 min', supplies: 'Video editor software, footage', description: 'Create a short film or edit existing footage.' },
    { name: 'Graphic Design', duration: '90 min', supplies: 'Design software (Canva, Photoshop)', description: 'Design a poster, social media graphic, or website layout.' },
    { name: 'Music Practice or Lessons', duration: '60 min', supplies: 'Instrument, tutorial', description: 'Practice an instrument or follow an online lesson.' },
    { name: 'Advanced Cooking', duration: '90 min', supplies: 'Recipe, ingredients, cooking equipment', description: 'Prepare a multi-course meal or bake something complex.' },
    { name: 'Game Development', duration: '120 min', supplies: 'Game engine (Unity, Unreal)', description: 'Start making a simple game with free software.' },
    { name: 'Podcast or Video Series', duration: '90 min', supplies: 'Recording equipment, editing software', description: 'Create an episode of a podcast or YouTube series.' },
    { name: 'Interior Design Project', duration: '120 min', supplies: 'Room, design software or sketches', description: 'Redesign their room or a space in the house.' },
    { name: 'Competitive Gaming', duration: '120 min', supplies: 'Console, online platform', description: 'Play competitive online games with friends.' },
    { name: 'Advanced Reading', duration: '120 min', supplies: 'Book, comfortable spot', description: 'Read a full book or significant portion of one.' },
    { name: 'Blogging or Journaling', duration: '90 min', supplies: 'Laptop, blog platform or notebook', description: 'Write a blog post, vlog script, or journal entry.' },
    { name: 'Competitive Sports', duration: '90 min', supplies: 'Sport equipment, field', description: 'Play a full game or practice session of their sport.' },
    { name: 'Art Portfolio Building', duration: '120 min', supplies: 'Art supplies, camera', description: 'Create artwork and photograph/scan for a portfolio.' },
    { name: 'Social Project Planning', duration: '90 min', supplies: 'Notebook, computer', description: 'Plan a school project or social initiative.' },
    { name: 'Animation Project', duration: '120 min', supplies: 'Animation software, tablet or paper', description: 'Create a stop-motion or digital animation.' },
    { name: 'Research Project', duration: '120 min', supplies: 'Computer, sources', description: 'Research and compile information on a topic they love.' },
    { name: 'Streaming or Let\'s Play', duration: '120 min', supplies: 'Game, streaming software', description: 'Record gameplay and stream to friends or upload.' },
    { name: 'Fashion Design Challenge', duration: '120 min', supplies: 'Fabric, sewing machine, pattern', description: 'Design and sew a piece of clothing.' },
    { name: 'Database or Spreadsheet Project', duration: '90 min', supplies: 'Excel or Google Sheets', description: 'Create a system to track something interesting.' },
    { name: 'Remote Learning Course', duration: '120 min', supplies: 'Computer, course platform', description: 'Take a lesson from a free online learning platform.' }
  ]
};

export default function KidsActivitySpinner() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [location, setLocation] = useState('both');
  const [timeAvailable, setTimeAvailable] = useState('30min');
  const [spinning, setSpinning] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [usedActivities, setUsedActivities] = useState([]);

  const getFilteredActivities = () => {
    const activities = ACTIVITIES[ageGroup] || ACTIVITIES['5-7'];
    let filtered = activities;

    if (location === 'indoor') {
      filtered = filtered.filter(a => !a.name.includes('Bike') && !a.name.includes('Water') && !a.name.includes('Outdoor') && !a.name.includes('Sport') && !a.name.includes('Skateboard') && !a.name.includes('Roller') && !a.name.includes('Pool') && !a.name.includes('Beach'));
    } else if (location === 'outdoor') {
      filtered = filtered.filter(a => a.name.includes('Bike') || a.name.includes('Water') || a.name.includes('Outdoor') || a.name.includes('Sport') || a.name.includes('Skateboard') || a.name.includes('Roller') || a.name.includes('Pool') || a.name.includes('Beach') || a.name.includes('Chalk'));
    }

    return filtered.filter(a => !usedActivities.includes(a.name));
  };

  const spinWheel = () => {
    setSpinning(true);
    const activities = getFilteredActivities();

    if (activities.length === 0) {
      setSpinning(false);
      setCurrentActivity(null);
      alert('No more activities available! Reset and try again.');
      return;
    }

    let spins = 0;
    const spinInterval = setInterval(() => {
      const randomActivity = activities[Math.floor(Math.random() * activities.length)];
      setCurrentActivity(randomActivity);
      spins++;

      if (spins > 15) {
        clearInterval(spinInterval);
        setSpinning(false);
        setUsedActivities([...usedActivities, randomActivity.name]);
      }
    }, 100);
  };

  const resetWheel = () => {
    setUsedActivities([]);
    setCurrentActivity(null);
  };

  const activities = getFilteredActivities();

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Activity Spinner Setup</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Age Group</label>
            <div className="flex flex-col gap-2">
              {['3-5', '5-7', '7-9', '9-12'].map(age => (
                <button
                  key={age}
                  onClick={() => {
                    setAgeGroup(age);
                    resetWheel();
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
            <label className="block text-text-secondary text-sm font-medium">Location</label>
            <div className="flex flex-col gap-2">
              {['both', 'indoor', 'outdoor'].map(loc => (
                <button
                  key={loc}
                  onClick={() => {
                    setLocation(loc);
                    resetWheel();
                  }}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors ${
                    location === loc
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {loc === 'both' ? 'Both' : loc === 'indoor' ? 'Indoor' : 'Outdoor'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Time Available</label>
            <div className="flex flex-col gap-2">
              {['15min', '30min', '1hr', 'any'].map(time => (
                <button
                  key={time}
                  onClick={() => setTimeAvailable(time)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors ${
                    timeAvailable === time
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {time === 'any' ? 'Any' : time}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-48 h-48 mx-auto">
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center shadow-lg transition-transform ${
              spinning ? 'animate-spin' : ''
            }`}>
              <div className="text-center">
                <p className="text-white font-heading text-sm opacity-75">Spin for</p>
                <p className="text-white font-heading text-lg font-bold">Activity!</p>
              </div>
            </div>
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-t-8 border-l-transparent border-r-transparent border-t-accent z-10"></div>
          </div>

          <button
            onClick={spinWheel}
            disabled={spinning || activities.length === 0}
            className="px-8 py-3 bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {spinning ? 'Spinning...' : 'Spin the Wheel'}
          </button>

          {currentActivity && !spinning && (
            <div className="w-full bg-white border border-border rounded-[var(--radius-card)] p-6 text-center">
              <h2 className="font-heading text-2xl font-bold text-text-primary mb-2">{currentActivity.name}</h2>
              <p className="text-accent font-mono font-bold text-lg mb-4">{currentActivity.duration}</p>
              <p className="text-text-primary mb-3">{currentActivity.description}</p>
              {currentActivity.supplies !== 'None' && (
                <p className="text-text-secondary text-sm"><span className="font-medium">You\'ll need:</span> {currentActivity.supplies}</p>
              )}
            </div>
          )}

          {activities.length === 0 && !spinning && (
            <div className="w-full bg-green-50 border border-green-200 rounded-[var(--radius-card)] p-4 text-center">
              <p className="text-green-900 font-medium mb-2">All activities used!</p>
              <p className="text-green-800 text-sm mb-3">You\'ve done {usedActivities.length} activities. Great job!</p>
              <button
                onClick={resetWheel}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-[var(--radius-input)] font-medium transition-colors"
              >
                Reset and Start Over
              </button>
            </div>
          )}

          {usedActivities.length > 0 && (
            <div className="w-full text-center">
              <p className="text-text-secondary text-sm">{usedActivities.length} activities done. {activities.length} remaining.</p>
              <button
                onClick={resetWheel}
                className="mt-2 px-4 py-2 bg-white border border-border text-text-primary hover:bg-surface rounded-[var(--radius-input)] font-medium transition-colors text-sm"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {usedActivities.length > 0 && (
        <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
          <h2 className="font-heading text-xl font-bold text-text-primary">Done So Far</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {usedActivities.map((activity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="inline-block w-5 h-5 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
                <span className="text-text-primary">{activity}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
