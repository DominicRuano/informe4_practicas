// src/InicioSesion.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './InicioSesion.css'; // Importa los estilos CSS
import PantallaPrincipal from './pantallaPrincipal';
import ActualizarContraseña from './ActualizarContraseña';


const InicioSesion = () => {
  const [formData, setFormData] = useState({
    carnet: '',
    contraseña: '',
  });

  const iraLogin = () => {ReactDOM.render(<ActualizarContraseña />, document.getElementById('root'));}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mostrarMensajeDeError = (mensaje) => {
    const mensajeError = document.createElement('div');
    mensajeError.className = 'mensaje-error';
    mensajeError.textContent = mensaje;
    document.body.appendChild(mensajeError);
  
    // Borra el mensaje de error después de unos segundos (opcional).
    setTimeout(() => {
      mensajeError.remove();
    }, 3000); // Elimina el mensaje después de 5 segundos (ajusta el tiempo según tus necesidades).
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Agrega aquí la lógica para enviar los datos de inicio de sesión a la API o backend.
    
    const url = 'https://api-taller4.onrender.com/login'; // URL de la API

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carnet: formData.carnet,
          contrasena: formData.contraseña,
        }),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        mostrarMensajeDeError('¡Bienvenido!');
        ReactDOM.render(<PantallaPrincipal />, document.getElementById('root'));
  
      }

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  return (
    <div className="inicio-sesion">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="carnet">Carnet:</label>
          <input
            type="text"
            id="carnet"
            name="carnet"
            value={formData.carnet}
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
      <form onSubmit={iraLogin}>
        <br></br>
        <label>¿Haz olvidado tu contraseña?</label>
        <button>Recuperar contraseña</button>
      </form>
    </div>
  );
};

export default InicioSesion;