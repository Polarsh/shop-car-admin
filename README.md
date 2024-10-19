# Car-Shop Admin

**Car-Shop Admin** es el panel de administración de un sitio web de ecommerce diseñado para gestionar la publicidad de autos de segunda mano. Este proyecto está construido utilizando **React** con **Vite** y **TailwindCSS** como herramientas principales de desarrollo frontend. También está integrado con **Firebase** para servicios como autenticación, base de datos en tiempo real (Firestore), almacenamiento de archivos y hosting.

## URL de la App en Producción

Puedes probar la aplicación accediendo a la siguiente URL:

[Car-Shop Admin](https://car-shop-admin-dybsm98.firebaseapp.com/)

> **Nota:** Al ingresar, se cargarán automáticamente las credenciales de prueba, pero las reglas de Firebase están configuradas para solo permitir visualización de los datos (sin permisos de escritura ni modificaciones).

## Características

- Autenticación con **Firebase Authentication**.
- Base de datos en tiempo real con **Firestore** para gestionar la información de los autos.
- Almacenamiento de imágenes con **Firebase Storage**.
- Exportación de tablas a **Excel**.
- Uso de **React Hook Form** y **Yup** para la validación de formularios.
- Notificaciones con **Sonner**.
- Interfaz de usuario optimizada con **TailwindCSS**.
- **Hosting en Firebase**.

## Tecnologías Utilizadas

- **React**: Librería JavaScript para construir interfaces de usuario.
- **Vite**: Un bundler moderno para desarrollo web rápido.
- **TailwindCSS**: Framework CSS de utilidad para diseño web moderno.
- **Firebase**: Plataforma en la nube que ofrece varios servicios como:
  - **Authentication**: Gestión de usuarios y autenticación.
  - **Firestore**: Base de datos NoSQL en tiempo real.
  - **Storage**: Almacenamiento de archivos (imágenes, documentos, etc.).
  - **Hosting**: Implementación de la aplicación en la nube.
- **Sonner**: Librería para gestionar notificaciones de la UI.
- **React Hook Form**: Gestión de formularios en React.
- **Yup**: Librería de validación de formularios.
- **xlsx**: Utilizada para la exportación de datos a archivos Excel.

## Pruebas

Puedes usar las siguientes credenciales de prueba para ingresar a la aplicación:

```
Email: prueba@dybsm98.com
Password: prueba
```

> **Nota:** Los datos son solo de visualización. No podrás realizar cambios en la base de datos.

## Funcionalidades Principales

- **Autenticación**: El administrador inicia sesión usando su cuenta de Firebase.
- **Gestión de Vehículos**: Ver el inventario completo de autos de segunda mano.
- **Exportación a Excel**: Los datos de los autos se pueden exportar en formato Excel para facilitar el análisis.
- **Subida de Imágenes**: Las imágenes de los vehículos se almacenan en Firebase Storage.
- **Notificaciones en Tiempo Real**: Se utilizan notificaciones para mejorar la experiencia del usuario (usando Sonner).
