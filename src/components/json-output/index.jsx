import React from "react";
import "./styles.css";

export default function JSONOutput({ data }) {
  const handleCopyToClipboard = () => {
    try {
      const jsonString = JSON.stringify(data, null, 2);

      navigator.clipboard.writeText(jsonString);

      console.log("JSON copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy invalid JSON: " + err.message);
    }
  };

  const isValidJson = data && (Array.isArray(data) || typeof data === "object");

  return (
    <div className="json-results-container">
      <h3 className="json-output-header">Resulting JSON</h3>

      {isValidJson ? (
        <div>
          <pre className="results-json">
            <button className="copy-btn" onClick={handleCopyToClipboard}>
              Copy
            </button>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      ) : (
        <p>No valid data available to display as JSON.</p>
      )}
    </div>
  );
}
