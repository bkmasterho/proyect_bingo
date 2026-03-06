import React from "react";
import Modal from "react-modal";

export default function CartonesModal({ isOpen, onClose, cartones }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative mx-auto mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-black/20 flex items-start justify-center z-50"
      closeTimeoutMS={250}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Cartones de la compra
        </h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 font-bold"
        >
          X
        </button>
      </div>

      {/* Grid de cartones */}
      <div className="grid grid-cols-4 gap-3 max-h-[400px] overflow-y-auto">
        {cartones.length > 0 ? (
          cartones.map((carton) => (
            <div
              key={carton.id}
              className="border border-gray-200 rounded p-3 text-center font-semibold bg-sky-50"
            >
              {carton.numero_carton}
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-500">
            No hay cartones
          </p>
        )}
      </div>
    </Modal>
  );
}