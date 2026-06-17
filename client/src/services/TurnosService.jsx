import axios from "axios";

export const getTurnos = async (accessToken) => {
    console.log("pregunto turnos");
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
                },
            }
        );

        return response.data.turnos;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

const isAbortError = (error) => error.name === "CanceledError";

const handleError = (error) => {
    if (!isAbortError(error)) {
        console.error("Error obteniendo los turnos", error);
    }
    throw error;
};

export const getTurnosEnRangoFecha = async (accessToken, fechaInicio, fechaFin, signal) => {
    try {
        let turnos = [];
        let pagina = 1, totalPaginas = -1;

        do {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
                signal,
                params: {
                    page: pagina,
                    fechaInicio,
                    fechaFin
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            turnos.push(...response.data.turnos);

            totalPaginas = response.data.totalPage;
            pagina = response.data.page + 1;
        } while (pagina <= totalPaginas);

        return turnos;
    } catch (error) {
        handleError(error);
    }
};

export const getCantidadTurnosEnRangoFecha = async (accessToken, fechaInicio, fechaFin, signal) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            signal,
            params: {
                fechaInicio,
                fechaFin
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.total;
    } catch (error) {
        handleError(error);
    }
};

export const buscarTurnosDisponibles = async (accessToken, params, signal) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos`, {
            signal,
            params: { estado: "DISPONIBLE", ...params },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const getCantidadTurnosEnEstado = async (accessToken, estado, signal) => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            signal,
            params: {
                estado
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return response.data.total;
    } catch (error) {
        handleError(error);
    }
};
