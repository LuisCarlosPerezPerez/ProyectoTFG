import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const NavbarCliente = ({ usuario }: { usuario: any }) => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        authService.logout();
        navigate('/');
        window.location.reload(); 
    };

    return (
        <nav style={navS.nav}>
            <Link to="/" style={navS.logo}>🥐 Pastelería Lama</Link>
            
            <div style={navS.menu}>
                <Link to="/productos" style={navS.link}>Productos</Link>
                <Link to="/mis-pedidos" style={navS.link}>Mis Pedidos</Link>
                <Link to="/FinalizarPedido" style={navS.link}>Realizar Pedido</Link>
            </div>

            <div style={navS.userArea}>
                <span style={navS.welcome}>Hola, <b>{usuario?.usuario}</b></span>
                <button onClick={cerrarSesion} style={navS.logout}>Cerrar Sesión</button>
            </div>
        </nav>
    );
    
};

const navS = {
    nav: { display: 'flex', justifyContent: 'space-between', padding: '0 40px', height: '70px', alignItems: 'center', backgroundColor: '#fff', borderBottom: '2px solid #f2e8cf', position: 'fixed' as const, top: 0, width: '100%', zIndex: 1000, boxSizing: 'border-box' as const },
    logo: { textDecoration: 'none', color: '#5d4037', fontWeight: 'bold', fontSize: '1.5rem' },
    menu: { display: 'flex', gap: '25px' },
    link: { textDecoration: 'none', color: '#5d4037', fontWeight: 600 },
    userArea: { display: 'flex', gap: '15px', alignItems: 'center' },
    welcome: { color: '#bc6c25', fontSize: '0.9rem' },
    logout: { backgroundColor: '#5d4037', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer' }
};

export default NavbarCliente;