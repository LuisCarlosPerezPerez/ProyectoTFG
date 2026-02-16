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
            cargar(); 
        } catch (error) {
            console.error("Error en la operación:", error);
            alert("Error al procesar el producto. Revisa la consola.");
        }
    };

    const eliminarProducto = async (id: number) => {
        if (!window.confirm("¿Seguro que quieres quitar este producto de la vitrina?")) return;
        try {
            await productoService.eliminar(id);
            cargar(); 
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
                        <div style={s.cardHeader}>
                            <h3 style={s.nombreTxt}>{p.nombre}</h3>
                            <span style={s.precioTag}>{p.precio} €</span>
                        </div>
                        
                        <div style={s.cardBody}>
                            <p style={s.descCorta}>{p.receta ? p.receta.substring(0, 50) + "..." : "Dulce artesanal."}</p>
                            <div style={s.stockInfo}>DISPONIBLE: {p.stock} UDS</div>
                        </div>

                        <div style={s.cardFooter}>
                            {esCliente && (
                                <button 
                                    onClick={() => navegar(`/comprar/${p.id_producto}`)} 
                                    style={s.btnComprar} 
                                    disabled={p.stock <= 0}
                                >
                                    {p.stock <= 0 ? 'Agotado' : '🛒 Comprar'}
                                </button>
                            )}
                            <button onClick={() => setProductoDetalle(p)} style={s.btnInfo}>Ver Info</button>
                        </div>
                    </div>
                ))}
            </div>


            {mostrarForm && (
                <div style={s.modalOverlay}>
                    <form style={s.modalContent} onSubmit={manejarGuardar}>
                        <h3 style={s.modalTitulo}>{editandoId ? '✏️ Editar Producto' : '✨ Nuevo Producto'}</h3>
                        
                        <div style={s.formGrid}>
                            <input style={s.input} placeholder="Nombre" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} required />
                            <input style={s.input} type="number" step="0.01" placeholder="Precio €" value={formData.precio} onChange={e => setFormData({...formData, precio: parseFloat(e.target.value)})} required />
                        </div>
                        
                        <input style={s.input} type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} required />
                        
                        <textarea style={s.textarea} placeholder="Descripción/Receta" value={formData.receta} onChange={e => setFormData({...formData, receta: e.target.value})} />
                        
                        <div style={s.modalActions}>
                            <button type="submit" style={s.btnGuardar}>Guardar Dulce</button>
                            <button type="button" onClick={() => setMostrarForm(false)} style={s.btnCancelar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {productoDetalle && (
                <div style={s.modalOverlay} onClick={() => setProductoDetalle(null)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 style={s.modalTitulo}>{productoDetalle.nombre}</h2>
                        <span style={s.precioTag}>{productoDetalle.precio} €</span>
                        <div style={s.modalTexto}>
                           <p><strong>Descripción:</strong> {productoDetalle.receta || "Nuestra receta artesanal."}</p>
                           <p><strong>Stock actual:</strong> {productoDetalle.stock} unidades</p>
                        </div>
                        
                        <div style={s.modalActions}>
                            {esStaff && (
                                <>
                                    <button onClick={() => { abrirEditar(productoDetalle); setProductoDetalle(null); }} style={s.btnAdminEdit}>✏️ Editar</button>
                                    <button onClick={() => { eliminarProducto(productoDetalle.id_producto); setProductoDetalle(null); }} style={s.btnAdminDelete}>🗑️ Eliminar</button>
                                </>
                            )}
                            <button onClick={() => setProductoDetalle(null)} style={s.btnCancelar}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const s: { [key: string]: React.CSSProperties } = {
    container: { padding: '120px 40px', maxWidth: '1400px', margin: '0 auto', minHeight: '100vh' },
    header: { textAlign: 'center', marginBottom: '60px' },
    tituloSeccion: { color: '#d81b60', fontSize: '3.2rem', fontWeight: 900, margin: 0 },
    subtitulo: { color: '#666', fontSize: '1.1rem', marginTop: '10px' },
    btnCrear: { backgroundColor: '#000', color: '#fff', padding: '12px 25px', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold' },
    
    grid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(4, 1fr)', 
        gap: '25px',
        width: '100%'
    },
    
    card: { backgroundColor: '#fff', borderRadius: '30px', padding: '25px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', border: '1px solid #fce4ec', textAlign: 'center' },
    cardHeader: { marginBottom: '15px' },
    nombreTxt: { color: '#ad1457', fontSize: '1.5rem', fontWeight: '800', margin: '0 0 10px 0' },
    precioTag: { backgroundColor: '#fce4ec', padding: '5px 15px', borderRadius: '20px', fontWeight: 'bold', color: '#d81b60', fontSize: '1.1rem' },
    
    cardBody: { flex: 1, marginBottom: '20px' },
    descCorta: { fontSize: '0.95rem', color: '#777', lineHeight: '1.4' },
    stockInfo: { fontSize: '0.8rem', fontWeight: 'bold', marginTop: '12px', color: '#bbb' },
    
    cardFooter: { display: 'flex', flexDirection: 'column', gap: '10px' },
    btnComprar: { backgroundColor: '#d81b60', color: 'white', border: 'none', borderRadius: '50px', padding: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },
    btnInfo: { border: '2px solid #d81b60', borderRadius: '50px', padding: '10px', cursor: 'pointer', backgroundColor: '#fff', color: '#d81b60', fontWeight: 'bold' },
    
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, backdropFilter: 'blur(8px)' },
    modalContent: { backgroundColor: '#fff', padding: '40px', borderRadius: '40px', width: '90%', maxWidth: '550px', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', textAlign: 'center' },
    modalTitulo: { color: '#ad1457', margin: '0 0 20px 0', fontSize: '2rem', fontWeight: '900' },
    modalTexto: { backgroundColor: '#fff9fb', padding: '20px', borderRadius: '20px', textAlign: 'left', marginBottom: '25px', color: '#444', lineHeight: '1.6' },
    
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' },
    input: { padding: '15px 20px', borderRadius: '15px', border: '1px solid #eee', fontSize: '1.1rem', width: '100%', boxSizing: 'border-box', marginBottom: '10px' },
    textarea: { padding: '15px 20px', borderRadius: '15px', border: '1px solid #eee', minHeight: '120px', fontSize: '1.1rem', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', resize: 'none' },
    
    modalActions: { display: 'flex', gap: '10px', marginTop: '10px' },
    btnGuardar: { backgroundColor: '#d81b60', color: '#fff', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', flex: 1, cursor: 'pointer' },
    btnCancelar: { backgroundColor: '#eee', color: '#666', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', flex: 1, cursor: 'pointer' },
    btnAdminEdit: { backgroundColor: '#e6a756', color: '#000', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', flex: 1, cursor: 'pointer' },
    btnAdminDelete: { backgroundColor: '#c2185b', color: '#fff', padding: '15px', borderRadius: '50px', border: 'none', fontWeight: 'bold', flex: 1, cursor: 'pointer' },
    
    loading: { textAlign: 'center', marginTop: '150px', fontSize: '1.5rem', fontWeight: 'bold', color: '#d81b60' }
};

export default ProductosPage;