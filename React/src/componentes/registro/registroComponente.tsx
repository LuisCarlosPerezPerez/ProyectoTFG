import React from 'react';
import registroService from '../../services/registroService';

// Definimos qué información necesita este modal para funcionar
interface RegistroProps {
    empleado: any;
    onClose: () => void; // Función para cerrar el modal desde el botón X
}

const RegistroModal = ({ empleado, onClose }: RegistroProps) => {

    const handleIniciarTurno = async () => {
        const payload = {
            fecha: new Date().toISOString().split('T')[0],
            fecha_entrada: new Date().toISOString(),
            id_empleado: empleado.id_empleado 
        };

        try {
            const idGenerado = await registroService.guardarRegistro(payload);
            alert(`¡Entrada registrada, ${empleado.usuario}! ID: ${idGenerado}`);
            onClose(); // Cerramos el modal tras la acción
        } catch (error) {
            alert("Error al conectar con el servidor de la pastelería");
        }
    };

    const handleCerrarTurno = async () => {
        try {
            await registroService.registrarSalida();
            alert("¡Turno finalizado con éxito! Buen trabajo.");
            onClose();
        } catch (error) {
            alert("Error al cerrar turno. ¿Tienes un turno abierto?");
        }
    };

    return (
        /* CAPA OSCURA DE FONDO (Overlay) */
        <div style={overlayStyle} onClick={onClose}>
            
            {/* CAJA BLANCA (Contenedor del Modal) */}
            <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
                
                {/* Botón de cerrar (X) */}
                <button onClick={onClose} style={closeBtnStyle}>&times;</button>

                <header style={{ marginBottom: '20px' }}>
                    <h2 style={{ color: '#5d4037', margin: 0 }}>Fichar Asistencia</h2>
                    <p style={{ color: '#8d6e63' }}>Empleado: <strong>{empleado.usuario}</strong></p>
                </header>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <button onClick={handleIniciarTurno} style={btnStyle('#28a745')}>
                        🕒 Iniciar Entrada
                    </button>
                    <button onClick={handleCerrarTurno} style={btnStyle('#dc3545')}>
                        🚪 Fichar Salida
                    </button>
                </div>

                <p style={{ marginTop: '20px', fontSize: '12px', color: '#999' }}>
                    La hora se registrará automáticamente según el servidor.
                </p>
            </div>
        </div>
    );
};

// --- ESTILOS (Para que se vea como superposición) ---
const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fondo traslúcido
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999 // Por encima de todo
};

const modalStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '15px',
    width: '400px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    border: '2px solid #f2e8cf'
};

const closeBtnStyle: React.CSSProperties = {
    position: 'absolute', top: '10px', right: '15px',
    background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#aaa'
};

const btnStyle = (bg: string) => ({
    padding: '12px 20px',
    backgroundColor: bg,
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold',
    transition: 'transform 0.2s'
});

export default RegistroModal;