import { useState } from "react";
import "./styles.css";

export default function JSONInput({ onParseComplete }) {
  const [jsonInput, setJsonInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleJsonInputChange = (e) => setJsonInput(e.target.value);

  const handleParseJson = () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      console.log({ parsedData });
      onParseComplete(parsedData, "JSON");
      setErrorMsg("");
    } catch (error) {
      setErrorMsg("Invalid JSON. Please check your input.");
    }
  };

  return (
    <div className="json-input-container">
      {/* json input */}
      <textarea
        className="json-input-textarea"
        rows={10}
        value={jsonInput}
        onChange={handleJsonInputChange}
        placeholder="Paste your JSON here"
      />
      <button className="input-parse-btn" onClick={handleParseJson}>
        Parse JSON
      </button>
      {errorMsg ? <p className="input-error-msg">{errorMsg}</p> : null}
    </div>
  );
}
// import React, { useState } from "react";
// import "./styles.css";

// export default function JSONInput({ onParseComplete }) {
//   const [jsonInput, setJsonInput] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [jsonData, setJsonData] = useState(null); // To hold parsed JSON for rendering

//   const handleJsonInputChange = (e) => setJsonInput(e.target.value);

//   const handleParseJson = () => {
//     try {
//       const parsedData = JSON.parse(jsonInput);
//       setJsonData(parsedData); // Save parsed JSON
//       setErrorMsg("");
//       onParseComplete(parsedData, "JSON");
//     } catch (error) {
//       setErrorMsg("Invalid JSON. Please check your input.");
//     }
//   };

//   const handleKeyChange = (path, newValue) => {
//     const newJsonData = { ...jsonData };
//     const keys = path.split("."); // Split path into keys for nested values

//     let current = newJsonData;
//     keys.forEach((key, index) => {
//       if (index === keys.length - 1) {
//         current[key] = newValue; // Set the new value at the correct path
//       } else {
//         current = current[key];
//       }
//     });

//     setJsonData(newJsonData); // Update jsonData state with new value
//     onParseComplete(newJsonData, "JSON");
//   };

//   const renderEditableFields = (obj, parentPath = "") => {
//     return Object.keys(obj).map((key) => {
//       const value = obj[key];
//       const path = parentPath ? `${parentPath}.${key}` : key; // Build the path for nested keys

//       if (typeof value === "object" && value !== null) {
//         // Recursively render nested objects
//         return (
//           <div key={path}>
//             <strong>{key}</strong>
//             <div style={{ paddingLeft: "20px" }}>
//               {renderEditableFields(value, path)} {/* Recursive call */}
//             </div>
//           </div>
//         );
//       }

//       // For primitive values (string, number, boolean, etc.), render an editable input
//       return (
//         <div key={path}>
//           <label>{key}</label>
//           <input
//             type="text"
//             value={value || ""}
//             onChange={(e) => handleKeyChange(path, e.target.value)}
//           />
//         </div>
//       );
//     });
//   };

//   return (
//     <div className="json-input-container">
//       <h2>Input JSON</h2>
//       <textarea
//         className="json-input-textarea"
//         rows={10}
//         value={jsonInput}
//         onChange={handleJsonInputChange}
//         placeholder="Paste your JSON here"
//       />
//       <button className="json-input-parse-btn" onClick={handleParseJson}>
//         Parse JSON
//       </button>
//       {errorMsg && <p className="json-input-error-msg">{errorMsg}</p>}

//       {/* Render Editable Fields for JSON */}
//       {jsonData && (
//         <div className="json-editor">
//           <h3>Edit JSON</h3>
//           {renderEditableFields(jsonData)}{" "}
//           {/* Recursively render the JSON structure */}
//         </div>
//       )}
//     </div>
//   );
// }
