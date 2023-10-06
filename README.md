Descargar e instalar y ejecutar Docker Desktop https://www.docker.com/products/docker-desktop/

clonar el repositorio
```sh
  git clone https://github.com/LopeH99/backend-cristian.git
```
### Ejecutar el proyecto sin docker
npm i
npx prisma generate
npm run start

### Ejecutar el proyecto con docker
Abrir una consola dentro del proyecto y ejectuar por unica vez:

```sh
  docker-compose up -d
```

Ver en Docker Desktops el log del contenedor **backend-tesis** para ver que todo salga bien
![Ver logs](/contenedores.png)
click en tesis

Una vez ejecutado el comando se debe esperar a que se ejecuten los seeders (carga de datos en la BD)

![Ejecuccion de seeders](/seeders_ejecutandose.png)

Si todo salio bien deberia verse asi:

![Ejecuccion de seeders](/resultado.png)

Si se desea eliminar el contenedor ejecutar o tocar el boton de cesto de basura en docker desktop
```sh
  docker-compose down
```


### Acceder a la base de datos
http://localhost:5555/

 # Resetear base de datos
 ```sh
  npx prisma db push --force-reset && npx prisma db seed
 ```

  # Documentación de la API

**URL Base:** http://localhost:3000/


## Inicio de Sesión

- **POST /auth/login**
  - Inicia sesión y obtiene el token de autenticación.
  - Datos a enviar en el body:
    ```json
    {
      "email": "admin@tesis.com",
      "password": "1234"
    }
    ```
  - Respuesta:
    ```json
    {
      "id": 1,
      "nombre": "admin",
      "apellido": "admin",
      "rol": "ADMIN",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sIjoiQURNSU4iLCJpYXQiOjE2OTI5OTU5NTksImV4cCI6MTY5MzI1NTE1OX0.lNgJK9hs-qyrAzYDzOXszmt1bL1q1c_CdkCgNALx75o"
    }
    ```
## Usuarios

- **GET /usuarios**
  - Obtiene todos los usuarios.

- **GET /usuarios/:id**
  - Obtiene un usuario específico por ID.

- **GET /usuarios?rol=:rol**
  - Obtiene usuarios según el rol proporcionado (ADMIN, ALUMNO, PROFESOR, PERSONAL).

- **GET /usuarios?egresado=:egresado**
  - Obtiene usuarios según si son egresados (true o false).

- **POST /usuarios**
  - Crea un nuevo usuario. El rol determina si es admin, profesor o personal.
  - Datos a enviar en el body:
    - nombre (String)
    - apellido (String)
    - dni (Int)
    - sexo (Sexo: M o F)
    - fechaNacimiento (DateTime)
    - cargo (Cargo: MAESTRO_DE_GRADO, MAESTRO_A_CARGO_DE_DIRECCION, MAESTRO_ESPECIAL)
    - ... (otros campos según el rol)

- **PUT /usuarios/:id**
  - Actualiza un usuario específico.
  - Datos a enviar en el body (al menos uno de los campos a actualizar):
    - nombre (String)
    - apellido (String)
    - dni (Int)
    - ... (otros campos a actualizar)

- **DELETE /usuarios/:id**
  - Elimina un usuario específico.

## Eventos

- **GET /eventos**
  - Obtiene todos los eventos.

- **GET /eventos?novedad=true**
  - Obtiene todas las novedades.

- **GET /eventos?incidencia=true**
  - Obtiene todas las incidencias.

- **GET /eventos?novedad=false&incidencia=false**
  - Obtiene todos los eventos (excluyendo novedades e incidencias).

- **POST /eventos**
  - Crea un nuevo evento, incidencia o novedad. Requiere un formulario multipart con archivos.
  - Datos a enviar en el body (multipart form):
    - files (Archivo)
    - titulo (String)
    - tipo (String)
    - novedad (Boolean)
    - incidencia (Boolean)
    - fecha (DateTime)

- **DELETE /eventos/:id**
  - Elimina un evento específico.

## Licencias

- **GET /licencias**
  - Obtiene todas las licencias.

- **GET /licencias/:id**
  - Obtiene una licencia específica por ID.

- **GET /licencias?autorizada=true**
  - Obtiene todas las licencias autorizadas.

- **GET /licencias?autorizada=false**
  - Obtiene todas las licencias no autorizadas.

- **POST /licencias/autorizar/:id**
  - Autoriza una licencia específica.

- **DELETE /licencias/:id**
  - Elimina una licencia específica.

## Sugerencias

- **GET /sugerencias**
  - Obtiene todas las sugerencias.

- **GET /sugerencias/:id**
  - Obtiene una sugerencia específica por ID.

- **GET /sugerencias?anonima=false**
  - Obtiene sugerencias que no son anónimas.

- **GET /sugerencias?anonima=true**
  - Obtiene sugerencias anónimas.

- **POST /sugerencias**
  - Crea una nueva sugerencia. Por defecto, la sugerencia se marca como anónima.
  - Datos a enviar en el body:
    - texo (String): Contenido de la sugerencia.
    - anonima (Boolean): true (por defecto) si la sugerencia es anónima, false si no lo es.

- **DELETE /sugerencias/:id**
  - Elimina una sugerencia específica por ID.
## Horarios

- **GET /horarios**
  - Obtiene todos los horarios cargados.

- **GET /horarios/:id**
  - Obtiene un horario específico por ID.

- **POST /horarios**
  - Crea un nuevo horario.
  - Datos a enviar en el body:
    - seccion (Seccion: SECCION_A, SECCION_B)
    - gradoEscolar (GradoEscolar)
    - modulo (String) :modulo ver valores referencia
    - rangoHorario (String)
    - lunes (String)
    - martes (String)
    - miercoles (String)
    - jueves (String)
    - viernes (String)

- **PUT /horarios/:id**
  - Actualiza un horario específico.
  - Datos a enviar en el body (al menos uno de los campos a actualizar):
    - seccion (Seccion: SECCION_A, SECCION_B)
    - gradoEscolar (GradoEscolar)
    - modulo (String) :modulo ver valores referencia
    - rangoHorario (String)
    - lunes (String)
    - martes (String)
    - miercoles (String)
    - jueves (String)
    - viernes (String)

- **DELETE /horarios/:id**
  - Elimina un horario específico.

## Valores de Referencia

- `:rol`: ADMIN, ALUMNO, PROFESOR, PERSONAL
- `:revista`:TITULAR, SUPLENTE, INTERINO
- `:cargo`:MAESTRO_DE_GRADO, MAESTRO_A_CARGO_DE_DIRECCION, MAESTRO_ESPECIAL
- `:sexo`: M, F
- `:egresado`: true, false
- `:novedad`: true, false
- `:incidencia`: true, false
- `:seccion`: SECCION_A, SECCION_B
- `:gradoEscolar`: JARDIN, PRIMER_GRADO, SEGUNDO_GRADO, TERCER_GRADO, CUARTO_GRADO, QUINTO_GRADO, SEXTO_GRADO, SEPTIMO_GRADO
- `:modulo`: Modulo1,Modulo2,Modulo3,'Modulo4,Modulo5,Modulo6,jornadaSimpleExtendida

Asegúrate de utilizar estos valores en tus solicitudes a la API para obtener los resultados deseados.
