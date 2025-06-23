import React, { useState } from "react";

function GalleryModal({ open, onClose, onSave }) {
  const [urls, setUrls] = useState(["", "", "", ""]);
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
          <h5 className="modal-title">Ajouter une galerie de photos</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          {[0, 1, 2, 3].map((i) => (
            <div className="form-group mb-3" key={i}>
              <label htmlFor={`url${i + 1}`}>Image URL {i + 1}</label>
              <input
                type="text"
                className="form-control"
                id={`url${i + 1}`}
                value={urls[i]}
                onChange={(e) =>
                  setUrls(
                    urls.map((u, idx) => (idx === i ? e.target.value : u))
                  )
                }
                placeholder="Enter image URL"
              />
            </div>
          ))}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              onSave && onSave(urls);
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

export default GalleryModal;
