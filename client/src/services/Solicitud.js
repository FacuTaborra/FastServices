import { fetchGet, fetchPost } from "../services/fetchIntercept.js";

export const setSolicitud = async (id, data, token ) => {
    try{
        const headers = {
            Authorization: `Bearer ${token}`
        };
        const response = await fetchPost(`/solicitud/cliente/${id}`, data, token, headers)
        .then(response => {
            return response;
        })
        return response
    }   
    catch(error){
        throw new Error(error.message);
    }
};

export const getSolicitudes = async (estado, idUsuario, token ) => {
    try{
        const response = await fetchGet(`/solicitud/${estado}/cliente/${idUsuario}`, token)
        .then(response => {
            return response;
        })
        console.log(response.body.solicitudes)
        return response.body.solicitudes;
    }catch(error){
        throw new Error(error.message);
    }
};


