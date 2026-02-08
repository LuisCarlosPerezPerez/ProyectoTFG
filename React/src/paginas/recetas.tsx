import React, { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import ingredienteService from '../services/ingredienteService';
import relacionService from '../services/ProductoIngredienteService';

const RecetasPage = () => {
    const [productos, setProductos] = useState<any[]>([]);
    const [ingredientes, setIngredientes] = useState<any[]>([]);
    const [relaciones, setRelaciones] = useState<any[]>([]);
    const [seleccion, setSeleccion] = useState({ id_producto: 0, id_ingrediente: 0 });

    const cargarTodo = async () => {
        try {
            const [p, i, r] = await Promise.all([
                productoService.listar(),
                ingredienteService.listar(),
                relacionService.listar()
            ]);
            setProductos(p);
            setIngredientes(i);
            setRelaciones(r);
        } catch (e) { console.error("Error al cargar:", e); }
    };

    useEffect(() => { cargarTodo(); }, []);

    const handleVincular = async () => {
        const idProductoNuevo = Number(seleccion.id_producto);
        const idIngredienteNuevo = Number(seleccion.id_ingrediente);

        if (idProductoNuevo === 0 || idIngredienteNuevo === 0) {
            alert("⚠️ Selecciona un producto y un ingrediente.");
            return;
        }

        // BUSCAR DUPLICADOS (Normalizando nombres de propiedades y tipos)
        const yaExiste = relaciones.some(rel => {
            const relIdProd = Number(rel.id_producto || rel.producto);
            const relIdIng = Number(rel.id_ingrediente || rel.ingrediente);
            
            return relIdProd === idProductoNuevo && relIdIng === idIngredienteNuevo;
        });

        if (yaExiste) {
            alert("❌ Error: Este ingrediente ya forma parte de la receta de este producto.");
            return;
        }

        try {
            await relacionService.guardar(idProductoNuevo, idIngredienteNuevo);
            alert("✅ Vinculado con éxito");
            setSeleccion({ id_producto: 0, id_ingrediente: 0 });
            await cargarTodo(); // Refrescar la lista
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudo guardar la relación en el servidor.");
        }
    };

    const handleEliminar = async (rel: any) => {
        // Busca el ID sin importar si Java lo manda como id_producto_ingrediente o ID_...
        const id = rel.id_producto_ingrediente || rel.ID_producto_ingrediente;
        
        if (window.confirm("¿Seguro que quieres quitar este ingrediente de la receta?")) {
            try {
                await relacionService.eliminar(id);
                cargarTodo();
            } catch (e) { alert("No se pudo eliminar."); }
        }
    };

    // Funciones para limpiar los "undefined" de la tabla
    const getNombreP = (rel: any) => {
        const id = rel.id_producto || rel.producto;
        const p = productos.find(x => x.id_producto === id);
        return p ? p.nombre : "Desconocido";
    };

    const getNombreI = (rel: any) => {
        const id = rel.id_ingrediente || rel.ingrediente;
        const ing = ingredientes.find(x => (x.id || x.id_ingrediente) === id);
        return ing ? ing.nombre : "Desconocido";
    };

    return (
        <div style={{ padding: '40px', width: '100%' }}>
            <h2 style={{ color: '#3e2723' }}>🥣 Gestión de Recetas</h2>
            
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <select style={{ flex: 1, padding: '10px' }} value={seleccion.id_producto} onChange={e => setSeleccion({...seleccion, id_producto: Number(e.target.value)})}>
                        <option value="0">Seleccionar Producto...</option>
                        {productos.map(p => <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>)}
                    </select>
                    <select style={{ flex: 1, padding: '10px' }} value={seleccion.id_ingrediente} onChange={e => setSeleccion({...seleccion, id_ingrediente: Number(e.target.value)})}>
                        <option value="0">Seleccionar Ingrediente...</option>
                        {ingredientes.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                    </select>
                </div>
                <button onClick={handleVincular} style={{ width: '100%', padding: '12px', backgroundColor: '#bc6c25', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                    Vincular a Receta
                </button>
            </div>

            <h3 style={{ marginTop: '30px' }}>📜 Recetas Actuales</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2e8cf' }}>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Producto</th>
                        <th style={{ padding: '12px', textAlign: 'left' }}>Ingrediente</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {relaciones.map((rel, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                            <td style={{ padding: '12px' }}>{getNombreP(rel)}</td>
                            <td style={{ padding: '12px' }}>{getNombreI(rel)}</td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                                <button onClick={() => handleEliminar(rel)} style={{ color: 'red', border: 'none', background: 'none', cursor: 'pointer' }}>
                                    🗑️ Borrar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecetasPage;