

const API_URL = "/api/ProductoIngrediente";

const relacionService = {
    listar: async (): Promise<any[]> => {
        const res = await fetch(`${API_URL}/listarProductoIngrediente`);
        if (!res.ok) throw new Error("Error al listar");
        return await res.json();
    },

    guardar: async (id_producto: number, id_ingrediente: number): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarProductoIngrediente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto, id_ingrediente })
        });
        return await res.json();
    },

    eliminar: async (id: number): Promise<void> => {
        // URL Corregida segun tu controlador: /Eliminar...
        const res = await fetch(`${API_URL}/EliminarProductoIngrediente`, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id) 
        });
        if (!res.ok) throw new Error("No se pudo eliminar la relación");
    }
};

export default relacionService;