import React, { useEffect, useState } from 'react';
import ingredienteService from '../services/ingredienteService';
import type { Ingrediente } from '../Types/ingrediente';

import { s } from '../styles/IngredienteStyles';
const IngredientesPage = () => {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nuevo, setNuevo] = useState<Ingrediente>({ nombre: '', stock: 0, proveedor: '' });

    const [ingredienteSeleccionado, setIngredienteSeleccionado] = useState<Ingrediente | null>(null);

    useEffect(() => { cargar(); }, []);

    const cargar = async () => {
        try {
            const data = await ingredienteService.listar();
            setIngredientes(data);
        } catch (e) { console.error("Error al cargar:", e); }
    };

    const handleGuardar = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editandoId) {
                await ingredienteService.modificar(editandoId, nuevo);
                alert("✅ Ingrediente actualizado");
            } else {
                await ingredienteService.guardar(nuevo);
                alert("✅ Ingrediente registrado");
            }
            cancelarEdicion();
            cargar();
        } catch (e) { alert("Error al guardar"); }
    };

    const cancelarEdicion = () => {
        setMostrarForm(false);
        setEditandoId(null);
        setNuevo({ nombre: '', stock: 0, proveedor: '' });
    };

    const prepararModificacionFromDetalle = () => {
        if (!ingredienteSeleccionado) return;
        setEditandoId(ingredienteSeleccionado.id || null);
        setNuevo({ 
            nombre: ingredienteSeleccionado.nombre, 
            stock: ingredienteSeleccionado.stock, 
            proveedor: ingredienteSeleccionado.proveedor 
        });
        setIngredienteSeleccionado(null); 
        setMostrarForm(true); 
    };

    const handleEliminar = async (id: number | undefined) => {
        if (!id) return;
        if (window.confirm("¿Seguro que quieres eliminar este ingrediente?")) {
            try {
                await ingredienteService.eliminar(id);
                setIngredienteSeleccionado(null);
                cargar();
            } catch (e) { alert("Error al eliminar"); }
        }
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <h2 style={s.titulo}>📦 Almacén de Ingredientes</h2>
                <button 
                    onClick={() => setMostrarForm(!mostrarForm)} 
                    style={s.btnNuevo}
                    aria-expanded={mostrarForm}
                >
                    {mostrarForm ? "Cerrar" : "+ Nuevo Ingrediente"}
                </button>
            </div>

            {mostrarForm && (
                <form onSubmit={handleGuardar} style={s.form}>
                    <h3 style={{ color: '#ad1457', marginTop: 0 }}>
                        {editandoId ? "✏️ Editando Ingrediente" : "✨ Nuevo Ingrediente"}
                    </h3>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <input 
                            type="text" 
                            placeholder="Nombre" 
                            value={nuevo.nombre} 
                            onChange={e => setNuevo({...nuevo, nombre: e.target.value})} 
                            required 
                            style={s.input}
                            aria-label="Nombre del ingrediente"
                        />
                        <input 
                            type="number" 
                            placeholder="Stock" 
                            value={nuevo.stock} 
                            onChange={e => setNuevo({...nuevo, stock: parseInt(e.target.value)})} 
                            required 
                            style={s.input}
                            aria-label="Cantidad en stock"
                        />
                        <input 
                            type="text" 
                            placeholder="Proveedor" 
                            value={nuevo.proveedor} 
                            onChange={e => setNuevo({...nuevo, proveedor: e.target.value})} 
                            required 
                            style={s.input}
                            aria-label="Nombre del proveedor"
                        />
                        <button type="submit" style={s.btnSubmit}>Guardar</button>
                    </div>
                </form>
            )}

            <div style={s.tablaContenedor}>
                <table style={s.table}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #fce4ec' }}>
                            <th scope="col" style={s.th}>Nombre (clic para consultar)</th>
                            <th scope="col" style={s.th}>Stock</th>
                            <th scope="col" style={s.th}>Proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientes.map((ing) => (
                            <tr 
                                key={ing.id} 
                                style={{ cursor: 'pointer' }} 
                                onClick={() => setIngredienteSeleccionado(ing)}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff9fb'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                <td style={{...s.td, color: '#d81b60', fontWeight: 'bold'}}>🔍 {ing.nombre}</td>
                                <td style={s.td}>{ing.stock} uds.</td>
                                <td style={s.td}>{ing.proveedor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {ingredienteSeleccionado && (
                <div style={s.overlay}>
                    <div style={s.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
                        <h2 id="modal-title" style={{ color: '#ad1457', marginTop: 0, borderBottom: '3px solid #fce4ec', paddingBottom: '10px' }}>
                            Ficha Técnica
                        </h2>
                        <div style={{ margin: '25px 0', fontSize: '1.1rem', color: '#444' }}>
                            <p><strong>ID:</strong> {ingredienteSeleccionado.id}</p>
                            <p><strong>Producto:</strong> {ingredienteSeleccionado.nombre}</p>
                            <p><strong>Existencias:</strong> {ingredienteSeleccionado.stock} unidades</p>
                            <p><strong>Proveedor:</strong> {ingredienteSeleccionado.proveedor}</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={prepararModificacionFromDetalle} style={{...s.btnSubmit, backgroundColor: '#000', color: '#fff'}}>Modificar</button>
                            <button onClick={() => handleEliminar(ingredienteSeleccionado.id)} style={{...s.btnNuevo, backgroundColor: '#c2185b'}}>Eliminar</button>
                            <button onClick={() => setIngredienteSeleccionado(null)} style={{...s.btnNuevo, backgroundColor: '#757575'}}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};



export default IngredientesPage;