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