# SanFranCommunityFront

Pagina web provisional para integracion con el backend de SanFran Community.

## Como usar

1. Inicia el backend en http://localhost:8080.
2. Abre index.html en el navegador.
3. En el formulario "Conexion del backend", confirma la URL base de API:
	 - http://localhost:8080/api/v1
4. Usa los modulos de Users, Facilities y Reservations para probar operaciones.

## Funcionalidades actuales

- Users
	- Crear usuario
	- Listar usuarios
	- Buscar por query param: id o names
	- Eliminar por query param: id o names
- Facilities
	- Crear facility
	- Listar facilities
	- Buscar por query param: id o name
	- Eliminar por query param: id o name
- Reservations
	- Crear reservation
	- Listar reservations
	- Buscar por query param: id o date
	- Eliminar por query param: id

## Estructura

- index.html: estructura semantica, formularios y tablas.
- styles.css: estilos visuales, contraste y foco visible.
- app.js: consumo de API con formato ApiResponse y manejo de estado.

## Accesibilidad (WCAG 2.2 AA)

Implementado en esta version provisional:

- Navegacion por teclado con skip link al contenido principal.
- Estructura semantica (header, main, section, encabezados jerarquicos).
- Etiquetas asociadas a todos los campos (label + for).
- Estados y mensajes accesibles mediante region viva (aria-live="polite").
- Foco visible consistente (:focus-visible).
- Contraste alto en texto, botones y estados de exito/error.
- Respeto de preferencias de movimiento reducido (prefers-reduced-motion).
- Tablas con encabezados (th scope="col") y caption oculto para lectores de pantalla.

## Nota de integracion

Si el navegador bloquea la comunicacion por CORS, habilita CORS en el backend para el origen desde donde abras este frontend.
