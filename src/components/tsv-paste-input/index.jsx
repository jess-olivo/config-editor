import React, { useState } from "react";
import { useAtom } from "jotai";
import { dataAtom, dataSourceAtom } from "../../state";
import Papa from "papaparse";

export default function TSVPasteInput() {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useAtom(dataSourceAtom);
  const [csvText, setCsvText] = useState("");
  const [error, setError] = useState("");

  // Handle text input change
  const handleTextChange = (e) => {
    setCsvText(e.target.value);
    setError("");
  };

  const parseCSV = () => {
    Papa.parse(csvText, {
      delimiter: "\t",
      header: true, // Treat first row as headers
      skipEmptyLines: true,
      dynamicTyping: true, // Automatically convert types (e.g., strings to numbers)
      complete: (result) => {
        if (result.errors.length > 0) {
          setError("Invalid CSV/TSV format. Please check your input.");
          console.error(result.errors);
        } else {
          // Set the parsed data and source
          setData(result.data);
          setDataSource("TSV_PASTE");
        }
      },
      error: (err) => {
        setError(
          err.message || "Parsing error occurred. Please check your input."
        );
        console.error(err);
      },
    });
  };

  // Clear CSV input and reset state
  const clearText = () => {
    setCsvText("");
    setError("");
    setData([]);
    setDataSource(null);
  };

  return (
    <div>
      <h2>Paste TSV</h2>
      <textarea
        rows={10}
        value={csvText}
        onChange={handleTextChange}
        placeholder="Paste your TSV data here (first row should be headers)"
        style={{ width: "100%", fontFamily: "monospace" }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={parseCSV} style={{ marginRight: "10px" }}>
          Parse Data
        </button>
        <button onClick={clearText}>Clear</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
