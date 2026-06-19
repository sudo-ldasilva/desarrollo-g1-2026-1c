import React from 'react';
import { Box } from '@mui/material';
import './CredencialPerfil.css';


const CredencialPerfil = ({ paciente = {} }) => {
  const nombre = paciente.nombre || 'Nombre completo';
  const dni = paciente.dni || 'XX.XXX.XXX';
  
  const planTexto = paciente.plan && typeof paciente.plan === 'object'
    ? paciente.plan.nombre
    : paciente.plan || 'Sin Plan';


  const obraSocialTexto = paciente.obraSocial && typeof paciente.obraSocial === 'object'
    ? paciente.obraSocial.nombre
    : paciente.obraSocial || 'Sin Obra Social';

  return (
    <Box className="credencial-card">
      <Box className="credencial-overlay" />
      <img className='credencial-header' src="/logoSinFondo.png" alt="Logo de swiss medical" />
      
      <Box className="credencial-body">
        <Box className="credencial-row full-width">
          <span className="label">AFILIADO</span>
          <span className="value name">{`${nombre}`.toUpperCase()}</span>
        </Box>

        <Box display="flex" justifyContent="space-between" width="100%" gap="1rem">
          <Box className="credencial-row">
            <span className="label">DOCUMENTO</span>
            <span className="value">{dni}</span>
          </Box>
          <Box className="credencial-row align-right">
            <span className="label">PLAN</span>
            <span className="value plan-badge">{planTexto}</span>
          </Box>
        </Box>

        <Box className="credencial-row full-width" style={{ marginTop: '0.5rem' }}>
          <span className="label">Obra social</span>
          <span className="value os-text">{obraSocialTexto}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default CredencialPerfil;