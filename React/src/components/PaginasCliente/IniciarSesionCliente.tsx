import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import type { Cliente } from '../../Types/Cliente';

const IniciarSesionCliente = () => {
  const navegar = useNavigate();
  const [cliente, setCliente] = useState<Partial<Cliente>>({ usuario: '', contraseña: '' });

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const iniciarSesion = async (e: React.FormEvent) => { 
    e.preventDefault();
    try {
      const respuesta = await fetch('/api/Cliente/InicioSesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      if (respuesta.status === 200) {
        const data = await respuesta.json();
        const usuarioConRol = { ...data, rol: 'cliente' };
        
        authService.login(usuarioConRol);
        alert("¡Bienvenido a Confitería Dama!");
        navegar("/productos");
        window.location.reload();
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Error al conectar con el servidor de la pastelería");
    }
  };

 return (
    <main style={Estilos.pantallaCompleta}>
      <section style={Estilos.tarjeta} aria-labelledby="login-title">

        <div style={Estilos.barraRosa} aria-hidden="true"></div>

        <header style={Estilos.header}>
          <h1 id="login-title" style={Estilos.logo}>
            Pastelería <span style={{ color: '#E91E63' }}>Lama</span>
          </h1>
          <p style={Estilos.subtitulo}>
            ¡Qué alegría verte de nuevo! Inicia sesión para disfrutar de nuestros dulces.
          </p>
        </header>

        <form onSubmit={iniciarSesion} aria-label="Acceso de clientes">
          <div style={Estilos.campo}>
            <label htmlFor="usuario" style={Estilos.etiqueta}>USUARIO</label>
            <input
              id="usuario"
              type="text"
              name="usuario"
              placeholder="Tu nombre de usuario"
              style={Estilos.input}
              value={cliente.usuario}
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
              placeholder="Tu contraseña secreta"
              style={Estilos.input}
              value={cliente.contraseña}
              onChange={manejarCambio}
              required
            />
          </div>

          <button type="submit" style={Estilos.botonEntrar}>
            INICIAR SESIÓN
          </button>

          <nav style={Estilos.footerNav} aria-label="Opciones de cuenta">
            <span style={Estilos.textoLink}>¿Nuevo en la familia?</span>
            <Link to="/RegistrarCliente" style={Estilos.linkResaltado}>
              Crea tu cuenta aquí
            </Link>
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

    backgroundColor: '#FFFFFF',
    backgroundImage: 'linear-gradient(135deg, #fff5f8 0%, #ffffff 100%)',
    padding: '20px',
    fontFamily: "'Montserrat', 'Poppins', sans-serif"
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: '450px',
    borderRadius: '24px', 
    boxShadow: '0 20px 40px rgba(233, 30, 99, 0.12)', 
    overflow: 'hidden',
    border: '1px solid #fce4ec',
    textAlign: 'center'
  },
  barraRosa: {
    height: '8px',
    backgroundColor: '#E91E63', 
    width: '100%'
  },
  header: {
    padding: '40px 40px 20px 40px'
  },
  logo: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: '#333',
    margin: '0 0 10px 0',
    letterSpacing: '-1px'
  },
  subtitulo: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.5',
    margin: '0 auto',
    maxWidth: '300px'
  },
  campo: {
    padding: '0 40px',
    marginBottom: '20px',
    textAlign: 'left'
  },
  etiqueta: {
    fontSize: '0.75rem',
    fontWeight: '700',
    color: '#E91E63', 
    marginBottom: '8px',
    display: 'block',
    letterSpacing: '1px'
  },
  input: {
    width: '100%',
    padding: '16px',
    borderRadius: '12px',
    border: '2px solid #f0f0f0',
    backgroundColor: '#fafafa',
    fontSize: '1rem',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none',

  },
  botonEntrar: {
    width: 'calc(100% - 80px)',
    margin: '10px 40px',
    padding: '16px',
    backgroundColor: '#E91E63', 
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'transform 0.2s ease, background-color 0.2s ease',
    boxShadow: '0 8px 15px rgba(233, 30, 99, 0.3)'
  },
  footerNav: {
    padding: '30px 40px',
    backgroundColor: '#fff9fa',
    marginTop: '20px',
    borderTop: '1px solid #fce4ec'
  },
  textoLink: {
    color: '#888',
    fontSize: '0.9rem',
    display: 'block',
    marginBottom: '5px'
  },
  linkResaltado: {
    color: '#E91E63',
    fontWeight: '700',
    textDecoration: 'none',
    fontSize: '0.95rem'
  }
};

export default IniciarSesionCliente;