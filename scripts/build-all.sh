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