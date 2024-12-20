import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { useAtom } from "jotai";
import { dataAtom, dataSourceAtom } from "../../state";

export default function CSVUpload({ onParseComplete }) {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useState(null);
  const fileInputRef = useRef(null);
  const [hasFile, setHasFile] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: false, // First, treat everything as raw data
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;
          if (rows.length < 2) {
            alert("CSV must have at least two rows (1st row + headers).");
            return;
          }
          const headers = rows[1]; // The second row is the headers
          const dataRows = rows.slice(2); // Rows after the headers

          const jsonData = dataRows.map((row) =>
            headers.reduce((acc, header, index) => {
              acc[header] = row[index];
              return acc;
            }, {})
          );

          onParseComplete(jsonData, "CSV");
          setHasFile(true);
        },
      });
    }
  };

  const clearCSVFile = () => {
    fileInputRef.current.value = ""; // Reset the file input
    setData([]); // Clear the parsed data
    setDataSource(null); // Reset the data source
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
      {hasFile ? <button onClick={clearCSVFile}>Clear File</button> : null}
    </div>
  );
}
