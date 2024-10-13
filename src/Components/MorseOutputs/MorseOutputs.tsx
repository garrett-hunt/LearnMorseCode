import { AudioOutput } from '../AudioOutput/AudioOutput';
import { LightOutput } from '../LightOutput/LightOutput';
import { TextOutput } from '../TextOutput/TextOutput';
import './styles.css';
import React, { useState } from 'react';

type MorseType = 'TEXT' | 'LIGHT' | 'AUDIO';

interface MorseOutputProps {
  morseOutputType?: MorseType;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  isDisabled: boolean;
  translate: (input: string) => string;
}

const morseTypes: MorseType[] = ['TEXT', 'LIGHT', 'AUDIO'];

const MorseOutputs: React.FC<MorseOutputProps> = ({
  input,
  setInput,
  setOutput,
  isDisabled,
  translate,
}) => {
  const [morseOutputType, setMorseOutputType] = useState<MorseType>('TEXT');

  return (
    <div className="morseContainer">
      <div className="inputContainer">
        <h1>Morse Code</h1>
        {(morseOutputType === 'TEXT' || !isDisabled) && (
          <TextOutput
            isDisabled={isDisabled}
            input={input}
            setInput={setInput}
            setOutput={setOutput}
            translate={translate}
          ></TextOutput>
        )}
        {morseOutputType === 'LIGHT' && isDisabled && (
          <LightOutput input={input} />
        )}
        {morseOutputType === 'AUDIO' && isDisabled && (
          <AudioOutput input={input} />
        )}
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

export default MorseOutputs;
