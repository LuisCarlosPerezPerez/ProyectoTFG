import React, { useState, useEffect } from 'react';
import registroService from '../services/registroService';

// Definimos una interfaz para que TypeScript sepa qué tiene un Registro
interface Registro {
    id_reg: number;
    id_emp: number;
    fecha: string;
    entrada: string;
    salida: string | null;
    horas: number;
}

const VerRegistrosAdmin = () => {
    const [todosLosRegistros, setTodosLosRegistros] = useState<Registro[]>([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        cargarTodo();
    }, []);

    const cargarTodo = async () => {
        try {
            const data = await registroService.listarTodosLosRegistros();
            
            // Aquí tipamos 'r' como 'any' para que no de error al mapear desde la API
            const mapeados: Registro[] = data.map((r: any) => ({
                id_reg: r.id_registro || r.ID_Registro,
                id_emp: r.id_empleado || r.empleado, 
                fecha: r.fecha,
                entrada: r.fecha_entrada,
                salida: r.fecha_salida,
                horas: Number(r.total_horas || 0)
            }));
            
            setTodosLosRegistros(mapeados.sort((a, b) => b.id_reg - a.id_reg));
        } catch (e) {
            console.error("Error al cargar registros globales:", e);
        }
    };

    // Tipamos 'r' como nuestra interfaz 'Registro'
    const filtrados = todosLosRegistros.filter((r: Registro) => 
        r.id_emp && r.id_emp.toString().includes(busqueda)
    );

    const formatearHora = (fechaStr: string | null) => {
        if (!fechaStr) return '---';
        const d = new Date(fechaStr);
        return isNaN(d.getTime()) ? '---' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ padding: '100px 40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ color: '#2d1b18', borderBottom: '2px solid #bc6c25', paddingBottom: '10px' }}>
                📊 Panel de Supervisión: Registros Staff
            </h2>
            
            <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontWeight: 'bold' }}>Filtrar Empleado:</label>
                <input 
                    type="text" 
                    placeholder="Escribe el ID del empleado..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ padding: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#bc6c25', color: 'white' }}>
                            <th style={st.th}>ID Reg</th>
                            <th style={st.th}>Empleado</th>
                            <th style={st.th}>Fecha</th>
                            <th style={st.th}>Entrada</th>
                            <th style={st.th}>Salida</th>
                            <th style={st.th}>Total Horas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map((r: Registro, i: number) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={st.td}>#{r.id_reg}</td>
                                <td style={st.td}><b>👤 ID: {r.id_emp}</b></td>
                                <td style={st.td}>{new Date(r.fecha).toLocaleDateString()}</td>
                                <td style={st.td}>{formatearHora(r.entrada)}</td>
                                <td style={st.td}>
                                    {r.salida ? formatearHora(r.salida) : <span style={{color: '#d32f2f', fontWeight: 'bold'}}>● En curso</span>}
                                </td>
                                <td style={st.td}>
                                    <span style={{ backgroundColor: '#f8f9fa', padding: '5px 10px', borderRadius: '4px', border: '1px solid #ddd' }}>
                                        {r.horas.toFixed(2)}h
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const st = {
    th: { padding: '15px', textAlign: 'left' as const },
    td: { padding: '12px' }
};

export default VerRegistrosAdmin;