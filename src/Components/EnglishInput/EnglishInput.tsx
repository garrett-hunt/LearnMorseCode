import './styles.css';

interface EnglishInputProps {
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

const EnglishInput: React.FC<EnglishInputProps> = ({
  input,
  setInput,
  setOutput,
  handleChange,
  isDisabled,
  translate,
}) => {
  return (
    <div className="inputContainer">
      <h1>English Input</h1>
      <textarea
        disabled={!isDisabled}
        name="englishInput"
        value={input}
        placeholder={isDisabled ? 'Input a value to be translated' : ''}
        onChange={(event) => {
          if (isDisabled) {
            const newInput = event.target.value;
            setInput(newInput);
            handleChange(event, setInput);
            setOutput(translate(newInput));
          }
        }}
      ></textarea>
    </div>
  );
};

export default EnglishInput;
