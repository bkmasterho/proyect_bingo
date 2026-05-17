import useSWR from 'swr'
import { useNavigate } from 'react-router-dom'
import { sendRequest } from '../helpers/bingoServices'

const fetcher = (endpoint) => sendRequest({ endpoint, method: 'get' })

export default function Compradores() {

  const { data, error, isLoading } = useSWR('/api/compradores', fetcher)
  const navigate = useNavigate()

  if (isLoading) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-[#1a1b1f] font-semibold animate-pulse">Cargando compradores...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center h-40">
      <p className="text-red-500 font-semibold">Error cargando compradores</p>
    </div>
  )

  const compradores = data?.data ?? []
  const columnas = compradores.length ? Object.keys(compradores[0]) : []

  return (
    <div className="p-6 pt-20 w-full">

      {/* Título */}
      <div className="mb-6">
        <p className="text-[10px] tracking-[3px] uppercase text-[#f6bd0b] font-bold mb-1">Admin</p>
        <h1 className="text-2xl font-bold text-[#1a1b1f]">Compradores</h1>
        <span className="block w-10 h-[3px] bg-[#f6bd0b] rounded-full mt-2" />
      </div>

      <div className="overflow-x-auto rounded-2xl border border-[#f6bd0b]/20 shadow-lg bg-white">
        <table className="min-w-full divide-y divide-[#f6bd0b]/15">

          {/* Header */}
          <thead className="bg-[#1a1b1f]">
            <tr>
              {columnas.map((col) => (
                <th
                  key={col}
                  className="px-6 py-4 text-left text-[11px] font-bold text-[#f6bd0b] uppercase tracking-[2px]"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-[#f6bd0b]/10">
            {compradores.map((comprador, idx) => (
              <tr
                key={comprador.id}
                onClick={() => navigate(`/admin/Compradores/${comprador.id}/compras`)}
                className={`cursor-pointer transition-colors hover:bg-[#f6bd0b]/8 ${idx % 2 === 0 ? 'bg-white' : 'bg-[#f6bd0b]/5'}`}
              >
                {columnas.map((col, colIdx) => (
                  <td
                    key={col}
                    className="px-6 py-4 text-sm text-[#1a1b1f] whitespace-nowrap"
                  >
                    {colIdx === 0 ? (
                      <span className="bg-[#1a1b1f] text-[#f6bd0b] text-xs font-bold px-2 py-0.5 rounded-md">
                        #{comprador[col]}
                      </span>
                    ) : (
                      comprador[col]
                    )}
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