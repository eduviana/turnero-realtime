Aquí tienes el README completo con el orden optimizado.

Reorganicé la estructura con esta lógica narrativa (más fuerte para reclutadores técnicos):

Contexto

Stack

Arquitectura

Dominio

Realtime

Seguridad

Base de datos

Instalación

Dashboard

Decisiones de diseño

Estado

Eso cuenta la historia del sistema de forma más profesional.

Copia y pega todo este bloque:

# Sistema Interno de Gestión de Turnos

Sistema web fullstack desarrollado para la gestión interna de turnos de una obra social.  
Diseñado para operar en entorno controlado con múltiples roles, reglas de negocio diferenciadas y sincronización en tiempo real.

---

## 📚 Tabla de Contenido

- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Dominio de Turnos](#-dominio-de-turnos)
- [Realtime](#-realtime)
- [Seguridad](#-seguridad)
- [Base de Datos](#-base-de-datos)
- [Instalación](#-instalación)
- [Dashboard Administrativo](#-dashboard-administrativo)
- [Decisiones de Diseño](#-decisiones-de-diseño)
- [Estado](#-estado)

---

## 🧱 Stack Tecnológico

- **Next.js 16 (App Router)**
- **TypeScript**
- **PostgreSQL (Docker)**
- **Prisma 7**
- **Clerk (Autenticación)**
- **RBAC jerárquico propio (Autorización)**
- **Pusher (Realtime)**
- **TailwindCSS 4 + shadcn/ui**
- **Recharts**
- **Zod**
- **React Hook Form**

---

## 🏗 Arquitectura

### Modular Feature Architecture

La aplicación está organizada por dominios funcionales dentro de `features/`.  
Cada módulo encapsula su propia lógica de negocio, validaciones, tipos y componentes, manteniendo límites claros entre responsabilidades.

- **affiliate-login** → Flujo de identificación del afiliado (ingreso por DNI) y validación previa al acceso a servicios.
- **affiliates** → Gestión administrativa y consulta de afiliados con capacidades de filtrado.
- **audits** → Visualización y consulta de eventos auditables registrados por el sistema.
- **auth** → Contexto y hooks de acceso a metadata del usuario autenticado (rol y perfil).
- **dashboard** → Panel administrativo con vista agregada del estado general del sistema según rol.
- **operator-workspace** → Núcleo operativo reutilizable para atención de turnos. Contiene lógica compartida entre áreas y segmentación por dominio específico.
- **orders** → Gestión de órdenes asociadas a áreas que comercializan productos.
- **organizations** → Acceso a entidades organizacionales persistidas en base de datos.
- **service** → Flujo de selección de servicio por parte del afiliado previo a la generación del turno.
- **services** → Administración de servicios disponibles y control de activación/desactivación.
- **stats** → Agregación y visualización de métricas operativas e históricas.
- **tickets** → Generación persistente de turnos y manejo del flujo posterior a la emisión.
- **turn-queue** → Orquestación de la cola activa de turnos y sincronización en tiempo real.
- **turns-screen** → Visualización pública en tiempo real del turno actual y últimos llamados.
- **users** → Gestión administrativa de usuarios OPERATOR y control de permisos según jerarquía.

Principios aplicados:

- Alta cohesión interna
- Bajo acoplamiento entre dominios
- Separación clara entre UI y lógica de negocio
- Backend-driven frontend

### Estructura Global Simplificada

```
app/
components/
features/
lib/
  db/
  roles/
  pusher/
  audit/
prisma/
generated/
proxy.ts
```

El directorio `app/` se utiliza exclusivamente para routing y composición.  
La lógica de negocio no se acopla al sistema de rutas.

---

## 🎟 Dominio de Turnos

El flujo de negocio está modelado explícitamente:

```
Generación → Llamado → Inicio → Finalización
```

Cada transición registra timestamps independientes para permitir:

- Tiempo hasta llamado
- Tiempo real de atención
- Métricas por operador
- Métricas por área
- Análisis histórico

La lógica de transición se centraliza en servicios de dominio para evitar inconsistencias y efectos colaterales.

---

## ⚡ Realtime

Implementado con **Pusher** para sincronización inmediata de la cola de turnos.

Flujo típico:

1. Se genera ticket
2. Se actualiza estado
3. Se dispara evento en canal dinámico
4. La UI se sincroniza automáticamente

Canales dinámicos:

```
turn-queue-{serviceId}
```

No requiere refresh manual ni polling.

---

## 🔐 Seguridad

El sistema implementa un enfoque de defensa en profundidad.

### Middleware (Capa Perimetral)

Integrado con `clerkMiddleware`.

Responsabilidades:

- Autenticación obligatoria
- Autorización por prefijo de ruta
- Redirección inteligente según rol
- Registro de intentos indebidos

Ejemplo conceptual:

```ts
if (!hasRequiredRole(userRole, routePermission)) {
  logUnauthorizedAttempt({
    actorId,
    actorRole,
    route,
    ip,
    userAgent
  })
  redirect("/unauthorized")
}
```

### Autorización en Servidor

Validación explícita en:

- Server Actions
- Route Handlers
- Servicios críticos

Separación estricta:

- **Autenticación → Clerk**
- **Autorización → Sistema RBAC propio**

Nunca se confía únicamente en el middleware para proteger operaciones críticas.

### Sistema de Roles

Roles jerárquicos:

- `ADMIN`
- `SUPERVISOR`
- `OPERATOR`

Modelo de jerarquía:

```ts
export const ROLE_HIERARCHY = {
  ADMIN: 3,
  SUPERVISOR: 2,
  OPERATOR: 1
}
```

Se aplica el principio de menor privilegio.

### Auditoría

Se registra:

- `actorId`
- `actorRole`
- `ruta`
- `IP`
- `userAgent`
- timestamp

Permite trazabilidad completa de acciones sensibles.

---

## 🐘 Base de Datos

- PostgreSQL en Docker
- Prisma ORM
- Migraciones versionadas
- Seeds reproducibles

Ejecutar migraciones:

```bash
npx prisma migrate dev
```

### Seeds Iniciales

Scripts independientes para poblar el entorno controlado:

```bash
# Provincias y ciudades
npx tsx prisma/scripts/create-provinces-and-cities.ts

# Afiliados
npx tsx prisma/scripts/create-affiliates.ts

# Servicios
npx tsx prisma/scripts/create-services.ts

# Organizaciones
npx tsx prisma/scripts/create-organizations.ts

# Productos - Farmacia Medicamentos
npx tsx prisma/scripts/create-pharmacy-medications.ts

# Productos - Farmacia General
npx tsx prisma/scripts/create-pharmacy-general.ts
```

Permiten reproducibilidad y separación entre datos estructurales y operativos.

---

## 🚀 Instalación

### 1️⃣ Clonar repositorio

```bash
git clone <repo-url>
cd dashboard-realtime
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Levantar base de datos

```bash
docker compose up -d
```

### 4️⃣ Variables de entorno

Crear `.env`:

```env
DATABASE_URL=

NEXT_PUBLIC_BASE_URL=

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=

NEXT_PUBLIC_PUSHER_KEY=
NEXT_PUBLIC_PUSHER_CLUSTER=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=
CLERK_WEBHOOK_SECRET_SESSION=
```

### 5️⃣ Iniciar proyecto

```bash
npm run dev
```

---

## 📊 Dashboard Administrativo

Incluye:

- Métricas por operador
- Métricas por área
- Visualización histórica
- Comparativas de rendimiento
- Estadísticas basadas en tiempos reales de atención

Visualización implementada con Recharts.

---

## 🧠 Decisiones de Diseño

- Separación estricta entre autenticación y autorización
- Jerarquía formal de roles con comparación numérica
- Modularización por dominio (Feature-first)
- Realtime desacoplado del core de negocio
- Auditoría persistente
- Migraciones y seeds reproducibles
- Backend-driven frontend para minimizar lógica sensible en cliente

---

## 📌 Estado

Sistema interno en entorno controlado.  
No desplegado públicamente.