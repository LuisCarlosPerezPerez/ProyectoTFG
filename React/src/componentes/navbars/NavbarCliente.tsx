import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import type { CSSProperties } from 'react';

const NavbarCliente = ({ usuario }: { usuario: any }) => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        authService.logout();
        navigate('/');
        window.location.reload(); 
    };

    return (
        <nav style={navS.nav}>
            {/* LOGO */}
            <Link to="/" style={navS.logo}>
                <span style={{ fontSize: '28px' }}>🥐</span> 
                <div style={{ lineHeight: '1.1' }}>
                    <span style={{ display: 'block', fontSize: '18px' }}>Pastelería</span>
                    <span style={{ color: '#ad1457', fontSize: '15px', letterSpacing: '1px' }}>LAMA</span>
                </div>
            </Link>
            
            {/* MENÚ CLIENTE */}
            <div style={navS.menu}>
                <Link to="/productos" style={navS.link}>Productos</Link>
                <Link to="/MisPedidos" style={navS.link}>Mis Pedidos</Link>
                <Link to="/FinalizarPedido" style={navS.link}>Realizar Pedido</Link>
            </div>

            {/* ÁREA DE USUARIO */}
            <div style={navS.userArea}>
                <div style={{ textAlign: 'right' }}>
                    <span style={navS.welcome}>Bienvenido/a,</span>
                    <span style={{ ...navS.welcome, display: 'block', color: '#ad1457', fontWeight: '900', fontSize: '1rem' }}>
                        {usuario?.usuario}
                    </span>
                </div>
                <button onClick={cerrarSesion} style={navS.logout}>
                    Cerrar Sesión
                </button>
            </div>
        </nav>
    );
};

// --- ESTILOS EN EL MISMO ARCHIVO ---
const navS: Record<string, CSSProperties> = {
    nav: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '0 50px', 
        height: '85px', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid #fce4ec', 
        position: 'fixed', 
        top: 0, 
        left: 0,
        width: '100%', 
        zIndex: 1000, 
        boxSizing: 'border-box',
        fontFamily: "'Quicksand', sans-serif",
    },
    logo: { 
        textDecoration: 'none', 
        color: '#5d4037', 
        fontWeight: '900', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '12px' 
    },
    menu: { 
        display: 'flex', 
        gap: '30px' 
    },
    link: { 
        textDecoration: 'none', 
        color: '#5d4037', 
        fontWeight: '700',
        fontSize: '0.95rem',
        transition: '0.3s'
    },
    userArea: { 
        display: 'flex', 
        gap: '20px', 
        alignItems: 'center' 
    },
    welcome: { 
        color: '#8d6e63', 
        fontSize: '0.8rem',
        fontWeight: '600'
    },
    logout: { 
        backgroundColor: '#5d4037', 
        color: 'white', 
        border: 'none', 
        padding: '10px 20px', 
        borderRadius: '50px', 
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '0.85rem',
        transition: '0.3s'
    }
};

export default NavbarCliente;