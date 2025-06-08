#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Configurando todas las versiones de React con TypeScript${NC}"
echo "=================================================================="

cd versions || exit 1

# React 16 - Manual setup
echo -e "${YELLOW}🟦 Configurando React 16.8 + TypeScript...${NC}"
mkdir -p react-16 && cd react-16

cat > package.json << 'EOF'
{
  "name": "@react-lab/react-16",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port 3016 --host 0.0.0.0",
    "build": "tsc && vite build",
    "preview": "vite preview --port 3016"
  }
}
EOF

npm install react@16.8.6 react-dom@16.8.6
npm install -D typescript@5.2.2 @types/react@16.9.56 @types/react-dom@16.9.19
npm install -D vite@4 @vitejs/plugin-react@4.0.0

mkdir -p src public
# Crear archivos base...

cd ..

# React 17
echo -e "${YELLOW}🟩 Configurando React 17.0 + TypeScript...${NC}"
npm create vite@4 react-17 -- --template react-ts
cd react-17
npm uninstall react react-dom @types/react @types/react-dom
npm install react@17.0.2 react-dom@17.0.2
npm install -D @types/react@17.0.65 @types/react-dom@17.0.20
cd ..

# React 18
echo -e "${YELLOW}🟪 Configurando React 18.2 + TypeScript...${NC}"
npm create vite@5 react-18 -- --template react-ts
cd react-18
npm uninstall react react-dom @types/react @types/react-dom
npm install react@18.2.0 react-dom@18.2.0
npm install -D @types/react@18.2.79 @types/react-dom@18.2.25
cd ..

# React 19
echo -e "${YELLOW}🟥 Configurando React 19.1 + TypeScript...${NC}"
npm create vite@6 react-19 -- --template react-swc-ts
cd react-19
npm uninstall react react-dom @types/react @types/react-dom
npm install react@19.1.0 react-dom@19.1.0
npm install -D @types/react@19.1.2 @types/react-dom@19.1.2
cd ..

echo -e "${GREEN}✅ Todas las versiones configuradas${NC}"