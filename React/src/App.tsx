import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes Base
import Navbar from './componentes/navbar/navbar';

// Páginas Generales
import ProductosPage from './paginas/paginasProductos.tsx';
import IngredientesPage from './paginas/paginasIngredientes.tsx';
import RecetasPage from './paginas/recetas.tsx';

// Páginas de Cliente (Basado en tu captura 'PaginasCliente')
import IniciarSesionCliente from './components/PaginasCliente/IniciarSesionCliente.tsx';
import RegistrarCliente from './components/PaginasCliente/RegistrarCliente.tsx';
import ComprarProducto from './components/PaginasCliente/ComprarProducto.tsx';

// Páginas de Empleado (Basado en tu captura 'PaginaEmpleados')
import IniciarSesionEmpleado from './components/PaginaEmpleados/IniciarSesionEmpleado.tsx';
import RegistrarEmpleado from './components/PaginaEmpleados/RegistrarEmpleado.tsx';
import ModificarProducto from './components/PaginaEmpleados/ModificarProducto.tsx';
import ListarPedidos from './components/PaginaEmpleados/ListarPedidos.tsx';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#fdfaf5', minHeight: '100vh' }}>
        
        <Navbar /> 

        <main style={mainContainerStyle}>
          <Routes>
            {/* --- RUTAS PÚBLICAS (Visitantes) --- */}
            <Route path="/" element={
              <div style={homeStyle}>
                <h1 style={titleStyle}>PASTELERÍA LAMA</h1>
                <p style={subtitleStyle}>Artesanos del dulce desde 2026</p>
                <div style={decorLineStyle}></div>
              </div>
            } />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/sobre-nosotros" element={<div style={infoPageStyle}><h2>Artesanos del Dulce</h2><p>Calidad artesanal desde 2026.</p></div>} />

            {/* --- RUTAS DE CLIENTE --- */}
            <Route path="/login" element={<IniciarSesionCliente />} />
            <Route path="/registro" element={<RegistrarCliente />} />
            <Route path="/comprar" element={<ComprarProducto productoId={0} />} />

            {/* --- RUTAS DE EMPLEADO / GESTIÓN --- */}
            <Route path="/login-empleado" element={<IniciarSesionEmpleado />} />
            <Route path="/ingredientes" element={<IngredientesPage />} />
            <Route path="/recetas" element={<RecetasPage />} />
            <Route path="/pedidos" element={<ListarPedidos />} />
            <Route path="/modificar-producto" element={<ModificarProducto />} />
            <Route path="/relacion-pro-ing" element={<RecetasPage />} />

            {/* --- RUTA EXCLUSIVA ADMIN (Añadir/Quitar Empleados) --- */}
            <Route path="/gestion-empleados" element={<RegistrarEmpleado />} />

            {/* Redirección automática */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

// --- ESTILOS PARA QUE SE VEA BIEN ---
const mainContainerStyle: React.CSSProperties = { 
  paddingTop: '90px', // Para que el Navbar fijo no tape el contenido
  minHeight: 'calc(100vh - 90px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const homeStyle: React.CSSProperties = { textAlign: 'center', marginTop: '100px', color: '#5d4037' };
const titleStyle: React.CSSProperties = { fontSize: '4rem', margin: 0, letterSpacing: '4px', fontWeight: 'bold' };
const subtitleStyle: React.CSSProperties = { fontSize: '1.2rem', color: '#bc6c25', fontStyle: 'italic' };
const decorLineStyle: React.CSSProperties = { width: '80px', height: '3px', backgroundColor: '#bc6c25', margin: '20px auto' };
const infoPageStyle: React.CSSProperties = { padding: '50px', textAlign: 'center' };

export default App;