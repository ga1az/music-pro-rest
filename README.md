# Music Pro REST API

## Description

Esta es una API REST para la tienda Music Pro, la cual permite realizar las operaciones CRUD sobre los productos de la tienda.

## Installation

### requirements

- Node
- NPM
- Docker
- Docker-compose

### Steps

1. Clonar el repositorio
2. Ejecutar comando `docker-compose up` en la raíz del proyecto para levantar el contenedor de la base de datos y la aplicación.
3. Esto levantará la aplicación en el puerto 3000 y la base de datos en el puerto 27017 en modo desarrollo.
3. Ya se puede consumir la API con sus respectivos endpoints.
4. Revisar la documentación de la API en la siguiente URL: `http://localhost:3000/api/`

> Tambien puedes ejecutarlo con el comando `npm run start` en la raíz del proyecto, pero debes tener una base de datos MongoDB corriendo en el puerto 27017.