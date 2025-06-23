import React from "react";

function ShortCodeModal({ open, onClose }) {
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
            Shortcode List
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
          <div id="content-text-modal" className="space-y-4">
            <p>
              Ajouter une image shortcode
              <br />
              <code className="block bg-gray-100 rounded px-2 py-1 text-sm text-gray-800">
                [image url="path/to/image.jpg"]
              </code>
            </p>
            <p>
              Ajouter une galerie d'images shortcode
              <br />
              <code className="block bg-gray-100 rounded px-2 py-1 text-sm text-gray-800">
                [gallery url1="path/to/image.jpg" url2="path/to/image.jpg"
                url3="path/to/image.jpg" url4="path/to/image.jpg"]
              </code>
            </p>
            <p>
              Ajouter une légende shortcode
              <br />
              <code className="block bg-gray-100 rounded px-2 py-1 text-sm text-gray-800">
                [caption text="caption goes here"]
              </code>
            </p>
            <p>
              Ajouter une vidéo Youtube shortcode
              <br />
              <code className="block bg-gray-100 rounded px-2 py-1 text-sm text-gray-800">
                [youtube id="hf4ji48276h"]
              </code>
            </p>
            <p>
              Ajouter une citation shortcode
              <br />
              <code className="block bg-gray-100 rounded px-2 py-1 text-sm text-gray-800">
                [blockquote text="type your text here."]
              </code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortCodeModal;
