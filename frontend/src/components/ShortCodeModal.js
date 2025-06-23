import React from "react";

function ShortCodeModal({ open, onClose }) {
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
        className="modal-dialog modal-dialog-centered"
        style={{
          maxWidth: 500,
          margin: "10vh auto",
          background: "#fff",
          borderRadius: 8,
          padding: 24,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h5 className="modal-title text-uppercase">Shortcode List</h5>
          <button
            type="button"
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <div id="content-text-modal">
            <p>
              Ajouter une image shortcode
              <br />
              <code>[image url="path/to/image.jpg"]</code>
            </p>
            <p>
              Ajouter une galerie d'images shortcode
              <br />
              <code>
                [gallery url1="path/to/image.jpg" url2="path/to/image.jpg"
                url3="path/to/image.jpg" url4="path/to/image.jpg"]
              </code>
            </p>
            <p>
              Ajouter une légende shortcode
              <br />
              <code>[caption text="caption goes here"]</code>
            </p>
            <p>
              Ajouter une vidéo Youtube shortcode
              <br />
              <code>[youtube id="hf4ji48276h"]</code>
            </p>
            <p>
              Ajouter une citation shortcode
              <br />
              <code>[blockquote text="type your text here."]</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShortCodeModal;
