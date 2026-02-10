import React, { useState } from 'react';

export const FinalizarPedido = () => {
    const [idPedido, setIdPedido] = useState<string>("");
    const [telefono, setTelefono] = useState<string>("");
    const [cargando, setCargando] = useState(false);

   const finalizarYLimpiar = async () => {
    const sesion = localStorage.getItem('usuario_sesion');
    const tokenAntes = JSON.parse(sesion || "{}");
    console.log(tokenAntes);
    console.log("%cLista ANTES de finalizar:", "color: orange", tokenAntes.listaPedidos);

    const res = await fetch(`/api/Cliente/FinalizarPedido/${idPedido}?telefono=${telefono}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokenAntes)
    });

    if (res.ok) {
        const tokenDespues = await res.json();
        
        // Guardamos el nuevo token (que ya no tiene ese ID)
        localStorage.setItem('usuario_sesion', JSON.stringify(tokenDespues));

        console.log("%c✅ Pedido eliminado del token:", "color: green", idPedido);
        console.log(tokenDespues);
        alert("¡Pedido terminado y quitado de la lista!");
    } else {
        alert("Ningun producto");
    }
};

    return (
        <div style={styles.wrapper}>
            <div style={styles.card}>
                <h2 style={styles.title}>Gestionar Entrega</h2>
                <p style={styles.subtitle}>Introduce los datos para completar tu pedido</p>
                
                <div style={styles.inputGroup}>
                    <label style={styles.label}>ID del Pedido</label>
                    <input 
                        type="number" 
                        placeholder="Ej: 45" 
                        style={styles.input}
                        value={idPedido}
                        onChange={(e) => setIdPedido(e.target.value)}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Teléfono de Contacto</label>
                    <input 
                        type="number" 
                        placeholder="Ej: 600123456" 
                        style={styles.input}
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>

                <button 
                    onClick={finalizarYLimpiar}
                    disabled={cargando}
                    style={{
                        ...styles.button,
                        backgroundColor: cargando ? '#94a3b8' : '#2563eb'
                    }}
                >
                    {cargando ? 'Procesando...' : 'Confirmar y Finalizar'}
                </button>
            </div>
        </div>
    );
};

// ESTILOS BONITOS
const styles: { [key: string]: React.CSSProperties } = {
    wrapper: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px', backgroundColor: '#f8fafc' },
    card: { backgroundColor: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '400px' },
    title: { fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px', textAlign: 'center' },
    subtitle: { fontSize: '14px', color: '#64748b', marginBottom: '24px', textAlign: 'center' },
    inputGroup: { marginBottom: '20px' },
    label: { display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '6px' },
    input: { width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none' },
    button: { width: '100%', padding: '14px', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }
};
export default FinalizarPedido;