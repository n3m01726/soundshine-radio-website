import React from "react";

function OffcanvasMenu({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="offcanvas-backdrop"
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
        className="offcanvas offcanvas-start show"
        style={{
          width: 300,
          background: "#fff",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1100,
          transition: "transform 0.3s",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="offcanvas-body">
          {children || <div>Contenu du menu...</div>}
        </div>
      </div>
    </div>
  );
}

export default OffcanvasMenu;
