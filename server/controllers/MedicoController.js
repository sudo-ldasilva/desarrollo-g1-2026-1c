import { MedicoRepository } from "../repositories/MedicoRepository.js";
import { MedicoService } from "../services/MedicoService.js";
import { BadRequestError } from "../errors/AppError.js";

export class MedicoController {
    constructor({ medicoService = new MedicoService(), medicoRepository = new MedicoRepository() } = {}) {
        this.medicoService = medicoService;
        this.medicoRepository = medicoRepository;
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
            const medico = await this.medicoRepository.findById(id);

            res.status(200).json(medico);
        } catch (error) {
            next(error);
        }
    }

    validarCamposCreate(body) {
        const { usuario, matricula, nombre } = body;

        const faltantes = [];

        if (!usuario) faltantes.push("usuario");
        if (!matricula) faltantes.push("matricula");
        if (!nombre) faltantes.push("nombre");

        if (faltantes.length > 0) {
            throw new Error(
                `Faltan campos obligatorios: ${faltantes.join(", ")}`
            );
        }
    }

    async createMedico(req, res, next) {
        try {
            const { usuario, matricula, nombre, especialidades, practicas, sedes, disponibilidades } = req.body;
            this.validarCamposCreate(req.body);

            const nuevoMedico = await this.medicoRepository.model.create({
                usuario,
                matricula,
                nombre,
                especialidades: especialidades || [],
                practicas: practicas || [],
                sedes: sedes || [],
                disponibilidades: disponibilidades || []
            });

            return res.status(201).json(nuevoMedico);
        } catch (error) {
            next(error);
        }
    }

    validarCamposPatch(body) {
        let camposQuePuedeCambiar = ["especialidades", "practicas", "sedes", "disponibilidades"];
        let camposBody = Object.keys(body);

        const camposNoPermitidos = camposBody.filter((campo) => !camposQuePuedeCambiar.includes(campo));
        if (camposNoPermitidos.length > 0) {
            throw new BadRequestError(`Campos no permitidos en la request: ${camposNoPermitidos.join(", ")}`);
        }
    }

    async patchMedicoById(req, res, next) {
        try {
            const { id } = req.params;
            this.validarCamposPatch(req.body);
            // TODO Una vez completado la funcionalidad, estaría bueno checkear que los
            // datos ingresados (dependiendo de cada campo) sean del tipo y forma correctos.
            // Nunca nos tenemos que confiar del input del usuario.
            const medico = await this.medicoRepository.updateById(id, req.body);

            res.status(200).json(medico);
        } catch (error) {
            next(error);
        }
    };

    extraerFiltros(query) {
        const filtros = {};

        // TODO Documentar

        if (query.especialidad !== undefined) {
            filtros.especialidades = query.especialidad;
        }

        if (query.practica !== undefined) {
            filtros.practicas = query.practica;
        }

        if (query.sede !== undefined) {
            filtros.sedes = query.sede;
        }

        return filtros;
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.page === undefined ? 1 : Number(query.page);
        const limitePorPagina = query?.limit === undefined ? 5 : Number(query.limit);

        if (numeroPagina <= 0) {
            throw new BadRequestError("El numero de pagina debe ser mayor o igual a 0");
        }

        if (limitePorPagina <= 0) {
            throw new BadRequestError("El límite por pagina debe ser mayor a 0");
        }

        return { numeroPagina, limitePorPagina };
    }
}
