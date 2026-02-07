/*import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import RegistroModal from '../registro/registroComponente';

const Navbar = () => {
    const [verFichar, setVerFichar] = useState(false);

    // Lógica para detectar si es empleado (Goldie/Harper)
    const sesionRaw = localStorage.getItem("empleado") || localStorage.getItem("cliente");
    const sesion = sesionRaw ? JSON.parse(sesionRaw) : null;
    const esEmpleado = sesion && sesion.id_empleado !== undefined;

    return (
        <nav style={navStyle}>
            <Link to="/" style={logoStyle}>PASTELERÍA LAMA</Link>

            <div style={linksWrapperStyle}>
                <Link to="/" style={navBtnStyle}>Inicio</Link>
                <Link to="/productos" style={navBtnStyle}>Productos</Link>
                
                {esEmpleado && (
                    <>
                        <Link to="/ingredientes" style={navBtnStyle}>Ingredientes</Link>
                        <Link to="/recetas" style={navBtnStyle}>Recetas</Link>
                    </>
                )}
                
                <Link to="/sobre-nosotros" style={navBtnStyle}>Nosotros</Link>
            </div>

            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                {esEmpleado && (
                    <button onClick={() => setVerFichar(true)} style={btnFicharStyle}>🕒 Fichar</button>
                )}

                {sesion ? (
                    <div style={userBadgeStyle}>👤 {sesion.usuario || sesion.nombre}</div>
                ) : (
                    <Link to="/login" style={loginBtnStyle}>Entrar</Link>
                )}
            </div>

            {verFichar && sesion && (
                <RegistroModal empleado={sesion} onClose={() => setVerFichar(false)} />
            )}
        </nav>
    );
};

// Estilos del Navbar
const navStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 40px', height: '70px', backgroundColor: '#fff', borderBottom: '2px solid #f2e8cf', position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' };
const logoStyle: React.CSSProperties = { fontSize: '20px', fontWeight: 'bold', color: '#5d4037', textDecoration: 'none' };
const linksWrapperStyle: React.CSSProperties = { display: 'flex', gap: '20px' };
const navBtnStyle: React.CSSProperties = { textDecoration: 'none', color: '#5d4037', fontWeight: 600 };
const btnFicharStyle = { padding: '8px 16px', backgroundColor: '#bc6c25', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer' };
const userBadgeStyle = { backgroundColor: '#fdfaf5', padding: '6px 14px', borderRadius: '20px', color: '#bc6c25', border: '1px solid #bc6c25' };
const loginBtnStyle = { textDecoration: 'none', color: '#5d4037', border: '1px solid #5d4037', padding: '5px 15px', borderRadius: '5px' };

export default Navbar;*/