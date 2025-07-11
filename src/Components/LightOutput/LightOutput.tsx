import { useState } from 'react';

interface LightOutputProps {
  output: string;
}

export const LightOutput: React.FC<LightOutputProps> = ({ output }) => {
  const [morseLight, setMorseLight] = useState<Boolean>(false);
  const [activationText, setActivationText] = useState('Click to Play');

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

  return (
    <textarea
      className={'morseLight'}
      name="morseLightOutput"
      readOnly
      value={activationText}
      onClick={() => {
        if (activationText) {
          playLightTranslation(output);
        }
      }}
      style={{ backgroundColor: morseLight ? 'yellow' : 'rgb(60, 60, 60)' }}
    >
      Play
    </textarea>
  );
};
