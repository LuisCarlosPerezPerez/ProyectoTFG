import React, { useState, useEffect } from 'react';
import registroService from '../services/registroService';
import { authService } from '../services/authService';

const PaginaRegistros = () => {
    const [registros, setRegistros] = useState<any[]>([]);
    const [enTurno, setEnTurno] = useState(false);
    const [cargando, setCargando] = useState(false);
    
    const usuarioActual = authService.getUsuario();
    // Obtenemos el ID del Admin/Empleado
    const idEmpleado = Number(usuarioActual?.ID_Empleado || usuarioActual?.id_empleado || usuarioActual?.id || 1);

    useEffect(() => {
        cargarHistorial();
    }, []);

    const cargarHistorial = async () => {
        try {
            const data = await registroService.listarRegistros();
            
            // Mapeo adaptado a tu consola (propiedad 'empleado')
            const mapeados = data.map((r: any) => ({
                id_reg: r.ID_Registro || r.id_registro,
                id_emp: r.empleado, 
                fecha: r.fecha,
                entrada: r.fecha_entrada,
                salida: r.fecha_salida,
                horas: Number(r.total_horas || 0)
            }));

            // Filtramos por el ID del usuario actual
            const misRegistros = mapeados.filter((r: any) => Number(r.id_emp) === idEmpleado);
            
            // Ordenamos: el más reciente arriba
            const ordenados = misRegistros.sort((a: any, b: any) => b.id_reg - a.id_reg);
            
            setRegistros(ordenados);

            // Si el registro más reciente NO tiene salida, el botón debe ser "Finalizar"
            if (ordenados.length > 0 && (ordenados[0].salida === null || ordenados[0].salida === undefined)) {
                setEnTurno(true);
            } else {
                setEnTurno(false);
            }
        } catch (error) {
            console.error("Error al cargar historial:", error);
        }
    };

    const manejarFichaje = async () => {
        setCargando(true);
        try {
            if (!enTurno) {
                // --- INICIAR JORNADA ---
                const ahora = new Date();
                const fechaSimple = ahora.toISOString().split('T')[0];
                const horaLocal = ahora.toTimeString().split(' ')[0];
                const fechaLocal = `${fechaSimple}T${horaLocal}`;

                await registroService.guardarRegistro({
                    fecha: fechaSimple,
                    fecha_entrada: fechaLocal,
                    id_empleado: idEmpleado
                });
            } else {
                // --- FINALIZAR JORNADA ---
                // Llamamos al endpoint que corregimos en el Backend
                await registroService.registrarSalida(idEmpleado);
            }
            
            // Pausa de seguridad para que la DB actualice
            setTimeout(() => {
                cargarHistorial();
                setCargando(false);
            }, 800);

        } catch (error) {
            console.error("Error en la operación:", error);
            alert("Error 500: Revisa que el Backend tenga el nuevo código de 'buscarUltimoRegistroAbierto'");
            setCargando(false);
        }
    };

    const formatearHora = (fechaStr: any) => {
        if (!fechaStr) return "---";
        const d = new Date(fechaStr);
        return isNaN(d.getTime()) ? "---" : d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ padding: '40px', maxWidth: '850px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Sistema de Fichaje Automatizado</h2>
            <p>Sesión activa: <b>Admin</b> (ID: {idEmpleado})</p>
            
            <div style={{ 
                margin: '20px auto', 
                padding: '30px', 
                backgroundColor: 'white', 
                borderRadius: '12px', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                display: 'inline-block'
            }}>
                <div style={{ marginBottom: '15px' }}>
                    Estado actual: {enTurno ? 
                        <b style={{color: '#d32f2f'}}>● JORNADA ACTIVA</b> : 
                        <b style={{color: '#2a9d8f'}}>○ FUERA DE TURNO</b>
                    }
                </div>
                
                <button 
                    onClick={manejarFichaje}
                    disabled={cargando}
                    style={{
                        padding: '15px 40px',
                        fontSize: '1.1rem',
                        fontWeight: 'bold',
                        cursor: cargando ? 'not-allowed' : 'pointer',
                        backgroundColor: enTurno ? '#e63946' : '#2a9d8f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px'
                    }}
                >
                    {cargando ? "PROCESANDO..." : enTurno ? "FINALIZAR JORNADA" : "INICIAR JORNADA"}
                </button>
            </div>

            <div style={{ marginTop: '40px' }}>
                <h3>Historial de Registros</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#2d1b18', color: '#f2e8cf' }}>
                            <th style={{ padding: '12px' }}>Fecha</th>
                            <th>Entrada</th>
                            <th>Salida</th>
                            <th>Horas Totales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((r, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #eee' }}>
                                <td style={{ padding: '10px' }}>{new Date(r.fecha).toLocaleDateString()}</td>
                                <td>{formatearHora(r.entrada)}</td>
                                <td>{r.salida ? formatearHora(r.salida) : <span style={{color: 'orange', fontWeight: 'bold'}}>En curso</span>}</td>
                                <td><strong>{r.horas.toFixed(2)}h</strong></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaginaRegistros;