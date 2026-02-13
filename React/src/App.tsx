import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Componentes Base
import Navbar from './componentes/navbar/navbar';

// Páginas
import Inicio from './paginas/paginaInicio'; 
import ProductosPage from './paginas/paginasProductos';
import IngredientesPage from './paginas/paginasIngredientes';
import RecetasPage from './paginas/recetas';
import NosotrosPage from './paginas/NuestraPagina';

// --- NUEVA PÁGINA DE FICHAR ---
import PaginaRegistros from './paginas/paginaRegistros'; 
import VerRegistrosAdmin from './paginas/verRegistrosAdmin';

// Páginas de Cliente
import IniciarSesionCliente from './components/PaginasCliente/IniciarSesionCliente';
import RegistrarCliente from './components/PaginasCliente/RegistrarCliente';
import ComprarProducto from './components/PaginasCliente/ComprarProducto';
import FinalizarPedido from './components/PaginasCliente/TerminarPedido';
import MisPedidos from './components/PaginasCliente/MisPedidos';
// Páginas de Empleado
import IniciarSesionEmpleado from './components/PaginaEmpleados/IniciarSesionEmpleado';
import RegistrarEmpleado from './components/PaginaEmpleados/RegistrarEmpleado';
import GestionPedidosEmpleado from './components/PaginaEmpleados/MostrarPedidos';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#fdfaf5', minHeight: '100vh' }}>
        
        <Navbar /> 

        <main style={mainContainerStyle}>
          <Routes>
            {/* --- RUTA PÚBLICA PRINCIPAL --- */}
            <Route path="/" element={<Inicio />} />

            {/* --- VITRINA (Productos) --- */}
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
            {/* --- RUTAS DE CLIENTE --- */}
            <Route path="/IniciarSesionCliente" element={<IniciarSesionCliente />} />
            <Route path="/RegistrarCliente" element={<RegistrarCliente />} />
            <Route path="/FinalizarPedido" element={<FinalizarPedido/>}/> 
            {/* RUTA DE COMPRA CON ID DINÁMICO */}
            <Route path="/comprar/:id" element={<ComprarProducto/>} />
            <Route path="/MisPedidos" element={<MisPedidos/>} />
            {/* --- RUTAS DE EMPLEADO / GESTIÓN --- */}
            <Route path="/IniciarSesionEmpleado" element={<IniciarSesionEmpleado />} />
            <Route path="/RegistrarEmpleado" element={<RegistrarEmpleado />} />
            <Route path="/ingredientes" element={<IngredientesPage />} />
            <Route path="/recetas" element={<RecetasPage />} />
            <Route path="/pedidos" element={<GestionPedidosEmpleado/>} />


            {/* --- NUEVA RUTA DE CONTROL DE HORARIO --- */}
            <Route path="/registros" element={<PaginaRegistros />} />
            <Route path='/ver-Registros' element={<VerRegistrosAdmin/>} />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

const mainContainerStyle: React.CSSProperties = { 
  paddingTop: '80px', 
  minHeight: 'calc(100vh - 80px)',
  display: 'flex',
  flexDirection: 'column',
};

export default App;