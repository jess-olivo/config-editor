import React, { useState } from "react";
import { useAtom, useSetAtom } from "jotai";
import { dataAtom, headerKeysAtom } from "../../state";
import { useGroupedData } from "../../hooks/use-grouped-data";
import "./styles.css";

const RowEditor = () => {
  const [data, setData] = useAtom(dataAtom);
  const [editingKey, setEditingKey] = useState(null);
  const [editingRowIndex, setEditingRowIndex] = useState(null);
  const [tempValue, setTempValue] = useState(""); // Temp value for editing
  const [isDeletingKey, setIsDeletingKey] = useState(null); // Track delete state
  const setHeaderKeys = useSetAtom(headerKeysAtom);
  const { groupingKey, resetToDefaultGroup } = useGroupedData();
  const handleInputChange = (value) => {
    setTempValue(value);
  };

  const handleEdit = (key, rowIndex, currentValue) => {
    setEditingKey(key);
    setEditingRowIndex(rowIndex);
    setTempValue(currentValue);
  };

  const saveSingleRow = () => {
    const updatedData = [...data];
    updatedData[editingRowIndex] = {
      ...updatedData[editingRowIndex],
      [editingKey]: tempValue,
    };
    setData(updatedData);
    cancelEdit();
  };

  const saveAllRows = () => {
    const updatedData = data.map((row) => ({
      ...row,
      [editingKey]: tempValue,
    }));
    setData(updatedData);
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingKey(null);
    setEditingRowIndex(null);
    setTempValue("");
  };

  const initiateDelete = (key, rowIndex) => {
    setIsDeletingKey({ key, rowIndex });
  };

  const cancelDelete = () => {
    setIsDeletingKey(null);
  };

  // TODO
  // const deleteForRow = () => {
  //   const { key, rowIndex } = isDeletingKey;
  //   const updatedData = [...data];
  //   delete updatedData[rowIndex][key];
  //   setData(updatedData);
  //   setIsDeletingKey(null);
  // };

  const deleteForAllRows = () => {
    const { key } = isDeletingKey;
    const updatedData = data.map((row) => {
      const newRow = { ...row };
      delete newRow[key];
      return newRow;
    });

    const remainingKeys = Object.keys(updatedData[0] || {});
    if (remainingKeys.length === 0) {
      alert("Cannot delete the last key. At least one key must remain.");
      cancelDelete();
      return;
    }

    setData(updatedData);
    setHeaderKeys(Object.keys(updatedData[0]));
    setIsDeletingKey(null);

    if (groupingKey === key) resetToDefaultGroup();
  };

  if (data.length === 0) {
    return <p>No data available. Please upload a new file or add data.</p>;
  }

  return (
    <div className="row-editor-container">
      <h2 className="section-header">Edit Rows</h2>
      {data.map((row, rowIndex) => (
        <div className="row-content" key={rowIndex}>
          <h3 className="row-content-title">Row {rowIndex + 1}</h3>

          {Object.entries(row).map(([key, value]) => (
            <div className="row-content-item" key={key}>
              <span className="row-content-item-key">{key}</span>
              {editingKey === key && editingRowIndex === rowIndex ? (
                <input
                  className="row-content-item-value"
                  value={tempValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              ) : (
                <span className="row-content-item-value">{value}</span>
              )}
              <div
                className={`row-content-btns-container ${
                  (isDeletingKey?.key === key &&
                    isDeletingKey?.rowIndex === rowIndex) ||
                  (editingKey === key && editingRowIndex === rowIndex)
                    ? "single-col"
                    : ""
                }`}
              >
                {editingKey || isDeletingKey?.key === key ? null : (
                  <button
                    className="row-content-item-btn row-edit-btn btn"
                    onClick={() => handleEdit(key, rowIndex, value)}
                  >
                    Edit
                  </button>
                )}

                {editingKey === key && editingRowIndex === rowIndex && (
                  <div className="edit-actions">
                    <button
                      className="btn edit-options-btn save-btn"
                      onClick={saveSingleRow}
                    >
                      Save Row
                    </button>
                    <button
                      className="btn edit-options-btn save-all-btn"
                      onClick={saveAllRows}
                    >
                      Save All Rows
                    </button>
                    <button
                      className="btn edit-options-btn cancel-btn"
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                )}

                {isDeletingKey?.key === key &&
                isDeletingKey.rowIndex === rowIndex ? (
                  <div className="delete-actions">
                    <button
                      className="btn delete-options-btn delete-all-btn"
                      onClick={deleteForAllRows}
                    >
                      Delete All
                    </button>
                    <button
                      className="btn delete-options-btn cancel-btn"
                      onClick={cancelDelete}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    className="row-content-item-btn row-delete-btn btn"
                    onClick={() => initiateDelete(key, rowIndex)}
                  >
                    X
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RowEditor;
