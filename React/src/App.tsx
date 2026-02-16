import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Navbar from './componentes/navbar/navbar';

import Inicio from './paginas/paginaInicio'; 
import ProductosPage from './paginas/paginasProductos';
import IngredientesPage from './paginas/paginasIngredientes';
import RecetasPage from './paginas/recetas';
import NosotrosPage from './paginas/NuestraPagina';
import PaginaRegistros from './paginas/paginaRegistros'; 
import VerRegistrosAdmin from './paginas/verRegistrosAdmin';
import IniciarSesionCliente from './components/PaginasCliente/IniciarSesionCliente';
import RegistrarCliente from './components/PaginasCliente/RegistrarCliente';
import ComprarProducto from './components/PaginasCliente/ComprarProducto';
import FinalizarPedido from './components/PaginasCliente/TerminarPedido';
import MisPedidos from './components/PaginasCliente/MisPedidos';
import IniciarSesionEmpleado from './components/PaginaEmpleados/IniciarSesionEmpleado';
import RegistrarEmpleado from './components/PaginaEmpleados/RegistrarEmpleado';
import GestionPedidosEmpleado from './components/PaginaEmpleados/MostrarPedidos';
import AvisoLegalPage from './paginas/AvisoLegal'; 
import PoliticaPrivacidadPage from './paginas/PoliticaPrivacidad';
import PoliticaCookiesPage from './paginas/PoliticasCookies';


import './App.css';
import Footer from './componentes/footer/footer';

function App() {
  return (
    <Router>
      <div className="App" style={{ backgroundColor: '#fdfaf5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        <Navbar /> 

        <main style={mainContainerStyle}>
          <Routes>

            <Route path="/" element={<Inicio />} />


            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />


            <Route path="/aviso-legal" element={<AvisoLegalPage />} />
            <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
            <Route path="/cookies" element={<PoliticaCookiesPage />} />


            <Route path="/IniciarSesionCliente" element={<IniciarSesionCliente />} />
            <Route path="/RegistrarCliente" element={<RegistrarCliente />} />
            <Route path="/FinalizarPedido" element={<FinalizarPedido/>}/> 
            <Route path="/comprar/:id" element={<ComprarProducto/>} />
            <Route path="/MisPedidos" element={<MisPedidos/>} />


            <Route path="/IniciarSesionEmpleado" element={<IniciarSesionEmpleado />} />
            <Route path="/RegistrarEmpleado" element={<RegistrarEmpleado />} />
            <Route path="/ingredientes" element={<IngredientesPage />} />
            <Route path="/recetas" element={<RecetasPage />} />
            <Route path="/pedidos" element={<GestionPedidosEmpleado/>} />


            <Route path="/registros" element={<PaginaRegistros />} />
            <Route path='/ver-Registros' element={<VerRegistrosAdmin/>} />


            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <Footer />
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