import React from "react";

function OffcanvasMenu({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-start bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white shadow-2xl h-full w-72 max-w-full rounded-r-xl p-0 animate-slideInLeft relative"
        style={{ minHeight: "100vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h5 className="text-lg font-bold text-gray-800">Menu</h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Fermer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="px-6 py-5 overflow-y-auto h-[calc(100vh-72px)]">
          {children || <div>Contenu du menu...</div>}
        </div>
      </div>
    </div>
  );
}

export default OffcanvasMenu;
