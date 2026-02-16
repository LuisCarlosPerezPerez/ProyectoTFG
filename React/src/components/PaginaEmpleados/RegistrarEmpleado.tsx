import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const RegistrarEmpleado = () => {
  const navegar = useNavigate();
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    usuario: '',
    contraseña: '',
    rol: 'empleado' 
  });

  useEffect(() => {
    if (!authService.esAdmin()) {
      alert("Acceso denegado. Solo el administrador puede dar de alta empleados.");
      navegar('/productos');
    }
  }, [navegar]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNuevoEmpleado({ ...nuevoEmpleado, [e.target.name]: e.target.value });
  };

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const datosParaBackend = {
        Usuario: nuevoEmpleado.usuario,
        Contraseña: nuevoEmpleado.contraseña,
        Administrador: nuevoEmpleado.rol === 'admin' ? 1 : 0,
        ID_Empleado: 0 
      };

      const respuesta = await fetch('http://localhost:9090/api/Empleado/GuardarEmpleado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosParaBackend),
      });

      if (respuesta.ok) {
        alert(`Empleado ${nuevoEmpleado.usuario} registrado con éxito.`);
        navegar('/productos');
      } else {
        alert("Error al guardar. Revisa la consola del servidor.");
      }
    } catch (error) {
      alert("Error de conexión.");
    }
  };

  if (!authService.esAdmin()) return null;

  return (
    <main style={Estilos.pantalla}>
      <section style={Estilos.tarjeta} aria-labelledby="reg-title">
        <div style={Estilos.barraSuperior} aria-hidden="true"></div>

        <header style={Estilos.header}>
          <span style={Estilos.marcaSuperior} aria-hidden="true">OBRADOR ARTESANAL</span>
          <h1 id="reg-title" style={Estilos.tituloPrincipal}>
            PASTELERÍA <span style={{ color: '#E91E63' }}>LAMA</span>
          </h1>
          <div style={Estilos.divisor} aria-hidden="true"></div>
          <h2 style={Estilos.subtituloSeccion}>ALTA DE NUEVO PERSONAL</h2>
          <p style={Estilos.descripcion}>Registro seguro de accesos para el equipo</p>
        </header>

        <form onSubmit={manejarRegistro} style={Estilos.formulario} aria-label="Formulario de registro de nuevo empleado">
          <div style={Estilos.campo}>
            <label htmlFor="usuario" style={Estilos.etiqueta}>NOMBRE DE USUARIO</label>
            <input 
              id="usuario"
              type="text" 
              name="usuario" 
              placeholder="Ej: maestro_pastelero"
              onChange={manejarCambio} 
              style={Estilos.input} 
              required 
            />
          </div>

          <div style={Estilos.campo}>
            <label htmlFor="contraseña" style={Estilos.etiqueta}>CONTRASEÑA TEMPORAL</label>
            <input 
              id="contraseña"
              type="password" 
              name="contraseña" 
              placeholder="••••••••"
              onChange={manejarCambio} 
              style={Estilos.input} 
              required 
            />
          </div>

          <div style={Estilos.campo}>
            <label htmlFor="rol" style={Estilos.etiqueta}>NIVEL DE ACCESO</label>
            <select 
              id="rol" 
              name="rol" 
              onChange={manejarCambio} 
              style={Estilos.select}
              aria-describedby="rol-desc"
            >
              <option value="empleado">Personal de Obrador</option>
              <option value="admin">Administrador de Gestión</option>
            </select>
            <p id="rol-desc" style={Estilos.srOnly}>Selecciona el nivel de permisos para el nuevo usuario</p>
          </div>

          <div style={Estilos.buttonGroup}>
            <button type="submit" style={Estilos.botonPrincipal}>
              REGISTRAR EN EL SISTEMA
            </button>
            <button type="button" onClick={() => navegar(-1)} style={Estilos.botonVolver}>
              CANCELAR Y VOLVER
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

const Estilos: { [key: string]: React.CSSProperties } = {
  pantalla: { 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '100vh', 
    backgroundColor: '#FFFFFF',
    backgroundImage: 'linear-gradient(135deg, #fff5f8 0%, #ffffff 100%)',
    padding: '20px',
    fontFamily: "'Montserrat', sans-serif"
  },
  tarjeta: { 
    backgroundColor: '#ffffff', 
    borderRadius: '24px', 
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08)', 
    width: '100%',
    maxWidth: '440px', 
    textAlign: 'center', 
    border: '1px solid #fce4ec',
    overflow: 'hidden',
    position: 'relative'
  },
  barraSuperior: {
    height: '10px',
    backgroundColor: '#E91E63',
    width: '100%'
  },
  header: {
    padding: '40px 40px 10px 40px'
  },
  marcaSuperior: {
    display: 'block',
    letterSpacing: '3px',
    fontSize: '0.75rem',
    color: '#E91E63',
    fontWeight: '700',
    marginBottom: '10px'
  },
  tituloPrincipal: { 
    color: '#333', 
    margin: '0', 
    fontSize: '2rem',
    fontWeight: '800',
    letterSpacing: '-1px'
  },
  divisor: {
    width: '40px',
    height: '4px',
    backgroundColor: '#fce4ec',
    margin: '15px auto',
    borderRadius: '10px'
  },
  subtituloSeccion: { 
    color: '#333', 
    margin: '0', 
    fontSize: '1rem',
    fontWeight: '700',
    letterSpacing: '0.5px'
  },
  descripcion: { 
    color: '#666', 
    marginBottom: '20px', 
    fontSize: '0.85rem'
  },
  formulario: {
    padding: '0 40px 40px 40px'
  },
  campo: { textAlign: 'left', marginBottom: '20px' },
  etiqueta: { 
    display: 'block', 
    color: '#333', 
    fontWeight: '700', 
    marginBottom: '8px', 
    fontSize: '0.75rem',
    letterSpacing: '0.5px'
  },
  input: { 
    width: '100%', 
    padding: '14px 16px', 
    borderRadius: '12px', 
    border: '2px solid #f0f0f0', 
    boxSizing: 'border-box', 
    fontSize: '1rem',
    backgroundColor: '#fafafa',
    color: '#333',
    outline: 'none',
    transition: 'all 0.3s ease'
  },
  select: {
    width: '100%', 
    padding: '14px 16px', 
    borderRadius: '12px', 
    border: '2px solid #f0f0f0', 
    boxSizing: 'border-box', 
    fontSize: '1rem',
    backgroundColor: '#fafafa',
    color: '#333',
    cursor: 'pointer',
    outline: 'none',
    appearance: 'none' as any 
  },
  buttonGroup: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  botonPrincipal: { 
    width: '100%', 
    padding: '18px', 
    backgroundColor: '#333', 
    color: '#FFF', 
    border: 'none', 
    fontWeight: '700', 
    cursor: 'pointer', 
    fontSize: '0.9rem',
    letterSpacing: '1px',
    borderRadius: '14px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.2s ease'
  },
  botonVolver: { 
    width: '100%', 
    background: 'none', 
    border: '2px solid #f0f0f0', 
    color: '#666', 
    padding: '14px',
    cursor: 'pointer', 
    fontSize: '0.85rem',
    fontWeight: '700',
    borderRadius: '14px',
    transition: 'all 0.3s ease'
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: '0'
  }
};

export default RegistrarEmpleado;