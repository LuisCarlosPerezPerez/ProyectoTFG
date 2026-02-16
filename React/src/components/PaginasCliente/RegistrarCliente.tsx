import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Cliente } from '../../Types/Cliente';

const Registro = () => {
  const navegarIniciarSesion = useNavigate();


  const [cliente, setCliente] = useState<Cliente>({
    usuario: '',
    contraseña: '',
    email: '',
  });


  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {

      const respuesta = await fetch('/api/Cliente/GuardarCliente', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(cliente),
      });

      if (!respuesta.ok) {
        const errorTexto = await respuesta.text();
        throw new Error(errorTexto || `Error del servidor: ${respuesta.status}`);
      }

      alert("¡Cuenta creada con éxito! Bienvenido a Confitería Dama.");
      navegarIniciarSesion('/IniciarSesionCliente');

    } catch (error: any) {
      console.error("Detalle del fallo:", error);
      const mensaje = error.message.includes('Failed to fetch') 
        ? "No se puede conectar con el servidor del obrador."
        : error.message;
        
      alert("Error: " + mensaje);
    }
  };

  return (
    <main style={Estilos.pantallaCompleta}>
      <section style={Estilos.tarjeta} aria-labelledby="reg-title">

        <div style={Estilos.barraRosa} aria-hidden="true"></div>

        <header style={Estilos.header}>
          <span style={Estilos.tagline} aria-hidden="true">ÚNETE A NUESTRO OBRADOR</span>
          <h1 id="reg-title" style={Estilos.logo}>
            Pastelería <span style={{ color: '#E91E63' }}>Lama</span>
          </h1>
          <div style={Estilos.divisor} aria-hidden="true"></div>
          <h2 style={Estilos.titulo}>CREAR CUENTA</h2>
          <p style={Estilos.subtitulo}>Disfrute de ventajas exclusivas y pedidos personalizados</p>
        </header>

        <form onSubmit={enviarFormulario} aria-label="Formulario de registro de cliente nuevo">
          <div style={Estilos.campo}>
            <label htmlFor="usuario" style={Estilos.etiqueta}>NOMBRE DE USUARIO</label>
            <input
              id="usuario"
              type="text"
              name="usuario"
              placeholder="Ej: gourmet_dulce"
              style={Estilos.input}
              value={cliente.usuario}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={Estilos.campo}>
            <label htmlFor="email" style={Estilos.etiqueta}>CORREO ELECTRÓNICO</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="su-correo@ejemplo.com"
              style={Estilos.input}
              value={cliente.email}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={Estilos.campo}>
            <label htmlFor="contraseña" style={Estilos.etiqueta}>CONTRASEÑA</label>
            <input
              id="contraseña"
              type="password"
              name="contraseña"
              placeholder="Mínimo 8 caracteres"
              style={Estilos.input}
              value={cliente.contraseña}
              onChange={manejarCambio}
              required
            />
          </div>

          <button type="submit" style={Estilos.botonCrear}>
            REGISTRARME AHORA
          </button>

          <nav style={Estilos.footerNav} aria-label="Navegación de retorno">
            <p style={Estilos.textoFooter}>
              ¿Ya tiene una cuenta?{' '}
              <span 
                onClick={() => navegarIniciarSesion('/IniciarSesionCliente')}
                style={Estilos.enlaceSimulado}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && navegarIniciarSesion('/IniciarSesionCliente')}
              >
                Inicie sesión aquí
              </span>
            </p>
          </nav>
        </form>
      </section>
    </main>
  );
};

const Estilos: { [key: string]: React.CSSProperties } = {
  pantallaCompleta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    backgroundColor: '#FFFFFF',
    backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #fff5f8 100%)',
    fontFamily: "'Montserrat', sans-serif",
    padding: '20px'
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '450px',
    borderRadius: '24px',
    boxShadow: '0 20px 50px rgba(233, 30, 99, 0.1)',
    overflow: 'hidden',
    border: '1px solid #fce4ec',
    textAlign: 'center'
  },
  barraRosa: {
    height: '10px',
    backgroundColor: '#E91E63',
    width: '100%'
  },
  header: {
    padding: '40px 40px 10px 40px'
  },
  tagline: {
    display: 'block',
    letterSpacing: '3px',
    fontSize: '0.7rem',
    color: '#E91E63',
    fontWeight: '700',
    marginBottom: '8px'
  },
  logo: {
    color: '#333',
    fontSize: '2.2rem',
    margin: '0',
    fontWeight: '800',
    letterSpacing: '-1px'
  },
  divisor: {
    width: '40px',
    height: '4px',
    backgroundColor: '#E91E63',
    margin: '15px auto',
    borderRadius: '2px'
  },
  titulo: {
    color: '#333',
    fontSize: '1.2rem',
    fontWeight: '700',
    margin: '10px 0'
  },
  subtitulo: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '30px',
  },
  campo: {
    padding: '0 40px',
    textAlign: 'left',
    marginBottom: '20px',
  },
  etiqueta: {
    display: 'block',
    marginBottom: '8px',
    color: '#E91E63',
    fontWeight: '700',
    fontSize: '0.75rem',
    letterSpacing: '0.5px'
  },
  input: {
    width: '100%',
    padding: '15px',
    border: '2px solid #f0f0f0',
    fontSize: '1rem',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  },
  botonCrear: {
    width: 'calc(100% - 80px)',
    margin: '10px 40px',
    padding: '16px',
    backgroundColor: '#E91E63',
    color: '#ffffff',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    borderRadius: '14px',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 20px rgba(233, 30, 99, 0.2)'
  },
  footerNav: {
    padding: '25px 40px 35px 40px',
    backgroundColor: '#fff9fa',
    marginTop: '25px',
    borderTop: '1px solid #fce4ec'
  },
  textoFooter: {
    color: '#666',
    fontSize: '0.9rem',
    margin: 0
  },
  enlaceSimulado: {
    color: '#E91E63',
    cursor: 'pointer',
    fontWeight: '700',
    textDecoration: 'underline',
  }
};
export default Registro;