import { useState } from "react";
import JSONInput from "./components/json-input";
import JSONOutput from "./components/json-output";
import CSVUpload from "./components/csv-upload";
import EditableKeys from "./components/editable-keys";
import RowEditor from "./components/row-editor";
import BackToTop from "./components/back-to-top";
import "./App.css";

function App() {
  const [jsonData, setJsonData] = useState({});

  // const renderOutputJson = () => {};

  const scrollToJsonResults = () => {
    const jsonSection = document.querySelector(".json-results-container");
    if (jsonSection) {
      jsonSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="app-container">
      <h1>Config Editor</h1>
      <div className="input-container">
        <CSVUpload onParseComplete={setJsonData} />
        <span>or</span>
        <JSONInput onParseComplete={setJsonData} />
      </div>
      {Object.keys(jsonData).length ? (
        <button onClick={scrollToJsonResults} style={{ marginBottom: "20px" }}>
          Go to JSON Results
        </button>
      ) : null}

      {jsonData.length > 0 && (
        <>
          <EditableKeys data={jsonData} setData={setJsonData} />
          <RowEditor data={jsonData} setData={setJsonData} />
          <h2>JSON Data</h2>
          <JSONOutput data={jsonData} />
        </>
      )}
      <BackToTop />
    </div>
  );
}

export default App;
