// src/main.tsx
import React from 'react' // ← OBLIGATORIO en React 16
import ReactDOM from 'react-dom'
import App from './App'
// React 16 usa ReactDOM.render (NO createRoot)
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)