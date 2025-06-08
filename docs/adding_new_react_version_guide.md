# 🚀 Agregar Nueva Versión de React al Lab

> **Guía paso a paso para integrar nuevas versiones de React (ej: React 20+) al proyecto React Lab**

## 📋 **Antes de Comenzar**

### **1. Verificar Información de la Nueva Versión**

```bash
# Verificar que la versión esté disponible
npm view react versions --json | grep "20\."

# Revisar changelog oficial
# https://github.com/facebook/react/releases
# https://react.dev/blog

# Verificar compatibilidad con herramientas
npm view @vitejs/plugin-react-swc versions --json
npm view typescript versions --json
```

### **2. Documentar Características Principales**

Crear lista de:
- ✅ **Nuevas características** principales
- ⚠️ **Breaking changes** importantes  
- 🔧 **Herramientas** y dependencias requeridas
- 📚 **APIs** nuevas o modificadas
- 🏗️ **Build system** cambios

## 🎯 **Proceso de Integración**

### **Paso 1: Preparación del Entorno**

```bash
# 1. Ir al directorio versions
cd versions/

# 2. Crear directorio para nueva versión
mkdir react-20

# 3. Crear estructura básica
mkdir -p react-20/{src,public}
mkdir -p react-20/src/{components,pages,exercises}
```

### **Paso 2: Configuración Inicial**

#### **2.1. Crear package.json**

```bash
cd react-20
```

```json
{
  "name": "@react-lab/react-20",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "description": "React 20.x - [NOMBRE_DE_LA_ERA] Lab",
  "scripts": {
    "dev": "vite --port 3020 --host 0.0.0.0",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview --port 3020 --host 0.0.0.0",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "react": "^20.0.0",
    "react-dom": "^20.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.25.0",
    "@types/react": "^20.0.0",
    "@types/react-dom": "^20.0.0",
    "@vitejs/plugin-react-swc": "^4.0.0",
    "eslint": "^9.25.0",
    "eslint-plugin-react-hooks": "^5.2.0",
    "eslint-plugin-react-refresh": "^0.4.19",
    "globals": "^16.0.0",
    "typescript": "^5.9.0",
    "typescript-eslint": "^8.30.1",
    "vite": "^7.0.0"
  }
}
```

#### **2.2. Configurar Vite**

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [
    react({
      // Configuraciones específicas para React 20
      jsxRuntime: 'automatic',
      fastRefresh: true,
      // Nuevas configuraciones si las hay
    })
  ],
  server: {
    port: 3020,
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@shared': '../../shared',
      '@': './src'
    }
  },
  build: {
    target: 'esnext',
  },
  experimental: {
    // Nuevas características experimentales de React 20
  },
  // Configuraciones específicas para React 20
  define: {
    __REACT_VERSION__: '"20.0.0"'
  }
})
```

#### **2.3. Configurar TypeScript**

```json
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

```json
// tsconfig.app.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2023", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}
```

```json
// tsconfig.node.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}
```

### **Paso 3: Archivos Base de la Aplicación**

#### **3.1. public/index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React 20 Lab</title>
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

#### **3.2. src/main.tsx**

```typescript
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Usar API más reciente si hay cambios
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

#### **3.3. src/App.tsx**

```typescript
// src/App.tsx
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🔥 Hola React 20</h1>
        <p>¡Bienvenido a React 20.x - [NUEVA_ERA_NAME]!</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count: {count}
          </button>
          <p>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </p>
        </div>
        
        <div className="features">
          <h3>✨ Nuevas características de React 20:</h3>
          <ul>
            <li>🚀 [NUEVA_CARACTERISTICA_1]</li>
            <li>⚡ [NUEVA_CARACTERISTICA_2]</li>
            <li>🎯 [NUEVA_CARACTERISTICA_3]</li>
            <li>📋 [NUEVA_CARACTERISTICA_4]</li>
            <li>🔄 [NUEVA_CARACTERISTICA_5]</li>
            <li>🧠 [NUEVA_CARACTERISTICA_6]</li>
          </ul>
        </div>

        <div className="version-info">
          <p><strong>Versión:</strong> React 20.x</p>
          <p><strong>Build Tool:</strong> Vite + SWC</p>
          <p><strong>Puerto:</strong> 3020</p>
        </div>
      </header>
    </div>
  )
}

export default App
```

#### **3.4. Estilos Base**

```css
/* src/index.css */
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;
  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

