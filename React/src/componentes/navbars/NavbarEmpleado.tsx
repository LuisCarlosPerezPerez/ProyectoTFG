import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const NavbarEmpleado = ({ usuario }: any) => {
    const navigate = useNavigate();

    // Lógica para mostrar opciones de administrador
    const esAdminPoderoso = authService.esAdmin();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav style={s.nav}>
            <div style={s.brandGroup}>
                <Link to="/" style={s.logo}> Pasteleria Lama</Link>
                <span style={s.staffBadge}>PANEL CONTROL</span>
            </div>

            <div style={s.menuGroup}>
                {/* Nueva opción para que los empleados registren su entrada/salida */}
                <Link to="/registros" style={s.fichajeLink}>🕒 Fichar</Link>
                
                <Link to="/productos" style={s.link}>Vitrina</Link>
                <Link to="/ingredientes" style={s.link}>📦 Stock</Link>
                <Link to="/recetas" style={s.link}>🥣 Mezclar</Link>
                <Link to="/pedidos" style={s.link}>📋 Pedidos</Link>
                
                {/* Opción exclusiva de Administrador */}
                {esAdminPoderoso && (
                    <>
                        <Link to="/ver-registros" style={s.link}>📊 Registros Staff</Link>
                        <Link to="/RegistrarEmpleado" style={s.adminLink}>👤 + Nuevo Staff</Link>
                    </>
                )}
            </div>

            <div style={s.userArea}>
                <div style={s.userInfo}>
                    <span style={s.userName}>{usuario?.Usuario || usuario?.usuario || 'Empleado'}</span>
                    <span style={s.userRole}>
                        {esAdminPoderoso ? 'ADMINISTRADOR' : 'EMPLEADO'}
                    </span>
                </div>
                <button onClick={handleLogout} style={s.logoutBtn}>Cerrar Sesión</button>
            </div>
        </nav>
    );
};

const s: { [key: string]: React.CSSProperties } = {
    nav: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '0 40px', 
        height: '70px', 
        alignItems: 'center', 
        backgroundColor: '#2d1b18', 
        color: 'white', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        width: '100%', 
        zIndex: 1000, 
        boxSizing: 'border-box',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    },
    brandGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
    logo: { textDecoration: 'none', color: '#f2e8cf', fontWeight: 'bold', fontSize: '1.4rem' },
    staffBadge: { 
        backgroundColor: '#bc6c25', 
        color: 'white', 
        fontSize: '0.65rem', 
        padding: '3px 8px', 
        borderRadius: '4px', 
        fontWeight: 'bold',
        letterSpacing: '1px'
    },
    menuGroup: { display: 'flex', gap: '20px', alignItems: 'center' },
    link: { textDecoration: 'none', color: '#f2e8cf', fontWeight: 500, fontSize: '0.9rem' },
    
    // Estilo especial para el botón de Fichar
    fichajeLink: {
        textDecoration: 'none',
        color: '#2a9d8f', // Verde azulado para destacar
        fontWeight: 'bold',
        fontSize: '0.9rem',
        backgroundColor: 'rgba(42, 157, 143, 0.1)',
        padding: '5px 10px',
        borderRadius: '5px',
        border: '1px solid #2a9d8f'
    },

    adminLink: { 
        backgroundColor: '#795548', 
        color: '#f2e8cf', 
        padding: '8px 15px', 
        borderRadius: '6px', 
        textDecoration: 'none', 
        fontSize: '0.85rem', 
        fontWeight: 'bold',
        border: '1px solid #bc6c25'
    },
    userArea: { display: 'flex', gap: '20px', alignItems: 'center' },
    userInfo: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
    userName: { color: '#f2e8cf', fontSize: '0.9rem', fontWeight: 'bold' },
    userRole: { color: '#bc6c25', fontSize: '0.7rem', fontWeight: 'bold' },
    logoutBtn: { 
        backgroundColor: '#e63946', 
        color: 'white', 
        border: 'none', 
        padding: '8px 16px', 
        borderRadius: '6px', 
        cursor: 'pointer', 
        fontWeight: 'bold' 
    }
};

export default NavbarEmpleado;