import express from "express";

import { MedicoController } from "../controllers/MedicoController.js";

const medicoRouter = express.Router();
const medicoController = new MedicoController();

/**
 * @openapi
 * /medicos:
 *   get:
 *     summary: Obtiene todos los médicos paginados
 *     tags: [Médicos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 5 }
 *     responses:
 *       200:
 *         description: Lista paginada de médicos
 *
 *   post:
 *     summary: Crea un nuevo médico
 *     tags: [Médicos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - matricula
 *               - nombre
 *             properties:
 *               usuario:
 *                 type: string
 *                 example: "drperez"
 *               matricula:
 *                 type: string
 *                 example: "MP-1234"
 *               nombre:
 *                 type: string
 *                 example: "Dr. Juan Pérez"
 *               especialidades:
 *                 type: array
 *                 items: { type: string }
 *                 description: IDs de especialidades
 *               practicas:
 *                 type: array
 *                 items: { type: string }
 *                 description: IDs de practicas
 *               sedes:
 *                 type: array
 *                 items: { type: string }
 *                 description: IDs de sedes
 *               disponibilidades:
 *                 type: array
 *                 items: { type: string }
 *                 description: disponibilidades
 *     responses:
 *       201:
 *         description: Médico creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id: { type: string }
 *                 usuario: { type: string }
 *                 matricula: { type: string }
 *                 nombre: { type: string }
 *                 especialidades: { type: array }
 *                 practicas: { type: array }
 *                 sedes: { type: array }
 *                 disponibilidades: { type: array }
 *       400:
 *         description: Faltan campos obligatorios
 */
medicoRouter.route("/")
    .get( (req, res, next) => medicoController.findAll(req, res, next) )
    .post((req, res, next) => medicoController.createMedico(req, res, next));

/**
 * @openapi
 * /medicos/{id}:
 *   get:
 *     summary: Obtiene un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico encontrado
 *       404:
 *         description: Médico no existe
 *   patch:
 *     summary: Actualiza parcialmente los atributos de un médico por ID
 *     tags: [Médicos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del médico
 *     responses:
 *       200:
 *         description: Médico encontrado y se actualizó los campos
 *       404:
 *         description: Médico no existe
 *       400:
 *         description: ID inválido o Algún campo a modificar no existe
 */
medicoRouter.route("/:id")
    .get( (req, res, next) => medicoController.getMedicoById(req, res, next) )
    .patch( (req, res, next) => medicoController.patchMedicoById(req, res, next) );

export default medicoRouter;
