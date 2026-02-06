import type { ProductoIngrediente } from "../Types/producto_ingrediente";

const API_URL = "http://localhost:9090/ProductoIngrediente";

const relacionService = {
    listar: async (): Promise<ProductoIngrediente[]> => {
        const res = await fetch(`${API_URL}/listarProductoIngrediente`);
        if (!res.ok) throw new Error("Error al listar relaciones");
        return await res.json();
    },

    guardar: async (id_producto: number, id_ingrediente: number): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarProductoIngrediente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_producto, id_ingrediente })
        });
        if (!res.ok) throw new Error("Error al guardar relación");
        return await res.json();
    }
};

export default relacionService;