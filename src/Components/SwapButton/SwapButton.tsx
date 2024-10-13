import './styles.css';
import { useState } from 'react';

interface SwapButtonProps {
  isEnglishToMorse: boolean;
  setIsEnglishToMorse: React.Dispatch<React.SetStateAction<boolean>>;
}

const SwapButton: React.FC<SwapButtonProps> = ({
  isEnglishToMorse,
  setIsEnglishToMorse,
}) => {
  const [rotation, setRotation] = useState(0);
  return (
    <button
      id="arrowIcon"
      onClick={() => {
        setIsEnglishToMorse(!isEnglishToMorse);
        setRotation(rotation + 180);
      }}
      style={{
        transition: 'transform 0.5s ease',
        transform: `rotate(${rotation}deg)`,
      }}
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
  );
};

export default SwapButton;
