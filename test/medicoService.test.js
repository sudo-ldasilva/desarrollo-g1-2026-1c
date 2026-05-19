import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { MedicoService } from "../server/services/MedicoService.js";
import { Medico } from "../server/domain/Medico.js";

describe("Sweet Medical - Tests de Servicios y Dominio (Medicos)", () => {
    // ==========================================
    // CONFIGURACIÓN MOCKS (Capa de Servicios)
    // ==========================================
    let mockRepository;
    let medicoService;

    beforeEach(() => {
        // Crear un mock manual que intercepta las llamadas al repositorio
        mockRepository = {
            obtenerPaginados: jest.fn()
        };

        // Inyectar el mock al servicio para aislar la capa de dominio
        medicoService = new MedicoService({ medicoRepository: mockRepository });
    });

    // ==========================================
    // TESTS DE CAPA DE SERVICIOS
    // ==========================================
    describe("MedicoService", () => {
        test("debe calcular correctamente la paginacion y total de paginas con datos existentes", async () => {
            mockRepository.obtenerPaginados.mockResolvedValue({
                medicos: [
                    { id: "1", nombre: "Dr. Pérez", matricula: "MP-1001" },
                    { id: "2", nombre: "Dra. López", matricula: "MP-1002" }
                ],
                totalMedicos: 12
            });

            const result = await medicoService.obtenerTodos({
                numeroPagina: 1,
                limitePorPagina: 5
            });

            expect(result.medicos).toHaveLength(2);
            expect(result.totalMedicos).toBe(12);
            expect(result.totalPaginas).toBe(3); // Math.ceil(12 / 5) = 3
            expect(result.numeroPagina).toBe(1);
            expect(result.limitePorPagina).toBe(5);
        });

        test("debe devolver 0 paginas y array vacio cuando no hay resultados", async () => {
            mockRepository.obtenerPaginados.mockResolvedValue({
                medicos: [],
                totalMedicos: 0
            });

            const result = await medicoService.obtenerTodos({
                numeroPagina: 2,
                limitePorPagina: 10
            });

            expect(result.medicos).toEqual([]);
            expect(result.totalMedicos).toBe(0);
            expect(result.totalPaginas).toBe(0);
        });

        test("debe propagar los filtros al repositorio correctamente", async () => {
            const filtrosEjemplo = { especialidad: "Cardiología", sede: "Garrahan" };
            mockRepository.obtenerPaginados.mockResolvedValue({ medicos: [], totalMedicos: 0 });

            await medicoService.obtenerTodos({
                numeroPagina: 3,
                limitePorPagina: 10,
                filtros: filtrosEjemplo
            });

            // Validamos que el servicio pase exactamente los parametros al repo
            expect(mockRepository.obtenerPaginados).toHaveBeenCalledWith(3, 10, filtrosEjemplo);
        });
    });

    // ==========================================
    // TESTS DE CAPA DE DOMINIO (Entidad Medico)
    // ==========================================
    describe("Medico (Dominio)", () => {
        let medico;

        beforeEach(() => {
            // El constructor actual exige un objeto desestructurado
            medico = new Medico({
                usuario: "user_med_01",
                matricula: "MP-9876",
                nombre: "Dr. Juan Pérez"
            });
        });

        test("debe inicializar correctamente las propiedades base y colecciones vacias", () => {
            expect(medico.usuario).toBe("user_med_01");
            expect(medico.matricula).toBe("MP-9876");
            expect(medico.nombre).toBe("Dr. Juan Pérez");
            expect(medico._especialidades).toEqual([]);
            expect(medico._practicas).toEqual([]);
            expect(medico._sedes).toEqual([]);
            expect(medico._disponibilidades).toEqual([]);
        });

        test("debe agregar y verificar especialidades correctamente", () => {
            const cardiologia = { id: "esp1", nombre: "Cardiología" };
            const dermatologia = { id: "esp2", nombre: "Dermatología" };

            medico.definirEspecialidad(cardiologia);

            // includes() compara por referencia en objetos
            expect(medico.tieneEspecialidad(cardiologia)).toBe(true);
            expect(medico.tieneEspecialidad(dermatologia)).toBe(false);
        });

        test("debe agregar y verificar practicas correctamente", () => {
            const ecografia = { id: "prac1", nombre: "Ecografía" };
            const radiografia = { id: "prac2", nombre: "Radiografía" };

            medico.definirPractica(ecografia);

            expect(medico.tienePractica(ecografia)).toBe(true);
            expect(medico.tienePractica(radiografia)).toBe(false);
        });

        test("debe gestionar sedes: inicialmente false, true al agregar al menos una", () => {
            expect(medico.tieneAlgunaSede()).toBe(false);

            const hospitalCentral = { id: "sed1", nombre: "Hospital Central" };
            medico.definirSede(hospitalCentral);

            expect(medico.tieneAlgunaSede()).toBe(true);
        });

        test("debe gestionar disponibilidades mediante getter y metodo setter", () => {
            const dispLunes = { dia: "LUNES", horaDesde: "09:00", horaHasta: "14:00" };

            medico.definirDisponibilidad(dispLunes);

            // Verificamos el getter y la acumulación en el array privado
            expect(medico.disponibilidades).toContain(dispLunes);
            expect(medico.disponibilidades).toHaveLength(1);
        });
    });
});
