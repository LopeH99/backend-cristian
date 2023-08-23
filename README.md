Ejecutar los seeders la primera vez que se ejecuta el contenedor *npx prisma db seed*


ENDPOINTS

- usuarios
  GET  / -> obtiene todos los usuarios
  GET /id -> obtiene un usuario con un id especifico
  filtros:
    GET /?rol=alumno -> obitene los usuarios que son alumnos, pueden ser alumno, admin, profesor o personal
    GET /?egresado=[true|false] -> retorna los egresados
  POST / -> crea un nuevo usuario (segun el rol sera admin, profesor, personal)
  PUT /id -> editar un usuario
  DELETE /id -> eliminar un usuario
    