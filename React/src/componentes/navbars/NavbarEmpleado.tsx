import { Link, useNavigate } from 'react-router-dom';
import { navStyles as s } from '../../styles/navbarstyles';
import { authService } from '../../services/authService';

const NavbarEmpleado = ({ usuario }: any) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/');
        window.location.reload();
    };

    return (
        <nav style={s.nav}>
            <Link to="/" style={s.logo}>🌙 La Dulce Noche</Link>

            <div style={s.menuGroup}>
                <Link to="/" style={s.link}>Inicio</Link>
                <Link to="/productos" style={s.link}>Vitrina</Link>
                <Link to="/ingredientes" style={s.link}>📦 Stock</Link>
                <Link to="/relacion-pro-ing" style={s.link}>🥣 Mezclar</Link>
                
                {/* Funcionalidad extra para el Admin */}
                {usuario?.rol === 'admin' && (
                    <Link to="/admin" style={s.adminBadge}>+ Empleados</Link>
                )}
            </div>

            <div style={s.menuGroup}>
                <span style={s.userTag}>👤 {usuario?.nombre} ({usuario?.rol})</span>
                <button onClick={handleLogout} style={s.logoutBtn}>Salir</button>
            </div>
        </nav>
    );
};

export default NavbarEmpleado;