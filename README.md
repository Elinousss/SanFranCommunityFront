# 🏢 SanFran Community - Frontend React

Aplicación frontend moderna en React para la gestión de comunidades residenciales con autenticación, roles y panel administrativo.

## 🎯 Estado del Proyecto

✅ **Listo para usar**
✅ **Autenticación funcional**
✅ **Panel administrativo protegido por rol**
✅ **Gestión de usuarios, facilities y reservaciones**
✅ **Arquitectura limpia con carpetas por capas**

## 🚀 Inicio rápido

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar backend
La aplicación usa por defecto la URL:

```bash
http://localhost:8080/api/v1
```

Para configurar otra URL, crea un archivo `.env` en la raíz con:

```env
REACT_APP_API_URL=http://tu-backend:8080/api/v1
```

### 3. Ejecutar en desarrollo
```bash
npm start
```

### 4. Generar build de producción
```bash
npm run build
```

## 📁 Estructura del proyecto

```
SanFranCommunityFront/
├── public/
│   └── index.html
├── src/
│   ├── application/
│   │   ├── dto/
│   │   └── services/
│   ├── core/
│   │   ├── config/
│   │   ├── constants/
│   │   └── enums/
│   ├── domain/
│   │   ├── entities/
│   │   └── interfaces/
│   ├── infrastructure/
│   │   ├── api/
│   │   ├── repositories/
│   │   ├── service-locator.js
│   │   └── storage/
│   ├── presentation/
│   │   ├── context/
│   │   └── hooks/
│   ├── components/
│   ├── pages/
│   ├── styles/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

## 🔐 Rutas y permisos

- `/` - Página de inicio pública
- `/login` - Login
- `/register` - Registro
- `/admin` - Panel administrativo (solo admins)

El acceso a `/admin` está protegido con `ProtectedRoute` y solo se permite a usuarios con rol `ADMIN`.

## 👤 Credenciales de prueba

- **Email**: `admin@sanfran.com`
- **Contraseña**: cualquiera

## 📌 Páginas principales

- **Inicio (`/`)**: hero, facilities y estadísticas
- **Login (`/login`)**: autenticación de usuarios
- **Registro (`/register`)**: creación de nuevos residentes
- **Admin (`/admin`)**: gestión de usuarios, facilities y reservaciones

## 🧩 Arquitectura

El proyecto está organizado en capas:

- `core`: configuración, constantes y enums
- `domain`: entidades e interfaces del negocio
- `application`: servicios y DTOs
- `infrastructure`: llamadas a API, repositorios y persistencia
- `presentation`: contextos y hooks React
- `components`: elementos reutilizables de UI

## 🌐 API consumida

La app usa estos endpoints:

```text
GET    /api/v1/users
GET    /api/v1/users?email=<email>
POST   /api/v1/users
DELETE /api/v1/users/:id
GET    /api/v1/facilities
DELETE /api/v1/facilities/:id
GET    /api/v1/reservations
```

## 💼 Componentes clave

- `src/presentation/context/auth.context.js`
- `src/presentation/hooks/useAuth.js`
- `src/components/ProtectedRoute.js`
- `src/infrastructure/service-locator.js`
- `src/application/services/auth.service.js`

## 🛠️ Cómo desarrollar

### Agregar una nueva página
1. Crear archivo en `src/pages/`
2. Importarlo en `src/App.js`
3. Añadir la ruta en el `Routes`

### Usar autenticación

```javascript
import { useAuth } from './presentation/hooks/useAuth';

function MiComponente() {
  const { user, login, logout, isAdmin } = useAuth();
}
```

### Configurar API

Si necesitas cambiar el backend, usa `.env` con:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

## 📦 Dependencias principales

- `react` ^18.2.0
- `react-dom` ^18.2.0
- `react-router-dom` ^6.14.0
- `axios` ^1.4.0

## 🚨 Troubleshooting

### Error al iniciar `npm start`
- Ejecuta `npm install` primero
- Confirma que Node.js está instalado

### `PORT 3000 already in use`

```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Conexión rechazada al backend
- Asegúrate de que el backend esté corriendo en `http://localhost:8080`
- Verifica que el `REACT_APP_API_URL` sea correcto

### CORS
- Configura el backend para aceptar requests desde `http://localhost:3000`

## 📚 Documentación unificada

Todos los detalles ahora están centralizados en este `README.md`.

> Si aún necesitas un vistazo rápido, `QUICKSTART.md` y `README_REACT.md` redirigen a este documento.

## 🤝 Contribuciones

1. `git checkout -b feature/tu-feature`
2. `git commit -am 'Agrega feature'`
3. `git push origin feature/tu-feature`
4. Abrir Pull Request

---

**Última actualización**: 2026

