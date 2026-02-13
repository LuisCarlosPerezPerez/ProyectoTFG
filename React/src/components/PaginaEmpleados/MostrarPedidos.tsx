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

    if (loading) return <div style={styles.center}>Accediendo al servidor...</div>;

    return (
        <main style={styles.container}>
            <header style={styles.header}>
                <span style={styles.marcaSuperior} aria-hidden="true">ÁREA DE PERSONAL</span>
                <h1 style={styles.title}>
                    GESTIÓN DE <span style={{ color: '#E91E63' }}>PEDIDOS</span>
                </h1>
                <div style={styles.divisor} aria-hidden="true"></div>
                <p style={styles.subtitle}>Control de producción y entregas — Obrador Lama</p>
            </header>

            <section style={styles.grid} aria-label="Listado de pedidos activos">
                {pedidos.length === 0 ? (
                    <div style={styles.center}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🥐</div>
                        No hay pedidos pendientes en el obrador.
                    </div>
                ) : (
                    pedidos.map(p => (
                        <article key={p.id} style={styles.card} aria-labelledby={`order-${p.id}`}>
                            <div style={styles.cardHeader}>
                                <h2 id={`order-${p.id}`} style={styles.idText}>ORDEN #{p.id}</h2>
                                <span style={{
                                    ...styles.badge,
                                    backgroundColor: p.estado === 'Terminado' ? '#666' : '#E91E63'
                                }}>
                                    {p.estado.toUpperCase()}
                                </span>
                            </div>
                            
                            <div style={styles.cardBody}>
                                <div style={styles.dataRow}>
                                    <span style={styles.label}>CLIENTE</span>
                                    <span style={styles.value}>{p.nombre_cliente}</span>
                                </div>
                                <div style={styles.dataRow}>
                                    <span style={styles.label}>ENTREGA</span>
                                    <span style={styles.value}>{p.entrega}</span>
                                </div>
                                <div style={styles.dataRow}>
                                    <span style={styles.label}>TELÉFONO</span>
                                    <span style={styles.value}>
                                        {(!p.telefono || p.telefono === "0") ? "PRIVADO" : p.telefono}
                                    </span>
                                </div>
                                <div style={styles.dataRow}>
                                    <span style={styles.label}>VOLUMEN</span>
                                    <span style={styles.value}>{p.productos?.length || 0} ARTÍCULOS</span>
                                </div>

                                {p.estado !== 'Terminado' && (
                                    <button 
                                        onClick={() => handleTerminar(p.id)} 
                                        style={styles.finishBtn}
                                        aria-label={`Finalizar pedido ${p.id}`}
                                    >
                                        LISTO PARA RECOGER
                                    </button>
                                )}
                            </div>

                            <footer style={styles.cardFooter}>
                                <span style={styles.totalLabel}>TOTAL A PAGAR</span>
                                <span style={styles.totalAmount}>{p.preciototal?.toFixed(2)}€</span>
                            </footer>
                        </article>
                    ))
                )}
            </section>
        </main>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { 
        padding: '60px 20px', 
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle, #ffffff 0%, #fff5f8 100%)',
        minHeight: '100vh', 
        fontFamily: "'Montserrat', sans-serif" 
    },
    header: { textAlign: 'center', marginBottom: '50px' },
    marcaSuperior: {
        display: 'block',
        letterSpacing: '3px',
        fontSize: '0.75rem',
        color: '#E91E63',
        fontWeight: '700',
        marginBottom: '10px'
    },
    title: { 
        color: '#333', 
        fontSize: '2.2rem', 
        letterSpacing: '-1px', 
        margin: 0, 
        fontWeight: '800' 
    },
    divisor: { 
        width: '40px', 
        height: '4px', 
        backgroundColor: '#E91E63', 
        margin: '20px auto',
        borderRadius: '2px'
    },
    subtitle: { 
        color: '#666', 
        fontSize: '1rem',
        fontWeight: '500'
    },
    grid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', 
        gap: '30px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
    },
    card: { 
        backgroundColor: '#fff', 
        border: '1px solid #fce4ec', 
        borderRadius: '24px',
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(233, 30, 99, 0.06)',
        transition: 'transform 0.2s ease'
    },
    cardHeader: { 
        padding: '20px 25px', 
        backgroundColor: '#fff9fa',
        borderBottom: '1px solid #fce4ec', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    idText: { 
        fontWeight: '800', 
        color: '#333', 
        fontSize: '0.85rem', 
        margin: 0, 
        letterSpacing: '1px' 
    },
    badge: { 
        padding: '6px 14px', 
        color: 'white', 
        fontSize: '0.65rem', 
        fontWeight: '800', 
        borderRadius: '12px',
        letterSpacing: '1px' 
    },
    cardBody: { padding: '25px', flexGrow: 1 },
    dataRow: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '14px', 
        borderBottom: '1px solid #fcfcfc', 
        paddingBottom: '8px' 
    },
    label: { 
        fontSize: '0.7rem', 
        color: '#E91E63', 
        fontWeight: '700', 
        letterSpacing: '0.5px' 
    },
    value: { 
        fontSize: '0.95rem', 
        color: '#333', 
        fontWeight: '600' 
    },
    finishBtn: { 
        marginTop: '20px', 
        width: '100%', 
        padding: '16px', 
        backgroundColor: '#333', // Negro para botones de acción de staff
        color: 'white', 
        border: 'none', 
        fontWeight: '700', 
        cursor: 'pointer', 
        borderRadius: '14px',
        fontSize: '0.85rem',
        letterSpacing: '1px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
    },
    cardFooter: { 
        padding: '20px 25px', 
        backgroundColor: '#fff', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderTop: '1px solid #fce4ec' 
    },
    totalLabel: { 
        fontSize: '0.75rem', 
        color: '#666', 
        fontWeight: '700' 
    },
    totalAmount: { 
        fontSize: '1.5rem', 
        fontWeight: '800', 
        color: '#E91E63' 
    },
    center: { 
        gridColumn: '1 / -1', 
        textAlign: 'center', 
        padding: '100px 0', 
        fontSize: '1.2rem', 
        color: '#E91E63',
        fontWeight: '600'
    }
};

export default GestionPedidosEmpleado;