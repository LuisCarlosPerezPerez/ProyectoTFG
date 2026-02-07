import React, { useEffect, useState } from 'react';
import productoService from '../services/productoService';
import { authService } from '../services/authService';
import type { Producto, VerProductosDTO } from '../Types/producto';

const ProductosPage = () => {
    // --- ESTADOS ---
    const [productos, setProductos] = useState<VerProductosDTO[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editando, setEditando] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [productoDetalle, setProductoDetalle] = useState<VerProductosDTO | null>(null);

    // --- LÓGICA DE USUARIO (LocalStorage) ---
    const usuarioSesion = authService.getUsuario();
    const esStaff = usuarioSesion?.rol === 'admin' || usuarioSesion?.rol === 'empleado';
    const esCliente = usuarioSesion?.rol === 'cliente';

    const estadoInicial: Producto = {
        id_producto: 0,
        nombre: '',
        stock: 0,
        receta: '',
        precio: 0,
        empleado: { id_empleado: usuarioSesion?.id_empleado || usuarioSesion?.id || 0 },
        ingredientes: [],
        pedidos: []
    };

    const [form, setForm] = useState<Producto>(estadoInicial);

    // --- CARGA DE DATOS ---
    useEffect(() => {
        cargar();
    }, []);

    const cargar = async () => {
        try {
            const data = await productoService.listar();
            setProductos(data);
        } catch (error) {
            console.error("Error al cargar la vitrina:", error);
        } finally {
            setCargando(false);
        }
    };

    // --- FUNCIONES DE ACCIÓN ---
    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const productoFinal: Producto = {
                ...form,
                precio: Number(form.precio),
                stock: Number(form.stock),
                empleado: { id_empleado: usuarioSesion?.id_empleado || usuarioSesion?.id }
            };

            if (editando) {
                await productoService.modificar(productoFinal);
                alert("¡Producto actualizado!");
            } else {
                await productoService.guardar(productoFinal);
                alert("¡Dulce guardado con éxito!");
            }
            cerrarFormulario();
            cargar();
        } catch (error) {
            alert("Error al conectar con el horno (Backend)");
        }
    };

    const handleEliminar = async (id: number) => {
        if (window.confirm(`¿Seguro que quieres eliminar el producto #${id}?`)) {
            try {
                await productoService.eliminar(id);
                cargar();
            } catch (error) {
                alert("No se pudo eliminar el producto.");
            }
        }
    };

    const handleComprar = (p: VerProductosDTO) => {
        alert(`🛒 ${p.nombre} añadido al carrito. ¡Lógica de pedidos pendiente por tu compañero!`);
    };

    const prepararEdicion = (p: VerProductosDTO) => {
        setForm({
            ...estadoInicial,
            id_producto: p.id_producto,
            nombre: p.nombre,
            stock: p.stock,
            receta: p.receta,
            precio: p.precio
        });
        setEditando(true);
        setMostrarForm(true);
    };

    const cerrarFormulario = () => {
        setMostrarForm(false);
        setEditando(false);
        setForm(estadoInicial);
    };

    if (cargando) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#5d4037' }}>Cargando la vitrina de Goldie y Harper...</div>;

    return (
        <div style={s.container}>
            <div style={s.header}>
                <h2 style={{ color: '#5d4037', margin: 0 }}>Vitrina :</h2>
                {esStaff && (
                    <button onClick={() => mostrarForm ? cerrarFormulario() : setMostrarForm(true)} style={mostrarForm ? s.btnCancel : s.btnAdd}>
                        {mostrarForm ? 'Cancelar' : '+ Añadir Dulce'}
                    </button>
                )}
            </div>

            {/* FORMULARIO (SOLO PARA STAFF) */}
            {mostrarForm && esStaff && (
                <div style={s.formContainer}>
                    <h3 style={{ color: '#bc6c25', marginTop: 0 }}>{editando ? 'Editar Receta' : 'Nuevo Dulce'}</h3>
                    <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input type="text" placeholder="Nombre del dulce" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={s.input} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="number" step="0.01" placeholder="Precio (€)" value={form.precio || ''} onChange={e => setForm({...form, precio: parseFloat(e.target.value)})} required style={{ ...s.input, flex: 1 }} />
                            <input type="number" placeholder="Stock" value={form.stock || ''} onChange={e => setForm({...form, stock: parseInt(e.target.value)})} required style={{ ...s.input, flex: 1 }} />
                        </div>
                        <textarea placeholder="Receta y descripción..." value={form.receta} onChange={e => setForm({...form, receta: e.target.value})} style={{ ...s.input, height: '80px' }} />
                        <button type="submit" style={s.btnSubmit}>
                            {editando ? 'Actualizar Producto' : 'Guardar Dulce'}
                        </button>
                    </form>
                </div>
            )}

            <table style={s.table}>
                <thead>
                    <tr style={{ backgroundColor: '#f2e8cf' }}>
                        {/* ID SOLO VISIBLE PARA STAFF */}
                        {esStaff && <th style={s.th}>ID</th>}
                        <th style={s.th}>Dulce</th>
                        <th style={s.th}>Stock</th>
                        <th style={s.th}>Precio</th>
                        {(esStaff || esCliente) && <th style={{ ...s.th, textAlign: 'center' }}>Acciones</th>}
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? productos.map((p) => (
                        <tr key={p.id_producto}>
                            {/* ID SOLO VISIBLE PARA STAFF */}
                            {esStaff && <td style={s.td}>{p.id_producto}</td>}
                            
                            <td style={s.td}>
                                <button onClick={() => setProductoDetalle(p)} style={s.nombreBtn}>
                                    {p.nombre}
                                </button>
                            </td>
                            <td style={s.td}>
                                {p.stock > 0 ? `${p.stock} uds` : <span style={{color: 'red', fontWeight: 'bold'}}>Agotado</span>}
                            </td>
                            <td style={s.td}>{p.precio} €</td>
                            
                            <td style={{ ...s.td, textAlign: 'center' }}>
                                {esStaff && (
                                    <>
                                        <button onClick={() => prepararEdicion(p)} style={s.btnIcon} title="Editar">✏️</button>
                                        <button onClick={() => handleEliminar(p.id_producto)} style={{ ...s.btnIcon, color: '#e63946' }} title="Eliminar">🗑️</button>
                                    </>
                                )}
                                {esCliente && (
                                    <button 
                                        onClick={() => handleComprar(p)} 
                                        disabled={p.stock <= 0} 
                                        style={p.stock <= 0 ? {...s.btnComprar, backgroundColor: '#ccc', cursor: 'not-allowed'} : s.btnComprar}
                                    >
                                        {p.stock <= 0 ? 'Sin stock' : '🛒 Comprar'}
                                    </button>
                                )}
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={esStaff ? 5 : 4} style={{ padding: '30px', textAlign: 'center', color: '#999' }}>La vitrina está vacía por ahora.</td></tr>
                    )}
                </tbody>
            </table>

            {/* MODAL DE DETALLES (PARA TODOS) */}
            {productoDetalle && (
                <div style={s.modalOverlay} onClick={() => setProductoDetalle(null)}>
                    <div style={s.modalContent} onClick={e => e.stopPropagation()}>
                        <h2 style={s.recipeTitle}>🌙 {productoDetalle.nombre}</h2>
                        <h4 style={{ color: '#5d4037', marginBottom: '8px' }}>📜 Receta y Notas:</h4>
                        <p style={{ fontStyle: 'italic', color: '#3e2723', lineHeight: '1.6', backgroundColor: '#fdfcf0', padding: '15px', borderRadius: '8px' }}>
                            {productoDetalle.receta || "Los ingredientes de este dulce son un secreto de la casa."}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px' }}>
                            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#bc6c25' }}>{productoDetalle.precio} €</span>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                {esCliente && productoDetalle.stock > 0 && (
                                    <button onClick={() => { handleComprar(productoDetalle); setProductoDetalle(null); }} style={s.btnComprar}>Añadir al Carrito</button>
                                )}
                                <button onClick={() => setProductoDetalle(null)} style={s.btnCancel}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- ESTILOS ---
const s = {
    container: { padding: '40px', maxWidth: '1000px', margin: 'auto' } as React.CSSProperties,
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' } as React.CSSProperties,
    table: { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '8px', overflow: 'hidden' } as React.CSSProperties,
    th: { padding: '15px', textAlign: 'left', borderBottom: '2px solid #5d4037', color: '#5d4037', fontWeight: 'bold' } as React.CSSProperties,
    td: { padding: '15px', borderBottom: '1px solid #eee' } as React.CSSProperties,
    input: { padding: '10px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '15px' } as React.CSSProperties,
    formContainer: { backgroundColor: '#fffaf0', padding: '25px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #bc6c25', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' } as React.CSSProperties,
    btnAdd: { padding: '10px 20px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' } as React.CSSProperties,
    btnCancel: { padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' } as React.CSSProperties,
    btnSubmit: { padding: '12px', backgroundColor: '#5d4037', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' } as React.CSSProperties,
    btnIcon: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 8px' } as React.CSSProperties,
    btnComprar: { padding: '8px 15px', backgroundColor: '#ffb703', color: '#3e2723', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' } as React.CSSProperties,
    nombreBtn: { background: 'none', border: 'none', color: '#bc6c25', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '15px' } as React.CSSProperties,
    modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000, backdropFilter: 'blur(3px)' } as React.CSSProperties,
    modalContent: { backgroundColor: 'white', padding: '35px', borderRadius: '15px', maxWidth: '550px', width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' } as React.CSSProperties,
    recipeTitle: { color: '#bc6c25', marginTop: 0, borderBottom: '2px solid #f2e8cf', paddingBottom: '10px', marginBottom: '20px' } as React.CSSProperties,
};

export default ProductosPage;