import React, { useEffect, useState } from 'react';
import productoService from '../../services/productoService';
import type { Producto } from '../../types/producto';

const ProductosPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [form, setForm] = useState({ nombre: '', stock: 0, receta: '', precio: 0 });

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        try {
            const data = await productoService.listar();
            setProductos(data);
        } catch (e) { console.error(e); }
    };

    const enviar = async (e: React.FormEvent) => {
        e.preventDefault();
        await productoService.guardar(form);
        setMostrarForm(false);
        cargar();
    };

    return (
        <div style={{ padding: '100px 20px' }}>
            <h2>Panel de Productos</h2>
            <button onClick={() => setMostrarForm(!mostrarForm)} style={{ marginBottom: '20px' }}>
                {mostrarForm ? "Cerrar" : "+ Añadir Nuevo"}
            </button>

            {mostrarForm && (
                <form onSubmit={enviar} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                    <input type="text" placeholder="Nombre" onChange={e => setForm({...form, nombre: e.target.value})} />
                    <input type="number" placeholder="Precio" onChange={e => setForm({...form, precio: parseInt(e.target.value)})} />
                    <input type="number" placeholder="Stock" onChange={e => setForm({...form, stock: parseInt(e.target.value)})} />
                    <textarea placeholder="Receta" onChange={e => setForm({...form, receta: e.target.value})} />
                    <button type="submit">Guardar en DB</button>
                </form>
            )}

            <table border={1} style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
                <thead>
                    <tr><th>Nombre</th><th>Stock</th><th>Precio</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {productos.map((p, i) => (
                        <tr key={i}>
                            <td>{p.nombre}</td>
                            <td>{p.stock}</td>
                            <td>{p.precio}€</td>
                            <td><button style={{ color: 'red' }}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductosPage;