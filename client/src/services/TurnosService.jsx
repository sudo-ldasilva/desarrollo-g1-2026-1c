import axios from "axios";

export const getTurnos = async () => {
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

    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/turnos/mis-turnos`, {
            headers: {
                'x-usuario-id': '6a26b58133d704df8b9df054' // TODO NO Hardcodear
            }
        })

        return response.data.turnos;
    } catch (error) {
        console.error("Error obteniendo los turnos", error);
        throw error;
    }
}
