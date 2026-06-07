import { useHandleSignInCallback } from '@logto/react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();
 
    const { isLoading } = useHandleSignInCallback(() => {
      // Al terminar el login con éxito, entra a la app
      navigate("/app"); 
    });

    if (isLoading) {
      return <div>Procesando sesión en Sweet Medical...</div>;
    }

    return null;
};

export default Callback;