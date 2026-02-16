import React, { useEffect, useState } from 'react';
import type { Pedido } from '../../Types/Pedido';
import { Link } from 'react-router-dom';

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

    if (loading) return <div style={Estilos.cargando}>Consultando nuestro libro de pedidos...</div>;

    return (
        <main style={Estilos.pantalla}>
            <header style={Estilos.cabeceraPagina}>
                <span style={Estilos.tagline} aria-hidden="true">TU SELECCIÓN EXCLUSIVA</span>
                <h1 style={Estilos.logo}>
                    Pastelería <span style={{ color: '#E91E63' }}>Lama</span>
                </h1>
                <div style={Estilos.divisor} aria-hidden="true"></div>
                <h2 style={Estilos.tituloPagina}>MI HISTORIAL DE DULCES</h2>
                <p style={Estilos.subtituloPagina}>Revise sus pedidos actuales y pasados en nuestro obrador</p>
            </header>

            <section style={Estilos.listado} aria-label="Lista de pedidos realizados">
                {pedidos.length > 0 ? pedidos.map(p => (
                    <article key={p.id} style={Estilos.tarjeta} aria-labelledby={`pedido-h-${p.id}`}>
                        <div style={Estilos.tarjetaEncabezado}>
                            <div style={Estilos.refBox}>
                                <span style={Estilos.refEtiqueta}>REFERENCIA</span>
                                <h3 id={`pedido-h-${p.id}`} style={Estilos.refId}>#{p.id}</h3>
                            </div>
                            <span style={{
                                ...Estilos.badge,
                                backgroundColor: p.estado === 'Terminado' ? '#4CAF50' : '#E91E63'
                            }}>
                                {p.estado.toUpperCase()}
                            </span>
                        </div>

                        <div style={Estilos.tarjetaCuerpo}>
                            <div style={Estilos.infoFila}>
                                <span style={Estilos.icono} aria-hidden="true">📅</span>
                                <div style={Estilos.textoContenedor}>
                                    <span style={Estilos.miniEtiqueta}>ENTREGA ESTIMADA</span>
                                    <span style={Estilos.valor}>{p.entrega || "En preparación..."}</span>
                                </div>
                            </div>

                            <div style={Estilos.infoFila}>
                                <span style={Estilos.icono} aria-hidden="true">🥐</span>
                                <div style={Estilos.textoContenedor}>
                                    <span style={Estilos.miniEtiqueta}>TU CESTA</span>
                                    <span style={Estilos.valor}>{p.productos?.length || 0} artículos artesanos</span>
                                </div>
                            </div>
                        </div>

                        <footer style={Estilos.tarjetaPie}>
                            <span style={Estilos.totalTexto}>TOTAL PAGADO</span>
                            <span style={Estilos.totalPrecio}>{p.preciototal?.toFixed(2)}€</span>
                        </footer>
                    </article>
                )) : (
                    <div style={Estilos.estadoVacio}>
                        <div style={Estilos.contenedorIconoVacio} aria-hidden="true">🧁</div>
                        <p style={Estilos.textoVacio}>Aún no ha realizado ningún pedido en nuestro obrador.</p>
                        <Link to="/productos" style={Estilos.linkTienda}>DESCUBRIR ESPECIALIDADES</Link>
                    </div>
                )}
            </section>
        </main>
    );
};

const Estilos: { [key: string]: React.CSSProperties } = {
    pantalla: { 
        backgroundColor: '#FFFFFF', 
        backgroundImage: 'linear-gradient(180deg, #fff5f8 0%, #ffffff 400px)',
        minHeight: '100vh', 
        padding: '60px 20px',
        fontFamily: "'Montserrat', sans-serif"
    },
    cabeceraPagina: { textAlign: 'center', marginBottom: '50px' },
    tagline: {
        display: 'block',
        letterSpacing: '3px',
        fontSize: '0.75rem',
        color: '#E91E63',
        fontWeight: '700',
        marginBottom: '10px'
    },
    logo: { 
        color: '#333', 
        fontSize: '2.2rem', 
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
    tituloPagina: { 
        fontSize: '1.4rem', 
        color: '#333', 
        fontWeight: '700',
        marginTop: '10px'
    },
    subtituloPagina: { 
        color: '#666', 
        fontSize: '1rem', 
        marginTop: '8px'
    },
    listado: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '25px', 
        maxWidth: '500px', 
        margin: '0 auto' 
    },
    tarjeta: { 
        backgroundColor: '#fff', 
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(233, 30, 99, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: '1px solid #fce4ec'
    },
    tarjetaEncabezado: { 
        padding: '20px 25px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: '#fff9fa'
    },
    refBox: { display: 'flex', flexDirection: 'column' },
    refEtiqueta: { 
        fontSize: '0.65rem', 
        fontWeight: '800', 
        color: '#E91E63', 
        letterSpacing: '1px' 
    },
    refId: { 
        fontSize: '1.3rem', 
        margin: 0, 
        color: '#333',
        fontWeight: '800'
    },
    badge: { 
        padding: '8px 16px', 
        color: 'white', 
        fontSize: '0.75rem', 
        fontWeight: '700', 
        borderRadius: '12px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
    },
    tarjetaCuerpo: { padding: '25px' },
    infoFila: { 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '15px', 
        gap: '15px' 
    },
    icono: { 
        fontSize: '1.4rem',
        backgroundColor: '#fff',
        padding: '8px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
    },
    textoContenedor: { display: 'flex', flexDirection: 'column' },
    miniEtiqueta: { 
        fontSize: '0.7rem', 
        color: '#999', 
        fontWeight: '700', 
        letterSpacing: '0.5px' 
    },
    valor: { 
        fontSize: '1rem', 
        color: '#333', 
        fontWeight: '600' 
    },
    tarjetaPie: { 
        padding: '20px 25px', 
        borderTop: '1px solid #fce4ec', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    totalTexto: { 
        fontSize: '0.8rem', 
        fontWeight: '700', 
        color: '#333'
    },
    totalPrecio: { 
        fontSize: '1.8rem', 
        fontWeight: '800', 
        color: '#E91E63' 
    },
    estadoVacio: { 
        textAlign: 'center', 
        padding: '60px 40px', 
        backgroundColor: '#fff',
        borderRadius: '24px',
        border: '2px dashed #fce4ec'
    },
    contenedorIconoVacio: {
        fontSize: '4rem',
        marginBottom: '20px'
    },
    textoVacio: {
        color: '#333',
        fontSize: '1.1rem',
        marginBottom: '30px',
        fontWeight: '600'
    },
    linkTienda: { 
        color: '#fff', 
        backgroundColor: '#E91E63',
        fontWeight: '700', 
        textDecoration: 'none', 
        fontSize: '0.9rem',
        padding: '16px 30px',
        borderRadius: '14px',
        display: 'inline-block',
        boxShadow: '0 8px 20px rgba(233, 30, 99, 0.2)',
        transition: 'transform 0.2s ease'
    }
};

export default MisPedidos;