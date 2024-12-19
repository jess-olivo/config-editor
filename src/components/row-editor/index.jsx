import React, { useState } from "react";
import ConfirmationModal from "../confirmation-modal"; // Import the modal

const RowEditor = ({ data, setData }) => {
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

    setData(updatedData); // Update the data
    setModalVisible(false); // Close the modal
  };

  const handleCancelDelete = () => {
    setModalVisible(false); // Close the modal without making changes
  };

  if (data.length === 0) {
    return <p>No data available. Please upload a new file or add data.</p>;
  }

  return (
    <div>
      <h2>Edit Rows</h2>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          style={{
            marginBottom: "20px",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h3>Row {rowIndex + 1}</h3>
          {Object.entries(row).map(([key, value]) => (
            <div
              key={key}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "10px",
              }}
            >
              <span>
                <strong>{key}:</strong> {value}
              </span>
              <button onClick={() => handleDeleteKeyValue(rowIndex, key)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      ))}

      {isModalVisible && (
        <ConfirmationModal
          message={`Do you want to delete the key "${keyToDelete}"?`}
          onConfirmAll={handleConfirmDeleteForAll}
          onConfirmRow={handleConfirmDeleteForRow}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default RowEditor;
