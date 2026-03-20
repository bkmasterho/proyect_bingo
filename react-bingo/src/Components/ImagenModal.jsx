import React from "react";
import Modal from "react-modal";

// IMPORTANTE: si no lo has hecho aún, debes setear el root para accesibilidad
Modal.setAppElement("#root");

export default function ImagenModal({ isOpen, onClose, src, alt }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative mx-auto mt-20 max-w-3xl w-full bg-white rounded-2xl shadow-lg p-4 outline-none"
      overlayClassName="fixed inset-0 bg-black/70 flex items-start justify-center z-50"
      closeTimeoutMS={250}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{alt || "Imagen"}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>
      </div>

      {/* Imagen */}
      <div className="flex justify-center">
        <img
          src={src}
          alt={alt}
          className="max-h-[80vh] max-w-full rounded shadow-md"
        />
      </div>
    </Modal>
  );
}