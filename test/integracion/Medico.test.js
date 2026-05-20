import request from "supertest";
import { jest, describe, test, expect, beforeEach } from "@jest/globals";

import { Medico } from "../../server/domain/Medico.js";
import { buildTestApp } from "./utils/testApp.js";
import { NotFoundError } from "../../server/errors/AppError.js";

describe("Sweet Medical - Tests de Integración", () => {
    let app;
    let medicoRepository;

    beforeEach(() => {
        medicoRepository = {
            obtenerPaginados: jest.fn(),
            findById: jest.fn(),
            updateById: jest.fn(),
        };

        app = buildTestApp(medicoRepository);
    });

    describe("GET /medicos", () => {
        test("Para una lista vacía de médicos debe retornar 200 con la lista de médicos vacía", async () => {
            const medicosMock = [];

            medicoRepository.obtenerPaginados.mockResolvedValue({
                medicos: medicosMock,
                totalMedicos: 0,
            });

            const response = await request(app).get("/medicos");

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data).toHaveLength(0);
            expect(response.body.paginacion.numeroPagina).toBe(1);
            expect(response.body.paginacion.limitePorPagina).toBe(5);
            expect(response.body.paginacion.totalMedicos).toBe(0);
            expect(response.body.paginacion.totalPaginas).toBe(0);
        });

        test("Debe retornar 200 con la lista de médicos paginada", async () => {
            const medicosMock = [
                new Medico("Dr.House.1950", "123456", "House"),
                new Medico("Rod.Rod", "123457", "Rodolfo"),
            ];
            medicosMock[0].id = 1;
            medicosMock[1].id = 2;

            medicoRepository.obtenerPaginados.mockResolvedValue({
                medicos: medicosMock,
                totalMedicos: 2,
            });

            const response = await request(app).get("/medicos");

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data).toHaveLength(2);
            expect(response.body.paginacion.numeroPagina).toBe(1);
            expect(response.body.paginacion.limitePorPagina).toBe(5);
            expect(response.body.paginacion.totalMedicos).toBe(2);
            expect(response.body.paginacion.totalPaginas).toBe(1);
        });
    });

    describe("PATCH /medicos/{:id}", () => {
        test("Si el medico no existe debe retornar 404", async () => {
            const medicosMock = [
                new Medico("Dr.House.1950", "123456", "House"),
                new Medico("Rod.Rod", "123457", "Rodolfo"),
            ];
            medicosMock[0].id = 1;
            medicosMock[1].id = 2;

            medicoRepository.updateById.mockRejectedValue(
                new NotFoundError("Médico no encontrado")
            );

            const json = {
                "especialidades": ["id1", "id2"],
            };

            const response = await request(app)
                .patch("/medicos/3")
                .send(json);

            expect(response.status).toBe(404);
        });
    });

    describe("PATCH /medicos/{:id}", () => {
        test("Se pasan los atributos del médico a modificar y retorna 200", async () => {
            const medicosMock = [
                new Medico("Dr.House.1950", "123456", "House"),
                new Medico("Rod.Rod", "123457", "Rodolfo"),
            ];
            medicosMock[0].id = 1;
            medicosMock[1].id = 2;

            const idEspecialidades = ["idEsp1", "idEsp2"];
            const json = { "especialidades": idEspecialidades };
            const medicoActualizado = medicosMock[0];
            medicoActualizado.especilidades = idEspecialidades;

            medicoRepository.updateById.mockResolvedValue(
                medicoActualizado
            );

            const response = await request(app)
                .patch("/medicos/1")
                .send(json);

            expect(response.status).toBe(200);
            expect(response.body).toEqual(medicoActualizado);
        });
    });
});
