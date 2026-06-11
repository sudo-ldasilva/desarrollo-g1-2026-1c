import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Typography, Box } from '@mui/material';
import CardTurno from '../../components/CardTurno/CardTurno';
import './CarritoPreseleccion.css';


const CarritoPreseleccion = ({ carrito, eliminarDelCarrito, limpiarCarrito, persistirReservasEnBackend }) => {
  const navigate = useNavigate();

  const handleConfirmar = async () => {
    try {
      if (persistirReservasEnBackend) {
        await persistirReservasEnBackend(carrito);
      }
      alert(`¡Todos tus turnos fueron reservados con éxito!`);
      limpiarCarrito();
      navigate('/solicitar-turnos'); 
    } 
    catch (error) {
      alert("Hubo un error al procesar la reserva. Intentalo de nuevo.");
    }
  };

  const handleCancelarTodo = () => {
    if (window.confirm("¿Estás seguro de que querés cancelar toda la preselección? Se vaciará el carrito.")) {
      limpiarCarrito();
      navigate('/app/solicitar-turnos');
    }
  };

  return (
    <div className="root">
      <Card className="form-container">
        <h4 className='titulo-preseleccion'>
          Resumen de Preselección
        </h4>

        {carrito.length === 0 ? (
          <Box className='caja-vacios'>
            <p>Tu carrito de turnos está vacío.</p>
            <Button 
              onClick={() => navigate('/solicitar-turnos')}
            >
              Ir a Buscar Turnos
            </Button>
          </Box>
        ) : (
          <div className="carrito-layout">
            <div className="carrito-listado">
              <h6>Revisá tus turnos seleccionados ({carrito.length})</h6>
              {carrito.map((turno) => (
                <div key={turno._id || turno.id}>
                  <CardTurno turno={turno} />

                  <Button className='quitar-turno'
                    onClick={() => eliminarDelCarrito(turno._id || turno.id)}
                  >
                    ❌ Quitar de la preselección
                  </Button>
                </div>
              ))}
            </div>

            <Box className="carrito-acciones">
                    <Button 
                        variant="outlined"
                        className='btn-cancelar-todo'
                        onClick={handleCancelarTodo}
                    >
                        Cancelar Preselección
                    </Button>
                    
                    <Button 
                        variant="contained"
                        className='confirmar'
                        onClick={handleConfirmar}
                    >
                        Confirmar y Reservar Todo
                    </Button>
            </Box>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CarritoPreseleccion;