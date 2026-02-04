import { useState } from 'react';
import type { Cliente } from '../../Types/Cliente'; 

const Login = () => {
  // Estado Inicial: El Campo está vacio
  const [Cliente, setCliente] = useState<Cliente>({
    usuario: '',
    contraseña: '',
  });
  // El usuario escribe en los campos(inputs)
  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({
      ...Cliente,
      [e.target.name]: e.target.value
    });
  };

  // El usuario envía el formulario
  const iniciarSesion = async (e: React.SubmitEvent) => {
    e.preventDefault();
    try {
      // Se envían las credenciales al backend de Spring Boot
      const respuesta = await fetch('http://localhost:9090/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Cliente),
      });
      // Se obtiene el token JWT de la respuesta
      const data = await respuesta.json();
      const token = data.token;
      
      // Guardamos el token en el LocalStorage para que el navegador lo recuerde
      localStorage.setItem('token', token);
      
      alert("¡Inicio de sesión exitoso!");
      // Aquí podrías usar useNavigate de react-router-dom para enviar al usuario a la Home
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Email o contraseña incorrectos");
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
            value={Cliente.usuario} 
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
            value={Cliente.contraseña} 
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