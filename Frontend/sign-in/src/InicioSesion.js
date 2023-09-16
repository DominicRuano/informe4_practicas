// src/InicioSesion.js
import React, { useState } from 'react';

const InicioSesion = () => {
  const [formData, setFormData] = useState({
    email: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para enviar los datos de inicio de sesión a la API o backend.
  };

  return (
    <div className="inicio-sesion">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="contraseña">Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default InicioSesion;