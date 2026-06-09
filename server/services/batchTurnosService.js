import { MedicoModel } from "../models/MedicoModel.js";
import { TurnoModel } from "../models/TurnoModel.js";
import { Agenda } from "../domain/Agenda.js";
import { EstadoTurno } from "../domain/EstadoTurno.js";

export default class BatchTurnosService {
  /**
   * Ejecuta el proceso batch de generacion de turnos futuros.
   * Regla: Solo genera turnos DISPONIBLES, no modifica turnos RESERVADOS ni pasados.
   */
  async ejecutar() {
    // Definir la ventana de tiempo para la generacion
    const ahora = new Date();
    ahora.setHours(0, 0, 0, 0);
    const hasta = new Date(ahora);
    hasta.setDate(hasta.getDate() + 30);

    // Obtener todos los medicos con sus configuraciones completas
    const medicos = await MedicoModel.find().populate("especialidades practicas sedes");
    const agenda = new Agenda();
    let total = 0;

    for (const medico of medicos) {
      // Saltear medicos sin disponibilidad configurada
      if (!medico.disponibilidades?.length) continue;

      // Generar turnos teoricos según la disponibilidad del medico en el periodo
      const nuevos = agenda.generarTurnosPara(medico.toObject(), ahora, hasta);
      if (!nuevos.length) continue;

      // Obtener turnos DISPONIBLES ya existentes en ese periodo (para evitar duplicados)
      // Regla: No se tocan turnos RESERVADOS, CONFIRMADOS, etc.
      const existentes = await TurnoModel.find({
        medico: medico._id,
        estado: EstadoTurno.DISPONIBLE,
        fechaHora: { $gte: ahora, $lte: hasta }
      });

      // Filtrar solo los turnos nuevos que NO colisionan con existentes
      const keys = new Set(existentes.map(t => `${t.fechaHora.getTime()}-${t.servicio}-${t.sede}`));
      const aInsertar = nuevos.filter(t => {
        const k = `${t.fechaHora.getTime()}-${t.servicio?._id || t.servicio}-${t.sede?._id || t.sede}`;
        return !keys.has(k);
      });

      // Persistir en la base de datos solo los turnos nuevos
      if (aInsertar.length) {
        await TurnoModel.insertMany(aInsertar.map(t => ({
          medico: medico._id,
          fechaHora: t.fechaHora,
          sede: t.sede?._id || t.sede,
          servicio: t.servicio?._id || t.servicio,
          tipoServicio: t.servicio?.duracionTurnoEnMins ? "Especialidad" : "Practica",
          estado: EstadoTurno.DISPONIBLE,
          historialEstados: [],
          costo: t.servicio?.costoConsulta || t.servicio?.costo || null,
          paciente: null
        })), { ordered: false });
        total += aInsertar.length;
      }
    }
    // Retornar resumen de la ejecucion
    return { total };
  }
}
