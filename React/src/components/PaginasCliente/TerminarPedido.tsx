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
        setProductos(prev => prev.map(p => {
            if (p.id_producto === id_producto) {
                const nuevaCant = p.cantidad + delta;
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
            headStyles: { fillColor: [93, 64, 55] }
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
                alert("¡Pedido realizado con éxito!");
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
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Finalizar Pedido</h2>
                    <p style={styles.subtitle}>Revisa tus productos y detalles de entrega</p>
                    <div style={styles.headerLine}></div>
                </div>

                <div style={styles.productList}>
                    {productos.map((prod) => (
                        <div key={prod.id_producto} style={styles.productRow}>
                            <div style={styles.productMain}>
                                <span style={styles.productName}>{prod.nombre}</span>
                                <span style={styles.productMeta}>
                                    {prod.precio.toFixed(2)}€/ud · <span style={styles.stockText}>Stock: {prod.stock}</span>
                                </span>
                            </div>
                            
                            <div style={styles.controlWrapper}>
                                <button 
                                    style={styles.minusBtn} 
                                    onClick={() => cambiarCantidad(prod.id_producto!, -1)}
                                >
                                    <span>−</span>
                                </button>
                                <span style={styles.qtyDisplay}>{prod.cantidad}</span>
                                <button 
                                    style={styles.plusBtn} 
                                    onClick={() => cambiarCantidad(prod.id_producto!, 1)}
                                >
                                    <span>+</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={styles.footerSection}>
                    <div style={styles.inputContainer}>
                        <div style={styles.field}>
                            <label style={styles.label}>📅 Entrega</label>
                            <input 
                                type="date" 
                                min={obtenerFechaMinima()} 
                                style={styles.customInput} 
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                onKeyDown={(e) => e.preventDefault()} 
                            />
                        </div>

                        <div style={styles.field}>
                            <label style={styles.label}>📞 Teléfono</label>
                            <input 
                                type="tel" 
                                placeholder="600000000" 
                                style={styles.customInput} 
                                value={telefono}
                                onChange={(e) => setTelefono(e.target.value)}
                            />
                        </div>
                    </div>

                    <div style={styles.summaryCard}>
                        <div style={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>{totalCalculado.toFixed(2)}€</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Gastos de gestión</span>
                            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>Gratis</span>
                        </div>
                        <div style={styles.totalRow}>
                            <span>TOTAL</span>
                            <span>{totalCalculado.toFixed(2)}€</span>
                        </div>
                    </div>

                    <button 
                        style={{
                            ...styles.mainButton,
                            backgroundColor: cargando ? '#a1887f' : '#2ecc71',
                            opacity: cargando ? 0.7 : 1
                        }} 
                        onClick={finalizarTodo} 
                        disabled={cargando}
                    >
                        {cargando ? "Procesando..." : "CONFIRMAR Y DESCARGAR PDF"}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#fdf8f5', padding: '20px', fontFamily: "'Segoe UI', sans-serif" },
    card: { backgroundColor: '#ffffff', borderRadius: '30px', boxShadow: '0 20px 60px rgba(93, 64, 55, 0.15)', width: '100%', maxWidth: '480px', overflow: 'hidden', border: '1px solid #f1ece9' },
    header: { padding: '40px 30px 20px 30px', textAlign: 'center' },
    title: { color: '#4e342e', fontSize: '26px', fontWeight: '800', margin: '0 0 5px 0' },
    subtitle: { color: '#a1887f', fontSize: '14px', margin: 0 },
    headerLine: { width: '40px', height: '4px', backgroundColor: '#2ecc71', margin: '15px auto 0', borderRadius: '10px' },
    productList: { padding: '0 30px', maxHeight: '240px', overflowY: 'auto' },
    productRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #f8f1ee' },
    productMain: { display: 'flex', flexDirection: 'column', gap: '2px' },
    productName: { fontWeight: '700', color: '#3e2723', fontSize: '16px' },
    productMeta: { fontSize: '12px', color: '#8d7970' },
    stockText: { color: '#27ae60', fontWeight: '600' },
    controlWrapper: { display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fdf4f0', padding: '5px 10px', borderRadius: '12px' },
    minusBtn: { width: '26px', height: '26px', border: 'none', backgroundColor: '#fff', color: '#d35400', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    plusBtn: { width: '26px', height: '26px', border: 'none', backgroundColor: '#4e342e', color: '#fff', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold' },
    qtyDisplay: { fontWeight: '800', color: '#4e342e', fontSize: '14px', minWidth: '18px', textAlign: 'center' },
    footerSection: { padding: '30px' },
    inputContainer: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' },
    field: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '10px', fontWeight: '800', color: '#a1887f', textTransform: 'uppercase' },
    customInput: { padding: '10px', borderRadius: '10px', border: '2px solid #f2ece8', fontSize: '14px', outline: 'none', backgroundColor: '#fdfaf8' },
    summaryCard: { backgroundColor: '#fdfaf8', padding: '18px', borderRadius: '20px', marginBottom: '20px', border: '1px dashed #e8dfd8' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#8d7970', marginBottom: '6px' },
    totalRow: { display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#4e342e', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #e8dfd8' },
    mainButton: { width: '100%', padding: '16px', color: 'white', border: 'none', borderRadius: '15px', fontSize: '14px', fontWeight: '800', cursor: 'pointer', transition: 'transform 0.2s' }
};

export default FinalizarPedido;