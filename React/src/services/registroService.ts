
const API_URL = "/api/Registro"; 

const registroService = {
    listarRegistros: async () => {
        const response = await fetch(`${API_URL}/MostrarRegistros`);
        if (!response.ok) throw new Error("Error al obtener el historial");
        return await response.json();
    },

    listarTodosLosRegistros: async () => {
        const response = await fetch(`${API_URL}/MostrarTodosLosRegistros`);
        if (!response.ok) throw new Error("Error al obtener el historial global del staff");
        return await response.json();
    },

    guardarRegistro: async (payload: any) => {
        const response = await fetch(`${API_URL}/GuardarRegistro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(errorMsg || "Error al guardar entrada");
        }
        return await response.text();
    },

    registrarSalida: async (idEmpleado: number) => {
        const response = await fetch(`${API_URL}/GuardarHoraSalida?idEmpleado=${idEmpleado}`, {
            method: 'POST',
        });
        if (!response.ok) throw new Error("Error al registrar salida");
        return true;
    }
};

export default registroService;