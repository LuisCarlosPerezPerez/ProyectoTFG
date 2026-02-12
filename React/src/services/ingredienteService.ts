import type { Ingrediente } from "../Types/ingrediente";

const API_URL = "/api/Ingrediente";

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

    modificar: async (id: number, datos: Ingrediente): Promise<void> => {
        const res = await fetch(`${API_URL}/ModificarIngrediente?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: id, // Incluimos el ID dentro del body también por si el DTO lo requiere
                nombre: datos.nombre,
                stock: Number(datos.stock), // Forzamos que sea número
                proveedor: datos.proveedor
            })
        });

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Error 400: ${errorText}`);
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