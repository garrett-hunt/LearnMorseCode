import React from 'react';
import { MorseCode } from '../../../constants/MorseCode';
import { useState } from 'react';
import './styles.css';

export const HomePage: React.FC = () => {
  const [isEnglishToMorse, setIsEnglishToMorse] = useState(true);
  const [englishInput, setEnglishInput] = useState('');
  const [morseInput, setMorseInput] = useState('');

  const englishToMorse = (input: string) => {
    let englishTranslation = '';
    input = input.toLowerCase();

    for (let i = 0; i < input.length; i++) {
      if (input[i] !== ' ') {
        let letter = MorseCode.find((alphabet) => alphabet.letter === input[i]);
        if (letter) {
          englishTranslation += letter.morse + ' ';
        } else {
          englishTranslation += '? ';
        }
      } else {
        englishTranslation += '   ';
      }
    }

    return englishTranslation.trim();
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const uppercaseValue = event.target.value.toUpperCase();
    setInput(uppercaseValue);
  };

  return (
    <div className="translator">
      <div className="english">
        <h1>English Input</h1>
        <input
          className="englishInput"
          type="text"
          name="englishInput"
          value={englishInput}
          placeholder="Input a value to be translated"
          onChange={(event) => handleInputChange(event, setEnglishInput)}
        ></input>
      </div>

      <button
        id="arrowIcon"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          setIsEnglishToMorse(!isEnglishToMorse)
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="100px"
          viewBox="0 -960 960 960"
          width="100px"
          fill="#e8eaed"
        >
          <path d="M280-120 80-320l200-200 57 56-104 104h607v80H233l104 104-57 56Zm400-320-57-56 104-104H120v-80h607L623-784l57-56 200 200-200 200Z" />
        </svg>
      </button>

      <div className="morse">
        <h1>Morse Code</h1>
        <input
          disabled={true}
          className="morseInput"
          type="text"
          name="morseInput"
          value={morseInput}
          placeholder="Input a value to be translated"
          onChange={(event) => handleInputChange(event, setMorseInput)}
        ></input>
      </div>
    </div>
  );
};
