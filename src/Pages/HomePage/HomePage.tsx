import React from 'react';
import { MorseCode } from '../../../constants/MorseCode';
import { useState } from 'react';
import EnglishInput from '../../Components/EnglishInput/EnglishInput';
import MorseInput from '../../Components/MorseInput/MorseInput';
import SwapButton from '../../Components/SwapButton/SwapButton';
import './styles.css';

export const HomePage: React.FC = () => {
  const [isEnglishToMorse, setIsEnglishToMorse] = useState<boolean>(true);
  const [englishInput, setEnglishInput] = useState('');
  const [morseInput, setMorseInput] = useState('');

  const englishToMorse = (input: string) => {
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

  const morseToEnglish = (input: string) => {
    const morseMap = Object.fromEntries(
      MorseCode.map(({ letter, morse }) => [morse, letter])
    );

    return input
      .split(' ')
      .map((code) => morseMap[code] || '')
      .join('');
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newInput = event.target.value;
    const uppercaseValue = newInput.toUpperCase();
    setInput(uppercaseValue);
  };

  return (
    <div
      className="translator"
      style={{ flexDirection: isEnglishToMorse ? 'row' : 'row-reverse' }}
    >
      <EnglishInput
        input={englishInput}
        setInput={setEnglishInput}
        setOutput={setMorseInput}
        handleChange={handleTextChange}
        isDisabled={!isEnglishToMorse}
        translate={englishToMorse}
      />
      <SwapButton
        translation={isEnglishToMorse}
        setTranslation={setIsEnglishToMorse}
      />
      <MorseInput
        input={morseInput}
        setInput={setMorseInput}
        setOutput={setEnglishInput}
        handleChange={handleTextChange}
        isDisabled={isEnglishToMorse}
        translate={morseToEnglish}
      />
    </div>
  );
};
