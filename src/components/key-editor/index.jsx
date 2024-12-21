import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { dataAtom } from "../../state";
import GroupBy from "../group-by";
import "./styles.css";

const KeyEditor = () => {
  const [data, setData] = useAtom(dataAtom);
  const [keys, setKeys] = useState([]);
  const [tempKeys, setTempKeys] = useState({}); // Temporary storage for edits

  useEffect(() => {
    if (data.length > 0) {
      console.log(Object.keys(data)); // TODO
      setKeys(Object.keys(data[0])); // Initialize keys from data
    }
  }, [data]);

  const handleKeyChange = (oldKey, newKey) => {
    setTempKeys((prev) => ({
      ...prev,
      [oldKey]: newKey,
    }));
  };

  const handleConfirmKeyChange = (oldKey) => {
    const newKey = tempKeys[oldKey];
    if (!newKey || newKey === oldKey || keys.includes(newKey)) return; // Block empty, same or duplicate keys

    // Update data while maintaining key order
    const updatedData = data.map((row) => {
      const { [oldKey]: value, ...rest } = row;
      const newRow = {};
      keys.forEach((key) => {
        if (key === oldKey) {
          newRow[newKey] = value;
        } else {
          newRow[key] = row[key];
        }
      });

      return newRow;
    });

    // Update keys and data
    const updatedKeys = keys.map((key) => (key === oldKey ? newKey : key));
    setKeys(updatedKeys);
    setData(updatedData);

    // Remove the temp key after confirmation
    setTempKeys((prev) => {
      const { [oldKey]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleDeleteKey = (keyToDelete) => {
    const updatedKeys = keys.filter((key) => key !== keyToDelete);
    setKeys(updatedKeys);

    // Remove the key from all rows
    const updatedData = data.map(({ [keyToDelete]: _, ...rest }) => rest);
    setData(updatedData);
  };

  return (
    <div>
      <div className="edit-keys-container">
        <GroupBy className="edit-keys-groupby edit-keys-section" />
        <div className="edit-keys-edit-container edit-keys-section">
          <h2 className="edit-keys-edit-title section-header">Edit Keys</h2>
          <div className="edit-keys-items-container">
            {keys.map((key) => (
              <div
                key={key}
                className="edit-keys-item-container edit-keys-section"
              >
                <input
                  className="edit-keys-keys-input"
                  type="text"
                  value={tempKeys[key] !== undefined ? tempKeys[key] : key}
                  onChange={(e) => handleKeyChange(key, e.target.value)}
                  style={{ marginRight: "10px" }}
                />
                <button
                  className="btn edit-keys-item-btn edit-keys-item-confirm-btn"
                  onClick={() => handleConfirmKeyChange(key)}
                  disabled={
                    !tempKeys[key] || // Don't allow empty strings
                    tempKeys[key] === key || // Don't allow no actual change to the key
                    keys.includes(tempKeys[key]) // Don't allow duplicate keys
                  }
                >
                  Confirm
                </button>
                <button
                  className="btn edit-keys-item-btn edit-keys-item-delete-btn"
                  onClick={() => handleDeleteKey(key)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyEditor;
