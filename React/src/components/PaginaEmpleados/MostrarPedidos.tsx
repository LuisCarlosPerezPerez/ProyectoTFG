import React, { useEffect, useState } from 'react';

export const GestionPedidosEmpleado = () => {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const cargarPedidos = () => {
    setLoading(true);
    fetch(`/api/Empleado/GestionPedidos`)
        .then(res => {
            if (!res.ok) throw new Error("Error en servidor");
            return res.json();
        })
        .then(data => {
            setPedidos(data);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error al cargar:", err);
            setLoading(false);
        });
}

    useEffect(() => {
        cargarPedidos();
    }, []);

    const handleTerminar = async (id: number) => {
        if (!window.confirm(`¿Marcar pedido #${id} como completado?`)) return;

        try {
            const res = await fetch(`api/Empleado/FinalizarPedido/${id}`, {
                method: 'PUT'
            });

            if (res.ok) {
                cargarPedidos(); // Recarga la lista para ver los cambios
            } else {
                alert("No se pudo finalizar el pedido.");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
        }
    };

    const getBadgeStyle = (estado: string) => ({
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '11px',
        fontWeight: 'bold' as const,
        color: 'white',
        backgroundColor: estado === 'Terminado' ? '#7f8c8d' : 
                         estado === 'Realizando...' ? '#27ae60' : '#2980b9'
    });

    if (loading) return <div style={styles.center}>Accediendo al servidor...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Panel de Control: Pedidos Globales</h2>
            <div style={styles.grid}>
                {pedidos.map(p => (
                    <div key={p.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <span style={styles.idText}>ORDEN #{p.id}</span>
                            <span style={getBadgeStyle(p.estado)}>{p.estado}</span>
                        </div>
                        
                        <div style={styles.cardBody}>
                            <div style={styles.dataRow}>
                                <strong>👤 Cliente:</strong> 
                                <span style={styles.clientName}>{p.nombre_cliente}</span>
                            </div>
                            <div style={styles.dataRow}>
                                <strong>📅 Entrega:</strong> <span>{p.entrega}</span>
                            </div>
                            <div style={styles.dataRow}>
                                <strong>📞 Contacto:</strong> 
                                <span>{p.telefono === 0 || p.telefono === "No disponible" ? "🔒 Privado" : p.telefono}</span>
                            </div>
                            <div style={styles.dataRow}>
                                <strong>🛒 Productos:</strong> <span>{p.productos?.length} uds.</span>
                            </div>

                            {p.estado !== 'Terminado' && (
                                <button onClick={() => handleTerminar(p.id)} style={styles.finishBtn}>
                                    FINALIZAR Y ARCHIVAR
                                </button>
                            )}
                        </div>

                        <div style={styles.cardFooter}>
                            <span style={styles.totalLabel}>TOTAL PAGADO</span>
                            <span style={styles.totalAmount}>{p.preciototal?.toFixed(2)}€</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { padding: '40px 20px', backgroundColor: '#f0f2f5', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' },
    title: { textAlign: 'center', color: '#1a1a1a', marginBottom: '35px', letterSpacing: '-1px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px', maxWidth: '1300px', margin: '0 auto' },
    card: { backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', border: '1px solid #e1e4e8' },
    cardHeader: { padding: '18px 20px', borderBottom: '1px solid #f0f2f5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    idText: { fontWeight: '800', color: '#8b949e', fontSize: '13px' },
    cardBody: { padding: '20px', flexGrow: 1 },
    dataRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '14px', color: '#444' },
    clientName: { color: '#2ecc71', fontWeight: 'bold' },
    finishBtn: { marginTop: '10px', width: '100%', padding: '12px', backgroundColor: '#2c3e50', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' },
    cardFooter: { padding: '15px 20px', backgroundColor: '#fafbfc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    totalLabel: { fontSize: '10px', color: '#a3aab1', fontWeight: 'bold' },
    totalAmount: { fontSize: '20px', fontWeight: '800', color: '#1a1a1a' },
    center: { textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#666' }
};

export default GestionPedidosEmpleado