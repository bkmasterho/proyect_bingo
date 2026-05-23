import React from 'react'

export default function Modal({ onClose, imgCarton }) {
  return (
    <>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center
                   rounded-full bg-[#1a1b1f] border-2 border-[#f6bd0b] text-[#f6bd0b]
                   font-bold text-sm hover:bg-[#f6bd0b] hover:text-[#1a1b1f] transition-colors"
      >
        ✕
      </button>

      <img
        src={`${import.meta.env.VITE_API_URL}/storage/cartones/${imgCarton}`}
        alt={imgCarton}
        className="w-full h-full object-contain rounded-xl"
      />
    </>
  )
}