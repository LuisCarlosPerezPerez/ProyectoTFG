import { useState, useEffect } from 'react';
import productoService from '../services/productoService';
import ingredienteService from '../services/ingredienteService';
import relacionService from '../services/ProductoIngredienteService';
import { sLama } from '../styles/RecetaStyles';
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
            await cargarTodo(); 
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("No se pudo guardar la relación en el servidor.");
        }
    };

    const handleEliminar = async (rel: any) => {
        const id = rel.id_producto_ingrediente || rel.ID_producto_ingrediente;
        
        if (window.confirm("¿Seguro que quieres quitar este ingrediente de la receta?")) {
            try {
                await relacionService.eliminar(id);
                cargarTodo();
            } catch (e) { alert("No se pudo eliminar."); }
        }
    };

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
        <div style={sLama.container}>
            <header style={sLama.header}>
                <h2 style={sLama.tituloSeccion}>🥣 Gestión de Recetas</h2>
                <p style={sLama.subtitulo}>Configura los ingredientes de la Pastelería Lama</p>
            </header>
            
            <div style={sLama.cardAdmin}>
                <div style={sLama.formRow}>
                    <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 'bold', color: '#ad1457', display: 'block', marginBottom: '8px' }}>Producto</label>
                        <select 
                            style={sLama.select}
                            value={seleccion.id_producto} 
                            onChange={e => setSeleccion({...seleccion, id_producto: Number(e.target.value)})}
                        >
                            <option value="0">Seleccionar Producto...</option>
                            {productos.map(p => <option key={p.id_producto} value={p.id_producto}>{p.nombre}</option>)}
                        </select>
                    </div>

                    <div style={{ flex: 1 }}>
                        <label style={{ fontWeight: 'bold', color: '#ad1457', display: 'block', marginBottom: '8px' }}>Ingrediente</label>
                        <select 
                            style={sLama.select}
                            value={seleccion.id_ingrediente} 
                            onChange={e => setSeleccion({...seleccion, id_ingrediente: Number(e.target.value)})}
                        >
                            <option value="0">Seleccionar Ingrediente...</option>
                            {ingredientes.map(i => <option key={i.id} value={i.id}>{i.nombre}</option>)}
                        </select>
                    </div>
                </div>
                
                <button onClick={handleVincular} style={{ ...sLama.btnSecundario, width: '100%' }}>
                    + Vincular a Receta
                </button>
            </div>

            <h3 style={{ ...sLama.nombreTxt, fontSize: '1.8rem', marginBottom: '20px' }}>📜 Recetas Actuales</h3>
            <div style={sLama.tablaWrapper}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={sLama.thead}>
                        <tr>
                            <th style={sLama.th}>Producto</th>
                            <th style={sLama.th}>Ingrediente</th>
                            <th style={{ ...sLama.th, textAlign: 'center' }}>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relaciones.map((rel, index) => (
                            <tr key={index}>
                                <td style={{ ...sLama.td, fontWeight: 'bold', color: '#ad1457' }}>{getNombreP(rel)}</td>
                                <td style={sLama.td}>
                                    <span style={sLama.badge}>{getNombreI(rel)}</span>
                                </td>
                                <td style={{ ...sLama.td, textAlign: 'center' }}>
                                    <button onClick={() => handleEliminar(rel)} style={sLama.btnBorrar}>
                                        🗑️ Borrar
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


export default RecetasPage;