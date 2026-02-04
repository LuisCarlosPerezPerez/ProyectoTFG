import React, { useEffect, useState } from 'react';
import ingredienteService from '../services/ingredienteService';
import type { Ingrediente } from '../types/ingrediente';

const IngredientesPage = () => {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [nuevo, setNuevo] = useState<Ingrediente>({ nombre: '', stock: 0, proveedor: '' });

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        try {
            const data = await ingredienteService.listar();
            setIngredientes(data);
        } catch (e) { console.error(e); }
    };

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ingredienteService.guardar(nuevo);
            alert("Ingrediente registrado en la despensa");
            setMostrarForm(false);
            cargar();
        } catch (e) { alert("Error al guardar"); }
    };

    return (
        <div style={{ padding: '100px 40px', maxWidth: '1000px', margin: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2>Almacén de Ingredientes</h2>
                <button onClick={() => setMostrarForm(!mostrarForm)} style={btnStyle}>
                    {mostrarForm ? "Cerrar" : "+ Nuevo Ingrediente"}
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={handleGuardar} style={formStyle}>
                    <input type="text" placeholder="Nombre (Harina, Azúcar...)" onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required style={inputStyle}/>
                    <input type="number" placeholder="Stock Inicial" onChange={e => setNuevo({...nuevo, stock: parseInt(e.target.value)})} required style={inputStyle}/>
                    <input type="text" placeholder="Proveedor" onChange={e => setNuevo({...nuevo, proveedor: e.target.value})} required style={inputStyle}/>
                    <button type="submit" style={btnSubmitStyle}>Añadir al Inventario</button>
                </form>
            )}

            <table style={tableStyle}>
                <thead>
                    <tr style={{ backgroundColor: '#f2e8cf' }}>
                        <th style={paddingStyle}>Nombre</th>
                        <th style={paddingStyle}>Stock</th>
                        <th style={paddingStyle}>Proveedor</th>
                        <th style={paddingStyle}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredientes.map((ing, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={paddingStyle}>{ing.nombre}</td>
                            <td style={paddingStyle}>{ing.stock} unidades</td>
                            <td style={paddingStyle}>{ing.proveedor}</td>
                            <td style={paddingStyle}>
                                <button style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                    🗑️ Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Estilos
const btnStyle = { padding: '10px 20px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const formStyle = { display: 'flex', flexDirection: 'column' as 'column', gap: '10px', marginBottom: '30px', padding: '20px', backgroundColor: '#fff', border: '1px solid #ddd' };
const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const btnSubmitStyle = { padding: '10px', backgroundColor: '#5d4037', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as 'collapse', backgroundColor: 'white' };
const paddingStyle = { padding: '12px', textAlign: 'left' as 'left' };

export default IngredientesPage;