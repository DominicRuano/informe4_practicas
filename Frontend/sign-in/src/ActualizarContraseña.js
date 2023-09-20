import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './ActualizarContraseña.css'
import InicioSesion from './InicioSesion';


const ActualizarContraseña = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contrasena: '',
    carnet: '',
    correo: '',
  });

  const [contraseñaObligatoria, setContraseñaObligatoria] = useState(false);

  const iraLogin = () => {ReactDOM.render(<InicioSesion />, document.getElementById('root'));}

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
    }, 5000); // Elimina el mensaje después de 5 segundos (ajusta el tiempo según tus necesidades).
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!formData.contraseña) {
      setContraseñaObligatoria(true);
      return; // No envíes el formulario si no se proporcionó una contraseña
    }
    
    
    setContraseñaObligatoria(false);
    
    const url = 'https://api-taller4.onrender.com/usuario'; // URL de la API

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contrasena: formData.contraseña,
          carnet: formData.carnet,
          email: formData.correo,
        }),
      });

      if (response.ok) {
        console.log('Actulizacion exitosa');
        mostrarMensajeDeError('Contraseña actualizada correctamente.');
        ReactDOM.render(<InicioSesion />, document.getElementById('root'));
        // Puedes redirigir al usuario o mostrar un mensaje de éxito aquí.
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        mostrarMensajeDeError('El correo electrónico o  Carné ya está registrado.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }

    console.log('Datos del formulario:', {
      contrasena: formData.contraseña,
      carnet: formData.carnet, 
      email: formData.correo,
    });
  };

  return (
    <div className="actualizar">
      <h1>Recuperación de Contraseña</h1>
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
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="contraseña">Nueva Contraseña:</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      <form onSubmit={iraLogin}>
        <br></br>
        <label>¿Todo bien?</label>
        <button>ir a login</button>
      </form>
      </div>
  );
};

export default ActualizarContraseña;