import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import Publicacion from './Publicacion';
import './pantallaPrincipal.css';
import CrearPublicacion from './CrearPublicacion';
import PerfilUsuario from './PerfilUsuario';
import './CrearPublicacion.css';
import { setUsuarioData } from './PerfilUsuario.js';
import Cookies from 'js-cookie';

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


const PantallaPrincipal = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroSobreQuien, setFiltroSobreQuien] = useState('');
  const [busquedaUsuario, setBusquedaUsuario] = useState('');

  useEffect(() => {
    fetch('https://api-taller4.onrender.com/publicaciones')
      .then((response) => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          console.log(data);
          setPublicaciones(data);
        } else {
          console.error('La respuesta de la API no es un arreglo:', data);
        }
      })
      .catch((error) => console.error('Error al obtener las publicaciones', error));
  }, []);

  const handlePublicar = () => {
    ReactDOM.render(<CrearPublicacion />, document.getElementById('root'));
    // Hacer la solicitud a la API para crear una nueva publicación
  };

  const handleBuscarUsuario = (e) => {
    e.preventDefault(); // Prevenir la recarga de la página por defecto del formulario
  
    // Obtén el valor del campo de búsqueda
    const busqueda = busquedaUsuario.trim();
  
    // Verifica si la búsqueda está vacía
    if (busqueda === "") {
      alert("Ingresa un número de carnet válido.");
      return;
    }
  
    // Define el cuerpo de la solicitud POST
    const requestBody = {
      carnet: busqueda,
    };
  
    // Realiza la solicitud POST a la API
    fetch("https://api-taller4.onrender.com/buscaru", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        // Verificar si no se encontró ningún usuario
        if (!data || Object.keys(data).length === 0) {
          console.log("Usuario no encontrado.");
          // Mostrar un mensaje de error al usuario
          alert("Usuario no encontrado.");
        } else {
          // Aquí puedes manejar los datos del usuario devueltos por la API
          console.log("Datos del usuario:", data);
  
          // Guardar los datos del usuario en cookies
          Cookies.set('userData', JSON.stringify(data)); // Asegúrate de que 'data' sea un objeto válido
          ReactDOM.render(<PerfilUsuario />, document.getElementById('root'));
  
          // Lógica para actualizar la interfaz con los datos del usuario (por ejemplo, mostrarlos en un modal o en otro componente)
        }
      })
      .catch((error) => {
        console.error("Error al buscar usuario:", error);
        // Mostrar un mensaje de error al usuario
        alert("Ocurrió un error al buscar el usuario.");
      });
  };

  
  

  const filtrarPublicaciones = () => {
    let publicacionesFiltradas = publicaciones;

    if (filtroTipo !== 'todos') {
      publicacionesFiltradas = publicacionesFiltradas.filter(
        (publicacion) => publicacion.tipo === parseInt(filtroTipo)
      );
    }

    if (filtroSobreQuien !== '') {
      publicacionesFiltradas = publicacionesFiltradas.filter((publicacion) =>
        publicacion.sobre_quien.toLowerCase().includes(filtroSobreQuien.toLowerCase())
      );
    }

    return publicacionesFiltradas;
  };

  return (
    <div className="pantalla-principal">
      <h1>Publicaciones Usac Ingenieria</h1>
      <form onSubmit={handleBuscarUsuario}>
        <div className="buscar">
          <label htmlFor="busquedaUsuario">Buscar Usuario:</label>
          <input
            type="text"
            id="busquedaUsuario"
            name="busquedaUsuario"
            value={busquedaUsuario}
            onChange={(e) => setBusquedaUsuario(e.target.value)}
            placeholder="Nombre de usuario"
          />
          <button type="submit">Buscar</button>
        </div>
      </form>
      insertar aquí
      <div className="filtros">
        <div className="filtro">
          <label htmlFor="filtroTipo">Filtrar por Tipo:</label>
          <select
            id="filtroTipo"
            name="filtroTipo"
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="0">Curso</option>
            <option value="1">Catedrático</option>
          </select>
        </div>
        <div className="filtro">
          <label htmlFor="filtroSobreQuien">Filtrar por Sobre Quién:</label>
          <input
            type="text"
            id="filtroSobreQuien"
            name="filtroSobreQuien"
            value={filtroSobreQuien}
            onChange={(e) => setFiltroSobreQuien(e.target.value)}
            placeholder="Escribe el nombre del curso/maestro"
          />
        </div>
      </div>
      <div className="nueva-publicacion">
        <button onClick={handlePublicar}>Publicar</button>
      </div>
      <div className="publicaciones">
        {filtrarPublicaciones().map((publicacion, index) => (
          <Publicacion key={index} publicacion={publicacion} />
        ))}
      </div>
    </div>
  );
};

export default PantallaPrincipal;
