# ⚛️ React Lab - Documentación Completa de Instalación y Uso

## 📁 **Estructura Completa del Proyecto**

```
react-lab/
├── versions/                          # ✅ 4 versiones
│   ├── react-16/                     # React 16.8.6 + TypeScript
│   ├── react-17/                     # React 17.0.2 + TypeScript  
│   ├── react-18/                     # React 18.3.1 + TypeScript
│   └── react-19/                     # React 19.1.0 + TypeScript + SWC
├── shared/                           # 📦 Código compartido
├── tools/                            # 🛠️ Herramientas de gestión
├── scripts/                          # 📜 Scripts de automatización
├── docs/                             # 📚 Documentación
├── docker-compose.yml               # 🐳 Orquestación Docker
├── package.json                     # 🏠 Package root
├── README.md                        # 📖 Documentación principal
└── .gitignore                       # 🚫 Archivos ignorados
```

## 🚀 **Instalación Inicial**

### **Prerrequisitos (WSL2 Ubuntu 24.04)**

```bash
# 1. Verificar Node.js 18+
node --version  # Debe mostrar v18.x.x o superior
npm --version   # Debe mostrar 9.x.x o superior

# 2. Si no tienes Node.js 18+, instalar:
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Verificar Git
git --version
```

### **Configuración Inicial del Proyecto**

```bash
# 1. Clonar o crear el proyecto
git clone <tu-repositorio> react-lab
cd react-lab

# 2. Crear estructura de carpetas adicionales
mkdir -p shared/{components,styles,utils,data}
mkdir -p tools scripts docs

# 3. Crear package.json root
```

## 📦 **package.json Root - Archivo de Gestión Principal**

```json
{
  "name": "react-lab",
  "version": "1.0.0",
  "description": "Multi-version React learning environment",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  },
  "workspaces": [
    "versions/react-16",
    "versions/react-17", 
    "versions/react-18",
    "versions/react-19"
  ],
  "scripts": {
    "setup": "./scripts/setup-project.sh",
    "install:all": "./scripts/install-all.sh",
    "clean:all": "./scripts/clean-all.sh",
    "dev": "node tools/switch-version.js",
    "dev:16": "cd versions/react-16 && npm run dev",
    "dev:17": "cd versions/react-17 && npm run dev", 
    "dev:18": "cd versions/react-18 && npm run dev",
    "dev:19": "cd versions/react-19 && npm run dev",
    "build:all": "./scripts/build-all.sh",
    "switch": "node tools/switch-version.js",
    "docker:up": "docker-compose up",
    "docker:build": "docker-compose build",
    "docs:serve": "cd docs && python3 -m http.server 8080"
  },
  "devDependencies": {
    "inquirer": "^9.2.0",
    "chalk": "^5.3.0",
    "cross-spawn": "^7.0.3"
  },
  "keywords": ["react", "learning", "multi-version", "typescript", "vite"],
  "author": "Tu Nombre",
  "license": "MIT"
}
```

## 📜 **Scripts de Automatización**

### **scripts/install-all.sh - Instalar Todas las Versiones**

