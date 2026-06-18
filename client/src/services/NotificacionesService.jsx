import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  },
});

export const obtenerNotificaciones = async (token, estado = undefined, page = 1, limit = 5) => {
  try {
    const params = { page, limit };
    if (estado) params.estado = estado;

    const response = await axios.get(`${API_URL}/notificaciones`, {
      params,
      ...getConfig(token),
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    throw error;
  }
};

export const marcarNotificacionComoLeida = async (token, id) => {
  try {
    const response = await axios.patch(`${API_URL}/notificaciones/${id}`, {}, getConfig(token));
    return response.data;
  } catch (error) {
    console.error("Error marcando notificación como leída:", error);
    throw error;
  }
};
