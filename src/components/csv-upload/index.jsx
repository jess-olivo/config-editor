import React, { useState, useRef, useEffect } from "react";
import Papa from "papaparse";
import { useAtom } from "jotai";
import { dataAtom, groupingKeyAtom, headerKeysAtom } from "../../state";
import { useGroupedData } from "../../hooks/use-grouped-data"; // Import your grouping hook

export default function CSVUpload() {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const [headers, setHeaders] = useAtom(headerKeysAtom);
  const [groupingKey, setGroupingKey] = useAtom(groupingKeyAtom); // which key to group data by

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Clear previous errors
      setError(null);

      Papa.parse(file, {
        header: true, // first row is headers
        skipEmptyLines: true,
        dynamicTyping: true, // Automatically convert types like dates, numbers, etc.
        complete: (results) => {
          const rows = results.data;
          const headerKeys = Object.keys(rows[0] || {}); // Get headers from the first row of data

          if (rows.length === 0) {
            setError("CSV must have at least one data row.");
            return;
          }

          if (headerKeys.length === 0) {
            setError("CSV must have at least one header.");
            return;
          }

          // Set the parsed data and headers
          setData(rows);

          setHeaders(headerKeys); // Store header keys
          setDataSource(file.name); // Store the file name
        },
        error: (error) => {
          setError("Error parsing CSV file.");
          console.error("CSV Parse Error:", error);
        },
      });
    }
  };

  const clearCSVFile = () => {
    fileInputRef.current.value = "";
    setData([]); // Clear the parsed data
    setHeaders([]); // Reset headers
    setDataSource(null); // Reset data source
    setError(null); // Clear any previous error
  };

  const handleGroupingChange = (e) => {
    const key = e.target.value;
    setGroupingKey(key);
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
      {error && <p style={{ color: "red" }}>{error}</p>}
      {dataSource && (
        <>
          <p>File Uploaded: {dataSource}</p>
          <button onClick={clearCSVFile}>Clear File</button>
        </>
      )}
    </div>
  );
}
