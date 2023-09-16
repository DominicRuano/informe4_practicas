import React, { useState, useEffect } from 'react';

const Publicacion = ({ publicacion }) => {
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
    // Realiza una solicitud POST para obtener los comentarios de esta publicación
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
  }, [publicacion.idPublicacion]);

  const handleComentarioChange = (event) => {
    setNuevoComentario(event.target.value);
  };

  const enviarComentario = () => {
    // Realiza una solicitud POST para enviar el comentario a la API
    fetch('https://api-taller4.onrender.com/agregar-comentario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_pub: publicacion.idPublicacion, contenido: nuevoComentario }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza la lista de comentarios después de agregar un comentario nuevo
        if (Array.isArray(data)) {
          setComentarios(data);
          setNuevoComentario(''); // Borra el contenido del campo de comentario
        } else {
          console.error('La respuesta de la API después de agregar un comentario no es un arreglo:', data);
        }
      })
      .catch((error) => {
        console.error('Error al agregar un comentario:', error);
      });
  };

  return (
    <div className="publicacion">
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

      {/* Agregar campo de comentario y botón */}
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
  );
};

export default Publicacion;
