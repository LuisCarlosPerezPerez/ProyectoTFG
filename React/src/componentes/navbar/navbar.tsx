import React, { useState } from 'react';
import RegistroModal from '../registro/registroModal';

const Navbar = () => {

    const [verFichar, setVerFichar] = useState(false);

    const sesionRaw = localStorage.getItem("empleado") || localStorage.getItem("cliente");
    const sesion = sesionRaw ? JSON.parse(sesionRaw) : null;

    const esAdmin = sesion?.administrador === 1;
    const esEmpleado = sesion?.id_empleado !== undefined;

    return (
        <nav style={navStyle}>
            <div className="logo" style={{ fontSize: '24px', cursor: 'pointer' }}>
                <strong>Pasteleria Dama</strong>
            </div>

            <div className="links" style={linksWrapperStyle}>
                <a href="/" style={linkStyle}>Inicio</a>
                <a href="/productos" style={linkStyle}>Productos</a>
                <a href="/sobre-nosotros" style={linkStyle}>Nosotros</a>
                <a href="/galeria" style={linkStyle}>Galería</a>
                
                {!sesion && (
                    <>
                        <a href="/login" style={linkStyle}>Iniciar Sesión</a>
                        <a href="/registro" style={linkStyle}>Registrarse</a>
                    </>
                )}

                {esAdmin && (
                    <a href="/registro_empleado" style={{ ...linkStyle, color: '#bc6c25', fontWeight: 'bold' }}>
                        ⚙️ Gestión Empleados
                    </a>
                )}
            </div>

            <div className="acciones" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                
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


const navStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 40px',
    backgroundColor: '#fff',
    borderBottom: '2px solid #f2e8cf',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 100,
    boxSizing: 'border-box'
};

const linksWrapperStyle = {
    display: 'flex',
    gap: '20px'
};

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#5d4037',
    fontWeight: 500
};

const btnFicharStyle = {
    padding: '10px 20px',
    backgroundColor: '#5d4037',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold' as 'bold'
};

const userBadgeStyle = {
    backgroundColor: '#f2e8cf',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#bc6c25',
    border: '1px solid #bc6c25'
};


export default Navbar;