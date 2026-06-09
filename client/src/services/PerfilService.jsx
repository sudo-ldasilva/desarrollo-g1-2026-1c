import axios from "axios";

export const getMe = async (token) => {
    console.log("DEBUG ENVIO GETME" + token);

    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/me`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const crearPerfil = async (token, perfil) => {

    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/pacientes`,
        perfil,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};