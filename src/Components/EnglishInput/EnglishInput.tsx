import './styles.css';

interface EnglishInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

const EnglishInput: React.FC<EnglishInputProps> = ({
  input,
  setInput,
  handleChange,
}) => {
  return (
    <div className="inputOutputContainer">
      <h1>English Input</h1>
      <textarea
        name="englishInput"
        value={input}
        placeholder={'Input a value to be translated'}
        onChange={(event) => {
          const newInput = event.target.value;
          setInput(newInput);
          handleChange(event, setInput);
        }}
      ></textarea>
    </div>
  );
};

export default EnglishInput;
