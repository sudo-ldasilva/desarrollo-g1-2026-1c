import { Medico } from "../domain/Medico.js";

export class MedicosRepository {
    constructor() {
    }

    obtenerPaginados(numeroPagina, limitePorPagina, filtros = {}) {
        // TODO De ejemplo
        return {
            medicos: [
                new Medico({
                    "usuario": "pepe",
                    "nombre": "nombre",
                }),
                new Medico({
                    "usuario": "pepe2",
                    "nombre": "nombre2",
                }),
                new Medico({
                    "usuario": "pepe",
                    "nombre": "nombre",
                }),
                new Medico({
                    "usuario": "pepe2",
                    "nombre": "nombre2",
                }),
                new Medico({
                    "usuario": "pepe",
                    "nombre": "nombre",
                }),
                new Medico({
                    "usuario": "pepe2",
                    "nombre": "nombre2",
                }),
                new Medico({
                    "usuario": "pepe",
                    "nombre": "nombre",
                }),
                new Medico({
                    "usuario": "pepe2",
                    "nombre": "nombre2",
                }),
                new Medico({
                    "usuario": "pepe",
                    "nombre": "nombre",
                }),
                new Medico({
                    "usuario": "pepe2",
                    "nombre": "nombre2",
                }),
                new Medico({
                    "usuario": "pepe",
                    "nombre": "nombre",
                }),
                new Medico({
                    "usuario": "pepe2",
                    "nombre": "nombre2",
                }),
            ],
            totalMedicos: 12
        };
    }
}
