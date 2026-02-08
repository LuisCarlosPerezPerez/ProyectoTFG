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

import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import IniciarSesionEmpleado from './components/PaginaEmpleados/IniciarSesionEmpleado'
import IniciarSesionCliente from './components/PaginasCliente/IniciarSesionCliente'
import RegistrarCliente from './components/PaginasCliente/RegistrarCliente'
import RegistrarEmpleado from './components/PaginaEmpleados/RegistrarEmpleado'
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
      {/* Aplicamos el contenedor centrado aquí */}
      <main style={ContenedorPrincipal}>
        <Routes>
          <Route path='/IniciarSesionCliente' element={<IniciarSesionCliente/>}/>
          <Route path='/RegistrarCliente' element={<RegistrarCliente/>}/>
          <Route path='/RegistrarEmpleado' element={<RegistrarEmpleado/>}/>
          <Route path='/IniciarSesionEmpleado' element={<IniciarSesionEmpleado/>}/>

          {/* Menú de Inicio con estilo de Cafetería */}
          <Route path="/" element={
            <div style={TarjetaBienvenida}>
              <h4 style={TituloSesion}>Pastelería Lama</h4>
              <p style={Subtitulo}>Selecciona tu tipo de acceso</p>
              
              <div style={GrupoBotones}>
                <Link style={EstiloBotonPrimario} to="/IniciarSesionCliente">
                  ☕ Acceso Clientes
                </Link>
                
                <Link style={EstiloBotonSecundario} to="/IniciarSesionEmpleado">
                  🔑 Acceso Empleados
                </Link>
              </div>

              <footer style={PiePagina}>Desde 2026 horneando con amor</footer>
            </div>
          }/>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
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
// --- CONSTANTES DE ESTILO ---

const ContenedorPrincipal: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#fdf5e6', // Color crema/harina de fondo
  margin: 0,
};

const TarjetaBienvenida: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '50px',
  borderRadius: '30px',
  boxShadow: '0 15px 35px rgba(93, 64, 55, 0.12)',
  textAlign: 'center',
  maxWidth: '500px',
  border: '1px solid #efebe9',
};

const TituloSesion: React.CSSProperties = { 
  fontSize: '3rem', 
  margin: '0 0 10px 0', 
  letterSpacing: '2px', 
  color: '#5d4037',
  fontWeight: '800'
};

const Subtitulo: React.CSSProperties = {
  color: '#8d6e63',
  fontSize: '1.1rem',
  marginBottom: '40px',
};

const GrupoBotones: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const EstiloBotonPrimario: React.CSSProperties = {
  display: 'block',
  padding: '16px 30px',
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#ffffff',
  backgroundColor: '#5d4037', // Café tostado
  borderRadius: '12px',
  textDecoration: 'none',
  borderBottom: '4px solid #3e2723', // Profundidad
  transition: 'transform 0.1s',
};

const EstiloBotonSecundario: React.CSSProperties = {
  display: 'block',
  padding: '14px 30px',
  fontSize: '1rem',
  fontWeight: '600',
  color: '#5d4037',
  backgroundColor: 'transparent',
  borderRadius: '12px',
  textDecoration: 'none',
  border: '2px solid #5d4037',
};

const PiePagina: React.CSSProperties = {
  marginTop: '40px',
  fontSize: '0.85rem',
  color: '#bcaaa4',
  fontStyle: 'italic'
};

export default App;