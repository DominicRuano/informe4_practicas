import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import './PerfilUsuario.css';
import PantallaPrincipal from './pantallaPrincipal';

const PerfilUsuario = () => {
  const [datosUsuario, setDatosUsuario] = useState(null);
  const [cursosUsuario, setCursosUsuario] = useState(null);


  function eliminarReadOnly(inputId) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.removeAttribute('readonly');
    }
  }


  useEffect(() => {
    // Obtiene la cookie con los datos del usuario como una cadena JSON
    const userDataCookie = Cookies.get('userData');
    const idUsuario = Cookies.get('idUsuario');

    // Verifica si la cookie está definida y no está vacía
    if (userDataCookie) {
      try {
    
        // Intenta parsear la cadena JSON a un objeto JavaScript
        const userData = JSON.parse(userDataCookie);
        
        //console.log('Datos del usuario guardados en la cookie:', userData);

        // Guarda los datos del usuario en el estado
        setDatosUsuario(userData);
        
        // Realiza una solicitud para obtener los cursos del usuario
        obtenerCursosUsuario(userData.idUsuario);;
        eliminarReadOnly('idUsuario');
        eliminarReadOnly('carnet');
        eliminarReadOnly('nombres');
        eliminarReadOnly('apellidos');
        eliminarReadOnly('email');
        
      } catch (error) {
        console.error('Error al parsear la cookie:', error);
      }
    }
  }, []);

  // Función para obtener los cursos del usuario desde la API
  const obtenerCursosUsuario = (idUsuario) => {
    // Define el cuerpo de la solicitud POST para obtener los cursos del usuario
    const requestBody = {
      id_usuario: datosUsuario[0].idUsuario,
    };

    // Realiza la solicitud POST para obtener los cursos del usuario
    fetch('https://api-taller4.onrender.com/cursosg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud para obtener los cursos no fue exitosa');
        }
        return response.json();
      })
      .then((cursosData) => {
        // Guarda los cursos del usuario en el estado
        setCursosUsuario(cursosData);
        console.log('Cursos del usuario:', cursosData);
      })
      .catch((error) => {
        console.error('Error al obtener los cursos del usuario:', error);
      });
  };

  const irAPrincipal = () => {
    ReactDOM.render(<PantallaPrincipal />, document.getElementById('root'));
  };

  return (
    <div className="perfil-usuario">
      <h2>Perfil de Usuario</h2>
      {datosUsuario ? (
        <form>
          <div>
          <label htmlFor="idUsuario">ID de Usuario:</label>
            <input type="text" id="idUsuario" name="idUsuario" value={datosUsuario[0].idUsuario} readOnly />
          </div>
          <div>
            <label htmlFor="carnet">Carnet:</label>
            <input type="text" id="carnet" name="carnet" value={datosUsuario[0].carnet} readOnly />
          </div>
          <div>
            <label htmlFor="nombres">Nombres:</label>
            <input type="text" id="nombres" name="nombres" value={datosUsuario[0].nombres} readOnly />
          </div>
          <div>
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" id="apellidos" name="apellidos" value={datosUsuario[0].apellidos} readOnly />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="text" id="email" name="email" value={datosUsuario[0].email} readOnly />
          </div>
          {/* Agrega aquí los campos para mostrar los datos del usuario (carnet, nombres, apellidos, email) */}
        </form>
      ) : (
        <div>No se encontraron datos de usuario.</div>
      )}
        {cursosUsuario === null ? (
        <div>Cargando cursos...</div>
        ) : cursosUsuario.length > 0 ? (
        <div>
            <h3>Cursos del Usuario</h3>
            <ul>
            {cursosUsuario.map((curso) => (
                <li key={curso.idCurso}>
                <div>{curso.nombre_curso}</div>
                <div>Créditos: {curso.creditos}</div>
                </li>
            ))}
            </ul>
        </div>
        ) : (
        <div>No se encontraron cursos del usuario.</div>
        )}
          <div>
          <button onClick={irAPrincipal}>Regresar</button>
        </div>
    </div>
  );
};

export default PerfilUsuario;
