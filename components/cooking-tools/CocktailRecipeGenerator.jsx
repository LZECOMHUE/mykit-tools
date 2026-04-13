'use client';

import { useState } from 'react';
import { downloadAsJPG, drawBulletList } from '@/lib/download-utils';
import Button from '@/components/ui/Button';

export default function CocktailRecipeGenerator() {
  const [spirit, setSpirit] = useState('vodka');
  const [profile, setProfile] = useState('fruity');

  const cocktails = {
    vodka: {
      fruity: {
        name: 'Cosmopolitan',
        ingredients: ['45ml vodka', '15ml Cointreau', '25ml cranberry juice', '15ml fresh lime juice'],
        method: 'Shake all ingredients with ice. Strain into a chilled cocktail glass.',
        glass: 'Martini glass',
      },
      sweet: {
        name: 'Espresso Martini',
        ingredients: ['50ml vodka', '25ml coffee liqueur', '25ml fresh espresso', '1 bar spoon sugar syrup'],
        method: 'Shake all ingredients with ice. Strain into a chilled cocktail glass.',
        glass: 'Martini glass',
      },
      sour: {
        name: 'Lemon Drop',
        ingredients: ['45ml vodka', '15ml Cointreau', '25ml fresh lemon juice', '15ml simple syrup'],
        method: 'Shake all ingredients with ice. Strain into a chilled cocktail glass.',
        glass: 'Martini glass',
      },
      herbal: {
        name: 'Vodka Gimlet',
        ingredients: ['50ml vodka', '25ml fresh lime juice', '15ml simple syrup'],
        method: 'Shake with ice. Strain into a chilled cocktail glass.',
        glass: 'Martini glass',
      },
    },
    gin: {
      fruity: {
        name: 'Strawberry Gin Fizz',
        ingredients: ['50ml gin', '25ml strawberry liqueur', '100ml prosecco', '50ml soda water', 'Fresh strawberry'],
        method: 'Build in a glass with ice. Top with prosecco and soda. Stir gently.',
        glass: 'Wine glass',
      },
      sweet: {
        name: 'Sloe Gin Sour',
        ingredients: ['50ml sloe gin', '25ml lemon juice', '15ml simple syrup', '1 egg white'],
        method: 'Dry shake all ingredients. Add ice and shake again. Strain.',
        glass: 'Coupe glass',
      },
      sour: {
        name: 'Gin Sour',
        ingredients: ['50ml gin', '25ml fresh lemon juice', '15ml simple syrup'],
        method: 'Shake all ingredients with ice. Strain into a chilled glass.',
        glass: 'Rocks glass',
      },
      herbal: {
        name: 'Gin & Tonic',
        ingredients: ['50ml gin', '150ml premium tonic water', 'Lime wedge', 'Botanical garnish'],
        method: 'Pour gin into glass with ice. Top with tonic. Stir and garnish.',
        glass: 'Highball glass',
      },
    },
    rum: {
      fruity: {
        name: 'Mai Tai',
        ingredients: ['30ml white rum', '30ml dark rum', '20ml Cointreau', '15ml fresh lime juice', '10ml almond syrup'],
        method: 'Shake all ingredients with ice. Strain into ice-filled glass.',
        glass: 'Rocks glass',
      },
      sweet: {
        name: 'Daiquiri',
        ingredients: ['60ml white rum', '25ml fresh lime juice', '15ml simple syrup'],
        method: 'Shake all ingredients with ice. Strain into a chilled cocktail glass.',
        glass: 'Martini glass',
      },
      sour: {
        name: 'Rum Punch',
        ingredients: ['50ml dark rum', '30ml pineapple juice', '20ml lime juice', '10ml grenadine'],
        method: 'Build in a glass with ice. Stir well.',
        glass: 'Highball glass',
      },
      herbal: {
        name: 'Mojito',
        ingredients: ['50ml white rum', '12 fresh mint leaves', '25ml fresh lime juice', '15ml simple syrup', 'Soda water'],
        method: 'Muddle mint gently. Add other ingredients with ice. Top with soda.',
        glass: 'Highball glass',
      },
    },
    whisky: {
      fruity: {
        name: 'Whiskey Sour',
        ingredients: ['50ml whisky', '25ml fresh lemon juice', '15ml simple syrup', '1 dash Angostura bitters'],
        method: 'Shake all ingredients with ice. Strain into a chilled glass.',
        glass: 'Rocks glass',
      },
      sweet: {
        name: 'Old Fashioned',
        ingredients: ['50ml whisky', '1 sugar cube', '2 dashes Angostura bitters', 'Orange twist'],
        method: 'Muddle sugar and bitters. Add whisky and ice. Stir.',
        glass: 'Rocks glass',
      },
      sour: {
        name: 'Whiskey Smash',
        ingredients: ['50ml whisky', '25ml fresh lemon juice', '12ml simple syrup', '4 fresh mint leaves'],
        method: 'Muddle mint. Add other ingredients with ice. Shake and strain.',
        glass: 'Rocks glass',
      },
      herbal: {
        name: 'Sazerac',
        ingredients: ['60ml rye whiskey', '1 dash Peychaud bitters', 'Absinthe rinse', 'Lemon twist'],
        method: 'Rinse glass with absinthe. Add whiskey, bitters, and ice. Stir and garnish.',
        glass: 'Rocks glass',
      },
    },
    tequila: {
      fruity: {
        name: 'Margarita',
        ingredients: ['50ml tequila', '25ml Cointreau', '25ml fresh lime juice', 'Salt rim'],
        method: 'Shake tequila, Cointreau, and lime with ice. Strain into salt-rimmed glass.',
        glass: 'Margarita glass',
      },
      sweet: {
        name: 'Paloma',
        ingredients: ['50ml tequila', '100ml grapefruit juice', '15ml lime juice', '10ml simple syrup'],
        method: 'Shake all ingredients with ice. Strain into ice-filled glass.',
        glass: 'Highball glass',
      },
      sour: {
        name: 'Tequila Sunrise',
        ingredients: ['50ml tequila', '100ml orange juice', '15ml grenadine'],
        method: 'Build tequila and orange juice with ice. Slowly pour grenadine.',
        glass: 'Highball glass',
      },
      herbal: {
        name: 'Jalapeño Margarita',
        ingredients: ['50ml tequila', '25ml Cointreau', '25ml lime juice', '3 sliced jalapeños'],
        method: 'Muddle jalapeños. Add other ingredients with ice. Shake and strain.',
        glass: 'Margarita glass',
      },
    },
  };

  const cocktail = cocktails[spirit][profile];

  const handleDownloadJPG = () => {
    downloadAsJPG({
      filename: `cocktail-recipe-${cocktail.name.replace(/\s+/g, '-').toLowerCase()}.jpg`,
      width: 700,
      height: 900,
      title: cocktail.name,
      subtitle: `Base: ${spirit.charAt(0).toUpperCase() + spirit.slice(1)} | Profile: ${profile}`,
      accentColor: '#2563eb',
      render: (ctx, area) => {
        let y = area.y;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Glass', area.x, y);
        ctx.font = '11px sans-serif';
        ctx.fillStyle = '#525252';
        ctx.fillText(cocktail.glass, area.x, y + 16);
        y += 40;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('Ingredients', area.x, y);
        y += 18;

        cocktail.ingredients.forEach((ingredient) => {
          ctx.fillStyle = '#2563eb';
          ctx.beginPath();
          ctx.arc(area.x + 6, y + 5, 2.5, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#1a1a1a';
          ctx.font = '11px sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText(ingredient, area.x + 16, y);
          y += 16;
        });

        y += 12;
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(area.x, y);
        ctx.lineTo(area.x + area.width, y);
        ctx.stroke();
        y += 16;

        ctx.fillStyle = '#1a1a1a';
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText('Method', area.x, y);
        y += 18;

        ctx.fillStyle = '#525252';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'left';
        const words = cocktail.method.split(' ');
        let line = '';

        words.forEach((word) => {
          const testLine = line + (line ? ' ' : '') + word;
          const metrics = ctx.measureText(testLine);

          if (metrics.width > area.width - 16 && line) {
            ctx.fillText(line, area.x + 8, y);
            y += 14;
            line = word;
          } else {
            line = testLine;
          }
        });

        if (line) {
          ctx.fillText(line, area.x + 8, y);
        }
      },
    });
  };

  return (
    <div className="bg-surface border border-border rounded-[var(--radius-card)] md:p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Base Spirit
          </label>
          <select
            value={spirit}
            onChange={(e) => setSpirit(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="vodka">Vodka</option>
            <option value="gin">Gin</option>
            <option value="rum">Rum</option>
            <option value="whisky">Whisky</option>
            <option value="tequila">Tequila</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Flavour Profile
          </label>
          <select
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-[var(--radius-input)] bg-white text-text-primary focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
          >
            <option value="fruity">Fruity</option>
            <option value="sweet">Sweet</option>
            <option value="sour">Sour</option>
            <option value="herbal">Herbal</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[var(--radius-card)] border border-border p-4 md:p-4 space-y-4">
        <h3 className="font-heading text-2xl font-bold text-text-primary mb-2">
          {cocktail.name}
        </h3>

        <div className="bg-surface rounded-[var(--radius-input)] p-3">
          <p className="text-sm text-text-secondary mb-1">Glassware</p>
          <p className="font-medium text-text-primary">{cocktail.glass}</p>
        </div>

        <div>
          <h4 className="font-medium text-text-primary mb-3">Ingredients</h4>
          <ul className="space-y-2">
            {cocktail.ingredients.map((ingredient, idx) => (
              <li key={idx} className="flex items-center text-text-primary">
                <span className="inline-block w-2 h-2 bg-accent rounded-full mr-3"></span>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-blue-100 border border-accent border-opacity-20 rounded-[var(--radius-input)] p-4">
          <h4 className="font-medium text-text-primary mb-2">Method</h4>
          <p className="text-text-secondary">{cocktail.method}</p>
        </div>
      </div>

      <Button
        onClick={handleDownloadJPG}
        variant="primary"
        className="w-full"
      >
        Download JPG
      </Button>

      <p className="text-xs text-text-muted bg-surface rounded-[var(--radius-input)] p-3">
        All recipes serve 1. Adjust quantities to taste and available spirits.
      </p>
    </div>
  );
}
