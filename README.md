# Microservicios
Despliegue y aseguramiento de microservicios con Docker

## Requisitos
- Docker
- Docker Compose

## Despliegue con Docker
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

## Endpoints API de Usuarios
### **POST** `/users/`: Registrar un nuevo usuario con un nombre. Añadir un body en formato JSON como por ejemplo:

http://localhost/api/users/users/
```json
{
  "name": "Javier",
  "email": "javier@gmail.com"
}
```

### **GET** `/users/`: Obtener todos los usuarios.

http://localhost/api/users/users/

### **GET** `/users/:id`: Obtener un usuario específico a partir de su id. Añadir la id en la URL como por ejemplo:

http://localhost/api/users/users/1

### **GET** `/health/`: Comprobar el estado del servicio.

http://localhost/api/users/health/

## Endpoints API de Tareas
### **POST** `/tasks/`: Crear una nueva tarea con un título y un usuario asignado. Añadir un body en formato JSON como por ejemplo:

http://localhost/api/tasks/tasks/
```json
{
  "title": "Nueva Tarea",
  "user_id": 1
}
```

### **GET** `/tasks/`: Obtener todas los tareas.

http://localhost/api/tasks/tasks/

### **GET** `/tasks/:id`: Obtener una tarea específica a partir de su id. Añadir la id en la URL como por ejemplo:

http://localhost/api/tasks/tasks/1

### **PUT** `/tasks/:id`: Actualizar el estado de una tarea específica a partir de su id. Añadir la id en la URL, y el estado en un body con formato JSON como por ejemplo:

http://localhost/api/tasks/tasks/1
```json
{
  "state": "en_progreso"
}
```
> `NOTA: Solo son permitidos los estados: "pendiente", "en_progreso", y "completada".`

### **GET** `/tasks/?user_id=x`: Filtrar y obtener las tareas asociadas a cada usuario a partir de su id. Añadir la id en la URL como por ejemplo:

http://localhost/api/tasks/tasks?user_id=1

### **GET** `/health/`: Comprobar el estado del servicio.

http://localhost/api/tasks/health/

## Administrador
Se pueden ver logs de acceso y métricas de los contenedores accediendo a `/admin/`.
- Logs: http://localhost/admin/logs
- Métricas: http://localhost/admin/metrics

## Análisis y mitigación de ataques de denegación de servicios
Se utilizó ab (Apache Benchmark) para lanzar ataques DoS contra el Proxy.

### Comando de ataque con ab:
```bash
ab -n 10000 -c 100 https://localhost/api/users/users
```

### Contramedidas:
- Límites de request
Cada IP puede hacer hasta 5 requests por segundo, con un burst adicional de 10, es decir, en el peor caso puede hacer hasta 15 solicitudes de golpe, pero si continúa a esa tasa, Nginx empezará a rechazar con errores 503.

- Límites de conexiones concurrentes
Cada IP puede tener como máximo 20 conexiones simultáneas abiertas hacia el servidor.

- Configuración de timeouts
Se implementaron timeouts para evitar que un cliente malicioso mantenga recursos del servidor ocupados indefinidamente, 10s para enviar body o headers, 15s para mantener la conexión abierta en keep-alive, y 10s para la respuesta.

### Monitoreo de latencia:
| Periodo                               | Latencia           |
| :------------------------------------ | :----------------- |
| Ataque inicial                        | `302 ms`           |
| Ataque después de hacer Contramedidas | `172 ms`           |
| Ataque después de hacer Réplicas      | `135 ms`           |

### Análisis teórico:
¿Cómo detecta un SysAdmin un ataque DoS?
- Revisar `logs` de acceso verificar si hay muchas IPs, y requests repetitivos.
- Sistemas de `monitoreo` para encontrar uso anormal de CPU, RAM, o tráfico.
- Sistemas de `alertas automáticas`.
- `netstat, ss, iftop`: encontrar conexiones sospechosas.
- Detección de `patrones` como User-Agents anómalos, y rutas específicas.
