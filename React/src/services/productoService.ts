import type { Producto, VerProductosDTO } from '../Types/producto';

const API_URL = '/api/productos';

const productoService = {
    listar: async (): Promise<VerProductosDTO[]> => {
        const resp = await fetch(`${API_URL}/MostrarProductos`);
        if (!resp.ok) throw new Error("Error al obtener productos");
        return await resp.json();
    },

    guardar: async (producto: any): Promise<void> => {
        const resp = await fetch(`${API_URL}/GuardarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!resp.ok) throw new Error("Error al guardar");
    },

    eliminar: async (id: number): Promise<void> => {
        const resp = await fetch(`${API_URL}/EliminarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id) 
        });
        if (!resp.ok) throw new Error("No se pudo eliminar");
    },

    modificar: async (producto: any): Promise<void> => {
        const resp = await fetch(`${API_URL}/ModificarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(producto)
        });
        if (!resp.ok) throw new Error("Error al modificar");
    }
};

export default productoService;