```bash
#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}📦 React Lab - Instalación de Todas las Versiones${NC}"
echo "=============================================================="

# Verificar Node.js
NODE_VERSION=$(node --version 2>/dev/null | cut -d'v' -f2)
if [ -z "$NODE_VERSION" ]; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi

MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)
if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Se requiere Node.js 18+. Versión actual: $NODE_VERSION${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $NODE_VERSION${NC}"

# Instalar dependencias del root
echo -e "${YELLOW}📦 Instalando dependencias globales...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error instalando dependencias globales${NC}"
    exit 1
fi

# Función para instalar version específica
install_version() {
    local version=$1
    local react_dir="versions/react-$version"
    
    if [ -d "$react_dir" ]; then
        echo -e "${YELLOW}📦 Instalando React $version...${NC}"
        cd "$react_dir"
        
        if [ -f "package.json" ]; then
            # Limpiar si hay problemas previos
            rm -rf node_modules package-lock.json
            
            # Instalar
            npm install
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ React $version instalado correctamente${NC}"
            else
                echo -e "${RED}❌ Error instalando React $version${NC}"
                cd "../.."
                exit 1
            fi
        else
            echo -e "${RED}❌ package.json no encontrado en $react_dir${NC}"
        fi
        
        cd "../.."
    else
        echo -e "${RED}❌ Directorio $react_dir no existe${NC}"
    fi
}

# Instalar cada versión
install_version "16"
install_version "17"
install_version "18"
install_version "19"

echo ""
echo -e "${GREEN}✅ Todas las dependencias instaladas correctamente${NC}"
echo ""
echo -e "${BLUE}🚀 Comandos disponibles:${NC}"
echo "npm run dev              # Selector interactivo"
echo "npm run dev:16           # React 16.8 (puerto 3016)"
echo "npm run dev:17           # React 17.0 (puerto 3017)" 
echo "npm run dev:18           # React 18.3 (puerto 3018)"
echo "npm run dev:19           # React 19.1 (puerto 3019)"
echo ""
echo -e "${YELLOW}💡 Para empezar: npm run dev${NC}"
```

### **scripts/clean-all.sh - Limpiar Todas las Versiones**

```bash
#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🧹 React Lab - Limpieza Completa${NC}"
echo "===================================="

# Limpiar root
echo -e "${YELLOW}🗑️ Limpiando dependencias globales...${NC}"
rm -rf node_modules package-lock.json

# Limpiar cada versión
for version in 16 17 18 19; do
    REACT_DIR="versions/react-$version"
    
    if [ -d "$REACT_DIR" ]; then
        echo -e "${YELLOW}🗑️ Limpiando React $version...${NC}"
        cd "$REACT_DIR"
        rm -rf node_modules package-lock.json dist .vite
        cd "../.."
        echo -e "${GREEN}✅ React $version limpiado${NC}"
    fi
done

# Limpiar caché npm
echo -e "${YELLOW}🗑️ Limpiando caché npm...${NC}"
npm cache clean --force

echo ""
echo -e "${GREEN}✅ Limpieza completa terminada${NC}"
echo -e "${YELLOW}💡 Para reinstalar: npm run install:all${NC}"
```

### **scripts/build-all.sh - Build Todas las Versiones**

```bash
#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🏗️ React Lab - Build de Todas las Versiones${NC}"
echo "=============================================="

build_version() {
    local version=$1
    local react_dir="versions/react-$version"
    
    if [ -d "$react_dir" ]; then
        echo -e "${YELLOW}🏗️ Building React $version...${NC}"
        cd "$react_dir"
        
        if [ -f "package.json" ]; then
            npm run build
            if [ $? -eq 0 ]; then
                echo -e "${GREEN}✅ React $version build exitoso${NC}"
            else
                echo -e "${RED}❌ Error en build de React $version${NC}"
                cd "../.."
                exit 1
            fi
        fi
        
        cd "../.."
    fi
}

# Build cada versión
build_version "16"
build_version "17"
build_version "18"
build_version "19"

echo ""
echo -e "${GREEN}✅ Todos los builds completados${NC}"
echo ""
echo -e "${BLUE}📁 Archivos de distribución en:${NC}"
echo "versions/react-16/dist/"
echo "versions/react-17/dist/"
echo "versions/react-18/dist/"
echo "versions/react-19/dist/"
```

## 🛠️ **Herramientas de Gestión**

### **tools/switch-version.js - Selector Interactivo**

