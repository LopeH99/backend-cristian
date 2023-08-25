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

- eventos (puede ser NOVEDAD, EVENTO o INCIDENCIA)
  GET /?novedad=true -> obtiene todas las novedades  
  GET /?incidencia=true -> obtiene todas las incidencias 
  GET /?novedad=false&incidencia=false -> obtiene todos los eventos
  POST / -> crea un nuevo EVENTO, INCIDENCIA o NOVEDAD, el body tiene que ser del tipo multipart form, los archivos se envian con el nombre de campo files(sin importar si es una imagen o un archivo), solo se admite o una imagen o un archivo
  

  