import { useLogto } from '@logto/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
  const { signIn, isAuthenticated, isLoading } = useLogto();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Si ya está logueado, navega a la app
        navigate('/app');
      } else {
        // Si no está logueado, al login de Logto automaticamente
        signIn('http://localhost:3000/callback');
      }
    }
  }, [isAuthenticated, isLoading, navigate, signIn]);

  return (
    <div style={{ textAlign: 'center', marginTop: '5rem', fontFamily: "'Poppins', sans-serif" }}>
      <h2>Conectando con Sweet Medical...</h2>
      <p>Redireccionando al inicio de sesión seguro.</p>
    </div>
  );
};

export default Home;