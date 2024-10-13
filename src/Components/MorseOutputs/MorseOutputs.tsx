import React, { useEffect, useState } from 'react';
import { englishToMorse, morseToEnglish } from '../../../utils/utils';
import { AudioOutput } from '../AudioOutput/AudioOutput';
import { LightOutput } from '../LightOutput/LightOutput';
import { TextOutput } from '../TextOutput/TextOutput';
import './styles.css';

type MorseType = 'TEXT' | 'LIGHT' | 'AUDIO';

interface MorseOutputProps {
  input: string;
  isEnglishToMorse: boolean;
}

const morseTypeButtons: MorseType[] = ['TEXT', 'LIGHT', 'AUDIO'];

const MorseOutputs: React.FC<MorseOutputProps> = ({
  input,
  isEnglishToMorse,
}) => {
  const [morseOutputType, setMorseOutputType] = useState<MorseType>('TEXT');
  const [output, setOutput] = useState(input);

  useEffect(() => {
    if (isEnglishToMorse) {
      setOutput(englishToMorse(input));
    } else if (isEnglishToMorse && morseOutputType === 'TEXT') {
      setOutput(morseToEnglish(input));
    } else {
      setOutput(input);
    }
  });

  let outputLabel = '';
  if (morseOutputType === 'TEXT') {
    outputLabel = 'Text Output';
  } else if (morseOutputType === 'LIGHT') {
    outputLabel = 'Light Output';
  } else if (morseOutputType === 'AUDIO') {
    outputLabel = 'Audio Output';
  }

  return (
    <div className="morseContainer">
      <div className="inputOutputContainer">
        <h1>{outputLabel}</h1>
        {morseOutputType === 'TEXT' && (
          <TextOutput output={output}></TextOutput>
        )}
        {morseOutputType === 'LIGHT' && <LightOutput output={output} />}
        {morseOutputType === 'AUDIO' && <AudioOutput output={output} />}
      </div>
      <div>
        {morseTypeButtons.map((type) => (
          <button key={type} onClick={() => setMorseOutputType(type)}>
            {type.charAt(0) + type.slice(1).toLowerCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MorseOutputs;
