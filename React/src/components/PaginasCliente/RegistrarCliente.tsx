import React from 'react';
import { useState } from 'react';
import type { Cliente } from '../../Types/Cliente';

const Registro = () => {
  // 1. Definimos el estado inicial basado en tu modelo "Cliente"
  const [cliente, setCliente] = useState<Cliente>({
    usuario: '',
    contraseña: '',
    email: '',
  });

  // 2. Función que se ejecuta cada vez que el usuario escribe algo
  const manejarCambio= (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCliente(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // 3. Función para enviar los datos a Spring Boot
  const enviarFormulario = async (e:React.SubmitEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    try {
      await fetch('http://localhost:9090', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
      });
    } catch (error) {
      console.error("Hubo un error:", error);
      alert("Error al registrar el cliente");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Registrar Cliente</h2>
      <form onSubmit={enviarFormulario}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="usuario" 
            value={cliente.usuario} 
            onChange={manejarCambio} 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={cliente.email} 
            onChange={manejarCambio} 
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input 
            type="contraseña" 
            name="contraseña" 
            value={cliente.contraseña} 
            onChange={manejarCambio} 
          />
        </div>
        <button type="submit">Crear Cuenta</button>
      </form>
    </div>
  );
};
export default Registro;