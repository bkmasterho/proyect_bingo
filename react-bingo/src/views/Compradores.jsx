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
    <div>
      <h1>Compradores</h1>

      <table border="1">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {compradores.map((comprador) => (
            <tr
              key={comprador.id}
              style={{ cursor: 'pointer' }}
              onClick={() =>
                navigate(`/admin/Compradores/${comprador.id}/compras`)
              }
            >
              {columnas.map((col) => (
                <td key={col}>{comprador[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}