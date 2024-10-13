interface MorseInputProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => void;
}

export const MorseInput: React.FC<MorseInputProps> = ({
  input,
  setInput,
  handleChange,
}) => {
  return (
    <div className="inputContainer">
      <h1>Morse Input</h1>
      <textarea
        name="MorseInput"
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

export default MorseInput;
