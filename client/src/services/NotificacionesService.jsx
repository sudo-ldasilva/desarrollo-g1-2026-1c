import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// TODO: Reemplazar el header hardcodeado por el token/ID real del usuario autenticado con Logto
const getConfig = () => ({
  headers: {
    "x-usuario-id": "6a29b970392b258eadf4466b", // Reemplazar con lógica de autenticación real
                                                // Paciente 1, Lucia Fernandez, Plan Oro
  },
});

export const obtenerNotificaciones = async (estado = "pendientes", page = 1, limit = 10) => {
  try {
    const params = { page, limit };
    if (estado) params.estado = estado;

    const response = await axios.get(`${API_URL}/notificaciones`, {
      params,
      ...getConfig(),
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo notificaciones:", error);
    throw error;
  }
};

export const marcarNotificacionComoLeida = async (id) => {
  try {
    const response = await axios.patch(`${API_URL}/notificaciones/${id}`, {}, getConfig());
    return response.data;
  } catch (error) {
    console.error("Error marcando notificación como leída:", error);
    throw error;
  }
};
