import React from 'react';
import { useState } from 'react';
import EnglishInput from '../../Components/EnglishInput/EnglishInput';
import MorseOutputs from '../../Components/MorseOutputs/MorseOutputs';
import SwapButton from '../../Components/SwapButton/SwapButton';
import MorseInput from '../../Components/MorseInput/MorseInput';
import './styles.css';

export const HomePage: React.FC = () => {
  const [isEnglishToMorse, setIsEnglishToMorse] = useState<boolean>(true);
  const [englishInput, setEnglishInput] = useState('');
  const [morseInput, setMorseInput] = useState('');

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const newInput = event.target.value;
    const uppercaseValue = newInput.toUpperCase();
    setInput(uppercaseValue);
  };

  return (
    <div className="translator">
      {isEnglishToMorse ? (
        <EnglishInput
          input={englishInput}
          setInput={setEnglishInput}
          handleChange={handleTextChange}
        />
      ) : (
        <MorseInput
          input={morseInput}
          setInput={setMorseInput}
          handleChange={handleTextChange}
        />
      )}
      <SwapButton
        isEnglishToMorse={isEnglishToMorse}
        setIsEnglishToMorse={setIsEnglishToMorse}
      />
      <MorseOutputs
        input={isEnglishToMorse ? englishInput : morseInput}
        isEnglishToMorse={isEnglishToMorse}
      />
    </div>
  );
};
