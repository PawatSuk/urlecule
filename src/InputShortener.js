import { useState } from "react";

/**
 * Input component that allows users to paste a URL and send it to be shortened.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.setInputValue - Updates the URL value in App.js
 */
const InputShortener = ({ setInputValue }) => {
  /**
   * Current value of the text input.
   * @type {[string, Function]}
   */
  const [value, setValue] = useState("");

  /**
   * Handles clicking the "short it" button.
   * Sends the URL up to the parent component (App.js).
   *
   * @function
   */
  const handleClick = () => {
    if (!value) return;
    setInputValue(value);
    setValue("");
  };

  return (
    <div className="inputContainer">
      <h1>
        URL <span>lecule</span>
      </h1>

      <div>
        <input
          type="text"
          placeholder="Paste link here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button onClick={handleClick}>short it</button>
      </div>
    </div>
  );
};

export default InputShortener;