```javascript
#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import { spawn } from 'cross-spawn'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { existsSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = join(__dirname, '..')

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
  }
]

async function switchVersion() {
  console.log(chalk.blue.bold('\n⚛️  React Lab - Version Selector\n'))
  
  // Verificar versiones disponibles
  const availableVersions = versions.filter(version => {
    const versionPath = join(rootDir, 'versions', `react-${version.value}`)
    const packagePath = join(versionPath, 'package.json')
    return existsSync(versionPath) && existsSync(packagePath)
  })
  
  if (availableVersions.length === 0) {
    console.log(chalk.red('❌ No se encontraron versiones instaladas'))
    console.log(chalk.yellow('💡 Ejecuta: npm run install:all'))
    process.exit(1)
  }
  
  const choices = availableVersions.map(version => ({
    name: `${version.name}\n   ${chalk.gray(version.description)}`,
    value: version.value,
    short: version.name
  }))
  
  try {
    const { version } = await inquirer.prompt([
      {
        type: 'list',
        name: 'version',
        message: 'Selecciona la versión de React:',
        choices: choices,
        pageSize: 10
      }
    ])
    
    const selectedVersion = versions.find(v => v.value === version)
    
    console.log(chalk.green(`\n🚀 Iniciando React ${version}...`))
    console.log(chalk.blue(`🌐 URL: http://localhost:${selectedVersion.port}`))
    console.log(chalk.gray('📝 Presiona Ctrl+C para detener\n'))
    
    const versionPath = join(rootDir, 'versions', `react-${version}`)
    
    const child = spawn('npm', ['run', 'dev'], {
      cwd: versionPath,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    })
    
    child.on('error', (error) => {
      console.error(chalk.red('❌ Error ejecutando el comando:'), error)
      process.exit(1)
    })
    
  } catch (error) {
    if (error.isTtyError) {
      console.log(chalk.red('❌ Terminal no interactivo detectado'))
      console.log(chalk.yellow('💡 Usa: npm run dev:19 (para React 19)'))
    } else {
      console.error(chalk.red('❌ Error:'), error)
    }
    process.exit(1)
  }
}

switchVersion()
```


## 📖 **Comandos Principales**

```bash
# Gestión
npm run install:all     # Instalar todas las versiones
npm run clean:all       # Limpiar todas las versiones
npm run build:all       # Build todas las versiones

# Desarrollo
npm run dev             # Selector interactivo
npm run dev:16          # React 16 directo
npm run dev:17          # React 17 directo
npm run dev:18          # React 18 directo
npm run dev:19          # React 19 directo

# Docker
npm run docker:up       # Todas las versiones en paralelo
npm run docker:build    # Build contenedores Docker
```

## 🌐 **URLs de Acceso**

- **React 16:** http://localhost:3016
- **React 17:** http://localhost:3017
- **React 18:** http://localhost:3018
- **React 19:** http://localhost:3019
- **Dashboard:** http://localhost:3000 (con Docker)

## 🛠️ **Tecnologías**

- **React:** 16.8.6, 17.0.2, 18.3.1, 19.1.0
- **TypeScript:** 5.x
- **Build Tool:** Vite + SWC (React 19), Vite + Babel (React 16-18)
- **Containerización:** Docker + Docker Compose
- **SO:** WSL2 Ubuntu 24.04

## 📁 **Estructura**

```
react-lab/
├── versions/           # 4 proyectos React independientes
├── shared/            # Código compartido
├── tools/             # Herramientas de gestión
├── scripts/           # Scripts de automatización
├── docs/              # Documentación
└── docker-compose.yml # Orquestación Docker
```

## 🔧 **Solución de Problemas**

### **Error de instalación:**
```bash
npm run clean:all
npm run install:all
```

### **Error de puertos:**
```bash
# Verificar puertos en uso
netstat -tulpn | grep :301

