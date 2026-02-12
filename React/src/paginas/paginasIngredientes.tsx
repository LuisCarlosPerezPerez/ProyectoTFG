import React, { useEffect, useState } from 'react';
import ingredienteService from '../services/ingredienteService';
import type { Ingrediente } from '../Types/ingrediente';

const IngredientesPage = () => {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [editandoId, setEditandoId] = useState<number | null>(null);
    const [nuevo, setNuevo] = useState<Ingrediente>({ nombre: '', stock: 0, proveedor: '' });

    // ESTADO PARA LA VENTANA DE CONSULTA (DETALLE)
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
        setIngredienteSeleccionado(null); // Cerramos el detalle
        setMostrarForm(true); // Abrimos el formulario
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
        <div style={{ padding: '40px', width: '100%', boxSizing: 'border-box', position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <h2 style={{ color: '#3e2723' }}>📦 Almacén de Ingredientes</h2>
                <button onClick={() => setMostrarForm(!mostrarForm)} style={btnStyle}>
                    {mostrarForm ? "Cerrar" : "+ Nuevo Ingrediente"}
                </button>
            </div>

            {/* FORMULARIO DE ALTA/EDICIÓN */}
            {mostrarForm && (
                <form onSubmit={handleGuardar} style={formStyle}>
                    <h3>{editandoId ? "✏️ Editando Ingrediente" : "✨ Nuevo Ingrediente"}</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({...nuevo, nombre: e.target.value})} required style={inputStyle}/>
                        <input type="number" placeholder="Stock" value={nuevo.stock} onChange={e => setNuevo({...nuevo, stock: parseInt(e.target.value)})} required style={inputStyle}/>
                        <input type="text" placeholder="Proveedor" value={nuevo.proveedor} onChange={e => setNuevo({...nuevo, proveedor: e.target.value})} required style={inputStyle}/>
                        <button type="submit" style={btnSubmitStyle}>Guardar</button>
                    </div>
                </form>
            )}

            {/* TABLA PRINCIPAL */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={tableStyle}>
                    <thead>
                        <tr style={{ backgroundColor: '#f2e8cf', borderBottom: '2px solid #bc6c25' }}>
                            <th style={paddingStyle}>Nombre (clic para consultar)</th>
                            <th style={paddingStyle}>Stock</th>
                            <th style={paddingStyle}>Proveedor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingredientes.map((ing) => (
                            <tr key={ing.id} style={{ borderBottom: '1px solid #eee', cursor: 'pointer' }} onClick={() => setIngredienteSeleccionado(ing)}>
                                <td style={{...paddingStyle, color: '#bc6c25', fontWeight: 'bold'}}>🔍 {ing.nombre}</td>
                                <td style={paddingStyle}>{ing.stock} uds.</td>
                                <td style={paddingStyle}>{ing.proveedor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* VENTANA EMERGENTE DE CONSULTA (MODAL) */}
            {ingredienteSeleccionado && (
                <div style={overlayStyle}>
                    <div style={modalStyle}>
                        <h2 style={{ color: '#3e2723', marginTop: 0, borderBottom: '2px solid #bc6c25' }}>Ficha Técnica</h2>
                        <div style={{ margin: '20px 0', fontSize: '1.1rem' }}>
                            <p><strong>ID:</strong> {ingredienteSeleccionado.id}</p>
                            <p><strong>Nombre del Producto:</strong> {ingredienteSeleccionado.nombre}</p>
                            <p><strong>Existencias Actuales:</strong> {ingredienteSeleccionado.stock} unidades</p>
                            <p><strong>Proveedor Oficial:</strong> {ingredienteSeleccionado.proveedor}</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                            <button onClick={prepararModificacionFromDetalle} style={{...btnStyle, backgroundColor: '#3e2723'}}>Modificar Datos</button>
                            <button onClick={() => handleEliminar(ingredienteSeleccionado.id)} style={{...btnStyle, backgroundColor: '#d62828'}}>Eliminar</button>
                            <button onClick={() => setIngredienteSeleccionado(null)} style={{...btnStyle, backgroundColor: '#888'}}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- ESTILOS ADICIONALES PARA EL MODAL ---
const overlayStyle = {
    position: 'fixed' as const, top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
};

const modalStyle = {
    backgroundColor: 'white', padding: '30px', borderRadius: '12px', width: '450px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.3)', border: '1px solid #bc6c25'
};

const btnStyle = { padding: '10px 20px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' };
const formStyle = { display: 'flex', flexDirection: 'column' as const, gap: '10px', marginBottom: '30px', padding: '20px', backgroundColor: '#fdfaf5', border: '1px solid #e0d5c1', borderRadius: '8px' };
const inputStyle = { padding: '10px', borderRadius: '4px', border: '1px solid #ccc', flex: 1 };
const btnSubmitStyle = { padding: '12px 25px', backgroundColor: '#3e2723', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' };
const tableStyle = { width: '100%', borderCollapse: 'collapse' as const };
const paddingStyle = { padding: '15px', textAlign: 'left' as const };

export default IngredientesPage;