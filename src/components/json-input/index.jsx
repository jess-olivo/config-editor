import { useState } from "react";
import "./styles.css";

export default function JSONInput({ onParseComplete }) {
  const [jsonInput, setJsonInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleJsonInputChange = (e) => setJsonInput(e.target.value);

  const handleParseJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      console.log({ parsedData });
      onParseComplete(parsedData);
      setErrorMsg("");
    } catch (error) {
      setErrorMsg("Invalid JSON. Please check your input.");
    }
  };

  return (
    <div className="input-container">
      {/* json input */}
      <textarea
        className="input-textarea"
        rows={10}
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder="Paste your JSON here"
      />
      <button className="input-parse-btn" onClick={handleParseJson}>
        Parse JSON
      </button>
      {errorMsg ? <p className="input-error-msg">{errorMsg}</p> : null}
    </div>
  );
}
