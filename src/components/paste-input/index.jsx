import React, { useState } from "react";
import { useAtom } from "jotai";
import { dataAtom, dataSourceAtom, headerKeysAtom } from "../../state";
import { parseCSVData } from "./utils";
import "./styles.css";

export default function PasteInput() {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useAtom(dataSourceAtom);
  const [headerKeys, setHeaderKeys] = useAtom(headerKeysAtom);
  const [csvText, setCsvText] = useState("");
  const [error, setError] = useState("");

  // Handle text input change
  const handleTextChange = (e) => {
    setCsvText(e.target.value);
    setError("");
  };

  // Handle CSV file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result;
        parseCSVData(
          fileContent,
          setData,
          setHeaderKeys,
          setError,
          setDataSource,
          true
        );
      };
      reader.readAsText(file);
    }
  };

  // Handle parse CSV button click (for pasted data)
  const parseCSV = () => {
    if (!csvText) {
      setError(
        "Please paste your data as tab separated values with a header row."
      );
      return;
    }
    parseCSVData(
      csvText.trim(),
      setData,
      setHeaderKeys,
      setError,
      setDataSource
    );
  };

  // Clear CSV input and reset state
  const clearText = () => {
    setCsvText("");
    setError("");
    setData([]);
    setHeaderKeys([]);
    setDataSource(null);
  };

  return (
    <div className="paste-input-container">
      <h2>Paste TSV (Tab Separated Values) or Upload CSV</h2>
      <textarea
        className="paste-input-textarea"
        rows={10}
        value={csvText}
        onChange={handleTextChange}
        placeholder="Paste your TSV data here (first row should be headers)"
      />
      <div className="paste-input-btns-container">
        <button
          className="btn paste-input-btn paste-input-parse-btn"
          onClick={parseCSV}
        >
          Parse Data
        </button>
        <button
          className="btn paste-input-btn paste-input-clear-btn"
          onClick={clearText}
        >
          Clear
        </button>
      </div>

      <div className="paste-input-file-upload-container">
        <input type="file" accept=".csv" onChange={handleFileUpload} />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
