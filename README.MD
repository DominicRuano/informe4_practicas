# Taller 4

## Uso del REST API

url para poder acceder a la API
```
https://api-taller4.onrender.com
```
### Rutas
Luego de la ruta para poder acceder a la API, siguen las siguientes rutas

> **Registrar un Usurio**
>  
>```
>/usuario
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"carnet":" ",
>	"nombres":" ",
>	"apellidos":" ",
>	"contrasena":" ",
>	"email":" "
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Usuario registrado con éxito" }
>```
> Si existe un error regresa un Json con el error que ocacionó la interrupción
>

> **Actualizar Contraseña**
>  
>```
>/usuario
>```
>Espera un Json como el siguiente, enviado con PUT
>```
>{
>	"contrasena":" ",
>	"carnet":" ",
>	"email":" "
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Contraseña actualizada exitosamente" }
>```
> Si existe un error regresa un Json con el error que ocacionó la interrupción
>

> **Obtener usuraio por carnet**
>  
>```
>/buscaru
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"carnet":" "
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Contraseña actualizada exitosamente" }
>```
> Si existe un error regresa un Json con el error que ocacionó la interrupción
>

> **Login**
>  
>```
>/login
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>   "carnet":" ",
>   "contrasena:" "
>}
>```
> * Si se ingreso las credenciales correctas devuelve los datos del usuario en un JSON:
> ```
>{
>	"idUsuario": 6,
>	"carnet": "2000",
>	"nombres": "Nombre prueba",
>	"apellidos": "Apellido Prueba",
>	"contrasena": "123",
>	"email": "e@gmail.com"
>}
>
>```
> * Si existe un error regresa un Json con el error que ocacionó la interrupción
>

> **Crear publicación**
>  
>```
>/publicacion
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>   "titulo":" ",
>   "contenido:" "
>   "fecha_publicacion:" formato de la fecha: 2038-01-19 03:14:07"
>   "sobre_quien:" "
>   "tipo: 0->Curso, o 1-> Catedratico
>   "id_usuario:
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Publicación creada con éxito" }
>```
> Si existe un error regresa un Json con el error que ocacionó la interrupción
>


> **Obtener todas las publicaciones**
>  
>```
>/publicaciones
>```
> No requiere de parametros
> 
> Método GET
> 
> * Si se obtiene respuestas regresa un arreglo, con JSON con los datos de la publicación 
> * Si existe un error regresa un Json con el error que ocacionó la interrupción
>

> **Obtener una publicación por ID**
>  
>```
>/buscarpub
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"id":" ",
>}
>```
> Si el registro es exitoso retorna los campos de la publicación:
>
> Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Filtro de Publicaciones**
>```
>/filtro
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"tipo":" "
>}
>```
> * Si existe la publicación devuelve los parametros de la misma
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Crear un Comentario**
>```
>/comentario
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"contendio":" ",
>	"fecha":"Respetar el formato timestamp",
>	"idPub":" ",
>	"idUsuarioPub":" ",
>	"idUsuarioActual ":" ",
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Comentario creado" }
>```
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>


>  **Obtener comentario de una publicación**
>```
>/buscarc
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"id_pub":" "
>}
>```
> * Si existen comentarios devuelve un arreglo con JSON como items, con los datos del comentario
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Agregar Cursos**
>```
>/agregarcurso
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"nombre":" ",
>	"creditos":" "
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Curso registrado con éxito" }
>```
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Obtener cursos por ID**
>```
>/buscarcurso
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"id_curso":" "
>}
>```
> * Si existen comentarios devuelve un arreglo con JSON como items, con los datos del comentario
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **obtener todos los cursos**
>```
>/cursos
>```
>No requiere parametros
>
>Usa el método GET
> * Si existen cursos devuelve un arreglo con JSON como items, con los datos del comentario
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Obtener a Todos los catedraticos**
>```
>/catedratico
>```
> No requiere de parametros
> 
> Método GET
> 
> * Si se obtiene respuestas regresa un arreglo, con JSON con los datos de la publicación 
> * Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **agregar un Catedratico**
>```
>/agregarcatedratico
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"nombre":" ",
>	"creditos":" "
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Catedratico registrado con éxito" }
>```
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Agregar curso ganado**
>```
>/ganado
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"id_usuario":" ",
>	"id_curso":" ",
>}
>```
> Si el registro es exitoso retorna un:
>```
>{ message: "Curso ganado registrado" }
>```
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>

>  **Obtener cursos ganados**
>```
>/cursosg
>```
>Espera un Json como el siguiente, enviado con POST
>```
>{
>	"id_usuario":" ",
>}
>```
> * Si existen cursos devuelve un arreglo con JSON como items, con los cursos ganados
>* Si existe un error regresa un Json con el error que ocacionó la interrupción
>
