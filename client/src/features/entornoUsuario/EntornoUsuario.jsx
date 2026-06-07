import Dashboard from "../dashboard/Dashboard.jsx"
import MisTurnos from '../MisTurnos/MisTurnos.jsx';
import { useLogto } from '@logto/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import './EntornoUsuario.css';

const EntornoUsuario = () => {
    const { signOut, isAuthenticated, isLoading } = useLogto();
  const navigate = useNavigate();

  //  Si no está autenticado, rebota al inicio 
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Cargando la aplicación...</div>;


    return (
        <>
            <p>EntornoUsuario</p>
            <button  onClick={() => signOut('http://localhost:3000/')} className="boton-signOut">
                Cerrar Sesión
            </button>
            <Dashboard />
            <MisTurnos />
        </>
    )
};

export default EntornoUsuario;
