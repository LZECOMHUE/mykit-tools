import fs from 'fs';
const files = fs.readdirSync('data/seo-content').filter(f => f.endsWith('.js'));

let totalFixed = 0;
files.forEach(f => {
  let p = 'data/seo-content/' + f;
  let content = fs.readFileSync(p, 'utf8');
  
  // Replace missing commas between top-level tool definitions
  let updated = content.replace(/\}(\s+)"([a-z0-9-]+)":\s*\{/g, '},$1"$2": {');
  
  if (content !== updated) {
    fs.writeFileSync(p, updated, 'utf8');
    totalFixed++;
  }
});

console.log('Fixed missing commas in ' + totalFixed + ' files.');
