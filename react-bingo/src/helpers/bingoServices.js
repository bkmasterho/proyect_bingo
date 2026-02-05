import clienteAxios from '../config/axios';

export const sendRequest = async ({ endpoint, data = null, method = 'post' }) => {

    console.log("llamandooo sedRequest");

    try {
        const response = await clienteAxios({
            url: endpoint,
            method,
            data
        })

        return response.data
        
    } catch (error) {
        throw error?.response?.data ?? error

    }
    
}