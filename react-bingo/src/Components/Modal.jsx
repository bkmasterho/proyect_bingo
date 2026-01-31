import React from 'react'

export default function Modal({onClose}) {
  return (

    <>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        X
      </button>
      
      <h1>Holaaa</h1>
    </>

  )
}
