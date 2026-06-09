import { describe, beforeEach, test, expect, jest } from "@jest/globals";
import { Agenda } from "../../domain/Agenda.js";
import { DiaSemana } from "../../domain/DiaSemana.js";
import { EstadoTurno } from "../../domain/EstadoTurno.js";
import DisponibilidadHoraria from "../../domain/DisponibilidadHoraria.js";

describe("Agenda", () => {

    let agenda;

    beforeEach(() => {
        agenda = new Agenda();
    });

    test("genera turnos según disponibilidad para un dia", () => {

        const servicio = {
            nombre: "Cardiología",
            duracionTurnoEnMins: 30
        };

        const sede = {
            nombre: "Hospital Durand"
        };

        const disponibilidad = new DisponibilidadHoraria({
            diaSemana: DiaSemana.LUNES,
            horaDesde: "08:00",
            horaHasta: "10:00",

            sede:sede,
            servicio:servicio,
        });

        const medico = {
            nombre: "Dr. House",
            disponibilidades: [disponibilidad]
        };

        const fecha = new Date(2026, 5, 1); //lunes

        const turnos =
            agenda.generarTurnosPara(
                medico,
                fecha,
                fecha
            );

        expect(turnos).toHaveLength(4);

        expect(turnos[0].estado)
            .toBe(EstadoTurno.DISPONIBLE);

        expect(turnos[0].medico)
            .toBe(medico);

        expect(turnos[0].servicio)
            .toBe(servicio);

        expect(turnos[0].sede)
            .toBe(sede);
    });

    test("no genera turnos si el día no coincide", () => {

        const disponibilidad = {
            diaSemana: DiaSemana.MARTES,

            generarSlots: jest.fn()
        };

        const medico = {
            disponibilidades: [disponibilidad]
        };

        const fecha = new Date("2026-06-01"); // lunes

        const turnos =
            agenda.generarTurnosPara(
                medico,
                fecha,
                fecha
            );

        expect(turnos).toHaveLength(0);

        expect(disponibilidad.generarSlots)
            .not.toHaveBeenCalled();
    });

    test("genera turnos para disp de Lunes, periodo una semana (genera para dos lunes)", () => {

        const servicio = {
            nombre: "Clinica medica",
            duracionTurnoEnMins: 60
        };

        const sede = {
            nombre: "Hospital Durand"
        };

        const disponibilidad = new DisponibilidadHoraria({
            diaSemana: DiaSemana.LUNES,
            horaDesde: "10:00",
            horaHasta: "12:00",
            servicio: servicio,
            sede: sede
        });

        const medico = {
            nombre: "Pepe",
            disponibilidades: [disponibilidad]
        };

        //incluye dos lunes
        const desde = new Date("2026-06-01");
        const hasta = new Date("2026-06-09");

        const turnos =
            agenda.generarTurnosPara(
                medico,
                desde,
                hasta
            );

        // console.log(turnos);

        expect(turnos).toHaveLength(4); //2 turnos por lunes
    });
});
