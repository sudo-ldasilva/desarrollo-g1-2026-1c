import axios from "axios";

export const getMe = async (token) => {
    if (!token) return null;

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

export const agregarDisponibilidadMedico = async (token, idMedico, disponibilidadData) => {
    const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/medicos/${idMedico}/disponibilidades`,
        disponibilidadData,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const eliminarDisponibilidadMedico = async (token, idMedico, idDisponibilidad) => {
    const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/medicos/${idMedico}/disponibilidades/${idDisponibilidad}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};

export const getMedicoById = async (token, idMedico) => {
    const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/medicos/${idMedico}`,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
};
