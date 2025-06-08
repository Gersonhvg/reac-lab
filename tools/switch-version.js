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