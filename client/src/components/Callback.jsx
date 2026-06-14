import { useEffect, useRef } from 'react';
import { useHandleSignInCallback } from '@logto/react';
import { useAuth } from '../hooks/useAuth.jsx';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../services/PerfilService';
import LoadingSplash from './LoadingSplash/LoadingSplash.jsx';

const Callback = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, getAccessToken } = useAuth();
  const { isLoading: callbackLoading } = useHandleSignInCallback(() => {});

  const ran = useRef(false);

  console.log("CALLBACK");

  useEffect(() => {
    if (callbackLoading || isLoading) return;
    if (!isAuthenticated) return;
    if (ran.current) return;

    ran.current = true;

    const resolve = async () => {
      try {
        const token = await getAccessToken("https://api-sweet-medical.com");
        if (!token) return;
        const me = await getMe(token);

        navigate(me.tienePerfil ? "/app" : "/completar-perfil", {
          replace: true,
        });
      } catch (e) {
        console.error("callback error", e);
        ran.current = false;
      }
    };

    resolve();
  }, [callbackLoading, isLoading, isAuthenticated, getAccessToken, navigate]);

  return <LoadingSplash message="Procesando sesión..." />;
};

export default Callback;