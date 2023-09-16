import React, { useState, useEffect } from 'react';
import Publicacion from './Publicacion';
import './pantallaPrincipal.css';

const PantallaPrincipal = () => {
  const [publicaciones, setPublicaciones] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [filtroSobreQuien, setFiltroSobreQuien] = useState('');

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
    // Hacer la solicitud a la API para crear una nueva publicación
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
