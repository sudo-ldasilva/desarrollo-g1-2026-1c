import { createTheme, ThemeProvider } from '@mui/material';
import { LogtoProvider } from '@logto/react';
import EntornoUsuario from "./features/entornoUsuario/EntornoUsuario.jsx";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Callback from './components/Callback.jsx';
import Home from './features/Home.jsx';

const theme = createTheme({
    palette: {
        primary: {
            main: '#c90e31'
        }
    },
    typography: {
        fontFamily: "'Poppins', sans-serif"
    }
});

function App() {
  const config = {
    endpoint: 'https://mm32is.logto.app/',
    appId: 'o5yyg82jt0gb2b8nbiuje',
    redirectUri: `${window.location.origin}/callback`,
    postLogoutRedirectUri: `${window.location.origin}/`,
  };

  return (
      <LogtoProvider config={config}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="/app" element={<EntornoUsuario />} />
            </Routes>
          </ThemeProvider>
         </BrowserRouter>
      </LogtoProvider>
  );
}

export default App;
