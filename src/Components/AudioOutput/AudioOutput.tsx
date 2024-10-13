import { useState, useRef } from 'react';

interface AudioOutputProps {
  input: string;
}

export const AudioOutput: React.FC<AudioOutputProps> = ({ input }) => {
  const [activationText, setActivationText] = useState('Click to Play');

  const dotRef = useRef<HTMLAudioElement>(null);
  const dashRef = useRef<HTMLAudioElement>(null);

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
    <>
      <audio ref={dashRef} src="morse-dash-audio.m4a" preload="auto" />
      <audio ref={dotRef} src="morse-dot-audio.m4a" preload="auto" />
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
    </>
  );
};
