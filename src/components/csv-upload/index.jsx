import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { useAtom } from "jotai";
import { dataAtom, dataSourceAtom } from "../../state";

export default function CSVUpload({ onParseComplete }) {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useState(null);
  const [hasFile, setHasFile] = useState(false);
  const [error, setError] = useState(null); // New state to handle errors
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clear any previous errors
      setError(null);

      Papa.parse(file, {
        header: false, // First, treat everything as raw data
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;
          if (rows.length < 2) {
            setError("CSV must have at least two rows (1st row + headers).");
            return;
          }
          const headers = rows[1]; // The second row is the headers
          const dataRows = rows.slice(2); // Rows after the headers

          if (dataRows.length === 0) {
            setError("CSV must have at least one data row.");
            return;
          }

          const jsonData = dataRows.map((row) =>
            headers.reduce((acc, header, index) => {
              acc[header] = row[index];
              return acc;
            }, {})
          );

          onParseComplete(jsonData, "CSV");
          setData(jsonData); // Store data in atom
          setDataSource(file.name); // Store the file name or source
          setHasFile(true);
        },
      });
    }
  };

  const clearCSVFile = () => {
    fileInputRef.current.value = ""; // Reset the file input
    setData([]); // Clear the parsed data
    setDataSource(null); // Reset the data source
    setHasFile(false); // Reset file uploaded status
    setError(null); // Clear any previous error
  };

  return (
    <div className="csv-input-container">
      <h2>Upload CSV</h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        ref={fileInputRef}
      />
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Show errors */}
      {hasFile ? (
        <>
          <p>File Uploaded: {dataSource}</p>
          <button onClick={clearCSVFile}>Clear File</button>
        </>
      ) : null}
    </div>
  );
}
