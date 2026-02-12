// Importamos tu interfaz (asegúrate de que la ruta sea correcta)
import type { Pedido } from '../Types/Pedido';

const API_BASE_URL = 'http://localhost:9090/api/Pedidos';

export const pedidoService = {
  crearPedido: async (nuevoPedido: Pedido): Promise<Pedido> => {
    try {
      const token = localStorage.getItem('token');
      
      const respuesta = await fetch(`${API_BASE_URL}/Crear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        // Enviamos el objeto exactamente como dicta tu interfaz
        body: JSON.stringify(nuevoPedido)
      });

      if (!respuesta.ok) {
        const errorData = await respuesta.json();
        throw new Error(errorData.mensaje || 'Error al procesar el pedido');
      }

      return await respuesta.json();
    } catch (error) {
      console.error("Error en crearPedido:", error);
      throw error;
    }
  },

  /**
   * Obtiene un pedido por ID con la estructura completa
   */
  obtenerPedidoPorId: async (id: number): Promise<Pedido> => {
    const token = localStorage.getItem('token');
    const respuesta = await fetch(`${API_BASE_URL}/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!respuesta.ok) throw new Error('No se encontró el pedido');
    return await respuesta.json();
  }
};