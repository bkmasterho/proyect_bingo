import clienteAxios from '../config/axios';

export const sendRequest = async ({ endpoint, data = null, method = 'post', headers={} }) => {

    console.log("llamandooo sedRequest");

    try {

        let configRequest={
            url: endpoint,
            method,
            data
        }

        //Si headers tiene data se lo inserto a configRequest.
        
        if (Object.keys(headers).length > 0) {
            configRequest.headers = headers
        }

        const response = await clienteAxios(configRequest)

        return response.data
        
    } catch (error) {

        console.error("Errores de la Peticion");
        console.error("Endpoint:", endpoint);
        console.error("Method:", method);
        console.error("Data:", data);

        if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Status:", error.response.status);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error config:", error.message);
        }

        throw {
            message: error.response?.data?.message ?? 'Error inesperado',
            errors: error.response?.data?.errors ?? null,
            status: error.response?.status ?? 500
        }
    }
    
}