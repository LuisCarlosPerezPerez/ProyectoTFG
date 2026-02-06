import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import RegistroModal from '../registro/registroComponente';

const Navbar = () => {
    const [verFichar, setVerFichar] = useState(false);
    const navigate = useNavigate();

    // 1. Lógica de Sesión
    const empleadoRaw = localStorage.getItem("empleado");
    const clienteRaw = localStorage.getItem("cliente");
    
    const empleado = empleadoRaw ? JSON.parse(empleadoRaw) : null;
    const cliente = clienteRaw ? JSON.parse(clienteRaw) : null;
    
    const sesion = empleado || cliente;
    const esEmpleado = !!empleado;
    
    // El Admin es un empleado que tiene el campo 'administrador' a true (o 1)
    const esAdmin = empleado && (empleado.administrador === true || empleado.administrador === 1);

    const cerrarSesion = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>PASTELERÍA LAMA</Link>

            <div style={linksWrapperStyle}>
                <Link to="/" style={navBtnStyle}>Inicio</Link>
                <Link to="/productos" style={navBtnStyle}>Productos</Link>
                
                {/* Vistas para Empleados y Admin */}
                {esEmpleado && (
                    <>
                        <Link to="/ingredientes" style={navBtnStyle}>Ingredientes</Link>
                        <Link to="/recetas" style={navBtnStyle}>Recetas</Link>
                    </>
                )}

                {/* Vista EXCLUSIVA del Admin: Gestión de Personal */}
                {esAdmin && (
                    <Link to="/gestion-empleados" style={{...navBtnStyle, color: '#d62828'}}>
                        ⚙️ Gestionar Empleados
                    </Link>
                )}
                
                <Link to="/sobre-nosotros" style={navBtnStyle}>Nosotros</Link>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {/* Fichar: Disponible para cualquier empleado o admin */}
                {esEmpleado && (
                    <button onClick={() => setVerFichar(true)} style={btnFicharStyle}>
                        🕒 Fichar
                    </button>
                )}

                {sesion ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={userBadgeStyle}>
                            {esAdmin ? '👑 Admin: ' : esEmpleado ? '👨‍🍳 ' : '👤 '} 
                            {sesion.usuario || sesion.nombre}
                        </div>
                        <button onClick={cerrarSesion} style={logoutBtnStyle}>Salir</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <Link to="/registro" style={navBtnStyle}>Registrarse</Link>
                        <Link to="/login" style={loginBtnStyle}>Entrar</Link>
                    </div>
                )}
            </div>

            {verFichar && empleado && (
                <RegistroModal empleado={empleado} onClose={() => setVerFichar(false)} />
            )}
        </nav>
    );
};

// --- ESTILOS ---
const navStyle: React.CSSProperties = { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
    padding: '0 40px', height: '70px', backgroundColor: '#fff', 
    borderBottom: '2px solid #f2e8cf', position: 'fixed', top: 0, 
    width: '100%', zIndex: 1000, boxSizing: 'border-box' 
};

const logoStyle: React.CSSProperties = { 
    fontSize: '22px', fontWeight: 'bold', color: '#5d4037', 
    textDecoration: 'none', letterSpacing: '1px' 
};

const linksWrapperStyle: React.CSSProperties = { display: 'flex', gap: '25px' };

const navBtnStyle: React.CSSProperties = { 
    textDecoration: 'none', color: '#5d4037', fontWeight: 600, fontSize: '15px' 
};

const btnFicharStyle = { 
    padding: '8px 18px', backgroundColor: '#bc6c25', color: 'white', 
    border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 'bold' as const 
};

const userBadgeStyle = { 
    backgroundColor: '#fdfaf5', padding: '6px 14px', borderRadius: '20px', 
    color: '#bc6c25', border: '1px solid #bc6c25', fontSize: '14px', fontWeight: 600 
};

const loginBtnStyle = { 
    textDecoration: 'none', color: '#5d4037', border: '1px solid #5d4037', 
    padding: '6px 16px', borderRadius: '5px', fontSize: '14px' 
};

const logoutBtnStyle = {
    backgroundColor: 'transparent', border: 'none', color: '#a0522d', 
    cursor: 'pointer', textDecoration: 'underline', fontSize: '13px'
};

export default Navbar;