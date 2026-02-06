import type { Ingrediente } from "../Types/ingrediente";

const API_URL = "http://localhost:9090/Ingrediente";

const ingredienteService = {
    listar: async (): Promise<Ingrediente[]> => {
        const res = await fetch(`${API_URL}/MostarIngredientes`);
        if (!res.ok) throw new Error("Error al traer ingredientes");
        return await res.json();
    },

    guardar: async (nuevo: Ingrediente): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarIngrediente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevo)
        });
        if (!res.ok) throw new Error("Error al guardar ingrediente");
        return await res.json();
    }
};

export default ingredienteService;