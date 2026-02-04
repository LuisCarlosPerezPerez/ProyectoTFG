import React, { useState } from 'react';
import RegistroModal from '../registro/registroComponente';

interface NavbarProps {
    setPagina: (pagina: string) => void;
}

const Navbar = ({ setPagina }: NavbarProps) => {
    const [verFichar, setVerFichar] = useState(false);

    // Detectar sesión
    const sesionRaw = localStorage.getItem("empleado") || localStorage.getItem("cliente");
    const sesion = sesionRaw ? JSON.parse(sesionRaw) : null;
    const esEmpleado = sesion && sesion.id_empleado !== undefined;

    return (
        <nav style={navStyle}>
            {/* IZQUIERDA: Nombre actualizado */}
            <div 
                style={logoStyle} 
                onClick={() => setPagina('inicio')}
            >
                <span style={{ fontWeight: 'bold', letterSpacing: '1px' }}>PASTELERÍA LAMA</span>
            </div>

            {/* CENTRO: Navegación */}
            <div style={linksWrapperStyle}>
                <button style={navBtnStyle} onClick={() => setPagina('inicio')}>Inicio</button>
                <button style={navBtnStyle} onClick={() => setPagina('productos')}>Productos</button>
                <button style={navBtnStyle} onClick={() => setPagina('sobre-nosotros')}>Nosotros</button>
                <button style={navBtnStyle} onClick={() => setPagina('galeria')}>Galería</button>
                
                {!sesion && (
                    <>
                        <button style={navBtnStyle} onClick={() => setPagina('login')}>Login</button>
                        <button style={navBtnStyle} onClick={() => setPagina('registro')}>Registro</button>
                    </>
                )}
            </div>

            {/* DERECHA: Fichar y Usuario */}
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {esEmpleado && (
                    <button onClick={() => setVerFichar(true)} style={btnFicharStyle}>
                        🕒 Fichar
                    </button>
                )}

                {sesion && (
                    <div style={userBadgeStyle}>
                        👤 {sesion.usuario || sesion.nombre}
                    </div>
                )}
            </div>

            {verFichar && sesion && (
                <RegistroModal 
                    empleado={sesion} 
                    onClose={() => setVerFichar(false)} 
                />
            )}
        </nav>
    );
};

// --- ESTILOS ---
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
    boxSizing: 'border-box'
};

const logoStyle: React.CSSProperties = {
    fontSize: '20px',
    cursor: 'pointer',
    color: '#5d4037',
    textTransform: 'uppercase'
};

const linksWrapperStyle: React.CSSProperties = {
    display: 'flex',
    gap: '20px'
};

const navBtnStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: '#5d4037',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer'
};

const btnFicharStyle: React.CSSProperties = {
    padding: '8px 18px',
    backgroundColor: '#bc6c25',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold'
};

const userBadgeStyle: React.CSSProperties = {
    backgroundColor: '#f2e8cf',
    padding: '6px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#bc6c25',
    border: '1px solid #bc6c25'
};

export default Navbar;