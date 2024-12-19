import React, { useState } from "react";
import Papa from "papaparse";

export default function CSVUpload({ onParseComplete }) {
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

          onParseComplete(jsonData);
        },
      });
    }
  };

  return (
    <div className="csv-input-container">
      <h2>Upload CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}
