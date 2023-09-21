import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const Publicacion = ({ publicacion, actualizarComentarios }) => {
  const tipo = publicacion.tipo === 0 ? 'Curso' : 'Maestro';
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');

  const fechaFormateada = () => {
    try {
      return new Date(publicacion.fecha_publicacion).toDateString();
    } catch (error) {
      console.error('Error al formatear la fecha', error);
      return 'Fecha no válida';
    }
  };

  useEffect(() => {
    obtenerComentarios();
  }, [publicacion.idPublicacion]);

  const idUsuario = Cookies.get('idUsuario');  // Obtener el valor de la cookie 'idUsuario'

  const obtenerComentarios = () => {
    fetch('https://api-taller4.onrender.com/buscarc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_pub: publicacion.idPublicacion }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComentarios(data);
        } else {
          console.error('La respuesta de la API de comentarios no es un arreglo:', data);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los comentarios:', error);
      });
  };

  const handleComentarioChange = (event) => {
    setNuevoComentario(event.target.value);
  };

  const enviarComentario = () => {
    const fechaActual = new Date().toISOString().slice(0, 19).replace("T", " ");

    const comentarioData = {
      contenido: nuevoComentario,
      fecha: fechaActual,
      idPub: publicacion.idPublicacion,
      idUsuarioPub: publicacion.Usuario_idUsuario,
      idUsuarioActual: idUsuario,  // Utiliza el valor de la cookie
    };

    fetch('https://api-taller4.onrender.com/comentario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comentarioData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al agregar un comentario');
        }
        return response.json();
      })
      .then((data) => {
        if (data.message === "Comentario creado") {
          obtenerComentarios();  // Actualiza los comentarios después de agregar uno
          setNuevoComentario('');
          actualizarComentarios(data); // Actualiza los comentarios en todas las publicaciones
        } else {
          console.error('La respuesta de la API después de agregar un comentario no es válida:', data);
        }
      })
      .catch((error) => {
        console.error('Error al agregar un comentario:', error);
      });
  };

  return (
    <div>
      <div className="publicacion">
        {/* Contenido de la publicación */}
        <h2>{publicacion.titulo}</h2>
        <p>Tipo: {tipo}</p>
        <p>{publicacion.contenido}</p>
        <p className="fecha">Fecha: {fechaFormateada()}</p>
        <p>Sobre: {publicacion.sobre_quien}</p>
        
        {comentarios.length > 0 && (
          <div className="comentarios">
            <h3>Comentarios:</h3>
            <ul>
              {comentarios.map((comentario, index) => (
                <li key={index}>{comentario.contenido}</li>
              ))}
            </ul>
          </div>
        )}
  
        <div className="nuevo-comentario">
          <input
            type="text"
            placeholder="Escribe un comentario..."
            value={nuevoComentario}
            onChange={handleComentarioChange}
          />
          <button onClick={enviarComentario}>Comentar</button>
        </div>
      </div>
    </div>
  );
  
  
  
  
};

export default Publicacion;
