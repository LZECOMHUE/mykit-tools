'use client';
import { useState } from 'react';

const PARTY_GAMES = {
  '3-5': [
    { name: 'Musical Statues', duration: 10, players: '5-20', setup: 'Music player', rules: 'Play music. When it stops, everyone freezes. If you move, you\'re out. Last person standing wins.' },
    { name: 'Simon Says', duration: 10, players: '5-20', setup: 'None', rules: 'One person is Simon. Call out actions like "Simon says touch your nose." Only do it if you say Simon says first.' },
    { name: 'Pass the Parcel', duration: 15, players: '5-20', setup: 'Wrapped box, music', rules: 'Pass wrapped box while music plays. When music stops, whoever holds it unwraps one layer. Last person to unwrap gets the prize.' },
    { name: 'Duck Duck Goose', duration: 12, players: '5-20', setup: 'Open space', rules: 'Sit in circle. One person walks around saying duck, duck. Say goose and that person chases you.' },
    { name: 'Red Light Green Light', duration: 10, players: '5-20', setup: 'Open space', rules: 'One person says green light. Everyone runs toward them. Red light and everyone freezes. Anyone who moves goes back to start.' },
    { name: 'The Floor is Lava', duration: 12, players: '5-20', setup: 'Furniture', rules: 'The floor is lava. Everyone must get on furniture without touching the ground. Last person standing wins.' },
    { name: 'Follow the Leader', duration: 10, players: '5-20', setup: 'Open space', rules: 'One person leads. Everyone copies everything they do. Change leaders every few minutes.' },
    { name: 'Freeze Dance', duration: 10, players: '5-20', setup: 'Music', rules: 'Dance while music plays. Freeze when it stops. If you move, you\'re out. Last one standing wins.' },
    { name: 'Hot and Cold', duration: 10, players: '5-20', setup: 'Hidden object', rules: 'Hide an object. One person searches. Others say hot when they\'re close, cold when they\'re far away.' },
    { name: 'Ring Around the Rosie', duration: 8, players: '5-20', setup: 'Open space', rules: 'Stand in circle holding hands. Walk around singing. Fall down on the last line.' },
    { name: 'Sleeping Lions', duration: 12, players: '5-20', setup: 'Soft surface', rules: 'Everyone lies down. One person tries to make them laugh or move. If you move, you\'re out. Last still person wins.' },
    { name: 'What Time Is It Mr Wolf', duration: 10, players: '5-20', setup: 'Open space', rules: 'One person is the wolf at one end. Others ask what time it is. Wolf says a time, everyone walks that many steps. When wolf says "dinner time" everyone runs.' },
    { name: 'London Bridge', duration: 8, players: '5-20', setup: 'Two tall people', rules: 'Two people make a bridge with their arms. Others walk under singing. Bridge falls on one child. That child picks which tower to stand by.' },
    { name: 'Blob Tag', duration: 10, players: '5-20', setup: 'Open space', rules: 'One person is it. When they tag someone, that person joins their hand. The blob grows. Last person not caught wins.' }
  ],
  '5-7': [
    { name: 'Musical Bumps', duration: 12, players: '5-20', setup: 'Music', rules: 'Dance while music plays. When it stops, everyone sits down. Last to sit is out. Continue until one person remains.' },
    { name: 'Sleeping Lions', duration: 15, players: '5-20', setup: 'Soft surface', rules: 'Everyone lies down and must not move or laugh. Adults try to make them laugh or move. If you move, you\'re out. Last still person wins.' },
    { name: 'Pass the Parcel', duration: 20, players: '5-20', setup: 'Wrapped box, music, prizes', rules: 'Pass wrapped box while music plays. When it stops, unwrap a layer. Continue until all unwrapped. Person with final layer keeps the prize.' },
    { name: 'Limbo', duration: 10, players: '5-20', setup: 'Stick or rope', rules: 'How low can you go under the bar without falling or using hands? After each round, lower the bar. Person who goes lowest wins.' },
    { name: 'Charades', duration: 20, players: '5-20', setup: 'Ideas written down', rules: 'One person acts out a movie, book, or animal without talking. Team guesses what it is. Award points for correct guesses.' },
    { name: 'Sack Race', duration: 12, players: '5-20', setup: 'Sacks or bags', rules: 'Everyone gets in a sack up to their waist. Hop from start to finish line. First across wins.' },
    { name: 'Piata', duration: 10, players: '5-20', setup: 'Piata, stick, blindfold', rules: 'Piata is hung up. Blindfold players one at a time. They try to hit it with a stick. When it breaks, everyone grabs candy.' },
    { name: 'Treasure Hunt', duration: 30, players: '5-20', setup: 'Small prizes, hiding spots', rules: 'Hide items around party area. Give children clues or a map. First to find all items wins.' },
    { name: 'Balloon Pop Relay', duration: 12, players: '5-20', setup: 'Balloons', rules: 'Teams line up. One person runs to pop a balloon by sitting on it. Tag next teammate. First team to pop all balloons wins.' },
    { name: 'Egg and Spoon Race', duration: 10, players: '5-20', setup: 'Eggs or plastic eggs, spoons', rules: 'Balance an egg on a spoon while racing. If you drop it, restart. First to finish without dropping wins.' },
    { name: 'Three-Legged Race', duration: 12, players: '5-20', setup: 'Rope', rules: 'Partners tie legs together. Race to finish line. First team to cross wins.' },
    { name: 'Relay Race', duration: 12, players: '5-20', setup: 'Open space', rules: 'Teams line up. First person runs and tags next. Continue until all have run. First team done wins.' },
    { name: 'Pin the Tail', duration: 10, players: '5-20', setup: 'Poster, blindfold, pins', rules: 'Blindfold players. They try to pin the tail on a poster. Closest to correct spot wins.' },
    { name: 'Musical Chairs', duration: 12, players: '5-20', setup: 'Chairs, music', rules: 'Chairs in circle, one less than people. Walk around while music plays. Sit down when it stops. No chair means you\'re out.' }
  ],
  '7-9': [
    { name: 'Scavenger Hunt', duration: 30, players: '5-20', setup: 'List of items, outdoor/indoor space', rules: 'Give teams a list of items to find. First team to find all items wins. Can be themed.' },
    { name: 'Murder Mystery Game', duration: 45, players: '5-20', setup: 'Script, roles, clues', rules: 'Each person has a secret role. Try to guess who the murderer is based on clues and questions.' },
    { name: 'Dodgeball', duration: 15, players: '5-20', setup: 'Soft balls, space', rules: 'Two teams face off. Throw soft balls to get opponents out. Catch a ball and the thrower is out. Last team with players wins.' },
    { name: 'Four Square', duration: 20, players: '4-8', setup: '4 squares, ball', rules: 'Stand in four squares. Bounce ball between squares. If you miss, you\'re out. Try to move to the king square.' },
    { name: 'Telephone Game', duration: 10, players: '5-20', setup: 'None', rules: 'Whisper a message to one person. They whisper to the next. See how the message changes. Last person says it out loud.' },
    { name: 'Simon Says Advanced', duration: 15, players: '5-20', setup: 'None', rules: 'Simon calls out actions. Only do it if Simon says first. Fast pace with tricky commands.' },
    { name: 'Blind Taste Test', duration: 15, players: '5-20', setup: 'Foods, blindfolds', rules: 'Blindfold players. Give them different foods to taste. They guess what it is. Most correct guesses wins.' },
    { name: 'Lemon Race', duration: 10, players: '5-20', setup: 'Lemons or small balls, spoons', rules: 'Like egg and spoon race but with lemons. Balance a lemon on a spoon while racing.' },
    { name: 'Treasure Hunt with Codes', duration: 30, players: '5-20', setup: 'Clues, codes to crack, treasure', rules: 'Teams solve riddles and codes to find treasure. Each clue leads to the next location.' },
    { name: 'Minute-to-Win-It Games', duration: 25, players: '5-20', setup: 'Various small items', rules: 'Series of one-minute challenges. Move cookies from forehead to mouth, stack cookies on forehead, etc.' },
    { name: 'Capture the Flag', duration: 20, players: '6-20', setup: 'Two flags, space', rules: 'Two teams protect their flag. Try to steal opponent\'s flag and bring to your base. First to steal wins.' },
    { name: 'Trivia Game', duration: 20, players: '5-20', setup: 'Questions', rules: 'Ask questions. Teams or individuals answer. Keep score. Team with most points wins.' },
    { name: 'Hot Potato', duration: 12, players: '5-20', setup: 'Music, small object', rules: 'Toss object around while music plays. When music stops, whoever holds it is out. Continue until one person remains.' },
    { name: 'Freeze Tag', duration: 15, players: '5-20', setup: 'Open space', rules: 'One person is it. When tagged, you freeze in place. Another non-frozen person can unfreeze you by high-fiving. See how long others avoid being frozen.' }
  ],
  '9-12': [
    { name: 'Elaborate Murder Mystery', duration: 60, players: '5-20', setup: 'Complex script, clues, roles', rules: 'Detailed mystery game with red herrings, interrogation, and plot twists. Teams work to solve the crime.' },
    { name: 'Capture the Flag Advanced', duration: 25, players: '8-20', setup: 'Two flags, large space', rules: 'Teams with base camps. Capture opponent\'s flag and return to base without being tagged. Strategic gameplay.' },
    { name: 'Relay Race Tournament', duration: 20, players: '5-20', setup: 'Space, multiple formats', rules: 'Series of relay races with different formats. Egg and spoon, three-legged, backwards, etc. Tournament style.' },
    { name: 'Parkour Obstacle Course', duration: 30, players: '5-20', setup: 'Various obstacles, cones', rules: 'Design course with climbing, jumping, crawling, balancing. Time each person. Fastest wins.' },
    { name: 'Improv Comedy Game', duration: 20, players: '5-20', setup: 'Cards with scenarios', rules: 'Act out random scenarios with other players. Audience votes on funniest performance.' },
    { name: 'Complex Scavenger Hunt', duration: 40, players: '5-20', setup: 'Clues, puzzles, multiple locations', rules: 'Riddles and puzzles lead to locations. Each location has a puzzle to solve. First team to complete all wins.' },
    { name: 'Dodgeball Tournament', duration: 25, players: '8-20', setup: 'Soft balls, brackets', rules: 'Bracket-style tournament. Teams eliminate each other. Champion team wins.' },
    { name: 'Code-Breaking Challenge', duration: 25, players: '5-20', setup: 'Puzzles, ciphers', rules: 'Teams race to break codes and ciphers. Each solved code reveals the location of the next puzzle.' },
    { name: 'Mafia/Werewolf Game', duration: 30, players: '8-20', setup: 'Cards, none else', rules: 'Social deduction game. Some are mafia, some are innocent. Find and eliminate the mafia.' },
    { name: 'Talent Show', duration: 30, players: '5-20', setup: 'Stage space, music if possible', rules: 'Each person shows a talent or performs. Audience votes or judges score. Awards for different categories.' },
    { name: 'Water Balloon Battle', duration: 20, players: '5-20', setup: 'Water balloons, buckets', rules: 'Two teams throw water balloons at each other. Last team with dry members wins. Or continuous game.' },
    { name: 'Minute-to-Win-It Tournament', duration: 30, players: '5-20', setup: 'Various challenges', rules: 'Series of one-minute challenges. Points for winning. Leaderboard tracks scores throughout party.' },
    { name: 'Straw-and-Cup Relay', duration: 15, players: '5-20', setup: 'Straws, cups', rules: 'Teams line up. Use straw to suck and hold a cup. Pass it to next person. First team to transfer all cups wins.' },
    { name: 'Spoon Jousting', duration: 12, players: '4-8', setup: 'Spoons, balloons', rules: 'Partners sit back-to-back with balloon between them. Use spoons to pop opponent\'s balloon. Last balloon wins.' }
  ]
};

