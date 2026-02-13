import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import productoService from '../services/productoService';
import { authService } from '../services/authService';
import type { VerProductosDTO } from '../Types/producto';
import { s } from '../styles/ProductoStyles';

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
            {/* CABECERA */}
            <header style={s.header}>
                <h2 style={s.tituloSeccion}>Nuestros Productos</h2>
                <p style={s.subtitulo}>Recetas artesanales de Pastelería Lama</p>
                {esStaff && (
                    <button onClick={abrirCrear} style={s.btnCrear}>
                        + Añadir Nuevo Dulce
                    </button>
                )}
            </header>

            {/* VITRINA EN 4 COLUMNAS */}
            <div style={s.grid}>
                {productos.map((p) => (
                    <article key={p.id_producto} style={s.card}>
                        <div style={s.cardHeader}>
                            <h3 style={s.nombreTxt}>{p.nombre}</h3>
                            <span style={s.precioTag}>{p.precio} €</span>
                        </div>
                        
                        <div style={s.cardBody}>
                            <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '15px' }}>
                                {p.receta ? p.receta.substring(0, 50) + "..." : "Receta artesanal de la casa."}
                            </p>
                            <div style={{ color: '#999', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '0.5px' }}>
                                DISPONIBLE: {p.stock} UDS
                            </div>
                        </div>

                        <div style={{ marginTop: '20px' }}>
                            <button onClick={() => setProductoDetalle(p)} style={s.btnInfo}>
                                Ver Info
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            {/* MODAL FORMULARIO (AÑADIR / EDITAR) */}
            {mostrarForm && (
                <div style={s.modalOverlay}>
                    <form style={s.modalContent} onSubmit={manejarGuardar}>
                        <h3 style={{ color: '#ad1457', fontSize: '1.8rem', marginBottom: '20px', fontWeight: '800' }}>
                            {editandoId ? 'Editar Producto' : 'Nuevo Producto'}
                        </h3>
                        
                        <div style={{ textAlign: 'left', marginBottom: '10px' }}>
                            <input 
                                style={s.input} 
                                placeholder="Nombre del dulce" 
                                value={formData.nombre} 
                                onChange={e => setFormData({...formData, nombre: e.target.value})} 
                                required 
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input 
                                style={s.input} 
                                type="number" 
                                step="0.01" 
                                placeholder="Precio (€)" 
                                value={formData.precio} 
                                onChange={e => setFormData({...formData, precio: parseFloat(e.target.value)})} 
                                required 
                            />
                            <input 
                                style={s.input} 
                                type="number" 
                                placeholder="Stock" 
                                value={formData.stock} 
                                onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})} 
                                required 
                            />
                        </div>

                        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                            <textarea 
                                style={s.textarea} 
                                placeholder="Descripción o receta..." 
                                value={formData.receta} 
                                onChange={e => setFormData({...formData, receta: e.target.value})} 
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button type="submit" style={s.btnGuardar}>Guardar</button>
                            <button type="button" onClick={() => setMostrarForm(false)} style={s.btnCancelar}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL DE DETALLE (FICHA TÉCNICA) */}
            {productoDetalle && (
                <div style={s.modalOverlay} onClick={() => setProductoDetalle(null)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 style={{ color: '#ad1457', fontSize: '2.2rem', margin: '0 0 10px 0' }}>{productoDetalle.nombre}</h2>
                        <span style={s.precioTag}>{productoDetalle.precio} €</span>
                        
                        <div style={{ margin: '25px 0', textAlign: 'left', backgroundColor: '#fff9fb', padding: '20px', borderRadius: '20px', border: '1px solid #fce4ec' }}>
                            <p style={{ color: '#444', lineHeight: '1.6' }}>
                                <strong>Descripción:</strong><br/>
                                {productoDetalle.receta || "Elaborado artesanalmente con ingredientes de primera calidad."}
                            </p>
                            <p style={{ marginTop: '15px', color: '#ad1457', fontWeight: 'bold' }}>
                                Existencias: {productoDetalle.stock} unidades
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {esStaff && (
                                <>
                                    <button 
                                        onClick={() => { abrirEditar(productoDetalle); setProductoDetalle(null); }} 
                                        style={{ ...s.btnGuardar, backgroundColor: '#e6a756', color: '#000' }}
                                    >
                                        ✏️ Modificar
                                    </button>
                                    <button 
                                        onClick={() => { eliminarProducto(productoDetalle.id_producto); setProductoDetalle(null); }} 
                                        style={{ ...s.btnGuardar, backgroundColor: '#c2185b' }}
                                    >
                                        🗑️ Eliminar
                                    </button>
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



export default ProductosPage;