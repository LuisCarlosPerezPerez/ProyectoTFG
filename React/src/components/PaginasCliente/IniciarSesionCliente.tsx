import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService'; // Asegúrate de que la ruta sea correcta
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
      // Llamada al endpoint de tu backend
      const respuesta = await fetch('/api/Cliente/InicioSesion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      console.log("Status del servidor:", respuesta.status);

      if (respuesta.status === 200) {
        const data = await respuesta.json();
        
        // --- SOLUCIÓN AL PROBLEMA DEL ROL ---
        // Como vimos en tus logs, el servidor no envía el campo 'rol'.
        // Lo añadimos manualmente para que ProductosPage reconozca al cliente.
        const usuarioConRol = { 
            ...data, 
            rol: 'cliente' 
        };

        // Guardamos en 'usuario_sesion' usando tu servicio
        authService.login(usuarioConRol);

        alert("¡Bienvenido a Pastelería Lama!");
        
        // Redirigimos a la vitrina de productos
        navegar("/productos");

        // Forzamos el refresco para actualizar el Navbar y mostrar el botón de comprar
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
    <div style={Estilos.pantallaCompleta}>
      <div style={Estilos.tarjeta}>
        <h2 style={Estilos.titulo}>Iniciar Sesión</h2>
        <p style={Estilos.subtitulo}>¡Qué bueno verte de nuevo!</p>

        <form onSubmit={iniciarSesion}>
          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Usuario</label>
            <input
              type="text"
              name="usuario"
              style={Estilos.input}
              value={cliente.usuario}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Contraseña</label>
            <input
              type="password"
              name="contraseña"
              style={Estilos.input}
              value={cliente.contraseña}
              onChange={manejarCambio}
              required
            />
          </div>

          <button type="submit" style={Estilos.botonEntrar}>
            Entrar
          </button>

          <div style={{ marginTop: '20px' }}>
            <Link to="/RegistrarCliente" style={Estilos.enlace}>
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- ESTILOS ---
const Estilos: { [key: string]: React.CSSProperties } = {
  pantallaCompleta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fdf5e6',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    width: '350px',
    textAlign: 'center',
  },
  titulo: {
    color: '#5d4037',
    marginBottom: '5px',
    fontSize: '2rem',
  },
  subtitulo: {
    color: '#8d6e63',
    marginBottom: '30px',
  },
  campo: {
    textAlign: 'left',
    marginBottom: '15px',
  },
  etiqueta: {
    color: '#5d4037', 
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '2px solid #d7ccc8',
    boxSizing: 'border-box',
  },
  botonEntrar: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#5d4037',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
  },
  enlace: {
    color: '#bc6c25',
    textDecoration: 'none',
    fontWeight: '600',
  }
};

export default IniciarSesionCliente;