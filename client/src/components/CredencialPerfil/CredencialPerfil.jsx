import React from 'react';
import { Box, Typography } from '@mui/material';
import './CredencialPerfil.css';

const CredencialPerfil = ({ usuario }) => {
  const {
    nombre = 'Nombre',
    apellido = 'Apellido',
    dni = 'XX.XXX.XXX',
    obraSocial = 'Particular',
    plan = 'Sin Plan'
  } = usuario;

  return (
    <Box className="credencial-card">
      <Box className="credencial-overlay" />
        <img className='credencial-header' src="/logoSinFondo.png" alt="Logo de swiss medical"></img>
      <Box className="credencial-body">
        <Box className="credencial-row full-width">
          <span className="label">AFILIADO</span>
          <span className="value name">{`${nombre} ${apellido}`.toUpperCase()}</span>
        </Box>

        <Box display="flex" justifyContent="space-between" width="100%" gap="1rem">
          <Box className="credencial-row">
            <span className="label">DOCUMENTO</span>
            <span className="value">{dni}</span>
          </Box>
          <Box className="credencial-row align-right">
            <span className="label">PLAN</span>
            <span className="value plan-badge">{plan}</span>
          </Box>
        </Box>

        <Box className="credencial-row full-width" style={{ marginTop: '0.5rem' }}>
          <span className="label">Obra social</span>
          <span className="value os-text">{obraSocial}</span>
        </Box>
      </Box>
    </Box>
  );
};

export default CredencialPerfil;