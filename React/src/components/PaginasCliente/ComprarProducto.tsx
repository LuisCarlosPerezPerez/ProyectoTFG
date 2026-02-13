import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ComprarProducto = () => {
    const { id: idProducto } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

    const [cliente, setCliente] = useState<any>(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const sesion = localStorage.getItem('usuario_sesion');
        if (sesion) {
            try {
                setCliente(JSON.parse(sesion));
            } catch (e) {
                console.error("Error al parsear la sesión", e);
                setError("Error al cargar los datos del usuario.");
            }
        } else {
            setError("No has iniciado sesión. Redirigiendo...");
            setTimeout(() => navigate('/login'), 2000);
        }
    }, [navigate]);

    const ejecutarCompra = async () => {
        if (!cliente || !idProducto) return;

        setCargando(true);
        setError(null);

        try {
            const response = await fetch(`/api/Cliente/ComprarProducto/${idProducto}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente) 
            });

            if (response.ok) {
                const clienteActualizado = await response.json();
                localStorage.setItem('usuario_sesion', JSON.stringify(clienteActualizado));
                setCliente(clienteActualizado);
                alert("Producto añadido al pedido correctamente.");
                navigate('/mis-pedidos'); 
            } else {
                const mensajeError = await response.text();
                setError(`Error: ${mensajeError}`);
            }
        } catch (err) {
            setError("Error de conexión con el servidor.");
        } finally {
            setCargando(false);
        }
    };

    if (error && !cliente) return <div style={Estilos.errorPantalla} role="alert">{error}</div>;
    if (!cliente) return <div style={Estilos.cargandoPantalla}>Preparando su pedido...</div>;

    return (
        <main style={Estilos.pantalla}>
            <section style={Estilos.tarjeta} aria-labelledby="confirm-title">
                {/* Barra decorativa rosa vibrante */}
                <div style={Estilos.barraRosa} aria-hidden="true"></div>

                <header style={Estilos.header}>
                    <h1 id="confirm-title" style={Estilos.logo}>
                        Pastelería <span style={{ color: '#E91E63' }}>Lama</span>
                    </h1>
                    <div style={Estilos.divisor} aria-hidden="true"></div>
                    <h2 style={Estilos.titulo}>CONFIRMACIÓN DE PEDIDO</h2>
                    <p style={Estilos.subtitulo}>Por favor, verifique los datos de su encargo artesano</p>
                </header>

                <div style={Estilos.ticket} role="region" aria-label="Resumen del pedido">
                    <div style={Estilos.filaInfo}>
                        <span style={Estilos.etiqueta}>CLIENTE</span>
                        <span style={Estilos.valor}>{cliente?.usuario?.toUpperCase() || "INVITADO"}</span>
                    </div>
                    <div style={Estilos.filaInfo}>
                        <span style={Estilos.etiqueta}>REF. PRODUCTO</span>
                        <span style={Estilos.valor}>#{idProducto}</span>
                    </div>
                    <div style={Estilos.filaInfo}>
                        <span style={Estilos.etiqueta}>ESTADO</span>
                        <span style={Estilos.valorEstado}>PENDIENTE DE PAGO</span>
                    </div>
                </div>

                {error && (
                    <div style={Estilos.contenedorError} role="alert">
                        <p style={Estilos.mensajeError}>
                            <strong>Aviso:</strong> {error}
                        </p>
                    </div>
                )}

                <div style={Estilos.acciones}>
                    <button 
                        onClick={ejecutarCompra} 
                        disabled={cargando}
                        style={{
                            ...Estilos.botonConfirmar,
                            backgroundColor: cargando ? '#F06292' : '#E91E63',
                            opacity: cargando ? 0.7 : 1
                        }}
                        aria-live="polite"
                    >
                        {cargando ? 'PROCESANDO...' : 'CONFIRMAR Y FINALIZAR'}
                    </button>

                    <button 
                        onClick={() => navigate(-1)} 
                        style={Estilos.botonCancelar}
                        disabled={cargando}
                    >
                        MODIFICAR PEDIDO
                    </button>
                </div>
            </section>
        </main>
    );
};

const Estilos: { [key: string]: React.CSSProperties } = {
    pantalla: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
        backgroundImage: 'radial-gradient(circle, #ffffff 0%, #fff5f8 100%)',
        padding: '20px',
        fontFamily: "'Montserrat', sans-serif"
    },
    tarjeta: {
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: '480px',
        borderRadius: '24px',
        boxShadow: '0 20px 40px rgba(233, 30, 99, 0.08)',
        overflow: 'hidden',
        border: '1px solid #fce4ec',
        textAlign: 'center',
        position: 'relative'
    },
    barraRosa: {
        height: '10px',
        backgroundColor: '#E91E63',
        width: '100%'
    },
    header: {
        padding: '40px 40px 20px 40px'
    },
    logo: {
        color: '#333',
        fontSize: '2rem',
        margin: '0',
        fontWeight: '800',
        letterSpacing: '-1px'
    },
    divisor: {
        width: '40px',
        height: '3px',
        backgroundColor: '#E91E63',
        margin: '15px auto'
    },
    titulo: {
        color: '#333',
        fontSize: '1.2rem',
        fontWeight: '700',
        margin: '10px 0 5px 0'
    },
    subtitulo: {
        color: '#666',
        fontSize: '0.9rem',
        marginBottom: '10px'
    },
    ticket: {
        backgroundColor: '#fff9fa',
        margin: '0 40px 30px 40px',
        padding: '25px',
        borderRadius: '16px',
        border: '1px dashed #E91E63',
        textAlign: 'left'
    },
    filaInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '12px',
        borderBottom: '1px solid rgba(233, 30, 99, 0.1)',
        paddingBottom: '8px'
    },
    etiqueta: {
        fontSize: '0.75rem',
        color: '#E91E63',
        fontWeight: '700',
        letterSpacing: '0.5px'
    },
    valor: {
        fontSize: '0.9rem',
        color: '#333',
        fontWeight: '600'
    },
    valorEstado: {
        fontSize: '0.85rem',
        color: '#C2185B', // Rosa más oscuro para cumplir contraste WAVE
        fontWeight: '800'
    },
    acciones: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '0 40px 40px 40px'
    },
    botonConfirmar: {
        width: '100%',
        padding: '18px',
        color: '#FFF',
        border: 'none',
        fontWeight: '700',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 15px rgba(233, 30, 99, 0.2)'
    },
    botonCancelar: {
        background: 'none',
        border: '2px solid #f0f0f0',
        color: '#888',
        padding: '14px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '600',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
    },
    contenedorError: {
        backgroundColor: '#FFF5F5',
        border: '1px solid #FFDADA',
        margin: '0 40px 20px 40px',
        padding: '12px',
        borderRadius: '8px'
    },
    mensajeError: {
        color: '#D32F2F',
        fontSize: '0.85rem',
        margin: '0',
        fontWeight: '600'
    }
};

export default ComprarProducto;