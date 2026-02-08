import React, { useState } from 'react';
import type { Empleado } from '../../Types/Empleado';

const Registro = () => {
  // 1. Estado inicial
  const [empleado, setEmpleado] = useState<Empleado>({
    usuario: '',
    contraseña: '',
    email: '',
  });

  // 2. Función de cambio (Corregida la llave de cierre)
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmpleado(prev => ({
      ...prev,
      [name]: value
    }));

  }; 

    };


  // 3. Función para enviar (Tipo de evento corregido a FormEvent)
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      // Recuerda que el Admin es el que suele usar esta ruta 
      // para añadir personal a la Pastelería Lama
      const response = await fetch('http://localhost:9090/api/empleados', { // Ajusta tu endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empleado),
      });

      if (response.ok) {
        alert("¡Empleado registrado con éxito!");
        setEmpleado({ usuario: '', contraseña: '', email: '' }); // Limpiar campos
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      alert("Error al registrar el empleado");
    }
  };

  // 4. El RETURN (Ahora sí es un componente válido)
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '100px' }}>
      <h2 style={{ color: '#5d4037' }}>Registrar Nuevo Empleado</h2>
      <form onSubmit={enviarFormulario} style={formStyle}>
        <div>
          <label>Usuario / Nombre:</label>
          <input 
            type="text" 
            name="usuario" 
            value={empleado.usuario} 
            onChange={manejarCambio} 
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="contraseña" 
            value={empleado.contraseña} 
            onChange={manejarCambio} 
            style={inputStyle}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={empleado.email} 
            onChange={manejarCambio} 
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={btnStyle}>Crear Cuenta de Empleado</button>
      </form>
    </div>
  );

};

// Estilos básicos
const formStyle = { display: 'flex', flexDirection: 'column' as const, gap: '15px', textAlign: 'left' as const };
const inputStyle = { width: '100%', padding: '8px', marginTop: '5px', boxSizing: 'border-box' as const };
const btnStyle = { padding: '10px', backgroundColor: '#bc6c25', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' as const };

=======

};

export default Registro;