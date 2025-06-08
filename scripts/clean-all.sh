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