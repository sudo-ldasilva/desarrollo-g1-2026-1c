// import { Routes, Route } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material';
// import React, { useState } from 'react';
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
    // <ThemeProvider theme={theme}>
      <Dashboard />
  //     <Routes>
  //       <Route path="/" element={<Layout carrito={carrito} />}>
  //         <Route index element={<Home />} />
  //         <Route
  //           path="/productos/:id"
  //           element={
  //             <ProductDetailPage
  //               carrito={carrito}
  //               actualizarCarrito={actualizarCarrito}
  //             />
  //           }
  //         />
  //         <Route
  //           path="/checkout"
  //           element={
  //             <Checkout
  //               carrito={carrito}
  //               limpiarCarrito={limpiarCarrito}
  //             />
  //           }
  //         />
  //       </Route>
  //     </Routes>
    // </ThemeProvider>
  );
}

export default App;
