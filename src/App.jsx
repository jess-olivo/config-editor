import { useAtomValue } from "jotai";
import JSONOutput from "./components/json-output";
import CSVUpload from "./components/csv-upload";
import CSVPasteInput from "./components/csv-paste-input";
import KeyEditor from "./components/key-editor";
import RowEditor from "./components/row-editor";
import BackToTop from "./components/back-to-top";
import WarningModal from "./components/warning-modal";
import { useSetData } from "./hooks/useSetData";
import {
  dataAtom,
  dataSourceAtom,
  // pendingDataAtom,
  // showModalAtom,
} from "./state";

import "./App.css";

function App() {
  const data = useAtomValue(dataAtom);

  const handleJsonParse = useSetData();
  const onParseComplete = (parsedData, dataSource) => {
    handleJsonParse(parsedData, dataSource);
  };
  // const [pendingData, setPendingData] = useAtom(pendingDataAtom);
  // const [showModal, setShowModal] = useAtom(showModalAtom);

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

  return (
    <div className="app-container">
      <h1>Config Editor</h1>

      {Object.keys(data).length ? (
        <button className="clear-input" onClick={() => setData({})}>
          Clear Input
        </button>
      ) : null}

      <div className="input-container">
        <CSVUpload onParseComplete={onParseComplete} />

        <CSVPasteInput onParseComplete={onParseComplete} />
      </div>

      {data.length > 0 && (
        <>
          {/* {Object.keys(data).length ? (
            <button
              onClick={scrollToJsonResults}
              style={{ marginBottom: "20px" }}
            >
              Go to JSON Results
            </button>
          ) : null} */}
          <KeyEditor />
          <div className="main-container">
            <RowEditor />
            <JSONOutput />
          </div>
        </>
      )}
      <BackToTop />
    </div>
  );
}

export default App;
