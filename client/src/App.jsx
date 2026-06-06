import { createTheme, ThemeProvider } from '@mui/material';
import Dashboard from "./features/dashboard/Dashboard.jsx"

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
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;
