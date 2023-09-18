import React, { useState, useEffect } from 'react';
import './CrearPublicacion.css';
import { format } from 'date-fns';
import ReactDOM from 'react-dom';
import Publicacion from './Publicacion';
import PantallaPrincipal from './pantallaPrincipal';

const CrearPublicacion = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    contenido: '',
    sobre_quien: '',
    tipo: '', 
    id_usuario: '',
  });

  //Estados para mostrar mensajes de error y éxito
  const [mensajeError, setMensajeError] = useState(null);
  const [mensajeExito, setMensajeExito] = useState(null);

    //Estados para almacenar los cursos y catedráticos
  const [cursos, setCursos] = useState([]);
  const [catedraticos, setCatedraticos] = useState([]);

  //Effect para obtener los cursos y catedráticos
  useEffect(() => {
    obtenerCursos();
    obtenerCatedraticos();
  }, []);

  //Función para actualizar el estado de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    //Función para mostrar mensajes de éxito y redirigir a la página de publicación
  const mostrarMensajeDeExito = (mensaje) => {
    setMensajeExito(mensaje);
    setTimeout(() => {
      setMensajeExito(null);
      // Para redirigir a la página de publicación después de 2 segundos
      ReactDOM.render(<Publicacion />, document.getElementById('root'));
    }, 2000);
  };


    //Función para mostrar mensajes de error
  const mostrarMensajeDeError = (mensaje) => {
    setMensajeError(mensaje);
    setTimeout(() => {
      setMensajeError(null);
    }, 5000);
  };


    //Función para obtener los cursos
  const obtenerCursos = async () => {
    try {
      const response = await fetch('https://api-taller4.onrender.com/cursos');
      if (response.ok) {
        const data = await response.json();
        setCursos(data);
      }
    } catch (error) {
      console.error('Error al obtener cursos:', error);
    }
  };

    //Función para obtener los catedráticos desde la API
  const obtenerCatedraticos = async () => {
    try {
      const response = await fetch('https://api-taller4.onrender.com/catedratico');
      if (response.ok) {
        const data = await response.json();
        setCatedraticos(data);
      }
    } catch (error) {
      console.error('Error al obtener catedráticos:', error);
    }
  };

    //Función para enviar los datos del formulario a la API
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de datos
    if (!formData.titulo || !formData.contenido || !formData.sobre_quien || !formData.tipo) {
      mostrarMensajeDeError('Todos los campos son obligatorios.');
      return;
    }

    // Formateo de la fecha antes de enviarla a la API
    const formattedDate = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    const dataToSend = { ...formData, fecha_publicacion: formattedDate };

    // Enviar datos a la API
    const url = 'https://api-taller4.onrender.com/Publicacion'; // Cambiado a la URL correcta

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        mostrarMensajeDeExito(responseData.message);
      } else {
        const errorData = await response.json();
        mostrarMensajeDeError(errorData.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      mostrarMensajeDeError('Hubo un problema al procesar la solicitud.');
    }
  };

  const irAInicio = () => {ReactDOM.render(<PantallaPrincipal />, document.getElementById('root'));}

  return (
    <div className="crear-publicacion" style={{ marginTop: '45px', marginLeft: 'auto', marginRight: 'auto' }}>
      <h1>Crear Publicación</h1>

      {/* Campo de Tipo */}
      <div className="campo">
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option> {/* Agregada una opción para seleccionar si es Tipo 0 o 1 */}
          <option value={0}>0 (Curso)</option>
          <option value={1}>1 (Catedrático)</option>
        </select>
      </div>

      {/* Campo de Sobre Quién */}
      <div className="campo">
        <label htmlFor="sobre_quien">Sobre Quién:</label>
        <select
          id="sobre_quien"
          name="sobre_quien"
          value={formData.sobre_quien}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option> 
          {formData.tipo === 0
            ? cursos.map((curso) => (
                <option key={curso.id} value={curso.nombre}>
                  {curso.nombre}
                </option>
              ))
            : catedraticos.map((catedratico) => (
                <option key={catedratico.id} value={catedratico.nombre}>
                  {catedratico.nombre}
                </option>
              ))}
        </select>
      </div>

      {/* Campo de Título */}
      <form onSubmit={handleSubmit}>
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

        {/* Campo de Contenido */}
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

        {/* Boton de envío y redirección a Publicacion*/}
        <div>
          <button type="submit">Crear Publicación</button>
          {mensajeExito && <div className="mensaje-exito">{mensajeExito}</div>}
          {mensajeError && <div className="mensaje-error">{mensajeError}</div>}
        </div>
      </form>
      <div> 
        <button onClick={irAInicio}>Regresar</button>
      </div>
    </div>
  );
};

export default CrearPublicacion;
