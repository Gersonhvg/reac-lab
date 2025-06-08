import React from 'react'
import './components/MiBoton'
import MiBoton from './components/MiBoton'

const Home = () => {
  return (
    <>
        <div>Home component</div>
        <MiBoton texto='Enviamos propiedades desde home.txs' texto2='prueba'/>
        <p>
          End of the Home component.    
        </p>
    </>
  )
}

export default Home