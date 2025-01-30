# Sistema Académico Demo - Gestión de Calificaciones

## 🎯 Descripción

Plataforma educativa full-stack con autenticación granular y roles diferenciados para gestión académica. Proyecto demostrativo con enfoque en arquitectura moderna y mejores prácticas.

## ⚡ Características Principales

### 🔐 Autenticación y Roles

- Cuentas demo preconfiguradas (estudiante/profesor)
- Registro con verificación de email
- Roles: Administrador | Profesor | Estudiante

### 👥 Funcionalidades por Rol

#### Administrador

- CRUD completo de usuarios
- Gestión de roles y datos académicos
- Administración de cursos
- Control de inscripciones

#### Profesor

- Gestión de calificaciones (3 parciales + promedio)
- Consulta de estudiantes asignados
- Visualización de cuerpo docente

#### Estudiante

- Consulta de calificaciones personales
- Listado de profesores asignados

## 🛠️ Stack Tecnológico

| Capa     | Tecnologías                                         |
| -------- | --------------------------------------------------- |
| Frontend | Svelte 5, SvelteKit, Tailwind CSS, TypeScript (90%) |
| Backend  | Supabase (PostgreSQL), Row Level Security           |
| Deploy   | Vercel, Dominio predeterminado                      |

## 🔒 Seguridad Implementada

- Row Level Security (RLS) en Supabase
- Validaciones duales (cliente/servidor)
- Autenticación JWT
- Permisos granulares por rol

## 💡 Aspectos Destacados

- Arquitectura modular y escalable
- UI/UX responsive (mobile-first)
- Feedback visual con toasts
- Flujos de autenticación optimizados
- TypeScript para tipado seguro

## 🚧 Roadmap

- Sistema de notificaciones
- Dashboard analítico por rol
- Gestión avanzada de cursos

## 🔗 Enlaces

- Demo: [URL](https://sistema-de-gestion-academica.vercel.app/)
- Repo: [GitHub](https://github.com/IvanGabrielYarupaitanRivera/SistemaDeGestionAcademica)

## 💻 Desarrollo Local

```bash
git clone [repo-url]
cd [proyecto]
pnpm install
pnpm dev
```

## 📝 Notas Técnicas

- Implementación de estados complejos con Svelte stores
- Integración BaaS mediante Supabase
- Políticas de seguridad escalables
- Arquitectura orientada a componentes
- Proyecto de portafolio técnico demostrando implementación de sistema multirol con arquitectura moderna. `
