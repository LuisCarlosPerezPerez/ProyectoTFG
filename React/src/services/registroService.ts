const API_URL = "http://localhost:8080/Registro";

const registroService = {
    listarRegistros: async () => {
        const response = await fetch(`${API_URL}/MostrarRegistros`);
        if (!response.ok) throw new Error("Error al obtener registros");
        return await response.json();
    },

    guardarRegistro: async (payload: any) => {
        const response = await fetch(`${API_URL}/GuardarRegistro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return await response.json();
    },

    registrarSalida: async () => {
        const response = await fetch(`${API_URL}/GuardarHoraSalida`, {
            method: 'POST'
        });
        if (!response.ok) throw new Error("Error al registrar salida");
    }
};

export default registroService;