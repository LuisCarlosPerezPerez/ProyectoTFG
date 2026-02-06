import type { Ingrediente } from "../Types/ingrediente";

const API_URL = "http://localhost:9090/Ingrediente";

const ingredienteService = {
    // 1. Listar (Coincide con tu @GetMapping("/MostarIngredientes"))
    listar: async (): Promise<Ingrediente[]> => {
        try {
            const res = await fetch(`${API_URL}/MostarIngredientes`);
            if (!res.ok) throw new Error("Error al traer ingredientes");
            return await res.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    },

    // 2. Guardar (Coincide con tu @PostMapping("/GuardarIngrediente"))
    guardar: async (nuevo: Ingrediente): Promise<number> => {
        const res = await fetch(`${API_URL}/GuardarIngrediente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(nuevo)
        });
        if (!res.ok) throw new Error("Error al guardar");
        return await res.json();
    },

    // 3. Eliminar (Coincide con tu @PostMapping("/ElimnarIngrediente"))
    // IMPORTANTE: Tu controlador espera un @RequestBody con el ID directamente
    eliminar: async (id: number): Promise<void> => {
        const res = await fetch(`${API_URL}/ElimnarIngrediente`, {
            method: 'POST', // Usamos POST como tienes en tu Java
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id) // Enviamos solo el número en el cuerpo
        });

        if (!res.ok) {
            throw new Error("No se pudo eliminar el ingrediente");
        }
    }
};

export default ingredienteService;