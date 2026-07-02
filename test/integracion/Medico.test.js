import request from "supertest";
import { describe, test, expect, beforeEach, beforeAll, afterAll } from "@jest/globals";

import { buildTestApp } from "./utils/testApp.js";
import { startTestDB, reloadTestData, disconnectTestDB } from "./utils/testDb.js";

describe("Sweet Medical - Tests de Integración", () => {
    let app;

    beforeAll(async () => {
        await startTestDB();
    });

    afterAll(async () => {
        await disconnectTestDB();
    });

    beforeEach(async () => {
        await reloadTestData();
        app = buildTestApp();
    });

    describe("GET /medicos", () => {
        test("Debe retornar 200 con la lista de médicos paginada", async () => {
            const response = await request(app).get("/medicos");

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data).toHaveLength(5);
            expect(response.body.paginacion.numeroPagina).toBe(1);
            expect(response.body.paginacion.limitePorPagina).toBe(5);
            expect(response.body.paginacion.totalMedicos).toBe(10);
            expect(response.body.paginacion.totalPaginas).toBe(2);
        });

        test("Debe retornar 200 con la lista de médicos paginada, pagina = 2", async () => {
            const response = await request(app).get("/medicos?page=2");

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data).toHaveLength(5);
            expect(response.body.paginacion.numeroPagina).toBe(2);
            expect(response.body.paginacion.limitePorPagina).toBe(5);
            expect(response.body.paginacion.totalMedicos).toBe(10);
            expect(response.body.paginacion.totalPaginas).toBe(2);
        });

        test("Debe retornar 200 con la lista de médicos paginada, limite = 2", async () => {
            const response = await request(app).get("/medicos?limit=2");

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data).toHaveLength(2);
            expect(response.body.paginacion.numeroPagina).toBe(1);
            expect(response.body.paginacion.limitePorPagina).toBe(2);
            expect(response.body.paginacion.totalMedicos).toBe(10);
            expect(response.body.paginacion.totalPaginas).toBe(5);
        });

        test("Debe retornar 200 con la lista de médicos paginada, pagina = 5, limite = 2", async () => {
            const response = await request(app).get("/medicos?page=5&limit=2");

            expect(response.status).toBe(200);
            expect(response.body.status).toBe("success");
            expect(response.body.data).toHaveLength(2);
            expect(response.body.paginacion.numeroPagina).toBe(5);
            expect(response.body.paginacion.limitePorPagina).toBe(2);
            expect(response.body.paginacion.totalMedicos).toBe(10);
            expect(response.body.paginacion.totalPaginas).toBe(5);
        });

        test("Debe retornar 400 si la pagina supera el limite", async () => {
            const response = await request(app).get("/medicos?page=3");

            // console.log(response);
            expect(response.status).toBe(400);
        });
    });

    describe("PATCH /medicos/{:id}", () => {
        test("Si el ID del medico es invalido debe retornar 400", async () => {
            const json = {
                "especialidades": ["000000000000000000000001", "000000000000000000000002"],
            };

            const response = await request(app)
                .patch("/medicos/858478")
                .send(json);

            expect(response.status).toBe(400);
        });

        test("Si el medico no existe debe retornar 404", async () => {
            const json = {
                "especialidades": ["000000000000000000000001", "000000000000000000000002"],
            };

            const response = await request(app)
                .patch("/medicos/100000000000000000000000")
                .send(json);

            expect(response.status).toBe(404);
        });

        test("Debe retornar 200 al modificar la especialidad del médico", async () => {
            const id = "500000000000000000000003";
            const json = {
                "especialidades": ["000000000000000000000001", "000000000000000000000002"],
            };

            const response = await request(app)
                .patch(`/medicos/${id}`)
                .send(json);

            // Para comprobar si el resto de los campos se mantienen igual luego del post
            // Lo comento para que el test sea independiente de get by id
            // const medico = await request(app).get(`/medicos/${id}`);
            // const medicoActualizado = medico; medicoActualizado.especialidades = json["especialidades"];

            expect(response.status).toBe(200);
            expect(response.body.especialidades).toEqual(json["especialidades"]);
        });
    });
});
