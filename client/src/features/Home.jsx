import { useLogto } from '@logto/react';
import { useEffect, useRef } from 'react';
import LoadingSplash from '../components/LoadingSplash.jsx';

const Home = () => {
  const { signIn, isLoading } = useLogto();

  const called = useRef(false);

  console.log("HOME");

  useEffect(() => {
    if (!isLoading && !called.current) {
      called.current = true;
      signIn(`${window.location.origin}/callback`);
    }
  }, [isLoading, signIn]);

  return <LoadingSplash message="Conectando con Sweet Medical..." />;
};

export default Home;
