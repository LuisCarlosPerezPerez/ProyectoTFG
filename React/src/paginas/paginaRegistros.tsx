import { useState, useEffect } from 'react';
import registroService from '../services/registroService';
import { authService } from '../services/authService';
import { s } from '../styles/FichajeStyles';

const PaginaRegistros = () => {
    const [registros, setRegistros] = useState<any[]>([]);
    const [enTurno, setEnTurno] = useState(false);
    const [cargando, setCargando] = useState(false);
    
    const usuarioActual = authService.getUsuario();
    const idEmpleado = Number(usuarioActual?.ID_Empleado || usuarioActual?.id_empleado || usuarioActual?.id || 1);

    useEffect(() => {
        cargarHistorial();
    }, []);

    const cargarHistorial = async () => {
        try {
            const data = await registroService.listarRegistros();
            
            const mapeados = data.map((r: any) => ({
                id_reg: r.ID_Registro || r.id_registro,
                id_emp: r.empleado, 
                fecha: r.fecha,
                entrada: r.fecha_entrada,
                salida: r.fecha_salida,
                horas: Number(r.total_horas || 0)
            }));

            const misRegistros = mapeados.filter((r: any) => Number(r.id_emp) === idEmpleado);
            
            const ordenados = misRegistros.sort((a: any, b: any) => b.id_reg - a.id_reg);
            
            setRegistros(ordenados);

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
                await registroService.registrarSalida(idEmpleado);
            }
            
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
        <main style={s.container}>
            <h2 style={s.titulo}>Sistema de Fichaje Automatizado</h2>
            <p style={s.infoSesion}>Sesión activa: <b>Admin</b> (ID: {idEmpleado})</p>
            
            <section style={s.panelCentral} aria-label="Control de jornada">
                <div style={s.estadoTexto}>
                    Estado actual: {enTurno ? 
                        <b style={{color: '#ad1457'}}>● JORNADA ACTIVA</b> : 
                        <b style={{color: '#d81b60'}}>○ FUERA DE TURNO</b>
                    }
                </div>
                
                <button 
                    onClick={manejarFichaje}
                    disabled={cargando}
                    style={s.botonFichar(enTurno, cargando)}
                    aria-live="polite"
                >
                    {cargando ? "PROCESANDO..." : enTurno ? "FINALIZAR JORNADA" : "INICIAR JORNADA"}
                </button>
            </section>

            <div style={s.tablaContenedor}>
                <h3 style={s.tablaTitulo}>Historial de Registros</h3>
                <table style={s.tabla}>
                    <thead>
                        <tr style={s.tablaCabecera}>
                            <th scope="col" style={s.tablaCelda}>Fecha</th>
                            <th scope="col" style={s.tablaCelda}>Entrada</th>
                            <th scope="col" style={s.tablaCelda}>Salida</th>
                            <th scope="col" style={s.tablaCelda}>Horas Totales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map((r, i) => (
                            <tr key={i} style={s.tablaFila}>
                                <td style={s.tablaCelda}>{new Date(r.fecha).toLocaleDateString()}</td>
                                <td style={s.tablaCelda}>{formatearHora(r.entrada)}</td>
                                <td style={s.tablaCelda}>
                                    {r.salida ? 
                                        formatearHora(r.salida) : 
                                        <span style={s.badgeEnCurso}>En curso</span>
                                    }
                                </td>
                                <td style={s.tablaCelda}>
                                    <strong style={{color: '#333'}}>{r.horas.toFixed(2)}h</strong>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default PaginaRegistros;