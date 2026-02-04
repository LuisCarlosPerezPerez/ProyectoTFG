import React, { useState } from 'react';
import RegistroModal from '../registro/registroComponente';

interface NavbarProps {
    setPagina: (pagina: string) => void;
}

const Navbar = ({ setPagina }: NavbarProps) => {
    // Estado para el modal de fichaje
    const [verFichar, setVerFichar] = useState(false);

    // Leer sesión del localStorage (Empleado o Cliente)
    const sesionRaw = localStorage.getItem("empleado") || localStorage.getItem("cliente");
    const sesion = sesionRaw ? JSON.parse(sesionRaw) : null;

    // Verificar si es empleado para mostrar opciones especiales
    const esEmpleado = sesion && sesion.id_empleado !== undefined;

    return (
        <nav style={navStyle}>
            {/* IZQUIERDA: Nombre de la Pastelería */}
            <div 
                style={logoStyle} 
                onClick={() => setPagina('inicio')}
            >
                PASTELERÍA LAMA
            </div>

            {/* CENTRO: Navegación Principal */}
            <div style={linksWrapperStyle}>
                <button style={navBtnStyle} onClick={() => setPagina('inicio')}>Inicio</button>
                <button style={navBtnStyle} onClick={() => setPagina('productos')}>Productos</button>
                
                {/* Solo visible para Empleados */}
                {esEmpleado && (
                    <button style={navBtnStyle} onClick={() => setPagina('ingredientes')}>
                        Ingredientes
                    </button>
                )}
                
                <button style={navBtnStyle} onClick={() => setPagina('sobre-nosotros')}>Nosotros</button>
                <button style={navBtnStyle} onClick={() => setPagina('galeria')}>Galería</button>

                {/* Si no hay sesión, mostramos botones de acceso */}
                {!sesion && (
                    <>
                        <button style={navBtnStyle} onClick={() => setPagina('login')}>Login</button>
                        <button style={navBtnStyle} onClick={() => setPagina('registro')}>Registro</button>
                    </>
                )}
            </div>

            {/* DERECHA: Acciones de Usuario */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                
                {/* Botón Fichar: Exclusivo Empleados */}
                {esEmpleado && (
                    <button onClick={() => setVerFichar(true)} style={btnFicharStyle}>
                        🕒 Fichar
                    </button>
                )}

                {/* Nombre de la persona conectada */}
                {sesion && (
                    <div style={userBadgeStyle}>
                        👤 {sesion.usuario || sesion.nombre}
                    </div>
                )}
            </div>

            {/* MODAL DE FICHAJE: Se abre encima de cualquier página */}
            {verFichar && sesion && (
                <RegistroModal 
                    empleado={sesion} 
                    onClose={() => setVerFichar(false)} 
                />
            )}
        </nav>
    );
};

// --- ESTILOS DEL NAVBAR ---

const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 40px',
    height: '70px',
    backgroundColor: '#ffffff',
    borderBottom: '2px solid #f2e8cf',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    boxSizing: 'border-box',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
};

const logoStyle: React.CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    color: '#5d4037',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
};

const linksWrapperStyle: React.CSSProperties = {
    display: 'flex',
    gap: '15px'
};

const navBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#5d4037',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '4px',
    transition: 'background 0.2s'
};

const btnFicharStyle: React.CSSProperties = {
    padding: '8px 16px',
    backgroundColor: '#bc6c25',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '13px'
};

const userBadgeStyle: React.CSSProperties = {
    backgroundColor: '#fdfaf5',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#bc6c25',
    border: '1px solid #bc6c25',
    fontWeight: 500
};

export default Navbar;