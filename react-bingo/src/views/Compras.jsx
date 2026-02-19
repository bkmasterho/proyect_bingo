import useSWR from 'swr';
import { useEffect } from 'react';
import { sendRequest } from '../helpers/bingoServices'

export default function Compras() {

  /*
  const fetcher = (endpoint) =>
  sendRequest({
    endpoint,
    method: 'get'
  });

  const {
    data: compradores,
    error,
    isLoading
  } = useSWR('/api/compradores', fetcher);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error.message}</p>;

  console.log(compradores);
  */
 
  useEffect(() => {
    const testGetCompradores = async () => {
      try {
        const data = await sendRequest({
          endpoint: '/api/compradores',
          method: 'get'
        });

        console.log('Respuesta API:', data);
      } catch (error) {
        console.error('Error API:', error);
      }
    };

    testGetCompradores();
  }, []);


  return (
    <div>
        <h1>Compras</h1>
    </div>
  )
}
