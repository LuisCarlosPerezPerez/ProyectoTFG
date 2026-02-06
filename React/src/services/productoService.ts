import type { Producto, VerProductosDTO } from '../Types/producto';

const API_URL = 'http://localhost:9090/api/productos';

const productoService = {
    // Al listar, ahora recibimos el objeto que SI tiene id_producto
    listar: async (): Promise<VerProductosDTO[]> => {
        const resp = await fetch(`${API_URL}/MostrarProductos`);
        if (!resp.ok) throw new Error("Error al obtener productos");
        return await resp.json();
    },

    guardar: async (producto: Producto): Promise<void> => {
        await fetch(`${API_URL}/GuardarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
    },

    eliminar: async (id: number): Promise<void> => {
        const resp = await fetch(`${API_URL}/EliminarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id) // Enviamos el ID al backend
        });
        if (!resp.ok) throw new Error("No se pudo eliminar");
    },

    modificar: async (producto: Producto): Promise<void> => {
        await fetch(`${API_URL}/ModificarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
    }
};

export default productoService;