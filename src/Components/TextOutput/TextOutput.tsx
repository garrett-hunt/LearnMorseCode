interface TextOutputProps {
  isDisabled: boolean;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setOutput: React.Dispatch<React.SetStateAction<string>>;
  translate: (input: string) => string;
}

export const TextOutput: React.FC<TextOutputProps> = ({
  isDisabled,
  input,
  setInput,
  setOutput,
  translate,
}) => {
  return (
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
  );
};
