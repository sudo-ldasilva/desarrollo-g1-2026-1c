import { MedicoModel } from "../models/MedicoModel.js";
import { TurnoModel } from "../models/TurnoModel.js";
import { Agenda } from "../domain/Agenda.js";
import { EstadoTurno } from "../domain/EstadoTurno.js";
import DisponibilidadHoraria from "../domain/DisponibilidadHoraria.js";

export default class BatchTurnosService {
  async ejecutar() {
    // -------------------------------------------------------
    // 1. Definir ventana de tiempo: desde hoy (medianoche) hasta 30 dias en el futuro.
    // Solo se reconcilian turnos dentro de este rango.
    // -------------------------------------------------------
    const ahora = new Date();
    ahora.setHours(0, 0, 0, 0);
    const hasta = new Date(ahora);
    hasta.setDate(hasta.getDate() + 30);

    // -------------------------------------------------------
    // 2. Obtener todos los medicos con sus especialidades, practicas y sedes populadas.
    // Los turnos existentes en otros estados (RESERVADO, CONFIRMADO, etc.) nunca se tocan.
    // -------------------------------------------------------
    const medicos = await MedicoModel.find().populate("especialidades practicas sedes");
    const agenda = new Agenda();
    let totalInsertados = 0;
    let totalEliminados = 0;

    for (const medico of medicos) {
      if (!medico.disponibilidades?.length) continue;

      // -------------------------------------------------------
      // 3. Construir mapa de servicios (Especialidad/Practica) indexado por ID.
      // Permite resolver rapidamente el tipo, costo y duracion de cada servicio
      // referenciado en las disponibilidades del medico.
      // -------------------------------------------------------
      const serviciosMap = new Map();
      for (const esp of (medico.especialidades || [])) {
        const obj = esp.toObject ? esp.toObject() : esp;
        serviciosMap.set(obj._id.toString(), obj);
      }
      for (const prac of (medico.practicas || [])) {
        const obj = prac.toObject ? prac.toObject() : prac;
        serviciosMap.set(obj._id.toString(), obj);
      }

      // -------------------------------------------------------
      // 4. Resolver referencias (servicio y sede) en cada disponibilidad
      // y re-instanciarlas como objetos de dominio (DisponibilidadHoraria).
      // Esto es necesario porque Mongoose devuelve POJOs al llamar toObject(),
      // y el metodo generarSlots() que necesita Agenda solo existe en la clase de dominio.
      // -------------------------------------------------------
      const medicoObj = medico.toObject();
      for (let i = 0; i < medicoObj.disponibilidades.length; i++) {
        const disp = medicoObj.disponibilidades[i];

        const servicioId = disp.servicio?.toString();
        const servicioResuelto = (servicioId && serviciosMap.has(servicioId))
          ? serviciosMap.get(servicioId)
          : disp.servicio;

        const sedeId = disp.sede?.toString();
        const sedePopulada = (medico.sedes || []).find(s => s._id.toString() === sedeId);
        const sedeResuelta = sedePopulada
          ? (sedePopulada.toObject ? sedePopulada.toObject() : sedePopulada)
          : disp.sede;

        medicoObj.disponibilidades[i] = new DisponibilidadHoraria({
          diaSemana: disp.diaSemana,
          horaDesde: disp.horaDesde,
          horaHasta: disp.horaHasta,
          sede: sedeResuelta,
          servicio: servicioResuelto,
        });
      }

      // -------------------------------------------------------
      // 5. Generar turnos teoricos segun la disponibilidad actual del medico.
      // Estos representan el estado "ideal" que deberia tener la agenda.
      // -------------------------------------------------------
      const nuevos = agenda.generarTurnosPara(medicoObj, ahora, hasta);
      if (!nuevos.length) continue;

      // -------------------------------------------------------
      // 6. Crear Set de "huellas digitales" de los turnos teoricos para busqueda O(1).
      // La huella se compone de: timestamp + servicioId + sedeId.
      // -------------------------------------------------------
      const keysNuevos = new Set(
        nuevos.map(t =>
          `${t.fechaHora.getTime()}-${(t.servicio?._id || t.servicio)?.toString()}-${(t.sede?._id || t.sede)?.toString()}`
        )
      );

      // -------------------------------------------------------
      // 7. Consultar turnos DISPONIBLES existentes en la DB dentro de la ventana.
      // Los turnos en otros estados (RESERVADO, CONFIRMADO, CANCELADO, REALIZADO)
      // no se consultan ni se modifican, cumpliendo la regla de negocio.
      // -------------------------------------------------------
      const existentes = await TurnoModel.find({
        medico: medico._id,
        estado: EstadoTurno.DISPONIBLE,
        fechaHora: { $gte: ahora, $lte: hasta }
      });

      // -------------------------------------------------------
      // 8. Determinar turnos a ELIMINAR: aquellos que estan en la DB como DISPONIBLES
      // pero cuya huella ya no coincide con la disponibilidad actual del medico.
      // -------------------------------------------------------
      const idsAEliminar = [];
      for (const turno of existentes) {
        const key = `${turno.fechaHora.getTime()}-${turno.servicio?.toString()}-${turno.sede?.toString()}`;
        if (!keysNuevos.has(key)) {
          idsAEliminar.push(turno._id);
        }
      }

      // -------------------------------------------------------
      // 9. Determinar turnos a INSERTAR: aquellos que estan en la lista teorica
      // pero cuya huella no existe todavia en la DB.
      // -------------------------------------------------------
      const keys = new Set(existentes.map(t =>
        `${t.fechaHora.getTime()}-${t.servicio?.toString()}-${t.sede?.toString()}`
      ));
      const aInsertar = nuevos.filter(t => {
        const k = `${t.fechaHora.getTime()}-${(t.servicio?._id || t.servicio)?.toString()}-${(t.sede?._id || t.sede)?.toString()}`;
        return !keys.has(k);
      });

      // -------------------------------------------------------
      // 10. Ejecutar eliminaciones masivas de turnos obsoletos.
      // -------------------------------------------------------
      if (idsAEliminar.length > 0) {
        await TurnoModel.deleteMany({ _id: { $in: idsAEliminar } });
        totalEliminados += idsAEliminar.length;
      }

      // -------------------------------------------------------
      // 11. Ejecutar inserciones masivas de nuevos turnos DISPONIBLES.
      // El tipoServicio se determina por la presencia de costoConsulta (Especialidad)
      // vs costo (Practica). El costo se resuelve del mapa de servicios.
      // -------------------------------------------------------
      if (aInsertar.length) {
        await TurnoModel.insertMany(aInsertar.map(t => {
          const servicioId = (t.servicio?._id || t.servicio)?.toString();
          const servicioInfo = serviciosMap.get(servicioId);
          const esEspecialidad = servicioInfo?.costoConsulta !== undefined;
          return {
            medico: medico._id,
            fechaHora: t.fechaHora,
            sede: t.sede?._id || t.sede,
            servicio: servicioId,
            tipoServicio: esEspecialidad ? "Especialidad" : "Practica",
            estado: EstadoTurno.DISPONIBLE,
            historialEstados: [],
            costo: servicioInfo?.costoConsulta ?? servicioInfo?.costo ?? null,
            paciente: null
          };
        }), { ordered: false });

        totalInsertados += aInsertar.length;
      }
    }

    // -------------------------------------------------------
    // 12. Retornar resumen con contadores de inserciones y eliminaciones
    // realizadas durante esta ejecucion del batch.
    // -------------------------------------------------------
    return { totalInsertados, totalEliminados };
  }
}