/* Resto de estilos base... */
```

```css
/* src/App.css */
.app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  font-size: 3.2em;
  background: linear-gradient(45deg, #ff6b35, #f7931e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Estilos específicos para React 20... */
```

### **Paso 4: Actualizar Configuraciones Globales**

#### **4.1. Actualizar package.json Root**

```json
// En el package.json root, agregar:
{
  "workspaces": [
    "versions/react-16",
    "versions/react-17", 
    "versions/react-18",
    "versions/react-19",
    "versions/react-20"  // ← NUEVO
  ],
  "scripts": {
    // Agregar nuevo script
    "dev:20": "cd versions/react-20 && npm run dev",
    // El resto se mantiene igual...
  }
}
```

#### **4.2. Actualizar scripts/install-all.sh**

```bash
# En scripts/install-all.sh, agregar:

# Instalar cada versión
install_version "16"
install_version "17"
install_version "18"
install_version "19"
install_version "20"  # ← NUEVO
```

#### **4.3. Actualizar scripts/clean-all.sh**

```bash
# En scripts/clean-all.sh, agregar:

# Limpiar cada versión
for version in 16 17 18 19 20; do  # ← Agregar 20
    # resto del código...
done
```

#### **4.4. Actualizar scripts/build-all.sh**

```bash
# En scripts/build-all.sh, agregar:

# Build cada versión
build_version "16"
build_version "17"
build_version "18"
build_version "19"
build_version "20"  # ← NUEVO
```

### **Paso 5: Actualizar Selector de Versiones**

#### **5.1. Actualizar tools/switch-version.js**

```javascript
// En tools/switch-version.js, agregar nueva versión:

const versions = [
  {
    name: '🟦 React 16.8 - Hooks Foundation',
    value: '16',
    port: 3016,
    description: 'Class Components → Hooks transition'
  },
  {
    name: '🟩 React 17.0 - JSX Transform Era', 
    value: '17',
    port: 3017,
    description: 'New JSX Transform, Event Delegation'
  },
  {
    name: '🟪 React 18.3 - Concurrent Features',
    value: '18', 
    port: 3018,
    description: 'Suspense, Transitions, Automatic Batching'
  },
  {
    name: '🟥 React 19.1 - Server Components',
    value: '19',
    port: 3019,
    description: 'Server Components, Actions, Latest Features'
  },
  {
    name: '🔥 React 20.0 - [NUEVA_ERA]',  // ← NUEVO
    value: '20',
    port: 3020,
    description: '[DESCRIPCION_CARACTERISTICAS_PRINCIPALES]'
  }
]
```

### **Paso 6: Actualizar Docker (Opcional)**

#### **6.1. Actualizar docker-compose.yml**

```yaml
# Agregar nuevo service:
services:
  # ... servicios existentes

  react-20:
    build:
      context: ./versions/react-20
      dockerfile: ../../docker/Dockerfile.react
      args:
        - NODE_VERSION=20
        - REACT_VERSION=20.0.0
    ports:
      - "3020:3020"
    volumes:
      - ./versions/react-20/src:/app/src
      - ./shared:/app/shared
    environment:
      - REACT_VERSION=20.0.0
      - VITE_PORT=3020
```

### **Paso 7: Instalación y Testing**

```bash
# 1. Instalar dependencias de la nueva versión
cd versions/react-20
npm install

# 2. Probar que arranca correctamente
npm run dev

# 3. Verificar en navegador
# http://localhost:3020

# 4. Probar desde el selector global
cd ../../
npm run dev
# Seleccionar React 20

# 5. Verificar que build funciona
cd versions/react-20
npm run build
```

### **Paso 8: Documentación**

#### **8.1. Actualizar README.md**

```markdown
# En README.md, actualizar tabla:

| Versión | Puerto | Características Principales |
|---------|--------|---------------------------|
| **React 16.8** | 3016 | Hooks Foundation, Class Components |
| **React 17.0** | 3017 | JSX Transform, Event Delegation |
| **React 18.3** | 3018 | Concurrent Features, Suspense |
| **React 19.1** | 3019 | Server Components, Actions |
| **React 20.0** | 3020 | [NUEVAS_CARACTERISTICAS] |  ← NUEVO
```

#### **8.2. Crear docs/react-20-features.md**

```markdown
# React 20 - Nuevas Características

## 🎯 **Características Principales**

### **1. [CARACTERISTICA_PRINCIPAL_1]**
- Descripción
- Ejemplo de uso
- Diferencias con versiones anteriores

### **2. [CARACTERISTICA_PRINCIPAL_2]**
- Descripción
- Ejemplo de uso
- Migration path desde React 19

## 🔄 **Breaking Changes**

### **APIs Deprecadas:**
- `[API_DEPRECADA_1]` → usar `[API_NUEVA_1]`
- `[API_DEPRECADA_2]` → usar `[API_NUEVA_2]`

### **Cambios de Comportamiento:**
- [CAMBIO_1]
- [CAMBIO_2]

## 📚 **Recursos Adicionales**
- [React 20 Blog Post](link)
- [Migration Guide](link)
- [Breaking Changes](link)
```

### **Paso 9: Crear Ejercicios Específicos**

```bash
# Crear estructura de ejercicios
mkdir -p versions/react-20/src/exercises/{01-nueva-caracteristica,02-migration-guide,03-performance}

# Ejemplo de ejercicio
touch versions/react-20/src/exercises/01-nueva-caracteristica/README.md
touch versions/react-20/src/exercises/01-nueva-caracteristica/Exercise.tsx
```

### **Paso 10: Verificación Final**

#### **10.1. Checklist de Verificación**

```bash
# ✅ Verificar que todos los comandos funcionan
npm run dev:20           # React 20 directo
npm run dev              # Selector incluye React 20
npm run install:all      # Instala React 20
npm run build:all        # Build incluye React 20
npm run clean:all        # Limpia React 20

# ✅ Verificar URLs
# http://localhost:3020 - React 20 funciona

# ✅ Verificar hot reload
# Cambiar código y ver que se actualiza instantáneamente

# ✅ Verificar build
cd versions/react-20
npm run build
ls dist/  # Debe tener archivos generados
```

## 🚨 **Consideraciones Especiales**

### **Nuevas APIs o Breaking Changes Mayores**

Si React 20 introduce cambios significativos:

#### **1. APIs Completamente Nuevas**
```typescript
// Ejemplo: Si hay nueva API de rendering
// src/main.tsx podría cambiar a:
import { createApplication } from 'react-dom/client'  // Hipotético
// En lugar de createRoot
```

#### **2. Nuevos Patterns de Desarrollo**
```typescript
// Ejemplo: Nuevos hooks o patterns
import { useNewReactFeature } from 'react'

function NewFeatureExample() {
  const newFeature = useNewReactFeature()
  // Implementación específica de React 20
}
```

#### **3. Build System Changes**
```typescript
// vite.config.ts - Configuraciones específicas
export default defineConfig({
  plugins: [
    react({
      // Nuevas configuraciones específicas de React 20
      experimental: {
        newFeature: true
      }
    })
  ],
  // Nuevas optimizaciones
  optimizeDeps: {
    include: ['react-20-specific-package']
  }
})
```

### **Troubleshooting Común**

#### **Error de Dependencias:**
```bash
# Si hay conflictos de dependencias
rm -rf node_modules package-lock.json
npm install
```

#### **Error de Tipos TypeScript:**
```bash
# Actualizar tipos si son incompatibles
npm install -D @types/react@latest @types/react-dom@latest
```

#### **Error de Plugin Vite:**
```bash
# Si plugin no es compatible
npm install -D @vitejs/plugin-react-swc@latest
# O usar plugin alternativo
npm install -D @vitejs/plugin-react@latest
```

## 📅 **Cronograma Típico de Integración**

| Día | Actividad | Tiempo Estimado |
|-----|-----------|----------------|
| **1** | Investigación + Setup inicial | 2-3 horas |
| **2** | Configuración + App básica | 2-3 horas |
| **3** | Integración con scripts globales | 1-2 horas |
| **4** | Testing + Documentación | 1-2 horas |
| **5** | Ejercicios específicos | 3-4 horas |

## 🎯 **Resultado Final**

Después de seguir esta guía, tendrás:

- ✅ React 20 integrado completamente
- ✅ Selector de versiones actualizado
- ✅ Scripts de gestión funcionando
- ✅ Documentación actualizada
- ✅ Estructura lista para ejercicios
- ✅ Compatibilidad con el resto del proyecto

## 📚 **Recursos Útiles**

- [React Releases](https://github.com/facebook/react/releases)
- [React Blog](https://react.dev/blog)
- [Vite React Plugin](https://github.com/vitejs/vite-plugin-react)
- [TypeScript React](https://react-typescript-cheatsheet.netlify.app/)

---

> **💡 Tip:** Siempre probar en una rama separada antes de mergear a main, especialmente si React 20 introduce breaking changes significativos.
