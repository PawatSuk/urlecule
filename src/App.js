import { useState, useEffect } from "react";
import "./App.css";
import InputShortener from "./InputShortener";
import LinkResult from "./LinkResult";

/**
 * Main application component for the URL Shortener.
 *
 * Handles the main state, link input, and link history.
 */
function App() {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([]);

  // Load history from localStorage on startup
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <div className="container">
      <InputShortener setInputValue={setInputValue} />

      <LinkResult
        inputValue={inputValue}
        history={history}
        setHistory={setHistory}
      />

      {/* SHOW HISTORY HERE */}
      <div className="history">
        <h3>Link History</h3>
        {history.map((item, i) => (
          <p key={i}>
            {item.long} → <a href={item.short}>{item.short}</a>
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
