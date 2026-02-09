import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Cliente } from '../../Types/Cliente';

const Registro = () => {
  const navegarIniciarSesion = useNavigate();

  // 1. Estado inicial con los campos exactos de tu DTO
  const [cliente, setCliente] = useState<Cliente>({
    usuario: '',
    contraseña: '',
    email: '',
  });

  // 2. Manejador de cambios en los inputs
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Envío al Backend usando el PROXY de Vite
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Usamos '/api' para que Vite lo redirija al puerto 9090
      // La ruta final en el servidor será: http://localhost:9090/Cliente/GuardarCliente
      const respuesta = await fetch('/api/Cliente/GuardarCliente', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(cliente),
      });

      console.log("Datos enviados:", JSON.stringify(cliente));
      console.log("Status del servidor:", respuesta.status);

      // Verificamos si la respuesta es correcta (status 200-299)
      if (!respuesta.ok) {
        // Leemos el error como texto para evitar el fallo de "Unexpected end of JSON"
        const errorTexto = await respuesta.text();
        throw new Error(errorTexto || `Error del servidor: ${respuesta.status}`);
      }

      // Si todo salió bien, procesamos la respuesta
      const data = await respuesta.json();
      console.log("Respuesta del servidor:", data);

      alert("¡Cuenta creada con éxito! Bienvenido a Pastelería Lama.");
      
      // Redirigimos al login
      navegarIniciarSesion('/IniciarSesionCliente');

    } catch (error: any) {
      console.error("Detalle del fallo:", error);
      // Si el error es 'Failed to fetch', es que el backend está apagado
      const mensaje = error.message.includes('Failed to fetch') 
        ? "No se puede conectar con el servidor. ¿Está encendido el Backend?"
        : error.message;
        
      alert("Error: " + mensaje);
    }
  };

  return (
    <div style={Estilos.pantallaCompleta}>
      <div style={Estilos.tarjeta}>
        <h2 style={Estilos.titulo}>Crear Cuenta</h2>
        <p style={Estilos.subtitulo}>Artesanos del dulce desde 2026</p>

        <form onSubmit={enviarFormulario}>
          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Nombre de Usuario</label>
            <input
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
            <label style={Estilos.etiqueta}>Correo Electrónico</label>
            <input
              type="email"
              name="email"
              placeholder="email@ejemplo.com"
              style={Estilos.input}
              value={cliente.email}
              onChange={manejarCambio}
              required
            />
          </div>

          <div style={Estilos.campo}>
            <label style={Estilos.etiqueta}>Contraseña</label>
            <input
              type="password"
              name="contraseña"
              placeholder="Crea una clave segura"
              style={Estilos.input}
              value={cliente.contraseña}
              onChange={manejarCambio}
              required
            />
          </div>

          <button type="submit" style={Estilos.botonCrear}>
            Registrarme ahora
          </button>

          <div style={{ marginTop: '20px' }}>
            <span style={{ color: '#8d6e63', fontSize: '0.85rem' }}>
              ¿Ya eres parte del club?{' '}
              <span 
                onClick={() => navegarIniciarSesion('/IniciarSesionCliente')}
                style={Estilos.enlaceSimulado}
              >
                Inicia sesión aquí
              </span>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- ESTILOS PROFESIONALES ---
const Estilos: { [key: string]: React.CSSProperties } = {
  pantallaCompleta: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    width: '100%',
    backgroundColor: '#fdfaf5',
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(93, 64, 55, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
    border: '1px solid #efebe9',
  },
  titulo: {
    color: '#5d4037',
    fontSize: '1.8rem',
    margin: '0 0 10px 0',
  },
  subtitulo: {
    color: '#bc6c25',
    fontSize: '0.9rem',
    marginBottom: '30px',
    fontStyle: 'italic',
  },
  campo: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  etiqueta: {
    display: 'block',
    marginBottom: '8px',
    color: '#5d4037',
    fontWeight: '600',
    fontSize: '0.85rem',
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d7ccc8',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none',
    backgroundColor: '#fff',
    color: '#333'
  },
  botonCrear: {
    width: '100%',
    padding: '14px',
    backgroundColor: '#5d4037',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s',
  },
  enlaceSimulado: {
    color: '#bc6c25',
    cursor: 'pointer',
    fontWeight: 'bold',
    textDecoration: 'underline',
  }
};

export default Registro;