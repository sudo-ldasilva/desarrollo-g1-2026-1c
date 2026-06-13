import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL

export const getObrasSociales = async () => {
    const response = await axios.get(`${API_URL}/obras-sociales`);
    return response.data;
};

export const getPlanesObraSocial = async (idObraSocial) => {
    const response = await axios.get(
        `${API_URL}/obras-sociales/${idObraSocial}/planes`
    );

    return response.data;
};