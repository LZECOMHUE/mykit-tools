'use client';

import WordSearchGenerator from './WordSearchGenerator';

const HALLOWEEN_WORDS = [
  'BAT', 'BOO', 'HEX', 'FOG', 'WEB',
  'BONE', 'FANG', 'TOMB', 'DARK', 'HOWL',
  'WITCH', 'GHOST', 'SKULL', 'CANDY', 'BLOOD',
  'COBWEB', 'ZOMBIE', 'SPIDER', 'POTION', 'CLOAK',
  'PUMPKIN', 'VAMPIRE', 'HAUNTED', 'MONSTER', 'COSTUME',
  'SKELETON', 'CAULDRON', 'WEREWOLF', 'BROOMSTICK', 'SCARECROW',
];

export default function HalloweenWordSearch() {
  return (
    <WordSearchGenerator
      theme={{ name: 'Halloween', words: HALLOWEEN_WORDS }}
    />
  );
}
