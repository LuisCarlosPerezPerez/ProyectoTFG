import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ComprarProducto = () => {
    // 1. GESTIÓN DE PARÁMETROS Y NAVEGACIÓN
    const { id: idProducto } = useParams<{ id: string }>(); 
    const navigate = useNavigate();

    // 2. ESTADOS
    const [cliente, setCliente] = useState<any>(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 3. CARGAR SESIÓN AL INICIAR
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

    console.group("%c🚀 INICIANDO COMPRA", "color: #e67e22; font-weight: bold;");
    console.log("Token actual (antes):", cliente);
    console.log("Producto a comprar ID:", idProducto);

    try {
        const response = await fetch(`/api/Cliente/ComprarProducto/${idProducto}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente) 
        });

        if (response.ok) {
            const clienteActualizado = await response.json();
            
            console.log("%c✅ COMPRA EXITOSA", "color: #27ae60; font-weight: bold;");
            console.log("Nuevo Token recibido del servidor:", clienteActualizado);

            // CORRECCIÓN: Guardar el objeto serializado como String
            localStorage.setItem('usuario_sesion', JSON.stringify(clienteActualizado));
            
            // Actualizamos el estado local para que la UI refleje el cambio si fuera necesario
            setCliente(clienteActualizado);

            alert("Producto añadido al pedido correctamente.");
            navigate('/mis-pedidos'); 
        } else {
            const mensajeError = await response.text();
            console.error("Error en respuesta:", mensajeError);
            setError(`Error: ${mensajeError}`);
        }
    } catch (err) {
        console.error("Fallo de red:", err);
        setError("Error de conexión con el servidor.");
    } finally {
        console.groupEnd();
        setCargando(false);
    }
};

    // 5. RENDERIZADO
    if (error && !cliente) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;
    if (!cliente) return <div style={{ padding: '20px' }}>Cargando datos del cliente...</div>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Confirmación de Pedido</h2>
                <hr />
                
                <div style={styles.info}>
                    <p><strong>Usuario:</strong> {cliente.usuario}</p>
                    <p><strong>Producto ID:</strong> {idProducto}</p>
                    <p><strong>Estado del Pedido:</strong> <span style={{color: '#d35400'}}>Pendiente de pago</span></p>
                </div>

                {error && <p style={styles.errorMessage}>{error}</p>}

                <button 
                    onClick={ejecutarCompra} 
                    disabled={cargando}
                    style={{
                        ...styles.button,
                        backgroundColor: cargando ? '#bdc3c7' : '#5d4037',
                        cursor: cargando ? 'not-allowed' : 'pointer'
                    }}
                >
                    {cargando ? 'Procesando Transacción...' : 'Confirmar y Finalizar Compra'}
                </button>

                <button 
                    onClick={() => navigate(-1)} 
                    style={styles.backButton}
                    disabled={cargando}
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

// 6. ESTILOS BÁSICOS (CSS-in-JS)
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: '#f9f9f9'
    },
    card: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px',
        textAlign: 'center'
    },
    title: {
        color: '#5d4037',
        marginBottom: '20px'
    },
    info: {
        textAlign: 'left',
        margin: '20px 0',
        padding: '15px',
        backgroundColor: '#fff8e1',
        borderRadius: '8px'
    },
    button: {
        width: '100%',
        color: 'white',
        padding: '12px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        transition: 'background 0.3s'
    },
    backButton: {
        marginTop: '15px',
        background: 'none',
        border: 'none',
        color: '#7f8c8d',
        textDecoration: 'underline',
        cursor: 'pointer'
    },
    errorMessage: {
        color: '#e74c3c',
        fontSize: '14px',
        marginBottom: '15px'
    }
};

export default ComprarProducto;