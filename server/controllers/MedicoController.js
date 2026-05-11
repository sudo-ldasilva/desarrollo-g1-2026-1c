import { MedicoRepository } from "../repositories/MedicoRepository.js";

const medicoRepository = new MedicoRepository();

import { MedicoService } from "../services/MedicoService.js";

export class MedicoController {
    constructor({ medicoService = new MedicoService() } = {}) {
        this.medicoService = medicoService;
    }

    async findAll(req, res, next) {
        try {
            const paginacion = this.extraerPaginacion(req.query);
            const filtros = this.extraerFiltros(req.query);
            const resultado = await this.medicoService.obtenerTodos({ ...paginacion, filtros });

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

    async getMedicoById(req, res, next) {
        try {
            const { id } = req.params;
            const medico = await medicoRepository.findById(id);

            res.status(200).json(medico);
        } catch (error) {
            next(error);
        }
    };

    extraerFiltros(query) {
        const filtros = {};

        // TODO Filtros

        return filtros;
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.page === undefined ? 1 : Number(query.page);
        const limitePorPagina = query?.limit === undefined ? 5 : Number(query.limit);

        if (numeroPagina <= 0) {
            throw new Error("El numero de pagina debe ser mayor o igual a 0");
        }

        if (limitePorPagina <= 0) {
            throw new Error("El límite por pagina debe ser mayor a 0");
        }

        return { numeroPagina, limitePorPagina };
    }
}
