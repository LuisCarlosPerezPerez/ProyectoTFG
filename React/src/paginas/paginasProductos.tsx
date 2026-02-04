import React, { useEffect, useState } from 'react';
import productoService from '../services/productoService';
import type { Producto } from '../types/producto';

const ProductosPage = () => {
    // ESTADOS
    const [productos, setProductos] = useState<Producto[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [cargando, setCargando] = useState(true);

    // Estado para el formulario de nuevo producto
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        stock: 0,
        receta: '',
        precio: 0
    });

    // 1. CARGAR PRODUCTOS (Al montar el componente)
    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const data = await productoService.listar();
            setProductos(data);
        } catch (error) {
            console.error("Error cargando productos:", error);
        } finally {
            setCargando(false);
        }
    };

    // 2. GUARDAR PRODUCTO (Llama a tu GuardarProducto en Java)
    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Llamamos al servicio (que usa fetch)
            await productoService.guardar(nuevoProducto);
            alert("¡Dulce guardado en Pastelería Lama!");
            
            // Limpiamos y refrescamos
            setMostrarForm(false);
            setNuevoProducto({ nombre: '', stock: 0, receta: '', precio: 0 });
            fetchProductos(); 
        } catch (error) {
            alert("Error al guardar. Puede que el nombre ya exista.");
        }
    };

    // 3. ELIMINAR PRODUCTO (Lógica de búsqueda por nombre)
    const handleEliminar = async (nombre: string) => {
        const confirmar = window.confirm(`¿Seguro que quieres eliminar "${nombre}"?`);
        if (confirmar) {
            try {
                // AQUÍ: Deberás tener el @DeleteMapping en Java que use el nombre
                // Por ahora simulamos la recarga:
                alert(`Eliminando ${nombre}... (Asegúrate de tener el Delete en Java)`);
                // fetchProductos(); 
            } catch (error) {
                alert("No se pudo eliminar.");
            }
        }
    };

    if (cargando) return <div style={{padding: '100px'}}>Cargando el horno...</div>;

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h2>Gestión de Inventario - Pastelería Lama</h2>
                <button 
                    onClick={() => setMostrarForm(!mostrarForm)} 
                    style={mostrarForm ? btnCancelStyle : btnAddStyle}
                >
                    {mostrarForm ? 'Cancelar' : '+ Añadir Producto'}
                </button>
            </div>

            {/* FORMULARIO DE CREACIÓN */}
            {mostrarForm && (
                <div style={formContainerStyle}>
                    <h3>Nuevo Producto</h3>
                    <form onSubmit={handleGuardar} style={formStyle}>
                        <input 
                            type="text" placeholder="Nombre del dulce" 
                            onChange={e => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                            required style={inputStyle}
                        />
                        <div style={{display: 'flex', gap: '10px'}}>
                            <input 
                                type="number" placeholder="Precio (€)" 
                                onChange={e => setNuevoProducto({...nuevoProducto, precio: parseInt(e.target.value)})}
                                required style={inputStyle}
                            />
                            <input 
                                type="number" placeholder="Stock" 
                                onChange={e => setNuevoProducto({...nuevoProducto, stock: parseInt(e.target.value)})}
                                required style={inputStyle}
                            />
                        </div>
                        <textarea 
                            placeholder="Receta y descripción" 
                            onChange={e => setNuevoProducto({...nuevoProducto, receta: e.target.value})}
                            required style={{...inputStyle, height: '80px'}}
                        />
                        <button type="submit" style={btnSubmitStyle}>Confirmar e Insertar</button>
                    </form>
                </div>
            )}

            {/* TABLA DE DATOS */}
            <table style={tableStyle}>
                <thead>
                    <tr style={{backgroundColor: '#f2e8cf'}}>
                        <th style={thStyle}>Nombre</th>
                        <th style={thStyle}>Stock</th>
                        <th style={thStyle}>Precio</th>
                        <th style={thStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.length > 0 ? productos.map((prod, index) => (
                        <tr key={index} style={{borderBottom: '1px solid #eee'}}>
                            <td style={tdStyle}>{prod.nombre}</td>
                            <td style={tdStyle}>{prod.stock} uds</td>
                            <td style={tdStyle}>{prod.precio} €</td>
                            <td style={tdStyle}>
                                <button 
                                    onClick={() => handleEliminar(prod.nombre)}
                                    style={btnDeleteStyle}
                                >
                                    🗑️ Eliminar
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={4} style={{padding: '20px', textAlign: 'center'}}>No hay productos en el mostrador.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

// --- ESTILOS ---
const containerStyle: React.CSSProperties = { padding: '100px 40px', maxWidth: '1000px', margin: 'auto' };
const headerStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' };
const tableStyle: React.CSSProperties = { width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' };
const thStyle: React.CSSProperties = { padding: '15px', textAlign: 'left', color: '#5d4037' };
const tdStyle: React.CSSProperties = { padding: '15px' };
const formContainerStyle: React.CSSProperties = { backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '30px', border: '1px solid #f2e8cf' };
const formStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '15px' };
const inputStyle: React.CSSProperties = { padding: '10px', borderRadius: '4px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box' };
const btnAddStyle = { padding: '10px 20px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' as 'bold' };
const btnCancelStyle = { ...btnAddStyle, backgroundColor: '#6c757d' };
const btnSubmitStyle = { padding: '12px', backgroundColor: '#5d4037', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' as 'bold' };
const btnDeleteStyle = { background: 'none', border: 'none', color: '#e63946', cursor: 'pointer', fontWeight: 'bold' as 'bold' };

export default ProductosPage;