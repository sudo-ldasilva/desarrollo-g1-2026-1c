import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { 
  Container, Card, CardContent, Typography, List, ListItem, 
  ListItemText, CircularProgress, Alert, Box, Pagination, 
  PaginationItem, IconButton, Tooltip, Badge
} from "@mui/material";
import DraftsIcon from "@mui/icons-material/Drafts";
import { obtenerNotificaciones, marcarNotificacionComoLeida } from "../../services/NotificacionesService";
import "./Notificaciones.css";
import { useAuth } from "../../hooks/useAuth";

const LIMITE = 5;

const formatearFecha = (fechaISO) => {
  const fecha = new Date(fechaISO);
  const dia = fecha.toLocaleDateString("es-AR");
  const hora = fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false });
  return `${dia} ${hora}`;
};

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [paginasConNoLeidos, setPaginasConNoLeidos] = useState([]);
  const {getAccessToken} = useAuth();
  const {decrementarContador} = useOutletContext();

  const cargarNotificaciones = useCallback(async (pag) => {
    try {
      setCargando(true);

      const accessToken = await getAccessToken(process.env.REACT_APP_LOGTO_RESOURCES);
      if(!accessToken) return;
      const data = await obtenerNotificaciones(accessToken, undefined, pag, LIMITE);
      setNotificaciones(data.notificaciones || []);
      setTotalPages(data.totalPages || 1);
      setPaginasConNoLeidos(data.paginasConNoLeidos || []);
    } catch (err) {
      setError("No se pudieron cargar las notificaciones. Intente nuevamente más tarde.");
    } finally {
      setCargando(false);
    }
  }, [getAccessToken]);

  useEffect(() => {
    cargarNotificaciones(pagina);
  }, [pagina, cargarNotificaciones]);

  const handleMarcarComoLeida = async (id) => {
    try {
        const accessToken = await getAccessToken(process.env.REACT_APP_LOGTO_RESOURCES);
        if(!accessToken) return;
        
        await marcarNotificacionComoLeida(accessToken, id);
        
        // 1. Verificar si esta es la ultima notificacion sin leer de la pagina actual
        const noLeidasEnPaginaActual = notificaciones.filter(n => !n.leida);
        const notifACambiar = notificaciones.find(n => n._id === id);
        
        // Si solo quedaba 1 sin leer en esta pagina, y es la que estamos marcando...
        if (noLeidasEnPaginaActual.length === 1 && notifACambiar && !notifACambiar.leida) {
            // ...removemos la pagina actual del array que controla los badges del paginador
            setPaginasConNoLeidos(prevPaginas => prevPaginas.filter(p => p !== pagina));
        }

        // 2. Actualizar el estado local de la lista de notificaciones
        setNotificaciones((prev) =>
            prev.map((n) =>
                n._id === id ? { ...n, leida: true, fechaHoraLeida: new Date().toISOString() } : n
            )
        );
        
        // 3. Decrementar el contador global del UserMenu (el badge del header)
        decrementarContador();
        
    } catch (err) {
        alert("Error al marcar la notificación como leída.");
    }
};

  const handleCambiarPagina = (event, value) => {
    setPagina(value);
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
              No hay notificaciones.
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
                className={
                  notificacion.leida
                    ? "notificacion-item notificacion-item-leida"
                    : "notificacion-item notificacion-item-no-leida"
                }
                secondaryAction={
                  !notificacion.leida && (
                    <Tooltip title="Marcar como leída">
                      <IconButton
                        className="btn-marcar-leida-icon"
                        onClick={() => handleMarcarComoLeida(notificacion._id)}
                        size="small"
                      >
                        <DraftsIcon />
                      </IconButton>
                    </Tooltip>
                  )
                }
              >
                <ListItemText
                  primary={notificacion.mensaje}
                  secondary={`De: ${notificacion.remitente} | ${formatearFecha(notificacion.fechaHoraCreacion)}`}
                  primaryTypographyProps={{
                    fontWeight: notificacion.leida ? "normal" : "bold"
                  }}
                />
              </ListItem>
            ))}
          </List>
          {totalPages > 1 && (
            <Box className="notificaciones-paginacion">
              <Pagination
                count={totalPages}
                page={pagina}
                onChange={handleCambiarPagina}
                renderItem={(item) => {
    if (item.type === "page") {
        const tieneNoLeidos = paginasConNoLeidos.includes(item.page);
        const isSelected = item.selected;

        // Caso 1: Pagina seleccionada Y con no leídos ---> Badge + estilos personalizados
        if (isSelected && tieneNoLeidos) {
            return (
                <Badge
                    variant="dot"
                    color="error"
                    overlap="rectangular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    slotProps={{ badge: { sx: { right: 9, top: 6 } } }}
                >
                    <PaginationItem 
                        {...item} 
                        sx={{ color: "red", fontWeight: "bold", backgroundColor: "transparent !important" }}
                    />
                </Badge>
            );
        }

        // Caso 2: Pagina seleccionada SIN no leidos ---> Solo estilos personalizados
        if (isSelected) {
            return (
                <PaginationItem
                    {...item}
                    sx={{ color: "red", fontWeight: "bold", backgroundColor: "transparent !important" }}
                />
            );
        }

        // Caso 3: Pagina NO seleccionada PERO con no leidos ---> Solo Badge
        if (tieneNoLeidos) {
            return (
                <Badge
                    variant="dot"
                    color="error"
                    overlap="rectangular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    slotProps={{ badge: { sx: { right: 9, top: 6 } } }}
                >
                    <PaginationItem {...item} />
                </Badge>
            );
        }
    }
    // Caso 4: Pagina normal sin particularidades
    return <PaginationItem {...item} />;
}}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Notificaciones;
