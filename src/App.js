import { useState } from "react";
import "./App.css";
import InputShortener from "./InputShortener";
import LinkResult from "./LinkResult";

/**
 * Main application component for the URL Shortener.
 * It handles the main state and passes the input URL to child components.
 *
 * @component
 */
function App() {
  /**
   * The URL entered by the user.
   * @type {[string, Function]}
   */
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      {/* Input field where user enters URL */}
      <InputShortener setInputValue={setInputValue} />

      {/* Display shortened result */}
      <LinkResult inputValue={inputValue} />
    </div>
  );
}

export default App;
