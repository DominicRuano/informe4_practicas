const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const axios = require("axios");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require("mysql");

var db = mysql.createConnection({
  host: "bxbuke117r4gmf7aqsgj-mysql.services.clever-cloud.com",
  user: "u4nabtaemgcrgwmo",
  password: "7aAMGKGBDpIvdo2fZTGe",
  database: "bxbuke117r4gmf7aqsgj",
});

db.connect((err) => {
  if (err) {
    //console.error("Error al conectar a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});
// REGISTRAR USUARIOS
app.post("/usuario", (req, res) => {
  const { carnet, nombres, apellidos, contrasena, email } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "INSERT INTO usuario (carnet, nombres, apellidos, contrasena, email) VALUES (?, ?, ?,?,?)",
    [carnet, nombres, apellidos, contrasena, email],
    (err, result) => {
      if (err) {
        // console.error("Error al registrar al usuario: ", err);
        res.status(500).send({ error: err });
      } else {
        // console.log("Usuario registrado con éxito");
        res.status(200).send({ message: "Usuario registrado con éxito" });
      }
    }
  );
});

// ACTUALIZAR CONTRASENA
app.put("/contrasena", (req, res) => {
  const { contrasena, carnet, email } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "UPDATE usuario SET contrasena = ? WHERE carnet = ? AND email = ?",
    [contrasena, carnet, email],
    (err, result) => {
      if (result.affectedRows == 0) {
        res.status(500).send({ error: "Credenciales Incorrectas" });
      } else {
        res
          .status(200)
          .send({ message: "Contraseña actualizada exitosamente" });
      }
    }
  );
});

// ACTUALIZAR Datos de usuario por ID
app.put("/usuario", (req, res) => {
  const { nombres, apellidos, email, idUsuario } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "UPDATE usuario SET nombres=?,apellidos=?,email=? WHERE idUsuario = ?",
    [nombres, apellidos, email, idUsuario],
    (err, result) => {
      if (result.affectedRows == 0) {
        res.status(500).send({ error: "Credenciales Incorrectas" });
      } else {
        res
          .status(200)
          .send({ message: "Contraseña actualizada exitosamente" });
      }
    }
  );
});

