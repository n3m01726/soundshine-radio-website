import React from "react";

function AboutModal({ open, onClose, description }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-0 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h5 className="text-lg font-bold uppercase tracking-wide text-gray-800">
            About
          </h5>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            aria-label="Fermer"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="px-6 py-5">
          <div id="content-text-modal">
            <p className="text-gray-700 text-base">
              {description || "Description à venir..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
