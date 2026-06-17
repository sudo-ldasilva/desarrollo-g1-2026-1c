import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

export const getEspecialidades = async () => {
    const response = await axios.get(`${API_URL}/especialidades`);
    return response.data;
};

export const getPracticas = async () => {
    const response = await axios.get(`${API_URL}/practicas`);
    return response.data;
};

export const getSedes = async () => {
    const response = await axios.get(`${API_URL}/sedes`);
    return response.data;
};
