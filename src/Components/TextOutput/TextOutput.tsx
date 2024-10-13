interface TextOutputProps {
  output: string;
}

export const TextOutput: React.FC<TextOutputProps> = ({ output }) => {
  return (
    <textarea
      readOnly
      name="morseTextOutput"
      value={output}
      placeholder={'output a value to be translated'}
    ></textarea>
  );
};
