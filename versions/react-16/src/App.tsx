// src/App.tsx
import React from 'react' // ← OBLIGATORIO en React 16
import { useState } from 'react'
import './index.css'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <header className="app-header">
        <h1>🟦 Hola React 16</h1>
        <p>Este es React 16.8 - La era de los Hooks</p>
        
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Count is {count}
          </button>
          <p>
            Edita <code>src/App.tsx</code> y guarda para probar HMR
          </p>
        </div>
        
        <div className="info">
          <h3>✨ Características de React 16:</h3>
          <ul>
            <li>✅ Hooks (useState, useEffect, etc.)</li>
            <li>✅ Requiere import React explícito</li>
            <li>✅ ReactDOM.render</li>
            <li>❌ No Concurrent Features</li>
            <li>❌ No Suspense para data fetching</li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default App