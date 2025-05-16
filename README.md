# KAIS Frontend Template

Un template moderno para aplicaciones administrativas de KAIS, construido con las últimas tecnologías frontend.

## Tecnologías

- ⚡️ [React 19](https://react.dev/)
- 🔥 [Vite](https://vitejs.dev/) - Herramienta de compilación ultra-rápida
- 🎨 [TailwindCSS 4](https://tailwindcss.com/) - Framework de utilidades CSS
- 🧩 [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- 🧰 [shadcn/ui](https://ui.shadcn.com/) - Componentes UI accesibles y personalizables
- 🪝 [React Hook Form](https://react-hook-form.com/) - Manejo de formularios con hooks
- 📝 [Zod](https://zod.dev/) - Validación de esquemas
- 🔄 [Zustand](https://zustand-demo.pmnd.rs/) - Gestión de estado
- 🌐 [Axios](https://axios-http.com/) - Cliente HTTP
- ⚙️ [ESLint](https://eslint.org/) - Linter para JavaScript/TypeScript
- 📱 [Responsive Design] - Diseño adaptable a móvil y escritorio

## Características principales

- 🔒 Sistema de autenticación pre-configurado
- 🧩 Componentes UI reutilizables basados en shadcn/ui
- 📚 Estructura de carpetas organizada y escalable
- 🌗 Soporte para tema claro y oscuro
- 🚀 Optimizado para rendimiento

## Requisitos previos

- Node.js (versión 18.x o superior)
- pnpm (recomendado) o npm

## Instalación

1. Clona este repositorio

   ```bash
   git clone https://github.com/tu-usuario/basic-kais-frontend-template.git
   cd basic-kais-frontend-template
   ```

2. Instala las dependencias

   ```bash
   pnpm install
   # O si prefieres npm
   # npm install
   ```

3. Inicia el servidor de desarrollo

   ```bash
   pnpm dev
   # O
   # npm run dev
   ```

4. Abre tu navegador en `http://localhost:5173`

## Scripts disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Compila la aplicación para producción
- `pnpm preview` - Previsualiza la versión compilada
- `pnpm lint` - Ejecuta el linter para verificar errores

## Estructura del proyecto

```
src/
├── assets/           # Recursos estáticos (imágenes, fuentes)
├── components/       # Componentes reutilizables
│   └── ui/           # Componentes de interfaz de usuario
├── config/           # Configuraciones de la aplicación
├── features/         # Características organizadas por dominio
│   └── auth/         # Funcionalidad de autenticación
├── hooks/            # Hooks personalizados
├── layouts/          # Componentes de layout
├── lib/              # Utilidades y helpers
├── stores/           # Almacenes de estado global
└── types/            # Definiciones de tipos
```

## Personalización

### Autenticación

> **⚠️ Importante:**
> El método de login actual es solo un mock. Debes implementar la integración real con tu servicio de autenticación.

El método `login` se encuentra en `src/features/auth/auth.service.ts` y debe ser reemplazado con la implementación real:

```typescript
// Reemplaza esta función con tu implementación real de autenticación
export const login = async (credentials: LoginSchema) => {
  // Implementa aquí la lógica real de autenticación
  // Por ejemplo: return api.post('/auth/login', credentials)
};
```

### UI/UX

- La configuración de temas se encuentra en `src/index.css`
- Los componentes UI están basados en [shadcn/ui](https://ui.shadcn.com/) y son altamente personalizables

## Despliegue

Para compilar la aplicación para producción:

```bash
pnpm build
```

Los archivos generados se encontrarán en el directorio `dist/`.

## Convertir a aplicación de escritorio (opcional)

Este template puede ser adaptado para funcionar con [Tauri](https://tauri.app/) y crear aplicaciones de escritorio multiplataforma:

1. Instala Tauri CLI:

   ```bash
   pnpm add -D @tauri-apps/cli
   ```

2. Inicializa Tauri en el proyecto:

   ```bash
   pnpm tauri init
   ```

3. Sigue las instrucciones de configuración específicas de Tauri para completar la integración.

4. Para desarrollo:

   ```bash
   pnpm tauri dev
   ```

5. Para compilar la aplicación de escritorio:
   ```bash
   pnpm tauri build
   ```

## Licencia

Propiedad de KAIS - Todos los derechos reservados.
