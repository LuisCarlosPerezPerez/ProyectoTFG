import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Producto } from '../../Types/producto';

export const FinalizarPedido = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [fecha, setFecha] = useState("");
    const [telefono, setTelefono] = useState("");
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const sesion = localStorage.getItem('usuario_sesion');
    const cliente = sesion ? JSON.parse(sesion) : null;

    const obtenerFechaMinima = () => {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() + 3);
        return fechaLimite.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (cliente) {
            fetch(`/api/Cliente/DetallesPedidoPendiente/${cliente.id}`)
                .then(res => res.json())
                .then((data: any[]) => {
                    const mapeados = data.map(p => ({
                        ...p,
                        cantidad: Number(p.cantidad) || 1
                    }));
                    setProductos(mapeados);
                })
                .catch(err => console.error("Error cargando productos:", err));
        }
    }, [cliente?.id]);

    const cambiarCantidad = (id_producto: number, delta: number) => {
        if (id_producto === undefined) return; // Si no hay ID, no hacemos nada
        setProductos(prev => prev.map(p => {
            if (p.id_producto === id_producto) {
                const nuevaCant = (p.cantidad || 0) + delta;
                if (nuevaCant < 1) return p;
                if (nuevaCant > p.stock) {
                    alert(`Solo hay ${p.stock} unidades de ${p.nombre} en stock.`);
                    return p;
                }
                return { ...p, cantidad: nuevaCant };
            }
            return p;
        }));
    };

    const generarPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Resumen de Pedido - Pastelería Lama", 14, 20);
        doc.setFontSize(11);
        doc.text(`Cliente: ${cliente.usuario}`, 14, 30);
        doc.text(`Fecha Entrega: ${fecha}`, 14, 35);
        doc.text(`Teléfono: ${telefono}`, 14, 40);

        const tableRows = productos.map(p => [
            p.nombre, 
            `${p.precio}€`, 
            p.cantidad, 
            `${(p.precio * p.cantidad).toFixed(2)}€`
        ]);

        autoTable(doc, {
            startY: 50,
            head: [['Producto', 'Precio Unit.', 'Cantidad', 'Subtotal']],
            body: tableRows,
            theme: 'striped',
            headStyles: { fillColor: [233, 30, 99] }
        });

        const totalFinal = productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
        const finalY = (doc as any).lastAutoTable.finalY;
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(`TOTAL: ${totalFinal.toFixed(2)}€`, 140, finalY + 15);
        doc.save(`Pedido_${cliente.usuario}.pdf`);
    };

    const finalizarTodo = async () => {
        const fechaMin = obtenerFechaMinima();
        if (!fecha || !telefono) return alert("Rellena todos los campos");
        if (fecha < fechaMin) return alert("Mínimo 3 días de margen para la entrega.");
        
        setCargando(true);
        try {
            const res = await fetch(`/api/Cliente/FinalizarPedidoAutomatico?fecha=${fecha}&telefono=${telefono}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    clienteToken: cliente,
                    productosActualizados: productos 
                })
            });

            if (res.ok) {
                const nuevoToken = await res.json();
                generarPDF();
                localStorage.setItem('usuario_sesion', JSON.stringify(nuevoToken));
                alert("¡Pedido realizado con éxito! Se ha descargado su ticket.");
                navigate('/mis-pedidos');
            } else {
                const errorMsg = await res.text();
                alert(`Error: ${errorMsg}`);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setCargando(false);
        }
    };

    const totalCalculado = productos.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    return (
        <main style={Estilos.pantalla}>
            <section style={Estilos.tarjeta} aria-labelledby="finalizar-titulo">
                <div style={Estilos.barraRosa} aria-hidden="true"></div>

                <header style={Estilos.encabezado}>
                    <span style={Estilos.tagline} aria-hidden="true">TU SELECCIÓN GOURMET</span>
                    <h1 style={Estilos.logo}>
                        Pastelería <span style={{ color: '#E91E63' }}>Lama</span>
                    </h1>
                    <div style={Estilos.divisor} aria-hidden="true"></div>
                    <h2 id="finalizar-titulo" style={Estilos.titulo}>CESTA DE PRODUCTOS</h2>
                    <p style={Estilos.subtitulo}>Revise su selección antes de hornear su encargo</p>
                </header>

                <div style={Estilos.listaProductos} role="list" aria-label="Productos en el carrito">
                    {productos.map((prod) => (
                        <article key={prod.id_producto} style={Estilos.filaProducto} role="listitem">
                            <div style={Estilos.infoProducto}>
                                <span style={Estilos.nombreProducto}>{prod.nombre}</span>
                                <span style={Estilos.metaProducto}>
                                    {prod.precio.toFixed(2)}€ · <span style={Estilos.stockTag}>Stock: {prod.stock}</span>
                                </span>
                            </div>
                            
                            <div style={Estilos.controles}>
                                <button 
                                    style={Estilos.btnAccion} 
                                    onClick={() => cambiarCantidad(prod.id_producto!, -1)}
                                >
                                    −
                                </button>
                                <span style={Estilos.cantidad}>{prod.cantidad}</span>
                                <button 
                                    style={Estilos.btnAccion} 
                                    onClick={() => cambiarCantidad(prod.id_producto!, 1)}
                                >
                                    +
                                </button>
                            </div>
                        </article>
                    ))}
                </div>

                <div style={Estilos.seccionFinal}>
                    <div style={Estilos.contenedorInputs}>
                        <div style={Estilos.campo}>
                            <label htmlFor="fecha" style={Estilos.etiqueta}>FECHA DE RECOGIDA</label>
                            <input 
                                id="fecha"
                                type="date" 
                                min={obtenerFechaMinima()} 
                                style={Estilos.input} 
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>

                        <div style={Estilos.campo}>
                            <label htmlFor="tel" style={Estilos.etiqueta}>TELÉFONO DE CONTACTO</label>
                            <input 
                                id="tel"
                                type="tel" 
                                placeholder="600 000 000" 
                                style={Estilos.input} 
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={Estilos.resumen}>
                        <div style={Estilos.filaResumen}>
                            <span>Base del pedido</span>
                            <span>{totalCalculado.toFixed(2)}€</span>
                        </div>
                        <div style={Estilos.filaResumen}>
                            <span>Gastos de gestión</span>
                            <span style={{ color: '#E91E63', fontWeight: 'bold' }}>Bonificado</span>
                        </div>
                        <div style={Estilos.filaTotal}>
                            <span>TOTAL A PAGAR</span>
                            <span>{totalCalculado.toFixed(2)}€</span>
                        </div>
                    </div>

                    <button 
                        style={{
                            ...Estilos.botonPrincipal,
                            backgroundColor: cargando ? '#F06292' : '#E91E63',
                        }} 
                        onClick={finalizarTodo} 
                        disabled={cargando}
                    >
                        {cargando ? "PROCESANDO ENCARGO..." : "CONFIRMAR Y DESCARGAR TICKET"}
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
        boxShadow: '0 20px 50px rgba(233, 30, 99, 0.1)', 
        width: '100%', 
        maxWidth: '550px', 
        border: '1px solid #fce4ec',
        borderRadius: '24px',
        overflow: 'hidden'
    },
    barraRosa: {
        height: '10px',
        backgroundColor: '#E91E63',
        width: '100%'
    },
    encabezado: { padding: '40px 40px 20px', textAlign: 'center' },
    tagline: {
        display: 'block',
        letterSpacing: '3px',
        fontSize: '0.75rem',
        color: '#E91E63',
        fontWeight: '700',
        marginBottom: '10px'
    },
    logo: { color: '#333', fontSize: '2.2rem', margin: '0 0 5px 0', fontWeight: '800', letterSpacing: '-1px' },
    divisor: { width: '40px', height: '4px', backgroundColor: '#E91E63', margin: '15px auto', borderRadius: '2px' },
    titulo: { color: '#333', fontSize: '1.3rem', fontWeight: '700', margin: 0 },
    subtitulo: { color: '#666', fontSize: '0.95rem', margin: '8px 0 0' },
    listaProductos: { 
        padding: '10px 40px', 
        maxHeight: '300px', 
        overflowY: 'auto'
    },
    filaProducto: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '15px 0', 
        borderBottom: '1px solid #fff5f8' 
    },
    infoProducto: { display: 'flex', flexDirection: 'column' },
    nombreProducto: { fontWeight: '700', color: '#333', fontSize: '1.05rem' },
    metaProducto: { fontSize: '0.9rem', color: '#666', marginTop: '4px' },
    stockTag: { color: '#E91E63', fontWeight: '600' },
    controles: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px', 
        backgroundColor: '#fff9fa',
        padding: '6px 14px',
        borderRadius: '12px',
        border: '1px solid #fce4ec'
    },
    btnAccion: { 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer', 
        fontSize: '1.3rem', 
        color: '#E91E63',
        padding: '0 5px',
        fontWeight: 'bold'
    },
    cantidad: { fontWeight: '800', minWidth: '24px', textAlign: 'center', color: '#333' },
    seccionFinal: { padding: '30px 40px 40px' },
    contenedorInputs: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '25px' },
    campo: { display: 'flex', flexDirection: 'column', gap: '8px' },
    etiqueta: { fontSize: '0.75rem', fontWeight: '700', color: '#E91E63', letterSpacing: '0.5px' },
    input: { 
        padding: '14px', 
        border: '2px solid #f0f0f0', 
        fontSize: '0.95rem', 
        borderRadius: '12px',
        color: '#333',
        backgroundColor: '#fafafa',
        outline: 'none'
    },
    resumen: { 
        backgroundColor: '#fff9fa', 
        padding: '25px', 
        borderRadius: '16px',
        marginBottom: '25px',
        border: '1px dashed #E91E63'
    },
    filaResumen: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', color: '#666', marginBottom: '10px' },
    filaTotal: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '1.4rem', 
        fontWeight: '800', 
        color: '#333', 
        marginTop: '15px', 
        paddingTop: '15px', 
        borderTop: '1px solid rgba(233, 30, 99, 0.1)' 
    },
    botonPrincipal: { 
        width: '100%', 
        padding: '20px', 
        color: 'white', 
        border: 'none', 
        fontSize: '1rem', 
        fontWeight: '700', 
        cursor: 'pointer', 
        borderRadius: '14px',
        transition: 'all 0.3s ease',
        boxShadow: '0 8px 25px rgba(233, 30, 99, 0.2)'
    }
};

export default FinalizarPedido;