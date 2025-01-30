# 📚 Notas por Hacer

_Sistema Académico Demo - Proyecto de Portafolio Técnico_

![Tech Stack](https://img.shields.io/badge/Stack-SvelteKit%20%2B%20Supabase%20%2B%20Vercel-blueviolet) ![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 Descripción del Proyecto

Sistema de gestión académica multirol para demostrar habilidades full-stack, con:

- ✅ 3 roles de usuario: **Administrador**, **Profesor**, **Estudiante**
- 🔐 Autenticación con cuentas demo (acceso rápido) y registro personalizado
- 📧 Verificación de correo electrónico para cuentas nuevas
- 🏫 Contexto ficticio para colegio imaginario

## 👥 Funcionalidades por Rol

### 🔑 Usuarios Autenticados

- ✏️ Editar perfil personal y cambiar contraseña
- 📊 Panel `/privado` con estadísticas generales:
  - Total de estudiantes registrados
  - Cantidad de cursos activos
  - Número de profesores

### ⚡ Administradores

- 👤 **Gestión de Usuarios:**
  - Crear/eliminar cuentas
  - Modificar roles y datos personales
- 🎓 **Control Académico:**
  - Crear cursos (nombre + descripción)
  - Inscribir estudiantes a cursos
  - Editar información de profesores/estudiantes

### 🎓 Profesores

- 📝 **Registro de Calificaciones:**
  - Editar notas (Parcial 1, Parcial 2, Parcial 3, Promedio)
- 👀 **Visualización:**
  - Listado completo de estudiantes
  - Catálogo de cursos
  - Directorio de profesores (solo lectura)
- ⛔ Restricciones:
  - No puede crear usuarios

### 🧑🎓 Estudiantes

- 📉 Consultar propias calificaciones
- 👨🏫 Ver listado de profesores
- ⛔ Acceso limitado a otras secciones

## 🛠️ Tecnologías Usadas

| **Categoría**  | **Tecnologías**                                                                      |
| -------------- | ------------------------------------------------------------------------------------ |
| **Frontend**   | Svelte 5 • SvelteKit (Routing, Actions) • Tailwind CSS • TypeScript (90%)            |
| **Backend**    | Supabase (PostgreSQL) • RLS (Row Level Security) • Autenticación JWT                 |
| **Despliegue** | Vercel (Dominio predeterminado)                                                      |
| **UX/UI**      | Diseño Responsive (Mobile-First) • Toasts interactivos • Validaciones en tiempo real |

## 🎯 Objetivo del Proyecto

Proyecto demostrativo para exhibir habilidades en:

- **Arquitectura full-stack** con componentes modulares
- **Gestión de permisos granulares** (RLS de Supabase)
- **Integración de servicios modernos** (BaaS + Serverless)
- **Buenas prácticas** (TypeScript, Validaciones duales, CI/CD)

## 🌟 Características Destacadas

```bash
✔️ Sistema multirol con políticas de seguridad
✔️ Autenticación con cuentas demo (sin configuración)
✔️ Interfaz responsive optimizada para móviles
✔️ Feedback visual con toasts y mensajes contextuales
✔️ Validaciones en frontend y backend
```

## 🚧 Estado Actual & Futuras Mejoras

### ✅ Implementado

- **Núcleo funcional de gestión académica**
- **CRUD completo para administradores**
- **Flujos de autenticación robustos** (cuentas demo + registro personalizado)

### ⏳ En Consideración

- 📊 Dashboards analíticos por rol (gráficos de progreso/estadísticas)
- 🔔 Sistema de notificaciones en tiempo real
- 📁 Gestión de materiales de curso (subir archivos/recursos)
- 🔄 Recuperación de contraseña vía email
- 📅 Calendario académico integrado

## 📦 Detalles Técnicos

- **TypeScript**: Implementación mayoritaria con tipado estricto (>90% del código)
- **Seguridad**:
  - Row Level Security (RLS) en todas las tablas de Supabase
  - Cifrado JWT para autenticación
- **Contraseñas**: Cambio desde perfil (sin recuperación externa actualmente)
- **Cuentas Demo**: Datos preconfigurados sin restricciones de tiempo

## 🌐 Demo

🔗 Demostración en Vivo: [sistema-de-gestion-academica.vercel.app](https://sistema-de-gestion-academica.vercel.app/)
📂 Código Fuente: [github.com/IvanGabrielYarupaitanRivera/SistemaDeGestionAcademica](https://github.com/IvanGabrielYarupaitanRivera/SistemaDeGestionAcademica)

---

📌 **Nota importante:**  
_Este proyecto utiliza el plan gratuito de Vercel con fines demostrativos.  
Puede experimentar limitaciones de rendimiento en entornos de alta demanda._

---

✨ **Créditos & Contacto**  
💻 **Desarrollador:** Yarupaitan Rivera Ivan Gabriel  
📧 **Colaboraciones:**  
[![Email](https://img.shields.io/badge/Contacto-ivangyr321@gmail.com-%23007EC6?style=flat&logo=gmail)](mailto:ivangyr321@gmail.com)  
[![LinkedIn](https://img.shields.io/badge/Perfil_Profesional-LinkedIn-%230A66C2?style=flat&logo=linkedin)](https://www.linkedin.com/in/ivan-yarupaitan-rivera/)  
[![GitHub](https://img.shields.io/badge/Portafolio-GitHub-%23181717?style=flat&logo=github)](https://github.com/IvanGabrielYarupaitanRivera)

🚀 **¿Quieres contribuir o reportar un bug?**  
¡Me encantaría escuchar tus ideas! Puedes:  
1️⃣ Abrir un [nuevo issue](https://github.com/IvanGabrielYarupaitanRivera/SistemaDeGestionAcademica/issues)  
2️⃣ Enviar un pull request  
3️⃣ Contactarme directamente por email