# Cambiar puerto en vite.config.ts de la versión específica
```

### **Error de permisos:**
```bash
sudo chown -R $USER:$USER .
```

## 📚 **Documentación Adicional**

- [Guía de Instalación](docs/installation-guide.md)
- [Diferencias entre Versiones](docs/version-differences.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Exercises](docs/exercises/)

## 🤝 **Contribución**

1. Fork el proyecto
2. Crear branch de feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit cambios (`git commit -m 'Agregar nueva característica'`)
4. Push al branch (`git push origin feature/nueva-caracteristica`)
5. Crear Pull Request

## 📄 **Licencia**

Este proyecto está bajo la Licencia MIT - ver [LICENSE](LICENSE) para detalles.


## 🐳 **Docker Configuration (Opcional)**

### **docker-compose.yml**
```yaml
version: '3.8'

services:
  react-16:
    build:
      context: ./versions/react-16
      dockerfile: ../../docker/Dockerfile.react
      args:
        - NODE_VERSION=18
        - REACT_VERSION=16.8.6
    ports:
      - "3016:3016"
    volumes:
      - ./versions/react-16/src:/app/src
      - ./shared:/app/shared
    environment:
      - REACT_VERSION=16.8.6
      - VITE_PORT=3016

  react-17:
    build:
      context: ./versions/react-17
      dockerfile: ../../docker/Dockerfile.react
      args:
        - NODE_VERSION=18
        - REACT_VERSION=17.0.2
    ports:
      - "3017:3017"
    volumes:
      - ./versions/react-17/src:/app/src
      - ./shared:/app/shared
    environment:
      - REACT_VERSION=17.0.2
      - VITE_PORT=3017

  react-18:
    build:
      context: ./versions/react-18
      dockerfile: ../../docker/Dockerfile.react
      args:
        - NODE_VERSION=18
        - REACT_VERSION=18.3.1
    ports:
      - "3018:3018"
    volumes:
      - ./versions/react-18/src:/app/src
      - ./shared:/app/shared
    environment:
      - REACT_VERSION=18.3.1
      - VITE_PORT=3018

  react-19:
    build:
      context: ./versions/react-19
      dockerfile: ../../docker/Dockerfile.react
      args:
        - NODE_VERSION=20
        - REACT_VERSION=19.1.0
    ports:
      - "3019:3019"
    volumes:
      - ./versions/react-19/src:/app/src
      - ./shared:/app/shared
    environment:
      - REACT_VERSION=19.1.0
      - VITE_PORT=3019

  dashboard:
    image: nginx:alpine
    ports:
      - "3000:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./docs:/usr/share/nginx/html
    depends_on:
      - react-16
      - react-17
      - react-18
      - react-19
```

## ✅ **Lista de Verificación Final**

### **Archivos a crear:**

```bash
# 1. Root files
touch package.json README.md .gitignore

# 2. Scripts (hacer ejecutables)
chmod +x scripts/install-all.sh
chmod +x scripts/clean-all.sh
chmod +x scripts/build-all.sh

# 3. Tools
touch tools/switch-version.js

# 4. Documentación
mkdir -p docs
touch docs/installation-guide.md
touch docs/version-differences.md
touch docs/troubleshooting.md

# 5. Shared (código compartido)
mkdir -p shared/{components,styles,utils,data}
touch shared/README.md
```

### **Comandos de verificación:**

```bash
# Verificar estructura
tree -L 3

# Verificar que npm funciona
npm run install:all

# Verificar que cada versión arranca
npm run dev:16  # Ctrl+C para salir
npm run dev:17  # Ctrl+C para salir
npm run dev:18  # Ctrl+C para salir
npm run dev:19  # Ctrl+C para salir

# Verificar selector interactivo
npm run dev
```

## 🎯 **Próximos Pasos**

1. ✅ Crear todos los archivos de configuración
2. ✅ Ejecutar `npm run install:all`
3. ✅ Probar `npm run dev` (selector)
4. ✅ Verificar que cada versión funciona
5. 📚 Crear ejercicios específicos por versión
6. 🔄 Implementar sistema de comparación
7. 📊 Agregar tracking de progreso