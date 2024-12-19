import { useState } from "react";

const EditableKeys = ({ data, setData }) => {
  const [keys, setKeys] = useState(Object.keys(data[0])); // Initial keys
  const [tempKeys, setTempKeys] = useState([...keys]); // Temporary keys for editing

  const handleTempKeyChange = (index, newKey) => {
    const updatedTempKeys = [...tempKeys];
    updatedTempKeys[index] = newKey;
    setTempKeys(updatedTempKeys);
  };

  const handleConfirmKeyChange = (oldKey, newKey, index) => {
    if (!newKey || newKey === oldKey) return; // Ignore if no change

    // Update all rows with the new key
    const updatedData = data.map((row) => {
      const newRow = { ...row };
      newRow[newKey] = newRow[oldKey];
      delete newRow[oldKey];
      return newRow;
    });

    // Update the permanent keys
    const updatedKeys = [...keys];
    updatedKeys[index] = newKey;

    setKeys(updatedKeys);
    setTempKeys(updatedKeys); // Sync temporary keys with updated keys
    setData(updatedData);
  };

  const handleDeleteKey = (keyToDelete, index) => {
    // Remove the key from all rows
    const updatedData = data.map((row) => {
      const newRow = { ...row };
      delete newRow[keyToDelete];
      return newRow;
    });

    // Remove the key from the list of keys
    const updatedKeys = [...keys];
    updatedKeys.splice(index, 1); // Remove the key at the current index

    const updatedTempKeys = [...tempKeys];
    updatedTempKeys.splice(index, 1); // Sync temp keys

    setKeys(updatedKeys);
    setTempKeys(updatedTempKeys);
    setData(updatedData);
  };

  return (
    <div>
      <h2>Edit Keys</h2>
      {keys.map((key, index) => (
        <div
          key={key}
          style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
        >
          <input
            type="text"
            value={tempKeys[index]}
            onChange={(e) => handleTempKeyChange(index, e.target.value)}
          />
          <button
            onClick={() => handleConfirmKeyChange(key, tempKeys[index], index)}
          >
            Confirm
          </button>
          <button onClick={() => handleDeleteKey(key, index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EditableKeys;
