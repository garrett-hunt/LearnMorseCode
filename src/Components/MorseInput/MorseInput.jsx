import './styles.css';

const MorseInput = ({
  input,
  setInput,
  setOutput,
  handleChange,
  isDisabled,
  translate,
}) => {
  return (
    <div className="inputContainer">
      <h1>Morse Code</h1>
      <textarea
        disabled={isDisabled}
        type="text"
        name="morseInput"
        value={input}
        placeholder={!isDisabled ? 'Input a value to be translated' : ''}
        onChange={(event) => {
          if (!isDisabled) {
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

export default MorseInput;
