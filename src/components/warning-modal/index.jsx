import React from "react";

const WarningModal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>Warning</h2>
        <p>
          Switching data sources will overwrite the current data. Are you sure?
        </p>
        <div style={styles.actions}>
          <button onClick={onConfirm} style={styles.button}>
            Yes
          </button>
          <button
            onClick={onCancel}
            style={{ ...styles.button, backgroundColor: "#f00" }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modal: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    textAlign: "center",
  },
  actions: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default WarningModal;
