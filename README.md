# Microservicios
Despliegue y aseguramiento de microservicios con Docker

## Requisitos
- Docker
- Docker Compose

## Despliegue
1. Clonar el repositorio:
```bash
git clone https://github.com/nicolascuadram/microservicios.git
```

2. Navegar al directorio del proyecto:
```bash
cd microservicios
```

3. Construir y levantar los contenedores:
```bash
docker-compose up --build -d
```

4. Abrir el navegador y acceder a las API's:

- http://localhost/api/users/
- http://localhost/api/tasks/


## Estructura de las API's
### Endpoints API de Usuarios
**POST** `/users/`: Registrar un nuevo usuario con un nombre. Añadir un body en formato JSON como por ejemplo:

http://localhost/api/users/users/
```json
{
  "name": "Javier",
  "email": "javier@gmail.com"
}
```


**GET** `/users/`: Obtener todos los usuarios.

http://localhost/api/users/users/


**GET** `/users/:id`: Obtener un usuario específico a partir de su id. Añadir la id en la URL como por ejemplo:

http://localhost/api/users/users/1


**GET** `/health/`: Comprobar el estado del servicio.

http://localhost/api/users/health/

### Endpoints API de Tareas
**POST** `/tasks/`: Crear una nueva tarea con un título y un usuario asignado. Añadir un body en formato JSON como por ejemplo:

http://localhost/api/tasks/tasks/
```json
{
  "title": "Nueva Tarea",
  "user_id": 1
}
```


**GET** `/tasks/`: Obtener todas los tareas.

http://localhost/api/tasks/tasks/


**GET** `/tasks/:id`: Obtener una tarea específica a partir de su id. Añadir la id en la URL como por ejemplo:

http://localhost/api/tasks/tasks/1


**PUT** `/tasks/:id`: Actualizar el estado de una tarea específica a partir de su id. Añadir la id en la URL, y el estado en un body con formato JSON como por ejemplo:

http://localhost/api/tasks/tasks/1
```json
{
  "state": "en_progreso"
}
```
`NOTA: Solo son permitidos los estados: "pendiente", "en_progreso", y "completada".`


**GET** `/tasks/?user_id=x`: Filtrar y obtener las tareas asociadas a cada usuario a partir de su id. Añadir la id en la URL como por ejemplo:

http://localhost/api/tasks/tasks?user_id=1


**GET** `/health/`: Comprobar el estado del servicio.

http://localhost/api/tasks/health/