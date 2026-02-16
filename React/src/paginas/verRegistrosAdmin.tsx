import { useState, useEffect } from 'react';
import registroService from '../services/registroService';
import { sLama } from '../styles/RegistroFicharStyles';
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

    const filtrados = todosLosRegistros.filter((r: Registro) => 
        r.id_emp && r.id_emp.toString().includes(busqueda)
    );

    const formatearHora = (fechaStr: string | null) => {
        if (!fechaStr) return '---';
        const d = new Date(fechaStr);
        return isNaN(d.getTime()) ? '---' : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={sLama.container}>
      
            <header style={sLama.header}>
                <h2 style={sLama.tituloSeccion}>📊 Panel de Supervisión</h2>
                <p style={sLama.subtitulo}>Control de entradas, salidas y horas del staff</p>
            </header>
            
           
            <div style={sLama.searchContainer}>
                <label style={{ ...sLama.label, margin: 0 }}>Filtrar Empleado:</label>
                <input 
                    type="text" 
                    placeholder="Escribe el ID del empleado..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={sLama.inputSearch}
                    onFocus={(e) => e.target.style.borderColor = '#d81b60'}
                    onBlur={(e) => e.target.style.borderColor = '#f2e8cf'}
                />
            </div>

         
            <div style={sLama.tablaWrapper}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={sLama.thead}>
                        <tr>
                            <th style={sLama.th}>ID Reg</th>
                            <th style={sLama.th}>Empleado</th>
                            <th style={sLama.th}>Fecha</th>
                            <th style={sLama.th}>Entrada</th>
                            <th style={sLama.th}>Salida</th>
                            <th style={{ ...sLama.th, textAlign: 'center' }}>Total Horas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map((r: any, i: number) => (
                            <tr key={i} style={{ borderBottom: '1px solid #fdf5f7' }}>
                                <td style={{ ...sLama.td, color: '#999', fontSize: '0.85rem' }}>#{r.id_reg}</td>
                                <td style={sLama.td}>
                                    <span style={{ fontWeight: '800', color: '#ad1457' }}>👤 ID: {r.id_emp}</span>
                                </td>
                                <td style={sLama.td}>{new Date(r.fecha).toLocaleDateString()}</td>
                                <td style={sLama.td}>{formatearHora(r.entrada)}</td>
                                <td style={sLama.td}>
                                    {r.salida ? (
                                        formatearHora(r.salida)
                                    ) : (
                                        <span style={sLama.statusEnCurso}>● En curso</span>
                                    )}
                                </td>
                                <td style={{ ...sLama.td, textAlign: 'center' }}>
                                    <span style={sLama.badgeHoras}>
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
export default VerRegistrosAdmin;