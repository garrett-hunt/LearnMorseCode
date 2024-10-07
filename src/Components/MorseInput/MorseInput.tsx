import './styles.css';
import React, { useState } from 'react';

type MorseType = 'TEXT' | 'LIGHT' | 'SOUND';

interface MorseInputProps {
  morseOutputType?: MorseType;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => void;
  isDisabled: boolean;
  translate: (input: string) => string;
}

const MorseInput: React.FC<MorseInputProps> = ({
  input,
  setInput,
  setOutput,
  handleChange,
  isDisabled,
  translate,
}) => {
  const [morseOutputType, setMorseOutputType] = useState<MorseType>('TEXT');
  const morseTypes: MorseType[] = ['TEXT', 'LIGHT', 'SOUND'];

  return (
    <div className="morseContainer">
      <div className="inputContainer">
        <h1>Morse Code</h1>
        <textarea
          disabled={isDisabled}
          name="morseInput"
          value={input}
          placeholder={!isDisabled ? 'Input a value to be translated' : ''}
          onChange={(event) => {
            if (!isDisabled) {
              const newInput = event.target.value;
              setInput(newInput);
              handleChange(event, setInput);
              setOutput(() => translate(newInput));
            }
          }}
        ></textarea>
      </div>
      <div>
        {isDisabled
          ? morseTypes.map((type) => (
              <button
                key={type}
                style={{
                  backgroundColor:
                    morseOutputType === type
                      ? 'rgb(150, 150, 150)'
                      : 'rgb(90, 90, 90)',
                }}
                onClick={() => setMorseOutputType(type)}
              >
                {type.charAt(0) + type.slice(1).toLowerCase()}
              </button>
            ))
          : undefined}
      </div>
    </div>
  );
};

export default MorseInput;
