import { useAtom, useAtomValue, useSetAtom } from "jotai";
import JSONOutput from "./components/json-output";
import CSVUpload from "./components/csv-upload";
import PasteInput from "./components/paste-input";
import KeyEditor from "./components/key-editor";
import RowEditor from "./components/row-editor";
import BackToTop from "./components/back-to-top";
import { useSetData } from "./hooks/useSetData";
import { dataAtom, dataSourceAtom, headerKeysAtom } from "./state";

import "./App.css";

function App() {
  const [data, setData] = useAtom(dataAtom);
  const setHeaders = useSetAtom(headerKeysAtom);
  const setDataSource = useSetAtom(dataSourceAtom);

  const handleJsonParse = useSetData();
  const onParseComplete = (parsedData, dataSource) => {
    handleJsonParse(parsedData, dataSource);
  };

  const clear = () => {
    setData([]); // Clear the parsed data
    setHeaders([]); // Reset headers
    setDataSource(null); // Reset data source
  };

  return (
    <div className="app-container">
      <header>
        <h1>Config Editor</h1>
        <a
          className="readme"
          href="https://github.com/jess-olivo/config-editor"
        >
          readme
        </a>
      </header>
      <main>
        <div className="input-container">
          {/* <CSVUpload onParseComplete={onParseComplete} /> */}

          <PasteInput onParseComplete={onParseComplete} />

          {/* {Object.keys(data).length ? (
          <button className="clear-input-btn btn" onClick={clear}>
            Clear Input
          </button>
        ) : null} */}
        </div>

        {data.length > 0 && (
          <>
            <KeyEditor />
            <div className="main-container">
              <RowEditor />
              <JSONOutput />
            </div>
          </>
        )}
      </main>
      <BackToTop />
    </div>
  );
}

export default App;
