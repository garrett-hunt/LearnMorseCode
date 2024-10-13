import { MorseCode } from '../constants/MorseCode';

export const englishToMorse = (input: string) => {
  const morseMap = Object.fromEntries(
    MorseCode.map(({ letter, morse }) => [letter.toUpperCase(), morse])
  );

  return input
    .split('')
    .map((char) => {
      const upperChar = char.toUpperCase();
      return morseMap[upperChar] || '?';
    })
    .join(' ')
    .trim();
};

export const morseToEnglish = (input: string) => {
  const morseMap = Object.fromEntries(
    MorseCode.map(({ letter, morse }) => [morse, letter])
  );

  return input
    .split(' ')
    .map((code) => morseMap[code] || '')
    .join('');
};
