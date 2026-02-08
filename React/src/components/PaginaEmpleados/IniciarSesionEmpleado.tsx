import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Empleado } from '../../Types/Empleado';

const LoginEmpleado = () => {
  const navegar = useNavigate();

  // 1. Estado inicial organizado (minúsculas para la instancia)
  const [empleado, setEmpleado] = useState<Empleado>({
    usuario: '',
    contraseña: '',
  });

  // 2. Manejo de cambios
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpleado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Lógica de envío (Corregida a POST y validaciones)
  const iniciarSesion = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      const respuesta = await fetch('/api/Empleado/IniciarSesionEmpleado', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      });
      console.log("Status del servidor:", respuesta.status);
      const data = await respuesta.json();
      console.log(data);
      if (data==null) throw new Error('Error en el servidor');

      localStorage.setItem('token', data.token);
      
      alert("¡Acceso concedido al sistema de gestión!");
      navegar('/Dashboard'); // Redirige al panel de control del empleado

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div style={Estilos.contenedor}>
      <div style={Estilos.tarjeta}>
        <div style={Estilos.banner}>ÁREA INTERNA</div>
        <h2 style={Estilos.titulo}>Acceso Empleados</h2>
        
        <form onSubmit={iniciarSesion}>
          <div style={Estilos.grupo}>
            <label style={Estilos.etiqueta}>Usuario Corporativo</label>
            <input 
              type="text" 
              name="usuario" 
              style={Estilos.input}
              value={empleado.usuario} 
              onChange={manejarCambio} 
              required 
            />
          </div>

          <div style={Estilos.grupo}>
            <label style={Estilos.etiqueta}>Contraseña</label>
            <input 
              type="password" 
              name="contraseña" 
              style={Estilos.input}
              value={empleado.contraseña} 
              onChange={manejarCambio} 
              required 
            />
          </div>

          <button type="submit" style={Estilos.boton}>
            Validar Identidad
          </button>
        </form>
      </div>
    </div>
  );
};

// --- ESTILOS PROFESIONALES (Diferentes al de Cliente) ---
const Estilos: { [key: string]: React.CSSProperties } = {
  contenedor: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    backgroundColor: '#f4f7f6'
  },
  tarjeta: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center',
    borderTop: '5px solid #3e2723' // Franja café oscuro para distinguir
  },
  banner: {
    fontSize: '0.7rem',
    fontWeight: 'bold',
    color: '#8d6e63',
    letterSpacing: '2px',
    marginBottom: '10px'
  },
  titulo: {
    color: '#3e2723',
    marginBottom: '25px',
    fontSize: '1.5rem'
  },
  grupo: {
    marginBottom: '20px',
    textAlign: 'left'
  },
  etiqueta: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#555',
    marginBottom: '5px',
    fontWeight: '600'
  },
  input: {
    width: '100%',
    padding: '12px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    boxSizing: 'border-box',
    outline: 'none'
  },
  boton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#3e2723',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background 0.3s'
  }
};

export default LoginEmpleado; 