import React, { useState, useEffect } from "react";
import { 
  Container, Card, CardContent, Typography, List, ListItem, 
  ListItemText, Button, CircularProgress, Alert, Box 
} from "@mui/material";
import { obtenerNotificaciones, marcarNotificacionComoLeida } from "../../services/NotificacionesService";
import "./Notificaciones.css";

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarNotificaciones = async () => {
      try {
        setCargando(true);
        // Solicitamos las notificaciones pendientes
        const data = await obtenerNotificaciones("pendientes");
        setNotificaciones(data.notificaciones || []);
      } catch (err) {
        setError("No se pudieron cargar las notificaciones. Intente nuevamente más tarde.");
      } finally {
        setCargando(false);
      }
    };

    cargarNotificaciones();
  }, []);

  const handleMarcarComoLeida = async (id) => {
    try {
      await marcarNotificacionComoLeida(id);
      // Actualizamos el estado local eliminando la notificación de la lista de pendientes
      setNotificaciones((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert("Error al marcar la notificación como leída.");
    }
  };

  if (cargando) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container className="notificaciones-container">
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (notificaciones.length === 0) {
    return (
      <Container className="notificaciones-container">
        <Card className="notificaciones-card">
          <CardContent className="notificaciones-vacio">
            <Typography variant="h6" color="textSecondary">
              No hay notificaciones pendientes.
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Estás al día con todas las novedades de tus turnos.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="notificaciones-container">
      <Card className="notificaciones-card">
        <CardContent>
          <Typography variant="h5" className="notificaciones-titulo" gutterBottom>
            Mis Notificaciones
          </Typography>
          <List>
            {notificaciones.map((notificacion) => (
              <ListItem 
                key={notificacion._id} 
                className="notificacion-item"
                secondaryAction={
                  <Button 
                    variant="outlined" 
                    size="small" 
                    onClick={() => handleMarcarComoLeida(notificacion._id)}
                  >
                    Marcar como leída
                  </Button>
                }
              >
                <ListItemText
                  primary={notificacion.mensaje}
                  secondary={`De: ${notificacion.remitente} | ${new Date(notificacion.fechaHoraCreacion).toLocaleString("es-AR")}`}
                  primaryTypographyProps={{ fontWeight: "medium" }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Notificaciones;
