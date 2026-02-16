import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import type { CSSProperties } from 'react';

const NavbarEmpleado = ({ usuario }: any) => {
    const navigate = useNavigate();

    const esAdminPoderoso = authService.esAdmin();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav style={s.nav}>
            <div style={s.brandGroup}>
                <Link to="/" style={s.logo}>
                    <span style={{ fontSize: '24px' }}>🥐</span> 
                    <div style={{ lineHeight: '1' }}>
                        <span style={{ display: 'block', fontSize: '16px', color: '#f2e8cf' }}>Staff</span>
                        <span style={{ color: '#bc6c25', fontSize: '13px', fontWeight: '900' }}>LAMA</span>
                    </div>
                </Link>
                <span style={s.staffBadge}>MODO OBRADOR</span>
            </div>

            <div style={s.menuGroup}>
                <Link to="/registros" style={s.fichajeLink}>🕒 Fichar</Link>
                
                <Link to="/productos" style={s.link}>Vitrina</Link>
                <Link to="/ingredientes" style={s.link}>Stock</Link>
                <Link to="/recetas" style={s.link}>Mezclar</Link>
                <Link to="/pedidos" style={s.link}>Pedidos</Link>
                
                {esAdminPoderoso && (
                    <div style={{ display: 'flex', gap: '15px', marginLeft: '10px', paddingLeft: '15px', borderLeft: '1px solid #5d4037' }}>
                        <Link to="/ver-registros" style={s.linkAdmin}>📊 Registros</Link>
                        <Link to="/RegistrarEmpleado" style={s.adminBtn}>+ Staff</Link>
                    </div>
                )}
            </div>

            <div style={s.userArea}>
                <div style={s.userInfo}>
                    <span style={s.userName}>{usuario?.Usuario || usuario?.usuario || 'Empleado'}</span>
                    <span style={s.userRole}>
                        {esAdminPoderoso ? 'ADMINISTRADOR' : 'EMPLEADO'}
                    </span>
                </div>
                <button onClick={handleLogout} style={s.logoutBtn}>Cerrar</button>
            </div>
        </nav>
    );
};


const s: Record<string, CSSProperties> = {
    nav: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '0 40px', 
        height: '85px', 
        alignItems: 'center', 
        backgroundColor: '#2d1b18', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        width: '100%', 
        zIndex: 1000, 
        boxSizing: 'border-box',
        boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
        fontFamily: "'Quicksand', sans-serif",
    },
    brandGroup: { 
        display: 'flex', 
        alignItems: 'center', 
        gap: '15px' 
    },
    logo: { 
        textDecoration: 'none', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px' 
    },
    staffBadge: { 
        backgroundColor: '#bc6c25', 
        color: 'white', 
        fontSize: '0.6rem', 
        padding: '4px 8px', 
        borderRadius: '4px', 
        fontWeight: '900',
        letterSpacing: '1px'
    },
    menuGroup: { 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'center' 
    },
    link: { 
        textDecoration: 'none', 
        color: '#f2e8cf', 
        fontWeight: '600', 
        fontSize: '0.9rem',
        transition: 'color 0.3s'
    },
    fichajeLink: {
        textDecoration: 'none',
        color: '#f2e8cf',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        backgroundColor: 'rgba(188, 108, 37, 0.2)',
        padding: '8px 15px',
        borderRadius: '50px',
        border: '1px solid #bc6c25'
    },
    linkAdmin: {
        textDecoration: 'none', 
        color: '#d81b60', 
        fontWeight: 'bold', 
        fontSize: '0.9rem'
    },
    adminBtn: { 
        backgroundColor: '#ad1457', 
        color: 'white', 
        padding: '6px 12px', 
        borderRadius: '50px', 
        textDecoration: 'none', 
        fontSize: '0.8rem', 
        fontWeight: 'bold'
    },
    userArea: { 
        display: 'flex', 
        gap: '15px', 
        alignItems: 'center' 
    },
    userInfo: { 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-end',
        lineHeight: '1.2'
    },
    userName: { 
        color: '#f2e8cf', 
        fontSize: '0.9rem', 
        fontWeight: 'bold' 
    },
    userRole: { 
        color: '#bc6c25', 
        fontSize: '0.7rem', 
        fontWeight: '900' 
    },
    logoutBtn: { 
        backgroundColor: 'transparent', 
        color: '#f2e8cf', 
        border: '1px solid #f2e8cf', 
        padding: '6px 12px', 
        borderRadius: '50px', 
        cursor: 'pointer', 
        fontWeight: 'bold',
        fontSize: '0.8rem',
        transition: 'all 0.3s'
    }
};

export default NavbarEmpleado;