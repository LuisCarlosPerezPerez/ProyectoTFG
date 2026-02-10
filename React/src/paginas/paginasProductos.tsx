import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productoService from '../services/productoService';
import { authService } from '../services/authService';
import type { VerProductosDTO } from '../Types/producto';

const ProductosPage = () => {
    const navegar = useNavigate();
    const [productos, setProductos] = useState<VerProductosDTO[]>([]);
    const [cargando, setCargando] = useState(true);
    const [productoDetalle, setProductoDetalle] = useState<VerProductosDTO | null>(null);
    
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [formData, setFormData] = useState({ nombre: '', precio: 0, stock: 0, receta: '' });

    const esCliente = authService.esCliente();
    const esStaff = authService.esStaff();

    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const data = await productoService.listar();
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar productos:", error);
        } finally {
            setCargando(false);
        }
    };

    const abrirCrear = () => {
        setEditandoId(null);
        setFormData({ nombre: '', precio: 0, stock: 0, receta: '' });
        setMostrarForm(true);
    };

    const abrirEditar = (p: VerProductosDTO) => {
        setEditandoId(p.id_producto);
        setFormData({ nombre: p.nombre, precio: p.precio, stock: p.stock, receta: p.receta || '' });
        setMostrarForm(true);
    };

    const manejarGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editandoId) {
                // Sincronizado con tu Controller: @PutMapping("/ActualizarProducto")
                // Pasamos el ID por separado como espera el @RequestParam del Backend
                await productoService.actualizarProducto(editandoId, {
                    nombre: formData.nombre,
                    precio: formData.precio,
                    stock: formData.stock,
                    receta: formData.receta
                });
                alert("✅ Producto actualizado en la vitrina");
            } else {
                // Flujo para crear nuevo producto
                await productoService.guardar(formData);
                alert("✅ Nuevo dulce añadido");
            }
            setMostrarForm(false);
            cargar(); // Refrescar la lista de productos
        } catch (error) {
            console.error("Error en la operación:", error);
            alert("Error al procesar el producto. Revisa la consola.");
        }
    };

    const eliminarProducto = async (id: number) => {
        if (!window.confirm("¿Seguro que quieres quitar este producto de la vitrina?")) return;
        try {
            await productoService.eliminar(id);
            cargar(); // Recargar la lista
        } catch (error) {
            alert("Error al eliminar el producto.");
        }
    };

    if (cargando) return <div style={s.loading}>Preparando el mostrador...</div>;

    return (
        <div style={s.container}>
            <header style={s.header}>
                <h2 style={s.tituloSeccion}>Nuestros Productos</h2>
                <p style={s.subtitulo}>Recetas artesanales de Pastelería Lama</p>
                {esStaff && (
                    <button onClick={abrirCrear} style={s.btnCrear}>+ Añadir Nuevo Dulce</button>
                )}
            </header>

            <div style={s.grid}>
                {productos.map((p) => (
                    <div key={p.id_producto} style={s.card}>
                        {esStaff && (
                            <div style={s.adminBadges}>
                                <button onClick={() => abrirEditar(p)} style={s.btnMini}>✏️</button>
                                <button onClick={() => eliminarProducto(p.id_producto)} style={s.btnMiniBorrar}>🗑️</button>
                            </div>
                        )}
                        
                        <div style={s.cardHeader}>
                            <button onClick={() => setProductoDetalle(p)} style={s.nombreBtn}>{p.nombre}</button>
                            <span style={s.precioTag}>{p.precio} €</span>
                        </div>
                        
                        <div style={s.cardBody}>
                            <p style={s.descCorta}>{p.receta ? p.receta.substring(0, 50) + "..." : "Receta artesanal."}</p>
                            <div style={s.stockInfo}>Stock: {p.stock} uds</div>
                        </div>

                        <div style={s.cardFooter}>
                            {esCliente && (
                                <button onClick={() => navegar(`/comprar/${p.id_producto}`)} style={s.btnComprar} disabled={p.stock <= 0}>
                                    🛒 Comprar
                                </button>
                            )}
                            <button onClick={() => setProductoDetalle(p)} style={s.btnInfo}>Ver Info</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* MODAL FORMULARIO */}
            {mostrarForm && (
                <div style={s.modalOverlay}>
                    <form style={s.modalContent} onSubmit={manejarGuardar}>
                        <h3 style={s.modalTitulo}>{editandoId ? 'Editar Producto' : 'Nuevo Producto'}</h3>
                        <input style={s.input} placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                        <input style={s.input} type="number" step="0.01" placeholder="Precio" value={formData.precio} onChange={e => setFormData({...formData, precio: parseFloat(e.target.value)})} required />
                        <input style={s.input} type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required />
                        <textarea style={s.textarea} placeholder="Descripción/Receta" value={formData.receta} onChange={e => setFormData({...formData, receta: e.target.value})} />
                        <div style={s.modalActions}>
                            <button type="submit" style={s.btnComprar}>Guardar</button>
                            <button type="button" onClick={() => setMostrarForm(false)} style={s.btnCerrar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL DETALLE */}
            {productoDetalle && (
                <div style={s.modalOverlay} onClick={() => setProductoDetalle(null)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 style={s.modalTitulo}>{productoDetalle.nombre}</h2>
                        <p style={s.modalTexto}>{productoDetalle.receta || "Sin descripción disponible."}</p>
                        <button onClick={() => setProductoDetalle(null)} style={s.btnCerrar}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// ESTILOS COMPLETOS (Sin faltantes)
const s: { [key: string]: React.CSSProperties } = {
    container: { padding: '40px', maxWidth: '1100px', margin: '80px auto' },
    header: { textAlign: 'center', marginBottom: '40px' },
    tituloSeccion: { color: '#5d4037', fontSize: '2.2rem', margin: 0 },
    subtitulo: { color: '#8d6e63', marginBottom: '20px' },
    btnCrear: { backgroundColor: '#bc6c25', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
    card: { backgroundColor: '#fff', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', position: 'relative', display: 'flex', flexDirection: 'column', border: '1px solid #f2e8cf' },
    adminBadges: { position: 'absolute', top: '-10px', right: '10px', display: 'flex', gap: '5px' },
    btnMini: { border: 'none', backgroundColor: '#fff', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', borderRadius: '50%', cursor: 'pointer', padding: '5px', fontSize: '14px' },
    btnMiniBorrar: { border: 'none', backgroundColor: '#ffe5e5', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', borderRadius: '50%', cursor: 'pointer', padding: '5px', fontSize: '14px' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', alignItems: 'center' },
    nombreBtn: { background: 'none', border: 'none', color: '#bc6c25', fontWeight: 'bold', fontSize: '1.2rem', cursor: 'pointer', padding: 0, textAlign: 'left' },
    precioTag: { backgroundColor: '#f2e8cf', padding: '4px 8px', borderRadius: '5px', fontWeight: 'bold', color: '#5d4037' },
    cardBody: { flex: 1 },
    descCorta: { fontSize: '0.9rem', color: '#6d4c41', lineHeight: '1.4' },
    stockInfo: { fontSize: '0.85rem', fontWeight: 'bold', marginTop: '10px', color: '#bc6c25' },
    cardFooter: { display: 'flex', gap: '10px', marginTop: '15px' },
    btnComprar: { flex: 2, backgroundColor: '#5d4037', color: 'white', border: 'none', borderRadius: '5px', padding: '10px', cursor: 'pointer', fontWeight: 'bold' },
    btnInfo: { flex: 1, border: '1px solid #5d4037', borderRadius: '5px', padding: '10px', cursor: 'pointer', backgroundColor: '#fff', color: '#5d4037' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000 },
    modalContent: { backgroundColor: '#fff', padding: '30px', borderRadius: '15px', width: '450px', display: 'flex', flexDirection: 'column', gap: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' },
    modalTitulo: { color: '#5d4037', margin: '0 0 10px 0', fontSize: '1.5rem', borderBottom: '1px solid #eee', paddingBottom: '10px' },
    modalTexto: { color: '#333', lineHeight: '1.6', fontSize: '1rem', backgroundColor: '#fdfaf5', padding: '15px', borderRadius: '8px' },
    input: { padding: '12px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '1rem' },
    textarea: { padding: '12px', borderRadius: '5px', border: '1px solid #ddd', minHeight: '100px', fontSize: '1rem', fontFamily: 'inherit' },
    modalActions: { display: 'flex', gap: '10px', marginTop: '15px' },
    btnCerrar: { padding: '10px', border: 'none', cursor: 'pointer', backgroundColor: '#eee', borderRadius: '5px', flex: 1, fontWeight: 'bold' },
    loading: { textAlign: 'center', marginTop: '100px', fontSize: '1.2rem', color: '#5d4037' }
};

export default ProductosPage;