// CompraTable.jsx
import React, { useState } from "react";
import CartonesModal from "./CartonesModal";
import ImagenModal from "./ImagenModal";

export default function CompraTable({ compras }) {
  const columnas = [
    { key: "id",          label: "ID"          },
    { key: "cedula",      label: "Cédula"      },
    { key: "fecha",       label: "Fecha"        },
    { key: "img_compra",  label: "Comprobante"  },
  ];

  const [modalOpen, setModalOpen]               = useState(false);
  const [selectedCartones, setSelectedCartones] = useState([]);
  const [modalOpenImagen, setModalOpenImagen]   = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  const abrirModalImagen = (src) => { setImagenSeleccionada(src); setModalOpenImagen(true); };
  const handleRowClick   = (compra) => { setSelectedCartones(compra.cartones ?? []); setModalOpen(true); };

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-[#f6bd0b]/20 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-[#f6bd0b]/15">

          {/* Header */}
          <thead className="bg-[#1a1b1f]">
            <tr>
              {columnas.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-4 text-left text-[11px] font-bold text-[#f6bd0b] uppercase tracking-[2px]"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-4 text-left text-[11px] font-bold text-[#f6bd0b] uppercase tracking-[2px]">
                Acciones
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-[#f6bd0b]/10">
            {compras.map((compra, idx) => (
              <tr
                key={compra.id}
                className={`transition-colors hover:bg-[#f6bd0b]/8 ${idx % 2 === 0 ? "bg-white" : "bg-[#f6bd0b]/5"}`}
              >
                {/* ID */}
                <td className="px-6 py-4 text-sm font-semibold text-[#1a1b1f]">
                  <span className="bg-[#1a1b1f] text-[#f6bd0b] text-xs font-bold px-2 py-0.5 rounded-md">
                    #{compra.id}
                  </span>
                </td>

                {/* Cédula */}
                <td className="px-6 py-4 text-sm text-[#1a1b1f]">
                  {compra.comprador?.cedula ?? "—"}
                </td>

                {/* Fecha */}
                <td className="px-6 py-4 text-sm text-[#1a1b1f]">
                  {compra.fecha ? new Date(compra.fecha).toLocaleDateString() : "—"}
                </td>

                {/* Comprobante */}
                <td className="px-6 py-4">
                  {compra.img_compra ? (
                    <img
                      src={`${import.meta.env.VITE_API_URL}/storage/${compra.img_compra}`}
                      alt="Comprobante"
                      className="h-12 w-12 rounded-lg object-cover cursor-pointer border-2 border-[#f6bd0b]/30 hover:border-[#f6bd0b] transition-colors"
                      onClick={() =>
                        abrirModalImagen(`${import.meta.env.VITE_API_URL}/storage/${compra.img_compra}`)
                      }
                    />
                  ) : (
                    <span className="text-gray-300 text-sm">—</span>
                  )}
                </td>

                {/* Acciones */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleRowClick(compra)}
                    className="bg-[#f6bd0b] text-[#1a1b1f] text-xs font-bold px-4 py-2 rounded-lg hover:opacity-85 transition-opacity cursor-pointer"
                  >
                    Ver cartones
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CartonesModal isOpen={modalOpen} onClose={() => setModalOpen(false)} cartones={selectedCartones} />
      <ImagenModal isOpen={modalOpenImagen} onClose={() => setModalOpenImagen(false)} src={imagenSeleccionada} alt="Comprobante" />
    </>
  );
}