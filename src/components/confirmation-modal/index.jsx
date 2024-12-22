import React from "react";

const ConfirmationModal = ({
  message,
  onConfirmAll,
  onConfirmRow,
  onCancel,
}) => {
  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <p>{message}</p>
        <div style={modalStyles.buttons}>
          <button onClick={onConfirmAll} style={modalStyles.button}>
            Delete for all rows
          </button>
          {/* <button onClick={onConfirmRow} style={modalStyles.button}>
            Delete this row only
          </button> */}
          <button onClick={onCancel} style={modalStyles.button}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const modalStyles = {
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
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "300px",
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
    flexDirection: "column",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
  },
};

export default ConfirmationModal;
