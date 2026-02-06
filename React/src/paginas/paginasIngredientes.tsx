import React, { useEffect, useState } from 'react';
import ingredienteService from '../services/ingredienteService';
import type { Ingrediente } from '../Types/ingrediente';

const IngredientesPage = () => {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [nuevo, setNuevo] = useState<Ingrediente>({ nombre: '', stock: 0, proveedor: '' });

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        try {
            const data = await ingredienteService.listar();
            setIngredientes(data);
        } catch (e) { 
            console.error("Error al cargar:", e); 
        }
    };

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await ingredienteService.guardar(nuevo);
            alert("Ingrediente registrado");
            setMostrarForm(false);
            setNuevo({ nombre: '', stock: 0, proveedor: '' });
            cargar();
        } catch (e) { alert("Error al guardar"); }
    };

    // CAMBIO IMPORTANTE: Función para borrar usando el POST con ID
    const handleEliminar = async (id: number | undefined) => {
        if (id === undefined) {
            alert("Error: El ingrediente no tiene un ID válido.");
            return;
        }

        if (window.confirm("¿Seguro que quieres eliminar este ingrediente?")) {
            try {
                await ingredienteService.eliminar(id);
                alert("Eliminado correctamente");
                cargar(); // Refrescar la tabla tras borrar
            } catch (e) {
                alert("No se pudo eliminar. Puede que esté en uso en una receta.");
            }
        }
    };

    return (
        /* CAMBIO: width: '100%' para ocupar todo el ancho */
        <div style={{ padding: '40px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h2 style={{ color: '#3e2723' }}>📦 Almacén de Ingredientes</h2>
                <button onClick={() => setMostrarForm(!mostrarForm)} style={btnStyle}>
                    {mostrarForm ? "Cerrar" : "+ Nuevo Ingrediente"}
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={handleGuardar} style={formStyle}>
                    <input type="text" placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required style={inputStyle}/>
                    <input type="number" placeholder="Stock" value={nuevo.stock} onChange={e => setNuevo({...nuevo, stock: parseInt(e.target.value)})} required style={inputStyle}/>
                    <input type="text" placeholder="Proveedor" value={nuevo.proveedor} onChange={e => setNuevo({...nuevo, proveedor: e.target.value})} required style={inputStyle}/>
                    <button type="submit" style={btnSubmitStyle}>Añadir al Inventario</button>
                </form>
            )}

            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2e8cf', borderBottom: '2px solid #bc6c25' }}>
                            <th style={paddingStyle}>Nombre</th>
                            <th style={paddingStyle}>Stock</th>
                            <th style={paddingStyle}>Proveedor</th>
                            <th style={paddingStyle}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientes.map((ing) => (
                            <tr key={ing.id} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={paddingStyle}>{ing.nombre}</td>
                                <td style={paddingStyle}><strong>{ing.stock}</strong> unidades</td>
                                <td style={paddingStyle}>{ing.proveedor}</td>
                                <td style={paddingStyle}>
                                    <button 
                                        onClick={() => handleEliminar(ing.id)} 
                                        style={{ color: '#d62828', border: 'none', background: 'none', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// Estilos básicos
const btnStyle = { padding: '10px 20px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' };
const formStyle = { display: 'flex', flexDirection: 'column' as const, gap: '10px', marginBottom: '30px', padding: '20px', backgroundColor: '#fdfaf5', border: '1px solid #e0d5c1' };
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc' };
const btnSubmitStyle = { padding: '12px', backgroundColor: '#3e2723', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as const };
const paddingStyle = { padding: '15px', textAlign: 'left' as const };

export default IngredientesPage;