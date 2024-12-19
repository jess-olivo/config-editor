import "./styles.css";

export default function JSONOutput({ data }) {
  return (
    <div className="json-results-container">
      <h3 className="json-output-header">Resulting JSON</h3>
      <pre className="results-json">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
