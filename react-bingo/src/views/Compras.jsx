import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { sendRequest } from '../helpers/bingoServices'

export default function Compras() {
  const { id } = useParams() // ID del comprador

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await sendRequest({
          endpoint: `/api/compradores/${id}/compras`,
          method: 'get',
        })
        console.log('Respuesta API compras:', data)
      } catch (error) {
        console.error('Error al traer compras:', error)
      }
    }

    fetchCompras()
  }, [id])

  return (
    <div>
      <h1>Compras del comprador #{id}</h1>
      <p>Revisa la consola para ver la respuesta de la API.</p>
    </div>
  )
}