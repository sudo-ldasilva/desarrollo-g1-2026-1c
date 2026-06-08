import axios from "axios";

export const getTurnosEnRangoFecha = async (fechaInicio, fechaFin) => {
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
                    'x-usuario-id': '6a26b58133d704df8b9df054' // TODO NO Hardcodear
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

export const getCantidadTurnosEnRangoFecha = async (fechaInicio, fechaFin) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            params: {
                fechaInicio,
                fechaFin
            },
            headers: {
                'x-usuario-id': '6a26b58133d704df8b9df054' // TODO NO Hardcodear
            },
        })

        return response.data.total;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

export const getCantidadTurnosEnEstado = async (estado) => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            params: {
                estado
            },
            headers: {
                'x-usuario-id': '6a26b58133d704df8b9df054' // TODO NO Hardcodear
            },
        })

        return response.data.total;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}
