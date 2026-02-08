import { Link } from 'react-router-dom';
import { navStyles as s } from '../../styles/navbarstyles';

const NavbarAnonimo = () => (
    <nav style={s.nav}>
        <Link to="/" style={s.logo}>🌙 La Dulce Noche</Link>

        <div style={s.menuGroup}>
            <Link to="/" style={s.link}>Inicio</Link>
            <Link to="/productos" style={s.link}>Vitrina</Link>
        </div>

        <div style={s.menuGroup}>
            <Link to="/login-cliente" style={s.link}>Entrar Cliente</Link>
            <Link to="/login-empleado" style={s.authBtn}>Acceso Staff</Link>
        </div>
    </nav>
);

export default NavbarAnonimo;