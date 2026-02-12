import React, { useEffect, useState } from 'react';
import type { Pedido } from '../../Types/Pedido';

export const MisPedidos = () => {
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [loading, setLoading] = useState(true);

    const sesion = localStorage.getItem('usuario_sesion');
    const cliente = sesion ? JSON.parse(sesion) : null;

    useEffect(() => {
        if (cliente?.id) {
            fetch(`/api/Cliente/HistorialPedidos/${cliente.id}`)
                .then(res => res.json())
                .then((data: Pedido[]) => {
                    setPedidos(data.sort((a, b) => b.id - a.id));
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [cliente?.id]);

    const getBadgeStyle = (estado: string) => ({
        padding: '5px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold' as const,
        color: 'white',
        backgroundColor: estado === 'Realizando...' ? '#27ae60' : '#2980b9' // Verde para finalizado, Azul para proceso
    });

    if (loading) return <div style={styles.center}>Cargando historial de actividad...</div>;

return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={styles.mainTitle}>Mis Pedidos</h2>
                <p style={styles.subtitle}>Gestiona y revisa el estado de tus pedidos recientes</p>

                <div style={styles.list}>
                    {pedidos.length > 0 ? pedidos.map(p => (
                        <div key={p.id} style={styles.card}>
                            {/* Cabecera de la Tarjeta */}
                            <div style={styles.cardHeader}>
                                <div style={styles.refGroup}>
                                    <span style={styles.refLabel}>REFERENCIA</span>
                                    <span style={styles.refNumber}>#{p.id}</span>
                                </div>
                                <span style={styles.refNumber}>{p.estado}</span>
                            </div>

                            {/* Cuerpo de la Tarjeta */}
                            <div style={styles.cardBody}>
                                <div style={styles.infoRow}>
                                    <div style={styles.iconBox}>📅</div>
                                    <div style={styles.textGroup}>
                                        <span style={styles.label}>Fecha de Entrega</span>
                                        <span style={styles.value}>{p.entrega || "Pendiente de asignar"}</span>
                                    </div>
                                </div>

                                <div style={styles.infoRow}>
                                    <div style={styles.iconBox}>📞</div>
                                    <div style={styles.textGroup}>
                                        <span style={styles.label}>Teléfono de Contacto</span>
                                        <span style={styles.value}>{p.telefono || "No especificado"}</span>
                                    </div>
                                </div>

                                <div style={styles.infoRow}>
                                    <div style={styles.iconBox}>🛒</div>
                                    <div style={styles.textGroup}>
                                        <span style={styles.label}>Contenido del Pedido</span>
                                        <span style={styles.value}>{p.productos.length} productos en total</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pie de la Tarjeta */}
                            <div style={styles.cardFooter}>
                                <span style={styles.totalLabel}>TOTAL ACUMULADO</span>
                                <span style={styles.totalValue}>{p.preciototal?.toFixed(2)}€</span>
                            </div>
                        </div>
                    )) : (
                        <div style={styles.emptyState}>
                            <div style={{fontSize: '50px'}}>🥐</div>
                            <p>Parece que aún no has realizado ningún pedido.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    wrapper: { backgroundColor: '#fdfbf9', minHeight: '100vh', padding: '40px 20px' },
    container: { maxWidth: '550px', margin: '0 auto' },
    mainTitle: { textAlign: 'center', color: '#5d4037', fontSize: '32px', marginBottom: '8px', fontWeight: '800' },
    subtitle: { textAlign: 'center', color: '#8d7970', marginBottom: '40px', fontSize: '15px' },
    list: { display: 'flex', flexDirection: 'column', gap: '25px' },
    card: { 
        backgroundColor: '#fff', 
        borderRadius: '20px', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.04)', 
        border: '1px solid #f0e6e0', 
        overflow: 'hidden',
        transition: 'transform 0.2s ease'
    },
    cardHeader: { 
        padding: '18px 25px', 
        borderBottom: '1px solid #f9f5f2', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#fffaf7'
    },
    refGroup: { display: 'flex', flexDirection: 'column' },
    refLabel: { fontSize: '10px', fontWeight: 'bold', color: '#bcaaa4', letterSpacing: '1px' },
    refNumber: { fontSize: '18px', fontWeight: 'bold', color: '#5d4037' },
    cardBody: { padding: '25px' },
    infoRow: { display: 'flex', alignItems: 'center', marginBottom: '18px', gap: '15px' },
    iconBox: { 
        width: '40px', 
        height: '40px', 
        backgroundColor: '#fff4f0', 
        borderRadius: '12px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        fontSize: '20px'
    },
    textGroup: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '11px', color: '#a1887f', fontWeight: 'bold', textTransform: 'uppercase' },
    value: { fontSize: '15px', color: '#4e342e', fontWeight: '600' },
    cardFooter: { 
        padding: '18px 25px', 
        backgroundColor: '#fff', 
        borderTop: '2px dashed #f9f5f2', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
    },
    totalLabel: { fontSize: '12px', fontWeight: '800', color: '#8d7970' },
    totalValue: { fontSize: '24px', fontWeight: '900', color: '#2ecc71' },
    emptyState: { textAlign: 'center', padding: '60px', color: '#bcaaa4' },
    loader: { textAlign: 'center', marginTop: '100px', fontSize: '18px', color: '#8d7970', fontWeight: 'bold' }
};

export default MisPedidos;