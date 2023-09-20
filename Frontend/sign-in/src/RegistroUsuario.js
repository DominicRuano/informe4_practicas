import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './InicioSesion.css'; // Importa los estilos CSS
import './pantallaPrincipal'; // Importa los estilos CSS
import InicioSesion from './InicioSesion';
import PantallaPrincipal from './pantallaPrincipal';



const RegistroUsuario = () => {
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    carnet: "",
    nombre: '',
    apellidos: '',
    contrasena: '',
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
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carnet: formData.carnet,
          nombres: formData.nombre,
          apellidos: formData.apellidos,
          contrasena: formData.contraseña,
          email: formData.correo,
        }),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        mostrarMensajeDeError('Usuario Registrado con exito, se redirecciona a la pagina de inicio de sesion.');
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
      carnet: formData.carnet,
      nombres: formData.nombre,
      apellidos: formData.apellidos,
      contrasena: formData.contraseña,
      email: formData.correo,
    });
  };

  return (
    <div className="registro-usuario">
      <h1>Registro de Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="carnet">Carné:</label>
          <input
            type="text"
            id="carnet"
            name="carnet"
            value={formData.carnet}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="campo">
          <label htmlFor="apellidos">Apellidos:</label>
          <input
            type="text"
            id="apellidos"
            name="apellidos"
            value={formData.apellidos}
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
        <button type="submit">Registrar</button>
      </form>
      <form onSubmit={iraLogin}>
        <label>¿Ya tienes una cuenta?</label>
        <button>ir a login</button>
      </form>
      </div>
  );
};

export default RegistroUsuario;