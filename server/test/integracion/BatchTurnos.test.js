import { describe, test, expect, beforeAll, afterAll, beforeEach } from "@jest/globals";
import { startTestDB, reloadTestData, disconnectTestDB } from "./utils/testDb.js";
import BatchTurnosService from "../../services/batchTurnosService.js";
import { MedicoModel } from "../../models/MedicoModel.js";
import { TurnoModel } from "../../models/TurnoModel.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";

describe("Sweet Medical - Tests de Integracion (BatchTurnosService)", () => {
  beforeAll(async () => { await startTestDB(); });
  afterAll(async () => { await disconnectTestDB(); });
  beforeEach(async () => { await reloadTestData(); });

  // IDs del seed
  const MEDICO_ID = "500000000000000000000001";
  const ESPECIALIDAD_ID = "000000000000000000000001"; // Cardiologia - costoConsulta: 10000
  const PRACTICA_ID = "400000000000000000000001";     // Rx Torax - costo: 5000
  const SEDE_ID = "300000000000000000000003";         // Hospital Italiano

  async function configurarMedico(disponibilidades, extra = {}) {
    const update = { disponibilidades };
    if (extra.practicas) {
      await MedicoModel.findByIdAndUpdate(MEDICO_ID, { $addToSet: { practicas: { $each: extra.practicas } } });
    }
    await MedicoModel.findByIdAndUpdate(MEDICO_ID, { $set: update });
  }

  // -------------------------------------------------------
  // TEST 1: Asignacion correcta de tipoServicio y costo
  // -------------------------------------------------------
  test("debe asignar tipoServicio y costo correctamente para Especialidad y Practica", async () => {
    await configurarMedico(
      [
        { diaSemana: "LUNES", horaDesde: "10:00", horaHasta: "10:30", sede: SEDE_ID, servicio: ESPECIALIDAD_ID },
        { diaSemana: "LUNES", horaDesde: "11:00", horaHasta: "11:30", sede: SEDE_ID, servicio: PRACTICA_ID }
      ],
      { practicas: [PRACTICA_ID] }
    );

    const batchService = new BatchTurnosService();
    const resultado = await batchService.ejecutar();

    expect(resultado.totalInsertados).toBeGreaterThan(0);

    const turnos = await TurnoModel.find({ medico: MEDICO_ID });
    const turnosEsp = turnos.filter(t => t.tipoServicio === "Especialidad");
    const turnosPrac = turnos.filter(t => t.tipoServicio === "Practica");

    expect(turnosEsp.length).toBeGreaterThan(0);
    expect(turnosPrac.length).toBeGreaterThan(0);

    for (const t of turnosEsp) {
      expect(t.costo).toBe(10000); // costoConsulta de Cardiologia
      expect(t.servicio.toString()).toBe(ESPECIALIDAD_ID);
    }
    for (const t of turnosPrac) {
      expect(t.costo).toBe(5000); // costo de Rx Torax
      expect(t.servicio.toString()).toBe(PRACTICA_ID);
    }
  });

  // -------------------------------------------------------
  // TEST 2: Idempotencia - ejecutar dos veces no genera duplicados
  // -------------------------------------------------------
  test("no debe generar duplicados al ejecutar dos veces seguidas", async () => {
    await configurarMedico([
      { diaSemana: "LUNES", horaDesde: "10:00", horaHasta: "10:30", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    const batchService = new BatchTurnosService();

    const resultado1 = await batchService.ejecutar();
    const turnosDespues1 = await TurnoModel.find({ medico: MEDICO_ID });

    const resultado2 = await batchService.ejecutar();
    const turnosDespues2 = await TurnoModel.find({ medico: MEDICO_ID });

    expect(turnosDespues2.length).toBe(turnosDespues1.length);
    expect(resultado2.totalInsertados).toBe(0);
    expect(resultado2.totalEliminados).toBe(0);
    expect(resultado1.totalInsertados).toBeGreaterThan(0);
  });

  // -------------------------------------------------------
  // TEST 3: No modifica turnos CONFIRMADOS, CANCELADOS ni REALIZADOS
  // -------------------------------------------------------
  test("no debe eliminar turnos CONFIRMADOS, CANCELADOS ni REALIZADOS al cambiar disponibilidad", async () => {
    await configurarMedico([
      { diaSemana: "LUNES", horaDesde: "10:00", horaHasta: "11:00", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    const batchService = new BatchTurnosService();
    await batchService.ejecutar();

    // Obtener turnos generados y cambiar algunos de estado
    const turnosGenerados = await TurnoModel.find({ medico: MEDICO_ID, estado: EstadoTurno.DISPONIBLE });
    expect(turnosGenerados.length).toBeGreaterThanOrEqual(3);

    const idConfirmado = turnosGenerados[0]._id;
    const idCancelado = turnosGenerados[1]._id;
    const idRealizado = turnosGenerados[2]._id;

    await TurnoModel.findByIdAndUpdate(idConfirmado, { estado: EstadoTurno.CONFIRMADO });
    await TurnoModel.findByIdAndUpdate(idCancelado, { estado: EstadoTurno.CANCELADO });
    await TurnoModel.findByIdAndUpdate(idRealizado, { estado: EstadoTurno.REALIZADO });

    // Cambiar disponibilidad a un horario completamente distinto
    await configurarMedico([
      { diaSemana: "MARTES", horaDesde: "15:00", horaHasta: "15:30", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    await batchService.ejecutar();

    // Los turnos en otros estados deben seguir existiendo intactos
    const confirmado = await TurnoModel.findById(idConfirmado);
    const cancelado = await TurnoModel.findById(idCancelado);
    const realizado = await TurnoModel.findById(idRealizado);

    expect(confirmado).not.toBeNull();
    expect(confirmado.estado).toBe(EstadoTurno.CONFIRMADO);

    expect(cancelado).not.toBeNull();
    expect(cancelado.estado).toBe(EstadoTurno.CANCELADO);

    expect(realizado).not.toBeNull();
    expect(realizado.estado).toBe(EstadoTurno.REALIZADO);

    // Los turnos DISPONIBLES del horario viejo (LUNES 10:00-11:00) deben haberse eliminado
    const disponiblesViejos = await TurnoModel.find({
      medico: MEDICO_ID,
      estado: EstadoTurno.DISPONIBLE,
      "fechaHora": { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    const horariosDisponibles = disponiblesViejos.map(t => t.fechaHora.getHours());
    expect(horariosDisponibles).not.toContain(10);
  });

  // -------------------------------------------------------
  // TEST 4: Resumen correcto de inserciones y eliminaciones
  // -------------------------------------------------------
  test("debe retornar totalInsertados y totalEliminados correctos", async () => {
    // Limpiar turnos preexistentes del seed para este medico
    await TurnoModel.deleteMany({ medico: MEDICO_ID });

    // Primera ejecucion: solo inserciones
    await configurarMedico([
      { diaSemana: "LUNES", horaDesde: "10:00", horaHasta: "10:30", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    const batchService = new BatchTurnosService();
    const r1 = await batchService.ejecutar();

    expect(r1.totalInsertados).toBeGreaterThan(0);
    expect(r1.totalEliminados).toBe(0);
    const totalTurnos = r1.totalInsertados;

    // Segunda ejecucion: cambiar horario (elimina viejos + inserta nuevos)
    await configurarMedico([
      { diaSemana: "LUNES", horaDesde: "14:00", horaHasta: "14:30", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    const r2 = await batchService.ejecutar();

    expect(r2.totalInsertados).toBe(totalTurnos); // misma cantidad, distinto horario
    expect(r2.totalEliminados).toBe(totalTurnos); // se borraron todos los viejos
  });

  // -------------------------------------------------------
  // TEST 5: Medico sin disponibilidades no genera turnos
  // -------------------------------------------------------
  test("no debe generar turnos si el medico no tiene disponibilidades", async () => {
    // El seed no carga disponibilidades para ningun medico
    const batchService = new BatchTurnosService();
    const resultado = await batchService.ejecutar();

    expect(resultado.totalInsertados).toBe(0);
    expect(resultado.totalEliminados).toBe(0);
  });

  // -------------------------------------------------------
  // TEST 6: Reconciliacion completa (el test original mejorado)
  // -------------------------------------------------------
  test("debe reconciliar: borrar disponibles obsoletos, crear nuevos, respetar pasados y reservados", async () => {
    await configurarMedico([
      { diaSemana: "LUNES", horaDesde: "08:00", horaHasta: "09:00", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    const batchService = new BatchTurnosService();
    await batchService.ejecutar();

    const turnosDb = await TurnoModel.find({ medico: MEDICO_ID });
    expect(turnosDb.length).toBeGreaterThan(0);

    // Simular casos borde
    const turnoPasado = turnosDb[0];
    const turnoReservar = turnosDb[1];

    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    ayer.setHours(8, 0, 0, 0);
    await TurnoModel.findByIdAndUpdate(turnoPasado._id, { fechaHora: ayer, estado: EstadoTurno.DISPONIBLE });

    await TurnoModel.findByIdAndUpdate(turnoReservar._id, {
      estado: EstadoTurno.RESERVADO,
      paciente: "600000000000000000000001"
    });

    // Cambiar disponibilidad
    await configurarMedico([
      { diaSemana: "LUNES", horaDesde: "09:30", horaHasta: "10:00", sede: SEDE_ID, servicio: ESPECIALIDAD_ID }
    ]);

    await batchService.ejecutar();

    // El turno pasado sigue existiendo
    const pasadoActualizado = await TurnoModel.findById(turnoPasado._id);
    expect(pasadoActualizado).not.toBeNull();
    expect(pasadoActualizado.estado).toBe(EstadoTurno.DISPONIBLE);

    // El turno RESERVADO sigue existiendo
    const reservadoActualizado = await TurnoModel.findById(turnoReservar._id);
    expect(reservadoActualizado).not.toBeNull();
    expect(reservadoActualizado.estado).toBe(EstadoTurno.RESERVADO);

    // Los disponibles futuros del horario viejo se eliminaron
    const disponiblesFuturos = await TurnoModel.find({
      medico: MEDICO_ID,
      estado: EstadoTurno.DISPONIBLE,
      fechaHora: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
    });
    const horarios = disponiblesFuturos.map(t => t.fechaHora.getHours());
    expect(horarios).not.toContain(8);

    // Se creo el nuevo horario
    const tieneNuevoHorario = disponiblesFuturos.some(
      t => t.fechaHora.getHours() === 9 && t.fechaHora.getMinutes() === 30
    );
    expect(tieneNuevoHorario).toBe(true);
  });
});
