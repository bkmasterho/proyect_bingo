import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../helpers/bingoServices'

const fetcher = (endpoint) =>
  sendRequest({
    endpoint,
    method: 'get',
  })

export default function Compradores() {
  const { data, error, isLoading } = useSWR('/api/compradores', fetcher)
  const navigate = useNavigate()

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error</p>

  const compradores = data?.data ?? []
  const columnas = compradores.length ? Object.keys(compradores[0]) : []

  return (


      <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Compradores
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          
          {/* Header */}
          <thead className="bg-gradient-to-r from-sky-600 to-sky-500">
            <tr>
              {columnas.map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-sm font-semibold text-white uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-gray-100">
            {compradores.map((comprador) => (
              <tr
                key={comprador.id}
                onClick={() =>
                  navigate(`/admin/Compradores/${comprador.id}/compras`)
                }
                className="cursor-pointer hover:bg-sky-50 even:bg-gray-50 transition-colors"
              >
                {columnas.map((col) => (
                  <td
                    key={col}
                    className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap"
                  >
                    {comprador[col]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>

  )
}