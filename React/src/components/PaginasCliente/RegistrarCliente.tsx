import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Cliente } from '../../Types/Cliente';

const Registro = () => {
  const navegarIniciarSesion = useNavigate();

  // 1. Estado inicial
  const [cliente, setCliente] = useState<Cliente>({
    usuario: '',
    contraseña: '',
    email: '',
  });

  // 2. Manejador de cambios
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Envío al Backend
  const enviarFormulario = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('/api/Cliente/GuardarCliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });
      console.log("Cuerpo del envío:", JSON.stringify(cliente));
      console.log("Status del servidor:", respuesta.status);
        const data = await respuesta.json();
        const token = data;
        localStorage.setItem('token', token);

         if (respuesta.status === 500) {
        throw new Error('Cliente Existente');
        }

        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        console.log(token);
        navegarIniciarSesion('/IniciarSesionCliente');

    } catch (error) {
      console.error("Hubo un error:", error);
      alert("No se pudo registrar el cliente");
    }
  };

  return (
    <div style={Estilos.pantallaCompleta}>
      <div style={Estilos.tarjeta}>
        <h2 style={Estilos.titulo}>Crear Cuenta</h2>
        <p style={Estilos.subtitulo}>Únete a nuestra comunidad pastelera</p>

        <form onSubmit={enviarFormulario}>
          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Nombre de Usuario</label>
            <input
              type="text"
              name="usuario"
              placeholder="Ej. JuanPerez"
              style={Estilos.input}
              value={cliente.usuario}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="juan@ejemplo.com"
              style={Estilos.input}
              value={cliente.email}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Contraseña</label>
            <input
              type="password" // Corregido de "contraseña" a "password"
              name="contraseña"
              placeholder="Mínimo 6 caracteres"
              style={Estilos.input}
              value={cliente.contraseña}
              onChange={manejarCambio}
              required
            />
          </div>

          <button type="submit" style={Estilos.botonCrear}>
            Registrarse
          </button>

          <div style={{ marginTop: '20px' }}>
            <span style={{ color: '#8d6e63', fontSize: '0.85rem' }}>
              ¿Ya tienes cuenta?{' '}
              <span 
                onClick={() => navegarIniciarSesion('/IniciarSesionCliente')}
                style={Estilos.enlaceSimulado}
              >
                Inicia sesión
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- ESTILOS UNIFICADOS (Resistentes al CSS global oscuro) ---
const Estilos: { [key: string]: React.CSSProperties } = {
  pantallaCompleta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fdf5e6', // Fondo crema
  },
  tarjeta: {
    backgroundColor: '#ffffff', // Fondo blanco puro
    padding: '40px',
    borderRadius: '25px',
    boxShadow: '0 12px 30px rgba(93, 64, 55, 0.15)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    border: '1px solid #efebe9',
  },
  titulo: {
    color: '#5d4037',
    fontSize: '2rem',
    margin: '0 0 5px 0',
  },
  subtitulo: {
    color: '#8d6e63',
    fontSize: '0.95rem',
    marginBottom: '30px',
  },
  campo: {
    textAlign: 'left',
    marginBottom: '18px',
  },
  etiqueta: {
    display: 'block',
    marginBottom: '6px',
    color: '#5d4037',
    fontWeight: '700',
    fontSize: '0.9rem',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '10px',
    border: '2px solid #d7ccc8',
    backgroundColor: '#ffffff', // Forzado
    color: '#3e2723',           // Forzado
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
  },
  botonCrear: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#5d4037',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 10px rgba(93, 64, 55, 0.2)',
  },
  enlaceSimulado: {
    color: '#bc6c25',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
  }
};

export default Registro;