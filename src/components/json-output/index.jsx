import React from "react";
import "./styles.css";

export default function JSONOutput({ data }) {
  // Validate if data is an array or object and stringify it
  const handleCopyToClipboard = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);
      navigator.clipboard.writeText(jsonString).then(
        () => {
          alert("JSON copied to clipboard!");
        },
        (err) => {
          alert("Failed to copy JSON: " + err);
        }
      );
    } catch (err) {
      alert("Failed to copy invalid JSON: " + err.message);
    }
  };

  // Check if data is valid
  const isValidJson = data && (Array.isArray(data) || typeof data === "object");

  return (
    <div className="json-results-container">
      <h3 className="json-output-header">Resulting JSON</h3>
      {isValidJson ? (
        <div>
          <pre className="results-json">{JSON.stringify(data, null, 2)}</pre>
          <button className="copy-btn" onClick={handleCopyToClipboard}>
            Copy JSON to Clipboard
          </button>
        </div>
      ) : (
        <p>No valid data available to display as JSON.</p>
      )}
    </div>
  );
}
