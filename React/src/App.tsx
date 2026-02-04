import React, { useState } from 'react';
import Navbar from './componentes/navbar/navbar';
import ProductosPage from './paginas/paginasProductos';

function App() {
  // Estado para la navegación manual (sin Router)
  const [pagina, setPagina] = useState('inicio');

  // Función que decide qué mostrar en el cuerpo de la web
  const renderContenido = () => {
    switch (pagina) {
      case 'inicio':
        return (
          <div style={homeStyle}>
            <h1 style={titleStyle}>PASTELERÍA LAMA</h1>
            <p style={subtitleStyle}>Calidad artesanal en cada bocado.</p>
            <button 
              onClick={() => setPagina('productos')} 
              style={btnExploreStyle}
            >
              Explorar Dulces
            </button>
          </div>
        );

      case 'productos':
        // Esta página tiene la tabla, el botón de añadir y eliminar
        return <ProductosPage />;

      case 'sobre-nosotros':
        return (
          <div style={infoPageStyle}>
            <h2>Nuestra Historia</h2>
            <p>Desde 2026, Pastelería Lama ofrece los mejores productos horneados de la ciudad.</p>
          </div>
        );

      case 'galeria':
        return (
          <div style={infoPageStyle}>
            <h2>Galería de Creaciones</h2>
            <div style={galleryPlaceholder}>
              {/* Aquí irán tus imágenes de pasteles */}
              <p>📸 Próximamente fotos de nuestros croissants y tartas...</p>
            </div>
          </div>
        );

      case 'login':
        return (
          <div style={infoPageStyle}>
            <h2>Acceso Personal / Clientes</h2>
            <p>Introduce tus credenciales para entrar.</p>
            {/* Aquí importarás tu componente <Login setPagina={setPagina} /> */}
            <div style={placeholderBox}>Formulario de Login</div>
          </div>
        );

      case 'registro':
        return (
          <div style={infoPageStyle}>
            <h2>Únete a la Familia Lama</h2>
            <p>Crea tu cuenta de cliente aquí.</p>
            {/* Aquí importarás tu componente <RegistroCliente /> */}
            <div style={placeholderBox}>Formulario de Registro</div>
          </div>
        );

      default:
        return (
          <div style={infoPageStyle}>
            <h2>404</h2>
            <p>Parece que este pastel no se ha horneado todavía.</p>
            <button onClick={() => setPagina('inicio')}>Volver al inicio</button>
          </div>
        );
    }
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* El Navbar recibe la función para cambiar el estado 'pagina' */}
      <Navbar setPagina={setPagina} />

      {/* Contenedor principal con margen superior para no quedar debajo del Navbar */}
      <main style={mainLayoutStyle}>
        {renderContenido()}
      </main>
    </div>
  );
}

// --- ESTILOS ---

const mainLayoutStyle: React.CSSProperties = {
  marginTop: '70px', // Altura exacta del Navbar
  minHeight: 'calc(100vh - 70px)',
  backgroundColor: '#fdfaf5'
};

const homeStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 70px)',
  textAlign: 'center',
  padding: '20px'
};

const titleStyle: React.CSSProperties = {
  fontSize: '3rem',
  color: '#5d4037',
  marginBottom: '10px',
  letterSpacing: '2px'
};

const subtitleStyle: React.CSSProperties = {
  fontSize: '1.2rem',
  color: '#8d6e63',
  marginBottom: '30px'
};

const btnExploreStyle: React.CSSProperties = {
  padding: '15px 30px',
  backgroundColor: '#bc6c25',
  color: 'white',
  border: 'none',
  borderRadius: '30px',
  fontSize: '18px',
  fontWeight: 'bold',
  cursor: 'pointer',
  boxShadow: '0 4px 15px rgba(188, 108, 37, 0.3)'
};

const infoPageStyle: React.CSSProperties = {
  padding: '60px 40px',
  maxWidth: '800px',
  margin: 'auto',
  color: '#5d4037'
};

const galleryPlaceholder: React.CSSProperties = {
  width: '100%',
  height: '300px',
  border: '2px dashed #d7ccc8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  marginTop: '20px'
};

const placeholderBox: React.CSSProperties = {
  padding: '40px',
  backgroundColor: '#fff',
  border: '1px solid #efebe9',
  borderRadius: '8px',
  marginTop: '20px',
  textAlign: 'center'
};

export default App;