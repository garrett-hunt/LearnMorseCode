import './styles.css';

const EnglishInput = ({
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
        type="text"
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