// OBTENER USUARIO POR CARNET
app.post("/buscaru", (req, res) => {
  // Obtiene todas las publicaciones desde la base de datos
  const { carnet } = req.body;
  db.query(
    "SELECT * FROM usuario WHERE carnet= ?",
    [carnet],
    (err, results) => {
      if (err) {
        //console.error("Error al obtener las publicaciones: ", err);
        res.status(500).send({ error: err });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// LOGIN
app.post("/login", (req, res) => {
  const { carnet, contrasena } = req.body;

  // Realiza la autenticación de usuarios en la base de datos
  db.query(
    "SELECT * FROM usuario WHERE carnet = ? AND contrasena = ?",
    [carnet, contrasena],
    (err, results) => {
      if (err) {
        //console.error("Error al autenticar al usuario: ", err);
        res.status(500).send({ error: err });
      } else if (results.length === 0) {
        res.status(401).send({ error: "Credenciales incorrectas" });
      } else {
        // console.log("Usuario autenticado con éxito");
        res.status(200).json(results[0]);
      }
    }
  );
});

// CREAR PUBLICACION
app.post("/publicacion", (req, res) => {
  const {
    titulo,
    contenido,
    fecha_publicacion,
    sobre_quien,
    tipo,
    id_usuario,
  } = req.body;

  // Realiza la inserción en la tabla de Publicaciones
  db.query(
    "INSERT INTO publicacion (titulo, contenido, fecha_publicacion,sobre_quien,tipo,Usuario_idUsuario) VALUES (?, ?, ?,?,?,?)",
    [titulo, contenido, fecha_publicacion, sobre_quien, tipo, id_usuario],
    (err, result) => {
      if (err) {
        //console.error("Error al crear la publicación: ", err);
        res.status(500).send({ error: err });
      } else {
        ///console.log("Publicación creada con éxito");
        res.status(200).send({ message: "Publicación creada con éxito" });
      }
    }
  );
});

//OBTENER LAs PUBLICACIONES
app.get("/publicaciones", (req, res) => {
  // Obtiene todas las publicaciones desde la base de datos
  db.query("SELECT * FROM publicacion", (err, results) => {
    if (err) {
      // console.error("Error al obtener las publicaciones: ", err);
      res.status(500).send({ error: err });
    } else {
      res.status(200).json(results);
    }
  });
});

//OBTENER una publicacion
app.post("/buscarpub", (req, res) => {
  const { id } = req.body;
  db.query(
    "SELECT * FROM publicacion WHERE idPublicacion=?",
    [id],
    (err, results) => {
      if (err) {
        // console.error("Error al obtener las publicaciones: ", err);
        res.status(500).send({ error: err });
      } else {
        res.status(200).json(results[0]);
      }
    }
  );
});
// Comentario
// O -> Curso
// 1-> Catedratico
app.post("/filtro", (req, res) => {
  const { tipo } = req.body;
  db.query(
    "SELECT * FROM publicacion WHERE tipo = ?",
    [tipo],
    (err, results) => {
      if (err) {
        // console.error("Error al obtener las publicaciones: ", err);
        res.status(500).send({ error: err });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

// CREAR COMENTARIO
app.post("/comentario", (req, res) => {
  const { contenido, fecha, idPub, idUsuarioPub, idUsuarioActual } = req.body;

  // Realiza la inserción en la tabla de Comentarios
  db.query(
    "INSERT INTO comentario (contenido, fecha_creacion, Publicacion_idPublicacion,Publicacion_Usuario_idUsuario,Usuario_idUsuario) VALUES (?, ?, ?,?,?)",
    [contenido, fecha, idPub, idUsuarioPub, idUsuarioActual],
    (err, result) => {
      if (err) {
        // console.error("Error al crear el comentario: ", err);
        res.status(500).send({ error: err });
      } else {
        // console.log("Comentario creado con éxito");
        res.status(200).send({ message: "Comentario creado" });
      }
    }
  );
});

// obtener los comentairos
app.post("/buscarc", (req, res) => {
  const { id_pub } = req.body;
  // Obtiene todas las publicaciones desde la base de datos
  db.query(
    "SELECT * FROM comentario WHERE Publicacion_idPublicacion = ?",
    [id_pub],
    (err, results) => {
      if (err) {
        // console.error("Error al obtener las publicaciones: ", err);
        res.status(500).send({ error: err });
      } else {
        res.status(200).json(results);
      }
    }
  );
});

//agregar cursos
app.post("/agregarcurso", (req, res) => {
  const { nombre, creditos } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "INSERT INTO curso (nombre_curso, creditos) VALUES (?, ?)",
    [nombre, creditos],
    (err, result) => {
      if (err) {
        // console.error("Error al registrar el curso: ", err);
        res.status(500).send({ error: err });
      } else {
        // console.log("Curso registrado con éxito");
        res.status(200).send({ message: "Curso registrado con éxito" });
      }
    }
  );
});

//OBTENER cursos por id
app.post("/buscarcurso", (req, res) => {
  const { id_curso } = req.query;

  db.query(
    "SELECT * FROM curso WHERE idCurso = ?",
    [id_curso],
    (err, result) => {
      if (err) {
        // console.error("Error al registrar el curso: ", err);
        res.status(500).send({ error: err });
      } else {
        //console.log("Curso registrado con éxito");
        res.status(200).json(result);
      }
    }
  );
});

//OBTENER todos los cursos
app.get("/cursos", (req, res) => {
  db.query("SELECT * FROM curso", (err, result) => {
    if (err) {
      // console.error("Error al registrar el curso: ", err);
      res.status(500).send({ error: err });
    } else {
      //console.log("Curso registrado con éxito");
      res.status(200).json(result);
    }
  });
});

//OBTENER todos a todos los catedraticos
app.get("/catedratico", (req, res) => {
  db.query("SELECT * FROM catedratico", (err, result) => {
    if (err) {
      // console.error("Error al registrar el curso: ", err);
      res.status(500).send({ error: err });
    } else {
      //console.log("Curso registrado con éxito");
      res.status(200).json(result);
    }
  });
});

// AGREGAR CATEDRATICOS
app.post("/agregarcatedratico", (req, res) => {
  const { nombre, apellido } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "INSERT INTO catedratico (nombre, apellido) VALUES (?, ?)",
    [nombre, apellido],
    (err, result) => {
      if (err) {
        // console.error("Error al registrar al catedratico: ", err);
        res.status(500).send({ error: err });
      } else {
        //console.log("Curso registrado con éxito");
        res.status(200).send({ message: "Catedratico registrado con éxito" });
      }
    }
  );
});

async function obtenerCursos(id) {
  try {
    const response = await axios.get(
      `https://api-taller4.onrender.com/buscarcurso?id_curso=${id}`
    ); // Reemplaza con tu URL
    //console.log(id);
    return response.data;
  } catch (error) {
    console.error({ error: err });
    throw error;
  }
}

//Obtener los cursos aprobados
app.post("/cursosg", async (req, res) => {
  const { id_usuario } = req.body;
  db.query(
    "SELECT * FROM usuariocurso WHERE Usuario_idUsuario = ?",
    [id_usuario],
    async (err, results) => {
      if (err) {
        // console.error("Error al obtener los cursos: ", err);
        res.status(500).send({ error: err });
      } else {
        try {
          const cursoPromises = results.map(async (curso) => {
            // Llamar a otra función para encontrar datos y esperar su resultado
            const cursos = await obtenerCursos(curso["Curso_idCurso"]); // Asume que esta función devuelve datos

            // Devolver un objeto con los datos encontrados
            return cursos;
          });

          // Esperar a que se completen todas las promesas
          const cursosConDatos = await Promise.all(cursoPromises);

          // Devolver los resultados como JSON
          res.json(cursosConDatos);
        } catch (error) {
          // console.error("Error al procesar los cursos: ", error);
          res.status(500).send({ error: err });
        }
      }
    }
  );
});

// AGREGAR CURSO GANADO
app.post("/ganado", (req, res) => {
  const { id_usuario, id_curso } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "INSERT INTO usuariocurso (Usuario_idUsuario, Curso_idCurso) VALUES (?, ?)",
    [id_usuario, id_curso],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Curso ganado registrado" });
      }
    }
  );
});

// Funciones No requeridas por el ENunciado

// Eliminar un usuario
app.delete("/usuario", (req, res) => {
  const { id_usuario } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "DELETE FROM usuario WHERE idUsuario=?",
    [id_usuario],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Usuario eliminado con éxito" });
      }
    }
  );
});

// Eliminar un comentario
app.delete("/comentario", (req, res) => {
  const { id_comen } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "DELETE FROM comentario WHERE idComentario=?",
    [id_comen],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Elemento eliminado con éxito" });
      }
    }
  );
});

// Eliminar un Publicacion
app.delete("/publicacion", (req, res) => {
  const { id_pub } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "DELETE FROM publicacion WHERE idPublicacion=?",
    [id_pub],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Elemento eliminado con éxito" });
      }
    }
  );
});

// Eliminar un curso aprobado
app.delete("/cursog", (req, res) => {
  const { idUsuarioCurso } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "DELETE FROM usuariocurso WHERE idUsuarioCurso=?",
    [idUsuarioCurso],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Elemento eliminado con éxito" });
      }
    }
  );
});

// Eliminar un curso
app.delete("/curso", (req, res) => {
  const { idCurso } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query("DELETE FROM curso WHERE idCurso=?", [idCurso], (err, result) => {
    if (err) {
      res.status(500).send({ error: err });
    } else {
      res.status(200).send({ message: "Elemento eliminado con éxito" });
    }
  });
});

// Eliminar un catedratico
app.delete("/catedratico", (req, res) => {
  const { idCatedratico } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "DELETE FROM catedratico WHERE idCatedratico=?",
    [idCatedratico],
    (err, result) => {
      if (err) {
        res.status(500).send({ error: err });
      } else {
        res.status(200).send({ message: "Elemento eliminado con éxito" });
      }
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});