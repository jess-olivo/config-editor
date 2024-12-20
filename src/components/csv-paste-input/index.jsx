import React, { useState } from "react";
import { useAtom } from "jotai";
import { dataAtom, dataSourceAtom } from "../../state";

export default function CSVPasteInput({ onParseComplete }) {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useAtom(dataSourceAtom);
  const [csvText, setCsvText] = useState("");
  const [error, setError] = useState("");

  // Handle text input change
  const handleTextChange = (e) => {
    setCsvText(e.target.value);
    setError("");
  };

  // Convert TSV to CSV format
  const convertTSVtoCSV = (text) => {
    return text
      .split("\n")
      .map((line) =>
        line
          .split("\t")
          .map((value) => {
            // Escape values with commas or double quotes
            if (value.includes(",") || value.includes('"')) {
              return `"${value.replace(/"/g, '""')}"`; // Escape double quotes
            }
            return value;
          })
          .join(",")
      )
      .join("\n");
  };

  // Parse the text as CSV
  const parseCSV = () => {
    try {
      // Convert TSV to CSV
      const csvData = convertTSVtoCSV(csvText.trim());

      // Parse the CSV into rows and columns
      const rows = csvData.split("\n").map((row) =>
        row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g)?.map(
          (cell) => cell.replace(/^"(.*)"$/, "$1").replace(/""/g, '"') // Unescape quotes
        )
      );

      if (rows.length < 2 || !rows[0]) {
        throw new Error(
          "CSV must have at least one header row and one data row."
        );
      }

      // Extract headers and data
      const headers = rows[0].map((header) => header.trim());
      const parsedData = rows
        .slice(1)
        .filter((row) => row && row.length === headers.length) // Filter out empty or invalid rows
        .map((row) =>
          row.reduce((acc, value, index) => {
            acc[headers[index]] = value.trim();
            return acc;
          }, {})
        );

      if (parsedData.length === 0) {
        throw new Error("No valid data rows found. Please check your input.");
      }

      // Update state and notify the parent
      setData(parsedData);
      setDataSource("CSV_PASTE");
      onParseComplete(parsedData);
    } catch (err) {
      setError(err.message || "Invalid CSV format. Please check your input.");
    }
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
      <textarea
        rows={10}
        value={csvText}
        onChange={handleTextChange}
        placeholder="Paste your TSV/CSV data here (first row should be headers)"
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
