import type { Producto } from "../types/producto";

const API_URL = "http://localhost:8080/Producto";

const productoService = {
    // GET: MostrarProductos
    listar: async (): Promise<Producto[]> => {
        const res = await fetch(`${API_URL}/MostrarProductos`);
        if (!res.ok) throw new Error("Error al listar productos");
        return await res.json();
    },

    // POST: GuardarProducto
    guardar: async (nuevo: Producto): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarProducto`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevo)
        });
        if (!res.ok) throw new Error("Error al guardar");
        return await res.json();
    }
    
    // Aquí añadirás el de eliminar cuando pongas el @DeleteMapping en Java
};

export default productoService;