import React, { useEffect, useState } from 'react';
import productoService from '../services/productoService';
import type { Producto, VerProductosDTO } from '../Types/producto';

const ProductosPage = () => {
    // Usamos VerProductosDTO para la lista porque es lo que trae el ID de la base de datos
    const [productos, setProductos] = useState<VerProductosDTO[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editando, setEditando] = useState(false);
    const [cargando, setCargando] = useState(true);

    const estadoInicial: Producto = {
        id_producto: 0,
        nombre: '',
        stock: 0,
        receta: '',
        precio: 0,
        empleado: { id_empleado: 1 }, 
        ingredientes: [],
        pedidos: []
    };

    const [form, setForm] = useState<Producto>(estadoInicial);

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

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const productoFinal: Producto = {
                ...form,
                precio: Number(form.precio),
                stock: Number(form.stock)
            };

            if (editando) {
                await productoService.modificar(productoFinal);
                alert("¡Receta actualizada!");
            } else {
                await productoService.guardar(productoFinal);
                alert("¡Dulce horneado y guardado!");
            }
            cerrarFormulario();
            cargar();
        } catch (error) {
            alert("Error al conectar con el horno (Backend)");
        }
    };

    const handleEliminar = async (id: number) => {
        // Ahora id nunca será undefined porque viene de VerProductosDTO
        if (window.confirm(`¿Seguro que quieres eliminar el producto #${id}?`)) {
            try {
                await productoService.eliminar(id);
                await cargar(); // Recarga la lista para que desaparezca de la tabla
                alert("Producto eliminado");
            } catch (error) {
                alert("No se pudo eliminar. Revisa si tiene pedidos pendientes.");
            }
        }
    };

    const prepararEdicion = (p: VerProductosDTO) => {
        // Mapeamos lo que viene de la tabla al formulario
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

    if (cargando) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#5d4037' }}>Abriendo la pastelería...</div>;

    // --- TUS ESTILOS ORIGINALES ---
    const containerStyle: React.CSSProperties = { padding: '40px', maxWidth: '950px', margin: 'auto' };
    const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
    const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
    const thStyle: React.CSSProperties = { padding: '15px', textAlign: 'left', borderBottom: '2px solid #5d4037', color: '#5d4037' };
    const tdStyle: React.CSSProperties = { padding: '15px', borderBottom: '1px solid #eee' };
    const formContainerStyle: React.CSSProperties = { backgroundColor: '#fffaf0', padding: '25px', borderRadius: '12px', marginBottom: '30px', border: '1px solid #bc6c25' };
    const btnAddStyle = { padding: '10px 20px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' };
    const btnCancelStyle = { ...btnAddStyle, backgroundColor: '#6c757d' };
    const btnIcon = { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', padding: '0 8px' };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h2 style={{ color: '#5d4037', margin: 0 }}>Productos :</h2>
                <button onClick={() => mostrarForm ? cerrarFormulario() : setMostrarForm(true)} style={mostrarForm ? btnCancelStyle : btnAddStyle}>
                    {mostrarForm ? 'Cancelar' : '+ Añadir Producto'}
                </button>
            </div>

            {mostrarForm && (
                <div style={formContainerStyle}>
                    <h3 style={{ color: '#bc6c25', marginTop: 0 }}>{editando ? 'Editar Dulce' : 'Nuevo Dulce'}</h3>
                    <form onSubmit={handleGuardar} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <input type="text" placeholder="Nombre del dulce" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }} />
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="number" placeholder="Precio (€)" value={form.precio || ''} onChange={e => setForm({...form, precio: parseFloat(e.target.value)})} required style={{ padding: '10px', flex: 1, borderRadius: '5px', border: '1px solid #ddd' }} />
                            <input type="number" placeholder="Stock disponible" value={form.stock || ''} onChange={e => setForm({...form, stock: parseInt(e.target.value)})} required style={{ padding: '10px', flex: 1, borderRadius: '5px', border: '1px solid #ddd' }} />
                        </div>
                        <textarea placeholder="Ingredientes y preparación..." value={form.receta} onChange={e => setForm({...form, receta: e.target.value})} style={{ padding: '10px', height: '80px', borderRadius: '5px', border: '1px solid #ddd' }} />
                        <button type="submit" style={{ padding: '12px', backgroundColor: '#5d4037', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '16px' }}>
                            {editando ? 'Actualizar Vitrina' : 'Guardar en Inventario'}
                        </button>
                    </form>
                </div>
            )}

            <table style={tableStyle}>
                <thead>
                    <tr style={{ backgroundColor: '#f2e8cf' }}>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Stock</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? productos.map((p) => (
                        <tr key={p.id_producto}>
                            <td style={tdStyle}>{p.id_producto}</td>
                            <td style={{ ...tdStyle, fontWeight: 'bold' }}>{p.nombre}</td>
                            <td style={tdStyle}>{p.stock} uds</td>
                            <td style={tdStyle}>{p.precio} €</td>
                            <td style={tdStyle}>
                                <button onClick={() => prepararEdicion(p)} style={btnIcon} title="Editar">✏️</button>
                                <button onClick={() => handleEliminar(p.id_producto)} style={{ ...btnIcon, color: '#e63946' }} title="Eliminar">🗑️</button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={5} style={{ padding: '30px', textAlign: 'center', color: '#999' }}>No hay dulces en la vitrina todavía.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosPage;