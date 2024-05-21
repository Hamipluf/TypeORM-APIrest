# TypeORM API-Rest

## Descripción 
Este ejemplo presenta una API REST completa que implementa las operaciones básicas de CRUD (Crear, Leer, Actualizar, Eliminar) para gestionar datos, un sistema de autenticación de usuario para proteger el acceso a los recursos y relaciones básicas entre las entidades de la base de datos.

## Tecnologías Usadas

- Node.js
- Express.js
- TypeORM
- PostgreSQL
- Typescript

## Características

1. **Operaciones CRUD:**
   -  La API permite crear, leer, actualizar y eliminar registros en las tablas de la base de datos.

2. **Autenticación de usuario:**
   - Los usuarios deben autenticarse con un email y contraseña para acceder a 		los recursos protegidos de la API. (Se trabaja con JWT)

3. **Relaciones entre entidades::**
   -  La API admite relaciones básicas entre entidades, como uno a uno y uno a varios.



## API Documentation

Explore the API documentation at `/api-docs` for detailed information about the available endpoints and how to interact with them.

## Project Setup

``   - Instalar dependencias: `npm install`
   - Configurar las variables de entorno segun `.env.example`
   - Si no usas PostgreSQL configura la DB en `src/DB.ts`
   - Run the server: `npm start`

   
