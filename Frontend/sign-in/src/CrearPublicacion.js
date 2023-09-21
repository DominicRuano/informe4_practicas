import React, { useState, useEffect } from 'react';
import './CrearPublicacion.css';
import { format } from 'date-fns';
import ReactDOM from 'react-dom';
import PantallaPrincipal from './pantallaPrincipal';
import Cookies from 'js-cookie';

const CrearPublicacion = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    sobre_quien: '',
    fecha_publicacion: '',
    tipo: '',
    id_usuario: '',
  });

  const [mensajeError, setMensajeError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);
  const [cursos, setCursos] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);

  useEffect(() => {
    obtenerCursos();
    obtenerCatedraticos();// Obtener cursos y catedráticos si es necesario
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mostrarMensajeDeExito = (mensaje) => {
    setMensajeExito(mensaje);
    setTimeout(() => {
      setMensajeExito(null);
    }, 2000);
    console.log('Respuesta de éxito:', mensaje);
  };

  const mostrarMensajeDeError = (mensaje) => {
    setMensajeError(mensaje);
    setTimeout(() => {
      setMensajeError(null);
    }, 5000);
    console.log('Respuesta de error:', mensaje);
  };

  const obtenerCursos = async () => {
    try {
      const response = await fetch('https://api-taller4.onrender.com/cursos');
      if (response.ok) {
        const data = await response.json();
        setCursos(data);
        console.log('Cursos:', data);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

  const obtenerCatedraticos = async () => {
    try {
      const response = await fetch('https://api-taller4.onrender.com/catedratico');
      if (response.ok) {
        const data = await response.json();
        setCatedraticos(data);
        console.log('Catedráticos:', data);
      }
    } catch (error) {
      console.error('Error al obtener catedráticos:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo || !formData.contenido || !formData.sobre_quien || !formData.tipo) {
      mostrarMensajeDeError('Todos los campos son obligatorios.');
      return;
    }

    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

    const idUsuario = Cookies.get('idUsuario');

    if (!idUsuario) {
      mostrarMensajeDeError('No se pudo obtener el ID del usuario.');
      return;
    }

    const url = 'https://api-taller4.onrender.com/publicacion';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: formData.titulo,
          contenido: formData.contenido,
          sobre_quien: formData.sobre_quien,
          fecha_publicacion: formattedDate,
          tipo: formData.tipo,
          id_usuario: idUsuario,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        mostrarMensajeDeExito(responseData.message);
      } else {
        const errorData = await response.json();
        mostrarMensajeDeError(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      mostrarMensajeDeError('Hubo un problema al procesar la solicitud.');
    }

    console.log('Datos del formulario:', formData);
  };

  const irAPrincipal = () => {
    ReactDOM.render(<PantallaPrincipal />, document.getElementById('root'));
  };

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setFormData({
      ...formData,
      tipo: selectedTipo,
      sobre_quien: '',
    });
  };

  return (
    <div className="crear-publicacion" style={{ marginTop: '45px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h1>Crear Publicación</h1>
      <form onSubmit={handleSubmit}>
        <div className="campo">
          <label htmlFor="tipo">Tipo:</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleTipoChange}
          >
            <option value="">Seleccionar</option>
            <option value="0">0 (Curso)</option>
            <option value="1">1 (Catedrático)</option>
          </select>
        </div>

        {formData.tipo === '0' && (
          <div className="campo">
            <label htmlFor="sobre_quien">Sobre Quién (Curso):</label>
            <select
              id="sobre_quien"
              name="sobre_quien"
              value={formData.sobre_quien}
              onChange={handleChange}
            >
             <option value="">Seleccionar</option>
                {cursos.map((curso) => (
                <option key={curso.idCurso} value={curso.nombre}>
                {curso.idCurso} - {curso.nombre_curso}
               </option>
              ))}
            </select>
          </div>
        )}

        {formData.tipo === '1' && (
          <div className="campo">
            <label htmlFor="sobre_quien">Sobre Quién (Catedrático):</label>
            <select
              id="sobre_quien"
              name="sobre_quien"
              value={formData.sobre_quien}
              onChange={handleChange}
            >
              <option value="">Seleccionar</option>
              {catedraticos.map((catedratico) => (
                <option key={catedratico.id} value={catedratico.nombre}>
                  {catedratico.nombre}
                </option>
              ))}
            </select>
          </div>
        )}
        
        <div className="campo">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label htmlFor="contenido">Contenido:</label>
          <textarea
            id="contenido"
            name="contenido"
            value={formData.contenido}
            onChange={handleChange}
            style={{ height: '100px', width: '95%' }}
          />
        </div>

        <div>
          <button type="submit">Crear Publicación</button>
          {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
          {mensajeError && <div className="mensaje-error">{mensajeError}</div>}
        </div>
      </form>
      <div>
        <button onClick={irAPrincipal}>Regresar</button>
      </div>
    </div>
  );
};

export default CrearPublicacion;
