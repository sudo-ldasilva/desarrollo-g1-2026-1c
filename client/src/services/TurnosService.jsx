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

export const getTurnosEnRangoFecha = async (accessToken, fechaInicio, fechaFin) => {
     console.log("pregunto turnos en rango fecha");
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
                    // Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
                    'x-usuario-id': '6a29b970392b258eadf4466b' // TODO NO Hardcodear
                                                               // Paciente 1, Lucia Fernandez, Plan Oro
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
     console.log("pregunto cantidad turnos");
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            params: {
                fechaInicio,
                fechaFin
            },
            headers: {
                    //Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
                'x-usuario-id': '6a29b970392b258eadf4466b' // TODO NO Hardcodear
            },
        })

        return response.data.total;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

export const getCantidadTurnosEnEstado = async (accessToken, estado) => {
     console.log("pregunto cantidad turnos en estado");
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            params: {
                estado
            },
           headers: {
                // Authorization: `Bearer ${accessToken}`, //manda JWT como header authorization
                'x-usuario-id': '6a29b970392b258eadf4466b' // TODO NO Hardcodear
            },
        })

        return response.data.total;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}

