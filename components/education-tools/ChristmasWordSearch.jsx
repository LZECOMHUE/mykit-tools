'use client';

import WordSearchGenerator from './WordSearchGenerator';

const CHRISTMAS_WORDS = [
  'ELF', 'JOY', 'ICE', 'HAM', 'FIR',
  'STAR', 'BELL', 'GIFT', 'SNOW', 'TREE',
  'CAROL', 'ANGEL', 'CANDY', 'HOLLY', 'SANTA',
  'TINSEL', 'BAUBLE', 'SLEIGH', 'TURKEY', 'WREATH',
  'RUDOLPH', 'CRACKER', 'PRESENTS', 'REINDEER', 'STOCKING',
  'SNOWFLAKE', 'MISTLETOE', 'CHRISTMAS', 'GINGERBREAD', 'NUTCRACKER',
];

export default function ChristmasWordSearch() {
  return (
    <WordSearchGenerator
      theme={{ name: 'Christmas', words: CHRISTMAS_WORDS }}
    />
  );
}
