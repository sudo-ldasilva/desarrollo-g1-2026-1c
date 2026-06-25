import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    IconButton,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import './ConfirmarReservaDialog.css';

const ConfirmarReservaDialog = ({ open, turno, reservando, resultado, onConfirm, onCancel }) => {
    const navigate = useNavigate();

    if (!turno) return null;

    const fecha = new Date(turno.fechaHora);
    const dia = fecha.toLocaleDateString("es-AR", { weekday: "long" });
    const numero = fecha.toLocaleDateString("es-AR", { day: "numeric" });
    const mes = fecha.toLocaleDateString("es-AR", { month: "long" });
    const hora = fecha.toLocaleTimeString("es-AR", {
        hour: "2-digit", minute: "2-digit", hour12: false
    });
    const diaCap = dia.charAt(0).toUpperCase() + dia.slice(1);
    const mesCap = mes.charAt(0).toUpperCase() + mes.slice(1);

    const isSuccess = resultado === "success";
    const isError = resultado === "error";
    const isLoading = reservando && !resultado;
    const showForm = !reservando && !resultado;

    const handleCerrarYNavegar = (ruta) => {
        onCancel();
        navigate(ruta);
    };

    return (
        <Dialog open={open} onClose={resultado ? undefined : onCancel} maxWidth="xs" fullWidth classes={{ paper: "ConfirmarReservaDialog_paper" }}>
            {showForm && (
                <>
                    <DialogTitle className="ConfirmarReservaDialog_title">
                        Detalle de turno
                        <IconButton
                            className="ConfirmarReservaDialog_close"
                            onClick={onCancel}
                            size="small"
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <hr className="ConfirmarReservaDialog_divisor" />

                    <DialogContent className="ConfirmarReservaDialog_content">
                        <div className="ConfirmarReservaDialog_row">
                            <span className="ConfirmarReservaDialog_label">Medico</span>
                            <span className="ConfirmarReservaDialog_value">{turno.medico.nombre}</span>
                        </div>

                        <div className="ConfirmarReservaDialog_row">
                            <span className="ConfirmarReservaDialog_label">Servicio</span>
                            <span className="ConfirmarReservaDialog_value">{turno.servicio.nombre}</span>
                        </div>

                        <div className="ConfirmarReservaDialog_row">
                            <span className="ConfirmarReservaDialog_label">Ubicación</span>
                            <span className="ConfirmarReservaDialog_value">
                                {turno.sede.nombre}, {turno.sede.direccion}
                            </span>
                        </div>

                        <div className="ConfirmarReservaDialog_row">
                            <span className="ConfirmarReservaDialog_label">Día y horario</span>
                            <span className="ConfirmarReservaDialog_value">
                                {diaCap} {numero} de {mesCap} a las {hora} horas
                            </span>
                        </div>
                    </DialogContent>

                    <DialogActions className="ConfirmarReservaDialog_actions">
                        <Button
                            className="ConfirmarReservaDialog_btn"
                            variant="contained"
                            disabled={reservando}
                            onClick={onConfirm}
                        >
                            Confirmar turno
                        </Button>
                    </DialogActions>
                </>
            )}

            {isLoading && (
                <div className="ConfirmarReservaDialog_loadingOverlay">
                    <CircularProgress size={48} sx={{ color: "var(--rojo-principal, #D40032)" }} />
                </div>
            )}

            {isSuccess && (
                <>
                    <DialogContent className="ConfirmarReservaDialog_resultContainer">
                        <div className="ConfirmarReservaDialog_resultIconWrap">
                            <CheckCircleIcon className="ConfirmarReservaDialog_iconSuccess" />
                        </div>
                        <h3 className="ConfirmarReservaDialog_resultTitle">Turno confirmado</h3>

                        <div className="ConfirmarReservaDialog_successInfo">
                            <div className="ConfirmarReservaDialog_successInfoRow">
                                <span className="ConfirmarReservaDialog_successInfoLabel">Día y horario</span>
                                <span className="ConfirmarReservaDialog_successInfoValue">
                                    {diaCap} {numero} de {mesCap} a las {hora} horas
                                </span>
                            </div>
                            <div className="ConfirmarReservaDialog_successInfoRow">
                                <span className="ConfirmarReservaDialog_successInfoLabel">Ubicación</span>
                                <span className="ConfirmarReservaDialog_successInfoValue">
                                    {turno.sede.nombre}, {turno.sede.direccion}
                                </span>
                            </div>
                            <div className="ConfirmarReservaDialog_successInfoRow">
                                <span className="ConfirmarReservaDialog_successInfoLabel">Doctor</span>
                                <span className="ConfirmarReservaDialog_successInfoValue">{turno.medico.nombre}</span>
                            </div>
                        </div>
                    </DialogContent>

                    <DialogActions className="ConfirmarReservaDialog_actions">
                        <Button
                            className="ConfirmarReservaDialog_navBtn"
                            variant="contained"
                            onClick={() => handleCerrarYNavegar("/app/dashboard")}
                        >
                            Ir al inicio
                        </Button>
                    </DialogActions>
                </>
            )}

            {isError && (
                <>
                    <DialogContent className="ConfirmarReservaDialog_resultContainer">
                        <div className="ConfirmarReservaDialog_resultIconWrap">
                            <CancelRoundedIcon className="ConfirmarReservaDialog_iconError" />
                        </div>
                        <h3 className="ConfirmarReservaDialog_resultTitle ConfirmarReservaDialog_resultTitleError">
                            Ocurrió un error al confirmar turno
                        </h3>
                    </DialogContent>

                    <DialogActions className="ConfirmarReservaDialog_actions">
                        <Button
                            className="ConfirmarReservaDialog_navBtn"
                            variant="contained"
                            onClick={() => handleCerrarYNavegar("/app/solicitar-turno")}
                        >
                            Solicitar nuevo turno
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default ConfirmarReservaDialog;
