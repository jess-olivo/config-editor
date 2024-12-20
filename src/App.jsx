import { useAtom } from "jotai";
import JSONInput from "./components/json-input";
import JSONOutput from "./components/json-output";
import CSVUpload from "./components/csv-upload";
import CSVPasteInput from "./components/csv-paste-input";
import KeyEditor from "./components/key-editor";
import RowEditor from "./components/row-editor";
import BackToTop from "./components/back-to-top";
import WarningModal from "./components/warning-modal";
import {
  dataAtom,
  dataSourceAtom,
  // pendingDataAtom,
  // showModalAtom,
} from "./state";

import "./App.css";

function App() {
  const [data, setData] = useAtom(dataAtom);
  const [dataSource, setDataSource] = useAtom(dataSourceAtom);
  // const [pendingData, setPendingData] = useAtom(pendingDataAtom);
  // const [showModal, setShowModal] = useAtom(showModalAtom);
  // const [data, setData] = useState({});
  // const [dataSource, setDataSource] = useState(null); // Track the data source (CSV or JSON)

  const handleJsonParse = (parsedData, dataSource) => {
    setData(parsedData);
    setDataSource(dataSource);
  };

  // const [hasCsvData, setHasCsvData] = useState(false);
  // const [hasJsonInputData, setHasJsonInputData] = useState(false);

  // useEffect(() => {
  //   if (Object.keys(csvData).length) {
  //     setHasCsvData(true);
  //   }

  //   if (Object.keys(jsonInputData).length) {
  //     setHasJsonInputData(true);
  //   }
  // }, [csvData, jsonInputData]);
  // const [keys, setKeys] = useState([]); // Track editable keys

  // const renderOutputJson = () => {};

  const scrollToJsonResults = () => {
    const jsonSection = document.querySelector(".json-results-container");
    if (jsonSection) {
      jsonSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  console.log("Data passed to JSONOutput:", data);

  return (
    <div className="app-container">
      <h1>Config Editor</h1>

      {Object.keys(data).length ? (
        <button className="clear-input" onClick={() => setData({})}>
          Clear Input
        </button>
      ) : null}

      <div className="input-container">
        <CSVUpload onParseComplete={handleJsonParse} />

        <h2>Paste CSV</h2>
        <CSVPasteInput onParseComplete={handleJsonParse} />

        <JSONInput />
      </div>

      {Object.keys(data).length ? (
        <button onClick={scrollToJsonResults} style={{ marginBottom: "20px" }}>
          Go to JSON Results
        </button>
      ) : null}

      {data.length > 0 && (
        <>
          <div>
            <KeyEditor />
            <RowEditor />
          </div>
          <div>
            <h2>JSON Data</h2>
            <JSONOutput data={data} />
          </div>
        </>
      )}
      <BackToTop />
    </div>
  );
}

export default App;
