import React, { useState } from "react";

function ImageModal({ open, onClose, onSave }) {
  const [url, setUrl] = useState("");
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        zIndex: 1050,
      }}
      onClick={onClose}
    >
      <div
        className="modal-dialog"
        style={{
          maxWidth: 400,
          margin: "10vh auto",
          background: "#fff",
          borderRadius: 8,
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 className="modal-title">Ajouter une image</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="imageUrl"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onSave && onSave(url);
              onClose();
            }}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageModal;
