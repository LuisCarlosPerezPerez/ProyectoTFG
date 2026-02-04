import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './componentes/navbar/navbar';
import ProductosPage from './paginas/paginasProductos';
import IngredientesPage from './paginas/paginasIngredientes';
import RecetasPage from './paginas/recetas'; 

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#fdfaf5', minHeight: '100vh' }}>
        {/* El Navbar ya no necesita props de estado */}
        <Navbar /> 

        <main style={{ marginTop: '70px' }}>
          <Routes>
            {/* Inicio */}
            <Route path="/" element={
              <div style={homeStyle}>
                <h1 style={titleStyle}>PASTELERÍA LAMA</h1>
                <p style={subtitleStyle}></p>
              </div>
            } />

            {/* Páginas de gestión */}
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/ingredientes" element={<IngredientesPage />} />
            <Route path="/recetas" element={<RecetasPage />} />
            
            <Route path="/sobre-nosotros" element={
              <div style={{ padding: '100px', textAlign: 'center' }}>
                <h2>Artesanos del Dulce</h2>
                <p>Calidad artesanal en cada bocado desde 2026.</p>
              </div>
            } />

            {/* Login y Registro (Marcadores de posición) */}
            <Route path="/login" element={<div style={{padding: '100px'}}><h2>Login en desarrollo...</h2></div>} />
            <Route path="/registro" element={<div style={{padding: '100px'}}><h2>Registro en desarrollo...</h2></div>} />

            {/* Redirección automática si la ruta no existe */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// Estilos para la Home
const homeStyle: React.CSSProperties = { textAlign: 'center', marginTop: '150px', color: '#5d4037' };
const titleStyle: React.CSSProperties = { fontSize: '3.5rem', margin: 0, letterSpacing: '3px' };
const subtitleStyle: React.CSSProperties = { fontSize: '1.2rem', color: '#bc6c25', fontStyle: 'italic' };

export default App;