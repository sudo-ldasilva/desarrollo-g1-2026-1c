import { MedicosService } from "../services/medicosService.js";

export class MedicosController {
    constructor({ medicosService = new MedicosService() } = {}) {
        this.medicosService = medicosService;
    }

    async findAll(req, res, next) {
        try {
            const paginacion = this.extraerPaginacion(req.query);
            const filtros = this.extraerFiltros(req.query);
            const resultado = this.medicosService.obtenerTodos({ ...paginacion, filtros });

            return res.status(200).json({
                status: "success",
                data: resultado.medicos,
                paginacion: {
                    numeroPagina: resultado.numeroPagina,
                    limitePorPagina: resultado.limitePorPagina,
                    totalPaginas: resultado.totalPaginas,
                    totalMedicos: resultado.totalMedicos
                }
            });
        } catch (error) {
            return next(error);
        }
    }

    extraerFiltros(query) {
        const filtros = {};

        // TODO Filtros

        return filtros;
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.page === undefined ? 1 : Number(query.page);
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit);

        if (numeroPagina <= 0) {
            throw new Error("El numero de pagina debe ser mayor o igual a 0");
        }

        if (limitePorPagina <= 0) {
            throw new Error("El límite por pagina debe ser mayor a 0");
        }

        return { numeroPagina, limitePorPagina };
    }
}
