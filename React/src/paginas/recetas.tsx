import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import ingredienteService from '../services/ingredienteService';
import relacionService from '../services/ProductoIngredienteService';
import type { Producto } from '../types/producto';
import type { Ingrediente } from '../types/ingrediente';

const RecetasPage = () => {
    const [productos, setProductos] = useState<Producto[]>([]);
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [seleccion, setSeleccion] = useState({ id_producto: 0, id_ingrediente: 0 });

    useEffect(() => {
        const cargar = async () => {
            const p = await productoService.listar();
            const i = await ingredienteService.listar();
            setProductos(p);
            setIngredientes(i);
        };
        cargar();
    }, []);

    const handleVincular = async () => {
        if (!seleccion.id_producto || !seleccion.id_ingrediente) {
            alert("Por favor, selecciona ambos campos.");
            return;
        }
        try {
            await relacionService.guardar(seleccion.id_producto, seleccion.id_ingrediente);
            alert("¡Ingrediente vinculado con éxito!");
        } catch (error) {
            alert("Error al vincular. Revisa la consola.");
        }
    };

    return (
        <div style={containerStyle}>
            <h2>Vincular Ingredientes a Productos</h2>
            <p>Selecciona un dulce y el ingrediente que lo compone para crear la relación.</p>
            
            <div style={cardStyle}>
                <div style={fieldStyle}>
                    <label>Paso 1: Selecciona el Producto</label>
                    <select style={selectStyle} onChange={e => setSeleccion({...seleccion, id_producto: parseInt(e.target.value)})}>
                        <option value="0">-- Ver Productos --</option>
                        {productos.map(p => <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>)}
                    </select>
                </div>

                <div style={fieldStyle}>
                    <label>Paso 2: Selecciona el Ingrediente</label>
                    <select style={selectStyle} onChange={e => setSeleccion({...seleccion, id_ingrediente: parseInt(e.target.value)})}>
                        <option value="0">-- Ver Almacén --</option>
                        {ingredientes.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                    </select>
                </div>

                <button onClick={handleVincular} style={btnStyle}>Guardar Relación</button>
            </div>
        </div>
    );
};

const containerStyle = { padding: '50px', maxWidth: '800px', margin: 'auto' };
const cardStyle = { backgroundColor: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', border: '1px solid #f2e8cf' };
const fieldStyle = { marginBottom: '20px', display: 'flex', flexDirection: 'column' as 'column', gap: '8px' };
const selectStyle = { padding: '12px', borderRadius: '6px', border: '1px solid #ddd' };
const btnStyle = { width: '100%', padding: '12px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' as 'bold' };

export default RecetasPage;