import React, { useState } from 'react';
import Navbar from './componentes/navbar/navbar';
import ProductosPage from './paginas/paginasProductos';
import IngredientesPage from './paginas/paginasIngredientes';

function App() {
  // Estado que controla qué página se renderiza (Navegación manual)
  const [pagina, setPagina] = useState('inicio');

  // Función "Cerebro" que decide qué componente mostrar según el estado 'pagina'
  const renderContenido = () => {
    switch (pagina) {
      case 'inicio':
        return (
          <div style={homeStyle}>
            <h1 style={titleStyle}>PASTELERÍA LAMA</h1>
            <p style={subtitleStyle}>Artesanía dulce desde 2026</p>
            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => setPagina('productos')} style={btnPrimary}>
                Ver Productos
              </button>
              <button onClick={() => setPagina('sobre-nosotros')} style={btnSecondary}>
                Conócenos
              </button>
            </div>
          </div>
        );

      case 'productos':
        return <ProductosPage />;

      case 'ingredientes':
        // Esta página solo es accesible si el Navbar permite clicar el botón (empleados)
        return <IngredientesPage />;

      case 'sobre-nosotros':
        return (
          <div style={infoPageStyle}>
            <h2>Sobre Nosotros</h2>
            <p>En Pastelería Lama, Goldie y Harper trabajan cada día para ofrecerte la mejor calidad.</p>
            <p>Nuestra implementación técnica asegura que cada ingrediente esté controlado y cada producto horneado a la perfección.</p>
          </div>
        );

      case 'galeria':
        return (
          <div style={infoPageStyle}>
            <h2>Galería Lama</h2>
            <p>Echa un vistazo a nuestras vitrinas virtuales.</p>
            <div style={placeholderGallery}>📸 Espacio para fotos de pasteles...</div>
          </div>
        );

      case 'login':
        return (
          <div style={infoPageStyle}>
            <h2>Iniciar Sesión</h2>
            <p>Introduce tus credenciales de Empleado o Cliente.</p>
            <div style={placeholderBox}>Formulario de Login en desarrollo...</div>
          </div>
        );

      case 'registro':
        return (
          <div style={infoPageStyle}>
            <h2>Registro de Clientes</h2>
            <p>Crea tu cuenta para realizar pedidos.</p>
            <div style={placeholderBox}>Formulario de Registro en desarrollo...</div>
          </div>
        );

      default:
        return (
          <div style={infoPageStyle}>
            <h2>404</h2>
            <p>Parece que este dulce no está en el menú.</p>
            <button onClick={() => setPagina('inicio')} style={btnPrimary}>Volver al inicio</button>
          </div>
        );
    }
  };

  return (
    <div className="App" style={{ minHeight: '100vh', backgroundColor: '#fdfaf5' }}>
      {/* El Navbar siempre está presente y controla el estado 'pagina' */}
      <Navbar setPagina={setPagina} />

      {/* Contenedor principal con margen para no chocar con el Navbar fixed */}
      <main style={mainContentStyle}>
        {renderContenido()}
      </main>
    </div>
  );
}

// --- ESTILOS ---

const mainContentStyle: React.CSSProperties = {
  marginTop: '70px', // Altura del navbar
  padding: '20px',
  boxSizing: 'border-box'
};

const homeStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 110px)',
  textAlign: 'center'
};

const titleStyle: React.CSSProperties = {
  fontSize: '3.5rem',
  color: '#5d4037',
  margin: '0',
  letterSpacing: '3px'
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.4rem',
  color: '#bc6c25',
  marginBottom: '30px',
  fontStyle: 'italic'
};

const infoPageStyle: React.CSSProperties = {
  maxWidth: '900px',
  margin: '40px auto',
  padding: '20px',
  color: '#5d4037',
  lineHeight: '1.6'
};

const btnPrimary = {
  padding: '12px 25px',
  backgroundColor: '#bc6c25',
  color: 'white',
  border: 'none',
  borderRadius: '25px',
  cursor: 'pointer',
  fontWeight: 'bold' as 'bold'
};

const btnSecondary = {
  ...btnPrimary,
  backgroundColor: 'transparent',
  color: '#bc6c25',
  border: '2px solid #bc6c25'
};

const placeholderGallery = {
  width: '100%',
  height: '250px',
  border: '2px dashed #d7ccc8',
  borderRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: '20px'
};

const placeholderBox = {
  padding: '40px',
  backgroundColor: '#fff',
  border: '1px solid #efebe9',
  borderRadius: '8px',
  marginTop: '20px'
};

export default App;