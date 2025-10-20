# Boost A Project

![Backend Tests](https://img.shields.io/badge/Backend_Tests-83_passed-brightgreen)
![Frontend Tests](https://img.shields.io/badge/Frontend_Tests-187_passed-brightgreen)
![Coverage](https://img.shields.io/badge/Coverage-93%25-brightgreen)
![Total Tests](https://img.shields.io/badge/Total_Tests-270-blue)

Plataforma web de inversión inmobiliaria diseñada para ofrecer transparencia, documentación clara y acompañamiento personalizado en cada etapa del proceso. Facilita el acceso a oportunidades seleccionadas, enfocándose en la confianza, la seguridad y una experiencia de usuario cuidada.

## Tecnologías

### Frontend

* Next.js 15.2 con App Router
* TypeScript para desarrollo sostenible
* Tailwind CSS + componentes personalizados
* React Testing Library + Jest (187 tests)
* Zustand para gestión de estado global
* JWT para autenticación segura

### Backend

* Flask con arquitectura modular
* SQLAlchemy + Alembic para migraciones
* PostgreSQL como base de datos
* JWT en cookies HttpOnly + protección CSRF
* Flask-Mail para recuperación de contraseñas y notificaciones
* Pytest con 93% de cobertura (83 tests)

### DevOps

* Docker y Docker Compose
* GitHub Actions para CI/CD
* Cloudinary para gestión de imágenes

## Estructura del Proyecto

```bash
Plataforma-inversion/
├── .env                                   # Configuración backend (creado)
├── .env.docker                           # Configuración Docker (creado)
├── .env.example                          # Plantilla configuración backend
├── .env.docker.example                   # Plantilla configuración Docker
├── docker-compose.yml                    # Configuración Docker
├── Dockerfile.backend                    # Dockerfile backend
├── Dockerfile.frontend                   # Dockerfile frontend
├── global.d.ts                          # Tipos globales TypeScript
├── LICENSE                               # Licencia MIT
├── middleware.ts                         # Middleware Next.js
├── package.json                          # Dependencias Node.js
├── package-lock.json                     # Lock file Node.js
├── pyproject.toml                        # Configuración Python
├── README.md                             # Este archivo
├── src/
│   ├── backend/                          # Backend Flask
│   │   ├── app/
│   │   │   ├── __init__.py               # Factory Flask
│   │   │   ├── api/                      # Endpoints REST
│   │   │   │   ├── __init__.py
│   │   │   │   ├── account.py           # Gestión de cuenta
│   │   │   │   ├── articles.py          # API artículos
│   │   │   │   ├── auth.py              # Autenticación
│   │   │   │   ├── images.py            # Subida de imágenes
│   │   │   │   ├── projects.py          # API proyectos
│   │   │   │   ├── routes.py            # Rutas principales
│   │   │   │   └── users.py             # Gestión usuarios
│   │   │   ├── cli/                     # Comandos Flask CLI
│   │   │   │   ├── __init__.py
│   │   │   │   ├── commands.py          # Comandos de datos
│   │   │   │   ├── create_admin.py      # Crear administrador
│   │   │   │   └── init_data.py         # Inicialización completa
│   │   │   ├── config.py                # Configuración Flask
│   │   │   ├── data/                    # Datos estáticos
│   │   │   │   ├── articles.json        # Artículos iniciales
│   │   │   │   └── projects/            # Proyectos modulares
│   │   │   │       └── fiverooms-venezuela.json
│   │   │   ├── extensions.py            # Extensiones Flask
│   │   │   ├── models/                  # Modelos SQLAlchemy
│   │   │   │   ├── __init__.py
│   │   │   │   ├── article.py           # Modelo artículo
│   │   │   │   ├── project.py           # Modelo proyecto
│   │   │   │   └── user.py              # Modelo usuario
│   │   │   ├── schemas/                 # Esquemas Marshmallow
│   │   │   │   ├── __init__.py
│   │   │   │   ├── article_schema.py    # Serialización artículos
│   │   │   │   ├── contact_schema.py    # Serialización contacto
│   │   │   │   ├── project_schema.py    # Serialización proyectos
│   │   │   │   └── user.py              # Serialización usuarios
│   │   │   ├── scripts/                 # Scripts de importación
│   │   │   │   ├── __init__.py
│   │   │   │   ├── import_service.py    # Servicio de importación
│   │   │   │   ├── import_static_articles.py
│   │   │   │   └── import_static_projects.py
│   │   │   ├── services/                # Lógica de negocio
│   │   │   │   ├── __init__.py
│   │   │   │   ├── article_service.py  # Servicio artículos
│   │   │   │   ├── email_service.py     # Servicio email
│   │   │   │   └── image_service.py     # Servicio imágenes
│   │   │   └── utils/                   # Utilidades
│   │   │       ├── __init__.py
│   │   │       └── utils.py
│   │   ├── migrations/                  # Migraciones Alembic
│   │   │   ├── alembic.ini
│   │   │   ├── env.py
│   │   │   ├── README
│   │   │   ├── script.py.mako
│   │   │   └── versions/
│   │   │       └── 99f0126d0976_create_flexible_project_model.py
│   │   ├── requirements.txt             # Dependencias Python
│   │   ├── run.py                       # Punto de entrada
│   │   ├── tests/                       # Tests backend
│   │   │   ├── __init__.py
│   │   │   ├── api/                     # Tests API
│   │   │   ├── config/                  # Tests configuración
│   │   │   ├── models/                  # Tests modelos
│   │   │   ├── schemas/                 # Tests esquemas
│   │   │   ├── scripts/                 # Tests scripts
│   │   │   ├── services/                # Tests servicios
│   │   │   ├── conftest.py              # Configuración pytest
│   │   │   └── test_db.py               # Tests base de datos
│   │   └── venv/                        # Entorno virtual Python
│   └── frontend/                         # Frontend Next.js
│       ├── __mocks__/                    # Mocks para testing
│       ├── __tests__/                    # Tests frontend
│       ├── app/                          # App Router Next.js
│       │   ├── (auth)/                   # Rutas autenticación
│       │   ├── (user_private)/           # Rutas usuario
│       │   ├── admin/                    # Panel administración
│       │   ├── blog/                     # Blog público
│       │   ├── contact/                  # Contacto
│       │   ├── proyectos/                # Proyectos públicos
│       │   ├── layout.tsx                # Layout principal
│       │   └── page.tsx                 # Página inicio
│       ├── components/                   # Componentes React
│       │   ├── admin/                    # Componentes admin
│       │   ├── articles/                 # Componentes artículos
│       │   ├── auth/                     # Componentes autenticación
│       │   ├── blog/                     # Componentes blog
│       │   ├── contact/                  # Componentes contacto
│       │   ├── Home/                     # Componentes homepage
│       │   ├── layout/                   # Componentes layout
│       │   ├── projects/                 # Componentes proyectos
│       │   ├── shared/                   # Componentes compartidos
│       │   ├── sideMenus/                # Menús laterales
│       │   ├── ui/                       # Componentes UI base
│       │   └── user/                     # Componentes usuario
│       ├── constants/                     # Constantes
│       ├── coverage/                      # Reportes cobertura
│       ├── hooks/                         # Custom hooks
│       ├── lib/                          # Utilidades y servicios
│       ├── public/                        # Archivos estáticos
│       ├── stores/                        # Estado global Zustand
│       ├── styles/                        # Estilos CSS
│       ├── types/                         # Tipos TypeScript
│       ├── components.json               # Configuración shadcn/ui
│       ├── jest.config.ts                 # Configuración Jest
│       ├── jest.env.setup.ts              # Setup Jest
│       ├── next.config.js                 # Configuración Next.js
│       ├── next-env.d.ts                  # Tipos Next.js
│       ├── package.json                   # Dependencias frontend
│       ├── package-lock.json              # Lock file frontend
│       ├── postcss.config.js              # Configuración PostCSS
│       ├── setupTests.ts                  # Setup tests
│       ├── tailwind.config.js             # Configuración Tailwind
│       └── tsconfig.json                  # Configuración TypeScript
├── package-lock.json                     # Lock file Node.js
├── pyproject.toml                        # Configuración Python
├── README.md                             # Documentación principal
├── src/
│   ├── frontend/
│   │   ├── .env.local                    # Configuración desarrollo (creado)
│   │   ├── .env.test                     # Configuración tests (creado)
│   │   ├── .env.local.example            # Plantilla desarrollo
│   │   ├── .env.test.example             # Plantilla tests
│   │   ├── .next/                        # Build Next.js (generado)
│   │   ├── app/                          # App Router de Next.js
│   │   │   ├── (auth)/                   # Rutas de autenticación
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── signup/
│   │   │   │       └── page.tsx
│   │   │   ├── (user_private)/           # Rutas privadas usuario
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── perfil/
│   │   │   │       ├── layout.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── admin/                    # Panel de administración
│   │   │   │   ├── blog/
│   │   │   │   │   ├── editar/
│   │   │   │   │   │   └── [slug]/
│   │   │   │   │   │       ├── layout.tsx
│   │   │   │   │   │       └── page.tsx
│   │   │   │   │   ├── new-article/
│   │   │   │   │   │   ├── NewArticle.tsx
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   ├── page.tsx
│   │   │   │   └── perfil/
│   │   │   │       ├── layout.tsx
│   │   │   │       └── page.tsx
│   │   │   ├── blog/                     # Blog público
│   │   │   │   ├── [slug]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── proyectos/                # Página de proyectos
│   │   │   │   └── page.tsx
│   │   │   ├── recuperar-contrasena/
│   │   │   │   └── page.tsx
│   │   │   ├── reset-password/
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx                  # Landing principal
│   │   ├── components/                   # Componentes React
│   │   │   ├── admin/                    # Componentes del panel admin
│   │   │   │   ├── blog/
│   │   │   │   │   ├── BlogArticleForm.tsx
│   │   │   │   │   └── helpers/
│   │   │   │   │       └── htmlFormatter.ts
│   │   │   │   ├── layout/
│   │   │   │   │   └── AdminPageContent.tsx
│   │   │   │   ├── projects/             # Componentes de gestión de proyectos
│   │   │   │   │   ├── ProjectForm.tsx
│   │   │   │   │   ├── ProjectList.tsx
│   │   │   │   │   └── ProjectCard.tsx
│   │   │   │   └── ui/
│   │   │   │       ├── AdminCard.tsx
│   │   │   │       └── blog/
│   │   │   │           ├── ArticlePreview.tsx
│   │   │   │           ├── ArticlesSelector.tsx
│   │   │   │           ├── BlogArticleCard.tsx
│   │   │   │           ├── EditorContentArticle.tsx
│   │   │   │           └── WordCounter.tsx
│   │   │   ├── articles/                 # Componentes de artículos
│   │   │   │   ├── ArticleContent.tsx
│   │   │   │   ├── ArticleHeader.tsx
│   │   │   │   └── ArticleRelated.tsx
│   │   │   ├── auth/                     # Formularios de autenticación
│   │   │   │   ├── ForgotPasswordForm.tsx
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   ├── ResetPasswordForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── blog/                     # Componentes del blog
│   │   │   │   ├── BlogArticleCard.tsx
│   │   │   │   └── BlogHeader.tsx
│   │   │   ├── common/                   # Componentes comunes
│   │   │   │   ├── MainMenuLinks.tsx
│   │   │   │   └── SideMenuHeader.tsx
│   │   │   ├── contact/                  # Formulario de contacto
│   │   │   │   └── ContactForm.tsx
│   │   │   ├── Home/                     # Secciones de landing
│   │   │   │   ├── ActiveProjects.tsx
│   │   │   │   ├── CompanyValues.tsx
│   │   │   │   ├── ContactCTA.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── InvestmentProcess.tsx
│   │   │   │   ├── InvestorSupport.tsx
│   │   │   │   └── ValueProposition.tsx
│   │   │   ├── layout/                   # Componentes de layout
│   │   │   │   ├── ClientLayout.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── NavbarLinks.tsx
│   │   │   │   └── UiGlobalLayer.tsx
│   │   │   ├── shared/                   # Componentes compartidos
│   │   │   │   ├── DashboardHeader.tsx
│   │   │   │   ├── ProfileForm.tsx
│   │   │   │   └── ProfileView.tsx
│   │   │   ├── sideMenus/                # Menús laterales
│   │   │   │   ├── AdminSideMenu.tsx
│   │   │   │   ├── SideMenu.tsx
│   │   │   │   ├── SideMenuAuthSection.tsx
│   │   │   │   └── UserSideMenu.tsx
│   │   │   ├── ui/                       # Componentes básicos
│   │   │   │   ├── Button.tsx
│   │   │   │   ├── Card.tsx
│   │   │   │   ├── ImageUpload.tsx
│   │   │   │   ├── Input.tsx
│   │   │   │   └── Spinner.tsx
│   │   │   └── user/                     # Componentes del área de usuario
│   │   │       ├── DeleteAccountModal.tsx
│   │   │       └── layout/
│   │   │           └── UserPageContent.tsx
│   │   ├── stores/                       # Zustand stores
│   │   │   ├── useAuthStore.ts            # Estado de autenticación
│   │   │   └── useUiStore.ts             # Estado de UI
│   │   ├── lib/                          # Servicios y utilidades
│   │   │   ├── api/                       # Servicios de API
│   │   │   │   ├── authService.ts
│   │   │   │   ├── contactService.ts
│   │   │   │   ├── imageService.ts
│   │   │   │   ├── projectService.ts      # Servicio para gestión de proyectos
│   │   │   │   └── userService.ts
│   │   │   ├── blogService.ts
│   │   │   ├── utils.ts
│   │   │   └── utils/
│   │   │       ├── fetchWithAuth.ts
│   │   │       └── string-utils.ts
│   │   ├── types/                        # TypeScript interfaces
│   │   │   ├── auth.ts
│   │   │   ├── blog.ts
│   │   │   ├── index.ts
│   │   │   ├── project.ts                 # Tipos para proyectos
│   │   │   └── user.ts
│   │   ├── constants/                    # Constantes y validaciones
│   │   │   ├── privateRoutes.ts
│   │   │   ├── publicRoutes.ts
│   │   │   └── validation.ts
│   │   ├── hooks/                        # Custom hooks
│   │   │   ├── useArticle.ts
│   │   │   └── useStaticArticles.ts
│   │   ├── styles/                       # CSS global
│   │   │   ├── globals.css
│   │   │   └── output.css
│   │   ├── __mocks__/                    # Mocks reutilizables para tests
│   │   │   ├── blogService.ts
│   │   │   ├── fetchMock.ts
│   │   │   ├── mockedArticles.ts
│   │   │   ├── useAuthStore.ts
│   │   │   ├── userService.ts
│   │   │   └── useUiStore.ts
│   │   ├── __tests__/                    # Tests organizados por categoría (187 tests)
│   │   │   ├── admin/                    # Tests del panel de administración
│   │   │   │   ├── blog/
│   │   │   │   │   ├── ArticlesSelector.test.tsx
│   │   │   │   │   ├── BlogArticleForm.test.tsx
│   │   │   │   │   └── EditorContentArticle.test.tsx
│   │   │   │   └── layout/
│   │   │   │       └── AdminPageContent.test.tsx
│   │   │   ├── auth/                     # Tests de formularios de autenticación
│   │   │   │   ├── ForgotPasswordForm.test.tsx
│   │   │   │   ├── LoginForm.test.tsx
│   │   │   │   ├── ResetPasswordForm.test.tsx
│   │   │   │   └── SignupForm.test.tsx
│   │   │   ├── blog/                     # Tests del blog
│   │   │   │   └── ArticlePage.test.tsx
│   │   │   ├── common/                   # Tests de componentes comunes
│   │   │   │   ├── MainMenuLinks.test.tsx
│   │   │   │   └── SideMenuHeader.test.tsx
│   │   │   ├── contact/                  # Tests de contacto
│   │   │   │   └── ContactForm.test.tsx
│   │   │   ├── layout/                   # Tests de layout
│   │   │   │   ├── Navbar.test.tsx
│   │   │   │   └── NavbarLinks.test.tsx
│   │   │   ├── lib/                      # Tests de servicios y utilidades
│   │   │   │   ├── authService.test.ts
│   │   │   │   ├── blogService.test.ts
│   │   │   │   ├── contactService.test.ts
│   │   │   │   ├── userService.test.ts
│   │   │   │   └── utils/
│   │   │   │       └── fetchWithAuth.test.ts
│   │   │   ├── shared/                   # Tests de componentes compartidos
│   │   │   │   ├── DashboardHeader.test.tsx
│   │   │   │   ├── ProfileForm.test.tsx
│   │   │   │   └── ProfileView.test.tsx
│   │   │   ├── sideMenus/                # Tests de menús laterales
│   │   │   │   ├── AdminSideMenu.test.tsx
│   │   │   │   ├── SideMenu.test.tsx
│   │   │   │   ├── SideMenuAuthSection.test.tsx
│   │   │   │   └── UserSideMenu.test.tsx
│   │   │   ├── stores/                   # Tests de stores
│   │   │   │   ├── useAuthStore.test.ts
│   │   │   │   └── useUiStore.test.ts
│   │   │   ├── ui/                       # Tests de componentes UI
│   │   │   │   ├── Button.test.tsx
│   │   │   │   ├── Card.test.tsx
│   │   │   │   ├── ImageUpload.test.tsx
│   │   │   │   └── Input.test.tsx
│   │   │   ├── user/                     # Tests de usuario
│   │   │   │   ├── DeleteAccountModal.test.tsx
│   │   │   │   └── layout/
│   │   │   │       └── UserPageContent.test.tsx
│   │   │   └── utils/                     # Utilidades de testing
│   │   │       └── test-utils.tsx
│   │   ├── components.json               # Configuración shadcn/ui
│   │   ├── jest.config.ts                # Configuración Jest
│   │   ├── jest.env.setup.ts             # Setup Jest
│   │   ├── next.config.js                # Configuración Next.js
│   │   ├── next-env.d.ts                 # Tipos Next.js
│   │   ├── package.json                   # Dependencias frontend
│   │   ├── package-lock.json             # Lock file frontend
│   │   ├── postcss.config.js             # Configuración PostCSS
│   │   ├── setupTests.ts                 # Setup tests
│   │   ├── tailwind.config.js             # Configuración Tailwind
│   │   └── tsconfig.json                 # Configuración TypeScript
│   └── backend/
│       ├── admin/                        # Comandos CLI
│       │   ├── __init__.py
│       │   └── manage.py
│       ├── app/
│       │   ├── api/                      # Endpoints REST
│       │   │   ├── __init__.py
│       │   │   ├── account.py            # Perfil, contacto, reset password
│       │   │   ├── articles.py           # CRUD artículos blog
│       │   │   ├── auth.py               # Login, logout, signup
│       │   │   ├── images.py             # Upload Cloudinary
│       │   │   ├── projects.py           # CRUD proyectos de inversión
│       │   │   ├── routes.py             # Rutas generales
│       │   │   └── users.py              # Gestión usuarios admin
│       │   ├── config.py                 # Config por entorno
│       │   ├── data/                     # JSON estáticos
│       │   │   ├── articles.json         # Artículos iniciales
│       │   │   └── projects/              # Directorio de proyectos
│       │   │       └── fiverooms-venezuela.json  # Proyecto de ejemplo
│       │   ├── extensions.py              # Inicialización de extensiones Flask
│       │   ├── models/                   # Modelos SQLAlchemy
│       │   │   ├── __init__.py
│       │   │   ├── article.py
│       │   │   ├── project.py            # Modelo de proyectos
│       │   │   └── user.py
│       │   ├── schemas/                  # Validación y serialización
│       │   │   ├── __init__.py
│       │   │   ├── article_schema.py
│       │   │   ├── contact_schema.py
│       │   │   ├── project_schema.py     # Schemas para proyectos
│       │   │   └── user.py
│       │   ├── scripts/                  # Scripts de utilidad
│       │   │   ├── import_service.py
│       │   │   ├── import_static_articles.py
│       │   │   └── import_static_projects.py  # Importador de proyectos
│       │   ├── services/                 # Lógica de negocio
│       │   │   ├── __init__.py
│       │   │   ├── article_service.py
│       │   │   ├── email_service.py
│       │   │   ├── image_service.py
│       │   │   └── import_service.py
│       │   ├── utils/                    # Funciones auxiliares
│       │   │   ├── __init__.py
│       │   │   └── utils.py
│       │   └── __init__.py
│       ├── migrations/                   # Alembic
│       │   ├── alembic.ini
│       │   ├── env.py
│       │   ├── README
│       │   ├── script.py.mako
│       │   └── versions/
│       │       └── eee17872c641_initial_clean_migration_for_boost_a_.py
│       ├── tests/                        # Tests del backend (83 tests, 93% coverage)
│       │   ├── api/                      # Test de endpoints
│       │   │   ├── test_account.py
│       │   │   ├── test_articles_api.py
│       │   │   ├── test_auth.py
│       │   │   ├── test_images_api.py
│       │   │   ├── test_projects_api.py  # Tests de API de proyectos
│       │   │   ├── test_routes_api.py
│       │   │   └── test_users_api.py
│       │   ├── config/                   # Test de configuración
│       │   │   ├── test_config.py
│       │   │   └── test_extensions.py
│       │   ├── models/                   # Test unitarios de modelos
│       │   │   ├── test_article_model.py
│       │   │   └── test_user_model.py
│       │   ├── schemas/                  # Test de validación con Marshmallow
│       │   │   ├── test_article_schema.py
│       │   │   ├── test_contact_schema.py
│       │   │   └── test_user_schema.py
│       │   ├── scripts/                  # Test de comandos Flask CLI
│       │   │   └── test_manage_admin.py
│       │   ├── services/                 # Test de lógica de negocio
│       │   │   ├── test_article_service.py
│       │   │   ├── test_email_service.py
│       │   │   ├── test_image_service.py
│       │   │   └── test_import_service.py
│       │   ├── __init__.py
│       │   ├── conftest.py
│       │   └── test_db.py                 # Test de conexión DB
│       ├── venv/                         # Entorno virtual Python
│       ├── requirements.txt              # Dependencias Python
│       └── run.py                        # Punto de entrada Flask
```

## Requisitos Previos

* Docker y Docker Compose (recomendado)
* Alternativamente:
  * Node.js (v18 o superior)
  * Python (v3.9 o superior)
  * PostgreSQL

## 🛠️ Configuración de Variables de Entorno

El proyecto requiere **4 archivos de entorno** que debes crear copiando desde las plantillas incluidas. Todos los archivos `.example` contienen valores de ejemplo que deben ser actualizados con tus credenciales reales.

### Paso 1: Variables del Backend
Desde la **raíz del proyecto** (`Plataforma-inversion/`):

```bash
# Variables para desarrollo del backend (Flask)
cp .env.example .env

# Variables para Docker Compose
cp .env.docker.example .env.docker
```

### Paso 2: Variables del Frontend
Navega al directorio del frontend:

```bash
cd src/frontend

# Variables para desarrollo local de Next.js
cp .env.local.example .env.local

# Variables para ejecutar tests con Jest
cp .env.test.example .env.test
```

### Estructura Completa de Archivos

| Archivo | Ubicación | Propósito | Variables Principales |
|---------|-----------|-----------|----------------------|
| `.env` | `/Plataforma-inversion/` | Backend desarrollo local | DB local, JWT secrets, Cloudinary, Email |
| `.env.docker` | `/Plataforma-inversion/` | Docker Compose | DB containerizada, mismas APIs |
| `.env.local` | `/src/frontend/` | Next.js desarrollo | `NEXT_PUBLIC_API_URL=http://localhost:5000/api` |
| `.env.test` | `/src/frontend/` | Jest testing | `NEXT_PUBLIC_API_URL=http://localhost:5000/api` |

### Configuración Requerida

#### Backend (.env y .env.docker)
Ambos archivos contienen las mismas variables, pero con valores diferentes para el entorno:

**Variables críticas que DEBES actualizar:**
- `SECRET_KEY`: Clave secreta para Flask (genera una única)
- `JWT_SECRET_KEY`: Clave para firmar tokens JWT (diferente a SECRET_KEY)
- `DB_*`: Credenciales de tu base de datos PostgreSQL
- `CLOUDINARY_*`: Credenciales de tu cuenta Cloudinary para imágenes
- `MAIL_*`: Configuración SMTP para envío de emails

**Diferencias principales:**
- `.env`: `DB_HOST=localhost` (base de datos local)
- `.env.docker`: `DB_HOST=db` (contenedor Docker)

#### Frontend (.env.local y .env.test)
Ambos archivos son idénticos y solo contienen:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Verificación de la Configuración

Después de copiar y configurar los archivos:

```bash
# Verificar que existen los archivos del backend (desde la raíz)
ls -la .env .env.docker

# Verificar archivos del frontend
ls -la src/frontend/.env.local src/frontend/.env.test

# Verificar que las variables están cargadas (opcional)
cd src/backend && python -c "from app.config import Config; print('✅ Configuración cargada correctamente')"
```

### ⚠️ Importante

1. **Nunca commitees** los archivos `.env` reales al repositorio
2. **Genera claves únicas** para `SECRET_KEY` y `JWT_SECRET_KEY` en producción
3. **Las credenciales de ejemplo** deben ser reemplazadas por las reales
4. **Para producción** crea variables de entorno específicas del hosting

### Generar Claves Seguras (Opcional)

Para generar claves secretas seguras:

```python
# Ejecutar en terminal de Python
import secrets
print("SECRET_KEY:", secrets.token_urlsafe(32))
print("JWT_SECRET_KEY:", secrets.token_urlsafe(32))
```

## Instalación y Configuración

### Con Docker (recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/boost-a-project.git
cd boost-a-project

# Configurar variables de entorno (ver sección anterior)
cp .env.example .env
cp .env.docker.example .env.docker
cd src/frontend
cp .env.local.example .env.local
cp .env.test.example .env.test
cd ../..

# Iniciar servicios
docker-compose up --build
```

### Sin Docker

#### Backend

```bash
cd src/backend
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
python run.py
```

#### Frontend

```bash
cd src/frontend
npm install
npm run dev
```

## Testing

El proyecto cuenta con una arquitectura de testing robusta y profesional:

### Frontend (187 tests)

```bash
cd src/frontend
npm run test
```

**Características del testing frontend:**
- Tests organizados por funcionalidad
- Mocks reutilizables centralizados
- Cobertura completa de componentes UI
- Tests de integración para formularios
- Helper functions para reducir duplicación

### Backend (83 tests, 93% coverage)

```bash
cd src/backend
python -m pytest
```

### Ejecutar tests con cobertura

```bash
cd src/backend

# 1. Ejecuta los tests con coverage
coverage run -m pytest

# 2. Muestra el resumen en consola con líneas faltantes
coverage report -m

# 3. Genera un informe visual HTML en htmlcov/index.html
coverage html

# Abre el informe en el navegador (opcional)
start htmlcov/index.html  # Windows
open htmlcov/index.html   # macOS
```

## Comandos CLI

### Inicialización Completa (Recomendado)

```bash
# Inicializar todo el sistema (admin + artículos + proyectos)
cd src/backend
flask init-data
```

Este comando crea automáticamente:
- Usuario administrador (Alberto)
- Importa todos los artículos desde `articles.json`
- Importa todos los proyectos desde `projects/`

### Comandos Granulares

```bash
# Solo crear administrador
cd src/backend
flask create-admin

# Solo importar artículos
cd src/backend
flask data import-articles

# Solo importar proyectos
cd src/backend
flask data import-projects
```

### Scripts de Importación (Alternativos)

```bash
# Importar artículos manualmente
cd src/backend
python app/scripts/import_static_articles.py

# Importar proyectos manualmente
cd src/backend
python app/scripts/import_static_projects.py
```

Estos comandos importan los datos iniciales desde los archivos JSON sin duplicar contenido existente.

## Sistema de Importación de Proyectos

### Arquitectura Modular

El backend utiliza un sistema modular para la gestión de proyectos:

- **Directorio de proyectos:** `src/backend/app/data/projects/`
- **Archivos individuales:** Cada proyecto en su propio archivo `.json`
- **Importación inteligente:** Detecta proyectos existentes por `slug` y actualiza campos
- **Escalabilidad:** Compatible con múltiples proyectos sin conflictos

### Agregar Nuevo Proyecto

1. **Crear archivo JSON:**
   ```bash
   # Crear nuevo proyecto
   touch src/backend/app/data/projects/mi-nuevo-proyecto.json
   ```

2. **Estructura del archivo:**
   ```json
   {
     "title": "Mi Nuevo Proyecto",
     "slug": "mi-nuevo-proyecto",
     "description": "Descripción del proyecto...",
     "investment_goal": 500000,
     "location": "Madrid",
     "status": "Abierto"
   }
   ```

3. **Importar a la base de datos:**
   ```bash
   cd src/backend
   python app/scripts/import_static_projects.py
   ```

4. **Verificar importación:**
   ```bash
   # Verificar en la API
   curl http://localhost:5000/api/projects/mi-nuevo-proyecto
   ```

### Características del Importador

- **Actualización automática:** Si el proyecto existe, actualiza sus campos
- **Detección por slug:** Identifica proyectos existentes por `slug` único
- **Manejo de errores:** Reporta errores individuales sin interrumpir el proceso
- **Logging detallado:** Muestra qué archivos se cargaron y resultados
- **Compatibilidad:** Funciona con arrays y objetos individuales

## Funcionalidades destacadas

* ✅ Login con JWT en cookies + CSRF
* ✅ Recuperación de contraseña por email con ResetPasswordForm
* ✅ CRUD completo de artículos desde el panel admin
* ✅ **Sistema completo de gestión de proyectos de inversión**
* ✅ Editor HTML manual con slug automático y SEO
* ✅ Sistema de imágenes con Cloudinary y drag & drop
* ✅ Dashboard privado para usuarios registrados
* ✅ Gestión de estado global con Zustand
* ✅ Arquitectura de testing robusta (270 tests totales)
* ✅ Mocks reutilizables para testing eficiente
* ✅ Formularios unificados con validación profesional
* ✅ Formulario de contacto con envío de emails
* ✅ Protección de rutas por roles (admin/usuario)

## 🏗️ Sistema de Gestión de Proyectos

### Cómo funciona la subida de proyectos

La plataforma incluye un sistema completo para la gestión de proyectos de inversión inmobiliaria que permite a los administradores crear, editar y gestionar proyectos de manera eficiente.

## 🔒 Sistema FREEMIUM - Control de Contenido Premium

El sistema permite que cada proyecto decida cuántas secciones mostrar públicamente antes de requerir registro.

### Configuración por Proyecto

En el JSON de cada proyecto (`src/backend/app/data/projects/`), añadir el campo:
```json
{
  "slug": "nombre-proyecto",
  "title": "Título del Proyecto",
  "free_sections_count": 7,  ← Número de secciones visibles sin registro
  ...
}
```

### Valores Recomendados

- **3-5 secciones**: Proyectos con información muy sensible
- **7-8 secciones**: Balance entre información pública y premium (recomendado)
- **10+ secciones**: Proyectos educativos con mucho contenido público

### Ejemplo FiveRooms Venezuela

Con `"free_sections_count": 7`:
- ✅ **Secciones visibles** (1-7): Hero, ¿Qué es?, Coliving, Valladolid, Ubicación, Inversión, Escenarios de Rentabilidad
- 🔒 **Secciones premium** (8+): Análisis de Riesgos, Marco Legal, Estrategias de Salida, Proceso, FAQ

### Comportamiento por Defecto

Si no se especifica `free_sections_count`, el sistema usa **5 como valor por defecto**.

### Implementación Técnica

1. **Backend**: Campo en modelo Project + migración de BD
2. **Frontend**: Lee dinámicamente `project.free_sections_count`
3. **Componente**: `PremiumContentBlur` muestra banner horizontal para registrarse

#### Flujo de Subida de Proyectos

1. **Acceso Administrativo**
   - Solo usuarios con rol `is_admin = true` pueden crear proyectos
   - Autenticación JWT requerida para todas las operaciones CRUD

2. **Formulario de Proyecto**
   - **Campos obligatorios**: título, descripción, meta de inversión, ubicación, retorno esperado
   - **Campos opcionales**: tipo de inversión, superficie, habitaciones, baños, inversión mínima, retorno optimista, duración estimada
   - **Campos avanzados**: estructura financiera, proyección de rentabilidad, análisis de riesgos, descripción del equipo, enlace externo

3. **Gestión de Imágenes**
   - **Subida a Cloudinary**: Las imágenes se procesan y optimizan automáticamente
   - **Transformaciones**: Redimensionado a 1200px manteniendo proporción, optimización de calidad
   - **Galería**: Soporte para múltiples imágenes por proyecto
   - **URLs seguras**: Todas las imágenes se sirven con HTTPS

4. **Validación y Procesamiento**
   - **Validación con Marshmallow**: Esquemas `ProjectInputSchema` y `ProjectSchema`
   - **Slug automático**: Generado a partir del título (ej: "FiveRooms Venezuela" → "fiverooms-venezuela")
   - **Verificación de duplicados**: No se permiten proyectos con el mismo slug
   - **Campos JSON**: Estructura financiera, mitigaciones de riesgo y galería se almacenan como JSON

#### Estructura de Datos del Proyecto

```typescript
interface Project {
  // Campos básicos
  title: string;                    // Título del proyecto
  slug: string;                     // URL amigable (generado automáticamente)
  description: string;              // Descripción detallada
  image_url?: string;              // Imagen principal (Cloudinary)
  investment_goal: number;         // Meta de inversión en euros
  location: string;                // Ubicación del proyecto
  investment_type?: string;        // Tipo de inversión
  surface_m2?: number;            // Superficie en m²
  rooms?: number;                  // Número de habitaciones
  bathrooms?: number;              // Número de baños
  min_investment?: number;         // Inversión mínima
  expected_return: string;         // Retorno esperado (%)
  optimistic_return?: string;      // Retorno optimista (%)
  estimated_duration?: string;     // Duración estimada
  status: string;                  // Estado del proyecto (default: "Abierto")
  
  // Campos avanzados
  financial_structure?: object[];  // Estructura financiera (JSON)
  risk_mitigations?: string[];     // Mitigaciones de riesgo (JSON)
  gallery?: string[];              // Galería de imágenes (JSON)
  financial_structure_text?: string; // Texto de estructura financiera
  rentability_projection?: string;   // Proyección de rentabilidad
  risk_analysis?: string;            // Análisis de riesgos
  team_description?: string;         // Descripción del equipo
  external_link?: string;            // Enlace externo
  
  // Metadatos
  created_at: Date;
  updated_at: Date;
}
```

#### API Endpoints para Proyectos

```bash
# Obtener todos los proyectos (público)
GET /api/projects

# Obtener proyecto específico por slug (público)
GET /api/projects/{slug}

# Crear nuevo proyecto (solo admin)
POST /api/projects
Headers: Authorization: Bearer {jwt_token}
Body: ProjectInput

# Actualizar proyecto (solo admin)
PUT /api/projects/{slug}
Headers: Authorization: Bearer {jwt_token}
Body: Partial<ProjectInput>

# Eliminar proyecto (solo admin)
DELETE /api/projects/{slug}
Headers: Authorization: Bearer {jwt_token}
```

#### Componentes Frontend

- **`ProjectForm.tsx`**: Formulario completo con validación en tiempo real
- **`ProjectList.tsx`**: Lista de proyectos con filtros y paginación
- **`ProjectCard.tsx`**: Tarjeta individual de proyecto
- **`projectService.ts`**: Servicio para comunicación con la API
- **`project.ts`**: Tipos TypeScript para proyectos

#### Proyectos Iniciales

El sistema incluye un proyecto de ejemplo en `src/backend/app/data/projects/fiverooms-venezuela.json`:

```json
{
  "title": "FiveRooms Venezuela",
  "slug": "fiverooms-venezuela",
  "description": "Proyecto de inversión inmobiliaria...",
  "investment_goal": 110000,
  "location": "Valladolid, España",
  "investment_type": "Alquiler por habitaciones",
  "expected_return": "12%",
  "status": "Abierto"
}
```

#### Seguridad y Validación

- **Autenticación JWT**: Todas las operaciones de escritura requieren token válido
- **Autorización por roles**: Solo administradores pueden gestionar proyectos
- **Validación de datos**: Esquemas Marshmallow para validación robusta
- **Sanitización**: Los datos se limpian antes de almacenar
- **Rate limiting**: Protección contra abuso de la API

#### Testing

- **83 tests backend** con 93% de cobertura
- **Tests específicos para proyectos**: `test_projects_api.py`
- **Validación de esquemas**: Tests para `ProjectSchema` y `ProjectInputSchema`
- **Tests de autorización**: Verificación de permisos de administrador

## Arquitectura de Testing

### Frontend
- **React Testing Library** + Jest
- **Mocks centralizados** en `__mocks__/`
- **Helper functions** para reducir duplicación
- **Cobertura por categorías**: auth, admin, UI, shared
- **187 tests** organizados profesionalmente

### Backend
- **Pytest** con fixtures robustas
- **93% de cobertura** de código
- **83 tests** organizados por dominio
- **Tests de API, modelos, servicios y schemas**

## Referencias cruzadas

* El archivo `articles.json` se importa automáticamente al ejecutar el script `import_static_articles.py`. No se duplican artículos aunque se ejecute varias veces.

## Arquitectura y Decisiones Técnicas

* **JWT en cookies HttpOnly**: Mayor seguridad contra XSS
* **Zustand para estado global**: Reemplazó Context API por mejor performance
* **Editor HTML manual**: Reemplaza TipTap/Quill por solución más estable
* **fetchWithAuth**: Wrapper para renovación automática de tokens expirados
* **AdminLayout**: Separación completa de interfaces admin/usuario
* **Arquitectura de componentes**: Modular y reutilizable
* **Sistema SEO**: Metadata dinámica con Next.js App Router
* **Mocks reutilizables**: Arquitectura profesional de testing
* **Validaciones centralizadas**: Sistema unificado frontend-backend
* **Protección de rutas**: Componentes AdminPageContent y UserPageContent

## Despliegue

### Frontend

* Vercel (recomendado)
* Netlify
* AWS Amplify

### Backend

* Railway
* Render
* DigitalOcean App Platform
* VPS tradicional con Docker

## Contribución

```bash
# 1. Fork del repositorio
git checkout -b feature/nueva-funcionalidad

# 2. Commit de cambios
git commit -m 'Añadir nueva funcionalidad'

# 3. Push a la rama
git push origin feature/nueva-funcionalidad

# 4. Abrir Pull Request
```

## Licencia

MIT - Nelson Valero Barcelona
