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

    // return new Promise((resolve) =>
    //     setTimeout(
    //         () =>
    //             resolve([
    //                 {
    //                     id: 1,
    //                     servicio: {nombre: "Cardiologia"},
    //                     medico: "Dr. Gomez",
    //                     sede: "Palermo",
    //                     cobertura: "Cubierto Totalmente",
    //                     fechaHora: "2026-06-15T11:30:00",
    //                     estado: "RESERVADO",
    //                     costo: 2102,
    //                 },
    //                 {
    //                     id: 2,
    //                     servicio: {nombre: "Oftalmologia"},
    //                     medico: "Dr. Gomez",
    //                     sede: "Palermo",
    //                     cobertura: "Cubierto Totalmente",
    //                     fechaHora: "2026-06-07T11:30:00",
    //                     estado: "RESERVADO",
    //                     costo: 2102,
    //                 },
    //                 {
    //                     id: 3,
    //                     servicio: {nombre: "Dermatologia"},
    //                     medico: "Dr. Gomez",
    //                     sede: "Palermo",
    //                     cobertura: "Cubierto Totalmente",
    //                     fechaHora: "2026-06-15T11:30:00",
    //                     estado: "RESERVADO",
    //                     costo: 2102,
    //                 },
    //             ]),
    //         2000
    //     )
    // );
