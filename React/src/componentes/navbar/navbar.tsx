import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation(); // Para saber en qué página estamos
    
    // CAMBIA ESTO PARA PROBAR: 'guest' | 'cliente' | 'empleado' | 'admin'
    const [rolActual, setRolActual] = useState<'guest' | 'cliente' | 'empleado' | 'admin'>('admin');

    const handleLogout = () => {
        setRolActual('guest');
        navigate('/');
    };

    // --- ESTILOS ---
    const navStyle: React.CSSProperties = {
        backgroundColor: '#3e2723',
        height: '70px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 40px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        borderBottom: '4px solid #bc6c25',
        position: 'sticky',
        top: 0,
        zIndex: 1000
    };

    const logoStyle: React.CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#f2e8cf',
        textDecoration: 'none',
        display: 'flex', 
        alignItems: 'center',
        gap: '12px'
    };

    const menuGroupStyle: React.CSSProperties = {
        display: 'flex',
        gap: '25px',
        alignItems: 'center'
    };

    const linkStyle = (path: string): React.CSSProperties => ({
        color: location.pathname === path ? '#ffb703' : '#f2e8cf', // Resaltar si es la ruta activa
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: location.pathname === path ? 'bold' : '500',
        transition: '0.3s'
    });

    const adminLinkStyle: React.CSSProperties = {
        color: '#ffb703',
        border: '1px solid #ffb703',
        padding: '6px 12px',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 'bold'
    };

    const authBtnStyle: React.CSSProperties = {
        backgroundColor: '#bc6c25',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: 'bold',
        textDecoration: 'none'
    };

    return (
        <nav style={navStyle}>
            {/* 1. LOGO */}
            <Link to="/" style={logoStyle}>
                🌙 <span>La Dulce Noche</span>
            </Link>
            
            {/* 2. MENÚ CENTRAL */}
            <div style={menuGroupStyle}>
                <Link to="/productos" style={linkStyle('/productos')}>Vitrina</Link>

                {(rolActual === 'empleado' || rolActual === 'admin') && (
                    <>
                        <Link to="/ingredientes" style={linkStyle('/ingredientes')}>Ingredientes</Link>
                        
                        {/* ENLACE PARA RELACIONES (RECETAS) */}
                        <Link to="/relacion-pro-ing" style={linkStyle('/relacion-pro-ing')}>
                            🥣 Mezclar Recetas
                        </Link>
                        
                        <Link to="/pedidos" style={linkStyle('/pedidos')}>📋 Pedidos</Link>
                    </>
                )}

                {rolActual === 'admin' && (
                    <Link to="/crear-empleado" style={adminLinkStyle}>
                        + Contratar (Admin)
                    </Link>
                )}
            </div>

            {/* 3. MENÚ DERECHO */}
            <div style={menuGroupStyle}>
                {rolActual === 'guest' ? (
                    <>
                        <Link to="/login-cliente" style={linkStyle('/login-cliente')}>Soy Cliente</Link>
                        <Link to="/login-empleado" style={linkStyle('/login-empleado')}>Soy Empleado</Link>
                        <Link to="/registro" style={authBtnStyle}>Registrarse</Link>
                    </>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <span style={{ color: '#bbb', fontSize: '12px', fontStyle: 'italic' }}>
                            {rolActual.toUpperCase()}
                        </span>
                        <button onClick={handleLogout} style={{ ...authBtnStyle, backgroundColor: '#d62828' }}>
                            Salir
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;