import NavbarAnonimo from '../navbars/NavbarAnonimo';
import NavbarCliente from '../navbars/NavbarCliente';
import NavbarEmpleado from '../navbars/NavbarEmpleado';
import { authService } from '../../services/authService';

const Navbar = () => {
    const usuario = authService.getUsuario();
    const estaLogueado = authService.isLogged();
    const esStaff = authService.esStaff();

    if (!estaLogueado) {
        return <NavbarAnonimo />;
    }

    if (esStaff) {
        return <NavbarEmpleado usuario={usuario} />;
    }

    return <NavbarCliente usuario={usuario} />;
};

export default Navbar;