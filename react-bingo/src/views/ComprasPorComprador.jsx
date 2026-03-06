// pages/ComprasPorComprador.jsx
import React from "react"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { sendRequest } from "../helpers/bingoServices"
import CompraTable from "../Components/CompraTable"

const fetcher = (endpoint) =>
  sendRequest({ endpoint, method: "get" })

export default function ComprasPorComprador() {
  const { id } = useParams()

  const { data, error, isLoading } = useSWR(
    `/api/compradores/${id}/compras`,
    fetcher
  )

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error al cargar las compras</p>

  const compras = data?.data ?? []

  // Tomamos los datos del comprador de la primera compra
  const comprador = compras.length ? compras[0].comprador : null

  return (
    <div className="p-6">
      {comprador && (
        <div className="mb-6 p-5 rounded-xl bg-white border border-gray-200 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
            Datos del comprador
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-gray-700 text-sm">
            <div>
              <p className="text-gray-500">ID</p>
              <p className="font-semibold">{comprador.id}</p>
            </div>

            <div>
              <p className="text-gray-500">Nombre</p>
              <p className="font-semibold">{comprador.nombre}</p>
            </div>

            <div>
              <p className="text-gray-500">Apellido</p>
              <p className="font-semibold">{comprador.apellido}</p>
            </div>

            <div>
              <p className="text-gray-500">Cédula</p>
              <p className="font-semibold text-sky-600">{comprador.cedula}</p>
            </div>
          </div>
        </div>
      )}

      {/* Tabla reutilizable */}
      <CompraTable compras={compras} />
    </div>
  )
}