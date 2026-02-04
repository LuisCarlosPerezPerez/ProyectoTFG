import { useState, useEffect } from 'react';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const ModificarProducto = () => {
  const { id } = useParams(); // Obtenemos el ID del producto desde la URL
  const navigate = useNavigate();
  
  const [producto, setProducto] = useState({
    nombre: '',
    precio: 0,
    descripcion: '',
    stock: 0
  });

  // 1. Cargar los datos actuales del producto al abrir el componente
  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const respuesta = await fetch(`http://localhost:9090/api/productos/${id}`);
        const datos = await respuesta.json();
        setProducto(datos);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };
    cargarProducto();
  }, [id]);

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    });
  };

  // 2. Enviar los cambios al backend (Usamos PUT para actualizar)
  const guardarCambios = async (e: React.SubmitEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const respuesta = await fetch(`http://localhost:9090/api/productos/${id}`, {
        method: 'PUT', // Estándar para modificaciones
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(producto)
      });

      if (respuesta.ok) {
        alert("Producto actualizado con éxito");
        navigate('/productos'); // Volver a la lista
      } else {
        alert("Error al actualizar");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto' }}>
      <h2>Modificar Producto #{id}</h2>
      <form onSubmit={guardarCambios}>
        <div>
          <label>Nombre:</label>
          <input name="nombre" value={producto.nombre} onChange={manejarCambio} />
        </div>
        <div>
          <label>Precio:</label>
          <input type="number" name="precio" value={producto.precio} onChange={manejarCambio} />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea name="descripcion" value={producto.descripcion} onChange={manejarCambio} />
        </div>
        <div>
          <label>Stock:</label>
          <input type="number" name="stock" value={producto.stock} onChange={manejarCambio} />
        </div>
        <button type="submit" style={{ backgroundColor: '#007bff', color: 'white' }}>
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ModificarProducto;