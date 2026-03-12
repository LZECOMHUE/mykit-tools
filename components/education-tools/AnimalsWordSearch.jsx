'use client';

import WordSearchGenerator from './WordSearchGenerator';

const ANIMALS_WORDS = [
  'CAT', 'DOG', 'COW', 'PIG', 'HEN',
  'FROG', 'BEAR', 'FISH', 'DEER', 'DUCK',
  'LION', 'TIGER', 'EAGLE', 'KOALA', 'PANDA',
  'WHALE', 'SNAKE', 'ZEBRA', 'SHARK', 'HORSE',
  'PENGUIN', 'DOLPHIN', 'GIRAFFE', 'GORILLA', 'PARROT',
  'ELEPHANT', 'CHEETAH', 'FLAMINGO', 'KANGAROO', 'OCTOPUS',
];

export default function AnimalsWordSearch() {
  return (
    <WordSearchGenerator
      theme={{ name: 'Animals', words: ANIMALS_WORDS }}
    />
  );
}
