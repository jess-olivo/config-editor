import Papa from "papaparse";

export function parseCSVData(
  csvText,
  setData,
  setHeaders,
  setError,
  setDataSource,
  isFile = false
) {
  // If it's pasted data (not from a file), we'll convert TSV to CSV format
  const processData = isFile ? csvText : convertTSVtoCSV(csvText);

  // Use Papa Parse to parse CSV/TSV data
  Papa.parse(processData, {
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

      setDataSource(isFile ? "FILE_UPLOAD" : "CSV_PASTE"); // Store the source (file or paste)
    },
    error: (error) => {
      setError("Error parsing CSV data.");
      console.error("CSV Parse Error:", error);
    },
  });
}

// Helper function to convert TSV to CSV format
function convertTSVtoCSV(text) {
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
}
