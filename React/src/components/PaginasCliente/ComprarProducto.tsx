import { useState } from 'react';
import type { producto } from '../../Types/producto';
//Cuando Se cree el tipo Producto ya se modificará este import

const ComprarProducto = ({ productoId }: { productoId: number }) => {
  const [cantidad, setCantidad] = useState(1);

  const ejecutarCompra = async (e: React.SubmitEvent) => {
    e.preventDefault();

    // 1. Recuperamos el Token del LocalStorage (la "tarjeta del hotel")
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Debes iniciar sesión para comprar");
      return;
    }

    try {
      // 2. Enviamos la petición con el Token en los Headers
      const respuesta = await fetch('http://localhost:9090/api/compras/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Aquí enviamos el Token para que Spring Boot nos deje pasar
        },
        body: JSON.stringify({
          productoId: productoId,
          cantidad: cantidad
        }),
      });

      if (respuesta.ok) {
        alert("¡Compra realizada con éxito!");
      } else {
        const errorData = await respuesta.json();
        alert("Error en la compra: " + errorData.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>Confirmar Compra</h3>
      <form onSubmit={ejecutarCompra}>
        <p>Producto ID: {productoId}</p>
        <div>
          <label>Cantidad: </label>
          <input 
            type="number" 
            value={cantidad} 
            min="1"
            onChange={(e) => setCantidad(parseInt(e.target.value))}
            style={{ width: '50px' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '10px', backgroundColor: '#28a745', color: 'white' }}>
          Comprar ahora
        </button>
      </form>
    </div>
  );
};

export default ComprarProducto;