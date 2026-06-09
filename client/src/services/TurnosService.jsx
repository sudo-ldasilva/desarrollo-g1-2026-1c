import axios from "axios";

export const getTurnos = async (accessToken) => {
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

export const getTurnosEnRangoFecha = async (accessToken, fechaInicio, fechaFin) => {
    try{
        let turnos = []
        let pagina = 1, totalPaginas = -1

        do {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
                params: {
                    page: pagina,
                    fechaInicio,
                    fechaFin
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
                },
            })

            turnos.push(...response.data.turnos)

            totalPaginas = response.data.totalPage;
            pagina = response.data.page + 1;
        } while (pagina <= totalPaginas)

        return turnos;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

export const getCantidadTurnosEnRangoFecha = async (accessToken, fechaInicio, fechaFin) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            params: {
                fechaInicio,
                fechaFin
            },
            headers: {
                    Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
            },
        })

        return response.data.total;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

export const getCantidadTurnosEnEstado = async (accessToken, estado) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            params: {
                estado
            },
           headers: {
                Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
            },
        })

        return response.data.total;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

