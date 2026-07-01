import { MedicoModel } from "../models/MedicoModel.js";
import { TurnoModel } from "../models/TurnoModel.js";
import { EstadoTurno } from "../domain/EstadoTurno.js";
import { DiaSemana } from "../domain/DiaSemana.js";

export default class BatchTurnosService {
    async ejecutar() {
        console.log("[BATCH] Iniciando generación de turnos...");
        
        const ahora = new Date();
        ahora.setHours(0, 0, 0, 0);
        const hasta = new Date(ahora);
        hasta.setDate(hasta.getDate() + 30);
        
        console.log(`📅 [BATCH] Ventana: ${ahora.toISOString()} a ${hasta.toISOString()}`);

        // Populate completo para obtener todos los datos necesarios
        const medicos = await MedicoModel.find()
            .populate("especialidades")
            .populate("practicas")
            .populate("sedes")
            .populate("disponibilidades.sede")
            .populate("disponibilidades.servicio");
        
        console.log(`[BATCH] Médicos encontrados: ${medicos.length}`);
        
        let total = 0;
        let medicosProcesados = 0;
        let medicosSinDisponibilidad = 0;

        for (const medico of medicos) {
            if (!medico.disponibilidades || medico.disponibilidades.length === 0) {
                medicosSinDisponibilidad++;
                continue;
            }

            medicosProcesados++;
            console.log(`\n[BATCH] Procesando: ${medico.nombre} (${medico.disponibilidades.length} disponibilidades)`);

            // Generar turnos para este médico
            const nuevosTurnos = this._generarTurnosParaMedico(medico, ahora, hasta);
            
            if (nuevosTurnos.length === 0) {
                console.log(`      No se generaron turnos para ${medico.nombre}`);
                continue;
            }

            console.log(`     Turnos generados: ${nuevosTurnos.length}`);

            // Verificar turnos existentes para evitar duplicados
            const existentes = await TurnoModel.find({
                medico: medico._id,
                estado: EstadoTurno.DISPONIBLE,
                fechaHora: { $gte: ahora, $lte: hasta }
            });

            const keys = new Set(existentes.map(t => 
                `${t.fechaHora.getTime()}-${t.servicio}-${t.sede}`
            ));

            const aInsertar = nuevosTurnos.filter(t => {
                const k = `${t.fechaHora.getTime()}-${t.servicio}-${t.sede}`;
                return !keys.has(k);
            });

            if (aInsertar.length > 0) {
                await TurnoModel.insertMany(aInsertar, { ordered: false });
                total += aInsertar.length;
                console.log(`     Insertados: ${aInsertar.length} turnos nuevos`);
            }
        }

        console.log(`\n[BATCH] Resumen:`);
        console.log(`   - Médicos totales: ${medicos.length}`);
        console.log(`   - Médicos sin disponibilidad: ${medicosSinDisponibilidad}`);
        console.log(`   - Médicos procesados: ${medicosProcesados}`);
        console.log(`   - Total turnos generados: ${total}`);

        return { total };
    }

    _generarTurnosParaMedico(medico, fechaDesde, fechaHasta) {
        const turnos = [];
        const fechaActual = new Date(fechaDesde);
        fechaActual.setHours(0, 0, 0, 0);

        while (fechaActual <= fechaHasta) {
            const diaSemana = this._obtenerDiaSemana(fechaActual);
            
            // Filtrar disponibilidades para este día de la semana
            const disponibilidadesDelDia = medico.disponibilidades.filter(disp => {
                // diasSemana es un ARRAY en tu modelo
                return disp.diasSemana && disp.diasSemana.includes(diaSemana);
            });

            for (const disp of disponibilidadesDelDia) {
                // Validar que el populate funcionó correctamente
                if (!disp.sede || !disp.servicio) {
                    console.warn(`      Disponibilidad sin sede o servicio (populate falló):`, disp);
                    continue;
                }

                // Generar slots horarios
                const slots = this._generarSlots(disp, fechaActual);
                
                for (const fechaHora of slots) {
                    turnos.push({
                        medico: medico._id,
                        fechaHora: fechaHora,
                        sede: disp.sede._id,
                        servicio: disp.servicio._id,
                        tipoServicio: disp.tipoServicioDisp || "Especialidad",
                        estado: EstadoTurno.DISPONIBLE,
                        historialEstados: [],
                        costo: disp.servicio.costo || 10000,
                        paciente: null
                    });
                }
            }

            fechaActual.setDate(fechaActual.getDate() + 1);
        }

        return turnos;
    }

    _generarSlots(disponibilidad, fecha) {
        const slots = [];
        const duracion = disponibilidad.servicio.duracionTurnoEnMins || 30;
        
        const [horaDesde, minDesde] = disponibilidad.horaInicio.split(":").map(Number);
        const [horaHasta, minHasta] = disponibilidad.horaFin.split(":").map(Number);
        
        const inicio = new Date(fecha);
        inicio.setHours(horaDesde, minDesde, 0, 0);
        
        const fin = new Date(fecha);
        fin.setHours(horaHasta, minHasta, 0, 0);
        
        const actual = new Date(inicio);
        
        while (actual <= fin) {
            const finSlot = new Date(actual);
            finSlot.setMinutes(finSlot.getMinutes() + duracion);
            
            if (finSlot > fin) break;
            
            slots.push(new Date(actual));
            actual.setMinutes(actual.getMinutes() + duracion);
        }
        
        return slots;
    }

    _obtenerDiaSemana(fecha) {
        const dias = [
            DiaSemana.DOMINGO,
            DiaSemana.LUNES,
            DiaSemana.MARTES,
            DiaSemana.MIERCOLES,
            DiaSemana.JUEVES,
            DiaSemana.VIERNES,
            DiaSemana.SABADO
        ];
        return dias[fecha.getDay()];
    }
}
