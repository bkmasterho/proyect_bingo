import React from "react";
import Modal from "react-modal";

export default function CartonesModal({ isOpen, onClose, cartones }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="relative mx-auto mt-20 max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 outline-none border border-[#f6bd0b]/20"
      overlayClassName="fixed inset-0 bg-black/50 flex items-start justify-center z-50"
      closeTimeoutMS={250}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-[10px] tracking-[3px] uppercase text-[#f6bd0b] font-bold mb-0.5">Compra</p>
          <h2 className="text-lg font-bold text-[#1a1b1f]">Cartones de la compra</h2>
          <span className="block w-8 h-[3px] bg-[#f6bd0b] rounded-full mt-1.5" />
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#1a1b1f] text-[#f6bd0b] font-bold text-sm hover:opacity-80 transition-opacity cursor-pointer"
        >
          ✕
        </button>
      </div>

      {/* Grid de cartones */}
      <div className="grid grid-cols-4 gap-3 max-h-[400px] overflow-y-auto pr-1">
        {cartones.length > 0 ? (
          cartones.map((carton) => (
            <div
              key={carton.id}
              className="border border-[#f6bd0b]/25 border-l-[3px] border-l-[#f6bd0b] bg-[#f6bd0b]/8 rounded-lg p-3 text-center font-bold text-[#1a1b1f] text-sm hover:bg-[#f6bd0b]/15 transition-colors"
            >
              #{carton.numero_carton}
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-gray-400 py-6">
            No hay cartones registrados
          </p>
        )}
      </div>
    </Modal>
  );
}