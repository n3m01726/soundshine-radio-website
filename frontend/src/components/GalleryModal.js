import React, { useState } from "react";

function GalleryModal({ open, onClose, onSave }) {
  const [urls, setUrls] = useState(["", "", "", ""]);
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
          <h5 className="text-lg font-bold text-gray-800">
            Ajouter une galerie de photos
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
          {[0, 1, 2, 3].map((i) => (
            <div className="mb-4" key={i}>
              <label
                htmlFor={`url${i + 1}`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Image URL {i + 1}
              </label>
              <input
                type="text"
                id={`url${i + 1}`}
                value={urls[i]}
                onChange={(e) =>
                  setUrls(
                    urls.map((u, idx) => (idx === i ? e.target.value : u))
                  )
                }
                placeholder="Enter image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-xl">
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition"
            onClick={onClose}
          >
            Fermer
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            onClick={() => {
              onSave && onSave(urls);
              onClose();
            }}
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryModal;
