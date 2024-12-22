import React from "react";
import { useAtomValue } from "jotai";
import { dataAtom, groupedDataAtom, groupingKeyAtom } from "../../state";
import "./styles.css";

export default function JSONOutput() {
  const data = useAtomValue(dataAtom);
  const groupedData = useAtomValue(groupedDataAtom);
  const groupingKey = useAtomValue(groupingKeyAtom);

  const handleCopyToClipboard = () => {
    const outputData = Object.keys(groupedData).length ? groupedData : data;
    try {
      const jsonString = JSON.stringify(outputData, null, 2);

      navigator.clipboard.writeText(jsonString);

      console.log("JSON copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy invalid JSON: " + err.message);
    }
  };

  const isValidJson = data && (Array.isArray(data) || typeof data === "object");

  const displayData = groupingKey === "none" ? data : groupedData;

  return (
    <div className="json-results-container">
      <h2 className="section-header">Resulting JSON</h2>

      {isValidJson ? (
        <pre className="results-json">
          <button className="copy-btn" onClick={handleCopyToClipboard}>
            Copy
          </button>
          {JSON.stringify(displayData, null, 2)}
        </pre>
      ) : (
        <p>No valid data available to display as JSON.</p>
      )}
    </div>
  );
}
