import { useEffect, useState } from 'react';
import type { Pedido } from '../../Types/Pedido';
const ListaPedidos = () => {

  // 1. Estado para almacenar los pedidos que lleguen del backend
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [cargando, setCargando] = useState(true);

  // 2. useEffect: Se ejecuta una sola vez cuando el componente se carga
  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    const token = localStorage.getItem('token');
    
    try {
      const respuesta = await fetch('http://localhost:9090', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}` // ¡Importante! Sin esto el backend nos rechaza
        }
      });

      if (respuesta.ok) {
        const data = await respuesta.json();
        setPedidos(data); // Guardamos los pedidos en el estado
      } else {
        console.error("No se pudieron obtener los pedidos");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setCargando(false); // Quitamos el mensaje de "Cargando..."
    }
  };

  // 3. Renderizado condicional
  if (cargando) return <p>Cargando tus pedidos...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p>Aún no has realizado ninguna compra.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID Pedido</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Fecha de Entrega</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Telefono</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pedido.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pedido.entrega}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pedido.telefono}€</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{pedido.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaPedidos;