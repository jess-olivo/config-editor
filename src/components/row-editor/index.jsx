import React, { useState } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../../state";
import ConfirmationModal from "../confirmation-modal"; // Import the modal
import "./styles.css";

const RowEditor = () => {
  const [data, setData] = useAtom(dataAtom);
  const [isModalVisible, setModalVisible] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState(null);
  const [rowIndex, setRowIndex] = useState(null);

  const handleDeleteKeyValue = (rowIndex, keyToDelete) => {
    setRowIndex(rowIndex);
    setKeyToDelete(keyToDelete);
    setModalVisible(true); // Show the modal
  };

  const handleConfirmDeleteForAll = () => {
    // Delete the key from all rows
    const updatedData = data.map((row) => {
      const newRow = { ...row };
      delete newRow[keyToDelete];
      return newRow;
    });

    // Check if all keys are removed
    const remainingKeys = Object.keys(updatedData[0] || {});
    if (remainingKeys.length === 0) {
      alert("Cannot delete the last key. At least one key must remain.");
      setModalVisible(false);
      return;
    }

    setData(updatedData); // Update the data
    setModalVisible(false); // Close the modal
  };

  const handleConfirmDeleteForRow = () => {
    // Delete the key only from the specific row
    const updatedData = data.map((row, index) => {
      if (index === rowIndex) {
        const newRow = { ...row };
        delete newRow[keyToDelete];
        return newRow;
      }
      return row;
    });

    setData(updatedData);
    setModalVisible(false);
  };

  // Close the modal without making changes
  const handleCancelDelete = () => {
    setModalVisible(false);
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

              <span className="row-content-item-value">{value}</span>

              <button
                className="row-content-item-btn row-edit-btn"
                disabled
                onClick={() => {}}
              >
                Edit
              </button>

              <button
                className="row-content-item-btn row-delete-btn"
                onClick={() => handleDeleteKeyValue(rowIndex, key)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      ))}

      {isModalVisible ? (
        <ConfirmationModal
          message={`Do you want to delete the key "${keyToDelete}"?`}
          onConfirmAll={handleConfirmDeleteForAll}
          onConfirmRow={handleConfirmDeleteForRow}
          onCancel={handleCancelDelete}
        />
      ) : null}
    </div>
  );
};

export default RowEditor;