export default function BirthdayPartyGamePlanner() {
  const [ageGroup, setAgeGroup] = useState('5-7');
  const [numKids, setNumKids] = useState('12');
  const [duration, setDuration] = useState('1hr');
  const [location, setLocation] = useState('both');
  const [generated, setGenerated] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [materials, setMaterials] = useState([]);

  const generateSchedule = () => {
    const games = PARTY_GAMES[ageGroup] || PARTY_GAMES['5-7'];
    const durationMin = duration === '1hr' ? 60 : duration === '1.5hr' ? 90 : 120;

    // Filter games by location preference
    let filtered = games;
    if (location === 'indoor') {
      filtered = games.filter(g => !g.name.includes('Water') && !g.name.includes('Sack') && !g.name.includes('Three-Legged'));
    } else if (location === 'outdoor') {
      filtered = games.filter(g => !g.name.includes('Telephone') && !g.name.includes('Four Square'));
    }

    // Select games that fit the duration
    let selectedGames = [];
    let timeUsed = 0;

    while (timeUsed < durationMin * 0.8 && filtered.length > 0) {
      const idx = Math.floor(Math.random() * filtered.length);
      const game = filtered[idx];
      if (timeUsed + game.duration <= durationMin) {
        selectedGames.push(game);
        timeUsed += game.duration;
        filtered.splice(idx, 1);
      } else {
        filtered.splice(idx, 1);
      }
    }

    setSchedule(selectedGames);

    // Compile materials list
    const mats = new Set();
    selectedGames.forEach(game => {
      if (game.setup && game.setup !== 'None' && game.setup !== 'Open space') {
        game.setup.split(', ').forEach(item => mats.add(item));
      }
    });

    setMaterials(Array.from(mats));
    setGenerated(true);
  };

  const totalDuration = schedule.reduce((sum, game) => sum + game.duration, 0);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
        <h2 className="font-heading text-xl font-bold text-text-primary">Party Configuration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <label className="block text-text-secondary text-sm font-medium">Number of Children</label>
            <input
              type="range"
              min="5"
              max="25"
              value={numKids}
              onChange={(e) => setNumKids(e.target.value)}
              className="w-full"
            />
            <div className="text-center text-accent font-mono font-medium">{numKids} kids</div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Party Duration</label>
            <div className="flex gap-2">
              {['1hr', '1.5hr', '2hr'].map(dur => (
                <button
                  key={dur}
                  onClick={() => setDuration(dur)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors flex-1 ${
                    duration === dur
                      ? 'bg-accent text-white'
                      : 'bg-white border border-border text-text-primary hover:border-border-hover'
                  }`}
                >
                  {dur}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-text-secondary text-sm font-medium">Location</label>
            <div className="flex gap-2">
              {['both', 'indoor', 'outdoor'].map(loc => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc)}
                  className={`px-3 py-2 rounded-[var(--radius-input)] font-medium text-sm transition-colors flex-1 ${
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
        </div>

        <button
          onClick={generateSchedule}
          className="w-full bg-accent text-white hover:bg-accent-hover rounded-[var(--radius-input)] py-2 font-medium transition-colors"
        >
          Generate Game Schedule
        </button>
      </div>

      {generated && (
        <div className="space-y-6">
          <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-text-primary">Game Schedule</h2>
              <p className="text-text-secondary text-sm mt-1">Total time: <span className="font-mono font-bold">{totalDuration} minutes</span></p>
            </div>

            <div className="space-y-3">
              {schedule.map((game, idx) => (
                <div key={idx} className="bg-white border border-border rounded-[var(--radius-card)] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-grow">
                      <h3 className="font-heading font-bold text-text-primary">{idx + 1}. {game.name}</h3>
                      <p className="text-text-secondary text-sm mt-1">{game.rules}</p>
                      <div className="flex gap-4 mt-2 text-sm text-text-secondary">
                        <span><span className="font-medium">Time:</span> {game.duration} min</span>
                        <span><span className="font-medium">Players:</span> {game.players}</span>
                        {game.setup !== 'None' && <span><span className="font-medium">Setup:</span> {game.setup}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {materials.length > 0 && (
            <div className="space-y-4 bg-surface border border-border rounded-[var(--radius-card)] p-6">
              <h2 className="font-heading text-xl font-bold text-text-primary">Materials Checklist</h2>
              <div className="space-y-2">
                {materials.map((material, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input type="checkbox" id={`mat-${idx}`} className="rounded" />
                    <label htmlFor={`mat-${idx}`} className="text-text-primary">{material}</label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-[var(--radius-card)] p-4">
            <h3 className="font-heading font-bold text-blue-900 mb-2">Party Planning Tips</h3>
            <ul className="text-sm text-blue-900 space-y-1 list-disc list-inside">
              <li>Set up materials and clear space before children arrive</li>
              <li>Have backup activities in case some games finish quickly</li>
              <li>Rotate active and calmer games to keep energy levels balanced</li>
              <li>Explain rules clearly before starting each game</li>
              <li>Have a small prize or reward ready for game winners</li>
              <li>Keep pace upbeat and have one adult overseeing each game</li>
              <li>Prepare snack breaks between high-energy games</li>
            </ul>
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
