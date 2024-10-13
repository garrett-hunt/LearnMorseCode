import './styles.css';
import React, { useRef, useState } from 'react';

type MorseType = 'TEXT' | 'LIGHT' | 'AUDIO';

interface MorseInputProps {
  morseOutputType?: MorseType;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  isDisabled: boolean;
  translate: (input: string) => string;
}

const morseTypes: MorseType[] = ['TEXT', 'LIGHT', 'AUDIO'];

const MorseInput: React.FC<MorseInputProps> = ({
  input,
  setInput,
  setOutput,
  isDisabled,
  translate,
}) => {
  const [morseOutputType, setMorseOutputType] = useState<MorseType>('TEXT');
  const [morseLight, setMorseLight] = useState<Boolean>(false);
  const [activationText, setActivationText] = useState('Click to Play');

  const dotRef = useRef<HTMLAudioElement>(null);
  const dashRef = useRef<HTMLAudioElement>(null);

  const playLightTranslation = async (output: string) => {
    const newCharPause = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setMorseLight(false);
          resolve();
        }, 300);
      });
    };

    const playDotLight = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setMorseLight(false);
          resolve();
        }, 100);
        newCharPause();
        setMorseLight(true);
      });
    };

    const playDashLight = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setMorseLight(false);
          resolve();
        }, 300);
        newCharPause();
        setMorseLight(true);
      });
    };

    const newWordPause = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setMorseLight(false);
          resolve();
        }, 700);
      });
    };

    setActivationText('');
    const fixedOutput = output.replace('?', '');
    await newWordPause();

    for (const char of fixedOutput) {
      if (char === '.') {
        await playDotLight();
        await newCharPause();
      } else if (char === '-') {
        await playDashLight();
        await newCharPause();
      } else {
        await newWordPause();
      }
    }
    setActivationText('Click to Play');
  };

  const playAudioTranslation = async (output: string) => {
    const newCharPause = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 300);
      });
    };

    const playDotAudio = () => {
      return new Promise<void>((resolve) => {
        if (dotRef.current) {
          console.log('dot');
          dotRef.current.play().then(() => {
            setTimeout(() => {
              resolve();
            }, 400);
          });
        }
      });
    };

    const playDashAudio = () => {
      return new Promise<void>((resolve) => {
        if (dashRef.current) {
          dashRef.current.play().then(() => {
            console.log('dash');
            setTimeout(() => {
              resolve();
            }, 500);
          });
        }
      });
    };

    const newWordPause = () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 400);
      });
    };

    setActivationText('');
    const fixedOutput = output.replace('?', '');
    await newWordPause();

    for (const char of fixedOutput) {
      if (char === '.') {
        await playDotAudio();
        await newCharPause();
      } else if (char === '-') {
        await playDashAudio();
        await newCharPause();
      } else {
        await newWordPause();
      }
    }
    setActivationText('Click to Play');
  };

  return (
    <div className="morseContainer">
      <div className="inputContainer">
        <h1>Morse Code</h1>
        {(morseOutputType === 'TEXT' || !isDisabled) && (
          <textarea
            disabled={isDisabled}
            name="morseTextInput"
            value={input}
            placeholder={!isDisabled ? 'Input a value to be translated' : ''}
            onChange={(event) => {
              if (!isDisabled) {
                const newInput = event.target.value;
                setInput(newInput);
                setOutput(() => translate(newInput));
              }
            }}
          ></textarea>
        )}
        {morseOutputType === 'LIGHT' && isDisabled && (
          <textarea
            className={'morseLight'}
            name="morseLightInput"
            readOnly
            unselectable="on"
            value={activationText}
            style={{
              backgroundColor: morseLight
                ? 'rgb(255, 255, 0)'
                : 'rgb(59, 59, 59)',
            }}
            onClick={() => {
              playLightTranslation(input);
            }}
          >
            Play
          </textarea>
        )}

        <audio ref={dashRef} src="morse-dash-audio.m4a" preload="auto" />
        <audio ref={dotRef} src="morse-dot-audio.m4a" preload="auto" />

        {morseOutputType === 'AUDIO' && isDisabled && (
          <textarea
            className={'morseAudio'}
            name="morseAudioInput"
            readOnly
            value={activationText}
            onClick={() => {
              playAudioTranslation(input);
            }}
          >
            Play
          </textarea>
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

export default MorseInput;
