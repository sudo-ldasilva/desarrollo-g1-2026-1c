import { createTheme, ThemeProvider } from '@mui/material';
import EntornoUsuario from "./features/entornoUsuario/EntornoUsuario.jsx"

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

    return (
        <ThemeProvider theme={theme}>
            <EntornoUsuario />
        </ThemeProvider>
    );
}

export default App;
