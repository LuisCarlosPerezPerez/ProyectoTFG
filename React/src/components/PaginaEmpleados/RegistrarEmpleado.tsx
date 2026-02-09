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
      // MAPEAREMOS LOS DATOS EXACTAMENTE COMO TU CLASE JAVA:
      // Tu DTO tiene: Usuario, Contraseña, Administrador
      const datosParaBackend = {
        Usuario: nuevoEmpleado.usuario,
        Contraseña: nuevoEmpleado.contraseña,
        Administrador: nuevoEmpleado.rol === 'admin' ? 1 : 0,
        // Mandamos también el ID como 0 para evitar fallos de tipos primitivos (int)
        ID_Empleado: 0 
      };

      console.log("Enviando al servidor:", datosParaBackend);

      const respuesta = await fetch('/api/Empleado/GuardarEmpleado', {
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
    <div style={s.pantalla}>
      <div style={s.tarjeta}>
        <div style={s.logoCircle}>🎂</div>
        <h2 style={s.titulo}>Nuevo Miembro</h2>
        <p style={s.subtitulo}>Panel de Administración - Pastelería Lama</p>

        <form onSubmit={manejarRegistro}>
          <div style={s.campo}>
            <label style={s.etiqueta}>Nombre de Usuario</label>
            <input 
              type="text" 
              name="usuario" 
              placeholder="Ej: pastelero_juan"
              onChange={manejarCambio} 
              style={s.input} 
              required 
            />
          </div>

          <div style={s.campo}>
            <label style={s.etiqueta}>Contraseña Temporal</label>
            <input 
              type="password" 
              name="contraseña" 
              placeholder="••••••••"
              onChange={manejarCambio} 
              style={s.input} 
              required 
            />
          </div>

          <div style={s.campo}>
            <label style={s.etiqueta}>Nivel de Acceso</label>
            <select name="rol" onChange={manejarCambio} style={s.input}>
              <option value="empleado">🧁 Empleado (Estándar)</option>
              <option value="admin">🔑 Administrador (Gestión Total)</option>
            </select>
          </div>

          <button type="submit" style={s.boton}>Crear Nuevo Staff</button>
          <button type="button" onClick={() => navegar(-1)} style={s.btnVolver}>Cancelar</button>
        </form>
      </div>
    </div>
  );
};

const s = {
  pantalla: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fdfaf5' },
  tarjeta: { backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(93, 64, 55, 0.15)', width: '400px', textAlign: 'center' as const, border: '1px solid #f2e8cf' },
  logoCircle: { fontSize: '3rem', marginBottom: '10px' },
  titulo: { color: '#3e2723', margin: '0', fontSize: '1.8rem' },
  subtitulo: { color: '#bc6c25', marginBottom: '25px', fontSize: '0.9rem', fontWeight: 'bold' as const },
  campo: { textAlign: 'left' as const, marginBottom: '15px' },
  etiqueta: { display: 'block', color: '#5d4037', fontWeight: 'bold' as const, marginBottom: '5px', fontSize: '0.85rem' },
  input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d7ccc8', boxSizing: 'border-box' as const, fontSize: '1rem' },
  boton: { width: '100%', padding: '14px', backgroundColor: '#3e2723', color: '#f2e8cf', border: 'none', borderRadius: '8px', fontWeight: 'bold' as const, cursor: 'pointer', marginTop: '15px', fontSize: '1rem' },
  btnVolver: { width: '100%', marginTop: '15px', background: 'none', border: 'none', color: '#8d6e63', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.85rem' }
};

export default RegistrarEmpleado;