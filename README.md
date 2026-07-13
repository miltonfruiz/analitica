# Dashboard de Analíticas con Gráficos
=====================================

## Stack
--------

* Frontend: React
* Backend: Node.js con Express
* Base de datos: MongoDB
* Autenticación: JSON Web Tokens (JWT)

## Instalación
------------

1. Clonar el repositorio: `git clone https://github.com/usuario/repo.git`
2. Instalar dependencias: `npm install`
3. Configurar variables de entorno: `cp .env.example .env`
4. Iniciar servidor: `npm start`

## Docker
---------

1. Construir imagen: `docker build -t dashboard-analiticas .`
2. Iniciar contenedor: `docker run -p 5000:5000 dashboard-analiticas`

## Endpoints
------------

La API tiene los siguientes endpoints:

### Autenticación

* **POST /api/auth/register**: Registrar un nuevo usuario
* **POST /api/auth/login**: Iniciar sesión

### Analíticas

* **GET /api/analytics**: Obtener todas las analíticas (requiere autenticación)
* **GET /api/analytics/:id**: Obtener analítica por ID (requiere autenticación)
* **POST /api/analytics**: Crear nueva analítica (requiere autenticación)
* **PUT /api/analytics/:id**: Actualizar analítica existente (requiere autenticación)
* **DELETE /api/analytics/:id**: Eliminar analítica existente (requiere autenticación)

### Gráficos

* **GET /api/charts**: Obtener todos los gráficos (requiere autenticación)
* **GET /api/charts/:id**: Obtener gráfico por ID (requiere autenticación)
* **POST /api/charts**: Crear nuevo gráfico (requiere autenticación)
* **PUT /api/charts/:id**: Actualizar gráfico existente (requiere autenticación)
* **DELETE /api/charts/:id**: Eliminar gráfico existente (requiere autenticación)

## Modelo de Datos
------------------

El modelo de datos principal es **Analytic**, que tiene los siguientes campos:

* **title**: String
* **description**: String
* **data**: Array

## Seguridad
------------

* La autenticación se realiza mediante JSON Web Tokens (JWT)
* Los endpoints que requieren autenticación están marcados con **auth: true**
* Se utiliza HTTPS para cifrar la comunicación entre el cliente y el servidor
* Las contraseñas se almacenan cifradas en la base de datos
* Se realizan validaciones de entrada para prevenir ataques de inyección SQL y cross-site scripting (XSS)