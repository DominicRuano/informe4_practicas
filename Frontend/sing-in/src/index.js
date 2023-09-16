import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistroUsuario from './RegistroUsuario';
import InicioSesion from './InicioSesion';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<RegistroUsuario />} />
        <Route path="/inicio-sesion" element={<InicioSesion />} />
        {/* Otras rutas */}
      </Routes>
    </Router>
  );
};

export default App;
