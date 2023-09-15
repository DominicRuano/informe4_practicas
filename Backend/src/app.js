const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const axios = require("axios");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var mysql = require("mysql");

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "bd_4",
});

db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});
// REGISTRAR USUARIOS
app.post("/registro", (req, res) => {
  const { carnet, nombres, apellidos, contrasena, email } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "INSERT INTO usuario (carnet, nombres, apellidos, contrasena, email) VALUES (?, ?, ?,?,?)",
    [carnet, nombres, apellidos, contrasena, email],
    (err, result) => {
      if (err) {
        console.error("Error al registrar al usuario: ", err);
        res.status(500).send("Error al registrar al usuario");
      } else {
        console.log("Usuario registrado con éxito");
        res.status(200).send("Usuario registrado con éxito");
      }
    }
  );
});

// ACTUALIZAR CONTRASENA
app.put("/registro", (req, res) => {
  const { contrasena, carnet, email } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "UPDATE usuario SET contrasena = ? WHERE carnet = ? AND email = ?",
    [contrasena, carnet, email],
    (err, result) => {
      if (result.affectedRows == 0) {
        //console.error("Error al registrar al usuario: ", err);
        res.status(500).send("Error al actualizar, datos incorrectos");
      } else {
        console.log("Usuario registrado con éxito");
        res.status(200).send("Usuario actualizado con éxito");
      }
    }
  );
});

// OBTENER TODOS LOS USUARIOS
app.get("/registro", (req, res) => {
  // Obtiene todas las publicaciones desde la base de datos
  db.query("SELECT * FROM usuario", (err, results) => {
    if (err) {
      console.error("Error al obtener las publicaciones: ", err);
      res.status(500).send("Error al obtener las publicaciones");
    } else {
      res.status(200).json(results);
    }
  });
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
        console.error("Error al autenticar al usuario: ", err);
        res.status(500).send("Error al autenticar al usuario");
      } else if (results.length === 0) {
        res.status(401).send("Credenciales incorrectas");
      } else {
        console.log("Usuario autenticado con éxito");
        res.status(200).json(results);
        //console.log(results[0].idUsuario)
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
    "INSERT INTO Publicacion (titulo, contenido, fecha_publicacion,sobre_quien,tipo,Usuario_idUsuario) VALUES (?, ?, ?,?,?,?)",
    [titulo, contenido, fecha_publicacion, sobre_quien, tipo, id_usuario],
    (err, result) => {
      if (err) {
        console.error("Error al crear la publicación: ", err);
        res.status(500).send("Error al crear la publicación");
      } else {
        console.log("Publicación creada con éxito");
        res.status(200).send("Publicación creada con éxito");
      }
    }
  );
});

//OBTENER LA PUBLICACIÓN
app.get("/publicaciones", (req, res) => {
  // Obtiene todas las publicaciones desde la base de datos
  db.query("SELECT * FROM Publicaciones", (err, results) => {
    if (err) {
      console.error("Error al obtener las publicaciones: ", err);
      res.status(500).send("Error al obtener las publicaciones");
    } else {
      res.status(200).json(results);
    }
  });
});

// CREAR COMENTARIO
app.post("/comentario", (req, res) => {
  const { contenido, fecha, idPub, idUsuarioPub, idUsuarioActual } = req.body;

  // Realiza la inserción en la tabla de Comentarios
  db.query(
    "INSERT INTO Comentario (contenido, fecha_creacion, Publicacion_idPublicacion,Publicacion_Usuario_idUsuario,Usuario_idUsuario) VALUES (?, ?, ?,?,?)",
    [contenido, fecha, idPub, idUsuarioPub, idUsuarioActual],
    (err, result) => {
      if (err) {
        console.error("Error al crear el comentario: ", err);
        res.status(500).send("Error al crear el comentario");
      } else {
        console.log("Comentario creado con éxito");
        res.status(200).send("Comentario creado con éxito");
      }
    }
  );
});

// obtener los comentairos
app.get("/comentario", (req, res) => {
  // Obtiene todas las publicaciones desde la base de datos
  db.query("SELECT * FROM Comentario", (err, results) => {
    if (err) {
      console.error("Error al obtener las publicaciones: ", err);
      res.status(500).send("Error al obtener las publicaciones");
    } else {
      res.status(200).json(results);
    }
  });
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
        console.error("Error al registrar el curso: ", err);
        res.status(500).send("Error al registrar el curso");
      } else {
        console.log("Curso registrado con éxito");
        res.status(200).send("Curso registrado con éxito");
      }
    }
  );
});

//OBTENER cursos
app.get("/curso", (req, res) => {
  const { id_curso } = req.query;

  db.query(
    "SELECT * FROM curso WHERE idCurso = ?",
    [id_curso],
    (err, result) => {
      if (err) {
        console.error("Error al registrar el curso: ", err);
        res.status(500).send("Error al registrar el curso");
      } else {
        console.log("Curso registrado con éxito");
        res.status(200).json(result);
      }
    }
  );
});

// AGREGAR CATEDRATICOS
app.post("/agregarcatedratico", (req, res) => {
  const { nombre, creditos } = req.body;

  // Realiza la inserción en la tabla de Usuarios
  db.query(
    "INSERT INTO catedratico (nombre, apellido) VALUES (?, ?)",
    [nombre, creditos],
    (err, result) => {
      if (err) {
        console.error("Error al registrar al catedratico: ", err);
        res.status(500).send("Error al registrar al catedratico");
      } else {
        //console.log("Curso registrado con éxito");
        res.status(200).send("Catedratico registrado con éxito");
      }
    }
  );
});

async function obtenerCursos(id) {
  try {
    const response = await axios.get(
      `http://localhost:3000/curso?id_curso=${id}`
    ); // Reemplaza con tu URL
    console.log(id);
    return response.data;
  } catch (error) {
    console.error("Error al obtener curso: ", error);
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
        console.error("Error al obtener los cursos: ", err);
        res.status(500).send("Error al obtener los cursos");
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
          console.error("Error al procesar los cursos: ", error);
          res.status(500).send("Error al procesar los cursos");
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
        console.error("Error al registrar el curso ganado: ", err);
        res.status(500).send("Error al registrar el curso ganado");
      } else {
        //console.log("Curso registrado con éxito");
        res.status(200).send("Curso ganado registrado con éxito");
      }
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
