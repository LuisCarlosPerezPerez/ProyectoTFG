import { useState } from 'react';
import type { Empleado } from '../../Types/Empleado'; 

const Login = () => {
  // Estado Inicial: El Campo está vacio
  const [Empleado, setEmpleado] = useState<Empleado>({
    usuario: '',
    contraseña: '',
  });
  // El usuario escribe en los campos(inputs)
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpleado({
      ...Empleado,
      [e.target.name]: e.target.value
    });
  };

  // El usuario envía el formulario
  const iniciarSesion = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      // Se envían las credenciales al backend de Spring Boot
      const respuesta = await fetch('http://localhost:9090/api/auth/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Empleado),
      });

    if (respuesta.status==401) {
        throw new Error('Usuario o contraseña incorrectos');
    } else {
      const data = await respuesta.json();
      const token = data.token;

      localStorage.setItem('token', token);
      
      alert("¡Inicio de sesión exitoso!");
    }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={iniciarSesion}>
        <div style={{ marginBottom: '10px' }}>
          <label>Usuario:</label>
          <input 
            type="text" 
            name="usuario" 
            style={{ width: '100%', display: 'block' }}
            value={Empleado.usuario} 
            onChange={manejarCambio} 
            required 
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="contraseña" 
            style={{ width: '100%', display: 'block' }}
            value={Empleado.contraseña} 
            onChange={manejarCambio} 
            required 
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', cursor: 'pointer' }}>
          Entrar
        </button>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#555' }}>
          <a href="/registro">¿No tienes cuenta? Regístrate aquí</a>
        </div>
      </form>
    </div>
  );
};

export default Login;