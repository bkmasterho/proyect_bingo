import { useEffect } from 'react';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';
import { sendRequest } from '../helpers/bingoServices'

export const useAuth = ({middleware, url}) => {
    
    console.log("Inicio Ejecutando el UseAuth !!!");
    const navigate = useNavigate();

    //Guardo lo que venga de data en user EJ: users=result.data
    const {data: user, error, mutate } = useSWR('/api/user', async () => {

        //Valido mi token para evitar rendersInicesarrios

        const token = localStorage.getItem('AUTH_TOKEN');
        if (!token) return null;

        try {

          const data = await sendRequest({
            endpoint: '/api/user',
            method: 'get',
            headers:{
                Authorization: `Bearer ${token}`,
            }
          })

          return data;

        } catch (error) {

          if (error.status === 422) {
            console.log("Error de UseAuth", error.status)
          } 
        }

    },
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            shouldRetryOnError: false
        }
    )

    const registro = async (datos, setErrores) => {

           //Envio mi peticion en la misma function de sendRequest ya valido errores:
          console.log("mostrando Datos",datos)

          try {
    
            const data = await sendRequest({
              endpoint: '/api/registro',
              data: datos,
              method: 'post'
            })

            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            await mutate();
            console.log(data)
    
          } catch (error) {
    
            if (error.status === 422) {
              setErrores(Object.values(error.errors))
            } else {
              console.error(error.message)
            }
    
          }
    }

    console.log("EL USEEEER",user);
    console.log("EL ERRORRR",error);
    
    useEffect(() => {

        if (middleware === 'guest' && user) {
            navigate(url, { replace: true });
        }

        if (middleware === 'auth' && user === null) {
            navigate('/auth/login', { replace: true });
        }

    }, [user]);

    return {
        //login, 
        registro,
        //logout,
        //user,
        //error
    }
    
}