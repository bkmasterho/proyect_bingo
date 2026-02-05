import React from 'react'
import { sendRequest } from '../helpers/bingoServices'

export default function Botonsito() {

 const botonPrueba = async () => {
    try {
      const formData = { saludo: 'hola' }

      const data = await sendRequest({
        endpoint: '/api/compradores',
        data: formData,
        method: 'post'
      })

      console.log('Respuesta del backend:', data)

    } catch (error) {

      console.error('Error al enviar datos:', error)
    }
  }

  return (
     <div>
      <button onClick={botonPrueba}>Enviar saludo</button>
    </div>
  )
}
