import React, { useState } from "react";
import CartonesModal from "./CartonesModal";
import ImagenModal from "./ImagenModal"; // Ajusta la ruta según tu proyecto

export default function CompraTable({ compras }) {
  const columnas = [
    { key: "id", label: "ID" },
    { key: "cedula", label: "Cédula" },
    { key: "fecha", label: "Fecha" },
    { key: "img_compra", label: "Comprobante" },
  ];

  // estado para modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCartones, setSelectedCartones] = useState([]);

  //State para el modal de imagen
  const [modalOpenImagen, setModalOpenImagen] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState("");

  const abrirModalImagen = (src) => {
    setImagenSeleccionada(src);
    setModalOpenImagen(true);
  };

  const handleRowClick = (compra) => {
    setSelectedCartones(compra.cartones ?? []);
    setModalOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-sky-600 to-sky-500">
            <tr>
              {columnas.map((col) => (
                <th
                  key={col.key}
                  className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {compras.map((compra) => (
              <tr
                key={compra.id}
                className="hover:bg-sky-50 even:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-700">{compra.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {compra.comprador?.cedula ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {compra.fecha
                    ? new Date(compra.fecha).toLocaleDateString()
                    : "—"}
                </td>

                 <td className="px-6 py-4">
                    {compra.img_compra ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}/storage/${compra.img_compra}`}
                        alt="Comprobante"
                        className="h-12 w-12 rounded object-cover cursor-pointer"
                        onClick={() =>
                          abrirModalImagen(
                            `${import.meta.env.VITE_API_URL}/storage/${compra.img_compra}`
                          )
                        }
                      />
                    ) : (
                      "—"
                    )}
                 </td>

                  <td className="px-6 py-4">
                  <button
                    onClick={() => handleRowClick(compra)}
                    className="bg-sky-500 text-white px-3 py-1 rounded hover:bg-sky-700 text-sm"
                  >
                    Ver cartones
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

        {/* Modal de cartones */}
        <CartonesModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          cartones={selectedCartones}
        />

        {/* Modal Imagenes */}
        <ImagenModal
          isOpen={modalOpenImagen}
          onClose={() => setModalOpenImagen(false)}
          src={imagenSeleccionada}
          alt="Comprobante"
        />
    </>
  );
}