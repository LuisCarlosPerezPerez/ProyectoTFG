import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './componentes/navbar/navbar';

function App() {

return (
  <div className="App">
      {/* 1. El Navbar es el jefe: él contiene los enlaces y el botón de Fichar */}
      <Navbar />

      {/* 2. El contenido de la página */}
      <main style={mainStyles}>
        <section style={heroSection}>
          <h1></h1>
          <p></p>
        </section>
        
        {/* Aquí es donde irían tus rutas en el futuro (Inicio, Productos, etc.) */}
        <div style={{ marginTop: '50px' }}>
           <p></p>
        </div>
      </main>
    </div>
  );
}


const mainStyles: React.CSSProperties = {
  paddingTop: '80px', 
  textAlign: 'center',
  fontFamily: 'Arial, sans-serif'
};

const heroSection: React.CSSProperties = {
  backgroundColor: '#fdf0d5',
  padding: '50px',
  borderRadius: '20px',
  margin: '20px auto',
  maxWidth: '800px'
};

export default App
